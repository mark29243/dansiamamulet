import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const admin = createAdminClient();

  // Fetch stats in parallel
  const [productsRes, ordersRes, recentOrdersRes] = await Promise.all([
    admin.from('products').select('id, stock', { count: 'exact', head: false }),
    admin.from('orders').select('id, total, status, created_at', { count: 'exact' }),
    admin.from('orders').select('id, customer_email, customer_name, total, status, created_at, items').order('created_at', { ascending: false }).limit(5),
  ]);

  const totalProducts = productsRes.count ?? 0;
  const outOfStock = (productsRes.data ?? []).filter((p) => p.stock === 0).length;
  const lowStock = (productsRes.data ?? []).filter((p) => p.stock > 0 && p.stock <= 3).length;

  const allOrders = ordersRes.data ?? [];
  const paidOrders = allOrders.filter((o) => o.status === 'paid');
  const pendingOrders = allOrders.filter((o) => o.status === 'pending');
  const totalRevenue = paidOrders.reduce((s, o) => s + o.total, 0);

  // This month
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthOrders = paidOrders.filter((o) => new Date(o.created_at) >= monthStart);
  const monthRevenue = monthOrders.reduce((s, o) => s + o.total, 0);

  const recentOrders = recentOrdersRes.data ?? [];

  return (
    <div className="container" style={{ padding: '32px 24px 60px' }}>
      <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, marginBottom: 28, color: 'var(--text)' }}>
        Dashboard
      </h1>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 36 }}>
        <StatCard label="Total Revenue" value={formatPrice(totalRevenue)} sub={`${paidOrders.length} paid orders`} accent="var(--jade)" />
        <StatCard label="This Month" value={formatPrice(monthRevenue)} sub={`${monthOrders.length} orders this month`} accent="var(--gold-dark)" />
        <StatCard label="Pending Orders" value={String(pendingOrders.length)} sub="Awaiting payment" accent="var(--burgundy)" warn={pendingOrders.length > 0} />
        <StatCard label="Products" value={String(totalProducts)} sub={`${outOfStock} out of stock, ${lowStock} low`} accent="var(--gold-dark)" warn={outOfStock > 0 || lowStock > 0} />
      </div>

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
        <Link href="/admin/orders" className="btn-outline">📋 Manage Orders</Link>
        <Link href="/admin/products" className="btn-outline">📦 Manage Products</Link>
        <Link href="/admin/orders?status=pending" className="btn-outline">⏳ Pending Orders</Link>
      </div>

      {/* Recent orders */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 500, color: 'var(--text)' }}>Recent Orders</h2>
          <Link href="/admin/orders" className="btn-text">View all →</Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
            No orders yet.
          </div>
        ) : (
          <div className="card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--cream-dark)', textAlign: 'left' }}>
                  <Th>Order</Th>
                  <Th>Customer</Th>
                  <Th>Items</Th>
                  <Th>Total</Th>
                  <Th>Status</Th>
                  <Th>Date</Th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o: any) => (
                  <tr key={o.id} style={{ borderTop: '1px solid var(--cream-dark)' }}>
                    <Td>
                      <Link href={`/admin/orders/${o.id}`} className="serif" style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>
                        #{o.id.slice(0, 8).toUpperCase()}
                      </Link>
                    </Td>
                    <Td>{o.customer_name || o.customer_email}</Td>
                    <Td>{(o.items as any[]).length}</Td>
                    <Td className="serif" style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>{formatPrice(o.total)}</Td>
                    <Td><StatusBadge status={o.status} /></Td>
                    <Td style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                      {new Date(o.created_at).toLocaleDateString()}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value, sub, accent, warn }: { label: string; value: string; sub?: string; accent: string; warn?: boolean }) {
  return (
    <div className="card" style={{ padding: 20, borderLeft: `3px solid ${accent}` }}>
      <div className="serif" style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
        {label}
      </div>
      <div className="serif" style={{ fontSize: 26, fontWeight: 600, color: warn ? accent : 'var(--text)', marginBottom: 4 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>{sub}</div>}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ padding: '12px 16px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{children}</th>;
}

function Td({ children, className, style }: any) {
  return <td className={className} style={{ padding: '12px 16px', fontSize: 13, ...style }}>{children}</td>;
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
