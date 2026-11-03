const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PRODUCTS_TO_PUBLISH = [
  {
    id: 1773,
    name_th: "เหรียญพระนิรันตราย โรงเรียนสตรีวิทยา ปี 2548 พิธีวัดบวรนิเวศวิหาร",
    name: "Phra Nirantarai Satriwithaya School B.E. 2548 Consecrated at Wat Bowonniwet",
    name_zh: "曼谷女子中学佛历2548年僧王庙大法会开光无忧避险佛",
    slug: "phra-nirantarai-satriwithaya-school-2548-wat-bowonniwet",
    short: "Phra Nirantarai amulet, Satriwithaya School edition B.E. 2548, consecrated at Wat Bowonniwet Vihara by Somdej Kiew and top master monks.",
    description_th: `พระนิรันตราย โรงเรียนสตรีวิทยา ปี 2548 จัดสร้างขึ้นโดยโรงเรียนสตรีวิทยา และประกอบพิธีพุทธาภิเษก ณ พระอุโบสถวัดบวรนิเวศวิหาร กรุงเทพมหานคร เมื่อวันที่ 23 มีนาคม พ.ศ. 2548 โดยมีสมเด็จพระพุฒาจารย์ (เกี่ยว อุปเสโณ) เป็นประธานจุดเทียนชัย และพระพรหมมุนี ซึ่งเป็นเจ้าอาวาสวัดบวรนิเวศวิหารในขณะนั้น ประกอบพิธีดับเทียนชัย

พิธีครั้งนี้มีพระเกจิอาจารย์จากหลายพื้นที่ร่วมอธิษฐานจิต เช่น หลวงพ่อพูล วัดไผ่ล้อม หลวงตาพวง วัดศรีธรรมาราม หลวงพ่อไพบูลย์ วัดอนาลโย หลวงปู่ทอง วัดจักรวรรดิราชาวาส หลวงพ่อฟู วัดบางสมัคร หลวงปู่ทิม วัดพระขาว และหลวงพ่อเพิ่ม วัดป้อมแก้ว`,
    description: `Phra Nirantarai, Satriwithaya School edition, consecrated in B.E. 2548 (2005) at the sacred Ubosot of Wat Bowonniwet Vihara, Bangkok, on March 23, B.E. 2548. Somdej Phra Phutthachan (Kiew Upaseno) presided over the lighting of the victory candle, and Phra Phrom Muni (then-abbot of Wat Bowonniwet) extinguished it. The grand ceremony was co-blessed by eminent master monks including Luang Pho Pool (Wat Phai Lom), Luang Ta Phuang (Wat Si Thammaram), Luang Pho Phaiboon (Wat Analayo), Luang Pu Thong (Wat Chakkrawat), Luang Pho Foo (Wat Bang Samak), Luang Pu Tim (Wat Phra Khao), and Luang Pho Phoem (Wat Pom Kaeo).`,
    description_zh: `曼谷女子中学（Satriwithaya School）于佛历2548年（2005年）督造之无忧避险佛（Phra Nirantarai）。法会于佛历2548年3月23日在曼谷僧王庙（瓦波旺尼威佛寺）大雄宝殿隆重举行大宪章法会，由僧伽长老崇迪帕普塔赞（顺德起 / 顺德交）长老主持点燃胜利法烛，并由时任僧王庙住持帕碰穆尼长老主持熄烛礼。法会恭请全泰多位高僧共同加持，包括瓦排龙寺龙婆喷、瓦西昙玛兰寺龙达峦、瓦阿纳拉约寺龙婆排汶、瓦三攀他旺寺龙普通、瓦邦萨玛寺龙婆富、瓦帕考寺龙普添及瓦邦告寺龙婆喷等当世名僧。`
  },
  {
    id: 1774,
    name_th: "เหรียญพญาเสือนอนกินเจ้าแห่งโภคทรัพย์ พระอาจารย์แดง วัดไร่ ปัตตานี เลข 478 เนื้อโลหะผสม",
    name: "Rian Phaya Suea Non Kin Wealth Tiger Coin Phra Ajahn Daeng Wat Rai #478",
    name_zh: "北大年府瓦莱寺帕阿赞登躺吃财富虎王铜牌 编号478",
    slug: "rian-phaya-suea-non-kin-wealth-tiger-phra-ajahn-daeng-wat-rai-478",
    short: "Rian Phaya Suea Non Kin (Wealth-Consuming Tiger King) amulet coin #478 by Phra Ajahn Daeng of Wat Rai, Pattani. Cast in mixed metal alloy.",
    description_th: `เหรียญพญาเสือนอนกิน เจ้าแห่งโภคทรัพย์ พระอาจารย์แดง วัดไร่ จังหวัดปัตตานี ตอกโค้ดหมายเลข 478 เนื้อโลหะผสม

พระอาจารย์แดง วัดไร่ ยอดพระเกจิผู้ทรงวิทยาคมแห่งแดนใต้ พญาเสือนอนกินสื่อถึงความอุดมสมบูรณ์ โภคทรัพย์หลั่งไหลเข้ามาอย่างง่ายดายโดยไม่ต้องเหน็ดเหนื่อยยากลำบาก เปี่ยมด้วยมหาอำนาจบารมี ข่มศัตรูคู่แข่ง และคุ้มครองแคล้วคลาดปลอดภัย`,
    description: `Rian Phaya Suea Non Kin (The Reclining Wealth-Consuming Tiger King, Lord of Opulence and Treasures) consecrated by Phra Ajahn Daeng of Wat Rai, Pattani Province. Hand-stamped with code number 478, cast in mixed sacred metal alloy. Phra Ajahn Daeng is renowned in southern Thailand for profound wealth-attracting and protective consecrations. The Reclining Tiger motif symbolizes effortless abundance, unhindered prosperity, and sustenance arriving effortlessly without exhaustion, accompanied by formidable tiger power against harm.`,
    description_zh: `泰国南部北大年府瓦莱佛寺帕阿赞登（Phra Ajahn Daeng）督造开光之“躺吃财富虎王”（Phaya Suea Non Kin）混合圣金属符牌，印记编号478。阿赞登大师为泰南当代督造招财神兽之著名高僧，此尊“躺吃金虎”法相寓意丰衣足食、招财不竭、福禄不绝，无需劳苦奔波即可财富自来，并兼具猛虎辟邪避险、威慑对手之大威德。`
  },
  {
    id: 1775,
    name_th: "หุ่นพยนต์ รุ่น วิรุฬจำบัง พระอาจารย์ประสูติ วัดในเตา จ.ตรัง ปี 2560 นุ่งแดง",
    name: "Hoon Payon Wirun Chambang Edition Phra Ajahn Prasut Wat Nai Tao B.E. 2560 Red Robe",
    name_zh: "董里府瓦奈套寺帕阿赞帕素佛历2560年威伦占邦期红裤魂魄勇",
    slug: "hoon-payon-wirun-chambang-phra-ajahn-prasut-wat-nai-tao-2560",
    short: "Hoon Payon Wirun Chambang talisman (Red Robe edition) by Phra Ajahn Prasut, Wat Nai Tao, Trang Province, consecrated B.E. 2560. Classic southern guardian spirit.",
    description_th: `พระอาจารย์ประสูติ ปิยธัมโม หรือพระครูวัฒนสิกขการ แห่งวัดถ้ำพระพุทธโกษีย์ หรือวัดในเตา จังหวัดตรัง เป็นพระเกจิสายใต้ที่ศึกษาวิชากับพ่อท่านแสง ธัมมสโร เจ้าอาวาสวัดในเตา ซึ่งเป็นครูบาอาจารย์สำคัญของท่าน ต่อมาพระอาจารย์ประสูติออกธุดงค์และศึกษาด้านพระธรรม กรรมฐาน และวิชาอาคมจากครูบาอาจารย์หลายสาย ก่อนกลับมาวัดในเตาในปี พ.ศ. 2540 และได้รับนิมนต์ให้ดำรงตำแหน่งเจ้าอาวาสสืบต่อจากพ่อท่านแสง ท่านมีความเชี่ยวชาญด้านการสร้างเครื่องราง โดยเฉพาะศาสตร์การผูกหุ่นพยนต์ ซึ่งเป็นวิชาที่มีการสืบทอดในสายวัดในเตาและสายเขาอ้อ`,
    description: `Hoon Payon, Wirun Chambang edition (Red Robe), consecrated in B.E. 2560 (2017) by Phra Ajahn Prasut Piyadhammo (Phra Khru Wattanasikkhakan) of Wat Tham Phra Phutthakosi (Wat Nai Tao), Trang Province. Phra Ajahn Prasut is a foremost southern master who studied directly under Pho Than Saeng Dhammasaro, the former abbot of Wat Nai Tao. He later undertook extensive Tudong pilgrimages, mastering meditation, Buddhist Dharma, and esoteric sciences across diverse traditions before returning to Wat Nai Tao in B.E. 2540, where he succeeded Pho Than Saeng as abbot. He is widely celebrated throughout Thailand for his mastery in talisman consecration, particularly the ancient Khao Or and Wat Nai Tao lineage of binding Hoon Payon protective guardian spirits.`,
    description_zh: `董里府瓦奈套（Wat Nai Tao，窟佛寺）帕阿赞帕素（Phra Ajahn Prasut Piyadhammo / 帕库瓦塔纳昔卡甘）于佛历2560年（2017年）督造开光之“威伦占邦”（Wirun Chambang）红裤魂魄勇守护圣物。帕阿赞帕素为泰南著名名僧，早年随瓦奈套寺前住持婆昙胜（Pho Than Saeng）研习法门，后深入山林头陀苦修，融汇考奥法脉与泰南秘传法要，并于佛历2540年接任瓦奈套寺住持。大师尤以督造魂魄勇（Hoon Payon）圣物饮誉全泰，寓意守护佩戴者、替主挡灾、辟邪驱煞、守家聚财。`
  },
  {
    id: 1776,
    name_th: "พระสมเด็จพิมพ์พระประทาน หลวงปู่ธูป วัดแคนางเลิ้ง กทม ยุคต้น เนื้อผง ทาทอง",
    name: "Phra Somdej Phra Prathan Early Era Luang Pu Thoop Wat Khae Nang Loeng Gilded Powder",
    name_zh: "曼谷瓦开南冷寺龙普督早期圣粉描金大佛模崇迪佛",
    slug: "phra-somdej-phra-prathan-luang-pu-thoop-wat-khae-nang-loeng-early-era",
    short: "Phra Somdej Phra Prathan early edition by Luang Pu Thoop, Wat Khae Nang Loeng, Bangkok. Consecrated holy powder with traditional gold leaf brush finish.",
    description_th: `หลวงปู่ธูป เขมสิริ หรือพระราชธรรมวิจารณ์ แห่งวัดแคนางเลิ้ง กรุงเทพมหานคร เป็นพระเกจิที่มีชื่อเสียงของกรุงเทพฯ และเป็นศิษย์ของหลวงพ่อขัน วัดนกกระจาบ จังหวัดพระนครศรีอยุธยา ท่านเริ่มสร้างวัตถุมงคลตั้งแต่ช่วง พ.ศ. 2482 โดยมีทั้งพระเนื้อผงและเครื่องราง และสร้างต่อเนื่องมาหลายยุคจนถึงช่วงปลายชีวิต องค์นี้เป็นพิมพ์พระประทานยุคต้น เนื้อผงพุทธคุณทาทองเดิมจากวัด (พระมีรอยบิ่นตามธรรมชาติเล็กน้อย)`,
    description: `Phra Somdej Phra Prathan (Presiding Buddha), early period, crafted from sacred holy powders with traditional gold brushing, consecrated by Luang Pu Thoop Khemasiri (Phra Raja Dharma Vicharn) of Wat Khae Nang Loeng (Wat Sunthorn Thammathan), Bangkok. Luang Pu Thoop was a revered Bangkok master monk and a direct disciple of the legendary Luang Pho Khan of Wat Nok Krachap, Ayutthaya Province. He began consecrating sacred amulets around B.E. 2482 (1939), producing renowned powder amulets and talismans throughout his venerable life. This early-era piece features classic holy powder texture and historic gold finish (exhibiting minor natural vintage chip typical of early powder press).`,
    description_zh: `曼谷瓦开南冷佛寺（瓦顺通昙玛坦）龙普督（Luang Pu Thoop Khemasiri / 帕拉差昙玛威赞）早期督造之圣粉描金大佛模崇迪佛。龙普督为曼谷一代著名高僧，师承大城府神僧瓦诺卡扎寺龙婆坎（Luang Pho Khan）。大师自佛历2482年（1939年）起督造佛牌圣物，其圣粉崇迪佛牌以慈悲招财、避险护身闻名。此尊为早期大佛法相模，原庙古法刷金，质地紧密，具早期老粉牌之自然风化历史痕迹。`
  },
  {
    id: 1777,
    name_th: "พระพุทธสิหิงค์ วัดธาตุน้อย นครศรีธรรมราช ปี 2511 เนื้อโลหะรมดำ พ่อท่านคล้ายเสก",
    name: "Phra Buddha Sihing Wat That Noi Nakhon Si Thammarat B.E. 2511 Blessed by Phor Than Klai",
    name_zh: "洛坤府瓦达耐寺佛历2511年黑铜金身帕佛陀西兴金佛 婆昙凯大师开光",
    slug: "phra-buddha-sihing-wat-that-noi-2511-phor-than-klai",
    short: "Historic Phra Buddha Sihing cast amulet, Wat That Noi B.E. 2511 in blackened metal, consecrated by the legendary Golden-Tongued Monk Phor Than Klai of Wat Suan Khan.",
    description_th: `พระพุทธสิหิงค์ วัดธาตุน้อย อำเภอช้างกลาง จังหวัดนครศรีธรรมราช จัดสร้างขึ้นในปี พ.ศ. 2511 เนื้อโลหะรมดำ ประกอบพิธีพุทธาภิเษกโดย พ่อท่านคล้าย วาจาสิทธิ์ (พระครูพิศิษฐ์อรรถการ) แห่งวัดสวนขัน พระอริยสงฆ์แดนใต้ผู้มีวาจาศักดิ์สิทธิ์ พระพุทธสิหิงค์เป็นพระพุทธรูปคู่บ้านคู่เมืองนครศรีธรรมราช ทรงอานุภาพด้านแคล้วคลาด ปลอดภัย มหาอำนาจ และความเจริญรุ่งเรือง`,
    description: `Phra Buddha Sihing cast amulet, Wat That Noi, Chang Klang District, Nakhon Si Thammarat Province, consecrated in B.E. 2511 (1968) in blackened sacred bronze alloy. Blessed by Phor Than Klai Wachasit (Phra Khru Phisit Atthakan) of Wat Suan Khan, the legendary 'Golden-Tongued Saint of Southern Thailand'. Phra Buddha Sihing is the most sacred protective Buddha of Nakhon Si Thammarat, revered for supreme protection, miraculous peril avoidance, authoritative fortune, and prosperity.`,
    description_zh: `泰国南部洛坤府瓦达耐佛寺于佛历2511年（1968年）铸造之黑铜熏黑帕佛陀西兴（Phra Buddha Sihing）佛尊，并由泰南公认之“金口圣僧”婆昙凯大师（Phor Than Klai Wachasit，瓦顺堪寺）亲自入定主持诵经开光大法会。帕佛陀西兴为洛坤府镇城古佛，寓意至高庇佑、逢凶化吉、抵御灾厄、权威显赫与万事昌隆。`
  }
];

async function run() {
  console.log(`Starting publication of ${PRODUCTS_TO_PUBLISH.length} products...`);
  for (const item of PRODUCTS_TO_PUBLISH) {
    const { data, error } = await supabase
      .from('products')
      .update({
        name_th: item.name_th,
        name: item.name,
        name_zh: item.name_zh,
        slug: item.slug,
        short: item.short,
        description_th: item.description_th,
        description: item.description,
        description_zh: item.description_zh,
        published: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', item.id)
      .select();

    if (error) {
      console.error(`Error updating ID ${item.id}:`, error);
    } else {
      console.log(`Successfully published ID ${item.id}: ${item.name_th} (${item.slug})`);
    }
  }

  // Verify remaining drafts
  const { data: remaining, count } = await supabase
    .from('products')
    .select('id, name_th, published', { count: 'exact' })
    .eq('published', false);

  console.log(`\nRemaining unpublished products in database: ${remaining ? remaining.length : 0}`);

  // Total published count
  const { count: publishedCount } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('published', true);

  console.log(`Total published products in store now: ${publishedCount}`);
}

run();
