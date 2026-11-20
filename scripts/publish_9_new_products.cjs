const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const PRODUCTS_TO_PUBLISH = [
  {
    id: 1814,
    name_th: "พระสมเด็จ พิมพ์ฐานสิงห์สามชั้น หลวงปู่จันทร์ วัดศรีเทพประดิษฐาราม นครพนม ปี 2500",
    name: "Phra Somdej Three-Tier Lion Base Luang Pu Jan Wat Sri Thep B.E. 2500",
    name_zh: "那空拍侬府瓦西贴寺龙普詹佛历2500年三层狮座崇迪佛牌",
    slug: "phra-somdej-than-singh-3-tier-luang-pu-jan-wat-sri-thep-2500",
    category: "พระสมเด็จ",
    short: "Vintage Phra Somdej Three-Tier Lion Base B.E. 2500 by Luang Pu Jan, Wat Sri Thep, Nakhon Phanom. Infused with ancient Bang Khun Phrom powder.",
    description_th: `พระสมเด็จ พิมพ์ฐานสิงห์สามชั้น จัดสร้างและอธิษฐานจิตปลุกเสกโดย พระเทพสิทธาจารย์ (หลวงปู่จันทร์ เขมสิริ) อดีตเจ้าอาวาสวัดศรีเทพประดิษฐาราม จังหวัดนครพนม เมื่อปี พ.ศ. 2500

หลวงปู่จันทร์ เป็นพระมหาเถระสายธรรมยุตผู้ทรงอภิญญาและเป็นที่เคารพสักการะสูงสุดแห่งลุ่มแม่น้ำโขง พระสมเด็จรุ่นนี้จัดสร้างจากมวลสารอันศักดิ์สิทธิ์ยิ่ง ได้แก่ ผงพุทธคุณ ผงอิทธิเจ ผงปัทมัง ว่าน 108 ชนิด น้ำมันตั้งอิ๊ว และที่สำคัญคือผสมผงแตกหักของพระสมเด็จบางขุนพรหมกรุเก่าที่ได้รับมอบมาจากการเปิดกรุปี พ.ศ. 2500

พระเครื่องของหลวงปู่จันทร์ขึ้นชื่อลือชาในภาคอีสานว่ามีพุทธคุณด้านเมตตามหานิยมสูงสุด จนได้รับสมญานามว่า "พระสมเด็จแห่งลุ่มน้ำโขง"

พุทธคุณโดดเด่น:
• เมตตามหานิยมและมหาเสน่ห์: เจรจาการงานราบรื่น ผู้ใหญ่รักใคร่เอ็นดู เป็นที่เมตตาของคนรอบข้าง
• โชคลาภและหน้าที่การงาน: หนุนดวงการงาน เลื่อนขั้นเลื่อนตำแหน่ง ค้าขายรุ่งเรือง
• แคล้วคลาดปลอดภัย: คุ้มครองปกป้องจากภยันตราย อุบัติเหตุ และสิ่งอัปมงคลทั้งปวง`,
    description: `Vintage Phra Somdej Three-Tier Lion Base (Phim Than Singh Sam Chan) amulet, consecrated in B.E. 2500 (1957) by Phra Thep Sitthachan (Luang Pu Jan Khemasiri), the venerated abbot of Wat Sri Thep Pradittharam, Nakhon Phanom Province.

Luang Pu Jan was one of the most revered Dhammayuttika meditation masters along the Mekong River basin. This historic batch was pressed from sacred Buddhist holy powders, 108 auspicious herbs, and crucially enriched with authentic pulverized fragments of antique Phra Somdej Bang Khun Phrom amulets obtained from the famous B.E. 2500 crypt opening in Bangkok.

Celebrated across Northeastern Thailand as the "Phra Somdej of the Mekong," Luang Pu Jan's sacred powders are treasured for extraordinary compassion and protective grace.

Core Spiritual Virtues:
• Supreme Loving-Kindness (Metta Maha Niyom): Cultivates harmony, warm reception in business negotiations, and loyal support from superiors.
• Career Elevation & Prosperity: Propels steady career progression, commercial luck, and stable income.
• Miraculous Road & Life Safety: Shields the wearer from travel accidents, sudden mishaps, and negative influences.`,
    description_zh: `泰国东北部湄公河流域一代禅修宗师——那空拍侬府瓦西贴寺（Wat Sri Thep）龙普詹（Luang Pu Jan Khemasiri）于佛历2500年（1957年）亲手督造之三层狮座崇迪佛牌。

龙普詹大师在泰东北与老挝边境享有崇高声望，被誉为“湄公河圣僧”。本期崇迪圣料极为殊胜，除采用大师亲制五大经粉、百种吉祥草药及传统桐油压模外，更特别融入曼谷瓦曼坤碰寺佛历2500年正式开塔出土的古老崇迪佛牌碎粉。

在泰东北藏家圈中，龙普詹大师的佛历2500年崇迪素有“湄公河崇迪之王”的美誉。

核心功效：
• 至尊人缘与贵人相助：强化个人亲和力与信赖感，极利商务洽谈、人际沟通与长辈提携。
• 事业升迁与财运稳健：助职场步步高升，经商买卖顺遂安稳。
• 避险护身与出入平安：全方位抵御突发意外、灾厄与不良煞气。`
  },
  {
    id: 1815,
    name_th: "พระสมเด็จ พิมพ์จัมโบ้ หลังยันต์ หลวงพ่อทองอยู่ วัดใหม่หนองพะอง สมุทรสาคร ปี 2519",
    name: "Phra Somdej Jumbo Mold Sacred Yantra Luang Pho Thong-yu Wat Mai Nong Pha-ong B.E. 2519",
    name_zh: "龙仔厝府瓦迈农帕翁寺龙婆通玉佛历2519年大模背后经文崇迪佛牌",
    slug: "phra-somdej-jumbo-yant-luang-pho-thong-yu-wat-mai-nong-pha-ong-2519",
    category: "พระสมเด็จ",
    short: "Jumbo-sized Phra Somdej with embossed yantra reverse, consecrated in B.E. 2519 by Luang Pho Thong-yu, Wat Mai Nong Pha-ong, close peer of Luang Pu Toh.",
    description_th: `พระสมเด็จ พิมพ์จัมโบ้ หลังยันต์ จัดสร้างและปลุกเสกโดย หลวงพ่อทองอยู่ จันทสิริ (พระครูสุวรรณศีลาจารย์) แห่งวัดใหม่หนองพะอง อำเภอกระทุ่มแบน จังหวัดสมุทรสาคร เมื่อปี พ.ศ. 2519

หลวงพ่อทองอยู่ เป็นยอดพระเกจิอาจารย์ผู้ทรงอภิญญาแห่งลุ่มน้ำท่าจีน และเป็นสหธรรมิกคนสนิทของ หลวงปู่โต๊ะ วัดประดู่ฉิมพลี ซึ่งหลวงปู่โต๊ะเคยกล่าวยกย่องว่าหลวงพ่อทองอยู่มีพลังจิตกล้าแข็งและเชี่ยวชาญในการลบผงวิเศษทั้ง 5 ประการ (ผงปถมัง, ผงอิทธิเจ, ผงมหาราช, ผงพุทธคุณ, ผงตรีนิสิงเห)

องค์นี้เป็นพิมพ์จัมโบ้ขนาดใหญ่สง่างาม เนื้อผงพุทธคุณเข้มข้นแน่นแกร่ง ด้านหลังประทับยันต์ประจำตัวของหลวงพ่อทองอยู่ไว้อย่างคมชัด

พุทธคุณโดดเด่น:
• เมตตามหานิยมและมหาลาภ: ผงมหาราชและผงอิทธิเจเด่นด้านเมตตา ค้าขาย เรียกลูกค้า และมีผู้ใหญ่อุปถัมภ์
• อำนาจบารมีและเสริมดวง: พิมพ์จัมโบ้เสริมบารมีผู้นำ ความมั่นคง และความก้าวหน้าในหน้าที่การงาน
• แคล้วคลาดและคงกระพัน: คุ้มครองจากภยันตราย อุบัติเหตุ และขจัดสิ่งชั่วร้าย`,
    description: `Impressive Jumbo-mold Phra Somdej featuring an embossed sacred yantra on the reverse, consecrated in B.E. 2519 (1976) by Luang Pho Thong-yu Chandasiri of Wat Mai Nong Pha-ong, Krathum Baen District, Samut Sakhon Province.

Luang Pho Thong-yu was a revered master of the Tha Chin River basin and a close spiritual confidant of the legendary Luang Pu Toh of Wat Pradu Chimphli. Luang Pu Toh famously praised Luang Pho Thong-yu's extraordinary meditative concentration and mastery of inscribing and erasing the five sacred Buddhist chalk powders (Putthakhun, Itthije, Pattamang, Maharaj, and Tri Nisinghe).

Crafted in a bold, commanding Jumbo proportion with rich aged sacred powder and a crisp signature yantra seal on the reverse.

Core Spiritual Virtues:
• Magnetic Metta & Commercial Luck: Infused with Maharaj and Itthije sacred powders to draw loyal clientele, smooth deals, and foster goodwill.
• Executive Presence & Stability: The grand Jumbo silhouette amplifies leadership authority and career stability.
• Protective Shielding: Guards against physical accidents, rivals, and dark energies.`,
    description_zh: `龙仔厝府瓦迈农帕翁寺（Wat Mai Nong Pha-ong）一代神僧龙婆通玉（Luang Pho Thong-yu）于佛历2519年（1976年）亲手督造之大模（Jumbo）背后符印崇迪佛牌。

龙婆通玉大师是近代必打王龙普多（瓦巴鲁清批寺）生前最敬重的至交同修挚友，龙普多曾多次公开赞叹龙婆通玉禅定修为深厚，精通古法五种神圣经粉（巴塔芒、伊提杰、玛哈拉、普塔昆、三尼星河）之书写研磨秘法。

此尊为霸气庄严的大模法相，圣粉质地醇厚坚实，背面压印大师标志性护身符印，清晰立体。

核心功效：
• 顶级人缘与招财旺市：融合玛哈拉与伊提杰圣粉，助经商客源不断、洽谈顺遂、贵人赏识。
• 权威气场与事业稳固：大模造型彰显领袖风范，稳固职场地位与基业。
• 避险护身与辟邪消煞：强力抵御意外凶险与不良气场干扰。`
  },
  {
    id: 1816,
    name_th: "รูปหล่อลอยองค์ องค์พ่อจตุคามรามเทพ รุ่นเจ้าสัว วัดคอหงษ์ สงขลา ปี 2548",
    name: "Jatukam Ramathep Chao Sua 3D Statuette Wat Kho Hong Songkhla B.E. 2548",
    name_zh: "宋卡府合艾瓦考红寺佛历2548年“巨富”（Chao Sua）泽度金天神立体小立尊",
    slug: "jatukam-ramathep-chao-sua-statuette-wat-kho-hong-songkhla-2548",
    category: "รูปหล่อ",
    short: "3D cast statuette of Jatukam Ramathep 'Chao Sua' (Tycoon) Edition B.E. 2548, Wat Kho Hong, Songkhla. Consecrated for wealth and destiny elevation.",
    description_th: `รูปหล่อลอยองค์ องค์พ่อจตุคามรามเทพ รุ่น "เจ้าสัว" จัดสร้างและประกอบพิธีพุทธาภิเษก-เทวาภิเษก ณ วัดคอหงษ์ อำเภอหาดใหญ่ จังหวัดสงขลา เมื่อปี พ.ศ. 2548

เป็นยุคต้นของกระแสความศรัทธาองค์พ่อจตุคามรามเทพที่สร้างอย่างพิถีพิถันและถูกต้องตามพิธีกรรมโบราณของสายใต้ หล่อเป็นรูปองค์พ่อจตุคามรามเทพทรงเครื่องกษัตริย์ศรีวิชัยเต็มยศ ประทับนั่งอย่างสง่างามในลักษณะลอยองค์สามมิติ

รุ่น "เจ้าสัว" มีวัตถุประสงค์มงคลเพื่อส่งเสริมความมั่งคั่งร่ำรวย โชคลาภ และการพลิกดวงชะตาให้เป็นเศรษฐีมหาเศรษฐี ผ่านพิธีปลุกเสกโดยพระเกจิอาจารย์สายใต้และสายเขาอ้ออย่างเข้มขลัง

พุทธคุณโดดเด่น:
• เจ้าสัวมั่งคั่งและโชคลาภ: หนุนดวงการเงิน ดึงดูดทรัพย์สินเงินทอง ธุรกิจการค้าเจริญเติบโตแบบก้าวกระโดด
• พลิกดวงชะตาและขอได้ไหว้รับ: บารมีองค์พ่อจตุคามรามเทพช่วยแก้ไขอุปสรรค พลิกชีวิตจากร้ายกลายเป็นดี
• อำนาจบารมีและคุ้มครองภัย: ป้องกันภูติผีปีศาจ อาถรรพ์ และแคล้วคลาดปลอดภัย`,
    description: `Exquisite 3D cast miniature statuette (Rup Lor Loi Ong) of Ong Pho Jatukam Ramathep, the revered "Chao Sua" (Tycoon of Fortune) Edition, consecrated in B.E. 2548 (2005) at Wat Kho Hong, Hat Yai, Songkhla Province.

Crafted during the prime golden era of Southern Thai Jatukam Ramathep veneration, following strict ancient Srivijaya royal iconography and traditional devabhiseka consecration rites. The statuette depicts Jatukam Ramathep enthroned in full regal armor with sharp, dignified three-dimensional detail.

Consecrated by esteemed Southern and Khao Or lineage masters to channel "Chao Sua" tycoon abundance, rapid business growth, and karmic turnaround.

Core Spiritual Virtues:
• Tycoon Prosperity (Chao Sua Blessing): Catalyzes financial expansion, profitable investments, and steady commercial wealth.
• Destiny Turnaround & Wish Fulfillment: Renowned for breaking through stubborn career plateaus and turning adversity into triumph.
• Sovereign Guardian Shield: Wards off negative energies, spiritual malice, and travel hazards.`,
    description_zh: `泰南宋卡府合艾名刹瓦考红寺（Wat Kho Hong）于佛历2548年（2005年）隆重督造之“巨富”（Chao Sua）泽度金天神立体小立尊。

此尊诞生于泽度金天神信仰鼎盛初期，严格遵循泰南室利佛逝王朝古法皇室仪轨铸造与开光。法相采用三维立体浇铸，天神身披战甲端坐宝座，细节锐利立体、威仪赫赫。

“巨富”版本汇聚泰南及考奥法脉高僧共同加持，专主扭转低谷命运、广聚四方财富。

核心功效：
• 巨商富豪级招财运：助力正财偏财双丰收，推动商业扩张与投资获利。
• 有求必应与逆转运势：破除事业瓶颈与霉运阻滞，实现绝处逢生。
• 天神威严护体：强力驱邪挡煞，化解同行竞争暗算，保出行平安。`
  },
  {
    id: 1817,
    name_th: "หุ่นพยนต์มงคลเก้า พิมพ์จิ๋ว อาจารย์ประสูติ วัดในเตา ตรัง ปี 2552",
    name: "Hun Payon Mongkol Kao Mini Talisman Ajahn Prasut Wat Nai Tao B.E. 2552",
    name_zh: "董里府瓦乃陶寺阿赞帕素佛历2552年迷你版“九吉”灵偶魂魄勇护法冠兰",
    slug: "hun-payon-mongkol-9-mini-ajahn-prasut-wat-nai-tao-2552",
    category: "เครื่องราง",
    short: "Authentic Hun Payon Mongkol Kao (Nine Blessings) mini effigy B.E. 2552 by Ajahn Prasut, Wat Nai Tao, Trang (Khao Or lineage). Spiritual bodyguard talisman.",
    description_th: `หุ่นพยนต์ "มงคลเก้า" พิมพ์จิ๋ว จัดสร้างและปลุกเสกโดย พระอาจารย์ประสูติ ปิยธมฺโม แห่งวัดในเตา (วัดถ้ำพระพุทธโกษีย์) อำเภอห้วยยอด จังหวัดตรัง เมื่อปี พ.ศ. 2552

อาจารย์ประสูติ เป็นยอดพระเกจิอาจารย์สายตักศิลาเขาอ้อที่ได้รับการยอมรับอย่างสูงในยุคปัจจุบัน โดยเฉพาะวิชา "หุ่นพยนต์" ซึ่งท่านสืบทอดสายตรงมาอย่างเข้มขลัง หุ่นพยนต์รุ่นมงคลเก้านี้สร้างด้วยโลหะชนวนอาถรรพ์และผูกเสกเรียกอาการ 32 ให้มีพลังดุจองครักษ์พิทักษ์กาย

ขนาดจิ๋วกะทัดรัดพกพาง่าย นิยมใช้พกติดตัวหรือแขวนหน้ารถ เสมือนมีผู้พิทักษ์คอยระวังภัย เตือนภัย และเฝ้าทรัพย์สินตลอดเวลา

พุทธคุณโดดเด่น:
• องครักษ์พิทักษ์กายและเฝ้าทรัพย์: ป้องกันภัยอันตราย อุบัติเหตุ โจรผู้ร้าย และคอยดูแลทรัพย์สินบ้านเรือนร้านค้า
• กันคุณไสยและวิญญาณร้าย: ปัดเป่ามนต์ดำ ลมเพลมพัด อาถรรพ์ และสิ่งชั่วร้ายไม่ให้เข้าใกล้ตัว
• โชคลาภและค้าขาย: เสริมเมตตา เรียกลูกค้าเข้าร้าน และช่วยคุ้มครองการเดินทาง`,
    description: `Authentic Hun Payon "Mongkol Kao" (Nine Auspicious Protections) miniature talisman, consecrated in B.E. 2552 (2009) by Phra Ajahn Prasut Piyadhammo of Wat Nai Tao (Wat Tham Phra Phutthakosai), Trang Province.

Ajahn Prasut is widely celebrated as one of the foremost contemporary masters of the ancient Southern Khao Or esoteric academy, particularly renowned for his authentic Hun Payon (spiritual guardian effigy) consecrations. Cast from sacred alchemical alloys and empowered through classical ritual invocation to serve as a loyal spiritual bodyguard.

Compact and discreet for effortless daily carry or vehicle protection, guarding the bearer and their property continuously.

Core Spiritual Virtues:
• Tireless Spiritual Bodyguard: Protects against physical harm, accidents, theft, and safeguards home or shop assets.
• Witchcraft & Spirit Defense: Repels black magic, ill wishes, envious jealousy, and malevolent entities.
• Business Guard & Travel Luck: Attracts trustworthy customers and ensures safe journeys by road or air.`,
    description_zh: `泰南董里府瓦乃陶寺（Wat Nai Tao）当代考奥法脉顶尖大师阿赞帕素（Ajahn Prasut）于佛历2552年（2009年）亲手加持之迷你版“九吉”（Mongkol Kao）魂魄勇护法灵偶。

阿赞帕素大师深得泰南考奥古寺秘传法本真髓，尤以督造“魂魄勇”（替身护法灵偶）闻名全泰与新马藏家界。此尊采用神圣古法熔炼金属铸造，经严格古法开光赋予灵力，宛如随身隐形保镖。

造型精巧便携，适合随身佩戴或置于车内，时刻替主人挡灾警戒、看守财物。

核心功效：
• 贴身护法与看守财库：忠心护主，防范盗窃、小人暗算及居家商铺财物损失。
• 破除降头与阻绝阴邪：强力反弹黑法巫术、邪灵侵扰与不良煞气。
• 护航商途与出入平安：庇佑行车旅途安全，助生意客源稳固。`
  },
  {
    id: 1818,
    name_th: "พระพุทธชินราช วัดควนวิเศษ ตรัง ปี 2506 พิธีใหญ่ เสกพิธีเดียวกับหลวงปู่ทวด ปี 06",
    name: "Phra Buddha Chinnarat Wat Khuan Wiset Trang B.E. 2506 Grand Ceremony Ajahn Tim",
    name_zh: "董里府瓦宽威色寺佛历2506年成功佛（与同寺2506龙普托同场盛大开光，阿赞添加持）",
    slug: "phra-buddha-chinnarat-wat-khuan-wiset-trang-2506-ajahn-tim",
    category: "พระผง",
    short: "Historic Phra Buddha Chinnarat B.E. 2506, Wat Khuan Wiset, Trang. Consecrated in the same grand ceremony as the famous 2506 Luang Pu Tuad by Ajahn Tim.",
    description_th: `พระพุทธชินราช เนื้อผงว่านผสมดินกากยายักษ์ วัดควนวิเศษ อำเภอเมือง จังหวัดตรัง จัดสร้างขึ้นเมื่อปี พ.ศ. 2506 ซึ่งเป็นพิธีมหาพุทธาภิเษกครั้งยิ่งใหญ่ในประวัติศาสตร์จังหวัดตรัง โดยปลุกเสกในวาระและพิธีเดียวกันกับ "พระหลวงปู่ทวด วัดควนวิเศษ ปี 2506" อันโด่งดัง

มวลสารจัดสร้างสุดเข้มขลัง ได้รับมอบมวลสารว่านยา 108 ชนิด และดินกากยายักษ์จากวัดช้างให้ จังหวัดปัตตานี โดยมี พระอาจารย์ทิม วัดช้างให้ เดินทางมาเป็นเจ้าพิธีและร่วมปลุกเสกด้วยตนเอง พร้อมด้วยสุดยอดพระเกจิอาจารย์แดนใต้ยุคนั้น อาทิ พ่อท่านคล้าย วัดสวนขัน, พ่อท่านเส้ง วัดแหลมทราย, พ่อท่านแสง วัดคลองน้ำเจ็ด และคณาจารย์สายเขาอ้อ

จัดเป็นพระดีปีลึกที่สร้างพร้อมหลวงปู่ทวด วัดควนวิเศษ 06 พุทธคุณเสมอเหมือนใช้หลวงปู่ทวดวัดช้างให้ในราคาย่อมเยา

พุทธคุณโดดเด่น:
• แคล้วคลาดนิรันตราย: พุทธคุณสายวัดช้างให้ คุ้มครองการเดินทาง อุบัติเหตุ และภยันตรายทั้งปวง
• ความสำเร็จและบารมี: บารมีพระพุทธชินราชส่งเสริมความสำเร็จในหน้าที่การงาน การเรียน และธุรกิจ
• เมตตามหานิยมและโชคลาภ: เสริมสิริมงคล ครอบครัวร่มเย็นเป็นสุข และการเงินคล่องตัว`,
    description: `Historic Phra Buddha Chinnarat sacred herbal powder amulet, consecrated in B.E. 2506 (1963) at Wat Khuan Wiset, Trang Province—in the exact same monumental consecration ceremony as the celebrated Luang Pu Tuad Wat Khuan Wiset B.E. 2506 edition.

Crafted with authentic 108 medicinal wahn herbs and sacred Din Kak Ya Yak black mineral soil donated directly from Wat Chang Hai, Pattani. The grand ritual was led by Phra Ajahn Tim of Wat Chang Hai alongside top Southern masters including Por Than Klai (Wat Suan Khan), Por Than Seng (Wat Laem Sai), Por Than Saeng (Wat Khlong Nam Jet), and venerable Khao Or masters.

A treasured vintage B.E. 2506 collectible carrying the authentic Wat Chang Hai consecration lineage at an accessible value.

Core Spiritual Virtues:
• Wat Chang Hai Peril Shielding: Proven protection for highway travel, aviation safety, and escaping dangerous situations.
• Victory & Accomplishment: The majestic Phra Buddha Chinnarat blesses academic breakthroughs, career achievements, and business success.
• Peace & Abundance: Cultivates household harmony, public goodwill, and smooth finances.`,
    description_zh: `泰南董里府瓦宽威色寺（Wat Khuan Wiset）于佛历2506年（1963年）督造之古法草药圣粉成功佛（Phra Buddha Chinnarat）。

此尊极为珍贵之处在于：它是在佛历2506年泰南盛大法会中，与全泰闻名的“瓦宽威色寺2506年龙普托”同坛同步开光加持！制作圣料由北大年府瓦沧海寺直接赠予，包含108种神圣草药与正统黑色灵土（Din Kak Ya Yak）。

法会由瓦沧海寺阿赞添大师亲自主坛，汇聚金口圣僧婆谭凯、瓦兰赛寺婆谭盛及考奥名门高僧联袂加持，拥有最纯正的2506瓦沧海法脉血统。

核心功效：
• 瓦沧海正统避险护航：承接2506年龙普托同坛加持力，强力庇佑出行平安、化解意外凶险。
• 事业学业圆满成功：成功佛法相助达成工作目标、金榜题名与商业突破。
• 吉祥人缘与合家安康：增进贵人好感，护佑家庭和睦、财源顺遂。`
  },
  {
    id: 1819,
    name_th: "พระกริ่งพุทธมัณฑเล วัดคันลัด พระประแดง สมุทรปราการ ปี 2518 เนื้อนวะโลหะ อุดกริ่ง กล่องเดิม หลวงปู่โต๊ะ เป็นประธานเสก",
    name: "Phra Kring Phuttha Manthale Wat Khan Lat B.E. 2518 Luang Pu Toh Nawa Loha Original Box",
    name_zh: "北榄府瓦坎拉寺佛历2518年九宝铜佛陀曼他勒药师铃铛佛（龙普多主法开光，带原盒）",
    slug: "phra-kring-phuttha-manthale-wat-khan-lat-2518-luang-pu-toh-nawa-loha",
    category: "พระกริ่ง",
    short: "Rare Nawa Loha Phra Kring Phuttha Manthale B.E. 2518, Wat Khan Lat. Consecration presided over by Luang Pu Toh, with ringing rattle and original box.",
    description_th: `พระกริ่งพุทธมัณฑเล จัดสร้างขึ้น ณ วัดคันลัด อำเภอพระประแดง จังหวัดสมุทรปราการ เมื่อปี พ.ศ. 2518 เพื่อเป็นที่ระลึกในงานบุญสำคัญของวัด

องค์พระเททองหล่อด้วยเนื้อนวะโลหะแก่ทองคำและชนวนศักดิ์สิทธิ์ ผิวพรรณกลับดำเงางามตามธรรมชาติ ใต้ฐานอุดกริ่งเสียงดังกังวานไพเราะ สภาพสวยสมบูรณ์เดิมๆ พร้อมกล่องเดิมจากวัด

ความพิเศษสูงสุดของพระกริ่งรุ่นนี้คือ ได้รับเมตตาจาก พระราชสังวราภิมณฑ์ (หลวงปู่โต๊ะ อินฺทสุวณฺโณ) วัดประดู่ฉิมพลี เป็นประธานฝ่ายสงฆ์ในการจุดเทียนชัยและนั่งปรกอธิษฐานจิตปลุกเสกอย่างเข้มขลัง ร่วมกับพระเกจิอาจารย์ชื่อดังในเขตสมุทรปราการและภาคกลาง

พุทธคุณโดดเด่น:
• โชคลาภและเมตตามหานิยม: บารมีหลวงปู่โต๊ะ วัดประดู่ฉิมพลี เสริมโชคลาภ การค้าขาย ปลดหนี้สิน และความรุ่งเรือง
• ปราศจากโรคภัยและอายุยืน: พุทธคุณสายพระไภษัชยคุรุ ช่วยปัดเป่าโรคภัยไข้เจ็บและเสริมสุขภาพพลานามัย
• แคล้วคลาดปลอดภัย: คุ้มครองป้องกันภัยพิบัติ อุบัติเหตุ และสิ่งอัปมงคลทั้งปวง`,
    description: `Rare Phra Kring Phuttha Manthale amulet, consecrated in B.E. 2518 (1975) at Wat Khan Lat, Phra Pradaeng District, Samut Prakan Province.

Cast in rich antique Nawa Loha (nine-sacred-metal alloy) displaying a deep, lustrous aged patina. Fitted with an internal metallic rattle (Ud Kring) that produces a crisp, resonant chime, and preserved in mint condition with its original temple presentation box.

The highlight of this historic release is that the grand consecration ceremony was personally presided over by the supreme master Luang Pu Toh Inthasuwanno of Wat Pradu Chimphli, alongside renowned masters of Samut Prakan and Central Thailand.

Core Spiritual Virtues:
• Luang Pu Toh Fortune & Metta: Channels Luang Pu Toh's legendary grace for steady cash flow, commercial success, and loyal patronage.
• Bhaisajyaguru Health & Longevity: Promotes physical vitality, relief from ailments, and peaceful inner balance.
• Comprehensive Peril Protection: Shields against accidents, hazards, and negative energies.`,
    description_zh: `北榄府帕巴登县瓦坎拉寺（Wat Khan Lat）于佛历2518年（1975年）督造之九宝铜“佛陀曼他勒”药师铃铛佛。

采用传统九宝铜（Nawa Loha）融合珍贵老圣铜熔铸，氧化包浆深沉温润，底部封入响珠（Ud Kring），摇动时清脆悦耳，并完整保留当年原庙出寺盒，品相极佳。

本尊最殊胜之处在于：恭请近代全泰公认修为至高之瓦巴鲁清批寺“必打王”龙普多大师（Luang Pu Toh）亲任法会主席，主持点蜡开光并入定加持，联合多位中部名僧共同圆满。

核心功效：
• 龙普多至尊招财与人缘：承接龙普多大师慈悲法力，旺财运、助经商成交与化解债务危机。
• 药师佛健康祛病：护佑身心康泰、远离疾厄与精力充沛。
• 避险护身保平安：抵御一切突发意外与负面煞气。`
  },
  {
    id: 1820,
    name_th: "เหรียญพระพุทธชินราช หลังอกเลา วัดพระศรีรัตนมหาธาตุ พิษณุโลก ปี 2495",
    name: "Phra Buddha Chinnarat Ok Lao Reverse Medallion Wat Mahathat Phitsanulok B.E. 2495",
    name_zh: "彭世洛府瓦帕西拉达纳玛哈泰大皇寺佛历2495年正面成功佛背面门栓神符铜币",
    slug: "phra-buddha-chinnarat-ok-lao-coin-wat-mahathat-phitsanulok-2495",
    category: "เหรียญพระพุทธ",
    short: "Classic vintage B.E. 2495 Phra Buddha Chinnarat medallion with sacred Ok Lao reverse from Wat Mahathat, Phitsanulok. Renowned for victory & protection.",
    description_th: `เหรียญพระพุทธชินราช หลังอกเลาวิหารพระพุทธชินราช วัดพระศรีรัตนมหาธาตุวรมหาวิหาร (วัดใหญ่) จังหวัดพิษณุโลก จัดสร้างขึ้นเมื่อปี พ.ศ. 2495

ด้านหน้าจำลององค์พระพุทธชินราช พระพุทธรูปที่ได้ชื่อว่างดงามที่สุดในแผ่นดินสยาม ประทับในซุ้มเรือนแก้วอย่างวิจิตร ด้านหลังประทับรูป "อกเลา" บานประตูวิหารพระพุทธชินราช อันเป็นสัญลักษณ์ศักดิ์สิทธิ์คู่เมืองพิษณุโลกมาช้านาน ซึ่งมีคติความเชื่อว่าอกเลาสามารถปิดกั้นภัยอันตรายและสิ่งชั่วร้ายทั้งปวงไม่ให้กล้ำกราย

เป็นเหรียญเก่าปีลึกที่มีอายุกว่า 70 ปี ผ่านพิธีพุทธาภิเษกใหญ่ ณ พระวิหารหลวงพ่อพระพุทธชินราช วัดใหญ่ พิษณุโลก สภาพคลาสสิกเข้มขลัง

พุทธคุณโดดเด่น:
• แคล้วคลาดและปิดกั้นภัยอันตราย: ยันต์อกเลาวิหารศักดิ์สิทธิ์ช่วยปิดกั้นอุบัติเหตุ อาวุธ ภัยร้าย และคุณไสยมนต์ดำ
• ความสำเร็จและชัยชนะ: บารมีพระพุทธชินราชช่วยส่งเสริมความสำเร็จในหน้าที่การงาน การสอบ และธุรกิจการค้า
• อำนาจบารมีและสิริมงคล: เสริมสง่าราศี เป็นที่เคารพยำเกรง และคุ้มครองครอบครัวให้อยู่เย็นเป็นสุข`,
    description: `Classic vintage Phra Buddha Chinnarat medallion featuring the revered "Ok Lao" (sacred temple door-bolt emblem) on the reverse, minted in B.E. 2495 (1952) at Wat Phra Si Rattana Mahathat (Wat Yai), Phitsanulok Province.

The obverse portrays Phra Buddha Chinnarat—widely acclaimed as the most majestic Buddha image in Siam—framed within his iconic ornamental flame arch (Sum Ruen Kaew). The reverse bears the historic Ok Lao emblem of the main sanctuary doors, traditionally revered as a spiritual lock that seals out danger, evil spirits, and misfortune.

Over 70 years old and consecrated in a grand ceremony inside the sacred Phra Buddha Chinnarat sanctuary, this vintage medallion is treasured by seasoned collectors.

Core Spiritual Virtues:
• Ok Lao Protective Seal: Locks out physical danger, road mishaps, theft, and negative spiritual influences.
• Success & Triumph: Phra Buddha Chinnarat's supreme grace fosters academic triumph, career breakthroughs, and prosperous commerce.
• Dignity & Peace: Bestows honorable stature and protects the household with calm stability.`,
    description_zh: `泰国彭世洛府第一皇家圣寺瓦帕西拉达纳玛哈泰大皇寺（成功佛本寺）于佛历2495年（1952年）铸造之经典古董成功佛铜币。

正面铸有被公认为泰国最庄严绝美的“成功佛”（Phra Buddha Chinnarat）本尊圣相；背面则是彭世洛成功佛大殿大门标志性的“门栓神符”（Ok Lao）。在泰国传统信仰中，大殿门栓象征着一道坚不可摧的神圣封印，能将一切凶险、邪魔与厄运牢牢锁在门外。

历经七十余载岁月沉淀，于大皇寺成功佛正殿隆重开光，品相古朴厚重，极具历史收藏价值。

核心功效：
• 神圣门栓封印挡灾：强力阻隔血光意外、盗贼侵害与一切阴邪煞气近身。
• 功成名就与顺遂达愿：成功佛无上佛光助事业突破、考运亨通与目标圆满。
• 尊贵威望与合家安泰：增进个人威信，护佑全家平顺安康。`
  },
  {
    id: 1821,
    name_th: "พระกริ่งคู่ชีวิต รุ่นหนึ่งในแผ่นดิน หลวงปู่หมุน วัดบ้านจาน หลวงปู่ละมัย ร่วมปลุกเสก ปี 2541",
    name: "Phra Kring Khu Chiwit Nueng Nai Phaendin Luang Pu Mun Luang Pu Lamai B.E. 2541",
    name_zh: "四色菊府瓦班赞寺龙普满与龙普拉迈联合开光佛历2541年“天下第一”伴生药师铃铛佛",
    slug: "phra-kring-khu-chiwit-nueng-nai-phaendin-luang-pu-mun-luang-pu-lamai-2541",
    category: "พระกริ่ง",
    short: "Coveted Phra Kring Khu Chiwit 'Nueng Nai Phaendin' B.E. 2541 consecrated by centenarian saints Luang Pu Mun (Wat Ban Jan) and Luang Pu Lamai.",
    description_th: `พระกริ่งคู่ชีวิต รุ่น "หนึ่งในแผ่นดิน" จัดสร้างและประกอบพิธีมหาพุทธาภิเษกเมื่อปี พ.ศ. 2541 โดยมีสุดยอดพระอริยสงฆ์ผู้มีอายุยืนเกินศตวรรษและทรงอภิญญาเหนือโลก ได้แก่ หลวงปู่หมุน ฐิตสีโล แห่งวัดบ้านจาน จังหวัดศรีสะเกษ และ หลวงปู่ละมัย ฐิตมโน แห่งสวนสมุนไพรเพชรบูรณ์ ร่วมอธิษฐานจิตปลุกเสกอย่างเข้มขลัง

ชื่อ "พระกริ่งคู่ชีวิต" และ "รุ่นหนึ่งในแผ่นดิน" สื่อถึงความเป็นสุดยอดวัตถุมงคลที่จะอยู่คู่กายคุ้มครองชีวิตและหนุนดวงชะตาผู้บูชาไปตลอดชีวิต หล่อหลอมด้วยชนวนโลหะศักดิ์สิทธิ์ตามตำรับโบราณ บรรจุเม็ดกริ่งเสียงกังวาน

พระเครื่องสายหลวงปู่หมุน วัดบ้านจาน และหลวงปู่ละมัย ได้รับความนิยมสูงมากในระดับสากล เนื่องจากมีประสบการณ์ปาฏิหาริย์ด้านโชคลาภ การพลิกดวงชะตา และการคุ้มครองป้องกันภัยอย่างน่าอัศจรรย์

พุทธคุณโดดเด่น:
• หนุนดวงชะตาคู่ชีวิต: เสริมพลังชีวิตไม่ให้ตกต่ำ พลิกดวงชะตาให้รุ่งเรือง สมปรารถนาในสิ่งที่ตั้งใจ
• โชคลาภและมั่งคั่ง: พุทธคุณสายหลวงปู่หมุนเด่นเรื่องการเงิน โชคลาภ ค้าขาย และโอกาสทางธุรกิจ
• ป้องกันโรคภัยและนิรันตราย: บารมีพระไภษัชยคุรุและสองพระอริยสงฆ์ คุ้มครองให้ปลอดภัยจากอันตรายและโรคภัยทั้งปวง`,
    description: `Highly coveted Phra Kring Khu Chiwit amulet, "Roon Nueng Nai Phaendin" (One in the Kingdom Edition), consecrated in B.E. 2541 (1998) by two legendary centenarian masters revered for transcendent spiritual attainments: Luang Pu Mun Thitasilo of Wat Ban Jan (Sisaket) and Luang Pu Lamai Thitamanoh of Phetchabun.

Named "Khu Chiwit" (Lifelong Companion) to signify a supreme sacred heirloom meant to guard and elevate the wearer's destiny throughout their entire life. Cast from ancient sacred metal alloys containing an internal ringing rattle (Kring).

Amulets blessed by Luang Pu Mun and Luang Pu Lamai are fiercely sought after by international collectors for extraordinary real-world miracles in fortune breakthroughs, health, and protection.

Core Spiritual Virtues:
• Lifelong Destiny Elevation: Sustains upward karmic momentum, prevents steep setbacks, and catalyzes cherished aspirations.
• Miraculous Wealth & Opportunity: Channels Luang Pu Mun's renowned blessing for financial breakthroughs, booming commerce, and windfall luck.
• Healing & Sovereign Protection: Combines Bhaisajyaguru grace with the masters' longevity power to shield against illness and life-threatening perils.`,
    description_zh: `当代全泰最炙手可热之百岁圣僧名品：佛历2541年（1998年）由两大公认神通盖世之百岁高僧——四色菊府瓦班赞寺龙普满大师（Luang Pu Mun，享年109岁）与碧差汶府龙普拉迈大师（Luang Pu Lamai，享年百岁以上）联袂开光加持之“天下第一”伴生药师铃铛佛（Phra Kring Khu Chiwit）。

“Khu Chiwit”意为“伴随一生的护命圣物”。采用古法神圣老铜熔铸，内藏清脆药师灵珠。龙普满大师曾发宏愿护持众生离苦得乐，其佛历2541–2543年巅峰时期圣物因灵验神迹频传，在全泰与中港台新马藏家界备受推崇。

核心功效：
• 护命伴生与逆转命数：稳固一生运势不坠，助心想事成、突破人生重大瓶颈。
• 龙普满强力招财：催旺正财偏财与商机贵人，助财富持续跃升。
• 药师延寿与全方避险：借两大百岁圣僧长寿法力与药师佛威德，祛病延年、逢凶化吉。`
  },
  {
    id: 1822,
    name_th: "พระสมเด็จ ค่ายอดิสร สระบุรี ปี 2514 พิธีใหญ่ หลวงปู่ทิม วัดละหารไร่ เป็นประธานเสก",
    name: "Phra Somdej Khai Adison Saraburi B.E. 2514 Luang Pu Tim Wat Lahan Rai",
    name_zh: "北标府阿迪颂军营佛历2514年盛大法会崇迪佛牌（罗勇府龙普添主法开光）",
    slug: "phra-somdej-khai-adison-saraburi-2514-luang-pu-tim-wat-lahan-rai",
    category: "พระสมเด็จ",
    short: "Historic Phra Somdej Khai Adison B.E. 2514, Saraburi. Grand consecration led by Luang Pu Tim (Wat Lahan Rai), Luang Pho Kuay, Luang Pu Toh & 79 masters.",
    description_th: `พระสมเด็จ ค่ายอดิสร จังหวัดสระบุรี จัดสร้างขึ้นเมื่อปี พ.ศ. 2514 โดย พลตรี เปรม ติณสูลานนท์ (ผู้บัญชาการศูนย์การทหารม้า ค่ายอดิสร ในขณะนั้น) เพื่อแจกจ่ายเป็นขวัญกำลังใจแก่ทหารหาญและสมทบทุนสร้างโรงพยาบาล

มวลสารจัดสร้างสุดยิ่งใหญ่ รวบรวมผงพระสมเด็จกรุเก่า ผงพุทธคุณ และว่านมงคลจากทั่วประเทศ แล้วนำเข้าพิธีมหาพุทธาภิเษกครั้งประวัติศาสตร์ ณ ศูนย์การทหารม้า ค่ายอดิสร เมื่อวันที่ 16 มกราคม พ.ศ. 2514

ความพิเศษระดับตำนานคือ ได้อาราธนาสุดยอดพระเกจิอาจารย์ผู้ทรงอภิญญาทั่วแผ่นดินสยามรวม 79 รูป มานั่งปรกปลุกเสก อาทิ:
• หลวงปู่ทิม วัดละหารไร่ ระยอง (เป็นประธานจุดเทียนชัยและปลุกเสกตลอดพิธี)
• หลวงพ่อกวย วัดโฆสิตาราม ชัยนาท
• หลวงปู่โต๊ะ วัดประดู่ฉิมพลี กทม.
• หลวงพ่อเกษม เขมโก ลำปาง
• หลวงพ่อพรหม วัดช่องแค นครสวรรค์
• หลวงพ่อเงิน วัดดอนยายหอม นครปฐม
• หลวงพ่อแพ วัดพิกุลทอง สิงห์บุรี
• หลวงพ่อมุ่ย วัดดอนไร่ สุพรรณบุรี ฯลฯ

จัดเป็นพระสมเด็จปีลึกพิธีใหญ่ที่สุดรุ่นหนึ่งของวงการที่รวมสุดยอดพระเกจิอันดับ 1 ของเมืองไทยไว้อย่างครบถ้วน

พุทธคุณโดดเด่น:
• แคล้วคลาดและคงกระพันชาตรีอันดับ 1: สร้างแจกทหารกล้า คุ้มครองชีวิตจากอุบัติเหตุ อาวุธ และภยันตรายทั้งปวง
• เมตตามหานิยมและโชคลาภ: พุทธคุณสายหลวงปู่ทิม วัดละหารไร่ และหลวงพ่อกวย เสริมเสน่ห์ การงาน และการเงิน
• อำนาจบารมีและความสำเร็จ: หนุนดวงชะตาให้สูงส่ง ชนะอุปสรรค และก้าวหน้าในหน้าที่การงาน`,
    description: `Historic Phra Somdej Khai Adison amulet, consecrated in a monumental ceremony on January 16, B.E. 2514 (1971) at the Adison Cavalry Military Camp in Saraburi Province, commissioned under General Prem Tinsulanonda to bless brave soldiers and fund hospital construction.

Crafted with pulverized ancient Phra Somdej relics, sacred temple powders, and holy herbs gathered from across Thailand. This historic ceremony is legendary among collectors for gathering 79 of the greatest 20th-century Siamese masters into a single unified consecration, including:
- Luang Pu Tim, Wat Lahan Rai, Rayong (Chief presiding master who lit the victory candle)
- Luang Pho Kuay, Wat Kositaram, Chainat
- Luang Pu Toh, Wat Pradu Chimphli, Bangkok
- Luang Pho Kasem Khemako, Lampang
- Luang Pho Phrom, Wat Chong Kae, Nakhon Sawan
- Luang Pho Ngern, Wat Don Yai Hom, Nakhon Pathom
- Luang Pho Pae, Wat Pikul Thong, Singburi
- Luang Pho Mui, Wat Don Rai, Suphanburi

Widely hailed as one of the finest accessible B.E. 2514 vintage Phra Somdej editions touched directly by Luang Pu Tim of Wat Lahan Rai.

Core Spiritual Virtues:
• Battlefield Protection & Safety: Originally consecrated for frontline cavalry troops, offering steadfast shielding against accidents and physical danger.
• Luang Pu Tim & Luang Pho Kuay Grace: Fosters powerful charisma, career breakthroughs, and steady wealth flow.
• Authority & Victory: Overcomes rivals and supports upward professional advancement.`,
    description_zh: `全泰佛历2514年（1971年）最具传奇色彩的大型军方盛典圣物：北标府阿迪颂骑兵军营（Khai Adison）崇迪佛牌。由泰国前总理兼枢密院主席炳·廷素拉暖上将当年任骑兵司令时亲自发起督造，用以护佑前线将士并筹建医院。

汇聚全泰古老崇迪碎料、各地名刹经粉及圣草药压模制成，于佛历2514年1月16日举行震撼全泰之国级开光大典。

法会阵容堪称“全泰近代宗师梦之队”，恭请79位绝世高僧联合加持，包括：
- 罗勇府瓦拉汉莱寺“碰派古曼坤平宗师”龙普添（主坛点燃胜利圣烛并全程加持）
- 瓦库喜达兰寺龙婆贵
- 瓦巴鲁清批寺龙普多
- 南邦府高僧龙婆卡贤
- 瓦冲凯寺龙婆碰
- 瓦冬亚宏寺龙婆银
- 瓦匹坤通寺龙婆培
- 瓦冬莱寺龙婆梅等一代泰斗。

核心功效：
• 战神级避险与刀枪不入：专为军旅战士加持，强力抵御意外事故、凶险与突发危难。
• 龙普添与龙婆贵双圣招财人缘：极具魅力与招财磁场，助经商顺遂、贵人相助。
• 权威显赫与战无不胜：提升领导威信，克服竞争障碍，事业平步青云。`
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
