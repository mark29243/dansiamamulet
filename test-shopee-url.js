function extractIds(url) {
  // Pattern 1: i.SHOP_ID.ITEM_ID
  const match1 = url.match(/i\.(\d+)\.(\d+)/);
  if (match1) return { shopId: match1[1], itemId: match1[2] };

  // Pattern 2: product/SHOP_ID/ITEM_ID
  const match2 = url.match(/\/product\/(\d+)\/(\d+)/);
  if (match2) return { shopId: match2[1], itemId: match2[2] };

  return null;
}

const urls = [
  'https://shopee.co.th/product-name-i.123.456',
  'https://shopee.co.th/product/123/456',
  'https://th.shp.ee/abcde',
  'https://shopee.co.th/abc-i.123.456?sp_atk=xxx',
  'shopee.co.th/product/123/456?c=1',
  'https://shopee.co.th/product-i.12345.67890'
];

for (const u of urls) {
  console.log(u, '=>', extractIds(u));
}
