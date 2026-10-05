import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { verifyStaffSession } from '@/lib/staff-auth';

export const runtime = 'nodejs';

async function requireAdmin() {
  const cookieStore = cookies();
  const staffToken = cookieStore.get('staff_token')?.value;
  if (verifyStaffSession(staffToken)) {
    return { user: { id: 'staff' }, admin: createAdminClient() };
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data: adminRecord } = await admin.from('admins').select('role').eq('user_id', user.id).maybeSingle();
  if (!adminRecord) return null;
  return { user, admin };
}

export async function POST(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const body = await req.json();
    const { id, stock, status, notes, price, cost } = body;

    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const fieldsToUpdate: Record<string, any> = {};
    if (stock !== undefined) fieldsToUpdate.stock = stock;
    if (status !== undefined) fieldsToUpdate.status = status;
    if (notes !== undefined) fieldsToUpdate.notes = notes;
    if (price !== undefined) fieldsToUpdate.price = price;
    if (cost !== undefined) fieldsToUpdate.cost = cost;

    const { error } = await ctx.admin
      .from('june_products')
      .update(fieldsToUpdate)
      .eq('id', id);

    if (error) {
      console.error('Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Error updating june stock:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
