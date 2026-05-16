'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { useCart } from '@/components/CartProvider';
import { useToast } from '@/components/ToastProvider';
import { getDict, getCatName } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import LocalPrice from '@/components/LocalPrice';
import type { Product } from '@/lib/types';

export default function ProductDetail({ product: p, related = [] }: { product: Product; related?: Product[] }) {
  const { lang } = useLang();
  const { add } = useCart();
  const { toast } = useToast();
  const t = getDict(lang);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);

  // ชื่อและรายละเอียดตามภาษา
  const displayName = lang === 'th' ? (p.name_th || p.name) : p.name;
  const displayDesc = lang === 'th' ? (p.description_th || p.description) : lang === 'zh' ? (p.description_zh || p.description) : p.description;
  const displayShort = lang === 'th' ? (p.description_th ? p.description_th.slice(0, 200) : p.short) : lang === 'zh' ? (p.description_zh ? p.description_zh.slice(0, 200) : p.short) : p.short;

  const displayPrice = p.sale_price ?? p.price;

  const hasDiscount = p.sale_price !== null && p.sale_price < p.price;
  const lowStock = p.stock > 0 && p.stock <= 3;

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoomOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [zoomOpen]);

  function handleAdd() {
    if (p.stock < 1) return;
    add({
      product_id: p.id,
      name: p.name,
      price: displayPrice,
      image: p.images[0] ?? '',
      qty,
    });
    toast(t.product.addedToCart, 'success');
  }

  function handleBuyNow() {
    if (p.stock < 1) return;
    add({
      product_id: p.id,
      name: p.name,
      price: displayPrice,
      image: p.images[0] ?? '',
      qty,
    });
    window.location.href = '/checkout';
  }

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try { await navigator.share({ title: p.name, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast(t.product.shareSuccess, 'success');
    }
  }

  return (
    <>
      <div style={{ background: 'var(--cream)', padding: '20px 0 60px' }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb" style={{ marginBottom: 20 }}>
            <Link href="/">{t.nav.home}</Link>
            <span className="breadcrumb-sep">/</span>
            <Link href="/shop">{t.nav.shop}</Link>
            <span className="breadcrumb-sep">/</span>
            <span style={{ color: 'var(--text)' }}>{getCatName(p.category, lang)}</span>
            <span className="breadcrumb-sep">/</span>
            <span style={{ color: 'var(--text-muted)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {displayName}
            </span>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }} className="detail-grid">
            {/* Gallery */}
            <div className="animate-fade-in">
              <div
                onClick={() => p.images[activeImg] && setZoomOpen(true)}
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  background: 'linear-gradient(135deg, var(--cream-dark), var(--cream-darker))',
                  overflow: 'hidden',
                  marginBottom: 12,
                  position: 'relative',
                  cursor: p.images[activeImg] ? 'zoom-in' : 'default',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                {p.images[activeImg] ? (
                  <Image
                    src={p.images[activeImg]}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    style={{ objectFit: 'contain' }}
                    unoptimized
                    priority
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 80 }}>🙏</div>
                )}
                {p.images[activeImg] && (
                  <div className="serif" style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(255,255,255,0.9)', padding: '4px 10px', fontSize: 10, letterSpacing: 1.5, color: 'var(--text-muted)', borderRadius: 2 }}>
                    🔍 {lang === 'th' ? 'คลิกเพื่อขยาย' : lang === 'zh' ? '点击放大' : 'Click to zoom'}
                  </div>
                )}
              </div>
              {p.images.length > 1 && (
                <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                  {p.images.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      aria-label={`View image ${i + 1}`}
                      style={{
                        width: 76,
                        height: 76,
                        padding: 0,
                        border: '2px solid ' + (i === activeImg ? 'var(--gold)' : 'transparent'),
                        background: 'var(--cream-dark)',
                        flexShrink: 0,
                        cursor: 'pointer',
                        overflow: 'hidden',
                        borderRadius: 'var(--radius)',
                        transition: 'border-color 0.2s',
                      }}
                    >
                      <Image src={url} alt="" width={76} height={76} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="animate-fade-up">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, gap: 12 }}>
                <div className="serif" style={{ fontSize: 11, color: 'var(--gold-dark)', letterSpacing: 3, textTransform: 'uppercase' }}>
                  {getCatName(p.category, lang)}
                </div>
                <button
                  onClick={handleShare}
                  className="serif"
                  style={{ background: 'transparent', border: '1px solid var(--cream-dark)', padding: '4px 12px', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-muted)', borderRadius: 'var(--radius)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  aria-label={t.product.share}
                >
                  ↗ {t.product.share}
                </button>
              </div>

              <h1 className="serif" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.35, marginBottom: 20, color: 'var(--text)' }}>
                {displayName}
              </h1>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
                <span className="serif" style={{ fontSize: 36, fontWeight: 600, color: 'var(--gold-dark)' }}>
                  <LocalPrice satang={displayPrice} lang={lang} />
                </span>
                {hasDiscount && (
                  <>
                    <span style={{ fontSize: 16, color: 'var(--text-faint)', textDecoration: 'line-through' }}>
                      <LocalPrice satang={p.price} lang={lang} />
                    </span>
                    <span className="badge badge-sale" style={{ marginLeft: 4 }}>
                      -{Math.round((1 - p.sale_price! / p.price) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <div style={{ marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {p.stock > 0 ? (
                  <>
                    <span className="badge badge-success">
                      ✓ {t.product.inStock}
                    </span>
                    {lowStock && (
                      <span className="badge badge-warning">
                        🔥 {t.product.onlyLeft} {p.stock} {lang === 'th' ? 'องค์' : lang === 'zh' ? '件' : 'left'}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="badge badge-oos">✕ {t.product.oos}</span>
                )}
              </div>

              {p.short && (
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 24, padding: '14px 16px', background: '#fff', borderLeft: '3px solid var(--gold)', borderRadius: '0 var(--radius) var(--radius) 0' }}>
                  {displayShort}
                </p>
              )}

              {p.stock > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <span className="label" style={{ marginBottom: 0 }}>{t.cart.qty}</span>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius)' }}>
                    <button onClick={() => setQty(Math.max(1, qty - 1))} style={qtyBtnStyle} aria-label="Decrease">−</button>
                    <span style={{ padding: '0 18px', fontSize: 15, fontWeight: 600, minWidth: 50, textAlign: 'center' }}>{qty}</span>
                    <button onClick={() => setQty(Math.min(p.stock, qty + 1))} style={qtyBtnStyle} aria-label="Increase">＋</button>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>{p.stock} {t.product.available}</span>
                </div>
              )}

              {/* Desktop CTAs */}
              <div className="hide-mobile" style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                <button className="btn-gold" onClick={handleAdd} disabled={p.stock < 1} style={{ flex: '1 1 200px' }}>
                  🛒 {t.product.addCart}
                </button>
                <button className="btn-outline" onClick={handleBuyNow} disabled={p.stock < 1} style={{ flex: '1 1 200px' }}>
                  {t.product.buyNow} →
                </button>
              </div>

              {/* Trust pills */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                <span className="trust-pill">🏛️ {t.trust.t1}</span>
                <span className="trust-pill">📜 {t.trust.t3}</span>
                <span className="trust-pill">🌏 {t.trust.t2}</span>
              </div>

              {/* Description */}
              {p.description && p.description.length > (p.short?.length ?? 0) + 50 && (
                <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: 24 }}>
                  <h3 className="serif" style={{ fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 14 }}>
                    {t.product.description}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.9, whiteSpace: 'pre-wrap' }}>
                    {displayDesc}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <section style={{ marginTop: 80 }}>
              <h2 className="serif" style={{ fontSize: 22, fontWeight: 500, color: 'var(--text)', marginBottom: 24, textAlign: 'center' }}>
                {t.product.relatedProducts}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
                {related.slice(0, 4).map((r) => (
                  <Link key={r.id} href={`/product/${r.slug}`} className="card" style={{ overflow: 'hidden', padding: 0, textDecoration: 'none', color: 'inherit', transition: 'all 0.2s' }}>
                    <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'var(--cream-dark)' }}>
                      {r.images[0] && (
                        <Image src={r.images[0]} alt={r.name} width={220} height={220} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                      )}
                    </div>
                    <div style={{ padding: 14 }}>
                      <h4 className="serif" style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 36 }}>
                        {r.name}
                      </h4>
                      <div className="serif" style={{ fontSize: 16, fontWeight: 600, color: 'var(--gold-dark)' }}>
                        {formatPrice(r.sale_price ?? r.price, lang)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Sticky CTA bar (mobile) */}
      <div className="sticky-cart-bar show">
        <div style={{ flex: 1 }}>
          <div className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--gold-dark)' }}>
            {formatPrice(displayPrice * qty, lang)}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-faint)' }}>{t.cart.qty}: {qty}</div>
        </div>
        <button className="btn-gold" onClick={handleAdd} disabled={p.stock < 1} style={{ padding: '13px 24px' }}>
          🛒 {t.product.addCart}
        </button>
      </div>

      {/* Image zoom modal */}
      {zoomOpen && p.images[activeImg] && (
        <div
          onClick={() => setZoomOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: 20, animation: 'fadeIn 0.2s ease' }}
        >
          <button
            onClick={() => setZoomOpen(false)}
            aria-label="Close"
            style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: 40, height: 40, borderRadius: '50%', fontSize: 20, cursor: 'pointer' }}
          >
            ×
          </button>
          <Image
            src={p.images[activeImg]}
            alt={p.name}
            width={1000}
            height={1000}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', width: 'auto', height: 'auto' }}
            unoptimized
          />
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .sticky-cart-bar.show { display: flex !important; align-items: center; gap: 12px; }
          main { padding-bottom: 80px; }
        }
      `}</style>
    </>
  );
}

const qtyBtnStyle: React.CSSProperties = {
  width: 36,
  height: 36,
  background: 'transparent',
  border: 'none',
  fontSize: 18,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text)',
};
