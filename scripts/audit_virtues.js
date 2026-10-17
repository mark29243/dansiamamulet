const fs = require('fs');
const path = require('path');

const productsPath = path.resolve(__dirname, '../../products_published_452.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

console.log(`Loaded ${products.length} published products.\n`);

// Current virtues definitions from lib/virtues.ts
const VIRTUES = {
  'wealth-and-fortune': {
    name: 'พระเสริมโชคลาภ การเงิน ค้าขาย',
    categories: ['พระปิดตา', 'พระสังกัจจายน์', 'หลวงพ่อเงิน', 'เหรียญ', 'เครื่องราง'],
    searchTerms: ['โชคลาภ', 'ค้าขาย', 'ร่ำรวย', 'มหาลาภ', 'เงินทอง', 'ปลดหนี้', 'มั่งคั่ง', 'เงิน', 'ทอง', 'เศรษฐี', 'wealth', 'fortune', 'rich', 'prosperity', 'luck', 'financial', '招财', '偏财', '守财', '财运', '生意']
  },
  'miraculous-protection': {
    name: 'พระเครื่องแคล้วคลาด ปลอดภัย กันภัย',
    categories: ['หลวงพ่อทวด', 'พระรอด', 'พระกริ่ง', 'เครื่องราง'],
    searchTerms: ['แคล้วคลาด', 'ปลอดภัย', 'คงกระพัน', 'กันภัย', 'นิรันตราย', 'มหาอุด', 'คุ้มครอง', 'คุ้มภัย', 'protection', 'safety', 'survive', 'shield', 'miracle', 'car safety', '避险', '保平安', '挡灾', '辟邪', '龙普托']
  },
  'metta-and-charisma': {
    name: 'พระเมตตามหานิยม มหาเสน่ห์ เจรจา',
    categories: ['พระขุนแผน', 'พระนางพญา', 'พระผง'],
    searchTerms: ['เมตตา', 'มหานิยม', 'มหาเสน่ห์', 'เสน่ห์', 'เจรจา', 'เอ็นดู', 'ผู้ใหญ่', 'อุปถัมภ์', 'ความรัก', 'metta', 'charisma', 'charm', 'attraction', 'kindness', 'love', '人缘', '贵人', '魅力', '桃花', '助人缘', '坤平']
  },
  'career-and-power': {
    name: 'พระเสริมอำนาจบารมี การงาน เลื่อนตำแหน่ง',
    categories: ['พระสมเด็จ', 'พระนาคปรก', 'พระพิฆเนศ', 'หลวงปู่โต พรหมรังสี', 'หลวงพ่อคูณ'],
    searchTerms: ['บารมี', 'อำนาจ', 'เลื่อนขั้น', 'เลื่อนตำแหน่ง', 'การงาน', 'ชนะ', 'อุปสรรค', 'ความสำเร็จ', 'ก้าวหน้า', 'สมเด็จ', 'ราชา', 'career', 'power', 'success', 'authority', 'promotion', 'leadership', '事业', '升迁', '权力', '威望', '事业顺利', '崇迪']
  }
};

function testProduct(p, virtueSlug) {
  const v = VIRTUES[virtueSlug];
  const text = `${p.name} ${p.name_th || ''} ${p.category || ''} ${p.short || ''} ${p.description || ''} ${p.description_th || ''}`.toLowerCase();
  const matchedCats = v.categories.filter(c => p.category?.includes(c));
  const matchedTerms = v.searchTerms.filter(k => text.includes(k.toLowerCase()));
  return {
    matched: matchedCats.length > 0 || matchedTerms.length > 0,
    matchedCats,
    matchedTerms
  };
}

// 1. Audit overall statistics
const summary = {};
for (const slug of Object.keys(VIRTUES)) {
  summary[slug] = { count: 0, matchedCats: {}, matchedTerms: {} };
}

const productResults = products.map(p => {
  const matches = {};
  let totalMatches = 0;
  for (const slug of Object.keys(VIRTUES)) {
    const res = testProduct(p, slug);
    if (res.matched) {
      totalMatches++;
      matches[slug] = res;
      summary[slug].count++;
      res.matchedCats.forEach(c => { summary[slug].matchedCats[c] = (summary[slug].matchedCats[c] || 0) + 1; });
      res.matchedTerms.forEach(t => { summary[slug].matchedTerms[t] = (summary[slug].matchedTerms[t] || 0) + 1; });
    }
  }
  return {
    id: p.id,
    name: p.name,
    name_th: p.name_th,
    category: p.category,
    totalMatches,
    matches
  };
});

console.log('=== 1. CURRENT SYSTEM STATISTICS ===');
for (const [slug, data] of Object.entries(summary)) {
  console.log(`[${slug}] ${VIRTUES[slug].name}: ${data.count} items (${((data.count / products.length) * 100).toFixed(1)}%)`);
  console.log('   Top Category triggers:', Object.entries(data.matchedCats).sort((a,b)=>b[1]-a[1]).slice(0, 5).map(e=>`${e[0]}: ${e[1]}`).join(', '));
  console.log('   Top Term triggers:', Object.entries(data.matchedTerms).sort((a,b)=>b[1]-a[1]).slice(0, 8).map(e=>`"${e[0]}": ${e[1]}`).join(', '));
}

const matchDist = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
productResults.forEach(r => { matchDist[r.totalMatches]++; });
console.log('\n=== Distribution of Virtues Count Per Product ===');
console.log(matchDist);

// 2. Identify False Positives in Wealth
console.log('\n=== 2. SEVERE FALSE POSITIVES IN WEALTH & FORTUNE ===');
const wealthFP = productResults.filter(r => {
  if (!r.matches['wealth-and-fortune']) return false;
  // Items that are traditionally pure protection / non-wealth
  const n = (r.name_th || '') + ' ' + (r.category || '');
  const isThuad = n.includes('ทวด');
  const isRod = n.includes('พระรอด');
  const isTakrut = n.includes('ตะกรุด') && !n.includes('โชคลาภ') && !n.includes('ค้าขาย') && !n.includes('รวย');
  const isBiaGae = n.includes('เบี้ยแก้');
  const isMitMor = n.includes('มีดหมอ');
  const isTiger = (n.includes('เสือ') || n.includes('พยัคฆ์')) && !n.includes('มหาลาภ');
  return isThuad || isRod || isTakrut || isBiaGae || isMitMor || isTiger;
});
console.log(`Found ${wealthFP.length} clear protection/talisman amulets wrongly matched to Wealth & Fortune:`);
wealthFP.slice(0, 15).forEach(r => {
  const m = r.matches['wealth-and-fortune'];
  console.log(` - ID ${r.id}: ${r.name_th}`);
  console.log(`   Category: ${r.category}`);
  console.log(`   Why it matched: Cats=[${m.matchedCats.join(', ')}], Terms=[${m.matchedTerms.join(', ')}]`);
});

// 3. Identify False Positives in Metta due to generic 'พระผง'
console.log('\n=== 3. FALSE POSITIVES IN METTA DUE TO "พระผง" CATEGORY ===');
const mettaFP = productResults.filter(r => {
  if (!r.matches['metta-and-charisma']) return false;
  const m = r.matches['metta-and-charisma'];
  const n = (r.name_th || '') + ' ' + (r.name || '');
  // Matched ONLY because category includes 'พระผง', but amulet is clearly Somdej, Thuad, or Guru protection
  const onlyPhraPhong = m.matchedCats.length === 1 && m.matchedCats[0] === 'พระผง' && m.matchedTerms.length === 0;
  return onlyPhraPhong;
});
console.log(`Found ${mettaFP.length} amulets matched to Metta ONLY because of category 'พระผง':`);
mettaFP.slice(0, 8).forEach(r => {
  console.log(` - ID ${r.id}: ${r.name_th} (${r.category})`);
});

// 4. Identify False Negatives (0 virtues matched)
console.log('\n=== 4. FALSE NEGATIVES (0 VIRTUES MATCHED) ===');
const zeroVirtues = productResults.filter(r => r.totalMatches === 0);
console.log(`Found ${zeroVirtues.length} products with ZERO virtues:`);
zeroVirtues.forEach(r => {
  console.log(` - ID ${r.id}: ${r.name_th} (Category: ${r.category})`);
});
