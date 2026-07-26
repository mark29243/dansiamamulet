const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
console.log('supabaseUrl:', !!supabaseUrl, 'supabaseKey:', !!supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);
(async () => {
  const { data, error } = await supabase.from('label_contacts').insert([
    { id: 'sender_test1', type: 'sender', name: 'Test', phone: '000', address: 'BKK' }
  ]).select();
  console.log('INSERT RESULT:', error ? error.message : data);
})();
