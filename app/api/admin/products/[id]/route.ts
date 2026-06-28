import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { notifyGoogleIndex } from '@/lib/google-indexing';
import { processDraft } from '@/lib/seo';

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

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();

  // Publishing a product whose slug is still a draft placeholder:
  // run full SEO (generates a real slug + EN/ZH translations) instead of a
  // bare published flag flip, so it never goes live with a draft-... URL.
  if (body.published === true) {
    const { data: current } = await ctx.admin
      .from('products')
      .select('id, slug, name, name_th, description_th, category')
      .eq('id', parseInt(params.id))
      .single();
    const needsProcessing =
      current &&
      typeof current.slug === 'string' &&
      (current.slug.startsWith('draft-') || /[ก-๙]/.test(current.name ?? ''));
    if (needsProcessing) {
      const { data: existingSlugs } = await ctx.admin.from('products').select('slug').neq('id', current.id);
      const usedSlugs = new Set((existingSlugs ?? []).map((p: any) => p.slug));
      try {
        const result = await processDraft(ctx.admin, current, usedSlugs);
        await ctx.admin.from('products').update({ published: true }).eq('id', result.id);
        const { data: updated } = await ctx.admin.from('products').select('*').eq('id', result.id).single();
        if (updated?.slug) {
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dansiamamulets.com';
          await notifyGoogleIndex(`${siteUrl}/product/${updated.slug}`);
        }
        console.log('[audit] product-publish-draft', { admin: ctx.user.id, productId: params.id, slug: result.slug });
        return NextResponse.json({ product: updated });
      } catch (e: any) {
        console.error('[publish-draft] failed', { id: params.id, error: e.message });
        return NextResponse.json({ error: e.message }, { status: 500 });
      }
    }
  }

  const allowed: any = {};
  if (typeof body.stock === 'number') allowed.stock = Math.max(0, body.stock);
  if (typeof body.published === 'boolean') allowed.published = body.published;
  if (typeof body.price === 'number') allowed.price = body.price;
  if (typeof body.sale_price === 'number' || body.sale_price === null) allowed.sale_price = body.sale_price;
  if (typeof body.is_featured === 'boolean') allowed.is_featured = body.is_featured;
  if (typeof body.name_th === 'string') allowed.name_th = body.name_th.trim();
  if (typeof body.description_th === 'string') allowed.description_th = body.description_th.trim();
  if (typeof body.name === 'string') allowed.name = body.name.trim();
  if (typeof body.description === 'string') allowed.description = body.description.trim();
  if (typeof body.name_zh === 'string') allowed.name_zh = body.name_zh.trim();
  if (typeof body.description_zh === 'string') allowed.description_zh = body.description_zh.trim();
  if (typeof body.short === 'string') allowed.short = body.short.trim();
  if (typeof body.category === 'string') allowed.category = body.category.trim();
  if (typeof body.name_shopee === 'string' || body.name_shopee === null) allowed.name_shopee = typeof body.name_shopee === 'string' ? body.name_shopee.trim() : null;
  if (typeof body.name_shopee2 === 'string' || body.name_shopee2 === null) allowed.name_shopee2 = typeof body.name_shopee2 === 'string' ? body.name_shopee2.trim() : null;
  if (Array.isArray(body.images) && body.images.every((u: unknown) => typeof u === 'string' && u.length > 0 && u.length <= 1000)) {
    allowed.images = body.images.slice(0, 12);
  }

  if (Object.keys(allowed).length === 0) {
    return NextResponse.json({ error: 'No valid fields' }, { status: 400 });
  }

  const { data, error } = await ctx.admin
    .from('products')
    .update(allowed)
    .eq('id', parseInt(params.id))
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('[audit] product-update', { admin: ctx.user.id, productId: params.id, updates: allowed });

  // Notify Google to index immediately when product is published
  if (allowed.published === true && data?.slug) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dansiamamulets.com';
    await notifyGoogleIndex(`${siteUrl}/product/${data.slug}`);
  }

  return NextResponse.json({ product: data });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { error } = await ctx.admin
    .from('products')
    .delete()
    .eq('id', parseInt(params.id));

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  console.log('[audit] product-delete', { admin: ctx.user.id, productId: params.id });

  return NextResponse.json({ ok: true });
}
