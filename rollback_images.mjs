import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function rollback() {
  console.log('Fetching all products...');
  const { data, error } = await supabase.from('shopee_products').select('id, name, images');
  if (error) {
    console.error('Fetch error:', error);
    return;
  }
  
  const modifiedProducts = data.filter(d => d.images && d.images.length > 1);
  console.log(`Found ${modifiedProducts.length} products with multiple images.`);
  
  let successCount = 0;
  for (const p of modifiedProducts) {
    // Keep only the first image
    const revertedImages = [p.images[0]];
    const { error: updateError } = await supabase
      .from('shopee_products')
      .update({ images: revertedImages })
      .eq('id', p.id);
      
    if (updateError) {
      console.error(`Error updating product ${p.id}:`, updateError);
    } else {
      successCount++;
    }
  }
  console.log(`Successfully rolled back ${successCount} products.`);
}

rollback();
