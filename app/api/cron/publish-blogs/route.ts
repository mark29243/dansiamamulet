import { NextResponse } from 'next/server';
import { createAdminClient, requireAdmin } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isValidCronSecret(req: Request): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return false;
  const authHeader = req.headers.get('authorization') ?? '';
  const expected = `Bearer ${cronSecret}`;
  const enc = new TextEncoder();
  const a = enc.encode(authHeader.padEnd(expected.length));
  const b = enc.encode(expected.padEnd(authHeader.length));
  let mismatch = a.length !== b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    mismatch = ((a[i] ?? 0) ^ (b[i] ?? 0)) !== 0 || mismatch;
  }
  return !mismatch;
}

export async function GET(req: Request) {
  try {
    // 1. Authenticate cron job via CRON_SECRET or authenticated Admin session
    if (!isValidCronSecret(req)) {
      const adminCtx = await requireAdmin();
      if (!adminCtx) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const admin = createAdminClient();

    // 2. Fetch the next 2 unpublished approved blog posts ordered by ID
    const { data: drafts, error } = await admin
      .from('blog_posts')
      .select('id, slug, title, title_th')
      .eq('published', false)
      .order('id', { ascending: true })
      .limit(2);

    if (error) {
      console.error('[cron/publish-blogs] Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!drafts || drafts.length === 0) {
      return NextResponse.json({ message: 'No pending blog drafts in queue.', published: [] });
    }

    const now = new Date().toISOString();
    const publishedList = [];

    // 3. Publish the 2 drafts and update publication timestamp
    for (const draft of drafts) {
      const { error: updateError } = await admin
        .from('blog_posts')
        .update({
          published: true,
          created_at: now,
          updated_at: now
        })
        .eq('id', draft.id);

      if (updateError) {
        console.error(`[cron/publish-blogs] Failed to publish #${draft.id}:`, updateError.message);
      } else {
        publishedList.push({ id: draft.id, slug: draft.slug, title: draft.title_th || draft.title });
      }
    }

    return NextResponse.json({
      success: true,
      published_at: now,
      count: publishedList.length,
      published: publishedList
    });
  } catch (err: any) {
    console.error('[cron/publish-blogs] Unexpected error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
