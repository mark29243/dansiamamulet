import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

function escapeCsv(str: string | number | null | undefined): string {
  if (str === null || str === undefined) return '""';
  const escaped = String(str).replace(/"/g, '""');
  return `"${escaped}"`;
}

export async function GET(req: Request) {
  const supabase = createClient();
  
  // Determine base URL dynamically
  const host = req.headers.get('host') || 'dansiam-amulets.com';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  // Fetch only published products that are in stock
  const { data: products, error } = await supabase
    .from('products')
    .select('id, legacy_id, slug, name, name_th, description, description_th, price, sale_price, stock, images')
    .eq('published', true)
    .gt('stock', 0);

  if (error) {
    console.error('Failed to fetch products for Facebook feed:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }

  // Facebook standard columns
  const headers = [
    'id', 
    'title', 
    'description', 
    'availability', 
    'condition',
    'price', 
    'link', 
    'image_link', 
    'brand', 
    'inventory'
  ];

  const rows = [headers.join(',')];

  for (const product of products || []) {
    const id = product.legacy_id || product.id;
    const title = product.name_th || product.name;
    const desc = product.description_th || product.description || title;
    
    // Facebook expects price format: "100.00 THB"
    // Use sale_price if it exists, otherwise use regular price
    const currentPrice = product.sale_price || product.price;
    const priceStr = `${(currentPrice / 100).toFixed(2)} THB`;
    
    const link = `${baseUrl}/product/${product.slug}`;
    const imageLink = product.images && product.images.length > 0 ? product.images[0] : '';

    // Facebook requires an image. If a product doesn't have one, skip it.
    if (!imageLink) continue;

    const row = [
      escapeCsv(id),
      escapeCsv(title.substring(0, 150)), // Max 150 chars
      escapeCsv(desc.substring(0, 5000)), // Max 5000 chars
      'in stock',
      'new',
      escapeCsv(priceStr),
      escapeCsv(link),
      escapeCsv(imageLink),
      escapeCsv('Dansiamamulets'),
      product.stock
    ];

    rows.push(row.join(','));
  }

  const csvContent = rows.join('\n');

  // Return as a downloadable CSV file
  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="facebook_catalog.csv"',
      // Cache for 1 hour to prevent DB spam from Facebook bots
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  });
}
