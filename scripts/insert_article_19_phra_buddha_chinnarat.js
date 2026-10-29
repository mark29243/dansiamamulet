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
<p>หากจะเอ่ยนามพระพุทธรูปสัมฤทธิ์ที่ได้รับการยกย่องว่า <strong>“ทรงพุทธลักษณะงดงามที่สุดในประวัติศาสตร์สยามประเทศ”</strong> นามของ <strong>“พระพุทธชินราช” แห่งวัดพระศรีรัตนมหาธาตุวรมหาวิหาร เมืองพิษณุโลก</strong> ย่อมสถิตเป็นเอกอุไร้คู่เปรียบเทียบในแผ่นดิน</p>

<p>ในยุคที่บ้านเมืองตกอยู่ในภาวะคับขันจากภัยสงครามมหาเอเชียบูรพา (พ.ศ. ๒๔๘๕) การสถาปนาพระเครื่องจำลององค์พระพุทธชินราช ณ วัดสุทัศนเทพวราราม ได้กลายมาเป็นมหากาพย์แห่งความศรัทธาที่รวมจิตใจของคนทั้งชาติ ทว่าในยุคปัจจุบัน กลับมีมายาคติที่น่าสะพรึงกลัวบิดเบือนว่า "ห้อยพระพุทธชินราชแล้วชีวิตคู่จะร้อนรุ่มหรือหย่าร้าง" บทความวิจัยประวัติศาสตร์ เทววิทยาพุทธ และโลหวิทยาฉบับนี้ จะพาผู้อ่านย้อนรอยสู่ไฟสงครามกู้ขวัญชาติ ถอดรหัสประติมานวิทยาซุ้มเรือนแก้ว และพิสูจน์ความจริงแห่งมหาบารมีที่แท้จริง</p>

<h2>๑. ประติมานวิทยาแห่งสยาม: กำเนิดพระพุทธชินราชสุโขทัย และซุ้มเรือนแก้ว</h2>
<p>ตามพงศาวดารเหนือ องค์พระพุทธชินราชสถาปนาขึ้นในรัชสมัย <strong>พระมหาธรรมราชาที่ ๑ (พญาลิไทย)</strong> แห่งราชวงศ์สุโขทัย ราวปี พ.ศ. ๑๙๐๐ พุทธศิลป์จัดอยู่ใน <strong>“ศิลปะสุโขทัยหมวดพระพุทธชินราช”</strong> ซึ่งถือเป็นยุคคลาสสิกขั้นสูงสุด:</p>
<ul>
  <li><strong>พระวรกายสมบูรณ์แบบ:</strong> พระพักตร์รูปไข่อิ่มเอิบ พระนลาฏกว้าง พระเกตุมาลาเป็นเปลวเพลิง พระกรรณยาวย้อย และที่โดดเด่นเป็นเอกลักษณ์คือ <em>“พระดรรชนี (นิ้วพระหัตถ์) ทั้งสี่นิ้วทรงเรียวยาวเสมอกัน”</em> ตามคติมหาบุรุษลักษณะ</li>
  <li><strong>ซุ้มเรือนแก้ว (Prabhāmaṇḍala):</strong> ซุ้มที่ประดิษฐานรอบพระวรกายมิใช่เปลวไฟทำลายล้าง แต่คือ <strong>“ซุ้มประภามณฑลฉลุลายพญามังกรและพญานาคราชคายลวดลายกนก”</strong> สื่อถึงพระฉัพพรรณรังสีอันร่มเย็นขององค์สมเด็จพระสัมมาสัมพุทธเจ้าในขณะทรงตรัสรู้ปราบพญามาร</li>
  <li><strong>ปางมารวิชัย (Subduing Mara):</strong> พระหัตถ์ขวาทอดคว่ำเหนือพระชานุ ชี้ลงสู่แผ่นพสุธา อัญเชิญแม่พระธรณีขึ้นมาเป็นพยานแห่งบารมีสามสิบทัศ สัญลักษณ์แห่ง “ชัยชนะเด็ดขาดเหนืออุปสรรคและศัตรูทั้งปวง”</li>
</ul>

<h2>๒. ไฟสงครามสู่ศรัทธา: มหากาพย์การหล่อ “ชินราช อินโดจีน ๒๔๘๕” ณ วัดสุทัศน์</h2>
<p>ในช่วงปี พ.ศ. ๒๔๘๓–๒๔๘๕ ประเทศไทยเผชิญหน้ากับกรณีพิพาทอินโดจีนและสงครามมหาเอเชียบูรพา ทหารหาญและประชาชนต่างต้องการเครื่องยึดเหนี่ยวจิตใจในการปกป้องมาตุภูมิ <strong>พุทธสมาคมแห่งประเทศไทย</strong> นำโดย พล.ต.อ.พระรามอินทรา (ดวง จุลัยยานนท์) จึงได้ขอพระบรมราชานุญาตจัดสร้างพระพุทธชินราชจำลองขนาดห้อยคอขึ้น</p>
<p>พิธีมหาพุทธาภิเษกจัดขึ้น ณ พระอุโบสถ <strong>วัดสุทัศนเทพวรารามราชวรมหาวิหาร</strong> ในวันที่ ๑ กุมภาพันธ์ พ.ศ. ๒๔๘๕ โดยได้รับพระมหากรุณาธิคุณจาก <strong>สมเด็จพระสังฆราช (แพ ติสฺสเทโว)</strong> ทรงเป็นองค์ประธานฝ่ายสงฆ์ และ <strong>ท่านเจ้าคุณศรี (สนธิ์ ยติธโร)</strong> พระเถระผู้เชี่ยวชาญตำรับพระกริ่งโบราณ เป็นผู้ควบคุมการผสมโลหะธาตุและเททองหล่ออย่างใกล้ชิด</p>
<p>นับเป็นพิธีปลุกเสกที่ยิ่งใหญ่ที่สุดในประวัติศาสตร์สยามยุคสงคราม โดยมีพระเกจิคณาจารย์ผู้ทรงอภิญญา ๑๐๘ รูปทั่วประเทศร่วมเจริญจิตตภาวนา อาทิ หลวงพ่อจาด วัดบางกระเบา, หลวงพ่อจง วัดหน้าต่างนอก, หลวงพ่อคง วัดบางกะพ้อม, หลวงพ่ออี๋ วัดสัตหีบ, หลวงพ่อเดิม วัดหนองโพ, หลวงพ่อพริ้ง วัดบางปะกอก, และหลวงปู่เผือก วัดกิ่งแก้ว</p>

