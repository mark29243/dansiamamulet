'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SafeImage from './SafeImage';
import { useRecentlyViewed } from './RecentlyViewedProvider';
import { useLang } from './LangProvider';
import { formatPrice } from '@/lib/utils';
import WishlistButton from './WishlistButton';

type Product = {
  id: number; slug: string; name: string; name_th: string; name_zh?: string;
  price: number; sale_price: number | null; stock: number; images: string[];
};

const TITLE: Record<string, string> = {
  th: 'สินค้าที่เพิ่งดู',
  en: 'Recently Viewed',
  zh: '最近浏览',
};

export default function RecentlyViewedRow({ excludeId }: { excludeId?: number }) {
  const { ids } = useRecentlyViewed();
  const { lang } = useLang();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const visibleIds = excludeId ? ids.filter(id => id !== excludeId) : ids;

  useEffect(() => {
    if (visibleIds.length === 0) { setProducts([]); return; }
    setLoading(true);
    fetch('/api/wishlist/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: visibleIds }),
    })
      .then(r => r.json())
      .then(d => {
        // Keep order matching visibleIds
        const map = new Map((d as Product[]).map(p => [p.id, p]));
        setProducts(visibleIds.map(id => map.get(id)!).filter(Boolean));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [visibleIds.join(',')]);

  if (!loading && products.length === 0) return null;

  return (
    <section style={{ margin: '48px 0 0', borderTop: '1px solid var(--cream-dark)', paddingTop: 40 }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
          <h2 className="serif" style={{ fontSize: 20, fontWeight: 500, color: 'var(--text)' }}>
            {TITLE[lang] ?? TITLE.en}
          </h2>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {!loading && `${products.length} ${lang === 'th' ? 'รายการ' : lang === 'zh' ? '件' : 'items'}`}
          </span>
        </div>

        {/* Horizontal scroll row */}
        <div style={{ overflowX: 'auto', paddingBottom: 12 }}>
          <div style={{ display: 'flex', gap: 16, minWidth: 'max-content' }}>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="skeleton" style={{ width: 160, height: 240, borderRadius: 'var(--radius)', flexShrink: 0 }} />
                ))
              : products.map(p => {
                  const displayName = lang === 'th' ? (p.name_th || p.name) : lang === 'zh' ? (p.name_zh || p.name) : p.name;
                  const displayPrice = p.sale_price ?? p.price;
                  const hasDiscount = p.sale_price !== null && p.sale_price < p.price;
                  const inStock = p.stock > 0;
                  return (
                    <div
                      key={p.id}
                      style={{
                        width: 160, flexShrink: 0,
                        background: '#fff',
                        border: '1px solid var(--cream-dark)',
                        borderRadius: 'var(--radius)',
                        overflow: 'hidden',
                        transition: 'box-shadow 0.2s, transform 0.2s',
                        position: 'relative',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = ''; (e.currentTarget as HTMLElement).style.transform = ''; }}
                    >
                      {/* Wishlist button */}
                      <div style={{ position: 'absolute', top: 6, right: 6, zIndex: 2 }}>
                        <WishlistButton productId={p.id} size={18} />
                      </div>

                      {/* Image */}
                      <Link href={`/product/${p.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                        <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--cream)' }}>
                          {p.images?.[0] ? (
                            <SafeImage
                              src={p.images[0]}
                              alt={displayName}
                              fill
                              style={{ objectFit: 'cover' }}
                              sizes="160px"
                            />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cream-darker)', fontSize: 32 }}>☸</div>
                          )}
                          {!inStock && (
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase' }}>
                                {lang === 'th' ? 'หมด' : lang === 'zh' ? '售罄' : 'Sold Out'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div style={{ padding: '10px 10px 12px' }}>
                          <div style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500, lineHeight: 1.4, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {displayName}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
                            <span className="serif" style={{ fontSize: 14, fontWeight: 600, color: hasDiscount ? 'var(--burgundy)' : 'var(--gold-dark)' }}>
                              {formatPrice(displayPrice)}
                            </span>
                            {hasDiscount && (
                              <span style={{ fontSize: 10, color: 'var(--text-faint)', textDecoration: 'line-through' }}>
                                {formatPrice(p.price)}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
            }
          </div>
        </div>
      </div>

      <style>{`
        section:has(.recently-viewed-scroll)::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
