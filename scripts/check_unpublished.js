const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function check() {
  const { data, error } = await supabase
    .from('products')
    .select('id, name_th, name, name_zh, slug, price, stock, published, images, description_th, description, description_zh, short')
    .eq('published', false)
    .order('id', { ascending: true });

  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Total unpublished products:', data.length);
  data.forEach((p, idx) => {
    const imgs = Array.isArray(p.images) ? p.images : (typeof p.images === 'string' ? JSON.parse(p.images) : []);
    console.log(`\n[${idx + 1}] ID: ${p.id} | Stock: ${p.stock} | Price: ${p.price / 100} THB | Images: ${imgs.length}`);
    console.log(`Name TH: ${p.name_th}`);
    console.log(`Name EN: ${p.name}`);
    console.log(`Name ZH: ${p.name_zh}`);
    console.log(`Slug: ${p.slug}`);
    console.log(`Desc TH: ${p.description_th ? p.description_th.substring(0, 100) + '...' : '(empty)'}`);
    console.log(`Desc EN: ${p.description ? p.description.substring(0, 100) + '...' : '(empty)'}`);
    console.log(`Desc ZH: ${p.description_zh ? p.description_zh.substring(0, 100) + '...' : '(empty)'}`);
  });
}

check();