<h2>๓. โลหวิทยาและพิธีกรรมวัดสุทัศน์: สมเด็จพระสังฆราช (แพ), เจ้าคุณศรี (สนธิ์)</h2>
<p>ความเข้มขลังของพระพุทธชินราช รุ่นอินโดจีน ๒๔๘๕ มิใช่เรื่องบังเอิญ แต่เกิดจาก <strong>“สูตรโลหวิทยาชั้นสูงของวัดสุทัศน์ฯ”</strong>:</p>
<ol>
  <li><strong>เนื้อทองเหลืองผสมทองลงหิน:</strong> มีการนำชนวนพระกริ่งและพระชัยวัฒน์รุ่นเก่าของสมเด็จพระสังฆราช (แพ) มาเป็นหัวเชื้อ ผสมผสานกับโลหะทองลงหินโบราณ ขันลงหิน และทองเหลืองบริสุทธิ์</li>
  <li><strong>พระยันต์ ๑๐๘ และ นะ ๑๔:</strong> พระอาจารย์ผู้ทรงวิทยาคมทั่วประเทศได้ลงอักขระเลขยันต์ตามตำราพิชัยสงครามโบราณลงบนแผ่นทองคำ เงิน และทองแดง รวมหลายพันแผ่น หลอมรวมเข้าเป็นเนื้อเดียวกันในเตาหลอมศักดิ์สิทธิ์</li>
  <li><strong>วิวัฒนาการสู่ “เนื้อทองดอกบวบ” (Thong Dok Buab):</strong> ส่วนผสมอันลงตัวของโลหะธาตุที่มีสังกะสี ดีบุก เงิน และทองคำ ทำให้เนื้อพระมีวรรณะสุกปลั่ง อมเหลืองเขียวประกายทองดั่ง “เกสรดอกบวบ” เมื่อผ่านการบูชาสัมผัสอากาศจะเกิดคราบพรายเงินและสนิมผิวไฟตามธรรมชาติอย่างงดงาม</li>
</ol>

<h2>๔. กายวิภาคแห่งพระแท้: รอยตัดช่อ ตะไบแต่งก้น และเอกลักษณ์โค้ดธรรมจักร-อกเลา</h2>
<p>ในเชิงนิติโบราณคดี พระพุทธชินราช อินโดจีน ๒๔๘๕ เป็นพระหล่อโบราณแบบเข้าช่อก้านกล้วย ซึ่งมีจุดพิจารณาทางกายวิภาคที่ชัดเจน:</p>
<ul>
  <li><strong>รอยตัดก้านช่อใต้ฐาน:</strong> พระทุกองค์เมื่อเททองหล่อเสร็จและทุบเบ้าดินออก จะต้องถูกตัดก้านช่อโลหะใต้ฐานออกด้วยเลื่อย ทำให้ปรากฏรอยตัดก้านช่อกลมๆ ขนาดเท่าปลายนิ้วก้อย</li>
  <li><strong>รอยตะไบแต่งก้น:</strong> ช่างโบราณจะใช้ตะไบเหล็กแต่งรอยตัดช่อและฐานด้านล่างให้เรียบเสมอกัน รอยตะไบจะมีทิศทางเป็นระเบียบ ลึก คม และไม่เป็นรอยขูดขีดสะเปะสะปะแบบเครื่องเจียรไฟฟ้าสมัยใหม่</li>
  <li><strong>การตอกโค้ดศักดิ์สิทธิ์ ๒ ตัว:</strong> องค์พระส่วนใหญ่จะได้รับการตอกโค้ดลึกที่ใต้ฐาน ๒ สัญลักษณ์:
    <ul>
      <li><strong>โค้ดธรรมจักร:</strong> สื่อถึงกงล้อแห่งพระธรรมที่หมุนไปเพื่อดับทุกข์และขับเคลื่อนชีวิตสู่ความเจริญรุ่งเรือง</li>
      <li><strong>โค้ดอกเลา:</strong> รูปทรงพุ่มข้าวบิณฑ์ จำลองจากอกเลาประตูพระวิหารหลวงวัดพระศรีรัตนมหาธาตุ พิษณุโลก สัญลักษณ์แห่งการคุ้มครองป้องกันภัยอันทรงเกียรติ</li>
    </ul>
  </li>
</ul>

