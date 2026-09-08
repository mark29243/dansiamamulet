import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AuditLogsPage({ searchParams }: { searchParams: { table?: string; page?: string } }) {
  const admin = createAdminClient();
  const tableFilter = searchParams.table || 'all';
  const page = parseInt(searchParams.page || '1', 10);
  const pageSize = 50;

  let query = admin.from('audit_logs').select('*', { count: 'exact' }).order('created_at', { ascending: false });
  
  if (tableFilter !== 'all') {
    query = query.eq('table_name', tableFilter);
  }
  
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data: logs, count, error } = await query;
  const list = logs ?? [];
  const totalPages = count ? Math.ceil(count / pageSize) : 1;

  return (
    <div className="container" style={{ padding: '32px 16px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--text)' }}>
          Audit Logs <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 300 }}>({count ?? 0})</span>
        </h1>
      </div>

      {error && (
        <div style={{ padding: 16, background: '#fee2e2', color: '#b91c1c', borderRadius: 8, marginBottom: 20 }}>
          <p><strong>Error loading logs:</strong> {error.message}</p>
          <p style={{ fontSize: 12, marginTop: 4 }}>Hint: Did you run the SQL script to create the <code>audit_logs</code> table?</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: 4, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
        {[
          { v: 'all', label: 'All Tables' },
          { v: 'products', label: 'Products' },
          { v: 'shopee_products', label: 'Shopee Products' },
          { v: 'orders', label: 'Orders' },
        ].map((f) => (
          <Link
            key={f.v}
            href={`/admin/audit-logs${f.v === 'all' ? '' : `?table=${f.v}`}`}
            className="serif"
            style={{
              padding: '6px 14px', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
              border: '1px solid ' + (f.v === tableFilter ? 'var(--gold)' : 'var(--cream-dark)'),
              background: f.v === tableFilter ? 'var(--gold)' : 'transparent',
              color: f.v === tableFilter ? 'var(--deep)' : 'var(--text-muted)',
              borderRadius: 100, whiteSpace: 'nowrap',
              fontWeight: f.v === tableFilter ? 600 : 400,
            }}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div style={{ overflowX: 'auto', background: 'var(--card-bg)', border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 800 }}>
          <thead>
            <tr style={{ background: 'var(--cream-light)', borderBottom: '1px solid var(--cream-dark)' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text)' }}>Time</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text)' }}>Table</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text)' }}>Action</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text)' }}>Record ID</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text)' }}>Changes</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No audit logs found.
                </td>
              </tr>
            ) : list.map((log: any) => (
              <tr key={log.id} style={{ borderBottom: '1px solid var(--cream)', verticalAlign: 'top' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                  {new Date(log.created_at).toLocaleString('th-TH')}
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--gold-dark)', fontWeight: 500 }}>
                  {log.table_name}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                    background: log.action === 'UPDATE' ? '#fffbeb' : log.action === 'INSERT' ? '#f0fdf4' : '#fef2f2',
                    color: log.action === 'UPDATE' ? '#b45309' : log.action === 'INSERT' ? '#166534' : '#991b1b',
                  }}>
                    {log.action}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: 12 }}>
                  {log.record_id}
                </td>
                <td style={{ padding: '12px 16px', maxWidth: 400 }}>
                  <details>
                    <summary style={{ cursor: 'pointer', color: 'var(--text)', fontWeight: 500, fontSize: 12 }}>View Details</summary>
                    <div style={{ marginTop: 8, padding: 8, background: '#f8f9fa', borderRadius: 4, overflowX: 'auto', fontSize: 11, fontFamily: 'monospace' }}>
                      {log.action === 'UPDATE' && (
                        <>
                          <div style={{ color: '#991b1b', marginBottom: 4 }}><strong>OLD:</strong> {JSON.stringify(log.old_data)}</div>
                          <div style={{ color: '#166534' }}><strong>NEW:</strong> {JSON.stringify(log.new_data)}</div>
                        </>
                      )}
                      {log.action === 'INSERT' && (
                        <div style={{ color: '#166534' }}><strong>NEW:</strong> {JSON.stringify(log.new_data)}</div>
                      )}
                      {log.action === 'DELETE' && (
                        <div style={{ color: '#991b1b' }}><strong>OLD:</strong> {JSON.stringify(log.old_data)}</div>
                      )}
                    </div>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 24 }}>
          {page > 1 ? (
            <Link href={`/admin/audit-logs?page=${page - 1}${tableFilter !== 'all' ? `&table=${tableFilter}` : ''}`} className="btn-outline" style={{ padding: '6px 14px', fontSize: 12 }}>← Previous</Link>
          ) : <span style={{ padding: '6px 14px', fontSize: 12, color: 'var(--text-faint)', border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius)' }}>← Previous</span>}
          
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Page {page} of {totalPages}</span>
          
          {page < totalPages ? (
            <Link href={`/admin/audit-logs?page=${page + 1}${tableFilter !== 'all' ? `&table=${tableFilter}` : ''}`} className="btn-outline" style={{ padding: '6px 14px', fontSize: 12 }}>Next →</Link>
          ) : <span style={{ padding: '6px 14px', fontSize: 12, color: 'var(--text-faint)', border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius)' }}>Next →</span>}
        </div>
      )}
    </div>
  );
}
