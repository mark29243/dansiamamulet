'use client';

import { useState } from 'react';

type BatchResult = {
  processed: number;
  ok: number;
  failed: number;
  message?: string;
  results?: { id: number; name_th: string; name_en?: string; status: string }[];
};

function BatchButton({ label, endpoint, description }: { label: string; endpoint: string; description: string }) {
  const [state, setState] = useState<'idle' | 'loading' | 'running' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<BatchResult | null>(null);

  async function run() {
    if (state === 'loading' || state === 'running') return;
    if (!confirm(`Run: ${label}?\n\nThis will update the database.`)) return;
    setState('loading');
    try {
      const res = await fetch(endpoint, { method: 'POST' });
      const data = await res.json();
      setResult(data);
      setState(data.error ? 'error' : 'done');
    } catch (e: any) {
      // network/timeout error ≠ real failure — server may still be running
      const isTimeout = e.name === 'TypeError' || e.message?.includes('fetch') || e.message?.includes('network') || e.message?.includes('Load failed') || e.message?.includes('Failed to fetch');
      if (isTimeout) {
        setState('running');
        setResult({ processed: 0, ok: 0, failed: 0, message: 'timeout' });
      } else {
        setResult({ processed: 0, ok: 0, failed: 0, message: e.message });
        setState('error');
      }
    }
  }

  const btnLabel =
    state === 'loading' ? '⏳ กำลังส่งคำสั่ง…' :
    state === 'running' ? '⏳ กำลังทำงาน…' :
    state === 'done'    ? '✓ เสร็จแล้ว' : 'Run';

  return (
    <div style={{ padding: '16px 20px', background: '#fff', border: '1px solid var(--cream-dark)', borderRadius: 'var(--radius)', marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{label}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{description}</div>
        </div>
        <button
          onClick={run}
          disabled={state === 'loading' || state === 'running'}
          className="btn-outline"
          style={{ flexShrink: 0, fontSize: 12, padding: '8px 16px' }}
        >
          {btnLabel}
        </button>
      </div>

      {result && (
        <div style={{
          marginTop: 12, padding: '10px 14px', borderRadius: 'var(--radius)',
          background: state === 'error' ? 'rgba(92,26,26,0.08)' : state === 'running' ? 'rgba(186,117,23,0.08)' : 'rgba(45,90,61,0.08)',
          fontSize: 12,
          color: state === 'error' ? '#5C1A1A' : state === 'running' ? '#8B5E0F' : '#2D5A3D',
        }}>
          {state === 'running'
            ? '⏳ Server กำลังแปลอยู่ในพื้นหลัง (อาจใช้เวลา 2–3 นาที) — ข้อมูลจะอัพเดทในฐานข้อมูลอัตโนมัติ ไม่ต้องทำซ้ำ'
            : state === 'error'
              ? `❌ เกิดข้อผิดพลาด: ${result.message}`
              : result.message && result.message !== 'timeout'
                ? result.message
                : `✓ แปลสำเร็จ ${result.ok} รายการ${result.failed > 0 ? `, ล้มเหลว ${result.failed} รายการ` : ''}`
          }
          {result.results && result.results.length > 0 && (
            <details style={{ marginTop: 8 }}>
              <summary style={{ cursor: 'pointer', userSelect: 'none' }}>ดูรายละเอียด</summary>
              <div style={{ marginTop: 8, maxHeight: 200, overflowY: 'auto' }}>
                {result.results.map(r => (
                  <div key={r.id} style={{ padding: '3px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', color: r.status === 'ok' ? '#2D5A3D' : '#5C1A1A' }}>
                    {r.status === 'ok'
                      ? `✓ ${r.name_th} → ${r.name_en}`
                      : `✗ ${r.name_th}: ${r.status}`
                    }
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}

export default function BatchTools() {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 className="serif" style={{ fontSize: 18, fontWeight: 500, color: 'var(--text)', marginBottom: 16 }}>
        Batch Tools
      </h2>
      <BatchButton
        label="Translate Product Names → English"
        endpoint="/api/admin/batch-translate-name-en"
        description="แปลชื่อสินค้าที่ยังเป็นภาษาไทยใน field 'name' ให้เป็นอังกฤษ (45 รายการ)"
      />
      <BatchButton
        label="Translate Products → Chinese (name_zh)"
        endpoint="/api/admin/batch-translate-zh"
        description="แปลสินค้าที่ยังไม่มี name_zh และ description_zh"
      />
    </section>
  );
}
