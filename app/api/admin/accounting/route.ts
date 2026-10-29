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
  const fromMonth = url.searchParams.get('fromMonth');
  const fromYear = url.searchParams.get('fromYear');
  const toMonth = url.searchParams.get('toMonth');
  const toYear = url.searchParams.get('toYear');
  const startDateParam = url.searchParams.get('startDate') || url.searchParams.get('fromDate');
  const endDateParam = url.searchParams.get('endDate') || url.searchParams.get('toDate');

  let query = ctx.admin.from('accounting_records').select('*').order('date', { ascending: false }).order('created_at', { ascending: false });

  if (startDateParam && endDateParam) {
    query = query.gte('date', startDateParam).lte('date', endDateParam);
  } else if (startDateParam) {
    query = query.gte('date', startDateParam);
  } else if (endDateParam) {
    query = query.lte('date', endDateParam);
  } else if (fromMonth && fromYear && toMonth && toYear) {
    const startPadded = fromMonth.padStart(2, '0');
    const endPadded = toMonth.padStart(2, '0');
    const endLastDay = new Date(parseInt(toYear), parseInt(toMonth), 0).getDate().toString().padStart(2, '0');
    query = query
      .gte('date', `${fromYear}-${startPadded}-01`)
      .lte('date', `${toYear}-${endPadded}-${endLastDay}`);
  } else if (month && year) {
    const paddedMonth = month.padStart(2, '0');
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
