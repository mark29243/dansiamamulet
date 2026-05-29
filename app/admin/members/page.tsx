import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminMembersPage({ searchParams }: { searchParams: { q?: string } }) {
  const admin = createAdminClient();
  const q = searchParams.q?.trim().toLowerCase() || '';

  // Fetch all auth users (paginated, but we'll grab a large page)
  const { data: usersRes } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  let users = (usersRes as any)?.users ?? [];

  if (q) {
    users = users.filter((u: any) => (u.email ?? '').toLowerCase().includes(q));
  }

  // Aggregate order stats per email
  const { data: orders } = await admin
    .from('orders')
    .select('customer_email, total, status');

  const statsByEmail = new Map<string, { count: number; spent: number; paidCount: number }>();
  for (const o of orders ?? []) {
    const email = (o.customer_email ?? '').toLowerCase();
    if (!email) continue;
    const s = statsByEmail.get(email) ?? { count: 0, spent: 0, paidCount: 0 };
    s.count++;
    if (o.status === 'paid' || o.status === 'shipped' || o.status === 'delivered') {
      s.paidCount++;
      s.spent += o.total;
    }
    statsByEmail.set(email, s);
  }

  // Fetch admins to flag rows
  const { data: adminRows } = await admin.from('admins').select('user_id, role');
  const adminMap = new Map<string, string>((adminRows ?? []).map((a) => [a.user_id, a.role]));

  // Sort: most recent signup first
  users.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const totalSpent = (users as any[]).reduce((sum, u) => {
    const s = statsByEmail.get((u.email ?? '').toLowerCase());
    return sum + (s?.spent ?? 0);
  }, 0);
  const totalOrders = (users as any[]).reduce((sum, u) => {
    const s = statsByEmail.get((u.email ?? '').toLowerCase());
    return sum + (s?.count ?? 0);
  }, 0);

  return (
    <div className="container" style={{ padding: '32px 24px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--text)' }}>
          Members <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 300 }}>({users.length})</span>
        </h1>

        <form action="/admin/members" method="GET" style={{ display: 'flex', gap: 8 }}>
          <input
            name="q"
            className="input"
            placeholder="Search by email"
            defaultValue={q}
            style={{ minWidth: 240 }}
          />
          <button type="submit" className="btn-outline" style={{ padding: '10px 18px' }}>Search</button>
        </form>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
        <SmallStat label="Total Members" value={String(users.length)} />
        <SmallStat label="Total Orders" value={String(totalOrders)} />
        <SmallStat label="Total Revenue" value={formatPrice(totalSpent)} />
      </div>

      {users.length === 0 ? (
        <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
          No members yet.
        </div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--cream-dark)', textAlign: 'left' }}>
                <Th>Email</Th>
                <Th>Joined</Th>
                <Th>Orders</Th>
                <Th>Spent</Th>
                <Th>Role</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any) => {
                const stats = statsByEmail.get((u.email ?? '').toLowerCase()) ?? { count: 0, spent: 0, paidCount: 0 };
                const role = adminMap.get(u.id);
                return (
                  <tr key={u.id} style={{ borderTop: '1px solid var(--cream-dark)' }}>
                    <Td>
                      <Link href={`/admin/orders?q=${encodeURIComponent(u.email ?? '')}`} style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>
                        {u.email ?? '—'}
                      </Link>
                    </Td>
                    <Td style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                      {new Date(u.created_at).toLocaleDateString()}
                    </Td>
                    <Td>{stats.count > 0 ? `${stats.paidCount} / ${stats.count}` : '—'}</Td>
                    <Td className="serif" style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>
                      {stats.spent > 0 ? formatPrice(stats.spent) : '—'}
                    </Td>
                    <Td>
                      {role ? (
                        <span className="serif" style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', padding: '3px 8px', background: 'rgba(186,117,23,0.12)', color: '#8B5E0F', borderRadius: 100, fontWeight: 600 }}>
                          {role}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-faint)', fontSize: 11 }}>customer</span>
                      )}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function SmallStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="serif" style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      <div className="serif" style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)' }}>{value}</div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ padding: '12px 16px', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>{children}</th>;
}

function Td({ children, className, style }: any) {
  return <td className={className} style={{ padding: '12px 16px', fontSize: 13, ...style }}>{children}</td>;
}
