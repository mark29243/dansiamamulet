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

const CONTENT_TH = `
<p>ในประวัติศาสตร์พุทธศิลป์และมหาคัมภีร์พุทธาคมแห่งกรุงศรีอยุธยา ไม่มีวัตถุมงคลพิมพ์ใดที่จะเปี่ยมล้นด้วยนัยปรัชญาและประติมานวิทยาอันลึกซึ้งเทียบเท่า <strong>“พระพิมพ์โปรดปัญจวัคคีย์และพระเหนือพรหม”</strong> แห่ง <strong>วัดสะแก อำเภออุทัย จังหวัดพระนครศรีอยุธยา</strong> ซึ่งสถาปนาขึ้นโดย <strong>พระคุณเจ้าหลวงปู่ดู่ พรหมปัญโญ (พ.ศ. ๒๔๔๗ – ๒๕๓๓)</strong> พระมหาเถราจารย์ผู้ได้รับการยกย่องว่าเปรียบประดุจพระโพธิสัตว์ผู้ทรงบารมีธรรมอันหาประมาณมิได้</p>

<p>ทว่าในวงการพระเครื่องพาณิชย์กระแสหลัก "พระเหนือพรหม" มักถูกลดทอนคุณค่าลงเป็นเพียงเครื่องรางอธิษฐานขอยอดขาย หรือเครื่องรางหนุนดวงชะตาแบบสำเร็จรูป บทความวิจัยเชิงวิชาการชิ้นนี้จะนำพาทุกท่านก้าวข้ามมายาคติตลาดล่าง สู่การถอดรหัสพุทธเทววิทยาในพระไตรปิฎก ศาสตร์แห่งมวลสารผงมหาจักรพรรดิ และวิทยาศาสตร์กายภาพแห่งการตกผลึกของ <strong>“พระธรรมธาตุเสด็จ”</strong> อย่างสมบูรณ์แบบ</p>

<h2>๑. ประติมานวิทยาแห่งการสยบอัตตา: ถอดรหัสธรรม “พระพุทธเจ้าประทับเหนือเศียรพรหม”</h2>
<p>พุทธศิลป์ของพระพิมพ์เหนือพรหมสร้างขึ้นในรูปทรงสี่เหลี่ยมผืนผ้าอันสง่างาม กึ่งกลางประดิษฐาน <strong>องค์สมเด็จพระสัมมาสัมพุทธเจ้า</strong> ประทับนั่งขัดสมาธิราบปางสมาธิหรือปางมารวิชัย ทรงประทับอยู่เหนือเศียรของ <strong>ท้าวมหาพรหม ๔ พักตร์</strong> ภายใต้ซุ้มประภามณฑลหรือซุ้มบัวสองชั้น</p>
<p>ในมิติทางสัญลักษณ์นิยม (Iconographical Semiotics) ภาพที่พระพุทธองค์ประทับอยู่เหนือเศียรพรหม มิใช่การ "เหยียบย่ำหรือข่มขู่" ในเชิงลัทธิศาสนา แต่เป็นการจำลองเหตุการณ์สำคัญในพระพุทธประวัติ เพื่อแสดงถึง <strong>“การสยบอหังการและมิจฉาทิฐิ (Māna-Nirodha)”</strong> ด้วยโลกุตตรปัญญาอันบริสุทธิ์ พระพุทธคุณของพระสัมมาสัมพุทธเจ้าย่อมอยู่เหนือโลกียฌานและภพภูมิของพรหมทั้งปวง สอดคล้องกับบทสวด <em>พุทธชัยมงคลคาถา (พาหุงมหากา บทที่ ๘)</em> ที่พุทธศาสนิกชนทั่วโลกสวดสาธยายสืบต่อกันมานับพันปี</p>

<h2>๒. พรหมนิมันตนิกสูตร: ธรรมสงครามบนวิมานรูปพรหม และอภินิหารซ่อนหา</h2>
<p>ที่มาแห่งพุทธประวัตินี้ ปรากฏอย่างเด่นชัดในพระไตรปิฎก <strong>พระสุตตันตปิฎก มัชฌิมนิกาย มูลปัณณาสก์ เล่ม ๑๒ (พรหมนิมันตนิกสูตร)</strong> เมื่อ <strong>“ท้าวพกาพรหม”</strong> มหาพรหมผู้เสวยผลบุญแห่งปฐมฌานมายาวนานนับอสงไขยกัป ได้เกิดความเห็นผิดอย่างร้ายแรง (สัสสตทิฐิ) หลงเข้าใจว่า พรหมโลกแห่งนี้เที่ยงแท้ ยั่งยืน มั่นคง ไม่แปรผัน ตนเองเป็นผู้สร้างโลก เป็นผู้ไม่แก่ ไม่เจ็บ และไม่ตาย ทั้งยังไม่มีภพภูมิอื่นใดที่ประณีตไปกว่านี้อีกแล้ว</p>
<p>เมื่อพระบรมศาสดาทรงทราบด้วยพระอนาคตังสญาณ จึงทรงเสด็จขึ้นสู่พรหมโลกเพื่อเปลื้องความหลงผิดของท้าวพกาพรหม ทรงแสดงธรรมจนพกาพรหมเกิดความแคลงใจและท้าทายด้วยการประลองฤทธิ์ <strong>“ซ่อนหา”</strong>:</p>
<ul>
  <li><strong>การซ่อนของพกาพรหม:</strong> ท้าวพกาพรหมใช้ฤทธิ์อภิญญาแปลงกายและแทรกซึมไปซ่อนยังใต้แผ่นดิน ท้องมหาสมุทร และขอบจักรวาล ทว่าพระพุทธองค์ทรงใช้ทิพยจักษุญาณและสัพพัญญุตญาณชี้บอกตำแหน่งของพกาพรหมได้อย่างแม่นยำทุกครั้ง เพราะพกาพรหมยังเวียนว่ายอยู่ในขอบเขตของโลกียวิญญาณ</li>
  <li><strong>การซ่อนของพระสัมมาสัมพุทธเจ้า:</strong> พระพุทธองค์ทรงเข้าสู่เตโชกสิณสมาบัติ แล้วทรงอธิษฐานจิตเสด็จดำเนินจงกรมอยู่เหนือ <em>“ชฎามงกุฎและเศียรเกศา”</em> ของท้าวพกาพรหม พร้อมทั้งทรงเปล่งพระสุรเสียงแสดงธรรมอันก้องกังวานไปทั่วหมื่นโลกธาตุ ท้าวพกาพรหมและพรหมบริวารกวาดสายตาหาจนทั่วสวรรค์ชั้นฟ้าแต่กลับไม่พบ</li>
</ul>
<p>เหตุที่พกาพรหมหาไม่พบ เพราะสายตาของพกาพรหมมัวแต่มองสอดส่ายออกไปข้างนอก แต่มิเคยมองดู <strong>"จุดสูงสุดบนศีรษะของตนเอง"</strong> อันเป็นที่ตั้งแห่งอัตตาและอหังการ พระพุทธองค์จึงทรงใช้อุบายนี้ทำลายความยึดมั่นถือมั่น จนท้าวพกาพรหมยอมน้อมเศียรศิโรราบ สดับพระสัทธรรมเทศนา และบรรลุธรรมเป็นพระอริยบุคคลในที่สุด</p>

<h2>๓. พุทธจักรวาลวิทยา ปะทะ เทววิทยาฮินดู: สัจธรรมแห่งพรหมภูมิในพระไตรปิฎก</h2>
<p>ในคติพราหมณ์-ฮินดู "พระพรหม" คือหนึ่งในตรีมูรติผู้สร้างสรรพสิ่ง เป็นมหาเทพผู้ลิขิตชะตาชีวิตของมนุษย์ ทว่าใน <strong>พุทธจักรวาลวิทยา (Buddhist Cosmology)</strong> พระไตรปิฎกจำแนกพรหมไว้อย่างชัดเจนว่ามิใช่ผู้สร้างโลก แต่เป็น <strong>“สัตวโลกผู้ทรงฌาน”</strong> ที่อุบัติขึ้นตามอำนาจแห่งรูปฌาน ๔ และอรูปฌาน ๔:</p>
<table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px;">
  <thead>
    <tr style="background: #1e293b; color: #d4af37;">
      <th style="padding: 12px; border: 1px solid #334155;">มิติเปรียบเทียบ</th>
      <th style="padding: 12px; border: 1px solid #334155;">พรหมในพุทธศาสนาเถรวาท</th>
      <th style="padding: 12px; border: 1px solid #334155;">พรหมในศาสนาฮินดู</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 12px; border: 1px solid #334155; font-weight: bold;">สถานะสูงสุด</td>
      <td style="padding: 12px; border: 1px solid #334155;">เป็น "สังขารธรรม" ยังตกอยู่ใต้กฎไตรลักษณ์ (อนิจจัง ทุกขัง อนัตตา)</td>
      <td style="padding: 12px; border: 1px solid #334155;">เป็นมหาเทพผู้สร้างโลก (Creator God) ดำรงอยู่นิรันดร์</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #334155; font-weight: bold;">การสิ้นสุดภพภูมิ</td>
      <td style="padding: 12px; border: 1px solid #334155;">เมื่อหมดอายุขัยหรือหมดบุญแห่งฌาน ย่อมจุติลงมาสู่สุคติหรือทุคติภูมิได้</td>
      <td style="padding: 12px; border: 1px solid #334155;">หลอมรวมกลับคืนสู่พรหมัน (Brahman) สูงสุด</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #334155; font-weight: bold;">วิถีการปฏิบัติ</td>
      <td style="padding: 12px; border: 1px solid #334155;">เจริญ <strong>พรหมวิหาร ๔</strong> (เมตตา กรุณา มุทิตา อุเบกขา) ควบคู่กับวิปัสสนาญาณ</td>
      <td style="padding: 12px; border: 1px solid #334155;">การสวดอ้อนวอน พลีกรรม สังเวย และพิธีกรรมบวงสรวง</td>
    </tr>
  </tbody>
</table>
<p>ดังนั้น พระเหนือพรหมของหลวงปู่ดู่ จึงเป็นเครื่องเจริญสติให้ระลึกว่า แม้จะได้เสวยทิพยสมบัติเป็นถึงมหาพรหมผู้เรืองเดช ก็ยังไม่อาจพ้นจากวัฏสงสาร เว้นแต่จะดำเนินตามรอยบาทพระสัมมาสัมพุทธเจ้าด้วยปัญญาญาณแห่งการปล่อยวางเท่านั้น</p>

<h2>๔. มวลสารศาสตร์ผงมหาจักรพรรดิ และวิทยาศาสตร์แห่งผลึก “พระธรรมธาตุเสด็จ”</h2>
<p>หนึ่งในเอกลักษณ์อันน่าอัศจรรย์ใจที่สุดของพระเนื้อผงหลวงปู่ดู่ วัดสะแก คือการปรากฏขึ้นของ <strong>“พระธรรมธาตุ”</strong> ซึ่งมีลักษณะเป็นเกล็ดผลึกแก้วใส เม็ดกลม หรือผลึกข้าวสารผ่าซีกสีขาวนวลระยิบระยับผุดงอกขึ้นมาจากเนื้อในขององค์พระ</p>

<h3>สูตรมวลสารผงมหาจักรพรรดิ</h3>
<p>หลวงปู่ดู่ได้คิดค้นสูตรการสร้างพระที่ผสมผสานระหว่างจิตตตานุภาพและมวลสารธาตุอันบริสุทธิ์:</p>
<ol>
  <li><strong>ปูนซีเมนต์ขาวบริสุทธิ์ (Pure White Portland Cement):</strong> ทำหน้าที่เป็นแกนโครงสร้างหลัก แคลเซียมซิลิเกตและแคลเซียมออกไซด์</li>
  <li><strong>ผงลบพุทธคุณ ๕ ประการ:</strong> ผงอิทธิเจ ผงปัทมัง ผงตรีนิสิงเห ผงมหาราช และผงพุทธคุณ ที่หลวงปู่ดู่เขียนและลบอักขระยันต์บนกระดานชนวนด้วยตนเองนับหมื่นจบ</li>
  <li><strong>ข้าวก้นบาตรและน้ำมนต์จักรพรรดิ:</strong> อินทรียสารแห่งความอุดมสมบูรณ์และตัวทำละลายทางเคมีบริสุทธิ์</li>
</ol>

<h3>วิทยาศาสตร์กายภาพแห่งการตกผลึก (Carbonation Kinetics)</h3>
<p>ในมุมมองทางวิทยาศาสตร์และแร่วิทยา (Mineralogy) การเกิดพระธรรมธาตุคือปรากฏการณ์ตกผลึกแบบ <strong>Recrystallization</strong> เมื่อปูนขาวทำปฏิกิริยากับน้ำจะเกิด <em>แคลเซียมไฮดรอกไซด์</em> $\text{Ca(OH)}_2$ ภายในโพรงไมครอนของเนื้อพระ ตลอดระยะเวลาหลายสิบปีที่พระเครื่องถูกเก็บรักษาไว้ในสภาพแวดล้อมที่เหมาะสม ก๊าซคาร์บอนไดออกไซด์ในบรรยากาศ ($\text{CO}_2$) จะซึมซาบเข้าไปทำปฏิกิริยาคาร์บอเนชั่นอย่างช้าๆ:</p>
<p style="text-align: center; font-family: monospace; font-size: 16px; background: #1e293b; padding: 12px; border-radius: 6px; color: #38bdf8;">
  Ca(OH)₂ + CO₂  ⟶  CaCO₃ (Calcite / Aragonite Crystals) + H₂O
</p>
<p>ปฏิกิริยานี้ก่อให้เกิดผลึกแร่ <strong>แคลไซต์ (Calcite)</strong> หรือ <strong>อราโกไนต์ (Aragonite)</strong> ที่งอกดันตัวขึ้นมาบนผิวพระอย่างเป็นธรรมชาติ เมื่อประสานกับอำนาจแห่งจิตตภาวนาและความบริสุทธิ์ของหลวงปู่ดู่ ผลึกเหล่านี้จึงมีประกายแวววาวประดุจพระบรมสารีริกธาตุ แตกต่างอย่างสิ้นเชิงจาก "คราบแป้งโรยพิมพ์" หรือ "เชื้อรา" ที่พ่อค้าพระปลอมแปลงขึ้น</p>

<h2>๕. มหาจักรพรรดิสูตรและสายใยพระโพธิสัตว์: ถอดรหัสพระคาถาและบารมีหลวงปู่ทวด-หลวงปู่ดู่</h2>
<p>หลวงปู่ดู่ได้รับการยอมรับจากศิษยานุศิษย์และพระสุปฏิปันโนทั่วประเทศว่า ท่านมีความผูกพันทางจิตวิญญาณอย่างลึกซึ้งกับ <strong>หลวงปู่ทวด วัดช้างให้</strong> พระโพธิสัตว์แห่งแดนทักษิณ พระเครื่องของหลวงปู่ดู่ทุกองค์จึงมีกระแสบารมีแห่งพระโพธิสัตว์คุ้มครองอย่างเต็มเปี่ยม</p>
<p>นอกจากนี้ ท่านยังได้มอบมรดกทางธรรมอันล้ำค่าคือ <strong>“พระคาถามหาจักรพรรดิ”</strong>:</p>
<blockquote style="background: rgba(212, 175, 55, 0.08); border-left: 4px solid #d4af37; padding: 16px; margin: 20px 0; font-style: italic; color: #f1f5f9;">
  “นะโมพุทธายะ พระพุทธะ ไตรรัตนะญาณ มณีนพรัตน์ สีสะหัสสะ สุธรรมา พุทโธ ธัมโม สังโฆ ยะธาพุทโมนะ พุทธะบูชา ธัมมะบูชา สังฆะบูชา อัคคีทานัง วะรังคันธัง สีวะลี จะมหาเถรัง อะหังวันทามิ ทูระโต อะหังวันทามิ ธาตุโย อะหังวันทามิ สัพพะโส พุทธะ ธัมมะ สังฆะ ปูเชมิ”
</blockquote>
<p>แก่นแท้ของบทสวดนี้ มิใช่การสวดเพื่อขอโชคลาภทางโลก แต่เป็นการ <strong>“อัญเชิญกำลังบารมีของพระพุทธเจ้าทั้ง ๕ พระองค์ และพระมหาจักรพรรดิ”</strong> มาฟอกธาตุขันธ์ ชำระล้างจิตใจ และส่งกระแสเมตตาเพื่อ <strong>“ปรับภพภูมิและแผ่บุญกุศล”</strong> ให้แก่สรรพสัตว์ โอปปาติกะ และดวงวิญญาณทั้งหลายในสากลจักรวาล</p>

<h2>๖. วัตถุมงคลจริงในคลังมรดก Dan Siam: พยานวัตถุแห่งสายบารมีวัดสะแก</h2>
<p>เพื่อเป็นหลักฐานอ้างอิงเชิงประวัติศาสตร์และพุทธศิลป์ Dan Siam Heritage Collection ขอเปิดบันทึกวัตถุมงคลชิ้นเอกที่ผ่านการตรวจสอบความแท้ตามมาตรฐานสากล ทั้ง ๓ รายการ:</p>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ รายการที่ ๑: [REF: #1514] พระเหนือพรหม หลวงปู่ดู่ วัดสะแก ปี ๒๕๒๘ ออกวัดโคกมะยม เนื้อผงปัดทอง</h3>
  <p><strong>รหัสวัตถุมงคล:</strong> REF: #1514 | <strong>สถานะ:</strong> พระแท้มาตรฐานสากล มีบัตรรับรอง</p>
  <p>พระเหนือพรหมรุ่นพิเศษที่สร้างขึ้นในปี พ.ศ. ๒๕๒๘ เพื่อสมทบทุนบูรณะวัดโคกมะยม จังหวัดพระนครศรีอยุธยา โดยหลวงปู่ดู่ได้มอบผงมหาจักรพรรดิและเมตตาอธิษฐานจิตเดี่ยว องค์พระโดดเด่นด้วยการปัดทองคำแท้โบราณบนพื้นผิวปูนซีเมนต์ขาวบริสุทธิ์ เส้นสายพิมพ์ทรงคมชัดลึก ซุ้มประภามณฑลและเศียรพรหมติดชัดเจนเต็มร้อยเปอร์เซ็นต์</p>
  <p><a href="/product/phra-nuea-prom-luang-pu-du-b-e-2528-gold-powder" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 คลิกเพื่อเข้าชมภาพสตูดิโอความละเอียดสูงและรายละเอียดมวลสาร [REF: #1514]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ รายการที่ ๒: [REF: #1518] เหรียญพระพรหม ศาลพระพรหมตลาดเจ้าพรหม หลวงปู่ดู่ วัดสะแก ปี ๒๕๒๕ เนื้อทองแดง ผิวไฟ</h3>
  <p><strong>รหัสวัตถุมงคล:</strong> REF: #1518 | <strong>สถานะ:</strong> ผิวไฟรุ้งเดิม ๑๐๐% ไม่ผ่านการล้าง</p>
  <p>เหรียญหล่อโลหะรูปพระพรหมที่สร้างขึ้นในวาระประวัติศาสตร์การตั้งศาลพระพรหม ณ ตลาดเจ้าพรหม ศูนย์กลางการค้าสำคัญของอยุธยา หลวงปู่ดู่อธิษฐานจิตประจุพุทธคุณแห่งพรหมวิหาร เมตตามหานิยม และการเกื้อหนุนอาชีพสุจริต เนื้อทองแดงคงสภาพผิวไฟสีแดงอมส้มประกายรุ้งดั้งเดิม สะท้อนความสมบูรณ์แบบแห่งวิทยาการโลหะหล่อกึ่งพุทธกาล</p>
  <p><a href="/product/brahma-coin-luang-pu-du-wat-sa-kaew-2525-copper" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 คลิกเพื่อเข้าชมภาพสตูดิโอความละเอียดสูงและรายละเอียดโค้ด [REF: #1518]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ รายการที่ ๓: [REF: #156] พระปิดตา เนื้อผงพุทธคุณ หลวงปู่ดู่ วัดสะแก อยุธยา ปี ๒๕๒๐</h3>
  <p><strong>รหัสวัตถุมงคล:</strong> REF: #156 | <strong>สถานะ:</strong> ต้นธารแห่งมวลสารผงมหาจักรพรรดิยุคต้น</p>
  <p>พระปิดตาพิมพ์นิยมยุคต้น สร้างขึ้นในปี พ.ศ. ๒๕๒๐ แสดงให้เห็นถึงเนื้อหามวลสารผงพุทธคุณผสมปูนขาวในยุคแรกเริ่มของวัดสะแก มวลสารมีความหนึกนุ่ม คราบน้ำว่านผุดขึ้นตามธรรมชาติ สื่อถึงคติแห่งการปิดทวาร สำรวมอินทรีย์ และการเข้าสู่นิโรธสมาบัติอันบริสุทธิ์</p>
  <p><a href="/product/phra-pid-ta-luang-pu-du-wat-sakaek-2520" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 คลิกเพื่อเข้าชมภาพสตูดิโอความละเอียดสูงและรายละเอียดมวลสาร [REF: #156]</a></p>
</div>

<h2>๗. อวสานมายาคติพาณิชย์พุทธ: จากการติดสินบนเทพเจ้า สู่การดำเนินชีวิตด้วยปัญญา</h2>
<p>หลวงปู่ดู่ พรหมปัญโญ มักจะกล่าวย้ำเตือนสติศิษยานุศิษย์อยู่เสมอว่า:</p>
<blockquote style="background: rgba(56, 189, 248, 0.08); border-left: 4px solid #38bdf8; padding: 16px; margin: 20px 0; font-style: italic; color: #f1f5f9;">
  “ใครจะใหญ่เกินกรรม... พระไม่ได้ช่วยให้เรารวยได้ถ้าเราไม่ทำมาหากิน พระท่านช่วยได้แค่ครึ่งเดียว อีกครึ่งหนึ่งเราต้องทำเอง ของดีอยู่ที่ตัวเรา ปฏิบัติธรรมไม่ได้เอาไว้ขอเงิน แต่เอาไว้ฟอกจิต”
</blockquote>
<p>ดังนั้น "พระเหนือพรหม" จึงมิใช่วัตถุมงคลที่บูชาเพื่อกราบไหว้อ้อนวอนขอพรอย่างงมงาย หรือเพื่อเอาชนะกดขี่ผู้อื่น แต่เป็น <strong>“พระพุทธานุสติและธรรมานุสติอันสูงสุด”</strong> ที่เตือนใจให้เราสยบความโอหัง ทลายความหลงในอัตตาของตนเอง และหันมาดำเนินชีวิตด้วยการเจริญ <strong>พรหมวิหาร ๔</strong> คือ มีเมตตาปรารถนาดีต่อเพื่อนมนุษย์ มีกรุณาช่วยเหลือผู้ตกทุกข์ มีมุทิตายินดีเมื่อผู้อื่นได้ดี และมีอุเบกขาวางใจเป็นกลางในกฎแห่งกรรม</p>
`;

