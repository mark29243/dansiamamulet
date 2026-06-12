import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { sanitizeHtml } from '@/lib/sanitize-html';

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

// GET — list all posts (admin sees all, including unpublished)
export async function GET() {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { data, error } = await ctx.admin
    .from('blog_posts')
    .select('id, slug, title, title_th, category, published, views, created_at, cover_image')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data });
}

// POST — create new post
export async function POST(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { title, title_th, title_zh, slug, excerpt, excerpt_th, excerpt_zh,
          content, content_th, content_zh, cover_image, category, published } = body;

  if (!title?.trim() || !slug?.trim()) {
    return NextResponse.json({ error: 'title and slug are required' }, { status: 400 });
  }

  const { data, error } = await ctx.admin
    .from('blog_posts')
    .insert({
      title: title.trim(),
      title_th: title_th?.trim() || null,
      title_zh: title_zh?.trim() || null,
      slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
      excerpt: excerpt?.trim() || null,
      excerpt_th: excerpt_th?.trim() || null,
      excerpt_zh: excerpt_zh?.trim() || null,
      content: sanitizeHtml(content?.trim()) || '',
      content_th: sanitizeHtml(content_th?.trim()) || null,
      content_zh: sanitizeHtml(content_zh?.trim()) || null,
      cover_image: cover_image || null,
      category: category?.trim() || null,
      published: published === true,
    })
    .select('id, slug')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  console.log('[audit] blog-create', { admin: ctx.user.id, id: data.id, slug: data.slug });
  return NextResponse.json({ post: data });
}
