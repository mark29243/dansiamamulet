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
    desc_th: 'รวมสุดยอดพระเครื่องและวัตถุมงคลเสริมโชคลาภ การเงิน การค้าขาย และปลดหนี้สิน คัดสรรพระปิดตามหาลาภ พระสังกัจจายน์ พระสิวลี และเหรียญเกจิมหาเศรษฐี รับประกันพระแท้ 100%',
    desc_en: 'Authentic consecrated Thai amulets renowned for business prosperity, windfall luck, debt clearance, and commercial breakthroughs. Featuring Phra Pidta, Phra Sangkachai, Phra Sivali, and wealth-blessed master pieces.',
    desc_zh: '精选全泰正统招财名品，助旺正财偏财、经商投资与守财丰足。汇聚闭眼掩面必打佛、富贵善迦财、西瓦里尊者等顶级高僧开光圣物，100%保真保洁。',
    keywords: [
      'Thai wealth amulets', 'Phra Pidta wealth', 'amulets for business prosperity', 'money attraction amulet Thailand',
      'พระโชคลาภแท้', 'พระค้าขาย ร่ำรวย', 'พระปิดตามหาลาภ', 'พระสังกัจจายน์', 'พระสิวลี',
      '泰国招财佛牌', '偏财佛牌', '必打佛招财', '善迦财', '经商佛牌'
    ],
    categories: ['พระปิดตา', 'พระสังกัจจายน์', 'หลวงพ่อเงิน', 'เหรียญ', 'เครื่องราง'],
    searchTerms: ['โชคลาภ', 'ค้าขาย', 'ร่ำรวย', 'มหาลาภ', 'เงินทอง', 'ปลดหนี้', 'มั่งคั่ง', 'เงิน', 'ทอง', 'เศรษฐี', 'wealth', 'fortune', 'rich', 'prosperity', 'luck', 'financial', '招财', '偏财', '守财', '财运', '生意']
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
      'พระแคล้วคลาด', 'หลวงพ่อทวด วัดช้างให้ แท้', 'พระรอด', 'พระกันภัย', 'พระหน้ารถ',
      '龙普托佛牌真品', '泰国避险佛牌', '车神龙普托', '保平安佛牌', '挡灾佛牌'
    ],
    categories: ['หลวงพ่อทวด', 'พระรอด', 'พระกริ่ง', 'เครื่องราง'],
    searchTerms: ['แคล้วคลาด', 'ปลอดภัย', 'คงกระพัน', 'กันภัย', 'นิรันตราย', 'มหาอุด', 'คุ้มครอง', 'คุ้มภัย', 'protection', 'safety', 'survive', 'shield', 'miracle', 'car safety', '避险', '保平安', '挡灾', '辟邪', '龙普托']
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
      'พระเมตตามหานิยม', 'พระมหาเสน่ห์', 'พระขุนแผนแท้', 'พระนางพญา', 'พระเจรจาค้าขาย',
      '泰国人缘佛牌', '坤平将军佛牌', '南帕雅女王佛', '贵人佛牌', '招人缘'
    ],
    categories: ['พระขุนแผน', 'พระนางพญา', 'พระผง'],
    searchTerms: ['เมตตา', 'มหานิยม', 'มหาเสน่ห์', 'เสน่ห์', 'เจรจา', 'เอ็นดู', 'ผู้ใหญ่', 'อุปถัมภ์', 'ความรัก', 'metta', 'charisma', 'charm', 'attraction', 'kindness', 'love', '人缘', '贵人', '魅力', '桃花', '助人缘', '坤平']
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
    desc_th: 'รวมสุดยอดวัตถุมงคลและพระเครื่องเสริมอำนาจบารมี ความเป็นผู้นำ หนุนดวงการงาน เลื่อนขั้น เลื่อนตำแหน่ง ชนะศัตรูคู่แข่ง นำโดยพระสมเด็จ (ราชาแห่งพระเครื่อง) พระนาคปรก และพระพิฆเนศ รับประกันแท้ 100%',
    desc_en: 'Supreme Thai amulets consecrated for executive authority, leadership charisma, career promotion, and triumph over market competitors. Featuring the King of Amulets (Phra Somdej), Phra Naga Prok, and Lord Ganesha.',
    desc_zh: '专为企事业单位主管、创业者与追求晋升精英打造。赋能领袖气魄、增强职场话语权、降伏竞争对手。首推万佛之王崇迪佛、七龙七佛（那伽遮佛）与象头神圣物。',
    keywords: [
      'career success amulet Thailand', 'Phra Somdej leadership', 'authority power amulet', 'business breakthrough amulet',
      'พระเสริมบารมี', 'พระเลื่อนตำแหน่ง', 'พระสมเด็จแท้', 'พระนาคปรก', 'พระพิฆเนศความสำเร็จ',
      '泰国事业佛牌', '崇迪佛牌真品', '升官发财佛牌', '象神佛牌', '领导威严'
    ],
    categories: ['พระสมเด็จ', 'พระนาคปรก', 'พระพิฆเนศ', 'หลวงปู่โต พรหมรังสี', 'หลวงพ่อคูณ'],
    searchTerms: ['บารมี', 'อำนาจ', 'เลื่อนขั้น', 'เลื่อนตำแหน่ง', 'การงาน', 'ชนะ', 'อุปสรรค', 'ความสำเร็จ', 'ก้าวหน้า', 'สมเด็จ', 'ราชา', 'career', 'power', 'success', 'authority', 'promotion', 'leadership', '事业', '升迁', '权力', '威望', '事业顺利', '崇迪']
  }
};

export function isVirtueSlug(slug: string): boolean {
  return slug in VIRTUES;
}

export function filterProductsByVirtue(products: Product[], virtueSlug: string): Product[] {
  const v = VIRTUES[virtueSlug];
  if (!v) return products;

  return products.filter(p => {
    const text = `${p.name} ${p.name_th || ''} ${p.category || ''} ${p.short || ''} ${p.description || ''} ${p.description_th || ''}`.toLowerCase();
    const catMatch = v.categories.some(c => p.category?.includes(c));
    const kwMatch = v.searchTerms.some(k => text.includes(k.toLowerCase()));
    return catMatch || kwMatch;
  });
}
