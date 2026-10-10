import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { sendLineSoldNotification } from '@/lib/line';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Supabase Database Webhook format
    if (body.type === 'UPDATE' && body.table === 'products') {
      const oldRecord = body.old_record;
      const record = body.record;

      if (oldRecord && record && oldRecord.stock > 0 && record.stock === 0) {
        const result = await sendLineSoldNotification(record);
        return NextResponse.json(result);
      }
      return NextResponse.json({ message: 'Ignored: stock did not transition from >0 to 0' });
    }

    // 2. Direct call from client or admin: { product_id } or { id }
    const productId = body.product_id || body.id || body.productId;
    if (!productId) {
      return NextResponse.json({ error: 'Missing product_id' }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data: product, error } = await admin
      .from('products')
      .select('id, name, name_th, images, storage_location, name_lazada, name_shopee, name_shopee2, name_facebook, name_tiktok, name_instagram')
      .eq('id', parseInt(productId))
      .single();

    if (error || !product) {
      return NextResponse.json({ error: error?.message || 'Product not found' }, { status: 404 });
    }

    const result = await sendLineSoldNotification(product);
    return NextResponse.json(result);

  } catch (err: any) {
    console.error('[notify-sold] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const isTest = url.searchParams.get('test') === 'true';
  const productId = url.searchParams.get('product_id');

  if (!isTest) {
    return NextResponse.json({ error: 'Use POST to send sold notification' }, { status: 405 });
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
      return NextResponse.json({ error: 'No product found to test' }, { status: 404 });
    }

    const sample = products[0];
    const result = await sendLineSoldNotification(sample);
    return NextResponse.json({ test: true, product: sample.name_th || sample.name, result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
