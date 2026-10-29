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
<p>ในทำเนียบ <strong>“ชุดเบญจภาคี”</strong> อันเป็นสุดยอดแห่งมรดกพระเครื่องสยามประเทศ หาก <em>พระสมเด็จวัดระฆัง</em> ได้รับการถวายพระเกียรติยศเป็น “ราชาแห่งพระเครื่อง” พระพิมพ์เนื้อดินเผารูปทรงสามเหลี่ยมหน้าจั่วอันสง่างามนามว่า <strong>“พระนางพญา” แห่งเมืองพิษณุโลก</strong> ย่อมครองสถานะอันไร้คู่เปรียบเทียบในฐานะ <strong>“ราชินีแห่งพระเครื่อง” (The Queen of Amulets)</strong></p>

<p>ทว่าในความรับรู้ร่วมสมัย พระนางพญามักถูกเข้าใจผิดอย่างตื้นเขินว่าเป็น "พระเครื่องที่สร้างขึ้นสำหรับผู้หญิงบูชาเท่านั้น" หรือมีพุทธคุณเฉพาะเพียงด้านมหาเสน่ห์ บทความวิจัยประวัติศาสตร์และโบราณคดีชิ้นนี้จะพาผู้อ่านย้อนรอยสู่ศตวรรษที่ ๑๖ แห่งกรุงศรีอยุธยา เพื่อถอดรหัสพระราชปณิธานของพระวิสุทธิกษัตรีย์ ศาสตร์แห่งเนื้อดินเผาโบราณ และประติมานวิทยาแห่งมหาอำนาจผู้นำอย่างลึกซึ้ง</p>

<h2>๑. ปฐมบทแห่งราชินีพระเครื่อง: พระราชปณิธานพระวิสุทธิกษัตรีย์ ยุคสงครามอยุธยา-หงสาวดี</h2>
<p>ย้อนรอยประวัติศาสตร์กลับไปในรัชสมัย <strong>สมเด็จพระมหาธรรมราชาธิราช</strong> แห่งราชวงศ์สุโขทัย ซึ่งครองเมืองพิษณุโลก (เมืองอกแตกศูนย์กลางอำนาจฝ่ายเหนือ) ในช่วงกึ่งพุทธศตวรรษที่ ๒๑ (ราว พ.ศ. ๒๐๙๕–๒๑๑๒) แผ่นดินสยามต้องเผชิญกับภัยสงครามครั้งใหญ่จากการรุกรานของอาณาจักรตองอู (หงสาวดี)</p>
<p><strong>พระวิสุทธิกษัตรีย์</strong> พระราชมารดาใน <em>สมเด็จพระนเรศวรมหาราช</em>, <em>สมเด็จพระเอกาทศรถ</em> และ <em>พระสุพรรณกัลยา</em> ทรงมีพระราชศรัทธาอันยิ่งใหญ่ในพระพุทธศาสนาและทรงห่วงใยในชะตากรรมของบ้านเมือง จึงทรงมีพระราชดำริให้บูรณปฏิสังขรณ์ <strong>วัดนางพญา</strong> ซึ่งตั้งอยู่ทางทิศตะวันออกของวัดพระศรีรัตนมหาธาตุวรมหาวิหาร พร้อมทั้งสถาปนาพระพิมพ์เนื้อดินเผาขึ้นบรรจุกรุในองค์พระเจดีย์</p>
<p>วัตถุประสงค์ที่แท้จริงของการสร้างพระนางพญาในครั้งนั้น มิใช่การสร้างเพื่อเป็นเครื่องประดับสตรี แต่เป็นการ <strong>“สร้างขึ้นเพื่อพระราชทานแก่เหล่าแม่ทัพ นายกอง และทหารหาญแห่งพิษณุโลก”</strong> เพื่อใช้เป็นเครื่องยึดเหนี่ยวจิตใจในการออกศึกปกป้องอธิปไตยของแผ่นดินสยาม</p>

<h2>๒. ประติมานวิทยารูปทรงสามเหลี่ยม: สมดุลแห่งธาตุและปางมารวิชัยอันองอาจ</h2>
<p>พุทธศิลป์ของพระนางพญาเป็นมรดกชิ้นเอกที่หลอมรวมระหว่าง <strong>ศิลปะสุโขทัยบริสุทธิ์</strong> กับ <strong>ศิลปะอยุธยาตอนกลาง</strong> ได้อย่างสมดุล:</p>
<ul>
  <li><strong>รูปทรงสามเหลี่ยมหน้าจั่ว (Isosceles Triangle):</strong> สื่อถึงความมั่นคงดั่งขุนเขา (คติปฐวีธาตุ) และเป็นสัญลักษณ์ของตรีรัตนะ (พระพุทธ พระธรรม พระสงฆ์) ฐานตัดกว้างปลายสอบแหลม ไร้ซุ้มประภามณฑลและฐานรองรับ แสดงถึงความเรียบง่ายแต่งดงามอย่างเด็ดขาด</li>
  <li><strong>ปางมารวิชัย (Subduing Mara):</strong> พระหัตถ์ขวาวางคว่ำบนพระชานุ ชี้ลงสู่พื้นปฐพีเพื่ออัญเชิญพระแม่ธรณีเป็นพยานแห่งการตรัสรู้ พระหัตถ์ซ้ายวางหงายบนพระเพลาในท่าสมาธิ พระอุระผึ่งผาย วงแขนทอดโค้งอ่อนช้อยดั่งคันศรตามคติช่างหลวงสุโขทัย</li>
  <li><strong>สังฆาฏิหนาพาดเฉียง:</strong> พาดจากพระอังสาซ้ายยาวจรดพระนาภีอย่างสง่างาม สะท้อนสถานะความเป็นพระสุปฏิปันโนผู้ทรงธรรม</li>
