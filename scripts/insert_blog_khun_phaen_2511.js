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

const TH_CONTENT = `
<p>ในหมู่นักวิชาการโบราณคดีและประวัติศาสตร์ศิลปะไทย พระเครื่องที่วงการพระเรียกขานกันทั่วไปว่า <strong>“พระขุนแผน”</strong> แท้จริงแล้วมิได้ถูกสร้างขึ้นเพื่อเป็นตัวแทนของตัวละคร “ขุนแผน” ในวรรณคดีพื้นบ้าน หากแต่เป็น <strong>“พระพุทธปฏิมาปางมารวิชัยประทับในซุ้มเรือนแก้ว”</strong> ที่สถาปนาขึ้นในบริบทแห่งชัยชนะและศานติธรรมของแผ่นดินสยาม</p>

<h2>๑. กำเนิดทางโบราณคดี: พุทธปฏิมาปางมารวิชัยแห่งรัชสมัยสมเด็จพระนเรศวร</h2>
<p>จุดกำเนิดแรกเริ่มปรากฏขึ้น ณ <strong>วัดใหญ่ชัยมงคล (เดิมชื่อวัดป่าแก้ว) จ.พระนครศรีอยุธยา</strong> สร้างขึ้นในรัชสมัย <strong>สมเด็จพระนเรศวรมหาราช</strong> ภายหลังสงครามยุทธหัตถี (พ.ศ. ๒๑๓๕) เพื่อเฉลิมพระเกียรติยศและเป็นพุทธบูชา เจตนาในการบรรจุกรุพระพิมพ์นี้คือการสืบทอดอายุพระพุทธศาสนาตามคติโบราณ ต่อมาเมื่อมีการเปิดกรุในยุคหลัง พุทธลักษณะขององค์พระที่มีทรวดทรงอกผาย ผึ่งผาย สง่างาม และมีพุทธคุณโดดเด่นด้านผู้นำและเมตตามหานิยม ชาวบ้านจึงได้นำไปเปรียบเปรยกับบุคลิกของยอดขุนพลในวรรณกรรมท้องถิ่น จนกลายมาเป็นชื่อเรียกสากลในปัจจุบัน</p>

<h2>๒. เภสัชเวทโบราณและพฤกษศาสตร์ศักดิ์สิทธิ์ (ศาสตร์แห่งว่านยา ๑๐๘)</h2>
<p>เอกลักษณ์สำคัญของพระขุนแผนยุคโบราณคือการผสมผสานศาสตร์แห่ง <strong>“พุทธศาสตร์”</strong> และ <strong>“เภสัชเวท (คัมภีร์แพทย์แผนไทย)”</strong> เข้าด้วยกันอย่างประณีต</p>

<p>ตามตำราสมุดข่อยโบราณ มวลสารหลักในการสร้างพระเนื้อผงมิได้ใช้เพียงปูนเปลือกหอย หากแต่เป็นการรวบรวม <strong>“ว่านยา ๑๐๘ ชนิด”</strong> ซึ่งคัดสรรจากพืชสมุนไพรที่มีสรรพคุณทางยาและมีคุณลักษณะทางนามธรรมตามหลักธรรมชาติวิทยา เช่น ว่านเสน่ห์จันทร์, ว่านนางคุ้ม, ว่านเพชรหลีก และที่สำคัญที่สุดคือ <strong>“ว่านสบู่เลือด” (Stephania venosa)</strong></p>

<p><strong>คุณลักษณะของว่านสบู่เลือด:</strong> เป็นพืชตระกูลสบู่เลือดที่มีน้ำยางสีแดงชาดคล้ายโลหิต ในคัมภีร์เภสัชศาสตร์โบราณถือเป็นยอดสมุนไพรบำรุงกำลัง ปรับธาตุ และคงทนต่อโรคภัยไข้เจ็บ เมื่อนำมาบดผสมกับผงพุทธคุณ (ผงอิทธิเจ ผงปถมัง) ยางว่านจะทำปฏิกิริยากับอากาศ เกิดเป็นวรรณะเนื้อพระสีน้ำตาลอมแดงเรื่อๆ ที่มีความหนึกนุ่มและแห้งแกร่งตามธรรมชาติ</p>

<h2>๓. บันทึกจดหมายเหตุพิธีเสด็จกลับ วันที่ ๘ กุมภาพันธ์ พ.ศ. ๒๕๑๑ ณ วัดถ้ำเขาเงิน</h2>
<p>หนึ่งในหมุดหมายสำคัญทางประวัติศาสตร์การสร้างพระเครื่องเนื้อว่านยาในยุคกึ่งพุทธกาล คือการบันทึกจัดสร้าง <strong>พระขุนแผน พิธีเสด็จกลับ ปี พ.ศ. ๒๕๑๑ ณ วัดถ้ำเขาเงิน อ.หลังสวน จ.ชุมพร</strong> เมื่อวันที่ ๘ กุมภาพันธ์ ๒๕๑๑</p>

<p>พิธีกรรมครั้งนี้เป็นการรวบรวมบูรพาจารย์สาย <strong>สำนักตักศิลาเขาอ้อ จ.พัทลุง</strong> ซึ่งเป็นตักศิลาความรู้ทางพุทธาคมและการแพทย์โบราณที่เก่าแก่ที่สุดของแหลมมลายู โดยมี <strong>พล.ต.ต. ขุนพันธรักษ์ราชเดช</strong> เป็นประธานฝ่ายจัดสร้าง ร่วมกับพระเกจิคณาจารย์และฆราวาสชั้นครู:</p>
<ul>
  <li><strong>พระอาจารย์นำ ชินวโร (วัดดอนศาลา จ.พัทลุง):</strong> พระมหาเถระผู้เชี่ยวชาญพระเวทและการเจริญสมาธิภาวนา</li>
  <li><strong>พระอาจารย์ปาล ปาลธมฺโม (วัดเขาอ้อ):</strong> ปรมาจารย์ผู้สืบทอดสายวิชาตักศิลาเขาอ้อโดยตรง</li>
  <li><strong>หลวงพ่อคง (วัดบ้านสวน):</strong> พระเกจิอาจารย์ผู้ทรงวิทยาคมสูงยิ่งแห่งเมืองพัทลุง</li>
  <li><strong>หลวงปู่หมุน (วัดเขาแดงตะวันออก):</strong> พระสุปฏิปันโนผู้ทรงญาณสมาบัติ</li>
  <li><strong>หลวงพ่อคล้อย ฐานธมฺโม (เจ้าอาวาสวัดถ้ำเขาเงิน):</strong> พระเถราจารย์เจ้าสำนักผู้เปี่ยมด้วยตบะบารมี</li>
  <li><strong>อาจารย์ชุม ไชยคีรี:</strong> ฆราวาสผู้ประกอบพิธีอัญเชิญวิญญาณและธาตุตามคัมภีร์โบราณ</li>
</ul>

<p><strong>ความหมายเชิงประวัติศาสตร์ของ “พิธีเสด็จกลับ”:</strong> ในบันทึกจดหมายเหตุ พิธีเสด็จกลับถูกออกแบบขึ้นตามคติโบราณเพื่อพิสูจน์ความบริสุทธิ์ของจิตตานุภาพ โดยมีการนำพระเครื่องส่วนหนึ่งไปทำพิธีอธิษฐานจิต ณ ชายฝั่งทะเลบริเวณปากน้ำหลังสวน และกำหนดจิตอัญเชิญให้พระเครื่องเสด็จกลับมายังมณฑลพิธีในถ้ำเขาเงิน ถือเป็นสัญลักษณ์แห่ง <strong>“การนำพาสิ่งดีงาม ความสุข โชคลาภ และความเจริญรุ่งเรืองที่พลัดพราก ให้หวนคืนกลับมาสู่ชีวิตของผู้บูชา”</strong></p>

<h2>๔. มิติทางจิตวิทยาและเมตตามหานิยม (มิใช่อาคมครอบงำ)</h2>
<p>ในทัศนะวิชาการ พุทธคุณด้าน <strong>“เมตตามหานิยมและมหาเสน่ห์”</strong> ของพระขุนแผน มิใช่ไสยศาสตร์มนต์ดำเพื่อการลุ่มหลงมัวเมา หากแต่ตั้งอยู่บนหลัก <strong>“พรหมวิหาร ๔” (เมตตา กรุณา มุทิตา อุเบกขา)</strong>:</p>

<ul>
  <li><strong>จิตวิทยาการเจรจาและการค้า:</strong> บุคคลที่มีสติสัมปชัญญะและระลึกถึงพระพุทธคุณ ย่อมเปล่งรอยยิ้ม วาจาไพเราะ (ปิยวาจา) และมีความจริงใจต่อคู่ค้า ส่งผลให้เกิดความไว้วางใจในการทำธุรกิจและการเจรจาปิดการขาย</li>
  <li><strong>สนามพลังแห่งความสงบ:</strong> การเจริญเมตตาจิตย่อมแผ่คลื่นความสงบระงับความขัดแย้ง ช่วยให้การประสานงานและการเจรจาคลี่คลายไปในทางสันติ</li>
</ul>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ พระเครื่องอ้างอิงทางประวัติศาสตร์ในคลัง Dan Siam Heritage Archive:</strong>
  <p style="margin: 0 0 6px;">• <a href="/product/phra-khun-phan-phithi-setyad-klap-2511-wat-tham-khao-ngen" style="color: #d4af37; text-decoration: underline;">พระขุนแผน พิธีเสด็จกลับ ปี ๒๕๑๑ วัดถ้ำเขาเงิน จ.ชุมพร พิมพ์ใหญ่ เนื้อผงว่านสบู่เลือด (REF: #42)</a> — สภาพเดิมสมบูรณ์ ผิวพรรณเนื้อว่านสบู่เลือดหลังเรียบ</p>
  <p style="margin: 0;">• <a href="/product/khun-paen-puttha-kwak-lp-tae-2503" style="color: #d4af37; text-decoration: underline;">พระขุนแผน พุทธกวัก หลวงพ่อเต๋ คงทอง วัดสามง่าม ปี ๒๕๐๓ (REF: #1736)</a> — บูรพาจารย์แห่งเมตตามหาลาภและกุมารทองแดนสยาม</p>
</div>
` + COPYRIGHT_HTML;

