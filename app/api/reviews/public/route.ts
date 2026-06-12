import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const revalidate = 120;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 50);

  const supabase = createAdminClient();
  const { data } = await supabase
    .from('reviews')
    .select('id, rating, body, user_email, created_at, orders(items)')
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  // Mask email for privacy: j***@gmail.com
  const masked = (data ?? []).map((r: any) => {
    const items: { name: string; qty: number }[] = r.orders?.items ?? [];
    return {
      id: r.id,
      rating: r.rating,
      body: r.body,
      created_at: r.created_at,
      user_email: r.user_email.replace(/^(.).+(@.+)$/, '$1***$2'),
      product_names: items.map((i) => i.name),
    };
  });

  return NextResponse.json(masked);
}
