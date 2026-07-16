import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.from('label_contacts').select('*').order('created_at', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  const mappedData = data.map(item => {
    if (item.type === 'sender' && item.text) {
      try {
        const parsed = JSON.parse(item.text);
        return { ...item, phone: parsed.phone, address: parsed.address };
      } catch (e) {}
    }
    return item;
  });
  
  return NextResponse.json(mappedData);
}

export async function POST(req: Request) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const body = await req.json();
  
  const processItem = (item: any) => {
    if (item.type === 'sender' && !item.text) {
      return {
        id: item.id,
        type: item.type,
        name: item.name,
        text: JSON.stringify({ phone: item.phone, address: item.address })
      };
    }
    return item;
  };

  if (Array.isArray(body)) {
     // Batch insert for migration
     const payload = body.map(processItem);
     const { data, error } = await supabase.from('label_contacts').insert(payload).select();
     if (error) return NextResponse.json({ error: error.message }, { status: 500 });
     return NextResponse.json(data);
  } else {
     const payload = processItem(body);
     const { data, error } = await supabase.from('label_contacts').insert([payload]).select();
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
