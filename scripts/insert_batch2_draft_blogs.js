const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const COPYRIGHT_HTML = `
<div class="copyright-notice" style="margin-top: 48px; padding: 24px; background: #0f172a; border-left: 4px solid #d4af37; border-radius: 8px; font-size: 13px; color: #94a3b8; line-height: 1.7;">
  <p style="color: #fff; font-weight: 700; font-size: 14px; margin-bottom: 8px;">
    © 2026 Dan Siam Amulets Heritage Research Archive. All Rights Reserved.
  </p>
  <p style="margin-bottom: 10px;">
    <strong>[TH] ข้อกำหนดลิขสิทธิ์:</strong> เนื้อหาบทความ งานวิจัยประวัติศาสตร์ งานแปลทั้ง 3 ภาษา และภาพถ่ายสตูดิโอความละเอียดสูงทุกภาพ เป็นทรัพย์สินทางปัญญาของ Dan Siam Amulets ได้รับการคุ้มครองตามพระราชบัญญัติลิขสิทธิ์ พ.ศ. ๒๕๓๗ อนุญาตให้อ้างอิงเพื่อการศึกษาหรือเผยแพร่เชิงวิชาการโดยต้องระบุแหล่งที่มาและใส่ Canonical Hyperlink กลับมายังบทความต้นฉบับอย่างสมบูรณ์ ห้ามคัดลอก ดัดแปลง หรือนำภาพถ่ายไปใช้ในเชิงพาณิชย์โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร
  </p>
  <p style="margin-bottom: 10px;">
    <strong>[EN] Academic Citation & Copyright Policy:</strong> All original essays, trilingual historical translations, and high-resolution studio photographs are protected intellectual property of Dan Siam Amulets. Non-commercial and scholarly citations are permitted strictly under the condition that full canonical URL attribution is credited to Dan Siam Amulets. Commercial scraping or unauthorized usage of studio imagery is strictly prohibited.
  </p>
  <p style="margin-bottom: 0;">
    <strong>[ZH] 版权与学术引用声明：</strong> 本文所有历史研究文献、三语翻译文本及高精度微距影像均为 Dan Siam Amulets 之知识产权。允许非商业性质的学术学习与学术引用，但必须完整保留出处并附带指向本站的原始网页链接。严禁任何未经授权的商业复制、翻印或挪用影像之行为。
  </p>
</div>
`;

