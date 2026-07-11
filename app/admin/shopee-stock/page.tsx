import { createAdminClient } from '@/lib/supabase/server';
import ShopeeStockClient from './ShopeeStockClient';

export const dynamic = 'force-dynamic';

export default async function ShopeeStockPage() {
  const admin = createAdminClient();
  
  // Fetch all shopee products, bypassing the 1000 limit
  let allProducts: any[] = [];
  let hasMore = true;
  let offset = 0;
  const limit = 1000;
  let hasError = null;

  while (hasMore) {
    const { data, error } = await admin
      .from('shopee_products')
      .select('*')
      .order('id', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      hasError = error;
      break;
    }

    if (data && data.length > 0) {
      allProducts.push(...data);
      offset += limit;
      if (data.length < limit) hasMore = false;
    } else {
      hasMore = false;
    }
  }

  if (hasError && (hasError as any).code === '42P01') {
     return (
        <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
           <h2 className="serif">Shopee Products Table Not Found</h2>
           <p style={{ marginTop: 16 }}>Please run the SQL script to create the <code>shopee_products</code> table in your Supabase Dashboard.</p>
        </div>
     );
  }

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '60px' }}>
      <ShopeeStockClient initialProducts={allProducts} />
    </div>
  );
}
