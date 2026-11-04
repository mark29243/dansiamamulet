const fs = require('fs');
const path = require('path');

const fbPath = path.join(__dirname, '../public/fb.html');
let html = fs.readFileSync(fbPath, 'utf8');

// Safeguard btnZh and btnEn
html = html.replace(
  `      document.getElementById('btn-lang-zh').classList.toggle('active', lang === 'zh');
      document.getElementById('btn-lang-en').classList.toggle('active', lang === 'en');`,
  `      const btnZh = document.getElementById('btn-lang-zh');
      const btnEn = document.getElementById('btn-lang-en');
      if (btnZh) btnZh.classList.toggle('active', lang === 'zh');
      if (btnEn) btnEn.classList.toggle('active', lang === 'en');`
);

fs.writeFileSync(fbPath, html, 'utf8');
console.log('✅ Added defensive checks to setGlobalLang in public/fb.html');
