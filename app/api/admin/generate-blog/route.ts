import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { rateLimit } from '@/lib/rate-limit';

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

function extractJson(raw: string): string {
  let s = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  const start = s.indexOf('{');
  const end   = s.lastIndexOf('}');
  if (start !== -1 && end > start) s = s.slice(start, end + 1);
  return s;
}

// ── Step 1: small JSON — title, slug, excerpts only ──────────────────────────
async function generateMeta(title_th: string, category: string) {
  const msg = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 600,
    messages: [{
      role: 'user',
      content: `Thai title: ${title_th}
Category: ${category || 'ความรู้พระเครื่อง'}

Translate to English and Chinese. Return ONLY this JSON (no markdown, no extra text):
{"title":"English title max 60 chars","title_zh":"中文标题","slug":"url-slug-hyphens-only","excerpt":"English excerpt max 150 chars","excerpt_th":"สรุปไทยไม่เกิน 150 ตัวอักษร","excerpt_zh":"中文摘要最多150字"}`,
    }],
  });
  const raw = (msg.content[0] as { type: string; text: string }).text.trim();
  return JSON.parse(extractJson(raw));
}

// ── Step 2: translate content — plain text with separator, no JSON ───────────
async function translateContent(title_th: string, content_th: string) {
  const msg = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `Translate this Thai Buddhist amulet blog content to English and Chinese.
Rules: monk/temple names keep as romanization (หลวงปู่ทวด → Luang Pu Tuad). Preserve HTML tags.

Thai title: ${title_th}
Thai content:
${content_th}

Reply in EXACTLY this format — two sections separated by the markers, nothing else:
===EN===
(English HTML translation here)
===ZH===
(Chinese HTML translation here)`,
    }],
  });
  const raw = (msg.content[0] as { type: string; text: string }).text.trim();
  const enMatch = raw.match(/===EN===([\s\S]*?)(?:===ZH===|$)/);
  const zhMatch = raw.match(/===ZH===([\s\S]*?)$/);
  return {
    content:    enMatch ? enMatch[1].trim() : '',
    content_zh: zhMatch ? zhMatch[1].trim() : '',
  };
}

// ── Step 2b: write fresh content when no Thai content given ──────────────────
async function generateContent(title_th: string, titleEn: string, category: string) {
  const msg = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 3000,
    messages: [{
      role: 'user',
      content: `Write a short blog post about: ${title_th} (${titleEn})
Category: ${category}
Rules: monk/temple names as romanization. Use HTML: <h2><p><strong><ul><li>. 200-300 words per language.

Reply in EXACTLY this format:
===TH===
(Thai HTML content)
===EN===
(English HTML content)
===ZH===
(Chinese HTML content)`,
    }],
  });
  const raw = (msg.content[0] as { type: string; text: string }).text.trim();
  const thMatch = raw.match(/===TH===([\s\S]*?)(?:===EN===|$)/);
  const enMatch = raw.match(/===EN===([\s\S]*?)(?:===ZH===|$)/);
  const zhMatch = raw.match(/===ZH===([\s\S]*?)$/);
  return {
    content_th: thMatch ? thMatch[1].trim() : '',
    content:    enMatch ? enMatch[1].trim() : '',
    content_zh: zhMatch ? zhMatch[1].trim() : '',
  };
}

export async function POST(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  if (!(await rateLimit(`generate-blog:${ctx.user.id}`, 10))) {
    return NextResponse.json({ error: 'Rate limit: max 10 blog generations per hour' }, { status: 429 });
  }

  const body = await req.json();
  const { title_th, content_th, category } = body;

  if (!title_th?.trim()) return NextResponse.json({ error: 'title_th is required' }, { status: 400 });

  try {
    // Step 1: always generate metadata (small, reliable)
    const meta = await generateMeta(title_th, category || '');
    if (meta.slug) meta.slug = toSlug(meta.slug);
    else meta.slug = toSlug(meta.title || title_th);

    // Step 2: content
    let contentData: { content_th?: string; content: string; content_zh: string };
    if (content_th?.trim()) {
      contentData = await translateContent(title_th, content_th);
    } else {
      contentData = await generateContent(title_th, meta.title, category || '');
    }

    return NextResponse.json({ ...meta, ...contentData });
  } catch (e: any) {
    console.error('[generate-blog] failed:', e.message);
    return NextResponse.json({ error: `AI error: ${e.message}` }, { status: 500 });
  }
}
