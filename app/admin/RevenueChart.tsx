'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Bucket = { label: string; count: number; revenue: number; from: string; to: string };
type Period = 'day' | 'week' | 'month';
type Order = { id: string; customer_name: string; customer_email: string; total: number; items: any[]; created_at: string };

const PERIOD_LABELS: Record<Period, string> = {
  day:   '14 วัน',
  week:  '12 สัปดาห์',
  month: '12 เดือน',
};

function formatBaht(satang: number): string {
  const baht = satang / 100;
  if (baht >= 1_000_000) return `฿${(baht / 1_000_000).toFixed(1)}M`;
  if (baht >= 1_000)     return `฿${(baht / 1_000).toFixed(baht >= 100_000 ? 0 : 1)}K`;
  return `฿${baht.toLocaleString()}`;
}

function formatBahtFull(satang: number): string {
  return `฿${(satang / 100).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function RevenueChart() {
  const [period, setPeriod] = useState<Period>('day');
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<Bucket | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setSelected(null);
    setOrders([]);
    fetch(`/api/admin/revenue-stats?period=${period}`)
      .then(r => r.json())
      .then(d => {
        setBuckets(d.buckets ?? []);
        setTotalRevenue(d.total_revenue ?? 0);
        setTotalOrders(d.total_orders ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [period]);

  function handleBarClick(bucket: Bucket) {
    if (bucket.revenue === 0) return;
    if (selected?.from === bucket.from) { setSelected(null); setOrders([]); return; }
    setSelected(bucket);
    setOrders([]);
    setDetailLoading(true);
    fetch(`/api/admin/revenue-detail?from=${encodeURIComponent(bucket.from)}&to=${encodeURIComponent(bucket.to)}`)
      .then(r => r.json())
      .then(d => setOrders(d.orders ?? []))
      .catch(() => {})
      .finally(() => setDetailLoading(false));
  }

  const max = Math.max(...buckets.map(b => b.revenue), 1);
  const chartH = 160;
  const barW = 28;
  const gapPx = 8;
  const padB = 28;
  const ticks = [0.25, 0.5, 0.75, 1].map(f => Math.round(max * f));

  return (
    <section style={{ marginBottom: 36 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 className="serif" style={{ fontSize: 18, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>
            💰 Revenue
          </h2>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {loading ? '...' : `${formatBahtFull(totalRevenue)} · ${totalOrders} orders ใน ${PERIOD_LABELS[period]}ที่ผ่านมา`}
          </span>
        </div>
        {/* Period toggle */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--cream-dark)', borderRadius: 'var(--radius)', padding: 3 }}>
          {(['day', 'week', 'month'] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: '6px 16px', fontSize: 12,
                fontFamily: "'Cormorant Garamond', serif", letterSpacing: 1,
                border: 'none', borderRadius: 'var(--radius)', cursor: 'pointer',
                background: period === p ? 'var(--deep)' : 'transparent',
                color: period === p ? 'var(--gold)' : 'var(--text-muted)',
                fontWeight: period === p ? 600 : 400, transition: 'all 0.15s',
              }}
            >
              {p === 'day' ? 'Day' : p === 'week' ? 'Week' : 'Month'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="card" style={{ padding: '20px 16px 12px', overflow: 'hidden' }}>
        {loading ? (
          <div className="skeleton" style={{ height: chartH + padB, borderRadius: 'var(--radius)' }} />
        ) : buckets.every(b => b.revenue === 0) ? (
          <div style={{ height: chartH + padB, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
            ยังไม่มีรายได้ในช่วงนี้
          </div>
        ) : (
          <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
            <div style={{ position: 'relative', minWidth: buckets.length * (barW + gapPx) + 40 }}>
              {/* Y-axis */}
              <div style={{ position: 'absolute', left: 0, top: 0, height: chartH, display: 'flex', flexDirection: 'column-reverse', justifyContent: 'space-between', pointerEvents: 'none' }}>
                {[0, ...ticks].map((t, i) => (
                  <span key={i} style={{ fontSize: 9, color: 'var(--text-faint)', lineHeight: 1, width: 36, textAlign: 'right' }}>
                    {formatBaht(t)}
                  </span>
                ))}
              </div>

              {/* Chart area */}
              <div style={{ marginLeft: 44, position: 'relative' }}>
                {/* Guide lines */}
                {ticks.map((t, i) => (
                  <div key={i} style={{ position: 'absolute', left: 0, right: 0, bottom: padB + (t / max) * chartH, borderTop: '1px dashed var(--cream-dark)', pointerEvents: 'none' }} />
                ))}

                {/* Bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: `${gapPx}px`, height: chartH + padB, paddingBottom: padB, position: 'relative' }}>
                  {buckets.map((b, i) => {
                    const h = max === 0 ? 0 : Math.max(b.revenue > 0 ? 4 : 0, Math.round((b.revenue / max) * chartH));
                    const isSelected = selected?.from === b.from;
                    const isHover = hoverIdx === i;
                    return (
                      <div
                        key={i}
                        onClick={() => handleBarClick(b)}
                        onMouseEnter={() => setHoverIdx(i)}
                        onMouseLeave={() => setHoverIdx(null)}
                        style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: barW, flexShrink: 0, cursor: b.revenue > 0 ? 'pointer' : 'default' }}
                      >
                        <div style={{
                          width: '100%', height: h,
                          background: b.revenue === 0
                            ? 'var(--cream-dark)'
                            : isSelected ? 'var(--jade)'
                            : isHover   ? '#3DAA6A'
                            : '#2D8A55',
                          borderRadius: '3px 3px 0 0',
                          transition: 'background 0.15s',
                          outline: isSelected ? '2px solid var(--jade)' : 'none',
                          outlineOffset: 2,
                        }} />
                        {/* x-axis label */}
                        <span style={{
                          position: 'absolute', bottom: -padB + 6, fontSize: 9,
                          color: isSelected ? 'var(--jade)' : 'var(--text-faint)',
                          fontWeight: isSelected ? 700 : 400,
                          whiteSpace: 'nowrap', transform: 'rotate(-35deg)',
                          transformOrigin: 'top center', width: 32, textAlign: 'center',
                        }}>
                          {b.label}
                        </span>
                        {/* Hover tooltip */}
                        {isHover && b.revenue > 0 && !isSelected && (
                          <div style={{
                            position: 'absolute', bottom: h + 6, left: '50%', transform: 'translateX(-50%)',
                            background: 'var(--deep)', color: '#4DCA7A',
                            fontSize: 11, padding: '4px 8px', borderRadius: 4,
                            whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 10,
                            fontFamily: 'sans-serif', fontWeight: 600,
                          }}>
                            {formatBahtFull(b.revenue)}
                            <span style={{ fontSize: 10, opacity: 0.8, marginLeft: 4 }}>({b.count} orders)</span>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--cream-dark)', borderBottom: '1px solid var(--cream-darker)' }}>
            <div>
              <span className="serif" style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>
                Orders — {selected.label}
              </span>
              <span style={{ marginLeft: 12, fontSize: 13, fontWeight: 700, color: '#2D8A55' }}>
                {formatBahtFull(selected.revenue)}
              </span>
              <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                ({selected.count} orders)
              </span>
            </div>
            <button onClick={() => { setSelected(null); setOrders([]); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--text-muted)', lineHeight: 1, padding: '0 4px' }}>×</button>
          </div>

          {detailLoading ? (
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 44, borderRadius: 'var(--radius)' }} />)}
            </div>
          ) : orders.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>ไม่มีข้อมูล</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--cream)', textAlign: 'left' }}>
                  {['Order', 'ลูกค้า', 'สินค้า', 'ยอด', 'เวลา'].map(h => (
                    <th key={h} style={{ padding: '8px 14px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: 1 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(o => {
                  const itemCount = Array.isArray(o.items) ? o.items.reduce((s: number, x: any) => s + (x.qty ?? 1), 0) : 0;
                  const d = new Date(o.created_at);
                  const timeStr = `${d.getDate()}/${d.getMonth()+1} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
                  return (
                    <tr key={o.id} style={{ borderTop: '1px solid var(--cream-dark)' }}>
                      <td style={{ padding: '10px 14px' }}>
                        <Link href={`/admin/orders/${o.id}`} style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--gold-dark)', textDecoration: 'none' }}>
                          #{o.id.slice(0, 8)}
                        </Link>
                      </td>
                      <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text)' }}>
                        <div style={{ fontWeight: 500 }}>{o.customer_name || '—'}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>{o.customer_email}</div>
                      </td>
                      <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text-muted)' }}>
                        {itemCount} ชิ้น
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: '#2D8A55' }}>{formatBahtFull(o.total)}</span>
                      </td>
                      <td style={{ padding: '10px 14px', fontSize: 11, color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>
                        {timeStr}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              {orders.length > 1 && (
                <tfoot>
                  <tr style={{ borderTop: '2px solid var(--cream-darker)', background: 'var(--cream)' }}>
                    <td colSpan={3} style={{ padding: '8px 14px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>รวม {orders.length} orders</td>
                    <td style={{ padding: '8px 14px', fontWeight: 700, fontSize: 14, color: '#2D8A55' }}>{formatBahtFull(selected.revenue)}</td>
                    <td />
                  </tr>
                </tfoot>
              )}
            </table>
          )}
        </div>
      )}
    </section>
  );
}
