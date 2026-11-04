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
  console.log('✅ 1. CSS updated successfully');
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
  console.log('✅ 2. Sticky Bar Stats HTML updated successfully');
} else {
  console.warn('⚠️ oldStatsHtml not found');
}

// 3. Update Tip Box
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
    <b>ขั้นตอนที่ 3:</b> กดปุ่ม <b>"🚀 3. เปิดแอป Facebook"</b> เข้ากลุ่มภาษานั้นๆ ➡️ กด <b>"✅ 4. โพสต์แล้ว"</b> ระบบจะนับสถิติแยกเฉพาะภาษานั้นทันทีครับ!
  </div>`;

if (html.includes(oldTipBox)) {
  html = html.replace(oldTipBox, newTipBox);
  console.log('✅ 3. Tip Box updated successfully');
} else {
  console.warn('⚠️ oldTipBox not found');
}

// 4. Update Each of the 18 cards to add .card-status-badges right after status-btn
const buttonRegex = /(<button class="done-btn" id="status-btn-([a-z0-9_]+)" onclick="togglePosted\('[a-z0-9_]+'\)">[\s\S]*?<\/button>)/g;

let cardButtonsReplaced = 0;
html = html.replace(buttonRegex, (match, fullBtn, id) => {
  cardButtonsReplaced++;
  return `${fullBtn}
        
        <div class="card-status-badges" id="status-badges-${id}">
          <button class="lang-status-tag unposted" id="tag-zh-${id}" onclick="togglePostedLang('${id}', 'zh')">
            🇨🇳 จีน: รอลง
          </button>
          <button class="lang-status-tag unposted" id="tag-en-${id}" onclick="togglePostedLang('${id}', 'en')">
            🇬🇧 อังกฤษ: รอลง
          </button>
        </div>`;
});

console.log(`✅ 4. Injected dual-status tags into ${cardButtonsReplaced}/18 cards`);

// 5. Update Script Storage & Functions
// Find where STORAGE_KEY starts and replace down to the end of script
const scriptStartMarker = `    const STORAGE_KEY = 'dansiam_fb_posted_ids';
    const LANG_STORAGE_KEY = 'dansiam_fb_lang';`;

const newStorageHeader = `    const STORAGE_KEY_ZH = 'dansiam_fb_posted_zh_v1';
    const STORAGE_KEY_EN = 'dansiam_fb_posted_en_v1';
    const OLD_STORAGE_KEY = 'dansiam_fb_posted_ids';
    const LANG_STORAGE_KEY = 'dansiam_fb_lang';`;

if (html.includes(scriptStartMarker)) {
  html = html.replace(scriptStartMarker, newStorageHeader);
  console.log('✅ 5. Updated storage keys header');
} else {
  console.warn('⚠️ scriptStartMarker not found');
}

// Replace the logic functions from `let currentFilter = 'unposted';` to `// Initialize on page load`
const oldLogicStart = `    let currentFilter = 'unposted';
    let globalLang = localStorage.getItem(LANG_STORAGE_KEY) || 'zh';
    const cardLangState = {};`;

const oldLogicEnd = `    // Initialize on page load
    setGlobalLang(globalLang);
    updateUI();`;

const logicRegex = new RegExp(
  escapeRegex(oldLogicStart) + '[\\s\\S]*?' + escapeRegex(oldLogicEnd)
);

