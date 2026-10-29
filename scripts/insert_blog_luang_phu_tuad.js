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
<p>ในมิติทางประวัติศาสตร์และโบราณคดีไทย นามของ <strong>“หลวงปู่ทวด”</strong> หรือ <strong>“สมเด็จเจ้าพะโคะ”</strong> มิได้ดำรงอยู่เพียงในฐานะตำนานมุขปาฐะของชาวปักษ์ใต้ หากแต่ปรากฏหลักฐานความเชื่อมโยงในพงศาวดารและบันทึกสมณศักดิ์แห่งกรุงศรีอยุธยา ในรัชสมัยของ <strong>สมเด็จพระเอกาทศรถ (พ.ศ. ๒๑๔๘ – ๒๑๖๓)</strong></p>

<h2>๑. หลักฐานเชิงประวัติศาสตร์และสมณศักดิ์ในราชสำนักอยุธยา</h2>
<p>ตามพงศาวดารเมืองพัทลุงและจดหมายเหตุโบราณ พระมหาเถระผู้มีนามเดิมว่า <strong>ปู</strong> ถือกำเนิด ณ บ้านสวนจันทร์ เมืองสทิงพระ (ปัจจุบันอยู่ในเขต จ.สงขลา) ท่านได้บรรพชาและอุปสมบทเล่าเรียนพระธรรมวินัยจนแตกฉาน ก่อนเดินทางเข้าสู่ราชธานีกรุงศรีอยุธยาเพื่อศึกษาพระปริยัติธรรมชั้นสูง ณ วัดราชานุวาส</p>

<p>ความปรากฏในบันทึกประวัติศาสตร์ระบุว่า ในคราที่ราชสำนักกรุงศรีอยุธยาต้องเผชิญวิกฤตการณ์ทางปัญญาและศาสนธรรม พระมหาเถระปูได้เป็นผู้คลี่คลายปริศนาธรรมคัมภีร์พระอภิธรรม ๘๔,๐๐๐ พระธรรมขันธ์ที่ราชทูตต่างเมืองนำมาประลองปัญญาได้สำเร็จ สมเด็จพระเอกาทศรถจึงทรงพระกรุณาโปรดเกล้าฯ พระราชทานสมณศักดิ์และพัดยศขึ้นเป็น <strong>“พระราชมุนีสามีรามคุณูปรมาจารย์”</strong> ซึ่งถือเป็นสมณศักดิ์ชั้นผู้ใหญ่ในทำเนียบคณะสงฆ์แห่งกรุงศรีอยุธยา ก่อนที่ท่านจะกราบถวายบังคมลาเสด็จกลับมาจำพรรษาเพื่อฟื้นฟูพระพุทธศาสนาในหัวเมืองปักษ์ใต้ ณ วัดพะโคะ</p>

<h2>๒. ภูมิศาสตร์ประวัติศาสตร์เมืองปัตตานีและการสถาปนาวัดช้างให้</h2>
<p>ความเชื่อมโยงระหว่างสมเด็จเจ้าพะโคะและ <strong>วัดราษฎร์บูรณะ (วัดช้างให้)</strong> อ.โคกโพธิ์ จ.ปัตตานี เป็นหมุดหมายสำคัญทางประวัติศาสตร์วัฒนธรรมมลายูและสยาม ในอดีตพื้นที่ปัตตานีเป็นเมืองท่าพหุวัฒนธรรม มีทั้งชาวไทยสยาม ชาวไทยมุสลิม และพ่อค้าชาวจีนอาศัยอยู่ร่วมกัน</p>

<p>ตามตำนานการสร้างวัดช้างให้ พระยาแก้มดำเจ้าเมืองไทรบุรีมีความประสงค์จะสร้างเมืองใหม่ จึงได้ปล่อยช้างมงคลเสี่ยงทาย ช้างได้เดินทางมาหยุดร้อง ณ ป่าดงดิบผืนหนึ่ง พระยาแก้มดำจึงถือเป็นนิมิตหมายในการสร้างวัดขึ้น โดยตั้งชื่อว่า “วัดช้างให้” และได้นิมนต์สมเด็จเจ้าพะโคะในวัยชรามาเป็นมิ่งขวัญและจำพรรษา จนกระทั่งท่านได้ละสังขารลง และได้มีการเก็บรักษาอัฐิธาตุบรรจุไว้ ณ <strong>“สถูปหลวงปู่ทวด”</strong> ริมทางรถไฟวัดช้างให้ ซึ่งกลายเป็นปูชนียสถานศักดิ์สิทธิ์ที่ผู้คนแหลมมลายูเคารพสักการะมาตราบจนปัจจุบัน</p>

