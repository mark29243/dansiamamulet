'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import QuickView from '@/components/QuickView';
import { useLang } from '@/components/LangProvider';
import { getDict } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';

const PER_PAGE = 12;

export default function HomeShop({ products }: { products: Product[] }) {
  const { lang } = useLang();
  const t = getDict(lang);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'instock'>('all');
  const [sort, setSort] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
  const [page, setPage] = useState(1);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((p) => counts.set(p.category, (counts.get(p.category) || 0) + 1));
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }, [products]);

  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);

  const maxPrice = useMemo(() => Math.max(...products.map((p) => p.sale_price ?? p.price)) / 100, [products]);

  const filtered = useMemo(() => {
    let r = [...products];
    const q = search.toLowerCase().trim();
    if (q) {
      r = r.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q)
      );
    }
    if (filter === 'instock') r = r.filter((p) => p.stock > 0);
    if (selectedCats.length > 0) r = r.filter((p) => selectedCats.includes(p.category));
    r = r.filter((p) => {
      const price = (p.sale_price ?? p.price) / 100;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    if (sort === 'price-asc') r.sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
    else if (sort === 'price-desc') r.sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));
    else if (sort === 'name') r.sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [products, search, filter, selectedCats, priceRange, sort]);

  useEffect(() => { setPage(1); }, [search, filter, selectedCats, priceRange, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  const hasActiveFilters = search || filter !== 'all' || selectedCats.length > 0 || priceRange[1] !== Infinity;

  function clearAllFilters() {
    setSearch('');
    setFilter('all');
    setSelectedCats([]);
    setPriceRange([0, Infinity]);
    setSort('default');
  }

  function toggleCat(cat: string) {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  const titleClass = lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif';

  return (
    <section id="shop" style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '56px 24px 28px' }}>
        <div className="serif" style={{ fontSize: 10, letterSpacing: 5, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 10 }}>
          ✦ COLLECTION ✦
        </div>
        <h2 className={titleClass} style={{ fontSize: 32, fontWeight: lang === 'en' ? 300 : 600, color: 'var(--text)', fontStyle: lang === 'en' ? 'italic' : 'normal' }}>
          {t.shop.title}
        </h2>
        <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text-muted)' }}>
          {filtered.length} {t.shop.results}
        </div>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32 }} data-grid="shop">
        {/* Sidebar (desktop) */}
        <aside className="hide-mobile" style={{ position: 'sticky', top: 140, alignSelf: 'start', maxHeight: 'calc(100vh - 160px)', overflowY: 'auto', paddingRight: 8 }}>
          <FilterPanel
            t={t} lang={lang} categories={categories}
            selectedCats={selectedCats} toggleCat={toggleCat}
            filter={filter} setFilter={setFilter}
            priceRange={priceRange} setPriceRange={setPriceRange}
            maxPrice={maxPrice}
            hasActiveFilters={!!hasActiveFilters}
            clearAll={clearAllFilters}
          />
        </aside>

        {/* Main content */}
        <div>
          {/* Top toolbar */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
              <input
                className="input"
                placeholder={t.shop.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 38, paddingRight: search ? 38 : 14 }}
                aria-label={t.shop.search}
              />
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-faint)' }}>🔍</span>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 18, padding: 4 }}
                >
                  ×
                </button>
              )}
            </div>

            <button
              onClick={() => setMobileFilterOpen(true)}
              className="serif show-mobile-only"
              style={{
                background: 'transparent',
                border: '1px solid var(--cream-dark)',
                padding: '11px 16px',
                fontSize: 12,
                letterSpacing: 1,
                borderRadius: 'var(--radius)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
              }}
            >
              ⚙ {t.shop.filterBy}
              {(selectedCats.length > 0 || filter !== 'all') && (
                <span style={{ background: 'var(--gold)', color: 'var(--deep)', borderRadius: 999, padding: '0 7px', fontSize: 10, fontWeight: 600 }}>
                  {selectedCats.length + (filter !== 'all' ? 1 : 0)}
                </span>
              )}
            </button>

            <select
              className="input"
              style={{ width: 'auto', cursor: 'pointer', paddingRight: 32 }}
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              aria-label={t.shop.sortBy}
            >
              <option value="default">{t.shop.sortBy}: {t.shop.sortDefault}</option>
              <option value="price-asc">{t.shop.sortPriceLow}</option>
              <option value="price-desc">{t.shop.sortPriceHigh}</option>
              <option value="name">{t.shop.sortName}</option>
            </select>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
              {selectedCats.map((c) => (
                <Chip key={c} onRemove={() => toggleCat(c)}>{c}</Chip>
              ))}
              {filter === 'instock' && <Chip onRemove={() => setFilter('all')}>{t.shop.instock}</Chip>}
              {search && <Chip onRemove={() => setSearch('')}>"{search}"</Chip>}
              <button onClick={clearAllFilters} className="btn-text" style={{ padding: '4px 8px', fontSize: 12 }}>
                {t.shop.clearFilters}
              </button>
            </div>
          )}

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="empty-state animate-fade-in">
              <div className="icon">🔍</div>
              <h3 className="serif" style={{ fontSize: 20, marginBottom: 8, color: 'var(--text)' }}>
                {t.shop.noResults}
              </h3>
              <p style={{ fontSize: 13, marginBottom: 16 }}>
                {lang === 'th' ? 'ลองปรับการค้นหาหรือล้างตัวกรอง' : lang === 'zh' ? '尝试调整搜索或清除筛选条件' : 'Try adjusting your search or clearing filters'}
              </p>
              <button onClick={clearAllFilters} className="btn-outline">{t.shop.clearFilters}</button>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
                {pageItems.map((p) => (
                  <ProductCard key={p.id} p={p} onQuickView={setQuickView} />
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <nav aria-label="Pagination" style={{ display: 'flex', justifyContent: 'center', gap: 6, paddingTop: 40, flexWrap: 'wrap', alignItems: 'center' }}>
                  <PageBtn disabled={page === 1} onClick={() => { setPage(page - 1); window.scrollTo({ top: 300, behavior: 'smooth' }); }} aria-label="Previous page">‹</PageBtn>
                  {Array.from({ length: pages }).map((_, i) => {
                    // Show first, last, current and neighbors
                    if (pages > 7 && i !== 0 && i !== pages - 1 && Math.abs(i + 1 - page) > 1) {
                      if (i + 1 === page - 2 || i + 1 === page + 2) return <span key={i} style={{ padding: '0 4px', color: 'var(--text-faint)' }}>…</span>;
                      return null;
                    }
                    return (
                      <PageBtn key={i} active={i + 1 === page} onClick={() => { setPage(i + 1); window.scrollTo({ top: 300, behavior: 'smooth' }); }}>
                        {i + 1}
                      </PageBtn>
                    );
                  })}
                  <PageBtn disabled={page === pages} onClick={() => { setPage(page + 1); window.scrollTo({ top: 300, behavior: 'smooth' }); }} aria-label="Next page">›</PageBtn>
                </nav>
              )}

              <div className="serif" style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 16 }}>
                {t.shop.showing} {start + 1}–{Math.min(start + PER_PAGE, filtered.length)} {t.shop.of} {filtered.length}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilterOpen && (
        <>
          <div
            className="drawer-overlay open"
            onClick={() => setMobileFilterOpen(false)}
            style={{ zIndex: 998 }}
          />
          <aside
            className="drawer open"
            style={{ background: 'var(--cream)', color: 'var(--text)', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--cream-dark)' }}>
              <h3 className="serif" style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>{t.shop.filterBy}</h3>
              <button onClick={() => setMobileFilterOpen(false)} aria-label="Close" style={{ background: 'transparent', border: 'none', fontSize: 24, color: 'var(--text)' }}>×</button>
            </div>
            <FilterPanel
              t={t} lang={lang} categories={categories}
              selectedCats={selectedCats} toggleCat={toggleCat}
              filter={filter} setFilter={setFilter}
              priceRange={priceRange} setPriceRange={setPriceRange}
              maxPrice={maxPrice}
              hasActiveFilters={!!hasActiveFilters}
              clearAll={clearAllFilters}
            />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="btn-gold"
              style={{ marginTop: 20, width: '100%' }}
            >
              {lang === 'th' ? `แสดง ${filtered.length} รายการ` : lang === 'zh' ? `显示 ${filtered.length} 件` : `Show ${filtered.length} results`}
            </button>
          </aside>
        </>
      )}

      {/* Quick view modal */}
      <QuickView product={quickView} onClose={() => setQuickView(null)} />

      <style>{`
        @media (max-width: 900px) {
          [data-grid="shop"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function FilterPanel({
  t, lang, categories, selectedCats, toggleCat, filter, setFilter,
  priceRange, setPriceRange, maxPrice, hasActiveFilters, clearAll,
}: any) {
  return (
    <>
      {hasActiveFilters && (
        <button onClick={clearAll} className="btn-text" style={{ padding: 0, marginBottom: 16, fontSize: 12 }}>
          ↻ {t.shop.clearFilters}
        </button>
      )}

      <div style={{ marginBottom: 24 }}>
        <h4 className="serif" style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 12 }}>
          {t.shop.filterBy}
        </h4>
        <label style={checkboxLabelStyle}>
          <input
            type="checkbox"
            checked={filter === 'instock'}
            onChange={(e) => setFilter(e.target.checked ? 'instock' : 'all')}
            style={checkboxStyle}
          />
          {t.shop.instock}
        </label>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h4 className="serif" style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 12 }}>
          {t.shop.category}
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {categories.map((c: { name: string; count: number }) => (
            <label key={c.name} style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={selectedCats.includes(c.name)}
                onChange={() => toggleCat(c.name)}
                style={checkboxStyle}
              />
              <span style={{ flex: 1 }}>{c.name}</span>
              <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>{c.count}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="serif" style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 12 }}>
          {lang === 'th' ? 'ราคา (฿)' : lang === 'zh' ? '价格 (฿)' : 'Price (฿)'}
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input
            type="number"
            placeholder="Min"
            className="input"
            style={{ fontSize: 13, padding: 8 }}
            value={priceRange[0] || ''}
            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
            min={0}
          />
          <input
            type="number"
            placeholder="Max"
            className="input"
            style={{ fontSize: 13, padding: 8 }}
            value={priceRange[1] === Infinity ? '' : priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], e.target.value ? parseInt(e.target.value) : Infinity])}
            min={0}
          />
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 6 }}>
          {lang === 'th' ? `สูงสุด: ฿${Math.round(maxPrice).toLocaleString()}` : lang === 'zh' ? `最高: ฿${Math.round(maxPrice).toLocaleString()}` : `Max: ฿${Math.round(maxPrice).toLocaleString()}`}
        </div>
      </div>
    </>
  );
}

const checkboxLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 0',
  fontSize: 13,
  cursor: 'pointer',
  color: 'var(--text)',
};
const checkboxStyle: React.CSSProperties = {
  width: 16,
  height: 16,
  accentColor: 'var(--gold-dark)',
  cursor: 'pointer',
};

function Chip({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'var(--cream-dark)',
        padding: '5px 8px 5px 12px',
        fontSize: 12,
        borderRadius: 100,
        color: 'var(--text)',
      }}
    >
      {children}
      <button
        onClick={onRemove}
        aria-label="Remove filter"
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 16, padding: '0 4px', lineHeight: 1, display: 'flex' }}
      >
        ×
      </button>
    </span>
  );
}

function PageBtn({ active, onClick, disabled, children, ...rest }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="serif"
      style={{
        background: active ? 'var(--gold)' : 'transparent',
        border: '1px solid ' + (active ? 'var(--gold)' : 'var(--cream-dark)'),
        color: active ? 'var(--deep)' : disabled ? 'var(--text-faint)' : 'var(--text-muted)',
        padding: '8px 14px',
        fontSize: 13,
        minWidth: 36,
        borderRadius: 'var(--radius)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontWeight: active ? 600 : 400,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
