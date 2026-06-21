import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q')?.trim() ?? '').slice(0, 200);
  const limit = Math.max(1, Math.min(parseInt(searchParams.get('limit') ?? '48') || 48, 100));
  const category = searchParams.get('category') ?? '';
  const instock = searchParams.get('instock') === '1';
  const sort = searchParams.get('sort') ?? 'default';

  if (!q) {
    return NextResponse.json({ results: [], q, total: 0 });
  }

  const supabase = createClient();

  // Try strict (AND) search first
  let { data, error } = await supabase.rpc('search_products', {
    search_query: q,
    result_limit: limit,
  });

  if (error) {
    console.error('[search] search_products error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }

  // Fallback to loose (OR) search if no results
  if (!data || data.length === 0) {
    const fallback = await supabase.rpc('search_products_loose', {
      search_query: q,
      result_limit: limit,
    });
    if (!fallback.error && fallback.data) data = fallback.data;
  }

  let results = (data ?? []) as any[];

  // Apply additional filters in JS (RPC already filtered published=true)
  if (category) results = results.filter((p) => p.category?.includes(category));
  if (instock) results = results.filter((p) => p.stock > 0);

  // Override sort if requested (default keeps RPC's relevance order)
  if (sort === 'price-asc') results.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
  else if (sort === 'price-desc') results.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
  else if (sort === 'name') results.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));

  return NextResponse.json({ results, q, total: results.length });
}
