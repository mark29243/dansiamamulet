import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q')?.trim() ?? '').slice(0, 100).replace(/[%_\\]/g, '\\$&');
  const limit = Math.max(1, Math.min(parseInt(searchParams.get('limit') ?? '24') || 24, 60));
  const category = searchParams.get('category') ?? '';
  const instock = searchParams.get('instock') === '1';
  const sort = searchParams.get('sort') ?? 'default';

  const supabase = createClient();

  let query = supabase
    .from('products')
    .select('id, slug, name, category, price, sale_price, stock, images, short')
    .eq('published', true);

  if (q) {
    // ilike search across name + category + description
    query = query.or(
      `name.ilike.%${q}%,category.ilike.%${q}%,description.ilike.%${q}%,short.ilike.%${q}%`
    );
  }

  if (category) query = query.eq('category', category);
  if (instock)  query = query.gt('stock', 0);

  switch (sort) {
    case 'price-asc':  query = query.order('price', { ascending: true });  break;
    case 'price-desc': query = query.order('price', { ascending: false }); break;
    case 'name':       query = query.order('name',  { ascending: true });  break;
    default:
      // Featured + in-stock first
      query = query.order('stock', { ascending: false }).order('id', { ascending: true });
  }

  query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.error('[search] Supabase error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }

  return NextResponse.json({ results: data ?? [], q, total: (data ?? []).length });
}
