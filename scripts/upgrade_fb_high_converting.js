const fs = require('fs');

let html = fs.readFileSync('public/fb.html', 'utf8');

// 1. Add CSS for copy-inbox-btn if not already present
if (!html.includes('.copy-inbox-btn {')) {
  const cssAnchor = '.copy-comment-btn:active { transform: scale(0.98); }';
  const newCss = `.copy-comment-btn:active { transform: scale(0.98); }

    .copy-inbox-btn {
      width: 100%;
      background: linear-gradient(135deg, #7c3aed, #6d28d9);
      color: #fff;
      font-weight: 700;
      font-size: 13.5px;
      border: 1px solid rgba(167, 139, 250, 0.4);
      padding: 12px;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 14px rgba(124, 58, 237, 0.3);
      transition: all 0.2s;
    }
    .copy-inbox-btn:active { transform: scale(0.98); }`;

  html = html.replace(cssAnchor, newCss);
  console.log('Added CSS for .copy-inbox-btn');
}

// 2. Update .tip-box with new high-converting strategy
const oldTipStart = '<div class="tip-box">';
const oldTipEnd = '</div>';
const tipStartIdx = html.indexOf(oldTipStart);
const tipEndIdx = html.indexOf(oldTipEnd, tipStartIdx);

if (tipStartIdx !== -1 && tipEndIdx !== -1) {
  const newTipBox = `<div class="tip-box">
    🔥 <b>สูตรใหม่: ป้องกัน Facebook ปิดกั้น & เปลี่ยนคนในกลุ่มให้กลายเป็นลูกค้าทัก Inbox ปิดการขาย!</b><br>
    <b>1. โพสต์แคปชั่นเรียกแขก:</b> เลือกภาษา (🇨🇳 จีน หรือ 🇬🇧 อังกฤษ) ➡️ กด <b>"📋 1. คัดลอกแคปชั่น"</b> แล้วโพสต์รูปพร้อมแคปชั่น แคปชั่นจะกระตุ้นให้คนคอมเมนต์ <b>"PM"</b> ใต้โพสต์ <i>(ช่วยดันโพสต์ขึ้นหน้าฟีดกลุ่มให้คนเห็นเยอะขึ้น 3–5 เท่า!)</i><br>
    <b>2. วางลิงก์คอมเมนต์แรก:</b> หลังโพสต์เสร็จสัก 2-3 นาที กดปุ่ม <b>"💬 2. คัดลอกลิงก์คอมเมนต์แรก"</b> นำไปวางใต้โพสต์ <i>(ระบุชัดเจนว่าเป็นไฟล์ 4K ไมโครสโคป ไม่โดนบีบอัด)</i><br>
    <b>3. เมื่อมีคนเม้นต์ PM หรือทักแชท:</b> กดปุ่ม <b>"✉️ 4. คัดลอกบทตอบ Inbox / DM"</b> นำไปส่งใน Messenger ทันที! ลิงก์ตรงรูปชัด 4K + ประวัติ 3 ภาษา พร้อมระบบชำระเงินปิดการขายได้ทันทีครับ!
  </div>`;
  html = html.slice(0, tipStartIdx) + newTipBox + html.slice(tipEndIdx + oldTipEnd.length);
  console.log('Updated .tip-box content');
}

// 3. Update amuletsDb object
const dbStartStr = 'const amuletsDb = ';
const dbStart = html.indexOf(dbStartStr);
const filterIdx = html.indexOf('let currentFilter =');
const dbEnd = html.lastIndexOf('};', filterIdx) + 1; // including the closing brace

if (dbStart === -1 || dbEnd === -1) {
  console.error('Cannot locate amuletsDb bounds!', { dbStart, dbEnd, filterIdx });
  process.exit(1);
}

const jsonStr = html.slice(dbStart + dbStartStr.length, dbEnd);
const amuletsDb = JSON.parse(jsonStr);

console.log('Parsed amuletsDb keys:', Object.keys(amuletsDb).length);

