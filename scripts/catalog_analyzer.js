const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../products_published_452.json'), 'utf8'));

console.log(`Analyzing ${products.length} published products...\n`);

// Breakdown by major groups
const groups = {
  'Somdej': [],
  'Thuad': [],
  'Pidta': [],
  'KhunPhaen': [],
  'NangPhaya': [],
  'Kring_Chaiwat': [],
  'Rod_Khong': [],
  'NagaProk': [],
  'Wealth_Masters_Icons (Sangkachai, Sivali, Upakhut, ChaoSua, LP Ngern, LP Ruay)': [],
  'Deities (Wessuwan, Garuda, Ganesha, Brahma, Rahu)': [],
  'Talismans_Protective (Takrut, BiaGae, MitMor, Tiger, Singha, Hanuman)': [],
  'Talismans_Metta_Wealth (NangKwak, Guman, Sarika, SiPhueng, PhanThai)': [],
  'Buddha_Icons (Chinarat, Sothorn, LP To, Leela, etc.)': [],
  'Guru_Monks (Koon, Dooh, Pae, Guay, Kasem, etc.)': [],
  'Other': []
};

products.forEach(p => {
  const fullText = `${p.name} ${p.name_th || ''} ${p.category || ''} ${p.description || ''} ${p.description_th || ''}`.toLowerCase();
  const nameTh = p.name_th || p.name;

  if (nameTh.includes('สมเด็จ') || fullText.includes('somdej')) {
    groups['Somdej'].push(p);
  } else if (nameTh.includes('ทวด') || fullText.includes('tuad') || fullText.includes('thuad')) {
    groups['Thuad'].push(p);
  } else if (nameTh.includes('ปิดตา') || fullText.includes('pidta') || fullText.includes('pid ta')) {
    groups['Pidta'].push(p);
  } else if (nameTh.includes('ขุนแผน') || fullText.includes('khun phaen') || fullText.includes('khunpaen')) {
    groups['KhunPhaen'].push(p);
  } else if (nameTh.includes('นางพญา') || fullText.includes('nang phaya') || fullText.includes('nangphaya')) {
    groups['NangPhaya'].push(p);
  } else if (nameTh.includes('กริ่ง') || nameTh.includes('ชัยวัฒน์') || fullText.includes('kring') || fullText.includes('chaiwat')) {
    groups['Kring_Chaiwat'].push(p);
  } else if (nameTh.includes('พระรอด') || nameTh.includes('พระคง') || fullText.includes('phra rod') || fullText.includes('phra khong')) {
    groups['Rod_Khong'].push(p);
  } else if (nameTh.includes('นาคปรก') || fullText.includes('nakprok') || fullText.includes('naga prok')) {
    groups['NagaProk'].push(p);
  } else if (nameTh.includes('สังกัจจายน์') || nameTh.includes('สิวลี') || nameTh.includes('สีวลี') || nameTh.includes('อุปคุต') || nameTh.includes('เจ้าสัว') || nameTh.includes('หลวงพ่อเงิน') || nameTh.includes('หลวงพ่อรวย') || nameTh.includes('เศรษฐีนวโกฏิ')) {
    groups['Wealth_Masters_Icons (Sangkachai, Sivali, Upakhut, ChaoSua, LP Ngern, LP Ruay)'].push(p);
  } else if (nameTh.includes('เวสสุวรรณ') || nameTh.includes('ครุฑ') || nameTh.includes('พิฆเนศ') || nameTh.includes('พรหม') || nameTh.includes('ราหู') || fullText.includes('wessuwan') || fullText.includes('garuda') || fullText.includes('ganesha')) {
    groups['Deities (Wessuwan, Garuda, Ganesha, Brahma, Rahu)'].push(p);
  } else if (nameTh.includes('ตะกรุด') || nameTh.includes('เบี้ยแก้') || nameTh.includes('มีดหมอ') || nameTh.includes('เสือ') || nameTh.includes('สิงห์') || nameTh.includes('สิงห') || nameTh.includes('หนุมาน') || nameTh.includes('พยัคฆ์') || nameTh.includes('เชือกคาด') || nameTh.includes('หวายลูกนิมิต')) {
    groups['Talismans_Protective (Takrut, BiaGae, MitMor, Tiger, Singha, Hanuman)'].push(p);
  } else if (nameTh.includes('นางกวัก') || nameTh.includes('กุมาร') || nameTh.includes('สาริกา') || nameTh.includes('สาลิกา') || nameTh.includes('สีผึ้ง') || nameTh.includes('ผานไถ') || nameTh.includes('จิ้งจก') || nameTh.includes('อิ้น') || nameTh.includes('ชูชก') || nameTh.includes('เต่าเรือน') || nameTh.includes('ถุงเหนี่ยวทรัพย์')) {
    groups['Talismans_Metta_Wealth (NangKwak, Guman, Sarika, SiPhueng, PhanThai)'].push(p);
  } else if (nameTh.includes('ชินราช') || nameTh.includes('โสธร') || nameTh.includes('หลวงพ่อโต') || nameTh.includes('ลีลา') || nameTh.includes('สุโขทัย') || nameTh.includes('พระพุทธ') || nameTh.includes('พระแก้วมรกต') || nameTh.includes('มเหศวร') || nameTh.includes('พระยอดธง') || nameTh.includes('พระปรุหนัง') || nameTh.includes('พระผงสุพรรณ')) {
    groups['Buddha_Icons (Chinarat, Sothorn, LP To, Leela, etc.)'].push(p);
  } else if (p.category?.includes('เกจิ') || nameTh.includes('หลวงพ่อ') || nameTh.includes('หลวงปู่') || nameTh.includes('ครูบา') || nameTh.includes('พ่อท่าน') || nameTh.includes('อาจารย์')) {
    groups['Guru_Monks (Koon, Dooh, Pae, Guay, Kasem, etc.)'].push(p);
  } else {
    groups['Other'].push(p);
  }
});

console.log('=== DISTRIBUTION ACROSS CATALOG GROUPS ===');
let sum = 0;
for (const [group, list] of Object.entries(groups)) {
  console.log(`- ${group}: ${list.length} items`);
  sum += list.length;
}
console.log(`Total categorized: ${sum} / ${products.length}\n`);

if (groups['Other'].length > 0) {
  console.log('Sample from Other:');
  groups['Other'].forEach(p => console.log(`  ID ${p.id}: ${p.name_th} (${p.category})`));
}
