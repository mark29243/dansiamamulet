import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { rateLimit, getIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  if (!(await rateLimit(`by-session:${getIp(req)}`, 20, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const url = new URL(req.url);
  const sessionId = url.searchParams.get('session_id');
  if (!sessionId || sessionId.length > 200) {
    return NextResponse.json({ error: 'missing session_id' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from('orders')
    .select('id, status, total, items')
    .eq('stripe_session_id', sessionId)
    .single();

  return NextResponse.json({ order: data ?? null });
}
