import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.from('label_contacts').select('*').order('created_at', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const body = await req.json();
  
  if (Array.isArray(body)) {
     const { data, error } = await supabase.from('label_contacts').insert(body).select();
     if (error) return NextResponse.json({ error: error.message }, { status: 500 });
     return NextResponse.json(data);
  } else {
     const { data, error } = await supabase.from('label_contacts').insert([body]).select();
     if (error) return NextResponse.json({ error: error.message }, { status: 500 });
     return NextResponse.json(data);
  }
}

export async function DELETE(req: Request) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  
  const { error } = await supabase.from('label_contacts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
