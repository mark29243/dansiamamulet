import Link from 'next/link';
import Image from 'next/image';
import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';
import StockEditor from './StockEditor';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage({ searchParams }: { searchParams: { q?: string; filter?: string } }) {
  const admin = createAdminClient();
  const q = searchParams.q?.trim() || '';
  const filter = searchParams.filter || 'all';

  let query = admin.from('products').select('*').order('id', { ascending: false });
  if (q) query = query.or(`name.ilike.%${q}%,category.ilike.%${q}%`);
  if (filter === 'oos') query = query.eq('stock', 0);
  else if (filter === 'low') query = query.gt('stock', 0).lte('stock', 3);
  else if (filter === 'unpublished') query = query.eq('published', false);

  const { data: products } = await query;
  const list = products ?? [];

  return (
    <div className="container" style={{ padding: '32px 24px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--text)' }}>
          Products <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 300 }}>({list.length})</span>
        </h1>

        <form action="/admin/products" method="GET" style={{ display: 'flex', gap: 8 }}>
          {filter !== 'all' && <input type="hidden" name="filter" value={filter} />}
          <input name="q" className="input" placeholder="Search products..." defaultValue={q} style={{ minWidth: 240 }} />
          <button type="submit" className="btn-outline" style={{ padding: '10px 18px' }}>Search</button>
        </form>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {[
          { v: 'all', label: 'All' },
          { v: 'oos', label: 'Out of Stock' },
          { v: 'low', label: 'Low Stock (≤3)' },
          { v: 'unpublished', label: 'Unpublished' },
        ].map((f) => (
          <Link
            key={f.v}
            href={`/admin/products${f.v === 'all' ? '' : `?filter=${f.v}`}`}
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

      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: 'var(--cream-dark)', textAlign: 'left' }}>
                <Th>&nbsp;</Th>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Stock</Th>
                <Th>Status</Th>
                <Th>&nbsp;</Th>
              </tr>
            </thead>
            <tbody>
              {list.map((p: any) => (
                <tr key={p.id} style={{ borderTop: '1px solid var(--cream-dark)' }}>
                  <Td style={{ width: 60 }}>
                    {p.images?.[0] && (
                      <div style={{ width: 48, height: 48, background: 'var(--cream-dark)', overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                        <Image src={p.images[0]} alt="" width={48} height={48} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                      </div>
                    )}
                  </Td>
                  <Td>
                    <Link href={`/product/${p.slug}`} target="_blank" className="serif" style={{ color: 'var(--text)', fontWeight: 600, fontSize: 13 }}>
                      {p.name.slice(0, 50)}{p.name.length > 50 ? '…' : ''}
                    </Link>
                    {p.name_th && (
                      <div className="serif" style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>
                        {p.name_th.slice(0, 50)}{p.name_th.length > 50 ? '…' : ''}
                      </div>
                    )}
                    <div style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 2 }}>ID #{p.id}</div>
                  </Td>
                  <Td style={{ color: 'var(--text-muted)' }}>{p.category}</Td>
                  <Td className="serif" style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>
                    {formatPrice(p.sale_price ?? p.price)}
                  </Td>
                  <Td>
                    <StockEditor productId={p.id} stock={p.stock} />
                  </Td>
                  <Td>
                    {p.stock === 0 ? <span className="badge badge-oos">OOS</span> : p.stock <= 3 ? <span className="badge badge-warning">LOW</span> : <span className="badge badge-success">OK</span>}
                    {!p.published && <span className="badge" style={{ background: 'var(--text-faint)', color: '#fff', marginLeft: 4 }}>HIDDEN</span>}
                  </Td>
                  <Td style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Link href={`/admin/products/${p.id}`} className="btn-text" style={{ padding: 0, fontSize: 11, color: 'var(--gold-dark)', fontWeight: 600 }}>Edit ✎</Link>
                    <Link href={`/product/${p.slug}`} target="_blank" className="btn-text" style={{ padding: 0, fontSize: 11, color: 'var(--text-muted)' }}>View ↗</Link>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 16, textAlign: 'center' }}>
        💡 Tip: To add new products in bulk, update <code>scripts/products.csv</code> and run <code>npm run seed</code>.
      </p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ padding: '12px 16px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{children}</th>;
}
function Td({ children, style }: any) {
  return <td style={{ padding: '12px 16px', fontSize: 13, verticalAlign: 'middle', ...style }}>{children}</td>;
}
