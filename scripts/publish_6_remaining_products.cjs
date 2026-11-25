const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PRODUCTS_TO_PUBLISH = [
  {
    id: 1823,
    name_th: "เหรียญหลวงปู่ทวด รุ่น 4 วัดช้างให้ ปี 2505 บล็อกมีเม็ดตา เนื้อทองแดง",
    name: "Luang Pu Tuad Roon 4 Wat Chang Hai B.E. 2505 Block Mi Met Ta Copper",
    name_zh: "北大年府瓦沧海寺佛历2505年龙普托四期铜质纪念币（带眼点版）",
    slug: "luang-pu-tuad-roon-4-wat-chang-hai-2505-block-mi-met-ta-copper",
    category: "หลวงพ่อทวด",
    short: "Authentic B.E. 2505 Luang Pu Tuad 4th Edition medallion, Wat Chang Hai. Coveted Block Mi Met Ta (Eye-Dot Die) in vintage copper, blessed by Ajahn Tim.",
    description_th: `เหรียญเสมาหลวงปู่ทวด เหยียบน้ำทะเลจืด รุ่น 4 วัดช้างให้ จังหวัดปัตตานี จัดสร้างและปลุกเสกเมื่อปี พ.ศ. 2505 โดย พระครูวิสัยโสภณ (พระอาจารย์ทิม ธมฺมธโร) อดีตเจ้าอาวาสวัดช้างให้

องค์นี้เป็นพิมพ์นิยมมาตรฐานสากล "บล็อกมีเม็ดตา" เนื้อทองแดงรมดำเก่าตามกาลเวลา ด้านหน้าประทับรูปหลวงปู่ทวดนั่งขัดสมาธิบนฐานบัว ด้านหลังประทับรูปพระอาจารย์ทิม พร้อมอักขระยันต์คาถาหัวใจหลวงปู่ทวดอันศักดิ์สิทธิ์

เหรียญรุ่น 4 ปี 2505 นับเป็นหนึ่งในเหรียญสายตรงวัดช้างให้ยุคแรกที่ได้รับความนิยมสูงมาก ทั้งในด้านพุทธศิลป์อันคมชัดและประสบการณ์ด้านนิรันตรายแคล้วคลาดเป็นเลิศ

พุทธคุณโดดเด่น:
• นิรันตรายและแคล้วคลาดอันดับ 1: คุ้มครองความปลอดภัยจากการเดินทาง อุบัติเหตุทางบก ทางน้ำ และทางอากาศ
• ป้องกันภัยพิบัติและคุณไสย: ขจัดปัดเป่าภยันตราย สิ่งอัปมงคล และพลังงานลบทั้งปวง
• เมตตามหานิยมและโชคลาภ: หนุนดวงชะตาให้แคล้วคลาดจากความขัดสน เจริญรุ่งเรืองในอาชีพการงาน`,
    description: `Authentic 4th Edition (Roon 4) Luang Pu Tuad medallion of Wat Chang Hai, Pattani Province, minted and consecrated in B.E. 2505 (1962) by Phra Khru Wisaisophon (Phra Ajahn Tim Dhammadharo).

This specimen features the sought-after standard die variation known as "Block Mi Met Ta" (With Eye-Dot Die), struck in vintage copper. The obverse depicts Luang Pu Tuad seated in meditation upon a lotus pedestal, while the reverse portrays Phra Ajahn Tim surrounded by sacred Khom yantra inscriptions.

Regarded across Thailand and Southeast Asia as one of the finest early-era Wat Chang Hai medallions, treasured for crisp craftsmanship and legendary lifesaving miracles.

Core Spiritual Virtues:
• Supreme Peril Evasion (Klaew Klaad): Unmatched protection against highway collisions, travel mishaps, and sudden danger.
• Spiritual Shielding: Neutralizes negative energies, dark sorcery, and unforeseen misfortune.
• Steady Fortune & Goodwill: Promotes career stability, respected status, and freedom from destitution.`,
    description_zh: `全泰公认避险第一圣物：北大年府瓦沧海寺（Wat Chang Hai）佛历2505年（1962年）由阿赞添大师（帕库威塞索蓬）亲自主导督造之“龙普托第四期”纯铜盾形纪念币。

此尊为藏家界标准珍稀版模——“带眼点模”（Block Mi Met Ta），采用古铜冲压而成。正面为龙普托大师端坐莲台圣相，背面为阿赞添大师法相及古老高棉避险经文。

佛历2505年四期纪念币乃瓦沧海寺早期正统名品，铸工清晰锐利，在全泰与新马地区以无数护命避险神迹闻名于世。

核心功效：
• 陆海空避险保命第一：强力抵御重大交通意外、血光之灾与突发危难。
• 破煞护体与辟邪消灾：阻隔黑法巫术、不良气场与意外横祸。
• 稳固福报与贵人扶持：护佑事业顺遂、衣食丰足，深获信赖与尊重。`
  },
  {
    id: 1824,
    name_th: "เหรียญหลวงปู่ทวด รุ่น 4 วัดช้างให้ ปี 2505 บล็อกช้างปล้อง เนื้อทองแดง",
    name: "Luang Pu Tuad Roon 4 Wat Chang Hai B.E. 2505 Block Chang Plong Copper",
    name_zh: "北大年府瓦沧海寺佛历2505年龙普托四期铜质纪念币（象节经典模）",
    slug: "luang-pu-tuad-roon-4-wat-chang-hai-2505-block-chang-plong-copper",
    category: "หลวงพ่อทวด",
    short: "Authentic B.E. 2505 Luang Pu Tuad 4th Edition medallion, Wat Chang Hai. Classic Block Chang Plong die in vintage copper, consecrated by Ajahn Tim.",
    description_th: `เหรียญเสมาหลวงปู่ทวด เหยียบน้ำทะเลจืด รุ่น 4 วัดช้างให้ จังหวัดปัตตานี จัดสร้างและปลุกเสกเมื่อปี พ.ศ. 2505 โดย พระครูวิสัยโสภณ (พระอาจารย์ทิม ธมฺมธโร) วัดช้างให้

องค์นี้เป็นพิมพ์มาตรฐานยอดนิยม "บล็อกช้างปล้อง" (สังเกตจากลักษณะเส้นสายลายกนกและเม็ดประคำบริเวณขอบเหรียญอันเป็นเอกลักษณ์เฉพาะบล็อก) เนื้อทองแดงเก่าเข้มขลัง สภาพสวยเดิม

เหรียญหลวงปู่ทวด รุ่น 4 ปี 2505 เป็นเหรียญที่ทันยุคพระอาจารย์ทิมปลุกเสกเดี่ยวอย่างเข้มขลัง ณ พระอุโบสถวัดช้างให้ ได้รับความนิยมสูงมากในหมู่นักสะสมสายตรง

พุทธคุณโดดเด่น:
• นิรันตรายและแคล้วคลาดเป็นเลิศ: ป้องกันอุบัติเหตุทางรถยนต์ ทางเรือ และภยันตรายรอบด้าน
• มหาอำนาจและคุ้มครองชีวิต: ปกป้องผู้บูชาให้ปลอดภัยในยามเดินทางไกลหรือทำงานที่มีความเสี่ยง
• โภคทรัพย์และเมตตามหานิยม: เสริมความเป็นสิริมงคล หนุนดวงชะตา และการเงินไม่ติดขัด`,
    description: `Authentic 4th Edition (Roon 4) Luang Pu Tuad medallion of Wat Chang Hai, Pattani Province, minted and consecrated in B.E. 2505 (1962) by Phra Khru Wisaisophon (Phra Ajahn Tim Dhammadharo).

This specimen belongs to the classic standard collector die variation known as "Block Chang Plong," distinguished by its characteristic border detailing and sharp temple strike in aged copper.

Consecrated directly by Phra Ajahn Tim inside the ordination hall of Wat Chang Hai, the B.E. 2505 Roon 4 series remains one of Thailand's most respected and verifiable early Luang Pu Tuad medallions.

Core Spiritual Virtues:
• Unfailing Road & Travel Safety: Famous across generations for miraculous survival in severe road accidents and perilous situations.
• Protective Aura: Shields travelers, executives, and families from physical harm and unseen dangers.
• Prosperity & Goodwill: Cultivates auspicious fortune, smooth work relationships, and financial stability.`,
    description_zh: `泰南圣物传奇：北大年府瓦沧海寺（Wat Chang Hai）佛历2505年（1962年）由阿赞添大师亲自主导督造开光之“龙普托第四期”纯铜纪念币。

此尊为标准经典版模——“象节模”（Block Chang Plong），币缘纹饰与法相细节特征鲜明，古铜皮色自然沉稳，原味十足。

佛历2505年四期铜币经阿赞添大师于瓦沧海寺大雄宝殿亲身加持，乃正统早期龙普托藏品中的代表之作。

核心功效：
• 全方避险与行车平安：全泰公认护命圣品，强力阻挡交通事故与突发凶险。
• 威严护身与驱邪避煞：适合经常出差远行或高风险工作者随身佩戴。
• 吉祥招财与贵人相助：稳固财运与人际顺遂，逢凶化吉。`
  },
  {
    id: 1825,
    name_th: "พระผงมหานิยม สำหรับสตรี หลวงพ่อเส้ง วัดแหลมทราย สงขลา ปี 2485",
    name: "Phra Phong Maha Niyom for Ladies Luang Pho Seng Wat Laem Sai B.E. 2485",
    name_zh: "宋卡府瓦兰赛寺龙婆盛佛历2485年“女士专用”大慈爱人缘圣粉佛牌",
    slug: "phra-phong-maha-niyom-satri-luang-pho-seng-wat-laem-sai-2485",
    category: "พระผง",
    short: "Historic B.E. 2485 sacred powder amulet created specifically for women by Luang Pho Seng, Wat Laem Sai, Songkhla. Renowned for Metta, charm & protection.",
    description_th: `พระผงมหานิยม "สำหรับสตรี" จัดสร้างและปลุกเสกเมื่อปี พ.ศ. 2485 ยุคสงครามอินโดจีน โดย พระครูธรรมโฆษิต (พ่อท่านเส้ง) แห่งวัดแหลมทราย อำเภอเมือง จังหวัดสงขลา

พ่อท่านเส้ง วัดแหลมทราย เป็นสุดยอดพระเกจิอาจารย์ผู้เรืองวิทยาคมแห่งเมืองสงขลา เจ้าของตำนานพระพุทธปางห้ามญาติและพระกริ่งลพบุรีอันเลื่องชื่อ ในช่วงสงครามโลกครั้งที่ 2 ท่านได้สร้างพระเครื่องแจกจ่ายแก่ทหารและประชาชน โดยแยกสร้าง "พระผงมหานิยมสำหรับสตรี" รุ่นนี้ขึ้นเป็นพิเศษ เพื่อมอบให้สตรี แม่บ้าน และบุตรสาวใช้คุ้มครองตนเองและเสริมเมตตามหานิยมในยามบ้านเมืองเกิดศึกสงคราม

จัดเป็นพระผงโบราณอายุกว่า 80 ปี ที่มีประวัติการสร้างชัดเจนและหายากมากในปัจจุบัน

พุทธคุณโดดเด่น:
• เมตตามหานิยมและมหาเสน่ห์: เสริมเสน่ห์ความน่ารักใคร่เอ็นดู วาจาไพเราะน่าเชื่อถือ เจรจาการงานราบรื่น
• คุ้มครองสตรีและครอบครัว: ปกป้องคุ้มครองจากภัยอันตราย อุบัติเหตุ และคนคิดร้าย
• โชคลาภและค้าขายคล่องตัว: เหมาะอย่างยิ่งสำหรับสุภาพสตรี เจ้าของกิจการ และนักเจรจา`,
    description: `Rare historic B.E. 2485 (1942) sacred powder amulet, specially consecrated as "Phra Phong Maha Niyom Samrap Satri" (Maha Niyom Sacred Powder for Ladies) by Phra Khru Thammakhosit (Luang Pho Seng) of Wat Laem Sai, Songkhla Province.

Luang Pho Seng was one of Songkhla's greatest World War II era master monks, widely venerated alongside Southern legends. During the Indochina and World War II conflicts, while consecrating protective amulets for soldiers, he crafted this special sacred powder edition specifically for women—mothers, wives, and daughters—to grant them gentle protective shielding, dignity, and compassionate goodwill at home and in trade.

Over 80 years old, this rare vintage powder amulet carries a touching historical heritage.

Core Spiritual Virtues:
• Gentle Charisma & Metta Maha Niyom: Enhances feminine grace, persuasive speech, and warm interpersonal reception.
• Protection for Women & Family: Shields against harm, accidents, and malicious individuals.
• Commercial Ease & Fortune: Ideal for female entrepreneurs, merchants, and professionals seeking smooth success.`,
    description_zh: `极具历史意义之珍稀古佛：泰南宋卡府瓦兰赛寺（Wat Laem Sai）一代名僧婆谭盛（Luang Pho Seng）于佛历2485年（1942年）二战期间特别督造之“女士专用大慈爱人缘圣粉佛牌”。

婆谭盛大师为宋卡府传奇高僧。二战烽火时期，大师除督造战时护身圣物赠予前线将士外，更慈悲为留守后方的女性、母亲与女儿专门督造此批圣粉佛牌，旨在护佑女性平安周全、增进人缘与生计顺遂。

历经八十余载岁月，此期历史传世圣物存世稀少，温润古朴。

核心功效：
• 女性专属人缘与优雅魅力：提升谈吐亲和力与贵人好感，令周围人由衷喜爱与支持。
• 护佑女性安全与家宅安康：强力阻挡意外伤害、宵小侵害与不良煞气。
• 经商顺遂与招财纳福：极利女性创业者、店主及职场人士拓展事业与财源。`
  },
  {
    id: 1826,
    name_th: "พระขุนแผนบุเรงนอง หลวงพ่ออุตตมะ วัดวังก์วิเวการาม กาญจนบุรี ปี 2508",
    name: "Phra Khun Phaen Bayinnaung Luang Pho Uttama Wat Wang Wiwekaram B.E. 2508",
    name_zh: "北碧府瓦旺威韦卡兰寺龙婆乌达玛佛历2508年“莽应龙战神”坤平佛牌",
    slug: "phra-khun-phaen-bayinnaung-luang-pho-uttama-wat-wang-wiwekaram-2508",
    category: "พระขุนแผน",
    short: "Historic Phra Khun Phaen Bayinnaung B.E. 2508 by Luang Pho Uttama, Wat Wang Wiwekaram, Kanchanaburi. Renowned for victory, charisma & invulnerability.",
    description_th: `พระขุนแผนบุเรงนอง จัดสร้างและปลุกเสกเมื่อปี พ.ศ. 2508 โดย พระราชอุดมมงคล (หลวงพ่ออุตตมะ อุตฺตมรมฺโภ) อริยสงฆ์ชาวมอญผู้ทรงอภิญญาแห่งวัดวังก์วิเวการาม อำเภอสังขละบุรี จังหวัดกาญจนบุรี

พระพิมพ์นี้จำลองพุทธศิลป์จากพระกรุโบราณในถ้ำเมืองพุกาม ที่กษัตริย์ผู้เกรียงไกร "พระเจ้าบุเรงนอง" (ผู้ชนะสิบทิศ) ทรงศรัทธาและอาราธนาติดพระวรกายในการออกศึกสงคราม หลวงพ่ออุตตมะได้นำมวลสารดินศักดิ์สิทธิ์จากถ้ำโบราณ ผงพุทธคุณ และว่านมงคลสายรามัญมาจัดสร้างขึ้นอย่างเข้มขลัง

พระขุนแผนบุเรงนอง ปี 2508 ของหลวงพ่ออุตตมะขึ้นชื่อเรื่อง "ชนะสิบทิศ" ทั้งในด้านการงาน การเจรจา ความรัก และแคล้วคลาดปลอดภัย

พุทธคุณโดดเด่น:
• ชนะสิบทิศและมหาอำนาจ: เสริมบารมีผู้นำ ชนะคู่แข่งทางธุรกิจ การงาน และการสอบแข่งขัน
• เมตตามหาเสน่ห์และมหานิยม: เป็นที่รักใคร่ของผู้คน เจรจาจับใจ ผู้ใหญ่เมตตาอุปถัมภ์
• แคล้วคลาดและคงกระพัน: คุ้มครองจากภยันตราย อุบัติเหตุ และอาถรรพ์ทั้งปวง`,
    description: `Historic Phra Khun Phaen "Bayinnaung" (Burengnong) amulet, consecrated in B.E. 2508 (1965) by Phra Ratcha Udommongkhon (Luang Pho Uttama), the venerated Mon-lineage saint of Wat Wang Wiwekaram, Sangkhla Buri, Kanchanaburi Province.

Modeled after the ancient sacred cave crypt Buddha statues of Bagan once carried into battle by King Bayinnaung—historically hailed as the "Conqueror of Ten Directions." Crafted from sacred cave earths, Mon-Burmese holy powders, and auspicious herbs personally consecrated by Luang Pho Uttama.

Treasured by collectors for embodying the victorious spirit of "Conquering Ten Directions" in business, leadership, romance, and protection.

Core Spiritual Virtues:
• Conqueror of Ten Directions: Amplifies executive dominance, helping overcome rivals in commerce, leadership, and competitive exams.
• Magnetic Charisma & Metta: Inspires affection, persuasive negotiations, and loyal patronage.
• Invulnerable Protection: Shields against accidents, malice, and unseen hazards.`,
    description_zh: `全泰闻名之孟族一代圣僧：北碧府桑卡拉武里瓦旺威韦卡兰寺（Wat Wang Wiwekaram）龙婆乌达玛大师（Luang Pho Uttama）于佛历2508年（1965年）亲手督造之“莽应龙战神”坤平佛牌。

此尊法相源自缅甸蒲甘古洞出土之传奇护身古佛——昔日横扫东南亚、被尊为“十方常胜大帝”的缅甸名王莽应龙（Bayinnaung）出征必佩之战神圣像。龙婆乌达玛采用古洞灵土、孟族秘传经粉及吉祥圣草药精制开光。

历来以“战无不胜、十方威服”闻名藏家界，兼具坤平人缘与战神权威。

核心功效：
• 十方常胜与权威领导：助商业竞争立于不败之地，考场、职场与仕途脱颖而出。
• 极致人缘与说服魅力：强化个人吸引力与口才，博得客户与贵人信赖。
• 护身避险与逢凶化吉：抵御意外事故与一切敌意暗算。`
  },
  {
    id: 1827,
    name_th: "แม่นางพิมพ์ หลวงพ่ออั๊บ วัดท้องไทร นครปฐม ปี 2552 เนื้อดำ ไม่ฝังพลอย",
    name: "Mae Nang Phim Luang Pho Up Wat Thong Sai B.E. 2552 Black Sacred Powder",
    name_zh: "佛统府瓦通赛寺龙婆UP（龙婆阿）佛历2552年“媚南平”黑肉圣粉冠兰（无嵌宝石版）",
    slug: "mae-nang-phim-luang-pho-up-wat-thong-sai-2552-black-powder",
    category: "เครื่องราง",
    short: "Authentic Mae Nang Phim talisman B.E. 2552 by Luang Pho Up, Wat Thong Sai, Nakhon Pathom. Classic black sacred powder edition for wish fulfillment & wealth.",
    description_th: `เครื่องราง "แม่นางพิมพ์" (พญาแม่นางพิม) จัดสร้างและปลุกเสกเมื่อปี พ.ศ. 2552 โดย พระครูเกษมธรรมานันท์ (หลวงพ่ออั๊บ เขมจาโร) อดีตเจ้าอาวาสวัดท้องไทร อำเภอนครชัยศรี จังหวัดนครปฐม

หลวงพ่ออั๊บเป็นพระเกจิอาจารย์ผู้ทรงอภิญญาแห่งเมืองนครปฐม ผู้สืบทอดสรรพวิชา "แม่นางพิมพ์" อันโด่งดังระดับประเทศ ซึ่งขึ้นชื่อลือชาเรื่องความศักดิ์สิทธิ์ในการขอพรและบนบานศาลกล่าวให้สำเร็จสมหวังในเรื่องโชคลาภ การงาน และความรัก

องค์นี้เป็นพิมพ์เนื้อผงดำ (เนื้อดำ ไม่ฝังพลอย) สร้างจากมวลสารผงว่านอาถรรพ์ ผงพุทธคุณ และดินศักดิ์สิทธิ์ตามตำรับหลวงพ่ออั๊บ สภาพสวยสมบูรณ์เดิม

พุทธคุณโดดเด่น:
• ขอพรสมหวังและโชคลาภ: โดดเด่นเรื่องการอธิษฐานขอพรให้สำเร็จ ด้านการเงิน การค้าขาย และโชคลาภ
• เมตตามหานิยมและมหาเสน่ห์: เสริมเสน่ห์ความรัก ความเมตตา เจรจาค้าขายคล่องตัว
• คุ้มครองป้องกันภัย: ปกป้องคุ้มครองผู้บูชาและครอบครัว รวมถึงขึ้นชื่อเรื่องช่วยให้สตรีคลอดบุตรปลอดภัย`,
    description: `Authentic Mae Nang Phim (Phaya Mae Nang Phim) sacred talisman, consecrated in B.E. 2552 (2009) by Luang Pho Up Khemajaro of Wat Thong Sai, Nakhon Chai Si District, Nakhon Pathom Province.

Luang Pho Up was celebrated across Thailand and Asia as the supreme master of the Mae Nang Phim esoteric lineage—famed nationwide for granting heartfelt wishes in business windfalls, career breakthroughs, romance, and safe childbirth.

This piece is the classic Black Sacred Powder (Nuea Dam) edition without gemstone inlay, pressed from authentic temple herbs and blessed powders following Luang Pho Up's strict ritual formula.

Core Spiritual Virtues:
• Rapid Wish Fulfillment & Fortune: Renowned for manifesting urgent prayers related to sales, wealth, and commercial luck.
• Magnetic Charisma & Metta: Draws affection, loyal customers, and harmonious relationships.
• Protective Motherly Grace: Shields the wearer and household from danger and brings peaceful blessings.`,
    description_zh: `全泰顶尖许愿灵验圣物：佛统府瓦通赛寺（Wat Thong Sai）一代名僧龙婆UP（龙婆阿 / Luang Pho Up）于佛历2552年（2009年）亲自主导开光之“媚南平”（Mae Nang Phim）黑肉圣粉冠兰（无嵌宝石经典版）。

龙婆UP大师乃全泰公认“媚南平”法脉第一宗师。媚南平以极其灵验的“有求必应、速成心愿”名扬东南亚，无论是求财、求事业、求姻缘或保佑孕妇平安顺产皆有无数神迹。

此尊采用大师独门黑色灵草圣粉压制，质地沉稳古朴，原庙品相完好。

核心功效：
• 极速成愿与招财进宝：助祈求心愿快速达成，旺正财偏财与店铺客流。
• 超强人缘与异性魅力：提升个人吸引力，促进感情和睦与商务顺畅。
• 慈母护佑与出入平安：全方位守护佩戴者及家人平安吉祥。`
  },
  {
    id: 1828,
    name_th: "แม่นางพิมพ์ หลวงพ่ออั๊บ วัดท้องไทร นครปฐม ปี 2552 เนื้อแดง ฝังพลอย สร้างน้อย",
    name: "Mae Nang Phim Luang Pho Up Wat Thong Sai B.E. 2552 Red Powder Gem Inlay",
    name_zh: "佛统府瓦通赛寺龙婆UP（龙婆阿）佛历2552年“媚南平”红肉嵌宝石限量珍稀版冠兰",
    slug: "mae-nang-phim-luang-pho-up-wat-thong-sai-2552-red-gem-inlay",
    category: "เครื่องราง",
    short: "Rare limited-mintage Mae Nang Phim B.E. 2552 by Luang Pho Up, Wat Thong Sai. Red sacred powder embedded with auspicious gem for fortune & wish granting.",
    description_th: `เครื่องราง "แม่นางพิมพ์" (พญาแม่นางพิม) เนื้อแดง ฝังพลอย รุ่นสร้างน้อย จัดสร้างและปลุกเสกเมื่อปี พ.ศ. 2552 โดย พระครูเกษมธรรมานันท์ (หลวงพ่ออั๊บ เขมจาโร) แห่งวัดท้องไทร จังหวัดนครปฐม

องค์นี้เป็นพิมพ์พิเศษ "เนื้อว่านแดง ฝังพลอยเสก" ซึ่งจัดสร้างในจำนวนน้อยกว่าเนื้อธรรมดา สร้างจากมวลสารผงว่านมหาเสน่ห์ โชคลาภ และผงพุทธคุณของหลวงพ่ออั๊บ พร้อมประดับเม็ดพลอยศักดิ์สิทธิ์เพิ่มพลังด้านโภคทรัพย์และความเป็นสิริมงคล

เป็นที่เสาะแสวงหาอย่างมากในหมู่ศิษยานุศิษย์และนักสะสมเครื่องรางสายเมตตาขอพร

พุทธคุณโดดเด่น:
• โภคทรัพย์และขอพรสมหวัง: เม็ดพลอยเสกช่วยเสริมพลังเรียกทรัพย์ การเงินคล่องตัว และสมปรารถนาในคำอธิษฐาน
• เมตตามหาเสน่ห์ชั้นสูง: เนื้อว่านแดงเด่นด้านความรักความเมตตา เจรจาการงานสำเร็จลุล่วง
• คุ้มครองปลอดภัย: ป้องกันภยันตราย อุบัติเหตุ และสิ่งชั่วร้ายทั้งปวง`,
    description: `Rare limited-mintage Mae Nang Phim (Phaya Mae Nang Phim) sacred talisman in Red Sacred Powder embedded with a consecrated gemstone, consecrated in B.E. 2552 (2009) by Luang Pho Up Khemajaro of Wat Thong Sai, Nakhon Pathom Province.

This special edition combines auspicious red herbal attraction powders (Nuea Wahn Daeng) with an inlaid sacred gemstone to amplify wealth attraction and wish-granting potency, produced in noticeably smaller quantities than standard black editions.

Highly prized by devotees and collectors for rapid prayer fulfillment, commercial luck, and protective grace.

Core Spiritual Virtues:
• Gem-Amplified Wealth & Wishes: Supports rapid attainment of financial goals, business growth, and sincere prayers.
• High-Grade Metta & Charm: Red botanical powders foster warm affection, persuasive charm, and harmonious dealings.
• Steadfast Safety: Wards off misfortune, accidents, and negative influences.`,
    description_zh: `珍稀限量版许愿圣物：佛统府瓦通赛寺（Wat Thong Sai）一代宗师龙婆UP（龙婆阿）于佛历2552年（2009年）亲制开光之“媚南平”红肉嵌宝石特别版（督造量稀少）。

此尊采用比普通版更为稀有的吉祥红草药圣粉（Nuea Wahn Daeng）压制，并特别镶嵌一颗经大师加持的神圣宝石，强强联手放大招财聚宝与有求必应之灵力。

在泰国与海外藏家圈中极为抢手，兼具高收藏价值与强力许愿功效。

核心功效：
• 宝石催财与速成心愿：借助圣石灵气加倍吸纳财源，助所求之事早日圆满。
• 红粉至尊人缘魅力：增强感情运、大众好感与商务谈判成功率。
• 护主避险与吉祥平安：抵挡突发危难与不良煞气，保佑家宅顺遂。`
  }
];