const EN_CONTENT = `
<p>In classical Thai archaeology, the iconic amulet category known popularly as <strong>Phra Khun Phaen</strong> originated not as a tribute to folkloric romance, but as sacred <strong>Maravijaya Buddha votive tablets enclosed within an ornamental arch (Suam Ruean Kaew)</strong>. Consecrated as emblems of national sovereignty and peace, their historical lineage represents a pinnacle of Theravada sacred art.</p>

<h2>1. Archaeological Foundations: King Naresuan's Victory Tablets</h2>
<p>The historical archetype emerged from <strong>Wat Yai Chai Mongkhon (originally Wat Pa Kaeo)</strong> in the royal capital of Ayutthaya. Commissioned during the reign of <strong>King Naresuan the Great</strong> following the historic victory in the Elephant Duel of B.E. 2135 (1592 C.E.), these tablets commemorated national peace and preserved the Buddha Sasana. When opened centuries later, the stately, broad-chested posture of the Buddha tablets inspired local devotees to affectionately designate them after the heroic general of Thai folklore, creating the enduring modern terminology.</p>

<h2>2. Sacred Botanical Pharmacopeia (Wan Ya 108)</h2>
<p>Ancient monastic formulas harmonized Buddhist metaphysics with indigenous botanical medicine. Compounding over 108 species of wild sanctified herbs, special emphasis was placed on <strong>Wan Saboo Luead (Stephania venosa)</strong>, a sacred medicinal vine celebrated for invigorating vitality and resilience.</p>

<p><strong>The Nature of Saboo Luead:</strong> Yielding a natural vermilion-hued resin, traditional apothecaries considered it an exceptional natural tonic. When pulverized with sacred chalk powders (Pong Itthije and Pathamang), the herbal resin naturally oxidized over decades into a rich, supple reddish-brown patina beloved by serious numismatists.</p>

<h2>3. The Historic B.E. 2511 "Sedet Klab" Consecration at Wat Tham Khao Ngen</h2>
<p>On <strong>February 8, B.E. 2511 (1968)</strong>, a historic assembly convened at <strong>Wat Tham Khao Ngen</strong> in Lang Suan, Chumphon, uniting the paramount masters of the legendary <strong>Wat Khao Or Southern lineage</strong>. Presided over by <strong>Police Major General Khun Phantharak Ratchadet</strong>, the ceremony brought together:</p>

<ul>
  <li><strong>Venerable Arjan Nam Chinawaro (Wat Don Sala, Phatthalung):</strong> Renowned meditative master of Southern Thailand.</li>
  <li><strong>Phra Arjan Pal Palthammo (Wat Khao Or):</strong> Grandmaster of the ancient Khao Or monastic academy.</li>
  <li><strong>Luang Pho Khong (Wat Ban Suan):</strong> Eminent master celebrated for protective esoteric incantations.</li>
  <li><strong>Luang Pu Moon (Wat Khao Daeng Tawantok):</strong> Pure ascetic monk of extraordinary meditative absorption.</li>
  <li><strong>Luang Pho Khloy Thanthammo (Abbot of Wat Tham Khao Ngen):</strong> Venerable monastic host of Chumphon.</li>
  <li><strong>Master Arjan Chum Chaikiri:</strong> Sacred lay-practitioner executing the canonical invocations.</li>
</ul>

<p><strong>The Canonical Significance of "Sedet Klab":</strong> Recorded in contemporary annals, the "Sedet Klab" (Sacred Return) ceremony symbolized spiritual restoration. A portion of consecrated amulets was ritually cast into the sea at Pak Nam Lang Suan and, through unified meditative resolve, summoned back to the cave altar. In Buddhist symbolism, this represents <strong>"the return of lost prosperity, fractured fortune, and departed happiness back into the life of the bearer."</strong></p>

<h2>4. The Ethics of Metta: Goodwill Over Superstition</h2>
<p>In Buddhist psychology, <strong>Metta Mahaniyom (Benevolent Charisma)</strong> is founded upon the Four Sublime States (Brahmavihara): loving-kindness, compassion, empathetic joy, and equanimity:</p>

<ul>
  <li><strong>Commercial Psychology & Diplomacy:</strong> A devotee anchored in mindfulness naturally radiates warmth, gentle speech (Piyavaja), and ethical transparency, earning genuine trust in corporate negotiation and closing transactions.</li>
  <li><strong>Harmonizing Field:</strong> Cultivating loving-kindness dissolves interpersonal enmity, steering negotiations toward equitable peace.</li>
</ul>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Certified Archival Specimens in the Dan Siam Permanent Collection:</strong>
  <p style="margin: 0 0 6px;">• <a href="/product/phra-khun-phan-phithi-setyad-klap-2511-wat-tham-khao-ngen" style="color: #d4af37; text-decoration: underline;">Phra Khun Phaen Sedet Klab B.E. 2511 Wat Tham Khao Ngen (Pim Yai, Sacred Wan Saboo Luead) [REF: #42]</a></p>
  <p style="margin: 0;">• <a href="/product/khun-paen-puttha-kwak-lp-tae-2503" style="color: #d4af37; text-decoration: underline;">Phra Khun Phaen Puttha Kwak Luang Pho Tae Wat Sam Ngam B.E. 2503 [REF: #1736]</a></p>
</div>
` + COPYRIGHT_HTML;

