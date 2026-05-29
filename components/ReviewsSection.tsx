'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLang } from '@/components/LangProvider';

type Review = { id: number; rating: number; body: string; user_email: string; created_at: string };

function Stars({ n }: { n: number }) {
  return <span style={{ color: 'var(--gold)', fontSize: 14, letterSpacing: 2 }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

export default function ReviewsSection() {
  const { lang } = useLang();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/api/reviews/public?limit=6')
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setReviews(d))
      .catch(() => {});
  }, []);

  if (reviews.length === 0) return null;

  return (
    <div style={{ background: 'var(--cream)', borderTop: '1px solid var(--cream-dark)', padding: '56px 24px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="serif" style={{ fontSize: 10, letterSpacing: 5, color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: 10 }}>
            ✦ {lang === 'th' ? 'REVIEWS' : lang === 'zh' ? '客户评价' : 'REVIEWS'} ✦
          </div>
          <h2 className="serif" style={{ fontSize: 26, fontWeight: 300, fontStyle: 'italic', color: 'var(--text)' }}>
            {lang === 'th' ? 'รีวิวจากลูกค้า' : lang === 'zh' ? '客户真实评价' : 'What Our Customers Say'}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 28 }}>
          {reviews.map((r) => (
            <div key={r.id} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Stars n={r.rating} />
                <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>
                  {new Date(r.created_at).toLocaleDateString(lang === 'th' ? 'th-TH' : lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short' })}
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {r.body}
              </p>
              <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>— {r.user_email}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/reviews" className="btn-outline" style={{ fontSize: 12, padding: '10px 24px' }}>
            {lang === 'th' ? 'ดูรีวิวทั้งหมด' : lang === 'zh' ? '查看全部评价' : 'See All Reviews'}
          </Link>
        </div>
      </div>
    </div>
  );
}
