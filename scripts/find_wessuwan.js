const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data: sample, error: err1 } = await supabase.from('products').select('*').limit(1);
  if (err1) {
    console.error('Error fetching sample:', err1);
    return;
  }
  console.log('Columns:', Object.keys(sample[0]));

  // Search for anything related to Wessuwan / Chulamanee / Kuvera / Yakhsa
  const { data: all, error: err2 } = await supabase
    .from('products')
    .select('id, slug, name, name_th, description_th, description, category, price, stock, published, images, thumbnail_url')
    .or('name.ilike.%wessuwan%,name_th.ilike.%เวสสุวรรณ%,name_th.ilike.%กุเวร%,name.ilike.%chulamanee%,name_th.ilike.%จุฬามณี%,description_th.ilike.%เวสสุวรรณ%,name_th.ilike.%ยักษ์%,search_text.ilike.%เวสสุวรรณ%,search_text.ilike.%wessuwan%');

  if (err2) {
    console.error('Search error:', err2);
    return;
  }

  console.log(`Found ${all.length} matching products:`);
  all.forEach(p => {
    console.log(`----------------------------------------`);
    console.log(`ID: ${p.id} | Slug: ${p.slug} | Published: ${p.published} | Status: ${p.status}`);
    console.log(`Name (TH): ${p.name_th}`);
    console.log(`Name (EN): ${p.name}`);
    console.log(`Temple: ${p.temple_th || p.temple} | Year: ${p.year}`);
    console.log(`Description TH snippet: ${(p.description_th || '').slice(0, 150)}...`);
  });
}

run();
