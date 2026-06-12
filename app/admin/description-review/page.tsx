'use client';

import { useState, useEffect, useCallback } from 'react';

type Product = { id: number; name_th: string; name: string; desc_len: number };
type Draft = {
  product_id: number;
  name_th: string;
  search_used: string[];
  brave_quota_exhausted: boolean;
  brave_reset_in_days: number;
  description: string;
  description_th: string;
  description_zh: string;
};
type Status = 'pending' | 'generating' | 'approved' | 'skipped' | 'error';

export default function DescriptionReviewPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [statuses, setStatuses] = useState<Map<number, Status>>(new Map());
  const [loading, setLoading] = useState(true);

  // Review state
  const [queue, setQueue] = useState<number[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [reviewing, setReviewing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'th' | 'en' | 'zh'>('th');

  useEffect(() => {
    fetch('/api/admin/seo-status')
      .then(r => r.json())
      .then(data => {
        const products = (data.products as any[])
          .filter(p => p.published && p.desc_len < 170)
          .map(p => ({ id: p.id, name_th: p.name_th, name: p.name, desc_len: p.desc_len }));
        setAllProducts(products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const setStatus = (id: number, s: Status) =>
    setStatuses(prev => new Map(prev).set(id, s));

  const generateProduct = useCallback(async (productId: number): Promise<Draft | null> => {
    const res = await fetch('/api/admin/generate-description-preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId }),
    });
    const text = await res.text();
    let data: any;
    try { data = JSON.parse(text); } catch { throw new Error(`Server error: ${text.slice(0, 120)}`); }
    if (!res.ok) throw new Error(data.error);
    return data;
  }, []);

  // Start processing selected products
  async function handleStartQueue() {
    const ids = allProducts
      .filter(p => selected.has(p.id))
      .map(p => p.id);
    if (ids.length === 0) return;
    setQueue(ids);
    setQueueIndex(0);
    setReviewing(true);
    setError('');
    setDraft(null);
    // Generate first
    setStatus(ids[0], 'generating');
    setGenerating(true);
    try {
      const d = await generateProduct(ids[0]);
      setDraft(d);
      setStatus(ids[0], 'pending');
    } catch (e: any) {
      setError(e.message);
      setStatus(ids[0], 'error');
    } finally {
      setGenerating(false);
    }
  }

  // Generate single product from list
  async function handleGenerateSingle(id: number) {
    setQueue([id]);
    setQueueIndex(0);
    setReviewing(true);
    setError('');
    setDraft(null);
    setStatus(id, 'generating');
    setGenerating(true);
    try {
      const d = await generateProduct(id);
      setDraft(d);
      setStatus(id, 'pending');
    } catch (e: any) {
      setError(e.message);
      setStatus(id, 'error');
    } finally {
      setGenerating(false);
    }
  }

  async function advanceQueue(newStatus: Status) {
    const currentId = queue[queueIndex];
    setStatus(currentId, newStatus);
    const nextIndex = queueIndex + 1;
    if (nextIndex >= queue.length) {
      setReviewing(false);
      setDraft(null);
      return;
    }
    setQueueIndex(nextIndex);
    const nextId = queue[nextIndex];
    setDraft(null);
    setError('');
    setStatus(nextId, 'generating');
    setGenerating(true);
    try {
      const d = await generateProduct(nextId);
      setDraft(d);
      setStatus(nextId, 'pending');
    } catch (e: any) {
      setError(e.message);
      setStatus(nextId, 'error');
    } finally {
      setGenerating(false);
    }
  }

  async function handleApprove() {
    if (!draft) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/approve-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: draft.product_id,
          description: draft.description,
          description_th: draft.description_th,
          description_zh: draft.description_zh,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      await advanceQueue('approved');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleSkip() {
    await advanceQueue('skipped');
  }

  async function handleRetry() {
    const currentId = queue[queueIndex];
    setError('');
    setDraft(null);
    setStatus(currentId, 'generating');
    setGenerating(true);
    try {
      const d = await generateProduct(currentId);
      setDraft(d);
      setStatus(currentId, 'pending');
    } catch (e: any) {
      setError(e.message);
      setStatus(currentId, 'error');
    } finally {
      setGenerating(false);
    }
  }

  const toggleSelect = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    const pending = allProducts.filter(p => !['approved'].includes(statuses.get(p.id) ?? 'pending'));
    if (selected.size === pending.length) setSelected(new Set());
    else setSelected(new Set(pending.map(p => p.id)));
  };

  const pendingCount = allProducts.filter(p => !['approved'].includes(statuses.get(p.id) ?? 'pending')).length;
  const approvedCount = [...statuses.values()].filter(s => s === 'approved').length;
  const currentQueueProduct = allProducts.find(p => p.id === queue[queueIndex]);

  // ── Review mode ──────────────────────────────────────────────────────────
  if (reviewing) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button
            onClick={() => { setReviewing(false); setDraft(null); setError(''); }}
            style={{ padding: '6px 12px', background: '#F3F4F6', border: '1px solid #D1D5DB', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}
          >
            ← กลับรายการ
          </button>
          <span style={{ fontSize: 13, color: '#6B7280' }}>
            {queueIndex + 1} / {queue.length} รายการ
          </span>
          <div style={{ flex: 1, height: 4, background: '#E5E7EB', borderRadius: 2 }}>
            <div style={{ height: '100%', width: `${((queueIndex) / queue.length) * 100}%`, background: '#C9A84C', borderRadius: 2, transition: 'width 0.3s' }} />
          </div>
        </div>

        {generating && (
          <div style={cardStyle}>
            <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 6 }}>กำลัง generate...</div>
            <div style={{ fontWeight: 600 }}>{currentQueueProduct?.name_th}</div>
            <div style={{ marginTop: 12, color: '#C9A84C', fontSize: 13 }}>⏳ Claude กำลังเขียน... (~15 วินาที)</div>
          </div>
        )}

        {saving && <div style={cardStyle}>⏳ กำลังบันทึก...</div>}

        {error && !generating && !saving && (
          <div style={{ ...cardStyle, background: '#FFF0F0', borderColor: '#FCA5A5', marginBottom: 12 }}>
            <div style={{ color: '#DC2626', fontWeight: 600, marginBottom: 8 }}>❌ {error}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={handleRetry} style={{ padding: '8px 16px', background: '#DC2626', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>ลองใหม่</button>
              <button onClick={handleSkip} style={{ padding: '8px 16px', background: '#F3F4F6', border: '1px solid #D1D5DB', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>ข้ามองค์นี้</button>
            </div>
          </div>
        )}

        {draft && !generating && !saving && (
          <div>
            <div style={{ ...cardStyle, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, background: '#F3F4F6', color: '#6B7280', borderRadius: 4, padding: '2px 7px', fontWeight: 600 }}>
                  ID #{draft.product_id}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{draft.name_th}</div>
              {draft.brave_quota_exhausted ? (
                <div style={{ fontSize: 11, background: '#FEF3C7', color: '#92400E', borderRadius: 4, padding: '4px 8px', display: 'inline-block' }}>
                  ⚠️ Brave หมดโควต้า — รีเซ็ตใน {draft.brave_reset_in_days} วัน (ใช้ชื่อสินค้าอย่างเดียว)
                </div>
              ) : draft.search_used?.length > 0 && (
                <div style={{ fontSize: 11, color: '#6B7280' }}>🔍 ค้นหาจาก: {draft.search_used.join(', ')}</div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {(['th', 'en', 'zh'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: '6px 16px', borderRadius: 20, border: '1px solid', fontSize: 12, cursor: 'pointer',
                  fontWeight: tab === t ? 700 : 400,
                  background: tab === t ? '#C9A84C' : '#fff',
                  color: tab === t ? '#fff' : '#374151',
                  borderColor: tab === t ? '#C9A84C' : '#D1D5DB',
                }}>
                  {t === 'th' ? 'ภาษาไทย' : t === 'en' ? 'English' : '中文'}
                </button>
              ))}
            </div>

            <div style={{ ...cardStyle, marginBottom: 16, maxHeight: 360, overflowY: 'auto' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13, lineHeight: 1.7, color: '#374151', margin: 0, fontFamily: 'inherit' }}>
                {tab === 'th' ? draft.description_th : tab === 'en' ? draft.description : draft.description_zh}
              </pre>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleApprove} style={{ flex: 1, padding: '14px', background: '#16A34A', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                ✓ อนุมัติ — บันทึกลง DB
              </button>
              <button onClick={handleSkip} style={{ flex: 1, padding: '14px', background: '#F3F4F6', color: '#374151', border: '1px solid #D1D5DB', borderRadius: 8, fontSize: 15, cursor: 'pointer' }}>
                → ข้าม
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── List mode ─────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>ตรวจสอบ Description</h1>
          <p style={{ fontSize: 13, color: '#6B7280', margin: '4px 0 0' }}>
            {loading ? 'กำลังโหลด...' : `${allProducts.length} สินค้า · อนุมัติแล้ว ${approvedCount} ชิ้น`}
          </p>
        </div>
        <button
          onClick={handleStartQueue}
          disabled={selected.size === 0}
          style={{
            padding: '10px 20px', background: selected.size === 0 ? '#E5E7EB' : '#C9A84C',
            color: selected.size === 0 ? '#9CA3AF' : '#fff',
            border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700,
            cursor: selected.size === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Generate ที่เลือก ({selected.size})
        </button>
      </div>

      {!loading && allProducts.length === 0 && (
        <div style={{ ...cardStyle, background: '#F0FDF4', borderColor: '#86EFAC', color: '#16A34A', fontWeight: 600 }}>
          ✓ ทุกสินค้ามี description ครบแล้ว
        </div>
      )}

      {allProducts.length > 0 && (
        <div style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', borderBottom: '1px solid #F3F4F6', background: '#FAFAFA' }}>
            <input
              type="checkbox"
              checked={selected.size > 0 && selected.size === pendingCount}
              onChange={toggleAll}
              style={{ marginRight: 12, cursor: 'pointer', width: 15, height: 15 }}
            />
            <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>เลือกทั้งหมด ({pendingCount})</span>
          </div>

          {allProducts.map((p, i) => {
            const status = statuses.get(p.id) ?? 'pending';
            const isApproved = status === 'approved';
            return (
              <div key={p.id} style={{
                display: 'flex', alignItems: 'center', padding: '12px 16px',
                borderBottom: i < allProducts.length - 1 ? '1px solid #F3F4F6' : 'none',
                background: isApproved ? '#F0FDF4' : 'white',
                opacity: isApproved ? 0.7 : 1,
              }}>
                <input
                  type="checkbox"
                  checked={selected.has(p.id)}
                  disabled={isApproved}
                  onChange={() => toggleSelect(p.id)}
                  style={{ marginRight: 12, cursor: isApproved ? 'not-allowed' : 'pointer', width: 15, height: 15, flexShrink: 0 }}
                />
                <span style={{ fontSize: 11, background: '#F3F4F6', color: '#6B7280', borderRadius: 4, padding: '2px 6px', marginRight: 10, fontWeight: 600, flexShrink: 0 }}>
                  #{p.id}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1208', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.name_th || p.name}
                  </div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>desc: {p.desc_len} chars</div>
                </div>
                <div style={{ marginLeft: 10, flexShrink: 0 }}>
                  {status === 'approved' && <span style={{ fontSize: 11, color: '#16A34A', fontWeight: 700 }}>✓ อนุมัติ</span>}
                  {status === 'skipped' && <span style={{ fontSize: 11, color: '#9CA3AF' }}>ข้ามแล้ว</span>}
                  {status === 'error' && <span style={{ fontSize: 11, color: '#DC2626' }}>❌ error</span>}
                  {(status === 'pending' || status === 'generating') && (
                    <button
                      onClick={() => handleGenerateSingle(p.id)}
                      style={{ fontSize: 12, padding: '4px 10px', background: '#F4EFE5', color: '#5C4D2E', border: '1px solid #E8DFC8', borderRadius: 6, cursor: 'pointer' }}
                    >
                      Generate
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #E5E7EB',
  borderRadius: 10,
  padding: '16px 20px',
};
