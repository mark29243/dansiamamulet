import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const maxDuration = 300;

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

// Check if string contains Thai characters
function hasThai(text: string): boolean {
  return /[ก-๙]/.test(text);
}

async function translateNameEn(name_th: string): Promise<string> {
  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    messages: [{
      role: 'user',
      content: `Translate this Thai Buddhist amulet name to English.

Rules:
- Monk/temple names: romanize (หลวงปู่ทวด → Luang Pu Tuad, วัดช้างให้ → Wat Chang Hai, หลวงพ่อ → Luang Pho)
- Buddhist Era years (พ.ศ./ปี): keep as numbers (พ.ศ. 2507 → 2507, ปี 2515 → 2515)
- Material/type: translate (เนื้อว่าน → Herb Powder, เนื้อผง → Powder, เนื้อทองเหลือง → Brass, เนื้อเงิน → Silver)
- Amulet types: translate (พระสมเด็จ → Phra Somdej, พระปิดตา → Pidta, เหรียญ → Coin, รูปหล่อ → Cast Image, เครื่องราง → Talisman)
- Keep concise, max 60 chars
- Return ONLY the English name, nothing else

Thai name: ${name_th}`,
    }],
  });

  const result = (msg.content[0] as { type: string; text: string }).text.trim();
  // Remove quotes if AI wrapped in quotes
  return result.replace(/^["']|["']$/g, '').trim();
}

// GET — preview how many need translation
export async function GET() {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { data } = await ctx.admin
    .from('products')
    .select('id, name, name_th')
    .eq('published', true);

  const pending = (data ?? []).filter(p => hasThai(p.name));
  return NextResponse.json({
    pending: pending.length,
    products: pending.map(p => ({ id: p.id, name_th: p.name_th, name_current: p.name })),
  });
}

// POST — run batch translation
export async function POST() {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  if (!(await rateLimit(`batch-translate-en:${ctx.user.id}`, 3))) {
    return NextResponse.json({ error: 'Rate limit: max 3 batch runs per hour' }, { status: 429 });
  }

  const { data: products, error } = await ctx.admin
    .from('products')
    .select('id, name, name_th')
    .eq('published', true);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const toTranslate = (products ?? []).filter(p => hasThai(p.name));

  if (!toTranslate.length) {
    return NextResponse.json({ processed: 0, message: 'All product names are already in English' });
  }

  const results: { id: number; name_th: string; name_en: string; status: string }[] = [];

  for (const p of toTranslate) {
    try {
      const nameEn = await translateNameEn(p.name_th || p.name);
      const { error: updateErr } = await ctx.admin
        .from('products')
        .update({ name: nameEn })
        .eq('id', p.id);

      if (updateErr) throw updateErr;
      console.log(`[batch-name-en] ✓ id=${p.id} "${p.name}" → "${nameEn}"`);
      results.push({ id: p.id, name_th: p.name_th || p.name, name_en: nameEn, status: 'ok' });
    } catch (e: any) {
      console.error(`[batch-name-en] ✗ id=${p.id}:`, e.message);
      results.push({ id: p.id, name_th: p.name_th || p.name, name_en: '', status: `error: ${e.message}` });
    }
  }

  const ok = results.filter(r => r.status === 'ok').length;
  const failed = results.length - ok;
  return NextResponse.json({ processed: results.length, ok, failed, results });
}
