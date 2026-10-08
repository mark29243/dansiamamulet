import Link from 'next/link';
import Image from 'next/image';
import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';
import StockEditor from './StockEditor';
import PublishButton from './PublishButton';

import AdminProductTable from './AdminProductTable';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage({ searchParams }: { searchParams: { q?: string; filter?: string; page?: string } }) {
  const admin = createAdminClient();
  const q = searchParams.q?.trim() || '';
  const filter = searchParams.filter || 'published';
  const page = parseInt(searchParams.page || '1', 10);
  const pageSize = 20;

  let query = admin.from('products').select('*', { count: 'exact' }).order('id', { ascending: false });
  if (q) query = query.or(`name.ilike.%${q}%,name_th.ilike.%${q}%,category.ilike.%${q}%`);
  
  if (filter === 'published') query = query.eq('published', true);
  else if (filter === 'unpublished') query = query.eq('published', false);
  else if (filter === 'oos') query = query.eq('stock', 0);
  
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data: products, count, error } = await query;

  if (error) {
    const isEgress = (error as any).status === 402 || error.message?.includes('exceed_egress_quota');
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ background: '#FEE2E2', border: '1px solid #EF4444', color: '#991B1B', padding: 24, borderRadius: 12, maxWidth: 640, margin: '20px auto', textAlign: 'left' }}>
          <h2 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            ⚠️ ไม่สามารถโหลดข้อมูลสินค้าได้ (Database Error)
          </h2>
          <p style={{ fontSize: 14, margin: '8px 0', lineHeight: 1.5 }}>
            {error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล'}
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

  const list = products ?? [];
  const totalPages = count ? Math.ceil(count / pageSize) : 1;

  return (
    <div className="container" style={{ padding: '32px 16px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--text)' }}>
          Products <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 300 }}>({count ?? 0})</span>
        </h1>

        <form action="/admin/products" method="GET" style={{ display: 'flex', gap: 8, flex: '1 1 240px', maxWidth: 400, justifyContent: 'flex-end' }}>
          {filter !== 'published' && <input type="hidden" name="filter" value={filter} />}
          <input name="q" className="input" placeholder="Search products..." defaultValue={q} style={{ flex: 1, minWidth: 0 }} />
          <button type="submit" className="btn-outline" style={{ padding: '10px 18px' }}>Search</button>
        </form>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {[
          { v: 'published', label: 'Published' },
          { v: 'unpublished', label: 'Unpublished' },
          { v: 'oos', label: 'Out of Stock' },
          { v: 'all', label: 'All' },
        ].map((f) => (
          <Link
            key={f.v}
            href={`/admin/products${f.v === 'published' ? '' : `?filter=${f.v}`}`}
            className="serif"
            style={{
              padding: '6px 14px', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
              border: '1px solid ' + (f.v === filter ? 'var(--gold)' : 'var(--cream-dark)'),
              background: f.v === filter ? 'var(--gold)' : 'transparent',
              color: f.v === filter ? 'var(--deep)' : 'var(--text-muted)',
              borderRadius: 100, whiteSpace: 'nowrap',
              fontWeight: f.v === filter ? 600 : 400,
            }}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <AdminProductTable products={list} />
      
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 24 }}>
          {page > 1 ? (
            <Link href={`/admin/products?page=${page - 1}${filter !== 'published' ? `&filter=${filter}` : ''}${q ? `&q=${q}` : ''}`} className="btn-outline" style={{ padding: '6px 14px', fontSize: 12 }}>← Previous</Link>
          ) : <span style={{ padding: '6px 14px', fontSize: 12, color: 'var(--text-faint)', border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius)' }}>← Previous</span>}
          
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Page {page} of {totalPages}</span>
          
          {page < totalPages ? (
            <Link href={`/admin/products?page=${page + 1}${filter !== 'published' ? `&filter=${filter}` : ''}${q ? `&q=${q}` : ''}`} className="btn-outline" style={{ padding: '6px 14px', fontSize: 12 }}>Next →</Link>
          ) : <span style={{ padding: '6px 14px', fontSize: 12, color: 'var(--text-faint)', border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius)' }}>Next →</span>}
        </div>
      )}

      <p style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 24, textAlign: 'center' }}>
        💡 Tip: To add new products in bulk, update <code>scripts/products.csv</code> and run <code>npm run seed</code>.
      </p>
    </div>
  );
}
