const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// Load products
const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../products_published_452.json'), 'utf8'));

// Load old logic
const OLD_VIRTUES = {
  'wealth-and-fortune': {
    categories: ['พระปิดตา', 'พระสังกัจจายน์', 'หลวงพ่อเงิน', 'เหรียญ', 'เครื่องราง'],
    searchTerms: ['โชคลาภ', 'ค้าขาย', 'ร่ำรวย', 'มหาลาภ', 'เงินทอง', 'ปลดหนี้', 'มั่งคั่ง', 'เงิน', 'ทอง', 'เศรษฐี', 'wealth', 'fortune', 'rich', 'prosperity', 'luck', 'financial', '招财', '偏财', '守财', '财运', '生意']
  },
  'miraculous-protection': {
    categories: ['หลวงพ่อทวด', 'พระรอด', 'พระกริ่ง', 'เครื่องราง'],
    searchTerms: ['แคล้วคลาด', 'ปลอดภัย', 'คงกระพัน', 'กันภัย', 'นิรันตราย', 'มหาอุด', 'คุ้มครอง', 'คุ้มภัย', 'protection', 'safety', 'survive', 'shield', 'miracle', 'car safety', '避险', '保平安', '挡灾', '辟邪', '龙普托']
  },
  'metta-and-charisma': {
    categories: ['พระขุนแผน', 'พระนางพญา', 'พระผง'],
    searchTerms: ['เมตตา', 'มหานิยม', 'มหาเสน่ห์', 'เสน่ห์', 'เจรจา', 'เอ็นดู', 'ผู้ใหญ่', 'อุปถัมภ์', 'ความรัก', 'metta', 'charisma', 'charm', 'attraction', 'kindness', 'love', '人缘', '贵人', '魅力', '桃花', '助人缘', '坤平']
  },
  'career-and-power': {
    categories: ['พระสมเด็จ', 'พระนาคปรก', 'พระพิฆเนศ', 'หลวงปู่โต พรหมรังสี', 'หลวงพ่อคูณ'],
    searchTerms: ['บารมี', 'อำนาจ', 'เลื่อนขั้น', 'เลื่อนตำแหน่ง', 'การงาน', 'ชนะ', 'อุปสรรค', 'ความสำเร็จ', 'ก้าวหน้า', 'สมเด็จ', 'ราชา', 'career', 'power', 'success', 'authority', 'promotion', 'leadership', '事业', '升迁', '权力', '威望', '事业顺利', '崇迪']
  }
};

function oldFilter(p, slug) {
  const v = OLD_VIRTUES[slug];
  const text = `${p.name} ${p.name_th || ''} ${p.category || ''} ${p.short || ''} ${p.description || ''} ${p.description_th || ''}`.toLowerCase();
  const catMatch = v.categories.some(c => p.category?.includes(c));
  const kwMatch = v.searchTerms.some(k => text.includes(k.toLowerCase()));
  return catMatch || kwMatch;
}

// Load new logic from virtues.ts
const code = fs.readFileSync(path.resolve(__dirname, '../lib/virtues.ts'), 'utf8');
const result = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
const moduleExports = {};
const fn = new Function('exports', 'require', result.outputText);
fn(moduleExports, require);
const { getProductVirtues, filterProductsByVirtue, VIRTUES } = moduleExports;

// Statistics
const statsBefore = {
  'wealth-and-fortune': 0,
  'miraculous-protection': 0,
  'metta-and-charisma': 0,
  'career-and-power': 0
};
const distBefore = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

const statsAfter = {
  'wealth-and-fortune': 0,
  'miraculous-protection': 0,
  'metta-and-charisma': 0,
  'career-and-power': 0
};
const distAfter = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

const comparisons = products.map(p => {
  const beforeSlugs = Object.keys(OLD_VIRTUES).filter(s => oldFilter(p, s));
  beforeSlugs.forEach(s => statsBefore[s]++);
  distBefore[beforeSlugs.length]++;

  const afterSlugs = getProductVirtues(p);
  afterSlugs.forEach(s => statsAfter[s]++);
  distAfter[afterSlugs.length]++;

  return {
    id: p.id,
    name_th: p.name_th,
    name: p.name,
    category: p.category,
    before: beforeSlugs,
    after: afterSlugs,
    diff: {
      added: afterSlugs.filter(s => !beforeSlugs.includes(s)),
      removed: beforeSlugs.filter(s => !afterSlugs.includes(s))
    }
  };
});

// Specific checks
const lpThuadBefore = comparisons.filter(c => (c.name_th||'').includes('ทวด') && c.before.includes('wealth-and-fortune'));
const lpThuadAfter = comparisons.filter(c => (c.name_th||'').includes('ทวด') && c.after.includes('wealth-and-fortune'));

const zeroBefore = comparisons.filter(c => c.before.length === 0);
const zeroAfter = comparisons.filter(c => c.after.length === 0);

const report = {
  totalProducts: products.length,
  statsBefore,
  statsAfter,
  distBefore,
  distAfter,
  lpThuadWealthBefore: lpThuadBefore.length,
  lpThuadWealthAfter: lpThuadAfter.length,
  zeroVirtuesBefore: zeroBefore.length,
  zeroVirtuesAfter: zeroAfter.length,
  zeroVirtuesResolved: zeroBefore.map(c => ({
    id: c.id,
    name_th: c.name_th,
    category: c.category,
    after: c.after
  })),
  lpThuadWealthCorrected: lpThuadBefore.filter(c => !c.after.includes('wealth-and-fortune')).map(c => ({
    id: c.id,
    name_th: c.name_th,
    category: c.category,
    before: c.before,
    after: c.after
  }))
};

fs.writeFileSync(path.resolve(__dirname, 'audit_report_full.json'), JSON.stringify(report, null, 2), 'utf8');

console.log('=== BEFORE VS AFTER AUDIT REPORT SUMMARY ===');
console.log('Total Products:', report.totalProducts);
console.log('\nVirtue Counts Before:');
console.log(statsBefore);
console.log('Virtue Counts After:');
console.log(statsAfter);
console.log('\nDistribution Before (0 to 4 virtues per product):', distBefore);
console.log('Distribution After (0 to 4 virtues per product):', distAfter);
console.log('\nLP Thuad in Wealth: Before =', lpThuadBefore.length, '| After =', lpThuadAfter.length);
console.log('Zero-Virtue Items: Before =', zeroBefore.length, '| After =', zeroAfter.length);