const POSTS = [
  // ── 1. ARTICLE 3: Somdej Toh & Luang Pu Nak ────────────────────────────────
  {
    slug: 'somdej-toh-wat-rakang-luang-pu-nak-2495-chronicles',
    category: 'ประวัติศาสตร์พระเครื่อง',
    cover_image: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1779247507982-2vigmg00fag.jpg',
    published: false, // In Draft Queue

    title: 'Archaeology and Sacred Metaphysics: From Somdej Toh’s Wat Rakang Votive Tablets to Luang Pu Nak’s B.E. 2495 Preservation',
    title_th: 'คติโบราณคดีและมวลสารพุทธคุณ: จากพระสมเด็จวัดระฆังยุคสมเด็จพระพุฒาจารย์ (โต พรหมรังสี) สู่บันทึกการสืบสานของหลวงปู่นาค พ.ศ. ๒๔๙๕',
    title_zh: '崇迪佛的考古源流与经粉配伍：从阿赞多瓦拉康古佛到龙普纳佛历2495年经典重塑学术考',

    excerpt: 'An academic examination of the mid-19th century monastic reforms of King Rama IV, the five sacred metaphysical powders of Somdej Toh, and Luang Pu Nak’s historic B.E. 2495 Wat Rakang memorial edition.',
    excerpt_th: 'งานวิจัยประวัติศาสตร์เจาะลึกบริบทการปฏิรูปพระพุทธศาสนายุคพระบาทสมเด็จพระจอมเกล้าเจ้าอยู่หัว วิทยาการแห่งผงพุทธคุณทั้ง ๕ และบันทึกการรวบรวมชิ้นส่วนพระสมเด็จเก่าสู่การสถาปนาของหลวงปู่นาค ปี ๒๔๙๕',
    excerpt_zh: '深入考察拉玛四世宗教改革背景下阿赞多尊者五大圣粉督造体系，系统梳理瓦拉康寺龙普纳大师佛历2495年融合古老崇迪碎料重塑经典的文献史料。',

    content: `
<p>In the hierarchy of Thai Buddhist votive art, <strong>Phra Somdej</strong> holds the universally recognized title of <em>"The King of Amulets"</em>. Rather than emerging from esoteric folk superstition, its historical creation was inextricably bound to the spiritual, intellectual, and monastic reforms of Siam during the reign of <strong>King Mongkut (Rama IV, reigned 1851–1868 C.E.)</strong>.</p>

<h2>1. The Intellectual Context of King Rama IV’s Era and Somdej Toh</h2>
<p>Somdej Phra Buddhacharn (Toh Promrangsi) of Wat Rakang Kositaram (1788–1872 C.E.) was an intellectual peer of King Rama IV. During an era of Western colonial expansion and rapid modernization, Somdej Toh designed a votive tablet that was radically minimalist: a serene seated Buddha in the Dhyana/Maravijaya mudra upon a three-tiered dais, devoid of facial features, enclosed within a pure arched frame (Chum Ruean Kaew). In Buddhist aesthetics, this austerity symbolized <em>Anatta</em> (Non-Self) and the boundless purity of Nirvana.</p>

<h2>2. Metaphysics of the Five Sacred Powders (Phong Wiset 5 Prakarn)</h2>
<p>According to ancient Wat Rakang scribal scrolls, Somdej Toh’s compounding science was based on writing and erasing sacred Pali yantras on slate boards, accumulating five distinct spiritual powders:</p>
<ul>
  <li><strong>Phong Pathamang:</strong> Formulated for invulnerability, focus, and fundamental spiritual shielding.</li>
  <li><strong>Phong Itthije:</strong> Revered for cultivating boundless goodwill (Metta), magnetic attraction, and harmonious relationships.</li>
  <li><strong>Phong Maharaj:</strong> Infused for authority, status elevation, and executive leadership.</li>
  <li><strong>Phong Trinisinghe:</strong> Engineered to ward off malevolent terrestrial spirits and karmic turbulence.</li>
  <li><strong>Phong Buddhakhun:</strong> The supreme quintessence dedicated to the virtues of the historical Buddha.</li>
</ul>

<h2>3. Luang Pu Nak’s B.E. 2495 Preservation Project</h2>
<p>Following the passing of Somdej Toh, fragments of damaged 19th-century Somdej tablets were preserved within the temple repositories of Wat Rakang. In <strong>B.E. 2495 (1952)</strong>, <strong>Phra Thep Sitthinayok (Luang Pu Nak)</strong>, then Abbot of Wat Rakang, undertook a historic conservation project. Rather than letting sacred broken relics deteriorate, he systematically ground authentic broken antique Somdej Toh fragments and compounded them into new commemorative editions, notably the <strong>Pim Thaan Kha To (Table-Leg Pedestal Mould)</strong>.</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Certified Archival Specimen in Dan Siam Heritage Collection:</strong>
  <p style="margin: 0;">• <a href="/product/phra-somdej-thaan-kha-to-luang-pu-nak-wat-rakang-2495" style="color: #d4af37; text-decoration: underline;">Phra Somdej Thaan Kha To Luang Pu Nak Wat Rakang B.E. 2495 [REF: #49]</a> — Contains genuine crushed antique Somdej Toh powder.</p>
</div>
`,

    content_th: `
<p>ในทำเนียบพระเครื่องเบญจภาคีและประวัติศาสตร์ศิลป์รัตนโกสินทร์ <strong>“พระสมเด็จ”</strong> ได้รับการยกย่องให้เป็น <em>“ราชาแห่งพระเครื่อง”</em> จุดกำเนิดที่แท้จริงมิได้เกิดจากไสยศาสตร์พื้นบ้าน หากแต่มีความเชื่อมโยงอย่างลึกซึ้งกับการปฏิรูปพระพุทธศาสนาและภูมิปัญญาของสยามประเทศในรัชสมัย <strong>พระบาทสมเด็จพระจอมเกล้าเจ้าอยู่หัว (รัชกาลที่ ๔)</strong></p>

<h2>๑. บริบทประวัติศาสตร์ยุคปฏิรูปศาสนาและสมเด็จพระพุฒาจารย์ (โต พรหมรังสี)</h2>
<p><strong>สมเด็จพระพุฒาจารย์ (โต พรหมรังสี)</strong> แห่งวัดระฆังโฆสิตาราม (พ.ศ. ๒๓๓๑ – ๒๔๑๕) ดำรงตำแหน่งสมณศักดิ์ชั้นผู้ใหญ่ในยุคที่สยามเริ่มเปิดรับวิทยาการตะวันตก ท่านได้ออกแบบพระพุทธพิมพ์ที่มีเอกลักษณ์เรียบง่ายตัดทอนรายละเอียดฟุ่มเฟือย (Minimalist Sacred Art) โดยปรากฏเพียงพระพุทธรูปปางสมาธิประทับบนฐาน ๓ ชั้น ภายในซุ้มครอบแก้ว โดยไร้หน้าตา ลวดลายประดับ สื่อถึงสัจธรรมความว่างและความหลุดพ้นตามหลักอนัตตาธรรม</p>

<h2>๒. ศาสตร์แห่งผงพุทธคุณทั้ง ๕ ประการ (มวลสารพุทธคุณ)</h2>
<p>ตามบันทึกสมุดไทยโบราณของวัดระฆัง มวลสารหลักของพระสมเด็จเกิดจากการลบผงพระยันต์ศักดิ์สิทธิ์บนกระดานชนวน ๕ คัมภีร์:</p>
<ul>
  <li><strong>ผงปถมัง:</strong> มีพุทธคุณด้านแคล้วคลาด คงทน คุ้มครองป้องกันภัย</li>
  <li><strong>ผงอิทธิเจ:</strong> เด่นทางเมตตามหานิยม มหาเสน่ห์ เจรจาสมานไมตรี</li>
  <li><strong>ผงมหาราช:</strong> เสริมสง่าราศี มหาอำนาจ ความเจริญก้าวหน้าในยศศักดิ์</li>
  <li><strong>ผงตรีนิสิงเห:</strong> ป้องกันคุณไสย ปัดเป่าอวมงคล และปรับสมดุลธาตุ</li>
  <li><strong>ผงพุทธคุณ:</strong> ยอดผงแห่งพระพุทธบารมีครอบจักรวาล</li>
</ul>

<h2>๓. การสืบสานมวลสารของหลวงปู่นาค วัดระฆัง ปี พ.ศ. ๒๔๙๕</h2>
<p>เมื่อเข้าสู่ยุคหลังสงครามโลกครั้งที่ ๒ <strong>พระเทพสิทธินายก (หลวงปู่นาค โสภโณ)</strong> เจ้าอาวาสวัดระฆังโฆสิตาราม ได้รวบรวมชิ้นส่วนพระสมเด็จวัดระฆังกรุเก่าของสมเด็จโตที่แตกหักชำรุด นำมาบดละเอียดเป็นมวลสารตั้งต้นเพื่อสถาปนาพระสมเด็จรุ่นประวัติศาสตร์ในปี <strong>พ.ศ. ๒๔๙๕</strong> โดยเฉพาะ <strong>พิมพ์ฐานขาโต๊ะ</strong> ซึ่งเป็นพิมพ์ทรงสง่างามเปี่ยมด้วยความมั่นคงในหน้าที่การงาน</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ พระเครื่องอ้างอิงทางประวัติศาสตร์ในคลัง Dan Siam Heritage Archive:</strong>
  <p style="margin: 0;">• <a href="/product/phra-somdej-thaan-kha-to-luang-pu-nak-wat-rakang-2495" style="color: #d4af37; text-decoration: underline;">พระสมเด็จฐานขาโต๊ะ หลวงปู่นาค วัดระฆัง ปี ๒๔๙๕ (REF: #49)</a> — ชิ้นเอกมวลสารผงเก่าสมเด็จโตแท้ผสมเข้มข้น</p>
</div>
`,

    content_zh: `
<p>在泰国南传佛教艺术中，<strong>“崇迪佛”（Phra Somdej）</strong>被公认为至高无上的<em>“佛牌之王”</em>。其历史源流深植于暹罗<strong>拉玛四世国王（King Mongkut，公元1851–1868年在位）</strong>时代的佛教教义改革与学术思潮之中。</p>

<h2>一、拉玛四世时代的理性思潮与阿赞多大师之创制</h2>
<p>瓦拉康寺<strong>颂德帕布达赞·多·蓬朗西（阿赞多尊者，1788–1872年）</strong>是泰国家喻户晓的圣僧。在大师所处的时代，面对西方文明的冲击，大师开创性地设计了一种极简主义佛陀造像：无面部五官雕饰、端坐于三层法座之上、外环琉璃殿檐拱券。在佛教造像美学中，此一极简造型深寓“诸行无常、诸法无我”的解脱至理。</p>

<h2>二、五大古老神圣经粉（Phong Wiset）之配伍学</h2>
<p>依据瓦拉康贝叶经抄本记载，崇迪佛的核心材质是由阿赞多大师在石板上手书并擦拭五大经文积聚而成：巴塔芒粉（御险庇佑）、伊提皆粉（慈悲人缘）、玛哈拉粉（权威晋升）、德里尼星合粉（清净避邪）以及佛陀功德粉（佛智圆满）。</p>

<h2>三、龙普纳大师于佛历2495年对阿赞多古老碎料之传承</h2>
<p>二战之后，瓦拉康寺住持<strong>龙普纳大师（Luang Pu Nak）</strong>系统性搜集了寺内封存的阿赞多崇迪破碎古老经粉，于<strong>佛历2495年（公元1952年）</strong>督造了享誉收藏界的经典名作，特别是<strong>“桌腿座崇迪”（Pim Thaan Kha To）</strong>，成为现代藏家瞻仰阿赞多古经粉法脉的珍贵载体。</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Dan Siam 典藏永久馆藏历史标本：</strong>
  <p style="margin: 0;">• <a href="/product/phra-somdej-thaan-kha-to-luang-pu-nak-wat-rakang-2495" style="color: #d4af37; text-decoration: underline;">瓦拉康寺 龙普纳 佛历2495年 桌腿座崇迪佛 [REF: #49]</a> — 蕴含阿赞多正统古老经粉碎料之稀世经典。</p>
</div>
`
  },

  // ── 2. ARTICLE 4: Phra Pidta & Maha-Kaccayana ──────────────────────────────
  {
    slug: 'phra-pidta-maha-kaccayana-sensory-restraint-theology',
    category: 'ประวัติศาสตร์พระเครื่อง',
    cover_image: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1792210074374-o3wovt5ldx8.webp',
    published: false,

    title: 'From Maha-Kaccayana to Phra Pidta: The Theology of Sensory Restraint, Nirodha-Samapatti, and Thai Meditative Iconography',
    title_th: 'พระภควัมบดีสู่พระปิดตา: คติธรรมนิโรธสมาบัติ การสำรวมอินทรีย์ และวิวัฒนาการพุทธศิลป์ปิดทวารในสยามประเทศ',
    title_zh: '善加财尊者到必打佛的演变：感官息止、灭尽定与暹罗内观禅修法相的艺术学诠释',

    excerpt: 'A theological investigation into the transformation of the canonical Indian Buddhist Arhat Maha-Kaccayana into the Thai closed-eye Phra Pidta posture, examining sensory restraint and meditative absorption.',
    excerpt_th: 'การศึกษาเชิงเทววิทยาและประวัติศาสตร์ศิลปะจากพระมหากัจจายนะเถระในพุทธกาล สู่วิวัฒนาการพระภควัมบดีและพระปิดตาในสยาม วิเคราะห์ปรัชญาการปิดทวารทั้ง ๙ เพื่อความหลุดพ้น',
    excerpt_zh: '从上座部佛典中摩诃迦旃延尊者行传出发，学术考证泰国闭眼遮面必打佛造像学演变，深入阐述“关闭九窍”之感官克制哲学与内观禅修智慧。',

    content: `
<p>The iconic silhouette of <strong>Phra Pidta</strong> (literally <em>"the monk covering his eyes or orifices"</em>) represents one of the most intellectually misunderstood sacred forms in Thai Buddhism. Rather than an occult charm for physical obstruction, Phra Pidta is a profound embodiment of <strong>Nirodha-Samapatti (Meditative Cessation of Sensations)</strong> and complete sensory restraint (Indriya-Samvara).</p>

<h2>1. Canonical Origins: The Great Disciple Maha-Kaccayana</h2>
<p>In Theravada Buddhist scripture, Phra Pidta traces its doctrinal origin to **Venerable Maha-Kaccayana (Phra Sangkachai)**, the foremost disciple praised by Gautama Buddha for analyzing concise discourses in extensive detail. Possessing exceptional physical beauty that distracted lay devotees, the Arhat used meditative concentration to transform his outer form into a humble, rotund elder, reminding all practitioners that external appearances are transient illusions.</p>

<h2>2. The Philosophy of Closing the Nine Bodily Portals</h2>
<p>In classical Thai sculptural esotericism, the posture of covering the face symbolizes closing the nine sensory gates (eyes, ears, nostrils, mouth, lower orifices) to sever external mental defilements (Kilesa). In an era of non-stop digital noise and cognitive distraction, meditating upon Phra Pidta represents reclaiming inner clarity, cognitive sovereignty, and psychological serenity.</p>

<h2>3. Numismatic Evolution in Siam</h2>
<p>From the ancient metal alloys of the Southern Khao Or lineage to the clay and sacred lacquer formulations of the Rattanakosin period, master consecrations—such as those of Luang Pu Moon of Wat Ban Jan—emphasized that true protection comes from an unshakeable mind rooted in moral virtue.</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Certified Archival Specimen in Dan Siam Heritage Collection:</strong>
  <p style="margin: 0;">• <a href="/product/phra-ngop-nam-oi-lp-moon-wat-ban-jan-2545" style="color: #d4af37; text-decoration: underline;">Phra Ngop Nam Oi / Sacred Wheel Amulet Luang Pu Moon Wat Ban Jan B.E. 2545 [REF: #1738]</a> — Circular wheel of protective Dhamma.</p>
</div>
`,

    content_th: `
<p>พุทธลักษณะอันเป็นเอกลักษณ์ของ <strong>“พระปิดตา”</strong> หรือ <strong>“พระภควัมบดี”</strong> ถือเป็นหนึ่งในประติมากรรมพุทธศิลป์ที่ลึกซึ้งที่สุดในสยามประเทศ ปรัชญาแท้จริงมิใช่ไสยศาสตร์เพื่อความคงกระพันชาตรี หากแต่เป็นรูปธรรมแห่ง **“การสำรวมอินทรีย์และการเจริญนิโรธสมาบัติ”**</p>

<h2>๑. คติพุทธประวัติ: พระมหากัจจายนะเถระผู้ทรงปัญญา</h2>
<p>ตามคัมภีร์พระไตรปิฎก พระภควัมบดีสืบเค้าเงื่อนมาจาก **พระมหากัจจายนะ** พระอสีติมหาสาวกผู้ได้รับยกย่องจากพระบรมศาสดาว่าเป็นเอตทัคคะในทางอธิบายธรรมะที่ย่อให้พิสดาร ด้วยความที่ท่านมีรูปกายงดงามดั่งทองคำจนเป็นเหตุให้เกิดความเข้าใจผิดแก่กุลบุตร ท่านจึงได้อธิษฐานจิตเนรมิตกายให้อ้วนท้วมสมบูรณ์ เพื่อเตือนสติมิให้ผู้คนยึดติดในรูปกายภายนอก</p>

<h2>๒. ปรัชญาแห่งการ "ปิดทวารทั้ง ๙"</h2>
<p>ในเชิงสัญญะวิทยา การยกพระหัตถ์ขึ้นปิดพระพักตร์และทวารต่างๆ หมายถึงการปิดกั้นอารมณ์ภายนอก (รูป เสียง กลิ่น รส โผฏฐัพพะ ธัมมารมณ์) มิให้เข้ามารบกวนจิตใจ ในยุคปัจจุบันที่ข้อมูลข่าวสารท่วมท้น การอาราธนาพระปิดตาจึงเป็นอนุสติเตือนใจให้มีสติสงบระงับ เกิดสมาธิในการคิดอ่านและบริหารธุรกิจอย่างสุขุมรอบคอบ</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ พระเครื่องอ้างอิงทางประวัติศาสตร์ในคลัง Dan Siam Heritage Archive:</strong>
  <p style="margin: 0;">• <a href="/product/phra-ngop-nam-oi-lp-moon-wat-ban-jan-2545" style="color: #d4af37; text-decoration: underline;">พระงบน้ำอ้อย หลวงปู่หมุน วัดบ้านจาน ปี ๒๕๔๕ (REF: #1738)</a> — ธรรมจักรพุทธคุณ ๑๐ ทิศ คุ้มครองรอบด้าน</p>
</div>
`,

    content_zh: `
<p>在泰国南传佛教造像学中，<strong>“必打佛”（Phra Pidta，即闭眼佛或遮面佛）</strong>是极具哲学深度的艺术典范。其真正旨归绝非民俗巫术，而是佛教修行中**“根律仪戒”（感官息止）**与**“灭尽定”**的具象化再现。</p>

<h2>一、经典源流：摩诃迦旃延尊者之行传</h2>
<p>佛典载，佛陀十大弟子之一**摩诃迦旃延（Maha-Kaccayana）**，被世尊赞为“善解经义第一”。因尊者法相圆满如金佛，常招致凡俗非议，尊者遂以深沉禅定力将自身法相化为宽厚圆满之形，以此示现外相虚妄不实之正见。</p>

<h2>二、闭塞九窍的禅观智慧</h2>
<p>双掌遮面以至闭塞九窍之法相，象征彻底隔绝眼、耳、鼻、舌、身、意对外界六尘的攀缘。在信息爆炸的当代社会，必打佛启迪信众守护自心正念，在商道决策与人生风浪中保持宁静深沉之定力。</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Dan Siam 典藏永久馆藏历史标本：</strong>
  <p style="margin: 0;">• <a href="/product/phra-ngop-nam-oi-lp-moon-wat-ban-jan-2545" style="color: #d4af37; text-decoration: underline;">龙婆满 瓦班赞寺 佛历2545年 轮相佛 [REF: #1738]</a> — 象征十方佛陀光明周流庇护。</p>
</div>
`
  },

  // ── 3. ARTICLE 5: Thao Wessuwan & Vaisravana ────────────────────────────────
  {
    slug: 'thao-wessuwan-vaisravana-guardian-northern-quarter',
    category: 'ประวัติศาสตร์พระเครื่อง',
    cover_image: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1784517401989-ew4h11qoozk.webp',
    published: false,

    title: 'From Kubera to Vaisravana: Guardianship of the Northern Quarter, the Atanatiya Sutta, and Thai Yaksha Iconography',
    title_th: 'ท้าวกุเวรสู่ท้าวเวสสุวรรณ: คติพุทธบาลแห่งทิศอุดร คัมภีร์อาฏานาฏิยสูตร และประติมานวิทยาในอารามหลวงสยาม',
    title_zh: '从俱毗罗到多闻天王（陶威素湾）：北方法界护持者、《阿吒曩胝雅经》与暹罗皇家造像学考',

    excerpt: 'An epigraphical and iconographical analysis of Vaisravana (Thao Wessuwan) in the Digha Nikaya Pali Canon, tracing royal Thai Yaksha temple guardians from Sukhothai to Rattanakosin.',
    excerpt_th: 'งานวิจัยทางประติมานวิทยาและคัมภีร์พระพุทธศาสนา ย้อนรอยท้าวเวสสุวรรณในอาฏานาฏิยสูตร พระสุตตันตปิฎก สู่วิวัฒนาการยักษ์ทวารบาลแห่งสยามประเทศ',
    excerpt_zh: '学术考据《长部·阿吒曩胝雅经》中多闻天王之宗教功能，系统解析从素可泰到曼谷王朝皇家寺院药叉门神造像的渊源及现代护法信仰。',

    content: `
<p>Across Thai royal temples, the monumental figure of <strong>Thao Wessuwan (Vaisravana / Kubera)</strong> leaning upon his club commands universal reverence. In Buddhist scriptural orthodoxy, Thao Wessuwan is not a demon of wrath, but the paramount Sovereign of the Northern Celestial Quarter within the <strong>Catumaharajika (Realm of the Four Heavenly Kings)</strong> and a supreme guardian of the Triple Gem.</p>

<h2>1. Scriptural Foundation in the Atanatiya Sutta</h2>
<p>In the *Digha Nikaya* of the Pali Canon, the **Atanatiya Sutta** recounts how Thao Wessuwan led the Four Great Kings to visit Gautama Buddha on Vulture Peak (Gijjhakuta). Recognizing that pure ascetics in remote wildernesses were vulnerable to malevolent non-human spirits, Thao Wessuwan formally offered the Atanatiya protective discourse to safeguard monks, nuns, and lay devotees devoted to righteous Dhamma practice.</p>

<h2>2. Transition from Indian Kubera to Siamese Yaksha Art</h2>
<p>While ancient Vedic iconography depicted Kubera as a wealth-deva with a mongoose or jewel-bag, Southeast Asian Buddhist art integrated him as the supreme commander of Yakshas. In Sukhothai, Ayutthaya, and the Grand Palace of Bangkok, royal artisans sculpted Thao Wessuwan with ornate armor and a downward-pointing mace, symbolizing absolute authority over negative karmic forces and chaotic planetary influences.</p>

<h2>3. Ethical Dimensions of Wealth and Protection</h2>
<p>Canonical texts emphasize that Thao Wessuwan blesses individuals endowed with honesty, filial piety, and ethical trade. As guardian of the subterranean earth treasures, wealth in his domain is granted only as a fruit of moral uprightness.</p>
`,

    content_th: `
<p>ในสถาปัตยกรรมพระอารามหลวงสยาม ภาพลักษณ์ของ <strong>“ท้าวเวสสุวรรณ”</strong> ยืนตระหง่านกุมกระบองเฝ้าซุ้มประตู เป็นที่เคารพยำเกรงของพุทธศาสนิกชน ในมิติแห่งพระไตรปิฎก ท่านมิใช่อสูรผู้โหดร้าย หากแต่เป็น <strong>“มหาราชผู้ทรงธรรมแห่งสวรรค์ชั้นจาตุมหาราชิกา”</strong> ผู้ถวายอภิบาลแก่พระบรมศาสดา</p>

<h2>๑. คัมภีร์อาฏานาฏิยสูตร: จุดกำเนิดพุทธมนต์แห่งการคุ้มครอง</h2>
<p>ตามบันทึกในพระสุตตันตปิฎก ทีฆนิกาย ปาฏิกวรรค ท้าวเวสสุวรรณได้นำจ้าวมหาราชทั้ง ๔ เสด็จเข้าเฝ้าสมเด็จพระสัมมาสัมพุทธเจ้า ณ เขาคิชฌกูฏ และได้กราบทูลถวายมนต์ **“อาฏานาฏิยปริตร”** เพื่อมอบเป็นเกราะกำบังแก่พระภิกษุสงฆ์และอุบาสกอุบาสิกาผู้ประพฤติธรรมในป่าเขาให้พ้นจากการรบกวนของอมนุษย์</p>

<h2>๒. ประติมานวิทยายักษ์ทวารบาลแห่งสยาม</h2>
<p>จากท้าวกุเวรในศิลปะอินเดียโบราณ สู่ศิลปะสุโขทัย อยุธยา และรัตนโกสินทร์ ช่างหลวงสยามได้รังสรรค์พุทธศิลป์ท้าวเวสสุวรรณในเครื่องทรงนักรบขัตติยราช สะท้อนถึงมหาอำนาจในการสยบสิ่งอัปมงคล และเป็นสัญลักษณ์แห่งความซื่อสัตย์สุจริต</p>
`,

    content_zh: `
<p>在泰国皇家寺院山门之前，手持宝棒巍然屹立的<strong>陶威素湾（多闻天王 / Vaisravana）</strong>法相庄严。在正统佛教三藏中，天王非民间臆想之恶煞，而是四大天王之首、北方夜叉部族领袖与正法坚毅的护持大圣。</p>

<h2>一、《阿吒曩胝雅经》的教义渊源</h2>
<p>南传巴利三藏《长部》记载，多闻天王率天众前往灵鹫山礼见释迦牟尼佛，亲奉《阿吒曩胝雅经》护卫法门，以护佑在深山旷野间精进禅修之行者免受非人侵害。</p>

<h2>二、造像学演进与道德财神之真义</h2>
<p>天王不仅为破除一切业障恶兆之尊，更兼领大地伏藏。正统佛法强调：天王所赐之财，唯归于孝顺父母、持戒清净、正命经商之人。</p>
`
  },

  // ── 4. ARTICLE 6: Hariphunchai Phra Rod ────────────────────────────────────
  {
    slug: '1200-years-hariphunchai-terracotta-phra-rod-history',
    category: 'ประวัติศาสตร์พระเครื่อง',
    cover_image: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/m-1781275232135-m61r4aadwr.webp',
    published: false,

    title: '1,200 Years of Hariphunchai Terracotta: Queen Jamadevi’s Inscriptions, Ancient Clay Metallurgy, and Phra Rod Antiquities',
    title_th: 'อารยธรรมดินเผาหริภุญชัย ๑,๒๐๐ ปี: จารึกพระนางจามเทวี ศาสตร์แห่งเนื้อดินกรุโบราณ สู่พุทธศิลป์พระรอดเมืองลำพูน',
    title_zh: '一千二百年哈利奔猜陶土文明：乔玛德维女王碑铭考、古窖泥质演化与帕洛佛艺术史',

    excerpt: 'An archaeological investigation of 8th-century Dvaravati-Mon votive clay art in Lamphun, tracing the lineage from Queen Jamadevi’s foundations to mid-20th century commemorative castings.',
    excerpt_th: 'การขุดค้นทางประวัติศาสตร์และโบราณคดีอาณาจักรหริภุญชัย พุทธศตวรรษที่ ๑๓ วิเคราะห์เนื้อดินเผาโบราณวัดมหาวัน สู่ตำนานพระรอดจงอางศึก ปี ๒๕๑๔',
    excerpt_zh: '学术考据公元8世纪堕罗钵底泰北哈利奔猜古国造像技术，系统探寻瓦玛哈弯寺陶土古窖微观结构与佛历2514年战地佛牌重铸之历史文献。',

    content: `
<p>Dating back to the 8th century C.E., the ancient kingdom of **Hariphunchai** (modern-day Lamphun, Northern Thailand) flourished as a sophisticated center of Dvaravati-Mon Buddhist civilization under the stewardship of **Queen Jamadevi**. Among its archaeological legacies, **Phra Rod** of Wat Mahawan stands as the ancient progenitor within the prestigious Grand Five (Benjapakee) circle.</p>

<h2>1. Archaeological Excavations of Wat Mahawan</h2>
<p>Archaeological evidence confirms that Wat Mahawan was founded around 1,200 years ago as the western cardinal protector temple of Hariphunchai. The original votive clay tablets were hand-pressed from refined river silt rich in silica and iron oxides, subjected to ancient wood-firing kilns that vitrified the clay into a stone-like ceramic durability.</p>

<h2>2. Symbolic Geometry: The Seated Diamond Victor</h2>
<p>Depicted in the Maravijaya posture beneath a stylized Bodhi leaf canopy, the compact, diamond-proportioned geometry symbolized unwavering fortitude against cosmic trials. In 20th-century history, this ancient form was revived during periods of conflict, notably the **B.E. 2514 Phra Rod Jong Aang Suk** consecration blessed to protect border defense volunteers.</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Certified Archival Specimen in Dan Siam Heritage Collection:</strong>
  <p style="margin: 0;">• <a href="/product/phra-rod-jong-aang-suk-2514" style="color: #d4af37; text-decoration: underline;">Phra Rod Jong Aang Suk B.E. 2514 (Consecrated by Luang Pu Tuad Masters) [REF: #91]</a></p>
</div>
`,

    content_th: `
<p>ย้อนหลังไปในพุทธศตวรรษที่ ๑๓ อาณาจักร <strong>“หริภุญชัย”</strong> (จังหวัดลำพูนในปัจจุบัน) ได้รุ่งเรืองขึ้นในฐานะศูนย์กลางอารยธรรมมอญ-ทวารวดี ภายใต้การนำของ <strong>พระนางจามเทวี</strong> ปฐมกษัตรีย์ผู้ทรงเปี่ยมด้วยพระปรีชาญาณ ในบรรดามรดกทางโบราณคดี **“พระรอด วัดมหาวัน”** ถือเป็นพระเครื่องที่มีอายุเก่าแก่ที่สุดในชุดเบญจภาคีของสยาม</p>

<h2>๑. โบราณคดีวัดมหาวันและศาสตร์แห่งเนื้อดินเผาโบราณ</h2>
<p>หลักฐานทางประวัติศาสตร์ระบุว่า วัดมหาวันสถาปนาขึ้นเพื่อเป็นพุทธอารามพิทักษ์ทิศประจิมของเมืองหริภุญชัย เนื้อหามวลสารของพระรอดกรุโบราณเกิดจากการคัดสรรเนื้อดินร่วนละเอียด ผสมแร่เหล็กและซิลิกาธรรมชาติ ผ่านกรรมวิธีเผาด้วยเตาฟืนโบราณจนแกร่งดั่งหินผา</p>

<h2>๒. การสืบสานสู่พระรอดกึ่งพุทธกาล (พระรอดจงอางศึก ปี ๒๕๑๔)</h2>
<p>ความเข้มขลังแห่งพุทธศิลป์ปางมารวิชัยชนะมาร ได้ถูกนำมาจำลองสถาปนาอีกครั้งในยุคสงครามอินโดจีน โดยเฉพาะ **พระรอดจงอางศึก ปี พ.ศ. ๒๕๑๔** ซึ่งสร้างขึ้นเพื่อมอบเป็นขวัญกำลังใจแก่ทหารหาญผู้ปฏิบัติภารกิจเพื่อชาติ</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ พระเครื่องอ้างอิงทางประวัติศาสตร์ในคลัง Dan Siam Heritage Archive:</strong>
  <p style="margin: 0;">• <a href="/product/phra-rod-jong-aang-suk-2514" style="color: #d4af37; text-decoration: underline;">พระรอดจงอางศึก หลวงพ่อทวด ปี ๒๕๑๔ (REF: #91)</a> — พระรอดประวัติศาสตร์ยุคสงครามผสานบารมีหลวงพ่อทวด</p>
</div>
`,

    content_zh: `
<p>追溯至公元8世纪，泰国北部古代**哈利奔猜王国**在**乔玛德维女王**统理下，成为堕罗钵底佛教文明之重镇。其中出土于瓦玛哈弯寺的**帕洛佛（Phra Rod）**，不仅是泰国五大古佛（Benjapakee）中年代最久远之圣物，更是东南亚陶土考古学的无价标本。</p>

<h2>一、瓦玛哈弯寺考古发掘与陶土物性</h2>
<p>史载瓦玛哈弯寺建于一千二百年前，为守护王国西境之重镇。古牌选用富含天然二氧化硅与铁质的高岭细泥，经古代高温柴窑烧结，质地坚实凝结如石。</p>

<h2>二、金刚降魔相与佛历2514年战地名器传承</h2>
<p>帕洛佛结跏趺坐于菩提宝叶之下，象征克制一切逆境之坚固道心。此一古典造像在佛历2514年被复刻督造成**“军旅战地帕洛佛”（Jong Aang Suk）**，以庇佑守护边疆之将士。</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Dan Siam 典藏永久馆藏历史标本：</strong>
  <p style="margin: 0;">• <a href="/product/phra-rod-jong-aang-suk-2514" style="color: #d4af37; text-decoration: underline;">佛历2514年 军旅战地帕洛佛 [REF: #91]</a> — 融合千年哈利奔猜古法与龙婆托护佑之经典。</p>
</div>
`
  },

  // ── 5. ARTICLE 7: Guman Thong & Luang Pho Pin 2500 ─────────────────────────
  {
    slug: 'cultural-anthropology-guman-thong-luang-pho-pin-2500',
    category: 'ประวัติศาสตร์พระเครื่อง',
    cover_image: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1792209947883-6ozub0asej9.webp',
    published: false,

    title: 'Beyond Folklore to Cultural Anthropology: White-Magic Deva Guardianship and the Consecrations of Luang Pho Pin (B.E. 2500)',
    title_th: 'จากวรรณคดีสู่มานุษยวิทยาวัฒนธรรม: ศาสตร์แห่งเทวฤทธิ์ขาว คติความเชื่อเรื่องเทพพิทักษ์เรือน และบันทึกหลวงพ่อพิณ วัดอุบลฯ พ.ศ. ๒๕๐๐',
    title_zh: '超越民间传说的文化人类学解读：正统白法护宅神灵与瓦乌汶寺龙婆品佛历2500年古曼童文献通考',

    excerpt: 'An anthropological analysis deconstructing sensationalist occult myths surrounding Thai household devas (Guman Thong), examining monastic Vinaya boundaries and Luang Pho Pin’s B.E. 2500 consecrations.',
    excerpt_th: 'การศึกษาเชิงมานุษยวิทยาวัฒนธรรมจำแนกความแตกต่างระหว่างไสยดำกับวิชาพุทธาคมขาว วิเคราะห์คติเทพพิทักษ์เคหสถาน และบันทึกสายวิชาหลวงพ่อคงสู่หลวงพ่อพิณ ปี ๒๕๐๐',
    excerpt_zh: '从文化人类学视角剖析暹罗“守护神童”信仰的本质，厘清黑巫术流俗与正统僧伽白法加持之戒律界限，全面考订瓦乌汶寺龙婆品佛历2500年古曼童史实。',

    content: `
<p>In global popular culture, the Thai sacred artifact known as **Guman Thong** is frequently sensationalized through the lens of modern horror cinema. In cultural anthropology and religious sociology, however, authentic monastic Guman Thong consecrations represent an indigenous Theravada-animist syncretism of <strong>Household Tutelary Devas (protective domestic spirits)</strong> akin to the Roman *Lares* or ancient Chinese Household Hearth Gods.</p>

<h2>1. The Monastic Vinaya: White Magic vs. Dark Necromancy</h2>
<p>Authentic Buddhist monks bound by the 227 Patimokkha monastic precepts are strictly forbidden from engaging in destructive black magic. Monastic consecrations of Guman Thong represent "White Magic" (Phutthakhun): inviting wandering celestial spirits to accumulate merit by protecting households, assisting honest merchants, and receiving shared Buddhist merit (Pattidana) from the family.</p>

<h2>2. Luang Pho Pin of Wat Ubon and the B.E. 2500 Edition</h2>
<p>In Ratchaburi province, **Luang Pho Pin** of Wat Ubonwannaram, the chief monastic disciple of the legendary Luang Pho Khong (Wat Bang Kaphom), consecrated a historic edition in **B.E. 2500 (1957)**. Utilizing ancient earth formulas compounded with purifying temple herbs, this edition was preserved as a cultural benchmark of mid-century domestic prosperity talismans.</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Certified Archival Specimen in Dan Siam Heritage Collection:</strong>
  <p style="margin: 0;">• <a href="/product/guman-thong-din-chet-pacha-luang-pho-pin-wat-ubon-2500" style="color: #d4af37; text-decoration: underline;">Vintage Guman Thong Din 7 Pacha Luang Pho Pin Wat Ubon B.E. 2500 [REF: #1737]</a></p>
</div>
`,

    content_th: `
<p>ในวัฒนธรรมร่วมสมัยระดับสากล เครื่องรางที่เรียกขานว่า <strong>“กุมารทอง”</strong> มักถูกภาพยนตร์บิดเบือนให้กลายเป็นเรื่องราวสยองขวัญไสยดำ หากแต่ในทางมานุษยวิทยาวัฒนธรรม คติการสร้างกุมารทองของพระคณาจารย์ผู้ทรงศีล แท้จริงคือ **“คติเทวพิทักษ์เคหสถาน (Household Tutelary Deva)”** เช่นเดียวกับคติเทพเจ้าเตาไฟในวัฒนธรรมจีนโบราณ</p>

<h2>๑. พระธรรมวินัย: พุทธคุณขาวบริสุทธิ์ มิใช่อาคมมนต์ดำ</h2>
<p>พระภิกษุสงฆ์ผู้ถือสิกขาบท ๒๒๗ ข้อ ย่อมไม่ข้องเกี่ยวกับคุณไสยดำมืด การสถาปนากุมารทองตำรับโบราณแท้จริงเป็นการประสิทธิ์ประสาทพรด้วย “จิตตานุภาพขาว” (กุศลจิต) อัญเชิญจิตวิญญาณฝ่ายกุศลให้มาร่วมสร้างบารมี ช่วยเหลือการค้าขายสุจริต และร่วมอนุโมทนาส่วนบุญกุศล</p>

<h2>๒. บันทึกสายวิชาหลวงพ่อพิณ วัดอุบลวรรณาราม พ.ศ. ๒๕๐๐</h2>
<p>ณ จังหวัดราชบุรี **หลวงพ่อพิณ วัดอุบลวรรณาราม** ศิษย์เอกสายตรงของหลวงพ่อคง วัดบางกะพ้อม ได้จัดสร้างกุมารทองเนื้อดินผสมผงพุทธคุณในปี **พ.ศ. ๒๕๐๐** ถือเป็นชิ้นเอกทางมานุษยวิทยาวัตถุมงคลที่ทรงคุณค่าและหาชมได้ยากยิ่ง</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ พระเครื่องอ้างอิงทางประวัติศาสตร์ในคลัง Dan Siam Heritage Archive:</strong>
  <p style="margin: 0;">• <a href="/product/guman-thong-din-chet-pacha-luang-pho-pin-wat-ubon-2500" style="color: #d4af37; text-decoration: underline;">กุมารทอง หลวงพ่อพิณ วัดอุบลวรรณาราม ปี ๒๕๐๐ (REF: #1737)</a> — มรดกเครื่องรางโบราณยุคกึ่งพุทธกาล</p>
</div>
`,

    content_zh: `
<p>在当代流行文化中，泰国**“古曼童”（Guman Thong）**常被现代影视作品妖魔化。但在文化人类学与宗教社会学视域中，正统南传僧伽所督造的古曼童，其本质实为**“家宅守护福神”（Household Deva）**，如同罗马神话中的守护神（Lares）或中国民俗中的司命灶君。</p>

<h2>一、僧伽戒律：正统白法与黑巫术之严格厘清</h2>
<p>受持227条具足戒的清净比丘，严禁从事任何伤害性的阴邪咒术。寺院正统开光，实为以清净佛法善愿，引导灵性善神护持守法行商之居士，共同积累布施福慧之善业。</p>

<h2>二、瓦乌汶寺龙婆品大师与佛历2500年经典圣物</h2>
<p>在叻丕府，近代高僧**龙婆品大师（Luang Pho Pin）**作为一代宗师龙婆空（瓦邦卡蓬）之正宗传人，于**佛历2500年（1957年）**督造了享誉藏界的经典古曼童，成为战后东南亚商贾求取商业繁荣的文化见证。</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Dan Siam 典藏永久馆藏历史标本：</strong>
  <p style="margin: 0;">• <a href="/product/guman-thong-din-chet-pacha-luang-pho-pin-wat-ubon-2500" style="color: #d4af37; text-decoration: underline;">瓦乌汶寺 龙婆品 佛历2500年 圣泥古曼童 [REF: #1737]</a> — 半个世纪以来的家宅商业福德典范。</p>
</div>
`
  }
];

async function main() {
  console.log(`Starting insertion of ${POSTS.length} scholarly articles into Supabase draft queue...`);

  for (let i = 0; i < POSTS.length; i++) {
    const post = POSTS[i];
    const { data: existing } = await supabase.from('blog_posts').select('id').eq('slug', post.slug).single();

    if (existing) {
      const { data, error } = await supabase.from('blog_posts').update(post).eq('id', existing.id).select();
      if (error) console.error(`Error updating #${post.slug}:`, error.message);
      else console.log(`✓ [${i + 1}/${POSTS.length}] Updated #${existing.id} (${post.slug}) [Draft Queue]`);
    } else {
      const { data, error } = await supabase.from('blog_posts').insert(post).select();
      if (error) console.error(`Error inserting #${post.slug}:`, error.message);
      else console.log(`✓ [${i + 1}/${POSTS.length}] Inserted new #${data[0].id} (${post.slug}) [Draft Queue]`);
    }
  }

  console.log('\nAll 5 scholarly articles successfully saved into Supabase Draft Queue!');
}

main().catch(console.error);
