'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { useLang } from '@/components/LangProvider';
import { getDict } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';

function SuccessContent() {
  const sp = useSearchParams();
  const sessionId = sp.get('session_id');
  const { clear } = useCart();
  const { lang } = useLang();
  const t = getDict(lang);
  const [order, setOrder] = useState<{ id: string; status: string; total: number; items: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clear();
    if (!sessionId) { setLoading(false); return; }

    // Retry a few times in case webhook hasn't processed yet
    let attempts = 0;
    const tryFetch = () => {
      attempts++;
      fetch(`/api/orders/by-session?session_id=${sessionId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.order) {
            setOrder(data.order);
            setLoading(false);
          } else if (attempts < 3) {
            setTimeout(tryFetch, 1500);
          } else {
            setLoading(false);
          }
        })
        .catch(() => { setLoading(false); });
    };
    tryFetch();
  }, [sessionId, clear]);

  return (
    <div className="container animate-fade-in" style={{ padding: '60px 24px 80px', maxWidth: 640, textAlign: 'center' }}>
      {/* Success icon */}
      <div style={{ width: 80, height: 80, background: 'var(--jade)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: '0 8px 24px rgba(45,90,61,0.3)', animation: 'scaleIn 0.4s ease' }}>
        <span style={{ fontSize: 40, color: '#fff' }}>✓</span>
      </div>

      <h1 className="serif" style={{ fontSize: 32, fontWeight: 600, color: 'var(--text)', marginBottom: 14 }}>
        {t.success.title}
      </h1>
      <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
        {t.success.body}
      </p>

      {loading ? (
        <div className="card" style={{ padding: 24, marginBottom: 24 }}>
          <div className="spinner" style={{ color: 'var(--gold-dark)' }} />
          <span style={{ marginLeft: 10, fontSize: 13, color: 'var(--text-muted)' }}>{t.common.loading}</span>
        </div>
      ) : order ? (
        <div className="card" style={{ padding: 28, marginBottom: 28, textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--cream-dark)' }}>
            <div>
              <div className="serif" style={{ fontSize: 10, color: 'var(--text-faint)', letterSpacing: 2, marginBottom: 4 }}>{t.success.orderNo}</div>
              <div className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--gold-dark)' }}>
                #{order.id.slice(0, 8).toUpperCase()}
              </div>
            </div>
            <span className="badge badge-success">✓ {order.status.toUpperCase()}</span>
          </div>

          {order.items && order.items.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              {order.items.map((it: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                  <span style={{ color: 'var(--text)' }}>{it.name.slice(0, 50)} <span style={{ color: 'var(--text-faint)' }}>× {it.qty}</span></span>
                  <span className="serif" style={{ color: 'var(--gold-dark)', fontWeight: 600 }}>{formatPrice(it.price * it.qty, lang)}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--cream-dark)', paddingTop: 14, alignItems: 'baseline' }}>
            <span className="serif" style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t.cart.total}</span>
            <span className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--gold-dark)' }}>{formatPrice(order.total, lang)}</span>
          </div>
        </div>
      ) : sessionId ? (
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
          {lang === 'th' ? 'กำลังประมวลผลคำสั่งซื้อ...' : lang === 'zh' ? '订单处理中...' : 'Processing your order...'}
        </p>
      ) : null}

      <div className="card" style={{ padding: 16, background: 'rgba(45,90,61,0.06)', border: '1px solid rgba(45,90,61,0.15)', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 24 }}>📧</span>
        <span style={{ fontSize: 13, color: 'var(--text)' }}>{t.success.emailSent}</span>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/orders" className="btn-gold">{t.success.viewOrders}</Link>
        <Link href="/shop" className="btn-outline">{t.success.shop}</Link>
      </div>

      <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--cream-dark)' }}>
        <p className="serif" style={{ fontSize: 12, color: 'var(--text-faint)', letterSpacing: 1, fontStyle: 'italic' }}>
          {lang === 'th' ? 'มีคำถาม? ติดต่อเราที่' : lang === 'zh' ? '有问题？联系我们' : 'Questions? Contact us at'} <a href="mailto:info@dansiam.com" style={{ color: 'var(--gold-dark)' }}>info@dansiam.com</a>
        </p>
      </div>
    </div>
  );
}

export default function SuccessContent() {
  return (
    <Suspense fallback={<div style={{ padding: 80, textAlign: 'center' }}><div className="spinner" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
