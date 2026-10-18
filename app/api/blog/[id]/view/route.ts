import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getIp } from '@/lib/rate-limit';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const target = params.id;
  if (!target || target.trim() === '') {
    return NextResponse.json({ ok: false, error: 'Target identifier required' }, { status: 400 });
  }

  // Rate limit: max 30 blog view events per IP per minute
  if (!(await rateLimit(`blog_view:${getIp(req)}`, 30, 60_000))) {
    return NextResponse.json({ ok: false, error: 'Rate limited' }, { status: 429 });
  }

  const admin = createAdminClient();
  const isNumeric = /^\d+$/.test(target);

  try {
    if (isNumeric) {
      const blogId = parseInt(target);
      // Attempt RPC first if configured
      const { error: rpcError } = await admin.rpc('increment_blog_views', { blog_id: blogId });
      if (rpcError) {
        // Direct increment fallback
        const { data: post } = await admin
          .from('blog_posts')
          .select('views')
          .eq('id', blogId)
          .single();

        if (post) {
          await admin
            .from('blog_posts')
            .update({ views: (post.views ?? 0) + 1 })
            .eq('id', blogId);
        }
      }
    } else {
      // By slug
      const { data: post } = await admin
        .from('blog_posts')
        .select('id, views')
        .eq('slug', target)
        .single();

      if (post) {
        await admin
          .from('blog_posts')
          .update({ views: (post.views ?? 0) + 1 })
          .eq('id', post.id);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[blog-view-counter] Error incrementing blog views:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