for (const [id, item] of Object.entries(amuletsDb)) {
  const url = item.url;

  // New High-Converting Chinese Ending
  const newZhEnding = `💬 诚意结缘或欲鉴赏4K显微多角度细节与防伪暗记？\n👉 请在下方评论回复【PM】或直接发私信，我将把高清品相图与寺庙出处档案私发给您！\n（👇 寺庙防伪暗记与未压缩微距档案链接亦已同步于第一条评论）`;

  // New High-Converting English Ending
  const newEnEnding = `💬 Interested or want uncompressed 4K microscope inspection photos & temple archive?\n👉 Drop a quick comment "PM" below or inbox me directly, and I'll send you the full high-res file!\n(👇 Full uncompressed 4K microscope & temple provenance link also pinned in 1st comment)`;

  // Clean old endings from captionZh
  let capZh = item.captionZh;
  const zhCutIndex = capZh.indexOf('💬 诚意结缘');
  if (zhCutIndex !== -1) {
    capZh = capZh.slice(0, zhCutIndex).trim();
  } else {
    const zhCutIndex2 = capZh.indexOf('💬 诚心供养');
    if (zhCutIndex2 !== -1) {
      capZh = capZh.slice(0, zhCutIndex2).trim();
    } else {
      const zhCutIndex3 = capZh.indexOf('💬 有意恭请');
      if (zhCutIndex3 !== -1) {
        capZh = capZh.slice(0, zhCutIndex3).trim();
      } else {
        const zhCutIndex4 = capZh.indexOf('💬');
        if (zhCutIndex4 !== -1) {
          capZh = capZh.slice(0, zhCutIndex4).trim();
        }
      }
    }
  }
  item.captionZh = capZh + '\n\n' + newZhEnding;

  // Clean old endings from captionEn
  let capEn = item.captionEn;
  const enCutIndex = capEn.indexOf('💬 DM / PM directly');
  if (enCutIndex !== -1) {
    capEn = capEn.slice(0, enCutIndex).trim();
  } else {
    const enCutIndex2 = capEn.indexOf('💬');
    if (enCutIndex2 !== -1) {
      capEn = capEn.slice(0, enCutIndex2).trim();
    }
  }
  item.captionEn = capEn + '\n\n' + newEnEnding;

  // New Comments with clear value proposition (4K uncompressed microscope)
  item.commentZh = `🔬【4K显微放大档案】受Facebook画质压缩限制，如需查看无损4K微距圣料纹理、手刻经文防伪暗记与官方寺庙证书档案：\n${url}`;
  item.commentEn = `🔬 [Uncompressed 4K Archive] Due to heavy Facebook image compression, view full uncompressed 4K microscope grain details, hand-carved markings & official documentation here:\n${url}`;

  // Ready-to-copy Messenger Inbox reply scripts
  item.inboxZh = `您好！感谢您的关注与结缘意向。\n此尊圣物为100%原庙保真藏品。因Facebook图片有严重压缩，您可以直接在此查阅未压缩的4K显微多角度细节、手刻经文暗记与官方档案：\n${url}\n\n📦 支持全球顺丰/国际挂号空运直邮（附追踪单号），官方网站支持信用卡、Apple Pay及支付宝安全结算。有任何疑问欢迎随时交流！🙏`;
  item.inboxEn = `Hi! Thank you for your interest.\nThis piece is 100% guaranteed authentic with direct temple provenance. Due to heavy Facebook photo compression, you can inspect the full uncompressed 4K microscope grain details, sacred markings, and archival certification here:\n${url}\n\n📦 Worldwide tracked priority airmail included. Official website supports secure checkout via Visa, Mastercard, Apple Pay & Alipay. Please let me know if you have any questions! 🙏`;
}

const updatedJsonStr = JSON.stringify(amuletsDb, null, 2);
html = html.slice(0, dbStart + dbStartStr.length) + updatedJsonStr + html.slice(dbEnd);
console.log('Updated amuletsDb in HTML string');

