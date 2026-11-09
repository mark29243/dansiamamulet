import { NextResponse } from 'next/server';
import { createAdminClient, requireAdmin } from '@/lib/supabase/server';
import { sendLineSoldNotification } from '@/lib/line';
import { rateLimit, getIp } from '@/lib/rate-limit';
import { verifyStaffSession, isAllowedStaffEmail } from '@/lib/staff-auth';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://dansiamamulets.com',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function isAuthorizedStaffOrWebhook(req: Request): boolean {
  // 1. Check staff_token cookie
  try {
    const cookieStore = cookies();
    if (verifyStaffSession(cookieStore.get('staff_token')?.value)) return true;
  } catch {}

  // 2. Check Authorization Bearer JWT from stk-w1uf09ukqs.html
  const authHeader = req.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    const parts = token.split('.');
    if (parts.length === 3) {
      try {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
        if (payload?.email && isAllowedStaffEmail(payload.email)) {
          return true;
        }
      } catch {}
    }
  }

  // 3. Check same-origin referer/origin from dansiamamulets.com
  const origin = req.headers.get('origin') || req.headers.get('referer') || '';
  if (origin.includes('dansiamamulets.com') || origin.includes('localhost')) {
    return true;
  }

  return false;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const ip = getIp(req);
    if (!(await rateLimit(`notify-sold:${ip}`, 15, 60_000))) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: corsHeaders });
    }

    const body = await req.json();

    // 1. Supabase Database Webhook format
    if (body.type === 'UPDATE' && (body.table === 'products' || body.table === 'shopee_products' || body.table === 'june_products')) {
      const oldRecord = body.old_record;
      const record = body.record;

      if (oldRecord && record && oldRecord.stock > 0 && record.stock === 0) {
        if (!(await rateLimit(`notify-sold-item:${body.table}:${record.id}`, 1, 10 * 60_000))) {
          return NextResponse.json({ ok: true, duplicate: true }, { headers: corsHeaders });
        }
        await sendLineSoldNotification(record);
        return NextResponse.json({ ok: true, sent: true }, { headers: corsHeaders });
      }
      return NextResponse.json({ message: 'Ignored: stock did not transition from >0 to 0' }, { headers: corsHeaders });
    }

    // 2. Direct call from staff stock tool or admin: verify caller & verify item is actually sold (stock <= 0)
    if (!isAuthorizedStaffOrWebhook(req)) {
      const adminCtx = await requireAdmin();
      if (!adminCtx) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
      }
    }

    const productId = body.product_id || body.id || body.productId;
    if (!productId) {
      return NextResponse.json({ error: 'Missing product_id' }, { status: 400, headers: corsHeaders });
    }

    const table = body.table || 'products';
    const allowedTables = ['products', 'shopee_products', 'june_products'];
    const targetTable = allowedTables.includes(table) ? table : 'products';

    const admin = createAdminClient();
    const selectFields = targetTable === 'products'
      ? 'id, name, name_th, stock, images, storage_location, name_lazada, name_shopee, name_shopee2, name_facebook, name_tiktok, name_instagram'
      : 'id, name, name_th, stock, images, mark_location, name_shopee, mark_shopee2, mark_fb, mark_tt, mark_ig, mark_thaimart';

    const { data: product, error } = await admin
      .from(targetTable)
      .select(selectFields)
      .eq('id', parseInt(productId))
      .single();

    if (error || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404, headers: corsHeaders });
    }

    // Business logic security guard: never send "SOLD" alert if product still has stock > 0
    if (typeof (product as any).stock === 'number' && (product as any).stock > 0) {
      return NextResponse.json({ error: 'Product is still in stock' }, { status: 400, headers: corsHeaders });
    }

    // Prevent duplicate notification spam for the same product within 10 minutes
    if (!(await rateLimit(`notify-sold-item:${targetTable}:${(product as any).id}`, 1, 10 * 60_000))) {
      return NextResponse.json({ ok: true, duplicate: true }, { headers: corsHeaders });
    }

    const normalizedProduct = {
      ...(product as any),
      storage_location: (product as any).storage_location || (product as any).mark_location,
    };

    await sendLineSoldNotification(normalizedProduct);
    return NextResponse.json({ ok: true, sent: true }, { headers: corsHeaders });

  } catch (err: any) {
    console.error('[notify-sold] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}

export async function GET(req: Request) {
  // Require admin session for test endpoint
  const adminCtx = await requireAdmin();
  if (!adminCtx) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
  }

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
    await sendLineSoldNotification(sample);
    return NextResponse.json({ test: true, sent: true }, { headers: corsHeaders });
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}
