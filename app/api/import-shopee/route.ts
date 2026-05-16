import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function extractIds(url: string): { shopId: string; itemId: string } | null {
  const match = url.match(/i\.(\d+)\.(\d+)/);
  if (!match) return null;
  return { shopId: match[1], itemId: match[2] };
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 120);
}

export async function POST(req: Request) {
  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

  const ids = extractIds(url);
  if (!ids) return NextResponse.json({ error: 'Cannot parse Shopee URL — must contain i.SHOPID.ITEMID' }, { status: 400 });

  const apiUrl = `https://shopee.co.th/api/v4/item/get?itemid=${ids.itemId}&shopid=${ids.shopId}`;

  const res = await fetch(apiUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Referer': 'https://shopee.co.th/',
      'Accept': 'application/json',
      'x-api-source': 'pc',
      'x-shopee-language': 'th',
    },
  });

  if (!res.ok) return NextResponse.json({ error: `Shopee API error: ${res.status}` }, { status: 502 });

  const json = await res.json();
  const item = json?.data?.item;
  if (!item) return NextResponse.json({ error: 'No item data returned from Shopee' }, { status: 404 });

  // Price: Shopee stores in "cents" (divide by 100000 for THB)
  const priceTHB = Math.round((item.price ?? item.price_min ?? 0) / 100000);
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