const CONTENT_EN = `
<p>In the vast expanse of Siamese sacred art and Ayutthayan esoteric traditions, few votive tablets embody a theological depth as profound as <strong>Phra Nuea Phrom</strong> ("The Buddha Over Brahma") consecrated by <strong>Luang Pu Du Prommapanyo (1904–1990 C.E.)</strong> of <strong>Wat Sakae, Ayutthaya</strong>. Revered as an embodiment of the Bodhisattva ideal, Luang Pu Du synthesized classical Theravada scripture, mineralogical alchemy, and contemplative mysticism into a single rectangular tablet.</p>

<p>Yet in contemporary commercial markets, this profound emblem is frequently degraded into a mere "wealth-fetching trinket" or a transactional shortcut to material elevation. This scholarly monograph deconstructs the pop-culture myths, analyzing the canonical <em>Brahmanimantanika Sutta</em>, the mineral chemistry of <strong>Phra Dhamma Dhatu (sacred crystalline recrystallization)</strong>, and the profound metaphysical philosophy of ego dissolution.</p>

<h2>1. The Iconography of Subjugation: Deconstructing the "Buddha Over Brahma" Paradigm</h2>
<p>The iconic form of Phra Nuea Phrom depicts the <strong>Historical Buddha Shakyamuni</strong> seated in the peaceful Dhyana or Maravijaya mudra directly above the crowned head of the four-faced <strong>Maha Brahma</strong>, framed by an aureole arch (Chum Ruean Kaew) or double-lotus dais.</p>
<p>Far from expressing sectarian hubris or physical oppression, this semiotic arrangement represents <strong>Māna-Nirodha</strong>—the absolute cessation of spiritual pride and conceit through transcendent wisdom. The Buddha's supreme enlightenment surpasses the highest heavens of cyclic existence. This visual theology directly materializes Stanza 8 of the classical <em>Phra Phutta Chaiyamongkol Katha (The Eight Victories of the Buddha)</em>:</p>
<blockquote style="background: rgba(212, 175, 55, 0.08); border-left: 4px solid #d4af37; padding: 16px; margin: 20px 0; font-style: italic; color: #f1f5f9;">
  "Duggāhaditthi-bhujagena datthahatthaṃ, Brahmaṃ visuddhijutim-iddhi-bakābhidhānaṃ; Ñāṇāgadena vidhinā jitavā munindo, Tantejasā bhavatu te jayamangalāni."<br>
  <em>"The Lord of Sages conquered the mighty Baka Brahma—whose mind was constricted by the venomous serpent of eternalist false views—by applying the supreme medicine of transcendent wisdom. By this spiritual victory, may ultimate blessings be yours."</em>
</blockquote>

<h2>2. Brahmanimantanika Sutta: The Cosmic Dialectic in Rupavacara Heavens</h2>
<p>The textual foundation of this sacred tablet is recorded in the Pali Canon: <strong>Majjhima Nikaya, Sutta 49 (Brahmanimantanika Sutta)</strong>. Baka Brahma, dwelling in the effulgent purity of the primary Jhana heavens for uncounted cosmic eons, succumbed to the fatal delusion of <em>Sassataditthi</em> (Eternalism). He proclaimed: <em>"This state is permanent, stable, eternal, and complete. Here there is no birth, aging, death, or passing away; beyond this, there is no higher salvation."</em></p>
<p>Perceiving this cosmic delusion, the Buddha ascended instantly to the Brahma realm to dismantle Baka Brahma's conceit. When challenged to a contest of supernatural concealment:</p>
<ul>
  <li><strong>Baka Brahma's Concealment:</strong> Brahma attempted to vanish into earth, water, fire, and cosmic space. Yet the Buddha tracked his subtle psychic frequency effortlessly, declaring his exact coordinate because Brahma remained within the mundane field of conscious becoming.</li>
  <li><strong>The Buddha’s Concealment:</strong> The Buddha entered the Fire Kasina absorption and walked meditatively directly upon the <strong>crown of Baka Brahma’s head</strong>. While his voice resounded majestically throughout the celestial assembly, neither Brahma nor his celestial retinue could perceive his physical form.</li>
</ul>
<p>Why was Brahma blinded? Because his outward-seeking ego looked across all dimensions but <strong>failed to examine the crown of his own head</strong>—the pinnacle of his pride. By manifesting above Brahma's crowning locks, the Buddha proved that conditioned existence can never encompass unconditioned Nibbana, leading Baka Brahma to relinquish his conceit and take refuge in the Triple Gem.</p>

<h2>3. Buddhist Cosmology vs. Hindu Deism: Transience of the Brahma Realm</h2>
<p>In classical Hinduism, Brahma is the eternal Demiurge—the cosmic architect of destiny. In <strong>Theravada Buddhist Cosmology</strong>, however, Brahmas are not uncreated gods, but sentient beings who attained celestial rebirth through mastery of the 4 Form Jhanas (Rupavacara) and 4 Formless Jhanas (Arupavacara):</p>
<table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px;">
  <thead>
    <tr style="background: #1e293b; color: #d4af37;">
      <th style="padding: 12px; border: 1px solid #334155;">Comparative Dimension</th>
      <th style="padding: 12px; border: 1px solid #334155;">Theravada Buddhist Brahma</th>
      <th style="padding: 12px; border: 1px solid #334155;">Hindu Creator Brahma</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 12px; border: 1px solid #334155; font-weight: bold;">Ontological Status</td>
      <td style="padding: 12px; border: 1px solid #334155;">Conditioned entity (Sankhara) subject to Impermanence (Anicca) and Non-Self (Anatta).</td>
      <td style="padding: 12px; border: 1px solid #334155;">Uncreated Creator God (Trimurti) and source of cosmic order.</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #334155; font-weight: bold;">Lifespan</td>
      <td style="padding: 12px; border: 1px solid #334155;">Finite (measured in cosmic Mahakappas); upon exhaustion of Jhana karma, rebirth occurs.</td>
      <td style="padding: 12px; border: 1px solid #334155;">Immortal or coterminous with the manifestation of Brahman.</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #334155; font-weight: bold;">Spiritual Pathway</td>
      <td style="padding: 12px; border: 1px solid #334155;">Cultivation of the 4 Brahmaviharas (Loving-kindness, Compassion, Sympathetic Joy, Equanimity) linked to Vipassana.</td>
      <td style="padding: 12px; border: 1px solid #334155;">Yajnas, sacrificial oblations, and ritual devotion.</td>
    </tr>
  </tbody>
</table>

<h2>4. The Alchemy of Maha Chakraphat Powder & Mineralogical Carbonation Kinetics</h2>
<p>One of the most extraordinary phenomena associated with Luang Pu Du’s sacred powder amulets is the spontaneous emergence of <strong>"Phra Dhamma Dhatu"</strong>—microscopic crystalline druse and sparkling bead-like mineral structures that erupt from within the matrix of the tablet.</p>

<h3>The Sacred Formulation</h3>
<ol>
  <li><strong>Pure White Portland Cement:</strong> Provides a refined calcium silicate ($\text{CaO} \cdot \text{SiO}_2$) matrix.</li>
  <li><strong>Five Esoteric Powders (Phong Wiset 5 Prakarn):</strong> Phong Itthije, Pathamang, Maharaj, Trinisinghe, and Buddhakhun, inscribed and erased tens of thousands of times on slate boards by Luang Pu Du.</li>
  <li><strong>Alms-Bowl Rice and Lustral Water:</strong> Natural starches acting as organic polymers and pure catalytic hydration water.</li>
</ol>

<h3>Thermodynamic Carbonation Kinetics</h3>
<p>From the perspective of inorganic chemistry and mineralogy, this phenomenon is a slow solid-state carbonation reaction. When calcium oxide hydrates, it forms portlandite $\text{Ca(OH)}_2$ within the porous microstructure. Over decades within the warm, sacred confines of Wat Sakae, atmospheric carbon dioxide ($\text{CO}_2$) gradually diffuses into the pore networks:</p>
<p style="text-align: center; font-family: monospace; font-size: 16px; background: #1e293b; padding: 12px; border-radius: 6px; color: #38bdf8;">
  Ca(OH)₂ + CO₂  ⟶  CaCO₃ (Calcite / Aragonite Crystals) + H₂O
</p>
<p>This reaction precipitates exquisite micro-crystals of <strong>Calcite</strong> or prismatic needles of <strong>Aragonite</strong>. When catalyzed by the focused meditative consciousness of Luang Pu Du, these crystals display a gem-like optical brilliance that is forensically distinct from talcum residue, surface mold, or artificial chemical adulterations.</p>

<h2>5. The Maha Chakraphat Matrix: The Bodhisattva Symbiosis of Luang Pu Thuat & Luang Pu Du</h2>
<p>Luang Pu Du was venerated as sharing an unbroken spiritual continuum with <strong>Somdej Luang Pu Thuat of Wat Chang Hai</strong>, the quintessential Bodhisattva of southern Thailand. Luang Pu Du's sacred artifacts are imbued with this expansive universal compassion.</p>
<p>His core spiritual inheritance is the <strong>Maha Chakraphat Katha</strong> (The Great Emperor's Incantation):</p>
<blockquote style="background: rgba(212, 175, 55, 0.08); border-left: 4px solid #d4af37; padding: 16px; margin: 20px 0; font-style: italic; color: #f1f5f9;">
  "Namo Buddhaya, Phra Buddha Trai Ratana Nana, Mani Noppharat, Sisahassa Sudharma, Buddho Dhammo Sangho, Yadha-Phut-Mo-Na..."
</blockquote>
<p>This sacred formula is not an instrument of material petition, but a method to align one’s consciousness with the transcendent virtues of the Five Buddhas of the Bhaddakappa. Its practice is aimed at <strong>"Karmic Realm Alignment" (Prap Phop Phum)</strong>—transferring merit to departed spirits, celestial beings, and karmic creditors across unseen dimensions.</p>

<h2>6. Certified Archival Specimens in Dan Siam Heritage Collection</h2>
<p>To establish rigorous historical and material provenance, Dan Siam Heritage Collection presents three authenticated masterworks from the Wat Sakae lineage:</p>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ Specimen 1: [REF: #1514] Phra Nuea Prom B.E. 2528 Wat Khok Mayom Issue (Gold-Brushed Sacred Powder)</h3>
  <p><strong>Registry:</strong> REF: #1514 | <strong>Authentication:</strong> Certified Authentic by Major Industry Standards</p>
  <p>Consecrated in B.E. 2528 to support the historic restoration of Wat Khok Mayom, Ayutthaya. Luang Pu Du personally infused his pure Maha Chakraphat powders and performed solo meditative consecration. Embellished with traditional gold brushing over pure white sacred cement, this tablet exhibits razor-sharp mold fidelity with full facial definition of the Brahma deity.</p>
  <p><a href="/product/phra-nuea-prom-luang-pu-du-b-e-2528-gold-powder" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 Inspect Ultra-High-Resolution Microscopic Macro Imagery [REF: #1514]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ Specimen 2: [REF: #1518] Brahma Shrine Talad Chao Prom Coin B.E. 2525 (Flame-Patinated Striated Copper)</h3>
  <p><strong>Registry:</strong> REF: #1518 | <strong>Condition:</strong> 100% Uncleaned Original Iridescent Flame Skin</p>
  <p>Cast in B.E. 2525 to commemorate the consecration of the Brahma Shrine at Chao Prom Market—the commercial epicenter of Ayutthaya. Luang Pu Du consecrated this coin with the pure intention of blessing honest merchants and everyday citizens. Its surface displays untouched rainbow-hued thermal oxidation (Phiu Fai).</p>
  <p><a href="/product/brahma-coin-luang-pu-du-wat-sa-kaew-2525-copper" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 Inspect Numismatic Die Striations and Consecration Stamp [REF: #1518]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ Specimen 3: [REF: #156] Phra Pid Ta B.E. 2520 (Foundational Maha Chakraphat Powder Matrix)</h3>
  <p><strong>Registry:</strong> REF: #156 | <strong>Historical Context:</strong> Early Era Consecration</p>
  <p>A seminal B.E. 2520 creation showcasing the early formulation of Luang Pu Du’s white sacred powder. It embodies the profound Buddhist discipline of sensory restraint (Indriyasamvara), symbolizing the inward cessation of mental defilements necessary for genuine spiritual realization.</p>
  <p><a href="/product/phra-pid-ta-luang-pu-du-wat-sakaek-2520" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 Inspect Early-Era Powder Texture and Curatorial Analysis [REF: #156]</a></p>
</div>

<h2>7. Demolishing Commercial Superstition: From Transactional Deism to Brahmavihara</h2>
<p>Luang Pu Du consistently reminded his disciples:</p>
<blockquote style="background: rgba(56, 189, 248, 0.08); border-left: 4px solid #38bdf8; padding: 16px; margin: 20px 0; font-style: italic; color: #f1f5f9;">
  "No power in this world exceeds Karma... The sacred image can assist fifty percent, but the remaining fifty percent you must build through right action. Spiritual practice is not for begging money; it is for purifying the mind."
</blockquote>
<p>Ultimately, Phra Nuea Phrom is not an instrument of mystical dominance over rivals, but an enduring monument of mindfulness. It commands the devotee to relinquish personal conceit and cultivate the <strong>Four Brahmaviharas</strong>: Metta (boundless loving-kindness), Karuna (universal compassion), Mudita (altruistic joy), and Upekkha (serene equanimity in the face of worldly vicissitudes).</p>
`;

