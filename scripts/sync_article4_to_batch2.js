const fs = require('fs');

const updateScript = fs.readFileSync('scripts/update_blog_phra_pidta_flagship.js', 'utf8');

function extractVar(name) {
  const match = updateScript.match(new RegExp('const ' + name + ' = `([\\s\\S]*?)`;'));
  if (match) return match[1];
  const singleMatch = updateScript.match(new RegExp("const " + name + " = '([\\s\\S]*?)';"));
  if (singleMatch) return singleMatch[1];
  throw new Error('Not found: ' + name);
}

const title_en = extractVar('title_en');
const title_th = extractVar('title_th');
const title_zh = extractVar('title_zh');

const excerpt_en = extractVar('excerpt_en');
const excerpt_th = extractVar('excerpt_th');
const excerpt_zh = extractVar('excerpt_zh');

const content_en = extractVar('content_en');
const content_th = extractVar('content_th');
const content_zh = extractVar('content_zh');

let batchFile = fs.readFileSync('scripts/insert_batch2_draft_blogs.js', 'utf8');

const targetRegex = /  \/\/ ── 2\. ARTICLE 4: Phra Pidta & Maha-Kaccayana ──────────────────────────────[\s\S]*?  \/\/ ── 3\. ARTICLE 5: Thao Wessuwan & Vaisravana ────────────────────────────────/;

const replacementBlock = `  // ── 2. ARTICLE 4: Phra Pidta & Maha-Kaccayana ──────────────────────────────
  {
    slug: 'phra-pidta-maha-kaccayana-sensory-restraint-theology',
    category: 'ประวัติศาสตร์พระเครื่อง',
    cover_image: 'https://pub-37c44db5189443e5945025e6f5b8855f.r2.dev/1792210074374-o3wovt5ldx8.webp',
    published: false,

    title: ${JSON.stringify(title_en)},
    title_th: ${JSON.stringify(title_th)},
    title_zh: ${JSON.stringify(title_zh)},

    excerpt: ${JSON.stringify(excerpt_en)},
    excerpt_th: ${JSON.stringify(excerpt_th)},
    excerpt_zh: ${JSON.stringify(excerpt_zh)},

    content: \`${content_en}\`,

    content_th: \`${content_th}\`,

    content_zh: \`${content_zh}\`
  },

  // ── 3. ARTICLE 5: Thao Wessuwan & Vaisravana ────────────────────────────────`;

if (!targetRegex.test(batchFile)) {
  console.error('Target regex not matched!');
  process.exit(1);
}

batchFile = batchFile.replace(targetRegex, replacementBlock);
fs.writeFileSync('scripts/insert_batch2_draft_blogs.js', batchFile, 'utf8');
console.log('Successfully updated scripts/insert_batch2_draft_blogs.js');
