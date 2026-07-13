const fs = require('fs');
const html = fs.readFileSync('thaimart_list_dom.html', 'utf8');

const buttons = [...html.matchAll(/<(button|a|span|div)[^>]*>.*?<\/\1>/gi)];
for (const b of buttons) {
  if (b[0].includes('ดูรายละเอียด') || b[0].includes('แก้ไข')) {
    console.log('Element:', b[0]);
  }
}
