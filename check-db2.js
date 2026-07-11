const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('shopee_products').select('id, name, name_shopee, created_at, description_th').order('created_at', { ascending: false }).limit(5);
  console.log('Shopee Products Error:', error);
  console.log('Shopee Products Data:', data);
  
  const { data: jData, error: jErr } = await supabase.from('june_products').select('id, name, name_shopee, created_at, description_th').order('created_at', { ascending: false }).limit(5);
  console.log('June Products Data:', jData);
}
check();
