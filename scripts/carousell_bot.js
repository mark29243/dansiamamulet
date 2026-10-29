const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const listings = JSON.parse(fs.readFileSync('C:/Users/mark2/Downloads/Carousell_Listings/curated_listings.json', 'utf8'));

async function openCarousell() {
  console.log('Launching Chrome with Carousell Sell page...');
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
    args: ['--start-maximized']
  });
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();
  await page.goto('https://www.carousell.sg/sell/');
  console.log('Opened https://www.carousell.sg/sell/');
  console.log('Keep this browser window open to list items!');
}

const args = process.argv.slice(2);
if (args.includes('--open')) {
  openCarousell().catch(console.error);
} else {
  console.log('Carousell Bot Helper:');
  console.log('Run with --open to launch Chrome directly to Carousell Sell page.');
}
