const fs = require('fs');

let html = fs.readFileSync('public/fb.html', 'utf8');

// 1. Add CSS for copy-comment-btn and comment-preview
const oldBtnCss = `.open-fb-btn {`;
const newBtnCss = `.copy-comment-btn {
      width: 100%;
      background: linear-gradient(135deg, #0284c7, #0369a1);
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      border: 1px solid rgba(56, 189, 248, 0.4);
      padding: 12px;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.3);
      transition: all 0.2s;
    }
    .copy-comment-btn:active { transform: scale(0.98); }

    .comment-preview-box {
      background: rgba(2, 132, 199, 0.08);
      border: 1px dashed rgba(56, 189, 248, 0.4);
      border-radius: 10px;
      padding: 10px 12px;
      font-size: 11.5px;
      line-height: 1.5;
      color: #7dd3fc;
      margin-top: 8px;
      word-break: break-all;
    }
    .comment-preview-box b {
      color: #38bdf8;
    }

    .open-fb-btn {`;

html = html.replace(oldBtnCss, newBtnCss);

// 2. Update tip-box
const oldTipBox = `<div class="tip-box">
    💡 <b>วิธีใช้งาน:</b> แตะค้างที่รูปภาพเพื่อบันทึกรูปเข้า iPhone -> กดคัดลอกแคปชั่น -> กดเปิด Facebook โพสต์ในกลุ่ม -> <b>กดปุ่ม "✅ โพสต์ Facebook แล้ว" รายการนี้จะซ่อนทันที</b> จะเหลือเฉพาะองค์ที่คุณยังไม่ได้ลงครับ!
  </div>`;

const newTipBox = `<div class="tip-box" style="background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.3); color: #a7f3d0;">
    🛡️ <b>สูตรโพสต์แบบปลอดภัย 100% (ไม่โดนแอดมินหรือบอท Facebook ลบโพสต์):</b><br>
    <b>ขั้นตอนที่ 1:</b> บันทึกรูป 3 รูป ➡️ กดปุ่มสีทอง <b>"📋 1. คัดลอกแคปชั่นหลัก"</b> แล้วโพสต์ลงกลุ่มได้เลย <i>(แคปชั่นนี้ไม่มีลิงก์เว็บ บอท Facebook และแอดมินจะไม่ลบโพสต์แน่นอน)</i><br>
    <b>ขั้นตอนที่ 2:</b> เมื่อโพสต์เสร็จ กดปุ่มสีฟ้า <b>"💬 2. คัดลอกลิงก์ไปแปะคอมเมนต์แรก"</b> ➡️ นำไปวางในช่องแสดงความคิดเห็นใต้โพสต์ตัวเอง <i>(ลูกค้ากดดูเว็บได้ปกติ แถมช่วยดันโพสต์ให้เด้งขึ้นหน้าแรกของกลุ่ม)</i><br>
    <b>ขั้นตอนที่ 3:</b> กดปุ่มเขียว <b>"✅ โพสต์ Facebook แล้ว"</b> เพื่อซ่อนรายการครับ!
  </div>`;

html = html.replace(oldTipBox, newTipBox);

// 3. Process all 18 cards
const cardRegex = /<div class="card" data-id="([^"]+)">([\s\S]*?)<\/div>\s*<\/div>/g;

// Let's inspect the cards and rewrite the button group and caption preview
// Instead of regex on the whole card, let's write a targeted replacer for each card
const urlsMap = {
  sarika: "https://dansiamamulets.com/product/sarika-mobile-pair-carved-wood-luang-pho-ken-wat-tham-khao-ito-prachin-buri",
  namtao: "https://dansiamamulets.com/product/namtao-dood-sup-maha-lap-luang-pu-tim-wat-phra-khao-2552",
  khunphaen: "https://dansiamamulets.com/product/phra-khun-phaen-lang-kuman-sombat-luang-pho-pool-wat-phai-lom-2548",
  takrut: "https://dansiamamulets.com/product/takrut-sarika-khu-baramee-silver-luang-pu-kambu-wat-kut-chomphu-2553",
  lpthuat: "https://dansiamamulets.com/product/luang-pu-tuad-luang-ta-phan-wat-mai-amataros-2502-bang-khun-phrom",
  tiger: "https://dansiamamulets.com/product/phra-somdej-lang-suea-phoen-luang-pho-thong-yu-wat-mai-nong-pha-ong-2519",
  paladkhik: "https://dansiamamulets.com/product/plad-khik-dead-wood-takrud-luang-pu-mek-wat-lam-kradan",
  wuathanu: "https://dansiamamulets.com/product/wua-thanu-krang-phutsa-luang-pho-phut-wat-klang-bang-phra-2538",
  guman: "https://dansiamamulets.com/product/guman-thong-din-chet-pacha-luang-pho-pin-wat-ubon-2500",
  somdej_nak: "https://dansiamamulets.com/product/phra-somdej-thaan-kha-to-luang-pu-nak-wat-rakang-2495",
  somdej_pae: "https://dansiamamulets.com/product/phra-somdej-phra-prathan-wat-muang-luang-pho-pae-wat-pikul-thong-2514",
  pidta: "https://dansiamamulets.com/product/phra-pidta-wan-jindamanee-takrut-luang-pho-thong-yu-wat-tha-sao-2520",
  koon: "https://dansiamamulets.com/product/phra-nang-phaya-koon-lap-luang-pho-koon-wat-ban-rai-2517",
  turtle: "https://dansiamamulets.com/product/turtle-amulet-luang-pu-liu-84th-birthday-be2535",
  rahu: "https://dansiamamulets.com/product/rahu-kala-gaew-luang-pho-pin-wat-srisathorn",
  tigertakrut: "https://dansiamamulets.com/product/tiger-skin-takrut-luang-pho-thiang-khao-kradong-2539",
  garuda: "https://dansiamamulets.com/product/garuda-amulet-kathina-2564-luang-pho-vrah",
  biagae: "https://dansiamamulets.com/product/bia-kaae-pluay-luang-pu-kong-wat-klang-bang-kaew-2568-medium"
};

