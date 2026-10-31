import type { Product } from './types';

export interface VirtueInfo {
  slug: string;
  icon: string;
  th: string;
  en: string;
  zh: string;
  badge_th: string;
  badge_en: string;
  badge_zh: string;
  desc_th: string;
  desc_en: string;
  desc_zh: string;
  keywords: string[];
  categories: string[];
  searchTerms: string[];
}

export const VIRTUES: Record<string, VirtueInfo> = {
  'wealth-and-fortune': {
    slug: 'wealth-and-fortune',
    icon: '💰',
    th: 'พระเสริมโชคลาภ การเงิน ค้าขาย',
    en: 'Wealth, Fortune & Business Prosperity Thai Amulets',
    zh: '泰国招财、偏财与经商致富佛牌',
    badge_th: 'มหาลาภ · ค้าขายร่ำรวย · ปลดหนี้ (招财 / 偏财)',
    badge_en: 'Wealth Attraction · Business Luck · Debt Clearance',
    badge_zh: '招财进宝 · 偏财运 · 生意兴隆',
    desc_th: 'รวมสุดยอดพระเครื่องและวัตถุมงคลเสริมโชคลาภ การเงิน การค้าขาย และปลดหนี้สิน คัดสรรพระปิดตามหาลาภ พระสังกัจจายน์ พระสิวลี พระอุปคุต และเหรียญเกจิมหาเศรษฐี รับประกันพระแท้ 100%',
    desc_en: 'Authentic consecrated Thai amulets renowned for business prosperity, windfall luck, debt clearance, and commercial breakthroughs. Featuring Phra Pidta, Phra Sangkachai, Phra Sivali, and wealth-blessed master pieces.',
    desc_zh: '精选全泰正统招财名品，助旺正财偏财、经商投资与守财丰足。汇聚闭眼掩面必打佛、富贵善迦财、西瓦里尊者等顶级高僧开光圣物，100%保真保洁。',
    keywords: [
      'Thai wealth amulets', 'Phra Pidta wealth', 'amulets for business prosperity', 'money attraction amulet Thailand',
      'พระโชคลาภแท้', 'พระค้าขาย ร่ำรวย', 'พระปิดตามหาลาภ', 'พระสังกัจจายน์', 'พระสิวลี', 'พระอุปคุต', 'เหรียญเจ้าสัว',
      '泰国招财佛牌', '偏财佛牌', '必打佛招财', '善迦财', '经商佛牌'
    ],
    categories: ['พระปิดตา', 'พระสังกัจจายน์', 'หลวงพ่อเงิน', 'พระสิวลี', 'พระอุปคุต', 'เจ้าสัว', 'หลวงพ่อรวย'],
    searchTerms: [
      'โชคลาภ', 'ค้าขาย', 'ร่ำรวย', 'มหาลาภ', 'เงินทอง', 'ปลดหนี้', 'มั่งคั่ง', 'เศรษฐี', 'มหาเศรษฐี',
      'โภคทรัพย์', 'เงินล้าน', 'รับทรัพย์', 'ดูดทรัพย์', 'บันดาลโชค', 'ดวงเศรษฐี', 'เจ้าสัว', 'ค้าขายดี',
      'wealth', 'windfall', 'prosperity blessing', '招财', '偏财', '守财', '财运', '生意'
    ]
  },
  'miraculous-protection': {
    slug: 'miraculous-protection',
    icon: '🛡️',
    th: 'พระเครื่องแคล้วคลาด ปลอดภัย กันภัย',
    en: 'Miraculous Protection & Accident Safety Thai Amulets',
    zh: '泰国避险保平安、护身辟邪与车辆守护佛牌',
    badge_th: 'นิรันตราย · แคล้วคลาด · คุ้มครองภัย (避险 / 保平安)',
    badge_en: 'Accident Protection · Spiritual Shield · Bodhisattva Grace',
    badge_zh: '全泰避险第一 · 车辆平安 · 挡灾化煞',
    desc_th: 'รวมสุดยอดพระเครื่องนิรันตราย แคล้วคลาด ปลอดภัย คุ้มครองอุบัติเหตุ และป้องกันภัยรอบด้าน นำโดยพระหลวงพ่อทวด วัดช้างให้ พระรอด พระกริ่ง และเครื่องรางศักดิ์สิทธิ์ รับประกันแท้ 100%',
    desc_en: 'Thailand\'s most venerated protective amulets for ultimate road safety, physical defense, and miraculous escape from mortal danger. Featuring authentic Luang Pu Tuad, Phra Rod, Phra Kring, and consecrated shields.',
    desc_zh: '汇集泰国公认避险第一、车祸平安守护与化解凶险之顶级圣物。尊奉龙普托高僧、帕罗古佛、药师铃铛佛与正统护身法宝，庇佑出入平安、逢凶化吉。',
    keywords: [
      'Thai protection amulet', 'Luang Pu Tuad protection', 'accident safety amulet Thailand', 'most powerful protection amulet',
      'พระแคล้วคลาด', 'หลวงพ่อทวด วัดช้างให้ แท้', 'พระรอด', 'พระกันภัย', 'พระหน้ารถ', 'เบี้ยแก้', 'ตะกรุดคงกระพัน',
      '龙普托佛牌真品', '泰国避险佛牌', '车神龙普托', '保平安佛牌', '挡灾佛牌'
    ],
    categories: ['หลวงพ่อทวด', 'พระรอด', 'พระกริ่ง', 'ตะกรุด', 'เบี้ยแก้'],
    searchTerms: [
      'แคล้วคลาด', 'ปลอดภัย', 'คงกระพัน', 'กันภัย', 'นิรันตราย', 'มหาอุด', 'มหาอุตม์', 'คุ้มครอง', 'คุ้มภัย',
      'กันคุณไสย', 'ปราบผี', 'แก้ชง', 'protection', 'safety', 'survive', 'shield', 'miracle', 'car safety',
      '避险', '保平安', '挡灾', '辟邪', '龙普托'
    ]
  },
  'metta-and-charisma': {
    slug: 'metta-and-charisma',
    icon: '💖',
    th: 'พระเมตตามหานิยม มหาเสน่ห์ เจรจา',
    en: 'Metta, Loving-Kindness & Charisma Thai Amulets',
    zh: '泰国人缘贵人、增进魅力与谈判商机佛牌',
    badge_th: 'เมตตามหานิยม · เสน่ห์เจรจา · ผู้ใหญ่เอ็นดู (人缘 / 贵人)',
    badge_en: 'Loving-Kindness · Persuasive Charm · Noble Patrons',
    badge_zh: '贵人相助 · 桃花魅力 · 和谐人际',
    desc_th: 'ศูนย์รวมพระเครื่องสายเมตตามหานิยม มหาเสน่ห์ เจรจาค้าขาย ผู้ใหญ่เอ็นดู อุปถัมภ์ค้ำชู และเสริมเสน่ห์ดึงดูดใจ นำโดยพระขุนแผน พระนางพญา และพระผงมวลสารศักดิ์สิทธิ์ รับประกันแท้ 100%',
    desc_en: 'Sacred Thai Buddhist amulets blessed for Metta Mahaniyom (magnetic loving-kindness), sales charisma, public speaking influence, and attracting helpful benefactors. Featuring Phra Khun Phaen, Phra Nang Phaya, and sacred powder masters.',
    desc_zh: '专注提升职场人际磁场、贵人提携、增进男女异性缘与商业谈判魅力的正品佛牌。精选坤平将军、南帕雅女王佛及珍贵经粉名作，助您左右逢源。',
    keywords: [
      'Metta amulet Thailand', 'Phra Khun Phaen charm', 'Thai love attraction amulet', 'charisma amulet',
      'พระเมตตามหานิยม', 'พระมหาเสน่ห์', 'พระขุนแผนแท้', 'พระนางพญา', 'พระเจรจาค้าขาย', 'สีผึ้งมหาเสน่ห์', 'สาริกาลิ้นทอง',
      '泰国人缘佛牌', '坤平将军佛牌', '南帕雅女王佛', '贵人佛牌', '招人缘'
    ],
    categories: ['พระขุนแผน', 'พระนางพญา', 'สาริกา', 'สีผึ้ง', 'นางกวัก'],
    searchTerms: [
      'เมตตา', 'มหานิยม', 'มหาเสน่ห์', 'เสน่ห์', 'เจรจา', 'เอ็นดู', 'ผู้ใหญ่รัก', 'อุปถัมภ์', 'ความรัก', 'สาริกา',
      'จินดามณี', 'นะหน้าทอง', 'metta', 'charisma', 'charm', 'attraction', 'kindness', 'love', '人缘', '贵人', '魅力', '桃花', '助人缘', '坤平'
    ]
  },
  'career-and-power': {
    slug: 'career-and-power',
    icon: '👑',
    th: 'พระเสริมอำนาจบารมี การงาน เลื่อนตำแหน่ง',
    en: 'Career Success, Leadership Aura & Authority Thai Amulets',
    zh: '泰国事业升迁、领导威严与破除阻碍佛牌',
    badge_th: 'มหาอำนาจ · บารมีผู้นำ · เลื่อนขั้นตำแหน่ง (事业 / 升迁)',
    badge_en: 'Executive Authority · Career Promotion · Victory Over Obstacles',
    badge_zh: '事业登顶 · 权威官运 · 破除阻碍',
    desc_th: 'รวมสุดยอดวัตถุมงคลและพระเครื่องเสริมอำนาจบารมี ความเป็นผู้นำ หนุนดวงการงาน เลื่อนขั้น เลื่อนตำแหน่ง ชนะศัตรูคู่แข่ง นำโดยพระสมเด็จ (จักรพรรดิแห่งพระเครื่อง) พระนาคปรก พญาครุฑ และพระพิฆเนศ รับประกันแท้ 100%',
    desc_en: 'Supreme Thai amulets consecrated for executive authority, leadership charisma, career promotion, and triumph over market competitors. Featuring the King of Amulets (Phra Somdej), Phra Naga Prok, Phya Garuda, and Lord Ganesha.',
    desc_zh: '专为企事业单位主管、创业者与追求晋升精英打造。赋能领袖气魄、增强职场话语权、降伏竞争对手。首推万佛之王崇迪佛、七龙那伽遮佛、大鹏金翅鸟与象头神圣物。',
    keywords: [
      'career success amulet Thailand', 'Phra Somdej leadership', 'authority power amulet', 'business breakthrough amulet',
      'พระเสริมบารมี', 'พระเลื่อนตำแหน่ง', 'พระสมเด็จแท้', 'พระนาคปรก', 'พระพิฆเนศความสำเร็จ', 'พญาครุฑมหาอำนาจ',
      '泰国事业佛牌', '崇迪佛牌真品', '升官发财佛牌', '象神佛牌', '领导威严', '大鹏金翅鸟'
    ],
    categories: ['พระสมเด็จ', 'พระนาคปรก', 'พระพิฆเนศ', 'พญาครุฑ', 'หลวงปู่โต พรหมรังสี', 'ท้าวเวสสุวรรณ'],
    searchTerms: [
      'บารมี', 'มหาอำนาจ', 'เลื่อนขั้น', 'เลื่อนตำแหน่ง', 'เลื่อนสมณศักดิ์', 'การงาน', 'ชนะศึก', 'ชนะอุปสรรค',
      'ความสำเร็จ', 'ก้าวหน้า', 'ผู้นำ', 'จักรพรรดิ', 'ราชา', 'มหาปราบ', 'career', 'power', 'success',
      'authority', 'promotion', 'leadership', '事业', '升迁', '权力', '威望', '事业顺利', '崇迪'
    ]
  }
};

