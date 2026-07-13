import fs from 'fs';
const html = fs.readFileSync('thaimart_dom.html', 'utf8');

// Find all buttons
const buttons = [...html.matchAll(/<button[^>]*>(.*?)<\/button>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Buttons:', buttons.filter(b => b));

// Find file inputs
const inputs = [...html.matchAll(/<input[^>]*type="file"[^>]*>/g)].map(m => m[0]);
console.log('File Inputs:', inputs);

// Find 'เปิดใช้งาน' or 'ปิดใช้งาน'
const statusToggle = [...html.matchAll(/<button[^>]*role="switch"[^>]*>.*?<\/button>/g)].map(m => m[0]);
console.log('Switch Buttons:', statusToggle);
