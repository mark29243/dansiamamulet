const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../products_published_452.json'), 'utf8'));

function classifyAmulet(p) {
  const nameTh = p.name_th || p.name || '';
  const descTh = p.description_th || '';
  const fullTh = `${nameTh} ${descTh} ${p.category || ''}`;
  const fullEn = `${p.name || ''} ${p.category || ''} ${p.short || ''}`.toLowerCase();

  const virtues = new Set();
  const reasons = {};

  function addVirtue(slug, reason) {
    virtues.add(slug);
    if (!reasons[slug]) reasons[slug] = [];
    reasons[slug].push(reason);
  }

  const has = (term) => fullTh.includes(term);
  const nameHas = (term) => nameTh.includes(term);

  // 1. Phra Somdej (ราชา/จักรพรรดิแห่งพระเครื่อง: ครอบจักรวาล - อำนาจบารมี, เมตตามหานิยม, แคล้วคลาด)
  const isSomdej = nameHas('สมเด็จ') || fullEn.includes('somdej');
  if (isSomdej) {
    addVirtue('career-and-power', 'จักรพรรดิแห่งพระเครื่อง เสริมอำนาจบารมี เลื่อนยศตำแหน่ง');
    addVirtue('miraculous-protection', 'พุทธคุณครอบจักรวาล แคล้วคลาด ปลอดภัย คุ้มครองรอบด้าน');
    addVirtue('metta-and-charisma', 'เมตตามหานิยม ผู้ใหญ่รักใคร่เกื้อหนุน อุปถัมภ์');
    if (nameHas('โชคลาภ') || nameHas('มหาลาภ') || nameHas('เงินล้าน') || nameHas('เศรษฐี') || nameHas('ปลดหนี้') || nameHas('ค้าขาย') || nameHas('รวย')) {
      addVirtue('wealth-and-fortune', 'รุ่นเจาะจงมหาลาภ/เศรษฐี/โชคลาภ');
    }
  }

  // 2. Luang Phor Thuad (พระนิรันตรายอันดับ 1 ของสยาม)
  const isThuad = nameHas('ทวด') || fullEn.includes('tuad') || fullEn.includes('thuad');
  if (isThuad) {
    addVirtue('miraculous-protection', 'สุดยอดพระนิรันตรายอันดับ 1 แคล้วคลาด ปลอดภัย อุบัติเหตุทางรถยนต์');
    addVirtue('metta-and-charisma', 'บารมีโพธิสัตว์ เมตตามหานิยม ผู้ใหญ่เกื้อหนุน');
    // Authentic Wealth blessing in Thuad editions
    if (nameHas('สิทธิโชค') || nameHas('มหาเศรษฐี') || nameHas('อนันตทรัพย์') || nameHas('เงินล้าน') || nameHas('ปลดหนี้') || nameHas('โชคลาภ') || nameHas('ร่ำรวย')) {
      addVirtue('wealth-and-fortune', 'พระหลวงปู่ทวดรุ่นมงคลโชคลาภ/มหาเศรษฐี/อนันตทรัพย์');
    }
  }

  // 3. Phra Pidta (พระปิดตามหาลาภ ปลดหนี้ & มหาอุด)
  const isPidta = nameHas('ปิดตา') || fullEn.includes('pidta') || fullEn.includes('pid ta');
  if (isPidta) {
    addVirtue('wealth-and-fortune', 'พระภควัมบดี มหาลาภ ปลดหนี้ โชคลาภ โภคทรัพย์');
    addVirtue('miraculous-protection', 'มหาอุตม์ แคล้วคลาด ปิดทวาร ปัดเป่าเภทภัย');
    if (nameHas('มหาเสน่ห์') || nameHas('เสน่ห์') || nameHas('จินดามณี') || has('เมตตา')) {
      addVirtue('metta-and-charisma', 'พระปิดตาสายเมตตามหาเสน่ห์');
    }
    if (nameHas('ยันต์ยุ่ง') || nameHas('มหาอำนาจ') || nameHas('หัวจรวด') || nameHas('แร่บางไผ่') || has('คงกระพัน')) {
      addVirtue('career-and-power', 'พระปิดตายันต์ยุ่ง/มหาอำนาจ คงกระพัน ชาตรี');
    }
  }

  // 4. Phra Khun Paen (ยอดพระมหาเสน่ห์ เมตตา เจรจา & โชคลาภค้าขาย เสี่ยงดวง)
  const isKhunPaen = nameHas('ขุนแผน') || fullEn.includes('khun phaen') || fullEn.includes('khunpaen');
  if (isKhunPaen) {
    addVirtue('metta-and-charisma', 'ยอดพระเครื่องมหาเสน่ห์ เมตตามหานิยม เจรจาค้าขาย คนรักใคร่');
    addVirtue('wealth-and-fortune', 'โชคลาภ เสี่ยงดวง ค้าขายคล่องตัว');
    if (nameHas('พรายกุมาร') || nameHas('กุมารทอง')) {
      addVirtue('miraculous-protection', 'ผงพรายกุมาร พรายกระซิบเตือนภัย คุ้มครอง');
    }
    if (nameHas('ทรงพล') || nameHas('ยอดขุนพล') || nameHas('สะกดทัพ') || nameHas('ปราบมาร') || nameHas('มหาอำนาจ') || nameHas('เสือ')) {
      addVirtue('career-and-power', 'ขุนแผนทรงพล/สะกดทัพ มหาอำนาจ ชัยชนะ');
    }
  }

  // 5. Phra Nang Phaya (ราชินีแห่งพระเครื่อง: เสน่ห์สง่างาม + อำนาจบารมี + แคล้วคลาด)
  const isNangPhaya = nameHas('นางพญา') || fullEn.includes('nang phaya') || fullEn.includes('nangphaya');
  if (isNangPhaya) {
    addVirtue('metta-and-charisma', 'ราชินีแห่งพระเครื่อง ทรงเสน่ห์ สง่างาม เมตตามหานิยม');
    addVirtue('career-and-power', 'มหาอำนาจ บารมีผู้นำ บริวารเกรงขาม');
    addVirtue('miraculous-protection', 'เบญจภาคี แคล้วคลาด ปลอดภัย');
  }

  // 6. Phra Rod & Phra Khong (ยอดพระรอดพ้นภัยพิบัติ & อำนาจบารมี ชนะศึก)
  const isRodOrKhong = nameHas('พระรอด') || nameHas('พระคง') || nameHas('พระบาง') || fullEn.includes('phra rod') || fullEn.includes('phra khong');
  if (isRodOrKhong) {
    addVirtue('miraculous-protection', 'สุดยอดพระเบญจภาคี แคล้วคลาด รอดพ้นภยันตราย');
    addVirtue('career-and-power', 'ชนะศึก ชนะศัตรูคู่แข่ง ชนะอุปสรรค');
  }

  // 7. Phra Kring & Phra Chaiwat (พระหมอยา สุขภาพ ปลอดภัย & ชัยชนะ เลื่อนขั้น)
  const isKring = nameHas('กริ่ง') || nameHas('ชัยวัฒน์') || fullEn.includes('phra kring') || fullEn.includes('chaiwat');
  if (isKring) {
    addVirtue('miraculous-protection', 'พระไภษัชยคุรุ ปลอดโรคปลอดภัย สุขภาพ ขจัดอุปสรรค');
    addVirtue('career-and-power', 'ชัยวัฒน์ ชัยชนะแห่งชีวิต เสริมอำนาจบารมี ก้าวหน้า');
    if (nameHas('โชคลาภ') || nameHas('มหาลาภ') || nameHas('ร่ำรวย') || nameHas('ปลดหนี้') || nameHas('เศรษฐี') || nameHas('โภคทรัพย์')) {
      addVirtue('wealth-and-fortune', 'พระกริ่ง/พระชัยวัฒน์รุ่นโชคลาภโภคทรัพย์');
    }
  }

  // 8. Phra Naga Prok (คุ้มครองดวงชะตา & มหาอำนาจบารมี)
  const isNagaProk = nameHas('นาคปรก') || fullEn.includes('naga prok') || fullEn.includes('nakprok');
  if (isNagaProk) {
    addVirtue('career-and-power', 'พญานาคคุ้มบัลลังก์ เสริมอำนาจบารมี ยศฐาบรรดาศักดิ์');
    addVirtue('miraculous-protection', 'คุ้มครองดวงชะตา แคล้วคลาด ป้องกันคุณไสย');
  }

  // 9. Dedicated Wealth Masters & Deities: Sangkachai, Sivali, Upakhut, Chao Sua, LP Ngern, LP Ruay, Setthi Nawakot
  const isWealthMaster = nameHas('สังกัจจายน์') || nameHas('สิวลี') || nameHas('สีวลี') || nameHas('อุปคุต') || 
                         nameHas('เจ้าสัว') || nameHas('หลวงพ่อเงิน') || nameHas('หลวงพ่อรวย') || 
                         nameHas('เศรษฐีนวโกฏิ') || nameHas('พญาหมู มหาลาภ') || nameHas('ชนะจน') ||
                         nameHas('ปลดหนี้') || nameHas('ทวีทรัพย์') || nameHas('เงินล้าน') || nameHas('ดูดทรัพย์');
  if (isWealthMaster) {
    addVirtue('wealth-and-fortune', 'ยอดพระมหาลาภ โภคทรัพย์ ค้าขาย ร่ำรวย ปลดหนี้');
    addVirtue('metta-and-charisma', 'เจรจาค้าขาย เมตตามหานิยม มีแต่คนอุปถัมภ์');
    if (nameHas('อุปคุต')) {
      addVirtue('miraculous-protection', 'พระอุปคุตปราบมาร ป้องกันภัย ขจัดอุปสรรค');
    }
  }

  // 10. Deities:
  // 10.1 Thao Wessuwan (เจ้าแห่งทรัพย์สิน & ภูตผีปีศาจ)
  const isWessuwan = nameHas('เวสสุวรรณ') || fullEn.includes('wessuwan') || fullEn.includes('vesuwan');
  if (isWessuwan) {
    addVirtue('wealth-and-fortune', 'ท้าวเวสสุวรรณ เทพแห่งขุมทรัพย์ มหาลาภ ร่ำรวย');
    addVirtue('career-and-power', 'ท้าวจตุโลกบาล มหาอำนาจบารมี ขจัดอุปสรรค ผู้นำ');
    addVirtue('miraculous-protection', 'ปราบภูตผีปีศาจ ป้องกันคุณไสย ล้างอาถรรพ์');
  }

  // 10.2 Phya Garuda (พญาครุฑ มหาอำนาจ เลื่อนขั้น ล้างอาถรรพ์)
  const isGaruda = nameHas('ครุฑ') || fullEn.includes('garuda');
  if (isGaruda) {
    addVirtue('career-and-power', 'ตราแผ่นดิน มหาอำนาจบารมี เลื่อนยศ เลื่อนตำแหน่ง ชัยชนะ');
    addVirtue('miraculous-protection', 'ล้างอาถรรพ์ ป้องกันสิ่งอัปมงคล แคล้วคลาด');
  }

  // 10.3 Ganesha (พระพิฆเนศ เทพแห่งความสำเร็จ)
  const isGanesha = nameHas('พิฆเนศ') || fullEn.includes('ganesha');
  if (isGanesha) {
    addVirtue('career-and-power', 'มหาเทพแห่งความสำเร็จ การงาน การศึกษา ขจัดอุปสรรค');
    addVirtue('wealth-and-fortune', 'ประทานทรัพย์สมบัติ ความอุดมสมบูรณ์ โชคลาภ');
    addVirtue('metta-and-charisma', 'สติปัญญา ปัญญาญาณ เป็นที่รักใคร่เอ็นดู');
  }

  // 10.4 Phra Phrom (พระพรหม 4 หน้า พรหมประสิทธิ์)
  const isBrahma = nameHas('พรหม') || fullEn.includes('brahma') || fullEn.includes('phrom');
  if (isBrahma) {
    addVirtue('career-and-power', 'มหาเทพผู้ลิขิตชะตา อำนาจบารมี การงานก้าวหน้า');
    addVirtue('metta-and-charisma', 'เมตตามหานิยม เจรจาราบรื่น คนรักใคร่');
    addVirtue('wealth-and-fortune', 'ประทานโชคลาภ ความสมบูรณ์พูนสุข');
    addVirtue('miraculous-protection', 'คุ้มครอง 4 ทิศ แคล้วคลาด ปลอดภัย');
  }

  // 10.5 Phra Rahu (พระราหู พลิกดวงชะตา แก้ชง)
  const isRahu = nameHas('ราหู') || fullEn.includes('rahu');
  if (isRahu) {
    addVirtue('miraculous-protection', 'แก้ปีชง สะเดาะเคราะห์ ปัดเป่าสิ่งชั่วร้าย');
    addVirtue('wealth-and-fortune', 'เสี่ยงโชค พลิกดวงชะตา โชคลาภการเงิน');
  }

  // 11. Protective & Warrior Talismans: Takrut, Bia Gae, Mit Mor, Tiger, Singha, Hanuman, Yant
  const isWarrior = nameHas('ตะกรุด') || nameHas('เบี้ยแก้') || nameHas('มีดหมอ') || 
                    nameHas('เสือ') || nameHas('สิงห์') || nameHas('สิงห') || 
                    nameHas('หนุมาน') || nameHas('พยัคฆ์') || nameHas('เชือกคาด') ||
                    nameHas('หวายลูกนิมิต') || nameHas('ปรุหนัง') || nameHas('มเหศวร') ||
                    nameHas('ท่ากระดาน') || nameHas('ยอดธง') || nameHas('ยอดขุนพล');
  if (isWarrior) {
    addVirtue('miraculous-protection', 'คงกระพัน ชาตรี มหาอุตม์ ป้องกันคุณไสย ปราบภูตผี');
    if (nameHas('เสือ') || nameHas('สิงห์') || nameHas('หนุมาน') || nameHas('พยัคฆ์') || nameHas('มหาปราบ') || nameHas('ยอดธง') || nameHas('ยอดขุนพล')) {
      addVirtue('career-and-power', 'มหาอำนาจ ตบะเดชะ บริวารยำเกรง ชนะศัตรูคู่แข่ง');
    }
    if (nameHas('โภคทรัพย์') || nameHas('สาริกา') || nameHas('ค้าขาย') || nameHas('โชคลาภ') || nameHas('รวย')) {
      addVirtue('wealth-and-fortune', 'ตะกรุด/เครื่องรางจารยันต์โภคทรัพย์ค้าขาย');
    }
  }

  // 12. Metta & Wealth Talismans: Nang Kwak, Guman, Sarika, Si Phueng, Phan Thai, Nam Tao, Chuchok, Tao Ruean, Jin Da Manee, Por Gae
  // NOTE: Exclude "คอน้ำเต้า" (medal shape) from "น้ำเต้าดูดทรัพย์"
  const isNamTao = nameHas('น้ำเต้า') && !nameHas('คอน้ำเต้า');
  const isMettaWealthTal = nameHas('นางกวัก') || nameHas('กุมาร') || nameHas('สาริกา') || 
                           nameHas('สาลิกา') || nameHas('สีผึ้ง') || nameHas('ผานไถ') || 
                           nameHas('จิ้งจก') || nameHas('อิ้น') || nameHas('ชูชก') || 
                           nameHas('เต่าเรือน') || nameHas('ถุงเหนี่ยวทรัพย์') || 
                           isNamTao || nameHas('จินดามณี') || nameHas('บัวบังใบ') ||
                           nameHas('เงาะ');
  if (isMettaWealthTal) {
    addVirtue('wealth-and-fortune', 'เรียกทรัพย์ กวักเงินทอง ค้าขายร่ำรวย ดูดโชคลาภ');
    addVirtue('metta-and-charisma', 'มหาเสน่ห์ เจรจาค้าขาย เมตตามหานิยม คนรักใคร่');
    if (nameHas('ผานไถ')) {
      addVirtue('career-and-power', 'ผานไถ พลิกฟื้นชะตา ค้ำดวง ชนะอุปสรรค');
    }
    if (nameHas('จินดามณี')) {
      addVirtue('miraculous-protection', 'ยาวาสนาจินดามณี เสริมสุขภาพ ป้องกันโรคภัย เสนียดจัญไร');
    }
  }

  // 13. Great Buddha Images: Chinarat, Sothorn, LP To, Phra Kaew Morakot, Leela, Wat Chaiyo, Wat Paknam
  // Check if it's Soom Kor (and NOT LP Thuad Phim Soom Kor)
  const isRealSoomKor = nameHas('ซุ้มกอ') && !isThuad;
  const isGreatBuddha = nameHas('ชินราช') || nameHas('โสธร') || nameHas('หลวงพ่อโต') || 
                        nameHas('พระแก้วมรกต') || nameHas('ลีลา') || nameHas('สุโขทัย') || 
                        nameHas('ปากน้ำ') || nameHas('วัดระฆัง') || nameHas('บางขุนพรหม') ||
                        nameHas('พระพุทธ') || nameHas('ชนะสงคราม') || isRealSoomKor ||
                        nameHas('ผงสุพรรณ');
  if (isGreatBuddha) {
    addVirtue('miraculous-protection', 'พระพุทธคุณคุ้มครอง แคล้วคลาด ปลอดภัย ร่มเย็น');
    addVirtue('career-and-power', 'เสริมบารมี ค้ำดวงชะตา ความสำเร็จ เจริญก้าวหน้า');
    if (nameHas('โสธร') || nameHas('ปากน้ำ') || isRealSoomKor || nameHas('โชคลาภ') || nameHas('ค้าขาย') || nameHas('ปลดหนี้')) {
      addVirtue('wealth-and-fortune', 'พระพุทธคุณบันดาลโชคลาภ โภคทรัพย์ ค้าขาย');
    }
    if (nameHas('ลีลา') || nameHas('ชินราช') || nameHas('เมตตา')) {
      addVirtue('metta-and-charisma', 'เมตตามหานิยม ร่มเย็นเป็นสุข ผูกจิตมิตรไมตรี');
    }
  }

  // 14. Great Guru Monks: Koon, Pae, Guay, Dooh, Kasem, Tim, Toeh, Chamnian, Por Gae / Ruesi, etc.
  const isPorGae = nameHas('พ่อแก่') || nameHas('ฤาษี') || nameHas('ฤๅษี');
  if (isPorGae) {
    addVirtue('career-and-power', 'บรมครูพ่อแก่ มหาอำนาจบารมี สติปัญญา ศิลปวิทยาการ');
    addVirtue('metta-and-charisma', 'เมตตามหานิยม ผู้ใหญ่รักใคร่เกื้อหนุน');
    addVirtue('miraculous-protection', 'คุ้มครอง ป้องกันคุณไสย ปัดเป่าอาถรรพ์');
  }

  const isGuru = nameHas('หลวงพ่อคูณ') || nameHas('หลวงปู่ดู่') || nameHas('หลวงพ่อแพ') || 
                 nameHas('หลวงพ่อกวย') || nameHas('หลวงพ่อเกษม') || nameHas('หลวงปู่ทิม') ||
                 nameHas('หลวงปู่โต๊ะ') || nameHas('พ่อท่าน') || nameHas('ครูบา') ||
                 nameHas('อาจารย์ชุม') || nameHas('อาจารย์นำ') || nameHas('หลวงพ่อคลิ้ง') ||
                 nameHas('หลวงพ่อมุม') || nameHas('หลวงปู่เพิ่ม') || nameHas('หลวงปู่เจือ') ||
                 nameHas('หลวงพ่อเปิ่น') || nameHas('หลวงพ่อสุด') || nameHas('หลวงพ่อสด') ||
                 nameHas('หลวงปู่แหวน') || nameHas('หลวงปู่ขาว') || nameHas('หลวงปู่หลิว') ||
                 nameHas('หลวงพ่อพรหม') || nameHas('หลวงพ่อสงวน') || nameHas('หลวงปู่คร่ำ') ||
                 nameHas('หลวงพ่อทอง') || nameHas('หลวงพ่อจง') || nameHas('หลวงพ่อเดิม') ||
                 nameHas('หลวงพ่อพูล') || nameHas('หลวงพ่อตัด') || nameHas('หลวงปู่คำพันธ์') ||
                 nameHas('หลวงพ่อแย้ม') || nameHas('หลวงพ่อชาญ') || nameHas('หลวงพ่อยิด') ||
                 nameHas('หลวงปู่วรพต') || nameHas('หลวงพ่อแทน') || nameHas('หลวงปู่เผือก') ||
                 nameHas('หลวงปู่ปลอด') || nameHas('หลวงตาม้า') || nameHas('คุณแม่บุญเรือน');
  if (isGuru) {
    addVirtue('miraculous-protection', 'บารมีพระสุปฏิปันโน คุ้มครอง แคล้วคลาด ปลอดภัย');
    addVirtue('metta-and-charisma', 'เมตตามหานิยม ศิษยานุศิษย์รักใคร่ ผู้ใหญ่เกื้อหนุน');
    if (nameHas('คูณ') || nameHas('กวย') || nameHas('หลิว') || nameHas('รวย') || nameHas('พูล') || nameHas('บุญเรือน')) {
      addVirtue('wealth-and-fortune', 'บารมีเกจิบันดาลโชคลาภ ค้าขายคล่อง ร่ำรวย');
    }
    if (nameHas('เลื่อน') || nameHas('เจริญ') || nameHas('บารมี') || nameHas('เปิ่น') || nameHas('เดิม') || nameHas('วรพต')) {
      addVirtue('career-and-power', 'เสริมอำนาจบารมี ความเป็นผู้นำ ก้าวหน้าในหน้าที่การงาน');
    }
  }

  // 15. Disambiguated Keyword Checks (Cleaned from Material Words)
  const textWithoutMaterials = fullTh
    .replace(/เนื้อทองแดงรมดำ/g, '')
    .replace(/เนื้อทองแดงผิวไฟ/g, '')
    .replace(/เนื้อทองแดง/g, '')
    .replace(/เนื้อทองเหลือง/g, '')
    .replace(/เนื้อโลหะกะหลั่ยทอง/g, '')
    .replace(/เนื้อโลหะกะไหล่ทอง/g, '')
    .replace(/กะไหล่ทอง/g, '')
    .replace(/กะหลั่ยทอง/g, '')
    .replace(/ชุบทอง/g, '')
    .replace(/ปิดทอง/g, '')
    .replace(/เลี่ยมทอง/g, '')
    .replace(/ทองทิพย์/g, '')
    .replace(/ทองฝาบาตร/g, '')
    .replace(/ทองคำ/g, '')
    .replace(/เนื้อเงิน/g, '')
    .replace(/กะไหล่เงิน/g, '')
    .replace(/กะหลั่ยเงิน/g, '')
    .replace(/ลงยาเงิน/g, '')
    .replace(/แผ่นเงิน/g, '')
    .replace(/เลี่ยมเงิน/g, '')
    .replace(/เงิน๙๒/g, '')
    .replace(/เนื้อเงิน/g, '');

  const authenticWealthKeywords = [
    'โชคลาภ', 'ค้าขาย', 'ร่ำรวย', 'มหาลาภ', 'ปลดหนี้', 'มั่งคั่ง', 'เงินล้าน',
    'มหาเศรษฐี', 'เศรษฐี', 'รับทรัพย์', 'โภคทรัพย์', 'ดูดทรัพย์', 'บันดาลโชค',
    'ดวงเศรษฐี', 'มหาโชค', 'ลาภผล', 'พอกทรัพย์', 'เรียกทรัพย์', 'มหาทรัพย์',
    'นำโชค', 'ค้าขายดี', 'ร่ำรวยมหาศาล', 'เจ้าสัว', 'มหาโภคทรัพย์', 'อุดมสมบูรณ์'
  ];
  if (authenticWealthKeywords.some(k => textWithoutMaterials.includes(k))) {
    addVirtue('wealth-and-fortune', 'มีคำมงคลเฉพาะด้านโชคลาภ/โภคทรัพย์');
  }

  const authenticProtectionKeywords = [
    'แคล้วคลาด', 'ปลอดภัย', 'คงกระพัน', 'กันภัย', 'นิรันตราย', 'มหาอุด', 'มหาอุตม์',
    'คุ้มครอง', 'คุ้มภัย', 'กันคุณไสย', 'ปราบผี', 'ขับไล่สิ่งอัปมงคล', 'แก้ชง',
    'รอดพ้น', 'เหนียว', 'ป้องกันภัย', 'นิราศภัย', 'ศัตรูพ่าย', 'ปัดเป่า'
  ];
  if (authenticProtectionKeywords.some(k => fullTh.includes(k))) {
    addVirtue('miraculous-protection', 'มีคำมงคลเฉพาะด้านแคล้วคลาด/คุ้มครองภัย');
  }

  const authenticMettaKeywords = [
    'เมตตา', 'มหานิยม', 'มหาเสน่ห์', 'เสน่ห์', 'เจรจา', 'เอ็นดู', 'ผู้ใหญ่รัก',
    'อุปถัมภ์', 'คนรักใคร่', 'ความรัก', 'สาริกาลิ้นทอง', 'จินดามณี', 'นะหน้าทอง',
    'สาลิกา', 'ผูกจิต', 'ผูกใจ', 'นิยมชมชอบ'
  ];
  if (authenticMettaKeywords.some(k => fullTh.includes(k))) {
    addVirtue('metta-and-charisma', 'มีคำมงคลเฉพาะด้านเมตตามหานิยม');
  }

  const authenticCareerKeywords = [
    'มหาอำนาจ', 'บารมี', 'เลื่อนขั้น', 'เลื่อนตำแหน่ง', 'เลื่อนสมณศักดิ์',
    'ชนะศึก', 'ชนะอุปสรรค', 'ความสำเร็จ', 'ก้าวหน้า', 'ผู้นำ',
    'เจริญก้าวหน้า', 'มหาปราบ', 'ตบะ', 'เดชเดชา', 'ข้าราชการ', 'ราชา', 'จักรพรรดิ'
  ];
  if (authenticCareerKeywords.some(k => fullTh.includes(k))) {
    addVirtue('career-and-power', 'มีคำมงคลเฉพาะด้านอำนาจบารมี/การงาน/เลื่อนขั้น');
  }

  // Universal Fallback if no specific tag matched: Every consecrated Buddhist amulet has Protection & Metta
  if (virtues.size === 0) {
    addVirtue('miraculous-protection', 'พระเครื่องผ่านพิธีพุทธาภิเษก คุ้มครอง แคล้วคลาด ปลอดภัย');
    addVirtue('metta-and-charisma', 'พุทธานุภาพเมตตามหานิยม สิริมงคล');
  }

  return {
    virtues: Array.from(virtues),
    reasons
  };
}

