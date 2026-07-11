import Link from 'next/link';
import ShopeeImporterClient from '@/app/admin/import-shopee/ShopeeImporterClient';

export const dynamic = 'force-dynamic';

export default async function StaffImportShopeePage() {
  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--text)' }}>
          นำเข้าข้อมูลด้วย Excel
        </h1>
        <Link href="/staff/june-stock" className="btn-outline" style={{ padding: '8px 16px', fontSize: 13 }}>
          ← กลับไปหน้าสต็อก
        </Link>
      </div>
      <ShopeeImporterClient />
    </div>
  );
}
