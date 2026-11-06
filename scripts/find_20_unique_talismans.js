const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const html = fs.readFileSync('public/fb.html', 'utf8');
  const urls = [...html.matchAll(/https:\/\/dansiamamulets\.com\/product\/([a-zA-Z0-9_-]+)/g)].map(m => m[1]);
  const existingSlugs = new Set(urls);
  console.log('Existing slugs in fb.html:', existingSlugs.size);

  const { data, error } = await supabase
    .from('products')
    .select('id, slug, name, name_th, name_zh, category, price, stock, images, short, description, description_th')
    .eq('published', true)
    .gt('stock', 0);

  if (error) {
    console.error('Supabase error:', error);
    return;
  }

  const talismanKeywords = [
    'เบี้ยแก้', 'ตะกรุด', 'ราหู', 'สิงห์', 'เสือ', 'ชูชก', 'กุมาร', 'มีดหมอ', 
    'แพะ', 'หนุมาน', 'ลิง', 'หมากทุย', 'ปลัดขิก', 'หุ่นพยนต์', 'สีผึ้ง', 'เต่า', 
    'ม้าเสพนาง', 'พญาครุฑ', 'วัวธนู', 'ควายธนู', 'สาริกา', 'ผ้ายันต์', 'กะลา',
    'ลูกอม', 'ช้าง', 'หมู', 'งั่ง', 'นางกวัก', 'พญาเต่าเรือน'
  ];

  const candidates = [];
  for (const p of data) {
    if (existingSlugs.has(p.slug)) continue;
    const text = ((p.name_th || '') + ' ' + (p.name || '') + ' ' + (p.category || '') + ' ' + (p.description_th || '')).toLowerCase();
    const isTalisman = talismanKeywords.some(kw => text.includes(kw));
    if (!isTalisman) continue;

    const imgs = Array.isArray(p.images) ? p.images : (typeof p.images === 'string' ? JSON.parse(p.images) : []);
    if (imgs.length >= 3) {
      candidates.push({
        id: p.id,
        slug: p.slug,
        name_th: p.name_th || p.name,
        name: p.name,
        name_zh: p.name_zh || '',
        price: p.price,
        stock: p.stock,
        images: imgs.slice(0, 3)
      });
    }
  }

  console.log('Total available talisman candidates:', candidates.length);
  const selected = candidates.slice(0, 20);
  console.log('\n--- Selected 20 Talismans ---');
  selected.forEach((p, idx) => {
    console.log(`[${idx+1}] ID: ${p.id} | Slug: ${p.slug} | Price: ${p.price/100} THB | Name: ${p.name_th}`);
  });

  fs.writeFileSync('scripts/selected_20_talismans.json', JSON.stringify(selected, null, 2));
  console.log('\nSaved to scripts/selected_20_talismans.json');
}

run();
