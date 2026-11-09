import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getIp } from '@/lib/rate-limit';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  if (!Number.isInteger(productId) || productId < 1) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Filter out automated bots, crawlers, and headless previews from consuming serverless CPU
  const ua = (req.headers.get('user-agent') || '').toLowerCase();
  if (/bot|crawl|spider|slurp|facebookexternalhit|bingpreview|headless|chrome-lighthouse|google|baidu|yandex/i.test(ua)) {
    return NextResponse.json({ ok: true, skipped: 'bot' });
  }

  // Rate limit: max 20 view events per IP per minute (prevents view-count inflation)
  if (!(await rateLimit(`view:${getIp(req)}`, 20, 60_000))) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const admin = createAdminClient();
  // Update counter + log timestamped event in parallel
  const [rpcRes, insertRes] = await Promise.all([
    admin.rpc('increment_product_views', { product_id: productId }),
    admin.from('product_view_events').insert({ product_id: productId }),
  ]);

  if (rpcRes.error) {
    console.warn('[view-counter] Warning in increment_product_views RPC:', rpcRes.error.message);
  }
  if (insertRes.error) {
    console.warn('[view-counter] Warning in product_view_events insert:', insertRes.error.message);
  }

  return NextResponse.json({ ok: true });
}
