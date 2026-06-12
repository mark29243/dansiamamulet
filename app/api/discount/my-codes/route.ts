import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) return NextResponse.json([], { status: 200 });

  const admin = createAdminClient();
  const { data } = await admin
    .from('discount_codes')
    .select('code, percent, free_shipping, expires_at, used_at')
    .eq('email', user.email)
    .not('review_id', 'is', null)
    .is('used_at', null)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false });

  return NextResponse.json(data ?? []);
}
