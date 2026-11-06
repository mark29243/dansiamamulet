const fs = require('fs');
const html = fs.readFileSync('public/fb.html', 'utf8');
const regex = /<div class="card" data-id="([^"]+)">[\s\S]*?<div class="card-title">([\s\S]*?)<\/div>/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log('data-id:', match[1], '|', match[2].trim());
}
