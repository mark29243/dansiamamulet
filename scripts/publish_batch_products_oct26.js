const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PRODUCTS_TO_PUBLISH = [
  {
    id: 1752,
    slug: 'rian-luang-pho-to-wat-hua-krabue-2521-luang-pu-toh',
    name: 'Rian Luang Pho To Wat Hua Krabue B.E. 2521 Co-Consecrated by Luang Pu Toh Wat Pradu Chimphli',
    name_zh: '曼谷瓦华卡博寺 龙婆多大佛佛历2521年金属自身铜牌（龙普多瓦巴鲁清批联合加持）',
    description: 'The Luang Pho To commemorative coin of Wat Hua Krabue, Bang Khun Thian District, Bangkok, was created in B.E. 2521 (1978) to raise funds for the restoration and development of the temple. The sacred consecration ceremony was held on June 30, B.E. 2521, with the revered Luang Pu Toh of Wat Pradu Chimphli joining to co-consecrate the edition.',
    description_zh: '曼谷曼坤天区瓦华卡博寺（Wat Hua Krabue）龙婆多大佛纪念币督造于佛历2521年（公元1978年），旨在为寺院修缮与扩建筹集善款。该批圣物于佛历2521年6月30日举行盛大开光加持法会，并特邀近代必打王龙普多（瓦巴鲁清批）参与联合灌顶加持。',
    published: true
  },
  {
    id: 1753,
    slug: 'phra-rod-wat-sri-muat-klao-lampang-2517-luang-pho-kasem',
    name: 'Phra Rod Wat Sri Muat Klao Lampang B.E. 2517 Blessed by Luang Pho Kasem Khemako',
    name_zh: '南邦府瓦西蒙告寺 佛历2517年帕洛古佛（龙婆卡贤·凯玛阔单独加持）',
    description: 'Phra Rod of Wat Sri Muat Klao, Lampang Province, was created in B.E. 2517 (1974). Documentation indicates that it is a sacred powder amulet blended with the auspicious "5-Cycle" holy powder of Luang Pho Kasem Khemako. Luang Pho Kasem of the Trailaksana Cemetery Hermitage, a paramount master monk of Lampang, participated in the consecration of this edition alongside distinguished northern masters, including Kruba Wang of Wat Ban Den and Luang Pho Mueang of Wat Tha Haen.',
    description_zh: '南邦府瓦西蒙告寺（Wat Sri Muat Klao）帕洛佛牌督造于佛历2517年（公元1974年）。史料记载本期圣物为圣粉质地，并融入了南邦府一代圣僧龙婆卡贤·凯玛阔（三相公墓）珍贵的“五周轮”（60岁华诞）秘制圣粉。除龙婆卡贤大师亲自主法加持外，尚有多位泰北著名高僧共同参与开光法会，包括瓦班登寺古巴旺大师及瓦塔限寺龙婆猛大师等。',
    published: true
  },
  {
    id: 1754,
    slug: 'phra-khun-phaen-phong-phrai-guman-luang-pho-yongyuth-wat-khao-mai-daeng-2540',
    name: 'Phra Khun Phaen Phong Phrai Guman Luang Pho Yongyuth Wat Khao Mai Daeng Chonburi B.E. 2540',
    name_zh: '春武里府瓦考迈丹寺 龙婆永裕佛历2540年派古曼粉坤平佛牌',
    description: 'Luang Pho Yongyuth Thammakosalo (Phra Khru Thammakijkowit) was a prominent master monk of Wat Khao Mai Daeng, Si Racha District, Chonburi Province. Born on September 17, B.E. 2470, he ordained at the age of 23 and pursued profound studies in Dhamma and Vipassana meditation under multiple renowned teachers. In B.E. 2502, during his Tudong ascetic pilgrimage, he arrived at Khao Mai Daeng, recognized its tranquil solitude suitable for meditation, and began establishing what would become Wat Khao Mai Daeng. He spearheaded the continuous development of the temple, including the mountainside stairways, reservoir, and ordination hall. Luang Pho Yongyuth was renowned for his meditative prowess, spiritual sciences, and the consecration of revered sacred amulets.',
    description_zh: '龙婆永裕·塔玛科萨罗大师（帕库塔玛吉科威）为春武里府是拉差区瓦考迈丹寺（Wat Khao Mai Daeng）之核心宗师。大师生于佛历2470年9月17日，23岁受具足戒，后依止多位高僧深入研习佛法与毗婆舍那内观禅定。佛历2502年大师行脚苦修（Tudong）至考迈丹山区，见此地清幽肃穆极宜禅修，遂在此结茅立刹，亲手开创瓦考迈丹寺，并持续建设上山台阶、蓄水库及大雄宝殿。龙婆永裕大师以精深之内观禅定功夫与高妙神通法术著称，历年督造之圣物深受善信推崇。',
    published: true
  }
];

async function publishProducts() {
  console.log('[Product Publisher] Starting publication of 3 products (Batch 7: Oct 26)...');
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

  console.log('[Product Publisher] Completed publication cycle.');
}

publishProducts();
