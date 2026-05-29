'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/components/LangProvider';
import { useCart } from '@/components/CartProvider';
import { useToast } from '@/components/ToastProvider';
import { getDict } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { IcoSearch, IcoAmulet, IcoShop } from '@/components/icons';

type Result = {
  id: number; slug: string; name: string; category: string;
  price: number; sale_price: number | null; stock: number;
  images: string[]; short: string | null;
};

function SearchContent() {
  const sp = useSearchParams();
  const router = useRouter();
  const { lang } = useLang();
  const { add } = useCart();
  const { toast } = useToast();
  const t = getDict(lang);

  const [query, setQuery] = useState(sp.get('q') ?? '');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setSearched(false); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=48`);
      const data = await res.json();
      setResults(data.results ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }, []);

  useEffect(() => {
    const initial = sp.get('q') ?? '';
    if (initial) { setQuery(initial); doSearch(initial); }
    inputRef.current?.focus();
  }, [sp, doSearch]);

  function handleChange(v: string) {
    setQuery(v);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doSearch(v);
      const params = new URLSearchParams(v ? { q: v } : {});
      router.replace(`/search?${params}`, { scroll: false });
    }, 350);
  }

  function handleAddCart(p: Result, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add({ product_id: p.id, name: p.name, price: p.sale_price ?? p.price, image: p.images[0] ?? '', qty: 1 });
    toast(t.product.addedToCart, 'success');
  }

  const titleClass = lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif';

  return (
    <div style={{ padding: '24px 0 80px', minHeight: '70vh' }}>
      {/* Search hero */}
      <div style={{ background: 'var(--deep)', padding: '40px 24px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', pointerEvents: 'none' }} aria-hidden>
          <IcoSearch size={200} />
        </div>
        <div className="serif" style={{ fontSize: 10, letterSpacing: 5, color: 'var(--gold)', marginBottom: 12 }}>✦ SEARCH ✦</div>
        <h1 className={titleClass} style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: lang === 'en' ? 300 : 600, color: '#fff', fontStyle: lang === 'en' ? 'italic' : 'normal', marginBottom: 28 }}>
          {lang === 'th' ? 'ค้นหาพระเครื่อง' : lang === 'zh' ? '搜索佛牌' : 'Search Amulets'}
        </h1>

        {/* Big search box */}
        <div className="container" style={{ maxWidth: 640, position: 'relative' }}>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={t.shop.search}
            aria-label={t.shop.search}
            style={{
              width: '100%', padding: '16px 52px 16px 20px', fontSize: 16,
              background: '#fff', border: 'none', borderRadius: 'var(--radius-lg)',
              fontFamily: "'Sarabun', sans-serif", boxShadow: '0 8px 28px rgba(0,0,0,0.3)', outline: 'none',
            }}
          />
          <span style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            {loading ? <span className="spinner" style={{ color: 'var(--text-muted)' }} /> : <IcoSearch size={20} />}
          </span>
        </div>

        {/* Suggestions */}
        {!query && (
          <div style={{ marginTop: 18, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Somdej', 'Luang Pho', 'Coin', 'Takrut', 'Rahu'].map((s) => (
              <button
                key={s}
                onClick={() => handleChange(s)}
                className="serif"
                style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)', color: 'var(--gold-light)', padding: '5px 14px', borderRadius: 100, fontSize: 12, letterSpacing: 1, cursor: 'pointer' }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="container" style={{ padding: '32px 24px 0' }}>
        {/* Breadcrumb */}
        <nav className="breadcrumb" style={{ marginBottom: 24 }}>
          <Link href="/">{t.nav.home}</Link>
          <span className="breadcrumb-sep">/</span>
          <span style={{ color: 'var(--text)' }}>{lang === 'th' ? 'ค้นหา' : lang === 'zh' ? '搜索' : 'Search'}</span>
          {query && <><span className="breadcrumb-sep">/</span><span style={{ color: 'var(--text-muted)' }}>{query}</span></>}
        </nav>

        {/* Results count */}
        {searched && (
          <p className="serif" style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24, fontStyle: 'italic' }}>
            {results.length > 0
              ? `${results.length} ${t.shop.results} ${lang === 'th' ? 'สำหรับ' : lang === 'zh' ? '关于' : 'for'} "${query}"`
              : `${t.shop.noResults} "${query}"`}
          </p>
        )}

        {/* Empty state */}
        {searched && results.length === 0 && (
          <div className="empty-state animate-fade-in">
            <div className="icon" style={{ display: 'flex', justifyContent: 'center', color: 'var(--gold)' }}><IcoSearch size={56} /></div>
            <h2 className="serif" style={{ fontSize: 20, fontWeight: 500, color: 'var(--text)', marginBottom: 8 }}>
              {t.shop.noResults}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
              {lang === 'th' ? 'ลองใช้คำค้นหาอื่น หรือดูสินค้าทั้งหมด' : lang === 'zh' ? '尝试其他关键词，或浏览全部商品' : 'Try a different keyword or browse the full collection'}
            </p>
            <Link href="/shop" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <IcoShop size={14} /> {t.cart.browseShop}
            </Link>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="skeleton" style={{ height: 200, borderRadius: 0 }} />
                <div style={{ padding: 14 }}>
                  <div className="skeleton" style={{ height: 10, width: '40%', marginBottom: 10 }} />
                  <div className="skeleton" style={{ height: 13, width: '85%', marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 20, width: '45%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results grid */}
        {!loading && results.length > 0 && (
          <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
            {results.map((p) => {
              const price = p.sale_price ?? p.price;
              const hasDiscount = p.sale_price !== null && p.sale_price < p.price;
              return (
                <Link key={p.id} href={`/product/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article
                    className="card"
                    style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all var(--transition)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--gold-light)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = ''; }}
                  >
                    {p.stock === 0 && (
                      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
                        <span className="badge badge-oos">{t.product.oos}</span>
                      </div>
                    )}
                    <div style={{ aspectRatio: '1', background: 'linear-gradient(135deg,var(--cream-dark),var(--cream-darker))', overflow: 'hidden', position: 'relative' }}>
                      {p.images[0] ? (
                        <Image src={p.images[0]} alt={p.name} fill sizes="220px" style={{ objectFit: 'cover', transition: 'transform 0.4s' }} unoptimized />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                          <IcoAmulet size={48} />
                        </div>
                      )}
                    </div>
                    <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div className="serif" style={{ fontSize: 9, color: 'var(--gold-dark)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 5 }}>
                        {p.category}
                      </div>
                      <h3 className="serif" style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 37 }}>
                        {p.name}
                      </h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--cream-dark)', paddingTop: 10 }}>
                        <div>
                          <div className="serif" style={{ fontSize: 16, fontWeight: 600, color: 'var(--gold-dark)' }}>
                            {formatPrice(price, lang)}
                          </div>
                          {hasDiscount && (
                            <div style={{ fontSize: 10, color: 'var(--text-faint)', textDecoration: 'line-through' }}>
                              {formatPrice(p.price, lang)}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={(e) => handleAddCart(p, e)}
                          disabled={p.stock < 1}
                          aria-label={t.product.addCart}
                          style={{
                            width: 34, height: 34, background: p.stock < 1 ? '#E5DDC8' : 'var(--deep)',
                            color: p.stock < 1 ? '#A89868' : 'var(--gold)',
                            border: 'none', borderRadius: 'var(--radius)', fontSize: 16,
                            cursor: p.stock < 1 ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0, transition: 'all .2s',
                          }}
                        >
                          ＋
                        </button>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPageContent() {
  return (
    <Suspense fallback={
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div className="spinner" style={{ color: 'var(--gold-dark)' }} />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
