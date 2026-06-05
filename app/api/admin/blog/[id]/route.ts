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

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { data, error } = await ctx.admin
    .from('blog_posts')
    .select('*')
    .eq('id', parseInt(params.id))
    .single();

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ post: data });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const allowed: any = {};

  if (typeof body.title === 'string') allowed.title = body.title.trim();
  if (typeof body.title_th === 'string') allowed.title_th = body.title_th.trim() || null;
  if (typeof body.title_zh === 'string') allowed.title_zh = body.title_zh.trim() || null;
  if (typeof body.slug === 'string') allowed.slug = body.slug.trim().toLowerCase();
  if (typeof body.excerpt === 'string') allowed.excerpt = body.excerpt.trim() || null;
  if (typeof body.excerpt_th === 'string') allowed.excerpt_th = body.excerpt_th.trim() || null;
  if (typeof body.excerpt_zh === 'string') allowed.excerpt_zh = body.excerpt_zh.trim() || null;
  if (typeof body.content === 'string') allowed.content = body.content;
  if (typeof body.content_th === 'string') allowed.content_th = body.content_th || null;
  if (typeof body.content_zh === 'string') allowed.content_zh = body.content_zh || null;
  if (typeof body.cover_image === 'string' || body.cover_image === null) allowed.cover_image = body.cover_image;
  if (typeof body.category === 'string') allowed.category = body.category.trim() || null;
  if (typeof body.published === 'boolean') allowed.published = body.published;

  if (Object.keys(allowed).length === 0) {
    return NextResponse.json({ error: 'No valid fields' }, { status: 400 });
  }

  const { data, error } = await ctx.admin
    .from('blog_posts')
    .update(allowed)
    .eq('id', parseInt(params.id))
    .select('id, slug')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  console.log('[audit] blog-update', { admin: ctx.user.id, id: params.id, fields: Object.keys(allowed) });
  return NextResponse.json({ post: data });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { error } = await ctx.admin
    .from('blog_posts')
    .delete()
    .eq('id', parseInt(params.id));

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  console.log('[audit] blog-delete', { admin: ctx.user.id, id: params.id });
  return NextResponse.json({ ok: true });
}
