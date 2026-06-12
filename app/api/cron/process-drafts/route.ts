import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

async function generateSeo(nameTh: string, descTh: string, category: string) {
  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 800,
    messages: [{
      role: 'user',
      content: `You are an SEO expert for a Thai Buddhist amulet e-commerce store (dansiamamulets.com).

Product info:
- Thai name: ${nameTh}
- Category: ${category}
- Thai notes: ${descTh || 'none'}

Generate JSON with these fields:
{
  "name": "English product name (concise, SEO-friendly, 5-10 words)",
  "slug": "url-slug-lowercase-hyphens-only (include key terms like temple, year if known)",
  "short": "One sentence English description for search results (max 160 chars)",
  "description": "2-3 paragraph English description covering: what it is, the temple/monk, spiritual significance, collectibility. Optimized for SEO.",
  "description_th": "2-3 paragraph Thai description covering the same topics naturally"
}

Return ONLY valid JSON, no markdown.`,
    }],
  });

  const text = (msg.content[0] as { type: string; text: string }).text.trim();
  return JSON.parse(text);
}

export async function GET(req: Request) {
  // Verify Vercel cron secret (timing-safe to prevent timing attacks)
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error('[cron] CRON_SECRET env var is not set — refusing all requests');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const authHeader = req.headers.get('authorization') ?? '';
  const expected = `Bearer ${cronSecret}`;
  const enc = new TextEncoder();
  const a = enc.encode(authHeader.padEnd(expected.length));
  const b = enc.encode(expected.padEnd(authHeader.length));
  let mismatch = a.length !== b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) mismatch = ((a[i] ?? 0) ^ (b[i] ?? 0)) !== 0 || mismatch;
  if (mismatch) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const admin = createAdminClient();

  // Fetch all unpublished draft products
  const { data: drafts, error } = await admin
    .from('products')
    .select('id, name_th, description_th, category')
    .eq('published', false)
    .like('slug', 'draft-%')
    .order('id', { ascending: true });

  if (error) {
    console.error('[cron] fetch drafts error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!drafts?.length) {
    console.log('[cron] No drafts to process');
    return NextResponse.json({ processed: 0 });
  }

  console.log(`[cron] Processing ${drafts.length} draft(s)...`);

  const results: { id: number; slug: string; status: string }[] = [];

  // Fetch existing slugs to avoid collisions
  const { data: existingSlugs } = await admin
    .from('products')
    .select('slug');
  const usedSlugs = new Set((existingSlugs ?? []).map((p) => p.slug));

  for (const draft of drafts) {
    try {
      const seo = await generateSeo(draft.name_th, draft.description_th ?? '', draft.category ?? '');

      // Ensure slug is unique
      let slug = toSlug(seo.slug || seo.name);
      let attempt = 0;
      while (usedSlugs.has(slug)) {
        attempt++;
        slug = `${toSlug(seo.slug || seo.name)}-${attempt}`;
      }
      usedSlugs.add(slug);

      const { error: updateErr } = await admin
        .from('products')
        .update({
          name: seo.name,
          slug,
          short: seo.short,
          description: seo.description,
          description_th: seo.description_th,
          published: true,
        })
        .eq('id', draft.id);

      if (updateErr) throw updateErr;

      console.log(`[cron] ✓ Draft ${draft.id} → published as "${slug}"`);
      results.push({ id: draft.id, slug, status: 'published' });
    } catch (e: any) {
      console.error(`[cron] ✗ Draft ${draft.id} failed:`, e.message);
      results.push({ id: draft.id, slug: '', status: `error: ${e.message}` });
    }
  }

  return NextResponse.json({ processed: results.length, results });
}
