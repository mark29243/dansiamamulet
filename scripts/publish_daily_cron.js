const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Master Publication Schedule (2 articles per day at 09:00 and 14:00 BKK time)
const PUBLICATION_SCHEDULE = [
  { id: 8,  targetDate: '2026-10-19T02:00:00.000Z', title: 'สมเด็จโต & หลวงปู่นาค ๒๔๙๕' },
  { id: 9,  targetDate: '2026-10-19T07:00:00.000Z', title: 'พระปิดตามหาอุตม์ & นิโรธสมาบัติ' },
  { id: 10, targetDate: '2026-10-20T02:00:00.000Z', title: 'ท้าวเวสสุวรรณ & อาฏานาฏิยสูตร' },
  { id: 11, targetDate: '2026-10-20T07:00:00.000Z', title: 'พระรอดหริภุญชัย ๑,๒๐๐ ปี' },
  { id: 12, targetDate: '2026-10-21T02:00:00.000Z', title: 'กุมารทองหลวงพ่อพิณ ๒๕๐๐' },
  { id: 13, targetDate: '2026-10-21T07:00:00.000Z', title: 'พระกริ่ง-พระชัยวัฒน์ มักกะสัน ๒๔๘๕' },
  { id: 14, targetDate: '2026-10-22T02:00:00.000Z', title: 'พระเหนือพรหม หลวงปู่ดู่ วัดสะแก' },
  { id: 15, targetDate: '2026-10-22T07:00:00.000Z', title: 'พระนางพญา พิษณุโลก' }
];

async function runCron() {
  const now = new Date();
  console.log(`[Blog Scheduler] Running check at: ${now.toISOString()} (Local: ${now.toLocaleString('th-TH')})`);

  let newlyPublished = 0;

  for (const item of PUBLICATION_SCHEDULE) {
    const target = new Date(item.targetDate);
    if (now >= target) {
      // Check current state in DB
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select('id, published, title_th')
        .eq('id', item.id)
        .single();

      if (error) {
        console.warn(`[Skip] ID ${item.id} not found in database yet:`, error.message);
        continue;
      }

      if (!post.published) {
        console.log(`[Publishing] ID: ${item.id} (${post.title_th}) - target ${item.targetDate} reached.`);
        const { error: updateErr } = await supabase
          .from('blog_posts')
          .update({
            published: true,
            created_at: item.targetDate,
            updated_at: now.toISOString()
          })
          .eq('id', item.id);

        if (updateErr) {
          console.error(`[Error] Failed to publish ID ${item.id}:`, updateErr);
        } else {
          console.log(`[Success] ID ${item.id} is now LIVE on https://dansiamamulets.com/blog`);
          newlyPublished++;
        }
      }
    }
  }

  // Summary of currently published
  const { data: livePosts } = await supabase
    .from('blog_posts')
    .select('id, slug, title_th, published, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  console.log(`\n--- SUMMARY: ${livePosts ? livePosts.length : 0} BLOG POSTS LIVE ON SITE ---`);
  if (livePosts) {
    livePosts.forEach((p, idx) => {
      console.log(`${idx + 1}. [ID: ${p.id}] ${p.title_th} (Published: ${p.created_at})`);
    });
  }

  return { newlyPublished, totalLive: livePosts ? livePosts.length : 0 };
}

if (require.main === module) {
  runCron().catch(err => {
    console.error('Fatal cron error:', err);
    process.exit(1);
  });
}

module.exports = { runCron, PUBLICATION_SCHEDULE };
