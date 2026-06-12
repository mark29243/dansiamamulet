'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Bucket = { label: string; count: number; from: string; to: string };
type Period = 'day' | 'week' | 'month';

type ProductDetail = {
  id: number;
  name: string;
  name_th: string;
  slug: string;
  images: string[];
  price: number;
  sale_price: number | null;
  views: number;
};

const PERIOD_LABELS: Record<Period, string> = {
  day:   '14 วัน',
  week:  '12 สัปดาห์',
  month: '12 เดือน',
};

export default function ViewsChart() {
  const [period, setPeriod] = useState<Period>('day');
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Drill-down state
  const [selected, setSelected] = useState<Bucket | null>(null);
  const [detail, setDetail] = useState<ProductDetail[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);

  // Hover tooltip
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setSelected(null);
    setDetail([]);
    fetch(`/api/admin/views-stats?period=${period}`)
      .then(r => r.json())
      .then(d => { setBuckets(d.buckets ?? []); setTotal(d.total ?? 0); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [period]);

  function handleBarClick(bucket: Bucket) {
    if (bucket.count === 0) return;
    if (selected?.from === bucket.from) {
      // toggle off
      setSelected(null);
      setDetail([]);
      return;
    }
    setSelected(bucket);
    setDetail([]);
    setDetailLoading(true);
    fetch(`/api/admin/views-detail?from=${encodeURIComponent(bucket.from)}&to=${encodeURIComponent(bucket.to)}`)
      .then(r => r.json())
      .then(d => setDetail(d.products ?? []))
      .catch(() => {})
      .finally(() => setDetailLoading(false));
  }

  const max = Math.max(...buckets.map(b => b.count), 1);
  const chartH = 160;
  const barW = 28;
  const gapPx = 8;
  const svgW = buckets.length * (barW + gapPx);
  const padB = 28;
  const ticks = [0.25, 0.5, 0.75, 1].map(f => Math.round(max * f));

  return (
    <section style={{ marginBottom: 36 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>
            📈 Product Views
          </h2>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {loading ? '...' : `${total.toLocaleString()} views ใน ${PERIOD_LABELS[period]}ที่ผ่านมา`}
          </span>
        </div>
        {/* Period toggle */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--cream-dark)', borderRadius: 'var(--radius)', padding: 3 }}>
          {(['day', 'week', 'month'] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: '6px 16px',
                fontSize: 12,
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: 1,
                border: 'none',
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                background: period === p ? 'var(--deep)' : 'transparent',
                color: period === p ? 'var(--gold)' : 'var(--text-muted)',
                fontWeight: period === p ? 600 : 400,
                transition: 'all 0.15s',
              }}
            >
              {p === 'day' ? 'Day' : p === 'week' ? 'Week' : 'Month'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart card */}
      <div className="card" style={{ padding: '20px 16px 12px', overflow: 'hidden' }}>
        {loading ? (
          <div className="skeleton" style={{ height: chartH + padB, borderRadius: 'var(--radius)' }} />
        ) : buckets.every(b => b.count === 0) ? (
          <div style={{ height: chartH + padB, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
            ยังไม่มีข้อมูล — views จะเริ่มเก็บตั้งแต่ตอนนี้
          </div>
        ) : (
          <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
            <div style={{ position: 'relative', minWidth: svgW + 40 }}>
              {/* Y-axis labels */}
              <div style={{ position: 'absolute', left: 0, top: 0, height: chartH, display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-between', pointerEvents: 'none' }}>
                {[0, ...ticks].map((t, i) => (
                  <span key={i} style={{ fontSize: 9, color: 'var(--text-faint)', lineHeight: 1, width: 32, textAlign: 'right' }}>{t}</span>
                ))}
              </div>

              {/* Chart area */}
              <div style={{ marginLeft: 40, position: 'relative' }}>
                {/* Guide lines */}
                {ticks.map((t, i) => (
                  <div key={i} style={{
                    position: 'absolute', left: 0, right: 0,
                    bottom: padB + (t / max) * chartH,
                    borderTop: '1px dashed var(--cream-dark)',
                    pointerEvents: 'none',
                  }} />
                ))}

                {/* Bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: `${gapPx}px`, height: chartH + padB, paddingBottom: padB, position: 'relative' }}>
                  {buckets.map((b, i) => {
                    const h = max === 0 ? 0 : Math.max(b.count > 0 ? 4 : 0, Math.round((b.count / max) * chartH));
                    const isSelected = selected?.from === b.from;
                    const isHover = hoverIdx === i;
                    const canClick = b.count > 0;
                    return (
                      <div
                        key={i}
                        onClick={() => handleBarClick(b)}
                        onMouseEnter={() => setHoverIdx(i)}
                        onMouseLeave={() => setHoverIdx(null)}
                        style={{
                          position: 'relative',
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          width: barW, flexShrink: 0,
                          cursor: canClick ? 'pointer' : 'default',
                        }}
                        title={canClick ? `กดเพื่อดูสินค้า ${b.count} views` : undefined}
                      >
                        {/* Bar */}
                        <div style={{
                          width: '100%',
                          height: h,
                          background: b.count === 0
                            ? 'var(--cream-dark)'
                            : isSelected
                              ? 'var(--burgundy)'
                              : isHover
                                ? 'var(--gold)'
                                : 'var(--gold-dark)',
                          borderRadius: '3px 3px 0 0',
                          transition: 'background 0.15s',
                          outline: isSelected ? '2px solid var(--burgundy)' : 'none',
                          outlineOffset: 2,
                        }} />
                        {/* x-axis label */}
                        <span style={{
                          position: 'absolute',
                          bottom: -padB + 6,
                          fontSize: 9,
                          color: isSelected ? 'var(--burgundy)' : 'var(--text-faint)',
                          fontWeight: isSelected ? 700 : 400,
                          whiteSpace: 'nowrap',
                          transform: 'rotate(-35deg)',
                          transformOrigin: 'top center',
                          width: 32,
                          textAlign: 'center',
                        }}>
                          {b.label}
                        </span>
                        {/* Hover tooltip */}
                        {isHover && b.count > 0 && !isSelected && (
                          <div style={{
                            position: 'absolute',
                            bottom: h + 6,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'var(--deep)',
                            color: 'var(--gold)',
                            fontSize: 11,
                            padding: '3px 8px',
                            borderRadius: 4,
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            zIndex: 10,
                            fontFamily: 'sans-serif',
                            fontWeight: 600,
                          }}>
                            {b.count.toLocaleString()} views
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drill-down panel */}
      {selected && (
        <div className="card" style={{ marginTop: 12, padding: 0, overflow: 'hidden' }}>
          {/* Panel header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--cream-dark)', borderBottom: '1px solid var(--cream-darker)' }}>
            <span className="serif" style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
              สินค้าที่ถูกดู — {selected.label} ({selected.count.toLocaleString()} views)
            </span>
            <button
              onClick={() => { setSelected(null); setDetail([]); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--text-muted)', lineHeight: 1, padding: '0 4px' }}
              title="ปิด"
            >
              ×
            </button>
          </div>

          {/* Content */}
          {detailLoading ? (
            <div style={{ padding: 24, display: 'flex', gap: 8, flexDirection: 'column' }}>
              {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 44, borderRadius: 'var(--radius)' }} />)}
            </div>
          ) : detail.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>ไม่มีข้อมูลสินค้า</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--cream)', textAlign: 'left' }}>
                  <th style={{ padding: '8px 16px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: 1 }}>#</th>
                  <th style={{ padding: '8px 16px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: 1 }}>สินค้า</th>
                  <th style={{ padding: '8px 16px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: 1, textAlign: 'right' }}>Views</th>
                </tr>
              </thead>
              <tbody>
                {detail.map((p, i) => (
                  <tr key={p.id} style={{ borderTop: '1px solid var(--cream-dark)' }}>
                    <td style={{ padding: '10px 16px', fontSize: 11, color: 'var(--text-faint)', width: 32 }}>{i + 1}</td>
                    <td style={{ padding: '10px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {Array.isArray(p.images) && p.images[0] && (
                          <img src={p.images[0]} alt="" width={36} height={36} style={{ borderRadius: 'var(--radius)', objectFit: 'cover', flexShrink: 0 }} />
                        )}
                        <div>
                          <Link
                            href={`/product/${p.slug}`}
                            target="_blank"
                            className="serif"
                            style={{ color: 'var(--text)', fontWeight: 600, fontSize: 13, display: 'block' }}
                          >
                            {(p.name || p.name_th || '').slice(0, 60)}{(p.name || p.name_th || '').length > 60 ? '…' : ''}
                          </Link>
                          <Link
                            href={`/admin/products/${p.id}`}
                            style={{ fontSize: 11, color: 'var(--text-faint)', textDecoration: 'none' }}
                          >
                            แก้ไขสินค้า →
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--gold-dark)' }}>{p.views}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </section>
  );
}
