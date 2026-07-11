import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  return !!data;
}

function extractIds(url: string): { shopId: string; itemId: string } | null {
  // Pattern 1: i.SHOP_ID.ITEM_ID
  const match1 = url.match(/i\.(\d+)\.(\d+)/);
  if (match1) return { shopId: match1[1], itemId: match1[2] };

  // Pattern 2: product/SHOP_ID/ITEM_ID
  const match2 = url.match(/\/product\/(\d+)\/(\d+)/);
  if (match2) return { shopId: match2[1], itemId: match2[2] };

  return null;
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 120);
}

// Try Shopee's internal API with cookie-like headers
async function tryShopeeApi(shopId: string, itemId: string) {
  const apiUrl = `https://shopee.co.th/api/v4/item/get?itemid=${itemId}&shopid=${shopId}`;
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
  if (!res.ok) return null;
  const json = await res.json();
  return json?.data?.item ?? null;
}

// Fallback: scrape product page HTML and extract __NEXT_DATA__ or window.__pageData
async function tryScrapePage(shopId: string, itemId: string) {
  // Shopee product page URL format
  const pageUrl = `https://shopee.co.th/product/${shopId}/${itemId}`;
  const res = await fetch(pageUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'th-TH,th;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      'Referer': 'https://shopee.co.th/',
    },
  });
  if (!res.ok) return null;
  const html = await res.text();

  // Try to find __NEXT_DATA__
  const nextDataMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (nextDataMatch) {
    try {
      const nextData = JSON.parse(nextDataMatch[1]);
      // Navigate the NEXT_DATA structure to find item data
      const props = nextData?.props?.pageProps;
      if (props?.initialData?.data?.item) return props.initialData.data.item;
      if (props?.data?.item) return props.data.item;
    } catch {}
  }

  // Try window.__pageData or similar embedded JSON patterns
  const pageDataMatch = html.match(/window\.__pageData\s*=\s*({[\s\S]*?});/);
  if (pageDataMatch) {
    try {
      const pageData = JSON.parse(pageDataMatch[1]);
      if (pageData?.item) return pageData.item;
    } catch {}
  }

  return null;
}

// Extract product data from Seller Center URL via API
async function trySellerCenterUrl(url: string) {
  // seller.shopee.co.th/portal/product/ITEMID → extract itemId
  const sellerMatch = url.match(/portal\/product\/(\d+)/);
  if (!sellerMatch) return null;
  const itemId = sellerMatch[1];

  // Try Shopee search API to find by item ID
  const searchUrl = `https://shopee.co.th/api/v4/search/search_items?by=relevancy&keyword=${itemId}&limit=1&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2`;
  const res = await fetch(searchUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://shopee.co.th/',
      'x-api-source': 'pc',
    },
  });
  if (!res.ok) return null;
  const json = await res.json();
  const items = json?.data?.items;
  if (!items?.length) return null;
  const found = items.find((i: any) => String(i.item_basic?.itemid) === itemId);
  return found?.item_basic ?? items[0]?.item_basic ?? null;
}

export async function POST(req: Request) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

  let finalUrl = url;
  if (url.includes('shp.ee')) {
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'follow' });
      finalUrl = res.url;
    } catch (e) {
      console.error('Failed to expand short url:', e);
    }
  }

  const ids = extractIds(finalUrl);
  if (!ids) return NextResponse.json({ error: 'Cannot parse Shopee URL — must contain i.SHOPID.ITEMID' }, { status: 400 });

  // Try API first, then page scrape
  let item = await tryShopeeApi(ids.shopId, ids.itemId);

  if (!item) {
    item = await tryScrapePage(ids.shopId, ids.itemId);
  }

  if (!item) {
    return NextResponse.json({ error: 'Shopee blocked the request. Please use the Manual Entry tab below.' }, { status: 502 });
  }

  // Price: Shopee stores in units of 1/100000 THB
  const rawPrice = item.price ?? item.price_min ?? item.price_before_discount ?? 0;
  const priceTHB = Math.round(rawPrice / 100000);
  const priceSatang = priceTHB * 100;

  // Images: hashes → full CDN URLs
  const images: string[] = (item.images ?? []).map(
    (hash: string) => `https://down-th.img.susercontent.com/file/${hash}`
  );

  const slug = toSlug(item.name ?? '');

  return NextResponse.json({
    name: item.name ?? '',
    name_th: item.name ?? '',
    slug,
    price: priceSatang,
    stock: item.stock ?? 1,
    description: item.description ?? '',
    description_th: item.description ?? '',
    short: (item.description ?? '').slice(0, 200),
    images,
    shopId: ids.shopId,
    itemId: ids.itemId,
  });
}
