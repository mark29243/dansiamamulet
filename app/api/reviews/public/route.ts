import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const revalidate = 120;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);

  const supabase = createClient();
  const { data } = await supabase
    .from('reviews')
    .select('id, rating, body, user_email, created_at')
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  // Mask email for privacy: j***@gmail.com
  const masked = (data ?? []).map((r) => ({
    ...r,
    user_email: r.user_email.replace(/^(.).+(@.+)$/, '$1***$2'),
  }));

  return NextResponse.json(masked);
}