// Audit all 452 products
const fullAudit = products.map(p => {
  const res = classifyAmulet(p);
  return {
    id: p.id,
    name_th: p.name_th,
    category: p.category,
    virtues: res.virtues,
    virtue_count: res.virtues.length,
    reasons: res.reasons
  };
});

// Verification check
const counts = {
  'wealth-and-fortune': 0,
  'miraculous-protection': 0,
  'metta-and-charisma': 0,
  'career-and-power': 0
};
const dist = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

fullAudit.forEach(r => {
  r.virtues.forEach(slug => counts[slug]++);
  dist[r.virtue_count] = (dist[r.virtue_count] || 0) + 1;
});

console.log('=== AUDIT REPORT RESULTS (452 Products) ===');
console.log('Category Counts:', counts);
console.log('Virtue Distribution (1-4 per amulet):', dist);

// Check Luang Phor Thuad count in Wealth
const thuadWealth = fullAudit.filter(r => (r.name_th||'').includes('ทวด') && r.virtues.includes('wealth-and-fortune'));
console.log(`\nLP Thuad in Wealth: ${thuadWealth.length} (Was 22 in old buggy system)`);
thuadWealth.forEach(r => {
  console.log(` - ID ${r.id}: ${r.name_th}`);
  console.log(`   Reasons:`, r.reasons['wealth-and-fortune']);
});

// Save audit result to JSON for full transparency
fs.writeFileSync(path.resolve(__dirname, 'audit_452_classified.json'), JSON.stringify(fullAudit, null, 2), 'utf8');
console.log('\nSaved full audit to dansiamamulet/scripts/audit_452_classified.json');
