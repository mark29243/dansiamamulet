import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/server';
import { sendOrderConfirmation, sendAdminOrderNotification } from '@/lib/email';
import type { Order } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    console.error('[webhook] Signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  const admin = createAdminClient();

  // Idempotency: reject duplicate event deliveries (Stripe retries)
  try {
    const { error: insertErr } = await admin
      .from('processed_webhook_events')
      .insert({ stripe_event_id: event.id, event_type: event.type });

    if (insertErr) {
      // unique violation = already processed → return 200 so Stripe stops retrying
      if (insertErr.code === '23505') {
        console.log(`[webhook] Duplicate event ${event.id} — skipping`);
        return NextResponse.json({ received: true, duplicate: true });
      }
      // other DB error — still try to process but log it
      console.warn('[webhook] Could not record event id:', insertErr.message);
    }
  } catch (e: any) {
    console.warn('[webhook] Idempotency check failed:', e.message);
  }

  try {
    switch (event.type) {
      // `completed` fires for all methods; for async methods (PromptPay) the
      // payment may not have cleared yet — `async_payment_succeeded` fires later.
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.order_id;
        if (!orderId) {
          console.error('[webhook] No order_id in session metadata');
          break;
        }

        // Async payment methods: only mark paid once the money actually cleared
        if (session.payment_status !== 'paid') {
          console.log(`[webhook] Order ${orderId.slice(0, 8)} session completed but payment_status=${session.payment_status} — waiting for async_payment_succeeded`);
          break;
        }

        // 1. Mark order as paid — idempotency: only update if still pending
        const { data: order, error: updateErr } = await admin
          .from('orders')
          .update({
            status: 'paid',
            stripe_payment_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
          })
          .eq('id', orderId)
          .in('status', ['pending', 'pending_alipay'])
          .select('*')
          .single();

        if (updateErr || !order) {
          console.error('[webhook] Order update failed:', updateErr);
          break;
        }

        // 2. Atomically decrement stock via RPC (prevents oversell race)
        const { error: stockErr } = await admin.rpc('decrement_stock', { items: order.items });
        if (stockErr) {
          console.error('[webhook] Stock decrement failed:', stockErr);
        }

        // 3. Auto-sync to accounting
        try {
          // Check if already exists to prevent duplicates
          const { data: existing } = await admin.from('accounting_records').select('id').eq('order_id', order.id).limit(1);
          
          if (!existing || existing.length === 0) {
            const accountingInserts = order.items.map((item: any) => {
              // Determine price per unit, default to full item price if no quantity, otherwise divide.
              // But usually item.price is the unit price. Let's assume item.price is unit price.
              // If item has quantity, we should ideally insert QTY rows or just 1 row with total amount?
              // "ตอนขายสินค้าได้ต้องให้มาเพิ่มต้นทุนของสินค้าแต่ละองค์ด้วย" - "each amulet". 
              // So if quantity > 1, maybe create multiple rows. 
              const qty = item.quantity || 1;
              const rows = [];
              for (let i = 0; i < qty; i++) {
                rows.push({
                  date: new Date().toISOString().split('T')[0],
                  type: 'SALE',
                  category: 'หน้าเว็บ',
                  product_name: item.name,
                  amount: item.price / 100,
                  cost: 0,
                  order_id: order.id,
                });
              }
              return rows;
            }).flat();

            if (accountingInserts.length > 0) {
              const { error: accErr } = await admin.from('accounting_records').insert(accountingInserts);
              if (accErr) console.warn('[webhook] Accounting sync failed:', accErr);
            }
          }
        } catch (accE) {
          console.warn('[webhook] Accounting sync error:', accE);
        }

        // 4. Send emails (non-blocking)
        const [emailRes, adminEmailRes] = await Promise.all([
          sendOrderConfirmation(order as Order),
          sendAdminOrderNotification(order as Order),
        ]);
        if (!emailRes.ok) console.warn('[webhook] Customer email failed:', emailRes.error);
        if (!adminEmailRes.ok) console.warn('[webhook] Admin email failed:', adminEmailRes.error);

        console.log(`[webhook] ✓ Order ${orderId.slice(0, 8)} marked paid`);
        break;
      }

      case 'checkout.session.expired':
      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.order_id;
        if (orderId) {
          // Only cancel if not already paid (guard against out-of-order events)
          await admin
            .from('orders')
            .update({ status: 'cancelled' })
            .eq('id', orderId)
            .in('status', ['pending', 'pending_alipay']);
          // Release the discount code so the customer can use it again
          await admin
            .from('discount_codes')
            .update({ used_at: null, order_id: null })
            .eq('order_id', orderId);
          console.log(`[webhook] Order ${orderId.slice(0, 8)} cancelled (${event.type})`);
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        if (charge.payment_intent) {
          await admin
            .from('orders')
            .update({ status: 'refunded' })
            .eq('stripe_payment_id', charge.payment_intent as string);
          console.log(`[webhook] Order refunded: ${charge.payment_intent}`);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (e: any) {
    console.error('[webhook] Handler error:', e);
    return NextResponse.json({ error: 'Handler error' }, { status: 500 });
  }
}
