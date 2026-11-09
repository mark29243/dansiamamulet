import { NextResponse } from 'next/server';
import { createAdminClient, createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { verifyStaffSession, isAllowedStaffEmail } from '@/lib/staff-auth';

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
  if (isAllowedStaffEmail(user.email)) {
    return { user, admin };
  }
  const query = user.email
    ? admin.from('admins').select('role').or(`user_id.eq.${user.id},email.eq.${user.email}`).maybeSingle()
    : admin.from('admins').select('role').eq('user_id', user.id).maybeSingle();
  const { data: adminRecord } = await query;
  if (!adminRecord) return null;
  return { user, admin };
}

export async function GET(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const { error } = await ctx.admin
      .from('shopee_products')
      .delete()
      .eq('stock', 0);
      
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ ok: true, message: 'Cleared all out of stock products.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
