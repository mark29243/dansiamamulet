const fs = require('fs');
const path = require('path');

const fbPath = path.join(__dirname, '../public/fb.html');
let html = fs.readFileSync(fbPath, 'utf8');

// 1. Update CSS
const oldCssMarker = `    .stats-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 13px;
      font-weight: 600;
    }`;

const newCss = `    .stats-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      gap: 8px;
    }
    .stats-lang-badges {
      display: flex;
      gap: 6px;
      flex: 1;
    }
    .stat-lang-pill {
      flex: 1;
      background: #0f121a;
      border: 1px solid #262b3a;
      border-radius: 8px;
      padding: 6px 8px;
      font-size: 11px;
      color: #9ca3af;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.25s;
    }
    .stat-lang-pill.active {
      border-color: #f59e0b;
      background: rgba(245, 158, 11, 0.12);
      color: #fff;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.25);
    }
    .stat-num-unposted { color: #f59e0b; font-weight: 700; }
    .stat-num-posted { color: #10b981; font-weight: 700; }

    /* Card status badges */
    .card-status-badges {
      display: flex;
      gap: 6px;
      margin-top: 2px;
    }
    .lang-status-tag {
      flex: 1;
      padding: 7px 8px;
      border-radius: 8px;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid #2d3345;
      background: #0f121a;
      color: #9ca3af;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: all 0.2s;
      user-select: none;
    }
    .lang-status-tag:active { transform: scale(0.98); }
    .lang-status-tag.posted {
      background: rgba(16, 185, 129, 0.15);
      border-color: rgba(16, 185, 129, 0.4);
      color: #34d399;
      font-weight: 700;
    }
    .lang-status-tag.unposted {
      background: rgba(245, 158, 11, 0.08);
      border-color: rgba(245, 158, 11, 0.25);
      color: #fbbf24;
    }
    .card-lang-pill button.is-posted {
      border: 1px solid rgba(16, 185, 129, 0.6) !important;
      color: #34d399 !important;
    }
    .card-lang-pill button.is-posted::after {
      content: ' ✓';
      color: #34d399;
      font-weight: 900;
    }`;

if (html.includes(oldCssMarker)) {
  html = html.replace(oldCssMarker, newCss);
  console.log('✅ Updated CSS');
} else {
  console.warn('⚠️ oldCssMarker not found');
}

// 2. Update Sticky Bar Stats HTML
const oldStatsHtml = `    <div class="stats-row">
      <div>
        <span class="badge-unposted">รอโพสต์: <span id="count-unposted">0</span></span>
        <span class="badge-posted" style="margin-left: 6px;">โพสต์แล้ว: <span id="count-posted">0</span></span>
      </div>
      <button class="reset-btn" onclick="resetAllPosted()">รีเซ็ตทั้งหมด</button>
    </div>`;

const newStatsHtml = `    <div class="stats-row">
      <div class="stats-lang-badges">
        <div class="stat-lang-pill active" id="stat-pill-zh">
          <span>🇨🇳</span> <b>จีน:</b> 
          <span class="stat-num-unposted" id="stat-zh-unposted">0</span> รอ / 
          <span class="stat-num-posted" id="stat-zh-posted">0</span> ลงแล้ว
        </div>
        <div class="stat-lang-pill" id="stat-pill-en">
          <span>🇬🇧</span> <b>EN:</b> 
          <span class="stat-num-unposted" id="stat-en-unposted">0</span> รอ / 
          <span class="stat-num-posted" id="stat-en-posted">0</span> ลงแล้ว
        </div>
      </div>
      <button class="reset-btn" onclick="resetPostedPrompt()">รีเซ็ต</button>
    </div>`;

if (html.includes(oldStatsHtml)) {
  html = html.replace(oldStatsHtml, newStatsHtml);
  console.log('✅ Updated Stats Bar HTML');
} else {
  console.warn('⚠️ oldStatsHtml not found');
}

// 3. Update Tip Box text
const oldTipBox = `  <div class="tip-box">
    🛡️ <b>สูตรโพสต์แบบปลอดภัย 100% (รองรับทั้งกลุ่มจีนและกลุ่มฝรั่งสากล):</b><br>
    <b>ขั้นตอนที่ 1:</b> แตะค้างบันทึกรูปภาพ 3 รูป ➡️ เลือกภาษา (🇨🇳 จีน หรือ 🇬🇧 อังกฤษ) ➡️ กดปุ่มสีทอง <b>"📋 1. คัดลอกแคปชั่นหลัก"</b> แล้วโพสต์ลงกลุ่มได้เลย <i>(แคปชั่นนี้ไม่มีลิงก์เว็บ บอท Facebook และแอดมินจะไม่ลบโพสต์แน่นอน)</i><br>
    <b>ขั้นตอนที่ 2:</b> เมื่อโพสต์เสร็จ กดปุ่มสีฟ้า <b>"💬 2. คัดลอกลิงก์ไปแปะคอมเมนต์แรก"</b> ➡️ นำไปวางในช่องแสดงความคิดเห็นใต้โพสต์ตัวเอง <i>(ลูกค้ากดดูเว็บได้ปกติ แถมช่วยดันโพสต์ให้เด้งขึ้นหน้าแรกของกลุ่ม)</i><br>
    <b>ขั้นตอนที่ 3:</b> กดปุ่ม <b>"🚀 3. เปิดแอป Facebook"</b> ระบบจะค้นหากลุ่มภาษาที่เลือกให้อัตโนมัติ ➡️ กดปุ่มเขียว <b>"✅ โพสต์ Facebook แล้ว"</b> เพื่อซ่อนรายการครับ!
  </div>`;

const newTipBox = `  <div class="tip-box">
    🛡️ <b>สูตรโพสต์แบบปลอดภัย 100% (นับสถานะแยกภาษาจีน & อังกฤษ):</b><br>
    <b>ขั้นตอนที่ 1:</b> สลับภาษาที่ต้องการลง (🇨🇳 จีน หรือ 🇬🇧 อังกฤษ) ➡️ แตะค้างบันทึกรูป ➡️ กดปุ่มสีทอง <b>"📋 1. คัดลอกแคปชั่นหลัก"</b> แล้วโพสต์ลงกลุ่ม <i>(ไม่มีลิงก์ ปลอดภัย 100%)</i><br>
    <b>ขั้นตอนที่ 2:</b> โพสต์เสร็จ กดปุ่มสีฟ้า <b>"💬 2. คัดลอกลิงก์ไปแปะคอมเมนต์แรก"</b> ➡️ นำไปวางใต้โพสต์เพื่อดันโพสต์<br>
    <b>ขั้นตอนที่ 3:</b> กดปุ่ม <b>"🚀 3. เปิดแอป Facebook"</b> เข้ากลุ่มภาษานั้นๆ ➡️ กด <b>"✅ 4. โพสต์กลุ่ม...แล้ว"</b> ระบบจะนับสถิติแยกเฉพาะภาษานั้นทันทีครับ!
  </div>`;

if (html.includes(oldTipBox)) {
  html = html.replace(oldTipBox, newTipBox);
  console.log('✅ Updated Tip Box');
} else {
  console.warn('⚠️ oldTipBox not found');
}

// 4. Update Each Card: Add card-status-badges right after status-btn
// Pattern: <button class="done-btn" id="status-btn-ID" onclick="togglePosted('ID')">...
