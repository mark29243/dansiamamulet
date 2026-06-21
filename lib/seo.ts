import Anthropic from '@anthropic-ai/sdk';
import type { SupabaseClient } from '@supabase/supabase-js';

export function toSlug(text: string | null | undefined): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

export type SeoResult = {
  name: string;           // English name
  slug: string;
  short: string;          // English meta description (140-155 chars)
  description: string;    // Full English SEO description
  description_zh: string; // Full Chinese SEO description
};

const hasThai    = (s?: string | null) => !!s && /[฀-๿]/.test(s);
const hasChinese = (s?: string | null) => !!s && /[一-鿿㐀-䶿]/.test(s);

type RawParsed = {
  name?: string;
  slug?: string;
  short?: string;
  description?: string;
  description_zh?: string;
};

function validateParsed(p: RawParsed): string[] {
  const errors: string[] = [];
  if (!p.name || hasThai(p.name))               errors.push('name must be English');
  if (!p.short || hasThai(p.short))             errors.push('short must be English meta description');
  if (!p.description || hasThai(p.description)) errors.push('description must be English');
  if ((p.description?.length ?? 0) < 200)       errors.push('description too short (need 200+ chars)');
  if (!p.description_zh || !hasChinese(p.description_zh)) errors.push('description_zh must be Chinese');
  return errors;
}

async function callClaude(nameTh: string, descTh: string, category: string, attempt: number): Promise<RawParsed> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const retryNote = attempt > 1
    ? `\n\nPREVIOUS ATTEMPT FAILED. Fix these issues:\n- "name", "short", "description" must contain ZERO Thai characters\n- "description_zh" must contain Chinese characters\n- "description" must be at least 200 characters`
    : '';

  const sourceText = (descTh || nameTh).slice(0, 800);

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 3000,
    messages: [
      {
        role: 'user',
        content: `You are an SEO expert for a Thai Buddhist amulet shop. Your job is to translate and expand the seller's Thai notes into English and Chinese product content.

PRODUCT INFO:
Thai name: ${nameTh}
Category: ${category || 'Thai amulet'}
Seller's Thai description: ${sourceText}
${retryNote}

ROMANIZATION RULES:
- หลวงปู่/หลวงพ่อ + name → Luang Pu / Luang Pho + romanized name
- วัด → Wat (e.g. วัดช้างให้ → Wat Chang Hai)
- พ.ศ. years → B.E. (e.g. พ.ศ. 2511 → B.E. 2511)

IMPORTANT: Translate directly from the seller's Thai description. Do not add, expand, or invent anything not in the original text.

Return ONLY a raw JSON object with exactly these 5 fields:

{
  "name": "English product name — translate the Thai name literally, romanize monk/temple names, convert B.E. years. No Thai chars. Max 120 chars.",

  "slug": "url-slug from English name, lowercase letters/numbers/hyphens only, max 60 chars",

  "short": "English meta description for Google. 140-155 characters. Summarise the key details from the seller's notes: amulet type, monk/temple, year, material, blessing. No Thai chars.",

  "description": "Translate the seller's Thai notes into English. Translate faithfully — do not add, invent, or embellish anything not in the original. Keep the same length and tone. No Thai characters.",

  "description_zh": "将卖家的泰文说明直接翻译成中文。忠实翻译，不添加、不发挥、不虚构原文没有的内容。保持相同长度和语气。必须包含汉字。"
}`,
      },
      {
        role: 'assistant',
        content: '{"name":',
      },
    ],
  });

  const raw = ('{"name":' + (msg.content[0] as { type: string; text: string }).text).trim();

  function extractJson(s: string): string {
    const objMatch = s.match(/\{[\s\S]*\}/);
    if (objMatch) return objMatch[0];
    const fenceMatch = s.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (fenceMatch) return fenceMatch[1].trim();
    return s;
  }

  const cleaned = extractJson(raw);
  try {
    return JSON.parse(cleaned) as RawParsed;
  } catch {
    console.error(`[seo] attempt ${attempt} JSON parse failed. Raw:`, raw.slice(0, 300));
    throw new Error(`Claude returned invalid JSON: ${raw.slice(0, 200)}`);
  }
}

export async function generateSeo(nameTh: string, descTh: string, category: string): Promise<SeoResult> {
  const MAX_ATTEMPTS = 3;
  let parsed: RawParsed = {};

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      parsed = await callClaude(nameTh, descTh, category, attempt);
      const errors = validateParsed(parsed);
      if (errors.length === 0) {
        console.log(`[seo] attempt ${attempt} OK`);
        break;
      }
      console.warn(`[seo] attempt ${attempt} validation errors:`, errors);
      if (attempt === MAX_ATTEMPTS) {
        console.error('[seo] all attempts failed, using best-effort fallback');
      }
    } catch (e: any) {
      if (attempt === MAX_ATTEMPTS) throw e;
      console.warn(`[seo] attempt ${attempt} error, retrying:`, e.message);
    }
  }

  const resolvedName = typeof parsed.name === 'string' && parsed.name.trim() && !hasThai(parsed.name)
    ? parsed.name.trim()
    : nameTh.slice(0, 120);

  const resolvedSlug = typeof parsed.slug === 'string' && parsed.slug.trim()
    ? parsed.slug.trim()
    : toSlug(resolvedName);

  const resolvedShort = typeof parsed.short === 'string' && parsed.short.trim() && !hasThai(parsed.short)
    ? parsed.short.slice(0, 160).trim()
    : resolvedName.slice(0, 155);

  const resolvedDesc = typeof parsed.description === 'string' && parsed.description.trim() && !hasThai(parsed.description)
    ? parsed.description.trim()
    : resolvedName;

  const resolvedDescZh = typeof parsed.description_zh === 'string' && hasChinese(parsed.description_zh)
    ? parsed.description_zh.trim()
    : '';

  return {
    name:           resolvedName,
    slug:           resolvedSlug,
    short:          resolvedShort,
    description:    resolvedDesc,
    description_zh: resolvedDescZh,
  };
}

export async function processDraft(
  admin: SupabaseClient,
  draft: { id: number; name_th: string; description_th: string | null; category: string | null },
  usedSlugs: Set<string>,
): Promise<{ id: number; slug: string; name: string; short: string }> {
  const seo = await generateSeo(draft.name_th, draft.description_th ?? '', draft.category ?? '');

  let slug = toSlug(seo.slug || seo.name);
  let attempt = 0;
  while (usedSlugs.has(slug)) {
    attempt++;
    slug = `${toSlug(seo.slug || seo.name)}-${attempt}`;
  }
  usedSlugs.add(slug);

  const { error } = await admin
    .from('products')
    .update({
      name:           seo.name,
      slug,
      short:          seo.short,
      description:    seo.description,
      // description_th is never overwritten — always kept as the seller's original
      description_zh: seo.description_zh,
    })
    .eq('id', draft.id);

  if (error) throw new Error(error.message);

  return { id: draft.id, slug, name: seo.name, short: seo.short };
}
