/**
 * Script: clean_blog_copyrights.js
 * Removes hardcoded 3-language copyright blocks from content, content_th, content_zh
 * in Supabase, because copyright is now dynamically localized in BlogPostClient.tsx
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const { data: posts, error } = await supabase.from('blog_posts').select('id, slug, content, content_th, content_zh');
  if (error) {
    console.error('Fetch error:', error);
    return;
  }

  const regex = /<div class="copyright-notice"[\s\S]*?<\/div>/gi;

  for (const p of posts) {
    let changed = false;
    const update = {};

    if (p.content && regex.test(p.content)) {
      update.content = p.content.replace(regex, '').trim();
      changed = true;
    }
    if (p.content_th && regex.test(p.content_th)) {
      update.content_th = p.content_th.replace(regex, '').trim();
      changed = true;
    }
    if (p.content_zh && regex.test(p.content_zh)) {
      update.content_zh = p.content_zh.replace(regex, '').trim();
      changed = true;
    }

    if (changed) {
      const { error: upErr } = await supabase.from('blog_posts').update(update).eq('id', p.id);
      if (upErr) {
        console.error(`Failed to clean #${p.id}:`, upErr.message);
      } else {
        console.log(`✓ Cleaned hardcoded copyright from #${p.id} (${p.slug})`);
      }
    }
  }

  console.log('Finished cleaning all blog post contents.');
}

main().catch(console.error);
