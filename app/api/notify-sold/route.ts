import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { sendLineSoldNotification } from '@/lib/line';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Supabase Database Webhook format
    if (body.type === 'UPDATE' && (body.table === 'products' || body.table === 'shopee_products' || body.table === 'june_products')) {
      const oldRecord = body.old_record;
      const record = body.record;

      if (oldRecord && record && oldRecord.stock > 0 && record.stock === 0) {
        const result = await sendLineSoldNotification(record);
        return NextResponse.json(result, { headers: corsHeaders });
      }
      return NextResponse.json({ message: 'Ignored: stock did not transition from >0 to 0' }, { headers: corsHeaders });
    }

    // 2. Direct call from client or admin: { product_id } or { id }
    const productId = body.product_id || body.id || body.productId;
    if (!productId) {
      return NextResponse.json({ error: 'Missing product_id' }, { status: 400, headers: corsHeaders });
    }

    const table = body.table || 'products';
    const allowedTables = ['products', 'shopee_products', 'june_products'];
    const targetTable = allowedTables.includes(table) ? table : 'products';

    const admin = createAdminClient();
    const selectFields = targetTable === 'products'
      ? 'id, name, name_th, images, storage_location, name_lazada, name_shopee, name_shopee2, name_facebook, name_tiktok, name_instagram'
      : 'id, name, name_th, images, mark_location, name_shopee, mark_shopee2, mark_fb, mark_tt, mark_ig, mark_thaimart';

    const { data: product, error } = await admin
      .from(targetTable)
      .select(selectFields)
      .eq('id', parseInt(productId))
      .single();

    if (error || !product) {
      return NextResponse.json({ error: error?.message || 'Product not found' }, { status: 404, headers: corsHeaders });
    }

    // Normalize field names if from shopee_products or june_products
    const normalizedProduct = {
      ...product,
      storage_location: product.storage_location || product.mark_location,
    };

    const result = await sendLineSoldNotification(normalizedProduct);
    return NextResponse.json(result, { headers: corsHeaders });

  } catch (err: any) {
    console.error('[notify-sold] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const isTest = url.searchParams.get('test') === 'true';
  const productId = url.searchParams.get('product_id');

  if (!isTest) {
    return NextResponse.json({ error: 'Use POST to send sold notification' }, { status: 405, headers: corsHeaders });
  }

  try {
    const admin = createAdminClient();
    let query = admin
      .from('products')
      .select('id, name, name_th, images, storage_location, name_lazada, name_shopee, name_shopee2, name_facebook, name_tiktok, name_instagram');
    
    if (productId) {
      query = query.eq('id', parseInt(productId));
    } else {
      query = query.limit(1);
    }

    const { data: products, error } = await query;
    if (error || !products || products.length === 0) {
      return NextResponse.json({ error: 'No product found to test' }, { status: 404, headers: corsHeaders });
    }

    const sample = products[0];
    const result = await sendLineSoldNotification(sample);
    return NextResponse.json({ test: true, product: sample.name_th || sample.name, result }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
}
