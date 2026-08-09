import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return null;
  return { user, admin };
}

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const BLOCKED_HOSTS = /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|0\.0\.0\.0|::1)/i;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB



export async function POST(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { name, name_th, slug, price, sale_price, stock, category, description, description_th, short, images, published } = body;

  if (!name || !slug || typeof price !== 'number') {
    return NextResponse.json({ error: 'Missing required fields: name, slug, price' }, { status: 400 });
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: 'Slug must be lowercase letters, numbers and hyphens only' }, { status: 400 });
  }
  if (price < 0 || price > 100_000_000) {
    return NextResponse.json({ error: 'Invalid price' }, { status: 400 });
  }
  if (name.length > 500 || slug.length > 200) {
    return NextResponse.json({ error: 'Name or slug too long' }, { status: 400 });
  }



  const { data, error } = await ctx.admin
    .from('products')
    .insert({
      name,
      name_th: name_th || name,
      slug,
      price,
      sale_price: sale_price ?? null,
      stock: stock ?? 1,
      category: category || 'เครื่องราง',
      description: description || '',
      description_th: description_th || '',
      short: short || '',
      images: images ?? [],
      published: published ?? false,
    })
    .select('id, slug')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('[audit] product-create', { admin: ctx.user.id, productId: data.id, slug: data.slug });

  return NextResponse.json({ id: data.id, slug: data.slug });
}
