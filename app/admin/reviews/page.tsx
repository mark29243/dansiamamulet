'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

type Review = {
  id: number;
  order_id: string;
  user_email: string;
  rating: number;
  body: string;
  approved: boolean;
  created_at: string;
};

function Stars({ n }: { n: number }) {
  return (
    <span style={{ color: 'var(--gold)', letterSpacing: 2, fontSize: 14 }}>
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  const loadReviews = useCallback(() => {
    fetch('/api/admin/reviews')
      .then((r) => r.json())
      .then((d) => { setReviews(d); setLoading(false); });
  }, []);

  useEffect(() => {
    loadReviews();
    const supabase = createClient();
    const channel = supabase.channel('admin-reviews-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, loadReviews)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [loadReviews]);

  async function setApproved(id: number, approved: boolean) {
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved }),
    });
    if (res.ok) setReviews((prev) => prev.map((r) => r.id === id ? { ...r, approved } : r));
  }

  async function deleteReview(id: number) {
    if (!confirm('ลบรีวิวนี้?')) return;
    const res = await fetch(`/api/admin/reviews/${id}`, { method: 'DELETE' });
    if (res.ok) setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  const filtered = reviews.filter((r) =>
    filter === 'all' ? true : filter === 'pending' ? !r.approved : r.approved
  );
  const pendingCount = reviews.filter((r) => !r.approved).length;

  return (
    <div className="container" style={{ padding: '32px 24px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--text)' }}>
          Reviews{pendingCount > 0 && (
            <span style={{ marginLeft: 10, fontSize: 13, background: '#C0392B', color: '#fff', borderRadius: 999, padding: '2px 10px', fontFamily: 'sans-serif', fontWeight: 600 }}>
              {pendingCount} รอ
            </span>
          )}
        </h1>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['pending', 'approved', 'all'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'btn-gold' : 'btn-outline'}
              style={{ fontSize: 11, padding: '6px 14px', borderRadius: 999 }}>
              {f === 'pending' ? 'รออนุมัติ' : f === 'approved' ? 'อนุมัติแล้ว' : 'ทั้งหมด'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Loading…</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>ไม่มีรีวิว</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map((r) => (
            <div key={r.id} className="card" style={{ padding: 20, borderLeft: `3px solid ${r.approved ? 'var(--gold)' : 'var(--cream-dark)'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
                <div>
                  <Stars n={r.rating} />
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                    {r.user_email} · #{r.order_id.slice(0, 8).toUpperCase()} · {new Date(r.created_at).toLocaleDateString('th-TH')}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {!r.approved ? (
                    <button onClick={() => setApproved(r.id, true)} className="btn-gold" style={{ fontSize: 12, padding: '6px 16px' }}>
                      ✓ อนุมัติ
                    </button>
                  ) : (
                    <button onClick={() => setApproved(r.id, false)} className="btn-outline" style={{ fontSize: 12, padding: '6px 16px' }}>
                      ซ่อน
                    </button>
                  )}
                  <button onClick={() => deleteReview(r.id)} className="btn-outline" style={{ fontSize: 12, padding: '6px 12px', color: '#C0392B', borderColor: '#C0392B' }}>
                    ลบ
                  </button>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{r.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