export function isVirtueSlug(slug: string): boolean {
  return slug in VIRTUES;
}

/**
 * Strips out material phrases (e.g. copper, brass, gold plated, silver)
 * that frequently cause false positive matches in wealth/fortune searches.
 */
function cleanMaterialTerms(text: string): string {
  return text
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
    .replace(/เงิน๙๒/g, '');
}

/**
 * Authoritative Thai Amulet Master Taxonomy Engine
 * Maps each product to 1-4 legitimate Buddhist virtue categories based on:
 * 1. Sacred Iconography (พิมพ์ทรงพระ / อัครสาวก / มหาเทพ)
 * 2. Consecration Lineage & Master Purpose (สายวิชา / พุทธาภิเษก)
 * 3. Specific Edition Name & Blessing Inscriptions (ชื่อรุ่นมงคล / ยันต์)
 * 4. Material-Disambiguated Semantic Keyword Matching
 */
export function getProductVirtues(p: Product): string[] {
  const nameTh = p.name_th || p.name || '';
  const descTh = p.description_th || '';
  const fullTh = `${nameTh} ${descTh} ${p.category || ''}`;
  const fullEn = `${p.name || ''} ${p.category || ''} ${p.short || ''}`.toLowerCase();

  const virtues = new Set<string>();

  const nameHas = (term: string) => nameTh.includes(term);
  const fullHas = (term: string) => fullTh.includes(term);

  // 1. Phra Somdej (จักรพรรดิแห่งพระเครื่อง: ครอบจักรวาล - อำนาจบารมี, เมตตามหานิยม, แคล้วคลาด)
  const isSomdej = nameHas('สมเด็จ') || fullEn.includes('somdej');
  if (isSomdej) {
    virtues.add('career-and-power');
    virtues.add('miraculous-protection');
    virtues.add('metta-and-charisma');
    if (nameHas('โชคลาภ') || nameHas('มหาลาภ') || nameHas('เงินล้าน') || nameHas('เศรษฐี') || nameHas('ปลดหนี้') || nameHas('ค้าขาย') || nameHas('รวย') || nameHas('รวงข้าว')) {
      virtues.add('wealth-and-fortune');
    }
  }

  // 2. Luang Phor Thuad (พระนิรันตรายอันดับ 1 ของสยาม)
  const isThuad = nameHas('ทวด') || fullEn.includes('tuad') || fullEn.includes('thuad');
  if (isThuad) {
    virtues.add('miraculous-protection');
    virtues.add('metta-and-charisma');
    // Only genuine wealth-blessed editions
    if (nameHas('สิทธิโชค') || nameHas('มหาเศรษฐี') || nameHas('อนันตทรัพย์') || nameHas('เงินล้าน') || nameHas('ปลดหนี้') || nameHas('โชคลาภ') || nameHas('ร่ำรวย')) {
      virtues.add('wealth-and-fortune');
    }
  }

  // 3. Phra Pidta (พระภควัมบดี มหาลาภ ปลดหนี้ & มหาอุด แคล้วคลาด)
  const isPidta = nameHas('ปิดตา') || fullEn.includes('pidta') || fullEn.includes('pid ta');
  if (isPidta) {
    virtues.add('wealth-and-fortune');
    virtues.add('miraculous-protection');
    if (nameHas('มหาเสน่ห์') || nameHas('เสน่ห์') || nameHas('จินดามณี') || nameHas('จินดามนี') || fullHas('เมตตา')) {
      virtues.add('metta-and-charisma');
    }
    if (nameHas('ยันต์ยุ่ง') || nameHas('มหาอำนาจ') || nameHas('หัวจรวด') || nameHas('แร่บางไผ่') || fullHas('คงกระพัน')) {
      virtues.add('career-and-power');
    }
  }

  // 4. Phra Khun Paen (ยอดพระมหาเสน่ห์ เมตตา เจรจา & โชคลาภค้าขาย เสี่ยงดวง)
  const isKhunPaen = nameHas('ขุนแผน') || fullEn.includes('khun phaen') || fullEn.includes('khunpaen');
  if (isKhunPaen) {
    virtues.add('metta-and-charisma');
    virtues.add('wealth-and-fortune');
    if (nameHas('พรายกุมาร') || nameHas('กุมารทอง')) {
      virtues.add('miraculous-protection');
    }
    if (nameHas('ทรงพล') || nameHas('ยอดขุนพล') || nameHas('สะกดทัพ') || nameHas('ปราบมาร') || nameHas('มหาอำนาจ') || nameHas('เสือ')) {
      virtues.add('career-and-power');
    }
  }

  // 5. Phra Nang Phaya (ราชินีแห่งพระเครื่อง: เสน่ห์สง่างาม + อำนาจบารมี + แคล้วคลาด)
  const isNangPhaya = nameHas('นางพญา') || fullEn.includes('nang phaya') || fullEn.includes('nangphaya');
  if (isNangPhaya) {
    virtues.add('metta-and-charisma');
    virtues.add('career-and-power');
    virtues.add('miraculous-protection');
  }

  // 6. Phra Rod & Phra Khong (ยอดพระรอดพ้นภัยพิบัติ & อำนาจบารมี ชนะศึก)
  const isRodOrKhong = nameHas('พระรอด') || nameHas('พระคง') || nameHas('พระบาง') || fullEn.includes('phra rod') || fullEn.includes('phra khong');
  if (isRodOrKhong) {
    virtues.add('miraculous-protection');
    virtues.add('career-and-power');
  }

  // 7. Phra Kring & Phra Chaiwat (พระหมอยา สุขภาพ ปลอดภัย & ชัยชนะ เลื่อนขั้น)
  const isKring = nameHas('กริ่ง') || nameHas('ชัยวัฒน์') || fullEn.includes('phra kring') || fullEn.includes('chaiwat');
  if (isKring) {
    virtues.add('miraculous-protection');
    virtues.add('career-and-power');
    if (nameHas('โชคลาภ') || nameHas('มหาลาภ') || nameHas('ร่ำรวย') || nameHas('ปลดหนี้') || nameHas('เศรษฐี') || nameHas('โภคทรัพย์')) {
      virtues.add('wealth-and-fortune');
    }
  }

  // 8. Phra Naga Prok (คุ้มครองดวงชะตา & มหาอำนาจบารมี)
  const isNagaProk = nameHas('นาคปรก') || fullEn.includes('naga prok') || fullEn.includes('nakprok');
  if (isNagaProk) {
    virtues.add('career-and-power');
    virtues.add('miraculous-protection');
  }

  // 9. Dedicated Wealth Masters & Deities (Sangkachai, Sivali, Upakhut, Chao Sua, LP Ngern, LP Ruay, Setthi Nawakot)
  const isWealthMaster = nameHas('สังกัจจายน์') || nameHas('สิวลี') || nameHas('สีวลี') || nameHas('อุปคุต') || 
                         nameHas('เจ้าสัว') || nameHas('หลวงพ่อเงิน') || nameHas('หลวงพ่อรวย') || 
                         nameHas('เศรษฐีนวโกฏิ') || nameHas('พญาหมู มหาลาภ') || nameHas('ชนะจน') ||
                         nameHas('ปลดหนี้') || nameHas('ทวีทรัพย์') || nameHas('เงินล้าน') || nameHas('ดูดทรัพย์') ||
                         nameHas('หลักฮะ') || nameHas('รวงข้าว');
  if (isWealthMaster) {
    virtues.add('wealth-and-fortune');
    virtues.add('metta-and-charisma');
    if (nameHas('อุปคุต') || nameHas('หลักฮะ')) {
      virtues.add('miraculous-protection');
    }
  }

  // 10. Deities
  // 10.1 Thao Wessuwan (เจ้าแห่งทรัพย์สิน & ปราบภูตผี)
  const isWessuwan = nameHas('เวสสุวรรณ') || fullEn.includes('wessuwan') || fullEn.includes('vesuwan');
  if (isWessuwan) {
    virtues.add('wealth-and-fortune');
    virtues.add('career-and-power');
    virtues.add('miraculous-protection');
  }

  // 10.2 Phya Garuda (พญาครุฑ ตราแผ่นดิน มหาอำนาจ เลื่อนขั้น ล้างอาถรรพ์)
  const isGaruda = nameHas('ครุฑ') || fullEn.includes('garuda');
  if (isGaruda) {
    virtues.add('career-and-power');
    virtues.add('miraculous-protection');
  }

  // 10.3 Lord Ganesha (พระพิฆเนศ เทพแห่งความสำเร็จและปัญญา)
  const isGanesha = nameHas('พิฆเนศ') || fullEn.includes('ganesha');
  if (isGanesha) {
    virtues.add('career-and-power');
    virtues.add('wealth-and-fortune');
    virtues.add('metta-and-charisma');
  }

  // 10.4 Phra Phrom (พระพรหม 4 หน้า ลิขิตชีวิต ความสำเร็จ)
  const isBrahma = nameHas('พรหม') || fullEn.includes('brahma') || fullEn.includes('phrom');
  if (isBrahma) {
    virtues.add('career-and-power');
    virtues.add('metta-and-charisma');
    virtues.add('wealth-and-fortune');
    virtues.add('miraculous-protection');
  }

  // 10.5 Phra Rahu (พระราหู แก้ปีชง เสี่ยงโชค)
  const isRahu = nameHas('ราหู') || fullEn.includes('rahu');
  if (isRahu) {
    virtues.add('miraculous-protection');
    virtues.add('wealth-and-fortune');
  }

  // 11. Protective & Warrior Talismans (Takrut, Bia Gae, Mit Mor, Tiger, Singha, Hanuman, etc.)
  const isWarrior = nameHas('ตะกรุด') || nameHas('เบี้ยแก้') || nameHas('มีดหมอ') || 
                    nameHas('เสือ') || nameHas('สิงห์') || nameHas('สิงห') || 
                    nameHas('หนุมาน') || nameHas('พยัคฆ์') || nameHas('เชือกคาด') ||
                    nameHas('หวายลูกนิมิต') || nameHas('ปรุหนัง') || nameHas('มเหศวร') ||
                    nameHas('ท่ากระดาน') || nameHas('ยอดธง') || nameHas('ยอดขุนพล');
  if (isWarrior) {
    virtues.add('miraculous-protection');
    if (nameHas('เสือ') || nameHas('สิงห์') || nameHas('หนุมาน') || nameHas('พยัคฆ์') || nameHas('มหาปราบ') || nameHas('ยอดธง') || nameHas('ยอดขุนพล')) {
      virtues.add('career-and-power');
    }
    if (nameHas('โภคทรัพย์') || nameHas('สาริกา') || nameHas('ค้าขาย') || nameHas('โชคลาภ') || nameHas('รวย')) {
      virtues.add('wealth-and-fortune');
    }
  }

  // 12. Metta & Wealth Talismans (Nang Kwak, Guman, Sarika, Si Phueng, Phan Thai, Nam Tao, Tao Ruean, Chuchok, Jin Da Manee)
  // Ensure "คอน้ำเต้า" (medal shape) does not trigger "น้ำเต้าดูดทรัพย์"
  const isNamTao = nameHas('น้ำเต้า') && !nameHas('คอน้ำเต้า');
  const isMettaWealthTal = nameHas('นางกวัก') || nameHas('กุมาร') || nameHas('สาริกา') || 
                           nameHas('สาลิกา') || nameHas('สีผึ้ง') || nameHas('ผานไถ') || 
                           nameHas('จิ้งจก') || nameHas('อิ้น') || nameHas('ชูชก') || 
                           nameHas('เต่าเรือน') || nameHas('ถุงเหนี่ยวทรัพย์') || 
                           isNamTao || nameHas('จินดามณี') || nameHas('จินดามนี') || nameHas('บัวบังใบ') ||
                           nameHas('เงาะ');
  if (isMettaWealthTal) {
    virtues.add('wealth-and-fortune');
    virtues.add('metta-and-charisma');
    if (nameHas('ผานไถ')) {
      virtues.add('career-and-power');
    }
    if (nameHas('จินดามณี')) {
      virtues.add('miraculous-protection');
    }
  }

  // 13. Great Buddha Images (Chinarat, Sothorn, LP To, Phra Kaew Morakot, Leela, Soom Kor, etc.)
  const isRealSoomKor = nameHas('ซุ้มกอ') && !isThuad;
  const isGreatBuddha = nameHas('ชินราช') || nameHas('โสธร') || nameHas('หลวงพ่อโต') || 
                        nameHas('พระแก้วมรกต') || nameHas('ลีลา') || nameHas('สุโขทัย') || 
                        nameHas('ปากน้ำ') || nameHas('วัดระฆัง') || nameHas('บางขุนพรหม') ||
                        nameHas('พระพุทธ') || nameHas('ชนะสงคราม') || isRealSoomKor ||
                        nameHas('ผงสุพรรณ') || nameHas('ธรรมจักร') || nameHas('สรงน้ำ');
  if (isGreatBuddha) {
    virtues.add('miraculous-protection');
    virtues.add('career-and-power');
    if (nameHas('ลีลา') || nameHas('โสธร') || nameHas('ปากน้ำ') || isRealSoomKor || nameHas('โชคลาภ') || nameHas('ค้าขาย') || nameHas('ปลดหนี้')) {
      virtues.add('wealth-and-fortune');
    }
    if (nameHas('ลีลา') || nameHas('ชินราช') || nameHas('เมตตา') || nameHas('สรงน้ำ')) {
      virtues.add('metta-and-charisma');
    }
  }

  // 14. Great Guru Monks & Ruesi/Por Gae
  const isPorGae = nameHas('พ่อแก่') || nameHas('ฤาษี') || nameHas('ฤๅษี');
  if (isPorGae) {
    virtues.add('career-and-power');
    virtues.add('metta-and-charisma');
    virtues.add('miraculous-protection');
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
                 nameHas('หลวงปู่ปลอด') || nameHas('หลวงตาม้า') || nameHas('คุณแม่บุญเรือน') ||
                 nameHas('เจ้าคุณนร') || nameHas('เจ้าคุณโพธิ์แจ้ง') || nameHas('หลวงพ่อคง');
  if (isGuru) {
    virtues.add('miraculous-protection');
    virtues.add('metta-and-charisma');
    if (nameHas('คูณ') || nameHas('กวย') || nameHas('หลิว') || nameHas('รวย') || nameHas('พูล') || nameHas('บุญเรือน') || nameHas('บุญชุ่ม')) {
      virtues.add('wealth-and-fortune');
    }
    if (nameHas('เลื่อน') || nameHas('เจริญ') || nameHas('บารมี') || nameHas('เปิ่น') || nameHas('เดิม') || nameHas('วรพต')) {
      virtues.add('career-and-power');
    }
  }

  // 15. Semantic Keyword Checks (Cleaned from Material Stopwords)
  const textCleaned = cleanMaterialTerms(fullTh);

  const authenticWealthKeywords = [
    'โชคลาภ', 'ค้าขาย', 'ร่ำรวย', 'มหาลาภ', 'ปลดหนี้', 'มั่งคั่ง', 'เงินล้าน',
    'มหาเศรษฐี', 'เศรษฐี', 'รับทรัพย์', 'โภคทรัพย์', 'ดูดทรัพย์', 'บันดาลโชค',
    'ดวงเศรษฐี', 'มหาโชค', 'ลาภผล', 'พอกทรัพย์', 'เรียกทรัพย์', 'มหาทรัพย์',
    'นำโชค', 'ค้าขายดี', 'ร่ำรวยมหาศาล', 'เจ้าสัว', 'มหาโภคทรัพย์', 'อุดมสมบูรณ์'
  ];
  if (authenticWealthKeywords.some(k => textCleaned.includes(k))) {
    virtues.add('wealth-and-fortune');
  }

  const authenticProtectionKeywords = [
    'แคล้วคลาด', 'ปลอดภัย', 'คงกระพัน', 'กันภัย', 'นิรันตราย', 'มหาอุด', 'มหาอุตม์',
    'คุ้มครอง', 'คุ้มภัย', 'กันคุณไสย', 'ปราบผี', 'ขับไล่สิ่งอัปมงคล', 'แก้ชง',
    'รอดพ้น', 'เหนียว', 'ป้องกันภัย', 'นิราศภัย', 'ศัตรูพ่าย', 'ปัดเป่า'
  ];
  if (authenticProtectionKeywords.some(k => fullTh.includes(k))) {
    virtues.add('miraculous-protection');
  }

  const authenticMettaKeywords = [
    'เมตตา', 'มหานิยม', 'มหาเสน่ห์', 'เสน่ห์', 'เจรจา', 'เอ็นดู', 'ผู้ใหญ่รัก',
    'อุปถัมภ์', 'คนรักใคร่', 'ความรัก', 'สาริกาลิ้นทอง', 'จินดามณี', 'จินดามนี', 'นะหน้าทอง',
    'สาลิกา', 'ผูกจิต', 'ผูกใจ', 'นิยมชมชอบ'
  ];
  if (authenticMettaKeywords.some(k => fullTh.includes(k))) {
    virtues.add('metta-and-charisma');
  }

  const authenticCareerKeywords = [
    'มหาอำนาจ', 'บารมี', 'เลื่อนขั้น', 'เลื่อนตำแหน่ง', 'เลื่อนสมณศักดิ์',
    'ชนะศึก', 'ชนะอุปสรรค', 'ความสำเร็จ', 'ก้าวหน้า', 'ผู้นำ',
    'เจริญก้าวหน้า', 'มหาปราบ', 'ตบะ', 'เดชเดชา', 'ข้าราชการ', 'ราชา', 'จักรพรรดิ'
  ];
  if (authenticCareerKeywords.some(k => fullTh.includes(k))) {
    virtues.add('career-and-power');
  }

  // Fallback: Consecrated Buddhist amulets provide Protection and Metta
  if (virtues.size === 0) {
    virtues.add('miraculous-protection');
    virtues.add('metta-and-charisma');
  }

  return Array.from(virtues);
}

/**
 * Filter products strictly by virtue slug using the multi-virtue taxonomy engine.
 */
export function filterProductsByVirtue(products: Product[], virtueSlug: string): Product[] {
  if (!isVirtueSlug(virtueSlug)) return products;
  return products.filter(p => getProductVirtues(p).includes(virtueSlug));
}

/**
 * Helper to get virtue badge objects for rendering in product cards or details.
 */
export function getVirtueBadges(p: Product, lang: string = 'th'): Array<{ slug: string; icon: string; label: string }> {
  const slugs = getProductVirtues(p);
  return slugs.map(slug => {
    const v = VIRTUES[slug];
    const label = lang === 'en' ? v.badge_en : lang === 'zh' ? v.badge_zh : v.badge_th;
    return {
      slug,
      icon: v.icon,
      label
    };
  });
}
