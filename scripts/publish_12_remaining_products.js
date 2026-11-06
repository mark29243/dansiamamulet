const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PRODUCTS_TO_PUBLISH = [
  {
    id: 1778,
    name_th: "สิงห์งาแกะ หลวงพ่อหอม วัดชากหมาก จ.ระยอง เลี่ยมกระเช้าเดิม",
    name: "Sacred Hand-Carved Singha Lion Luang Pho Hom Wat Chak Mak Rayong in Vintage Basket Casing",
    name_zh: "罗勇府瓦差玛寺龙婆荷姆原装编筐手工雕刻醒狮冠兰",
    slug: "singha-carved-luang-pho-hom-wat-chak-mak-rayong-vintage-casing",
    short: "Sacred miniature Singha lion talisman hand-carved from auspicious aged material, blessed by Luang Pho Hom, Wat Chak Mak, Rayong. Preserved in authentic vintage hand-woven metal basket casing.",
    description_th: `สิงห์แกะ หลวงพ่อหอม วัดชากหมาก อำเภอบ้านฉาง จังหวัดระยอง ศิลป์แกะสลักมือโบราณ เลี่ยมกระเช้าเดิมสุดคลาสสิก

หลวงพ่อหอม จันทโชโต (พระครูภาวนานุโยค) วัดชากหมาก เป็นหนึ่งในยอดพระเกจิอาจารย์ผู้ทรงอภิญญาแห่งภาคตะวันออก ท่านครองวัดชากหมากตั้งแต่ พ.ศ. 2471 และพัฒนาวัดจนเจริญรุ่งเรือง สิงห์ของหลวงพ่อหอมได้รับการยกย่องเป็นหนึ่งในเครื่องรางสิงห์ยอดนิยมอันดับหนึ่งของเมืองระยอง ด้วยศิลปะการแกะสลักที่มีเอกลักษณ์ ปากอ้าคำราม ตาพลอยหรือตาเจาะ ลำตัวสง่างามทรงพลัง

พุทธคุณโดดเด่น:
• มหาอำนาจและบารมี: ข่มศัตรูคู่แข่ง บริวารเคารพยำเกรง เหมาะอย่างยิ่งสำหรับผู้นำ ข้าราชการ และนักบริหาร
• แคล้วคลาดคงกระพัน: ปกป้องคุ้มครองจากภยันตราย อุบัติเหตุ ศาสตราวุธ และภัยร้ายทั้งปวง
• ป้องกันคุณไสยมนต์ดำ: สยบภูติผีปีศาจ ลบล้างอาถรรพ์และพลังงานลบ
• เมตตามหานิยม: เสริมสง่าราศี เจรจาติดต่อการงานราบรื่นและเป็นที่เมตตาเอ็นดู`,
    description: `Authentic vintage miniature Singha (Sacred Royal Lion) talisman, masterfully hand-carved and preserved in its original vintage hand-woven metal basket casing, consecrated by Luang Pho Hom Chanthachoto (Phra Khru Bhavananuyok) of Wat Chak Mak, Ban Chang District, Rayong Province.

Luang Pho Hom was universally venerated as the premier esoteric master of the eastern seaboard of Siam. Governing Wat Chak Mak from B.E. 2471 (1928), his spiritual prowess and miraculous blessings drew devotees from across the kingdom. His hand-carved Singha talismans are renowned among elite collectors for their fierce commanding stance, open-mouthed roar, and extraordinary protective aura.

Core Spiritual Virtues (พุทธคุณ):
• Sovereign Authority & Command (Maha Amnaj): Emanates majestic executive presence, commanding obedience from subordinates and respect from rivals.
• Absolute Peril Deflection (Klaew Klaad): Shields the bearer against accidents, physical aggression, weapons, and hidden dangers.
• Spiritual Purification & Evil Subjugation: Repels dark witchcraft, malefic spirits, hexes, and negative feng shui influences.
• Charismatic Favor (Metta Mahaniyom): Enhances dignity, smooth negotiations, and honorable social acclaim.`,
    description_zh: `全泰著名醒狮冠兰圣物：罗勇府瓦差玛寺（班昌县）龙婆荷姆（Luang Pho Hom Chanthachoto / 帕库帕瓦那努约）大师亲手加持之古法手工雕刻醒狮，保存于当年原装古董金属编织提篮壳中，极具历史收藏价值。

龙婆荷姆大师为泰国东部公认之一代圣僧神通宗师，自佛历2471年（1928年）驻锡瓦差玛寺，佛法修为精深。大师督造开光之“醒狮”（Singha）列入全泰顶级冠兰名录，法相神勇威猛，呈张口怒吼之姿，气吞万里。

核心功效（พุทธคุณ）：
• 至高威权与领导统御（Maha Amnaj）：散发丛林之王大威严，震慑竞争对手与小人，助官运升迁与企业统理。
• 避险保平安（Klaew Klaad）：强力抵御人身意外、刀枪凶险与飞来横祸。
• 辟邪消煞降魔：彻底清除降头黑法、邪灵作祟与不良风水煞气。
• 尊贵人缘：增进领袖魅力，商谈决策掷地有声，获贵人拥护扶持。`
  },
  {
    id: 1779,
    name_th: "พระสมเด็จ ฝังพลอยเขียว วัดโยธานิมิตร จ.ตราด หลังพระพุทธ ปี 2514",
    name: "Phra Somdej Green Gem Inlay Wat Yothanimit Trat B.E. 2514 with Buddha Reverse",
    name_zh: "达府瓦育塔尼密佛寺佛历2514年背嵌绿宝石后佛陀像崇迪佛",
    slug: "phra-somdej-green-gem-wat-yothanimit-trat-2514",
    short: "Rare Phra Somdej amulet from Wat Yothanimit (the sole Royal Monastery of Trat Province), consecrated in B.E. 2514. Features raw natural green gem inlay and presiding Buddha image on the reverse.",
    description_th: `พระสมเด็จ ฝังพลอยเขียว ด้านหลังประทับองค์พระพุทธ จัดสร้างโดยวัดโยธานิมิตร (วัดโบสถ์) พระอารามหลวงเพียงแห่งเดียวของจังหวัดตราด ปี พ.ศ. 2514

วัดโยธานิมิตร เป็นวัดสำคัญทางประวัติศาสตร์ของสยาม มีประวัติความเป็นมาย้อนไปถึงคราวสมเด็จพระเจ้าตากสินมหาราชทรงยกทัพมาตั้งมั่น ณ เมืองตราด พระสมเด็จรุ่นนี้สร้างจากมวลสารผงพุทธคุณศักดิ์สิทธิ์ ผงว่าน และเกษรดอกไม้มงคล ด้านหลังประดับฝังเม็ดพลอยดิบเขียวธรรมชาติของดีเมืองตราด (พลอยเมืองตราดเลื่องชื่อเรื่องโภคทรัพย์และความอุดมสมบูรณ์) พร้อมปั๊มรูปพระพุทธประธานด้านหลัง

พุทธคุณโดดเด่น:
• โภคทรัพย์และความอุดมสมบูรณ์: พลอยเขียวสื่อถึงความเจริญงอกงาม การเงินไม่ติดขัด มีกินมีใช้ตลอดปี
• เมตตามหานิยมและแคล้วคลาด: พระสมเด็จจักรพรรดิแห่งพระเครื่อง คุ้มครองความปลอดภัย เมตตาผู้ใหญ่เอ็นดู
• อำนาจบารมีและความรุ่งเรือง: เสริมบารมีหน้าที่การงานและการค้าขายให้มั่นคงถาวร`,
    description: `Rare and auspicious Phra Somdej amulet consecrated in B.E. 2514 (1971) at Wat Yothanimit (Wat Bot), the historic sole Royal Monastery of Trat Province, eastern Thailand.

Wat Yothanimit holds profound historical significance, founded during the era of King Taksin the Great when he established his naval encampment in Trat. Consecrated with holy Buddhist powders, fragrant herbal essences, and sacred flower pollens, this unique edition is distinguished by genuine natural uncut green gemstones from the famed gemstone mines of Trat Province embedded into the front, with the sacred presiding Buddha emblem pressed upon the reverse.

Core Spiritual Virtues (พุทธคุณ):
• Wealth Generation & Fertile Abundance: The green emerald gemstone symbolizes perpetual prosperity, business renewal, and continuous influx of capital.
• Imperial Bodhisattva Protection: The King of Amulets shields against life adversities, physical harm, and travel perils.
• Career Advancement & Noble Patronage: Elevates personal standing, commercial stability, and honors in public endeavors.`,
    description_zh: `泰国东部达府（Trat）唯一皇家佛寺——瓦育塔尼密佛寺（Wat Yothanimit / 瓦波寺）于佛历2514年（1971年）隆重督造之珍稀崇迪佛牌。正面法相庄严，嵌入达府天然原矿绿宝石，背面为大佛祖圣容印记。

瓦育塔尼密寺历史极为悠久，溯至达信大帝（郑皇）进军东部驻军时期。此批崇迪佛牌采用大量珍稀经粉、百种吉祥圣草粉及花粉压制而成，并特别嵌入享誉全泰的达府天然绿宝石晶石（象征财富满盈与生机勃发）。

核心功效（พุทธคุณ）：
• 招财生财与富足长顺：天然绿宝石吸纳财气，旺正财与生意买卖，财富源源不绝。
• 佛王庇佑平安全护：万佛之王崇迪佛慈悲护航，化解凶险灾煞，出行出入平安。
• 事业亨通尊贵贵人：增进职场地位与贵人缘，开创事业新局面。`
  },
  {
    id: 1780,
    name_th: "พระนาคปรกใบมะขามรุ่นแรก พระอาจารย์อิฏฐ์ วัดจุฬามณี ปี 2537 เนื้อทองแดง",
    name: "Phra Prok Bai Makham 1st Edition B.E. 2537 Phra Ajahn Itt Wat Chulamanee Copper",
    name_zh: "夜功府瓦朱拉玛尼寺帕阿赞伊佛历2537年第一期纯铜七龙佛迷你叶佛",
    slug: "phra-prok-bai-makham-1st-edition-2537-phra-ajahn-itt-wat-chulamanee",
    short: "The coveted 1st Edition miniature Phra Naga Prok (Bai Makham) cast in pure copper, consecrated in B.E. 2537 by Phra Ajahn Itt, abbot of Wat Chulamanee and premier master of Thao Wessuwan.",
    description_th: `พระนาคปรกใบมะขาม รุ่นแรก พระอาจารย์อิฏฐ์ ภทฺทจาโร (พระครูโสภิตวิริยาภรณ์) วัดจุฬามณี อำเภออัมพวา จังหวัดสมุทรสงคราม ปี พ.ศ. 2537 เนื้อทองแดงรมดำ

พระอาจารย์อิฏฐ์ เป็นยอดพระเกจิอาจารย์ผู้สถาปนาตำนานท้าวเวสสุวรรณแห่งวัดจุฬามณีจนโด่งดังไปทั่วเอเชีย ท่านเป็นศิษย์ผู้สืบทอดวิทยาคมจากหลวงพ่อเนื่อง วัดจุฬามณี, หลวงปู่สาย วัดหนองสองห้อง และพระเกจิผู้เรืองเวทสายแม่กลอง พระนาคปรกใบมะขามรุ่นแรก ปี 2537 จัดสร้างขึ้นในยุคแรกๆ ก่อนที่ท่านจะสร้างเหรียญท้าวเวสสุวรรณจำปีอันโด่งดัง ถือเป็นพระปรกใบมะขามยอดนิยมที่มีประสบการณ์สูงมากด้านแคล้วคลาดและหนุนดวงชะตา

พุทธคุณโดดเด่น:
• คุ้มครองดวงชะตา พลิกฟื้นดวงตก: พญานาค 7 เศียรแผ่พังพานปกป้ององค์พระพุทธเจ้า เปรียบดั่งการกางร่มเงาคอยปัดเป่าเคราะห์ร้าย
• แคล้วคลาดปลอดภัย ป้องกันอุบัติเหตุ: พุทธคุณด้านนิรันตรายอันเลื่องชื่อ
• เมตตามหานิยมและโชคลาภ: พระอาจารย์อิฏฐ์ปลุกเสกบรรจุพุทธมนต์พระสิวลี มั่งคั่ง ค้าขายคล่องตัว`,
    description: `The historic First Edition miniature Phra Naga Prok (Bai Makham - tamarind leaf size) consecrated in B.E. 2537 (1994) in blackened pure copper by Phra Ajahn Itt Bhaddacharo (Phra Khru Sophitviriyaphorn), Abbot of Wat Chulamanee, Amphawa, Samut Songkhram Province.

Phra Ajahn Itt is celebrated worldwide as the supreme contemporary master of Thao Wessuwan and keeper of the primordial Mae Klong monastic lineage (disciple of the great Luang Pho Nueang of Wat Chulamanee and Luang Pu Sai of Wat Nong Song Hong). Consecrated years prior to his famous B.E. 2545 Champi coins, this B.E. 2537 First Edition Naga Prok embodies pristine meditative purity, highly sought-after for astrological shield and miraculous survival.

Core Spiritual Virtues (พุทธคุณ):
• Astrological Reversal & Fate Protection: The 7-headed Naga canopy shelters the Buddha, neutralizing planetary clashes, horoscope dips, and sudden setbacks.
• Miraculous Hazard Avoidance: Celebrated protective shield against accidents, trauma, and negative spiritual intrusion.
• Commerce & Fortune Flow: Imbued with Phra Sivali prosperity mantras, smooth cashflow, and patronage.`,
    description_zh: `全泰当代鬼王至尊宗师——夜功府瓦朱拉玛尼寺帕阿赞伊（Phra Ajahn Itt / 帕库索匹威利亚蓬）于佛历2537年（1994年）亲身主持开光之第一期纯铜七龙佛迷你叶佛（Phra Prok Bai Makham）。

帕阿赞伊大师承袭瓦朱拉玛尼寺前代神僧龙婆良（Luang Pho Nueang）之法脉真传。在督造佛历2545年闻名遐迩的查比鬼王铜牌之前，大师于佛历2537年督造了这批第一期七龙佛，乃大师早期代表作之一，深受资深藏家推崇。

核心功效（พุทธคุณ）：
• 七龙遮护转运庇佑：七龙佛乃星期六守护佛，七首神蛇展翼遮护佛陀，能强力抵挡流年犯太岁、化煞转运、绝处逢生。
• 避险保平安第一：极强之避险防身护身符，防小人暗算与意外伤难。
• 招财人缘丰盛：大师注入慈悲财神招财秘咒，助生意拓展与财富平稳累积。`
  },
  {
    id: 1781,
    name_th: "พระผงเหนือพรหม หลวงพ่อพรหม วัดขนอน​เหนือ​ อยุธยา​ ปี 2531 เนื้อเหลือง",
    name: "Phra Nuea Phrom Sacred Yellow Powder B.E. 2531 Luang Pho Phrom Wat Khanon Nuea Ayutthaya",
    name_zh: "大城府瓦卡农能寺龙婆旁佛历2531年黄经粉佛上梵天四面神佛牌",
    slug: "phra-nuea-phrom-powder-2531-luang-pho-phrom-wat-khanon-nuea",
    short: "Phra Nuea Phrom (Buddha Over Brahma) powder amulet consecrated in B.E. 2531 by Luang Pho Phrom, Wat Khanon Nuea, Ayutthaya. Master of Wat Pradu Songtham wicha.",
    description_th: `พระผงพิมพ์เหนือพรหม หลวงพ่อพรหม ติสฺสเทโว วัดขนอนเหนือ อำเภอบางปะอิน จังหวัดพระนครศรีอยุธยา ปี พ.ศ. 2531 เนื้อผงพุทธคุณผสมว่านสีเหลือง

หลวงพ่อพรหม วัดขนอนเหนือ เป็นหนึ่งในสุดยอดพระเกจิอาจารย์เมืองกรุงเก่า ผู้สืบทอดวิทยาคมสายสำนักวัดประดู่ทรงธรรม ซึ่งเป็นตักศิลาทางไสยเวทและพุทธาคมแห่งกรุงศรีอยุธยา วัตถุมงคลของท่านขึ้นชื่อลือชาเรื่องความเข้มขลังเด็ดขาด พระพิมพ์เหนือพรหม สื่อถึงพุทธประวัติตอนพระพุทธองค์ทรงโปรดท้าวพกาพรหม แสดงถึงพุทธบารมีที่อยู่เหนือพรหมทั้งปวง เป็นสัญลักษณ์แห่งชัยชนะเหนืออุปสรรคทั้งปวงในสากลจักรวาล

พุทธคุณโดดเด่น:
• ชนะอุปสรรคและศัตรู: พุทธบารมีครอบจักรวาล สลายความติดขัด ปราบมารและคู่แข่ง
• มหาอำนาจบารมีและความก้าวหน้า: หนุนดวงการงาน เลื่อนขั้นเลื่อนตำแหน่ง เสริมสง่าราศี
• แคล้วคลาดปลอดภัยและเมตตามหานิยม: ปกป้องภยันตรายรอบด้าน เป็นที่รักใคร่ของผู้คน`,
    description: `Phra Nuea Phrom (The Buddha Presiding Over Lord Brahma) sacred yellow holy powder amulet, consecrated in B.E. 2531 (1988) by Luang Pho Phrom Tissadevo of Wat Khanon Nuea, Bang Pa-in District, Ayutthaya Province.

Luang Pho Phrom was a legendary master of Ayutthaya, holding the unbroken esoteric lineage of the ancient Wat Pradu Songtham academy—the royal monastic cradle of Siamese consecration arts. The iconography of the Buddha seated atop the head of Brahma portrays the scriptural triumph over Baka Brahma, representing the absolute supremacy of enlightened Buddhist wisdom over cosmic illusion.

Core Spiritual Virtues (พุทธคุณ):
• Supreme Victory Over Obstacles: Clears stagnant karmic roadblocks and dismantles competitor resistance.
• Executive Promotion & Dignity (Maha Amnaj): Elevates career trajectories, leadership charisma, and professional authority.
• Absolute Peril Defense & Metta: Protects from all perils while inspiring affection from mentors and peers.`,
    description_zh: `大城府瓦卡农能寺（Wat Khanon Nuea）传奇神僧龙婆旁（Luang Pho Phrom Tissadevo）于佛历2531年（1988年）督造开光之“佛上梵天四面神”（Phra Nuea Phrom）黄色圣经粉佛牌。

龙婆旁大师乃大城府承袭“阿育陀耶皇家学府”瓦帕度松昙寺（Wat Pradu Songtham）古法脉之一代金刚上师，法力高深莫测。“佛陀端坐大梵天之上”法相出自佛典破除婆迦梵天傲慢之公案，表法无上正等正觉破除世间一切愚昧、障碍与敌阻。

核心功效（พุทธคุณ）：
• 破除障碍战胜逆境：以佛陀大智大勇扫除前行阻碍，化解小人与困境。
• 事业腾达权威统摄：强化领导魅力与职场气场，利升迁晋爵与掌控全局。
• 避险挡灾慈悲加护：全方位护佑身心平安，赢得长官器重与群众爱戴。`
  },
  {
    id: 1782,
    name_th: "พระกริ่งไพรีพินาศ วัดบวรนิเวศวิหาร ปี 2535 เนื้อนวโลหะ ตอกโค้ด 369",
    name: "Phra Kring Phairee Phinas Wat Bowonniwet B.E. 2535 Navaguna Bronze Alloy #369",
    name_zh: "曼谷僧王庙佛历2535年九宝铜编号369破除一切敌军魔障帕派里碧纳药师药王铃佛",
    slug: "phra-kring-phairee-phinas-wat-bowon-2535-navaguna-369",
    short: "Supreme Phra Kring Phairee Phinas cast in ancient Navaguna alloy, numbered #369 with temple codes. Consecrated at Wat Bowonniwet Vihara in B.E. 2535 under the patronage of Somdej Phra Nyanasamvara, Supreme Patriarch.",
    description_th: `พระกริ่งไพรีพินาศ วัดบวรนิเวศวิหาร กรุงเทพมหานคร ปี พ.ศ. 2535 เนื้อนวโลหะแก่ทองชนวน ตอกโค้ดกำกับและตอกหมายเลขประจำองค์ 369

พระไพรีพินาศ เป็นพระพุทธรูปศิลาโบราณปางประทานอภัยที่มีความศักดิ์สิทธิ์ยิ่งยวด ประดิษฐาน ณ พระเจดีย์ใหญ่วัดบวรนิเวศวิหาร มีประวัติว่าผู้ที่คิดร้ายหรือเป็นศัตรูกับผู้บูชาที่มีศีลธรรมบริสุทธิ์จะต้องพ่ายแพ้ภัยตัวเอง ในปี พ.ศ. 2535 วัดบวรนิเวศวิหารได้จัดพิธีมหาพุทธาภิเษกเททองหล่อพระกริ่งไพรีพินาศขึ้น โดยสมเด็จพระสังฆราชเจ้า กรมหลวงวชิรญาณสังวร (เจริญ สุวฑฺฒโน) ทรงเป็นประธานในพิธี ผสมชนวนพระกริ่งเก่าสายวัดบวรฯ และแผ่นยันต์ 108 จากพระเกจิทั่วประเทศ

พุทธคุณโดดเด่น:
• ไพรีพินาศ ชนะศัตรูหมู่มาร: คนคิดร้าย แพ้ภัยตนเอง ขจัดอุปสรรคและขวากหนามในชีวิต
• เมตตามหานิยมและแคล้วคลาด: พระกริ่งเสียงดังกังวาน ขจัดโรคภัยไข้เจ็บ เสริมสิริมงคล
• อำนาจบารมีและความรุ่งเรือง: เสริมบารมีผู้นำ ความเจริญก้าวหน้าในตำแหน่งหน้าที่`,
    description: `The revered Phra Kring Phairee Phinas (The Victorious Buddha Over Adversaries) cast in sacred ancient Navaguna (nine-metal) bronze alloy, authenticated with official monastery stamps and stamped serial number 369, consecrated at Wat Bowonniwet Vihara, Bangkok, in B.E. 2535 (1992).

Consecrated under the supreme spiritual presidency of His Holiness Somdej Phra Nyanasamvara (Suvaddhano), Supreme Patriarch of Thailand. Phra Phairee Phinas holds immense royal and esoteric reverence in Siam, tracing back to King Rama IV; authentic scriptures record that adversaries harboring malice toward the virtuous bearer find their hostilities naturally dispersed and defeated by their own negative karma.

Core Spiritual Virtues (พุทธคุณ):
• Vanquishing Adversaries (Phairee Phinas): Neutralizes hostile corporate competitors, jealous detractors, and harmful plots.
• Sonic Mind Healing & Vitality: The consecrated ringing bead within aligns spiritual awareness, promoting health and serene focus.
• Executive Stature & Sovereign Authority: Bestows commanding presence and career ascent under royal auspices.`,
    description_zh: `曼谷皇家第一圣寺——僧王庙（瓦波旺尼威佛寺）于佛历2535年（1992年）隆重督造之九宝铜（Nawa Loha）帕派里碧纳药师药王铃佛（Phra Kring Phairee Phinas），原庙打钢印并打独立流水编号369。

由十九世僧王顺德帕尊尼延纳桑旺（普文僧皇）亲自率领全泰顶尖僧伽于大雄宝殿举行皇家水陆大法会开光加持。“派里碧纳”泰语意为“令一切仇敌、恶人与障碍自然溃败消亡”。历史溯自拉玛四世皇时期，此佛尊以降伏外道、反弹恶意暗箭、化险为夷而威震全泰。

核心功效（พุทธคุณ）：
• 扫除小人与化解恶念（派里碧纳）：令陷害暗算佩戴者之人自食恶果，破除职场倾轧。
• 药师佛音消灾延寿：内置纯金属性圣铃珠，摇动清越，净化气场，安神祛病。
• 皇家尊荣事业飞升：僧王法脉皇家开光，赋予至尊官运与领导统御气魄。`
  },
  {
    id: 1783,
    name_th: "พระกลีบบัว เนื้อผงพุทธคุณ หลวงพ่ออุ่น วัดบางขุด สมุทรสงคราม ปี 2498",
    name: "Phra Kleep Bua Sacred Powder Luang Pho Oun Wat Bang Khut Samut Songkhram B.E. 2498",
    name_zh: "夜功府瓦邦库寺龙婆温佛历2498年圣经粉莲瓣佛祖像",
    slug: "phra-kleep-bua-powder-luang-pho-oun-wat-bang-khut-2498",
    short: "Vintage Phra Kleep Bua (Lotus Petal Buddha) amulet hand-pressed in consecrated holy powders around B.E. 2498 by Luang Pho Oun, Wat Bang Khut, Samut Songkhram.",
    description_th: `พระกลีบบัว เนื้อผงพุทธคุณ หลวงพ่ออุ่น วัดบางขุด อำเภอบ้านแหลม/อัมพวา เขตติดต่อสมุทรสงคราม–สมุทรสาคร จัดสร้างขึ้นราวปี พ.ศ. 2498 

หลวงพ่ออุ่น วัดบางขุด เป็นพระเกจิอาจารย์ยุคเก่าผู้เปี่ยมด้วยตบะและวิทยาคมอันแก่กล้าแห่งลุ่มน้ำแม่กลอง ท่านได้ลบผงพุทธคุณศักดิ์สิทธิ์ตามตำรับโบราณ นำมาผสมกับผงวิเศษ 5 ประการ เกษรดอกไม้ 108 และผงเก่าที่ท่านสะสมไว้ กดพิมพ์เป็นพระพิมพ์กลีบบัว (ลักษณะคล้ายพระนางพญาบนกลีบบัวบาน) พระรุ่นนี้สร้างแจกแก่ศิษยานุศิษย์และชาวบ้านในยุคสงครามอินโดจีนจนถึงกึ่งพุทธกาล โดดเด่นด้านความปลอดภัยและเมตตามหานิยม

พุทธคุณโดดเด่น:
• เมตตามหานิยม มหาเสน่ห์: ผงวิเศษลบมือโบราณ มอบพลังเมตตา เป็นที่รักใคร่และเจรจาสำเร็จง่าย
• แคล้วคลาดปลอดภัย: คุ้มครองจากอุบัติเหตุและภัยอันตรายรอบด้าน
• ความร่มเย็นเป็นสุข: ดั่งพระพุทธเจ้าประทับบนกลีบบัว สื่อถึงความสงบสุขและความเจริญงอกงามในชีวิต`,
    description: `Rare vintage Phra Kleep Bua (Lotus Petal Buddha) pressed from sacred handwritten yant powders by the ancient master monk Luang Pho Oun of Wat Bang Khut, bordering Samut Songkhram and Samut Sakhon provinces, crafted around B.E. 2498 (1955).

Luang Pho Oun was a secluded, deeply realized meditation master of the Mae Klong river delta. Hand-inscribing and sweeping esoteric holy chalk powders (Phong Wiset) combined with 108 auspicious herbal and botanical essences, he hand-pressed these lotus-petal votive tablets to safeguard disciples during the tumultuous mid-century eras. The lotus petal posture symbolizes immaculate spiritual rising and emotional serenity.

Core Spiritual Virtues (พุทธคุณ):
• Supreme Loving-Kindness (Metta Mahaniyom): Traditional esoteric powder creates natural charismatic warmth in social and business relations.
• Miraculous Protection (Klaew Klaad): Shields against environmental perils, road accidents, and harm.
• Peace & Harmonious Household: Inspires internal equilibrium and stable family prosperity.`,
    description_zh: `泰国夜功府（美功河流域）古刹瓦邦库佛寺（Wat Bang Khut）早期圣僧龙婆温（Luang Pho Oun）于佛历2498年（1955年）亲手压制开光之“经粉莲瓣佛祖像”（Phra Kleep Bua）。

龙婆温大师为美功河流域之隐世隐修高僧，持戒精严，符法纯正。大师亲自手书古法五大吉祥经文并扫集落粉（Phong Wiset），混合百种草药与香灰手模压制而成。莲花宝座法相不仅庄严优美，更寓意出淤泥而不染、化烦恼为菩提之清净解脱。

核心功效（พุทธคุณ）：
• 顶级人缘慈悲魅力（Metta）：古经粉散发祥和人缘磁场，化解敌意，广聚良朋。
• 避险保平安化煞：护佑佩戴者免遭意外灾伤与邪秽近身。
• 家宅祥和身心宁静：如坐金莲，赋予内心清安，护佑家道兴旺稳定。`
  },
  {
    id: 1784,
    name_th: "เหรียญพระพุทธบาท วัดเขาบางทราย ปี 2511 ท่านเจ้าคุณนรฯ ปลุกเสกอธิษฐานจิต",
    name: "Rian Phra Phutthabat Wat Khao Bang Sai B.E. 2511 Consecrated by Chao Khun Nor",
    name_zh: "春武里府瓦考邦赛寺佛历2511年佛陀圣迹足印铜牌 周冠罗大师开光加持",
    slug: "rian-phra-phutthabat-wat-khao-bang-sai-2511-chao-khun-nor",
    short: "Sacred Rian Phra Phutthabat (Holy Buddha Footprint) amulet coin from Wat Khao Bang Sai, Chonburi, consecrated in B.E. 2511 with prayer dedication by the Arahat monk Chao Khun Nor of Wat Thepsirin.",
    description_th: `เหรียญพระพุทธบาท วัดเขาบางทราย (วัดเขาพระพุทธบาทบางทราย) อำเภอเมือง จังหวัดชลบุรี ปี พ.ศ. 2511 ปลุกเสกและอธิษฐานจิตโดย พระธมฺมวิตกฺโกภิกขุ (ท่านเจ้าคุณนรฯ) วัดเทพศิรินทราวาส กรุงเทพมหานคร

วัดเขาบางทราย เป็นพระอารามหลวงชั้นตรีและเป็นวัดที่มีความผูกพันลึกซึ้งกับสมเด็จพระพุทธโฆษาจารย์ (เจริญ ญาณวโร) ผู้เป็นพระอุปัชฌาย์ของท่านเจ้าคุณนรฯ ภายในวัดประดิษฐานรอยพระพุทธบาทอันศักดิ์สิทธิ์บนยอดเขา เหรียญรุ่นนี้จัดสร้างขึ้นในปี พ.ศ. 2511 โดยท่านเจ้าคุณนรฯ ได้แผ่เมตตาจิตอธิษฐานจิตปลุกเสกเดี่ยวอย่างเข้มขลัง พระเครื่องที่ท่านอธิษฐานจิตได้รับการยกย่องว่าบริสุทธิ์หมดจดและเปี่ยมด้วยพุทธานุภาพสูงสุด

พุทธคุณโดดเด่น:
• เมตตามหานิยมและแคล้วคลาด: กระแสจิตอันบริสุทธิ์ของพระอรหันต์ คุ้มครองผู้บูชาให้พ้นจากอุปัทวเหตุทั้งปวง
• ความเจริญก้าวหน้าในชีวิต: ดั่งรอยพระพุทธบาท นำพาก้าวไปสู่ความสำเร็จและแสงสว่าง
• โชคลาภและความร่มเย็น: ปราศจากโรคภัยไข้เจ็บ จิตใจสงบ มั่งคั่งด้วยคุณธรรม`,
    description: `Auspicious Rian Phra Phutthabat (Sacred Footprint of the Buddha) coin consecrated in B.E. 2511 (1968) at Wat Khao Bang Sai, Chonburi Province, blessed and empowered through the meditative trance of the revered Arahat master Chao Khun Nor (Dhammavitakko Bhikkhu) of Wat Thepsirintrawat, Bangkok.

Wat Khao Bang Sai holds royal status and historic intimacy with the lineage of Somdej Phra Buddhakhosachan (Charoen), the spiritual preceptor of Chao Khun Nor. Consecrated with the supreme meditative concentration of Chao Khun Nor—who never departed his monastery grounds and whose pure telepathic consecrations are renowned throughout Southeast Asia—this coin bears the sacred Footprint of the Buddha, signifying divine guidance and elevation above earthly suffering.

Core Spiritual Virtues (พุทธคุณ):
• Pure Enlightened Protection: Deflects catastrophic physical dangers, psychic contamination, and negative karma.
• Progressive Steps to Success: Symbolizing the footprint of the Buddha, it anchors steady life progression and career breakthrough.
• Serenity & Miraculous Auspices: Bestows peaceful household conditions, radiant fortune, and moral clarity.`,
    description_zh: `春武里府皇家名刹——瓦考邦赛寺（Wat Khao Bang Sai）于佛历2511年（1968年）督造之佛陀圣迹足印铜牌（Rian Phra Phutthabat），恭请全泰公认“城市阿罗汉圣僧”周冠罗大师（Chao Khun Nor / 昙玛威达柯比丘）入定主持念力大法会。

瓦考邦赛寺供奉着著名的佛陀圣足足印古迹，亦是周冠罗大师之恩师——顺德帕普塔库沙赞（查楞）长老之祖庙祖庭。周冠罗大师一生清修持戒，以纯净无瑕之神定念力加持圣物闻名于世，其加持之佛牌被誉为全泰最清净之护身符宝。

核心功效（พุทธคุณ）：
• 圣足踏福步步高升：佛祖圣足象征步步为赢、脚踏实地迈向成功与尊荣。
• 阿罗汉清净念力护佑：化解一切凶难灾祸、辟除邪崇与飞来车祸。
• 慈悲人缘身心安宁：平复内心焦躁，广结善缘贵人，家庭安康祥泰。`
  },
  {
    id: 1785,
    name_th: "พระชัยวัฒน์ หลวงปู่วาส วัดสะพานสูง จ.นนทบุรี ปี 2540 มีรอยจารใต้ฐาน",
    name: "Phra Chaiwat Hand-Inscribed Base Luang Pu Vas Wat Saphan Sung Nonthaburi B.E. 2540",
    name_zh: "暖武里府瓦沙攀颂寺龙普瓦佛历2540年手刻底符帕猜瓦胜利小药师佛",
    slug: "phra-chaiwat-hand-inscribed-luang-pu-vas-wat-saphan-sung-2540",
    short: "Sacred cast Phra Chaiwat statuette with master's hand-inscribed base, consecrated in B.E. 2540 by Luang Pu Vas, direct lineage keeper of Wat Saphan Sung, Nonthaburi.",
    description_th: `พระชัยวัฒน์ หลวงปู่วาส สีลเตโช วัดสะพานสูง อำเภอปากเกร็ด จังหวัดนนทบุรี ปี พ.ศ. 2540 เนื้อโลหะผสมสายวัดสะพานสูง ใต้ฐานมีรอยจารมือศักดิ์สิทธิ์เดิม

หลวงปู่วาส สีลเตโช ยอดพระเกจิอาจารย์ผู้สืบสานสายวิชาแห่งวัดสะพานสูง ท่านมีศักดิ์เป็นเหลนของหลวงปู่เอี่ยม ปฐมนาม (เจ้าตำรับพระปิดตาและตะกรุดโสฬสมหามงคลอันดับหนึ่งของสยาม) และเป็นศิษย์ผู้ได้รับการถ่ายทอดวิชาจากหลวงปู่กลิ่น และหลวงพ่อทองสุข วัดสะพานสูง พระชัยวัฒน์รุ่นนี้สร้างในปี 2540 หล่อหลอมจากชนวนโลหะศักดิ์สิทธิ์และแผ่นยันต์โสฬสมหามงคล ใต้ฐานมีรอยจารเหล็กจารด้วยมือหลวงปู่วาสอย่างประณีต

พุทธคุณโดดเด่น:
• ชนะอุปสรรคและภัยพิบัติ (มหาปราบ): นามว่า "ชัยวัฒน์" หมายถึง ความเจริญแห่งชัยชนะ ชนะศัตรูคู่แข่ง ชนะโรคภัย
• มหาอำนาจบารมีและเลื่อนขั้น: หนุนดวงชะตาผู้นำ ข้าราชการ นักธุรกิจ ให้ประสบความสำเร็จสูงสุด
• เมตตามหานิยมและแคล้วคลาด: ปกป้องคุ้มครองภัย มหาระงับดับทุกข์ภัยอันตรายทั้งปวง`,
    description: `Auspicious cast metal Phra Chaiwat (Victorious Buddha) amulet featuring authentic hand-inscribed sacred yant underneath the base, consecrated in B.E. 2540 (1997) by Luang Pu Vas Silatecho of Wat Saphan Sung, Pak Kret, Nonthaburi Province.

Luang Pu Vas was the venerated generational lineage keeper of Wat Saphan Sung. A direct great-grandnephew of the immortal Luang Pu Iam Pathamanam (creator of Thailand's #1 Solos Mahamongkol Takrut and sacred lacquered Pidta), he trained directly under Luang Pu Klin and Luang Pho Thongsuk. Cast with sacred temple bronze and empowered through Solos cosmological yant formulas, each piece was personally hand-etched with sacred stylus scripts under the base.

Core Spiritual Virtues (พุทธคุณ):
• Unconquerable Victory (Chaiwat): Conquers corporate rivalries, legal obstructions, and adverse circumstances.
• Executive Stature & Leadership: Bestows resolute authority, clear strategic vision, and rapid career promotion.
• Universal Protective Shield: Vanquishes sorcery, physical perils, and spiritual distress.`,
    description_zh: `全泰第一索洛蒙坤法脉——暖武里府瓦沙攀颂佛寺（Wat Saphan Sung）龙普瓦（Luang Pu Vas Silatecho）大师于佛历2540年（1997年）铸造开光之“手刻底符帕猜瓦胜利小药师佛”。底部具有大师亲书之金属手刻符印。

龙普瓦大师为瓦沙攀颂寺开山祖师、全泰第一必打王龙普严（Luang Pu Iam Pathamanam）之玄侄孙，并亲身师承龙普君（Luang Pu Klin）及龙婆通蜀（Luang Pho Thongsuk）两大名僧。此尊帕猜瓦由大师取古铜钟、老符管与古法合金熔铸而成，底款手刻大师独门秘符，法力极其充沛。

核心功效（พุทธคุณ）：
• 战无不胜凯旋必胜（猜瓦）：克敌制胜、破除商业竞争对手之阻碍、扫清一切险阻。
• 权威威慑与领袖官运：赋能决策定力，助企管高层与创业者稳握权柄。
• 索洛蒙坤全方位护佑：避邪挡降、消灾免难、护佑身心康健。`
  },
  {
    id: 1786,
    name_th: "พระชัยวัฒน์ 90 พรรษา สมเด็จย่า เนื้อนวโลหะแก่เงิน ปี 2533 พิธีมหาพุทธาภิเษก",
    name: "Phra Chaiwat 90th Birthday Commemoration Princess Mother B.E. 2533 Silver-Rich Navaguna",
    name_zh: "佛历2533年九宝铜偏银督造庆祝太后90华诞大法会帕猜瓦胜利药师佛",
    slug: "phra-chaiwat-90th-princess-mother-2533-silver-rich-navaguna",
    short: "Rare Phra Chaiwat cast in silver-rich Navaguna bronze, commemorating the 90th Birthday Celebration of the Princess Mother (Somdej Ya) in B.E. 2533. Blessed at Wat Bowonniwet Vihara.",
    description_th: `พระชัยวัฒน์ ฉลองพระชนมายุ 90 พรรษา สมเด็จย่า (สมเด็จพระศรีนครินทราบรมราชชนนี) จัดสร้างขึ้นเมื่อปี พ.ศ. 2533 เนื้อนวโลหะแก่เงิน ผิวกลับกระแสเงินสวยงามทรงคุณค่า

จัดสร้างขึ้นเนื่องในวาระอันเป็นมงคลยิ่งที่สมเด็จย่าทรงเจริญพระชนมายุครบ 90 พรรษา ประกอบพิธีมหาพุทธาภิเษกอย่างสมพระเกียรติ ณ พระอุโบสถวัดบวรนิเวศวิหาร โดยสมเด็จพระญาณสังวร สมเด็จพระสังฆราชฯ ทรงเป็นประธาน พร้อมด้วยพระเกจิคณาจารย์ชั้นนำทั่วประเทศร่วมอธิษฐานจิต ชนวนมวลสารหล่อหลอมจากแผ่นยันต์ 108 แผ่นจากพระเกจิ 73 จังหวัด และชนวนพระกริ่งรุ่นประวัติศาสตร์

พุทธคุณโดดเด่น:
• ชัยชนะและความสำเร็จ (พระชัยวัฒน์): ชนะอุปสรรค นำพาชีวิตก้าวหน้าสู่ความรุ่งเรือง
• สุขภาพแข็งแรง อายุยืนยาว: พระชัยวัฒน์คือพระหมอยาในคติมหายานและเถรวาท เสริมสุขภาพ บำบัดจิตใจ ปราศจากโรคภัย
• มหาอุดมมงคล แคล้วคลาดปลอดภัย: บารมีแห่งแผ่นดินคุ้มครองให้อยู่เย็นเป็นสุข`,
    description: `Auspicious Phra Chaiwat statuette cast in silver-enriched Navaguna alloy, consecrated in B.E. 2533 (1990) to commemorate the historic 90th Birthday Anniversary of Her Royal Highness the Princess Mother (Somdej Ya).

The grand consecration ceremony was held at the sacred Ubosot of Wat Bowonniwet Vihara, Bangkok, under the supreme presidency of His Holiness Somdej Phra Nyanasamvara, Supreme Patriarch of Thailand, joined by venerated master monks from throughout Siam. Cast with 108 consecrated golden and silver yant plates donated by master monks from all 73 provinces of Thailand combined with sacred historic bronze ingots.

Core Spiritual Virtues (พุทธคุณ):
• Enduring Vitality & Longevity: Celebrated for wellness blessings, peace of mind, and warding off afflictions.
• Triumphant Progress (Phra Chaiwat): Dismantles setbacks and promotes continuous auspicious breakthroughs.
• Royal Auspicious Shield: Bestows supreme household peace, merit accumulation, and safety.`,
    description_zh: `泰国皇家佛历2533年（1990年）为庆祝诗纳卡琳王太后（皇太母 / Somdej Ya）九十华诞，于曼谷僧王庙（瓦波旺尼威佛寺）大雄宝殿举行盛大水陆皇家加持法会督造之“九宝铜偏银帕猜瓦小药师佛”。

法会由十九世僧王普文僧皇主持，集结全泰73府数百位著名高僧亲笔手书之108张秘符金银铜叶及历代老药师佛铜料一同熔铸。整尊佛像呈现九宝铜偏白银之高贵温润皮壳，极为庄严雅致。

核心功效（พุทธคุณ）：
• 延年益寿康宁百岁：象征王太母90华诞福寿无疆之皇室鸿福，祛病除疾，护佑身心。
• 凯旋昌盛事业有成：帕猜瓦佛祖主赐予无量战胜困难之福力，职场亨通。
• 皇室浩然正气护佑：镇宅安居，化解戾气，出入平安祥和。`
  },
  {
    id: 1787,
    name_th: "รูปหล่อลอยองค์ หลวงปู่ทวด วัดช้างให้ ปี 2523 ก้นอุดช้าง เนื้อโลหะรมดำ กล่องเดิม อาจารย์นองเสก",
    name: "Luang Pu Thuad Cast Statuette B.E. 2523 Elephant Seal Base Blessed by Ajahn Nong",
    name_zh: "北大年府瓦沧海佛寺佛历2523年原盒大象塞印阿赞弄开光龙普拓立尊",
    slug: "luang-pu-thuad-cast-statuette-2523-elephant-seal-ajahn-nong",
    short: "Luang Pu Thuad cast statuette, Wat Chang Hai B.E. 2523 in blackened sacred bronze with elephant seal under base and original temple box. Co-consecrated by Phra Ajahn Nong of Wat Sai Khao.",
    description_th: `รูปหล่อลอยองค์ หลวงปู่ทวด เหยียบน้ำทะเลจืด วัดช้างให้ อำเภอโคกโพธิ์ จังหวัดปัตตานี ปี พ.ศ. 2523 เนื้อโลหะรมดำ ใต้ฐานอุดผงมวลสารศักดิ์สิทธิ์และตอกโค้ดช้าง สภาพสวยสมบูรณ์พร้อมกล่องเดิมจากวัด

จัดสร้างขึ้นในปี พ.ศ. 2523 ณ วัดช้างให้ วัดต้นตำรับแห่งองค์หลวงปู่ทวด โดยมี พระอาจารย์นอง ธมฺมภูโต แห่งวัดทรายขาว (สหธรรมิกคนสำคัญของอาจารย์ทิม วัดช้างให้ ผู้ร่วมบุกเบิกสร้างหลวงปู่ทวดปี 2497) เป็นประธานฝ่ายสงฆ์ในการประกอบพิธีพุทธาภิเษก พร้อมด้วยพระเกจิอาจารย์สายใต้ผู้ทรงอภิญญามากมาย หลวงปู่ทวดได้รับการยกย่องเป็นพระนิรันตรายอันดับ 1 ของแผ่นดินสยาม

พุทธคุณโดดเด่น:
• แคล้วคลาดนิรันตรายอันดับ 1: คุ้มครองจากอุบัติเหตุทางรถยนต์ การเดินทางไกล และภยันตรายทั้งปวง
• ป้องกันภัยร้ายและคุณไสย: บารมีพระโพธิสัตว์สลายสิ่งอัปมงคลและพลังงานลบ
• โชคลาภและการค้าขาย: พุทธคุณด้าน "เหยียบน้ำทะเลจืด" สื่อถึงการเปลี่ยนเรื่องร้ายให้กลายเป็นดี พลิกชีวิตสู่ความเจริญรุ่งเรือง`,
    description: `Historic Luang Pu Thuad cast statuette (Rup Lor Loi Ong), consecrated in B.E. 2523 (1980) at Wat Chang Hai, Pattani Province, cast in blackened sacred bronze with consecrated holy powders sealed with an elephant code underneath the base, complete with its original vintage temple presentation box.

Presided over by the legendary Phra Ajahn Nong Dhammabhuto of Wat Sai Khao, the foremost spiritual brother to Ajahn Tim who co-founded the legendary B.E. 2497 Luang Pu Thuad amulets. Luang Pu Thuad is universally revered throughout Southeast Asia as Thailand's undisputed #1 protective Bodhisattva for accident avoidance and miraculous survival.

Core Spiritual Virtues (พุทธคุณ):
• #1 Supreme Vehicle & Travel Protection: Unsurpassed protection against traffic accidents and catastrophic peril.
• Inversion of Hardship: Embodying the miracle of turning saltwater into sweet water, transforming adversity into breakthrough fortune.
• Sacred Repelling of Evil: Purifies environments of negative entities, dark arts, and misfortune.`,
    description_zh: `全泰第一避险车神——泰国南部北大年府根本祖庙瓦沧海（Wat Chang Hai）于佛历2523年（1980年）督造开光之“龙普拓立尊”（Rup Lor Luang Pu Thuad）。黑铜熏黑精工铸造，底部塞入珍贵圣粉并打上大象印记，附带原装出寺收藏盒。

法会由一代圣僧——瓦塞考寺阿赞弄（Ajahn Nong / 龙普拓2497鼻祖阿赞添最亲近之师兄弟）亲自领衔主持开光加持，汇聚泰南多位当世得道高僧。龙普拓被公认为全泰抵御车祸与意外伤亡第一的慈悲大菩萨。

核心功效（พุทธคุณ）：
• 全泰公认第一车神避险：极强庇佑行车安全、出行平安、化解人身意外。
• 脚踏海水化淡水神迹：逢凶化吉，在绝境中扭转乾坤，将劣势转化为顺境。
• 辟邪挡煞消降头：菩萨威光驱散恶灵凶兆，招纳正财商运。`
  },
  {
    id: 1788,
    name_th: "พระสมเด็จ พิมพ์ใหญ่ หลังยันต์ครู ฝังตะกรุดทองคำแท้ หลวงปู่มี วัดมารวิชัย อยุธยา​ ปี 2539",
    name: "Phra Somdej Phim Yai with Solid Gold Takrut Luang Pu Mee Wat Marwichai B.E. 2539",
    name_zh: "大城府瓦玛威猜寺龙普咪佛历2539年大模背大师祖印嵌纯金符管崇迪佛",
    slug: "phra-somdej-phim-yai-gold-takrut-luang-pu-mee-wat-marwichai-2539",
    short: "Rare Phra Somdej Phim Yai embedded with genuine solid gold takrut and master guru yant on reverse, consecrated in B.E. 2539 by Luang Pu Mee, Wat Marwichai, Ayutthaya.",
    description_th: `พระสมเด็จ พิมพ์ใหญ่ หลังยันต์ครู ฝังตะกรุดทองคำแท้ หลวงปู่มี (พระครูเกษมคณาภิบาล) วัดมารวิชัย อำเภอเสนา จังหวัดพระนครศรีอยุธยา จัดสร้างขึ้นในวาระมงคลปี พ.ศ. 2539 เนื้อผงพุทธคุณศักดิ์สิทธิ์ สร้างจำนวนน้อย

หลวงปู่มี วัดมารวิชัย เป็นยอดพระเกจิอาจารย์ชื่อดังแห่งเมืองกรุงเก่า ท่านเป็นศิษย์ผู้สืบทอดวิทยาคมสายตรงจากหลวงพ่อปาน วัดบางนมโค, หลวงพ่อจง วัดหน้าต่างนอก และหลวงพ่อเขียน วัดบ้านพร้าวนอก พระสมเด็จรุ่นนี้สร้างขึ้นอย่างประณีต ด้านหน้าเป็นพิมพ์พระสมเด็จฐาน 3 ชั้นสง่างาม ด้านหลังประทับยันต์ครูประจำตัวหลวงปู่มี พร้อมฝังตะกรุดทองคำแท้ที่ผ่านการลงอักขระปลุกเสกเดี่ยวอย่างเข้มขลัง

พุทธคุณโดดเด่น:
• โภคทรัพย์และความมั่งคั่ง: ฝังตะกรุดทองคำแท้ เสริมพลังดึงดูดทรัพย์สิน เงินทอง ค้าขายร่ำรวย
• อำนาจบารมีและความก้าวหน้า: พระสมเด็จราชาแห่งพระเครื่อง เสริมสง่าราศี ผู้ใหญ่รักใคร่เมตตา เลื่อนขั้นเลื่อนตำแหน่ง
• เมตตามหานิยมและแคล้วคลาด: คุ้มครองความปลอดภัยจากภยันตรายทั้งปวง`,
    description: `Rare and prestigious Phra Somdej Phim Yai (Large Mold) embedded with an authentic solid gold takrut scroll and the master's sacred guru yant on the reverse, consecrated in B.E. 2539 (1996) by Luang Pu Mee (Phra Khru Kasemkhanaphiban) of Wat Marwichai, Sena District, Ayutthaya Province.

Luang Pu Mee was revered across Thailand as a titan of Ayutthayan esoteric Buddhism. He inherited deep consecrated arts directly from the immortal Luang Pho Parn of Wat Bang Nom Kho, Luang Pho Jong of Wat Na Tang Nok, and Luang Pho Khian of Wat Ban Phrao Nok. Hand-pressed with concentrated holy powders and embedded with pure gold inscribed scrolls, this limited masterpiece radiates profound wealth-gathering and commanding blessings.

Core Spiritual Virtues (พุทธคุณ):
• Golden Wealth Magnetism: The solid gold takrut acts as a powerful commercial magnet for capital accumulation, lucrative deals, and windfall luck.
• Sovereign Authority (Maha Amnaj): Empowers leadership stature, board-level negotiation influence, and respect.
• Comprehensive Bodhisattva Shield: Safeguards against physical trauma, malevolent energies, and perils.`,
    description_zh: `大城府瓦玛威猜佛寺（Wat Marwichai）当代名僧——龙普咪（Luang Pu Mee / 帕库卡森卡纳披班）于佛历2539年（1996年）督造开光之“大模背大师祖印嵌纯金符管崇迪佛”（Phra Somdej Phim Yai）。限量督造，极具收藏价值。

龙普咪大师法脉极为显赫，亲身承袭大城府三大泰斗——瓦邦喃柯寺神兽崇迪鼻祖龙婆班（Luang Pho Parn）、瓦纳唐诺寺神通神僧龙婆钟（Luang Pho Jong）及龙婆欠（Luang Pho Khian）之真传法门。正面为经典三层法座崇迪大佛，背面压印大师本命师门符印并镶嵌亲手符刻之纯金真金符管。

核心功效（พุทธคุณ）：
• 纯金招财聚富金袋：纯金符管蕴藏招财密咒，强力吸聚正偏财源与商机买卖。
• 万佛之王威信升迁：增进领袖威望与社会地位，受上司贵人提携看重。
• 避险保平安无上庇佑：全方位阻挡一切人身灾凶与邪术近身。`
  },
  {
    id: 1789,
    name_th: "เหรียญหล่อพิมพ์หยดน้ำ หลวงพ่อโต ซำปอกง วัดพนัญเชิงวรวิหาร อยุธยา ปี 2538 เนื้อนวโลหะ พิธีใหญ่",
    name: "Luang Pho To Sam Po Kong Teardrop Cast Coin Wat Phanan Choeng B.E. 2538 Navaguna",
    name_zh: "大城府瓦帕南称大王庙佛历2538年三宝公龙婆多水滴型九宝铜铸模大铜牌",
    slug: "luang-pho-to-sam-po-kong-teardrop-wat-phanan-choeng-2538-navaguna",
    short: "Sacred teardrop cast amulet of Luang Pho To (Sam Po Kong) from Wat Phanan Choeng, Ayutthaya, cast in sacred Navaguna bronze in B.E. 2538 during the grand restoration consecration.",
    description_th: `เหรียญหล่อพิมพ์หยดน้ำ หลวงพ่อโต (พระพุทธไตรรัตนนายก หรือ ซำปอกง) วัดพนัญเชิงวรวิหาร จังหวัดพระนครศรีอยุธยา ปี พ.ศ. 2538 เนื้อนวโลหะ พิธีมหาพุทธาภิเษกใหญ่

หลวงพ่อโต วัดพนัญเชิง เป็นพระพุทธรูปศิลาคู่บ้านคู่เมืองอยุธยาที่มีความศักดิ์สิทธิ์สูงสุด และเป็นที่เคารพสักการะอย่างยิ่งของชาวไทยและชาวไทยเชื้อสายจีนทั่วโลกในนาม "ซำปอกง" เหรียญหล่อพิมพ์หยดน้ำรุ่นนี้จัดสร้างขึ้นเป็นที่ระลึกในการบูรณปฏิสังขรณ์พระอารามหลวงเมื่อปี พ.ศ. 2538 หล่อหลอมด้วยเนื้อนวโลหะเข้มขลัง ด้านหน้าเป็นรูปจำลององค์หลวงพ่อโตอันศักดิ์สิทธิ์ ด้านหลังจารึกอักขระยันต์มงคลและตราสัญลักษณ์วัด

พุทธคุณโดดเด่น:
• โชคลาภ การค้าขาย มั่งคั่งร่ำรวย: ซำปอกงขึ้นชื่อลือชาเรื่องความสำเร็จในการค้าขายทางเรือ ธุรกิจระหว่างประเทศ และการเจรจาค้าขาย
• คุ้มครองความปลอดภัย แคล้วคลาด: คุ้มครองการเดินทางไกลทั้งทางบกและทางน้ำ
• เจริญรุ่งเรืองและครอบครัวอบอุ่น: ปัดเป่าอุปสรรค นำพาความสุขสมบูรณ์และความสำเร็จมาสู่ชีวิต`,
    description: `Auspicious teardrop cast bronze amulet of the immortal Luang Pho To (Phra Phuttha Trai Rattana Nayok, universally revered among Chinese devotees as Sam Po Kong) from the historic Wat Phanan Choeng Worawihan, Ayutthaya, cast in sacred Navaguna bronze in B.E. 2538 (1995).

Wat Phanan Choeng is an ancient royal monastery that predates the founding of the Ayutthaya Kingdom. Luang Pho To stands as one of Siam's most colossal and miraculous golden Buddhas, venerated across Asia as the supreme guardian of maritime merchants, entrepreneurs, and trans-continental commerce. Consecrated during the historic temple restoration grand assembly co-blessed by leading master monks of Ayutthaya.

Core Spiritual Virtues (พุทธคุณ):
• Grand Commercial Prosperity (Sam Po Kong): The patron guardian of international business, major corporate trades, and expansive enterprise wealth.
• Miraculous Travel & Maritime Safety: Shields long-distance travel, sea crossings, and daily commutes.
• Household Harmony & Longevity: Dispels business distress, promoting inter-generational stability.`,
    description_zh: `大城府千年皇家第一古刹——瓦帕南称大王庙（Wat Phanan Choeng）于佛历2538年（1995年）修缮大殿大典时隆重铸造之“三宝公龙婆多水滴型九宝铜铸模大铜牌”（Luang Pho To / Sam Po Kong）。

大城府瓦帕南称佛寺之“龙婆多金身坐佛”，在华人世界被无限崇奉为“三宝公”，始建历史甚至早于阿育陀耶王朝建都。此尊神佛威震四海，被全泰华侨与东南亚华商尊为海上丝路经商者之最高航海保护神与商贾发财财神。佛历2538年集结全泰多位名僧举办公开大法会开光。

核心功效（พุทธคุณ）：
• 经商巨贾三宝公招财：庇佑对外贸易、企业拓展、投资兴旺与四方纳财。
• 海陆出行平安辟险：强力庇护跨国经商、长途旅程与行车船舶安全。
• 阖家康泰福寿双全：化解厄运与阻力，带来世代安宁与功德福报。`
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
      .select('id, name_th, slug, published');

    if (error) {
      console.error(`❌ Error updating ID ${item.id}:`, error);
    } else {
      console.log(`✅ Successfully published ID ${item.id}: ${item.name_th} (${item.slug})`);
    }
  }

  // Verify remaining drafts
  const { data: remaining, count } = await supabase
    .from('products')
    .select('id, name_th, published', { count: 'exact' })
    .eq('published', false);

  console.log(`\n========================================`);
  console.log(`Remaining unpublished products in database: ${remaining ? remaining.length : 0}`);
  if (remaining && remaining.length > 0) {
    remaining.forEach(r => console.log(`- ID ${r.id}: ${r.name_th}`));
  } else {
    console.log(`🎉 100% OF ALL PRODUCTS ARE NOW PUBLISHED!`);
  }
}

run();
