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

async function rehostImage(url: string, admin: ReturnType<typeof createAdminClient>): Promise<string> {
  try {
    const res = await fetch(url, {
      headers: { 'Referer': 'https://shopee.co.th/', 'User-Agent': 'Mozilla/5.0' },
    });
    if (!res.ok) return url;

    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = await res.arrayBuffer();

    const { error } = await admin.storage
      .from('products')
      .upload(filename, buffer, { contentType, upsert: false });

    if (error) return url;

    const { data } = admin.storage.from('products').getPublicUrl(filename);
    return data.publicUrl;
  } catch {
    return url;
  }
}

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

  // Rehost all images from Shopee CDN → Supabase Storage
  const rehostedImages = await Promise.all(
    (images ?? []).map((url: string) => rehostImage(url, ctx.admin))
  );

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
      images: rehostedImages,
      published: published ?? false,
    })
    .select('id, slug')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id, slug: data.slug });
}
