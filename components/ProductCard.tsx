'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from './LangProvider';
import { useCart } from './CartProvider';
import { useToast } from './ToastProvider';
import { getDict } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import LocalPrice from './LocalPrice';
import type { Product } from '@/lib/types';
import { useState } from 'react';

export default function ProductCard({ p, onQuickView }: { p: Product; onQuickView?: (p: Product) => void }) {
  const { lang } = useLang();
  const displayName = lang === 'th' ? (p.name_th || p.name) : lang === 'zh' ? (p.name_zh || p.name) : p.name;
  const { add } = useCart();
  const { toast } = useToast();
  const t = getDict(lang);
  const [loading, setLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const displayPrice = p.sale_price ?? p.price;
  const hasDiscount = p.sale_price !== null && p.sale_price < p.price;
  const lowStock = p.stock > 0 && p.stock <= 3;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (p.stock < 1 || loading) return;
    setLoading(true);
    add({
      product_id: p.id,
      name: p.name,
      price: displayPrice,
      image: p.images[0] ?? '',
      qty: 1,
    });
    toast(`${t.product.addedToCart}: ${p.name.slice(0, 40)}${p.name.length > 40 ? '…' : ''}`, 'success');
    setTimeout(() => setLoading(false), 600);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(p);
  };

  return (
    <Link
      href={`/product/${p.slug}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
    >
      <article
        className="pcard"
        style={{
          background: '#fff',
          border: '1px solid var(--cream-dark)',
          borderRadius: 'var(--radius-lg)',
          transition: 'all var(--transition)',
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 3, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {p.stock === 0 && <span className="badge badge-oos">{t.product.oos}</span>}
          {hasDiscount && p.stock > 0 && <span className="badge badge-sale">SALE</span>}
          {lowStock && (
            <span className="badge badge-warning">
              {t.product.onlyLeft} {p.stock} {lang === 'th' ? 'องค์' : lang === 'zh' ? '件' : 'left'}
            </span>
          )}
        </div>

        {/* Quick view button (desktop hover) */}
        {onQuickView && (
          <button
            onClick={handleQuickView}
            className="quick-view-btn serif"
            aria-label={t.product.quickView}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 3,
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid var(--cream-dark)',
              padding: '6px 12px',
              fontSize: 10,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'var(--text)',
              borderRadius: 3,
              opacity: 0,
              transform: 'translateY(-4px)',
              transition: 'all var(--transition)',
            }}
          >
            👁 {t.product.quickView}
          </button>
        )}

        {/* Image */}
        <div
          style={{
            width: '100%',
            aspectRatio: '1',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, var(--cream-dark), var(--cream-darker))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {!imgLoaded && p.images[0] && (
            <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />
          )}
          {p.images[0] ? (
            <Image
              src={p.images[0]}
              alt={p.name}
              fill
              sizes="(max-width: 768px) 50vw, 260px"
              style={{
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                opacity: imgLoaded ? 1 : 0,
              }}
              onLoad={() => setImgLoaded(true)}
              unoptimized
            />
          ) : (
            <span style={{ fontSize: 56, opacity: 0.3 }}>🙏</span>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="serif" style={{ fontSize: 10, color: 'var(--gold-dark)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
            {p.category}
          </div>
          <h3
            className="serif"
            style={{
              fontSize: 14,
              fontWeight: 600,
              lineHeight: 1.4,
              marginBottom: 12,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 39,
            }}
          >
            {displayName}
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--cream-dark)', paddingTop: 12, marginTop: 'auto' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--gold-dark)' }}>
                  {formatPrice(displayPrice, lang)}
                </span>
                {hasDiscount && (
                  <span style={{ fontSize: 11, color: 'var(--text-faint)', textDecoration: 'line-through' }}>
                    {formatPrice(p.price, lang)}
                  </span>
                )}
              </div>
              <span style={{ fontSize: 9, color: 'var(--text-faint)', letterSpacing: 1, textTransform: 'uppercase' }}>{t.product.baht}</span>
            </div>
            <button
              onClick={handleAdd}
              disabled={p.stock < 1 || loading}
              aria-label={t.product.addCart}
              style={{
                background: loading ? 'var(--jade)' : p.stock < 1 ? '#E5DDC8' : 'var(--deep)',
                color: p.stock < 1 ? '#A89868' : 'var(--gold)',
                border: 'none',
                width: 40,
                height: 40,
                cursor: p.stock < 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                borderRadius: 'var(--radius)',
                transition: 'all var(--transition)',
                flexShrink: 0,
              }}
            >
              {loading ? '✓' : '＋'}
            </button>
          </div>
        </div>

        <style>{`
          .pcard:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--gold-light); }
          .pcard:hover img { transform: scale(1.05); }
          .pcard:hover .quick-view-btn { opacity: 1; transform: translateY(0); }
          .pcard:hover .quick-view-btn:hover { background: var(--gold); color: var(--deep); border-color: var(--gold); }
          @media (max-width: 768px) {
            .quick-view-btn { display: none; }
          }
        `}</style>
      </article>
    </Link>
  );
}
