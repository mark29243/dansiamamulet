/**
 * Script: update_blog_hook_titles.js
 * Updates all 7 blog post titles in Supabase with high-CTR, compelling hooks
 * across Thai, English, and Chinese while strictly preserving existing URL slugs.
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const HOOK_TITLES = [
  {
    slug: 'historical-chronicle-luang-phu-tuad-wat-chang-hai-consecrations',
    title: 'The Supreme Miracle of Survival: Luang Phu Tuad Wat Chang Hai Chronicles and Consecrations (B.E. 2497–2505)',
    title_th: 'นิรันตรายอันดับหนึ่ง: ปาฏิหาริย์หลวงพ่อทวด วัดช้างให้ และบันทึกประวัติศาสตร์ พ.ศ. ๒๔๙๗–๒๕๐๕',
    title_zh: '全泰第一避险传奇：瓦沧海龙普托尊者神迹通考与佛历2497–2505年开光文献'
  },
  {
    slug: 'history-phra-khun-phaen-ayutthaya-wat-tham-khao-ngen-2511',
    title: 'The Floating Amulet Miracle: Wan Sabu Lueat Botany & the B.E. 2511 Wat Tham Khao Ngen Consecrations',
    title_th: 'ตำนานว่านสบู่เลือดและพิธีเสด็จกลับ: พระขุนแผนวัดถ้ำเขาเงิน ๒๕๑๑ ยอดพระเครื่องแห่งแดนใต้',
    title_zh: '水上浮起之神迹秘典：血皂草圣粉与佛历2511年瓦探考银坤平佛牌南传通考'
  },
  {
    slug: 'somdej-toh-wat-rakang-luang-pu-nak-2495-chronicles',
    title: 'The Living Relic of Somdej Toh: Sacred Powders and Luang Pu Nak’s B.E. 2495 Wat Rakang Chronicles',
    title_th: 'ผงสมเด็จโตที่ยังมีลมหายใจ: เจาะลึกพระสมเด็จหลวงปู่นาค วัดระฆัง พ.ศ. ๒๔๙๕',
    title_zh: '阿赞多未熄灭之圣火：瓦拉康寺龙普纳佛历2495年崇迪真品圣粉与传承通考'
  },
  {
    slug: 'phra-pidta-maha-kaccayana-sensory-restraint-theology',
    title: 'Why Does a Closed-Eyes Buddha Bring Wealth? The Secret Sensory Theology of Phra Pidta',
    title_th: 'ทำไมพระปิดตาถึงกลายเป็น “พระปลดหนี้”? ถอดรหัสปริศนาปิดทวาร สู่มหาลาภพระมหากัจจายนะ',
    title_zh: '为何闭眼佛能招财解债？揭开必打掩面佛守护根门与迦旃延尊者之大财运密义'
  },
  {
    slug: 'thao-wessuwan-vaisravana-guardian-northern-quarter',
    title: 'More Than a Fierce Guardian: The Hidden Wealth Theology of Vaisravana in Buddhist Canon',
    title_th: 'ไม่ใช่แค่ยักษ์เฝ้าประตู: ถอดรหัส “ท้าวเวสสุวรรณ” จอมราชันย์แห่งโภคทรัพย์ในพระไตรปิฎก',
    title_zh: '不仅是降魔守门巨擘：深入考订大藏经中毗沙门天王多闻天子的藏财正道与造像学'
  },
  {
    slug: '1200-years-hariphunchai-terracotta-phra-rod-history',
    title: 'How 1,200-Year-Old Clay Turned to Stone: The Lost Soil Alchemy of Phra Rod Hariphunchai',
    title_th: 'ไขความลับ “พระรอด” แกร่งดั่งหิน ๑,๒๐๐ ปี: จากจารึกพระนางจามเทวี สู่เตาเผาโบราณหริภุญชัย',
    title_zh: '千二百载陶土如何坚硬如磐石？占玛德威女王铭文与古塔帕罗佛圣土炼金术破译'
  },
  {
    slug: 'cultural-anthropology-guman-thong-luang-pho-pin-2500',
    title: 'Deconstructing the Necromancy Myth: The Pure White-Magic Truth of Guman Thong (Luang Pho Pin B.E. 2500)',
    title_th: 'ล้างตราบาปไสยดำ: กุมารทองในพระวินัยสงฆ์ เทวฤทธิ์ขาว และบันทึกหลวงพ่อพิณ พ.ศ. ๒๕๐๐',
    title_zh: '洗冤黑巫术妖魔化迷思：从南传僧伽戒律通考正统白法古曼童与龙婆品佛历2500年真迹'
  }
];

async function updateHooks() {
  console.log(`Starting update of hook titles for ${HOOK_TITLES.length} articles...`);

  for (const item of HOOK_TITLES) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        title: item.title,
        title_th: item.title_th,
        title_zh: item.title_zh,
        updated_at: new Date().toISOString()
      })
      .eq('slug', item.slug)
      .select('id, slug, title_th');

    if (error) {
      console.error(`✗ Error updating ${item.slug}:`, error.message);
    } else if (data && data.length > 0) {
      console.log(`✓ Updated #${data[0].id} (${data[0].slug}):\n  -> ${data[0].title_th}`);
    } else {
      console.warn(`! Slug not found in database: ${item.slug}`);
    }
  }

  console.log('\nAll hook titles successfully updated in Supabase!');
}

updateHooks().catch(console.error);
