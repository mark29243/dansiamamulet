const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('public/fb.html', 'utf8');

// 1. Verify CSS
if (!html.includes('.copy-inbox-btn')) throw new Error('Missing .copy-inbox-btn CSS');

// 2. Verify tip-box
if (!html.includes('🔥 <b>สูตรใหม่: ป้องกัน Facebook ปิดกั้น')) throw new Error('Missing updated tip-box');

// 3. Verify amuletsDb
const start = html.indexOf('const amuletsDb =');
const filterIdx = html.indexOf('let currentFilter =');
const end = html.lastIndexOf('};', filterIdx) + 1;
const code = html.slice(start, end).replace('const amuletsDb =', 'var amuletsDb =');

const sandbox = {};
vm.runInNewContext(code, sandbox);

const db = sandbox.amuletsDb;
const keys = Object.keys(db);
console.log('Total verified items:', keys.length);

if (keys.length !== 38) {
  throw new Error(`Expected 38 items, got ${keys.length}`);
}

keys.forEach((k, idx) => {
  const item = db[k];
  if (!item.url) throw new Error(`[${k}] missing url`);
  if (!item.captionZh.includes('【PM】')) throw new Error(`[${k}] captionZh missing PM CTA`);
  if (!item.captionEn.includes('"PM"')) throw new Error(`[${k}] captionEn missing PM CTA`);
  if (!item.commentZh.includes('🔬【4K显微放大档案】')) throw new Error(`[${k}] commentZh missing 4K micro text`);
  if (!item.commentEn.includes('🔬 [Uncompressed 4K Archive]')) throw new Error(`[${k}] commentEn missing 4K micro text`);
  if (!item.inboxZh.includes(item.url)) throw new Error(`[${k}] inboxZh missing url`);
  if (!item.inboxEn.includes(item.url)) throw new Error(`[${k}] inboxEn missing url`);

  // Verify HTML has copy-inbox-btn
  if (!html.includes(`id="copy-inbox-btn-${k}"`)) {
    throw new Error(`[${k}] missing HTML button copy-inbox-btn-${k}`);
  }
});

console.log('All 38 items verified 100% successfully!');
console.log('\nSample Sarika Inbox Reply ZH:\n' + db.sarika.inboxZh);
console.log('\nSample Sarika Inbox Reply EN:\n' + db.sarika.inboxEn);
console.log('\nSample Sarika Comment ZH:\n' + db.sarika.commentZh);
