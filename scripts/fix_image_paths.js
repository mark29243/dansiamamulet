const fs = require('fs');

const correctImagesMap = {
  sarika: ['talisman_sarika_1.jpg', 'talisman_sarika_2.jpg', 'talisman_sarika_3.jpg'],
  namtao: ['talisman_namtao_1.jpg', 'talisman_namtao_2.jpg', 'talisman_namtao_3.jpg'],
  khunphaen: ['batch2_khunphaen_1.jpg', 'batch2_khunphaen_2.jpg', 'batch2_khunphaen_3.jpg'],
  takrut: ['batch2_takrut_1.jpg', 'batch2_takrut_2.jpg', 'batch2_takrut_3.jpg'],
  lpthuat: ['batch2_lpthuat_1.jpg', 'batch2_lpthuat_2.jpg', 'batch2_lpthuat_3.jpg'],
  tiger: ['batch2_tiger_1.jpg', 'batch2_tiger_2.jpg', 'batch2_tiger_3.jpg'],
  paladkhik: ['batch2_paladkhik_1.jpg', 'batch2_paladkhik_2.jpg', 'batch2_paladkhik_3.jpg'],
  wuathanu: ['talisman_wuathanu_1.jpg', 'talisman_wuathanu_2.jpg', 'talisman_wuathanu_3.jpg'],
  guman: ['talisman_guman_1.jpg', 'talisman_guman_2.jpg', 'talisman_guman_3.jpg'],
  somdej_nak: ['somdej_nak_front.jpg', 'somdej_nak_back.jpg', 'somdej_nak_side.jpg'],
  somdej_pae: ['somdej_pae_front.jpg', 'somdej_pae_back.jpg', 'somdej_pae_side.jpg'],
  pidta: ['pidta_jindamanee_front.jpg', 'pidta_jindamanee_back.jpg', 'pidta_jindamanee_side.jpg'],
  koon: ['koon_front.jpg', 'koon_back.jpg', 'koon_side.jpg'],
  turtle: ['turtle_front.jpg', 'turtle_back.jpg', 'turtle_detail.jpg'],
  rahu: ['rahu_front.jpg', 'rahu_back.jpg', 'rahu_detail.jpg'],
  tigertakrut: ['tigertakrut_front.jpg', 'tigertakrut_back.jpg', 'tigertakrut_detail.jpg'],
  garuda: ['garuda_front.jpg', 'garuda_back.jpg', 'garuda_detail.jpg'],
  biagae: ['biagae_front.jpg', 'biagae_back.jpg', 'biagae_detail.jpg']
};

let scriptContent = fs.readFileSync('scripts/build_dual_lang_fb_html.js', 'utf8');

// Replace imgs array for each item in build_dual_lang_fb_html.js
for (const [id, files] of Object.entries(correctImagesMap)) {
  const itemRegex = new RegExp(`id:\\s*'${id}',[\\s\\S]*?imgs:\\s*\\[[\\s\\S]*?\\],`);
  const match = scriptContent.match(itemRegex);
  if (match) {
    const newImgs = `id: '${id}',
    num: ${match[0].match(/num:\s*(\d+)/)[1]},
    titleTh: ${match[0].match(/titleTh:\s*([^\n]+)/)[1]}
    subTh: ${match[0].match(/subTh:\s*([^\n]+)/)[1]}
    url: ${match[0].match(/url:\s*([^\n]+)/)[1]}
    imgs: [
      { src: '/amulets/${files[0]}', label: 'ด้านหน้า (Front)' },
      { src: '/amulets/${files[1]}', label: 'ด้านหลัง (Back)' },
      { src: '/amulets/${files[2]}', label: 'ซูมลายละเอียด (Detail)' }
    ],`;
    scriptContent = scriptContent.replace(match[0], newImgs);
  }
}

fs.writeFileSync('scripts/build_dual_lang_fb_html.js', scriptContent, 'utf8');
console.log('Updated scripts/build_dual_lang_fb_html.js with correct image paths!');

// Now run the build to update public/fb.html
require('./build_dual_lang_fb_html.js');
