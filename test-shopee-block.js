async function testScrape(shopId, itemId) {
  const apiUrl = `https://shopee.co.th/api/v4/item/get?itemid=${itemId}&shopid=${shopId}`;
  console.log('Testing API:', apiUrl);
  const res = await fetch(apiUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Referer': `https://shopee.co.th/product/${shopId}/${itemId}`,
      'Accept': 'application/json',
      'Accept-Language': 'th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7',
      'x-api-source': 'pc',
      'x-shopee-language': 'th',
      'x-requested-with': 'XMLHttpRequest',
    },
  });
  
  console.log('API Status:', res.status);
  const text = await res.text();
  console.log('API Response snippet:', text.slice(0, 200));

  console.log('\n--- Testing HTML Scrape ---');
  const pageUrl = `https://shopee.co.th/product/${shopId}/${itemId}`;
  const res2 = await fetch(pageUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'th-TH,th;q=0.9',
      'Cache-Control': 'no-cache',
      'Referer': 'https://shopee.co.th/',
    },
  });
  console.log('HTML Status:', res2.status);
  const html = await res2.text();
  if (html.includes('__NEXT_DATA__')) console.log('Found __NEXT_DATA__');
  if (html.includes('window.__pageData')) console.log('Found window.__pageData');
  console.log('HTML Snippet:', html.slice(0, 300));
}

testScrape('868362639', '49063353929');
