const fs = require('fs');
const path = require('path');

const fbPath = path.join(__dirname, '..', 'public', 'fb.html');
let html = fs.readFileSync(fbPath, 'utf8');

const cardsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'talisman_20_cards_data.json'), 'utf8'));
const batchMeta = JSON.parse(fs.readFileSync(path.join(__dirname, 'batch4_talismans_meta.json'), 'utf8'));

// Map slug by shortId
const metaMap = {};
batchMeta.forEach(m => { metaMap[m.shortId] = m; });

// 1. Update tab count: 'ทั้งหมด (18)' -> 'ทั้งหมด (38)'
html = html.replace('ทั้งหมด (18)', 'ทั้งหมด (38)');

// 2. Generate new cards HTML
let newCardsHtml = '';
for (const card of cardsData) {
  const meta = metaMap[card.shortId];
  const slug = meta ? meta.slug : '';
  const imgLabels = card.imgLabels || ['ด้านหน้า (Front)', 'ด้านหลัง (Back)', 'ซูมรายละเอียด (Detail)'];

  newCardsHtml += `
    <div class="card" data-id="${card.shortId}">
      <div class="card-header-row">
        <div class="card-title">${card.titleTh}</div>
        <div class="card-lang-pill">
          <button id="pill-zh-${card.shortId}" class="active" onclick="setCardLang('${card.shortId}', 'zh')">🇨🇳 中文</button>
          <button id="pill-en-${card.shortId}" onclick="setCardLang('${card.shortId}', 'en')">🇬🇧 EN</button>
        </div>
      </div>
      <div class="card-sub">${card.subThZhEn}</div>
      
      <div class="images-grid">
        <div class="img-wrap">
          <span class="img-label">${imgLabels[0]}</span>
          <img src="/amulets/talisman_${card.shortId}_1.jpg" alt="${card.shortId} 1" loading="lazy">
        </div>
        <div class="img-wrap">
          <span class="img-label">${imgLabels[1]}</span>
          <img src="/amulets/talisman_${card.shortId}_2.jpg" alt="${card.shortId} 2" loading="lazy">
        </div>
        <div class="img-wrap">
          <span class="img-label">${imgLabels[2]}</span>
          <img src="/amulets/talisman_${card.shortId}_3.jpg" alt="${card.shortId} 3" loading="lazy">
        </div>
      </div>

      <!-- Caption Preview Box -->
      <div class="caption-preview" id="caption-preview-${card.shortId}">${card.captionZh}</div>

      <!-- Comment Preview Box -->
      <div class="comment-preview-box" id="comment-preview-${card.shortId}">
        💬 <b>ข้อความสำหรับแปะคอมเมนต์แรก (Comment 1):</b><br>
        <span id="comment-text-${card.shortId}">👉 查阅高清显微多角度细节与官方历史档案：<br>https://dansiamamulets.com/product/${slug}</span>
      </div>

      <div class="btn-group">
        <button class="copy-btn" id="copy-btn-${card.shortId}" onclick="copyCaption('${card.shortId}')">
          📋 1. คัดลอกแคปชั่นภาษาจีน (ไม่มีลิงก์ ไม่โดนลบ)
        </button>
        
        <button class="copy-comment-btn" id="copy-comment-btn-${card.shortId}" onclick="copyComment('${card.shortId}')">
          💬 2. คัดลอกลิงก์ไปแปะคอมเมนต์แรก (中文)
        </button>

        <a href="https://www.facebook.com" class="open-fb-btn" id="open-fb-btn-${card.shortId}" onclick="openFacebookGroup('${card.shortId}'); return false;">
          🚀 3. เปิดแอป Facebook เพื่อโพสต์
        </a>

        <button class="done-btn" id="status-btn-${card.shortId}" onclick="togglePosted('${card.shortId}')">
          ✅ โพสต์ Facebook แล้ว (ซ่อนรายการนี้)
        </button>
        
        <div class="card-status-badges" id="status-badges-${card.shortId}">
          <button class="lang-status-tag unposted" id="tag-zh-${card.shortId}" onclick="togglePostedLang('${card.shortId}', 'zh')">
            🇨🇳 จีน: รอลง
          </button>
          <button class="lang-status-tag unposted" id="tag-en-${card.shortId}" onclick="togglePostedLang('${card.shortId}', 'en')">
            🇬🇧 อังกฤษ: รอลง
          </button>
        </div>
      </div>
    </div>
`;
}

// 3. Inject new cards before closing </div> of #cards-container
// Looking for:
//         </div>
//       </div>
//     </div>
//
//   </div>
const cardsContainerCloseRegex = /(<div class="card" data-id="biagae">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*)(<\/div>\s*<div class="empty-state")/m;

if (!cardsContainerCloseRegex.test(html)) {
  console.error('Could not find injection point for cards-container close tag!');
  process.exit(1);
}

html = html.replace(cardsContainerCloseRegex, `$1${newCardsHtml}\n  $2`);

// 4. Generate amuletsDb entries
let dbEntries = '';
for (const card of cardsData) {
  const meta = metaMap[card.shortId];
  const slug = meta ? meta.slug : '';
  const url = `https://dansiamamulets.com/product/${slug}`;

  dbEntries += `,\n  "${card.shortId}": {\n` +
    `    "url": "${url}",\n` +
    `    "captionZh": ${JSON.stringify(card.captionZh)},\n` +
    `    "captionEn": ${JSON.stringify(card.captionEn)},\n` +
    `    "commentZh": "👉 查阅高清显微多角度细节与官方历史档案：\\\\n${url}",\n` +
    `    "commentEn": "👉 View official museum archive & microscopic HD multi-angle photography：\\\\n${url}"\n` +
    `  }`;
}

// Look for closing of amuletsDb:
//   "biagae": {
// ...
//   }
// };
const dbCloseRegex = /("biagae":\s*\{[\s\S]*?\}\s*)(\};)/m;

if (!dbCloseRegex.test(html)) {
  console.error('Could not find injection point for amuletsDb close tag!');
  process.exit(1);
}

html = html.replace(dbCloseRegex, `$1${dbEntries}\n$2`);

fs.writeFileSync(fbPath, html, 'utf8');
console.log('Successfully injected 20 talisman cards into public/fb.html!');
