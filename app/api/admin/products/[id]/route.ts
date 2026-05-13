import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

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
  const allowed: any = {};
  if (typeof body.stock === 'number') allowed.stock = Math.max(0, body.stock);
  if (typeof body.published === 'boolean') allowed.published = body.published;
  if (typeof body.price === 'number') allowed.price = body.price;
  if (typeof body.sale_price === 'number' || body.sale_price === null) allowed.sale_price = body.sale_price;
  if (typeof body.is_featured === 'boolean') allowed.is_featured = body.is_featured;

  if (Object.keys(allowed).length === 0) {
    return NextResponse.json({ error: 'No valid fields' }, { status: 400 });
  }

  const { data, error } = await ctx.admin
    .from('products')
    .update(allowed)
    .eq('id', parseInt(params.id))
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: data });
}