async function run() {
  const existingSlugs = new Set(JSON.parse(fs.readFileSync('existing_slugs.json', 'utf8')));
  const batchSlugs = new Set();

  // Pre-validate all slugs & fields against Dan Siam Master Rules
  for (const item of PRODUCTS_TO_PUBLISH) {
    if (!item.slug || !/^[a-z0-9-]+$/.test(item.slug)) {
      throw new Error(`Invalid slug for ID ${item.id}: "${item.slug}"`);
    }
    if (existingSlugs.has(item.slug) || batchSlugs.has(item.slug)) {
      throw new Error(`Duplicate slug detected for ID ${item.id}: "${item.slug}"`);
    }
    batchSlugs.add(item.slug);

    // Check strictly NO Thai characters in English fields
    const thaiRegex = /[\u0E00-\u0E7F]/;
    if (thaiRegex.test(item.name) || thaiRegex.test(item.short) || thaiRegex.test(item.description)) {
      throw new Error(`Thai characters found in English fields for ID ${item.id}`);
    }
    if (item.short.length > 160) {
      throw new Error(`Short summary > 160 chars (${item.short.length}) for ID ${item.id}`);
    }
  }

  console.log(`Validation passed! Publishing ${PRODUCTS_TO_PUBLISH.length} products...`);
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

  console.log(`\nDone! Published ${successCount}/${PRODUCTS_TO_PUBLISH.length} products.`);
}

run();
