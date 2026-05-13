'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLang } from '@/components/LangProvider';
import { getDict } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import type { Order } from '@/lib/types';

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  paid:      { bg: 'rgba(45,90,61,0.12)',    color: '#2D5A3D' },
  pending:   { bg: 'rgba(186,117,23,0.12)',  color: '#8B5E0F' },
  shipped:   { bg: 'rgba(74,128,96,0.15)',   color: '#2D5A3D' },
  delivered: { bg: 'rgba(45,90,61,0.18)',    color: '#2D5A3D' },
  cancelled: { bg: 'rgba(92,26,26,0.1)',     color: '#5C1A1A' },
  refunded:  { bg: 'rgba(168,152,104,0.15)', color: '#6B5730' },
};

export default function OrdersClient({ orders, userEmail }: { orders: Order[] | null; userEmail: string | null }) {
  const { lang } = useLang();
  const t = getDict(lang);
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  // Not logged in
  if (!orders) {
    return (
      <div className="container animate-fade-in" style={{ padding: '60px 24px', maxWidth: 480, textAlign: 'center' }}>
        <div className="empty-state">
          <div className="icon">🔒</div>
          <h1 className="serif" style={{ fontSize: 26, fontWeight: 500, marginBottom: 12, color: 'var(--text)' }}>
            {lang === 'th' ? 'เข้าสู่ระบบเพื่อดูคำสั่งซื้อ' : lang === 'zh' ? '登录查看订单' : 'Sign in to view orders'}
          </h1>
          <p style={{ fontSize: 13, marginBottom: 24 }}>
            {lang === 'th' ? 'เราจะส่งลิงก์เข้าสู่ระบบไปที่อีเมลของคุณ' : lang === 'zh' ? '我们将通过邮箱发送登录链接' : "We'll email you a magic link"}
          </p>
          <Link href="/signin" className="btn-gold">{t.nav.signin}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '24px 24px 80px', maxWidth: 900 }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" style={{ marginBottom: 16 }}>
        <Link href="/">{t.nav.home}</Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{ color: 'var(--text)' }}>{t.nav.orders}</span>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--text)' }}>
            {t.nav.orders}
          </h1>
          {userEmail && (
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
              👤 {userEmail}
            </p>
          )}
        </div>
        <button onClick={signOut} disabled={signingOut} className="btn-text">
          {signingOut ? <span className="spinner" /> : (lang === 'th' ? 'ออกจากระบบ' : lang === 'zh' ? '登出' : 'Sign out')}
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="icon">📦</div>
          <h2 className="serif" style={{ fontSize: 20, fontWeight: 500, color: 'var(--text)', marginBottom: 8 }}>
            {lang === 'th' ? 'ยังไม่มีคำสั่งซื้อ' : lang === 'zh' ? '暂无订单' : 'No orders yet'}
          </h2>
          <p style={{ fontSize: 13, marginBottom: 20 }}>
            {lang === 'th' ? 'เริ่มเลือกซื้อพระเครื่องของเรา' : lang === 'zh' ? '开始浏览我们的佛牌' : 'Start browsing our collection'}
          </p>
          <Link href="/shop" className="btn-gold">🛍️ {t.cart.browseShop}</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {orders.map((o) => {
            const statusColor = STATUS_COLORS[o.status] || STATUS_COLORS.pending;
            return (
              <article key={o.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ background: 'var(--cream-dark)', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div className="serif" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2, marginBottom: 2 }}>
                      {t.success.orderNo}
                    </div>
                    <div className="serif" style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold-dark)', letterSpacing: 1 }}>
                      #{o.id.slice(0, 8).toUpperCase()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      📅 {new Date(o.created_at).toLocaleDateString(lang === 'th' ? 'th-TH' : lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span style={{
                      fontSize: 10,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      background: statusColor.bg,
                      color: statusColor.color,
                      borderRadius: 999,
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                    }}>
                      {o.status}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: 20 }}>
                  <ul style={{ listStyle: 'none', marginBottom: 14 }}>
                    {o.items.map((i, k) => (
                      <li key={k} style={{ display: 'flex', gap: 12, padding: '8px 0', alignItems: 'center' }}>
                        {i.image && (
                          <div style={{ width: 48, height: 48, background: 'var(--cream-dark)', overflow: 'hidden', borderRadius: 'var(--radius)', flexShrink: 0 }}>
                            <Image src={i.image} alt="" width={48} height={48} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                          </div>
                        )}
                        <div style={{ flex: 1, fontSize: 13 }}>
                          <div style={{ color: 'var(--text)' }}>{i.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>{t.cart.qty}: {i.qty}</div>
                        </div>
                        <div className="serif" style={{ color: 'var(--gold-dark)', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>
                          {formatPrice(i.price * i.qty, lang)}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="serif" style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t.cart.total}</span>
                    <span className="serif" style={{ fontSize: 20, fontWeight: 600, color: 'var(--gold-dark)' }}>{formatPrice(o.total, lang)}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
