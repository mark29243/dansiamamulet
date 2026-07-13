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
  console.log("=== June Thaimart Update Bot ===");
  console.log("Fetching products from Supabase (june_products)...");
  
  // Fetch products that are ALREADY on Thaimart
  const { data: allProducts, error } = await supabase
    .from('june_products')
    .select('*')
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

  const startIndexStr = await askQuestion(`\nพบสินค้าทั้งหมด ${products.length} รายการ\nเริ่มทำจากรายการที่เท่าไหร่? (พิมพ์ตัวเลข 1-${products.length} แล้วกด Enter / หากเริ่มจากแรกสุดพิมพ์ 1): `);
  let startIndex = parseInt(startIndexStr);
  if (isNaN(startIndex) || startIndex < 1) startIndex = 1;
  console.log(`\n=> จะเริ่มทำจากรายการที่ ${startIndex} เป็นต้นไป...\n`);

  console.log("กำลังเปิดเบราว์เซอร์...");
  const userDataDir = path.join(process.cwd(), 'chrome_profile_june_thaimart');
  
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
  
  for (let i = startIndex - 1; i < products.length; i++) {
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

      // Check and click "เผยแพร่สินค้า" on the list page if it exists
      console.log("Checking if product needs publishing...");
      const publishBtnOnList = page.getByText('เผยแพร่สินค้า').first();
      if (await publishBtnOnList.isVisible()) {
        console.log("Clicking 'เผยแพร่สินค้า'...");
        await publishBtnOnList.click();
        await page.waitForTimeout(2000);
        // Handle confirmation popup if any
        const confirmBtn = page.getByRole('button', { name: /ยืนยัน|ตกลง|บันทึก|ใช่|Yes/i }).last();
        if (await confirmBtn.isVisible()) {
           await confirmBtn.click();
           await page.waitForTimeout(2000);
        }
      }

      // We need to click the product to view details (this page has the upload inputs)
      console.log("Clicking 'ดูรายละเอียด' to view details...");
      
      const detailBtn = page.getByText('ดูรายละเอียด').first();
      if (await detailBtn.isVisible()) {
        await detailBtn.click();
        await page.waitForTimeout(4000); // Wait for details page to load
      } else {
        const btn = page.locator('button, a').filter({ hasText: /ดูรายละเอียด|Details/i }).first();
        if (await btn.isVisible()) {
          await btn.click();
          await page.waitForTimeout(4000); // Wait for details page to load
        } else {
          console.log(`ไม่พบปุ่ม 'ดูรายละเอียด' สำหรับสินค้า: ${product.name}`);
          continue; // Skip this product if we can't view details
        }
      }

      // Click Edit button
      console.log("Clicking 'แก้ไข' (Edit)...");
      const editBtn = page.getByText('แก้ไข').first();
      if (await editBtn.isVisible()) {
        await editBtn.click();
        await page.waitForTimeout(4000); // Wait for edit page to load
      } else {
        const btn = page.locator('button, a, span').filter({ hasText: /แก้ไข|Edit/i }).first();
        if (await btn.isVisible()) {
          await btn.click();
          await page.waitForTimeout(4000); // Wait for edit page to load
        } else {
          console.log(`ไม่พบปุ่ม 'แก้ไข' สำหรับสินค้า: ${product.name}`);
          continue;
        }
      }

      // Check existing images
      const existingImages = await page.$$eval('img', imgs => imgs.filter(img => img.src.includes('img-cdn.thaimart.com')).length);
      console.log(`พบรูปภาพที่มีอยู่แล้ว ${existingImages} รูป`);
      
      const targetImageCount = Math.min(product.images.length, 5);
      let imgPaths = [];

      if (existingImages >= targetImageCount) {
        console.log("รูปภาพครบแล้ว ข้ามการอัปโหลดรูปภาพ...");
      } else {
        // Upload missing images (Start from index: existingImages)
        console.log("Downloading new images...");
        const imagesToUpload = product.images.slice(existingImages, 5);
        
        for (let j = 0; j < imagesToUpload.length; j++) {
          const imgUrl = imagesToUpload[j];
          const imgPath = path.join(TEMP_IMG_DIR, `temp_${product.id}_${j}.jpg`);
          await downloadImage(imgUrl, imgPath);
          imgPaths.push(imgPath);
        }
        
        console.log("Uploading images...");
        const fileInput = await page.$('input[type="file"]');
        if (fileInput) {
          console.log(`Uploading ${imgPaths.length} images...`);
          await fileInput.setInputFiles(imgPaths);
          await page.waitForTimeout(3000);
        } else {
          console.log("Warning: Could not find image upload input.");
        }
        
        // Clean up temp images
        for (const imgPath of imgPaths) {
          if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }

        // Check for upload error popup
        const errorBtn = page.getByRole('button', { name: /รับทราบ/i }).first();
        if (await errorBtn.isVisible()) {
           console.log("Upload failed (network error popup). Skipping save for this product.");
           await errorBtn.click();
           continue; // Skip to next product
        }
      }

      // If we didn't upload any new images, we don't need to save
      if (existingImages >= targetImageCount) {
        console.log("No new images uploaded, skipping save...");
        continue;
      }

      // Submit
      console.log("Submitting...");
      const publishBtn = page.getByRole('button', { name: /บันทึก|อัปเดต|Submit/i }).last();
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
