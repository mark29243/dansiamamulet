import Anthropic from '@anthropic-ai/sdk';
import type { SupabaseClient } from '@supabase/supabase-js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

export type SeoResult = {
  name: string;
  slug: string;
  short: string;
  description: string;
  description_th: string;
};

export async function generateSeo(nameTh: string, descTh: string, _category: string): Promise<SeoResult> {
  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    messages: [{
      role: 'user',
      content: `Translate this Thai Buddhist amulet listing to English and create a URL slug. Translate literally — do NOT add adjectives, claims, or marketing words not present in the original (no "authentic", "rare", "sacred", "blessed", "collectible", etc.). Translate names, places, and years as-is.

Thai name: ${nameTh}
Thai description: ${descTh || nameTh}

Return ONLY valid JSON:
{
  "name": "Direct English translation of the name only",
  "slug": "url-slug-lowercase-hyphens-only-from-key-terms",
  "description": "Direct English translation of the Thai description"
}`,
    }],
  });

  const raw = (msg.content[0] as { type: string; text: string }).text.trim();
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  let parsed: { name: string; slug: string; description: string };
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    console.error('[seo] JSON parse failed. Raw response:', raw);
    throw new Error(`Claude returned invalid JSON: ${raw.slice(0, 200)}`);
  }
  return {
    name: parsed.name,
    slug: parsed.slug,
    short: nameTh,
    description: parsed.description || parsed.name,
    description_th: descTh || nameTh,
  };
}

export async function processDraft(
  admin: SupabaseClient,
  draft: { id: number; name_th: string; description_th: string | null; category: string | null },
  usedSlugs: Set<string>,
): Promise<{ id: number; slug: string }> {
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
      name: seo.name,
      slug,
      short: seo.short,
      description: seo.description,
      description_th: seo.description_th,
      published: true,
    })
    .eq('id', draft.id);

  if (error) throw new Error(error.message);

  return { id: draft.id, slug };
}
