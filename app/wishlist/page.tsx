'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/components/WishlistProvider';
import { useCart } from '@/components/CartProvider';
import { useToast } from '@/components/ToastProvider';
import { useLang } from '@/components/LangProvider';
import { getDict, getCatName } from '@/lib/i18n';
import WishlistButton from '@/components/WishlistButton';
import { IcoAmulet } from '@/components/icons';

type Product = {
  id: number;
  slug: string;
  name: string;
  name_th: string | null;
  name_zh: string | null;
  price: number;
  sale_price: number | null;
  stock: number;
  images: string[];
  category: string;
};

const labels = {
  th: { title: 'รายการโปรด', empty: 'ยังไม่มีสินค้าที่บันทึกไว้', emptyDesc: 'กดไอคอน ♡ บนสินค้าที่ชอบเพื่อบันทึกไว้ดูทีหลัง', browse: 'เลือกดูสินค้า', addCart: 'เพิ่มในตะกร้า', oos: 'หมดสต็อก', items: 'รายการ' },
  en: { title: 'Wishlist', empty: 'Your wishlist is empty', emptyDesc: 'Tap the ♡ on any product to save it for later', browse: 'Browse Shop', addCart: 'Add to Cart', oos: 'Out of Stock', items: 'items' },
  zh: { title: '心愿单', empty: '心愿单为空', emptyDesc: '点击商品上的 ♡ 收藏喜爱的佛牌', browse: '浏览商品', addCart: '加入购物车', oos: '已售完', items: '件' },
};

export default function WishlistPage() {
  const { items, count } = useWishlist();
  const { add } = useCart();
  const { toast } = useToast();
  const { lang } = useLang();
  const t = getDict(lang);
  const L = labels[lang];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (items.length === 0) { setProducts([]); setLoading(false); return; }
    setLoading(true);
    fetch('/api/wishlist/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: items }),
    })
      .then(r => r.json())
      .then(d => setProducts(d.products ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [items]);

  function getDisplayName(p: Product) {
    return lang === 'th' ? (p.name_th || p.name) : p.name;
  }

  function handleAdd(p: Product) {
    if (p.stock < 1) return;
    add({ product_id: p.id, name: p.name, price: p.sale_price ?? p.price, image: p.images[0] ?? '', qty: 1 });
    toast(`${t.product.addedToCart}: ${p.name.slice(0, 40)}`, 'success');
  }

  return (
    <div className="container" style={{ padding: '40px 24px 80px', maxWidth: 1000 }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div className="serif" style={{ fontSize: 10, letterSpacing: 5, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 10 }}>
          ✦ WISHLIST ✦
        </div>
        <h1 className="serif" style={{ fontSize: 30, fontWeight: 500, color: 'var(--text)', marginBottom: 6 }}>
          {L.title}
        </h1>
        {count > 0 && (
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{count} {L.items}</p>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
          {Array.from({ length: Math.min(items.length, 6) }).map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 280, borderRadius: 'var(--radius-lg)' }} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && items.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <div style={{ fontSize: 56, marginBottom: 16, opacity: 0.3 }}>♡</div>
          <h2 className="serif" style={{ fontSize: 22, fontWeight: 500, color: 'var(--text)', marginBottom: 10 }}>{L.empty}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 28 }}>{L.emptyDesc}</p>
          <Link href="/shop" className="btn-gold">{L.browse}</Link>
        </div>
      )}

      {/* Grid */}
      {!loading && products.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
          {products.map(p => {
            const displayPrice = p.sale_price ?? p.price;
            const hasDiscount = p.sale_price !== null && p.sale_price < p.price;
            return (
              <div key={p.id} className="card animate-fade-in" style={{ overflow: 'hidden', padding: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                {/* Remove button */}
                <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
                  <WishlistButton productId={p.id} size={14} />
                </div>

                {/* Badge */}
                {p.stock === 0 && (
                  <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
                    <span className="badge badge-oos">{L.oos}</span>
                  </div>
                )}

                <Link href={`/product/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {/* Image */}
                  <div style={{ aspectRatio: '4/3', background: 'var(--cream-dark)', overflow: 'hidden', position: 'relative' }}>
                    {p.images[0] ? (
                      <Image src={p.images[0]} alt={getDisplayName(p)} fill sizes="220px" style={{ objectFit: 'contain' }} unoptimized />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <IcoAmulet size={48} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding: '14px 16px 12px' }}>
                    <div className="serif" style={{ fontSize: 10, color: 'var(--gold-dark)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
                      {getCatName(p.category, lang)}
                    </div>
                    <h3 className="serif" style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: 'var(--text)', marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 38 }}>
                      {getDisplayName(p)}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--gold-dark)' }}>
                        ฿{new Intl.NumberFormat('th-TH').format(displayPrice / 100)}
                      </span>
                      {hasDiscount && (
                        <span style={{ fontSize: 11, color: 'var(--text-faint)', textDecoration: 'line-through' }}>
                          ฿{new Intl.NumberFormat('th-TH').format(p.price / 100)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Add to cart */}
                <div style={{ padding: '0 16px 16px', marginTop: 'auto' }}>
                  <button
                    onClick={() => handleAdd(p)}
                    disabled={p.stock < 1}
                    className={p.stock > 0 ? 'btn-gold' : ''}
                    style={{
                      width: '100%',
                      padding: '10px',
                      fontSize: 12,
                      letterSpacing: 1,
                      ...(p.stock < 1 ? { background: 'var(--cream-dark)', color: 'var(--text-faint)', border: 'none', borderRadius: 'var(--radius)', cursor: 'not-allowed' } : {}),
                    }}
                  >
                    {p.stock < 1 ? L.oos : L.addCart}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Back to shop */}
      {!loading && products.length > 0 && (
        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <Link href="/shop" className="btn-outline">{L.browse} →</Link>
        </div>
      )}
    </div>
  );
}