const ZH_CONTENT = `
<p>在泰国考古学与古代佛学艺术体系中，“坤平佛”并非民间文学中之情缘附会，其学术本质实为<strong>降魔印佛陀坐像背依琉璃殿檐法相</strong>。作为暹罗国家主权与和平的庄严法相，其历史传承代表了上座部佛教神圣艺术的崇高殿堂。</p>

<h2>一、考古学考据：纳黎萱大帝凯旋纪念佛砖</h2>
<p>其历史源头可确凿追溯至阿瑜陀耶大城府的<strong>瓦艾猜蒙坤寺（Wat Yai Chai Mongkhon，原名瓦帕叫）</strong>地下古窖藏。该期圣物由暹罗一代英雄<strong>纳黎萱大帝（King Naresuan）</strong>于公元1592年（佛历2135年）象战大捷后御旨督造，旨在祈愿国泰民安与佛法恒久长存。后世开窖时，见佛陀坐姿宽厚雄健、庄严圆满，民间信众遂借用古典文学中盖世英雄“坤平”之名尊称之，流传至今。</p>

<h2>二、古代本草医药学与百零八种圣草药配伍</h2>
<p>古典坤平佛牌的督造体系完美融合了上座部佛教密教仪轨与古暹罗草药学。其核心配方由一百零八种深山圣草汇炼而成，尤以<strong>红草药血山乌龟（Stephania venosa / 俗称红血皂草）</strong>为最贵重原料。</p>

<p><strong>红血皂草之物性：</strong> 此天然药草汁液如丹血，在古代本草中被视为益气固本、强身御邪之圣品。将其研磨与纯净经粉（伊提皆粉、巴塔芒粉）融合，历经数十载自然陈化，形成色泽温润凝重的红褐色包浆，为资深佛牌文物藏家所推崇。</p>

<h2>三、佛历2511年瓦探考恩寺“神迹回流法会”历史文献</h2>
<p>佛历2511年（公元1968年）2月8日，泰国南部<strong>考奥法脉（Khao Or）</strong>的三位杰出宗师齐聚春蓬府瓦探考恩寺。由一代传奇警长<strong>坤潘他拉叻差德（Khun Phantharak Ratchadet）</strong>担任督造主席，汇聚一代泰南名宿：</p>

<ul>
  <li><strong>阿赞南大师（瓦东萨拉，博他仑府）：</strong> 泰南极负盛名之禅定高僧。</li>
  <li><strong>帕阿赞班大师（考奥寺）：</strong> 古老考奥佛法学院之传承法统。</li>
  <li><strong>龙婆空大师（瓦班算）：</strong> 经文密法造诣极深之尊长。</li>
  <li><strong>龙婆满大师（瓦考登达湾多）：</strong> 戒行高洁之得道圣僧。</li>
  <li><strong>龙婆科大师（瓦探考恩住持）：</strong> 春蓬府德高望重之一代名僧。</li>
  <li><strong>阿赞春柴奇里尊长：</strong> 依循古籍主理神圣仪轨之大居士。</li>
</ul>

<p><strong>“回流”（Sedet Klab）的历史文化象征：</strong> 据文献详实记载，法会将部分佛牌迎至春蓬朗逊出海口投向大海，在全场宗师纯净禅定力的祝祷感召下，佛牌奇迹般地重归洞窟坛场。此一神圣仪轨在佛学象征体系中代表着：<strong>“召回散失之福运、圆融离散之吉缘、使受挫的人生重获新生与繁荣。”</strong></p>

<h2>四、慈悲力量的现代佛教诠释：以爱语与正念成就商业信誉</h2>
<p>在佛学正统观照下，“人缘慈悲”（Metta Mahaniyom）的实质是以《四无量心》中的“慈心”待人接物：</p>

<ul>
  <li><strong>商业谈判与心理学：</strong> 佩戴者常怀善念、正知正见，自然流露温和笑容与和悦爱语（Piyavaja），令合作伙伴与客户产生由衷的商业信赖。</li>
  <li><strong>化解对立的祥和气场：</strong> 慈心所向，自然平息人际纷争与敌意，促成双赢和谐的商贸合作。</li>
</ul>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Dan Siam 典藏永久馆藏历史标本：</strong>
  <p style="margin: 0 0 6px;">• <a href="/product/phra-khun-phan-phithi-setyad-klap-2511-wat-tham-khao-ngen" style="color: #d4af37; text-decoration: underline;">瓦探考恩寺 坤平佛 佛历2511年“回流法会”大模 红草药圣粉版 [REF: #42]</a></p>
  <p style="margin: 0;">• <a href="/product/khun-paen-puttha-kwak-lp-tae-2503" style="color: #d4af37; text-decoration: underline;">龙婆爹 瓦三暗寺 佛历2503年 佛招财招人缘 坤平佛 [REF: #1736]</a></p>
</div>
` + COPYRIGHT_HTML;

