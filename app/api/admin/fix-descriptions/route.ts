import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const maxDuration = 300;

const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return null;
  return admin;
}

const hasThai = (s?: string | null) => !!s && /[฀-๿]/.test(s);
const hasChinese = (s?: string | null) => !!s && /[一-鿿㐀-䶿]/.test(s);

async function translateDesc(descTh: string, nameTh: string): Promise<{ description: string; description_zh: string }> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const msg = await ai.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `Translate this Thai Buddhist amulet description into English and Chinese Simplified.

English rules:
- Translate literally, no added adjectives
- Monk/temple/place names: romanize (หลวงปู่ทวด → Luang Pu Tuad, วัดช้างให้ → Wat Chang Hai)
- Years พ.ศ.: convert to B.E. (พ.ศ. 2529 → B.E. 2529)
- "description" field MUST be in English — no Thai characters

Chinese rules:
- Monk/temple/place names: keep English romanization
- "description_zh" MUST contain Chinese characters
- Years: keep as-is (2529年)

Thai name: ${nameTh.slice(0, 100)}
Thai description: ${descTh.slice(0, 400)}

Return ONLY raw JSON with exactly 2 fields: description, description_zh`,
        },
        { role: 'assistant', content: '{"description":' },
      ],
    });

    const raw = '{"description":' + (msg.content[0] as { type: string; text: string }).text.trim();
    try {
      const obj = JSON.parse(raw.match(/\{[\s\S]*\}/)![0]) as {
        description?: string;
        description_zh?: string;
      };
      const desc = obj.description?.trim() ?? '';
      const descZh = obj.description_zh?.trim() ?? '';
      if (!hasThai(desc) && desc.length > 5 && hasChinese(descZh)) {
        return { description: desc, description_zh: descZh };
      }
      console.warn(`[fix-desc] attempt ${attempt} validation failed for: ${nameTh.slice(0, 40)}`);
    } catch {
      console.warn(`[fix-desc] attempt ${attempt} parse failed for: ${nameTh.slice(0, 40)}`);
    }
  }
  // Return empty strings — caller keeps original if both empty
  return { description: '', description_zh: '' };
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  // Rate limit: max 3 runs per hour (each run calls Claude ~50 times)
  const { data: { user } } = await (await import('@/lib/supabase/server')).createClient().auth.getUser();
  if (user && !(await rateLimit(`fix-descriptions:${user.id}`, 3))) {
    return NextResponse.json({ error: 'Rate limit: max 3 runs per hour' }, { status: 429 });
  }

  // Fetch products that need fixing:
  // - description contains Thai chars, OR
  // - description_zh is missing / has no Chinese chars
  const { data: products, error } = await admin
    .from('products')
    .select('id, name, name_th, description, description_th, description_zh')
    .eq('published', true)
    .or('description.is.null,description_zh.is.null');

  // Also fetch ones with Thai in description (Supabase can't do regex filter via JS SDK easily)
  const { data: allPublished } = await admin
    .from('products')
    .select('id, name, name_th, description, description_th, description_zh')
    .eq('published', true);

  const toFix = (allPublished ?? []).filter(p =>
    hasThai(p.description) || !hasChinese(p.description_zh)
  );

  if (toFix.length === 0) {
    return NextResponse.json({ fixed: 0, message: 'All descriptions look good!' });
  }

  console.log(`[fix-desc] Found ${toFix.length} products to fix`);

  // Process in parallel batches of 5 to stay within Vercel timeout
  const BATCH = 5;
  const results: { id: number; ok: boolean; name: string }[] = [];

  for (let i = 0; i < toFix.length; i += BATCH) {
    const batch = toFix.slice(i, i + BATCH);
    await Promise.all(batch.map(async (p) => {
      const sourceTh = p.description_th || p.name_th || p.name;
      const nameTh = p.name_th || p.name;

      try {
        const { description, description_zh } = await translateDesc(sourceTh, nameTh);

        const updates: Record<string, string> = {};
        if (description && !hasThai(description)) updates.description = description;
        if (description_zh && hasChinese(description_zh)) updates.description_zh = description_zh;

        if (Object.keys(updates).length === 0) {
          results.push({ id: p.id, ok: false, name: p.name });
          return;
        }

        const { error: updateErr } = await admin
          .from('products')
          .update(updates)
          .eq('id', p.id);

        results.push({ id: p.id, ok: !updateErr, name: p.name });
        if (updateErr) console.error(`[fix-desc] DB update failed for ${p.id}:`, updateErr.message);
        else console.log(`[fix-desc] ✓ Fixed product ${p.id}: ${p.name.slice(0, 40)}`);
      } catch (e: any) {
        console.error(`[fix-desc] Error for ${p.id}:`, e.message);
        results.push({ id: p.id, ok: false, name: p.name });
      }
    }));
  }

  const fixed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).map(r => ({ id: r.id, name: r.name }));

  return NextResponse.json({
    total: toFix.length,
    fixed,
    failed,
  });
}
