import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const admin = ctx.admin;

  const { data: products, error } = await admin
    .from('products')
    .select('id, name, images');

  if (error) {
    return NextResponse.json({ error: error.message });
  }

  const brokenProducts = products.filter(p => 
    p.images && p.images.some((img: string) => img.includes('supabase.co') || img.includes('supabase.in'))
  );

  return NextResponse.json({
    total_products: products.length,
    broken_count: brokenProducts.length,
    broken_products: brokenProducts.map(p => ({ id: p.id, name: p.name, images: p.images }))
  });
}
