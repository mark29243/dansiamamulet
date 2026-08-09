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

export async function GET(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const url = new URL(req.url);
  const month = url.searchParams.get('month');
  const year = url.searchParams.get('year');

  let query = ctx.admin.from('accounting_records').select('*').order('date', { ascending: false }).order('created_at', { ascending: false });

  if (month && year) {
    const paddedMonth = month.padStart(2, '0');
    const startDate = new Date(`${year}-${paddedMonth}-01T00:00:00Z`);
    const endDate = new Date(parseInt(year), parseInt(month), 0); // last day of month
    
    query = query
      .gte('date', `${year}-${paddedMonth}-01`)
      .lte('date', `${year}-${paddedMonth}-${endDate.getDate().toString().padStart(2, '0')}`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const ctx = await requireAdmin();
  if (!ctx) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  try {
    const body = await req.json();
    const { type, date, category, product_name, amount, cost, fee, shipping, description, image_url, order_id } = body;

    if (!type || !['INCOME', 'EXPENSE', 'SALE'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }
    
    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    const { data, error } = await ctx.admin
      .from('accounting_records')
      .insert({
        type,
        date,
        category: category || null,
        product_name: product_name || null,
        amount: parseFloat(amount) || 0,
        cost: parseFloat(cost) || 0,
        fee: parseFloat(fee) || 0,
        shipping: parseFloat(shipping) || 0,
        description: description || null,
        image_url: image_url || null,
        order_id: order_id || null
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