// 4. Update each card's HTML elements (preview boxes and add 4th copy-inbox-btn)
for (const [id, item] of Object.entries(amuletsDb)) {
  // Update caption preview box
  const capPreviewRegex = new RegExp(`(<div class="caption-preview" id="caption-preview-${id}">)[\\s\\S]*?(<\\/div>)`);
  html = html.replace(capPreviewRegex, `$1${item.captionZh.replace(/</g, '&lt;').replace(/>/g, '&gt;')}$2`);

  // Update comment preview box
  const comTextRegex = new RegExp(`(<span id="comment-text-${id}">)[\\s\\S]*?(<\\/span>)`);
  const commentHtml = `🔬【4K显微放大档案】受Facebook画质压缩限制，如需查看无损4K微距圣料纹理、手刻经文防伪暗记与官方寺庙证书档案：<br>${item.url}`;
  html = html.replace(comTextRegex, `$1${commentHtml}$2`);

  // Add copy-inbox-btn if not exists in this card
  if (!html.includes(`id="copy-inbox-btn-${id}"`)) {
    const targetAnchor = `<a href="https://www.facebook.com" class="open-fb-btn" id="open-fb-btn-${id}"`;
    const inboxBtnHtml = `<button class="copy-inbox-btn" id="copy-inbox-btn-${id}" onclick="copyInboxReply('${id}')">
          ✉️ 4. คัดลอกบทตอบ Inbox / DM (中文)
        </button>\n\n        ${targetAnchor}`;
    html = html.replace(targetAnchor, inboxBtnHtml);
  }
}
console.log('Updated HTML card previews & injected copy-inbox-btn into cards');

// 5. Inject copyInboxReply() function and update setCardLang & setGlobalLang
if (!html.includes('function copyInboxReply(')) {
  const fnAnchor = 'function copyComment(id) {';
  const inboxFn = `function copyInboxReply(id) {
      const lang = cardLangState[id] || globalLang;
      const data = amuletsDb[id];
      if (!data) return;

      let text = lang === 'zh' ? data.inboxZh : data.inboxEn;
      if (text) {
        text = text.replace(/\\\\n/g, '\\n');
      }
      const msg = lang === 'zh'
        ? '✉️ คัดลอกบทตอบแชท Inbox (中文) แล้ว! นำไปส่งใน Messenger ได้ทันที'
        : '✉️ Copied Messenger Inbox Reply (English)! Ready to send in DM';
      copyToClipboard(text, msg);
    }

    ${fnAnchor}`;
  html = html.replace(fnAnchor, inboxFn);
  console.log('Injected copyInboxReply function');
}

// Update setCardLang to update copyInboxBtn
if (!html.includes("copyInboxBtn.innerText = lang === 'zh'")) {
  const setCardAnchor = `const openFbBtn = document.getElementById('open-fb-btn-' + id);`;
  const setCardCode = `const copyInboxBtn = document.getElementById('copy-inbox-btn-' + id);
      if (copyInboxBtn) {
        copyInboxBtn.innerText = lang === 'zh'
          ? '✉️ 4. คัดลอกบทตอบ Inbox / DM (中文)'
          : '✉️ 4. Copy Inbox / DM Reply (English)';
      }

      ${setCardAnchor}`;
  html = html.replace(setCardAnchor, setCardCode);
  console.log('Updated setCardLang to update copyInboxBtn');
}

// Update comment-text in setCardLang to use new format
const oldComSetAnchor = `comText.innerHTML = lang === 'zh'
          ? '👉 查阅高清显微多角度细节与官方历史档案：<br>' + data.url
          : '👉 View official museum archive & microscopic HD multi-angle photography:<br>' + data.url;`;
const newComSetCode = `comText.innerHTML = lang === 'zh'
          ? '🔬【4K显微放大档案】受Facebook画质压缩限制，如需查看无损4K微距圣料纹理、手刻经文防伪暗记与官方寺庙证书档案：<br>' + data.url
          : '🔬 [Uncompressed 4K Archive] Due to heavy Facebook image compression, view full uncompressed 4K microscope grain details, hand-carved markings & official documentation here:<br>' + data.url;`;
html = html.replace(oldComSetAnchor, newComSetCode);

// Write updated html
fs.writeFileSync('public/fb.html', html, 'utf8');
console.log('Successfully written updated public/fb.html!');
