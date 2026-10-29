const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PROFILE_DIR = 'C:/Users/mark2/.carousell-bot-profile';
const listings = JSON.parse(fs.readFileSync('C:/Users/mark2/Downloads/Carousell_Listings/curated_listings.json', 'utf8'));

async function main() {
  console.log('>>> Launching Chrome for Carousell login...');
  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    headless: false,
    channel: 'chrome',
    viewport: null,
    args: ['--start-maximized']
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
  
  console.log('>>> Navigating to Carousell Login page...');
  await page.goto('https://www.carousell.sg/login/', { waitUntil: 'domcontentloaded' });
  console.log('>>> Chrome is now open on your screen! Please log in to Carousell.');

  // Monitor login status
  let isLoggedIn = false;
  while (!isLoggedIn) {
    await page.waitForTimeout(3000);
    const currentUrl = page.url();

    // Check if user has navigated past login (e.g. to home, profile, or sell)
    const isPastLogin = !currentUrl.includes('/login') && !currentUrl.includes('/signup');
    if (isPastLogin) {
      // Check for user indicators
      const hasSellBtn = await page.$('a[href*="/sell"], button:has-text("Sell"), [data-testid="header-sell-btn"]');
      const hasAvatar = await page.$('[data-testid="header-avatar"], [aria-label*="profile" i], img[alt*="avatar" i]');
      
      if (hasSellBtn || hasAvatar || currentUrl.includes('/sell')) {
        isLoggedIn = true;
        console.log(`\n🎉 User logged in successfully! Current URL: ${currentUrl}`);
        break;
      }
    }
  }

  // Once logged in, navigate to Sell page if not already there
  if (!page.url().includes('/sell')) {
    console.log('>>> Navigating to Carousell Sell page...');
    await page.goto('https://www.carousell.sg/sell/', { waitUntil: 'domcontentloaded' });
  }

  console.log('>>> Ready on Carousell Sell page! Waiting for user instruction or ready to list items.');
  
  // Keep alive
  while (true) {
    await page.waitForTimeout(5000);
  }
}

main().catch(err => {
  console.error('Error in runner:', err);
});
