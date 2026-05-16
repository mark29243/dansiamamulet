import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import type { CartItem } from '@/lib/types';

export const runtime = 'nodejs';

type Body = {
  items: CartItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    address2?: string;
    city: string;
    postal: string;
    country: string;
  };
  shipping_cost: number;
  lang: 'th' | 'en' | 'zh';
  payment_method?: 'card' | 'alipay' | 'wechat_pay';
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const { items, customer, shipping_cost, lang, payment_method = 'card' } = body;

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }
    if (!customer?.email || !customer?.name || !customer?.address) {
      return NextResponse.json({ error: 'Missing required customer fields' }, { status: 400 });
    }

    // Re-validate inventory + prices from DB (don't trust client)
    const admin = createAdminClient();
    const ids = items.map((i) => i.product_id);
    const { data: dbProducts, error } = await admin
      .from('products')
      .select('id, name, price, sale_price, stock, images, published')
      .in('id', ids);

    if (error || !dbProducts) {
      return NextResponse.json({ error: 'Failed to verify products' }, { status: 500 });
    }

    // Check stock & build canonical items list
    const canonicalItems: CartItem[] = [];
    for (const item of items) {
      const dbp = dbProducts.find((p) => p.id === item.product_id);
      if (!dbp || !dbp.published) {
        return NextResponse.json({ error: `Product ${item.product_id} is unavailable` }, { status: 400 });
      }
      if (dbp.stock < item.qty) {
        return NextResponse.json({ error: `${dbp.name} — only ${dbp.stock} in stock` }, { status: 400 });
      }
      canonicalItems.push({
        product_id: dbp.id,
        name: dbp.name,
        price: dbp.sale_price ?? dbp.price,                // server-trusted price
        image: (dbp.images as string[])?.[0] ?? '',
        qty: item.qty,
      });
    }

    const subtotal = canonicalItems.reduce((s, i) => s + i.price * i.qty, 0);
    const total = subtotal + shipping_cost;

    const isChinesePay = payment_method === 'alipay' || payment_method === 'wechat_pay';
    const cnyRate = parseFloat(process.env.CNY_RATE || '0.20');
    const currency = isChinesePay ? 'cny' : 'thb';
    const toUnit = (satang: number) => isChinesePay ? Math.round(satang * cnyRate) : satang;

    // Get current logged-in user (if any)
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = canonicalItems.map((i) => ({
      price_data: {
        currency,
        product_data: {
          name: i.name.slice(0, 250),
          ...(i.image ? { images: [i.image] } : {}),
        },
        unit_amount: toUnit(i.price),
      },
      quantity: i.qty,
    }));

    if (shipping_cost > 0) {
      line_items.push({
        price_data: {
          currency,
          product_data: {
            name: lang === 'th' ? 'ค่าจัดส่ง' : lang === 'zh' ? '运费' : 'Shipping',
          },
          unit_amount: toUnit(shipping_cost),
        },
        quantity: 1,
      });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;

    // Create draft order BEFORE redirecting (so we can match it via webhook)
    const { data: order, error: orderErr } = await admin
      .from('orders')
      .insert({
        user_id: user?.id ?? null,
        customer_email: customer.email,
        customer_name: customer.name,
        customer_phone: customer.phone,
        shipping_address: {
          line1: customer.address,
          line2: customer.address2 || null,
          city: customer.city,
          postal_code: customer.postal,
          country: customer.country,
        },
        items: canonicalItems,
        subtotal,
        shipping_cost,
        total,
        currency: 'thb',
        status: 'pending',
      })
      .select('id')
      .single();

    if (orderErr || !order) {
      console.error('Order create failed:', orderErr);
      return NextResponse.json({ error: 'Could not create order' }, { status: 500 });
    }

    // Create Stripe Checkout Session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items,
      customer_email: customer.email,
      locale: lang === 'th' ? 'th' : lang === 'zh' ? 'zh' : 'en',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
      metadata: { order_id: order.id },
      ...(isChinesePay && { payment_method_types: [payment_method as 'alipay' | 'wechat_pay'] }),
      ...(payment_method === 'wechat_pay' && { payment_method_options: { wechat_pay: { client: 'web' } } }),
    };
    const session = await stripe.checkout.sessions.create(sessionParams);

    // Save the Stripe session id back on the order
    await admin
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id);

    return NextResponse.json({ url: session.url, sessionId: session.id, orderId: order.id });
  } catch (e: any) {
    console.error('Checkout error:', e);
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 });
  }
}
