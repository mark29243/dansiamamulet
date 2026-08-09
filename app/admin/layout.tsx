import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminNav from './AdminNav';
import RealtimeRefresh from '@/app/admin/products/RealtimeRefresh';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/signin?next=/admin');

  const { data: admin } = await supabase
    .from('admins')
    .select('role, email')
    .eq('user_id', user.id)
    .single();

  if (!admin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F7F4', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: '#1a1a1a' }}>Access denied</h1>
          <p style={{ color: '#666', fontSize: 14 }}>Signed in as <strong>{user.email}</strong> — no admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9F7F4', fontFamily: 'system-ui, -apple-system, sans-serif', width: '100vw', maxWidth: '100vw', overflowX: 'hidden' }}>
      <AdminNav email={admin.email} role={admin.role} />
      <div style={{ paddingTop: 88 }}>
        {children}
      </div>
      <RealtimeRefresh tables={['products', 'orders', 'reviews']} />
    </div>
  );
}
