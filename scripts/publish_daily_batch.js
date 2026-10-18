/**
 * Script: publish_daily_batch.js
 * Purpose: Automatically publish the next N draft blog posts from the Supabase draft queue.
 * Usage:
 *   node scripts/publish_daily_batch.js       (publishes next 2 drafts by default)
 *   node scripts/publish_daily_batch.js 1     (publishes next 1 draft)
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function publishNextDrafts(count = 2) {
  console.log(`[SCHEDULED PUBLISHER] Querying next ${count} draft articles from Supabase queue...`);

  // Exclude legacy draft #4 (1792158851271) if unformatted, target id >= 8
  const { data: drafts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title_th, title, published')
    .eq('published', false)
    .gte('id', 8)
    .order('id', { ascending: true })
    .limit(count);

  if (error) {
    console.error('Error fetching drafts:', error.message);
    process.exit(1);
  }

  if (!drafts || drafts.length === 0) {
    console.log('No pending draft articles found in queue.');
    return;
  }

  console.log(`Found ${drafts.length} draft(s) ready to publish:`);

  for (const draft of drafts) {
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ published: true, updated_at: new Date().toISOString() })
      .eq('id', draft.id);

    if (updateError) {
      console.error(`Failed to publish #${draft.id}:`, updateError.message);
    } else {
      console.log(`✓ Published #${draft.id}: "${draft.title_th}"`);
      console.log(`  Live URL: https://dansiamamulets.com/blog/${draft.slug}`);
    }
  }

  console.log(`\nDaily publication routine completed successfully.`);
}

const batchSize = parseInt(process.argv[2], 10) || 2;
publishNextDrafts(batchSize).catch(console.error);