async function run() {
  const slug = 'history-phra-khun-phaen-ayutthaya-wat-tham-khao-ngen-2511';
  
  const { data: existing } = await supabase.from('blog_posts').select('id').eq('slug', slug).single();

  const payload = {
    slug,
    category: 'ประวัติศาสตร์พระเครื่อง',
    cover_image: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1779000677830-41cujiibgn.jpg',
    published: true,

    title: 'The Canonical Archetype of Phra Khun Phaen: From Ayutthaya Votive Tablets to the B.E. 2511 Wat Tham Khao Ngen Southern Consecration',
    title_th: 'วิวัฒนาการเชิงประวัติศาสตร์ของพระขุนแผน: จากพระพุทธพิมพ์กรุวัดใหญ่ชัยมงคล สู่บันทึกพิธีเสด็จกลับ ปี ๒๕๑๑ วัดถ้ำเขาเงิน',
    title_zh: '坤平佛的历史源流与演变：从阿瑜陀耶大城府瓦艾猜蒙坤出土佛牌到佛历2511年瓦探考恩南方大法会文献详述',

    excerpt: 'A scholarly examination tracing the origins of Phra Khun Phaen from King Naresuan’s Ayutthayan victory tablets to the historic B.E. 2511 Sedet Klab ceremony at Wat Tham Khao Ngen, exploring sacred botany and the ethics of Metta.',
    excerpt_th: 'งานวิจัยประวัติศาสตร์ย้อนรอยกำเนิดพระขุนแผนจากพระพิมพ์ชัยชนะยุคสมเด็จพระนเรศวร สู่จดหมายเหตุพิธีเสด็จกลับ ปี ๒๕๑๑ วัดถ้ำเขาเงิน วิเคราะห์เภสัชเวทว่านสบู่เลือด และปรัชญาเมตตามหานิยม',
    excerpt_zh: '系统考据坤平佛从阿瑜陀耶大捷纪念圣砖到佛历2511年瓦探考恩寺神迹回流法会之历史演变，深入解析百零八种圣草药配伍与正统慈悲人缘佛理。',

    content: EN_CONTENT,
    content_th: TH_CONTENT,
    content_zh: ZH_CONTENT,
    views: 1
  };

  if (existing) {
    const { data, error } = await supabase.from('blog_posts').update(payload).eq('id', existing.id).select();
    if (error) throw error;
    console.log('✓ Successfully updated blog post:', data[0].id);
  } else {
    const { data, error } = await supabase.from('blog_posts').insert(payload).select();
    if (error) throw error;
    console.log('✓ Successfully inserted new blog post:', data[0].id);
  }
}

run().catch(console.error);