<h2>๓. ยุคฟื้นฟูพุทธศิลป์: พระอาจารย์ทิมและเจตนาการสร้างเพื่อการศึกษา</h2>
<p>หลังจากวัดช้างให้รกร้างว่างเว้นการบูรณะมาหลายยุคสมัย จนกระทั่งถึงปี พ.ศ. ๒๔๘๔ <strong>พระครูวิสัยโสภณ (พระอาจารย์ทิม ธมฺมธโร)</strong> ได้เข้ามารับตำแหน่งเจ้าอาวาส สภาพของวัดในเวลานั้นทรุดโทรม อุโบสถเก่าชำรุดเสียหาย และชุมชนขาดแคลนโรงเรียนสำหรับกุลบุตรกุลธิดา</p>

<p>ด้วยจิตมุ่งมั่นในการสืบทอดพระศาสนาและการศึกษา พระอาจารย์ทิมร่วมกับ <strong>นายอนันต์ คณานุรักษ์</strong> คหบดีเมืองปัตตานี จึงได้ดำริจัดสร้างพระเครื่องหลวงปู่ทวดขึ้นเป็นครั้งแรกในประวัติศาสตร์เมื่อปี <strong>พ.ศ. ๒๔๙๗ (เนื้อว่านรุ่นแรก)</strong> โดยมีวัตถุประสงค์บริสุทธิ์เพื่อ:</p>
<ul>
  <li>นำรายได้สมทบทุนสร้างพระอุโบสถวัดช้างให้</li>
  <li>สร้างโรงเรียนประชาบาลสำหรับเด็กในท้องถิ่นปักษ์ใต้</li>
  <li>มอบเป็นเครื่องยึดเหนี่ยวจิตใจแก่ประชาชนและเจ้าหน้าที่ผู้ปฏิบัติงานในพื้นที่ห่างไกล</li>
</ul>

<p>ความสำเร็จในการบูรณะวัดช้างให้นำไปสู่การสถาปนาพระเครื่องโลหะรุ่นต่อมา โดยเฉพาะ <strong>“เหรียญรุ่น ๒ ปี พ.ศ. ๒๕๐๒”</strong> ซึ่งถือเป็นหมุดหมายสำคัญของวงการประติมากรรมเหรียญปั๊มหลังสงครามโลกครั้งที่ ๒</p>

<p><strong>บริบทวัสดุศาสตร์ยุคหลังสงคราม (พ.ศ. ๒๕๐๒):</strong> เหรียญรุ่น ๒ มีการจัดสร้างด้วยเนื้อโลหะทองแดง และเนื้อพิเศษคือ <em>“เนื้ออลูมิเนียมขาปิ่นโต (กะไหล่ทอง)”</em> ซึ่งเป็นวัสดุที่สะท้อนถึงบริบทเศรษฐกิจและอุตสาหกรรมในยุคนั้น โลหะมีน้ำหนักเบา ไม่เป็นสนิม เมื่อนำมาชุบกะไหล่ทองโบราณจึงเกิดวรรณะผิวพรรณสีทองอร่ามที่ทรงคุณค่าทางประวัติศาสตร์โบราณคดีอย่างยิ่ง</p>

<h2>๔. ปรัชญาพุทธคุณ: พุทธานุสติและสติสัมปชัญญะ (มิใช่ไสยศาสตร์)</h2>
<p>ในทัศนะของพุทธปรัชญาและพุทธศาสนิกชนระดับปัญญาชน พุทธคุณด้าน <strong>“แคล้วคลาดนิรันตราย”</strong> ที่เลื่องลือของหลวงปู่ทวด มิได้เกิดจากพลังเวทมนตร์ดลบันดาลที่ขัดต่อหลักอิทัปปัจจยตา หากแต่ทำงานผ่านกลไก <strong>“พุทธานุสติและมรณานุสติ”</strong>:</p>

