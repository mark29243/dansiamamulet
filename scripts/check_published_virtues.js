const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const lines = fs.readFileSync('./scripts/test_new_classifier.js', 'utf8').split('\n');
const classifierCode = lines.slice(14, 300).join('\n');
eval(classifierCode);

const sb = createClient(
  'https://vipqvizivfzkjdqeuyhu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0'
);

const virtueLabels = {
  'wealth-and-fortune': '💰 โชคลาภ การเงิน ค้าขาย',
  'miraculous-protection': '🛡️ แคล้วคลาด ปลอดภัย กันภัย',
  'metta-and-charisma': '💖 เมตตามหานิยม มหาเสน่ห์',
  'career-and-power': '👑 อำนาจบารมี เลื่อนตำแหน่ง'
};

async function check() {
  const { data } = await sb.from('products').select('*').in('id', [91, 1627, 1735, 1736, 1737, 1738, 1739]).order('id', { ascending: false });
  console.log('=== MULTI-VIRTUE CLASSIFICATION OF 7 NEWLY PUBLISHED PRODUCTS ===\n');
  for (const p of data) {
    const vSlugs = Array.from(classifyAmulet(p));
    console.log(`องค์ที่ #${p.id}: ${p.name_th || p.name}`);
    console.log(`  ราคา: ฿${(p.price/100).toLocaleString()} | หมวดหมู่: ${p.category} | จำนวนภาพ: ${p.images.length} รูป`);
    console.log(`  URL: https://dansiamamulets.com/product/${p.slug}`);
    console.log(`  พุทธคุณที่ได้รับ (${vSlugs.length} ด้าน):`);
    vSlugs.forEach(slug => {
      console.log(`    - ${virtueLabels[slug] || slug}`);
    });
    console.log('');
  }
}

check().catch(console.error);
