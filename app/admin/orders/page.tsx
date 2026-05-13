import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const STATUS_FILTERS = ['all', 'pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded'];

export default async function AdminOrdersPage({ searchParams }: { searchParams: { status?: string; q?: string } }) {
  const admin = createAdminClient();
  const status = searchParams.status || 'all';
  const q = searchParams.q?.trim() || '';

  let query = admin.from('orders').select('*').order('created_at', { ascending: false }).limit(100);
  if (status !== 'all') query = query.eq('status', status);
  if (q) query = query.or(`customer_email.ilike.%${q}%,customer_name.ilike.%${q}%,id.ilike.%${q}%`);

  const { data: orders } = await query;
  const list = orders ?? [];

  return (
    <div className="container" style={{ padding: '32px 24px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--text)' }}>
          Orders <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 300 }}>({list.length})</span>
        </h1>

        {/* Search */}
        <form action="/admin/orders" method="GET" style={{ display: 'flex', gap: 8 }}>
          {status !== 'all' && <input type="hidden" name="status" value={status} />}
          <input
            name="q"
            className="input"
            placeholder="Search email, name, order #"
            defaultValue={q}
            style={{ minWidth: 240 }}
          />
          <button type="submit" className="btn-outline" style={{ padding: '10px 18px' }}>Search</button>
        </form>
      </div>

      {/* Status filter tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {STATUS_FILTERS.map((s) => (
          <Link
            key={s}
            href={`/admin/orders${s === 'all' ? '' : `?status=${s}`}`}
            className="serif"
            style={{
              padding: '6px 14px',
              fontSize: 11,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              border: '1px solid ' + (s === status ? 'var(--gold)' : 'var(--cream-dark)'),
              background: s === status ? 'var(--gold)' : 'transparent',
              color: s === status ? 'var(--deep)' : 'var(--text-muted)',
              borderRadius: 100,
              whiteSpace: 'nowrap',
              fontWeight: s === status ? 600 : 400,
            }}
          >
            {s}
          </Link>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📦</div>
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
              <thead>
                <tr style={{ background: 'var(--cream-dark)', textAlign: 'left' }}>
                  <Th>Order</Th>
                  <Th>Customer</Th>
                  <Th>Items</Th>
                  <Th>Total</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {list.map((o: any) => (
                  <tr key={o.id} style={{ borderTop: '1px solid var(--cream-dark)' }}>
                    <Td>
                      <Link href={`/admin/orders/${o.id}`} className="serif" style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>
                        #{o.id.slice(0, 8).toUpperCase()}
                      </Link>
                    </Td>
                    <Td>
                      <div style={{ color: 'var(--text)' }}>{o.customer_name || '—'}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>{o.customer_email}</div>
                    </Td>
                    <Td style={{ color: 'var(--text-muted)' }}>{(o.items as any[]).length}</Td>
                    <Td className="serif" style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>
                      {formatPrice(o.total)}
                    </Td>
                    <Td><StatusBadge status={o.status} /></Td>
                    <Td style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                      {new Date(o.created_at).toLocaleString()}
                    </Td>
                    <Td>
                      <Link href={`/admin/orders/${o.id}`} className="btn-text" style={{ padding: 0 }}>View →</Link>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return <th style={{ padding: '12px 16px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{children}</th>;
}
function Td({ children, className, style }: any) {
  return <td className={className} style={{ padding: '12px 16px', fontSize: 13, verticalAlign: 'top', ...style }}>{children}</td>;
}

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  paid:      { bg: 'rgba(45,90,61,0.12)',   color: '#2D5A3D' },
  pending:   { bg: 'rgba(186,117,23,0.12)', color: '#8B5E0F' },
  shipped:   { bg: 'rgba(74,128,96,0.15)',  color: '#2D5A3D' },
  delivered: { bg: 'rgba(45,90,61,0.18)',   color: '#2D5A3D' },
  cancelled: { bg: 'rgba(92,26,26,0.1)',    color: '#5C1A1A' },
  refunded:  { bg: 'rgba(168,152,104,0.15)', color: '#6B5730' },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
  return (
    <span className="serif" style={{
      fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase',
      padding: '3px 8px', background: s.bg, color: s.color, borderRadius: 100, fontWeight: 600,
    }}>
      {status}
    </span>
  );
}
