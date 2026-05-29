'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/CartProvider';
import { useLang } from '@/components/LangProvider';
import { useToast } from '@/components/ToastProvider';
import { getDict } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { IcoCart, IcoShop, IcoTruck, IcoCelebrate, IcoLock, IcoPackage } from '@/components/icons';

const FREE_SHIPPING_THRESHOLD = 500000;

export default function CartPage() {
  const { items, setQty, remove, subtotal, count, clear } = useCart();
  const { lang } = useLang();
  const { toast } = useToast();
  const t = getDict(lang);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (count === 0) {
    return (
      <div style={{ padding: '60px 24px' }}>
        <div className="empty-state animate-fade-in">
          <div className="icon" style={{ display: 'flex', justifyContent: 'center', color: 'var(--gold)' }}><IcoCart size={56} /></div>
          <h1 className="serif" style={{ fontSize: 26, fontWeight: 500, color: 'var(--text)', marginBottom: 12 }}>
            {t.cart.empty}
          </h1>
          <p style={{ fontSize: 14, marginBottom: 24 }}>{t.cart.emptyDesc}</p>
          <Link href="/shop" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <IcoShop size={14} /> {t.cart.browseShop}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '24px 24px 80px', maxWidth: 1100 }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="breadcrumb" style={{ marginBottom: 24 }}>
        <Link href="/">{t.nav.home}</Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{ color: 'var(--text)' }}>{t.cart.title}</span>
      </nav>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
        <h1 className="serif" style={{ fontSize: 32, fontWeight: 500, color: 'var(--text)' }}>
          {t.cart.title}
        </h1>
        <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
          ({count} {t.cart.itemCount})
        </span>
      </div>

      {/* Free shipping bar */}
      {remaining > 0 ? (
        <div className="animate-fade-in" style={{ background: 'rgba(45,90,61,0.06)', border: '1px solid rgba(45,90,61,0.15)', borderRadius: 'var(--radius-lg)', padding: 16, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ color: 'var(--jade)', display: 'flex' }}><IcoTruck size={20} /></span>
            <span style={{ fontSize: 13, color: 'var(--text)' }}>
              {lang === 'th'
                ? <>เพิ่มอีก <strong style={{ color: 'var(--jade)' }}>{formatPrice(remaining, lang)}</strong> เพื่อรับ <strong>ส่งฟรี</strong></>
                : lang === 'zh'
                ? <>再购 <strong style={{ color: 'var(--jade)' }}>{formatPrice(remaining, lang)}</strong> 即可享 <strong>免运费</strong></>
                : <>Add <strong style={{ color: 'var(--jade)' }}>{formatPrice(remaining, lang)}</strong> more for <strong>FREE shipping</strong></>
              }
            </span>
          </div>
          <div style={{ height: 6, background: 'var(--cream-dark)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--jade)', transition: 'width 0.4s' }} />
          </div>
        </div>
      ) : (
        <div className="animate-fade-in" style={{ background: 'rgba(45,90,61,0.1)', borderLeft: '3px solid var(--jade)', borderRadius: 'var(--radius-lg)', padding: 12, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'var(--jade)', display: 'flex' }}><IcoCelebrate size={20} /></span>
          <span style={{ fontSize: 13, color: 'var(--jade)', fontWeight: 600 }}>
            {lang === 'th' ? 'คุณได้รับการส่งฟรีแล้ว!' : lang === 'zh' ? '您已获得免运费！' : "You've unlocked FREE shipping!"}
          </span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }} className="cart-grid">
        {/* Items */}
        <div>
          <div className="card" style={{ padding: '4px 20px' }}>
            {items.map((item, idx) => (
              <div
                key={item.product_id}
                style={{
                  display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 16,
                  padding: '20px 0', borderBottom: idx === items.length - 1 ? 'none' : '1px solid var(--cream-dark)',
                  alignItems: 'center',
                }}
                className="cart-item"
              >
                <Link href={`/product/${item.product_id}`} style={{ width: 80, height: 80, background: 'var(--cream-dark)', overflow: 'hidden', borderRadius: 'var(--radius)', flexShrink: 0 }}>
                  {item.image && (
                    <Image src={item.image} alt={item.name} width={80} height={80} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                  )}
                </Link>

                <div>
                  <Link href={`/product/${item.product_id}`} className="serif" style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5, color: 'var(--text)', display: 'block', marginBottom: 4 }}>
                    {item.name}
                  </Link>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <span className="serif" style={{ fontSize: 16, color: 'var(--gold-dark)', fontWeight: 600 }}>
                      {formatPrice(item.price, lang)}
                    </span>
                    {/* Qty stepper */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius)' }}>
                      <button onClick={() => setQty(item.product_id, item.qty - 1)} style={qtyBtnStyle} aria-label={`Decrease ${item.name}`}>−</button>
                      <span style={{ padding: '0 12px', fontSize: 14, fontWeight: 600, minWidth: 30, textAlign: 'center' }}>{item.qty}</span>
                      <button onClick={() => setQty(item.product_id, item.qty + 1)} style={qtyBtnStyle} aria-label={`Increase ${item.name}`}>＋</button>
                    </div>
                    <button
                      onClick={() => { remove(item.product_id); toast(t.cart.removed, 'info'); }}
                      className="serif"
                      style={{ background: 'transparent', border: 'none', color: 'var(--burgundy)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', padding: '4px 8px' }}
                    >
                      × {t.cart.remove}
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }} className="hide-mobile">
                  <div className="serif" style={{ fontSize: 16, fontWeight: 600, color: 'var(--gold-dark)' }}>
                    {formatPrice(item.price * item.qty, lang)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <Link href="/shop" className="btn-text">← {t.cart.keepShopping}</Link>
            <button onClick={() => { clear(); toast(t.cart.removed, 'info'); }} className="btn-text" style={{ color: 'var(--burgundy)' }}>
              {lang === 'th' ? 'ล้างตะกร้า' : lang === 'zh' ? '清空购物车' : 'Clear cart'}
            </button>
          </div>
        </div>

        {/* Summary */}
        <aside className="card" style={{ padding: 24, height: 'fit-content', position: 'sticky', top: 140 }}>
          <h2 className="serif" style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid var(--cream-dark)' }}>
            {t.cart.orderSummary}
          </h2>

          <Row label={`${t.cart.subtotal} (${count})`} value={formatPrice(subtotal, lang)} />
          <Row
            label={t.cart.shipping}
            value={remaining > 0 ? (lang === 'th' ? 'คำนวณในขั้นถัดไป' : lang === 'zh' ? '下一步计算' : 'Next step') : <span style={{ color: 'var(--jade)', fontWeight: 600 }}>{t.cart.shippingFree}</span>}
            faint
          />

          <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: 14, marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="serif" style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text)', fontWeight: 600 }}>
              {t.cart.total}
            </span>
            <span className="serif" style={{ fontSize: 24, fontWeight: 600, color: 'var(--gold-dark)' }}>
              {formatPrice(subtotal, lang)}
            </span>
          </div>

          <Link href="/checkout" className="btn-gold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, textAlign: 'center', marginTop: 20, width: '100%' }}>
            <IcoLock size={14} /> {t.cart.checkout}
          </Link>

          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="trust-pill" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><IcoLock size={12} /> SSL Secure Checkout</div>
            <div className="trust-pill">Stripe · Visa · Mastercard</div>
            <div className="trust-pill" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><IcoPackage size={12} /> {lang === 'th' ? 'ส่งทั่วโลก' : lang === 'zh' ? '全球配送' : 'Worldwide Shipping'}</div>
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; }
          .cart-item { grid-template-columns: 60px 1fr !important; }
          .cart-item > a:first-child { width: 60px !important; height: 60px !important; }
        }
      `}</style>
    </div>
  );
}

function Row({ label, value, faint }: { label: string; value: React.ReactNode; faint?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13, color: faint ? 'var(--text-muted)' : 'var(--text)' }}>
      <span>{label}</span>
      <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>{value}</span>
    </div>
  );
}

const qtyBtnStyle: React.CSSProperties = {
  width: 32, height: 32, background: 'transparent', border: 'none',
  fontSize: 16, cursor: 'pointer', color: 'var(--text)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
};
