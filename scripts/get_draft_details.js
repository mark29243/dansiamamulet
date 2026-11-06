const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function check() {
  const ids = [1773, 1774, 1775, 1776, 1777];
  const { data } = await supabase.from('products').select('*').in('id', ids).order('id', { ascending: true });
  data.forEach(p => {
    console.log(`\n=================== ID ${p.id} ===================`);
    console.log('NAME_TH:', p.name_th);
    console.log('DESC_TH:\n', p.description_th);
    console.log('CATEGORY:', p.category);
    console.log('PRICE:', p.price);
  });
}

check();
