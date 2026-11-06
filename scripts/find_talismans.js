const fs = require('fs');
const products = JSON.parse(fs.readFileSync('../products_published_452.json', 'utf8'));

const existingIds = [49, 1769, 1768, 1744, 1772, 1746, 1730, 1737, 1755, 1745, 1757, 1770, 1703];

// Talisman keywords
const talismanKeywords = ['เบี้ยแก้', 'ตะกรุด', 'ราหู', 'สิงห์', 'เสือ', 'ชูชก', 'กุมาร', 'มีดหมอ', 'แพะ', 'หนุมาน', 'ลิง', 'หมากทุย', 'ปลัดขิก', 'หุ่นพยนต์', 'สีผึ้ง', 'เต่า', 'ม้าเสพนาง', 'พญาครุฑ', 'วัวธนู', 'ควายธนู', 'สาริกา'];

const found = products.filter(p => {
  if (existingIds.includes(p.id)) return false;
  const text = (p.name + ' ' + (p.description || '')).toLowerCase();
  return talismanKeywords.some(kw => text.includes(kw));
});

console.log('Total talismans found:', found.length);
found.forEach((p, idx) => {
  const images = Array.isArray(p.images) ? p.images : (typeof p.images === 'string' ? JSON.parse(p.images) : []);
  if (images.length >= 3) {
    console.log(`[${idx+1}] ID: ${p.id} | Price: ${p.price/100} THB | Slug: ${p.slug}`);
    console.log(`     Name: ${p.name}`);
    console.log(`     Images count: ${images.length}`);
  }
});
