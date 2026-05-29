'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from './LangProvider';
import { useCart } from './CartProvider';
import { useToast } from './ToastProvider';
import { getDict, getCatName } from '@/lib/i18n';
import type { Product } from '@/lib/types';
import { useState, useEffect } from 'react';
import { IcoAmulet, IcoWarning, IcoEye, IcoCheck } from '@/components/icons';

function useLocalPrice(satang: number, lang: string): string {
  const [price, setPrice] = useState(() => {
    const baht = satang / 100;
    return `฿${new Intl.NumberFormat('th-TH').format(baht)}`;
  });

  useEffect(() => {
    const baht = satang / 100;
    if (lang === 'th') {
      setPrice(`฿${new Intl.NumberFormat('th-TH').format(baht)}`);
      return;
    }
    const cached = sessionStorage.getItem('fx_rates');
    const applyRates = (rates: Record<string, number>) => {
      if (lang === 'zh') {
        const cny = baht * (rates['CNY'] ?? 0.20);
        setPrice(`¥${new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 }).format(cny)}`);
      } else {
        const usd = baht * (rates['USD'] ?? 0.028);
        setPrice(`$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(usd)}`);
      }
    };
    if (cached) {
      applyRates(JSON.parse(cached));
    } else {
      fetch('https://open.er-api.com/v6/latest/THB')
        .then(r => r.json())
        .then(d => {
          if (d?.rates) {
            sessionStorage.setItem('fx_rates', JSON.stringify(d.rates));
            applyRates(d.rates);
          }
        })
        .catch(() => {
          applyRates({ USD: 0.028, CNY: 0.20 });
        });
    }
  }, [satang, lang]);

  return price;
}

export default function ProductCard({ p, onQuickView }: { p: Product; onQuickView?: (p: Product) => void }) {
  const { lang } = useLang();
  const displayName = lang === 'th' ? (p.name_th || p.name) : p.name;
  const { add } = useCart();
  const { toast } = useToast();
  const t = getDict(lang);
  const [loading, setLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(true);

  const displayPrice = p.sale_price ?? p.price;
  const hasDiscount = p.sale_price !== null && p.sale_price < p.price;
  const lowStock = p.stock > 0 && p.stock <= 3;

  const priceDisplay = useLocalPrice(displayPrice, lang);
  const origPriceDisplay = useLocalPrice(p.price, lang);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (p.stock < 1 || loading) return;
    setLoading(true);
    add({ product_id: p.id, name: p.name, price: displayPrice, image: p.images[0] ?? '', qty: 1 });
    toast(`${t.product.addedToCart}: ${p.name.slice(0, 40)}${p.name.length > 40 ? '…' : ''}`, 'success');
    setTimeout(() => setLoading(false), 600);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(p);
  };

  return (
    <Link href={`/product/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
      <article className="pcard" style={{ background: '#fff', border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius-lg)', transition: 'all var(--transition)', position: 'relative', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 3, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {p.stock === 0 && <span className="badge badge-oos">{t.product.oos}</span>}
          {hasDiscount && p.stock > 0 && <span className="badge badge-sale">SALE</span>}
        </div>
        {onQuickView && (
          <button onClick={handleQuickView} className="quick-view-btn serif" aria-label={t.product.quickView} style={{ position: 'absolute', top: 12, right: 12, zIndex: 3, background: 'rgba(255,255,255,0.95)', border: '1px solid var(--cream-dark)', padding: '6px 12px', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text)', borderRadius: 3, opacity: 0, transform: 'translateY(-4px)', transition: 'all var(--transition)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <IcoEye size={13} /> {t.product.quickView}
          </button>
        )}
        <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: 'linear-gradient(135deg, var(--cream-dark), var(--cream-darker))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {!imgLoaded && p.images[0] && <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />}
          {p.images[0] ? (
            <Image src={p.images[0]} alt={p.name} fill sizes="(max-width: 768px) 50vw, 260px" style={{ objectFit: 'contain', transition: 'transform 0.5s ease', opacity: imgLoaded ? 1 : 0 }} onLoad={() => setImgLoaded(true)} unoptimized />
          ) : (
            <IcoAmulet size={56} />
          )}
        </div>
        <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="serif" style={{ fontSize: 10, color: 'var(--gold-dark)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>{getCatName(p.category, lang)}</div>
          <h3 className="serif" style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 39 }}>
            {displayName}
          </h3>
          {lowStock && (
            <span className="badge badge-warning" style={{ marginBottom: 8, alignSelf: 'flex-start', fontSize: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <IcoWarning size={11} /> {t.product.onlyLeft} {p.stock} {lang === 'th' ? 'องค์' : lang === 'zh' ? '件' : 'left'}
            </span>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--cream-dark)', paddingTop: 12, marginTop: 'auto' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--gold-dark)' }}>{priceDisplay}</span>
                {hasDiscount && <span style={{ fontSize: 11, color: 'var(--text-faint)', textDecoration: 'line-through' }}>{origPriceDisplay}</span>}
              </div>
            </div>
            <button onClick={handleAdd} disabled={p.stock < 1 || loading} aria-label={t.product.addCart} style={{ background: loading ? 'var(--jade)' : p.stock < 1 ? '#E5DDC8' : 'var(--deep)', color: p.stock < 1 ? '#A89868' : 'var(--gold)', border: 'none', width: 40, height: 40, cursor: p.stock < 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, borderRadius: 'var(--radius)', transition: 'all var(--transition)', flexShrink: 0 }}>
              {loading ? <IcoCheck size={16} /> : '＋'}
            </button>
          </div>
        </div>
        <style>{`
          .pcard:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--gold-light); }
          .pcard:hover img { transform: scale(1.05); }
          .pcard:hover .quick-view-btn { opacity: 1; transform: translateY(0); }
          .pcard:hover .quick-view-btn:hover { background: var(--gold); color: var(--deep); border-color: var(--gold); }
          @media (max-width: 768px) { .quick-view-btn { display: none; } }
        `}</style>
      </article>
    </Link>
  );
}
