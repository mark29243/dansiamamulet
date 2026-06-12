import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!(await rateLimit(`track:${getIp(req)}`, 10, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const body = await req.json();
  const orderId = (body.order_id ?? '').toString().trim();
  const email = (body.email ?? '').toString().trim().toLowerCase();

  if (!orderId || !email) {
    return NextResponse.json({ error: 'Missing order_id or email' }, { status: 400 });
  }
  if (orderId.length > 100 || email.length > 200) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const admin = createAdminClient();

  // Support both full UUID and the short 8-char order number shown in emails
  let query = admin
    .from('orders')
    .select('id, customer_name, customer_email, status, items, subtotal, shipping_cost, total, currency, tracking_number, carrier, created_at, updated_at, shipping_address, discount_amount');

  if (orderId.length === 36) {
    // full UUID
    query = query.eq('id', orderId);
  } else {
    // short code: first 8 chars uppercased — escape ilike wildcards (%, _)
    const escaped = orderId.toUpperCase().replace(/[%_\\]/g, '\\$&');
    query = query.ilike('id', `${escaped}%`);
  }

  const { data, error } = await query
    .eq('customer_email', email)
    .in('status', ['pending', 'pending_alipay', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded', 'pending_review'])
    .single();

  if (error || !data) {
    // Return generic message to prevent email enumeration
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  // Strip sensitive fields before returning
  const { customer_email: _ce, ...safe } = data as any;
  return NextResponse.json({ order: safe });
}
