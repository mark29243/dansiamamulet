import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';
import { IcoClipboard, IcoPackage, IcoClock, IcoEye } from '@/components/icons';
import BatchTools from './BatchTools';
import ViewsChart from './ViewsChart';
import ChartErrorBoundary from './ChartErrorBoundary';
import RevenueChart from './RevenueChart';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const admin = createAdminClient();

  // Fetch stats in parallel
  const [productsRes, ordersRes, recentOrdersRes, usersRes, topViewedRes, allViewsRes, translationRes, wishlistRes] = await Promise.all([
    admin.from('products').select('id, stock', { count: 'exact', head: false }),
    admin.from('orders').select('id, total, status, created_at', { count: 'exact' }),
    admin.from('orders').select('id, customer_email, customer_name, total, status, created_at, items').order('created_at', { ascending: false }).limit(5),
    admin.auth.admin.listUsers({ page: 1, perPage: 1 }),
    admin.from('products').select('id, name, name_th, slug, views, images').eq('published', true).order('views', { ascending: false }).limit(5),
    admin.from('products').select('views').eq('published', true),
    admin.from('products').select('id, name, name_th, description, description_zh').eq('published', true),
    admin.rpc('get_top_wishlisted', { limit_count: 8 }),
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
  const totalMembers = (usersRes.data as any)?.total ?? 0;
  const topViewed = topViewedRes.data ?? [];
  const topWishlisted = (wishlistRes.data ?? []) as { product_id: number; name: string; name_th: string; slug: string; images: string[]; net_adds: number }[];
  const totalViews = (allViewsRes.data ?? []).reduce((s: number, p: any) => s + (p.views ?? 0), 0);

  // Translation completeness
  const allPublished = translationRes.data ?? [];
  const missingNameEn  = allPublished.filter((p) => /[ก-๙]/.test(p.name ?? ''));
  const missingDescEn  = allPublished.filter((p) => !p.description);
  const missingDescZh  = allPublished.filter((p) => !p.description_zh);
  const translationWarn = missingNameEn.length > 0 || missingDescEn.length > 0 || missingDescZh.length > 0;

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
        <StatCard label="Members" value={String(totalMembers)} sub="Registered accounts" accent="var(--jade)" />
        <StatCard label="Product Views" value={String(totalViews)} sub="Total across all products" accent="var(--gold-dark)" />
      </div>

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
        <Link href="/admin/orders" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><IcoClipboard size={14} /> Manage Orders</Link>
        <Link href="/admin/products" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><IcoPackage size={14} /> Manage Products</Link>
        <Link href="/admin/orders?status=pending" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><IcoClock size={14} /> Pending Orders</Link>
      </div>

      {/* Revenue Chart */}
      <ChartErrorBoundary>
        <RevenueChart />
      </ChartErrorBoundary>

      {/* Views Chart */}
      <ChartErrorBoundary>
        <ViewsChart />
      </ChartErrorBoundary>

      {/* Top Wishlisted */}
      <section style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 500, color: 'var(--text)' }}>♡ Top Wishlisted</h2>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>สินค้าที่ลูกค้ากด ♡ มากที่สุด</span>
        </div>
        <div className="card" style={{ overflow: 'hidden' }}>
          {topWishlisted.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>ยังไม่มีข้อมูล — รอลูกค้ากด ♡</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--cream-dark)', textAlign: 'left' }}>
                  <Th>สินค้า</Th>
                  <Th>♡ บันทึก</Th>
                </tr>
              </thead>
              <tbody>
                {topWishlisted.map((p, i) => (
                  <tr key={p.product_id} style={{ borderTop: '1px solid var(--cream-dark)' }}>
                    <Td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 11, color: 'var(--text-faint)', minWidth: 20, textAlign: 'right' }}>{i + 1}</span>
                        {Array.isArray(p.images) && p.images[0] && (
                          <img src={p.images[0]} alt="" width={36} height={36} style={{ borderRadius: 'var(--radius)', objectFit: 'cover', flexShrink: 0 }} />
                        )}
                        <Link href={`/product/${p.slug}`} target="_blank" className="serif" style={{ color: 'var(--text)', fontWeight: 600, fontSize: 13 }}>
                          {(p.name || p.name_th || '').slice(0, 60)}{(p.name || p.name_th || '').length > 60 ? '…' : ''}
                        </Link>
                      </div>
                    </Td>
                    <Td>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600, color: '#7A1A1A', fontSize: 14 }}>
                        ♥ {p.net_adds}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Top viewed products */}
      <section style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 500, color: 'var(--text)' }}>Top Viewed Products</h2>
          <Link href="/admin/products" className="btn-text">View all →</Link>
        </div>
        <div className="card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--cream-dark)', textAlign: 'left' }}>
                <Th>Product</Th>
                <Th>Views</Th>
              </tr>
            </thead>
            <tbody>
              {topViewed.length === 0 ? (
                <tr><td colSpan={2} style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>No views yet</td></tr>
              ) : topViewed.map((p: any) => (
                <tr key={p.id} style={{ borderTop: '1px solid var(--cream-dark)' }}>
                  <Td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {p.images?.[0] && (
                        <img src={p.images[0]} alt="" width={36} height={36} style={{ borderRadius: 'var(--radius)', objectFit: 'cover', flexShrink: 0 }} />
                      )}
                      <Link href={`/product/${p.slug}`} target="_blank" className="serif" style={{ color: 'var(--text)', fontWeight: 600, fontSize: 13 }}>
                        {(p.name || p.name_th || '').slice(0, 60)}{(p.name || p.name_th || '').length > 60 ? '…' : ''}
                      </Link>
                    </div>
                  </Td>
                  <Td style={{ fontWeight: 600, color: 'var(--gold-dark)' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IcoEye size={13} /> {p.views ?? 0}</span></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Translation Status */}
      <section style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 500, color: 'var(--text)' }}>
            Translation Status
          </h2>
          <span style={{ fontSize: 12, color: translationWarn ? 'var(--burgundy)' : 'var(--jade)', fontWeight: 600 }}>
            {translationWarn ? `⚠ ยังมีสินค้าที่ขาดคำแปล` : '✓ ครบทุกรายการ'}
          </span>
        </div>
        <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TranslationRow
            label="🇬🇧 ชื่ออังกฤษ (name)"
            done={allPublished.length - missingNameEn.length}
            total={allPublished.length}
            missing={missingNameEn.map((p) => p.name_th || p.name)}
          />
          <TranslationRow
            label="🇬🇧 รายละเอียดอังกฤษ (description)"
            done={allPublished.length - missingDescEn.length}
            total={allPublished.length}
            missing={missingDescEn.map((p) => p.name_th || p.name)}
          />
          <TranslationRow
            label="🇨🇳 รายละเอียดจีน (description_zh)"
            done={allPublished.length - missingDescZh.length}
            total={allPublished.length}
            missing={missingDescZh.map((p) => p.name_th || p.name)}
          />
        </div>
      </section>

      {/* Batch Tools */}
      <BatchTools />

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

function TranslationRow({ label, done, total, missing }: { label: string; done: number; total: number; missing: string[] }) {
  const pct = total === 0 ? 100 : Math.round((done / total) * 100);
  const ok = done === total;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
        <span style={{ color: 'var(--text)', fontWeight: 500 }}>{label}</span>
        <span style={{ color: ok ? 'var(--jade)' : 'var(--burgundy)', fontWeight: 600, fontSize: 12 }}>
          {done}/{total}
          {!ok && ` — ขาด ${total - done} รายการ`}
        </span>
      </div>
      <div style={{ height: 6, background: 'var(--cream-dark)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: ok ? 'var(--jade)' : pct > 80 ? 'var(--gold-dark)' : 'var(--burgundy)', borderRadius: 99, transition: 'width 0.4s' }} />
      </div>
      {missing.length > 0 && (
        <details style={{ marginTop: 6 }}>
          <summary style={{ fontSize: 11, color: 'var(--text-muted)', cursor: 'pointer', userSelect: 'none' }}>
            ดูรายการที่ขาด ({missing.length})
          </summary>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {missing.map((name, i) => (
              <span key={i} style={{ fontSize: 11, background: 'rgba(92,26,26,0.07)', color: 'var(--burgundy)', padding: '2px 8px', borderRadius: 100 }}>
                {(name ?? '').slice(0, 50)}{(name ?? '').length > 50 ? '…' : ''}
              </span>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

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
