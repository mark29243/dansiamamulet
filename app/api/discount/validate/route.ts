import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { checkOrigin } from '@/lib/csrf';
import { rateLimit, getIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!checkOrigin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  if (!(await rateLimit(`discount:${getIp(req)}`, 10, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { code, email } = await req.json();
  if (!code || !email) return NextResponse.json({ error: 'Missing code or email' }, { status: 400 });

  const admin = createAdminClient();
  const { data } = await admin
    .from('discount_codes')
    .select('id, percent, free_shipping, expires_at, used_at, email')
    .eq('code', code.toUpperCase().trim())
    .single();

  if (!data) return NextResponse.json({ error: 'Invalid discount code' }, { status: 404 });
  if (data.used_at) return NextResponse.json({ error: 'Discount code already used' }, { status: 400 });
  if (new Date(data.expires_at) < new Date()) return NextResponse.json({ error: 'Discount code expired' }, { status: 400 });
  if (data.email.toLowerCase() !== email.toLowerCase().trim()) {
    return NextResponse.json({ error: 'Discount code is not valid for this email' }, { status: 400 });
  }

  return NextResponse.json({ valid: true, percent: data.percent, free_shipping: data.free_shipping ?? false });
}