</ul>

<h2>๓. ศาสตร์แห่งดินเผาโบราณ: นิติแร่วิทยาแห่งกรุวัดนางพญา</h2>
<p>ในทางปฐพีวิทยาและโบราณคดี พระนางพญากรุวัดนางพญาเป็นพระเนื้อดินเผาที่มีความแกร่งเป็นเลิศ มวลสารประกอบด้วยดินเหนียวละเอียดผสมกับแร่กรวดทรายและว่านเกสร ๑๐๘:</p>
<ol>
  <li><strong>เม็ดแร่ผุดธรรมชาติ:</strong> เมื่อส่องด้วยกล้องขยาย ๓๐ เท่า จะพบเม็ดแร่ควอตซ์ (Quartz) แร่เหล็กออกไซด์ (Hematite) สีน้ำตาลแดง และเม็ดกรวดสีขาวขุ่น-ใส ฝังตัวแน่นอยู่ในเนื้อดินอย่างเป็นระเบียบตามธรรมชาติ</li>
  <li><strong>รอยเหนอะและรอยย่นด้านหลัง (Dorsal Texture):</strong> ด้านหลังของพระนางพญาแท้จะมีรอยตัดขอบด้วยตอกไม้ไผ่โบราณ ทำให้เกิดรอยปริแยก รอยย่น และรอยเหนอะของเนื้อดินที่หดตัวตามธรรมชาติขณะที่พระยังหมาดก่อนนำไปเผา</li>
  <li><strong>วรรณะสีแห่งเตาเผา:</strong> สีของพระนางพญาแปรผันตามระดับความร้อนและการรับออกซิเจนในเตาเผาโบราณ ได้แก่ สีแดงอิฐ, สีเหลืองพิกุล, สีเขียวมอย (ผ่านความร้อนสูง), และสีดำ/ผ่าน</li>
</ol>

<h2>๔. ประวัติศาสตร์การแตกกรุ: จากยุคพระพุทธเจ้าหลวง ร.๕ สู่การบูรณะกึ่งพุทธกาล</h2>
<p>พระนางพญาถูกฝังกรุอยู่ใต้พระเจดีย์วัดนางพญาเป็นเวลายาวนานกว่า ๓๐๐ ปี จนกระทั่งมีการแตกกรุขึ้นในประวัติศาสตร์สมัยรัตนโกสินทร์:</p>
<ul>
  <li><strong>การแตกกรุครั้งแรก (พ.ศ. ๒๔๔๔):</strong> ในรัชสมัย <em>พระบาทสมเด็จพระจุลจอมเกล้าเจ้าอยู่หัว (รัชกาลที่ ๕)</em> เมื่อครั้งเสด็จประพาสเมืองพิษณุโลกเพื่อทอดพระเนตรการหล่อพระพุทธชินราชจำลอง องค์เจดีย์วัดนางพญาเกิดพังทลายลง ชาวบ้านและคณะข้าราชบริพารจึงได้ค้นพบพระนางพญาเป็นครั้งแรก พระองค์ได้พระราชทานแก่ข้าราชบริพารและนายทหารชั้นผู้ใหญ่</li>
  <li><strong>การเปิดกรุบูรณะ (พ.ศ. ๒๔๗๙ – ๒๔๙๗):</strong> มีการขุดพบพระนางพญาเพิ่มเติมจากการรื้อกำแพงและบูรณะพระอุโบสถ ส่งผลให้ชื่อเสียงแห่ง "ราชินีพระเครื่อง" ขจรขจายไปทั่วประเทศ</li>
  <li><strong>พิธีมหาพุทธาภิเษกวัดนางพญา ปี ๒๕๑๔:</strong> ในยุคกึ่งพุทธกาล เมื่อพระวิหารวัดนางพญาชำรุดทรุดโทรม <strong>หลวงพ่อถนอม (พระครูศีลสารสัมบัน)</strong> อดีตเจ้าอาวาสวัดนางพญา ได้รวบรวมชิ้นส่วนพระนางพญากรุเก่าที่แตกหัก นำมาบดผสมกับมวลสารศักดิ์สิทธิ์ จัดสร้างพระนางพญารุ่นประวัติศาสตร์ พ.ศ. ๒๕๑๔ โดยมีพระเกจิอาจารย์ระดับประเทศร่วมปลุกเสกอย่างยิ่งใหญ่</li>
</ul>

