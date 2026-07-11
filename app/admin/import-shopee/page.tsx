import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/server';
import ShopeeImporterClient from './ShopeeImporterClient';

export const dynamic = 'force-dynamic';

export default async function ImportShopeePage() {
  const admin = createAdminClient();
  
  // Optionally prefetch products if we need to know what exists
  // But maybe it's better to fetch them inside the client to avoid huge payloads
  
  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--text)' }}>
          นำเข้าข้อมูล Shopee (แยกตาราง)
        </h1>
        <Link href="/admin/shopee-stock" className="btn-outline" style={{ padding: '8px 16px', fontSize: 13 }}>
          ← กลับไปหน้าสต็อก Shopee
        </Link>
      </div>
      <ShopeeImporterClient />
    </div>
  );
}
