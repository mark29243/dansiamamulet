const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const UPDATES = [
  {
    id: 1757,
    slug: 'luang-pu-tuad-luang-ta-phan-wat-mai-amataros-2502-bang-khun-phrom',
    name: 'Luang Pu Tuad Luang Ta Phan Wat Mai Amataros B.E. 2502 Mixed with Old Bang Khun Phrom Powder',
    name_zh: '曼谷瓦迈阿玛达洛寺（曼坤碰）龙达潘佛历2502年龙普托佛牌（混合曼坤碰老崇迪碎粉）',
    description: 'Luang Ta Phan, or Phra Khru Amornkhunatharn, was a revered master monk of Wat Mai Amataros (Bang Khun Phrom), Bangkok. He played an important role during the official opening of the Phra Somdej Bang Khun Phrom crypt in B.E. 2500 (1957).\n\nFrom that crypt opening, there were numerous damaged fragments of Phra Somdej amulets and holy powders. Luang Ta Phan collected and preserved a large quantity of the ancient sacred powder material of Somdej Phra Phutthachan (Toh Phromrangsi).\n\nSubsequently, in B.E. 2502 (1959), Luang Ta Phan used these ancient sacred powder materials to create various amulet models. One of the popular models is the Luang Pu Tuad amulet.\n\nPhra Luang Pu Tuad by Luang Ta Phan, Wat Mai Amataros, B.E. 2502, concentrated blend of old Bang Khun Phrom powder. Notable for safety, protection from dangers, loving-kindness (Metta Maha Niyom), and prosperity.',
    description_zh: '龙达潘（帕库阿蒙昆那昙）为曼谷瓦迈阿玛达洛寺（瓦曼坤碰）之名僧，于佛历2500年曼坤碰古塔正式开塔期间具有重要地位。\n\n当时开塔出土了大量破碎的崇迪佛牌碎片与珍贵经粉圣料，龙达潘收集并保存了大量崇迪阿赞多（普陀赞多）亲制的老圣粉。\n\n随后于佛历2502年（公元1959年），龙达潘采用该批珍贵老圣粉督造了多种佛牌模具，其中最受欢迎的模具之一即为龙普托法相。\n\n曼谷瓦迈阿玛达洛寺龙达潘佛历2502年龙普托佛牌，混合浓郁曼坤碰老圣粉。保平安避险、人缘和合及事业兴盛。'
  },
  {
    id: 1758,
    slug: 'phra-luang-pho-nen-luang-ta-chuan-wat-kai-tia-suphanburi-2500-lead',
    name: 'Phra Luang Pho Nen Luang Ta Chuan Wat Kai Tia Suphanburi B.E. 2500 Lead Two-Sided',
    name_zh: '素攀武里府瓦凯带寺龙达专佛历2500年龙婆年双面铅质佛牌',
    description: 'Luang Ta Chuan was a revered monk of Wat Kai Tia, Si Prachan District, Suphanburi Province. He was a virtuous practitioner deeply respected by the people of Suphanburi.\n\nIn B.E. 2500 (1957), the Phra Luang Pho Nen sacred amulet was created. It is characterized as a two-sided amulet made of lead, crafted in the artistic style of classic Suphanburi master monks.\n\nPhra Luang Pho Nen by Luang Ta Chuan, Wat Kai Tia, B.E. 2500, two-sided lead alloy, pristine original condition. Known for protection from dangers, invulnerability, and Metta Maha Niyom.',
    description_zh: '龙达专为素攀武里府是巴占区瓦凯带寺之德高望重僧人，持戒清净，深受素攀武里府信众敬重。\n\n佛历2500年（公元1957年）督造了龙婆年法相圣物，特征为前后双面铅质，造型依循素攀武里府古法名僧风格制作。\n\n素攀武里府瓦凯带寺龙达专佛历2500年龙婆年双面铅质佛牌，原庙原品相。主保平安避险、刀枪不入与人缘祥和。'
  },
  {
    id: 1759,
    slug: 'phra-nang-phaya-phim-yai-ajahn-thanom-wat-nang-phaya-2514',
    name: 'Phra Nang Phaya Large Mold Ajahn Thanom Wat Nang Phaya Phitsanulok B.E. 2514',
    name_zh: '彭世洛府瓦南帕亚寺阿赞他侬佛历2514年大模南帕亚女王佛牌',
    description: 'Phra Nang Phaya B.E. 2514 (1971) was created by Phra Ajahn Thanom Khemcharo, the abbot of Wat Nang Phaya, Phitsanulok Province at that time, to raise funds for constructing the temple ordination hall and to commemorate the temple restoration.\n\nThe creation incorporated numerous sacred materials, particularly ancient broken fragments of antique crypt Phra Nang Phaya amulets, ancient crypt soil, holy powders, and 108 sacred herbs.\n\nA grand consecration ceremony was held at Wat Nang Phaya in B.E. 2514 with renowned master monks from across Thailand participating, including:\n- Luang Pu Toh, Wat Pradu Chimphli\n- Luang Pho Ngern, Wat Don Yai Hom\n- Luang Pho Kasem Khemako, Lampang\n- Luang Pho Pae, Wat Pikul Thong\n- Luang Pho Thob, Wat Chon Daen\nand many other distinguished teachers.\n\nPhra Nang Phaya Large Mold B.E. 2514, beautiful complete condition, baked clay mixed with ancient powder. Renowned for loving-kindness (Metta Maha Niyom), charisma, protection, and enhancing prestige.',
    description_zh: '佛历2514年南帕亚佛牌由彭世洛府瓦南帕亚寺时任住持帕阿赞他侬·凯玛查罗督造，旨在筹建寺院大雄宝殿及纪念寺院修缮。\n\n本期督造融入了大量重要圣料，特别是古代出塔破损的南帕亚老佛牌碎料、古塔老土、经粉圣料及108种深山圣草药。\n\n佛历2514年于瓦南帕亚寺举行盛大开光法会，全国多位知名高僧参与加持，包括：\n- 龙普多（瓦巴鲁清批）\n- 龙婆银（瓦冬亚宏）\n- 龙婆卡贤·凯玛阔（南邦府）\n- 龙婆培（瓦匹坤通）\n- 龙婆托（瓦冲丹）\n等多位大师共同加持。\n\n大模南帕亚佛牌佛历2514年，品相完好，古陶土混合老圣粉。主具极佳人缘魅力、避险平安及增进威信名望。'
  },
  {
    id: 1760,
    slug: 'phra-phong-phahung-prod-phutthawanda-luang-pu-du-wat-sakae-2519',
    name: 'Phra Phong Phutthakhun Phahung Series Phim Prod Phutthawanda Luang Pu Du Wat Sakae B.E. 2519',
    name_zh: '大城府瓦萨给寺龙普笃佛历2519年帕宏经文系列度化佛母崇迪圣粉佛牌',
    description: 'The Phra Phong Phahung series was created in B.E. 2519 (1976) by Luang Pu Du Phrommapanyo of Wat Sakae, Phra Nakhon Si Ayutthaya Province, illustrating the life of the Buddha according to the Phahung Sahassa (Chai Mongkol Katha) chant.\n\nThis piece is the model depicting the Buddha blessing his mother in Tavatimsa Heaven (Phim Prod Phutthawanda). It is made of sacred holy powder mixed with Luang Pu Du\'s signature Maha Chakraphat powder, with original temple powder bloom intact.\n\nRenowned for loving-kindness, protection from dangers, and prosperity.',
    description_zh: '帕宏圣粉佛牌系列由大城府瓦萨给寺龙普笃·彭潘优大师于佛历2519年（公元1976年）督造，依循帕宏胜利吉祥经文描绘佛陀行化典故。\n\n此尊为“度化佛母”（升忉利天说法度母）模具。材质为圣粉混合龙普笃大师标志性之大皇帝圣粉（Maha Chakraphat），表面带有原庙出寺粉霜与圣粉包浆。\n\n主具人缘慈爱、辟邪护身、出入平安与兴旺繁荣。'
  },
  {
    id: 1761,
    slug: 'phra-kleep-bua-pathummas-luang-pho-nam-wat-noi-chomphu-lead-yant',
    name: 'Phra Kleep Bua Pathummas Luang Pho Nam Wat Noi Chomphu Lead with Hand Yantra Inscription Committee Distribution Only',
    name_zh: '素攀武里府瓦诺春普寺龙普南手模刻符铅质莲花瓣佛牌（理事会专用版）',
    description: 'Phra Kleep Bua Pathummas was created by Luang Pu Nam Sasanapachoto (Phra Khru Suwansanakun) of Wat Noi Chomphu, Si Prachan District, Suphanburi Province. Luang Pu Nam was a revered senior monk known for his spiritual sciences and deeply respected in Suphanburi.\n\nPhra Kleep Bua Pathummas is crafted from lead alloy. The back features an original hand-inscribed yantra, made exclusively for committee members with very limited mintage.\n\nKnown for Metta Maha Niyom, fortune, wealth, protection, and invulnerability.',
    description_zh: '莲花瓣佛牌由素攀武里府是巴占区瓦诺春普寺龙普南大师督造。龙普南为素攀武里府法术精湛且极受崇敬的高僧。\n\n本尊为铅质莲花瓣法相，背面带有大师亲手刻符，专门督造用于赠与功德理事会成员，铸造量极为稀少。\n\n主具人缘祥和、招财增运、避险护身及刀枪不入之效。'
  }
];

async function updateNewDraftProducts() {
  console.log('[Product Metadata Updater] Updating fields for new draft products (1757-1761)...');
  const now = new Date().toISOString();

  for (const item of UPDATES) {
    const { error } = await supabase
      .from('products')
      .update({
        slug: item.slug,
        name: item.name,
        name_zh: item.name_zh,
        description: item.description,
        description_zh: item.description_zh,
        updated_at: now
      })
      .eq('id', item.id);

    if (error) {
      console.error(`Failed to update product #${item.id}:`, error);
    } else {
      console.log(`✓ Updated Product #${item.id} metadata (${item.slug})`);
    }
  }
}

updateNewDraftProducts();
