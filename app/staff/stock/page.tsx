import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/server';
import ShopeeStockClient from '@/app/admin/shopee-stock/ShopeeStockClient';

export const dynamic = 'force-dynamic';

export default async function StaffStockPage() {
  const cookieStore = cookies();
  const isStaff = cookieStore.get('staff_auth')?.value === 'true';

  if (!isStaff) {
    redirect('/staff/login');
  }

  const admin = createAdminClient();
  
  // Fetch all shopee products
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
        </div>
     );
  }

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '60px' }}>
      <ShopeeStockClient initialProducts={allProducts} isStaffRoute={true} />
    </div>
  );
}
