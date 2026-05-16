import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

async function rehostImage(url: string, admin: ReturnType<typeof createAdminClient>): Promise<string> {
  if (!url.includes('susercontent.com')) return url;
  try {
    const res = await fetch(url, {
      headers: { 'Referer': 'https://shopee.co.th/', 'User-Agent': 'Mozilla/5.0' },
    });
    if (!res.ok) return url;
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = await res.arrayBuffer();
    const { error } = await admin.storage.from('products').upload(filename, buffer, { contentType });
    if (error) return url;
    const { data } = admin.storage.from('products').getPublicUrl(filename);
    return data.publicUrl;
  } catch {
    return url;
  }
}

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const admin = createAdminClient();
  const { data: adminCheck } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!adminCheck) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { ids } = await req.json();
  const { data: products } = await admin.from('products').select('id, images').in('id', ids);
  if (!products?.length) return NextResponse.json({ error: 'No products found' });

  const results = [];
  for (const p of products) {
    const newImages = await Promise.all((p.images as string[]).map((url) => rehostImage(url, admin)));
    await admin.from('products').update({ images: newImages }).eq('id', p.id);
    results.push({ id: p.id, images: newImages });
  }

  return NextResponse.json({ migrated: results });
}
