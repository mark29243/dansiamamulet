const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../products_published_452.json'), 'utf8'));

// Helper to sanitize text from materials and boilerplate
function extractMeaningfulThaiText(p) {
  let name = p.name_th || p.name || '';
  let desc = p.description_th || '';
  let cat = p.category || '';
  return `${name} ${desc} ${cat}`;
}

// Function to classify virtues according to Master Amulet Lore
function classifyAmulet(p) {
  const nameTh = p.name_th || p.name || '';
  const descTh = p.description_th || '';
  const fullTh = `${nameTh} ${descTh} ${p.category || ''}`;
  const fullEn = `${p.name || ''} ${p.category || ''} ${p.short || ''}`.toLowerCase();

  const virtues = new Set();

  // Helper patterns
  const has = (term) => fullTh.includes(term);
  const nameHas = (term) => nameTh.includes(term);

  // 1. Phra Somdej (จักรพรรดิแห่งพระเครื่อง: อำนาจบารมี + แคล้วคลาด + เมตตามหานิยม)
  const isSomdej = nameHas('สมเด็จ') || fullEn.includes('somdej');
  if (isSomdej) {
    virtues.add('career-and-power');     // จักรพรรดิพระเครื่อง มหาอำนาจ บารมี เลื่อนยศตำแหน่ง
    virtues.add('miraculous-protection'); // แคล้วคลาด คุ้มครองภัย ร่มเย็น
    virtues.add('metta-and-charisma');   // เมตตามหานิยม ผู้ใหญ่รักใคร่เกื้อหนุน
    // If specific wealth model or edition
    if (has('โชคลาภ') || has('มหาลาภ') || has('เงินล้าน') || has('เศรษฐี') || has('ปลดหนี้') || has('ค้าขาย') || has('รวย')) {
      virtues.add('wealth-and-fortune');
    }
  }

  // 2. Luang Phor Thuad (พระนิรันตรายอันดับ 1 ของสยาม)
  const isThuad = nameHas('ทวด') || fullEn.includes('tuad') || fullEn.includes('thuad');
  if (isThuad) {
    virtues.add('miraculous-protection'); // นิรันตราย แคล้วคลาด รถยนต์ ปลอดภัย
    virtues.add('metta-and-charisma');   // เมตตา เมตตามหานิยม อุปถัมภ์
    // Only add wealth if explicitly blessed for wealth
    if (nameHas('สิทธิโชค') || nameHas('มหาเศรษฐี') || nameHas('ทรัพย์') || has('เงินล้าน') || has('ปลดหนี้') || has('โชคลาภ')) {
      virtues.add('wealth-and-fortune');
    }
  }

  // 3. Phra Pidta (พระภควัมบดี มหาลาภ ปลดหนี้ & มหาอุด แคล้วคลาด)
  const isPidta = nameHas('ปิดตา') || fullEn.includes('pidta') || fullEn.includes('pid ta');
  if (isPidta) {
    virtues.add('wealth-and-fortune');    // มหาลาภ ปลดหนี้ โชคลาภ
    virtues.add('miraculous-protection'); // มหาอุตม์ แคล้วคลาด ปลอดภัย ปิดกั้นสิ่งชั่วร้าย
    if (nameHas('มหาเสน่ห์') || has('เมตตา') || has('เสน่ห์') || has('จินดามณี')) {
      virtues.add('metta-and-charisma');
    }
    if (nameHas('ยันต์ยุ่ง') || nameHas('มหาอำนาจ') || has('บารมี')) {
      virtues.add('career-and-power');
    }
  }

  // 4. Phra Khun Paen (ยอดพระมหาเสน่ห์ เมตตามหานิยม & โชคลาภค้าขาย)
  const isKhunPaen = nameHas('ขุนแผน') || fullEn.includes('khun phaen') || fullEn.includes('khunpaen');
  if (isKhunPaen) {
    virtues.add('metta-and-charisma'); // มหาเสน่ห์ มหานิยม เจรจา เข้าหาผู้ใหญ่
    virtues.add('wealth-and-fortune');  // โชคลาภ เสี่ยงโชค ค้าขายคล่อง
    if (nameHas('พรายกุมาร')) {
      virtues.add('miraculous-protection'); // ผงพรายคุ้มครองเตือนภัย
    }
    if (nameHas('ทรงพล') || nameHas('ยอดขุนพล') || nameHas('สะกดทัพ') || nameHas('ปราบมาร') || nameHas('อำนาจ')) {
      virtues.add('career-and-power');
    }
  }

  // 5. Phra Nang Phaya (ราชินีแห่งพระเครื่อง: เมตตามหาเสน่ห์ + อำนาจบารมีผู้นำ + แคล้วคลาด)
  const isNangPhaya = nameHas('นางพญา') || fullEn.includes('nang phaya') || fullEn.includes('nangphaya');
  if (isNangPhaya) {
    virtues.add('metta-and-charisma');   // ราชินีพระเครื่อง เสน่ห์สง่างาม เป็นที่รักใคร่
    virtues.add('career-and-power');     // อำนาจบารมี ผู้นำหญิง/ชาย ผู้บริหาร
    virtues.add('miraculous-protection'); // แคล้วคลาด ปลอดภัย
  }

  // 6. Phra Rod & Phra Khong (ยอดพระแคล้วคลาด รอดพ้นภัยพิบัติ & อำนาจบารมี)
  const isRodOrKhong = nameHas('พระรอด') || nameHas('พระคง') || nameHas('พระบาง') || fullEn.includes('phra rod') || fullEn.includes('phra khong');
  if (isRodOrKhong) {
    virtues.add('miraculous-protection'); // รอดพ้นภัย แคล้วคลาด คงกระพัน
    virtues.add('career-and-power');     // ชนะศึก ชนะคดีความ ชนะคู่แข่ง อุปสรรค
  }

  // 7. Phra Kring & Phra Chaiwat (พระหมอยา ขจัดโรคภัย ปลอดภัย & ชัยชนะในการงาน เลื่อนขั้น)
  const isKring = nameHas('กริ่ง') || nameHas('ชัยวัฒน์') || fullEn.includes('phra kring') || fullEn.includes('chaiwat');
  if (isKring) {
    virtues.add('miraculous-protection'); // สุขภาพแข็งแรง ขจัดอุปสรรค แคล้วคลาด ปลอดโรคปลอดภัย
    virtues.add('career-and-power');     // ชัยวัฒน์ ชนะอุปสรรค เจริญก้าวหน้า เลื่อนตำแหน่ง
    if (has('โชคลาภ') || has('มหาลาภ') || has('ร่ำรวย') || has('ปลดหนี้') || has('เศรษฐี')) {
      virtues.add('wealth-and-fortune');
    }
  }

  // 8. Phra Naga Prok (คุ้มครองดวงชะตา & มหาอำนาจบารมี)
  const isNagaProk = nameHas('นาคปรก') || fullEn.includes('naga prok') || fullEn.includes('nakprok');
  if (isNagaProk) {
    virtues.add('career-and-power');     // พญานาคแผ่พังพาน มหาอำนาจ หนุนวาสนาชะตาชีวิต
    virtues.add('miraculous-protection'); // แคล้วคลาด ป้องกันภยันตราย ป้องกันคุณไสย
  }

  // 9. Dedicated Wealth Masters & Deities: Sangkachai, Sivali, Upakhut, Chao Sua, LP Ngern, LP Ruay, Setthi Nawakot
  const isWealthMaster = nameHas('สังกัจจายน์') || nameHas('สิวลี') || nameHas('สีวลี') || nameHas('อุปคุต') || 
                         nameHas('เจ้าสัว') || nameHas('หลวงพ่อเงิน') || nameHas('หลวงพ่อรวย') || 
                         nameHas('เศรษฐีนวโกฏิ') || nameHas('ปลดหนี้') || nameHas('เงินล้าน') || 
                         nameHas('มหาเศรษฐี') || nameHas('เรียกทรัพย์') || nameHas('ดูดทรัพย์') ||
                         nameHas('ทวีทรัพย์') || nameHas('พญาหมู มหาลาภ') || nameHas('ชนะจน');
  if (isWealthMaster) {
    virtues.add('wealth-and-fortune');  // โชคลาภ ค้าขาย ร่ำรวย ปลดหนี้ อันดับ 1
    virtues.add('metta-and-charisma'); // เมตตามหานิยม เจรจาค้าขาย คนอุปถัมภ์
  }

  // 10. Deities:
  // 10.1 Thao Wessuwan (เจ้าแห่งทรัพย์สิน & ภูตผีปีศาจ)
  const isWessuwan = nameHas('เวสสุวรรณ') || fullEn.includes('wessuwan') || fullEn.includes('vesuwan');
  if (isWessuwan) {
    virtues.add('wealth-and-fortune');    // เทพแห่งขุมทรัพย์ มหาลาภ ร่ำรวย
    virtues.add('career-and-power');     // ท้าวจตุโลกบาล มหาอำนาจ ขจัดอุปสรรค
    virtues.add('miraculous-protection'); // ปราบภูตผี กันคุณไสย ล้างอาถรรพ์
  }

  // 10.2 Phya Garuda (พญาครุฑ มหาอำนาจ เลื่อนขั้น ล้างอาถรรพ์)
  const isGaruda = nameHas('ครุฑ') || fullEn.includes('garuda');
  if (isGaruda) {
    virtues.add('career-and-power');     // อำนาจบารมี ล้างอาถรรพ์ เลื่อนยศ เลื่อนตำแหน่ง
    virtues.add('miraculous-protection'); // คุ้มครองภัย ชนะศัตรู
  }

  // 10.3 Ganesha (พระพิฆเนศ เทพแห่งความสำเร็จ)
  const isGanesha = nameHas('พิฆเนศ') || fullEn.includes('ganesha');
  if (isGanesha) {
    virtues.add('career-and-power');    // ความสำเร็จในการงาน การเรียน ขจัดอุปสรรค
    virtues.add('wealth-and-fortune'); // โชคลาภ ทรัพย์สิน ความอุดมสมบูรณ์
    virtues.add('metta-and-charisma');  // สติปัญญา ผู้ใหญ่เมตตา
  }

  // 10.4 Phra Phrom (พระพรหม 4 หน้า พรหมประสิทธิ์)
  const isBrahma = nameHas('พรหม') || fullEn.includes('brahma') || fullEn.includes('phrom');
  if (isBrahma) {
    virtues.add('career-and-power');     // ลิขิตชีวิต เลื่อนขั้น การงานสำเร็จ
    virtues.add('metta-and-charisma');   // เมตตามหานิยม คนรักใคร่
    virtues.add('wealth-and-fortune');    // โชคลาภ เงินทอง
    virtues.add('miraculous-protection'); // แคล้วคลาด ปลอดภัย
  }

  // 10.5 Phra Rahu (พระราหู พลิกดวงชะตา แก้ชง)
  const isRahu = nameHas('ราหู') || fullEn.includes('rahu');
  if (isRahu) {
    virtues.add('miraculous-protection'); // แก้ปีชง ปัดเป่าเคราะห์ร้าย ล้างอาถรรพ์
    virtues.add('wealth-and-fortune');    // เสี่ยงโชค โชคลาภ พลิกดวงเป็นเศรษฐี
  }

  // 11. Protective & Warrior Talismans: Takrut, Bia Gae, Mit Mor, Tiger, Singha, Hanuman, Yant
  const isWarrior = nameHas('ตะกรุด') || nameHas('เบี้ยแก้') || nameHas('มีดหมอ') || 
                    nameHas('เสือ') || nameHas('สิงห์') || nameHas('สิงห') || 
                    nameHas('หนุมาน') || nameHas('พยัคฆ์') || nameHas('เชือกคาด') ||
                    nameHas('หวายลูกนิมิต') || nameHas('ปรุหนัง') || nameHas('มเหศวร') ||
                    nameHas('ท่ากระดาน') || nameHas('ยอดธง');
  if (isWarrior) {
    virtues.add('miraculous-protection'); // คงกระพัน ชาตรี มหาอุตม์ แคล้วคลาด กันคุณไสย
    if (nameHas('เสือ') || nameHas('สิงห์') || nameHas('หนุมาน') || nameHas('พยัคฆ์') || nameHas('มหาปราบ') || nameHas('ยอดธง')) {
      virtues.add('career-and-power'); // มหาอำนาจ ตบะเดชะ บริวารยำเกรง ชนะศัตรู
    }
    // Check if specifically wealth takrut
    if (nameHas('โภคทรัพย์') || nameHas('สาริกา') || nameHas('ค้าขาย') || nameHas('โชคลาภ') || nameHas('รวย')) {
      virtues.add('wealth-and-fortune');
    }
  }

  // 12. Metta & Wealth Talismans: Nang Kwak, Guman, Sarika, Si Phueng, Phan Thai, Nam Tao, Chuchok, Tao Ruean, Jin Da Manee
  const isMettaWealthTal = nameHas('นางกวัก') || nameHas('กุมาร') || nameHas('สาริกา') || 
                           nameHas('สาลิกา') || nameHas('สีผึ้ง') || nameHas('ผานไถ') || 
                           nameHas('จิ้งจก') || nameHas('อิ้น') || nameHas('ชูชก') || 
                           nameHas('เต่าเรือน') || nameHas('ถุงเหนี่ยวทรัพย์') || 
                           nameHas('น้ำเต้า') || nameHas('จินดามณี') || nameHas('บัวบังใบ') ||
                           nameHas('เงาะ');
  if (isMettaWealthTal) {
    virtues.add('wealth-and-fortune'); // เรียกทรัพย์ กวักเงินทอง ค้าขายร่ำรวย
    virtues.add('metta-and-charisma');  // มหาเสน่ห์ เจรจาค้าขาย เมตตามหานิยม
  }

  // 13. Great Buddha Images: Chinarat, Sothorn, LP To, Phra Kaew Morakot, Leela, Wat Chaiyo, Wat Paknam
  const isGreatBuddha = nameHas('ชินราช') || nameHas('โสธร') || nameHas('หลวงพ่อโต') || 
                        nameHas('พระแก้วมรกต') || nameHas('ลีลา') || nameHas('สุโขทัย') || 
                        nameHas('ปากน้ำ') || nameHas('วัดระฆัง') || nameHas('บางขุนพรหม') ||
                        nameHas('พระพุทธ') || nameHas('ชนะสงคราม') || nameHas('ซุ้มกอ') ||
                        nameHas('ผงสุพรรณ');
  if (isGreatBuddha) {
    virtues.add('miraculous-protection'); // พระพุทธคุณคุ้มครอง แคล้วคลาด ปลอดภัย
    virtues.add('career-and-power');     // เสริมบารมี ค้ำดวง เจริญก้าวหน้า
    if (nameHas('โสธร') || nameHas('ปากน้ำ') || nameHas('ซุ้มกอ') || has('โชคลาภ') || has('ค้าขาย') || has('ปลดหนี้')) {
      virtues.add('wealth-and-fortune');
    }
    if (nameHas('ลีลา') || nameHas('ชินราช') || nameHas('เมตตา')) {
      virtues.add('metta-and-charisma');
    }
  }

  // 14. Great Guru Monks: Koon, Pae, Guay, Dooh, Kasem, Tim, Toeh, Chamnian, etc.
  const isGuru = nameHas('หลวงพ่อคูณ') || nameHas('หลวงปู่ดู่') || nameHas('หลวงพ่อแพ') || 
                 nameHas('หลวงพ่อกวย') || nameHas('หลวงพ่อเกษม') || nameHas('หลวงปู่ทิม') ||
                 nameHas('หลวงปู่โต๊ะ') || nameHas('พ่อท่าน') || nameHas('ครูบา') ||
                 nameHas('อาจารย์ชุม') || nameHas('อาจารย์นำ') || nameHas('หลวงพ่อคลิ้ง') ||
                 nameHas('หลวงพ่อมุม') || nameHas('หลวงปู่เพิ่ม') || nameHas('หลวงปู่เจือ') ||
                 nameHas('หลวงพ่อเปิ่น') || nameHas('หลวงพ่อสุด') || nameHas('หลวงพ่อสด') ||
                 nameHas('หลวงปู่แหวน') || nameHas('หลวงปู่ขาว') || nameHas('หลวงปู่หลิว') ||
                 nameHas('หลวงพ่อพรหม') || nameHas('หลวงพ่อสงวน') || nameHas('หลวงปู่คร่ำ') ||
                 nameHas('หลวงพ่อทอง') || nameHas('หลวงพ่อจง') || nameHas('หลวงพ่อเดิม');
  if (isGuru) {
    virtues.add('miraculous-protection'); // เมตตาแคล้วคลาดจากบารมีครูบาอาจารย์
    virtues.add('metta-and-charisma');   // เมตตามหานิยม ศิษย์รักใคร่
    // Check if specifically known for wealth or edition has wealth
    if (nameHas('คูณ') || nameHas('กวย') || nameHas('หลิว') || nameHas('เงิน') || nameHas('รวย') || nameHas('ทอง') && !nameHas('ทองแดง') && !nameHas('ทองเหลือง') && !nameHas('กะไหล่ทอง')) {
      virtues.add('wealth-and-fortune');
    }
    if (nameHas('เลื่อน') || nameHas('เจริญ') || nameHas('บารมี') || nameHas('เปิ่น') || nameHas('เดิม')) {
      virtues.add('career-and-power');
    }
  }

  // 15. Semantic Keyword Overrides & Deep Checks (without being fooled by materials!)
  // Clean text from material words before checking wealth/fortune keywords
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
    .replace(/เลี่ยมเงิน/g, '');

  // Authentic Wealth keywords
  const authenticWealthKeywords = [
    'โชคลาภ', 'ค้าขาย', 'ร่ำรวย', 'มหาลาภ', 'ปลดหนี้', 'มั่งคั่ง', 'เงินล้าน',
    'มหาเศรษฐี', 'เศรษฐี', 'รับทรัพย์', 'โภคทรัพย์', 'ดูดทรัพย์', 'บันดาลโชค',
    'ดวงเศรษฐี', 'มหาโชค', 'ลาภผล', 'พอกทรัพย์', 'เรียกทรัพย์', 'มหาทรัพย์',
    'นำโชค', 'ค้าขายดี', 'ร่ำรวยมหาศาล', 'เจ้าสัว', 'มหาโภคทรัพย์', 'อุดมสมบูรณ์'
  ];
  if (authenticWealthKeywords.some(k => textWithoutMaterials.includes(k))) {
    virtues.add('wealth-and-fortune');
  }

  // Authentic Protection keywords
  const authenticProtectionKeywords = [
    'แคล้วคลาด', 'ปลอดภัย', 'คงกระพัน', 'กันภัย', 'นิรันตราย', 'มหาอุด', 'มหาอุตม์',
    'คุ้มครอง', 'คุ้มภัย', 'กันคุณไสย', 'ปราบผี', 'ขับไล่สิ่งอัปมงคล', 'แก้ชง',
    'รอดพ้น', 'เหนียว', 'ป้องกันภัย', 'นิราศภัย', 'ศัตรูพ่าย', 'ปัดเป่า'
  ];
  if (authenticProtectionKeywords.some(k => fullTh.includes(k))) {
    virtues.add('miraculous-protection');
  }

  // Authentic Metta keywords
  const authenticMettaKeywords = [
    'เมตตา', 'มหานิยม', 'มหาเสน่ห์', 'เสน่ห์', 'เจรจา', 'เอ็นดู', 'ผู้ใหญ่รัก',
    'อุปถัมภ์', 'คนรักใคร่', 'ความรัก', 'สาริกาลิ้นทอง', 'จินดามณี', 'นะหน้าทอง',
    'สาลิกา', 'ผูกจิต', 'ผูกใจ', 'นิยมชมชอบ'
  ];
  if (authenticMettaKeywords.some(k => fullTh.includes(k))) {
    virtues.add('metta-and-charisma');
  }

  // Authentic Career & Power keywords
  const authenticCareerKeywords = [
    'อำนาจ', 'มหาอำนาจ', 'บารมี', 'เลื่อนขั้น', 'เลื่อนตำแหน่ง', 'เลื่อนสมณศักดิ์',
    'การงาน', 'ชนะศึก', 'ชนะอุปสรรค', 'ความสำเร็จ', 'ก้าวหน้า', 'ผู้นำ',
    'เจริญก้าวหน้า', 'มหาปราบ', 'ตบะ', 'เดชเดชา', 'ข้าราชการ', 'ราชา', 'จักรพรรดิ'
  ];
  if (authenticCareerKeywords.some(k => fullTh.includes(k))) {
    virtues.add('career-and-power');
  }

  // Fallback: If still 0 (e.g. rare sacred items, Por Gae, hermits, etc.)
  if (virtues.size === 0) {
    // If it's a sacred guru/sacred item, in Thai tradition it bestows Protection & Metta
    virtues.add('miraculous-protection');
    virtues.add('metta-and-charisma');
  }

  return Array.from(virtues);
}

