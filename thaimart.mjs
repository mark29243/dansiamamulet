import { createClient } from '@supabase/supabase-js';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import sharp from 'sharp';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// No longer need JSON progress file since we use DB
// const PROGRESS_FILE = path.join(process.cwd(), 'thaimart_progress.json');
const TEMP_IMG_DIR = path.join(process.cwd(), 'temp_images');

if (!fs.existsSync(TEMP_IMG_DIR)) {
  fs.mkdirSync(TEMP_IMG_DIR);
}

// function loadProgress() ...
// function saveProgress(uploadedIds) ...

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
  const buffer = await res.buffer();
  // Ensure it's converted to jpeg since Thaimart only accepts JPG/JPEG/PNG
  await sharp(buffer)
    .jpeg({ quality: 80 })
    .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true }) // Prevent too large images
    .toFile(destPath);
}

async function run() {
  console.log("Fetching products from Supabase...");
  // Fetch products from 'shopee_products' which powers /staff/stock
  // Only fetch those that haven't been marked as thaimart yet
  const { data: products, error } = await supabase
    .from('shopee_products')
    .select('*')
    .eq('mark_thaimart', false)
    .order('id', { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    return;
  }

  // Filter out products that are out of stock or marked as Sold
  const productsToUpload = (products || []).filter(p => {
    if (p.stock <= 0) return false;
    if (p.mark_location && p.mark_location.toLowerCase() === 'sold') return false;
    return true;
  });

  console.log(`Found ${productsToUpload.length} products remaining to upload (in-stock only).`);

  if (productsToUpload.length === 0) {
    console.log("All products uploaded!");
    return;
  }

  console.log("Launching browser...");
  // Launch in non-headless mode so user can login and see the process
  // We use the system Chrome (channel: 'chrome') because the disk is full and cannot download Chromium
  const browser = await chromium.launch({ headless: false, channel: 'chrome', defaultViewport: null });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("Please log in to Thaimart.");
  await page.goto('https://seller.thaimart.com');
  
  // Wait for the user to log in and navigate to the create page manually, or just wait for them to press Enter
  console.log(">>> ACTION REQUIRED <<<");
  console.log("1. Log in to Thaimart in the opened browser window.");
  console.log("2. After you are logged in and see the dashboard, press ENTER in this terminal to start uploading.");
  
  await new Promise(resolve => {
    process.stdin.once('data', () => resolve());
  });

  for (const product of productsToUpload) {
    console.log(`\n--- Uploading Product ID: ${product.id} - ${product.name} ---`);
    try {
      await page.goto('https://seller.thaimart.com/products/create', { waitUntil: 'networkidle' });

      // 1. Name
      const thName = product.name_th || product.name;
      const nameInput = page.getByPlaceholder('ระบุชื่อสินค้า');
      await nameInput.waitFor({ state: 'visible' });
      await nameInput.fill(thName.substring(0, 255));
      await page.waitForTimeout(1000); // Wait for validation
      
      // 2. Category
      // This part requires clicking through a tree, which might be tricky dynamically.
      // Usually "เครื่องประดับ > เครื่องรางและวัตถุมงคล > พระเครื่อง / วัตถุมงคล"
      console.log("Selecting category...");
      const catTrigger = page.locator('text=เลือกหมวดหมู่สินค้า').first();
      if (await catTrigger.isVisible()) {
        await catTrigger.click();
        await page.waitForTimeout(1000); // Wait for modal
        
        await page.getByText('เครื่องประดับ', { exact: true }).click().catch(() => {});
        await page.waitForTimeout(500);
        await page.getByText('เครื่องรางและวัตถุมงคล', { exact: true }).click().catch(() => {});
        await page.waitForTimeout(500);
        await page.getByText('พระเครื่อง / วัตถุมงคล', { exact: true }).click().catch(() => {});
        await page.waitForTimeout(1000); // Wait for category to be set
      }
      await page.waitForTimeout(500);
      
      // Some sites require a confirm button after category selection
      const confirmCategoryBtn = page.getByRole('button', { name: 'ยืนยัน' });
      if (await confirmCategoryBtn.isVisible()) {
        await confirmCategoryBtn.click();
      }

      // 3. Image
      if (product.images && product.images.length > 0) {
        // Limit to max 5 images to prevent rate limit/network errors
        const maxImages = Math.min(product.images.length, 5);
        console.log(`Downloading ${maxImages} images...`);
        const imgPaths = [];
        for (let i = 0; i < maxImages; i++) {
          const imgUrl = product.images[i];
          // Always save as .jpg because we are converting with sharp
          const imgPath = path.join(TEMP_IMG_DIR, `temp_${product.id}_${i}.jpg`);
          await downloadImage(imgUrl, imgPath);
          imgPaths.push(imgPath);
        }
        
        console.log("Uploading images sequentially...");
        const fileInput = await page.$('input[type="file"]');
        if (fileInput) {
          // Upload sequentially to avoid triggering "upload storage failed: network error"
          for (const imgPath of imgPaths) {
            console.log(`Uploading ${imgPath}...`);
            await fileInput.setInputFiles(imgPath);
            await page.waitForTimeout(3000); // Wait 3 seconds per image for Ajax upload to finish
          }
        } else {
          console.log("Warning: Could not find image upload input.");
        }
        await page.waitForTimeout(2000); // Wait for upload preview
        
        // Clean up temp images
        for (const imgPath of imgPaths) {
          if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }
      }

      // 4. Description
      const desc = product.description_th || product.description || product.name_th || product.name;
      const descField = page.getByPlaceholder('ระบุรายละเอียดสินค้า');
      if (await descField.isVisible()) {
        await descField.fill(desc.substring(0, 5000));
        await page.waitForTimeout(1000);
      } else {
        // Fallback to finding a textarea
        await page.locator('textarea').first().fill(desc.substring(0, 5000));
        await page.waitForTimeout(1000);
      }

      // 5. Price
      const priceStr = product.price.toString();
      const priceField = page.getByPlaceholder('ระบุราคา').first();
      if (await priceField.isVisible()) {
        await priceField.focus();
        await priceField.clear();
        await priceField.pressSequentially(priceStr, { delay: 150 });
        await page.waitForTimeout(1000);
      } else {
        const numInputs = await page.locator('input[type="number"]').all();
        if (numInputs.length > 0) {
          await numInputs[0].focus();
          await numInputs[0].clear();
          await numInputs[0].pressSequentially(priceStr, { delay: 150 });
          await page.waitForTimeout(1000);
        }
      }

      // 6. Stock
      // Usually there is a stock input next to price
      // We can try to find it by placeholder or similar
      const stockInputs = await page.locator('input[type="number"]').all();
      if (stockInputs.length > 1) {
        // Assume second number input is stock
        await stockInputs[1].fill((product.stock || 1).toString());
        await page.waitForTimeout(1000);
      } else {
        await page.getByPlaceholder('ระบุสต็อก').fill((product.stock || 1).toString());
        await page.waitForTimeout(1000);
      }

      // 7. Shipping / Dimensions
      console.log("Filling dimensions...");
      
      const weightField = page.getByPlaceholder(/ระบุน้ำหนัก|น้ำหนัก/).first();
      if (await weightField.isVisible()) {
        await weightField.focus();
        await weightField.clear();
        await weightField.pressSequentially('100', { delay: 100 }); // Weight is in grams (กรัม)
        await page.waitForTimeout(500);
      } else {
        await page.getByPlaceholder(/น้ำหนัก/).fill('100').catch(() => {});
      }

      await page.getByPlaceholder(/กว้าง/).fill('10').catch(() => {});
      await page.waitForTimeout(500);
      await page.getByPlaceholder(/ยาว/).fill('16').catch(() => {});
      await page.waitForTimeout(500);
      await page.getByPlaceholder(/สูง/).fill('9').catch(() => {});
      await page.waitForTimeout(500);

      // 8. Submit
      console.log("Submitting...");
      // Click the save/publish button. The text might be "บันทึก", "บันทึกและเผยแพร่", or "Submit"
      const publishBtn = page.getByRole('button', { name: /บันทึก|เผยแพร่|Submit/i }).last();
      await publishBtn.click();

      // Handle the confirmation popup
      console.log("Waiting for confirmation popup...");
      await page.waitForTimeout(2000); // Give it a moment to animate
      const confirmBtn = page.getByRole('button', { name: /ยืนยัน|ตกลง|บันทึก|ใช่|Yes/i }).last();
      if (await confirmBtn.isVisible()) {
        console.log("Clicking confirmation...");
        await confirmBtn.click();
      }

      // Wait for success indication (e.g. redirect to product list or success message)
      await page.waitForTimeout(5000); 

      // Save progress to DB
      console.log(`Updating mark_thaimart for product ID: ${product.id}...`);
      const { error: updateErr } = await supabase
        .from('shopee_products')
        .update({ mark_thaimart: true })
        .eq('id', product.id);
        
      if (updateErr) {
        console.error(`Failed to update DB for ${product.id}:`, updateErr);
      } else {
        console.log("Success!");
      }

    } catch (err) {
      console.error(`Error uploading product ${product.id}:`, err);
      console.log("Pausing for 30 seconds so you can inspect. Press Ctrl+C to abort.");
      await page.waitForTimeout(30000);
    }
  }

  console.log("Finished uploading all products.");
  await browser.close();
}

run().catch(console.error);
