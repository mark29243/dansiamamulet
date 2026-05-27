import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import Anthropic from '@anthropic-ai/sdk';

export const runtime = 'nodejs';
export const maxDuration = 60;

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return null;
  return admin;
}

async function translateToZh(nameTh: string, nameEn: string): Promise<{ name_zh: string; description_zh: string }> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    messages: [{
      role: 'user',
      content: `Translate this Thai Buddhist amulet name to Chinese (Simplified). Translate names, places, and years literally only. No marketing words, no added claims.

Thai name: ${nameTh}
English name: ${nameEn}

Return ONLY valid JSON:
{"name_zh": "Chinese translation of the name only"}`,
    }],
  });

  const raw = (msg.content[0] as { type: string; text: string }).text.trim();
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  const parsed = JSON.parse(cleaned);
  return { name_zh: parsed.name_zh, description_zh: parsed.name_zh };
}

export async function POST() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { data: products } = await admin
    .from('products')
    .select('id, name_th, name')
    .or('name_zh.is.null,name_zh.eq.')
    .eq('published', true);

  if (!products?.length) return NextResponse.json({ updated: 0 });

  const results = [];
  for (const p of products) {
    try {
      const zh = await translateToZh(p.name_th, p.name);
      await admin.from('products').update({ name_zh: zh.name_zh, description_zh: zh.description_zh }).eq('id', p.id);
      results.push({ id: p.id, name_zh: zh.name_zh });
    } catch (e: any) {
      results.push({ id: p.id, error: e.message });
    }
  }

  return NextResponse.json({ updated: results.filter((r) => !r.error).length, results });
}
