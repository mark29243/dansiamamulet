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
      .select('id, name, name_th, price, stock, mark_location, mark_fb, mark_tt, mark_ig, mark_shopee2, mark_thaimart, images, name_shopee, updated_at')
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

  if (hasError) {
    if ((hasError as any).code === '42P01') {
      return (
        <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h2 className="serif">Shopee Products Table Not Found</h2>
          <p style={{ marginTop: 16 }}>Please run the SQL script to create the <code>shopee_products</code> table in your Supabase Dashboard.</p>
        </div>
      );
    }
    const isEgress = (hasError as any).status === 402 || (hasError as any).message?.includes('exceed_egress_quota');
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ background: '#FEE2E2', border: '1px solid #EF4444', color: '#991B1B', padding: 24, borderRadius: 12, maxWidth: 640, margin: '20px auto', textAlign: 'left' }}>
          <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            ⚠️ ไม่สามารถโหลดสต็อกสินค้าได้ (Database Error)
          </h2>
          <p style={{ fontSize: 14, margin: '8px 0', lineHeight: 1.5 }}>
            {(hasError as any).message || 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล'}
          </p>
          {isEgress && (
            <div style={{ marginTop: 12, padding: 12, background: '#FEF2F2', borderRadius: 8, border: '1px solid #FCA5A5', fontSize: 13, color: '#7F1D1D' }}>
              <strong>สาเหตุหลัก:</strong> โปรเจกต์ Supabase ติดจำกัด <strong>Egress Quota (HTTP 402 Payment Required)</strong><br />
              กรุณาเข้าไปที่ Supabase Dashboard เพื่อปลดล็อก Spend Cap หรือ Upgrade Plan:
              <div style={{ marginTop: 6 }}>
                <a 
                  href="https://supabase.com/dashboard/project/woieynotnkdgjsopknwz/settings/billing" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: '#DC2626', textDecoration: 'underline', fontWeight: 'bold' }}
                >
                  เปิด Supabase Billing Settings →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '60px' }}>
      <ShopeeStockClient initialProducts={allProducts} />
    </div>
  );
}
