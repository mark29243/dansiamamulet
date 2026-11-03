const fs = require('fs');
const path = require('path');

const fbPath = path.join(__dirname, '../public/fb.html');
let html = fs.readFileSync(fbPath, 'utf8');

const replacements = {
  // 1. sarika
  '/amulets/sarika_front.webp': '/amulets/talisman_sarika_1.jpg',
  '/amulets/sarika_back.webp': '/amulets/talisman_sarika_2.jpg',
  '/amulets/sarika_detail.webp': '/amulets/talisman_sarika_3.jpg',

  // 2. namtao
  '/amulets/namtao_front.webp': '/amulets/talisman_namtao_1.jpg',
  '/amulets/namtao_back.webp': '/amulets/talisman_namtao_2.jpg',
  '/amulets/namtao_detail.webp': '/amulets/talisman_namtao_3.jpg',

  // 3. khunphaen
  '/amulets/khunphaen_front.webp': '/amulets/batch2_khunphaen_1.jpg',
  '/amulets/khunphaen_back.webp': '/amulets/batch2_khunphaen_2.jpg',
  '/amulets/khunphaen_detail.webp': '/amulets/batch2_khunphaen_3.jpg',

  // 4. takrut
  '/amulets/takrut_front.webp': '/amulets/batch2_takrut_1.jpg',
  '/amulets/takrut_back.webp': '/amulets/batch2_takrut_2.jpg',
  '/amulets/takrut_detail.webp': '/amulets/batch2_takrut_3.jpg',

  // 5. lpthuat
  '/amulets/lpthuat_front.webp': '/amulets/batch2_lpthuat_1.jpg',
  '/amulets/lpthuat_back.webp': '/amulets/batch2_lpthuat_2.jpg',
  '/amulets/lpthuat_detail.webp': '/amulets/batch2_lpthuat_3.jpg',

  // 6. tiger
  '/amulets/tiger_front.webp': '/amulets/batch2_tiger_1.jpg',
  '/amulets/tiger_back.webp': '/amulets/batch2_tiger_2.jpg',
  '/amulets/tiger_detail.webp': '/amulets/batch2_tiger_3.jpg',

  // 7. paladkhik
  '/amulets/paladkhik_front.webp': '/amulets/batch2_paladkhik_1.jpg',
  '/amulets/paladkhik_back.webp': '/amulets/batch2_paladkhik_2.jpg',
  '/amulets/paladkhik_detail.webp': '/amulets/batch2_paladkhik_3.jpg',

  // 8. wuathanu
  '/amulets/wuathanu_front.webp': '/amulets/talisman_wuathanu_1.jpg',
  '/amulets/wuathanu_back.webp': '/amulets/talisman_wuathanu_2.jpg',
  '/amulets/wuathanu_detail.webp': '/amulets/talisman_wuathanu_3.jpg',

  // 9. guman
  '/amulets/guman_front.webp': '/amulets/talisman_guman_1.jpg',
  '/amulets/guman_back.webp': '/amulets/talisman_guman_2.jpg',
  '/amulets/guman_detail.webp': '/amulets/talisman_guman_3.jpg',

  // 10. somdej_nak
  '/amulets/somdej_nak_front.webp': '/amulets/somdej_nak_front.jpg',
  '/amulets/somdej_nak_back.webp': '/amulets/somdej_nak_back.jpg',
  '/amulets/somdej_nak_detail.webp': '/amulets/somdej_nak_side.jpg',

  // 11. somdej_pae
  '/amulets/somdej_pae_front.webp': '/amulets/somdej_pae_front.jpg',
  '/amulets/somdej_pae_back.webp': '/amulets/somdej_pae_back.jpg',
  '/amulets/somdej_pae_detail.webp': '/amulets/somdej_pae_side.jpg',

  // 12. pidta
  '/amulets/pidta_front.webp': '/amulets/pidta_jindamanee_front.jpg',
  '/amulets/pidta_back.webp': '/amulets/pidta_jindamanee_back.jpg',
  '/amulets/pidta_detail.webp': '/amulets/pidta_jindamanee_side.jpg',

  // 13. koon
  '/amulets/koon_front.webp': '/amulets/koon_front.jpg',
  '/amulets/koon_back.webp': '/amulets/koon_back.jpg',
  '/amulets/koon_detail.webp': '/amulets/koon_side.jpg'
};

let replacedCount = 0;
for (const [oldPath, newPath] of Object.entries(replacements)) {
  if (html.includes(oldPath)) {
    html = html.split(oldPath).join(newPath);
    replacedCount++;
    console.log(`Replaced: ${oldPath} -> ${newPath}`);
  } else {
    console.warn(`Warning: ${oldPath} not found in fb.html`);
  }
}

fs.writeFileSync(fbPath, html, 'utf8');
console.log(`\nSuccessfully applied ${replacedCount}/${Object.keys(replacements).length} image replacements to public/fb.html!`);