<h2>๕. วัตถุมงคลจริงในคลังมรดก Dan Siam: พยานวัตถุแห่งสายบารมีพระนางพญา</h2>
<p>Dan Siam Heritage Collection ขอเปิดบันทึกพระนางพญาองค์สำคัญที่ผ่านการตรวจสอบความแท้ตามมาตรฐานสากล ทั้ง ๓ รายการ:</p>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ รายการที่ ๑: [REF: #201] พระนางพญา เนื้อดินผสมผงพุทธคุณ หลวงพ่อถนอม วัดนางพญา พิษณุโลก ปี ๒๕๑๔ พิมพ์เล็ก</h3>
  <p><strong>รหัสวัตถุมงคล:</strong> REF: #201 | <strong>สถานะ:</strong> พระแท้มาตรฐานสากล พระเกจิระดับประเทศร่วมเสก</p>
  <p>พระนางพญาสายตรงจากอารามหลวงต้นกำเนิด สร้างขึ้นในปี พ.ศ. ๒๕๑๔ โดยหลวงพ่อถนอม ผสมผงพระนางพญากรุเก่าแท้ๆ อย่างเข้มข้น ประกอบพิธีมหาพุทธาภิเษกโดยสุดยอดพระคณาจารย์แห่งยุค อาทิ หลวงปู่โต๊ะ วัดประดู่ฉิมพลี, หลวงปู่ฝั้น อาจาโร, หลวงพ่อเงิน วัดดอนยายหอม, และหลวงพ่อแพ วัดพิกุลทอง พระสภาพสวยสมบูรณ์ คมชัดลึก ไร้รอยอุดซ่อม</p>
  <p><a href="/product/phra-nang-phaya-luang-pho-thanom-wat-yang-phaya-be-2514" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 คลิกเพื่อเข้าชมภาพสตูดิโอความละเอียดสูงและรายละเอียดมวลสาร [REF: #201]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ รายการที่ ๒: [REF: #1676] พระนางพญา หลวงปู่เทียม วัดกษัตราธิราช ปี ๒๕๑๙ เนื้อผงใบลาน หลังลายผ้า</h3>
  <p><strong>รหัสวัตถุมงคล:</strong> REF: #1676 | <strong>สถานะ:</strong> พระคณาจารย์ผู้สำเร็จตำรับพิชัยสงครามกรุงเก่า</p>
  <p>พระนางพญาเนื้อผงใบลานเผา ผสมว่านและผงพุทธคุณศักดิ์สิทธิ์ สถาปนาโดย หลวงปู่เทียม วัดกษัตราธิราชวรวิหาร พระเถระผู้มีตบะบารมีแก่กล้าแห่งพระนครศรีอยุธยา ด้านหลังประทับรอยลายผ้าเอกลักษณ์ชัดเจน ผสมผสานระหว่างอำนาจบารมีผู้นำและแคล้วคลาดคงกระพันชาตรี</p>
  <p><a href="/product/phra-nang-phaya-luang-pu-thiem-wat-ksattradhiraj-be2519" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 คลิกเพื่อเข้าชมภาพสตูดิโอความละเอียดสูงและรายละเอียดเนื้อหา [REF: #1676]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ รายการที่ ๓: [REF: #1652] พระนางพญา ทรงจิตรลดา อาจารย์เชื้อ วัดสะพานสูง ปี ๒๕๐๕</h3>
  <p><strong>รหัสวัตถุมงคล:</strong> REF: #1652 | <strong>สถานะ:</strong> มวลสารผงพุทธคุณเก่าวัดสะพานสูงและผงสมเด็จกรุเก่า</p>
  <p>พระพิมพ์นางพญาประยุกต์พิมพ์ทรงจิตรลดา สถาปนาโดย อาจารย์เชื้อ หนูเพ็ชร์ วัดสะพานสูง (บางซื่อ) ผู้เชี่ยวชาญการผสมผงวิเศษและแร่ธาตุกายสิทธิ์ องค์พระมีเนื้อหาแกร่ง ผิวพรรณแห้งผากเป็นธรรมชาติ ด้านหลังจารอักขระลายเซ็นต์ประจำตัวอันทรงคุณค่า</p>
  <p><a href="/product/phra-nang-phya-thong-chitrlada-ajarn-chuea-wat-saphan-sung-2505" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 คลิกเพื่อเข้าชมภาพสตูดิโอความละเอียดสูงและรายละเอียดด้านหลัง [REF: #1652]</a></p>
</div>

<h2>๖. ล้างมายาคติ: พระนางพญา เหมาะสำหรับผู้หญิงเท่านั้นจริงหรือ?</h2>
<p>หนึ่งในมายาคติที่แพร่หลายที่สุดในวงการพระเครื่อง คือความเชื่อที่ว่า "ผู้ชายไม่ควรห้อยพระนางพญา เพราะเป็นพระสำหรับผู้หญิง" ข้อเท็จจริงทางประวัติศาสตร์และโบราณคดีชี้ชัดว่า:</p>
<ol>
  <li><strong>วัตถุประสงค์เพื่อการศึกสงคราม:</strong> ในยุคสมเด็จพระมหาธรรมราชาธิราชและสมเด็จพระนเรศวรมหาราช ผู้ที่ต้องออกรบแนวหน้าเผชิญหน้ากับคมดาบ หอก และปืนไฟ คือ <em>เหล่าทหารหาญและแม่ทัพนายกองที่เป็นบุรุษ</em> พระวิสุทธิกษัตรีย์ทรงสร้างพระนางพญาขึ้นเพื่อคุ้มครองชีวิตของเหล่านักรบเหล่านี้</li>
  <li><strong>มิติแห่ง "ราชินี" ในวงการพระเครื่อง:</strong> คำว่า "ราชินีแห่งพระเครื่อง" เพิ่งได้รับการบัญญัติขึ้นโดย <em>คุณตรียัมปวาย (พ.อ.ประจักษ์ ทิพยรัตนศุภผล)</em> ในปี พ.ศ. ๒๔๙๕ เมื่อท่านได้จัดหมวดหมู่ "เบญจภาคี" ขึ้น โดยเปรียบพระสมเด็จที่มีทรงสี่เหลี่ยมเป็นพระราชา และเทียบพระพิมพ์สามเหลี่ยมที่มีความอ่อนช้อยเป็นพระราชินี มิใช่การจำกัดเพศของผู้บูชาแต่อย่างใด</li>
</ol>
<p>ดังนั้น พระนางพญาจึงเป็นพระเครื่องที่เปี่ยมด้วย <strong>“มหาอำนาจบารมี เมตตามหานิยม และแคล้วคลาดนิรันตราย”</strong> เหมาะสำหรับผู้นำ ผู้บริหาร ข้าราชการ และนักธุรกิจทุกเพศทุกวัยที่ต้องบริหารจัดการผู้คนและเผชิญหน้ากับความท้าทายในชีวิต</p>

<h2>๗. บทสรุป: พุทธบารมีแห่งพระนางพญา เครื่องเตือนใจแห่งความเข้มแข็งและเมตตา</h2>
<p>คุณค่าที่แท้จริงของพระนางพญามิได้อยู่ที่มูลค่าการเช่าหาในเชิงพาณิชย์ แต่อยู่ที่ <strong>“จิตวิญญาณแห่งความเสียสละและความรักชาติ”</strong> ของบูรพกษัตริย์และบรรพชนไทยในอดีต</p>
<p>เมื่อเราน้อมอาราธนาพระนางพญาขึ้นบูชา ย่อมเป็นเครื่องเตือนสติให้เราตั้งมั่นอยู่ใน <strong>“ศีล สัตย์ และความกล้าหาญ”</strong> ดั่งเหล่านักรบกรุงศรีอยุธยา พร้อมทั้งแผ่ความเมตตาปรานีให้แก่สรรพสัตว์ เพื่อสร้างสรรค์สันติสุขและความเจริญรุ่งเรืองให้แก่ชีวิตและสังคมสืบไป</p>
`;

const CONTENT_EN = `
<p>Within the supreme pantheon of Siam’s votive art known as the <strong>Benjapakee Grand Quintet</strong>, if the revered <em>Phra Somdej Wat Rakang</em> reigns as the universally crowned "King of Amulets", then the triangular terracotta masterpiece known as <strong>Phra Nang Phaya of Phitsanulok</strong> holds the uncontested title of <strong>"The Queen of Amulets"</strong>.</p>

<p>Yet in contemporary popular discourse, this historic votive tablet is frequently trivialized by commercial myths claiming it is "strictly an amulet for women" or solely intended for superficial charm. This scholarly archaeological treatise travels back to 16th-century Ayutthaya to deconstruct the royal commission of Queen Wisutkasat, the mineralogical petrology of ancient kiln firings, and the masculine military theology of leadership charisma.</p>

<h2>1. Genesis of the Queen of Amulets: Queen Wisutkasat and the Ayutthaya-Hanthawaddy Wars</h2>
<p>The genesis of Phra Nang Phaya dates back to the mid-16th century (approx. 1550–1570 C.E.) during the reign of <strong>King Maha Thammarachathirat</strong> of the Sukhothai Dynasty, who governed Phitsanulok—the northern strategic fortress of Siam. During this tumultuous era, the Siamese kingdom faced catastrophic military incursions from the expanding Burmese Toungoo Empire.</p>
<p><strong>Queen Regent Wisutkasat</strong>—royal consort to the king and mother of legendary warrior-kings <em>King Naresuan the Great</em> and <em>King Ekathotsarot</em>—was a royal patron of immense spiritual fortitude. Confronted with the existential threat of foreign conquest, she sponsored the grand restoration of <strong>Wat Nang Phaya</strong>, situated immediately east of Wat Phra Si Rattana Mahathat, and commissioned the moulding of triangular votive tablets to be enshrined in its stupas.</p>
<p>Crucially, historic military annals verify that these votive tablets were not intended as feminine adornments, but were <strong>bestowed directly upon generals, battalion commanders, and frontline warriors</strong> embarking on defensive campaigns to liberate Siam.</p>

<h2>2. Iconography of the Triangle: Elemental Stability and the Maravijaya Stance</h2>
<p>The artistic lineage of Phra Nang Phaya represents a seamless convergence between pure <strong>Late Sukhothai elegance</strong> and <strong>Middle Ayutthayan solemnity</strong>:</p>
<ul>
  <li><strong>The Isosceles Triangle (Prithvi Tattva):</strong> Rooted in ancient sacred geometry, the isosceles triangle symbolizes the unshakeable foundation of the Earth element (Prithvi) and the Triple Gem (Buddha, Dhamma, Sangha). Its broad base and sharp apex express impenetrable strength without extraneous ornamental pediments.</li>
  <li><strong>The Maravijaya Mudra:</strong> The right hand descends gently over the right knee, invoking Phra Mae Thoranee (the Earth Goddess) as witness to Enlightenment, while the left hand rests in tranquil Dhyana meditation upon the lap. The broad, heroic chest and bow-like curving arms reflect Sukhothai royal casting ideals.</li>
  <li><strong>The Diagonal Sanghati:</strong> A prominent, thick monastic sash drapes diagonally from the left shoulder to the navel, symbolizing complete monastic purity and spiritual nobility.</li>
</ul>

<h2>3. Ancient Soil Science: Forensic Petrology of the Wat Nang Phaya Kilns</h2>
<p>From the perspective of archaeological mineralogy, Phra Nang Phaya tablets are ceramic terracotta composites engineered for exceptional durability:</p>
<ol>
  <li><strong>Natural Mineral Inclusions:</strong> Microscopic inspection under 30x magnification reveals inclusions of sub-angular quartz grains, oxidized red hematite, and rounded river-silt gravel naturally dispersed throughout the refined clay matrix.</li>
  <li><strong>Dorsal Cut-Marks ( Bamboo Tool Separation):</strong> Authentic specimens display distinctive dorsal shrinkage wrinkles, fine striations, and indented drying fissures caused by slicing the wet clay slabs with bamboo knives prior to kiln firing.</li>
  <li><strong>Atmospheric Kiln Coloration:</strong> The chromatic spectrum of Phra Nang Phaya ranges from brick-red and Pikul-yellow to olive-green and black, directly reflecting the gradient of heat and reduction-oxidation atmospheres inside ancient wood-fired kilns.</li>
</ol>

<h2>4. Excavation History: From King Rama V's Royal Tour to B.E. 2514 Consecrations</h2>
<p>Preserved undisturbed within the stupas of Wat Nang Phaya for over three centuries, the tablets entered recorded history through significant rediscovery epochs:</p>
<ul>
  <li><strong>The Historic B.E. 2444 Rediscovery:</strong> In 1901 C.E., during the reign of <strong>King Chulalongkorn (Rama V)</strong>, the monarch visited Phitsanulok to inspect the casting of the replica Phra Buddha Chinnarat. When the decaying brick stupa of Wat Nang Phaya collapsed, hundreds of ancient tablets spilled forth. King Rama V bestowed these certified relics upon senior ministers and military officers.</li>
  <li><strong>The B.E. 2514 Memorial Edition:</strong> When the central Viharn required major restoration, <strong>Luang Pho Thanom</strong>, abbot of Wat Nang Phaya, collected genuine shattered antique fragments from the ancient crypt, pulverized them into sacred dust, and consecrated the historic B.E. 2514 edition with Thailand's foremost masters including Luang Pu Toh (Wat Praduchimplee) and Luang Pu Fan (Wat Pa Udom Somphon).</li>
</ul>

<h2>5. Certified Archival Specimens in Dan Siam Heritage Collection</h2>
<p>To provide verified tangible reference points, Dan Siam Heritage Collection presents three authenticated masterworks:</p>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ Specimen 1: [REF: #201] Phra Nang Phaya Clay & Sacred Powder B.E. 2514 Wat Nang Phaya (Small Mould)</h3>
  <p><strong>Registry:</strong> REF: #201 | <strong>Authentication:</strong> Certified Authentic by Industry Standards</p>
  <p>Consecrated in B.E. 2514 directly at the ancestral royal monastery in Phitsanulok by Luang Pho Thanom, formulated with an exceptionally high concentration of ancient crushed Wat Nang Phaya crypt clay. Blessed in a grand assembly featuring Luang Pu Toh, Luang Pu Fan, and Luang Pho Ngern (Wat Don Yai Hom).</p>
  <p><a href="/product/phra-nang-phaya-luang-pho-thanom-wat-yang-phaya-be-2514" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 Inspect Studio Micro-Macro Imagery [REF: #201]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ Specimen 2: [REF: #1676] Phra Nang Phaya Luang Pu Thiem Wat Kasattrathirat B.E. 2519 (Palm-Leaf Ash & Fabric-Pattern Reverse)</h3>
  <p><strong>Registry:</strong> REF: #1676 | <strong>Lineage:</strong> Ayutthaya Martial Yantra & Victory Treatise Master</p>
  <p>Cast from consecrated incised palm-leaf ash and sacred powders by Luang Pu Thiem, a supreme Ayutthayan master renowned for mastering ancient military victory treatises (Tamra Phichai Songkhram). The reverse exhibits deep textile weave impressions.</p>
  <p><a href="/product/phra-nang-phaya-luang-pu-thiem-wat-ksattradhiraj-be2519" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 Inspect Reverse Textile Weave Matrix [REF: #1676]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ Specimen 3: [REF: #1652] Phra Nang Phaya Chitrlada Style Archan Chuea Wat Saphan Sung B.E. 2505</h3>
  <p><strong>Registry:</strong> REF: #1652 | <strong>Provenance:</strong> Sacred Wat Saphan Sung Lineage</p>
  <p>A classic B.E. 2505 interpretation merging the Nang Phaya geometry with the Chitrlada form by Archan Chuea of Wat Saphan Sung. Renowned for incorporating ancient Somdej powders and mineralized relics, with an inscribed autograph hallmark on the reverse.</p>
  <p><a href="/product/phra-nang-phya-thong-chitrlada-ajarn-chuea-wat-saphan-sung-2505" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 Inspect Hallmarks and Surface Patina [REF: #1652]</a></p>
</div>

<h2>6. Busting Commercial Myths: Is Phra Nang Phaya Only for Women?</h2>
<p>One of the most pervasive fallacies in the amulet market is the assertion that men should avoid wearing Phra Nang Phaya. Archival history refutes this completely:</p>
<ol>
  <li><strong>Martial Bestowal:</strong> The warriors who defended Ayutthaya on the frontlines were predominantly men. Queen Wisutkasat created these tablets specifically as invulnerability and protective shields for frontline officers.</li>
  <li><strong>Origin of the Title "Queen of Amulets":</strong> The term was coined in 1952 C.E. by legendary numismatist <em>Triyampaway (Col. Prajak Tippayaratnasuphaphol)</em> when formalizing the Benjapakee set. He metaphorically designated the rectangular Phra Somdej as the King, and the triangular, elegant Phra Nang Phaya as the Queen based purely on aesthetic harmony, not gender segregation.</li>
</ol>
<p>Consequently, Phra Nang Phaya is an amulet of <strong>supreme executive authority (Maha Amnat), universal charisma (Metta Mahaniyom), and absolute protection (Klaew Klaad)</strong>, equally powerful for leaders, executives, and practitioners of all genders.</p>

<h2>7. Epilogue: The Living Spirit of Courage and Compassion</h2>
<p>The true value of Phra Nang Phaya does not reside in speculative market transactions, but in the unyielding spiritual resolve of Thailand's ancestors who defended liberty and faith with their lives.</p>
<p>When worn with genuine mindfulness, Phra Nang Phaya serves as a constant anchor for moral discipline, unshakeable courage, and boundless compassion toward all beings.</p>
`;

const CONTENT_ZH = `
<p>在泰王国至高无上的<strong>“五古佛”（Benjapakee）</strong>传世圣像体系中，若瓦拉康崇迪佛被公推为“佛牌之王”，那么诞生于彭世洛府的等腰三角形陶土古佛——<strong>“帕南帕雅”（Phra Nang Phaya）</strong>，便毫无争议地尊享<strong>“佛牌之后”（The Queen of Amulets）</strong>之无上尊荣。</p>

<p>然而在当代商业流俗中，帕南帕雅常被轻蔑地误读为“仅限女性佩戴的招人缘小品”。本篇历史考据文献将带您重返十六世纪阿育陀耶王朝血与火的战争岁月，还原维素卡萨王后（Queen Wisutkasat）督造圣物的护国本愿，剖析古陶窑炉矿物相学，破除性别迷思，体悟大统领之无上霸气与慈悲真谛。</p>

<h2>第一章 佛牌之后之诞生：维素卡萨王后与阿育陀耶保卫战</h2>
<p>帕南帕雅佛牌之创设，上溯至十六世纪中叶（约佛历2095–2112年）素可泰王朝<strong>玛哈·塔玛拉差提腊王</strong>统治时期。彼时彭世洛城为镇守北方之军事枢纽，暹罗正遭受缅甸东吁王朝铁骑之残酷围攻。</p>
<p><strong>维素卡萨王后</strong>——一代雄主<em>纳黎萱大帝</em>与<em>厄甲陀沙罗大帝</em>之圣母，深怀护国安民之大愿，毅然下令出资全面重修彭世洛城东部的<strong>南帕雅寺（Wat Nang Phaya）</strong>，并督造大批陶土三角佛牌秘藏于主佛塔地宫之中。</p>
<p>史实严正表明：这批圣物绝非宫闱女性之饰品，而是<strong>王后在将士出征缅甸前夕，亲手颁赐给统兵将帅与前线敢死勇士之金刚护身符</strong>，用以在血战中克敌制胜、保国卫民。</p>

<h2>第二章 三角形图像符号学：地大不动与降魔成道之英武法相</h2>
<p>帕南帕雅完美熔铸了<strong>纯正素可泰王朝优美线条</strong>与<strong>大城王朝中期沉穆威严</strong>之造像特质：</p>
<ul>
  <li><strong>等腰三角形构图（地大与三宝表征）：</strong> 取象于古印度几何学之“地大”（Prithvi Tattva），象征稳如泰山、不可摧毁，同时表征佛法僧三宝。平底尖顶，无任何繁复外框与莲座，极简而威严肃穆。</li>
  <li><strong>右手指地降魔印（Subduing Mara）：</strong> 世尊右手覆于右膝、指尖直垂地面，召请大地女神为降伏魔众之证人；左手仰放于脐下入禅定。胸肌饱满雄健，双臂宛若弯弓，彰显素可泰皇家工坊之遒劲生命力。</li>
  <li><strong>厚重斜披僧伽胝：</strong> 自左肩斜向垂挂直抵肚脐，法度森严，象征戒德圆满之出家清净幢相。</li>
</ul>

<h2>第三章 古陶矿物相学考：南帕雅寺地宫古陶微观微痕</h2>
<p>从地质年代学与矿物学角度审视，帕南帕雅为高强度混合陶土烧结体：</p>
<ol>
  <li><strong>天然内生矿物颗粒：</strong> 在30倍光学放大镜下，可见细致红褐色赤铁矿微粒（Hematite）、乳白色半透明石英砂（Quartz）及河卵石砾深嵌于陶土基质中。</li>
  <li><strong>背面竹刀切割痕与风化缩褶：</strong> 古法制模在陶土未干时以锋利竹刀切分，导致佛牌背面留下天然深浅收缩裂痕与毛刺拉丝，绝非现代机制模具所能仿造。</li>
  <li><strong>柴窑氧化还原色系：</strong> 随古柴窑各部位温控与氧气流通差异，呈现红砖色、黄皮色、青绿铁化色（高温瓷化）与青黑色。</li>
</ol>

<h2>第四章 出塔与重光史：五世皇巡幸与佛历2514年盛大督造</h2>
<p>沉睡古塔三百余载后，帕南帕雅随近代历史风云重现人间：</p>
<ul>
  <li><strong>佛历2444年五世皇初见重光：</strong> 佛历2444年（西元1901年），<strong>拉玛五世朱拉隆功大帝</strong>巡幸彭世洛府督造成功佛金身，南帕雅古塔崩塌，万尊古佛破土而出。五世皇亲手将古佛赐予随行亲贵重臣与军政大员。</li>
  <li><strong>佛历2514年南帕雅寺经典重现：</strong> 佛历2514年南帕雅寺大殿年久失修，住持<strong>龙婆塔农大师</strong>汇集大量出土古佛碎料粉末，延请全泰名僧——包括必打王龙普多（瓦巴鲁清批）、森林派宗师龙普范（瓦巴乌东颂蓬）、龙婆银（瓦冬亚宏）、龙婆培（瓦匹坤通）等共筑大典，成就当代不可多得之法统标杆。</li>
</ul>

<h2>第五章 暹罗典藏（Dan Siam）真实圣物文献档案</h2>
<p>Dan Siam 典藏库精选呈现三尊经过权威鉴定的帕南帕雅经典代表作：</p>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ 典藏一：[REF: #201] 佛历2514年 彭世洛府南帕雅寺 龙婆塔农小模陶土经粉帕南帕雅</h3>
  <p><strong>藏品编号：</strong> REF: #201 | <strong>真伪认证：</strong> 附权威行业真品证书</p>
  <p>源自祖寺法脉直属传承，佛历2514年督造。含有极高比例的古代原出塔帕南帕雅珍稀碎料粉末，并经龙普多、龙普范、龙婆银等当世圣僧联袂加持，品相极其完好，五官轮廓深峻。</p>
  <p><a href="/product/phra-nang-phaya-luang-pho-thanom-wat-yang-phaya-be-2514" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 鉴赏高精度微距圣像细节与质地 [REF: #201]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ 典藏二：[REF: #1676] 佛历2519年 瓦卡萨特拉提腊寺 龙普天贝叶经灰布纹帕南帕雅</h3>
  <p><strong>藏品编号：</strong> REF: #1676 | <strong>法脉渊源：</strong> 大城府兵法绝学与避险统御宗师</p>
  <p>由大城府精通古兵法《拍猜颂堪》的大宗师龙普天尊者亲造。采用古贝叶经焚灰与上乘经粉熔炼，背面保留极为清晰的脱模粗布网格印纹，兼备权威统御与金刚避险之双重威德。</p>
  <p><a href="/product/phra-nang-phaya-luang-pu-thiem-wat-ksattradhiraj-be2519" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 鉴赏背面粗布纹路与贝叶经灰质感 [REF: #1676]</a></p>
</div>

<div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
  <h3 style="color: #d4af37; margin-top: 0;">🏛️ 典藏三：[REF: #1652] 佛历2505年 瓦萨潘松 阿赞雀吉拉达模帕南帕雅</h3>
  <p><strong>藏品编号：</strong> REF: #1652 | <strong>传承意义：</strong> 瓦萨潘松秘粉与皇室吉拉达造像之结合</p>
  <p>由瓦萨潘松寺阿赞雀大师督造，将古典帕南帕雅三角结构与皇家吉拉达佛相精妙融合。材质温润干爽，内含古老崇迪经粉，背面带有大师亲手刻制之防伪署名密码。</p>
  <p><a href="/product/phra-nang-phya-thong-chitrlada-ajarn-chuea-wat-saphan-sung-2505" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">👉 鉴赏背面专属印记与包浆微观风貌 [REF: #1652]</a></p>
</div>

<h2>第六章 破除商业流俗迷思：帕南帕雅只适合女性佩戴？</h2>
<p>在佛牌流通界，最广泛的讹传便是“男不戴南帕雅”。历史与实证证据对此给出了无可辩驳的解答：</p>
<ol>
  <li><strong>浴血前线之男儿重器：</strong> 当年浴血守卫国土的将士皆为昂藏七尺之男儿。王后督造此圣物，本就是赐予男儿防身克敌、建功立业之用。</li>
  <li><strong>“佛牌之后”称号之真实起源：</strong> “佛牌之后”这一称谓并非出自古代男女限制，而是近代学者<em>德里延帕瓦先生（Triyampaway）</em>于佛历2495年奠定“五古佛”评鉴体系时，依审美对称原则，将方正的崇迪佛喻为帝王，将线条灵动优美的南帕雅喻为后妃，纯系美学隐喻，与佩戴者性别绝无干系。</li>
</ol>
<p>因此，帕南帕雅乃兼备<strong>“大统御威权（Maha Amnat）、崇高贵人人缘（Metta Mahaniyom）与逢凶化吉（Klaew Klaad）”</strong>之大成圣物，不论男女领袖、企业高管或创业智者，佩戴皆能彰显从容果决之大家气度。</p>

<h2>第七章 结语：刚柔并济之菩提镜鉴</h2>
<p>帕南帕雅之真正神圣价值，不在于市面之估价高下，而在于历代先祖保家卫国、视死如归之崇高民族气节。</p>
<p>恭迎佩戴帕南帕雅，当以<strong>“持戒、刚勇与大悲”</strong>为行持指南，既有大统领面对逆境之如山定力，亦怀仁爱体恤下属众生之温润春风，于世间事业中成就刚柔并济之不凡功业。</p>
`;

async function insertArticle15() {
  console.log('[Article 15] Preparing insertion into Supabase blog_posts...');

  const postData = {
    slug: 'phra-nang-phaya-phitsanulok-queen-of-amulets-history',
    category: 'ประวัติศาสตร์พระเครื่อง',
    cover_image: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1781325785084-28r1r8u0t1y.webp',
    published: false, // In Draft Queue for Oct 22, 14:00 PM BKK

    title: 'The Queen of Amulets: Deciphering Phra Nang Phaya of Phitsanulok, Royal War Bestowals, and Ancient Terracotta Petrology',
    title_th: 'ราชินีแห่งพระเครื่อง: ถอดรหัสพุทธศิลป์ “พระนางพญา” เมืองพิษณุโลก พระราชปณิธานพระวิสุทธิกษัตรีย์ สู่ศาสตร์เนื้อดินเผากรุโบราณ',
    title_zh: '全泰佛牌之后通考：彭世洛府“帕南帕雅”女皇佛皇室护国征战源流、三角造像学与古陶窑矿物相学全析',

    excerpt: 'An academic and archaeological treatise on Phra Nang Phaya of Phitsanulok, the undisputed "Queen of Amulets" in the Benjapakee Grand Quintet. Exploring Queen Wisutkasat’s 16th-century commission, ancient kiln petrology, and executive leadership charisma.',
    excerpt_th: 'งานวิจัยประวัติศาสตร์และโบราณคดีเจาะลึก “พระนางพญา” พิษณุโลก หนึ่งในชุดเบญจภาคี ถอดรหัสพระราชปณิธานพระวิสุทธิกษัตรีย์ยุคสงครามอยุธยา-หงสาวดี นิติแร่วิทยาแห่งเตาเผาโบราณ และการล้างมายาคติเรื่องเพศสภาพ',
    excerpt_zh: '以博物馆级学术水准全面考证全泰五古佛之“帕南帕雅”（佛牌之后）。详尽考述十六世纪阿育陀耶维素卡萨王后督造护国军饷源流、古代柴窑陶土相变学，并彻底破除当代商业佛牌市场对佩戴者性别之流俗误解。',

    content: CONTENT_EN + COPYRIGHT_HTML,
    content_th: CONTENT_TH + COPYRIGHT_HTML,
    content_zh: CONTENT_ZH + COPYRIGHT_HTML,

    created_at: '2026-10-22T07:00:00.000Z',
    updated_at: new Date().toISOString()
  };

  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id, slug')
    .eq('slug', postData.slug)
    .maybeSingle();

  if (existing) {
    console.log(`[Article 15] Existing record found with ID ${existing.id}. Updating...`);
    const { error: updateErr } = await supabase
      .from('blog_posts')
      .update(postData)
      .eq('id', existing.id);

    if (updateErr) throw updateErr;
    console.log(`[Success] Updated Article 15 (ID: ${existing.id}) in database.`);
    return existing.id;
  } else {
    console.log('[Article 15] Inserting new record...');
    const { data: inserted, error: insertErr } = await supabase
      .from('blog_posts')
      .insert(postData)
      .select('id, title_th, slug')
      .single();

    if (insertErr) throw insertErr;
    console.log(`[Success] Inserted Article 15 with new ID: ${inserted.id} (${inserted.title_th})`);
    return inserted.id;
  }
}

insertArticle15()
  .then(id => {
    console.log(`[Article 15 Completed] Successfully processed in database with ID: ${id}`);
    process.exit(0);
  })
  .catch(err => {
    console.error('[Fatal Error inserting Article 15]:', err);
    process.exit(1);
  });
