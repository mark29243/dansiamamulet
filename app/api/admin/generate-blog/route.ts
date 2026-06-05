import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 120;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return null;
  return { user, admin };
}

function toSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 80);
}

export async function POST(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { title_th, content_th, category } = body;

  if (!title_th?.trim()) return NextResponse.json({ error: 'title_th is required' }, { status: 400 });

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `You are a Thai Buddhist amulet expert for Dan Siam Amulets (dansiamamulets.com).

Thai title: ${title_th}
Category: ${category || 'ความรู้พระเครื่อง'}
${content_th ? `\nThai content:\n${content_th}` : ''}

Tasks:
1. Translate the Thai title to English and Chinese
2. Generate a clean URL slug from the English title (lowercase, hyphens only)
3. Write excerpt/summary in all 3 languages (max 155 chars each)
4. ${content_th ? 'Translate the Thai content to English and Chinese' : 'Write full blog content in all 3 languages (400-600 words each)'}
5. Monk/temple names: keep as romanization in EN and ZH (e.g. หลวงปู่ทวด → Luang Pu Tuad)
6. Format content with HTML: <h2>, <p>, <strong>, <ul><li>

Return ONLY valid JSON (no markdown):
{
  "title": "English title (max 60 chars, SEO-optimized)",
  "title_zh": "Chinese title",
  "slug": "url-slug-lowercase-hyphens-only",
  "excerpt": "English meta description max 155 chars",
  "excerpt_th": "Thai excerpt max 155 chars",
  "excerpt_zh": "Chinese excerpt max 155 chars",
  "content": "English HTML content",
  "content_zh": "Chinese HTML content"
}`,
    }],
  });

  const raw = (msg.content[0] as { type: string; text: string }).text.trim();
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

  try {
    const data = JSON.parse(cleaned);
    if (data.slug) data.slug = toSlug(data.slug);
    else if (data.title) data.slug = toSlug(data.title);
    return NextResponse.json(data);
  } catch {
    console.error('[generate-blog] JSON parse failed:', raw.slice(0, 300));
    return NextResponse.json({ error: 'AI returned invalid JSON. Please try again.' }, { status: 500 });
  }
}
