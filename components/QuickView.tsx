'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLang } from './LangProvider';
import { useCart } from './CartProvider';
import { useToast } from './ToastProvider';
import { getDict } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { IcoAmulet } from './icons';
import type { Product } from '@/lib/types';

export default function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { lang } = useLang();
  const { add } = useCart();
  const { toast } = useToast();
  const t = getDict(lang);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (product) {
      setQty(1);
      setImgIdx(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  if (!product) return null;

  const displayName =
    lang === 'th' ? (product.name_th || product.name) :
    /* en & zh */   product.name;

  const displayPrice = product.sale_price ?? product.price;
  const hasDiscount = product.sale_price !== null && product.sale_price < product.price;

  function handleAdd() {
    if (!product || product.stock < 1) return;
    add({
      product_id: product.id,
      name: product.name,
      price: displayPrice,
      image: product.images[0] ?? '',
      qty,
    });
    toast(t.product.addedToCart, 'success');
    onClose();
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(8,5,2,0.78)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-scale-in"
        style={{
          background: '#fff',
          maxWidth: 880,
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-lg)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 12,
            right: 14,
            background: 'rgba(255,255,255,0.95)',
            border: '1px solid var(--cream-dark)',
            width: 36,
            height: 36,
            fontSize: 18,
            cursor: 'pointer',
            color: 'var(--text)',
            zIndex: 2,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ×
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 380 }} className="qv-grid">
          {/* Gallery */}
          <div style={{ background: 'var(--cream-dark)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, position: 'relative', minHeight: 320, overflow: 'hidden' }}>
              {product.images[imgIdx] ? (
                <Image
                  src={product.images[imgIdx]}
                  alt={product.name}
                  fill
                  sizes="440px"
                  style={{ objectFit: 'cover' }}
                  unoptimized
                  priority
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--gold-dark)', opacity: 0.4 }}><IcoAmulet size={80} /></div>
              )}
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: 6, padding: 8, background: 'rgba(0,0,0,0.06)', overflowX: 'auto' }}>
                {product.images.slice(0, 5).map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    style={{
                      width: 56,
                      height: 56,
                      padding: 0,
                      border: '2px solid ' + (i === imgIdx ? 'var(--gold)' : 'transparent'),
                      background: 'transparent',
                      flexShrink: 0,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      borderRadius: 3,
                    }}
                  >
                    <Image src={url} alt="" width={56} height={56} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
            <div className="serif" style={{ fontSize: 10, color: 'var(--gold-dark)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>
              {product.category}
            </div>
            <h2 className="serif" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.4, marginBottom: 16, color: 'var(--text)' }}>
              {displayName}
            </h2>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
              <span className="serif" style={{ fontSize: 26, fontWeight: 600, color: 'var(--gold-dark)' }}>
                {formatPrice(displayPrice, lang)}
              </span>
              {hasDiscount && (
                <span style={{ fontSize: 14, color: 'var(--text-faint)', textDecoration: 'line-through' }}>
                  {formatPrice(product.price, lang)}
                </span>
              )}
            </div>

            <div style={{ fontSize: 12, marginBottom: 18 }}>
              {product.stock > 0 ? (
                <span style={{ color: 'var(--jade)' }}>
                  ✓ {t.product.inStock} — {product.stock} {t.product.available}
                </span>
              ) : (
                <span style={{ color: 'var(--burgundy)' }}>✕ {t.product.oos}</span>
              )}
            </div>

            {product.short && (
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20, flex: 1 }}>
                {product.short.slice(0, 200)}{product.short.length > 200 ? '…' : ''}
              </p>
            )}

            {product.stock > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span className="label" style={{ marginBottom: 0 }}>{t.cart.qty}</span>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius)' }}>
                  <button onClick={() => setQty(Math.max(1, qty - 1))} style={qtyBtnStyle} aria-label="Decrease">−</button>
                  <span style={{ padding: '0 16px', fontSize: 14, fontWeight: 600 }}>{qty}</span>
                  <button onClick={() => setQty(Math.min(product.stock, qty + 1))} style={qtyBtnStyle} aria-label="Increase">＋</button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
              <button onClick={handleAdd} className="btn-gold" disabled={product.stock < 1} style={{ flex: 1 }}>
                {t.product.addCart}
              </button>
              <Link
                href={`/product/${product.slug}`}
                className="btn-outline"
                onClick={onClose}
                style={{ flexShrink: 0 }}
              >
                {t.product.viewDetails}
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 700px) {
            .qv-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </div>
  );
}

const qtyBtnStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  background: 'transparent',
  border: 'none',
  fontSize: 16,
  cursor: 'pointer',
};
