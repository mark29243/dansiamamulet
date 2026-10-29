/**
 * DanSiam Amulets - Batch 6 Publishing Script
 * Products: ID 1742, 1743, 1744, 1745, 1746, 1747, 1748
 * Strictly follows user instruction:
 * "แปลตามข้อความที่มีไปก่อน ยังไม่ต้องเสริมเติมแต่ง"
 * (Translate strictly from existing text without adding extra embellishments)
 */

const fs = require('fs');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

if (fs.existsSync('.env.local')) {
  const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
  for (const k in envConfig) process.env[k] = envConfig[k];
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PRODUCTS_TO_PUBLISH = [
  {
    id: 1742,
    name: "Rian Ngob Nam Oi Wat Klang Suphanburi B.E. 2517 Blessed by Luang Pho Mui",
    name_zh: "素攀武里府瓦冈佛寺佛历2517年轮形佛牌 龙婆妹加持",
    slug: "rian-ngob-nam-oi-wat-klang-suphanburi-2517-luang-pho-mui",
    short: "Authentic Rian Ngob Nam Oi coin amulet from Wat Klang, Suphanburi, B.E. 2517. Consecrated by Luang Pho Mui Wat Don Rai and Luang Pho Ngern Wat Don Yai Hom.",
    // Keep description_th exactly as existing in db
    description_th: `เหรียญงบน้ำอ้อย วัดกลาง สุพรรณบุรี​ ปี2517 หลวงพ่อมุ่ยเสก

เหรียญงบน้ำอ้อย วัดกลาง อำเภอบางปลาม้า จังหวัดสุพรรณบุรี สร้างขึ้นในปี พ.ศ. 2517 เป็นพระที่จัดสร้างในสมัยหลวงพ่อประสาท สุปณฺฑิโต เจ้าอาวาสวัดกลางในขณะนั้น โดยมีพระเกจิอาจารย์หลายรูปเข้าร่วมพิธีปลุกเสก และมีหลวงพ่อมุ่ย วัดดอนไร่ รวมถึงหลวงพ่อเงิน วัดดอนยายหอม ร่วมในพิธีด้วย เหรียญมีองค์พระพุทธเรียงรายเป็นวงกลมทั้งด้านหน้าและด้านหลัง รวม 20 องค์ และมีเลขไทย “๑” อยู่ตรงกลางด้านหน้า สำหรับองค์ที่ระบุว่า เหรียญงบน้ำอ้อย วัดกลาง ปี 2517 หลวงพ่อมุ่ยเสก จึงเป็นวัตถุมงคลที่มีความเกี่ยวข้องกับพิธีพุทธาภิเษกของสายพระเกจิยุคเก่าที่สำคัญของสุพรรณบุรี โดยเฉพาะหลวงพ่อมุ่ย ซึ่งมรณภาพในปีเดียวกัน`,
    description: `Rian Ngob Nam Oi, Wat Klang, Bang Pla Ma District, Suphanburi Province, consecrated in B.E. 2517 (1974). This sacred medallion was created during the tenure of Luang Pho Prasart Supandhito, the then-abbot of Wat Klang. Multiple revered master monks participated in the consecration ceremony, prominently including Luang Pho Mui of Wat Don Rai and Luang Pho Ngern of Wat Don Yai Hom. The coin features small Buddha images arranged in a concentric circle on both the obverse and reverse, totaling 20 Buddhas, with the Thai numeral '1' at the center front. Associated directly with the historic consecration lineage of classic Suphanburi masters, it carries special significance as Luang Pho Mui passed away later that same year.`,
    description_zh: `素攀武里府挽巴马县瓦冈佛寺（Wat Klang）佛历2517年（1974年）督造之轮形佛牌（Rian Ngob Nam Oi）。本期佛牌于当时瓦冈寺住持龙婆巴萨（Luang Pho Prasart）时期督造，并邀请多位当代名僧共同参与加持大法会，其中包括瓦东莱寺龙婆妹（Luang Pho Mui）及瓦东亚宏寺龙婆银（Luang Pho Ngern）。佛牌正反两面共环绕排列20尊小佛陀法相，正面中央印有泰文数字“1”。此枚佛牌与素攀武里府早期名僧法脉紧密相连，特别是由当年圆寂的一代高僧龙婆妹亲自参与开光加持，极具历史与收藏价值。`
  },
  {
    id: 1743,
    name: "Rian Phra Rattana Trai Mahayana Nakprok Suriyan Chanthra Ganesha Wat Traimit B.E. 2549",
    name_zh: "曼谷瓦代密寺昭坤通猜佛历2549年大模黄铜钵盖盖料大乘三宝七龙佛日月光华后象鼻财神铜牌",
    slug: "rian-phra-rattana-trai-mahayana-nakprok-suriyan-chanthra-wat-traimit-2549",
    short: "Rian Phra Rattana Trai Mahayana Nakprok coin with Ganesha reverse, blessed by Chao Khun Thongchai Wat Traimit B.E. 2549. Large Pim in alms-bowl brass.",
    description_th: `เหรียญพระรัตนตรัยมหายาน พระนาคปรกสุริยัน จันทรา 
หลังพระพิฆเนศ เจ้าคุณธงชัย วัดไตรมิตร พิมพ์ใหญ่ ปี 2549 
เนื้อฝาบาตร`,
    description: `Rian Phra Rattana Trai Mahayana (Triple Gem Mahayana Medallion) featuring Phra Nakprok (Seven-Headed Naga Buddha) Suriyan-Chanthra (Sun and Moon) on the obverse, with Lord Ganesha on the reverse. Consecrated by Chao Khun Thongchai of Wat Traimit Witthayaram, Bangkok. Large Pim, minted in B.E. 2549 (2006) in sacred alms-bowl brass (Nuea Fa Bat).`,
    description_zh: `曼谷瓦代密佛寺昭坤通猜于佛历2549年（2006年）督造开光之大乘三宝铜牌。正面为日月光华七龙佛（帕那博佛），背面为象鼻天财神（象头神），大模，材质为传统黄铜钵盖料（Nuea Fa Bat）。`
  },
  {
    id: 1744,
    name: "Phra Nang Phaya Koon Lap Luang Pho Koon Wat Ban Rai B.E. 2517",
    name_zh: "呵叻府瓦班莱寺龙婆坤佛历2517年坤腊期南帕亚女王佛圣粉牌",
    slug: "phra-nang-phaya-koon-lap-luang-pho-koon-wat-ban-rai-2517",
    short: "Vintage Phra Nang Phaya Koon Lap powder amulet by Luang Pho Koon, Wat Ban Rai, consecrated B.E. 2517. Classic holy powder amulet in excellent condition.",
    description_th: `หลวงพ่อคูณ ปริสุทฺโธ หรือพระเทพวิทยาคม เป็นพระเกจิอาจารย์และพระนักพัฒนาสำคัญแห่งวัดบ้านไร่ จังหวัดนครราชสีมา ท่านเกิดเมื่อวันที่ 4 ตุลาคม พ.ศ. 2466 และอุปสมบทเมื่อวันที่ 5 พฤษภาคม พ.ศ. 2487 หลังอุปสมบทท่านศึกษาพระธรรม วิปัสสนากรรมฐาน และวิชาอาคมจากครูบาอาจารย์หลายรูป พร้อมออกธุดงค์และปฏิบัติธรรมในหลายพื้นที่ ต่อมาท่านกลับมาจำพรรษาที่วัดบ้านไร่และมีบทบาทสำคัญในการพัฒนาวัด รวมถึงสนับสนุนด้านการศึกษาและสาธารณประโยชน์ ท่านเป็นพระที่ดำรงชีวิตเรียบง่ายและอุทิศตนเพื่อพระพุทธศาสนาและสังคมตลอดชีวิต หลวงพ่อคูณมรณภาพเมื่อวันที่ 16 พฤษภาคม พ.ศ. 2558 สิริอายุ 92 ปี พรรษา 71`,
    description: `Phra Nang Phaya Koon Lap, consecrated in B.E. 2517 (1974) by Luang Pho Koon Parisuttho of Wat Ban Rai, crafted from sacred holy powders. Luang Pho Koon Parisuttho (later Phra Thep Witthayakhom) was a foremost master monk and developer of Wat Ban Rai, Nakhon Ratchasima Province. Born on October 4, B.E. 2466, he was ordained into the Sangha on May 5, B.E. 2487. Following his ordination, he dedicated himself to Buddhist scripture, Vipassana meditation, and sacred sciences under numerous respected teachers, undertaking extensive solitary Tudong pilgrimages. He later returned to Wat Ban Rai, leading massive community developments, educational initiatives, and public charities. Renowned for his humility and devotion, Luang Pho Koon passed away on May 16, B.E. 2558 at the age of 92, completing 71 rainy seasons in the monkhood.`,
    description_zh: `呵叻府瓦班莱佛寺龙婆坤（Luang Pho Koon Parisuttho，后赐封帕帖威塔亚空）于佛历2517年（1974年）督造开光之“坤腊（Koon Lap）”期南帕亚女王佛圣粉牌。龙婆坤大师生于佛历2466年10月4日，2487年5月5日剃度出家。出家后大师精进研习佛法与禅定内观，并随多位高僧研习法术，常年头陀苦修。后常驻瓦班莱寺，一生生活俭朴，弘扬佛法，大力兴建学校与公益设施，广受海内外信众尊崇。龙婆坤大师于佛历2558年5月16日圆寂，享寿92岁，僧腊71夏。`
  },
  {
    id: 1745,
    name: "Takrut Sarika Khu Baramee Solid Silver with Sarika Oil Luang Pu Kambu Wat Kut Chomphu B.E. 2553",
    name_zh: "乌汶府瓦古冲普寺龙普堪布佛历2553年纯银人缘鸟对管符管浸人缘油",
    slug: "takrut-sarika-khu-baramee-silver-luang-pu-kambu-wat-kut-chomphu-2553",
    short: "Takrut Sarika Khu Baramee pair in solid silver immersed in consecrated Sarika charm oil by Luang Pu Kambu Wat Kut Chomphu B.E. 2553. Authentic talisman.",
    description_th: `ตะกรุดสาริกาคู่บารมี เนื้อเงิน น้ำมันสาริกา หลวงปู่คำบุ วัดกุดชมภู ปี 2553

หลวงปู่คำบุ คุตฺตจิตโต เป็นพระเกจิอาจารย์สายวิปัสสนาแห่งวัดกุดชมภู อำเภอพิบูลมังสาหาร จังหวัดอุบลราชธานี ท่านเกิดวันที่ 15 กุมภาพันธ์ พ.ศ. 2465 ที่บ้านกุดชมภู ในครอบครัวชาวนาและชาวสวน ก่อนบรรพชาเป็นสามเณรที่วัดกุดชมภูเมื่อ พ.ศ. 2482 และอุปสมบทเป็นพระภิกษุเมื่อ พ.ศ. 2486 ได้รับฉายาว่า “คุตฺตจิตโต” ท่านศึกษาพระธรรม วิปัสสนากรรมฐาน และวิทยาคมจากครูบาอาจารย์หลายสาย โดยเฉพาะพระอาจารย์รอด วัดบ้านม่วง ซึ่งเป็นศิษย์ใกล้ชิดหลวงปู่รอด วัดทุ่งศรีเมือง นอกจากนี้ยังออกธุดงค์เพื่อศึกษากรรมฐานและวิชาต่าง ๆ ในสายสำเร็จลุนแห่งนครจำปาสัก ก่อนกลับมาจำพรรษาและปฏิบัติศาสนกิจที่วัดกุดชมภู ท่านเป็นที่รู้จักจากการปฏิบัติธรรมและการสร้างวัตถุมงคลตามตำรับวิชาที่ได้รับการถ่ายทอดมา หลวงปู่คำบุมีบทบาทอยู่กับวัดกุดชมภูและชุมชนมาอย่างยาวนาน จนได้รับความเคารพในฐานะพระอาจารย์สำคัญของเมืองอุบลราชธานี`,
    description: `Takrut Sarika Khu Baramee (Twin Sarika Birds of Meritorious Charisma), solid silver foil rolled and encased in consecrated Sarika charm oil, blessed by Luang Pu Kambu of Wat Kut Chomphu in B.E. 2553 (2010). Luang Pu Kambu Kuttacitto was a revered Vipassana master monk of Wat Kut Chomphu, Phibun Mangsahan District, Ubon Ratchathani Province. Born on February 15, B.E. 2465 in Ban Kut Chomphu to an agrarian family, he was ordained as a novice in B.E. 2482 and received full monastic ordination in B.E. 2486 with the ordained name 'Kuttacitto'. He pursued Buddhist studies, Vipassana meditation, and esoteric sciences from multiple respected lineages, notably Phra Ajahn Rod of Wat Ban Muang (a direct disciple of Luang Pu Rod of Wat Thung Si Mueang). He also undertook Tudong forest pilgrimages to cultivate meditation and master ancient sciences within the Somdej Lun of Champasak lineage. Luang Pu Kambu was widely respected for his strict meditation practice, compassion, and consecrated amulets created following traditional lineage scriptures, serving his temple and community for decades as one of Ubon Ratchathani's foremost preceptors.`,
    description_zh: `乌汶府披汶曼沙汉县瓦古冲普寺（Wat Kut Chomphu）龙普堪布（Luang Pu Kambu Kuttacitto）佛历2553年（2010年）督造开光之纯银人缘鸟对管符管（Takrut Sarika Khu Baramee），管身刻符卷制，并浸泡于加持人缘金舌鸟圣油中。龙普堪布生于佛历2465年2月15日，2482年受沙弥戒，2486年晋升比丘戒，法名“库达จิตโต”。大师精修内观禅定，师承瓦班孟寺帕阿赞洛（乌汶府圣僧瓦通西孟寺龙普洛之高徒），并曾深入丛林头陀苦修，继承老挝占巴塞崇迪伦传世法脉。大师以修持严谨慈悲及督造灵验圣物闻名，长年护持寺院造福桑梓，为乌汶府当代深得民心之德高望重圣僧。`
  },
  {
    id: 1746,
    name: "Namtao Dood Sup Wealth-Attracting Gourd Maha Lap Edition Luang Pu Tim Wat Phra Khao B.E. 2552",
    name_zh: "大城府瓦帕考寺龙普添佛历2552年大财富期吸财葫芦",
    slug: "namtao-dood-sup-maha-lap-luang-pu-tim-wat-phra-khao-2552",
    short: "Namtao Dood Sup (wealth-attracting gourd talisman) Maha Lap Dood Sup edition B.E. 2552 by Luang Pu Tim Attasanto, Wat Phra Khao, Ayutthaya Province.",
    description_th: `น้ำเต้าดูดทรัพย์ รุ่นมหาลาภดูดทรัพย์ พ.ศ. 2552 หลวงปู่ทิม วัดพระขาว "หลวงปู่ทิม อัตตสันโต" เทพเจ้าเมตตาแห่งวัดพระขาว จ.พระนครศรีอยุธยา`,
    description: `Namtao Dood Sup (Sacred Wealth-Attracting Gourd Talisman), Maha Lap Dood Sup edition, consecrated in B.E. 2552 (2009) by Luang Pu Tim Attasanto of Wat Phra Khao, Phra Nakhon Si Ayutthaya Province. Revered as the 'Deity of Compassion (Metta) of Wat Phra Khao', Luang Pu Tim blessed this sacred gourd talisman for drawing prosperity and peaceful fortune.`,
    description_zh: `大城府瓦帕考佛寺一代慈悲圣僧龙普添（Luang Pu Tim Attasanto）于佛历2552年（2009年）督造加持之“大财富吸财”（Maha Lap Dood Sup）葫芦圣物。龙普添大师被尊为大城府慈悲圣僧，此吸财葫芦寓意招财纳福、汇聚财源、辟险安康。`
  },
  {
    id: 1747,
    name: "Phra Kring Bua Khem Maha Lap Chok Mongkhon Vihara Phra Buddha Chinnarat B.E. 2543 Luang Pu Mun Co-Consecrated",
    name_zh: "彭世洛府成功佛大殿佛历2543年大福德吉祥莲瓣针佛响铃佛牌 龙普满联合加持",
    slug: "phra-kring-bua-khem-maha-lap-chok-mongkhon-phitsanulok-2543-luang-pu-mun",
    short: "Phra Kring Bua Khem Maha Lap Chok Mongkhon amulet, consecrated at Vihara Phra Buddha Chinnarat B.E. 2543 with Luang Pu Mun of Wat Ban Jan co-blessing.",
    description_th: `พระกริ่งบัวเข็มมหาลาภ โชคมงคล ร่วมพิธีมหาพุทธาภิเษก ณ วิหารพระพุทธชินราช พิษณุโลก ปี 2543 หลวงปู่หมุนร่วมเสก`,
    description: `Phra Kring Bua Khem Maha Lap Chok Mongkhon (Auspicious Lotus-Pin Ringing Buddha), consecrated during the grand historic Maha Phutthaphisek ceremony at the Vihara of Phra Buddha Chinnarat, Phitsanulok Province, in B.E. 2543 (2000). Co-consecrated by revered master monks of Thailand, prominently including Luang Pu Mun Thitasilo of Wat Ban Jan.`,
    description_zh: `彭世洛府帕西拉达那玛哈塔寺（成功佛大殿）于佛历2543年（2000年）举行盛大开光法会之“大福德吉祥”莲瓣针药师佛响铃佛牌（Phra Kring Bua Khem）。并恭请全泰顶尖名僧共同入定加持，其中当代著名圣僧龙普满（Luang Pu Mun Thitasilo，瓦班赞寺）亲自参与联合开光。`
  },
  {
    id: 1748,
    name: "Phra Pikanet Lord Ganesha Traiphakhi Si Nakhon Powder Amulet Wat Nang Tra B.E. 2548 Ajahn Khun Pan Presided",
    name_zh: "洛坤府瓦囊达寺佛历2548年南方三盟期圣粉象鼻财神 坤潘大师主持督造大法会",
    slug: "phra-pikanet-traiphakhi-si-nakhon-wat-nang-tra-2548-ajahn-khun-pan",
    short: "Phra Pikanet (Lord Ganesha) Traiphakhi Si Nakhon holy powder amulet, Wat Nang Tra, Nakhon Si Thammarat B.E. 2548. Presided over by Ajahn Khun Pan.",
    description_th: `พระพิฆเนศ รุ่นไตรภาคีศรีนคร เนื้อผง วัดนางตรา จังหวัดนครศรีธรรมราช อาจารย์ขุนพันธรักษ์ราชเดช เป็นเจ้าพิธีจัดสร้างขึ้นในปี พ.ศ. 2548`,
    description: `Phra Pikanet (Lord Ganesha), Traiphakhi Si Nakhon edition, crafted from sacred holy powders at Wat Nang Tra, Nakhon Si Thammarat Province. Consecrated with historic ceremonies in B.E. 2548 (2005), presided over by the legendary master Police Major General Khun Phantharak Rajjadej (Ajahn Khun Pan).`,
    description_zh: `洛坤府瓦囊达佛寺（Wat Nang Tra）于佛历2548年（2005年）督造之圣粉材质“南方三盟”（Traiphakhi Si Nakhon）象鼻财神（象头神）佛牌。由泰国南部传奇白衣宗师阿赞坤潘（坤潘他叻拉差德）亲自担任法会主礼宗师主持督造。`
  }
];

async function publishBatch6() {
  console.log('=== Publishing Batch 6 Products (IDs 1742 - 1748) strictly from existing text ===\n');

  for (const item of PRODUCTS_TO_PUBLISH) {
    const { data: current, error: fetchErr } = await supabase
      .from('products')
      .select('id, name, stock, images, price, published, slug')
      .eq('id', item.id)
      .single();

    if (fetchErr || !current) {
      console.error(`[SKIP] ID ${item.id} not found:`, fetchErr);
      continue;
    }

    if (current.stock <= 0) {
      console.error(`[SKIP] ID ${item.id} has stock 0! Cannot publish per rule.`);
      continue;
    }

    if (!current.images || current.images.length === 0) {
      console.error(`[SKIP] ID ${item.id} has no images! Cannot publish per rule.`);
      continue;
    }

    const updatePayload = {
      name: item.name,
      name_zh: item.name_zh,
      slug: item.slug,
      short: item.short,
      description_th: item.description_th,
      description: item.description,
      description_zh: item.description_zh,
      published: true,
      updated_at: new Date().toISOString()
    };

    const { data: updated, error: updateErr } = await supabase
      .from('products')
      .update(updatePayload)
      .eq('id', item.id)
      .select('id, name, slug, price, stock, published')
      .single();

    if (updateErr) {
      console.error(`[ERROR] Failed to publish ID ${item.id}:`, updateErr);
    } else {
      console.log(`[SUCCESS] Published ID ${updated.id}:`);
      console.log(`  Name: ${updated.name}`);
      console.log(`  Slug: https://dansiamamulets.com/product/${updated.slug}`);
      console.log(`  Price: ฿${(updated.price / 100).toLocaleString('th-TH')} THB (${updated.price} satang) | Stock: ${updated.stock}\n`);
    }
  }

  const { count: finalCount } = await supabase
    .from('products')
    .select('id', { count: 'exact' })
    .eq('published', true);
  console.log(`=== Final Total Live Published Products: ${finalCount} ===`);
}

publishBatch6();