const CONTENT_ZH = `
<p>在大城府浩瀚的佛教圣像学与密法传承中，鲜有圣物能如<strong>瓦萨凯寺（Wat Sakae）龙普度尊者（Luang Pu Du Prommapanyo，佛历2447–2533年）</strong>所督造的<strong>“帕能普隆”（佛陀镇踏大梵天）</strong>那般，将深奥的佛学教理、矿物相变与解脱道哲学融于一身。龙普度尊者被全泰信众誉为践行大乘菩萨道愿力的卓越圣僧。</p>

<p>然而在当代商业佛牌市场中，尊崇的“帕能普隆”往往被矮化为求财走捷径的附庸。本篇博物馆级学术文献，将带您穿透市井迷思，深入《巴利三藏·梵天请请经》之法界论辩、摩诃遮迦越（大轮圣王）圣粉秘法，以及<strong>“法体舍利结晶”（佛舍利化）</strong>之矿物学真相。</p>

<h2>第一章 降伏我执之图像学考：破译“佛陀镇踏大梵天”之深奥法相</h2>
<p>帕能普隆采用庄严的长方形造像构图，中央为<strong>本师释迦牟尼佛</strong>结金刚跏趺坐，结禅定印或降魔印，安详垂目坐于四面大梵天王顶髻之上，周遭环绕双层莲座与智慧圆光。</p>
<p>在圣像符号学上，此法相绝非世俗宗派霸权的“踩踏与征服”，而是象征以出世间清净智慧彻底断除<strong>“我慢与邪见”（Māna-Nirodha）</strong>。佛陀之无上正等正觉，恒超三界二十八重诸天。《佛胜吉祥八偈》（八胜颂第八偈）所颂赞的正是此一伟绩：</p>
<blockquote style="background: rgba(212, 175, 55, 0.08); border-left: 4px solid #d4af37; padding: 16px; margin: 20px 0; font-style: italic; color: #f1f5f9;">
  “摩诃大圣尊，妙药施智水；降伏顽愚意，破除外道见；以此胜福德，愿吉祥常临。”
</blockquote>

<h2>第二章 《梵天请请经》之法界论辩：色界天顶的宇宙辩证法</h2>
<p>该造像的根本经教依据载于巴利大藏经《中部·第四十九经》（Brahmanimantanika Sutta）。居于色界初禅天顶的<strong>贺迦梵天（Baka Brahma）</strong>，因受享天福长达无数无量劫，生起顽固的<strong>常见外道执念（Sassataditthi）</strong>，妄称：“此天界常住不坏、永恒圆满，无生老病死，此界之外再无更上解脱。”</p>
<p>世尊洞悉其迷惘，化现色界天宫，以无碍法音破斥其邪见。贺迦梵天不服，遂提出“隐形斗法”：</p>
<ul>
  <li><strong>梵天隐身：</strong> 贺迦梵天竭尽天女神通，遁入地底、潜入龙宫、匿于虚空极处。然而佛陀以天眼通与一切种智，精准道破其所藏之处，因其仍未脱离世间识之藩篱。</li>
  <li><strong>世尊隐身：</strong> 佛陀入火光三昧，御风升腾，直接经行于<strong>贺迦梵天之顶髻发梢之上</strong>，清澈梵音响彻十方虚空，然而梵天全众竭力四顾，却不可得见佛身。</li>
</ul>
<p>梵天何以寻佛无门？皆因其心执着于向外寻觅，却<strong>唯独未曾反观自身顶峰上之我慢盲区</strong>。佛陀立于梵天顶髻，直指我执死穴，令其傲骨顿折，心悦诚服皈依正法。</p>

<h2>第三章 佛教宇宙观与印度教创世论之分野</h2>
<p>在印度教婆罗门教义中，四面梵天被奉为万物造物主。然而在<strong>南传佛教宇宙观</strong>中，梵天非造物主，而是依修习四禅八定而化生的<strong>色界、无色界天人</strong>，依然深陷生死轮回：</p>
<table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px;">
  <thead>
    <tr style="background: #1e293b; color: #d4af37;">
      <th style="padding: 12px; border: 1px solid #334155;">学术比较维度</th>
      <th style="padding: 12px; border: 1px solid #334155;">南传上座部佛教梵天观</th>
      <th style="padding: 12px; border: 1px solid #334155;">印度教梵天（Brahma）</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 12px; border: 1px solid #334155; font-weight: bold;">本体论地位</td>
      <td style="padding: 12px; border: 1px solid #334155;">有为法（Sankhara），受制于“无常、苦、无我”三大法印。</td>
      <td style="padding: 12px; border: 1px solid #334155;">三大主神之一，三界永恒的创世主与命运主宰。</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #334155; font-weight: bold;">寿命与终局</td>
      <td style="padding: 12px; border: 1px solid #334155;">天寿虽以大劫计，定力耗尽后仍随宿业退堕。</td>
      <td style="padding: 12px; border: 1px solid #334155;">不死永恒，或与最高梵（Brahman）合一。</td>
    </tr>
    <tr>
      <td style="padding: 12px; border: 1px solid #334155; font-weight: bold;">修行解脱径路</td>
      <td style="padding: 12px; border: 1px solid #334155;">修持<strong>四无量心</strong>（慈悲喜舍）结合毗婆奢那观照证果。</td>
      <td style="padding: 12px; border: 1px solid #334155;">举行火供、诵吠陀经与祭祀神像。</td>
    </tr>
  </tbody>
</table>

<h2>第四章 摩诃遮迦越圣粉与“佛舍利结晶”之矿物学真相</h2>
<p>龙普度圣粉佛牌最为震撼世人的微观特征，莫过于其表面自行滋生如碎钻、米粒状晶莹剔透之<strong>“法体舍利”（Phra Dhamma Dhatu）</strong>。</p>

<h3>圣粉配方考</h3>
<ol>
  <li><strong>纯白波特兰硅酸盐水泥：</strong> 构筑坚实基质，富含微孔结构。</li>
  <li><strong>五大落粉经粉：</strong> 龙普度亲手在石板上书写、擦拭数以万计遍的一提皆、八塔芒、玛哈拉等古传秘粉。</li>
  <li><strong>钵底福饭与大轮圣水：</strong> 提供有机碳水化合物粘合剂与水化反应催化剂。</li>
</ol>

<h3>碳化结晶相变物理学</h3>
<p>在化学矿物学视野下，这是一种极其纯净缓慢的重结晶反应。基质中的氧化钙与水生成氢氧化钙 $\text{Ca(OH)}_2$。数十年来在寺院清幽干燥的环境中，空气中的二氧化碳（$\text{CO}_2$）渗透入微米级孔隙，产生固相碳化反应：</p>
<p style="text-align: center; font-family: monospace; font-size: 16px; background: #1e293b; padding: 12px; border-radius: 6px; color: #38bdf8;">
  Ca(OH)₂ + CO₂  ⟶  CaCO₃ (方解石 / 霰石天然微晶) + H₂O
</p>
<p>所生成的<strong>方解石（Calcite）</strong>或<strong>霰石（Aragonite）</strong>晶体依附在佛牌表面天然生长，在放大镜下呈现几何晶面反光，与凡俗造假商贩所喷洒的滑石粉、白矾结霜或霉斑具有根本性差异。</p>

<h2>第五章 大轮圣王神咒与菩萨本愿之法脉回响</h2>
<p>瓦萨凯寺法脉与泰南<strong>瓦沧海寺龙普托尊者</strong>具有不可分割的心灵愿力共振。龙普度尊者倾其毕生愿力传布<strong>《摩诃遮迦越神咒》（大轮圣王心咒）</strong>：</p>
<blockquote style="background: rgba(212, 175, 55, 0.08); border-left: 4px solid #d4af37; padding: 16px; margin: 20px 0; font-style: italic; color: #f1f5f9;">
  “南无佛陀耶，佛陀三宝智，摩尼九宝珠，八万四千法，佛陀法僧聚，耶陀佛谟呐……”
</blockquote>
<p>此神咒之核心宗旨非为凡尘求财，而是祈请贤劫五方如来加被，令持诵者净化三业，并通过<strong>“调整法界六道冥阳”（Prap Phop Phum）</strong>，回向功德予一切宿世冤亲债主与幽界众生，化解暴戾怨怼。</p>

<h2>第六章 暹罗典藏（Dan Siam）真实圣物文献档案</h2>
<p>作为可供实证检验的珍稀历史标本，Dan Siam 典藏库精选呈现三尊经过严苛光学微痕鉴定的传世真品：</p>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ 典藏一：[REF: #1514] 佛历2528年 药叉玛雍寺结缘 龙普度金粉帕能普隆（白水泥圣粉材质）</h3>
  <p><strong>藏品编号：</strong> REF: #1514 | <strong>真伪认证：</strong> 附权威鉴定机构真品证书</p>
  <p>督造于佛历2528年，旨在为修缮阿育陀耶府药叉玛雍寺筹募善款。由龙普度尊者亲自提供核心摩诃遮迦越圣粉并独处闭关加持。法相表面施以古法金粉扫拂，模具线条极度清晰锐利，梵天四面端正，白水泥基质细腻如脂。</p>
  <p><a href="/product/phra-nuea-prom-luang-pu-du-b-e-2528-gold-powder" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 鉴赏高精度微距圣像细节与质地 [REF: #1514]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ 典藏二：[REF: #1518] 佛历2525年 赵蓬早市大梵天神殿 龙普度原铜火皮纪念币</h3>
  <p><strong>藏品编号：</strong> REF: #1518 | <strong>品相评级：</strong> 100% 原皮未清洗 原矿彩虹火皮完整保留</p>
  <p>为纪念大城府商业命脉——赵蓬早市设立四面梵天神殿而铸造。龙普度以此币慈悲回向市井商民行持正命、富而好礼。铜料未经化学浸洗，保留纯正红橙色火皮光泽，模具冲压拉丝清晰可见。</p>
  <p><a href="/product/brahma-coin-luang-pu-du-wat-sa-kaew-2525-copper" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 鉴赏币面模具冲压纹理与真品暗记 [REF: #1518]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ 典藏三：[REF: #156] 佛历2520年 瓦萨凯 普陀坤圣粉必打佛</h3>
  <p><strong>藏品编号：</strong> REF: #156 | <strong>历史意义：</strong> 早期白水泥圣粉基石之作</p>
  <p>佛历2520年早期经典，展现了龙普度尊者早期白粉材质的温润质感。其双手掩面法相契合六根摄受、闭门止息妄念之佛理，是悟入自性清净涅槃之殊胜随身法相。</p>
  <p><a href="/product/phra-pid-ta-luang-pu-du-wat-sakaek-2520" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 鉴赏早期白粉温润包浆与微观风化层 [REF: #156]</a></p>
</div>

<h2>第七章 破斥商业迷信与神棍妄谈：从祈财贿神转依四无量心</h2>
<p>龙普度尊者生前常警策弟子：</p>
<blockquote style="background: rgba(56, 189, 248, 0.08); border-left: 4px solid #38bdf8; padding: 16px; margin: 20px 0; font-style: italic; color: #f1f5f9;">
  “业力至重，谁能逾越？不务正业而求暴富者，佛亦莫能助。佛力加持其半，实修自度其半。世间至宝在于吾人自性，修行非为乞讨财帛，而在洗心革面。”
</blockquote>
<p>故此，“帕能普隆”绝非用于恃神凌人、博弈投机之利器，而是至高无上的<strong>佛陀随念与法随念</strong>。它时刻警策我们荡涤心中的骄慢自矜，以<strong>慈、悲、喜、舍四无量心</strong>善待世间，于滚滚红尘中守护自性灵台之澄明。</p>
`;

