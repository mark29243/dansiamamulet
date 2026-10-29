const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkOverlap() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, published, title_th, category, excerpt_th, content_th')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching blogs:', error.message);
    return;
  }

  console.log(`=== TOTAL BLOG POSTS IN DATABASE: ${data.length} ===\n`);

  for (const post of data) {
    const textTH = (post.title_th || '') + ' ' + (post.excerpt_th || '') + ' ' + (post.content_th || '');
    const hasPidta = textTH.includes('ปิดตา') || textTH.includes('ภควัมบดี') || textTH.includes('กัจจายนะ');
    const hasSomdej = textTH.includes('สมเด็จ') || textTH.includes('โต พรหมรังสี');
    const hasKring = textTH.includes('กริ่ง') || textTH.includes('ชัยวัฒน์');
    const hasKhunPhaen = textTH.includes('ขุนแผน');

    console.log(`[ID ${post.id}] Published: ${post.published} | Slug: ${post.slug}`);
    console.log(`Title TH: ${post.title_th}`);
    console.log(`Mentions: Pidta/Kaccayana: ${hasPidta} | Somdej: ${hasSomdej} | Kring: ${hasKring} | KhunPhaen: ${hasKhunPhaen}`);
    console.log('---');
  }
}

checkOverlap().catch(console.error);
