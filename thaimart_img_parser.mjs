import fs from 'fs';
const html = fs.readFileSync('thaimart_dom.html', 'utf8');

// Find all img src
const images = [...html.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/g)].map(m => m[1]);
console.log('Images on Edit Page:', images);
