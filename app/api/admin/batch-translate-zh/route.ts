import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes for batch

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

async function translateZh(nameTh: string, nameEn: string, descEn: string): Promise<{ name_zh: string; description_zh: string }> {
  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    messages: [{
      role: 'user',
      content: `Translate this Thai Buddhist amulet product to Chinese (Simplified).

Rules:
- Monk names, temple names, places: keep as English romanization (e.g. หลวงปู่ทวด → Luang Pu Tuad, วัดช้างให้ → Wat Chang Hai)
- Buddhist Era years (ปี/พ.ศ.): keep as-is (e.g. ปี 2507 → 2507年)
- Material/type descriptions: translate to Chinese
- No marketing words, no added claims

Thai name: ${nameTh}
English name: ${nameEn}
English description: ${descEn}

Return ONLY valid JSON:
{
  "name_zh": "Chinese name (concise, 10-20 chars)",
  "description_zh": "Chinese description (2-3 sentences)"
}`,
    }],
  });

  const raw = (msg.content[0] as { type: string; text: string }).text.trim();
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    // fallback: use English name transliterated
    return { name_zh: nameEn, description_zh: descEn?.slice(0, 200) || nameEn };
  }
}

// GET — preview how many need translation
export async function GET() {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { data } = await ctx.admin
    .from('products')
    .select('id, name_th, name')
    .eq('published', true)
    .or('name_zh.is.null,name_zh.eq.');

  return NextResponse.json({ pending: data?.length ?? 0, products: data?.map(p => ({ id: p.id, name_th: p.name_th })) });
}

// POST — run batch translation
export async function POST() {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  // Fetch all published products missing Chinese translation
  const { data: products, error } = await ctx.admin
    .from('products')
    .select('id, name_th, name, description')
    .eq('published', true)
    .or('name_zh.is.null,name_zh.eq.');

  if (error || !products?.length) {
    return NextResponse.json({ processed: 0, message: 'No products need translation' });
  }

  const results: { id: number; name_th: string; status: string }[] = [];

  for (const p of products) {
    try {
      const zh = await translateZh(p.name_th, p.name, p.description ?? '');
      const { error: updateErr } = await ctx.admin
        .from('products')
        .update({ name_zh: zh.name_zh, description_zh: zh.description_zh })
        .eq('id', p.id);

      if (updateErr) throw updateErr;
      console.log(`[batch-zh] ✓ id=${p.id} → ${zh.name_zh}`);
      results.push({ id: p.id, name_th: p.name_th, status: `ok: ${zh.name_zh}` });
    } catch (e: any) {
      console.error(`[batch-zh] ✗ id=${p.id}:`, e.message);
      results.push({ id: p.id, name_th: p.name_th, status: `error: ${e.message}` });
    }
  }

  const ok = results.filter(r => r.status.startsWith('ok')).length;
  const failed = results.length - ok;
  return NextResponse.json({ processed: results.length, ok, failed, results });
}
