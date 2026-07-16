import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.from('label_contacts').insert([
    { id: 'sender_test_' + Date.now(), type: 'sender', name: 'Test', text: '{}' }
  ]).select();
  
  return NextResponse.json({
    supabaseUrl: !!supabaseUrl,
    supabaseKey: !!supabaseKey,
    error: error ? error : null,
    data: data
  });
}
