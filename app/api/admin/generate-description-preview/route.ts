import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 120;

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

// Extract monk name and temple from Thai product name
function extractKeywords(nameTh: string): string[] {
  const keywords: string[] = [];

  // Extract หลวงปู่/หลวงพ่อ/อาจารย์ names
  const monkMatch = nameTh.match(/(หลวงปู่|หลวงพ่อ|พระอาจารย์|อาจารย์|ครูบา|พ่อท่าน)\s*(\S+)/);
  if (monkMatch) keywords.push(monkMatch[0]);

  // Extract วัด names
  const watMatch = nameTh.match(/วัด\S+/);
  if (watMatch) keywords.push(watMatch[0]);

  return keywords;
}

type BraveResult = { text: string; quotaExhausted: boolean; resetInDays: number };

async function braveSearch(query: string): Promise<BraveResult> {
  const key = process.env.BRAVE_SEARCH_API_KEY;
  if (!key) return { text: '', quotaExhausted: false, resetInDays: 0 };
  try {
    const res = await fetch(
      `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=3&search_lang=th&country=TH`,
      { headers: { 'Accept': 'application/json', 'X-Subscription-Token': key } }
    );

    // Parse monthly quota from headers: "x-ratelimit-remaining: 49, 0" → second value
    const remaining = res.headers.get('x-ratelimit-remaining') ?? '';
    const resetSec = res.headers.get('x-ratelimit-reset') ?? '';
    const monthlyRemaining = parseInt(remaining.split(',')[1]?.trim() ?? '1', 10);
    const monthlyResetSec = parseInt(resetSec.split(',')[1]?.trim() ?? '0', 10);
    const resetInDays = Math.ceil(monthlyResetSec / 86400);
    const quotaExhausted = monthlyRemaining === 0;

    if (!res.ok) return { text: '', quotaExhausted, resetInDays };
    const data = await res.json();
    const results = (data.web?.results ?? []) as { title: string; description: string }[];
    const text = results.map(r => `[${r.title}] ${r.description}`).join('\n').slice(0, 1500);
    return { text, quotaExhausted, resetInDays };
  } catch {
    return { text: '', quotaExhausted: false, resetInDays: 0 };
  }
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { product_id } = await req.json();
  if (!product_id) return NextResponse.json({ error: 'Missing product_id' }, { status: 400 });

  const { data: p } = await admin
    .from('products')
    .select('id, name_th, name, description_th, category')
    .eq('id', product_id)
    .single();

  if (!p) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  const nameTh = p.name_th || p.name || '';
  const descTh = p.description_th || '';
  const category = p.category || '';

  // Search Brave in parallel
  const keywords = extractKeywords(nameTh);
  const searchResults = await Promise.all(
    keywords.slice(0, 2).map(kw => braveSearch(`${kw} ประวัติ พระเครื่อง จังหวัด`))
  );
  let searchContext = '';
  let braveQuotaExhausted = false;
  let braveResetInDays = 0;
  keywords.slice(0, 2).forEach((kw, i) => {
    const r = searchResults[i];
    if (r.quotaExhausted) { braveQuotaExhausted = true; braveResetInDays = r.resetInDays; }
    if (r.text) searchContext += `\n--- ผลการค้นหา "${kw}" ---\n${r.text}\n`;
  });

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const msg = await ai.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: `คุณเป็นผู้เชี่ยวชาญพระเครื่องไทยที่มีประสบการณ์ 20 ปี เขียนคำอธิบายสินค้าแบบตรงไปตรงมา เป็นข้อเท็จจริง ไม่ใช้ภาษาโฆษณา ไม่ใส่ความรู้สึก

สินค้า:
ชื่อไทย: ${nameTh}
หมวดหมู่: ${category}
หมายเหตุ: ${descTh.slice(0, 300) || '(ไม่มี)'}

ข้อมูลจากการค้นหา:
${searchContext || '(ไม่มีผลค้นหา)'}

กฎเหล็ก — ห้ามละเมิด:
1. จังหวัด/สถานที่: ระบุเฉพาะที่ปรากฏใน name_th หรือผลค้นหาเท่านั้น ห้าม guess
   - รู้แน่: วัดช้างให้ = ปัตตานี, วัดระฆัง = กรุงเทพ, วัดบ้านไร่ = นครราชสีมา
2. ศัพท์เทคนิค (พิมพ์, บล็อก, โค้ด, รุ่น): คัดลอกตรงๆ จาก name_th ไม่ตีความ
   - "บล็อก ไ ไม้มลาย" → เขียนแค่ "บล็อก ไ ไม้มลาย" ไม่อธิบายเพิ่ม
   - "เนื้ออลูมิเนียมขาปิ่นโต" = อลูมิเนียมหลอมจากขาปิ่นโต (ภาชนะใส่อาหาร) → เขียนว่า "หล่อจากอลูมิเนียมขาปิ่นโต"
3. ห้ามปิดด้วย marketing copy: "รับประกันแท้", "จัดส่งทั่วโลก", "ผู้สนใจสามารถ"
4. ห้ามใช้ filler: "ตำนานถูกเล่าสืบต่อกันมาหลายศตวรรษ", "เป็นที่รู้จักกว้างขวาง", "วัฒนาการในการปฏิบัติ"
5. ห้ามอ้างปีรุ่นอื่นที่ไม่ได้อยู่ใน name_th — ถ้าไม่มีในชื่อสินค้าหรือผลค้นหา ห้ามกล่าวถึง
6. ห้ามแนะนำวิธีตรวจสอบความแท้ ("ดูจากความคมชัด", "สังเกตที่...") — อาจผิดและทำให้ลูกค้าเข้าใจผิด
7. ห้ามบอกว่า "ดูจากภาพถ่าย", "สภาพพิจารณาได้จากภาพ" — ประโยคแบบนี้ไม่มีประโยชน์
8. ห้าม describe ด้านหลังของเหรียญ/พระ (ยันต์, อักขระ, ตัวหนังสือ) ถ้าไม่ได้ระบุใน name_th — ห้าม hallucinate
9. ย่อหน้าที่ 4 ต้องไม่ซ้ำข้อมูลจากย่อหน้าที่ 1 — ถ้าไม่มีข้อมูลใหม่เพิ่ม ให้ย่อหน้า 4 สั้น 1-2 ประโยคก็พอ
10. ทุกประโยคต้องมีข้อมูลจริง — ไม่มีประโยคเติมเต็ม ถ้าไม่มีข้อมูลเรื่องไหน ข้ามเลย

ตัวอย่างโทนที่ถูก vs ผิด:
✗ "ตำนานของท่านถูกเล่าสืบต่อกันมาหลายศตวรรษ"
✓ "หลวงปู่ทวดมีชีวิตอยู่ในสมัยอยุธยา จำพรรษาสุดท้ายที่วัดช้างให้ ปัตตานี"

✗ "นักสะสมให้ความสนใจทั้งในและต่างประเทศ"
✓ "เหรียญรุ่น 2 ปี 2502 เป็นรุ่นต้นที่วัดช้างให้จัดสร้าง ก่อนยุคเหรียญรุ่นนิยม"

✗ "โดยทั่วไปมีพุทธคุณด้านแคล้วคลาด"
✓ "เหรียญหลวงปู่ทวดนิยมบูชาด้านแคล้วคลาดคงกระพัน โดยเฉพาะผู้ที่เดินทางบ่อย"

✗ "รับประกันพระแท้ จัดส่งทั่วโลก"
✓ "เหรียญมีคราบอายุตามธรรมชาติ พิมพ์คมชัด บล็อก ไ ไม้มลาย สังเกตได้จากอักษร ไ ที่ด้านหลัง"

สิ่งที่เขียนได้:
- พระเกจิดัง: ข้อมูลจริงที่รู้ — วัด จังหวัด ยุคสมัย พุทธคุณหลัก
- พุทธคุณตามประเภท: เหรียญ = แคล้วคลาดคงกระพัน, ปิดตา = มหาลาภ, กริ่ง = เมตตามหานิยม
- ข้อมูลกายภาพจาก name_th: เนื้อ บล็อก รุ่น ปีสร้าง (ใช้ตรงๆ)
- สภาพ/จุดสังเกตของพิมพ์ ถ้ามีข้อมูล

โครงสร้าง 2-3 ย่อหน้า — แต่ละย่อหน้าครอบคลุมคนละเรื่อง ห้ามพูดซ้ำข้ามย่อหน้า:
1. ระบุตัวสินค้า: ชื่อพระ + พิมพ์ + ผู้สร้าง + วัด + จังหวัด + ปีสร้าง (B.E.) + เนื้อ [ข้อมูลจาก name_th เท่านั้น]
2. ประวัติผู้สร้าง + พุทธคุณ: ยุคสมัย วัด จังหวัด สิ่งที่รู้จริง และพุทธคุณเฉพาะของพระชิ้นนี้ตามประเภท — ห้ามพูดซ้ำเนื้อหรือปีจากย่อหน้า 1
3. (ถ้ามีข้อมูลใหม่จริงๆ เท่านั้น): ความนิยม ความหายาก หรือข้อมูลที่ยังไม่ได้พูดถึง — ถ้าไม่มี ตัดออกเลย

Output EXACTLY this format:

===EN===
[English 200-300 words, 4 paragraphs, NO Thai/Chinese characters]
===TH===
[ภาษาไทย 200-280 คำ 4 ย่อหน้า]
===ZH===
[中文120-180字 4段]
===END===`,
          },
        ],
      });

      const text = (msg.content[0] as { type: string; text: string }).text;
      const enMatch = text.match(/===EN===\s*([\s\S]*?)\s*===TH===/);
      const thMatch = text.match(/===TH===\s*([\s\S]*?)\s*===ZH===/);
      const zhMatch = text.match(/===ZH===\s*([\s\S]*?)\s*===END===/);

      const description = enMatch?.[1]?.trim() ?? '';
      const description_th = thMatch?.[1]?.trim() ?? '';
      const description_zh = zhMatch?.[1]?.trim() ?? '';

      if (!description || hasThai(description)) continue;
      if (!description_th || !hasThai(description_th)) continue;
      if (!description_zh || !hasChinese(description_zh)) continue;

      return NextResponse.json({
        product_id: p.id,
        name_th: nameTh,
        search_used: keywords,
        brave_quota_exhausted: braveQuotaExhausted,
        brave_reset_in_days: braveResetInDays,
        description,
        description_th,
        description_zh,
      });
    } catch (e: any) {
      if (attempt === 3) return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Failed after 3 attempts' }, { status: 500 });
}
