import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

// Public endpoint — fetches product details by array of IDs (for wishlist page)
export async function POST(req: Request) {
  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ products: [] });
    }
    const admin = createAdminClient();
    const { data } = await admin
      .from('products')
      .select('id, slug, name, name_th, name_zh, price, sale_price, stock, images, category')
      .in('id', ids.slice(0, 200))
      .eq('published', true);
    return NextResponse.json({ products: data ?? [] });
  } catch {
    return NextResponse.json({ products: [] });
  }
}
