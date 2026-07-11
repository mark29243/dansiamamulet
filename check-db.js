const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('shopee_products').select('*').limit(1);
  console.log('Error:', error);
  if (data && data.length > 0) {
    console.log('Keys in first row:', Object.keys(data[0]));
  } else {
    console.log('Data:', data);
  }
}
check();
