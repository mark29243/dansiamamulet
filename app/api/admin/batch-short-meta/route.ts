import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 300;

const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const hasThai = (s?: string | null) => !!s && /[฀-๿]/.test(s);

async function generateShort(nameTh: string, descTh: string, nameEn: string, category: string): Promise<string> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const msg = await ai.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `Write a Google meta description for a Thai Buddhist amulet product page.

Product info:
Thai name: ${nameTh}
English name: ${nameEn || nameTh}
Category: ${category || 'Thai amulet'}
Notes: ${(descTh || nameTh).slice(0, 300)}

Rules:
- Exactly 140-155 characters (count carefully)
- English only — NO Thai or Chinese characters
- Include: amulet type + monk name (romanized) + 1-2 key blessings + "authentic" + "worldwide shipping"
- Example format: "Authentic Luang Pu Tuad B.E.2511 copper coin amulet from Wat Chang Hai — protection & luck blessing. Certified genuine, worldwide shipping."
- Return ONLY the meta description string, no JSON, no quotes`,
        },
      ],
    });

    const text = (msg.content[0] as { type: string; text: string }).text.trim().replace(/^["']|["']$/g, '');
    if (!hasThai(text) && text.length >= 130 && text.length <= 165) {
      return text.slice(0, 160);
    }
    console.warn(`[batch-short] attempt ${attempt} length=${text.length} for: ${nameTh.slice(0, 40)}`);
  }
  // fallback: truncate name
  return `Authentic ${nameEn || nameTh} — Thai Buddhist amulet. Certified genuine with certificate of authenticity. Worldwide shipping.`.slice(0, 155);
}

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return null;
  return admin;
}

export async function POST() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { data: allProducts } = await admin
    .from('products')
    .select('id, name, name_th, description_th, short, category')
    .eq('published', true);

  // Fix products where short is missing, empty, or contains Thai chars
  const toFix = (allProducts ?? []).filter(p =>
    !p.short || p.short.trim().length < 50 || hasThai(p.short)
  );

  if (toFix.length === 0) {
    return NextResponse.json({ processed: 0, ok: 0, failed: 0, message: 'All products already have meta descriptions!' });
  }

  console.log(`[batch-short] ${toFix.length} products need short meta description`);

  const BATCH = 5;
  const DELAY_MS = 8000; // 5 req per 8s = ~37 RPM, safely under 50 RPM limit
  let ok = 0;
  let failed = 0;
  const results: { id: number; name_th: string; name_en?: string; status: string }[] = [];

  for (let i = 0; i < toFix.length; i += BATCH) {
    if (i > 0) await new Promise(r => setTimeout(r, DELAY_MS));
    const batch = toFix.slice(i, i + BATCH);
    await Promise.all(batch.map(async (p) => {
      try {
        const short = await generateShort(
          p.name_th || p.name,
          p.description_th || '',
          p.name,
          p.category || '',
        );
        const { error } = await admin.from('products').update({ short }).eq('id', p.id);
        if (error) throw new Error(error.message);
        ok++;
        results.push({ id: p.id, name_th: p.name_th || p.name, name_en: short.slice(0, 60) + '…', status: 'ok' });
        console.log(`[batch-short] ✓ ${p.id}: ${short.slice(0, 60)}`);
      } catch (e: any) {
        failed++;
        results.push({ id: p.id, name_th: p.name_th || p.name, status: e.message });
        console.error(`[batch-short] ✗ ${p.id}:`, e.message);
      }
    }));
  }

  return NextResponse.json({ processed: toFix.length, ok, failed, results });
}
