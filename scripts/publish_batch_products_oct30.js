const fs = require('fs');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

const env = dotenv.parse(fs.readFileSync('.env.local'));
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const NEW_BATCH = [
  {
    id: 1762,
    slug: 'phra-somdej-ruang-khao-luang-pho-khong-wat-wang-sappharot-2527',
    name: 'Phra Somdej Ruang Khao Luang Pho Khong Wat Wang Sappharot Chanthaburi B.E. 2527',
    name_th: 'พระสมเด็จรวงข้าว หลวงพ่อคง วัดวังสรรพรส จันทบุรี ปี2527',
    name_zh: '龙婆公 麦穗崇迪佛 瓦旺萨帕罗寺 尖竹汶府 佛历2527年',
    category: 'พระสมเด็จ',
    description: `Luang Pho Khong Suwanno was a revered guru monk of Wat Wang Sappharot, Khlung District, Chanthaburi Province. Born on September 20, B.E. 2445 (1902) in Trat Province, he was ordained at age 21 and studied Dhamma, Vipassana meditation, and sacred incantations from multiple masters, undertaking extensive pilgrimage across Thailand and Cambodia to deepen his spiritual knowledge.

He later resided at Wat Wang Sappharot and was appointed abbot in B.E. 2503. Renowned for his formidable consecration powers, he was frequently invited to major blessing ceremonies. The Phra Somdej Ruang Khao (Rice Ear Somdej) B.E. 2527 was consecrated during his lifetime and tenure as abbot.

Renowned for agricultural abundance, business prosperity, loving-kindness (Metta), and protective blessings.`,
    description_zh: `龙婆公·苏旺诺大师为尖竹汶府卡隆区瓦旺萨帕罗寺之重要高僧。大师于佛历2445年（公元1902年）9月20日出生于桐艾府，21岁出家受戒，修习佛法、内观禅修及多派精深法门，并曾苦行游历泰国与柬埔寨参学研习。

随后驻锡于瓦旺萨帕罗寺，并于佛历2503年升任住持。大师法力高深，屡获迎请参与全泰各大开光大法会。佛历2527年（公元1984年）督造之麦穗崇迪佛，为龙婆公大师在世并担任住持期间亲自主导开光之经典圣物。

主具五谷丰登、丰足富贵、招财进宝、人缘慈爱与护身避险。`,
    stock: 1,
    published: true
  },
  {
    id: 1763,
    slug: 'rian-dharmachakka-luang-pho-phrom-wat-khanon-nuea-ayutthaya-2530-copper',
    name: 'Rian Dharmachakka Luang Pho Phrom Wat Khanon Nuea Ayutthaya B.E. 2530 Copper Coin',
    name_th: 'เหรียญธรรมจักร หลวงพ่อพรหม วัดขนอนเหนือ อยุธยา ปี2530 เนื้อทองแดง',
    name_zh: '龙婆碰 铜质法轮纪念币 瓦卡农怒寺 大城府 佛历2530年',
    category: 'เหรียญเกจิ',
    description: `Luang Pho Phrom Tissadevo of Wat Khanon Nuea, Phra Nakhon Si Ayutthaya Province, was born on October 20, B.E. 2456 (1913) and ordained in B.E. 2479 with Phra Khru Sarakit (Fak) of Wat Thamle Thai as preceptor. Following his ordination, he studied sacred scriptures and consecration sciences from revered masters including Luang Pho Khan of Wat Nok Krachap, Luang Pu Am of Wat Ngiu Ngam, and Phra Ajahn Fak of Wat Thamle Thai, mastering the classical sacred Yantra traditions of Ayutthaya.

Luang Pho Phrom was widely celebrated for his rigorous Dhamma practice, sacred yantra inscription, and powerful amulets. He began creating consecrated objects in B.E. 2494, encompassing commemorative medals, sacred images, and talismans. This B.E. 2530 copper Dharmachakka medal features the Wheel of Dhamma, symbolizing the supreme spiritual law, warding off obstacles and bestowing protection and leadership authority.`,
    description_zh: `大城府瓦卡农怒寺龙婆碰·提萨德沃大师于佛历2456年（公元1913年）10月20日出生，佛历2479年受具足戒，由瓦贪累泰寺帕库萨拉吉（法克）任戒师。出家后，大师师从大城府多位传世名师研习佛法与古法符咒，包括瓦诺卡乍寺龙婆勘、瓦牛岩寺龙普谙及阿赞法克等，全面继承了大城府深厚之古传密法。

龙婆碰大师以修行严谨、精通符印法门及督造极具威力的圣物而闻名全泰。大师自佛历2494年起开光圣物，涵盖纪念币、造像与各类符管。此尊佛历2530年纯铜法轮纪念币铸有神圣法轮图腾，象征佛法常转、破除恶业险阻、赋能领袖威望与辟邪保平安。`,
    stock: 1,
    published: true
  },
  {
    id: 1764,
    slug: 'phra-phong-song-nam-pim-lek-chao-khun-nor-wat-thepsirin-2515',
    name: 'Phra Phong Song Nam Small Mold B.E. 2515 Commemorating Chao Khun Nor Wat Thepsirin Blessed by Phra Dhamma Trailokachan',
    name_th: 'พระผงสรงน้ำพิมพ์เล็ก ปี 15 เจ้าคุณนรฯ วัดเทพศิรินทร์ ปลุกเสก โดยท่านพระธรรมไตรโลกาจารย์',
    name_zh: '周冠罗 泼水节小模纪念圣粉佛 瓦贴素林寺 曼谷 佛历2515年 帕探玛德罗迦赞加持',
    category: 'พระผง',
    description: `Chao Khun Nor (Phra Phikkhu Dhammavitakko / Narat Ratchamanit) was a legendary saint-monk of Wat Thepsirinthrawat Ratchaworawihan, Bangkok. He lived a life of supreme monastic purity, adhering strictly to the Vinaya and relentless meditation, widely revered as an Arahant of modern Thailand. Following his passing in B.E. 2513 (1970), commemorative sacred amulets were consecrated in B.E. 2515 and blessed through multiple grand ceremonies led by prominent senior monks, including Phra Dhamma Trailokachan, who served as vice abbot of Wat Thepsirin.

This Phra Phong Song Nam (Small Mold) is pressed from sacred herbal and flower powders, renowned for Metta Mahaniyom (loving-kindness), inner peace, good fortune, and miraculous protection.`,
    description_zh: `周冠罗大师（帕比库·探玛威塔柯 / 那拉·拉差玛尼）为曼谷瓦贴素林拉差沃拉威汉皇家寺院之一代圣僧。大师一生严守清规戒律，隐逸精进禅观，被全泰尊奉为近代阿罗汉成就者。大师于佛历2513年（公元1970年）圆寂后，寺方于佛历2515年特别督造纪念圣物，并在多位德高望重的高僧主持下历经多场盛大加持法会，由时任瓦贴素林副住持的帕探玛德罗迦赞亲自主导法会。

此尊“泼水节小模”（Song Nam Pim Lek）圣粉佛牌由神圣经粉、花粉与祥瑞圣料压模制成，主具人缘慈爱、招财祥和、内心平静与逢凶化吉之深厚护佑。`,
    stock: 1,
    published: true
  },
  {
    id: 1765,
    slug: 'phra-lak-ha-chao-khun-pho-jaeng-wat-pho-maen-2520-gold-frame',
    name: 'Phra Lak Ha Chao Khun Pho Jaeng Wat Pho Maen B.E. 2520 Solid Gold Frame with Original Temple Box',
    name_th: 'พระหลักฮะ เจ้าคุณโพธิ์แจ้ง วัดโพธิ์แมน ปี2520 กรอบทองคำแท้ พร้อมกล่องเดิมจากวัด',
    name_zh: '普净大师 六合佛牌 曼谷普门报恩寺 佛历2520年 原庙盒带真金外壳',
    category: 'พระผง',
    description: `Chao Khun Pho Jaeng (Phra Maha Khanachan Chin Dhamma Samadhiwat) was the revered Supreme Patriarch of the Chinese Buddhist Order (Annam Nikaya / Chinese Zen Sect) in Thailand and the founder of Wat Pho Maen Khunaram, the preeminent center of Mahayana and Zen Buddhism in Thailand.

In B.E. 2520 (1977), he consecrated the famous "Phra Lak Ha" (Liu He / Six Harmonies Buddha) amulets. The Six Harmonies signify harmonious unity in all six directions, mutual understanding, prosperity in business, family peace, and universal protection. Chao Khun Pho Jaeng entered parinirvana on September 25, B.E. 2529 at the age of 85.

This piece comes encased in an authentic solid gold frame, accompanied by its original temple presentation box. Renowned for boundless loving-kindness, harmonious relationships, wealth generation, and comprehensive protection.`,
    description_zh: `普净大师（法号金刚上师·普净，俗称昭坤普净）为泰国大乘佛教华宗僧伽领袖、华宗大尊长，并为泰国大乘禅宗核心祖庭——曼谷普门报恩寺之开山宗师。

佛历2520年（公元1977年），大师督造开光了极负盛名之“六合佛”（Phra Lak Ha）。“六合”象征天地四方和谐共融、家宅平安、商贸顺遂、贵人相助与消除宿世灾厄。普净大师于佛历2529年（公元1986年）9月25日圆寂，世寿85岁。

本尊原装附带珍贵真金外壳及出寺原装庙盒，主具人缘大合、贵人提携、财源广进、家庭和睦与全方位消灾纳福。`,
    stock: 1,
    published: true
  },
  {
    id: 1766,
    slug: 'phra-leela-clay-kru-wat-phra-kaew-phetchabun-small-mold',
    name: 'Phra Leela Walking Buddha Sacred Clay Kru Wat Phra Kaew Phetchabun Small Mold Ancient Amulet',
    name_th: 'พระลีลา เนื้อดิน กรุวัดพระแก้ว เพชรบูรณ์ พิมพ์เล็ก',
    name_zh: '碧差汶府玉佛寺出土古窖 行走佛小模陶土佛牌 素可泰艺术',
    category: 'พระผง',
    description: `Wat Phra Kaew in Phetchabun Province is an ancient sanctuary in Nai Mueang Subdistrict, Mueang Phetchabun District, situated near Wat Phra Singh and Wat Phra Suea. During the major temple restoration in B.E. 2508 (1965), an ancient underground Kru chamber was unearthed within the temple grounds, revealing classic Sukhothai-era terracotta Buddha statues and amulets, prominently featuring the graceful Walking Buddha (Phra Leela) in sacred baked clay.

The Walking Buddha represents unstoppable progress, forward career momentum, advancement in life, and victory over stagnation, accompanied by supreme protection and grace.`,
    description_zh: `碧差汶府玉佛寺为位于碧差汶府治县直辖市内一座历史悠久的古老寺院，邻近帕辛寺与帕色寺。佛历2508年（公元1965年）在对该寺进行修葺重建时，于寺内重见天日一座古代佛窖，出土了大量精美绝伦的素可泰王朝风格陶土佛像及佛牌，其中包括声名显赫的“行走佛”（Phra Leela）陶土圣物。

行走佛象征步步高升、前程似锦、事业永不止步与破除运势停滞，兼具强大人缘慈爱与护身避险之功德。`,
    stock: 1,
    published: true
  },
  {
    id: 1767,
    slug: 'early-era-youth-locket-kruba-boonchum-wat-phra-that-don-ruang',
    name: 'Early Era Youthful Face Locket Kruba Boonchum Yannasangwalo Wat Phra That Don Ruang Amulet',
    name_th: 'ล็อกเก็ตหน้าหนุ่ม ครูบาบุญชุ่ม ญาณสังวโร วัดพระธาตุศรีดอนเรือง ยุคต้น',
    name_zh: '古巴文春大师 早年青年法相自身瓷面符印吊坠（早期） 掸邦瓦帕塔东棱寺',
    category: 'เครื่องราง',
    description: `Kruba Boonchum Yannasangwalo is a renowned Lanna forest meditation monk celebrated across Thailand, Myanmar, and Laos for his profound meditative discipline and extensive solitary cave retreats. Born on January 5, B.E. 2508 (1965) in Mae Chan District, Chiang Rai Province, he entered the novice monkhood on May 9, B.E. 2519 at Wat Sri Boon Yuen, before receiving full monastic ordination on May 9, B.E. 2529.

He resided at Wat Phra That Jom Sri Dap Phemung Mueang, before establishing his monastic residence at Wat Phra That Don Ruang in Mong Phong, Shan State, since B.E. 2530. He subsequently embarked on extensive solitary ascetic pilgrimages and prolonged cave meditation retreats, revered by millions of devotees across Southeast Asia.

This early-era youthful portrait locket is endowed with boundless loving-kindness (Metta), peaceful protection, spiritual illumination, and auspicious fortune.`,
    description_zh: `古巴文春·亚纳桑瓦罗大师为当代名震全泰、缅甸与老挝之兰纳森林派高僧，以深厚之禅定证量与常年闭关独修溶洞而闻名遐迩。大师于佛历2508年（公元1965年）1月5日出生于清莱府湄占区，佛历2519年5月9日于瓦希文运寺剃度为沙弥，后于佛历2529年5月9日圆寂出家受具足戒。

出家后大师驻锡于瓦帕塔中希达佩蒙芒寺，并自佛历2530年起常驻掸邦勐榜瓦帕塔东棱寺，主导重建与弘化法门。此后大师长期头陀苦行，深入险绝深山溶洞中闭关修持内观数年之久，备受东南亚信众万千景仰。

此尊早期青年法相瓷面自身吊坠，蕴含无上人缘慈爱（Metta）、消灾解难、福慧双增与护佑平安之强大祥和愿力。`,
    stock: 1,
    published: true
  }
];

async function publishBatch() {
  console.log('[Batch 11 Publisher] Publishing 6 newly added amulets...');
  const now = new Date().toISOString();

  for (const item of NEW_BATCH) {
    const { error } = await supabase
      .from('products')
      .update({
        slug: item.slug,
        name: item.name,
        name_th: item.name_th,
        name_zh: item.name_zh,
        category: item.category,
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
      console.log(`✓ Published Product #${item.id} (${item.name_th}) -> /product/${item.slug}`);
    }
  }
}

publishBatch();
