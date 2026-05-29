'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLang } from '@/components/LangProvider';

type Review = { id: number; rating: number; body: string; user_email: string; created_at: string };

function Stars({ n }: { n: number }) {
  return <span style={{ color: 'var(--gold)', fontSize: 16, letterSpacing: 2 }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

export default function ReviewsPage() {
  const { lang } = useLang();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews/public?limit=50')
      .then((r) => r.json())
      .then((d) => { setReviews(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 24px 80px', maxWidth: 860 }}>
      <nav className="breadcrumb" style={{ marginBottom: 20 }}>
        <Link href="/">{lang === 'th' ? 'หน้าแรก' : lang === 'zh' ? '首页' : 'Home'}</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{lang === 'th' ? 'รีวิวจากลูกค้า' : lang === 'zh' ? '客户评价' : 'Customer Reviews'}</span>
      </nav>

      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div className="serif" style={{ fontSize: 10, letterSpacing: 5, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 10 }}>✦ REVIEWS ✦</div>
        <h1 className="serif" style={{ fontSize: 32, fontWeight: 300, fontStyle: 'italic', marginBottom: 8 }}>
          {lang === 'th' ? 'รีวิวจากลูกค้า' : lang === 'zh' ? '客户真实评价' : 'Customer Reviews'}
        </h1>
        {avg && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 12 }}>
            <Stars n={Math.round(parseFloat(avg))} />
            <span className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--gold-dark)' }}>{avg}</span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>({reviews.length} {lang === 'th' ? 'รีวิว' : lang === 'zh' ? '条评价' : 'reviews'})</span>
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>Loading…</div>
      ) : reviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)', fontSize: 14 }}>
          {lang === 'th' ? 'ยังไม่มีรีวิว' : lang === 'zh' ? '暂无评价' : 'No reviews yet'}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20 }}>
          {reviews.map((r) => (
            <div key={r.id} className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <Stars n={r.rating} />
                <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>
                  {new Date(r.created_at).toLocaleDateString(lang === 'th' ? 'th-TH' : lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8, marginBottom: 14 }}>{r.body}</p>
              <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>— {r.user_email}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
          {lang === 'th' ? 'ซื้อสินค้าแล้ว? เขียนรีวิวเพื่อรับส่วนลด 5%'
            : lang === 'zh' ? '已购买？写评价可获得5%折扣'
            : 'Already purchased? Write a review and get 5% off your next order.'}
        </p>
        <Link href="/orders" className="btn-gold" style={{ fontSize: 13 }}>
          {lang === 'th' ? 'เขียนรีวิว' : lang === 'zh' ? '去评价' : 'Write a Review'}
        </Link>
      </div>
    </div>
  );
}
