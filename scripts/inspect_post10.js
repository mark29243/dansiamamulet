const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function inspect10() {
  const { data } = await supabase.from('blog_posts').select('*').eq('id', 10);
  const p = data[0];
  console.log('--- Post 10 Titles ---');
  console.log('TH:', p.title_th);
  console.log('EN:', p.title);
  console.log('ZH:', p.title_zh);
  console.log('--- Content TH length:', (p.content_th || '').length);
  const headings = (p.content_th || '').match(/<h[23][^>]*>.*?<\/h[23]>/g);
  console.log('Headings:', headings);
  const links = (p.content_th || '').match(/<a[^>]*href=['"][^'"]*['"][^>]*>.*?<\/a>/g);
  console.log('Links:', links);
}
inspect10();
