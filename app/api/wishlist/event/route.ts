import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getIp } from '@/lib/rate-limit';
import { checkOrigin } from '@/lib/csrf';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    if (!checkOrigin(req)) {
      return NextResponse.json({ ok: false }, { status: 403 });
    }
    if (!(await rateLimit(`wishlist:${getIp(req)}`, 30, 60_000))) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    const { product_id, action } = await req.json();
    if (!Number.isInteger(product_id) || product_id < 1 || !['add', 'remove'].includes(action)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const admin = createAdminClient();
    await admin.from('wishlist_events').insert({ product_id, action });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
