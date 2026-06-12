import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Max 4 addresses
  const { count } = await supabase
    .from('addresses')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  if ((count ?? 0) >= 4) {
    return NextResponse.json({ error: 'Maximum 4 addresses allowed' }, { status: 400 });
  }

  const body = await req.json();
  const { label, name, phone, address, city, province, postal_code, country, is_default } = body;

  if (!name?.trim() || !address?.trim()) {
    return NextResponse.json({ error: 'Name and address are required' }, { status: 400 });
  }
  // Length limits — mirror checkout validation
  if (
    (label && label.length > 50) ||
    name.length > 200 ||
    (phone && phone.length > 30) ||
    address.length > 500 ||
    (city && city.length > 100) ||
    (province && province.length > 100) ||
    (postal_code && postal_code.length > 20) ||
    (country && country.length > 100)
  ) {
    return NextResponse.json({ error: 'Field too long' }, { status: 400 });
  }

  // If setting as default, clear other defaults first
  if (is_default) {
    await supabase.from('addresses').update({ is_default: false }).eq('user_id', user.id);
  }

  const { data, error } = await supabase
    .from('addresses')
    .insert({
      user_id: user.id,
      label: label?.trim() || 'Home',
      name: name.trim(),
      phone: phone?.trim() || null,
      address: address.trim(),
      city: city?.trim() || null,
      province: province?.trim() || null,
      postal_code: postal_code?.trim() || null,
      country: country?.trim() || 'Thailand',
      is_default: is_default ?? false,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
