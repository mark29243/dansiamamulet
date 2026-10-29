const fs = require('fs');
const path = require('path');

const listingsJsonPath = path.resolve('C:/Users/mark2/Downloads/Carousell_Listings/curated_listings.json');
const rawData = fs.readFileSync(listingsJsonPath, 'utf8');
const listings = JSON.parse(rawData);

function buildHtml(isLocalDownload = false) {
  const listingsHtml = listings.map((item, idx) => {
    // Relative image paths for local download folder, or remote URLs
    const imageCards = item.localImages.map((imgPath, imgIdx) => {
      const relPath = isLocalDownload 
        ? path.relative('C:/Users/mark2/Downloads/Carousell_Listings', imgPath).replace(/\\/g, '/')
        : `https://dansiamamulets.com/images/products/${item.id}/${path.basename(imgPath)}`;
      return `
        <div class="thumb-box">
          <img src="${relPath}" alt="Photo ${imgIdx + 1}" onerror="this.src='https://placehold.co/120x120?text=Photo+${imgIdx+1}'"/>
          <span>Photo ${imgIdx + 1}</span>
        </div>
      `;
    }).join('');

    // Console Auto-Fill snippet
    const consoleScript = `
(function() {
  function setVal(selector, val) {
    const el = document.querySelector(selector);
    if (el) {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      console.log('Filled:', selector);
    }
  }
  // Common Carousell input selectors
  const titleInput = document.querySelector('input[name="title"], input[placeholder*="title" i], textarea[placeholder*="title" i]');
  if (titleInput) { titleInput.value = ${JSON.stringify(item.title)}; titleInput.dispatchEvent(new Event('input', { bubbles: true })); }
  const priceInput = document.querySelector('input[name="price"], input[placeholder*="price" i], input[type="number"]');
  if (priceInput) { priceInput.value = ${JSON.stringify(item.price_sgd.toString())}; priceInput.dispatchEvent(new Event('input', { bubbles: true })); }
  const descInput = document.querySelector('textarea[name="description"], textarea[placeholder*="describe" i], textarea[placeholder*="description" i]');
  if (descInput) { descInput.value = ${JSON.stringify(item.description)}; descInput.dispatchEvent(new Event('input', { bubbles: true })); }
  alert('✨ Auto-filled Title, Price (S$ ${item.price_sgd}), and Description for Item #${item.id}!');
})();
`.trim();

    return `
    <div class="amulet-card" id="amulet-${item.id}">
      <div class="card-header">
        <div class="badge-row">
          <span class="badge-num">#0${idx + 1}</span>
          <span class="badge-ref">REF: #${item.id}</span>
          <span class="badge-cat">${item.category}</span>
        </div>
        <h2 class="amulet-title">${item.title}</h2>
        <div class="amulet-th">${item.name_th}</div>
      </div>

      <div class="card-body">
        <!-- Gallery Preview -->
        <div class="gallery-section">
          <div class="gallery-title">📁 Drag Photos from folder: <code>${path.basename(item.folderPath)}</code></div>
          <div class="thumbs-grid">
            ${imageCards}
          </div>
        </div>

        <!-- Form Fields with 1-Click Copy -->
        <div class="fields-section">
          <!-- Field 1: Title -->
          <div class="field-row">
            <label>1. Listing Title (Max 80 chars)</label>
            <div class="input-with-copy">
              <input type="text" readonly value="${item.title.replace(/"/g, '&quot;')}" id="title-${item.id}">
              <button class="btn-copy" onclick="copyField('title-${item.id}', this)">📋 Copy Title</button>
            </div>
          </div>

          <!-- Field 2: Price & Condition -->
          <div class="two-col">
            <div class="field-row">
              <label>2. Price (SGD)</label>
              <div class="input-with-copy">
                <input type="text" readonly value="${item.price_sgd}" id="price-${item.id}">
                <button class="btn-copy" onclick="copyField('price-${item.id}', this)">📋 Copy S$ ${item.price_sgd}</button>
              </div>
              <small class="hint">≈ ฿${item.price_thb.toLocaleString()} THB (Conversion ~26 THB/SGD)</small>
            </div>
            <div class="field-row">
              <label>3. Condition</label>
              <div class="input-with-copy">
                <input type="text" readonly value="Like New" id="cond-${item.id}">
                <button class="btn-copy" onclick="copyField('cond-${item.id}', this)">📋 Copy Condition</button>
              </div>
              <small class="hint">Select: "Like New" / "Lightly Used"</small>
            </div>
          </div>

          <!-- Field 3: Category -->
          <div class="field-row">
            <label>4. Recommended Category</label>
            <div class="input-with-copy">
              <input type="text" readonly value="Antiques &amp; Vintage &gt; Religious Items" id="cat-${item.id}">
              <button class="btn-copy" onclick="copyField('cat-${item.id}', this)">📋 Copy Category</button>
            </div>
          </div>

          <!-- Field 4: Description -->
          <div class="field-row">
            <label>5. Full Description (Rich English + Thai + Guarantee)</label>
            <textarea readonly rows="9" id="desc-${item.id}">${item.description}</textarea>
            <div class="desc-actions">
              <button class="btn-copy btn-lg" onclick="copyField('desc-${item.id}', this)">📋 Copy Full Description</button>
              <button class="btn-script" onclick="copyText(${JSON.stringify(consoleScript).replace(/"/g, '&quot;')}, this)">⚡ Copy Console Auto-Fill Script</button>
              <a href="${item.webUrl}" target="_blank" class="btn-link">🌐 View on DanSiam Official ↗</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dan Siam Amulets — Carousell Listing Assistant (Singapore & Malaysia)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sarabun:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b0f17;
      --card-bg: #111827;
      --border: #1f2937;
      --gold: #d4af37;
      --gold-light: #f3e5ab;
      --gold-dark: #997f1f;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --success: #10b981;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', 'Sarabun', -apple-system, sans-serif;
      padding: 24px;
      line-height: 1.5;
    }
    .container {
      max-width: 1040px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      margin-bottom: 32px;
      padding: 32px 24px;
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(17, 24, 39, 0.8) 100%);
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 16px;
    }
    .logo-badge {
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      color: var(--gold);
      text-transform: uppercase;
      padding: 4px 12px;
      border: 1px solid var(--gold);
      border-radius: 20px;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 28px;
      font-weight: 800;
      color: #fff;
      margin-bottom: 8px;
    }
    .subtitle {
      color: var(--text-muted);
      font-size: 15px;
    }
    .guide-box {
      background: #1e293b;
      border-left: 4px solid var(--gold);
      padding: 16px 20px;
      border-radius: 8px;
      margin-bottom: 32px;
      font-size: 14px;
    }
    .guide-box ol {
      margin-left: 20px;
      margin-top: 8px;
    }
    .guide-box li {
      margin-bottom: 6px;
    }

    /* Cards */
    .amulet-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      margin-bottom: 36px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    }
    .card-header {
      background: #162032;
      padding: 20px 24px;
      border-bottom: 1px solid var(--border);
    }
    .badge-row {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-bottom: 8px;
    }
    .badge-num {
      background: var(--gold);
      color: #000;
      font-weight: 800;
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .badge-ref {
      background: #374151;
      color: #d1d5db;
      font-size: 12px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .badge-cat {
      background: rgba(212, 175, 55, 0.15);
      color: var(--gold-light);
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .amulet-title {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 4px;
    }
    .amulet-th {
      font-size: 14px;
      color: var(--gold-light);
    }

    .card-body {
      padding: 24px;
    }

    /* Gallery preview */
    .gallery-section {
      margin-bottom: 24px;
      background: #0f172a;
      padding: 16px;
      border-radius: 10px;
      border: 1px dashed #334155;
    }
    .gallery-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--gold);
      margin-bottom: 12px;
    }
    .gallery-title code {
      background: #1e293b;
      padding: 2px 6px;
      border-radius: 4px;
      color: #fff;
    }
    .thumbs-grid {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .thumb-box {
      width: 100px;
      text-align: center;
    }
    .thumb-box img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #374151;
      background: #111;
    }
    .thumb-box span {
      display: block;
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    /* Fields */
    .field-row {
      margin-bottom: 16px;
    }
    .field-row label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 6px;
    }
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .input-with-copy {
      display: flex;
      gap: 8px;
    }
    input[type="text"], textarea {
      width: 100%;
      background: #0b0f17;
      border: 1px solid #374151;
      color: #fff;
      font-family: inherit;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 14px;
    }
    textarea {
      resize: vertical;
      line-height: 1.6;
      font-size: 13px;
    }
    input[type="text"]:focus, textarea:focus {
      outline: none;
      border-color: var(--gold);
    }
    .hint {
      display: block;
      font-size: 12px;
      color: #94a3b8;
      margin-top: 4px;
    }

    /* Buttons */
    .btn-copy {
      background: #1f2937;
      color: #fff;
      border: 1px solid #4b5563;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }
    .btn-copy:hover {
      background: var(--gold);
      color: #000;
      border-color: var(--gold);
    }
    .btn-copy.copied {
      background: var(--success) !important;
      color: #fff !important;
      border-color: var(--success) !important;
    }
    .btn-lg {
      background: #2563eb;
      border-color: #3b82f6;
      padding: 10px 20px;
    }
    .btn-lg:hover {
      background: #1d4ed8;
      color: #fff;
      border-color: #2563eb;
    }
    .btn-script {
      background: #7c3aed;
      color: #fff;
      border: 1px solid #8b5cf6;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .btn-script:hover {
      background: #6d28d9;
    }
    .btn-link {
      display: inline-flex;
      align-items: center;
      background: transparent;
      color: var(--gold);
      border: 1px solid var(--gold);
      padding: 9px 18px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 13px;
      transition: all 0.15s ease;
    }
    .btn-link:hover {
      background: rgba(212, 175, 55, 0.15);
    }
    .desc-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    footer {
      text-align: center;
      padding: 40px 0;
      color: var(--text-muted);
      font-size: 13px;
      border-top: 1px solid #1f2937;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo-badge">Dan Siam Amulets — Export Suite</div>
      <h1>Carousell Listing Assistant (SG / MY)</h1>
      <p class="subtitle">Curated Top 5 High-Demand Consecrated Amulets Ready for Carousell Singapore & Malaysia</p>
    </header>

    <div class="guide-box">
      <strong>🚀 Quick Listing Guide (In 3 Simple Steps):</strong>
      <ol>
        <li><strong>Photos:</strong> Open folder <code>C:\\Users\\mark2\\Downloads\\Carousell_Listings</code> and drag the photos directly into your Carousell listing window.</li>
        <li><strong>Details:</strong> Click the <strong>📋 Copy</strong> buttons below to effortlessly paste Title, Price (SGD), and Full Description into Carousell.</li>
        <li><strong>Instant 1-Click Fill (Optional):</strong> Click <strong>⚡ Copy Console Auto-Fill Script</strong>, press <code>F12</code> on your Carousell tab &gt; Console &gt; Paste &gt; Enter!</li>
      </ol>
    </div>

    <!-- Listings Cards -->
    ${listingsHtml}

    <footer>
      Dan Siam Amulets (Thailand) • Official International Catalog • https://dansiamamulets.com
    </footer>
  </div>

  <script>
    function copyField(elementId, btn) {
      const el = document.getElementById(elementId);
      if (!el) return;
      const text = el.value || el.innerText;
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerText;
        btn.innerText = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerText = orig;
          btn.classList.remove('copied');
        }, 2000);
      });
    }

    function copyText(text, btn) {
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerText;
        btn.innerText = '✓ Script Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerText = orig;
          btn.classList.remove('copied');
        }, 2000);
      });
    }
  </script>
</body>
</html>
`;
}

// Generate for Downloads folder (relative image paths to local photos)
const localHtml = buildHtml(true);
fs.writeFileSync('C:/Users/mark2/Downloads/Carousell_Listings/index.html', localHtml, 'utf8');
console.log('✓ Created: C:\\Users\\mark2\\Downloads\\Carousell_Listings\\index.html');

// Generate for Next.js public directory
const publicHtml = buildHtml(false);
fs.writeFileSync(path.resolve('public/carousell-assistant.html'), publicHtml, 'utf8');
console.log('✓ Created: public/carousell-assistant.html');
