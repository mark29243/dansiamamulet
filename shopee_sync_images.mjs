import { chromium } from 'playwright-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
chromium.use(stealthPlugin());
import { createClient } from '@supabase/supabase-js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

// Load environment variables
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  }
});

const TEMP_IMG_DIR = path.join(process.cwd(), 'temp_shopee_images');
if (!fs.existsSync(TEMP_IMG_DIR)) fs.mkdirSync(TEMP_IMG_DIR);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

async function downloadImage(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  return { buffer, type: res.headers.get('content-type') || 'image/jpeg' };
}

async function uploadToR2(key, buffer, contentType) {
  await s3Client.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }));
  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

async function main() {
  console.log("=== Shopee Image Sync Bot ===");
  const shopChoice = await askQuestion("เลือกร้านที่ต้องการดึงรูป (พิมพ์ 1 สำหรับ Shopee ร้านหลัก, พิมพ์ 2 สำหรับ Shopee ร้าน 2): ");
  const isShop2 = shopChoice.trim() === '2';

  console.log(`\nกำลังดึงข้อมูลสินค้าที่มี 1 รูป จากร้าน ${isShop2 ? '2' : '1'}...`);
  
  const { data: allProducts, error } = await supabase
    .from('shopee_products')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    return;
  }

  // Filter products with exactly 1 image and matching shop
  const products = allProducts.filter(p => {
    const matchShop = isShop2 ? p.mark_shopee2 === true : !p.mark_shopee2;
    return matchShop && p.images && p.images.length === 1 && (!p.mark_location || p.mark_location.toLowerCase() !== 'sold');
  });

  console.log(`พบสินค้าที่ต้องอัปเดตรูปภาพ: ${products.length} รายการ`);
  if (products.length === 0) return;

  console.log("กำลังเปิดเบราว์เซอร์...");
  // Use a local folder for the bot's Chrome profile to avoid conflicting with the user's main Chrome.
  // The user will need to log in to Shopee once, and it will be saved here.
  const userDataDir = path.join(process.cwd(), 'chrome_profile_shopee');
  
  let browserContext;
  try {
    browserContext = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      channel: 'chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  } catch (err) {
    console.error("ไม่สามารถเปิด Chrome ได้:", err.message);
    return;
  }

  const page = browserContext.pages()[0] || await browserContext.newPage();
  
  // Stealth plugin handles webdriver bypass automatically

  // Navigate to seller center and let user login
  console.log("กำลังเปิดหน้าต่าง Shopee...");
  await page.goto('https://seller.shopee.co.th/', { waitUntil: 'domcontentloaded' });
  
  // Wait for user to manually confirm login
  await askQuestion("\n*** สำคัญมาก ***\nกรุณาล็อกอินเข้าระบบ Shopee ให้เสร็จสมบูรณ์ (สแกน QR หรือใส่รหัสให้ผ่านหน้า Verify)\nหากล็อกอินเสร็จแล้ว ให้กด Enter ที่นี่เพื่อเริ่มให้บอทดึงรูปภาพ...");
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`\n[${i + 1}/${products.length}] กำลังค้นหา: ${product.name}`);
    
    try {
      await page.goto('https://seller.shopee.co.th/portal/product/list/all', { waitUntil: 'domcontentloaded', timeout: 60000 });
      
      // Wait for search input
      const searchInput = page.getByPlaceholder('ค้นหา').first();
      await searchInput.waitFor({ state: 'visible', timeout: 30000 });
      
      // Determine search keyword (use Shopee ID if it's a number, else use first 30 chars of name)
      let searchKeyword = product.name.substring(0, 30).trim();
      if (product.name_shopee && /^\d+$/.test(product.name_shopee)) {
        searchKeyword = product.name_shopee;
      }
      
      // Clear and type search keyword
      await searchInput.fill('');
      await searchInput.pressSequentially(searchKeyword, { delay: 50 });
      await searchInput.press('Enter');
      
      await page.waitForTimeout(4000); // Wait for search results
      
      // Look for the edit button or product link - just get the first result's name
      const productLink = page.locator('.product-name, .name-wrapper').first();
      
      if (await productLink.isVisible()) {
        console.log("พบสินค้า, กำลังเข้าไปดูรายละเอียด...");
        
        // Shopee opens the edit page in a NEW TAB. We must wait for it.
        const [newPage] = await Promise.all([
          browserContext.waitForEvent('page'),
          productLink.click()
        ]);
        
        // Wait for edit page to load (look for image section)
        await newPage.waitForTimeout(5000);
        
        // Find images
        console.log("กำลังดึง URL รูปภาพ...");
        
        // Extract images using a precise DOM search inside the browser
        let rawImages = await newPage.evaluate(() => {
           let urls = [];
           // Look for the label "ภาพสินค้า" or "Product Images"
           const labels = Array.from(document.querySelectorAll('label, div, span'));
           const targetLabel = labels.find(l => 
               l.textContent && 
               (l.textContent.includes('ภาพสินค้า') || l.textContent.includes('Product Images')) &&
               !l.children.length // find the most specific element
           );
           
           let container = document.body;
           if (targetLabel) {
               // Find the closest parent that contains both the label and the image list
               container = targetLabel.closest('.product-edit-item') || targetLabel.closest('.form-item') || targetLabel.closest('.panel') || document.body;
           }

           // Find images (Shopee changed classes to shopee-image-manager__image, so we grab all imgs and let the URL filter handle it)
           const imgs = container.querySelectorAll('img');
           imgs.forEach(img => {
               if (img.src && !img.src.includes('data:image')) urls.push(img.src);
           });
           
           const bgs = container.querySelectorAll('div[style*="background-image"]');
           bgs.forEach(bg => {
               const match = bg.style.backgroundImage.match(/url\("?([^"\)]+)"?\)/);
               if (match && match[1] && !match[1].includes('data:image')) urls.push(match[1]);
           });
           
           return urls;
        });

        // Clean URLs and enforce loose regex to reject UI elements and icons
        let cleanUrls = rawImages
           .filter(url => {
              // Real images are stored on Shopee's user content CDNs
              const isShopeeCDN = url.includes('cf.shopee.co.th') || url.includes('susercontent.com') || url.includes('/file/');
              const isStaticAsset = url.includes('deo.shopeemobile.com') || url.includes('static') || url.includes('assets');
              return isShopeeCDN && !isStaticAsset && !url.includes('icon') && !url.includes('logo') && !url.includes('sprite');
           })
           .map(url => url.replace(/_tn$/, '').replace(/_tn\./, '.')); // handle both _tn at end and _tn.jpg
           
        // Deduplicate using the file hash/ID to perfectly eliminate preview pane duplicates
        const uniqueHashes = new Set();
        let newImages = [];
        for (const url of cleanUrls) {
           // Shopee file IDs can be 32 hex chars or new format like sg-11134201-...
           const hashMatch = url.match(/\/file\/([a-zA-Z0-9-]+)/i);
           const hash = hashMatch ? hashMatch[1] : url; // fallback to full url if no match
           if (!uniqueHashes.has(hash)) {
              uniqueHashes.add(hash);
              newImages.push(url);
           }
        }
        
        // Shopee allows max 9 main images.
        if (newImages.length > 9) {
           newImages = newImages.slice(0, 9);
        }
        
        if (newImages.length > 1) {
          console.log(`พบรูปภาพทั้งหมด ${newImages.length} รูป, กำลังดาวน์โหลดและอัปโหลดไปยังระบบของเรา...`);
          const uploadedR2Urls = [];
          
          for (let j = 0; j < newImages.length; j++) {
            const highResUrl = newImages[j];
            
            const ext = highResUrl.split('.').pop()?.split('?')[0] || 'jpg';
            const finalExt = ['jpg', 'jpeg', 'png', 'webp'].includes(ext.toLowerCase()) ? ext.toLowerCase() : 'jpg';
            const key = `products/shopee-${Date.now()}-${j}.${finalExt}`;
            const tempDest = path.join(TEMP_IMG_DIR, `temp_${Date.now()}.${finalExt}`);
            
            try {
              const { buffer, type } = await downloadImage(highResUrl, tempDest);
              const r2Url = await uploadToR2(key, buffer, type);
              uploadedR2Urls.push(r2Url);
              fs.unlinkSync(tempDest);
            } catch (err) {
              console.error(`Error uploading image ${j}:`, err.message);
            }
          }
          
          if (uploadedR2Urls.length > 0) {
             console.log("อัปเดตฐานข้อมูล...");
             const { error: updateErr } = await supabase
               .from('shopee_products')
               .update({ images: uploadedR2Urls })
               .eq('id', product.id);
               
             if (updateErr) {
               console.error("อัปเดตล้มเหลว:", updateErr.message);
             } else {
               console.log("สำเร็จ!");
             }
          }
        } else {
          console.log("ไม่พบรูปภาพเพิ่มเติมหรือมีแค่รูปเดียว");
        }
        
        // Close the new tab so we don't end up with 100 open tabs
        await newPage.close();
      } else {
        console.log("ไม่พบสินค้าในผลลัพธ์การค้นหา หรือชื่ออาจจะไม่ตรงกันเป๊ะ 100%");
      }
      
    } catch (error) {
      console.error(`Error processing ${product.name}:`, error.message);
    }
  }

  console.log("จบการทำงาน");
  rl.close();
  await browserContext.close();
}

main();
