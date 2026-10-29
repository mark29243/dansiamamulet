const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PRODUCTS_TO_PUBLISH = [
  {
    id: 1755,
    slug: 'phra-khun-phaen-lang-kuman-sombat-luang-pho-pool-wat-phai-lom-2548',
    name: 'Phra Khun Phaen Lang Kuman Sombat Na Cha Li Ti Luang Pho Pool Wat Phai Lom Nakhon Pathom B.E. 2548',
    name_zh: '佛历2548年佛统府瓦排龙寺龙婆喷坤平佛牌（后古曼金童子与纳查利帝符文）',
    description: 'Luang Pho Pool Attarakkho (Phra Mongkol Sitthikarn) was the former abbot of Wat Phai Lom, Nakhon Pathom Province, and a revered master monk who played an important role in temple development and public welfare. He inherited spiritual sciences from multiple teachers, including Luang Pho Ngern of Wat Don Yai Hom, and possessed profound knowledge in consecrated arts and amulet creation.\n\nPhra Khun Phaen Kuman Sombat B.E. 2548 was created on the occasion of the Wai Kru master teacher homage ceremony at Wat Phai Lom. Luang Pho Pool presided over the ceremony and consecration alongside several master monks. The consecration ceremony was held on May 17, B.E. 2548, prior to the official release on May 22, which was Visakha Bucha Day.',
    description_zh: '龙婆喷·阿塔拉克霍大师（帕蒙坤西提甘）为佛统府瓦排龙寺前任住持，是为寺院建设与社会公益作出重要贡献的知名高僧。大师承袭自多位名师法脉，包括瓦冬亚宏寺龙婆银，精通法术与佛牌督造。\n\n佛历2548年古曼金童子坤平佛牌督造于瓦排龙寺拜师法会之际，由龙婆喷大师亲自主法开光，并特邀多位高僧共同加持。核心开光法会于佛历2548年5月17日举行，并于5月22日卫塞节正式恭请结缘。',
    published: true
  },
  {
    id: 1756,
    slug: 'phra-somdej-7-tier-wat-bang-pakok-2514-luang-pu-toh',
    name: 'Phra Somdej 7-Tier Base 5 Lotus Beads with Old Powder of Luang Pho Pring Wat Bang Pakok Bangkok B.E. 2514 Consecrated by Luang Pu Toh',
    name_zh: '曼谷瓦曼帕阁寺佛历2514年七层座五莲珠崇迪佛牌（混合龙婆聘老圣粉·龙普多参与开光）',
    description: 'Phra Somdej with 7-tier base and 5 lotus beads of Wat Bang Pakok was created in B.E. 2514 (1971), crafted according to the traditional mold of Luang Pho Pring of Wat Bang Pakok. Documentation indicates that old sacred powder of Luang Pho Pring was incorporated as an ingredient in this edition. The consecration ceremony was held at Wat Bang Pakok in the same year, with several revered master monks participating, and Luang Pu Toh of Wat Pradu Chimphli was among the master monks joining the consecration.',
    description_zh: '曼谷瓦曼帕阁寺七层法座五粒莲珠崇迪佛牌督造于佛历2514年（公元1971年），依循瓦曼帕阁寺名僧龙婆聘经典法相督造，文献记载含有龙婆聘留存之珍贵老圣粉料。同年于瓦曼帕阁寺举行盛大开光法会，多位知名高僧参与加持，瓦巴鲁清批寺龙普多亦参与了联合加持法会。',
    published: true
  },
  {
    id: 1677,
    slug: 'phra-sangkachai-black-powder-luang-pu-thiam-wat-ksatratirach-2519',
    name: 'Phra Sangkachai Black Sacred Powder Luang Pu Thiam Wat Kasattrathirat Ayutthaya B.E. 2519',
    name_zh: '大城府瓦卡萨特拉提拉寺 龙普添佛历2519年黑肉善加财尊者佛牌',
    description: 'Luang Pu Thiam Siripanyo was an important master monk of Wat Kasattrathirat Worawihan, Phra Nakhon Si Ayutthaya Province. He was knowledgeable in Dhamma, spiritual practice, and sacred yantra scriptures according to ancestral lineages. Luang Pu Thiam played a vital role in developing Wat Kasattrathirat and local Buddhist affairs. He was widely recognized for creating and consecrating various types of sacred amulets, including coins, sacred powder amulets, Phra Pidta, and various molded icons. In B.E. 2519 (1976), multiple forms of amulets were consecrated while Luang Pu Thiam was still alive.',
    description_zh: '龙普添·西里潘约大师为大城府瓦卡萨特拉提拉皇家寺院之核心宗师。大师深谙佛法、禅定实践及传承自师尊之符文字经文。龙普添在寺院建设及地方佛教弘化方面具有重要贡献，以督造并加持多种圣物闻名。其法脉圣物包含金属自身牌、圣粉牌、必打佛及各类尊者造像。佛历2519年（公元1976年）曾督造多种款式圣物。',
    published: true
  }
];

async function publishProducts() {
  console.log('[Product Publisher] Starting publication of 3 products (Batch 8)...');
  const now = new Date().toISOString();

  for (const item of PRODUCTS_TO_PUBLISH) {
    const { error } = await supabase
      .from('products')
      .update({
        slug: item.slug,
        name: item.name,
        name_zh: item.name_zh,
        description: item.description,
        description_zh: item.description_zh,
        published: true,
        updated_at: now
      })
      .eq('id', item.id);

    if (error) {
      console.error(`Failed to publish product #${item.id}:`, error);
    } else {
      console.log(`✓ Published Product #${item.id} -> /product/${item.slug}`);
    }
  }
}

publishProducts();
