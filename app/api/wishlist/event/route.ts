import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { product_id, action } = await req.json();
    if (!product_id || !['add', 'remove'].includes(action)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const admin = createAdminClient();
    await admin.from('wishlist_events').insert({ product_id, action });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
