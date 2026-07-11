async function resolveShopeeUrl(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      }
    });
    console.log('Final URL:', res.url);
  } catch (err) {
    console.error('Error:', err);
  }
}

resolveShopeeUrl('https://th.shp.ee/7pvknd77');
