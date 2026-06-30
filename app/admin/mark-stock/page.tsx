import { createAdminClient } from '@/lib/supabase/server';
import MarkStockClient from './MarkStockClient';

export const dynamic = 'force-dynamic';

export default async function MarkStockPage() {
  const admin = createAdminClient();
  
  // Fetch all products, sorted by id descending
  // We use supabase 'select' which ignores missing columns if they don't exist yet, 
  // but if it fails we just catch it and return empty. Actually, if columns don't exist it will crash.
  // So we select * to be safe, then map on the client.
  const { data: products, error } = await admin
    .from('products')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '60px' }}>
      <MarkStockClient initialProducts={products || []} />
    </div>
  );
}