const newLogicCode = `    let currentFilter = 'unposted';
    let globalLang = localStorage.getItem(LANG_STORAGE_KEY) || 'zh';
    const cardLangState = {};

    function getPostedIds(lang) {
      const targetLang = lang || globalLang;
      const key = targetLang === 'zh' ? STORAGE_KEY_ZH : STORAGE_KEY_EN;
      try {
        const data = localStorage.getItem(key);
        if (data !== null) return JSON.parse(data);
        // Migration: If zh has no data yet, check old storage key
        if (targetLang === 'zh') {
          const oldData = localStorage.getItem(OLD_STORAGE_KEY);
          if (oldData) {
            const parsed = JSON.parse(oldData);
            localStorage.setItem(STORAGE_KEY_ZH, JSON.stringify(parsed));
            return parsed;
          }
        }
        return [];
      } catch (e) {
        return [];
      }
    }

    function savePostedIds(ids, lang) {
      const targetLang = lang || globalLang;
      const key = targetLang === 'zh' ? STORAGE_KEY_ZH : STORAGE_KEY_EN;
      localStorage.setItem(key, JSON.stringify(ids));
    }

    function setGlobalLang(lang) {
      globalLang = lang;
      localStorage.setItem(LANG_STORAGE_KEY, lang);

      document.getElementById('btn-lang-zh').classList.toggle('active', lang === 'zh');
      document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');

      // Update all cards to global language
      Object.keys(amuletsDb).forEach(id => {
        setCardLang(id, lang, false);
      });

      updateUI();
      showToast(lang === 'zh' ? '🇨🇳 สลับเป็นภาษาจีน (中文) ทั้งหมดแล้ว' : '🇬🇧 Switched to English for all amulets!');
    }

    function setCardLang(id, lang, showNotice = true) {
      cardLangState[id] = lang;
      const data = amuletsDb[id];
      if (!data) return;

      // Update Card Pill Buttons
      const pillZh = document.getElementById('pill-zh-' + id);
      const pillEn = document.getElementById('pill-en-' + id);
      if (pillZh && pillEn) {
        pillZh.classList.toggle('active', lang === 'zh');
        pillEn.classList.toggle('active', lang === 'en');
      }

      // Update Caption Preview
      const capPreview = document.getElementById('caption-preview-' + id);
      if (capPreview) {
        capPreview.innerText = lang === 'zh' ? data.captionZh : data.captionEn;
      }

      // Update Comment Preview
      const comText = document.getElementById('comment-text-' + id);
      if (comText) {
        comText.innerHTML = lang === 'zh'
          ? '👉 查阅高清显微多角度细节与官方历史档案：<br>' + data.url
          : '👉 View official museum archive & microscopic HD multi-angle photography:<br>' + data.url;
      }

      // Update Buttons text
      const copyBtn = document.getElementById('copy-btn-' + id);
      if (copyBtn) {
        copyBtn.innerText = lang === 'zh'
          ? '📋 1. คัดลอกแคปชั่นภาษาจีน (ไม่มีลิงก์ ไม่โดนลบ)'
          : '📋 1. Copy English Caption (No Link - 100% Safe)';
      }

      const copyComBtn = document.getElementById('copy-comment-btn-' + id);
      if (copyComBtn) {
        copyComBtn.innerText = lang === 'zh'
          ? '💬 2. คัดลอกลิงก์ไปแปะคอมเมนต์แรก (中文)'
          : '💬 2. Copy Link for 1st Comment (English)';
      }

      const openFbBtn = document.getElementById('open-fb-btn-' + id);
      if (openFbBtn) {
        openFbBtn.innerText = lang === 'zh'
          ? '🚀 3. เปิดแอป Facebook (กลุ่มภาษาจีน)'
          : '🚀 3. Open Facebook App (English Groups)';
      }

      updateUI();

      if (showNotice) {
        showToast(lang === 'zh' ? '🇨🇳 สลับองค์นี้เป็นภาษาจีน' : '🇬🇧 Switched this amulet to English');
      }
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

    function copyCaption(id) {
      const lang = cardLangState[id] || globalLang;
      const data = amuletsDb[id];
      if (!data) return;

      const text = lang === 'zh' ? data.captionZh : data.captionEn;
      const msg = lang === 'zh' 
        ? '📋 คัดลอกแคปชั่นภาษาจีน (ไม่มีลิงก์) สำเร็จแล้ว!' 
        : '📋 Copied English Caption (Safe No-Link) successfully!';
      copyToClipboard(text, msg);
    }

    function copyComment(id) {
      const lang = cardLangState[id] || globalLang;
      const data = amuletsDb[id];
      if (!data) return;

      const text = lang === 'zh' ? data.commentZh : data.commentEn;
      const msg = lang === 'zh'
        ? '💬 คัดลอกข้อความแปะคอมเมนต์แรก (中文) แล้ว!'
        : '💬 Copied 1st comment link text (English)!';
      copyToClipboard(text, msg);
    }

    function openFacebookGroup(id) {
      const lang = cardLangState[id] || globalLang;
      const searchUrl = lang === 'zh'
        ? 'https://www.facebook.com/groups/search/groups/?q=佛牌买卖谢绝假牌'
        : 'https://www.facebook.com/groups/search/groups/?q=Thai+Amulet+Collectors';
      window.location.href = searchUrl;
    }

    function togglePosted(id) {
      const lang = cardLangState[id] || globalLang;
      togglePostedLang(id, lang);
    }

    function togglePostedLang(id, lang) {
      let postedIds = getPostedIds(lang);
      const isCurrentlyPosted = postedIds.includes(id);
      const langName = lang === 'zh' ? 'ภาษาจีน (🇨🇳)' : 'ภาษาอังกฤษ (🇬🇧)';
      const card = document.querySelector('.card[data-id="' + id + '"]');

      if (isCurrentlyPosted) {
        postedIds = postedIds.filter(item => item !== id);
        savePostedIds(postedIds, lang);
        showToast('↩️ ยกเลิกสถานะ ' + langName + ' แล้ว');
      } else {
        postedIds.push(id);
        savePostedIds(postedIds, lang);

        const activeCardLang = cardLangState[id] || globalLang;
        if (currentFilter === 'unposted' && lang === activeCardLang && card) {
          card.classList.add('fade-out');
          setTimeout(() => {
            card.classList.remove('fade-out');
            updateUI();
          }, 250);
          showToast('✅ บันทึกว่าโพสต์ ' + langName + ' แล้ว (ซ่อนเรียบร้อย)');
          return;
        } else {
          showToast('✅ บันทึกว่าโพสต์ ' + langName + ' แล้ว');
        }
      }
      updateUI();
    }

    function setFilter(filter) {
      currentFilter = filter;
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      const activeTab = document.getElementById('tab-' + filter);
      if (activeTab) activeTab.classList.add('active');
      updateUI();
    }

    function resetPostedPrompt() {
      const langName = globalLang === 'zh' ? 'ภาษาจีน (🇨🇳)' : 'ภาษาอังกฤษ (🇬🇧)';
      const choice = confirm(
        'ต้องการรีเซ็ตสถานะโพสต์ของ ' + langName + ' ทั้งหมดใช่หรือไม่?\\n\\n' +
        '• กด "ตกลง (OK)" เพื่อรีเซ็ต ' + langName + ' ให้กลับมารอโพสต์ใหม่\\n' +
        '• ข้อมูลสถานะของอีกภาษาจะไม่ได้รับผลกระทบ'
      );
      if (choice) {
        savePostedIds([], globalLang);
        showToast('🔄 รีเซ็ตสถานะ ' + langName + ' เรียบร้อยแล้ว');
        updateUI();
      }
    }

    function updateUI() {
      const postedZh = getPostedIds('zh');
      const postedEn = getPostedIds('en');
      const allCards = document.querySelectorAll('.card');
      const totalCount = allCards.length;

      // Update Top Overview Stats
      const zhUnposted = totalCount - postedZh.length;
      const enUnposted = totalCount - postedEn.length;

      const statZhUnpostedEl = document.getElementById('stat-zh-unposted');
      const statZhPostedEl = document.getElementById('stat-zh-posted');
      const statEnUnpostedEl = document.getElementById('stat-en-unposted');
      const statEnPostedEl = document.getElementById('stat-en-posted');

      if (statZhUnpostedEl) statZhUnpostedEl.innerText = zhUnposted;
      if (statZhPostedEl) statZhPostedEl.innerText = postedZh.length;
      if (statEnUnpostedEl) statEnUnpostedEl.innerText = enUnposted;
      if (statEnPostedEl) statEnPostedEl.innerText = postedEn.length;

      // Highlight active language pill in stats bar
      const pillZhEl = document.getElementById('stat-pill-zh');
      const pillEnEl = document.getElementById('stat-pill-en');
      if (pillZhEl) pillZhEl.classList.toggle('active', globalLang === 'zh');
      if (pillEnEl) pillEnEl.classList.toggle('active', globalLang === 'en');

      // Update Filter Tabs numbers based on CURRENT active globalLang
      const activeUnpostedCount = (globalLang === 'zh') ? zhUnposted : enUnposted;
      const activePostedCount = (globalLang === 'zh') ? postedZh.length : postedEn.length;

      const tabUnpostedEl = document.getElementById('tab-count-unposted');
      const tabPostedEl = document.getElementById('tab-count-posted');
      if (tabUnpostedEl) tabUnpostedEl.innerText = activeUnpostedCount;
      if (tabPostedEl) tabPostedEl.innerText = activePostedCount;

      let visibleCount = 0;

      allCards.forEach(card => {
        const id = card.getAttribute('data-id');
        const cardLang = cardLangState[id] || globalLang;
        const isZhPosted = postedZh.includes(id);
        const isEnPosted = postedEn.includes(id);

        // 1. Update Card Language Pills (Pill in header)
        const headerPillZh = document.getElementById('pill-zh-' + id);
        const headerPillEn = document.getElementById('pill-en-' + id);
        if (headerPillZh) {
          headerPillZh.classList.toggle('active', cardLang === 'zh');
          headerPillZh.classList.toggle('is-posted', isZhPosted);
        }
        if (headerPillEn) {
          headerPillEn.classList.toggle('active', cardLang === 'en');
          headerPillEn.classList.toggle('is-posted', isEnPosted);
        }

        // 2. Update Dual Status Mini-Tags
        const tagZh = document.getElementById('tag-zh-' + id);
        const tagEn = document.getElementById('tag-en-' + id);
        if (tagZh) {
          tagZh.className = 'lang-status-tag ' + (isZhPosted ? 'posted' : 'unposted');
          tagZh.innerHTML = isZhPosted ? '🇨🇳 จีน: ลงแล้ว ✓' : '🇨🇳 จีน: รอลง';
        }
        if (tagEn) {
          tagEn.className = 'lang-status-tag ' + (isEnPosted ? 'posted' : 'unposted');
          tagEn.innerHTML = isEnPosted ? '🇬🇧 อังกฤษ: ลงแล้ว ✓' : '🇬🇧 อังกฤษ: รอลง';
        }

        // 3. Update Main Step 4 Status Button
        const statusBtn = document.getElementById('status-btn-' + id);
        const isCurrentLangPosted = (cardLang === 'zh') ? isZhPosted : isEnPosted;

        if (statusBtn) {
          if (isCurrentLangPosted) {
            statusBtn.className = 'undone-btn';
            statusBtn.innerText = cardLang === 'zh'
              ? '↩️ ยกเลิก (🇨🇳 จีน - ย้ายกลับไปรอโพสต์)'
              : '↩️ Undo (🇬🇧 English - Move back to queue)';
          } else {
            statusBtn.className = 'done-btn';
            statusBtn.innerText = cardLang === 'zh'
              ? '✅ 4. โพสต์กลุ่มจีนแล้ว (🇨🇳 中文)'
              : '✅ 4. โพสต์กลุ่มอังกฤษแล้ว (🇬🇧 English)';
          }
        }

        // 4. Card Visibility based on currentFilter and active language
        let show = false;
        if (currentFilter === 'all') {
          show = true;
        } else if (currentFilter === 'unposted') {
          show = !isCurrentLangPosted;
        } else if (currentFilter === 'posted') {
          show = isCurrentLangPosted;
        }

        if (show) {
          card.classList.remove('hidden-card');
          visibleCount++;
        } else {
          card.classList.add('hidden-card');
        }
      });

      // 5. Empty State Message
      const emptyState = document.getElementById('empty-state');
      if (emptyState) {
        if (visibleCount === 0 && currentFilter === 'unposted' && activePostedCount > 0) {
          const langLabel = globalLang === 'zh' ? 'ภาษาจีน (🇨🇳)' : 'ภาษาอังกฤษ (🇬🇧)';
          const altLangLabel = globalLang === 'zh' ? '🇬🇧 ภาษาอังกฤษ' : '🇨🇳 ภาษาจีน';
          const altLangCode = globalLang === 'zh' ? 'en' : 'zh';
          emptyState.innerHTML = \`
            <h3>🎉 โพสต์กลุ่ม\${langLabel} ครบทั้งหมดแล้ว!</h3>
            <p>ยอดเยี่ยมมากครับ คุณได้โพสต์กลุ่ม\${langLabel} ครบถ้วนแล้ว<br>
            กดสลับไปที่ <b><a href="#" onclick="setGlobalLang('\${altLangCode}'); return false;" style="color:#f59e0b; text-decoration:underline;">\${altLangLabel}</a></b> ด้านบน เพื่อดำเนินการโพสต์ต่อได้ทันทีครับ</p>
          \`;
          emptyState.style.display = 'block';
        } else {
          emptyState.style.display = 'none';
        }
      }
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.innerText = msg;
      toast.style.opacity = '1';
      setTimeout(() => { toast.style.opacity = '0'; }, 2200);
    }

    // Initialize on page load
    setGlobalLang(globalLang);
    updateUI();`;

function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

if (logicRegex.test(html)) {
  html = html.replace(logicRegex, newLogicCode);
  console.log('✅ 6. Logic functions updated successfully');
} else {
  console.error('❌ logicRegex did not match!');
  process.exit(1);
}

fs.writeFileSync(fbPath, html, 'utf8');
console.log('🎉 public/fb.html updated and saved successfully!');
