import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  await supabase.rpc('increment_product_views', { product_id: parseInt(params.id) });
  return NextResponse.json({ ok: true });
}
