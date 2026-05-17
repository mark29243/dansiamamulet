import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return null;
  return { user, admin };
}

export async function POST(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const form = await req.formData();
  const file = form.get('file') as File;

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const mime = file.type || 'image/jpeg';
  if (!ALLOWED_MIME.includes(mime) && !mime.startsWith('image/')) {
    return NextResponse.json({ error: 'Only images allowed' }, { status: 400 });
  }
  if (file.size > 20 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (max 20MB)' }, { status: 400 });
  }

  const ext = mime.includes('png') ? 'png' : mime.includes('webp') ? 'webp' : 'jpg';
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = await file.arrayBuffer();

  const { error } = await ctx.admin.storage
    .from('products')
    .upload(filename, buffer, { contentType: mime, upsert: false });

  if (error) {
    console.error('[upload-image]', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const { data } = ctx.admin.storage.from('products').getPublicUrl(filename);
  return NextResponse.json({ url: data.publicUrl });
}
