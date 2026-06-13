import Anthropic from '@anthropic-ai/sdk';
import type { SupabaseClient } from '@supabase/supabase-js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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
  description: string;    // Full English SEO description (350-450 words)
  description_th: string; // Full Thai SEO description
  name_zh: string;
  description_zh: string; // Full Chinese SEO description
};

const hasThai   = (s?: string | null) => !!s && /[฀-๿]/.test(s);
const hasChinese = (s?: string | null) => !!s && /[一-鿿㐀-䶿]/.test(s);

type RawParsed = {
  name?: string;
  slug?: string;
  short?: string;
  description?: string;
  description_th?: string;
  description_zh?: string;
};

function validateParsed(p: RawParsed): string[] {
  const errors: string[] = [];
  if (!p.name || hasThai(p.name))                     errors.push('name must be English');
  if (!p.short || hasThai(p.short))                   errors.push('short must be English meta description');
  if (!p.description || hasThai(p.description))       errors.push('description must be English');
  if ((p.description?.length ?? 0) < 200)             errors.push('description too short (need 200+ chars)');
  if (!p.description_th || !hasThai(p.description_th)) errors.push('description_th must be Thai');
  if (!p.description_zh || !hasChinese(p.description_zh)) errors.push('description_zh must be Chinese');
  return errors;
}

async function callClaude(nameTh: string, descTh: string, category: string, attempt: number): Promise<RawParsed> {
  const retryNote = attempt > 1
    ? `\n\nPREVIOUS ATTEMPT FAILED. Fix these issues:\n- "name", "short", "description" must contain ZERO Thai characters\n- "description_th" must contain Thai characters\n- "description_zh" must contain Chinese characters\n- "description" must be at least 350 words`
    : '';

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: `You are an expert SEO copywriter for Thai Buddhist amulets. Write a complete, high-quality product listing that ranks well on Google for international collectors.

PRODUCT INFO:
Thai name: ${nameTh}
Category: ${category || 'Thai amulet'}
Seller notes (Thai): ${(descTh || nameTh).slice(0, 800)}
${retryNote}

ROMANIZATION RULES (apply everywhere):
- หลวงปู่/หลวงพ่อ + name → Luang Pu / Luang Pho + romanized name
- วัด → Wat (e.g. วัดช้างให้ → Wat Chang Hai)
- พ.ศ. years → B.E. (e.g. พ.ศ. 2511 → B.E. 2511)
- จ./อ./ต. → province/district/subdistrict names romanized

Return ONLY a raw JSON object with exactly these 6 fields:

{
  "name": "English product name — translate literally, romanize monk/temple names, convert years to B.E. No Thai chars. Max 120 chars.",

  "slug": "url-slug from English name, lowercase letters/numbers/hyphens only, max 60 chars",

  "short": "English meta description for Google search results. 140-155 characters exactly. Include: amulet type + monk name + key blessing + 'authentic'. Example: 'Authentic Luang Pu Tuad first-edition copper amulet from Wat Chang Hai B.E.2511 — protection & luck. Certified genuine, worldwide shipping.'",

  "description": "Full English SEO product description. Must be 350-450 words. Write in this structure:\n\n**Paragraph 1 — Hook (60 words):** Amulet name, monk, temple, year. What makes it special. Include keyword '[monk name] amulet authentic'.\n\n**Paragraph 2 — About the monk (80 words):** Legendary background of the monk — birthplace, temple, most famous miracle or story, why Thai people deeply revere them. Include keyword 'Thai Buddhist monk'.\n\n**Paragraph 3 — Spiritual powers (80 words):** Specific Thai Buddhist blessings (พุทธคุณ) this amulet is believed to bestow — protection, wealth, metta, invincibility, etc. How to wear/venerate it. Include keyword 'Thai Buddhist amulet blessing'.\n\n**Paragraph 4 — Physical details (70 words):** Material (copper/silver/powder/clay), mould type (first/second edition), markings, size, condition, rarity in the collector market. Include keyword 'rare Thai amulet collector'.\n\n**Paragraph 5 — Authenticity (60 words):** Every piece certified authentic by 20+ year experts. Comes with certificate. Worldwide shipping. Satisfaction guarantee. Include keywords 'authentic Thai amulet' and 'buy [monk name] amulet'.\n\nIMPORTANT: No Thai characters anywhere in this field.",

  "description_th": "คำอธิบายสินค้าภาษาไทยฉบับเต็ม 300-400 คำ ให้เขียนแบบ SEO สำหรับนักสะสมพระไทย โครงสร้าง:\n\nย่อหน้า 1 (60 คำ): แนะนำพระ องค์หลวงพ่อ/หลวงปู่ วัด ปีที่สร้าง พุทธคุณเด่น\nย่อหน้า 2 (80 คำ): ประวัติหลวงพ่อ/หลวงปู่ ตำนาน ปาฏิหาริย์ที่เป็นที่รู้จัก\nย่อหน้า 3 (80 คำ): พุทธคุณ วิธีบูชา มนต์คาถา ประโยชน์ที่ได้รับ\nย่อหน้า 4 (50 คำ): เนื้อหา พิมพ์ทรง ความหายาก สภาพ\nย่อหน้า 5 (40 คำ): รับประกันแท้ ใบรับรอง จัดส่งทั่วโลก\nต้องมีตัวอักษรไทยในฟิลด์นี้",

  "description_zh": "完整的中文产品描述，200-280个汉字。结构：\n第1段：佛牌名称、高僧、寺庙、年份、主要功效\n第2段：高僧传说背景，为何受泰国人崇敬\n第3段：此佛牌的具体功效（保护/财运/慈悲等）\n第4段：材质、版别、稀有度\n第5段：正品认证，全球配送\n必须包含汉字"
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
  let lastErrors: string[] = [];

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      parsed = await callClaude(nameTh, descTh, category, attempt);
      lastErrors = validateParsed(parsed);
      if (lastErrors.length === 0) {
        console.log(`[seo] attempt ${attempt} OK`);
        break;
      }
      console.warn(`[seo] attempt ${attempt} validation errors:`, lastErrors);
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

  const resolvedDescTh = typeof parsed.description_th === 'string' && hasThai(parsed.description_th)
    ? parsed.description_th.trim()
    : (descTh || nameTh);

  const resolvedDescZh = typeof parsed.description_zh === 'string' && hasChinese(parsed.description_zh)
    ? parsed.description_zh.trim()
    : '';

  return {
    name:           resolvedName,
    slug:           resolvedSlug,
    short:          resolvedShort,
    description:    resolvedDesc,
    description_th: resolvedDescTh,
    name_zh:        '',
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
      description_th: draft.description_th?.trim() || seo.description_th,
      name_zh:        seo.name_zh,
      description_zh: seo.description_zh,
    })
    .eq('id', draft.id);

  if (error) throw new Error(error.message);

  return { id: draft.id, slug, name: seo.name, short: seo.short };
}
