import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { IcoLock, IcoSettings } from '@/components/icons';
import RealtimeRefresh from '@/app/admin/products/RealtimeRefresh';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/signin?next=/admin');

  // Check admin role
  const { data: admin } = await supabase
    .from('admins')
    .select('role, email')
    .eq('user_id', user.id)
    .single();

  if (!admin) {
    return (
      <div className="container" style={{ padding: '60px 24px', maxWidth: 540, textAlign: 'center' }}>
        <div className="empty-state">
          <div className="icon" style={{ display: 'flex', justifyContent: 'center', color: 'var(--gold)' }}><IcoLock size={56} /></div>
          <h1 className="serif" style={{ fontSize: 24, fontWeight: 600, marginBottom: 12, color: 'var(--text)' }}>
            Admin access required
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.7 }}>
            You're signed in as <strong>{user.email}</strong>, but this account doesn't have admin privileges.
            <br /><br />
            Ask an existing admin to add you, or run this SQL in Supabase:
          </p>
          <pre style={{ fontSize: 11, background: 'var(--cream-dark)', padding: 12, borderRadius: 'var(--radius)', textAlign: 'left', overflow: 'auto' }}>
{`insert into public.admins (user_id, email, role)\nselect id, email, 'owner'\nfrom auth.users where email = '${(user.email ?? '').replace(/'/g, "''")}'`}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', background: 'var(--cream)', paddingTop: 44 }}>
      {/* Admin nav — fixed at very top */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, background: 'var(--deep)', borderBottom: '1px solid #2A1E08', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '10px 20px', minWidth: 'max-content' }}>
          <div className="serif" style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', fontStyle: 'italic', flexShrink: 0 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><IcoSettings size={14} /> Admin</span>
          </div>
          <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <a href="/admin" style={adminNavStyle}>Dashboard</a>
            <a href="/admin/orders" style={adminNavStyle}>Orders</a>
            <a href="/admin/products" style={adminNavStyle}>Products</a>
            <a href="/admin/import" style={adminNavStyle}>Import</a>
            <a href="/admin/reviews" style={adminNavStyle}>Reviews</a>
          </nav>
          <div style={{ fontSize: 11, color: '#6B5730', flexShrink: 0 }}>
            {admin.email} · <span className="serif" style={{ color: 'var(--gold)', letterSpacing: 1, textTransform: 'uppercase' }}>{admin.role}</span>
          </div>
        </div>
      </div>

      <RealtimeRefresh tables={['products', 'orders', 'reviews']} />
      {children}
    </div>
  );
}

const adminNavStyle: React.CSSProperties = {
  color: 'var(--gold-light)',
  fontSize: 12,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  fontFamily: "'Cormorant Garamond', serif",
  padding: '4px 0',
  opacity: 0.85,
};
