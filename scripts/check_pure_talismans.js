const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCandidates() {
  const html = fs.readFileSync('public/fb.html', 'utf8');
  const urls = [...html.matchAll(/https:\/\/dansiamamulets\.com\/product\/([a-zA-Z0-9_-]+)/g)].map(m => m[1]);
  const existingSlugs = new Set(urls);

  const targetIds = [
    1778, 1775, 1774, 1722, 1721, 1699, 1697, 1695, 1693, 1690, 
    1687, 1686, 1683, 1679, 1672, 1667, 1663, 1631, 1619, 1597,
    76, 82, 96, 107, 113, 114, 119
  ];

  const { data, error } = await supabase
    .from('products')
    .select('id, slug, name, name_th, name_zh, category, price, stock, images, short, description, description_th')
    .in('id', targetIds)
    .eq('published', true)
    .gt('stock', 0);

  if (error) {
    console.error(error);
    return;
  }

  const valid = [];
  for (const p of data) {
    if (existingSlugs.has(p.slug)) {
      console.log(`Skipping already present in fb.html: ID ${p.id} ${p.slug}`);
      continue;
    }
    const imgs = Array.isArray(p.images) ? p.images : (typeof p.images === 'string' ? JSON.parse(p.images) : []);
    if (imgs.length >= 3) {
      valid.push({
        id: p.id,
        slug: p.slug,
        name_th: p.name_th || p.name,
        name: p.name,
        name_zh: p.name_zh,
        price: p.price,
        stock: p.stock,
        images: imgs.slice(0, 3),
        short: p.short,
        description: p.description,
        description_th: p.description_th
      });
    } else {
      console.log(`Skipping <3 images: ID ${p.id} ${p.name_th} (has ${imgs.length})`);
    }
  }

  console.log(`Total valid unique talismans: ${valid.length}`);
  const top20 = valid.slice(0, 20);
  top20.forEach((p, i) => {
    console.log(`[${i+1}] ID ${p.id} (${p.slug}): ${p.name_th} (${p.price/100} THB)`);
  });

  fs.writeFileSync('scripts/pure_20_talismans.json', JSON.stringify(top20, null, 2));
}

checkCandidates();
