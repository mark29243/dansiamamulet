const fs = require('fs');
const path = require('path');
const vm = require('vm');

const fbPath = path.join(__dirname, '..', 'public', 'fb.html');
const html = fs.readFileSync(fbPath, 'utf8');

console.log('--- Starting Verification of public/fb.html (38 Cards) ---');

// 1. Check Filter Tab "ทั้งหมด (38)"
if (html.includes('ทั้งหมด (38)')) {
  console.log('✓ Filter tab correctly displays "ทั้งหมด (38)"');
} else {
  console.error('✗ FAILED: Filter tab does not display "ทั้งหมด (38)"');
  process.exit(1);
}

// 2. Count Cards in HTML
const cardRegex = /<div class="card" data-id="([^"]+)">/g;
const cardMatches = [...html.matchAll(cardRegex)].map(m => m[1]);
console.log(`✓ Total cards in HTML: ${cardMatches.length} (Expected: 38)`);
if (cardMatches.length !== 38) {
  console.error(`✗ FAILED: Expected 38 cards, found ${cardMatches.length}`);
  process.exit(1);
}

// Check duplicates
const uniqueCards = new Set(cardMatches);
if (uniqueCards.size !== 38) {
  console.error(`✗ FAILED: Duplicate card IDs detected! Unique: ${uniqueCards.size}`);
  process.exit(1);
}
console.log('✓ All 38 card IDs are unique');

// 3. Verify amuletsDb
const dbMatch = html.match(/const amuletsDb\s*=\s*(\{[\s\S]*?\n\};)/);
if (!dbMatch) {
  console.error('✗ FAILED: Could not extract amuletsDb');
  process.exit(1);
}

let amuletsDb;
try {
  const sandbox = {};
  vm.runInNewContext('amuletsDb = ' + dbMatch[1], sandbox);
  amuletsDb = sandbox.amuletsDb;
  console.log(`✓ amuletsDb parsed successfully. Keys count: ${Object.keys(amuletsDb).length} (Expected: 38)`);
} catch (e) {
  console.error('✗ FAILED to parse amuletsDb:', e.message);
  process.exit(1);
}

if (Object.keys(amuletsDb).length !== 38) {
  console.error(`✗ FAILED: Expected 38 keys in amuletsDb, found ${Object.keys(amuletsDb).length}`);
  process.exit(1);
}

// 4. Verify all elements and image assets for all 38 cards
let totalImagesChecked = 0;
let missingImages = 0;
let missingElements = 0;

for (const id of cardMatches) {
  const dbItem = amuletsDb[id];
  if (!dbItem) {
    console.error(`✗ Missing dbItem for card ${id}`);
    missingElements++;
    continue;
  }

  // Check required strings
  if (!dbItem.url || !dbItem.captionZh || !dbItem.captionEn || !dbItem.commentZh || !dbItem.commentEn) {
    console.error(`✗ Missing content in amuletsDb for ${id}`);
    missingElements++;
  }

  // Check required HTML IDs
  const requiredIds = [
    `pill-zh-${id}`, `pill-en-${id}`,
    `caption-preview-${id}`,
    `comment-preview-${id}`, `comment-text-${id}`,
    `copy-btn-${id}`, `copy-comment-btn-${id}`,
    `open-fb-btn-${id}`, `status-btn-${id}`,
    `tag-zh-${id}`, `tag-en-${id}`
  ];

  for (const elId of requiredIds) {
    if (!html.includes(`id="${elId}"`)) {
      console.error(`✗ Missing DOM element with id="${elId}" for card ${id}`);
      missingElements++;
    }
  }

  // Extract images for this card
  // Look for card block
  const cardBlockRegex = new RegExp(`<div class="card" data-id="${id}">([\\s\\S]*?)<div class="card-status-badges" id="status-badges-${id}">`);
  const blockMatch = html.match(cardBlockRegex);
  if (!blockMatch) {
    console.error(`✗ Could not extract card block for ${id}`);
    missingElements++;
    continue;
  }

  const imgRegex = /<img src="([^"]+)"/g;
  const imgs = [...blockMatch[1].matchAll(imgRegex)].map(m => m[1]);
  if (imgs.length !== 3) {
    console.error(`✗ Card ${id} has ${imgs.length} images (expected 3)`);
    missingImages++;
  }

  for (const imgPath of imgs) {
    totalImagesChecked++;
    const diskPath = path.join(__dirname, '..', 'public', imgPath.replace(/^\//, ''));
    if (!fs.existsSync(diskPath)) {
      console.error(`✗ Image not found on disk: ${diskPath} for card ${id}`);
      missingImages++;
    } else {
      const stats = fs.statSync(diskPath);
      if (stats.size === 0) {
        console.error(`✗ Image is 0 bytes: ${diskPath}`);
        missingImages++;
      }
    }
  }
}

console.log(`✓ Total images checked: ${totalImagesChecked} (Missing: ${missingImages})`);
console.log(`✓ Total DOM elements verified for all cards (Missing: ${missingElements})`);

if (missingImages === 0 && missingElements === 0) {
  console.log('\n🎉 ALL 38 CARDS, IMAGES, DUAL-LANGUAGE SCRIPTS, AND ASSETS FULLY VERIFIED 100%!');
} else {
  console.error('\n✗ Verification completed with errors.');
  process.exit(1);
}
