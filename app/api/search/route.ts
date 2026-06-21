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
    const words = q.split(/\s+/).filter(Boolean);
    // Include full phrase + individual words so long names and partial words both find results
    const terms = words.length > 1 ? [q, ...words] : words;
    const fields = ['name', 'name_th', 'name_zh', 'description_th', 'description', 'description_zh', 'short', 'category'];
    const clauses = terms.flatMap((t) => fields.map((f) => `${f}.ilike.%${t}%`));
    query = query.or(clauses.join(','));
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
