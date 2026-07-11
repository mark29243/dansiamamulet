const { chromium } = require('playwright-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
chromium.use(stealthPlugin());
const path = require('path');
const fs = require('fs');

async function test() {
  const userDataDir = path.join(process.cwd(), 'chrome_profile_shopee');
  const browserContext = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    channel: 'chrome'
  });
  const page = await browserContext.newPage();
  
  await page.goto('https://seller.shopee.co.th/portal/product/43680063558', { waitUntil: 'networkidle' });
  console.log('Opened product page. Waiting 10s for images to load...');
  await page.waitForTimeout(10000);

  const images = await page.evaluate(() => {
     let results = [];
     
     document.querySelectorAll('img').forEach(img => {
        if(img.src && !img.src.includes('data:image')) {
            results.push({ type: 'img', src: img.src, className: img.className });
        }
     });
     
     document.querySelectorAll('div[style*="background-image"]').forEach(div => {
        const style = div.getAttribute('style');
        const match = style.match(/url\("?([^"\)]+)"?\)/);
        if (match && match[1] && !match[1].includes('data:image')) {
            results.push({ type: 'bg', src: match[1], className: div.className });
        }
     });
     
     return results;
  });
  
  fs.writeFileSync('shopee_images_dump.json', JSON.stringify(images, null, 2));
  console.log('Saved to shopee_images_dump.json');
  await browserContext.close();
}
test().catch(console.error);