<ul>
  <li><strong>การระลึกรู้และสติในการดำเนินชีวิต:</strong> เมื่อบุคคลอาราธนาองค์พระติดตัว รูปลักษณ์อันสงบของพระมหาเถระผู้ทรงศีลบริสุทธิ์ ย่อมเป็นเครื่องเตือนสติมิให้ประมาทในการขับขี่ยานพาหนะ การเดินทาง และการปฏิสัมพันธ์กับผู้คน</li>
  <li><strong>เมตตาธรรมค้ำจุนโลกา:</strong> ผู้บูชาที่มีจิตใจเปี่ยมด้วยเมตตาและรักษาศีล ๕ ย่อมไม่พาตนเองเข้าไปในสถานที่อโคจรหรือจุดเสี่ยงภัย จึงส่งผลให้รอดพ้นจากอุบัติเหตุและภยันตรายทั้งปวง สอดคล้องกับพุทธภาษิตที่ว่า <em>“ธมฺโม หเว รกฺขติ ธมฺมจารึ” (ธรรมย่อมรักษาผู้ประพฤติธรรม)</em></li>
</ul>

<h2>๕. บทบาทของพระเครื่องหลวงปู่ทวดในสิงคโปร์และมาเลเซีย</h2>
<p>ชุมชนชาวจีนในคาบสมุทรมลายูมีการเดินทางไปมาหาสู่และทำการค้ากับภาคใต้ของไทยมานานนับศตวรรษ เมื่อเกิดประสบการณ์ความปลอดภัยในการเดินทางข้ามพรมแดน และการค้าขายที่เจริญรุ่งเรืองด้วยอานุภาพแห่งเมตตาธรรม หลวงปู่ทวดจึงกลายเป็นสัญลักษณ์แห่ง <strong>“ความคุ้มครองสูงสุด (Ultimate Life Protection)”</strong> ที่นักธุรกิจและผู้บริหารในสิงคโปร์และมาเลเซียนิยมอาราธนาขึ้นคอเป็นอันดับหนึ่ง</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ พระเครื่องอ้างอิงทางประวัติศาสตร์ในคลังสะสม Dan Siam Heritage Archive:</strong>
  <p style="margin: 0 0 6px;">• <a href="/product/coin-luang-phu-tuad-wat-chang-hai-edition-2-2502-mai-malay-aluminium" style="color: #d4af37; text-decoration: underline;">เหรียญไข่ปลาใหญ่ หลวงปู่ทวด วัดช้างให้ รุ่น ๒ ปี ๒๕๐๒ บล็อกไม้มลาย กะไหล่ทอง (REF: #38)</a> — ตัวอย่างชิ้นเอกเนื้ออลูมิเนียมกะไหล่ทอง สภาพสมบูรณ์คงความดั้งเดิม</p>
  <p style="margin: 0;">• <a href="/product/luang-pu-tuat-pim-phra-rod-five-kings-b-e-2542" style="color: #d4af37; text-decoration: underline;">หลวงปู่ทวด พิมพ์พระรอด รุ่นพระเจ้า ๕ พระองค์ ปี ๒๕๔๒ หลวงปู่หมุน วัดบ้านจาน ปลุกเสก (REF: #37)</a> — สายวิชาวาจาสิทธิ์แดนอีสานผสานบารมีสมเด็จเจ้าพะโคะ</p>
</div>
` + COPYRIGHT_HTML;

const EN_CONTENT = `
<p>In the academic study of Thai numismatics and Buddhist history, <strong>Luang Phu Tuad</strong> (historically entitled <em>Somdej Chao Phะ Koh</em>) is far more than a folk legend of Southern Thailand. His life is corroborated by historical records and monastic appointment rolls dating back to the Ayutthaya Kingdom during the reign of <strong>King Ekathotsarot (reigned 1605–1620 C.E.)</strong>.</p>

<h2>1. Historical Documentation in the Royal Ayutthayan Chronicles</h2>
<p>According to royal chronicles and provincial records of Phatthalung and Songkhla, the monk originally named <strong>Pu</strong> was born in Sathing Phra. Demonstrating exceptional mastery over the Vinaya (monastic discipline) and Tipitaka, he journeyed to the royal capital of Ayutthaya to reside and pursue advanced scriptural studies at Wat Rachanuwat.</p>

<p>Historical annals record that during a significant theological challenge posed by foreign ambassadors regarding the translation of the 84,000 chapters of the Abhidhamma scriptures, Venerable Pu successfully resolved the sacred doctrinal puzzles. In royal recognition of his wisdom and spiritual virtue, King Ekathotsarot conferred upon him the ecclesiastical title of <strong>"Somdej Phra Rajamuni Samiramaguna"</strong>, one of the highest monastic honors in the kingdom, before the venerable elder returned to restore Buddhist institutions in Southern Thailand.</p>

<h2>2. The Cultural Geography of Pattani and Wat Chang Hai</h2>
<p>The historical bond between Luang Phu Tuad and <strong>Wat Rat Burana (Wat Chang Hai)</strong> in Khok Pho District, Pattani, serves as a vital cross-cultural heritage nexus between Siam and the Malay Peninsula.</p>

<p>Local historical accounts indicate that after years of wandering as an ascetic forest monk (Dhutanga), Luang Phu Tuad was invited by the ruler of Sai Buri to establish spiritual residence at Wat Chang Hai. Upon his peaceful attainment of Parinirvana, his holy relics were enshrined within the <strong>Cetiya Stupa of Wat Chang Hai</strong>, adjacent to the railway line, establishing the temple as a paramount pilgrimage sanctuary revered across Thailand, Malaysia, and Singapore for centuries.</p>

<h2>3. The Mid-20th Century Renaissance: Phra Ajahn Tim's Noble Purpose</h2>
<p>Following periods of neglect, Wat Chang Hai was revived in 1941 when <strong>Phra Kru Wisaisophon (Phra Ajahn Tim Dhammatharo)</strong> assumed the abbotship. Confronted with dilapidated buildings and impoverished local children lacking schooling, Ajahn Tim partnered with prominent local philanthropist <strong>Khun Anan Khananurak</strong> to cast the historic inaugural <strong>B.E. 2497 (1954) holy powder edition</strong>.</p>

<p>The consecration had strictly philanthropic objectives:</p>
<ul>
  <li>Funding the construction of the main Ordination Hall (Ubosot) of Wat Chang Hai.</li>
  <li>Building public schools for local underprivileged youth.</li>
  <li>Providing spiritual solace and mindfulness to public servants working in frontier territories.</li>
</ul>

<p>Following this monumental restoration, Ajahn Tim initiated the commemorative metallic editions, notably the <strong>Edition 2 Coin of B.E. 2502 (1959)</strong>:</p>
<p><strong>Post-War Metallurgy Context:</strong> In addition to copper, the 2502 edition utilized historical lightweight food-container aluminium with vintage gold electroplating. Resilient against oxidation, this specific metallurgical specimen provides collectors today with an irreplaceable artifact reflecting mid-century Thai post-war manufacturing history.</p>

<h2>4. Theological Perspective: Mindfulness Over Superstition</h2>
<p>In Theravada Buddhist philosophy, the legendary reputation of Luang Phu Tuad amulets for <strong>"Klaew Klad" (Safe Journeys and Accident Protection)</strong> does not stem from fatalistic sorcery. Instead, it operates on the foundational Buddhist principle of <strong>Buddhanussati (Mindful Contemplation of the Enlightened)</strong>:</p>

<ul>
  <li><strong>Awakened Vigilance:</strong> When wearing a consecrated representation of a moral master, the devotee is constantly reminded of moral restraint, sobriety, and conscious awareness during travel.</li>
  <li><strong>The Law of Kamma:</strong> As proclaimed in the Buddhist scriptures: <em>"Dhammo have rakkhati dhammacarim"</em> (The Dhamma protects those who live righteously). Devotees imbued with loving-kindness (Metta) naturally avoid perilous circumstances.</li>
</ul>

<h2>5. Why Singapore & Malaysian Collectors Venerate Luang Phu Tuad</h2>
<p>Maritime merchants and ethnic Chinese communities across the Malay Peninsula have traded with Southern Thailand for centuries. Experiencing repeated safe travels across maritime borders and flourishing businesses grounded in ethical merit, Luang Phu Tuad emerged as the foremost talisman for <strong>"Ultimate Life Protection"</strong> and executive peace of mind across Singapore, Kuala Lumpur, and Penang.</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Certified Archival Specimens in the Dan Siam Permanent Collection:</strong>
  <p style="margin: 0 0 6px;">• <a href="/product/coin-luang-phu-tuad-wat-chang-hai-edition-2-2502-mai-malay-aluminium" style="color: #d4af37; text-decoration: underline;">Luang Phu Tuad Wat Chang Hai Coin Edition 2 B.E. 2502 (Mai Malay Block, Gilt Aluminium) [REF: #38]</a></p>
  <p style="margin: 0;">• <a href="/product/luang-pu-tuat-pim-phra-rod-five-kings-b-e-2542" style="color: #d4af37; text-decoration: underline;">Luang Phu Tuad Pim Phra Rod 5 Kings B.E. 2542 Blessed by Luang Pu Moon Wat Ban Jan [REF: #37]</a></p>
</div>
` + COPYRIGHT_HTML;

const ZH_CONTENT = `
<p>在泰国佛教历史学与古董文物学的严谨学术视角下，<strong>龙婆托（Luang Phu Tuad）</strong>，亦称“帕阔圣僧”（Somdej Chao Phะ Koh），绝非虚构的民间神话人物，而是确切见载于大城王朝（阿瑜陀耶）官方僧职册籍的历史高僧。其生平与<strong>阿瑜陀耶国王厄迦陀沙律（King Ekathotsarot，公元1605–1620年在位）</strong>时代有着密切文献关联。</p>

<h2>一、阿瑜陀耶王朝历史文献中的真实僧衔考据</h2>
<p>根据博他仑与宋卡府编年史载，尊者早年出家并精研南传律藏与三藏经义，随后北上进入王朝都城阿瑜陀耶，于皇室寺庙深入研究高阶阿毗达摩。在朝廷应对外国使节关于深奥经义考辨的重大历史事件中，尊者以深邃的佛教法相之智圆满释惑。国王特赐最高僧职称号——<strong>“颂德帕拉差慕尼·萨米拉玛古纳”</strong>（Somdej Phra Rajamuni Samiramaguna）。此一御赐僧衔确立了其在古代暹罗僧伽体制中的极崇高历史地位。</p>

<h2>二、北大年地理沿革与瓦沧海寺之源流</h2>
<p>龙婆托尊者与北大年府<strong>瓦沧海寺（Wat Chang Hai）</strong>的历史结缘，是暹罗与马来半岛跨文化佛教传承的重要见证。据地方史料记载，尊者晚年受赛武里城主祈请驻锡于此地弘化。圆寂后，其神圣舍利被迎请安奉于瓦沧海寺的古老佛塔（Stupa）之内。数百年间，该圣塔一直是新马泰信众朝圣祈福的心灵殿堂。</p>

<h2>三、佛历25世纪中叶的复兴：阿赞添督造圣物的崇高初衷</h2>
<p>瓦沧海寺在近代历经岁月洗礼。直至佛历2484年（公元1941年），一代宗师<strong>帕库威赛索蓬（阿赞添 / Phra Ajahn Tim）</strong>出任住持。面对残破的寺宇及当地贫寒子弟缺乏教育的困境，阿赞添大师携手地方绅士安南先生，于<strong>佛历2497年（1954年）</strong>首度开光督造龙婆托草药粉牌。</p>

<p>其督造初衷极为清净纯正：</p>
<ul>
  <li>筹措善款以建设瓦沧海大雄宝殿。</li>
  <li>创立地方公立学校，资助边疆贫困儿童接受现代教育。</li>
  <li>护佑地方守法民众与行旅者行车平安，远离祸端。</li>
</ul>

<p>此后，大师于<strong>佛历2502年（1959年）</strong>督造了享誉海内外的第二期金属模币（Edition 2）：</p>
<p><strong>二战后特殊的金属冶炼背景：</strong> 2502年二期硬币除了红铜材质外，特别采用了二战后具有时代特征的铝合金镀金材质（Aluminium Gold Plated）。质地轻盈、历久不腐，成为了现当代南传佛牌文物收藏中具有高度历史标本价值的传世典范。</p>

<h2>四、佛教哲理释义：正念觉知胜于宿命迷信</h2>
<p>在正统南传上座部佛教哲理中，龙婆托圣物所广为人知的“避险平安”力量，并非巫术或违背因果法则的超自然神秘主义，而是根植于<strong>佛随念（Buddhanussati）</strong>与<strong>正念觉知（Sati）</strong>的深沉修行：</p>

<ul>
  <li>佩戴清净具德高僧的法相，令行者时刻警醒自身持守五戒，戒除酒驾、狂躁与轻慢心。</li>
  <li>佛经云：“法随行者，法护其人。”常怀慈悲者自然远离是非险地，此乃真正的平安庇护之道。</li>
</ul>

<h2>五、为何新马两地藏家对龙婆托推崇备至</h2>
<p>历史上，马来半岛华人商贾与泰国南部通商往来频繁。无数往来于边境贸易的海陆行者，因感应龙婆托圣僧的慈悲护持而化险为夷、商旅亨通。龙婆托因此被誉为<strong>“至高生命护佑之相”</strong>，成为了新加坡与马来西亚企业家及高阶管理者随身首选圣物。</p>

<div style="background: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 18px; border-radius: 6px; margin: 28px 0;">
  <strong style="color: #d4af37; display: block; margin-bottom: 8px;">🏛️ Dan Siam 典藏永久馆藏历史标本：</strong>
  <p style="margin: 0 0 6px;">• <a href="/product/coin-luang-phu-tuad-wat-chang-hai-edition-2-2502-mai-malay-aluminium" style="color: #d4af37; text-decoration: underline;">瓦沧海寺 龙婆托 二期 佛历2502年 铝合金镀金版（Mai Malay模）[REF: #38]</a></p>
  <p style="margin: 0;">• <a href="/product/luang-pu-tuat-pim-phra-rod-five-kings-b-e-2542" style="color: #d4af37; text-decoration: underline;">龙婆托 帕洛模 佛历2542年 龙婆满加持 五佛圣粉版 [REF: #37]</a></p>
</div>
` + COPYRIGHT_HTML;

async function run() {
  const slug = 'historical-chronicle-luang-phu-tuad-wat-chang-hai-consecrations';
  
  // Check if exists
  const { data: existing } = await supabase.from('blog_posts').select('id').eq('slug', slug).single();

  const payload = {
    slug,
    category: 'ประวัติศาสตร์พระเครื่อง',
    cover_image: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1778936343216-y4sd9xkhevf.webp',
    published: true,

    title: 'The Historical Chronicle of Luang Phu Tuad: Monastic Lineage, Ayutthaya Chronicles, and the Wat Chang Hai Consecrations of Phra Ajahn Tim',
    title_th: 'พงศาวดารประวัติศาสตร์หลวงปู่ทวด: สายสมณศักดิ์กรุงศรีอยุธยา วรรณกรรมท้องถิ่นปักษ์ใต้ และบันทึกการสถาปนาพระเครื่องวัดช้างให้ของพระอาจารย์ทิม',
    title_zh: '龙婆托的历史文献考证：阿瑜陀耶僧职传承、泰国南部佛教编年史与瓦沧海阿赞添督造圣物纪略',

    excerpt: 'An academic chronicle exploring the historical documentation of Somdej Phra Rajamuni Samiramaguna (Luang Phu Tuad) in Ayutthaya court records, the geography of Wat Chang Hai, and the historic mid-century consecrations of Phra Ajahn Tim.',
    excerpt_th: 'งานวิจัยประวัติศาสตร์เจาะลึกหลักฐานทางโบราณคดีและทำเนียบสมณศักดิ์อยุธยาของสมเด็จพระราชมุนีสามีรามคุณูปรมาจารย์ (หลวงปู่ทวด) ภูมิศาสตร์วัดช้างให้ และบันทึกการสถาปนาพระเครื่องยุคพระอาจารย์ทิม',
    excerpt_zh: '基于阿瑜陀耶王朝文献、泰国南部佛教编年史与大成府历史考证，系统解析龙婆托（瓦沧海）僧职传承、圣塔源流及阿赞添大师督造圣物的学术专著。',

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
