import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { sendOrderShipped } from '@/lib/email';
import type { Order } from '@/lib/types';

export const runtime = 'nodejs';

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  if (!data) return null;
  return { user, admin };
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { status, tracking_number, carrier, sendEmail } = body;

  const updates: any = {};
  if (status) updates.status = status;
  if (tracking_number !== undefined) updates.tracking_number = tracking_number;
  if (carrier !== undefined) updates.carrier = carrier;

  const { data, error } = await ctx.admin
    .from('orders')
    .update(updates)
    .eq('id', params.id)
    .select('*')
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Update failed' }, { status: 500 });
  }

  // Send shipping email if requested
  if (sendEmail && status === 'shipped' && tracking_number && carrier) {
    const emailRes = await sendOrderShipped(data as Order, tracking_number, carrier);
    if (!emailRes.ok) {
      console.warn('[admin] Shipping email failed:', emailRes.error);
    }
  }

  return NextResponse.json({ order: data });
}