for (const [id, url] of Object.entries(urlsMap)) {
  // Update button group for this id
  const oldBtnPattern = new RegExp(
    `<button class="copy-btn" onclick="copyText\\('${id}'\\)">[\\s\\S]*?<\\/button>\\s*<a href="https:\\/\\/www\\.facebook\\.com" class="open-fb-btn"[\\s\\S]*?<\\/a>\\s*<button class="done-btn" onclick="markAsPosted\\('${id}'\\)">[\\s\\S]*?<\\/button>`,
    'g'
  );

  const newBtns = `<button class="copy-btn" onclick="copyText('${id}')">📋 1. คัดลอกแคปชั่นหลัก (ไม่มีลิงก์ ไม่โดนลบ)</button>
      <button class="copy-comment-btn" onclick="copyComment('${id}')">💬 2. คัดลอกลิงก์ไปแปะคอมเมนต์แรก</button>
      <a href="https://www.facebook.com" class="open-fb-btn" onclick="window.location.href='https://www.facebook.com/groups/search/groups/?q=佛牌买卖谢绝假牌'; return false;">🚀 3. เปิดแอป Facebook เพื่อโพสต์</a>
      <button class="done-btn" onclick="markAsPosted('${id}')">✅ โพสต์ Facebook แล้ว (ซ่อนรายการนี้)</button>`;

  html = html.replace(oldBtnPattern, newBtns);

  // In caption-preview, remove the url line and replace with safe ending
  const captionRegex = new RegExp(`<div class="caption-preview" id="caption-${id}">([\\s\\S]*?)<\\/div>`);
  const match = html.match(captionRegex);
  if (match) {
    let captionText = match[1];
    // Remove "👉 查阅..." and the url
    captionText = captionText.replace(/👉\s*查阅[^\n]*\nhttps?:\/\/[^\n]+/g, '');
    captionText = captionText.replace(/https?:\/\/dansiamamulets\.com\/product\/[^\s\n]+/g, '');
    
    // Ensure standard ending
    captionText = captionText.replace(/💬\s*有意结缘恭请欢迎私信（PM）/g, '💬 诚意结缘恭请欢迎私信（PM / Inbox）\n👇 高清显微多角度细节与官方历史档案链接见第一条评论（Comment）');
    captionText = captionText.replace(/💬\s*有意迎请福禄请私信（PM）/g, '💬 诚意结缘恭请欢迎私信（PM / Inbox）\n👇 高清显微多角度细节与官方历史档案链接见第一条评论（Comment）');
    captionText = captionText.replace(/💬\s*诚意结缘恭请欢迎私信（PM）/g, '💬 诚意结缘恭请欢迎私信（PM / Inbox）\n👇 高清显微多角度细节与官方历史档案链接见第一条评论（Comment）');
    captionText = captionText.replace(/💬\s*诚意结缘欢迎私信（PM）/g, '💬 诚意结缘恭请欢迎私信（PM / Inbox）\n👇 高清显微多角度细节与官方历史档案链接见第一条评论（Comment）');

    // Clean up excessive blank lines
    captionText = captionText.replace(/\n{3,}/g, '\n\n').trim();

    const newCaptionBlock = `<div class="caption-preview" id="caption-${id}">${captionText}</div>
    <div class="comment-preview-box" id="comment-${id}">💬 <b>ข้อความสำหรับแปะคอมเมนต์แรก (Comment 1):</b><br>👉 查阅高清显微多角度细节与官方历史档案：<br>${url}</div>`;

    html = html.replace(match[0], newCaptionBlock);
  }
}

// 4. Update JavaScript to add copyComment function and support comments
const oldScript = `    function copyText(id) {`;
const newScript = `    const productLinks = ${JSON.stringify(urlsMap, null, 2)};

    function copyComment(id) {
      const url = productLinks[id];
      if (!url) return;
      const commentText = \`👉 查阅高清显微多角度细节与官方历史档案：\\n\${url}\`;
      copyToClipboard(commentText, '💬 คัดลอกข้อความสำหรับแปะคอมเมนต์แรกแล้ว!');
    }

    function copyToClipboard(text, successMsg) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => showToast(successMsg));
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(successMsg);
      }
    }

    function copyText(id) {
      const el = document.getElementById('caption-' + id);
      if (!el) return;
      copyToClipboard(el.innerText, '📋 คัดลอกแคปชั่นหลัก (แบบไม่มีลิงก์) สำเร็จแล้ว!');
    }`;

// Replace copyText with new implementation
const copyTextFuncRegex = /function copyText\(id\) \{[\s\S]*?function showToast\(msg\)/;
html = html.replace(copyTextFuncRegex, newScript + '\n\n    function showToast(msg)');

fs.writeFileSync('public/fb.html', html, 'utf8');
console.log('Successfully updated public/fb.html to Safe Mode with 2-step Comment Link system!');
