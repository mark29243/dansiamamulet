import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getIp } from '@/lib/rate-limit';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  if (!Number.isInteger(productId) || productId < 1) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // Rate limit: max 30 view events per IP per minute (prevents view-count inflation)
  if (!(await rateLimit(`view:${getIp(req)}`, 30, 60_000))) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const admin = createAdminClient();
  // Update counter + log timestamped event in parallel
  await Promise.all([
    admin.rpc('increment_product_views', { product_id: productId }),
    admin.from('product_view_events').insert({ product_id: productId }),
  ]);
  return NextResponse.json({ ok: true });
}
