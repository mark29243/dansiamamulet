const fs = require('fs');
const path = require('path');

const amuletsDir = path.join(__dirname, '../public/amulets');

const all54Jpgs = [
  // 1. sarika
  'talisman_sarika_1.jpg', 'talisman_sarika_2.jpg', 'talisman_sarika_3.jpg',
  // 2. namtao
  'talisman_namtao_1.jpg', 'talisman_namtao_2.jpg', 'talisman_namtao_3.jpg',
  // 3. khunphaen
  'batch2_khunphaen_1.jpg', 'batch2_khunphaen_2.jpg', 'batch2_khunphaen_3.jpg',
  // 4. takrut
  'batch2_takrut_1.jpg', 'batch2_takrut_2.jpg', 'batch2_takrut_3.jpg',
  // 5. lpthuat
  'batch2_lpthuat_1.jpg', 'batch2_lpthuat_2.jpg', 'batch2_lpthuat_3.jpg',
  // 6. tiger
  'batch2_tiger_1.jpg', 'batch2_tiger_2.jpg', 'batch2_tiger_3.jpg',
  // 7. paladkhik
  'batch2_paladkhik_1.jpg', 'batch2_paladkhik_2.jpg', 'batch2_paladkhik_3.jpg',
  // 8. wuathanu
  'talisman_wuathanu_1.jpg', 'talisman_wuathanu_2.jpg', 'talisman_wuathanu_3.jpg',
  // 9. guman
  'talisman_guman_1.jpg', 'talisman_guman_2.jpg', 'talisman_guman_3.jpg',
  // 10. somdej_nak
  'somdej_nak_front.jpg', 'somdej_nak_back.jpg', 'somdej_nak_side.jpg',
  // 11. somdej_pae
  'somdej_pae_front.jpg', 'somdej_pae_back.jpg', 'somdej_pae_side.jpg',
  // 12. pidta
  'pidta_jindamanee_front.jpg', 'pidta_jindamanee_back.jpg', 'pidta_jindamanee_side.jpg',
  // 13. koon
  'koon_front.jpg', 'koon_back.jpg', 'koon_side.jpg',
  // 14. turtle
  'turtle_front.jpg', 'turtle_back.jpg', 'turtle_detail.jpg',
  // 15. rahu
  'rahu_front.jpg', 'rahu_back.jpg', 'rahu_detail.jpg',
  // 16. tigertakrut
  'tigertakrut_front.jpg', 'tigertakrut_back.jpg', 'tigertakrut_detail.jpg',
  // 17. garuda
  'garuda_front.jpg', 'garuda_back.jpg', 'garuda_detail.jpg',
  // 18. biagae
  'biagae_front.jpg', 'biagae_back.jpg', 'biagae_detail.jpg'
];

console.log(`Checking ${all54Jpgs.length} files in ${amuletsDir}...`);
let missing = 0;
all54Jpgs.forEach(f => {
  const full = path.join(amuletsDir, f);
  if (!fs.existsSync(full)) {
    console.error(`MISSING: ${f}`);
    missing++;
  }
});

if (missing === 0) {
  console.log(`✅ All 54 image files exist on disk!`);
} else {
  console.error(`❌ ${missing} files missing!`);
}
