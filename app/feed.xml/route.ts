import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dansiamamulets.com';
  const supabase = createClient();

  const { data: products } = await supabase
    .from('products')
    .select('id, name, name_th, slug, price, sale_price, stock, category, description, images')
    .eq('published', true)
    .gt('stock', 0)
    .order('id', { ascending: true });

  const items = (products ?? []).map((p) => {
    const url = `${baseUrl}/product/${p.slug}`;
    const imageUrl = (p.images as string[] | null)?.[0] ?? '';
    const effectivePrice = (p.sale_price && p.sale_price < p.price) ? p.sale_price : p.price;
    const priceStr = effectivePrice.toFixed(2) + ' THB';
    const name = p.name_th || p.name;
    const desc = p.description || name;
    const descFinal = escapeXml(desc.length > 0 ? desc : name);
    const titleFinal = escapeXml(name);
    const category = escapeXml(p.category || 'เครื่องราง');

    return `  <item>
    <g:id>${p.id}</g:id>
    <title>${titleFinal}</title>
    <description>${descFinal}</description>
    <link>${url}</link>
    <g:price>${priceStr}</g:price>
    <g:image_link>${imageUrl}</g:image_link>
    <g:availability>in stock</g:availability>
    <g:condition>used</g:condition>
    <g:product_type>${category}</g:product_type>
    <g:brand>Dan Siam Amulets</g:brand>
    <g:identifier_exists>no</g:identifier_exists>
  </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Dan Siam Amulets</title>
    <link>${baseUrl}</link>
    <description>พระเครื่องและเครื่องรางของขลัง</description>
${items.join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}