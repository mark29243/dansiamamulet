const fs = require('fs');
const path = require('path');

const fbPath = path.join(__dirname, '..', 'public', 'fb.html');
let html = fs.readFileSync(fbPath, 'utf8');

console.log('Original occurrences of \\\\n in fb.html:');
const matches = html.match(/\\\\nhttps:/g) || [];
console.log('Found:', matches.length);

// Replace \\nhttps: with \nhttps:
// In the source text of fb.html, `\\n` is two backslashes followed by n.
// We want it to be `\n` (one backslash followed by n) inside the JS string literals in amuletsDb!
html = html.replace(/\\\\nhttps:/g, '\\nhttps:');

// Also update copyComment function to ensure any literal \n is replaced with real newline just in case
const oldCopyComment = `function copyComment(id) {
      const lang = cardLangState[id] || globalLang;
      const data = amuletsDb[id];
      if (!data) return;

      const text = lang === 'zh' ? data.commentZh : data.commentEn;
      const msg = lang === 'zh'
        ? '💬 คัดลอกข้อความแปะคอมเมนต์แรก (中文) แล้ว!'
        : '💬 Copied 1st comment link text (English)!';
      copyToClipboard(text, msg);
    }`;

const newCopyComment = `function copyComment(id) {
      const lang = cardLangState[id] || globalLang;
      const data = amuletsDb[id];
      if (!data) return;

      let text = lang === 'zh' ? data.commentZh : data.commentEn;
      if (text) {
        text = text.replace(/\\\\n/g, '\\n');
      } else {
        text = (lang === 'zh'
          ? '👉 查阅高清显微多角度细节与官方历史档案：\\n'
          : '👉 View official museum archive & microscopic HD multi-angle photography:\\n') + data.url;
      }

      const msg = lang === 'zh'
        ? '💬 คัดลอกข้อความแปะคอมเมนต์แรก (中文) แล้ว!'
        : '💬 Copied 1st comment link text (English)!';
      copyToClipboard(text, msg);
    }`;

if (html.includes(oldCopyComment)) {
  html = html.replace(oldCopyComment, newCopyComment);
  console.log('✓ Successfully updated copyComment function with defensive newline replacement');
} else {
  console.log('Notice: copyComment pattern did not match exactly, searching flexible regex');
  const copyCommentRegex = /function copyComment\(id\)\s*\{[\s\S]*?copyToClipboard\(text,\s*msg\);\s*\}/;
  if (copyCommentRegex.test(html)) {
    html = html.replace(copyCommentRegex, newCopyComment);
    console.log('✓ Successfully updated copyComment function via regex');
  }
}

fs.writeFileSync(fbPath, html, 'utf8');

// Verify result
const newMatches = html.match(/\\\\nhttps:/g) || [];
console.log('Remaining occurrences of \\\\nhttps: ', newMatches.length);

// Test evaluate amuletsDb with Node vm
const vm = require('vm');
const dbMatch = html.match(/const amuletsDb\s*=\s*(\{[\s\S]*?\n\};)/);
const sandbox = {};
vm.runInNewContext('amuletsDb = ' + dbMatch[1], sandbox);
const testItem = sandbox.amuletsDb['chang_thaem'];
console.log('\n--- Sample test for chang_thaem ---');
console.log('commentZh:');
console.log(JSON.stringify(testItem.commentZh));
console.log('Actual printed text:');
console.log(testItem.commentZh);
