const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PRODUCTS_TO_PUBLISH = [
  {
    id: 1790,
    name_th: "พระชัยวัฒน์ เจ้าคุณเสงี่ยม วัดสุทัศนเทพวราราม ปี 2516 เนื้อนวะโลหะ กล่องเดิม",
    name: "Phra Chaiwat Chao Khun Sa-ngiam Wat Suthat B.E. 2516 Nawa Loha with Original Box",
    name_zh: "曼谷瓦苏泰寺昭坤先佛历2516年九宝铜胜利药师佛小立尊（带原盒）",
    slug: "phra-chaiwat-chao-khun-sa-ngiam-wat-suthat-2516-nawa-loha",
    category: "พระกริ่ง",
    short: "Authentic Phra Chaiwat consecrated in B.E. 2516 by Chao Khun Sa-ngiam, Wat Suthat. Cast in sacred nine-metal Nawa Loha, preserved in pristine original temple box.",
    description_th: `พระชัยวัฒน์เจ้าคุณเสงี่ยม วัดสุทัศนเทพวรารามราชวรมหาวิหาร กรุงเทพมหานคร จัดสร้างขึ้นเมื่อปี พ.ศ. 2516 จัดสร้างในยุคของ สมเด็จพระพุฒาจารย์ (เสงี่ยม จนฺทสิริ) อดีตเจ้าอาวาสวัดสุทัศน์ ซึ่งเป็นพระมหาเถระผู้สืบทอดตำรับและแบบแผนการสร้างพระกริ่ง-พระชัยวัฒน์สายตรงของวัดสุทัศน์ ต่อจากสมเด็จพระสังฆราช (แพ ติสฺสเทโว) และท่านเจ้าคุณศรี (สนธิ์)

พระชัยวัฒน์รุ่นนี้เททองหล่อด้วยสูตรเนื้อนวะโลหะเข้มข้นตามตำรับโบราณ ประกอบด้วยโลหะมงคล 9 ชนิด ผสมชนวนพระกริ่งเก่าของวัดสุทัศน์ ผิวพรายเงินพรายทองกลับดำตามกาลเวลา ขนาดกะทัดรัดสง่างาม มาพร้อมกล่องเดิมจากวัดสภาพสมบูรณ์

พุทธคุณโดดเด่น:
• ชัยชนะและบารมี: ขจัดอุปสรรค ชนะศัตรูคู่แข่ง หนุนดวงชะตาให้ประสบความสำเร็จและมีอำนาจบารมี
• ปราศจากโรคภัยและนิรันตราย: พุทธคุณสายพระไภษัชยคุรุ คุ้มครองปกป้องจากอุบัติเหตุ ภัยพิบัติ และสิ่งอัปมงคล
• เมตตามหานิยมและเจริญรุ่งเรือง: เสริมสง่าราศี เจรจาการงานราบรื่น เป็นที่รักและเคารพยำเกรง`,
    description: `Authentic vintage Phra Chaiwat amulet consecrated in B.E. 2516 (1973) at Wat Suthat Thepwararam, Bangkok, under the supervision of Somdej Phra Phutthachan (Sa-ngiam Chandra-ransi), the revered former abbot who directly preserved the sacred casting lineage of Somdej Phra Sangkharat Pae and Chao Khun Si Sonth.

This auspicious amulet was cast using the authentic ancient Nawa Loha (nine-sacred-metal alloy) formula of Wat Suthat, enriched with antique consecrated bronze sprues and holy metal yantra plates. The surface displays an authentic deep aged patina, compact and majestic in form. Preserved in its original historical temple presentation box in mint condition.

Core Spiritual Virtues:
• Victory & Obstacle Conquest: Grants triumphant overcome against life adversities, competition, and career impediments.
• Miraculous Protection & Health: Grounded in the healing grace of Bhaisajyaguru Buddha, shielding the bearer from accidents, malice, and misfortune.
• Royal Dignity & Metta: Elevates personal standing, executive charisma, and honorable commercial respect.`,
    description_zh: `全泰药师佛宗祠曼谷瓦苏泰寺佛历2516年（1973年）由前住持崇迪先（昭坤先）大师亲自主导督造之纯正九宝铜胜利药师佛（帕猜瓦）。大师承袭圣僧崇迪帕善卡拉培与昭坤史之古老秘传铸佛法本，血脉纯正。

此尊采用瓦苏泰寺古传九宝铜（Nawa Loha）冶炼，熔入历代珍贵古老药师佛熔铸残料，氧化包浆深沉自然，金银皮相隐现，法相端庄殊胜，并附带原庙出寺木纹原盒。

核心功效：
• 凯旋胜利与克敌制胜：化解一切障碍险阻，助事业经商立于不败之地。
• 辟邪消灾与身心平安：承接药师琉璃光如来加持，强力抵御人身意外、病煞与晦气。
• 威望显赫与贵人扶持：提升领导气场与尊贵名望，受众人敬重与信赖。`
  },
  {
    id: 1791,
    name_th: "พระเศรษฐีนวโกฏิ อาจารย์ติ๋ว วัดมณีชลขัณฑ์ ลพบุรี ปี 2539 เนื้อทองทิพย์ หมายเลข 1355 กล่องเดิม",
    name: "Phra Setthi Nawakot Ajahn Tiew Wat Mani Chonlakhan B.E. 2539 Thong Thip Code 1355",
    name_zh: "华富里府瓦玛尼春拉坎寺阿赞丢佛历2539年黄铜九面富贵佛（编号1355附原盒）",
    slug: "phra-setthi-nawakot-ajahn-tiew-wat-mani-chonlakhan-2539",
    category: "รูปหล่อ",
    short: "Sacred Phra Setthi Nawakot (Nine-Faced Wealth Buddha) B.E. 2539 by Ajahn Tiew, Wat Mani Chonlakhan, Lopburi. Cast in golden Thong Thip, coded #1355, original box.",
    description_th: `พระเศรษฐีนวโกฏิ (พระเก้าหน้ามหาเศรษฐี) จัดสร้างและปลุกเสกโดย พระครูวิเสสสุทธิคุณ (พระอาจารย์ติ๋ว ฐิตวฑฺฒโน) ยอดพระเกจิอาจารย์ผู้เรืองเวทย์แห่งวัดมณีชลขัณฑ์ ตำบลพรหมมาสตร์ อำเภอเมือง จังหวัดลพบุรี เมื่อปี พ.ศ. 2539

องค์พระหล่อหลอมด้วยเนื้อทองทิพย์ประกายสุกปลั่ง ใต้ฐานตอกโค้ดและหมายเลขกำกับประจำองค์ "1355" อย่างชัดเจน สภาพสวยสมบูรณ์คมชัดระดับประกวด มาพร้อมกล่องเดิมจากวัด อาจารย์ติ๋วเป็นหนึ่งในพระคณาจารย์ผู้สืบสานสายวิชาพรหมศาสตร์และมหาเศรษฐีนวโกฏิที่ได้รับการยอมรับสูงสุดในยุคปัจจุบัน

พุทธคุณโดดเด่น:
• โภคทรัพย์และปลดหนี้สิน: อัญเชิญบารมีแห่งมหาเศรษฐีทั้ง 9 ท่านในพุทธกาล เสริมสภาพคล่องทางการเงิน ปลดหนี้สิน เงินทองไหลมาเทมา
• ซื้อง่ายขายคล่อง: หนุนนำการค้า การลงทุน และกิจการธุรกิจให้เจริญงอกงามอย่างรวดเร็ว
• เมตตามหานิยมและคุ้มครองภัย: กันภัยพิบัติ แคล้วคลาดปลอดภัย อุดมด้วยสิริมงคลและความเจริญรุ่งเรือง`,
    description: `Sacred Phra Setthi Nawakot (Nine-Faced Wealth Buddha) statue amulet, consecrated in B.E. 2539 (1996) by Phra Khru Wisetsupphakan (Phra Ajahn Tiew Titavaddhano) of Wat Mani Chonlakhan, Lopburi Province.

Cast from radiant consecrated golden brass alloy (Nuea Thong Thip), this piece is cleanly stamped on the base with official authentication stamps and individual serial number 1355. Preserved in its original mint temple presentation box. Ajahn Tiew is celebrated across Thailand as an exceptional esoteric master of Vedic Brahma sciences and wealth-manifesting consecrations.

Core Spiritual Virtues:
• Multiplied Wealth & Debt Clearance: Invokes the merit of the Nine Great Millionaires (Navakoti Setthi) of the Buddha's era to clear financial blockages, dissolve debts, and attract constant income.
• Commercial Growth & Sales Boost: Fosters booming trade, rewarding investments, and sustained prosperity.
• Divine Harmony & Safety: Shields the home and enterprise from negative influences, poverty karma, and misfortune.`,
    description_zh: `华富里府瓦玛尼春拉坎寺一代名僧阿赞丢（帕库威色素帕甘）于佛历2539年（1996年）亲自主导督造之九面富贵佛（Phra Setthi Nawakot）。大师精通梵天秘法与古曼陀罗招财经文，享誉全泰。

此尊采用吉祥黄铜合金（Thong Thip）精工熔铸，底部打有清晰防伪印记及独立编号“1355”，品相完美如新，配有当年出寺原装红绒佛牌盒。

核心功效：
• 九方聚财与速清债务：汇聚佛陀时代九位至尊大富长者之无上福报，破除财运瓶颈，助生意迅速脱贫致富。
• 旺市兴商与客源滚滚：强力催旺销售业绩、投资进益及企业稳健扩张。
• 镇宅纳吉与避险护体：消解破耗煞气与小人阻碍，保佑合家平安吉祥、福泽绵长。`
  },
  {
    id: 1792,
    name_th: "เจ้าแม่กวนอิม หยกแกะ หลวงพ่อวิริยังค์ วัดธรรมมงคล ปี 2536 กล่องเดิม",
    name: "Goddess of Mercy Guanyin Natural Carved Jade Luang Pho Wiriyang Wat Thammamongkhon B.E. 2536",
    name_zh: "曼谷瓦昙梦昆寺龙婆威里扬佛历2536年天然加拿大碧玉手工雕刻观世音菩萨（附原盒）",
    slug: "guanyin-hand-carved-jade-luang-pho-wiriyang-wat-thammamongkhon-2536",
    category: "เครื่องราง",
    short: "Exquisite Bodhisattva Guanyin hand-carved from sacred natural Canadian jade, consecrated in B.E. 2536 by Luang Pho Wiriyang, Wat Thammamongkhon. With original box.",
    description_th: `พระโพธิสัตว์กวนอิม แกะสลักจากหยกแท้ธรรมชาติ จัดสร้างและอธิษฐานจิตปลุกเสกโดย สมเด็จพระญาณวชิโรดม (หลวงพ่อวิริยังค์ สิรินฺธโร) วัดธรรมมงคลเถาบุญญนนทวิหาร กรุงเทพมหานคร เมื่อปี พ.ศ. 2536

สร้างขึ้นจากก้อนหยกเขียวแท้บริสุทธิ์เกรดพรีเมียมที่นำเข้าจากประเทศแคนาดา ซึ่งเป็นหยกบล็อกประวัติศาสตร์รุ่นเดียวกับที่ใช้แกะสลัก "พระหยกใหญ่" (พระพุทธมงคลธรรมศรีไทย) และเจ้าแม่กวนอิมหยกขาวองค์ใหญ่ที่สุดในโลก ณ วัดธรรมมงคล องค์พระแกะสลักมืออย่างประณีตงดงาม อ่อนช้อย เปี่ยมด้วยเมตตาบารมี มาพร้อมกล่องเดิมจากวัดสภาพสมบูรณ์ 100%

พุทธคุณโดดเด่น:
• มหาเมตตาบารมีและสันติสุข: พลังหยกร่มเย็น ผสานพระเมตตาแห่งพระโพธิสัตว์กวนอิม ช่วยให้จิตใจสงบ ครอบครัวอบอุ่น มีความสุข
• คุ้มครองปกป้องภัยและสุขภาพ: หยกช่วยปรับธาตุในร่างกาย คุ้มครองจากภยันตราย อุบัติเหตุ และโรคร้าย
• เสริมโชคลาภและความอุดมสมบูรณ์: หยกเขียวสื่อถึงความเจริญงอกงาม การเงินคล่องตัว ธุรกิจการค้ามีกำไรงดงาม`,
    description: `Auspicious Bodhisattva Guanyin (Goddess of Mercy) amulet, delicately hand-carved from authentic natural Canadian jade and blessed in B.E. 2536 (1993) by Somdej Phra Yanavajirodom (Luang Pho Wiriyang Sirindharo) of Wat Thammamongkhon, Bangkok.

Carved from the historic high-grade green nephrite jade imported directly from British Columbia, Canada—the very same monumental sacred jade block used to carve the World's Largest Jade Buddha (Phra Phuttha Mongkol Thammasrithai) at Wat Thammamongkhon. The carving displays graceful feminine serenity and compassionate poise. Complete in its original vintage temple presentation box.

Core Spiritual Virtues:
• Compassionate Grace & Harmonious Peace: Emits cooling calming spiritual vibrations that dissolve interpersonal friction and cultivate familial warmth.
• Longevity & Body Protection: Natural jade balances elemental energy and wards off bodily misfortune, accidents, and negative energies.
• Flourishing Abundance: Green jade has been venerated for centuries as a premier magnet for sustainable wealth, fruitful trading, and peace of mind.`,
    description_zh: `曼谷瓦昙梦昆寺森林派禅修大宗师龙婆威里扬（Somdej Phra Yanavajirodom）于佛历2536年（1993年）亲自主导开光之天然碧玉手工雕刻观音菩萨圣像。

所用玉料源自当年大师远赴加拿大开采运回之顶级天然整块极品碧玉——与瓦昙梦昆寺名扬世界之“全泰最大天然翡翠佛与观音大佛”为同一母矿圣料。法相雕工细腻温润，神态大慈大悲，附带当年出寺原装红盒，未曾佩戴。

核心功效：
• 大慈大悲与家庭和睦：天然碧玉调和周身气场，抚平烦躁焦虑，促成合家美满与贵人善缘。
• 健康长寿与出入平安：玉石通灵吸纳负能，阻挡突发凶险、邪祟与意外灾厄。
• 招财生水与事业生机：碧绿玉色象征青翠生机，长久庇佑正财稳固、经商顺遂、福寿康宁。`
  },
  {
    id: 1793,
    name_th: "พระผงพิมพ์ลีลา หลังพระสิวลี ฝังแร่โคตรเศรษฐี ครบรอบ 1 ปี แม่ชีประทุม โชติอนันต์ ศิษย์หลวงพ่อฤาษีลิงดำ",
    name: "Phra Leela Walking Buddha Reverse Phra Sivali Rae Khot Setthi Ore Mae Chi Prathum Wat Tha Sung Disciples",
    name_zh: "曼谷与呵叻府泰东禅修精舍第一周年纪念款行走佛背西瓦里尊者嵌亿万富翁原矿石佛牌（龙婆乐士林丹高足美芝巴吞督造）",
    slug: "phra-leela-phra-sivali-rae-khot-setthi-mae-chi-prathum-wat-tha-sung",
    category: "พระผง",
    short: "Rare Walking Buddha with Phra Sivali on reverse, embedded with miraculous Rae Khot Setthi ore, commemorating 1st anniversary of Mae Chi Prathum (Wat Tha Sung lineage).",
    description_th: `พระผงพิมพ์ลีลา หลังประทับรูปพระสิวลีเถระ ฝังแร่โคตรเศรษฐี จัดสร้างขึ้นในโอกาสครบรอบ 1 ปี แห่งการละสังขารของ คุณแม่ชีประทุม โชติอนันต์ ยอดอุบาสิกาผู้บรรลุธรรมขั้นสูงและเป็นศิษย์เอกสายตรงของ พระราชพรหมยาน (หลวงพ่อฤาษีลิงดำ) วัดท่าซุง จังหวัดอุทัยธานี

พระผงรุ่นนี้รวบรวมมวลสารผงคำข้าว ผงหางหมาก ผงชานหมาก และผงพุทธคุณศักดิ์สิทธิ์สายวัดท่าซุง ไฮไลต์สำคัญคือการฝัง "แร่โคตรเศรษฐี" เม็ดแท้ดั้งเดิม ซึ่งเป็นแร่กายสิทธิ์มหัศจรรย์ที่คุณแม่ชีประทุมได้ค้นพบตามนิมิตของหลวงพ่อฤาษีลิงดำ ซึ่งหลวงพ่อเคยกล่าวรับรองไว้ว่าเป็นแร่ที่มีอานุภาพด้านโภคทรัพย์มหาศาล ใครมีไว้บูชาจะไม่มีวันจน

พุทธคุณโดดเด่น:
• มหาลาภโคตรเศรษฐี: ดึงดูดทรัพย์สินเงินทอง โชคลาภก้อนโต หนุนดวงการเงินให้รุ่งเรืองไม่มีตกต่ำ
• เมตตามหานิยมและค้าขาย: พระสิวลีและพระลีลานำพาความเจริญก้าวหน้า มีกินมีใช้ไม่ขาดสาย ผู้คนอุปถัมภ์ค้ำชู
• แคล้วคลาดและอุปถัมภ์: ป้องกันภัยพิบัติ ลบล้างอุปสรรค นำทางชีวิตไปสู่ความก้าวหน้าอย่างมั่นคง`,
    description: `Sacred holy powder amulet featuring the graceful Walking Buddha (Phra Leela) on the obverse and Phra Sivali (the Arahant of Supreme Fortune) on the reverse, embedded with authentic "Rae Khot Setthi" (Billionaire Ore) on the front. Created to commemorate the 1st Memorial Anniversary of Mae Chi Prathum Chot-anan, the venerated direct lay disciple of Luang Pho Ruesi Lingdam of Wat Tha Sung.

Crafted with sacred Pong Kam Khao (holy blessed rice powder), betel powders, and consecrated temple ashes preserved from Wat Tha Sung. Mae Chi Prathum famously discovered the legendary Rae Khot Setthi holy mineral under the direct spiritual vision of Luang Pho Ruesi Lingdam, who declared that those in possession of this ore shall never suffer destitution.

Core Spiritual Virtues:
• Prodigious Wealth Attraction: Generates an unstoppable influx of commercial wealth, investment gains, and windfall blessings.
• Unceasing Abundance (Phra Sivali Grace): Ensures that one will never lack food, shelter, finance, or loyal benefactors.
• Forward Progression (Leela Blessing): Inspires continuous upward mobility, smooth transitions, and total peril evasion.`,
    description_zh: `全泰顶尖白衣行者美芝巴吞（Mae Chi Prathum / 龙婆乐士林丹至圣女高足）圆寂一周年特别督造：正面为仪态万方的行走佛，背面为第一福德西瓦里尊者，正面特别嵌入真正的“亿万富翁天降神矿”（Rae Khot Setthi）。

此牌汇聚乌泰他尼府瓦塔松寺龙婆乐士林丹秘制神圣金饭粉、槟榔渣粉及百种吉祥经粉。此神矿乃美芝巴吞依大师禅定密示所发掘，龙婆乐士林丹曾亲口赞叹印证：“持此神矿者，生生世世绝不挨饿受穷！”

核心功效：
• 极品招财与财富巨浪：激发强悍吸金磁场，引动偏财与正财进益，永绝匮乏之苦。
• 西瓦里衣食丰足：得八方善信与贵人诚心布施相助，出行处处逢源，资粮不断。
• 行走佛步步高升：驱散生活滞碍，助事业前途平步青云，化险为夷。`
  },
  {
    id: 1794,
    name_th: "พระประจำวัน วัดชนะสงคราม ปี 2491 พิมพ์วันพฤหัสบดี (ปางสมาธิ) พระเกจิ 108 รูปเสก",
    name: "Phra Pracham Wan Wat Chana Songkhram B.E. 2491 Thursday Buddha Meditation Posture 108 Masters",
    name_zh: "曼谷瓦差那松康寺佛历2491年星期四守护佛（禅定佛）百位圣僧联合开光",
    slug: "phra-pracham-wan-wat-chana-songkhram-2491-thursday-samathi",
    category: "พระผง",
    short: "Historic Thursday Birthday Buddha (Meditation Posture) B.E. 2491, Wat Chana Songkhram, Bangkok. Blessed across an entire rains retreat by 108 legendary masters.",
    description_th: `พระประจำวันเกิด วัดชนะสงครามราชวรมหาวิหาร กรุงเทพมหานคร จัดสร้างขึ้นเมื่อปี พ.ศ. 2491 องค์นี้เป็น "พิมพ์วันพฤหัสบดี" (ปางสมาธิ) พระพุทธรูปประทับขัดสมาธิราบ พระหัตถ์ประสานบนพระเพลาอย่างสงบสง่างาม

วัตถุมงคลชุดนี้สร้างขึ้นจากมวลสารผงพุทธคุณศักดิ์สิทธิ์ ผงอิทธิเจ ผงปัทมัง ผงตรีนิสิงเห และมวลสารกรุเก่า ผสมเกสรดอกไม้มงคล เมื่อสร้างเสร็จได้จัดพิธีพุทธาภิเษกครั้งยิ่งใหญ่ตลอดไตรมาส (3 เดือนเต็ม) โดยได้อาราธนาพระคณาจารย์ผู้ทรงอภิญญาบริสุทธิ์ 108 รูปจากทั่วประเทศร่วมอธิษฐานจิต อาทิ:
• หลวงปู่นาค วัดระฆังโฆสิตาราม
• หลวงพ่อจง วัดหน้าต่างนอก
• หลวงพ่อจาด วัดบางกระเบา
• หลวงพ่อเผือก วัดกิ่งแก้ว
• หลวงปู่ใจ วัดเสด็จ
• หลวงพ่อรุ่ง วัดท่ากระบือ
• หลวงปู่โต๊ะ วัดประดู่ฉิมพลี
• หลวงพ่อเงิน วัดดอนยายหอม
• หลวงพ่อเต๋ วัดสามง่าม
• หลวงพ่อโอภาสี อาศรมบางมด
• หลวงพ่อลี วัดอโศการาม
• หลวงพ่อแพ วัดพิกุลทอง
• หลวงพ่อทบ วัดชนแดน ฯลฯ

พุทธคุณโดดเด่น:
• ชนะอุปสรรคและภัยพาล: สมชื่อวัดชนะสงคราม ชนะศัตรู ชนะคู่แข่ง พลิกฟื้นดวงชะตาจากร้ายกลายเป็นดี
• สติปัญญาและสมาธิบารมี: ปางสมาธิส่งเสริมสติปัญญา ความมั่นคงทางจิตใจ การเรียนรู้และการตัดสินใจที่ถูกต้อง
• เมตตามหานิยมและแคล้วคลาด: คุ้มครองปกป้องให้ปลอดภัย รอดพ้นจากภยันตรายทั้งปวง`,
    description: `Historic Phra Pracham Wan (Birthday Buddha) amulet consecrated in B.E. 2491 (1948) at Wat Chana Songkhram (Temple of Victory in War), Bangkok. This piece represents the Thursday Birthday Buddha depicted in the Pang Samathi (Meditation Posture), seated peacefully in samadhi.

Pressed from ancient holy scripture powders, crushed antique temple relics, and auspicious flower pollens. Once molded, this consecrated edition underwent an unbroken three-month Buddhist Rains Retreat (Trimas) grand consecration ceremony, empowered by 108 of the greatest enlightened guru monks in modern Siamese history, including:
- Luang Pu Nak, Wat Rakang
- Luang Pho Chong, Wat Na Tang Nok
- Luang Pho Jad, Wat Bang Krabao
- Luang Pho Phueak, Wat King Kaew
- Luang Pu Jai, Wat Sadet
- Luang Pho Rung, Wat Tha Krabue
- Luang Pu Toh, Wat Pradu Chimphli
- Luang Pho Ngern, Wat Don Yai Hom
- Luang Pho Tae, Wat Sam Ngam
- Luang Pho Opasi, Asrom Bang Mod
- Luang Pho Lee, Wat Asokaram
- Luang Pho Pae, Wat Pikul Thong
- Luang Pho Thob, Wat Chon Daen

Core Spiritual Virtues:
• Absolute Victory (Chana Songkhram Blessing): Triumphs over adversity, litigation, professional rivals, and spiritual hindrances.
• Wisdom, Focus & Intellect: Cultivates crystalline clarity, academic brilliance, and sound leadership decision-making.
• Universal Protection & Metta: Surrounds the wearer with deep serenity, public affection, and impenetrable safety.`,
    description_zh: `曼谷瓦差那松康寺（胜战寺）于佛历2491年（1948年）隆重督造之星期四守护佛（禅定印释迦牟尼佛像）。此寺乃泰皇朝一世王时期册封之皇家战胜名刹，凡立功将士出征祈福皆百战百胜。

此批圣粉佛牌由全泰108位近代最崇高顶尖圣僧联袂连续加持整整一个守夏节（整整三个月），参与开光大师阵容空前绝后，包括：
- 瓦拉康寺龙普纳
- 瓦那当诺寺龙婆钟
- 瓦邦卡包寺龙婆查
- 瓦敬轿寺龙婆佩
- 瓦巴鲁清批寺龙普多
- 瓦冬亚宏寺龙婆银
- 瓦三暗寺龙婆爹
- 邦莫修行林龙婆奥巴洗
- 瓦阿索卡兰寺龙婆李
- 瓦匹坤通寺龙婆培
- 瓦冲丹寺龙婆拓 等一代名宿。

核心功效：
• 胜战辟煞与转败为胜：承接胜战寺无上威名，克敌制胜，逆转低谷运势为万事通达。
• 启迪智慧与心境澄明：禅定相助益学业、考运、思虑清晰与高层决策。
• 护身避险与贵人善缘：抵御一切横祸劫煞，深获各方长辈厚爱与提携。`
  },
  {
    id: 1795,
    name_th: "หลวงปู่ทวด เนื้อว่าน พิมพ์เล็ก วัดพระสิงห์ เชียงใหม่ ปี 2506 พระอาจารย์ทิม วัดช้างให้ เสก",
    name: "Luang Pu Tuad Sacred Herbal Powder Small Mold Wat Phra Singh Chiang Mai B.E. 2506 Ajahn Tim",
    name_zh: "清迈瓦帕辛皇家佛寺佛历2506年草药圣粉小模龙普托（瓦沧海阿赞添亲自主导开光）",
    slug: "luang-pu-tuad-wahn-phim-lek-wat-phra-singh-chiang-mai-2506",
    category: "หลวงพ่อทวด",
    short: "Iconic B.E. 2506 Luang Pu Tuad small mold herbal powder amulet, blessed by Ajahn Tim of Wat Chang Hai, consecrated at Wat Phra Singh, Chiang Mai.",
    description_th: `พระหลวงปู่ทวด เหยียบน้ำทะเลจืด เนื้อว่าน พิมพ์เล็ก จัดสร้างขึ้น ณ วัดพระสิงห์วรมหาวิหาร อำเภอเมือง จังหวัดเชียงใหม่ เมื่อปี พ.ศ. 2506 โดย พระครูวิสัยโสภณ (พระอาจารย์ทิม ธมฺมธโร) แห่งวัดช้างให้ จังหวัดปัตตานี ได้นำมวลสารเนื้อว่านศักดิ์สิทธิ์ผสมดินกากยายักษ์และเกสรดอกไม้จากแดนใต้ มอบให้แก่ พระธรรมราชานุวัตร อดีตเจ้าอาวาสวัดพระสิงห์

พระรุ่นนี้ผ่านพิธีปลุกเสกอย่างเข้มขลังถึง 2 วาระ:
1. วาระที่ 1 (พ.ศ. 2506): พระอาจารย์ทิม ทำพิธีอัญเชิญญาณบารมีหลวงปู่ทวดและปลุกเสกเดี่ยวเป็นกรณีพิเศษ ณ อุโบสถวัดช้างให้ จังหวัดปัตตานี ก่อนนำขึ้นมามอบให้แก่วัดพระสิงห์
2. วาระที่ 2 (15 มกราคม พ.ศ. 2512): ได้เข้าร่วมในมหาพิธีพุทธาภิเษกครั้งประวัติศาสตร์ของแผ่นดินล้านนา พร้อมกับพระกริ่งนเรศวรเมืองงาย ณ วัดพระสิงห์ โดย พระบาทสมเด็จพระเจ้าอยู่หัว รัชกาลที่ 9 เสด็จพระราชดำเนินเป็นองค์ประธานในพิธี พระอาจารย์ไสว สุมโน วัดราชนัดดา เป็นเจ้าพิธี และพระอาจารย์ทิม วัดช้างให้ เดินทางมาร่วมอธิษฐานจิตด้วยตนเอง

องค์นี้เป็นพิมพ์เล็ก สภาพสวยเดิม มวลสารเข้มข้น ผิวพรายว่านผุดเป็นธรรมชาติ จัดเป็นหนึ่งในสุดยอดพระหลวงปู่ทวดสายตรงอาจารย์ทิมที่วงการพระเครื่องให้ความนิยมสูงสุด

พุทธคุณโดดเด่น:
• นิรันตรายและแคล้วคลาดอันดับ 1: คุ้มครองความปลอดภัยจากการเดินทาง อุบัติเหตุทางบก ทางน้ำ และทางอากาศ
• มหาลาภและความเจริญรุ่งเรือง: ค้าขายคล่องตัว การเงินไม่ขัดสน แคล้วคลาดจากความยากจน
• เมตตามหานิยม: เสริมสง่าราศี ผู้ใหญ่เอ็นดู เป็นที่เคารพรักใคร่ของคนทั่วไป`,
    description: `Highly revered Luang Pu Tuad amulet, Small Mold (Phim Lek), crafted from sacred 108 herbal powders (Nuea Wahn) and holy southern soils, consecrated in B.E. 2506 (1963) at Wat Phra Singh Woramahavihara, Chiang Mai Province.

This historic edition was personally presented by Phra Khru Wisaisophon (Phra Ajahn Tim) of Wat Chang Hai, Pattani, to Phra Dhamma Rajanuwat, the abbot of Wat Phra Singh. The batch underwent two legendary consecutive empowerments:
1. First Empowerment (B.E. 2506): Solo consecration by Phra Ajahn Tim in the sacred ordination hall of Wat Chang Hai, invoking the direct spiritual presence of Luang Pu Tuad.
2. Second Empowerment (January 15, B.E. 2512): Consecrated in the monumental Phra Kring Naresuan Mueang Ngai royal grand ceremony at Wat Phra Singh, presided over in person by His Majesty King Bhumibol Adulyadej (Rama IX), with Phra Ajahn Sawai Sumano as ceremonial master and Phra Ajahn Tim once again joining the assembly.

Core Spiritual Virtues:
• Sovereign Peril Invariance (Klaew Klaad): Thailand's premier talisman for vehicular road safety, aviation protection, and miraculous evasion of physical catastrophe.
• Enduring Prosperity & Commerce: Smooth financial mobility, business luck, and debt avoidance.
• Universal Compassion (Metta Mahaniyom): Radiates gentle authority and goodwill, securing loyal patronage and respect.`,
    description_zh: `全泰公认避险第一圣僧龙普托：佛历2506年（1963年）清迈第一皇家古刹瓦帕辛佛寺小模草药圣粉龙普托。此批圣物由瓦沧海寺阿赞添大师（帕库威塞索蓬）亲手运送南部圣料与督造，赠予清迈瓦帕辛寺时任住持。

本期圣物经历两次震撼全泰之神圣开光：
1. 佛历2506年：阿赞添大师于瓦沧海寺大雄宝殿特为本期圣物单独开光加持，引动龙普托本尊威灵。
2. 佛历2512年1月15日：参与全泰闻名之清迈瓦帕辛“纳黎萱大帝药师佛”国级皇家盛大开光法会，泰皇拉玛九世陛下亲临主祭，瓦拉差纳达寺阿赞萨怀主坛，阿赞添大师再度亲赴清迈加持。

本尊为珍稀小模，品相殊胜完好，草药老浆自然泛出，乃阿赞添正统龙普托名品中的性价比天花板。

核心功效：
• 全泰避险第一保命神僧：庇护陆海空交通行车平安，阻隔致命车祸灾伤与横祸。
• 招财纳福与破除贫困：助经商买卖顺风顺水，绝不陷入绝境。
• 慈悲人缘与逢凶化吉：增进和合人缘，深获长官贵人呵护扶持。`
  },
  {
    id: 1796,
    name_th: "พระยอดขุนพล (พระตรีกาย) หลวงพ่อวงษ์ วัดทุ่งผักกูด จ.นครปฐม ปี 2490 เนื้อดินผสมผงใบลาน",
    name: "Phra Yod Khun Phon Tri-Kaya Luang Pho Wong Wat Thung Phak Kut B.E. 2490 Sacred Clay Bai Lan",
    name_zh: "佛统府瓦通帕谷寺龙婆翁佛历2490年三身佛（帕顶坤平三身佛王）古贝叶经灰陶土佛牌",
    slug: "phra-yod-khun-phon-tri-kaya-luang-pho-wong-wat-thung-phak-kut-2490",
    category: "พระผง",
    short: "Historic Phra Yod Khun Phon (Tri-Kaya) consecrated in B.E. 2490 by Luang Pho Wong, Wat Thung Phak Kut, Nakhon Pathom. Sacred clay mixed with burnt palm-leaf scriptures.",
    description_th: `พระยอดขุนพล หรือที่เรียกกันในวงการว่า "พระตรีกาย" จัดสร้างและปลุกเสกโดย หลวงพ่อวงษ์ วัดทุ่งผักกูด อำเภอดอนตูม จังหวัดนครปฐม เมื่อปี พ.ศ. 2490

หลวงพ่อวงษ์ เป็นหนึ่งในพระเกจิอาจารย์ยุคสงครามอินโดจีนผู้ทรงวิทยาคมเข้มขลังแห่งเมืองนครปฐม ร่วมยุคสมัยเดียวกับหลวงพ่อทา วัดพะเนียงแตก และหลวงพ่อวงษ์ วัดดอนยายหอม พระพิมพ์ยอดขุนพลตรีกายนี้ สื่อถึงพระพุทธเจ้า 3 พระองค์ (หรือพระธรรมกาย พระสัมโภคกาย พระนิรมาณกาย ตามคติมหายานโบราณ)

เนื้อมวลสารสร้างจากดินขุยปูผสมดินกรุโบราณ และผงใบลานคัมภีร์เก่าเผาไฟ เนื้อหาจึงมีวรรณะสีเทาอมดำเข้มขลัง ด้านหลังเรียบแน่น แม้พระจะมีรอยลานชำรุดบริเวณขอบซ้ายตามธรรมชาติของพระอายุเกือบ 80 ปี แต่พุทธศิลป์และมวลสารยังคงความเข้มขลังทรงคุณค่ายิ่ง

พุทธคุณโดดเด่น:
• มหาอำนาจและผู้นำ: พระยอดขุนพลเด่นด้านอำนาจบารมี ข่มศัตรู ปกครองบริวาร เหมาะสำหรับข้าราชการ ทหาร ตำรวจ และผู้บริหาร
• คงกระพันชาตรีและแคล้วคลาด: ป้องกันอาวุธ ของมีคม อุบัติเหตุ และคุ้มครองชีวิตให้ปลอดภัยในยามคับขัน
• เมตตามหานิยมและหนุนดวง: ค้ำจุนดวงชะตาไม่ให้ตกต่ำ หนุนนำความเจริญก้าวหน้าในชีวิต`,
    description: `Historic Phra Yod Khun Phon amulet, commonly recognized in collector circles as "Phra Tri-Kaya" (The Three Sacred Bodies of Buddha), consecrated in B.E. 2490 (1947) by Luang Pho Wong of Wat Thung Phak Kut, Don Tum District, Nakhon Pathom Province.

Luang Pho Wong was an esteemed esoteric guru master of the Indochina War era in Nakhon Pathom, possessing profound mastery over protective sciences. The design portrays three conjoined presiding Buddhas housed within an arched pediment, symbolizing the timeless triple manifestation of enlightenment.

Molded from baked sacred earthen clay blended with crushed ancient burnt Bai Lan (palm-leaf Buddhist scriptures) ash, giving it a rich charcoal-grey texture. While this specimen shows natural edge wear on its left side typical of nearly eight decades of heritage, its spiritual core remains exceptionally intact.

Core Spiritual Virtues:
• Sovereign Authority & Command: Commands obedience, dispels rivalry, and amplifies leadership presence for executives, officials, and commanders.
• Invulnerability & Defense: Renowned for legendary Kong Grapan physical defense, warding against blades, weapons, and catastrophic accidents.
• Destiny Elevation: Stabilizes one's karmic fortunes against steep decline, securing upward career momentum.`,
    description_zh: `佛统府瓦通帕谷寺一代高僧龙婆翁（Luang Pho Wong）于佛历2490年（1947年）印度支那战争时期亲手督造之“帕顶坤平”（三身佛像）。

龙婆翁为佛统府法术名宿，与瓦帕年迭寺龙婆塔、瓦冬亚宏寺龙婆银等大师齐名。本尊法相为三尊佛陀齐坐宝殿，象征佛陀三身圆满（法身、报身、化身），法相庄严宏伟。

材质采用天然圣土混合古代手抄贝叶古经灰粉烧造，质地沉稳坚实，呈现古朴深灰色泽。此尊侧缘带有天然历史出土微痕，真实呈现近八十年古董佛宝之岁月沧桑。

核心功效：
• 无上威权与统领四方：顶坤平名号主掌威权，震慑竞争对手与小人，极利管理者与官运晋升。
• 刀枪不入与保命避险：近代战时老法加持，强力抵挡利刃、凶器伤害与突发危难。
• 稳固运势与扶摇直上：防止命数倾颓，护持佩戴者在商界与仕途步步为营、长盛不衰。`
  },
  {
    id: 1797,
    name_th: "พระรอด วัดพระสิงห์ เชียงใหม่ ปี 2496 พิมพ์หน้าหนู เนื้อดำ หายาก ผสมผงพระรอดกรุมหาวัน",
    name: "Phra Rod Wat Phra Singh Chiang Mai B.E. 2496 Phim Na Nu Rare Black Clay",
    name_zh: "清迈瓦帕辛皇家佛寺佛历2496年帕罗古佛大模老鼠脸（极罕见古法烧造黑肉版）",
    slug: "phra-rod-wat-phra-singh-chiang-mai-2496-phim-na-nu-black",
    category: "พระรอด",
    short: "Legendary Phra Rod B.E. 2496 Wat Phra Singh, Chiang Mai. Phim Na Nu (Mouse Face), rare black baked clay infused with ancient 1,200-year Wat Mahawan powders.",
    description_th: `พระรอด วัดพระสิงห์วรมหาวิหาร อำเภอเมือง จังหวัดเชียงใหม่ จัดสร้างขึ้นในมหาพิธีครั้งประวัติศาสตร์เมื่อปี พ.ศ. 2496 องค์นี้เป็น "พิมพ์หน้าหนู" วรรณะ "เนื้อดำ" ซึ่งถือเป็นเนื้อหาที่หายากและได้รับความนิยมสูงสุดในชุดพระรอดวัดพระสิงห์

มวลสารสำคัญประกอบด้วย:
• ผงแตกหักชำรุดของ พระรอดกรุวัดมหาวัน ลำพูน อายุ 1,200 ปี จำนวนมหาศาล
• ดินศักดิ์สิทธิ์จากกรุพระเมืองเหนือ
• ผงพุทธคุณและว่าน 108 ชนิด

พิธีมหาพุทธาภิเษกจัดขึ้นอย่างยิ่งใหญ่ที่สุดในภาคเหนือ ณ วัดพระสิงห์วรมหาวิหาร โดยมีพระเกจิอาจารย์ชื่อดังทั่วแผ่นดินสยามร่วมปลุกเสกอย่างพร้อมเพรียง อาทิ:
• พระศรีสัจจญาณมุนี (ท่านเจ้าคุณศรี สนธิ์) วัดสุทัศน์ฯ
• หลวงพ่อสด วัดปากน้ำ ภาษีเจริญ
• หลวงปู่นาค วัดระฆังโฆสิตาราม
• หลวงพ่อเผือก วัดกิ่งแก้ว
• หลวงพ่อรุ่ง วัดท่ากระบือ
• พระอาจารย์นำ แก้วจันทร์ (สมัยเป็นฆราวาส)
• พร้อมด้วยครูบาเจ้าและพระเถระสายเหนือผู้เรืองเวทย์

พุทธคุณโดดเด่น:
• แคล้วคลาดและรอดพ้นภัยอันดับ 1: รอดพ้นจากอุบัติเหตุ ภยันตราย คดีความ และอุปสรรคทั้งปวง
• มหาอำนาจและบารมี: เนื้อดำหายากเสริมพลังตบะเดชะ ข่มอาถรรพ์ ลบล้างมนต์ดำ
• เมตตามหานิยมและโชคลาภ: เสริมสง่าราศี เจรจาการงานราบรื่นและประสบความสำเร็จ`,
    description: `Monumental Phra Rod amulet from the historic B.E. 2496 (1953) grand consecration at Wat Phra Singh Woramahavihara, Chiang Mai Province. This rare specimen belongs to the celebrated Phim Na Nu (Mouse Face Mold) rendered in the most coveted and scarce Black Baked Clay (Nuea Dam).

The sacred composition is enriched with authentic pulverized fragments of ancient 1,200-year-old antique Hariphunchai Phra Rod from the original Wat Mahawan crypt in Lamphun, combined with 108 auspicious mountain herbs and mineral relics.

Blessed in the greatest unified northern consecration of the mid-20th century by a gathering of supreme Thai masters:
- Chao Khun Si (Sonth), Wat Suthat
- Luang Pho Sod, Wat Paknam Phasi Charoen
- Luang Pu Nak, Wat Rakang
- Luang Pho Phueak, Wat King Kaew
- Luang Pho Rung, Wat Tha Krabue
- Master Ajahn Nam (Khao Or lineage)
- Renowned Northern Lanna Kruba forest saints

Core Spiritual Virtues:
• Supreme Miraculous Escape (Phra Rod Blessing): Unfailing miraculous escape from mortal dangers, collisions, legal entanglements, and ruin.
• Commanding Authority & Warding: The rare dark clay matrix acts as an impenetrable shield against hexes, negative energies, and malice.
• Dignified Charisma & Prosperity: Bestows venerable respect, smooth speech, and steady wealth.`,
    description_zh: `全泰顶尖五大古佛之一帕罗：清迈瓦帕辛皇家佛寺佛历2496年（1953年）全泰宗师联合开光之“老鼠脸模”（Phim Na Nu）极罕见顶级“纯黑肉”（Nuea Dam）。

此期帕罗佛牌被誉为千年来“真正继承南奔府瓦玛哈宛寺1200年古帕罗圣髓”的唯一化身。制作时融入了巨量南奔瓦玛哈宛古塔出土碎裂的老帕罗古佛碎片、高山圣土及108种深山圣草药。

加持法会汇聚全泰最传奇诸山长老亲临加持：
- 曼谷瓦苏泰寺药师佛传人昭坤史（波）
- 瓦白榄佛寺龙婆术（白榄佛鼻祖）
- 瓦拉康寺龙普纳
- 瓦敬轿寺龙婆佩
- 瓦塔卡奔寺龙婆隆
- 考奥宗师阿赞南及泰北多位大圣僧。

核心功效：
• 绝境逢生全泰第一：“罗”（Rod）在泰语中意为“脱险躲过一切”。庇佑免于车祸意外、官非、绝症危机与意外凶险。
• 破煞镇邪与威灵护体：稀有黑肉具备强大驱魔镇煞威能，化解深重降头恶煞。
• 人缘至尊与基业常青：增进尊贵人缘，助经商事业安若磐石。`
  },
  {
    id: 1798,
    name_th: "พระขุนแผน มหาเวทย์ เสน่ห์ยาแฝด ปู่หมอนาค เพชรแสงแก้ว ปี 2545 เนื้อว่านดอกทอง",
    name: "Phra Khun Phaen Maha Wet Saneh Ya Faed Pu Mor Nak B.E. 2545 Golden Flower Wahn",
    name_zh: "曼谷白衣降头法术宗师普摩纳佛历2545年第一期大咒魅惑药降坤平佛牌（纯金花草药膏肉）",
    slug: "phra-khun-phaen-saneh-ya-faed-pu-mor-nak-2545-wahn-dok-thong",
    category: "พระขุนแผน",
    short: "Legendary Phra Khun Phaen Saneh Ya Faed B.E. 2545 by Pu Mor Nak Phet Saeng Kaew. Made from rare Wahn Dok Thong love-allure herbs for extreme attraction.",
    description_th: `พระขุนแผน มหาเวทย์ เสน่ห์ยาแฝด จัดสร้างและปลุกเสกโดย ปู่หมอนาค เพชรแสงแก้ว ฆราวาสจอมขมังเวทย์สายเมตตามหาเสน่ห์ชื่อดังของเมืองไทย เมื่อปี พ.ศ. 2545

องค์พระจัดสร้างด้วยมวลสารว่านมหาเสน่ห์ 108 ชนิด โดยเฉพาะ "ว่านดอกทอง" ชนิดพิเศษที่มีฤทธิ์ทางมหาเสน่ห์รุนแรงตามตำรับโบราณ ผสมผงเสน่ห์ยาแฝด ผงสาวหลง ผงช้างผสมโขลง และน้ำมันว่านมหาเสน่ห์แท้บริสุทธิ์ เนื้อหามวลสารวรรณะสีเหลืองนวล อุดมด้วยมวลสารว่านแห้งที่เห็นได้อย่างชัดเจน

ปู่หมอนาคได้ประกอบพิธีปลุกเสกเดี่ยวด้วยมนต์เสน่ห์ยาแฝดและมนต์ขุนแผนชมตลาดตามตำรับเขมรโบราณ กำกับจิตด้วยวิชามหาเสน่ห์ขาวบริสุทธิ์ ปราศจากพรายหรือสิ่งชั่วร้าย เป็นเสน่ห์สายว่านล้วนที่ปลอดภัยและมีอานุภาพสูง

พุทธคุณโดดเด่น:
• เมตตามหาเสน่ห์และมหานิยม: เสริมเสน่ห์ดึงดูดใจแก่เพศตรงข้ามและคนรอบข้าง เป็นที่รักใคร่เอ็นดู เจรจาจับใจ
• ค้าขายและเรียกลูกค้า: เรียกลูกค้าเข้าร้าน ปิดการขายง่าย เหมาะกับงานขาย งานบริการ นักเจรจา และดารานักแสดง
• เสริมโชคลาภและความสำเร็จ: เสริมดวงความรัก ความสุขในครอบครัว และดึงดูดโอกาสดีๆ เข้ามาในชีวิต`,
    description: `Legendary Phra Khun Phaen Maha Wet Saneh Ya Faed amulet, created and consecrated in B.E. 2545 (2002) by Pu Mor Nak Phet Saeng Kaew, the iconic Siamese lay master of authentic botanical love-charm sorcery.

Crafted with an extraordinary concentration of 108 sacred botanical allure herbs, crowned by rare Wahn Dok Thong (Golden Flower Herb), Wahn Sao Long, and ancient botanical affection extracts. The herbal paste displays a natural warm herbal-ochre hue, rich in visible botanical fibers.

Consecrated strictly through pure white ancient Khmer herbal enchantment ceremonies without any malevolent spirits or black magic. Pu Mor Nak's herbal creations are internationally celebrated for their gentle yet irresistible charismatic potency.

Core Spiritual Virtues:
• Irresistible Charm & Romantic Attraction: Radiates magnetic charisma, winning affection, romantic harmony, and interpersonal favor.
• Hypnotic Negotiation & Commerce: Enhances commercial persuasion, client retention, closing deals, and tips in service professions.
• Compassionate Goodwill & Luck: Softens hostile temperaments and attracts golden professional opportunities.`,
    description_zh: `全泰顶尖白衣情缘法术宗师普摩纳（Pu Mor Nak Phet Saeng Kaew）于佛历2545年（2002年）亲制之“大咒秘传情蛊草药坤平”。

采用108种深山纯天然情缘吉祥圣草药提炼压制，尤以极其稀罕名贵的“金花草”（Wahn Dok Thong）与迷情草根为核心主料，混合古传植物情缘花油精工研磨。草药肉质温润呈浅黄色，表面遍布清晰天然植物纤维。

普摩纳大师依高棉纯正白法情缘秘术日夜诵经开光，绝无阴料与恶灵，属100%纯正天然神草白法加持，安全祥和，效力极其显著。

核心功效：
• 极致人缘与异性吸引：散发难以抗拒之个人魅力，增进伴侣和睦、情意绵长及众人好感。
• 经商锁客与商谈成交：增强沟通说服力，极利公关、销售、演艺人员及商业谈判。
• 招财生运与贵人相助：化解人际隔阂，吸引财源与贵人相助，事业春风得意。`
  },
  {
    id: 1799,
    name_th: "พระปิดตา เนื้อชินตะกั่ว เจ้าคุณผล วัดหนัง กทม. ปี 2509 หลังมีจารมือ",
    name: "Phra Pidta Chin Takuah Lead Alloy Chao Khun Phon Wat Nang B.E. 2509 Hand-Inscribed Yantra",
    name_zh: "曼谷瓦囊皇家佛寺昭坤蓬佛历2509年锡铅合金掩面必打佛（背后大师亲手刻符）",
    slug: "phra-pidta-chin-takuah-chao-khun-phon-wat-nang-2509-hand-yant",
    category: "พระปิดตา",
    short: "Authentic Phra Pidta cast in sacred lead alloy by Chao Khun Phon, Wat Nang, B.E. 2509. Features hand-inscribed master yantra on reverse, in prime vintage condition.",
    description_th: `พระปิดตา เนื้อชินตะกั่ว จัดสร้างและปลุกเสกโดย พระสุนทรศีลสมาจาร (เจ้าคุณผล คังคโชโต) อดีตเจ้าอาวาสวัดหนังราชวรวิหาร เขตจอมทอง กรุงเทพมหานคร เมื่อปี พ.ศ. 2509

เจ้าคุณผล เป็นศิษย์เอกสายตรงผู้สืบทอดสรรพวิชาการสร้างพระปิดตาและเครื่องรางสายวัดหนังต่อจาก พระภาวนาโกศลเถร (หลวงปู่เอี่ยม วัดหนัง) พระมหาเถระผู้เป็นอาจารย์ องค์พระหล่อหลอมด้วยเนื้อชินตะกั่วผสมชนวนพระเก่าของหลวงปู่เอี่ยม ด้านหลังมีรอยจารอักขระยันต์ด้วยลายมือของเจ้าคุณผลอย่างประณีตชัดเจน ผิวพระมีคราบไขตะกั่วธรรมชาติบ่งบอกถึงความเก่าแท้ตามอายุเกือบ 60 ปี

พุทธคุณโดดเด่น:
• มหาอุดและคงกระพันชาตรี: สืบสานสายวิชาหลวงปู่เอี่ยม วัดหนัง ป้องกันอาวุธ ของมีคม แคล้วคลาดจากอุบัติเหตุและภยันตราย
• มหาลาภและโภคทรัพย์: ปิดทวารทั้ง 9 เพื่อกักเก็บทรัพย์สิน ป้องกันเงินทองรั่วไหล เสริมการเงินให้มั่นคง
• เมตตามหานิยมและกันคุณไสย: สยบสิ่งอัปมงคล เสนียดจัญไร และป้องกันภูติผีปีศาจ`,
    description: `Classic Phra Pidta amulet cast in sacred Chin Takuah (lead-tin alchemical alloy), consecrated in B.E. 2509 (1966) by Chao Khun Phon (Phra Sunthorn Sila Samachar), the distinguished abbot of Wat Nang Ratchaworawihan, Bangkok.

Chao Khun Phon was the foremost primary disciple and direct spiritual lineage heir of the legendary Luang Pu Iam of Wat Nang (maker of Thailand's premier top-five antique Phra Pidta). Cast with ancient consecrated lead alloy infused with remaining sacred metal remnants from Luang Pu Iam's era. The reverse features authentic hand-inscribed sacred yantra etchings performed by the master himself, coated with authentic natural lead patina bloom.

Core Spiritual Virtues:
• Supreme Invulnerability (Kong Grapan & Maha-Ud): Inherits the impenetrable protective shield of the Wat Nang lineage against violent aggression, sharp weapons, and road mishaps.
• Wealth Preservation & Fortune: Sensory-portal sealing prevents capital outflow, retains earnings, and stabilizes business wealth.
• Evil Repulsion & Metta: Neutralizes malevolent sorcery, dark entities, and backstabbing rivals while cultivating respectful authority.`,
    description_zh: `曼谷吞武里著名皇家名刹瓦囊佛寺（Wat Nang）昭坤蓬（Chao Khun Phon / 帕孙通西拉萨玛赞）于佛历2509年（1966年）亲手铸造之纯正锡铅合金闭眼掩面必打佛。

昭坤蓬大师乃全泰五大古老必打佛之首——瓦囊寺龙普严（Luang Pu Iam）大师之唯一正统亲传大弟子。本尊以古老锡铅熔铸，并掺入龙普严大师当年遗留之古老符片圣料，牌身背面留有大师当年亲手一笔一划雕刻之古传护身符印，铅皮包浆纯正浑厚。

核心功效：
• 顶级避险与刀枪不入（Kong Grapan）：承袭瓦囊寺数百年刀枪不入之威名，化解突发凶险、机械伤及意外灾难。
• 守财聚财与偏财丰盈：封闭九窍以守住财源，杜绝财富流失与投资漏财。
• 辟邪消煞降魔：彻底阻绝降头黑法与邪灵侵袭，护佑家宅安宁。`
  },
  {
    id: 1800,
    name_th: "เหรียญท้าวจตุคามรามเทพ ปี 2548 เนื้อสามกษัตริย์ รุ่นมงคลบารมีศรีธรรมราช วัดถลุงทอง พิธีใหญ่",
    name: "Jatukam Ramathep Medallion B.E. 2548 Tri-Color Sam Kasat Mongkol Barami Wat Thalung Thong",
    name_zh: "洛坤府瓦塔隆通寺佛历2548年“吉祥胜德”三色金大型盛典泽度金天神立尊法相佛牌",
    slug: "jatukam-ramathep-mongkol-barami-sri-thammarat-wat-thalung-thong-2548-tri-tone",
    category: "เครื่องราง",
    short: "Grand consecration Jatukam Ramathep medallion B.E. 2548 in exquisite tri-color metal (Sam Kasat), Wat Thalung Thong. Blessed by top Southern masters.",
    description_th: `เหรียญพระเทวราชโพธิสัตว์ ท้าวจตุคามรามเทพ รุ่น "มงคลบารมีศรีธรรมราช" จัดสร้างขึ้นเมื่อปี พ.ศ. 2548 ณ วัดถลุงทอง อำเภอร่อนพิบูลย์ จังหวัดนครศรีธรรมราช เนื้อสามกษัตริย์ (ทอง เงิน นาก) พิมพ์ทรงกลมขนาดกำลังบูชา สภาพสวยกริ๊บ ผิวกระจกเงางาม

วัตถุมงคลรุ่นนี้จัดสร้างขึ้นเพื่อสมทบทุนบูรณะศาสนสถานวัดถลุงทอง และอาคารอเนกประสงค์ "มงคลบารมี" ของพ่อท่านคลิ้ง จนฺทสิริ อดีตพระอริยสงฆ์แห่งแดนใต้ พิธีเททองนำฤกษ์เมื่อวันที่ 8 ตุลาคม 2548 เกิดปรากฏการณ์มหัศจรรย์ฝนตกหนักรอบมณฑลพิธี แต่ภายในบริเวณพิธีกลับแห้งสนิทจนเสร็จสิ้นพิธีจึงมีฝนพรำลงมาดั่งน้ำพระพุทธมนต์

ผ่านพิธีมหาเทวาภิเษก-พุทธาภิเษกครั้งยิ่งใหญ่ถึง 2 วาระ โดยมี พระอาจารย์ประจวบ คงเหลือ เป็นเจ้าพิธีอัญเชิญองค์พ่อจตุคามรามเทพ พร้อมพระเกจิอาจารย์สายใต้ระดับตำนานร่วมปลุกเสก อาทิ:
• พ่อท่านนวล วัดไสหร้า
• พ่อท่านเอื้อม วัดเนินธัมมัง
• พ่อท่านไข่ วัดลำนาว
• พ่อท่านเนียม วัดบางไทร
• พ่อท่านท้วม วัดศรีสุวรรณ
• พ่อท่านคล้อย วัดภูเขาทอง
• พ่อท่านกลั่น วัดเขาอ้อ
• พ่อท่านเขียว วัดห้วยเงาะ
• พ่อท่านทอง วัดสำเภาเชย ฯลฯ

พุทธคุณโดดเด่น:
• พลิกฟื้นดวงชะตาและโชคลาภ: ขอได้ไหว้รับ หนุนดวงชะตา พลิกจากร้ายกลายเป็นดี บันดาลทรัพย์สินเงินทอง
• มหาอำนาจและบารมี: ป้องกันภัยพิบัติ ชนะศัตรูคู่แข่ง บริวารเคารพยำเกรง
• เมตตามหานิยมและการค้าขาย: ซื้อง่ายขายคล่อง ธุรกิจเจริญก้าวหน้า มีชื่อเสียงเกียรติยศ`,
    description: `Sacred Jatukam Ramathep heavenly medallion, "Mongkol Barami Sri Thammarat" batch, struck in luxurious Sam Kasat (Tri-Metal Gold/Silver/Rose Gold plating), consecrated in B.E. 2548 (2005) at Wat Thalung Thong, Nakhon Si Thammarat.

Organized to rebuild the facilities of Wat Thalung Thong and commemorate the legacy of the late saint Por Than Kling Chandasiri. During the casting ceremony on October 8, 2548, miraculous localized atmospheric occurrences were documented as heavy rain poured outside the consecrated boundary while the ritual perimeter remained completely dry.

Consecrated across two monumental sacred devabhiseka ceremonies led by Master Prachuab Kongluea and Thailand's foremost southern monastic masters:
- Por Than Nual, Wat Sai Rah
- Por Than Eum, Wat Noen Thammang
- Por Than Khai, Wat Lam Nao
- Por Than Niam, Wat Bang Sai
- Por Than Thuam, Wat Sri Suwan
- Por Than Kloi, Wat Phu Khao Thong
- Por Than Klan, Wat Khao Or
- Por Than Khieo, Wat Huay Ngoh
- Por Than Thong, Wat Sampao Chey

Core Spiritual Virtues:
• Destiny Reversal & Wish Fulfillment: Famed for granting heartfelt prayers, transforming failing endeavors into triumphs, and ushering immense commercial luck.
• Sovereign Authority & Triumph: Bestows commanding presence, vanquishes workplace adversaries, and earns widespread reverence.
• Commercial Boom & Metta: Smooths business negotiations, draws lucrative clients, and secures prosperous expansion.`,
    description_zh: `全泰天神圣物热潮发源地洛坤府：瓦塔隆通寺（Wat Thalung Thong）于佛历2548年（2005年）盛大督造之“吉祥胜德”泽度金天神立尊法相佛牌。尊贵三色金（金、银、红铜镀金）精工压铸，镜面光泽完好如新。

此期督造旨在重修泰南一代罗汉圣僧婆谭克灵（Por Than Kling）大师纪念大殿。佛历2548年10月8日浇铸吉时，天地突现祥瑞吉兆：法会外围暴雨如注，而坛城中心滴雨未落，直至浇铸圆满方降下甘霖天露。

历经两场盛大皇家级天神开光盛典，由传奇白衣大师阿赞巴蜀主坛通灵请神，汇聚泰南近代最强大师联合加持：
- 婆谭暖（瓦塞拉）
- 婆谭恩（瓦能昙芒）
- 婆谭凯（瓦兰闹）
- 婆谭念（瓦邦塞）
- 婆谭团（瓦是素湾）
- 婆谭盖（考奥派瓦普考通）
- 婆谭格兰（瓦考奥本寺）
- 婆谭桥（瓦惠娥）
- 婆谭通（瓦三包彻）等一代高僧。

核心功效：
• 有求必应与逆转低谷：泽度金天神以“有求必应、绝处逢生”闻名全泰，破除一切霉运水逆，迎来巨额财富。
• 权势威望与商战凯旋：助升迁显赫，威压竞争对手与险恶小人。
• 招四方财运与贵人扶持：旺盛正财与投资运，保合家财源滚滚、基业昌隆。`
  },
  {
    id: 1801,
    name_th: "พระกริ่ง นิรันตราย สมเด็จพระมหาวีรวงศ์ วัดราชบพิธสถิตมหาสีมาราม กทม. ปี 2543 เนื้อเงิน",
    name: "Phra Kring Nirantarai Solid Silver Somdej Phra Maha Wirawong Wat Ratchabophit B.E. 2543",
    name_zh: "曼谷皇家第一佛寺瓦拉差波披寺佛历2543年崇迪帕玛哈威拉翁纯银无灾无险药师铃铛佛",
    slug: "phra-kring-nirantarai-somdej-maha-wirawong-wat-ratchabophit-2543-solid-silver",
    category: "พระกริ่ง",
    short: "Exquisite solid silver Phra Kring Nirantarai B.E. 2543 by Somdej Phra Maha Wirawong, Wat Ratchabophit. Inspired by King Rama IV's Royal Buddha of No Danger.",
    description_th: `พระกริ่ง นิรันตราย เนื้อเงินบริสุทธิ์ จัดสร้างและประกอบพิธีมหาพุทธาภิเษก ณ วัดราชบพิธสถิตมหาสีมารามราชวรวิหาร พระอารามหลวงชั้นเอกแห่งพระบรมราชจักรีวงศ์ กรุงเทพมหานคร เมื่อปี พ.ศ. 2543 โดย สมเด็จพระมหาวีรวงศ์ (สนิท เขมจารี) มหาเถระผู้ทรงสมณศักดิ์ชั้นผู้ใหญ่แห่งสายธรรมยุต

พระกริ่งรุ่นนี้จำลองพุทธศิลป์มาจาก "พระนิรันตราย" พระพุทธรูปศักดิ์สิทธิ์ประจำรัชกาลที่ 4 พระบาทสมเด็จพระจอมเกล้าเจ้าอยู่หัว ซึ่งมีความหมายอันเป็นมงคลยิ่งว่า "ปราศจากอันตรายทั้งปวง" หล่อหลอมด้วยเนื้อเงินแท้บริสุทธิ์ ผิวพรรณสว่างนวล คมชัดทุกรายละเอียด ภายในบรรจุเม็ดกริ่ง ดังกังวานไพเราะ

พุทธคุณโดดเด่น:
• นิรันตรายและแคล้วคลาดสูงสุด: คุ้มครองปกป้องให้แคล้วคลาดจากอุบัติเหตุ อาวุธ ภัยพิบัติ และสิ่งชั่วร้ายทั้งปวง
• โภคทรัพย์และยศศักดิ์บารมี: เสริมความเจริญก้าวหน้าในหน้าที่การงาน เลื่อนขั้นเลื่อนตำแหน่ง มียศศักดิ์และเกียรติยศ
• เมตตามหานิยมและสุขภาพ: เสริมพลังชีวิต ปราศจากโรคภัยไข้เจ็บ จิตใจสงบร่มเย็น เป็นที่รักและเคารพของผู้คน`,
    description: `Distinguished solid silver Phra Kring Nirantarai amulet, consecrated in B.E. 2543 (2000) at Wat Ratchabophit Sathit Maha Simaram, the paramount royal temple of the Chakri Dynasty, Bangkok, under the patronage of Somdej Phra Maha Wirawong (Sanit Khemachari).

Cast after the iconic "Phra Nirantarai" (The Buddha of Total Dangerlessness), the celebrated royal palladium Buddha created during the reign of King Rama IV (Mongkut), who famously named it to signify complete freedom from all perils and tribulations. Cast in lustrous pure solid silver, containing an interior sacred metallic rattle (Kring) that rings with a crisp melodious resonance when gently moved.

Core Spiritual Virtues:
• Sovereign Peril Invariance (Nirantarai): Complete and unfailing protection against physical trauma, highway accidents, natural disasters, and malefic hostility.
• Executive Elevation & Nobility: Endows public officials, statesmen, and business leaders with distinguished prestige, rapid promotion, and institutional authority.
• Radiant Vitality & Inner Serenity: Wards away debilitating sickness, calms spiritual unrest, and draws elite patronage.`,
    description_zh: `泰国拉玛王朝最高皇家第一古寺曼谷瓦拉差波披寺（Wat Ratchabophit）于佛历2543年（2000年）由僧王级大宗师崇迪帕玛哈威拉翁（Sanit Khemachari）亲自主导督造之纯银版“无灾无险”（Nirantarai）药师铃铛佛。

本尊依循泰皇拉玛四世（四世皇蒙固）亲赐之国宝圣相“无灾无险佛”法相铸造。“Nirantarai”在巴利梵语中意为“彻底远离一切凶险灾难”。通体采用高纯度真银熔铸，法相肃穆圣洁，内藏神圣金属药师响珠，晃动时清脆悦耳。

核心功效：
• 至高避险与无灾无难：名副其实之皇家级全方位辟险护身，彻底阻隔人身车祸意外、恶疾与灾难。
• 升官晋爵与名利双收：深具皇家福泽加持，助仕途飞黄腾达、平步青云、企业威望日增。
• 健康祛病与内心祥和：借药师佛之无量功德，驱除病煞晦气，护佑福寿安康、神清气爽。`
  },
  {
    id: 1802,
    name_th: "พระกริ่งปวเรศ เจ้าสัวสยาม ปี 2559 วัดพระมหาธาตุฯ นครศรีธรรมราช เนื้อสัมฤทธิ์ หมายเลข 1862",
    name: "Phra Kring Pawaret Chao Sua Siam Wat Phra Mahathat B.E. 2559 Bronze Serial 1862",
    name_zh: "洛坤府瓦帕玛哈泰大皇寺佛历2559年“暹罗巨富”（Chao Sua）铜合金药师铃铛佛（独立编号1862）",
    slug: "phra-kring-pawaret-chao-sua-siam-wat-phra-mahathat-2559-bronze-1862",
    category: "พระกริ่ง",
    short: "Majestic Phra Kring Pawaret 'Chao Sua Siam' B.E. 2559, Wat Phra Mahathat, Nakhon Si Thammarat. Sacred bronze, laser code #1862 (limited mintage of 2,559).",
    description_th: `พระกริ่งปวเรศ รุ่น "เจ้าสัวสยาม" จัดสร้างขึ้นเมื่อปี พ.ศ. 2559 ณ วิหารหลวง วัดพระมหาธาตุวรมหาวิหาร จังหวัดนครศรีธรรมราช เนื้อสัมฤทธิ์โบราณ ผิวพรายรมดำมันวาว ใต้ฐานตอกโค้ดและยิงเลเซอร์หมายเลขกำกับประจำองค์ "1862" จากจำนวนสร้างจำกัดเพียง 2,559 องค์

พุทธศิลป์จำลองตามแบบแผน "พระกริ่งปวเรศ" สุดยอดพระกริ่งอันดับหนึ่งแห่งแผ่นดินสยาม ผสานพุทธคุณด้าน "เจ้าสัว" เสริมความมั่งคั่งร่ำรวย ผ่านพิธีมหาพุทธาภิเษก-เทวาภิเษกครั้งยิ่งใหญ่ ณ มณฑลพิธีวิหารหลวง วัดพระมหาธาตุฯ โดยพระเกจิอาจารย์สายใต้และสายเขาอ้อร่วมประจุพลังอย่างเข้มขลัง ภายในบรรจุเม็ดกริ่งดังกังวาน

พุทธคุณโดดเด่น:
• โภคทรัพย์มหาเศรษฐีและเจ้าสัว: เสริมดวงการเงิน ดึงดูดทรัพย์สินเงินทอง การค้าขายรุ่งเรือง เป็นมหาเศรษฐีผู้มีอันจะกิน
• แคล้วคลาดและสุขภาพพลานามัย: บารมีพระไภษัชยคุรุป้องกันโรคภัยไข้เจ็บ คุ้มครองให้ปลอดภัยในทุกการเดินทาง
• อำนาจบารมีและเกียรติยศ: เสริมสง่าราศี ผู้ใหญ่ให้ความอุปถัมภ์ กิจการก้าวหน้ามั่นคงถาวร`,
    description: `Majestic Phra Kring Pawaret amulet, celebrated as the "Chao Sua Siam" (Tycoon of Siam) edition, consecrated in B.E. 2559 (2016) in the grand royal hall of Wat Phra Mahathat Woramahawihan, Nakhon Si Thammarat Province.

Modeled after the legendary Phra Kring Pawaret—the apex of all Siamese metal Buddha casting art. Cast in sacred antique Samrit (sacred multi-metal bronze) with an aged sheen. The base is crisply laser-engraved with the official temple serial number 1862 from a strictly limited worldwide mintage of only 2,559 pieces. Contains a ringing internal holy metal rattle.

Consecrated in a majestic Southern assembly by Khao Or masters and high prelates of Nakhon Si Thammarat to manifest immense business wealth and health.

Core Spiritual Virtues:
• Tycoon Prosperity (Chao Sua Blessing): Catalyzes massive wealth accumulation, booming corporate returns, and unstoppable financial expansion.
• Bhaisajyaguru Healing Grace: Drives away disease, dissolves stress, and creates an impenetrable aura against travel perils.
• Executive Stature: Bestows commanding dignity and unwavering patronage from influential figures.`,
    description_zh: `泰南第一皇家圣迹洛坤府瓦帕玛哈泰大皇寺（Wat Phra Mahathat）于佛历2559年（2016年）隆重督造之“暹罗巨富”（Chao Sua Siam）帕克林药师佛。

本尊遵循全泰第一药师佛“帕克林波望烈斯”（Pawaret）神圣古制，法相庄严典雅。采用古法神圣青铜合金（Samrit）精工熔铸，泛出醇厚古董铜光。底部激光刻有官方防伪印记及独立编号“1862”，全泰限量督造仅2,559尊。内藏药师灵珠，声如天籁。

于洛坤府大皇寺皇室正殿举行盛大佛天开光盛典，考奥名门及泰南顶尖圣僧汇聚加持。

核心功效：
• 巨贾富豪级招财运：赋予“เจ้าสัว”（Chao Sua / 巨商大贾）招财威能，助正财横财两旺、投资翻倍、跃升财富新阶层。
• 药师佛护佑安康：消灾免难，调和身心健康，护航出行万无一失。
• 显赫地位与贵人拥护：增强企业决策力与社会声誉，赢得四方尊崇。`
  },
  {
    id: 1803,
    name_th: "เหรียญหลวงปู่ทวด หน้ารุ่น 4 หลังสมเด็จพระพุฒาจารย์โต ออกปี 2513 เนื้ออัลปาก้า ท่านเจ้าคุณนรฯ เสก",
    name: "Luang Pu Tuad Roon 4 Reverse Somdej Toh B.E. 2513 Alpaca Coin Chao Khun Nor Consecration",
    name_zh: "曼谷瓦贴素林佛寺佛历2513年正面龙普托四期法相背阿赞多崇迪高僧白铜纪念币（周冠罗亲尊加持）",
    slug: "luang-pu-tuad-somdej-toh-chao-khun-nor-2513-alpaca-medallion",
    category: "หลวงพ่อทวด",
    short: "Auspicious double-sided medallion B.E. 2513: Luang Pu Tuad on front, Somdej Toh on reverse. Consecrated by enlightened Arahant monk Chao Khun Nor. Alpaca alloy.",
    description_th: `เหรียญหลวงปู่ทวด หน้ารุ่น 4 ด้านหลังประทับรูป สมเด็จพระพุฒาจารย์ (โต พรหมรังสี) วัดระฆังโฆสิตาราม จัดสร้างขึ้นเมื่อปี พ.ศ. 2513 ปั๊มด้วยเนื้ออัลปาก้าแท้บริสุทธิ์ สภาพสวยคมกริ๊บ ผิวตึงเงางามดุจกระจก

เหรียญรุ่นนี้รวมบารมีแห่ง 2 มหาบูรพาจารย์ผู้ยิ่งใหญ่ที่สุดในประวัติศาสตร์พุทธศาสนาฝ่ายสยาม ได้แก่ หลวงปู่ทวด (พระโพธิสัตว์แห่งแดนใต้ ผู้มีพุทธคุณด้านแคล้วคลาดนิรันตรายอันดับ 1) และ สมเด็จพระพุฒาจารย์ (โต พรหมรังสี) จักรพรรดิแห่งพระเครื่องเมืองสยาม (ผู้มีพุทธคุณด้านเมตตามหานิยมและครอบจักรวาล)

ความพิเศษสูงสุดคือ ได้รับการอธิษฐานจิตปลุกเสกเดี่ยวอย่างเข้มขลังโดย พระธัมมวิตักโกภิกขุ (ท่านเจ้าคุณนรฯ / พระยานรรัตนราชมานิต) อริยสงฆ์ผู้บรรลุธรรมชั้นสูงแห่งวัดเทพศิรินทราวาส กรุงเทพมหานคร พระผู้มีจิตบริสุทธิ์อัศจรรย์ เป็นเหรียญที่มีความเข้มขลังและเป็นที่เสาะแสวงหาของผู้นิยมพระเครื่องอย่างยิ่ง

พุทธคุณโดดเด่น:
• นิรันตรายและแคล้วคลาดปลอดภัย: บารมีหลวงปู่ทวดและเจ้าคุณนรฯ คุ้มครองให้ปลอดภัยจากอุบัติเหตุ อาวุธ และภยันตรายทั้งปวง
• เมตตามหานิยมและโชคลาภ: บารมีสมเด็จพระพุฒาจารย์ (โต) นำพาความเจริญก้าวหน้า มีกินมีใช้ไม่มีวันอด
• เสริมสง่าราศีและความสุขสงบ: จิตใจสงบ หนุนดวงชะตาให้สูงส่ง เป็นสิริมงคลสูงสุดแก่ชีวิต`,
    description: `Magnificent double-sided sacred medallion struck in B.E. 2513 (1970). The obverse portrays Luang Pu Tuad of Wat Chang Hai (rendered in the classic Roon 4 style), while the reverse features Somdej Phra Phutthachan (Toh Phromrangsi) of Wat Rakang.

Struck in lustrous authentic alpaca metal alloy, exhibiting crisp details and radiant field luster. This edition unifies the divine spiritual graces of Siam's two most revered transcendent masters: Luang Pu Tuad (the Bodhisattva of supreme peril evasion) and Somdej Toh (the Emperor of loving-kindness and sovereign protection).

The supreme hallmark of this medallion is that it was personally consecrated by the enlightened Arahant monk Chao Khun Nor (Phra Dhamma Vitakko / Phraya Norarat Ratchamanit) of Wat Thepsirintrawat, Bangkok. Renowned across Thailand for unyielding purity and miraculous psychic powers.

Core Spiritual Virtues:
• Ultimate Road & Life Defense: The combined graces of Luang Pu Tuad and Chao Khun Nor render the wearer impervious to fatal collisions, malice, and dark energy.
• Imperial Loving-Kindness & Prosperity: Somdej Toh's blessings open pathways to effortless abundance, smooth trade, and respected status.
• Spiritual Clarity & Karmic Elevation: Elevates one's life trajectory, dispelling bad luck and cultivating lasting serenity.`,
    description_zh: `全泰两大最崇高圣僧合一之珍贵纪念币：佛历2513年（1970年）正面为瓦沧海寺龙普托大师经典四期法相，背面为瓦拉康寺崇迪阿赞多（普陀赞多）圣僧法相。通体采用高质感白铜（Alpaca）精工冲压，品相如镜面般光洁完好。

此尊汇聚泰国佛教史上最伟大的两大精神图腾：避险第一之“南天菩萨龙普托”与万佛之王崇迪鼻祖“阿赞多大师”。

本牌最殊胜非凡之处在于：获得近代公认证得大阿罗汉圣果的曼谷瓦贴素林佛寺传奇圣僧——周冠罗（Chao Khun Nor / 帕昙玛维塔果）大师亲身入定单独开光。大师一生持戒至清，加持力震撼全泰。

核心功效：
• 陆海空避险保命无敌：龙普托与周冠罗无量佛光守护，强力抵御一切重大车祸、凶祸与突发灾难。
• 崇迪阿赞多至尊人缘财源：广开正财偏财法门，经商顺利，衣食无缺。
• 净化业障与气运升腾：周冠罗纯净无瑕定力加持，提升个人运势，福慧双增。`
  },
  {
    id: 1804,
    name_th: "พระยศเศรษฐี วัดศิลาชลเขต นครศรีธรรมราช ปี 2509 เนื้อดินผสมผง พ่อท่านคล้าย อาจารย์นำ พ่อท่านโบ เสก",
    name: "Phra Yot Setthi Wat Sila Chonlakhet B.E. 2509 Por Than Klai Ajahn Nam Khao Or Consecration",
    name_zh: "洛坤府瓦西拉春拉客寺佛历2509年“高官巨富佛”（金口圣僧婆谭凯与考奥阿赞南联合开光）",
    slug: "phra-yot-setthi-wat-sila-chonlakhet-2509-por-than-klai-ajahn-nam",
    category: "พระผง",
    short: "Historic Phra Yot Setthi B.E. 2509, Wat Sila Chonlakhet. Consecrated by Por Than Klai (Golden Mouth Saint), Ajahn Nam (Khao Or), and Por Than Bo.",
    description_th: `พระยศเศรษฐี เนื้อดินผสมผงพุทธคุณ จัดสร้างขึ้นเมื่อปี พ.ศ. 2509 ณ วัดศิลาชลเขต อำเภอสิชล จังหวัดนครศรีธรรมราช พระผงรุ่นประวัติศาสตร์ที่รวบรวมสุดยอดพระเกจิอาจารย์แดนใต้ร่วมปลุกเสกอย่างคับคั่ง

มวลสารประกอบด้วย:
• ดินจากกรุพระโบราณเมืองนครศรีธรรมราช
• ผงพุทธคุณ 108 ชนิด
• ผงว่านยาและแร่ศักดิ์สิทธิ์จากเทือกเขานครศรีธรรมราช

ความพิเศษสุดยอดคือ พิธีพุทธาภิเษกได้รับการอธิษฐานจิตปลุกเสกจาก พระครูพิศิษฐ์อรรถการ (พ่อท่านคล้าย วาจาสิทธิ์) แห่งวัดสวนขัน "เทวดาเมืองคอน", พระอาจารย์นำ แก้วจันทร์ แห่งวัดดอนศาลา สายสำนักเขาอ้ออันเลื่องชื่อ, และ พระครูวิศาลธรรมโศภิต (พ่อท่านโบ) เจ้าอาวาสวัดศิลาชลเขต

ชื่อรุ่น "พระยศเศรษฐี" สื่อถึงความเป็นเลิศทั้งในด้าน "ยศถาบรรดาศักดิ์" (หน้าที่การงาน ตำแหน่ง บารมี) และ "เศรษฐี" (ความมั่งคั่ง โชคลาภ เงินทอง)

พุทธคุณโดดเด่น:
• เลื่อนยศเลื่อนตำแหน่งและอำนาจบารมี: เหมาะสำหรับข้าราชการ นักบริหาร และเจ้าของธุรกิจ หนุนดวงการงานให้เจริญก้าวหน้า
• โภคทรัพย์มหาเศรษฐี: วาจาสิทธิ์ของพ่อท่านคล้ายบันดาลให้การเงินคล่องตัว มั่งคั่งร่ำรวย ปลดหนี้สิน
• แคล้วคลาดและเมตตามหานิยม: ป้องกันภยันตราย อุบัติเหตุ และเป็นที่รักใคร่เอ็นดูของผู้ใหญ่`,
    description: `Historic Phra Yot Setthi (High Rank & Tycoon Buddha) amulet, molded from sacred earthen clays and Buddhist holy powders, consecrated in B.E. 2509 (1966) at Wat Sila Chonlakhet, Sichon District, Nakhon Si Thammarat Province.

Crafted with ancient crypt soils of ancient Nakhon Si Thammarat, crushed mineral relics, and 108 medicinal wan herbs. The consecration ceremony brought together the greatest titans of southern Thai spiritual heritage:
- Por Than Klai Wajasit (The Golden Mouth Saint of Wat Suan Khan)
- Phra Ajahn Nam Kaeo-chan (The revered Khao Or lineage master of Wat Don Sala)
- Por Than Bo (The venerable abbot of Wat Sila Chonlakhet)

The title "Phra Yot Setthi" embodies dual supreme blessings: "Yot" (Official Rank, Promotion, Executive Respect) and "Setthi" (Millionaire Wealth, Financial Freedom).

Core Spiritual Virtues:
• Rapid Career Promotion & Executive Honor: Blessed to propel civil servants, corporate executives, and leaders upward into positions of notable authority.
• Golden-Mouth Wealth Miracle: Imbued with the truthful prophetic blessing of Por Than Klai to open channels of unceasing income and wipe away debts.
• Southern Khao Or Deflection & Metta: Protects against accidents, physical violence, and political rivalry while securing broad public goodwill.`,
    description_zh: `泰南洛坤府瓦西拉春拉客寺（Wat Sila Chonlakhet）于佛历2509年（1966年）倾力督造之历史名品——“帕岳色提”（意为：步步高升之巨富佛）。

采用洛坤府古代出塔神圣陶土、百种药草圣粉及泰南山脉秘传矿料压模烧造，质地沉稳古朴。此期法会阵容冠绝泰南：
- 洛坤府“金口圣僧”婆谭凯（Por Than Klai / 瓦萱刊寺，其言出法随之神通名扬南洋）
- 泰南考奥法脉一代神僧阿赞南（Ajahn Nam / 瓦冬萨拉寺）
- 瓦西拉春拉客寺名僧婆谭波联袂加持。

“帕岳色提”寓意双重巅峰：“岳”（官位爵禄、升迁显赫）与“色提”（万贯富翁、财富自足）。

核心功效：
• 仕途高升与权威显赫：专为公务员、企业高管及创业者量身定制，催旺晋升与领导气场。
• 金口圣僧招财赐福：承接婆谭凯大师无上法力，经商财源广进，脱离经济困顿。
• 考奥法门避险护身：化解意外突发灾煞与同行竞争陷阱，保佑凡事逢凶化吉。`
  },
  {
    id: 1805,
    name_th: "เศียรพ่อแก่ หลวงพ่อตี๋ วัดเขาเขียว จ.สุพรรณบุรี เนื้อดินเผา ฝังตะกรุด มีรอยจารมือ",
    name: "Pho Gae Sacred Hermit Ruesi Head Luang Pho Tee Wat Khao Khiao Suphanburi Clay with Takrut",
    name_zh: "素攀武里府瓦考桥寺龙婆梯古法陶土鲁士老祖（虎头鲁士/波契仙人，底嵌符管大师亲刻符文）",
    slug: "sian-pho-gae-ruesi-luang-pho-tee-wat-khao-khiao-baked-clay-takrut",
    category: "เครื่องราง",
    short: "Sacred Hermit Ruesi (Pho Gae) head talisman by Luang Pho Tee, Wat Khao Khiao, Suphanburi. Molded clay, embedded takrut, hand-inscribed master yantra.",
    description_th: `เศียรพ่อแก่ (บรมครูฤาษี) จัดสร้างและปลุกเสกโดย หลวงพ่อตี๋ วัดเขาเขียว อำเภอด่านช้าง จังหวัดสุพรรณบุรี ยอดพระเกจิอาจารย์ผู้สืบสานสายเวทย์แห่งขุนเขาเมืองสุพรรณ

องค์วัตถุมงคลสร้างจากเนื้อดินเผาผสมผงพุทธคุณและว่านมงคล 108 ชนิด พุทธศิลป์รูปเศียรพ่อแก่สวมชฎาเปี่ยมด้วยความเมตตาและสง่างาม ด้านล่างฝังตะกรุดโลหะจารมือ และมีรอยจารอักขระยันต์ด้วยลายมือหลวงพ่อตี๋อย่างประณีตชัดเจน

พ่อแก่ หรือ บรมครูพระฤาษี ถือเป็นบรมครูแห่งสรรพวิชาการ ศิลปวิทยาการ นาฏศิลป์ ดนตรี และเวทมนตร์คาถาทั้งปวง ใครได้บูชาจะเปรียบเสมือนมีครูบาอาจารย์คอยปกปักรักษา หนุนดวงชะตา นำพาความสำเร็จ และขจัดอุปสรรคทั้งปวง

พุทธคุณโดดเด่น:
• บรมครูคุ้มครองและหนุนดวงชะตา: ปกป้องคุ้มครองจากคุณไสย มนต์ดำ ลมเพลมพัด ภูติผีปีศาจ และสิ่งอัปมงคล
• ปัญญาญาณและความสำเร็จในวิชาการ: เสริมสติปัญญา สมาธิ ช่วยในการศึกษา เรียนรู้ การสร้างสรรค์ผลงาน ศิลปิน นักแสดง ดารานักร้อง
• เมตตามหานิยมและค้าขาย: เจรจาการงานราบรื่น ผู้คนให้ความเคารพยำเกรงและเมตตาเอ็นดู`,
    description: `Sacred Sian Pho Gae (Venerated Hermit Ruesi Master Head) talisman, masterfully hand-molded and consecrated by Luang Pho Tee of Wat Khao Khiao, Dan Chang District, Suphanburi Province.

Formed from baked sacred clay blended with 108 holy mountain herbs and blessed scripture powders. The base is embedded with an authentic consecrated metallic Takrut scroll and inscribed with hand-drawn esoteric yantra characters performed by Luang Pho Tee.

In Siamese spiritual traditions, Pho Gae (the Great Hermit Ruesi) is venerated as the supreme ancestral guru of all arts, healing sciences, performing arts, and esoteric knowledge. Bearing this sacred talisman connects the practitioner to an unbroken lineage of master spiritual guidance and karmic defense.

Core Spiritual Virtues:
• Spiritual Guardianship & Hex Reversal: Completely immunizes against dark witchcraft, demonic entities, evil eyes, and psychic blockages.
• Creative Brilliance & Professional Acclaim: Highly sought after by artists, performers, intellectuals, and educators for boundless inspiration and breakthrough renown.
• Respectful Charisma (Metta & Amnaj): Inspires deep respect, commanding presence, and commercial favor.`,
    description_zh: `素攀武里府瓦考桥寺（Wat Khao Khiao）深山名僧龙婆梯（Luang Pho Tee）亲自主导督造之古陶土“鲁士波契老祖仙师首”（Sian Pho Gae）。

材质采用深山圣土混合百种草药与经粉烧制而成，法相庄严威仪，头戴仙冠，胡须飘逸，仙气充盈。佛牌底部特别嵌入亲手卷制开光之金属符管（Takrut），并附有大师亲手刻写之密宗避险经文字迹。

在泰国法脉传统中，“波契老祖”（鲁士先师）为全天下一百零八法门与艺术、医药、学问之祖师爷。供奉佩戴波契老祖，如得历代仙师随身庇护指导。

核心功效：
• 祖师护体与辟邪降魔：强力化解一切阴邪降头黑法、不良风水煞气与冤亲债主干扰。
• 启发智慧与艺术灵感：极度适合演艺界人士、文创设计、教育学者与公关从业者，助灵感迸发、声名远播。
• 威信慑众与八方敬重：增添长者领袖风范，使下属与客户由衷信服，事业化繁为简。`
  },
  {
    id: 1806,
    name_th: "พระปิดตา หลังอัง หลวงพ่อทองคำ วัดรังษีสุทธาวาส ชลบุรี ปี 2507 เนื้อผงพุทธคุณ",
    name: "Phra Pidta Lang Ang Luang Pho Thongkam Wat Rangsi Sutthawat Chonburi B.E. 2507 Powder",
    name_zh: "春武里府瓦朗喜素塔瓦寺（莱克莱寺）龙婆通堪佛历2507年经典掩面必打佛（背后昂字印）",
    slug: "phra-pidta-lang-ang-luang-pho-thongkam-wat-rangsi-sutthawat-2507",
    category: "พระปิดตา",
    short: "Vintage Phra Pidta Lang Ang B.E. 2507 by Luang Pho Thongkam, Wat Rangsi Sutthawat (Wat Rai Kluai), Chonburi. Pure sacred powders, authentic Chonburi lineage.",
    description_th: `พระปิดตา หลังยันต์ตัวอัง จัดสร้างและปลุกเสกโดย หลวงพ่อทองคำ (พระครูสุทธิคุณรังษี) อดีตเจ้าอาวาสวัดรังษีสุทธาวาส (วัดไร่กล้วย) อำเภอศรีราชา จังหวัดชลบุรี เมื่อปี พ.ศ. 2507

หลวงพ่อทองคำ เป็นหนึ่งในพระเกจิอาจารย์ชื่อดังยุคเก่าของจังหวัดชลบุรี ผู้สืบทอดสายวิชาพระปิดตาเนื้อผงคลุกรักและผงพุทธคุณอันเลื่องชื่อของเมืองชล พระปิดตารุ่นนี้สร้างจากเนื้อผงพุทธคุณผสมผงว่าน 108 เกสรดอกไม้มงคล และผงเก่าของพระเกจิยุคโบราณ ด้านหลังประทับด้วย "ยันต์ตัวอัง" อันเป็นเอกลักษณ์เฉพาะสายวัดไร่กล้วย

สภาพพระสวยเดิม ผิวผงพุทธคุณนวลตา คมชัดทุกสัดส่วน จัดเป็นพระปิดตายอดนิยมของเมืองศรีราชาที่มีประวัติการสร้างชัดเจนและมีประสบการณ์มากมาย

พุทธคุณโดดเด่น:
• เมตตามหานิยมและมหาเสน่ห์: เป็นที่รักใคร่ของผู้คนรอบข้าง เจรจาการงานราบรื่น มีผู้ใหญ่อุปถัมภ์ค้ำชู
• โชคลาภและการค้าขาย: เหมาะอย่างยิ่งสำหรับพ่อค้าแม่ค้า นักลงทุน หนุนดวงการเงินให้คล่องตัว ปลดหนี้สิน
• แคล้วคลาดและปลอดภัย: คุ้มครองจากอุบัติเหตุ ภยันตราย และป้องกันสิ่งอัปมงคลทั้งปวง`,
    description: `Authentic vintage Phra Pidta amulet, characterized by the sacred embossed "Ang" yantra letter on the reverse, consecrated in B.E. 2507 (1964) by Luang Pho Thongkam (Phra Khru Sutthikhunrangsi) of Wat Rangsi Sutthawat (Wat Rai Kluai), Si Racha District, Chonburi Province.

Luang Pho Thongkam was a legendary mid-20th century master monk of Chonburi—the heartland of Thailand's greatest Phra Pidta traditions. Molded from concentrated white Buddhist holy powders (Pong Phutthakhun) mixed with 108 sacred flower pollens and heritage temple powders. The reverse is crisply molded with the mystical Khom letter "Ang", symbolic of spiritual purity and invulnerable shielding.

Core Spiritual Virtues:
• Magnetic Loving-Kindness (Metta Mahaniyom): Radiates warmth and social charm, fostering seamless negotiations and benevolent mentorship.
• Commercial Fortune & Wealth Retention: Phra Pidta's inward contemplation seals away financial leaks while drawing steady commercial profits.
• Total Accident Shielding: Protects against roadway collisions, dangerous physical conflicts, and malefic energies.`,
    description_zh: `全泰必打圣地春武里府名刹：瓦朗喜素塔瓦寺（莱克莱寺 / Wat Rai Kluai）龙婆通堪（Luang Pho Thongkam / 帕库素提昆朗喜）大师于佛历2507年（1964年）亲手督造之纯白经粉掩面必打佛。

春武里府素为全泰五大古老必打佛之发源重镇。龙婆通堪承袭东部名门古法，本尊精选圣僧亲磨之五大圣粉、百种吉祥花粉与古佛碎粉压模制成。背面清晰显现春武里莱克莱寺标志性之古高棉梵文“昂”（Ang）字神圣符印，品相完好无缺。

核心功效：
• 广结善缘与贵人扶持：春武里必打最胜人缘慈爱法门，助商谈亲和顺心、博得长辈信任。
• 招商纳客与守财防漏：强力吸收正财商业利益，抵御不必要之破财漏税危机。
• 避险保平安与逢凶化吉：抵御车祸血光之灾，保佑四时出入平安吉祥。`
  },
  {
    id: 1807,
    name_th: "พระปิดตา หลวงพ่อโด่ วัดนามะตูม ชลบุรี ปี 2512 พิมพ์เล็ก หลังแบบ เนื้อผงชุบรัก",
    name: "Phra Pidta Luang Pho Doh Wat Na Matum Chonburi B.E. 2512 Small Mold Lacquered Powder",
    name_zh: "春武里府瓦纳玛敦寺龙婆笃佛历2512年小模凹背黑漆生粉掩面必打佛",
    slug: "phra-pidta-luang-pho-doh-wat-na-matum-2512-lacquered-powder",
    category: "พระปิดตา",
    short: "Vintage Phra Pidta B.E. 2512 by Luang Pho Doh, Wat Na Matum, Chonburi. Small mold, concave back (Lang Baep), holy powder dipped in authentic black lacquer.",
    description_th: `พระปิดตา พิมพ์เล็ก หลังแบบ เนื้อผงพุทธคุณชุบรัก จัดสร้างและปลุกเสกโดย หลวงพ่อโด่ (พระครูพินิจสมานคุณ) วัดนามะตูม อำเภอพนัสนิคม จังหวัดชลบุรี เมื่อปี พ.ศ. 2512

หลวงพ่อโด่ เป็นหนึ่งในสุดยอดพระคณาจารย์ยุคกึ่งพุทธกาลแห่งเมืองชลบุรี ผู้ทรงอภิญญาและวิทยาคมชั้นสูง ได้รับนิมนต์ไปร่วมในพิธีมหาพุทธาภิเษกสำคัญระดับประเทศมากมาย เช่น พิธี 25 พุทธศตวรรษ (พ.ศ. 2500) พระปิดตารุ่นนี้สร้างจากเนื้อผงพุทธคุณผสมผงมงคลตามตำรับโบราณ จุ่มชุบน้ำรักธรรมชาติเพื่อรักษาเนื้อพระให้คงทนถาวร ด้านหลังเป็นเอกลักษณ์ "พิมพ์หลังแบบ" (凹背) ซึ่งเป็นเอกลักษณ์ยอดนิยมของพระปิดตาสายเมืองชล

พุทธคุณโดดเด่น:
• เมตตามหานิยมและค้าขายร่ำรวย: โดดเด่นด้านการค้าขาย เรียกลูกค้า ปลดหนี้สิน เมตตามหานิยมมหาเสน่ห์
• แคล้วคลาดและคงกระพันชาตรี: ป้องกันอุบัติเหตุ อาวุธ ของมีคม และคุ้มครองให้แคล้วคลาดจากภยันตรายทั้งปวง
• ป้องกันคุณไสยและสิ่งอัปมงคล: น้ำรักโบราณผสานพลังพุทธคุณ ขจัดปัดเป่าพลังงานลบและสิ่งชั่วร้าย`,
    description: `Exquisite vintage Phra Pidta amulet, Small Mold featuring the iconic concave impression back (Lang Baep), consecrated in B.E. 2512 (1969) by Luang Pho Doh (Phra Khru Phinit Samanakhun) of Wat Na Matum, Phanat Nikhom District, Chonburi Province.

Luang Pho Doh was an extraordinary guru master of mid-20th century Thailand, personally invited to every national-level consecration ceremony including the B.E. 2500 (25th Century of Buddhism) celebrations. Crafted from concentrated holy Buddhist powders dipped into authentic protective dark natural tree lacquer (Chup Rak). The concave reverse displays the distinct, sought-after Chonburi master styling.

Core Spiritual Virtues:
• Magnetic Commercial Prosperity: Renowned among merchants across eastern Thailand for rapid inventory turnover, debt clearance, and steady customer flow.
• Physical Invulnerability & Peril Deflection: Unyielding protection against blades, gunshots, road hazards, and aggressive adversaries.
• Evil Repulsion: Pure natural organic lacquer matrix shields against black witchcraft, negative feng shui, and hostile jealousy.`,
    description_zh: `春武里府帕纳尼空县名刹瓦纳玛敦寺（Wat Na Matum）神僧龙婆笃（Luang Pho Doh / 帕库批尼萨玛那昆）于佛历2512年（1969年）亲手督造之经典小模凹背（Lang Baep）黑生漆经粉掩面必打佛。

龙婆笃大师在佛历2500年代享誉全泰，与龙婆多、龙婆艮等并列受邀出席佛历2500年全泰二十五世纪佛教国级大典。此尊采用纯正经粉古法压模，外部浸染天然老生漆以固色护身，背后呈春武里独有的凹背经典形制，古韵悠然。

核心功效：
• 招财纳福与生意兴隆：春武里必打之金字招牌，极利买卖脱手、还清债务与拓展客源。
• 避险挡灾与刀枪不入：阻挡致命外伤、凶险车祸意外与人身攻击。
• 辟邪消煞与阻断阴灵：天然黑生漆阻隔一切降头恶法与不良负能量侵扰。`
  },
  {
    id: 1808,
    name_th: "พระขุนแผนขี่โหงพราย หลวงปู่สรวง วัดไพรพัฒนาราม ศรีสะเกษ ปี 2539 เนื้อผงกาสะท้อน",
    name: "Phra Khun Phaen Riding Hong Phrai Spirit Luang Pu Suang B.E. 2539 Sacred Powder",
    name_zh: "四色菊府瓦派帕塔那寺“火中圣僧”龙普爽佛历2539年骑魂派神驹招财坤平佛牌",
    slug: "phra-khun-phaen-hong-phrai-luang-pu-suang-wat-phrai-phatthana-2539",
    category: "พระขุนแผน",
    short: "Miraculous Phra Khun Phaen riding Hong Phrai B.E. 2539 by Luang Pu Suang, the legendary 'Earth Angel Playing with Fire' of Sisaket. Exceptional wealth & luck.",
    description_th: `พระขุนแผนขี่โหงพราย (ขุนแผนกุมารทองขี่ม้าพราย) จัดสร้างและอธิษฐานจิตปลุกเสกโดย หลวงปู่สรวง (เทวดาเล่นดิน / เทวดาเดินดิน) แห่งวัดไพรพัฒนาราม อำเภอภูสิงห์ จังหวัดศรีสะเกษ เมื่อปี พ.ศ. 2539

หลวงปู่สรวง เป็นพระเกจิอาจารย์ผู้อยู่เหนือกาลเวลาและเป็นพระอริยสงฆ์ลึกลับแห่งเทือกเขาพนมดงรัก พระขุนแผนรุ่นนี้สร้างจากเนื้อผงกาสะท้อน ผสมผงพุทธคุณ ขี้เถ้าธูปเสก ดินประสาทขอมโบราณพันปี และว่านทางมหาเสน่ห์โชคลาภ 108 ชนิด พุทธศิลป์ด้านหน้าเป็นรูปพระขุนแผนทรงเครื่องขี่ม้าพราย (โหงพราย) สื่อถึงความรวดเร็ว ว่องไว เหนือคู่แข่งในทุกๆ ด้าน

หลวงปู่สรวงได้ทำพิธีปลุกเสกด้วยกสิณไฟและพลังจิตอภิญญาเหนือโลก เลื่องชื่อลือชาเรื่อง "ขอได้ไหว้รับ" พลิกฟื้นชีวิตผู้บูชาให้ร่ำรวยและมีโชคลาภอย่างปาฏิหาริย์

พุทธคุณโดดเด่น:
• โชคลาภและการเสี่ยงโชค: พลิกดวงชะตา บันดาลโชคลาภก้อนโต เงินทองไหลมาเทมาอย่างไม่คาดฝัน
• ความรวดเร็วและชนะคู่แข่ง: ขี่โหงพรายสื่อถึงความว่องไว ทำงานสำเร็จรวดเร็ว นำหน้าคู่แข่งทางธุรกิจ
• เมตตามหาเสน่ห์และแคล้วคลาด: คนรักใคร่เอ็นดู เจรจาการงานสำเร็จ และคุ้มครองให้ปลอดภัยจากภยันตราย`,
    description: `Auspicious Phra Khun Phaen riding the Hong Phrai (Celestial Steed) amulet, empowered in B.E. 2539 (1996) by Luang Pu Suang, widely reverenced as "Thewada Len Fai" (The Earth Angel Playing with Fire) of Wat Phrai Phatthana, Sisaket Province.

Luang Pu Suang was a legendary transcendent hermit-monk of the mystical Phanom Dong Rak mountain range along the Thai-Cambodian border. Molded from sacred botanical Kasathon powders, ancient thousand-year-old Khmer temple sanctuary soils, and sacred fire ash from Luang Pu Suang's spontaneous consecration rituals. The iconography depicts Khun Phaen astride the galloping spiritual steed, signifying peerless velocity in overtaking rivals and manifesting goals.

Core Spiritual Virtues:
• Windfall Luck & Speculative Gains: Renowned for catalyzing sudden luck, unexpected monetary influxes, and financial resurrection from debt.
• Competitive Dominance & Rapid Execution: The Hong Phrai steed accelerates career breakthroughs, allowing the wearer to outpace competitors.
• Magnetic Allure & Danger Evasion: Softens social resistance, sparks romantic magnetism, and shields the body against travel peril.`,
    description_zh: `泰国东北部与高棉边境之至尊神僧：四色菊府瓦派帕塔那寺“玩火天神 / 陆地行走活神仙”龙普爽（Luang Pu Suang）于佛历2539年（1996年）亲手加持之骑魂派灵驹坤平佛牌。

龙普爽大师行踪莫测，修持非凡火光三昧神足通。本尊采用千年高棉古刹神土、千种辟邪圣粉、大师独门烧符圣灰及百种吉祥草药压制。正面法相为坤平将军跨骑神驹“魂派”，象征一日千里、势如破竹、永远领先竞争对手。

龙普爽大师以无上火瑜伽禅定入水火三昧加持，全泰信众公认其圣物“祈愿最速灵验”，具有逆天改命、财运暴增之不可思议神迹。

核心功效：
• 暴增偏财与意外横财：强力催旺彩票投机、偏门进益与意外惊喜财源，助财务脱困。
• 事业速达与一马当先：骑神驹象征办事雷厉风行，在激烈商业竞争与考场上升迁领先。
• 顶级人缘与辟邪护航：增进大众吸引力与异性缘，逢凶化吉，阻绝各方险难。`
  },
  {
    id: 1809,
    name_th: "พระนางพญา วัดพระพุทธบาทสระบุรี ปี 2518 หลวงพ่อกวย หลวงปู่โต๊ะ หลวงพ่อหน่าย เสก",
    name: "Phra Nang Phaya Wat Phra Phutthabat Saraburi B.E. 2518 Luang Pho Kuay Luang Pu Toh",
    name_zh: "北标府瓦帕普他巴皇家佛寺佛历2518年女王佛南帕亚（龙婆贵、龙普多、龙婆奈联合开光）",
    slug: "phra-nang-phaya-wat-phra-phutthabat-saraburi-2518-luang-pho-kuay-toh",
    category: "พระนางพญา",
    short: "Historic Phra Nang Phaya B.E. 2518, Wat Phra Phutthabat, Saraburi. Grand consecration blessed by Luang Pho Kuay, Luang Pu Toh, and Luang Pho Nhai.",
    description_th: `พระนางพญา (ราชินีแห่งพระเครื่อง) จัดสร้างขึ้นเมื่อปี พ.ศ. 2518 ณ วัดพระพุทธบาทราชวรมหาวิหาร อำเภอพระพุทธบาท จังหวัดสระบุรี ซึ่งเป็นพระอารามหลวงชั้นเอกและเป็นที่ประดิษฐานรอยพระพุทธบาทอันศักดิ์สิทธิ์ของแผ่นดินสยาม

มวลสารจัดสร้างประกอบด้วย:
• ผงพุทธคุณศักดิ์สิทธิ์และผงพระสมเด็จกรุเก่า
• ดินและผงธูปบูชารอยพระพุทธบาทสระบุรี
• เกสรดอกไม้ 108 ชนิดที่พุทธศาสนิกชนนำมาสักการะรอยพระพุทธบาท

จัดพิธีมหาพุทธาภิเษกครั้งยิ่งใหญ่ ณ พระอุโบสถวัดพระพุทธบาท โดยมีพระเกจิอาจารย์ระดับตำนานแห่งยุคร่วมอธิษฐานจิตอย่างพร้อมเพรียง อาทิ:
• หลวงพ่อกวย ชุตินฺธโร วัดโฆสิตาราม (บ้านแค) ชัยนาท
• หลวงปู่โต๊ะ อินฺทสุวณฺโณ วัดประดู่ฉิมพลี กรุงเทพมหานคร
• หลวงพ่อหน่าย อินฺทสีโล วัดบ้านแจ้ง อยุธยา
• หลวงพ่อพริ้ง วัดโบสถ์โก่งธนู ลพบุรี ฯลฯ

พุทธคุณโดดเด่น:
• เมตตามหานิยมและมหาเสน่ห์ชั้นสูง: เสริมสง่าราศี เจรจาการงานราบรื่น ผู้คนเคารพรักใคร่เอ็นดู เป็นที่ยอมรับในสังคม
• อำนาจบารมีและเลื่อนขั้นเลื่อนตำแหน่ง: พระนางพญาเด่นด้านความเป็นผู้นำ ช่วยให้มีบารมี ปกครองบริวาร
• แคล้วคลาดและคุ้มครองภัย: ป้องกันภยันตราย อุบัติเหตุ และนำพาความสงบร่มเย็นสู่ชีวิต`,
    description: `Historic Phra Nang Phaya (Queen of Amulets) consecrated in B.E. 2518 (1975) at Wat Phra Phutthabat Woramahavihara, Saraburi Province—one of Thailand's most revered premier Royal Monasteries enshrining the Sacred Buddha Footprint.

Crafted with sacred holy powders, ancient crypt clay fragments, and aromatic floral pollens offered by pilgrims at the Sacred Footprint of the Buddha. The grand consecration ceremony in the historic main hall featured an awe-inspiring assembly of Thailand's greatest enlightened masters:
- Luang Pho Kuay Chutintharo, Wat Kositaram, Chainat
- Luang Pu Toh Inthasuwanno, Wat Pradu Chimphli, Bangkok
- Luang Pho Nhai Inthasilo, Wat Ban Chaeng, Ayutthaya
- Luang Pho Phring, Wat Bot Kong Thanu, Lopburi

Core Spiritual Virtues:
• Royal Charismatic Presence (Metta Maha Niyom): Elevates feminine and executive aura, smooths negotiations, and commands deep public affection.
• Sovereign Authority & Leadership: Ideal for women leaders, business proprietors, and professionals commanding subordinates.
• Total Accident Shielding & Peace: Deflects road mishaps, domestic unrest, and malicious energies under the supreme blessings of the Buddha Footprint.`,
    description_zh: `全泰五大古佛之“女王佛”（南帕亚 / Phra Nang Phaya）：北标府著名皇家第一圣寺瓦帕普他巴大佛寺（大佛足印寺）于佛历2518年（1975年）倾力督造。

制作原料殊胜非凡：融入了千百年来参拜泰国佛陀真身足印之神圣香灰、古塔经粉及百种吉祥奉佛花粉。于大佛足印寺举行国级开光大法会，参与加持的当代名僧阵容极度豪华：
- 瓦库喜达兰寺龙婆贵（当代神僧天花板）
- 瓦巴鲁清批寺龙普多（近代必打王）
- 瓦班真寺龙婆奈（壁虎冠兰宗师）
- 瓦波空塔努寺龙婆品等一代神僧。

核心功效：
• 女王之尊与权威领袖：南帕亚被尊为“佛牌之王后”，极大强化女性及领导者气场，令下属敬畏服从。
• 尊贵人缘与倾心信赖：增强人际亲和力与贵族魅力，洽谈公事得心应手。
• 佛足护佑平安福禄：得佛陀真身足印大福报庇佑，出入无灾无难，财源稳健。`
  },
  {
    id: 1810,
    name_th: "นางกวัก เนื้อแร่เขาพรหมชะแง้ หลวงพ่ออุ้น วัดตาลกง เพชรบุรี ปี 2546",
    name: "Mae Nang Kwak Wealth Beckoning Goddess Rae Khao Phrom Cha-ngae Luang Pho Oun B.E. 2546",
    name_zh: "佛丕府瓦丹公寺龙婆温佛历2546年招财女神南括（纯深山神矿考蓬查额黑圣矿石熔铸版）",
    slug: "nang-kwak-rae-khao-phrom-cha-ngae-luang-pho-oun-wat-tan-kong-2546",
    category: "เครื่องราง",
    short: "Sacred Mae Nang Kwak B.E. 2546 by Luang Pho Oun, Wat Tan Kong. Cast exclusively from miraculous Rae Khao Phrom Cha-ngae alchemical iron ore.",
    description_th: `แม่นางกวัก กวักโชคเรียกลาภ หล่อหลอมด้วย "เนื้อแร่เขาพรหมชะแง้" จัดสร้างและปลุกเสกโดย พระครูวินัยวัชรกิจ (หลวงพ่ออุ้น สุขกาโม) ยอดพระเกจิอาจารย์ผู้ทรงอภิญญาแห่งวัดตาลกง อำเภอท่ายาง จังหวัดเพชรบุรี เมื่อปี พ.ศ. 2546

"แร่เขาพรหมชะแง้" ถือเป็นของทนสิทธิ์วิเศษที่มีความศักดิ์สิทธิ์ในตัวเอง โดยหลวงพ่ออุ้นได้ค้นพบแร่ชนิดนี้ในถ้ำลึกบนเขาพรหมชะแง้ และได้ใช้วิชาเล่นแร่แปรธาตุโบราณหลอมสกัดแร่กายสิทธิ์นี้ขึ้นมาได้สำเร็จ ซึ่งมีคุณวิเศษครอบจักรวาลทั้งด้านกันภัยและโชคลาภ

องค์แม่นางกวักหล่อเป็นรูปหญิงสาวนุ่งสไบ นั่งพับเพียบ กวักมือขวาเรียกทรัพย์สินเงินทองอย่างอ่อนช้อยงดงาม เนื้อแร่มีเอกลักษณ์ผิวพรรณเหลือบมันวาวตามธรรมชาติของแร่เหล็กไหล

พุทธคุณโดดเด่น:
• กวักเงินกวักทองและเรียกลูกค้า: เด่นด้านการค้าขาย เรียกลูกค้าเข้าร้าน ยอดขายพุ่ง ดึงดูดทรัพย์สินเงินทองอย่างอัศจรรย์
• เมตตามหานิยมชั้นสูง: ผู้คนพบเห็นเกิดความรักใคร่เอ็นดู เมตตาปรานี เจรจาค้าขายคล่องตัว
• คุ้มครองป้องกันภัยและแก้อาถรรพ์: แร่เขาพรหมชะแง้มีอานุภาพสยบคุณไสย ภูติผีปีศาจ ลบล้างอาถรรพ์ และคุ้มครองให้ปลอดภัย`,
    description: `Sacred Mae Nang Kwak (The Beckoning Goddess of Wealth) talisman cast exclusively from mystical "Rae Khao Phrom Cha-ngae" alchemical iron ore, consecrated in B.E. 2546 (2003) by Luang Pho Oun Sukhamo of Wat Tan Kong, Tha Yang District, Phetchaburi Province.

"Rae Khao Phrom Cha-ngae" is a celebrated natural living mineral found in deep sacred caverns of Mount Phrom Cha-ngae in Phetchaburi. Luang Pho Oun was the sole esoteric master capable of smelting this refractory sacred ore through secret ancient Siamese alchemical metallurgy. The resulting metallic body displays a natural iridescent dark graphite sheen.

Depicts Mae Nang Kwak gracefully beckoning with her right palm, summoning unceasing capital, customers, and opportunities.

Core Spiritual Virtues:
• Customer Attraction & Sales Multiplier: Thailand's premier talisman for storekeepers, restaurateurs, and online merchants to draw continuous paying customers.
• Magnetic Charisma (Metta Mahaniyom): Inspires goodwill, seamless sales closings, and sympathetic consideration from patrons and creditors.
• Spiritual Protection & Curse Dissolution: The alchemical ore matrix repels dark sorcery, negative feng shui, and envious sabotage.`,
    description_zh: `全泰顶尖招财圣物：佛丕府瓦丹公寺（Wat Tan Kong）一代神僧龙婆温（Luang Pho Oun）于佛历2546年（2003年）亲制之“招财女神南括”（Mae Nang Kwak）。

此牌最大特色在于采用大师闻名全泰之独门神圣秘料——“考蓬查额山神圣流铁原矿”（Rae Khao Phrom Cha-ngae）。此矿石乃龙婆温深入佛丕府崇山秘洞中发掘，唯有大师能以古法炼丹术化坚为柔将其熔铸成器。表面呈神秘暗亮金属流铁光泽，自身即具避邪招财之天然灵气。

法相呈传统暹罗贵族女子跪坐姿态，右手高举优雅招引万方财运。

核心功效：
• 招财进宝与客源如潮：全泰商铺与实体店主首选，强力引动客户登门消费、订单倍增。
• 超强人缘与贵人提携：使所见之人顿生慈爱之心，商谈顺畅成交。
• 辟邪挡煞与化解险难：神圣考蓬查额黑矿自带降魔威能，荡涤一切降头风水煞气。`
  },
  {
    id: 1811,
    name_th: "พญาเต่าเรือน รุ่นแรก อาจารย์คลังแสง วัดเขากุฏิ เกาะยอ สงขลา โค้ด 888",
    name: "Phraya Tao Ruean Wealth Turtle 1st Edition Ajahn Khlang Saeng Wat Khao Kuti Code 888",
    name_zh: "宋卡府阁瑶岛瓦考古迪寺阿赞康盛佛历第一期招财金龟灵兽（吉利三发数字888防伪印）",
    slug: "phraya-tao-ruean-1st-edition-ajahn-khlang-saeng-wat-khao-kuti-code-888",
    category: "เครื่องราง",
    short: "1st Edition Phraya Tao Ruean (Wealth Turtle) by Ajahn Khlang Saeng, Wat Khao Kuti, Songkhla. Stamped with auspicious Chinese wealth code '888'.",
    description_th: `พญาเต่าเรือน รุ่นแรก จัดสร้างและปลุกเสกโดย พระอาจารย์คลังแสง ปัญญาพโล แห่งสำนักสงฆ์เขากุฏิ (วัดเขากุฏิ) ตำบลเกาะยอ อำเภอเมือง จังหวัดสงขลา ตอกโค้ดหมายเลขมหามงคล "888" (ตองแปด รวยไม่รู้จบ)

อาจารย์คลังแสง เป็นพระเกจิอาจารย์ผู้รักสันโดษและทรงอภิญญาแห่งลุ่มน้ำทะเลสาบสงขลา จำพรรษาปฏิบัติธรรมบนยอดเขากุฏิ พระเครื่องและเครื่องรางของท่านสร้างน้อยและมีประสบการณ์สูง พญาเต่าเรือนรุ่นแรกนี้สร้างตามตำรับพระโพธิสัตว์พญาเต่าเรือน อุดมด้วยอักขระเลขยันต์คุ้มครองและเรียกทรัพย์รอบกระดอง

พุทธคุณโดดเด่น:
• โภคทรัพย์และความมั่งคั่งไม่รู้จบ: เต่าสื่อถึงความมั่นคง มั่งคั่ง ค้าขายดี ร่ำรวยเงินทองไม่มีวันหมด โค้ด 888 หนุนโชคลาภให้ทวียิ่งขึ้น
• อายุยืนยาวและสุขภาพแข็งแรง: บารมีพญาเต่าเรือนช่วยปัดเป่าโรคภัยไข้เจ็บ เสริมอายุวัฒนะ และนำพาความร่มเย็น
• แคล้วคลาดและระงับคดีความ: ป้องกันภัยพิบัติ คุ้มครองจากศัตรู ระงับข้อพิพาท คดีความ และภัยจากทางกฎหมาย`,
    description: `Sacred Phraya Tao Ruean (The King Turtle of Wealth & Longevity) 1st Edition talisman, empowered by Phra Ajahn Khlang Saeng Panyapalo of Wat Khao Kuti on Koh Yo island, Songkhla Province. Features the highly auspicious Chinese triple-eight wealth stamp "888" (perpetual booming prosperity).

Ajahn Khlang Saeng is a venerated ascetic hermit monk celebrated throughout southern Thailand and Malaysia for rigorous mountain meditation on the peak of Khao Kuti. This 1st edition talisman is cast following the ancient Bodhisattva Turtle lore, engraved with dense sacred Khom yantras across its shell.

Core Spiritual Virtues:
• Steadfast Wealth & Debt Eradication: The turtle embodies slow, solid, and unstoppable capital accumulation, ensuring that savings never dry up.
• Long Life, Health & Vitality: Wards off chronic ailments and absorbs negative life energies, promoting physical longevity.
• Legal Dispute Resolution & Defense: Legendary for silencing hostile lawsuits, silencing rivals, and navigating legal entanglements safely.`,
    description_zh: `泰南宋卡府阁瑶岛秘境名刹瓦考古迪寺（Wat Khao Kuti）苦修高僧阿赞康盛（Ajahn Khlang Saeng）亲自主导督造之第一期神龟招财灵兽（Phraya Tao Ruean）。龟壳特别打上华人至喜发财吉数“888”独立防伪印记，寓意发发发。

阿赞康盛大师常年于孤峰海岛深山苦修禅定，法力深湛，在泰南及新马地区声誉崇高。此尊依佛陀往昔转世为神圣大金龟之本生经文秘法督造，龟甲周密铭刻泰南古法招财经咒。

核心功效：
• 稳如泰山之聚财守财：神龟象征财富稳健积累、只进不出、永不枯竭，彻底解决债务危机。
• 健康长寿与消灾延年：汲取神龟长寿灵气，化解宿疾凶煞，增进生命活力。
• 官非平息与避险解难：古法金龟具强力化解官司是非、小人诬告及官非纠纷之神奇威能。`
  },
  {
    id: 1812,
    name_th: "พระผงเหนือพรหม รุ่นแรก หลังนางกวัก หลวงพ่อรักษ์ วัดสุทธาวาสวิปัสสนา อยุธยา ปี 2551 ลงสีแดง",
    name: "Phra Nuea Phrom 1st Edition Reverse Nang Kwak Luang Pho Rak B.E. 2551 Red Paint",
    name_zh: "大城府瓦素塔瓦维帕沙那寺昭坤喇佛历2551年第一期佛上梵天背招财女神红漆彩绘圣粉佛牌",
    slug: "phra-nuea-phrom-1st-edition-nang-kwak-luang-pho-rak-wat-sutthawat-2551",
    category: "พระผง",
    short: "1st Edition Phra Nuea Phrom B.E. 2551 by Luang Pho Rak, Wat Sutthawat, Ayutthaya. Features Buddha over Brahma with Mae Nang Kwak on reverse, red finish.",
    description_th: `พระผงพุทธคุณพิมพ์เหนือพรหม รุ่นแรก ด้านหลังประทับรูป แม่นางกวัก จัดสร้างและปลุกเสกโดย พระภาวนาธรรมาภิรักษ์ วิ. (หลวงพ่อรักษ์ อนาลโย) เจ้าอาวาสวัดสุทธาวาสวิปัสสนา อำเภอลาดบัวหลวง จังหวัดพระนครศรีอยุธยา เมื่อปี พ.ศ. 2551 แต่งแต้มด้วยสีชาดแดงมงคล

หลวงพ่อรักษ์ เป็นพระเกจิอาจารย์สายวิปัสสนากรรมฐานและพุทธาคมที่มีชื่อเสียงระดับประเทศแห่งกรุงเก่า องค์พระด้านหน้าจำลองพุทธศิลป์ "พระเหนือพรหม" สื่อถึงองค์สมเด็จพระสัมมาสัมพุทธเจ้าทรงมีชัยชนะเหนือท้าวพกาพรหม (ชัยชนะเหนือกิเลส ความหลง และอุปสรรคทั้งปวง) ส่วนด้านหลังประทับรูป "แม่นางกวัก" เทวีแห่งโชคลาภและการค้าขาย

สร้างจากมวลสารผงพุทธคุณ 108 ผงมหาจักรพรรดิ และผงอิทธิเจ ชุบลงสีแดงชาดโบราณเพื่อความเข้มขลังและเป็นสิริมงคล

พุทธคุณโดดเด่น:
• ชนะอุปสรรคและเหนือคน: บารมีพระเหนือพรหมช่วยขจัดอุปสรรค พลิกฟื้นดวงชะตา ชนะคู่แข่ง และประสบความสำเร็จสูงสุดในชีวิต
• โชคลาภและการค้าขาย: บารมีแม่นางกวักด้านหลังช่วยเรียกลูกค้า เรียกทรัพย์สินเงินทอง และเสริมยอดขายให้เจริญงอกงาม
• เมตตามหานิยมและแคล้วคลาด: คุ้มครองจากอุบัติเหตุ ภยันตราย และเป็นที่รักใคร่เอ็นดูของผู้ใหญ่`,
    description: `1st Edition Phra Nuea Phrom (Buddha Triumphant Over Brahma) holy powder amulet, with Mae Nang Kwak (The Beckoning Wealth Goddess) on the reverse, consecrated in B.E. 2551 (2008) by Chao Khun Phra Bhavana-Dhammabhirak (Luang Pho Rak Analayo) of Wat Sutthawat Vipassana, Ayutthaya. Hand-finished with sacred red cinnabar wash.

Luang Pho Rak is an internationally celebrated modern vipassana master of Ayutthaya. The obverse portrays the timeless posture of the Buddha seated atop the head of Brahma, symbolizing supreme spiritual victory over ego, ignorance, and karmic obstructions. The reverse features Mae Nang Kwak beckoning commercial success.

Crafted with 108 sacred Buddhist powders, Maha Chakraphat holy powders, and fragrant temple incense ashes.

Core Spiritual Virtues:
• Supremacy Over Obstacles (Nuea Phrom Blessing): Overcomes fierce workplace competition, dissolves karmic limitations, and elevates personal destiny.
• Commercial Boom (Mae Nang Kwak): Beckons consistent clientele, profitable investments, and continuous sales.
• Peaceful Protection & Metta: Surrounds the bearer in gentle spiritual grace and shields from unexpected hazards.`,
    description_zh: `大城府著名禅修圣地瓦素塔瓦维帕沙那寺（Wat Sutthawat Vipassana）昭坤喇（Luang Pho Rak Analayo）于佛历2551年（2008年）亲自主导督造之第一期“佛上梵天”（Phra Nuea Phrom）后招财女神圣粉佛牌，正面手工点刷吉祥朱砂红彩。

昭坤喇大师为近代享誉全泰之禅修大宗师。正面呈现佛陀凌驾于大梵天王头顶之上（典出佛陀降服娑婆界傲慢梵天之大典故），象征至高智慧与降服一切险阻；背面为端庄招财女神（南括），主掌聚财吸金。

采用百种经粉、大皇帝圣粉及寺院百年香灰精制。

核心功效：
• 破除魔障与步步超迈：借佛上梵天无上威灵，扫除一切竞争阻碍，助事业胜券在握。
• 招财纳客与生意爆棚：后背招财女神为经商助阵，吸引客流与丰盛订单。
• 辟邪护体与慈爱人缘：朱砂辟邪化煞，护佑日常出入平安吉祥。`
  },
  {
    id: 1813,
    name_th: "พระผงสุพรรณ รุ่นจงอางศึก วัดพระศรีรัตนมหาธาตุ สุพรรณบุรี ปี 2510 เนื้อดินเผา พิธีใหญ่ หลวงพ่อมุ่ย หลวงพ่อแดง เสก",
    name: "Phra Phong Suphan Chong-Aang-Seuk Wat Mahathat Suphanburi B.E. 2510 Luang Pho Mui",
    name_zh: "素攀武里府瓦帕西拉达纳玛哈泰大皇寺佛历2510年“眼镜王蛇军团”出征胜利版帕蓬素攀古陶佛牌（龙婆梅、龙婆登联合开光）",
    slug: "phra-phong-suphan-chong-aang-seuk-wat-mahathat-suphanburi-2510",
    category: "พระผง",
    short: "Historic Phra Phong Suphan 'Chong-Aang-Seuk' B.E. 2510, Wat Mahathat Suphanburi. Blessed by Luang Pho Mui and 69 master monks for Vietnam War heroes.",
    description_th: `พระผงสุพรรณ รุ่น "จงอางศึก" จัดสร้างขึ้นเมื่อปี พ.ศ. 2510 ณ วัดพระศรีรัตนมหาธาตุ อำเภอเมือง จังหวัดสุพรรณบุรี ซึ่งเป็นวัดต้นกำเนิดของพระผงสุพรรณ 1 ใน 5 พระชุดเบญจภาคีอันเลื่องชื่อของเมืองไทย

วัตถุประสงค์เพื่อแจกจ่ายเป็นขวัญและกำลังใจแก่ทหารหาญ "กองพลทหารอาสาสมัครจงอางศึก" ที่เดินทางไปปฏิบัติการรบในสงครามเวียดนาม โดยมี พล.ต.ท.ประชา บูรณธนิต (อัศวินแหวนเพชร) เป็นประธานฝ่ายฆราวาส

มวลสารจัดสร้างสุดเข้มขลัง ประกอบด้วย:
• ผงพระผงสุพรรณแท้กรุเก่าที่ชำรุดแตกหัก
• พระกรุโบราณเมืองสุพรรณบุรี เช่น พระถ้ำเสือ พระขุนแผน พระมเหศวร
• ดินจากกรุพระปรางค์วัดพระศรีรัตนมหาธาตุ และผงพุทธคุณจากพระเกจิทั่วประเทศ

จัดพิธีมหาพุทธาภิเษกครั้งยิ่งใหญ่ ณ พระปรางค์วัดพระศรีรัตนมหาธาตุ โดยมีพระคณาจารย์ผู้ทรงอภิญญา 69 รูป นั่งปรกปลุกเสก อาทิ:
• หลวงพ่อมุ่ย วัดดอนไร่ สุพรรณบุรี
• หลวงพ่อแดง วัดเขาบันไดอิฐ เพชรบุรี
• หลวงพ่อถิร วัดป่าเลไลยก์ สุพรรณบุรี
• หลวงพ่อเงิน วัดดอนยายหอม นครปฐม
• หลวงปู่โต๊ะ วัดประดู่ฉิมพลี กทม.
• หลวงพ่อกวย วัดโฆสิตาราม ชัยนาท
• หลวงพ่อแพ วัดพิกุลทอง สิงห์บุรี
• หลวงพ่อน้อย วัดธรรมศาลา นครปฐม ฯลฯ

พระรุ่นนี้มีประสบการณ์โด่งดังในสงครามเวียดนาม ทหารไทยรอดชีวิตกลับมาอย่างน่าอัศจรรย์จนได้ฉายาว่า "ทหารผี"

พุทธคุณโดดเด่น:
• แคล้วคลาดและมหาอุดคงกระพันอันดับ 1: ปกป้องคุ้มครองจากศัสตราวุธ ปืน ผา หน้าไม้ อุบัติเหตุ และภัยสงคราม
• อำนาจบารมีและชัยชนะ: ชนะศัตรูคู่แข่ง หนุนดวงให้เป็นผู้ชนะในทุกสมรภูมิชีวิต
• เมตตามหานิยมและโชคลาภ: พุทธศิลป์อู่ทองแห่งพระผงสุพรรณ เสริมสง่าราศีและความเจริญรุ่งเรือง`,
    description: `Historic Phra Phong Suphan amulet, legendary "Chong-Aang-Seuk" (King Cobra Division) edition, consecrated in B.E. 2510 (1967) at Wat Phra Si Rattana Mahathat, Suphanburi Province—the authentic birthplace of the sacred Phra Phong Suphan (one of Thailand's elite Grand Five Benjapakee amulets).

Commissioned to protect Thai volunteer soldiers of the legendary Royal Thai Volunteer King Cobra Division departing for frontline service in the Vietnam War. Molded from authentic pulverized fragments of ancient 600-year-old crypt Phra Phong Suphan, ancient Wat Tham Suea clay, and sacred earths from the central Mahathat pagoda.

The grand consecration at the sacred pagoda of Wat Mahathat was empowered by 69 premier master monks of the era:
- Luang Pho Mui, Wat Don Rai, Suphanburi
- Luang Pho Daeng, Wat Khao Bandai It, Phetchaburi
- Luang Pho Thir, Wat Pa Lelai, Suphanburi
- Luang Pho Ngern, Wat Don Yai Hom, Nakhon Pathom
- Luang Pu Toh, Wat Pradu Chimphli, Bangkok
- Luang Pho Kuay, Wat Kositaram, Chainat
- Luang Pho Pae, Wat Pikul Thong, Singburi
- Luang Pho Noi, Wat Thammasala, Nakhon Pathom

Thai soldiers bearing this talisman achieved legendary status in Vietnam for miraculous survival under intense firepower, famously earning the moniker "Ghost Soldiers."

Core Spiritual Virtues:
• Supreme Invulnerability & Battlefield Defense (Kong Grapan Chadtri): Unfailing protection against ballistic impacts, blades, physical violence, and perilous crashes.
• Triumphant Mastery & Leadership: Empowers the bearer to conquer professional adversities and hostile rivals.
• Enduring Heritage Luck: Imbued with the ancient U-Thong artistic blessing of the Benjapakee for career elevation and dignity.`,
    description_zh: `全泰五大古佛（五古佛本尊）之朋素攀：素攀武里府第一古皇刹瓦帕西拉达纳玛哈泰大皇寺于佛历2510年（1967年）督造之震撼全泰名品——“眼镜王蛇战神军团出征胜利版”（Chong-Aang-Seuk）。

此批佛宝专为参与越南战争之泰国皇家“眼镜王蛇特种自愿军团”精锐勇士出征而督造。制作材质极度珍贵：融入了原古塔破损之六百年出塔真品朋素攀古佛碎料、虎穴佛古料及玛哈泰大佛塔圣土。

于玛哈泰大皇寺古佛塔前举行全泰最高规格神圣法会，汇聚69位当世泰斗级圣僧联袂坐镇加持：
- 素攀一代神僧龙婆梅（瓦冬莱）
- 佛丕府高僧龙婆登（瓦考班代益）
- 瓦帕勒莱寺龙婆梯
- 瓦冬亚宏寺龙婆银
- 瓦巴鲁清批寺龙普多
- 瓦库喜达兰寺龙婆贵
- 瓦匹坤通寺龙婆培
- 瓦昙玛萨拉寺龙婆内等一代名宿。

在越战前线，佩戴此牌之泰国士兵屡经枪林弹雨而不伤分毫，名震越战，被美军与越军誉为不可思议之“幽灵神兵”。

核心功效：
• 顶级刀枪不入与保命避险（Kong Grapan）：全泰公认避险战神圣物，强力挡灾御难、防范车祸利刃与突发横祸。
• 战无不胜与压制强敌：赋予佩戴者强大胆魄与威严，在商界博弈与职场竞争中立于不败之地。
• 五古佛至高福泽庇佑：承接古乌通盛世法脉，保佑基业代代相传、富贵绵长。`
  }
];

async function run() {
  console.log(`Starting publication of ${PRODUCTS_TO_PUBLISH.length} products to Supabase...`);
  const now = new Date().toISOString();
  let successCount = 0;

  for (const item of PRODUCTS_TO_PUBLISH) {
    const { error } = await supabase
      .from('products')
      .update({
        name_th: item.name_th,
        name: item.name,
        name_zh: item.name_zh,
        slug: item.slug,
        category: item.category,
        short: item.short,
        description_th: item.description_th,
        description: item.description,
        description_zh: item.description_zh,
        published: true,
        updated_at: now
      })
      .eq('id', item.id);

    if (error) {
      console.error(`[ERROR] ID ${item.id} (${item.slug}) failed:`, error.message);
    } else {
      console.log(`[SUCCESS] ✓ ID ${item.id} published: "${item.slug}"`);
      successCount++;
    }
  }

  console.log(`\nPublication complete! Successfully updated & published ${successCount}/${PRODUCTS_TO_PUBLISH.length} products.`);
}

run();
