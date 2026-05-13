import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/server';
import { sendOrderConfirmation } from '@/lib/email';
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

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.order_id;
        if (!orderId) {
          console.error('[webhook] No order_id in session metadata');
          break;
        }

        // 1. Mark order as paid
        const { data: order, error: updateErr } = await admin
          .from('orders')
          .update({
            status: 'paid',
            stripe_payment_id: typeof session.payment_intent === 'string' ? session.payment_intent : null,
          })
          .eq('id', orderId)
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

        // 3. Send confirmation email (non-blocking — failure logged but doesn't fail webhook)
        const emailRes = await sendOrderConfirmation(order as Order);
        if (!emailRes.ok) {
          console.warn('[webhook] Email send skipped/failed:', emailRes.error);
        }

        console.log(`[webhook] ✓ Order ${orderId.slice(0, 8)} marked paid`);
        break;
      }

      case 'checkout.session.expired':
      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.order_id;
        if (orderId) {
          await admin.from('orders').update({ status: 'cancelled' }).eq('id', orderId);
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
