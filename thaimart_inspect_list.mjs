import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
chromium.use(stealthPlugin());
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

async function run() {
  console.log("=== Thaimart Product List DOM Inspector ===");
  console.log("กำลังเปิดเบราว์เซอร์...");
  const userDataDir = path.join(process.cwd(), 'chrome_profile_thaimart');
  
  let browserContext;
  try {
    browserContext = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      channel: 'chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  } catch (err) {
    console.error("ไม่สามารถเปิด Chrome ได้:", err.message);
    rl.close();
    return;
  }

  const page = browserContext.pages()[0] || await browserContext.newPage();
  
  await page.goto('https://seller.thaimart.com/products', { waitUntil: 'domcontentloaded' });
  
  await askQuestion("\n1. ล็อกอินให้เรียบร้อย\n2. ไปที่หน้ารายการสินค้า ค้นหาสินค้าอะไรก็ได้ให้มันขึ้นมาในตาราง 1 ชิ้น\n3. เมื่อเห็นปุ่ม 'ดูรายละเอียด' แล้ว ให้กด Enter ที่นี่เพื่อดึงโค้ดครับ: ");
  
  const html = await page.content();
  fs.writeFileSync('thaimart_list_dom.html', html);
  console.log("บันทึกโค้ดหน้าเว็บลงไฟล์ thaimart_list_dom.html เรียบร้อยแล้ว! ปิดเบราว์เซอร์ได้เลยครับ");
  
  rl.close();
  await browserContext.close();
}

run().catch(console.error);
