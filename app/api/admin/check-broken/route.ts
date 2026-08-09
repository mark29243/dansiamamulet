import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

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
