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

// Extract JSON even if Claude wraps it in markdown or adds extra text
function extractJson(raw: string): string {
  // Remove markdown code blocks
  let s = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  // Find the first { and last }
  const start = s.indexOf('{');
  const end   = s.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    s = s.slice(start, end + 1);
  }
  return s;
}

export async function POST(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { title_th, content_th, category } = body;

  if (!title_th?.trim()) return NextResponse.json({ error: 'title_th is required' }, { status: 400 });

  const hasContent = !!(content_th?.trim());

  const prompt = hasContent
    ? `Translate this Thai Buddhist amulet blog post for dansiamamulets.com.

Thai title: ${title_th}
Thai content: ${content_th}

Rules:
- Monk/temple names: keep as romanization (หลวงปู่ทวด → Luang Pu Tuad)
- Use HTML in content: <h2>, <p>, <strong>, <ul><li>
- Excerpts: max 150 chars each
- Slug: lowercase English, hyphens only

Respond with ONLY this JSON object, nothing else, no markdown:
{"title":"English title","title_zh":"中文标题","slug":"url-slug","excerpt":"English excerpt","excerpt_th":"สรุปภาษาไทย","excerpt_zh":"中文摘要","content":"<p>English HTML content...</p>","content_zh":"<p>中文HTML内容...</p>"}`
    : `Write a short Thai Buddhist amulet blog post for dansiamamulets.com.

Topic (Thai): ${title_th}
Category: ${category || 'ความรู้พระเครื่อง'}

Rules:
- Monk/temple names: keep as romanization (หลวงปู่ทวด → Luang Pu Tuad)
- Use HTML: <h2>, <p>, <strong>, <ul><li>
- Content: 200-300 words per language
- Excerpts: max 150 chars each

Respond with ONLY this JSON object, nothing else, no markdown:
{"title":"English title","title_zh":"中文标题","slug":"url-slug","excerpt":"English excerpt","excerpt_th":"สรุปภาษาไทย","excerpt_zh":"中文摘要","content":"<p>English HTML...</p>","content_th":"<p>เนื้อหาไทย HTML...</p>","content_zh":"<p>中文HTML...</p>"}`;

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 3000,
    messages: [{ role: 'user', content: prompt }],
  });

  const raw = (msg.content[0] as { type: string; text: string }).text.trim();
  const cleaned = extractJson(raw);

  try {
    const data = JSON.parse(cleaned);
    // Ensure slug is clean
    if (data.slug) data.slug = toSlug(data.slug);
    else if (data.title) data.slug = toSlug(data.title);
    return NextResponse.json(data);
  } catch (err) {
    console.error('[generate-blog] JSON parse failed. Raw:', raw.slice(0, 500));
    return NextResponse.json({ error: 'AI returned invalid JSON. Please try again.' }, { status: 500 });
  }
}