async function insertArticle14() {
  console.log('[Article 14] Preparing insertion into Supabase blog_posts...');

  const postData = {
    slug: 'phra-nuea-phrom-luang-pu-du-wat-sakae-maha-chakraphat-theology',
    category: 'ประวัติศาสตร์พระเครื่อง',
    cover_image: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1785215809676-zwsd06ac3s.webp',
    published: false, // In Draft Queue for Oct 22, 09:00 AM

    title: 'Beyond Time and Deities: The Transcendental Crown of Phra Nuea Phrom, Luang Pu Du Wat Sakae, and the Alchemy of Maha Chakraphat Relics',
    title_th: 'นะโมพุทธายะเหนือกาลเวลา: ถอดรหัส “พระเหนือพรหม” หลวงปู่ดู่ วัดสะแก ปริศนาธรรมพญาพกาพรหม สู่ผงมหาจักรพรรดิและพระธรรมธาตุเสด็จ',
    title_zh: '超绝时空之大轮圣王法统：大城府瓦萨凯寺龙普度尊者“帕能普隆”（佛陀镇踏大梵天）破魔降慢密相、摩诃遮迦越圣粉与法体舍利结晶通考',

    excerpt: 'A museum-grade theological and mineralogical treatise on Luang Pu Du Wat Sakae’s iconic Phra Nuea Phrom amulet. Deconstructing the Brahmanimantanika Sutta, the metaphysical crystallization of Maha Chakraphat sacred powders, and the transcendent Bodhisattva lineage.',
    excerpt_th: 'งานวิจัยพุทธเทววิทยาและประติมานวิทยาเจาะลึก “พระเหนือพรหม” หลวงปู่ดู่ วัดสะแก ถอดรหัสพรหมนิมันตนิกสูตรในพระไตรปิฎก ศาสตร์แห่งผงมหาจักรพรรดิ วิทยาการผลึกพระธรรมธาตุเสด็จ และสายใยโพธิสัตว์สะท้านแผ่นดิน',
    excerpt_zh: '以博物馆典藏标准深入剖析大城府瓦萨凯寺龙普度大师法嗣巨作“帕能普隆”（佛陀镇踏四面梵天）。系统梳理《梵天请请经》中世尊降伏贺迦梵天之深奥造像学义理、摩诃遮迦越圣粉碳化结晶相变物理学，以及五方如来与菩萨本愿之法脉回响。',

    content: CONTENT_EN + COPYRIGHT_HTML,
    content_th: CONTENT_TH + COPYRIGHT_HTML,
    content_zh: CONTENT_ZH + COPYRIGHT_HTML,

    created_at: '2026-10-22T02:00:00.000Z',
    updated_at: new Date().toISOString()
  };

  // Check if slug exists
  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id, slug')
    .eq('slug', postData.slug)
    .maybeSingle();

  if (existing) {
    console.log(`[Article 14] Existing record found with ID ${existing.id}. Updating...`);
    const { error: updateErr } = await supabase
      .from('blog_posts')
      .update(postData)
      .eq('id', existing.id);

    if (updateErr) throw updateErr;
    console.log(`[Success] Updated Article 14 (ID: ${existing.id}) in database.`);
    return existing.id;
  } else {
    console.log('[Article 14] Inserting new record...');
    const { data: inserted, error: insertErr } = await supabase
      .from('blog_posts')
      .insert(postData)
      .select('id, title_th, slug')
      .single();

    if (insertErr) throw insertErr;
    console.log(`[Success] Inserted Article 14 with new ID: ${inserted.id} (${inserted.title_th})`);
    return inserted.id;
  }
}

insertArticle14()
  .then(id => {
    console.log(`[Article 14 Completed] Successfully processed in database with ID: ${id}`);
    process.exit(0);
  })
  .catch(err => {
    console.error('[Fatal Error inserting Article 14]:', err);
    process.exit(1);
  });
