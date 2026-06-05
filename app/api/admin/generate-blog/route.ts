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

  const { topic, category } = await req.json();
  if (!topic?.trim()) return NextResponse.json({ error: 'topic is required' }, { status: 400 });

  const msg = await client.messages.create({
    model: 'claude-sonnet-4-5-20251001',
    max_tokens: 3000,
    messages: [{
      role: 'user',
      content: `You are a Thai Buddhist amulet expert writing SEO-optimized blog content for Dan Siam Amulets (dansiamamulets.com).

Topic: ${topic}
Category: ${category || 'ความรู้พระเครื่อง'}

Write a complete blog post in all 3 languages. The content should be:
- Informative and accurate about Thai Buddhist amulets
- SEO-optimized (use the topic keywords naturally)
- Helpful for collectors and buyers
- 400-600 words per language for content
- Include practical information (history, sacred properties, how to identify genuine pieces, etc.)
- Monk/temple names: romanize in English and Chinese (e.g. หลวงปู่ทวด → Luang Pu Tuad)

Return ONLY valid JSON (no markdown):
{
  "title": "SEO-optimized English title (max 60 chars)",
  "title_th": "Thai title",
  "title_zh": "Chinese title (keep monk/temple names as romanization)",
  "slug": "url-slug-lowercase-hyphens",
  "excerpt": "English meta description (max 155 chars, compelling)",
  "excerpt_th": "Thai excerpt (max 155 chars)",
  "excerpt_zh": "Chinese excerpt (max 155 chars)",
  "content": "English HTML content (use <h2>, <p>, <strong>, <ul><li> tags)",
  "content_th": "Thai HTML content",
  "content_zh": "Chinese HTML content"
}`,
    }],
  });

  const raw = (msg.content[0] as { type: string; text: string }).text.trim();
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

  try {
    const data = JSON.parse(cleaned);
    // Ensure slug is clean
    if (data.slug) data.slug = toSlug(data.slug);
    else if (data.title) data.slug = toSlug(data.title);
    return NextResponse.json(data);
  } catch {
    console.error('[generate-blog] JSON parse failed:', raw.slice(0, 300));
    return NextResponse.json({ error: 'AI returned invalid JSON. Please try again.' }, { status: 500 });
  }
}
