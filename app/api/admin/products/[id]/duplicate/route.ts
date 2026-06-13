import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const admin = createAdminClient();
  const { data: role } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!role) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { data: original } = await admin
    .from('products')
    .select('*')
    .eq('id', parseInt(params.id))
    .single();

  if (!original) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  const slug = `${original.slug}-copy-${Date.now()}`;
  const nameTh = `${original.name_th || original.name} (สำเนา)`;

  const { data, error } = await admin
    .from('products')
    .insert({
      name: `${original.name} (Copy)`,
      name_th: nameTh,
      name_zh: original.name_zh ? `${original.name_zh} (副本)` : null,
      slug,
      price: original.price,
      sale_price: original.sale_price,
      stock: original.stock,
      category: original.category,
      description: original.description,
      description_th: original.description_th,
      description_zh: original.description_zh,
      short: original.short,
      short_th: original.short_th,
      short_zh: original.short_zh,
      images: original.images,
      seo_title: null,
      seo_title_th: null,
      seo_title_zh: null,
      seo_desc: null,
      seo_desc_th: null,
      seo_desc_zh: null,
      published: false,
    })
    .select('id, slug')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  console.log('[audit] product-duplicate', { admin: user.id, originalId: original.id, newId: data.id });

  return NextResponse.json({ id: data.id, slug: data.slug });
}
