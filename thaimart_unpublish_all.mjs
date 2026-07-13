import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
chromium.use(stealthPlugin());
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

async function run() {
  console.log("=== Thaimart Mass Unpublish Bot ===");
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
  
  await askQuestion("\n*** ด่วนที่สุด ***\n1. ล็อกอินให้เรียบร้อย (ถ้ายังไม่ได้ล็อกอิน)\n2. ให้คุณพี่คลิกไปที่แท็บ 'เผยแพร่' (เพื่อให้แสดงเฉพาะสินค้าที่เผยแพร่อยู่)\n3. พอกดแท็บ 'เผยแพร่' เสร็จแล้ว ให้กด Enter ที่นี่เพื่อเริ่มให้บอทกวาดปิดการขายทันทีครับ...");
  
  let unpublishCount = 0;
  
  while (true) {
    try {
      // Find the unpublish button ONLY inside the actions column (which uses div flex-col)
      const unpublishBtn = page.locator('div.flex-col > button').filter({ hasText: /ยังไม่วางขาย/i }).first();
      
      if (await unpublishBtn.isVisible({ timeout: 5000 })) {
        console.log(`กำลังปิดการขายชิ้นที่ ${unpublishCount + 1}...`);
        await unpublishBtn.click();
        await page.waitForTimeout(1000);
        
        // Handle confirmation popup if any
        const confirmBtn = page.getByRole('button', { name: /ยืนยัน|ตกลง|บันทึก|ใช่|Yes/i }).last();
        if (await confirmBtn.isVisible({ timeout: 3000 })) {
           await confirmBtn.click();
           await page.waitForTimeout(1500); // Wait for the network request to finish
        }
        
        unpublishCount++;
      } else {
        // If we don't see the button, it might mean we've cleared the current page.
        // Since we are unpublishing, the items disappear from this tab. We just need to reload to get the next batch.
        console.log("ไม่พบปุ่มในหน้านี้แล้ว กำลังรีเฟรชหน้าเพื่อดึงข้อมูลชุดต่อไป...");
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(4000);
        
        const checkBtn = page.locator('div.flex-col > button').filter({ hasText: /ยังไม่วางขาย/i }).first();
        if (!(await checkBtn.isVisible({ timeout: 5000 }))) {
            console.log("รีเฟรชแล้วก็ยังไม่พบปุ่ม 'ยังไม่วางขาย' จบการทำงานครับ!");
            break;
        }
      }
    } catch (err) {
      console.log("เกิดข้อผิดพลาด หรืออาจจะหมดหน้าแล้ว กำลังรีเฟรชเพื่อความชัวร์...");
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3000);
      
      const unpublishBtn = page.locator('div.flex-col > button').filter({ hasText: /ยังไม่วางขาย/i }).first();
      if (!(await unpublishBtn.isVisible({ timeout: 5000 }))) {
         console.log("เช็คซ้ำแล้วไม่พบปุ่ม 'ยังไม่วางขาย' จบการทำงานครับ!");
         break;
      }
    }
  }

  console.log(`\n=== เสร็จสิ้นการทำงาน! ปิดการขายไปทั้งหมด ${unpublishCount} รายการ ===`);
  rl.close();
  await browserContext.close();
}

run().catch(console.error);
