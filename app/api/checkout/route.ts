import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import type { CartItem } from '@/lib/types';
import { rateLimit, getIp } from '@/lib/rate-limit';
import { checkOrigin } from '@/lib/csrf';
import { validateShipping, isRemotePostal, type CarrierCode } from '@/lib/shipping';

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
  carrier?: CarrierCode;
  lang: 'th' | 'en' | 'zh';
  payment_method?: 'card' | 'alipay';
  discount_code?: string;
};

export async function POST(req: Request) {
  try {
    if (!checkOrigin(req)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    if (!rateLimit(getIp(req), 10, 60_000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = (await req.json()) as Body;
    const { items, customer, shipping_cost, carrier, lang, payment_method = 'card', discount_code } = body;

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }
    if (items.length > 50) {
      return NextResponse.json({ error: 'Too many items in cart' }, { status: 400 });
    }
    for (const item of items) {
      if (!Number.isInteger(item.qty) || item.qty < 1 || item.qty > 99) {
        return NextResponse.json({ error: 'Invalid item quantity' }, { status: 400 });
      }
    }
    if (!customer?.email || !customer?.name || !customer?.address) {
      return NextResponse.json({ error: 'Missing required customer fields' }, { status: 400 });
    }
    if (
      customer.name.length > 200 ||
      customer.email.length > 200 ||
      customer.address.length > 500 ||
      (customer.address2 && customer.address2.length > 500) ||
      customer.city.length > 100 ||
      customer.postal.length > 20 ||
      customer.country.length > 2 ||
      (customer.phone && customer.phone.length > 30)
    ) {
      return NextResponse.json({ error: 'Customer field too long' }, { status: 400 });
    }
    if (typeof shipping_cost !== 'number' || shipping_cost < 0 || shipping_cost > 100_000_00) {
      return NextResponse.json({ error: 'Invalid shipping cost' }, { status: 400 });
    }

    // Server-side shipping validation: recalculate and verify the sent cost
    const totalQty = items.reduce((s, i) => s + (i.qty ?? 1), 0);
    const effectiveCarrier = carrier ?? (customer.country === 'TH' ? 'thaipost' : null);
    if (!effectiveCarrier) {
      return NextResponse.json({ error: 'Shipping carrier is required' }, { status: 400 });
    }
    const expectedCost = validateShipping(customer.country, effectiveCarrier, totalQty);
    if (expectedCost === null) {
      return NextResponse.json({ error: 'Invalid shipping method for this destination' }, { status: 400 });
    }

    // Server-side remote area cross-check: carrier remote flag must match postal code
    if (customer.country === 'TH') {
      const serverRemote = isRemotePostal(customer.postal);
      const carrierIsRemote = effectiveCarrier.endsWith('-remote');
      if (serverRemote !== carrierIsRemote) {
        return NextResponse.json({ error: 'Shipping method does not match delivery address' }, { status: 400 });
      }
    }
    // Allow ฿0 free-shipping override for domestic orders over threshold
    const isFreeShipping = customer.country === 'TH' && shipping_cost === 0;
    if (!isFreeShipping && Math.abs(shipping_cost - expectedCost) > 500) {
      return NextResponse.json({ error: 'Shipping cost does not match the calculated rate' }, { status: 400 });
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

    // Re-verify free shipping eligibility using server-computed subtotal
    if (customer.country === 'TH' && shipping_cost === 0 && subtotal < 100_000) {
      return NextResponse.json({ error: 'Order does not qualify for free shipping' }, { status: 400 });
    }

    // Validate discount code server-side
    let discountAmount = 0;
    let discountCodeId: number | null = null;
    if (discount_code) {
      const code = discount_code.toUpperCase().trim();
      const { data: dc } = await admin
        .from('discount_codes')
        .select('id, percent, expires_at, used_at, email')
        .eq('code', code)
        .single();
      if (!dc || dc.used_at || new Date(dc.expires_at) < new Date() || dc.email.toLowerCase() !== customer.email.toLowerCase()) {
        return NextResponse.json({ error: 'Invalid or expired discount code' }, { status: 400 });
      }
      discountAmount = Math.round(subtotal * dc.percent / 100);
      discountCodeId = dc.id;
    }

    const total = subtotal - discountAmount + shipping_cost;

    const isAlipay = payment_method === 'alipay';
    let cnyRate = 0.20; // fallback
    if (isAlipay) {
      try {
        const fx = await fetch('https://open.er-api.com/v6/latest/THB', { next: { revalidate: 3600 } });
        const fxData = await fx.json();
        const live = fxData?.rates?.CNY;
        if (typeof live === 'number' && live > 0 && live < 10) cnyRate = live;
      } catch {
        console.warn('[checkout] FX fetch failed, using fallback rate');
      }
    }
    const currency = isAlipay ? 'cny' : 'thb';
    const toUnit = (satang: number) => isAlipay ? Math.round(satang * cnyRate) : satang;

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

    // Add discount as negative line item for Stripe
    if (discountAmount > 0) {
      line_items.push({
        price_data: {
          currency,
          product_data: {
            name: lang === 'th' ? `ส่วนลด ${discount_code?.toUpperCase()}` : lang === 'zh' ? `折扣 ${discount_code?.toUpperCase()}` : `Discount ${discount_code?.toUpperCase()}`,
          },
          unit_amount: -toUnit(discountAmount),
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
        discount_amount: discountAmount,
        discount_code: discount_code?.toUpperCase().trim() || null,
        carrier: effectiveCarrier,
        total,
        currency: isAlipay ? 'cny' : 'thb',
        status: payment_method === 'alipay' ? 'pending_alipay' : 'pending',
      })
      .select('id')
      .single();

    if (orderErr || !order) {
      console.error('Order create failed:', orderErr);
      return NextResponse.json({ error: 'Could not create order' }, { status: 500 });
    }

    // Atomically claim discount code (single-use). The `.is('used_at', null)`
    // guard prevents a concurrent checkout from reusing the same code.
    if (discountCodeId) {
      const { data: claimed } = await admin
        .from('discount_codes')
        .update({ used_at: new Date().toISOString(), order_id: order.id })
        .eq('id', discountCodeId)
        .is('used_at', null)
        .select('id');
      if (!claimed?.length) {
        await admin.from('orders').update({ status: 'cancelled' }).eq('id', order.id);
        return NextResponse.json({ error: 'Invalid or expired discount code' }, { status: 400 });
      }
    }

    // Alipay manual payment — skip Stripe, return CNY amount for QR page
    if (payment_method === 'alipay') {
      const totalCny = ((total / 100) * cnyRate).toFixed(2);
      return NextResponse.json({ type: 'alipay', orderId: order.id, cnyAmount: totalCny });
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
