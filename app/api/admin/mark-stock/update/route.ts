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
  const query = user.email
    ? admin.from('admins').select('role').or(`user_id.eq.${user.id},email.eq.${user.email}`).maybeSingle()
    : admin.from('admins').select('role').eq('user_id', user.id).maybeSingle();
  const { data: adminRecord } = await query;
  if (!adminRecord) return null;
  return { user, admin };
}

export async function POST(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const body = await req.json();
    const { id } = body;

    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const fieldsToUpdate: Record<string, any> = {};
    if (body.stock !== undefined) fieldsToUpdate.stock = Number(body.stock);
    if (body.status !== undefined) fieldsToUpdate.status = body.status;
    if (body.notes !== undefined) fieldsToUpdate.notes = body.notes;
    if (body.price !== undefined) fieldsToUpdate.price = Number(body.price);
    if (body.cost !== undefined) fieldsToUpdate.cost = Number(body.cost);

    // Location (supports mark_location, location, storage_location)
    const loc = body.mark_location !== undefined ? body.mark_location : (body.location !== undefined ? body.location : body.storage_location);
    if (loc !== undefined) fieldsToUpdate.mark_location = loc ? String(loc).trim() : null;

    // Platform tags
    if (body.mark_fb !== undefined) fieldsToUpdate.mark_fb = Boolean(body.mark_fb);
    if (body.mark_tt !== undefined) fieldsToUpdate.mark_tt = Boolean(body.mark_tt);
    if (body.mark_ig !== undefined) fieldsToUpdate.mark_ig = Boolean(body.mark_ig);
    if (body.mark_shopee2 !== undefined) fieldsToUpdate.mark_shopee2 = Boolean(body.mark_shopee2);
    if (body.mark_thaimart !== undefined) fieldsToUpdate.mark_thaimart = Boolean(body.mark_thaimart);
    if (body.name_shopee !== undefined) fieldsToUpdate.name_shopee = body.name_shopee ? String(body.name_shopee).trim() : null;
    if (body.name !== undefined) fieldsToUpdate.name = body.name ? String(body.name).trim() : null;
    if (body.name_th !== undefined) fieldsToUpdate.name_th = body.name_th ? String(body.name_th).trim() : null;

    fieldsToUpdate.updated_at = new Date().toISOString();

    const { error } = await ctx.admin
      .from('shopee_products')
      .update(fieldsToUpdate)
      .eq('id', id);

    if (error) {
      console.error('Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error('Error updating mark stock:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
