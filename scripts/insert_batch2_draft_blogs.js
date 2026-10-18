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
<p>Following the passing of Somdej Toh, fragments of damaged 19th-century Somdej tablets and sacred powders of his senior disciple, Somdej Phra Buddhacharn (M.C. That Seniwongse - Phra Pilan), were preserved within the repositories of Wat Rakang. In <strong>B.E. 2495 (1952)</strong>, <strong>Phra Ratcha Moli (Luang Pu Nak Sophano)</strong> — who served as acting abbot in 1924 and official abbot from 1925 to 1971, before being elevated to Phra Thep Sitthinayok in 1957 — undertook a historic conservation project. Rather than letting sacred broken relics deteriorate, he systematically pulverized authentic broken antique Somdej Toh fragments and compounded them into new commemorative editions, notably the revered <strong>Pim Thaan Kha To (Table-Leg / Lion Pedestal Mould)</strong>.</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Certified Archival Specimen in Dan Siam Heritage Collection:</strong>
  <p style="margin: 0;">• <a href="/product/phra-somdej-thaan-kha-to-luang-pu-nak-wat-rakang-2495" style="color: #d4af37; text-decoration: underline;">Phra Somdej Thaan Kha To Luang Pu Nak Wat Rakang B.E. 2495 [REF: #49]</a> — Contains genuine crushed antique Somdej Toh and Phra Pilan powder.</p>
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
<p>เมื่อเข้าสู่ยุคหลังสงครามโลกครั้งที่ ๒ <strong>พระราชโมลี (หลวงปู่นาค โสภโณ)</strong> — ผู้รักษาการเจ้าอาวาสเมื่อ พ.ศ. ๒๔๖๗ และดำรงตำแหน่งเจ้าอาวาสวัดระฆังโฆสิตารามอย่างเป็นทางการระหว่าง พ.ศ. ๒๔๖๘ – ๒๕๑๔ (ซึ่งต่อมาได้รับการสถาปนาสมณศักดิ์เป็น <em>พระเทพสิทธินายก</em> ในปี พ.ศ. ๒๕๐๐) — ได้รวบรวมชิ้นส่วนพระสมเด็จวัดระฆังกรุเก่าของสมเด็จโตที่แตกหักชำรุด พร้อมทั้งผงพระพุทธบาทปิลันทน์ (สมเด็จพระพุฒาจารย์ ม.จ.ทัด เสนีวงศ์) ที่ตกทอดในกุฏิเจ้าอาวาส นำมาบดละเอียดเป็นมวลสารตั้งต้นเพื่อสถาปนาพระสมเด็จรุ่นประวัติศาสตร์ในปี <strong>พ.ศ. ๒๔๙๕</strong> โดยเฉพาะ <strong>พิมพ์ฐานขาโต๊ะ</strong> ซึ่งเป็นพิมพ์ทรงสง่างามเปี่ยมด้วยความมั่นคงในหน้าที่การงาน</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ พระเครื่องอ้างอิงทางประวัติศาสตร์ในคลัง Dan Siam Heritage Archive:</strong>
  <p style="margin: 0;">• <a href="/product/phra-somdej-thaan-kha-to-luang-pu-nak-wat-rakang-2495" style="color: #d4af37; text-decoration: underline;">พระสมเด็จฐานขาโต๊ะ หลวงปู่นาค วัดระฆัง ปี ๒๔๙๕ (REF: #49)</a> — ชิ้นเอกมวลสารผงเก่าสมเด็จโตและผงพระปิลันทน์แท้ผสมเข้มข้น</p>
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
    excerpt_th: 'การศึกษาเชิงเทววิทยาและประวัติศาสตร์ศิลปะจากพระมหากัจจายนะและพระควัมปติ สู่วิวัฒนาการพระภควัมบดีและพระปิดตาในสยาม วิเคราะห์ปรัชญาการปิดทวารเพื่อความหลุดพ้นและรากศัพท์มหาอุตม์',
    excerpt_zh: '从上座部佛典中摩诃迦旃延尊者与迦梵波提尊者行传出发，学术考证泰国闭眼遮面必打佛造像学演变，深入阐述“关闭九窍”之感官克制哲学与内观禅修智慧。',

    content: `
<p>The iconic silhouette of <strong>Phra Pidta</strong> (literally <em>"the monk covering his eyes or bodily portals"</em>) represents one of the most intellectually misunderstood sacred forms in Thai Buddhism. Rather than an occult charm for physical invulnerability, Phra Pidta is a profound artistic embodiment of <strong>Indriya-Samvara (Sensory Restraint)</strong> and <strong>Nirodha-Samapatti (The Meditative Cessation of Sensations and Consciousness)</strong>.</p>

<h2>1. Canonical Origins: Maha-Kaccayana and Gavampati Syncretism</h2>
<p>In Theravada Buddhist scripture, this iconography synthesizes two prominent canonical figures:</p>
<ul>
  <li><strong>Venerable Maha-Kaccayana:</strong> Foremost among disciples in explaining concise teachings in depth. His original golden, radiant countenance caused confusion and worldly lust; hence, he entered deep dhyana to transform his appearance into a rotund, humble elder to break physical attachment.</li>
  <li><strong>Venerable Gavampati (Phra Bhagavampati):</strong> One of the four noble companions of Yasa who attained early Arahantship. In Mon-Siamese traditions, his name evolved into a symbol of spiritual dignity and meditative mastery.</li>
</ul>

<h2>2. The Philosophy of Closing the Portals: "Maha-Uttama" vs. Folk Occlusion</h2>
<p>In classical Thai esotericism, covering the two eyes (<em>Maha Lap</em>) or the nine bodily portals (<em>Maha-Ut</em>) is often misconstrued as physical obstruction of bullets. Ethno-linguistically, the term derives from the Pali <strong>"Maha-Uttama"</strong>, meaning <em>"Supreme Excellence / The Highest Spiritual Purity"</em>. Closing the external gates (eyes, ears, nostrils, mouth, lower orifices) represents severing sensory defilements (Kilesa) to cultivate unshakeable cognitive sovereignty.</p>

<h2>3. Numismatic Lineages of Siam: The Lacquered Powder Masters</h2>
<p>In central Siam, the pinnacle of Phra Pidta craftsmanship was achieved through sacred lacquered powder compounding (<em>Phong Khluk Rak</em>). Foremost among these traditions are <strong>Wat Saphan Sung, Nonthaburi</strong> (founded by Luang Pu Eiam, transmitted to Luang Pho Thong Suk) and the coastal masters of <strong>Wat Khruea Wan, Chonburi</strong> (Luang Pu Kaew), whose creations remain the gold standard of meditative numismatics.</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Certified Archival Specimens in Dan Siam Heritage Collection:</strong>
  <p style="margin: 0 0 8px 0;">• <a href="/product/phra-pid-ta-mae-krua-luang-pho-thong-suk-wat-saphan-sung" style="color: #d4af37; text-decoration: underline;">Phra Pid Ta Pim Mae Krua Luang Pho Thong Suk Wat Saphan Sung [REF: #173]</a> — Classic Solot Maha Mongkhon sacred powder immersed in antique natural lacquer.</p>
  <p style="margin: 0;">• <a href="/product/phra-pid-ta-plad-phan-wat-bo-so-chonburi-2503" style="color: #d4af37; text-decoration: underline;">Phra Pid Ta Plad Phan Wat Bo So B.E. 2503 with Luang Pu Kaew Powder [REF: #166]</a> — Authentic Chonburi black lacquered powder incorporating revered antique Luang Pu Kaew powder.</p>
</div>
`,

    content_th: `
<p>พุทธลักษณะอันเป็นเอกลักษณ์ของ <strong>“พระปิดตา”</strong> หรือ <strong>“พระภควัมบดี” (Bhagavampati)</strong> ถือเป็นหนึ่งในประติมากรรมพุทธศิลป์ที่ลึกซึ้งและมักถูกเข้าใจผิดมากที่สุดในสยามประเทศ ปรัชญาแท้จริงมิใช่ไสยเวทเพื่อความคงกระพันชาตรี หากแต่เป็นรูปธรรมแห่ง <strong>“การสำรวมอินทรีย์ (อินทรียสังวรศีล) และสภาวะนิโรธสมาบัติ”</strong></p>

<h2>๑. คติพุทธประวัติ: การหลอมรวมคติพระมหากัจจายนะและพระควัมปติ</h2>
<p>ตามหลักฐานในพระไตรปิฎก พระปิดตาในสยามเกิดจากการหลอมรวมทางวัฒนธรรม (Syncretism) ของพระอรหันต์ ๒ รูป:</p>
<ul>
  <li><strong>พระมหากัจจายนะเถระ:</strong> พระอสีติมหาสาวกผู้ได้รับยกย่องว่าเป็นเอตทัคคะในทางอธิบายธรรมะย่อให้พิสดาร ท่านมีรูปกายผุดผ่องดั่งทองคำคล้ายพระศาสดา จนเป็นเหตุให้เกิดกิเลสแก่ผู้พบเห็น ท่านจึงอธิษฐานจิตเนรมิตกายให้อ้วนท้วมเพื่อเตือนสติมิให้ยึดติดในรูปกายภายนอก</li>
  <li><strong>พระควัมปติเถระ (พระภควัมบดี):</strong> หนึ่งในสหาย ๔ รูปของพระยสะผู้บรรลุธรรมในปฐมโพธิกาล เป็นพระเถระผู้มีตบะบารมีสูงยิ่งในคติพุทธศาสนามอญโบราณ</li>
</ul>
<p>ครูบาอาจารย์สยามยุคโบราณได้นำพระนามและคติธรรมแห่งความสงบระงับของทั้งสองพระองค์ มาประดิษฐ์เป็นพุทธศิลป์การยกหัตถ์ปิดทวาร เพื่อเป็นสัญลักษณ์แห่งการเจริญภาวนาชั้นสูง</p>

<h2>๒. ปรัชญาแห่งการ "ปิดทวาร" และรากศัพท์ที่แท้จริงของ "มหาอุตม์"</h2>
<p>ในเชิงสัญญะวิทยา การยกพระหัตถ์ปิดพระพักตร์ ๒ ทวาร (พระปิดตามหาลาภ) หรือปิดทวารทั้ง ๙ (พระปิดตามหาอุด) มิได้มีความหมายถึงการอุดลูกปืนหรืออุดกักโชคลาภ แต่รากศัพท์แท้จริงมาจากคำว่า <strong>“มหาอุตม์” (มหา + อุตฺตม ในภาษาบาลี แปลว่า สูงสุด, บริสุทธิ์เลิศ)</strong></p>
<p>การปิดทวารทั้ง ๙ คือการตัดขาดอารมณ์ภายนอก (รูป เสียง กลิ่น รส โผฏฐัพพะ ธรรมารมณ์) มิให้ไหลเข้ามารบกวนจิตใจ สอดคล้องกับสภาวะ <em>“นิโรธสมาบัติ”</em> ของพระอริยบุคคล ในยุคปัจจุบันที่ข้อมูลข่าวสารท่วมท้น การอาราธนาพระปิดตาจึงเป็นอนุสติเตือนใจให้มีสติสงบระงับและสุขุมรอบคอบในการตัดสินใจ</p>

<h2>๓. สายวิชาพระปิดตาเนื้อผงคลุกรักแห่งสยามประเทศ</h2>
<p>พัฒนาการของพระปิดตาเนื้อผงคลุกรักในไทยมีศูนย์กลางสำคัญอยู่ที่ ๒ สำนักหลัก:</p>
<ul>
  <li><strong>สายวัดสะพานสูง นนทบุรี:</strong> ตำรับหลวงปู่เอี่ยม ปฐมนาม ถ่ายทอดสู่หลวงปู่กลิ่น และหลวงพ่อทองสุข สร้างด้วยผงโสฬสมหามงคลและผงพุทธคุณจุ่มรักบริสุทธิ์</li>
  <li><strong>สายวัดเครือวัลย์ ชลบุรี:</strong> ตำรับหลวงปู่แก้ว วัดเครือวัลย์ สุดยอดพระปิดตาเนื้อผงคลุกรักอันดับหนึ่งของแผ่นดิน</li>
</ul>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ พระเครื่องอ้างอิงทางประวัติศาสตร์ในคลัง Dan Siam Heritage Archive:</strong>
  <p style="margin: 0 0 8px 0;">• <a href="/product/phra-pid-ta-mae-krua-luang-pho-thong-suk-wat-saphan-sung" style="color: #d4af37; text-decoration: underline;">พระปิดตา พิมพ์แจกแม่ครัว หลวงพ่อทองสุข วัดสะพานสูง นนทบุรี (REF: #173)</a> — ยอดพระปิดตาสายตรงหลวงปู่เอี่ยม ปฐมนาม มวลสารผงโสฬสมหามงคลจุ่มรักโบราณแท้</p>
  <p style="margin: 0;">• <a href="/product/phra-pid-ta-plad-phan-wat-bo-so-chonburi-2503" style="color: #d4af37; text-decoration: underline;">พระปิดตา ปลัดผัน วัดโบสถ์ ชลบุรี ปี ๒๕๐๓ ผสมผงหลวงปู่แก้ว วัดเครือวัลย์ (REF: #166)</a> — พระปิดตาเนื้อผงคลุกรักผสมผงเก่าหลวงปู่แก้ว วัดเครือวัลย์ เข้มข้น</p>
</div>
`,

    content_zh: `
<p>在泰国南传佛教造像学中，<strong>“必打佛”（Phra Pidta，即闭眼佛或遮面佛）</strong>亦称<strong>“帕帕卡旺巴迪”（Bhagavampati）</strong>，是极具哲学深度的艺术典范。其真正旨归绝非民俗巫术，而是佛教修行中<strong>“根律仪戒”（感官息止）</strong>与<strong>“灭尽定”</strong>的具象化再现。</p>

<h2>一、经典源流：摩诃迦旃延与迦梵波提的文化交融</h2>
<p>依据南传佛教三藏文献，暹罗必打佛法相融合了两位早期圣弟子的行传特色：</p>
<ul>
  <li><strong>摩诃迦旃延尊者（Maha-Kaccayana）：</strong> 佛陀赞叹其“善解经义第一”。因相貌金光圆满招致尘俗爱染，遂入甚深禅定化现为体态圆胖之相，开示色相虚妄。</li>
  <li><strong>迦梵波提尊者（Gavampati）：</strong> 耶舍四位密友之一，早证阿罗汉果，在古代孟族与暹罗文献中被尊为具备深沉定力与护持福德的圣僧。</li>
</ul>

<h2>二、闭塞九窍的禅观智慧：“玛哈乌达玛”（至高无上）之本义</h2>
<p>双掌遮面以至闭塞九窍之法相，常被民间讹传为“堵塞子弹”。在巴利语语源学中，此词源自<strong>“Maha-Uttama”（至上清净）</strong>，意指彻底收摄六根，隔绝六尘外境。在当代信息爆炸的世界中，必打佛启迪藏家回归内心宁静，在商道与人生抉择中保持深沉定力。</p>

<h2>三、暹罗生漆拌经粉（Phong Khluk Rak）流派史</h2>
<p>必打佛之巅峰材质，当属暖武里府瓦萨攀颂寺（龙普严至龙婆通素法脉）的十六吉祥经粉生漆配伍，以及春武里府瓦阔湾寺（龙普娇）的生漆经粉传统，历来为国际藏家所推崇。</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Dan Siam 典藏永久馆藏历史标本：</strong>
  <p style="margin: 0 0 8px 0;">• <a href="/product/phra-pid-ta-mae-krua-luang-pho-thong-suk-wat-saphan-sung" style="color: #d4af37; text-decoration: underline;">瓦萨攀颂寺 龙婆通素 经典浸漆必打佛 [REF: #173]</a> — 传承龙普严正统十六吉祥经粉法门。</p>
  <p style="margin: 0;">• <a href="/product/phra-pid-ta-plad-phan-wat-bo-so-chonburi-2503" style="color: #d4af37; text-decoration: underline;">瓦波寺 帕巴拉潘 佛历2503年 混合龙普娇生漆经粉必打佛 [REF: #166]</a> — 融合春武里瓦阔湾寺龙普娇珍稀古老经粉。</p>
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

    excerpt: 'An epigraphical and iconographical study of Vaisravana (Thao Wessuwan) from the Digha Nikaya Pali Canon to royal Siamese Yaksha art, Chao Khun Sri Sondh’s B.E. 2493 Wat Suthat casting, Luang Pho Itt’s B.E. 2545 Wat Chula Mani milestone, and canonical deconstruction of modern commercial offerings.',
    excerpt_th: 'บทวิเคราะห์เชิงเทววิทยาและประวัติศาสตร์พุทธศิลป์ ย้อนรอยการเปลี่ยนผ่านจากท้าวกุเวรในคัมภีร์พระเวท สู่ท้าวเวสสุวรรณในพระไตรปิฎก อาฏานาฏิยสูตร ณ เขาคิชฌกูฏ ประวัติศาสตร์รูปหล่อสายวัดสุทัศน์ฯ พ.ศ. ๒๔๙๓ และเหรียญจำปีวัดจุฬามณี พร้อมถอดรหัสพุทธบูชาที่แท้จริง',
    excerpt_zh: '考据多闻天王（陶威素湾）从古印度吠陀俱毗罗到南传《阿吒曩胝雅经》护法大圣的演变，梳理曼谷瓦苏泰寺佛历2490-2493年朝鲜战争造像谱系及瓦朱拉玛尼寺经典查芭铸像，破除民间红花红香之非正统迷思。',

    content: `
<p>In the sacred architecture of Siamese royal monasteries, few iconographical figures evoke greater spiritual gravitas than <strong>Thao Wessuwan (Vaisravana / Vessavana)</strong>, standing vigilantly at temple porticos, leaning solemnly upon his formidable club. In modern commercial folklore, however, his persona is frequently obscured by sensationalist superstition, talismanic hype, and flashy market rituals. A rigorous historical, scriptural, and archaeological inquiry reveals a profound theological evolution: the transformation of the Vedic deity Kubera into an enlightened Buddhist Arya disciple, sovereign protector of the Northern Celestial Quarter, and patron of ethical conduct.</p>

<h2>1. From Vedic Kubera to Buddhist Vaisravana: Cosmological Elevation</h2>
<p>In Vedic literature and ancient Hindu tradition, the entity is recognized as <strong>Kubera</strong>, lord of subterranean wealth and chthonic treasures. The Sanskrit root <em>Ku-bera</em> historically conveyed "ill-formed" or "deformed body"—in early Gandharan and Mathuran stone reliefs, Kubera was depicted as a dwarfish, pot-bellied figure with three legs and eight teeth, seated upon a man (Nara-vahana) or bearing an ichneumon (jeweled mongoose) at Mount Kailash’s city of Alaka.</p>
<p>With the rise of Early Buddhism, the Pali Canon systematically restructured this cosmology. In the <em>Sutta Pitaka</em>, he emerges under the Pali designation <strong>Vessavana</strong> (Sanskrit: <em>Vaisravana</em>, "Son of Visrava" or sovereign of the capital <em>Visana</em>). Rather than a distorted earthly gnome, Vessavana is elevated as the supreme chief among the <strong>Catumaharajika (Four Great Heavenly Kings)</strong>, ruling the Northern Celestial Realm on the northern slopes of Mount Sumeru (Sineru), commanding the hosts of Yakkhas, Raksasas, and Kumbhandas.</p>

<h2>2. Yaksha Ontology in Theravada Cosmology: Devas, Not Asuras</h2>
<p>A prevalent theological error in popular culture is the misidentification of Yakshas as demonic Asuras.</p>
<ul>
  <li><strong>Asuras:</strong> As delineated in the <em>Paramatthajotika</em>, Asuras inhabit the subterranean abyss beneath Mount Meru’s ocean bed, historically cast down as perennial adversaries of Sakka (Indra) and the Tavatimsa Devas.</li>
  <li><strong>Yakshas (Yakkhas):</strong> In canonical Theravada, Yakshas are classified as <strong>Bhumma-devas (Terrestrial Deities)</strong> and <strong>Rukkha-devas (Arboreal Deities)</strong> within the Catumaharajika realm. They possess subtle astral bodies, celestial mansions (vimana), and varying degrees of radiance.</li>
</ul>
<p>Crucially, the <em>Digha Nikaya Commentary (Sumangalavilasini)</em> certifies that Thao Wessuwan is an established <strong>Sotapanna (Stream-Enterer)</strong>—a noble disciple firmly anchored on the path to liberation, having eradicated identity view, skeptical doubt, and attachment to mere rites. He is a defender of the Sasana who took a solemn vow before Gautama Buddha to protect monastic practitioners for five millennia.</p>

<h2>3. The Atanatiya Sutta on Vulture Peak: Scriptural Origin of Suad Bhan Yak</h2>
<p>The definitive primary source defining Thao Wessuwan’s ecclesiastical mandate is the <strong>Atanatiya Sutta</strong>, preserved in the <em>Digha Nikaya Patikavagga (Volume 11, Items 207–217)</em>. The discourse records that deep in the night atop Vulture Peak (Gijjhakuta) near Rajagaha, the Four Heavenly Kings arrived in blazing illumination with an immense celestial retinue.</p>
<p>Thao Wessuwan formally approached the Exalted One, observing that the vast majority of coarse, lower-ranking Yakshas had no affinity for the Buddha’s teachings, because the Dhamma strictly enjoins abstention from slaughter, theft, sexual misconduct, lying, and intoxication—virtues inherently antithetical to uncultivated demonic impulses. When solitary monks, nuns, and lay followers meditated in wilderness forests, they were constantly harassed by unruly non-human entities.</p>
<p>To resolve this spiritual impediment, Thao Wessuwan formally gifted the <strong>Atanatiya Paritta (The Protective Covenant of Atanata)</strong> to the Buddha, codifying a divine mandate: should any errant spirit assault a practitioner chanting this discourse, that entity would be cast out from celestial assemblies, punished by planetary forces, and denied communion among spirits.</p>
<p>In Siamese royal tradition dating from Ayutthaya through the early Rattanakosin era, this canonical account gave birth to the solemn <strong>Sampat-chara-chint Royal Cleansing Ceremony</strong>. Monastic assemblies recited the <strong>Suad Bhan Yak</strong> (the fierce, authoritative delivery of the Atanatiya verses) synchronized with the ceremonial firing of royal palace cannons to purge plagues, demonic contagion, and negative celestial alignments at the turn of the new year.</p>

<h2>4. The Gada Mace: One of the Four Supreme Weapons of the Universe</h2>
<p>According to the <em>Sumangalavilasini</em>, the Pali commentary to the Digha Nikaya, four celestial weapons possess absolute destructive dominion across the three worlds:</p>
<ol>
  <li><strong>Vajiravudha:</strong> The Thunderbolt of Sakka Devaraja (Indra).</li>
  <li><strong>Nayanavudha:</strong> The Fiery Gaze of Yama, King of the Netherworld.</li>
  <li><strong>Dussavudha:</strong> The Mystic Cloth Mantle of Alavaka Yaksha.</li>
  <li><strong>Gadavudha:</strong> The Celestial Mace (Club) of Thao Wessuwan.</li>
</ol>
<p>Commentarial lore records that if Vaisravana’s Gada is discharged, its kinetic impact can pulverize armies of corrupt spirits into fine dust. In Siamese temple art, master sculptors fused this mighty weapon with sovereign royal regalia (Chada crowns and golden chest plates), planting the club firmly into the earth as an eternal seal of unshakeable righteousness.</p>

<h2>5. Siam’s First Portable Castings: Chao Khun Sri (Sondh) Wat Suthat (B.E. 2490–2493)</h2>
<p>In Thai amulet history, the earliest miniature cast metal Thao Wessuwan statuettes designed for individual veneration were created by <strong>Phra Sunthorn Seelsamajarn (Chao Khun Sri Sondh Yatitharo)</strong>, the prime ecclesiastical disciple of <strong>Somdej Phra Sangkharat (Phae)</strong> at <strong>Wat Suthat Thepwararam</strong>.</p>
<p>Between <strong>B.E. 2490 and 2493</strong>, as the Kingdom of Thailand dispatched soldiers of the 21st Combined Regiment (the renowned <em>"Little Tigers"</em> battalion) to the grueling sub-zero combat zones of the Korean War, Chao Khun Sri (Sondh) consecrated the historic first-generation cast Thao Wessuwan statues.</p>
<p>Crafted using antique bronze sprues (Chanuan) from Somdej Pae's sacred Phra Kring batches, inscribed with the Yant Solos Maha Mongkol and Atanatiya paritta formulas, and cast via traditional clay double-molds in both demonic-face (Na Yak) and celestial-face (Na Thevada) iterations, these artifacts represent the undisputed <strong>Emperor of all Siamese Thao Wessuwan Cast Sculptures</strong>.</p>

<h2>6. The Modern Renaissance: Luang Pho Itt & The Iconic B.E. 2545 Wat Chula Mani Milestone</h2>
<p>In the late 20th and early 21st centuries, the definitive epicenter of Thao Wessuwan devotion shifted to <strong>Wat Chula Mani</strong> in Amphawa, Samut Songkhram Province, presided over by <strong>Phra Khru Sophitwiriyaphorn (Luang Pho Itt Bhaddacaro)</strong>, who inherited the mystical lineage of Luang Pho Nueang.</p>
<p>In <strong>B.E. 2545 (2002)</strong>, Luang Pho Itt orchestrated a historic turning point with the casting of the <strong>First Edition "Rian Champi" Thao Wessuwan Coin</strong>. Styled in the graceful teardrop silhouette of the Michelia alba leaf (Dok Champi), featuring an exquisite rendering of Thao Wessuwan standing atop the demon visage and inscribed with ancient sacred cabalistic seals, this design became the universal aesthetic archetype across Asia.</p>
<p>In that exact same B.E. 2545 imperial grand consecration ceremony, Wat Chula Mani also inaugurated the renowned <strong>Eight Immortals Fan Coin (Rian Phat Paed Sian B.E. 2545)</strong>, harmonizing Taoist esoteric astrology with Siamese Theravada protective consecration.</p>

<h2>7. Deconstructing Modern Superstition: Canonical Devotion vs Commercial Red Flowers</h2>
<p>In contemporary society, a sensationalized ritual trend has taken deep root: offering <strong>"nine red roses, nine red incense sticks, and red syrup drinks"</strong> before Thao Wessuwan shrines. Rigorous historical critique clarifies this phenomenon:</p>

<blockquote>
<p><strong>Scriptural Fact:</strong> The practice of offering red flowers, red incense, or raw red substances is completely absent from the Tipitaka, the Pali Commentaries, and ancient Siamese royal court manuals. It is a <strong>purely commercial fabrication</strong> initiated by street vendors around major temples in the post-2550 B.E. era, borrowing folk misconceptions that Yakshas thrive on blood and raw flesh.</p>
</blockquote>

<p>Because Thao Wessuwan is an authentic <strong>Sotapanna Noble Disciple</strong> established in impeccable ethical virtue, presenting raw or blood-mimicking offerings is fundamentally degrading to his sublime status.</p>

<p><strong>Authentic Buddhist Veneration Consists Of:</strong></p>
<ul>
  <li><strong>Pure Physical Offerings:</strong> White lotus blossoms, fresh jasmine, clean water, natural beeswax candles, and fragrant botanical incense.</li>
  <li><strong>Devatanussati (Mindfulness of Heavenly Virtues):</strong> Contemplating <em>Hiri</em> (moral shame) and <em>Ottappa</em> (dread of unwholesome karma)—the two foundational virtues that lead beings to celestial rebirth.</li>
  <li><strong>Observance of the Five Moral Precepts:</strong> Thao Wessuwan only favors and protects those who uphold honesty, refrain from exploitation, and practice Right Livelihood.</li>
  <li><strong>Pattidana (Dedication of Merit):</strong> Performing Dana, chanting sacred suttas, cultivating Vipassana meditation, and dedicating the resultant merit directly to Thao Wessuwan and his celestial guardians.</li>
</ul>

<div class="amulet-specimen-box" style="margin-top: 40px; padding: 24px; background: #111827; border: 1px solid #374151; border-radius: 8px;">
  <h3 style="color: #d4af37; margin-top: 0; font-size: 18px; border-bottom: 1px solid #374151; padding-bottom: 8px;">
    🏛️ Dan Siam Curated Archival Specimens:
  </h3>
  <p style="font-size: 14px; color: #9ca3af; margin-bottom: 16px;">
    This historical analysis is corroborated by verified physical specimens from the Dan Siam Amulets Permanent Archive:
  </p>
  <ul style="list-style-type: none; padding-left: 0; margin-bottom: 0; font-size: 14px; line-height: 2;">
    <li>
      • <a href="/product/fan-amulet-eight-immortals-luang-pho-ith-wat-chula-mani-2545-copper" style="color: #d4af37; text-decoration: underline; font-weight: 600;">
        Eight Immortals Fan Amulet by Luang Pho Ith, Wat Chula Mani, B.E. 2545, Copper [REF: #1508]
      </a> 
      <span style="color: #cbd5e1;">— Blessed in the historic B.E. 2545 Grand Consecration Ceremony at Wat Chula Mani, in the identical sacred rite as the legendary first-edition Champi Thao Wessuwan medallion.</span>
    </li>
    <li>
      • <a href="/product/thao-wesssuwan-amulet-brooch-silver" style="color: #d4af37; text-decoration: underline; font-weight: 600;">
        Thao Wessuwan Deity Amulet Brooch & Clasp in Solid 92.5% Silver with Enamel [REF: #1493 / #1500]
      </a> 
      <span style="color: #cbd5e1;">— Handcrafted archival talisman featuring the protective guardian iconography of the Northern Celestial King.</span>
    </li>
    <li>
      • <a href="/product/takroh-pendant-thao-wessuwanna-silver-8g" style="color: #d4af37; text-decoration: underline; font-weight: 600;">
        Takroh Pendant with Thao Wessuwan Head Design, 92% Silver, 8 Grams [REF: #1488]
      </a> 
      <span style="color: #cbd5e1;">— Classical Siamese casting representing the wrath-transcending facial iconography of Vaisravana.</span>
    </li>
    <li>
      • <a href="/product/phra-chai-watthana-wat-suthat-2556-samurit-chanuan" style="color: #d4af37; text-decoration: underline; font-weight: 600;">
        Phra Chai Watthana, Wat Suthat Thepwararam, Mixed Old Chanuan Bronze [REF: #1502]
      </a> 
      <span style="color: #cbd5e1;">— Direct lineage metal casting from Wat Suthat, the historical sanctuary where Chao Khun Sri (Sondh) cast Siam's first Thao Wessuwan statuettes.</span>
    </li>
  </ul>
</div>
`,

    content_th: `
<p>ในภูมิทัศน์พุทธศิลปกรรมและสถาปัตยกรรมพระอารามหลวงแห่งสยามประเทศ หนึ่งในรูปเคารพที่ยืนตระหง่านกุมกระบองอย่างสง่างามบริเวณซุ้มประตูพระวิหารหลวง คือ <strong>“ท้าวเวสสุวรรณ” (Vaisravana / Vessavana)</strong> มหาราชผู้ทรงอานุภาพแห่งทิศอุดร ทว่า ในความรับรู้ของสังคมยุคใหม่ ภาพลักษณ์ของท่านมักถูกนำเสนอผ่านมุมมองไสยศาสตร์ แฟชั่นเครื่องรางเชิงพาณิชย์ หรือการบูชาด้วยเครื่องเซ่นไหว้สีแดงฉูดฉาด ซึ่งบดบังแก่นแท้ทางประวัติศาสตร์และพระธรรมวินัย</p>

<p>บทความวิจัยเชิงประวัติศาสตร์นี้มุ่งสืบค้นต้นธารทางเทววิทยา ประติมานวิทยา และหลักฐานปฐมภูมิในพระไตรปิฎก เพื่อคลี่คลายพัฒนาการจาก <em>“ท้าวกุเวร”</em> ในยุคพระเวท สู่ <em>“ท้าวเวสสุวรรณ”</em> พระอริยบุคคลในพระพุทธศาสนา ตลอดจนประวัติศาสตร์การสร้างวัตถุมงคลรูปหล่อรุ่นแรกแห่งสยาม</p>

<h2>๑. จากท้าวกุเวรแห่งคัมภีร์พระเวท สู่ท้าวเวสสุวรรณพุทธบาลแห่งทิศอุดร</h2>
<p>ในคติพราหมณ์-ฮินดูดั้งเดิมและคัมภีร์พระเวท ปรากฏพระนามของ <strong>“ท้าวกุเวร” (Kubera)</strong> ในฐานะจ้าวแห่งขุมทรัพย์ใต้พิภพ พระนาม <em>“กุเวร”</em> ในภาษาสันสกฤตมีความหมายดั้งเดิมว่า <em>“ผู้มีรูปกายพิกลพิการ”</em> หรือ <em>“รูปร่างน่าเกลียด”</em> โดยในประติมานวิทยาอินเดียยุคแรก (เช่น ศิลปะคันธาระและมถุรา) ท้าวกุเวรมักได้รับการสลักเป็นบุรุษร่างแคระ พุงพลุ้ย มี ๓ ขา และ ๘ ฟัน ประทับบนหลังมนุษย์หรือมีพังพอนคาบแก้วเป็นบริวาร สถิตอยู่ ณ นครอลกา (Alaka) บนยอดเขาไกลาส</p>

<p>ทว่า เมื่อพระพุทธศาสนาอุบัติขึ้น คติเรื่องท้าวกุเวรได้รับการจัดระเบียบจักรวาลทัศน์ใหม่ (Cosmological Re-articulation) โดยปรากฏในพระสุตตันตปิฎก นาม <strong>“ท้าวเวสสุวรรณ” (บาลี: เวสฺสวโณ / สันสกฤต: ไวศฺรวณ)</strong> พระนามนี้มีที่มาจากนครที่ประทับชื่อ <em>วิสาณะ (Visana)</em> จึงได้พระนามว่า <em>เวสสุวรรณ (ผู้ครองวิสาณราชธานี)</em> ท่านได้รับการสถาปนาเป็นอธิบดีใหญ่แห่งท้าวจาตุมหาราชทั้ง ๔ ทรงครองทิศอุดร (ทิศเหนือ) แห่งสวรรค์ชั้นจาตุมหาราชิกา ปกครองเหล่ายักษ์ รากษส และกุมภัณฑ์</p>

<h2>๒. ฐานันดรแห่ง "ยักษ์" ในพุทธศาสนา: ภุมมเทวดา มิใช่อสูร</h2>
<p>ข้อผิดพลาดร้ายแรงที่สุดประการหนึ่งในสังคม คือความสับสนระหว่าง <strong>“ยักษ์” (Yaksha)</strong> กับ <strong>“อสูร” (Asura)</strong></p>
<ul>
  <li><strong>อสูร (Asura):</strong> ในคัมภีร์ปรมัตถโชติกา อสูรเป็นอมนุษย์อีกภพภูมิหนึ่ง อาศัยอยู่ใต้ฐานเขาพระสุเมรุ (มหาสมุทรสีทันดร) เป็นปฏิปักษ์โดยตรงต่อพระอินทร์และเทวดาชั้นดาวดึงส์</li>
  <li><strong>ยักษ์ (Yaksha):</strong> ในพระธรรมวินัย ยักษ์คือ <strong>“ภุมมเทวดา” (เทวดาผู้สถิตบนพื้นดิน)</strong> และ <strong>“รุกขเทวดา” (เทวดาสถิตตามต้นไม้)</strong> ในเขตปกครองของสวรรค์ชั้นจาตุมหาราชิกา มีสภาวะกึ่งทิพย์ บางตนมีวิมานลอยฟ้า ท้าวเวสสุวรรณมิได้ทรงมีรูปกายอัปลักษณ์ หากแต่ทรงเครื่องศิราภรณ์มงกุฎและฉลองพระองค์ทองคำอร่าม ดั่งปรากฏในคัมภีร์สารัตถปกาสินี</li>
</ul>
<p>ยิ่งไปกว่านั้น ในอรรถกถาทีฆนิกาย พระพุทธองค์ทรงรับรองว่า <strong>ท้าวเวสสุวรรณเป็นพระอริยบุคคลชั้น “โสดาบัน”</strong> ผู้มีจิตศรัทธามั่นคงไม่คลอนแคลนในพระรัตนตรัย และตั้งปณิธานในการอภิบาลพระพุทธศาสนาให้ดำรงอยู่ตราบ ๕,๐๐๐ ปี</p>

<h2>๓. พระสูตรอาฏานาฏิยสูตร ณ เขาคิชฌกูฏ: รากเหง้าพิธีสวดภาณยักษ์สยาม</h2>
<p>หลักฐานปฐมภูมิที่บันทึกบทบาทของท้าวเวสสุวรรณอย่างเด่นชัดที่สุด คือ <strong>พระสุตตันตปิฎก ทีฆนิกาย ปาฏิกวรรค เล่ม ๑๑ (ข้อ ๒๐๗–๒๑๗)</strong> ความว่า ในราตรีหนึ่ง ณ ยอดเขาคิชฌกูฏ ใกล้พระนครราชคฤห์ ท้าวจาตุมหาราชทั้ง ๔ (ท้าวธตรฐ, ท้าววิรุฬหก, ท้าววิรูปักษ์, และท้าวเวสสุวรรณ) ได้นำกองทัพทิพย์ลงมาเข้าเฝ้าพระสัมมาสัมพุทธเจ้า</p>

<p>ท้าวเวสสุวรรณได้กราบทูลต่อพระพุทธองค์ว่า ยักษ์ชั้นต่ำและอมนุษย์จำนวนมาก <em>“ไม่เลื่อมใสในพระผู้มีพระภาค”</em> เพราะพระพุทธองค์ทรงสอนให้ละเว้นจากการฆ่าสัตว์ ลักทรัพย์ ประพฤติผิดในกาม พูดเท็จ และดื่มสุรา ซึ่งขัดต่อกิเลสและวิสัยดิบเถื่อนของยักษ์พาลเหล่านั้น เมื่อพระภิกษุ ภิกษุณี หรืออุบาสกผู้ประพฤติธรรมต้องจาริกไปบำเพ็ญสมณธรรมในป่าเขาดงดิบ ย่อมตกเป็นเป้าหมายของการกลั่นแกล้งและทำร้าย</p>

<p>ด้วยเหตุนี้ ท้าวเวสสุวรรณจึงได้กราบทูลมอบ <strong>“อาฏานาฏิยารักขา” (พระปริตรแห่งนครอาฏานาฏา)</strong> ถวายแด่พระบรมศาสดา เพื่อให้เป็นมนต์คุ้มครองเหล่าศากยบุตร พร้อมทั้งบัญญัติว่า หากมียักษ์ตนใดฝ่าฝืนรังแกผู้เจริญพระปริตรนี้ ยักษ์ตนนั้นจะถูกลงทัณฑ์ ขับไล่ออกจากหมู่อมุนษย์ และไม่ได้รับความเคารพในเทวสภา</p>

<p>ในประวัติศาสตร์ราชสำนักสยาม คัมภีร์นี้ได้กลายเป็นต้นกำเนิดของ <strong>“พระราชพิธีสัมพัจฉรฉินท์” (พิธีขับไล่อวมงคลผลัดเปลี่ยนศักราชเก่าสู่ปีใหม่)</strong> ตั้งแต่สมัยกรุงศรีอยุธยาจนถึงต้นรัตนโกสินทร์ โดยพระสงฆ์จะสวด <strong>“ภาณยักษ์”</strong> (การขับสวดอาฏานาฏิยสูตรด้วยท่วงทำนองขึงขังเด็ดขาด) ควบคู่กับการยิงปืนใหญ่รอบกำแพงพระบรมมหาราชวัง เพื่อขับไล่เสนียดจัญไร ภูติผี และโรคห่า ปัดเป่าเภทภัยให้แก่แผ่นดิน</p>

<h2>๔. คทาวุธ: หนึ่งในสี่มหาศาสตราวุธสะท้านจักรวาล</h2>
<p>ตามคัมภีร์ <strong>สุมังคลวิลาสินี (อรรถกถาทีฆนิกาย)</strong> ได้ระบุถึงอาวุธที่มีอานุภาพทำลายล้างสูงสุดในสากลจักรวาลไว้ ๔ ประการ ได้แก่:</p>
<ol>
  <li><strong>วชิราวุธ</strong> แห่งท้าวสักกะเทวราช (พระอินทร์)</li>
  <li><strong>นัยนาวุธ</strong> แห่งท้าวพญายมราช (เพ่งมองเพื่อเผาผลาญ)</li>
  <li><strong>ทุสสาวุธ</strong> แห่งอาฬวกยักษ์ (ผ้าพันคอที่เหวี่ยงทำลายแผ่นดิน)</li>
  <li><strong>คทาวุธ (กระบอง)</strong> แห่งท้าวเวสสุวรรณ</li>
</ol>
<p>คัมภีร์ระบุว่า หากท้าวเวสสุวรรณปล่อยคทาวุธนี้ออกจากพระหัตถ์ จะมีอานุภาพฟาดฟันและทำลายศีรษะของเหล่ายักษ์และภูติผีพาลให้แหลกละเอียดเป็นผุยผงในพริบตา ช่างหลวงสยามจึงนำลักษณะของคทาวุธนี้มาผสานเข้ากับศิลปะเครื่องทรงขัตติยราช สลักเป็นทวารบาลยืนกุมกระบองทอดปลายลงดิน อันเป็นสัญลักษณ์แห่งอำนาจสยบความชั่วร้ายอย่างเด็ดขาด</p>

<h2>๕. ปฐมบทแห่งรูปหล่อท้าวเวสสุวรรณสยาม: สายวัดสุทัศนเทพวราราม พ.ศ. ๒๔๙๐–๒๔๙๓</h2>
<p>ในมิติประวัติศาสตร์พระเครื่องสยาม การสถาปนาวัตถุมงคลท้าวเวสสุวรรณในรูปแบบ “รูปหล่อโลหะขนาดเล็กสำหรับพกพา” เริ่มต้นขึ้นอย่างเป็นทางการโดย <strong>พระสุนทรศีลสมาจาร (เจ้าคุณศรี สนธิ์ ยติธโร)</strong> พระมหาเถระผู้เป็นศิษย์เอกแห่ง <strong>สมเด็จพระสังฆราช (แพ ติสฺสเทโว) วัดสุทัศนเทพวราราม</strong></p>

<p>ระหว่างปี <strong>พ.ศ. ๒๔๙๐ ถึง ๒๔๙๓</strong> เมื่อประเทศไทยส่งกองกำลังทหารไทย กรมผสมที่ ๒๑ (เจ้าของสมญานาม <em>“กองพันพยัคฆ์น้อย” Little Tigers</em>) เข้าร่วมรบในสงครามเกาหลี ท่ามกลางอุณหภูมิเยือกแข็งติดลบและสมรภูมิอันดุเดือด เจ้าคุณศรี (สนธิ์) ได้จัดสร้าง <strong>“รูปหล่อโบราณท้าวเวสสุวรรณ”</strong> ขึ้น เพื่อมอบเป็นมหาอภิบาลคุ้มครองชีวิตทหารหาญ</p>

<p>กรรมวิธีการสร้างใช้สูตรโลหะสัมริดผสมชนวนพระกริ่งสายวัดสุทัศน์ หล่อโบราณแบบเบ้าประกบ มีทั้งพิมพ์หน้ายักษ์และพิมพ์หน้าเทวดา มีการจารพระยันต์โสฬสมหามงคลและอาฏานาฏิยปริตร ปลุกเสกด้วยพระคาถาพุทธาภิเษกตำรับหลวง วัตถุมงคลรุ่นนี้ได้รับการยอมรับในวงการโบราณคดีพระเครื่องว่าเป็น <strong>“จักรพรรดิแห่งรูปหล่อท้าวเวสสุวรรณรุ่นแรกของประเทศไทย”</strong></p>

<h2>๖. วิวัฒนาการสู่กึ่งพุทธกาลและมหาตำนานเหรียญจำปีวัดจุฬามณี พ.ศ. ๒๕๔๕</h2>
<p>เมื่อกาลเวลาล่วงเลยสู่ยุคหลังกึ่งพุทธกาล พระอารามที่มีชื่อเสียงและสร้างปรากฏการณ์แห่งความศรัทธาต่อท้าวเวสสุวรรณมากที่สุดในประวัติศาสตร์สมัยใหม่ คือ <strong>วัดจุฬามณี ต.บางช้าง อ.อัมพวา จ.สมุทรสงคราม</strong> ภายใต้การนำของ <strong>พระครูโสภิตวิริยาภรณ์ (หลวงพ่ออิฏฐ์ ภทฺทจาโร)</strong> พระเกจิอาจารย์ผู้สืบสายพุทธาคมจากหลวงพ่อเนื่อง วัดจุฬามณี</p>

<p>ในปี <strong>พ.ศ. ๒๕๔๕</strong> หลวงพ่ออิฏฐ์ได้จัดสร้าง <strong>“เหรียญท้าวเวสสุวรรณ พิมพ์จำปี รุ่นแรก”</strong> ขึ้น โดยออกแบบพิมพ์ทรงเป็นกลีบดอกจำปีอันสง่างาม ด้านหน้าประดิษฐานรูปท้าวเวสสุวรรณยืนกุมกระบองอย่างวิจิตร ด้านหลังจารึกมหายันต์พุทธคุณและยันต์โสฬสมหามงคล ประกอบพิธีมหาจักรพรรดิพุทธาภิเษกอันยิ่งใหญ่</p>

<p>ในพิธีประวัติศาสตร์ปี ๒๕๔๕ เดียวกันนี้ ทางวัดยังได้สถาปนาวัตถุมงคลสำคัญควบคู่กัน คือ <strong>“เหรียญพัดแปดเซียน หลวงพ่ออิฏฐ์ วัดจุฬามณี ปี ๒๕๔๕”</strong> ซึ่งผสานศาสตร์พุทธาคมสยามเข้ากับเทววิทยาเต๋าแปดเซียน เพื่อเสริมส่งด้านโชคลาภ ขจัดอุปสรรค และคุ้มครองความร่มเย็น ส่งผลให้พิมพ์จำปีปี ๒๕๔๕ กลายเป็นมาตรฐานพุทธศิลป์ท้าวเวสสุวรรณที่ทรงคุณค่าทางประวัติศาสตร์ที่สุดในยุครัตนโกสินทร์ตอนปลาย</p>

<h2>๗. ถอดรหัสมายาคติ: “กุหลาบแดง-ธูปแดง” สู่แก่นแท้แห่งพุทธบูชา</h2>
<p>ในทศวรรษปัจจุบัน เกิดกระแสนิยมการไหว้ท้าวเวสสุวรรณด้วย <strong>“ดอกกุหลาบสีแดง ๙ ดอก ธูปสีแดง ๙ ดอก และน้ำแดง”</strong> จนกลายเป็นภาพจำของสังคม ทว่า เมื่อตรวจสอบตามหลักพระไตรปิฎกและจารีตโบราณคดีสยาม:</p>

<blockquote>
<p><strong>ความจริงทางประวัติศาสตร์และพระวินัย:</strong> ประเพณีการใช้ดอกกุหลาบแดงและธูปแดง มิได้มีปรากฏในพระไตรปิฎก อรรถกถา หรือตำราพิชัยสงครามโบราณแม้แต่หน้าเดียว หากแต่เป็น <strong>“สิ่งประดิษฐ์ทางการค้า” (Commercial Inventions)</strong> ของกลุ่มพ่อค้าแม่ค้าบริเวณหน้าวัดในยุคหลัง พ.ศ. ๒๕๕๐ ที่หยิบยืมความเชื่อเรื่องสีแดงจากความเข้าใจผิดว่ายักษ์ชอบโลหิตหรือเนื้อสด</p>
</blockquote>

<p>ท้าวเวสสุวรรณในฐานะ <strong>“พระอริยบุคคลชั้นโสดาบัน”</strong> ทรงมีจิตบริสุทธิ์ ยินดีในศีลและธรรม การนำเครื่องเซ่นไหว้เลียนแบบภูติผีดิบกระหายเลือดไปถวาย จึงเป็นการลดทอนสถานภาพอันสูงส่งของพระองค์อย่างสิ้นเชิง</p>

<p><strong>การบูชาที่ถูกต้องตามพุทธประเพณีแท้จริง ประกอบด้วย:</strong></p>
<ul>
  <li><strong>อามิสบูชาอันบริสุทธิ์:</strong> ดอกบัวขาว ดอกมะลิสด น้ำดื่มสะอาด เทียนสีเหลือง และธูปหอมธรรมชาติสีขาวหรือสีไม้</li>
  <li><strong>เทวตานุสสติ (การปฏิบัติบูชา):</strong> ระลึกถึงคุณธรรม ๒ ประการที่ทำให้เป็นเทวดา คือ <strong>หิริ (ความละอายต่อบาป)</strong> และ <strong>โอตตัปปะ (ความเกรงกลัวต่อบาป)</strong></li>
  <li><strong>การรักษาศีล ๕:</strong> ท้าวเวสสุวรรณทรงรักและปกป้องเฉพาะบุคคลผู้มีสัจจะ ไม่คดโกง ไม่เบียดเบียนผู้อื่น และประกอบสัมมาอาชีวะ</li>
  <li><strong>การอุทิศส่วนกุศล (ปัตติทานมัย):</strong> เมื่อทำบุญตักบาตร สวดมนต์ หรือเจริญภาวนา ให้อุทิศผลบุญนั้นถวายแด่ท้าวเวสสุวรรณและบริวาร นี่คือการเชื่อมโยงพลังทิพย์ที่ทรงพลานุภาพที่สุดตามหลักพระพุทธศาสนาเถรวาท</li>
</ul>

<div class="amulet-specimen-box" style="margin-top: 40px; padding: 24px; background: #111827; border: 1px solid #374151; border-radius: 8px;">
  <h3 style="color: #d4af37; margin-top: 0; font-size: 18px; border-bottom: 1px solid #374151; padding-bottom: 8px;">
    🏛️ โบราณวัตถุและรูปเคารพสะสมของ Dan Siam Amulets (Archival Curated Specimens):
  </h3>
  <p style="font-size: 14px; color: #9ca3af; margin-bottom: 16px;">
    เอกสารวิจัยชิ้นนี้อ้างอิงวัตถุมงคลของแท้ที่มีการบันทึกประวัติศาสตร์การปลุกเสกตรงตามจารีตโบราณในคลังสะสมของ Dan Siam Amulets:
  </p>
  <ul style="list-style-type: none; padding-left: 0; margin-bottom: 0; font-size: 14px; line-height: 2;">
    <li>
      • <a href="/product/fan-amulet-eight-immortals-luang-pho-ith-wat-chula-mani-2545-copper" style="color: #d4af37; text-decoration: underline; font-weight: 600;">
        เหรียญพัด แปดเซียน หลวงพ่ออิฏฐ์ วัดจุฬามณี จ.สมุทรสงคราม ปี ๒๕๔๕ เนื้อทองแดง [REF: #1508]
      </a> 
      <span style="color: #cbd5e1;">— ร่วมมหาพิธีจักรพรรดิพุทธาภิเษก ณ วัดจุฬามณี ปี ๒๕๔๕ วาระเดียวกับเหรียญจำปีท้าวเวสสุวรรณรุ่นแรกอันเป็นตำนาน</span>
    </li>
    <li>
      • <a href="/product/thao-wesssuwan-amulet-brooch-silver" style="color: #d4af37; text-decoration: underline; font-weight: 600;">
        แหนบติดเสื้อและตะขอแขวนพระ ลายท้าวเวสสุวรรณ เนื้อเงินแท้ ๙๒.๕% ลงยา [REF: #1493 / #1500]
      </a> 
      <span style="color: #cbd5e1;">— งานหัตถศิลป์เครื่องเงินแท้ทรงคุณค่า จำลองพุทธศิลป์ทวารบาลเพื่อการอารักขาคุ้มภัย</span>
    </li>
    <li>
      • <a href="/product/takroh-pendant-thao-wessuwanna-silver-8g" style="color: #d4af37; text-decoration: underline; font-weight: 600;">
        ตะขอแขวนพระ ตะกร้อลายเศียรท้าวเวสสุวรรณ เนื้อเงิน ๙๒% น้ำหนัก ๘ กรัม [REF: #1488]
      </a> 
      <span style="color: #cbd5e1;">— ประติมานวิทยาเศียรท้าวเวสสุวรรณหล่อโบราณ ผสานเครื่องรางพุทธคุณสยาม</span>
    </li>
    <li>
      • <a href="/product/phra-chai-watthana-wat-suthat-2556-samurit-chanuan" style="color: #d4af37; text-decoration: underline; font-weight: 600;">
        พระชัยวัฒน์ วัดสุทัศนเทพวราราม เนื้อสัมริดผสมชนวนเก่า สมเด็จพระสังฆราช (แพ) [REF: #1502]
      </a> 
      <span style="color: #cbd5e1;">— สืบสานสายวิชาโลหะสัมริดและมหาพุทธาภิเษกแห่งวัดสุทัศน์ ต้นกำเนิดรูปหล่อท้าวเวสสุวรรณรุ่นแรกของแผ่นดินสยาม</span>
    </li>
  </ul>
</div>
`,

    content_zh: `
<p>在泰国皇家寺院的山门与经堂门廊前，身披重铠、双手拄棒威然屹立的<strong>多闻天王（毗沙门天 / 陶威素湾 / Thao Wessuwan / Vaisravana）</strong>法相庄严，深受各界善信顶礼膜拜。然而在现代民间商业风潮的裹挟下，其信仰往往被过度附会为奇巧巫蛊、市井求财，甚至演变为流行献祭“红玫瑰与红香”的艳俗表象，掩盖了深邃的正统教理。</p>

<p>本学术考据旨在系统梳理其从吠陀《梨俱吠陀》时代的地下财神<em>俱毗罗（Kubera）</em>，向南传巴利三藏中证悟初果的<em>多闻天王</em>之历史演变，考证《阿吒曩胝雅经》的护法法统、曼谷瓦苏泰寺佛历2490-2493年朝鲜战争首期金铜铸像，以及佛历2545年瓦朱拉玛尼寺经典查芭铸像，破除民间迷信，回归纯正的佛教天随念修持。</p>

<h2>一、从吠陀俱毗罗到佛教多闻天王：神格与造像的彻底升华</h2>
<p>在古印度吠陀梵典中，此尊原名<strong>俱毗罗（Kubera）</strong>，意为“丑陋或畸形之人”。在孔雀王朝、犍陀罗及秣菟罗早期石刻艺术中，俱毗罗多被刻画为体形肥矮、大腹便便、生有三足与八齿之侏儒财神，或脚踏人类（人车），或手持吐宝鼠，驻锡于吉罗娑山之阿罗迦城（Alaka），掌管大地金银矿藏。</p>
<p>随着早期佛教的发展，佛陀在巴利三藏中对其进行了深刻的宇宙观重构。其在南传三藏中定名为<strong>多闻天王（Vessavana / 毗沙门天）</strong>，因统领“毗沙那城”（Visana）而得名。其神格由地下侏儒升华为主掌北方法界的<strong>四大天王之首</strong>，驻锡于须弥山北层，统领夜叉、罗刹及鸠槃荼等庞大部众，成为佛门威德无上的法界总护法。</p>

<h2>二、佛教宇宙观中的“药叉”地位：地居天人而非阿修罗</h2>
<p>当代民间最常见的教理混淆，是将<strong>药叉（Yaksha / 夜叉）</strong>与<strong>阿修罗（Asura）</strong>混为一谈。</p>
<ul>
  <li><strong>阿修罗（Asura）：</strong> 据南传论典《胜义灯》（Paramatthajotika）记载，阿修罗聚居于须弥山底大海之渊，因往昔嗔恚业障，与帝释天及三十三天众生永世争战对抗。</li>
  <li><strong>药叉（Yaksha）：</strong> 在佛陀正法中，药叉实属于<strong>四大王众天（Catumaharajika）的地居天人（Bhumma-deva）与树神（Rukkha-deva）</strong>。彼等具足中阴神通与天人光华，绝非地狱恶鬼。</li>
</ul>
<p>尤为关键的是，巴利长部注疏《吉祥悦意释》（Sumangalavilasini）确切记载：<strong>多闻天王已断除我见、戒禁取与疑结，证得佛教圣者“预流果”（Sotapanna / 初果罗汉）</strong>。天王发宏深誓愿，尽未来际护持佛法僧三宝长存五千年，是具足正见与慈悲的圣贤眷属。</p>

<h2>三、灵鹫山《阿吒曩胝雅经》与暹罗皇家“诵药叉经”禳灾大典</h2>
<p>记载多闻天王护持圣教的最权威第一手文献，出自<strong>南传巴利大藏经《长部·波梨篇》第11卷（第207至217节）《阿吒曩胝雅经》（Atanatiya Sutta）</strong>。经云：在王舍城耆阇崛山（灵鹫山）之夜，四大天王率无量天龙药叉大军入觐佛陀，光明烛照天地。</p>
<p>多闻天王向佛陀合掌禀白：下界粗野未驯之恶劣药叉极多，彼等不喜佛法，因佛法教导戒杀、戒盗、戒邪淫、戒妄语、戒饮酒，此与彼等之贪嗔习性相违背。当佛门比丘、比丘尼与善信在深山老林旷野独处精进禅修时，常受非人恶煞侵扰扰乱。</p>
<p>为此，多闻天王恭向佛陀奉献<strong>“阿吒曩胝雅护卫咒”（Atanatiya Paritta）</strong>，作为佛门四众弟子的金刚守护甲胄，并制定法界铁律：凡有凶暴药叉敢违逆侵扰持诵此经之禅修者，必遭天界神罚放逐、头裂受报。</p>
<p>在暹罗阿瑜陀耶乃至曼谷王朝早期，此经典演化为宫廷至高之<strong>“解宿怨换岁皇家大典”（Sampat-chara-chint）</strong>。高僧在宫廷高台严谨合诵<strong>“诵药叉经”（Suad Bhan Yak）</strong>，声震皇城，配合鸣放十二门宫廷巨炮，以破除全国各省之疫疠瘟疫、妖孽邪煞与年岁冲克，护佑国泰民安。</p>

<h2>四、宝棒（Gada）：四界至尊神兵之考据</h2>
<p>依巴利三藏权威注疏《吉祥悦意释》记载，宇宙三界中具足无匹威能之四大神兵为：</p>
<ol>
  <li><strong>金刚杵（Vajiravudha）：</strong> 帝释天王之无上法器。</li>
  <li><strong>目力神兵（Nayanavudha）：</strong> 阎摩罗王焚尽幽冥之目光法力。</li>
  <li><strong>罥索神巾（Dussavudha）：</strong> 阿罗婆迦药叉动摇大千之宝巾。</li>
  <li><strong>宝棒（Gadavudha）：</strong> 多闻天王降伏群魔之金刚宝棒。</li>
</ol>
<p>注疏记载，天王之宝棒一旦掷出，能瞬间击碎一切刚强恶灵之头颅。暹罗历代皇家造像工匠融汇高棉与大城王朝武士铠甲，将宝棒雕饰为深插入地之威仪姿态，象征以正义法度镇压一切不祥与邪恶。</p>

<h2>五、暹罗首期金铜造像史：瓦苏泰寺召坤习·颂大师（佛历2490–2493年）</h2>
<p>在泰国佛牌收藏史上，首创铸造“随身佩戴型金属立尊陶威素湾”的开山鼻祖，正是曼谷<strong>瓦苏泰寺（Wat Suthat Thepwararam）</strong>第七任僧王山卡拉培之首席高足——<strong>召坤习·颂（Phra Sunthorn Seelsamajarn Sondh Yatitharo）</strong>。</p>
<p><strong>佛历2490年至2493年（1947–1950年）</strong>期间，泰国派遣第21联队（即蜚声国际之“小老虎兵团” Little Tigers）远赴朝鲜战场参战。在异国零下数十度的苦寒与枪林弹雨中，召坤习大师慈悲为怀，特开炉熔铸首期陶威素湾金铜小立尊，分发予随军将士佩戴保命。</p>
<p>大师采用瓦苏泰寺传承之山卡拉培古老药师佛金韶熔渣（Chanuan），刻入梭罗十六吉祥大符印与《阿吒曩胝雅经》秘咒，以古法黏土模对铸，分为“夜叉相”与“天人相”，被公认为<strong>全泰首屈一指的金铜陶威素湾法皇圣品</strong>。</p>

<h2>六、佛历2545年划时代丰碑：瓦朱拉玛尼寺龙婆伊大师经典“查芭”（จำปี）大典</h2>
<p>进入现代，全泰弘扬陶威素湾信仰最鼎盛之祖庭，当属夜功府安帕瓦县之<strong>瓦朱拉玛尼寺（Wat Chula Mani）</strong>。现任住持<strong>龙婆伊（Phra Khru Sophitwiriyaphorn / Luang Pho Ith）</strong>承袭瓦朱拉玛尼龙婆良（LP Nueang）之高深法脉。</p>
<p><strong>佛历2545年（2002年）</strong>，龙婆伊大师匠心独运，创制督造了<strong>“第一期查芭花瓣形陶威素湾自身铜牌”</strong>。牌身以查芭花（白兰花）优美之花瓣轮廓为形，正面天王顶天立地、脚踏夜叉神煞，背面铭刻古老金刚护法符印，汇聚全泰名僧启建盛大皇家级“大帝王水陆大法会”。</p>
<p>在同一年（佛历2545年）之同一场历史性大典中，瓦朱拉玛尼寺亦督造了极具收藏价值的<strong>“八仙法扇纪念铜牌”</strong>，融汇华夏道家八仙除障招财精义与南传佛教金刚护法力，使佛历2545年法会之圣物成为当今国际公认的陶威素湾造像艺术巅峰。</p>

<h2>七、破除现代迷信：辨析“九朵红玫瑰与红香”之商业附会</h2>
<p>近年来，社会上盛行以<strong>“九朵红玫瑰、九支红香与红糖水”</strong>参拜陶威素湾之风潮。然而从严谨的佛教考古学与三藏文献考察：</p>

<blockquote>
<p><strong>正统教理考证：</strong> 供养红玫瑰、红香乃至带血生肉之行径，在巴利三藏、历代注疏及古暹罗兵书礼典中<strong>绝无半字记载</strong>。此纯系佛历2550年之后寺庙周边小贩为推销花卉而杜撰之<strong>商业发明（Commercial Invention）</strong>，其根源在于误认天王为嗜饮鲜血之嗜血恶灵。</p>
</blockquote>

<p>多闻天王作为<strong>证悟初果之圣贤天王</strong>，心常寂静，受持清净梵行。以祭祀厉鬼妖魔之血腥表象去供奉天王，实乃对正统佛教护法的严重贬损与颠倒。</p>

<p><strong>正统如法的佛教奉安与天随念修持包括：</strong></p>
<ul>
  <li><strong>清净事相供养：</strong> 白莲花、鲜茉莉、纯净饮用水、纯天然蜂蜡明灯及天然草本清香。</li>
  <li><strong>修持天随念（Devatanussati）：</strong> 恒常忆念令众生生天之两重根本美德——<strong>“惭”（Hiri，内省知耻）</strong>与<strong>“愧”（Ottappa，畏惧造业）</strong>。</li>
  <li><strong>奉持根本五戒：</strong> 天王只护佑心存正念、不欺不诈、以正命（正当行商职业）谋生之人。</li>
  <li><strong>回向功德（Pattidana）：</strong> 每逢布施供养、诵经禅坐毕，将功德至诚回向予多闻天王及其法界眷属，此方为南传正统中感通天王护佑的最上法门。</li>
</ul>

<div class="amulet-specimen-box" style="margin-top: 40px; padding: 24px; background: #111827; border: 1px solid #374151; border-radius: 8px;">
  <h3 style="color: #d4af37; margin-top: 0; font-size: 18px; border-bottom: 1px solid #374151; padding-bottom: 8px;">
    🏛️ Dan Siam 丹暹典藏永久馆藏历史标本：
  </h3>
  <p style="font-size: 14px; color: #9ca3af; margin-bottom: 16px;">
    本篇文献考据所依托之真实传承文物，悉数收录于 Dan Siam Amulets 永久典藏馆：
  </p>
  <ul style="list-style-type: none; padding-left: 0; margin-bottom: 0; font-size: 14px; line-height: 2;">
    <li>
      • <a href="/product/fan-amulet-eight-immortals-luang-pho-ith-wat-chula-mani-2545-copper" style="color: #d4af37; text-decoration: underline; font-weight: 600;">
        瓦朱拉玛尼寺 龙婆伊 佛历2545年 八仙法扇铜牌 [REF: #1508]
      </a> 
      <span style="color: #cbd5e1;">— 瓦朱拉玛尼寺佛历2545年划时代大典同期督造，与第一期查芭陶威素湾同坛同炉加持之原版珍品。</span>
    </li>
    <li>
      • <a href="/product/thao-wesssuwan-amulet-brooch-silver" style="color: #d4af37; text-decoration: underline; font-weight: 600;">
        陶威素湾天王 92.5%纯银掐丝珐琅护身胸针挂扣 [REF: #1493 / #1500]
      </a> 
      <span style="color: #cbd5e1;">— 传统纯银匠心手作，重现寺院山门天王护法金刚威严法相。</span>
    </li>
    <li>
      • <a href="/product/takroh-pendant-thao-wessuwanna-silver-8g" style="color: #d4af37; text-decoration: underline; font-weight: 600;">
        藤球天王首护身吊坠 92%纯银铸造（重8克） [REF: #1488]
      </a> 
      <span style="color: #cbd5e1;">— 经典法相立体雕铸，融合暹罗避险藤球与天王破煞神威。</span>
    </li>
    <li>
      • <a href="/product/phra-chai-watthana-wat-suthat-2556-samurit-chanuan" style="color: #d4af37; text-decoration: underline; font-weight: 600;">
        瓦苏泰寺 帕猜瓦佛牌 混合山卡拉培老料青铜 [REF: #1502]
      </a> 
      <span style="color: #cbd5e1;">— 承袭全泰第一期陶威素湾铸造祖庭（瓦苏泰寺召坤习·颂大师）之金属冶炼与皇室加持法脉。</span>
    </li>
  </ul>
</div>
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
