const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const FINAL_BATCH = [
  {
    id: 91,
    slug: 'phra-rod-jong-aang-suk-luang-pho-pae-wat-pikul-thong-2514',
    name: 'Phra Rod Jong Aang Suk by Luang Pho Pae Wat Pikul Thong B.E. 2514',
    name_zh: '瓦匹坤通龙婆培佛历2514年黑眼镜蛇帕洛佛牌',
    description: 'Phra Rod Jong Aang Suk by Luang Pho Pae, Wat Pikul Thong, B.E. 2514 is a highly popular sacred amulet known for its exceptional protective and metta (loving-kindness) blessings. Highly revered for safety, warding off dangers, and bringing auspicious fortune.\n\nPhra Rod Jong Aang Suk, Luang Pho Pae, Wat Pikul Thong, B.E. 2514, sacred holy powder, pristine original condition.',
    description_zh: '瓦匹坤通龙婆培佛历2514年黑眼镜蛇帕洛佛牌是广受推崇的经典圣物之一，以辟邪挡险、出入平安及超级人缘著称。非常适合佩戴供奉以祈求吉祥安康、逢凶化吉。\n\n黑眼镜蛇帕洛佛牌，龙婆培大师，瓦匹坤通寺，佛历2514年，圣粉材质，原庙原品相完美。',
    stock: 1,
    published: true
  },
  {
    id: 1760,
    slug: 'phra-phong-phahung-prod-phutthawanda-luang-pu-du-wat-sakae-2519',
    name: 'Phra Phong Phutthakhun Phahung Series Phim Prod Phutthawanda Luang Pu Du Wat Sakae B.E. 2519',
    name_zh: '大城府瓦萨给寺龙普笃佛历2519年帕宏经文系列度化佛母崇迪圣粉佛牌',
    description: 'The Phra Phong Phahung series was created in B.E. 2519 (1976) by Luang Pu Du Phrommapanyo of Wat Sakae, Phra Nakhon Si Ayutthaya Province, illustrating the life of the Buddha according to the Phahung Sahassa (Chai Mongkol Katha) chant.\n\nThis piece is the model depicting the Buddha blessing his mother in Tavatimsa Heaven (Phim Prod Phutthawanda). It is made of sacred holy powder mixed with Luang Pu Du\'s signature Maha Chakraphat powder, with original temple powder bloom intact.\n\nRenowned for loving-kindness, protection from dangers, and prosperity.',
    description_zh: '帕宏圣粉佛牌系列由大城府瓦萨给寺龙普笃·彭潘优大师于佛历2519年（公元1976年）督造，依循帕宏胜利吉祥经文描绘佛陀行化典故。\n\n此尊为“度化佛母”（升忉利天说法度母）模具。材质为圣粉混合龙普笃大师标志性之大皇帝圣粉（Maha Chakraphat），表面带有原庙出寺粉霜与圣粉包浆。\n\n主具人缘慈爱、辟邪护身、出入平安与兴旺繁荣。',
    stock: 1,
    published: true
  },
  {
    id: 1761,
    slug: 'phra-kleep-bua-pathummas-luang-pho-nam-wat-noi-chomphu-lead-yant',
    name: 'Phra Kleep Bua Pathummas Luang Pho Nam Wat Noi Chomphu Lead with Hand Yantra Inscription Committee Distribution Only',
    name_zh: '素攀武里府瓦诺春普寺龙普南手模刻符铅质莲花瓣佛牌（理事会专用版）',
    description: 'Phra Kleep Bua Pathummas was created by Luang Pu Nam Sasanapachoto (Phra Khru Suwansanakun) of Wat Noi Chomphu, Si Prachan District, Suphanburi Province. Luang Pu Nam was a revered senior monk known for his spiritual sciences and deeply respected in Suphanburi.\n\nPhra Kleep Bua Pathummas is crafted from lead alloy. The back features an original hand-inscribed yantra, made exclusively for committee members with very limited mintage.\n\nKnown for Metta Maha Niyom, fortune, wealth, protection, and invulnerability.',
    description_zh: '莲花瓣佛牌由素攀武里府是巴占区瓦诺春普寺龙普南大师督造。龙普南为素攀武里府法术精湛且极受崇敬的高僧。\n\n本尊为铅质莲花瓣法相，背面带有大师亲手刻符，专门督造用于赠与功德理事会成员，铸造量极为稀少。\n\n主具人缘祥和、招财增运、避险护身及刀枪不入之效。',
    stock: 1,
    published: true
  },
  {
    id: 1713,
    slug: 'phra-soom-kor-luang-pho-kasem-wat-susan-trailaksana-2536-copper',
    name: 'Phra Soom Kor Luang Pho Kasem Wat Susan Trailaksana Lampang B.E. 2536 Copper',
    name_zh: '南邦府三相公墓龙婆卡贤佛历2536年铜质颂扣佛牌（巴拉蜜梵天版）',
    description: 'Luang Pho Kasem Khemako was born on November 28, B.E. 2455 (1912) in Lampang Province. He was ordained in B.E. 2475 and received the monastic title "Khemako". He was a dedicated Vipassana meditation master strictly adhering to monastic discipline. Throughout his life, he emphasized tranquility, solitude, and meditation practice. Luang Pho Kasem spent most of his monastic life at Susan Trailaksana (Pratu Ma Cemetery) in Lampang Province, forever linking his venerated name with the cemetery hermitage and Lampang.',
    description_zh: '龙婆卡贤·凯玛阔大师于佛历2455年（公元1912年）11月28日出生于南邦府，佛历2475年受具足戒，法号“凯玛阔”。大师为严守戒律的内观禅修圣僧，一生崇尚清净、简朴与精进修行。龙婆卡贤大师长期驻锡于南邦府三相公墓（玛门公墓），其圣名遂与三相公墓及南邦府紧密相连。',
    stock: 1,
    published: true
  }
];

async function publishAllRemaining() {
  console.log('[Final Publisher] Publishing all remaining products (91, 1760, 1761, 1713)...');
  const now = new Date().toISOString();

  for (const item of FINAL_BATCH) {
    const { error } = await supabase
      .from('products')
      .update({
        slug: item.slug,
        name: item.name,
        name_zh: item.name_zh,
        description: item.description,
        description_zh: item.description_zh,
        stock: item.stock,
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

publishAllRemaining();
