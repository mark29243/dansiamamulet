import { createClient } from '@supabase/supabase-js';
import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
chromium.use(stealthPlugin());
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import sharp from 'sharp';
import readline from 'readline';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const TEMP_IMG_DIR = path.join(process.cwd(), 'temp_thaimart_update');
if (!fs.existsSync(TEMP_IMG_DIR)) fs.mkdirSync(TEMP_IMG_DIR);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
  const buffer = await res.buffer();
  await sharp(buffer)
    .jpeg({ quality: 80 })
    .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
    .toFile(destPath);
}

async function run() {
  console.log("=== Thaimart Update Bot ===");
  console.log("Fetching products from Supabase...");
  
  // Fetch products that are ALREADY on Thaimart
  const { data: allProducts, error } = await supabase
    .from('shopee_products')
    .select('*')
    .eq('mark_thaimart', true)
    .order('id', { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    return;
  }

  // Filter products that have more than 1 image (so we have something to add)
  const products = allProducts.filter(p => p.images && p.images.length > 1);
  console.log(`พบสินค้าที่ลง Thaimart ไปแล้ว และมีรูป > 1 รูป จำนวน ${products.length} รายการ`);
  if (products.length === 0) {
    console.log("ไม่มีสินค้าต้องอัปเดต");
    rl.close();
    return;
  }

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
  
  await askQuestion("\n*** สำคัญมาก ***\nกรุณาล็อกอินเข้าระบบ Thaimart ให้เสร็จสมบูรณ์\nหากถึงหน้าจอ 'รายการสินค้า' แล้ว ให้กด Enter ที่นี่เพื่อเริ่มให้บอททำงาน...");
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`\n[${i + 1}/${products.length}] กำลังค้นหา: ${product.name}`);
    
    try {
      await page.goto('https://seller.thaimart.com/products', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3000); // Wait for page to settle

      // Search for product
      const searchInput = page.getByPlaceholder(/ค้นหา|ชื่อสินค้า|รหัสสินค้า/i).first();
      if (await searchInput.isVisible()) {
        await searchInput.fill(product.name.substring(0, 30));
        await searchInput.press('Enter');
        await page.waitForTimeout(3000); // wait for results
      } else {
        console.log("Warning: Could not find search box, skipping search.");
      }

      // Click Edit button
      // Look for a link or button that says 'แก้ไข' (Edit) in the row that has the product name
      const editBtn = page.getByRole('link', { name: /แก้ไข|Edit/i }).first();
      // Alternatively, try to find an 'Edit' button
      if (await editBtn.isVisible()) {
        await editBtn.click();
      } else {
        const btn = page.locator('button, a').filter({ hasText: /แก้ไข|Edit/i }).first();
        if (await btn.isVisible()) {
          await btn.click();
        } else {
          console.log(`ไม่พบปุ่มแก้ไขสำหรับสินค้า: ${product.name}`);
          continue;
        }
      }
      
      await page.waitForTimeout(4000); // Wait for edit page to load

      // Upload missing images (Start from index 1)
      console.log("Downloading new images...");
      // Max 4 new images (Thaimart usually max 5 total, we already have 1)
      const imagesToUpload = product.images.slice(1, 5);
      const imgPaths = [];
      
      for (let j = 0; j < imagesToUpload.length; j++) {
        const imgUrl = imagesToUpload[j];
        const imgPath = path.join(TEMP_IMG_DIR, `temp_${product.id}_${j}.jpg`);
        await downloadImage(imgUrl, imgPath);
        imgPaths.push(imgPath);
      }
      
      console.log("Uploading images sequentially...");
      const fileInput = await page.$('input[type="file"]');
      if (fileInput) {
        for (const imgPath of imgPaths) {
          console.log(`Uploading ${imgPath}...`);
          await fileInput.setInputFiles(imgPath);
          await page.waitForTimeout(3000);
        }
      } else {
        console.log("Warning: Could not find image upload input.");
      }
      
      // Clean up temp images
      for (const imgPath of imgPaths) {
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }

      // Toggle status to "เปิดใช้งาน" (Enable)
      console.log("Setting status to Enabled...");
      // The switch might be a button with aria-checked="false", or label "ปิดใช้งาน"
      // Let's look for a switch near "สถานะสินค้า"
      const statusSwitch = page.getByRole('switch').last();
      if (await statusSwitch.isVisible()) {
        const isChecked = await statusSwitch.getAttribute('aria-checked');
        if (isChecked === 'false') {
          await statusSwitch.click();
          await page.waitForTimeout(1000);
        }
      } else {
         // Try clicking label if switch role fails
         await page.getByText(/ปิดใช้งาน/i).last().click().catch(() => {});
      }

      // Submit
      console.log("Submitting...");
      const publishBtn = page.getByRole('button', { name: /บันทึก|เผยแพร่|อัปเดต|Submit/i }).last();
      await publishBtn.click();

      // Handle confirmation popup ("ใช่")
      console.log("Waiting for confirmation popup...");
      await page.waitForTimeout(2000);
      const confirmBtn = page.getByRole('button', { name: /ยืนยัน|ตกลง|บันทึก|ใช่|Yes/i }).last();
      if (await confirmBtn.isVisible()) {
        console.log("Clicking confirmation...");
        await confirmBtn.click();
      }

      await page.waitForTimeout(4000); 
      console.log("Success!");

    } catch (err) {
      console.error(`Error updating product ${product.id}:`, err.message);
    }
  }

  console.log("Finished updating all products.");
  rl.close();
  await browserContext.close();
}

run().catch(console.error);
