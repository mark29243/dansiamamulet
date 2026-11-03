const fs = require('fs');
const path = require('path');

const fbPath = path.join(__dirname, '../public/fb.html');
const amuletsDir = path.join(__dirname, '../public/amulets');

const html = fs.readFileSync(fbPath, 'utf8');

// Match all img src in fb.html
const matches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/g)];
console.log(`Found ${matches.length} image tags in public/fb.html`);

let missingCount = 0;
let existingCount = 0;

matches.forEach((m, idx) => {
  const src = m[1];
  const filename = path.basename(src);
  const diskPath = path.join(amuletsDir, filename);
  const exists = fs.existsSync(diskPath);
  if (exists) {
    existingCount++;
  } else {
    missingCount++;
    console.log(`[MISSING ${idx + 1}] ${src} -> ${diskPath}`);
  }
});

console.log(`\nSummary: ${existingCount} exist, ${missingCount} missing on disk.`);