<h2>๕. มรดกสืบทอดในคลัง Dan Siam: ๓ สุดยอดพระพุทธชินราชเปี่ยมบารมี</h2>
<p>Dan Siam Heritage Research Archive ภูมิใจนำเสนอวัตถุมงคลจำลององค์พระพุทธชินราชที่ผ่านการตรวจสอบความแท้ตามมาตรฐานสากล ทั้ง ๓ รายการ:</p>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ รายการที่ ๑: [REF: #147] พระกริ่งพระพุทธชินราช ญสส ปี ๒๕๔๓ เนื้อทองดอกบวบ หลวงปู่หมุน วัดบ้านจาน ร่วมเสก</h3>
  <p><strong>รหัสวัตถุมงคล:</strong> REF: #147 | <strong>สถานะ:</strong> พระกริ่งพระพุทธชินราชสมโภช พระนามย่อ ญสส. สมเด็จพระสังฆราชเจ้าฯ</p>
  <p>สุดยอดพระกริ่งหล่อโบราณเนื้อทองดอกบวบ สุกปลั่งดั่งทองคำโบราณ ได้รับพระเมตตาประทานพระนามย่อ ญสส. จากสมเด็จพระญาณสังวร สมเด็จพระสังฆราช สกลมหาสังฆปริณายก (เจริญ สุวฑฺฒโน) และได้จัดพิธีมหาพุทธาภิเษกประวัติศาสตร์ ณ พระวิหารพระพุทธชินราช โดยมี หลวงปู่หมุน ฐิตสีโล วัดบ้านจาน นั่งปรกอัดพลังธาตุอย่างเข้มขลัง เสียงเม็ดกริ่งดังกังวานใส พระสภาพสวยแชมป์ ไร้ริ้วรอย</p>
  <p><a href="/product/phra-kring-buddha-chinnarat-2543-thong-dok-buab-luang-pu-mun" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 คลิกเพื่อเข้าชมภาพสตูดิโอความละเอียดสูงและรายละเอียดมวลสาร [REF: #147]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ รายการที่ ๒: [REF: #1601] พระพุทธชินราช หลังธรรมจักร ปี ๒๕๑๒ เนื้อผง วัดราชนัดดา กทม. (หลวงพ่อกวย, ลป.โต๊ะ, ลพ.แพ เสก)</h3>
  <p><strong>รหัสวัตถุมงคล:</strong> REF: #1601 | <strong>สถานะ:</strong> พระผงมวลสารเข้มข้น ถอดพิมพ์ชินราชอินโดจีนร่วมเสกโดย ๓ มหาเถระ</p>
  <p>พระพิมพ์พระพุทธชินราชเนื้อผงพุทธคุณสีขาวนวล ด้านหลังประทับกงล้อธรรมจักรตามคติชินราชอินโดจีน สร้างขึ้นในปี พ.ศ. ๒๕๑๒ ณ วัดราชนัดดาราม กรุงเทพฯ ปลุกเสกโดยสุดยอดพระเกจิแห่งยุค: หลวงพ่อกวย วัดโฆสิตาราม, หลวงปู่โต๊ะ วัดประดู่ฉิมพลี, และหลวงพ่อแพ วัดพิกุลทอง เด่นทางโชคลาภ ค้าขาย และขจัดอุปสรรค</p>
  <p><a href="/product/phra-phut-chinaraj-dharma-wheel-be2512-rajnada" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 คลิกเพื่อเข้าชมภาพสตูดิโอความละเอียดสูงและรายละเอียดพิธี [REF: #1601]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ รายการที่ ๓: [REF: #1675] พระพุทธชินราชหล่อโบราณ เนื้อนวะ ก้นเงิน วัดบวรนิเวศวิหาร ปี ๒๕๔๓</h3>
  <p><strong>รหัสวัตถุมงคล:</strong> REF: #1675 | <strong>สถานะ:</strong> สายตรงวัดบวรนิเวศวิหาร นวโลหะเต็มสูตร อุดก้นแผ่นเงินแท้ตอกโค้ดกรรมการ</p>
  <p>พระพุทธชินราชหล่อโบราณย่อส่วน พุทธศิลป์ประณีตลึกซึ้ง เนื้อนวโลหะกลับดำเข้มขลังตามตำรับโบราณ ใต้ฐานอุดแผ่นเงินแท้พร้อมตอกโค้ดกรรมการกำกับ สถาปนาในวาระสำคัญ ณ วัดบวรนิเวศวิหาร เปี่ยมด้วยตบะบารมี ความเจริญก้าวหน้า และความเป็นผู้นำ</p>
  <p><a href="/product/phra-phuttha-chinarat-cast-nuad-silver-wat-bowonniwet-2543" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 คลิกเพื่อเข้าชมภาพสตูดิโอความละเอียดสูงและโค้ดกรรมการ [REF: #1675]</a></p>
</div>

<h2>๖. ล้างมายาคติไสยศาสตร์พาณิชย์: พระพุทธชินราชห้อยแล้วร้อน/หย่าร้างจริงหรือ?</h2>
<p>หนึ่งในมายาคติที่เหลวไหลและสร้างความเข้าใจผิดอย่างยิ่งในสังคม คือคำร่ำลือที่ว่า "ห้อยพระพุทธชินราชแล้วชีวิตคู่จะมีปัญหา ร้อนรุ่ม ทะเลาะเบาะแว้ง หรือถึงขั้นหย่าร้าง" ในเชิงพุทธเทววิทยาและหลักธรรม:</p>
<ol>
  <li><strong>พระบารมีธรรมแห่งความร่มเย็นสูงสุด:</strong> องค์สมเด็จพระสัมมาสัมพุทธเจ้าทรงเป็น "พระบรมศาสดาผู้ดับเพลิงกิเลสและเพลิงทุกข์" พุทธานุภาพของพระพุทธรูปปางมารวิชัยคือการดับโทสะ โมหะ และความเร่าร้อนในใจ การบูชาพระพุทธองค์ย่อมนำมาซึ่ง <strong>“สันติสุข ความเมตตา และความร่มเย็นในครอบครัว”</strong></li>
  <li><strong>รากเหง้าของความเชื่อผิดๆ:</strong> ความเข้าใจผิดนี้เกิดจากบุคคลบางกลุ่มที่มองลวดลาย "ซุ้มเรือนแก้ว" ว่าเป็น "เปลวไฟเผาไหม้" ทั้งที่ในความเป็นจริง ลวดลายดังกล่าวคือ <strong>“รัศมีฉัพพรรณรังสีและพญานาคพิทักษ์ธรรม”</strong> ซึ่งเป็นสัญลักษณ์แห่งความอุดมสมบูรณ์และร่มเย็น</li>
  <li><strong>เหตุแห่งการหย่าร้างที่แท้จริง:</strong> การทะเลาะเบาะแว้งในครอบครัวเกิดจาก <em>“กิเลส ความเห็นแก่ตัว และการขาดพรหมวิหาร ๔ (เมตตา กรุณา มุทิตา อุเบกขา)”</em> ของคู่สามีภรรยาเอง มิได้เกี่ยวข้องใดๆ กับองค์พระพุทธชินราช พระองค์ทรงเป็นเครื่องเตือนสติให้เราใจเย็น มีสติ และให้อภัยต่อกันเสมอ</li>
</ol>

<h2>๗. บทสรุปแห่งองค์พุทธชินราช: ชัยชนะเหนือพญามาร สู่สิริมงคลอันสงบร่มเย็น</h2>
<p>คำว่า <strong>“ชินราช”</strong> แปลอย่างตรงตัวว่า <strong>“ราชาแห่งผู้ชนะ” (The Victorious King)</strong></p>
<p>ชัยชนะของพระพุทธชินราช มิใช่ชัยชนะด้วยกำลังทหาร คมดาบ หรือการเบียดเบียนผู้อื่น แต่คือ <strong>“ชัยชนะเหนือความกลัว ความโลภ และอวิชชาในใจตนเอง”</strong></p>
<p>เมื่อเราน้อมอัญเชิญองค์พระพุทธชินราชขึ้นบูชา จงระลึกเสมอว่าพระองค์คือแสงสว่างนำทางชีวิตที่จะช่วยแผ่พระบารมีปัดเป่าอุปสรรคทั้งปวง นำพาความสำเร็จ ความเจริญรุ่งเรือง และความสงบร่มเย็นมาสู่ตนเองและครอบครัวอย่างยั่งยืนสืบไป</p>
`;

const CONTENT_EN = `
<p>If one were to name the supreme bronze masterpiece universally revered as <strong>“The Most Sublime Buddhist Art in Siamese History”</strong>, the sacred image of <strong>“Phra Buddha Chinnarat” of Wat Phra Si Rattana Mahathat Woramahawihan in Phitsanulok</strong> stands uncontested as the pinnacle of sculptural grace and spiritual majesty.</p>

<p>When the Kingdom of Thailand was engulfed in the crucible of the Greater East Asia War (B.E. 2485 / 1942 C.E.), the historic casting of portable Phra Buddha Chinnarat votive statues at Wat Suthat Thepwararam united the collective soul of an entire nation. Yet in modern commercial folklore, an absurd and superstitious myth persists claiming that "wearing Phra Buddha Chinnarat brings fiery household discord or divorce." This authoritative treatise unites history, Mahayana-Theravada iconography, and sacred metallurgy to revisit the wartime crucible, decipher the true symbolism of the radiant arched shrine, and demonstrate the cooling reality of supreme spiritual victory.</p>

<h2>1. Iconography of Siam: Genesis of Sukhothai Chinnarat & Prabhamandala</h2>
<p>According to ancient northern chronicles, the primordial Phra Buddha Chinnarat was cast during the reign of <strong>King Maha Thammaracha I (Phaya Lithai)</strong> of the Sukhothai Dynasty around 1357 C.E. (B.E. 1900). Stylistically, it defines the <strong>“Late Classical Sukhothai Chinnarat School”</strong>:</p>
<ul>
  <li><strong>Anatomical Perfection:</strong> An expansive, oval countenance radiating serene equanimity, broad aristocratic forehead, soaring lotus-flame halo (Rasami), elongated earlobes, and the iconic feature of <em>four fingers of equal length</em> reflecting classical Great Man iconography (Mahāpurisa-lakkhaṇa).</li>
  <li><strong>The Radiant Arched Shrine (Prabhāmaṇḍala / ซุ้มเรือนแก้ว):</strong> The elaborate filigree arch surrounding the Buddha does not represent destructive flames. It is an ornate <strong>Prabhāmaṇḍala carved with protective celestial Dragons and Naga Kings expelling scrolling floral motifs</strong>, symbolizing the sixfold aura (Chabbannarangsi) of cooling enlightenment radiating outward as the Buddha overcomes Mara.</li>
  <li><strong>Māravijaya Posture:</strong> The right hand rests pronated over the knee pointing toward the Earth Goddess, summoning the earth as witness to thirty transcendental perfections. It symbolizes absolute, unconditional victory over inner demons, obstacles, and perils.</li>
</ul>

<h2>2. Flames of War to Faith: The Casting of Chinnarat Indochina B.E. 2485 at Wat Suthat</h2>
<p>Between 1940 and 1942 (B.E. 2483–2485), Thailand was swept into the Franco-Thai Indochina conflict and World War II. Facing aerial bombardments and frontline combat, soldiers and civilians desperately sought spiritual protection. <strong>The Buddhist Association of Thailand</strong>, led by Pol. Gen. Phra Ram Intra, received royal and patriarchal permission to cast portable Chinnarat amulet statues.</p>
<p>The monumental consecration ceremony commenced within the Grand Ubosot of <strong>Wat Suthat Thepwararam</strong> on February 1, B.E. 2485. <strong>His Holiness Somdej Phra Sangkharat (Phae Tissadeva)</strong>, Supreme Patriarch of Thailand, presided as monastic supreme leader, while <strong>Chao Khun Sri (Son Yattitharo)</strong>, renowned master of ancient Phra Kring metallurgical rites, personally supervised the alloy formulation and foundry operations.</p>
<p>It remains the most legendary consecration rite in 20th-century Siamese history, convening 108 of the greatest enlightened ascetic masters from across the kingdom, including Luang Pho Jad (Wat Bang Krabao), Luang Pho Chong (Wat Na Tang Nok), Luang Pho Khong (Wat Bang Kaphom), Luang Pho Ee (Wat Sattahip), Luang Pho Derm (Wat Nong Pho), Luang Pho Pring (Wat Bang Pakok), and Luang Pu Phueak (Wat King Kaeo).</p>

<h2>3. Metallurgy & Rites of Wat Suthat: Somdej Phra Sangkharat (Phae) and Chao Khun Sri (Son)</h2>
<p>The supernatural prestige of the Indochina 2485 edition was engineered through the <strong>rigorous ancient metallurgy of Wat Suthat</strong>:</p>
<ol>
  <li><strong>Bronze & Ancient Bell Alloys:</strong> The foundational melt incorporated sacred master sprues from historic royal Phra Kring editions of Somdej Phra Sangkharat (Phae), blended with antique bronze gong bells, temple basins, and virgin yellow brass.</li>
  <li><strong>108 Yantra Inscriptions & 14 Na Invocations:</strong> Hundreds of consecrated gold, silver, and copper plates hand-inscribed with esoteric martial and protective yantras by masters across the nation were melted into the molten vat.</li>
  <li><strong>Evolution into "Thong Dok Buab" (Squash Blossom Bronze):</strong> The precise elemental ratio of zinc, copper, tin, silver, and gold created a luminous golden-greenish alloy resembling the petal core of a squash blossom (ทองดอกบวบ). Over decades of atmospheric aging, authentic surfaces develop exquisite silvery sheen and organic fire-patina.</li>
</ol>

<h2>4. Anatomy of Authenticity: Sprues, Filing, and Stamped Dharma-Ok Lao Marks</h2>
<p>In forensic archaeometry, the Indochina 2485 edition was cast utilizing the ancient banana-stalk tree runner system (หล่อช่อโบราณ), exhibiting distinct anatomical hallmarks:</p>
<ul>
  <li><strong>Base Sprue Severance Mark:</strong> After freeing the statues from their baked clay molds, each piece was sawn from its runner sprue, leaving a distinct circular cut mark approximately the diameter of a fingertip under the plinth.</li>
  <li><strong>Master File Trimming:</strong> Ancient artisans used tempered steel hand files to plane the sprue and base smooth. Authentic file marks run in parallel, crisp, disciplined strokes—diametrically opposed to the messy circular abrasive scarring of modern rotary grinders.</li>
  <li><strong>The Two Sacred Steel Stamps:</strong> Most authentic specimens received two deeply incised hand-stamped hallmarks:
    <ul>
      <li><strong>The Wheel of Dhamma (Dhammachakka):</strong> Signifying the turning wheel of truth that dispels mental afflictions and propels the bearer toward worldly and spiritual ascension.</li>
      <li><strong>The Ok Lao Seal (อกเลา):</strong> Emulating the diamond-shaped lotus boss carved upon the central latch of the sanctuary doors at Wat Yai Phitsanulok—an emblem of unshakeable royal protection.</li>
    </ul>
  </li>
</ul>

<h2>5. Consecrated Lineage in Dan Siam Archive: 3 Masterpiece Chinnarats</h2>
<p>The Dan Siam Heritage Research Archive preserves three distinguished museum-grade examples of the Phra Buddha Chinnarat consecration lineage:</p>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ Specimen I: [REF: #147] Phra Kring Phra Buddha Chinnarat YSS B.E. 2543 Thong Dok Buab, Blessed by Luang Pu Mun</h3>
  <p><strong>Archive Reference:</strong> REF: #147 | <strong>Provenance:</strong> Consecrated with the royal patriarchal cipher YSS of Somdej Phra Nyanasamvara</p>
  <p>A magnificent cast bronze Phra Kring in luminous Thong Dok Buab alloy, echoing the golden splendor of the ancient Indochina foundry rites. Bestowed with the royal monogram YSS by Somdej Phra Nyanasamvara, Supreme Patriarch of Thailand, and consecrated in a grand imperial ceremony at Wat Yai Phitsanulok with Luang Pu Mun Thitasilo of Wat Ban Jan presiding in deep samadhi. The internal bell bead resonates with pristine clarity. Flawless preservation.</p>
  <p><a href="/product/phra-kring-buddha-chinnarat-2543-thong-dok-buab-luang-pu-mun" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 View Studio Macro Photography & Alloy Metallurgy [REF: #147]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ Specimen II: [REF: #1601] Phra Buddha Chinnarat Reverse Wheel of Dhamma B.E. 2512, Wat Rajnadda (Consecrated by LP Kuay, LP Toh, LP Pae)</h3>
  <p><strong>Archive Reference:</strong> REF: #1601 | <strong>Provenance:</strong> Grand Vietnam War-era ceremony uniting three supreme masters of Siam</p>
  <p>Pressed from dense holy powders in a luminous ivory-white hue, this tablet depicts the Chinnarat Buddha framed by the Wheel of Dhamma on the reverse. Consecrated at Wat Rajnaddaram in B.E. 2512 by a titan triumvirate: Luang Pho Kuay (Wat Kositaram), Luang Pu Toh (Wat Pradu Chimphli), and Luang Pho Pae (Wat Pikulthong). Provides omnidirectional protection, clears obstacles, and accelerates commercial fortune.</p>
  <p><a href="/product/phra-phut-chinaraj-dharma-wheel-be2512-rajnada" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 View Studio Macro Photography & Tri-Master Consecration Archives [REF: #1601]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ Specimen III: [REF: #1675] Phra Buddha Chinnarat Cast Bronze Navaguna Alloy, Silver Base B.E. 2543, Wat Bowonniwet</h3>
  <p><strong>Archive Reference:</strong> REF: #1675 | <strong>Provenance:</strong> Wat Bowonniwet royal court lineage, full nine-metal bronze with solid silver base plate</p>
  <p>Cast in classical miniature proportions using the ancient Navaguna (nine-metal) formula of the Royal Monastic Court. The oxidized surface has matured into a lustrous obsidian black patina. The solid silver base plate is cleanly hallmarked with the official committee stamp. Emanates commanding leadership charisma, executive dignity, and steadfast protection.</p>
  <p><a href="/product/phra-phuttha-chinarat-cast-nuad-silver-wat-bowonniwet-2543" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 View Studio Macro Photography & Official Committee Hallmarks [REF: #1675]</a></p>
</div>

<h2>6. Demolishing Myths: Does Chinnarat Cause Marital Strife or Heat?</h2>
<p>One of the most irrational and superstitious falsehoods circulating in commercial circles is the claim that "wearing Phra Buddha Chinnarat introduces fire into a marriage, leading to domestic discord and divorce." In Buddhist theology and spiritual philosophy:</p>
<ol>
  <li><strong>The Buddha as the Extinguisher of Fires:</strong> Gautama Buddha is hailed as the supreme physician who quenches the three burning fires of greed (Lobha), anger (Dosa), and delusion (Moha). The Maravijaya posture signifies absolute mental pacification. Venerating the Buddha brings <strong>profound domestic harmony, loving-kindness, and mental coolness</strong>.</li>
  <li><strong>Misinterpreting the Arch as Fire:</strong> The misconception arises from uneducated observers mistaking the intricate Prabhāmaṇḍala arch for destructive flames. In reality, it represents <strong>radiant spiritual light and water-dwelling Naga protectors</strong>—symbols of fertility, rainfall, and peace.</li>
  <li><strong>The True Cause of Domestic Conflict:</strong> Marital discord is entirely the karmic consequence of human ego, dishonesty, and a lack of the Four Immeasurables (Loving-Kindness, Compassion, Sympathetic Joy, Equanimity). The image of Chinnarat serves as a constant reminder to practice patience, forgiveness, and mutual respect.</li>
</ol>

<h2>7. Epilogue: The Victorious Buddha, Sovereign Peace, and Spiritual Light</h2>
<p>The title <strong>“Chinnarat” (ชินราช)</strong> translates literally as <strong>“The Victorious King”</strong>.</p>
<p>The victory embodied by Phra Buddha Chinnarat is not achieved through weapons, military subjugation, or worldly malice, but through <strong>absolute mastery over one’s own fear, doubt, and spiritual darkness</strong>.</p>
<p>When reverently wearing the image of Phra Buddha Chinnarat, let it illuminate the bearer’s path with moral courage and serene wisdom, shielding the bearer from all adversities and leading family, career, and spiritual life toward enduring peace and triumph.</p>
`;

const CONTENT_ZH = `
<p>若论及泰王国数千载佛教美术史上公认<strong>“法相庄严绝伦、造像艺术登峰造极”</strong>之至尊青铜佛像，供奉于彭世洛府瓦帕喜玛哈泰大佛寺（大庙）之<strong>“成功佛”（帕菩达金纳拉，Phra Buddha Chinnarat）</strong>，无疑坐拥全泰乃至东南亚梵宇艺术之至高王座。</p>

<p>在佛历2485年（公元1942年）二战烽火遍及东南亚的绝境之中，曼谷苏泰寺（Wat Suthat）汇聚全泰国运与佛教界泰斗所铸造之“印度支那成功佛”，不仅是一段护国安民的史诗，更是全泰近代金属佛牌之巅峰名作。然而在当今佛牌商业市场中，却充斥着令人匪夷所思的流俗伪说，妄称“佩戴成功佛性情焦躁、会导致夫妻不和或婚姻破裂”。本篇学术考证融合佛教造像学、二战战史与苏泰寺九宝铜冶金秘录，深度还原战火熔炉之史实，破译华光宝阁之密意，廓清这尊至圣古佛的万世清凉真谛。</p>

<h2>一、暹罗至美造像学源流：素可泰立泰大帝铸造成功佛与华光宝阁火焰光背考</h2>
<p>据泰国北方法脉编年史记载，成功佛本尊由<strong>素可泰王朝第五任君王披耶立泰大帝（Maha Thammaracha I）</strong>于佛历1900年间（约公元1357年）敕建。其艺术风格开创了<strong>“素可泰晚期成功佛古典流派”</strong>之艺术极境：</p>
<ul>
  <li><strong>圆满大解脱法相：</strong> 佛容呈完美之鹅卵形，面颊丰腴饱满，前额宽广，双眉细长如初月，肉髻顶戴升腾之莲花火焰光（Rasami）。尤为独特的是，其<strong>四根手指（食指、中指、无名指、小指）长度齐整均等</strong>，完全契合南传佛教三十二相之大男子大丈夫妙相；</li>
  <li><strong>华光宝阁与神龙护法光背（Prabhāmaṇḍala / ซุ้มเรือนแก้ว）：</strong> 环绕佛身之繁复拱门，绝非世俗无知所误认为之“熊熊毁灭烈焰”，而是<strong>神龙（Makara，摩伽罗）与龙王（Naga）口吐吉祥卷草枝叶所交织构成之“佛陀无量清凉智慧华光”（六色佛光）</strong>，象征佛陀成道降魔后，天地万物沐浴在至静至凉之法喜甘露之中；</li>
  <li><strong>降魔印（触地印）：</strong> 右手舒张平覆于右膝之上，指端直指大地，祈请坚牢地神（大地女神）见证佛陀历劫累积之三十二波罗蜜圆满，象征彻底降伏内外一切魔怨阻碍。</li>
</ul>

<h2>二、战火洗礼下的护国圣器：佛历2485年瓦苏泰寺印度支那成功佛铸造史诗</h2>
<p>佛历2483至2485年间，泰国深陷印度支那领土争端与第二次世界大战大东亚战争之战火涂炭。前线将士浴血奋战，后方平民饱受空袭之苦。<strong>泰国佛教总会（พุทธสมาคมแห่งประเทศไทย）</strong>遂正式呈请王室与僧团批准，发起铸造随身佩戴型成功佛，以结缘将士安邦护国。</p>
<p>佛历2485年2月1日，盛况空前之大铸造法会于曼谷<strong>瓦苏泰天神殿皇庙（Wat Suthat Thepwararam）</strong>大雄宝殿拉开帷幕。<strong>第十二任僧王崇迪帕สังฆราช（培·迪萨德沃，Somdej Phra Sangkharat Phae）</strong>亲自主法担纲僧团领袖，而对古法药师佛冶金术深具造诣的<strong>昭坤史（สนธิ์ ยติธโร）</strong>大师则全程总揽熔金与灌模工艺。</p>
<p>这是泰国近代史上规格最高、聚集神僧阵容最辉煌之世纪法会：全泰一百零八位当代最高成就之阿罗汉与避险法门泰斗联袂出席，包括龙婆惹（瓦邦卡包）、龙婆钟（瓦邦达诺）、龙婆公（瓦邦卡蓬）、龙婆宜（瓦萨塔喜）、龙婆登（瓦农波）、龙婆品（瓦邦帕阁）及龙普铺（瓦景叫）等，通宵达旦入定加持。</p>

<h2>三、瓦苏泰寺冶金密法与千古法仪：僧王培尊者、昭坤史与全泰108符管金液</h2>
<p>印度支那成功佛的神奇威能，深深植根于<strong>瓦苏泰寺传承数百年的王室冶金秘录</strong>：</p>
<ol>
  <li><strong>老药师佛熔铸母料与青铜古钟：</strong> 熔炉中投入了僧王培历年所制珍罕药师佛（Phra Kring）之纯金、纯银浇铸母料（Chuan），融汇古刹百年青铜古钟、法器及优质铜合金；</li>
  <li><strong>百单八金刚符管与十四神咒金简：</strong> 全泰一百零八位高僧亲手在金、银、铜片上刻写之《大吉祥军旅神咒》、《金刚顶经护身符》与《降魔十四宝印》，尽数投入沸腾之熔金池中熔冶为一体；</li>
  <li><strong>蜕变升华之“金花铜”（Thong Dok Buab）：</strong> 铜、锌、锡、银与微量黄金之完美配比，使出炉金属呈现如“丝瓜花芯”般璀璨纯净之黄中带绿明亮光芒（ทองดอกบวบ）。历经数十年自然氧化，真品表面自然泛出水银荧光（Phrai Ngoen）与深邃红褐火皮。</li>
</ol>

<h2>四、印度支那成功佛真伪解剖：浇铸树枝切痕、底座锉纹与“法轮-胸膛宝印”暗记</h2>
<p>在古董鉴定法医学视野下，佛历2485年印度支那成功佛为古法香蕉树枝状多联串铸，具备不可动摇之物理防伪体征：</p>
<ul>
  <li><strong>底座浇铸切口断痕（รอยตัดช่อ）：</strong> 破开陶泥外模后，每尊佛牌底座皆连结于总流道青铜树枝上，必须人工以钢锯锯断，因而底座正下方必然留存有一枚如小指端大小之圆形切口断痕；</li>
  <li><strong>古法手工锉刀打磨痕迹（รอยตะไบ）：</strong> 随后工匠使用粗细不同的传统钢锉对底座与毛刺进行手工修平。真品锉痕方向清晰规整、深邃苍劲，与现代电动砂轮机杂乱浅薄之圆弧划痕有天壤之别；</li>
  <li><strong>底座双重深打防伪暗记（钢印）：</strong> 多数呈献流通之真品，底座皆以重力手工深打两枚防伪钢印：
    <ul>
      <li><strong>法轮印（Dhammachakka）：</strong> 八幅法轮象征佛陀八正道，寓意转动正法之轮、破除一切魔障；</li>
      <li><strong>胸膛印（Ok Lao / อกเลา）：</strong> 摹刻自彭世洛大庙大雄宝殿厚重木门枢纽之莲花菱形图腾，乃大城王朝敕封之神圣辟邪王徽。</li>
    </ul>
  </li>
</ul>

<h2>五、丹暹典藏馆藏圣物纪实：三尊跨越半世纪之成功佛至尊法统</h2>
<p>Dan Siam Heritage Research Archive 丹暹古董佛牌典藏库，极为荣幸为藏家呈现三尊经过全方位科学检验与法脉传承考证之成功佛至尊圣品：</p>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ 典范其一：【REF: #147】佛历2543年 僧王府金花铜成功佛药师铃（龙普满大师通宵入定加持）</h3>
  <p><strong>档案编号：</strong> REF: #147 | <strong>圣物法脉：</strong> 僧王府第九任僧王真身名号“ญสส”皇家大皇帝法会极品</p>
  <p>此尊以古法金花铜精铸之成功佛药师铃，闪烁着如古黄金般璀璨之色泽。获泰国僧王崇迪帕耶纳桑文尊者特许赐予皇家名号“ญสส”，并于彭世洛府成功佛祖庙举行皇家开光大典，特邀近代五百年一遇神僧龙普满（瓦班赞）亲临法会并通宵入定灌顶。内封之药师法铃清脆悦耳、直透云霄，品相全美如新。</p>
  <p><a href="/product/phra-kring-buddha-chinnarat-2543-thong-dok-buab-luang-pu-mun" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 点击进入典藏微距摄影专页与金属金相学鉴定档案【REF: #147】</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ 典范其二：【REF: #1601】曼谷瓦拉差纳达寺 佛历2512年 经粉法轮成功佛（龙婆贵、龙普多、龙婆培联合加持）</h3>
  <p><strong>档案编号：</strong> REF: #1601 | <strong>圣物法脉：</strong> 融汇印度支那法轮理念、越战三大神僧巅峰联袂加持之作</p>
  <p>以纯白经粉压制，正面成功佛法相端庄，背面深深刻印承袭自2485印度支那精神之法轮符纹。佛历2512年于曼谷瓦拉差纳达寺开光，由猜纳府神僧龙婆贵、必打王龙普多（瓦巴鲁清批）及崇迪宗师龙婆培（瓦匹坤通）联手加持。兼备全面护佑避险、化解商海官非与招引八方顺畅财气之大威德。</p>
  <p><a href="/product/phra-phut-chinaraj-dharma-wheel-be2512-rajnada" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 点击进入典藏微距摄影专页与三大泰斗法会历史档案【REF: #1601】</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ 典范其三：【REF: #1675】曼谷僧王庙瓦波旺尼威 佛历2543年 九宝铜纯银底板成功佛</h3>
  <p><strong>档案编号：</strong> REF: #1675 | <strong>圣物法脉：</strong> 僧王庙正统九宝铜宫廷熔铸、纯银底板深打理事防伪钢印</p>
  <p>此尊成功佛依僧王庙宫廷九宝铜古法熔铸，历经岁月陈化，氧化皮壳已深邃蜕变为高贵之深玄色（九宝铜黑皮）。底座封以纯银封板，并深打理事会专用防伪暗印。具备极其宏大之领导者气场、降魔威权与庇佑功名步步高升之功德。</p>
  <p><a href="/product/phra-phuttha-chinarat-cast-nuad-silver-wat-bowonniwet-2543" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 点击进入典藏微距摄影专页与纯银底板理事钢印全析【REF: #1675】</a></p>
</div>

<h2>六、严正批驳商业流俗伪妄：“佩戴成功佛性情焦躁、导致婚姻破裂”迷信辟谬</h2>
<p>在所有佛牌商业流俗谬论中，最荒诞不经、贻害最深的谎言，莫过于所谓的“成功佛带火气，佩戴者夫妻脾气变大，容易家庭破裂甚至离婚”。以正统佛学神学与心性修持观之：</p>
<ol>
  <li><strong>佛陀乃三界至高清凉解脱者：</strong> 释迦牟尼佛乃彻底息灭贪、嗔、痴三毒烈火之大觉者。触地降魔印之本质，即是以无我大定平息外界一切戾气与仇怨。至诚奉持佛陀像，唯有感召<strong>“家庭和睦、怨怼消弭、心境清凉”</strong>之善果，绝无反招家庭暴躁之邪理；</li>
  <li><strong>将“六色华光”误判为“世俗烈火”的荒谬源头：</strong> 此等无知伪说的根源，在于不懂造像艺术之附会者，望文生义地将神龙与龙王护法所交织之“华光宝阁”误认作“燃烧火堆”。实则在东南亚佛教文化中，神龙与宝阁乃行云布雨、润泽万物与安居乐业之至尊祥瑞；</li>
  <li><strong>家庭矛盾之真实因果：</strong> 夫妻反目与家庭破裂，根源完全在于双方执念深重、自私傲慢、缺乏“四梵住”（慈、悲、喜、舍）之心智修行。成功佛恰恰是一面照见自我嗔恨心之明镜，时时策励行者克制怒火、彼此包容感恩。</li>
</ol>

<h2>七、结语：降伏三界魔障之大成功佛陀、至静吉祥之万世护佑</h2>
<p><strong>“金纳拉”（Chinnarat，ชินราช）</strong>梵巴语原义直译即为<strong>“至胜之王”（The Victorious King / 战胜一切者）</strong>。</p>
<p>成功佛所垂赐之后世信徒的大成功，从不建立在刀枪武力之掠夺或击败竞争对手之仇恨上，而是建立在<strong>“彻底战胜内心无明、恐惧、怯懦与贪婪”</strong>的大胜利。</p>
<p>恭请奉持成功佛圣相，当以大清净心常随佛学。佛陀那穿越千载的慈悲凝视与至美法相，必将化作破除一切厄难险阻之无坚不摧之金刚利剑，护佑奉持者家庭和睦、事业昌盛，生生世世安稳于清凉吉祥之正道！</p>
`;

async function insertArticle19() {
  console.log('[Article 19] Starting insert for Phra Buddha Chinnarat Indochina & Royal Masterworks...');

  const payload = {
    slug: 'phra-buddha-chinnarat-indochina-2485-sacred-history',
    title: 'The Most Sublime Buddhist Art of Siam: The Epic History of “Phra Buddha Chinnarat Indochina B.E. 2485” to the Sacred Phra Kring Chinnarat YSS Blessed by Luang Pu Mun',
    title_th: 'พุทธศิลป์ที่งดงามที่สุดในสยาม: ประวัติศาสตร์ “พระพุทธชินราช อินโดจีน ๒๔๘๕” สู่พระกริ่งชินราช ญสส. หลวงปู่หมุนเสก',
    title_zh: '暹罗至美梵宇法相考：从二战烽火“佛历2485年印度支那成功佛”到僧王府龙普满加持“金花铜成功佛药师铃”之万世法统',
    excerpt: 'An authoritative historical, liturgical, and metallurgical treatise on Phra Buddha Chinnarat Indochina B.E. 2485 cast at Wat Suthat, the iconography of the Prabhāmaṇḍala shrine, and three authenticated masterworks from the Dan Siam Collection.',
    excerpt_th: 'งานวิจัยประวัติศาสตร์ โลหวิทยา และพุทธศิลป์ชั้นสูง เจาะลึกมหากาพย์ “พระพุทธชินราช อินโดจีน ๒๔๘๕” วัดสุทัศนเทพวราราม ถอดรหัสประติมานวิทยาซุ้มเรือนแก้ว ล้างมายาคติเรื่องชีวิตคู่ และการเชื่อมโยง ๓ วัตถุมงคลองค์ครูใน Dan Siam Heritage Collection',
    excerpt_zh: '以博物馆级学术水准全面考证全泰最美佛相“成功佛”（帕菩达金纳拉）。详尽考述佛历2485年二战苏泰寺盛大铸造始末、九宝铜与金花铜冶金学原理、华光宝阁造像学，并呈献丹暹典藏库三尊权威真品圣物。',
    content: CONTENT_EN + COPYRIGHT_HTML,
    content_th: CONTENT_TH + COPYRIGHT_HTML,
    content_zh: CONTENT_ZH + COPYRIGHT_HTML,
    cover_image: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/m-1781275782871-7b7xlafce1g.webp',
    category: 'ประวัติศาสตร์พระเครื่อง',
    published: false,
    created_at: '2026-10-24T07:00:00.000Z',
    updated_at: new Date().toISOString()
  };

  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', payload.slug)
    .single();

  if (existing) {
    console.log(`[Article 19] Found existing post with id ${existing.id}, updating...`);
    const { error } = await supabase.from('blog_posts').update(payload).eq('id', existing.id);
    if (error) {
      console.error('Update failed:', error);
    } else {
      console.log('✓ Successfully updated Article 19!');
    }
  } else {
    console.log('[Article 19] Inserting new post...');
    const { error } = await supabase.from('blog_posts').insert([payload]);
    if (error) {
      console.error('Insert failed:', error);
    } else {
      console.log('✓ Successfully inserted Article 19!');
    }
  }
}

insertArticle19();
