import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  return data ? admin : null;
}

export async function GET(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from');
  const to   = searchParams.get('to');
  if (!from || !to) return NextResponse.json({ error: 'Missing from/to' }, { status: 400 });

  // Get all view events in the range
  const allEvents: { product_id: number }[] = [];
  const pageSize = 1000;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const { data: batch, error } = await admin
      .from('product_view_events')
      .select('product_id')
      .gte('created_at', from)
      .lt('created_at', to)
      .range(offset, offset + pageSize - 1);

    if (error || !batch || batch.length === 0) break;
    allEvents.push(...batch);
    if (batch.length < pageSize) {
      hasMore = false;
    } else {
      offset += pageSize;
      if (offset >= 50000) break;
    }
  }

  if (allEvents.length === 0) {
    return NextResponse.json({ products: [] });
  }

  // Count per product_id
  const countMap: Record<number, number> = {};
  for (const e of allEvents) {
    countMap[e.product_id] = (countMap[e.product_id] ?? 0) + 1;
  }

  const productIds = Object.keys(countMap).map(Number);

  // Fetch product details
  const { data: products } = await admin
    .from('products')
    .select('id, name, name_th, slug, images, price, sale_price')
    .in('id', productIds);

  const result = (products ?? [])
    .map(p => ({ ...p, views: countMap[p.id] ?? 0 }))
    .sort((a, b) => b.views - a.views);

  return NextResponse.json({ products: result });
}