// Run classification test across all 452 products
const newResults = products.map(p => {
  const v = classifyAmulet(p);
  return {
    id: p.id,
    name_th: p.name_th,
    category: p.category,
    virtues: v
  };
});

// Check counts
const newCounts = {
  'wealth-and-fortune': 0,
  'miraculous-protection': 0,
  'metta-and-charisma': 0,
  'career-and-power': 0
};

const newDist = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

newResults.forEach(r => {
  r.virtues.forEach(slug => {
    newCounts[slug]++;
  });
  newDist[r.virtues.length] = (newDist[r.virtues.length] || 0) + 1;
});

console.log('=== NEW ACCURATE TAXONOMY RESULTS (out of 452) ===');
console.log('Virtue Match Counts:');
for (const [slug, count] of Object.entries(newCounts)) {
  console.log(` - ${slug}: ${count} (${((count/products.length)*100).toFixed(1)}%)`);
}

console.log('\nDistribution of Virtues Count Per Amulet:');
console.log(newDist);

// Check LP Thuad in Wealth under new system
const thuadWealthNew = newResults.filter(r => {
  const n = r.name_th || '';
  return (n.includes('ทวด')) && r.virtues.includes('wealth-and-fortune');
});
console.log(`\nLP Thuad in Wealth under NEW system: ${thuadWealthNew.length} (Was 22 in old system!)`);
thuadWealthNew.forEach(r => console.log(`   * ID ${r.id}: ${r.name_th} [Virtues: ${r.virtues.join(', ')}]`));

// Check Talismans in Wealth under new system (e.g. Mit Mor, Takrut, Tiger)
const talWealthNew = newResults.filter(r => {
  const n = r.name_th || '';
  const isWarrior = n.includes('มีดหมอ') || n.includes('เบี้ยแก้') || n.includes('เสือ') || n.includes('หนุมาน');
  return isWarrior && r.virtues.includes('wealth-and-fortune');
});
console.log(`\nWarrior Talismans (Mit Mor, Bia Gae, Tiger, Hanuman) in Wealth under NEW system: ${talWealthNew.length}`);
talWealthNew.forEach(r => console.log(`   * ID ${r.id}: ${r.name_th}`));

// Check the 8 previous False Negatives (0 virtues in old system)
const prevZeroIds = [1436, 1438, 1446, 1451, 1453, 1527, 1598, 1668];
console.log('\n=== Previous 8 ZERO-VIRTUE False Negatives Now: ===');
newResults.filter(r => prevZeroIds.includes(r.id)).forEach(r => {
  console.log(` - ID ${r.id}: ${r.name_th}`);
  console.log(`   Assigned Virtues: [${r.virtues.join(', ')}]`);
});
