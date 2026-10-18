/**
 * Script: publish_next_batch_blogs.js
 * Automatically publishes the next N approved blog posts from Supabase draft queue (published: false)
 * Usage: node scripts/publish_next_batch_blogs.js [count]
 * Default count: 2
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function publishNextBlogs(count = 2) {
  console.log(`[Publish Scheduler] Checking for up to ${count} unpublished drafts...`);

  // Target IDs 8 through 12, or any unpublished draft ordered by ID
  const { data: drafts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title_th, title, published')
    .eq('published', false)
    .order('id', { ascending: true })
    .limit(count);

  if (error) {
    console.error('Error fetching drafts:', error.message);
    return;
  }

  if (!drafts || drafts.length === 0) {
    console.log('[Publish Scheduler] No pending drafts found in queue.');
    return;
  }

  const now = new Date().toISOString();

  for (const post of drafts) {
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({
        published: true,
        created_at: now,
        updated_at: now
      })
      .eq('id', post.id);

    if (updateError) {
      console.error(`Failed to publish #${post.id} (${post.slug}):`, updateError.message);
    } else {
      console.log(`✓ Successfully published #${post.id}: "${post.title_th || post.title}" (${post.slug})`);
    }
  }

  console.log(`[Publish Scheduler] Completed publishing cycle at ${now}`);
}

const countArg = parseInt(process.argv[2], 10) || 2;
publishNextBlogs(countArg).catch(console.error);
