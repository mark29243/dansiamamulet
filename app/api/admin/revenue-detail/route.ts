import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  return data ? admin : null;
}

export async function GET(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from');
  const to   = searchParams.get('to');
  if (!from || !to) return NextResponse.json({ error: 'Missing from/to' }, { status: 400 });

  const { data: orders } = await admin
    .from('orders')
    .select('id, customer_name, customer_email, total, items, created_at')
    .eq('status', 'paid')
    .gte('created_at', from)
    .lt('created_at', to)
    .order('created_at', { ascending: false });

  return NextResponse.json({ orders: orders ?? [] });
}
