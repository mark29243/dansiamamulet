const fs = require('fs');

const html = fs.readFileSync('public/fb.html', 'utf8');

// 1. Check card elements
const cards = (html.match(/<div class="card"/g) || []).length;
console.log('Total Cards in HTML:', cards);

// 2. Extract database JSON from script
const dbMatch = html.match(/const amuletsDb = (\{[\s\S]*?\n\s*\});/);
if (!dbMatch) {
  console.error('FAILED: amuletsDb not found in script!');
  process.exit(1);
}

const db = JSON.parse(dbMatch[1]);
const dbKeys = Object.keys(db);
console.log('Total Amulets in Database Object:', dbKeys.length);

let errors = 0;
dbKeys.forEach(id => {
  const item = db[id];
  // Check Chinese caption
  if (!item.captionZh || item.captionZh.length < 50) {
    console.error(`[${id}] Missing or short Chinese caption`);
    errors++;
  }
  // Check English caption
  if (!item.captionEn || item.captionEn.length < 50) {
    console.error(`[${id}] Missing or short English caption`);
    errors++;
  }
  // Check URL
  if (!item.url || !item.url.startsWith('https://dansiamamulets.com/product/')) {
    console.error(`[${id}] Invalid URL: ${item.url}`);
    errors++;
  }
  // Check Safe Mode: Main captions must NOT have http or https links
  if (item.captionZh.includes('http://') || item.captionZh.includes('https://')) {
    console.error(`[${id}] LEAKED URL in Chinese caption!`);
    errors++;
  }
  if (item.captionEn.includes('http://') || item.captionEn.includes('https://')) {
    console.error(`[${id}] LEAKED URL in English caption!`);
    errors++;
  }
  // Check Comments: Comments MUST contain the URL
  if (!item.commentZh.includes(item.url)) {
    console.error(`[${id}] Chinese comment missing URL!`);
    errors++;
  }
  if (!item.commentEn.includes(item.url)) {
    console.error(`[${id}] English comment missing URL!`);
    errors++;
  }
});

console.log('Total errors found:', errors);

if (cards === 18 && dbKeys.length === 18 && errors === 0) {
  console.log('✅ ALL_CHECKS_PASSED: 18 amulets are 100% verified for Dual Language (ZH & EN) & Safe Mode!');
} else {
  console.error('❌ VERIFICATION_FAILED!');
  process.exit(1);
}
