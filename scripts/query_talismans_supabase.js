const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';

const supabase = createClient(supabaseUrl, supabaseKey);

const existingIds = [49, 1769, 1768, 1744, 1772, 1746, 1730, 1737, 1755, 1745, 1757, 1770, 1703];

async function main() {
  const { data, error } = await supabase
    .from('products')
    .select('id, slug, name, name_th, name_zh, category, price, stock, images, short, description, description_th')
    .eq('published', true)
    .gt('stock', 0);

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  const talismanKeywords = ['เบี้ยแก้', 'ตะกรุด', 'ราหู', 'สิงห์', 'เสือ', 'ชูชก', 'กุมาร', 'มีดหมอ', 'แพะ', 'หนุมาน', 'ลิง', 'หมากทุย', 'ปลัดขิก', 'หุ่นพยนต์', 'สีผึ้ง', 'เต่า', 'ม้าเสพนาง', 'พญาครุฑ', 'วัวธนู', 'ควายธนู', 'สาริกา', 'ผ้ายันต์', 'กะลา'];

  const talismans = data.filter(p => {
    if (existingIds.includes(p.id)) return false;
    const text = ((p.name_th || '') + ' ' + (p.name || '') + ' ' + (p.category || '')).toLowerCase();
    return talismanKeywords.some(kw => text.includes(kw));
  });

  console.log(`Found ${talismans.length} available published talismans (not yet posted).`);
  talismans.forEach((p, idx) => {
    const imgs = Array.isArray(p.images) ? p.images : (typeof p.images === 'string' ? JSON.parse(p.images) : []);
    console.log(`\n--- [${idx+1}] ID: ${p.id} ---`);
    console.log(`Name TH: ${p.name_th}`);
    console.log(`Name EN: ${p.name}`);
    console.log(`Slug: ${p.slug}`);
    console.log(`Price: ${p.price / 100} THB | Stock: ${p.stock}`);
    console.log(`Images (${imgs.length}):`, imgs.slice(0, 3));
  });
}

main();
