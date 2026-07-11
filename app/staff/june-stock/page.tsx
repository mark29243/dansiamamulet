import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/server';
import JuneStockClient from '@/app/admin/june-stock/JuneStockClient';

export const dynamic = 'force-dynamic';

export default async function JuneStockPage() {
  const cookieStore = cookies();
  const isStaff = cookieStore.get('staff_auth')?.value === 'true';

  if (!isStaff) {
    redirect('/staff/login');
  }

  const admin = createAdminClient();
  
  // Fetch all june products
  let allProducts: any[] = [];
  let hasMore = true;
  let offset = 0;
  const limit = 1000;
  let hasError = null;

  while (hasMore) {
    const { data, error } = await admin
      .from('june_products')
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
           <h2 className="serif">June Products Table Not Found</h2>
           <p>Please run the database migration script first.</p>
        </div>
     );
  }

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '60px' }}>
      <JuneStockClient initialProducts={allProducts} isStaffRoute={true} />
    </div>
  );
}
