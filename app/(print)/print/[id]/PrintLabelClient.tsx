'use client';

import { useState } from 'react';
import type { Order } from '@/lib/types';

type Lang = 'th' | 'en';

export default function PrintLabelClient({ order, token }: { order: Order; token: string }) {
  const [lang, setLang] = useState<Lang>('th');
  const [shared, setShared] = useState(false);
  const orderNo = order.id.slice(0, 8).toUpperCase();

  // Called synchronously on button click — must NOT be async to keep iOS user gesture
  function handleShare() {
    const url = `${window.location.origin}/api/print/${order.id}?lang=${lang}&k=${token}`;
    if (navigator.share) {
      navigator.share({ title: `ใบปะหน้า #${orderNo}`, url });
      setShared(true);
    } else {
      // Desktop fallback: copy link
      navigator.clipboard?.writeText(url).then(() => setShared(true));
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F0ECE4', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Top bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #E5E0D8', padding: '0 16px', height: 52, display: 'flex', alignItems: 'center', gap: 10 }}>
        <a href={`/admin/orders/${order.id}`} style={{ fontSize: 13, color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
          ← กลับ
        </a>
        <span style={{ fontSize: 13, color: '#999', margin: '0 4px' }}>|</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1208' }}>ใบปะหน้า #{orderNo}</span>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
          {(['th', 'en'] as Lang[]).map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              height: 30, padding: '0 12px', fontSize: 12, borderRadius: 6, cursor: 'pointer',
              border: '1.5px solid',
              borderColor: lang === l ? '#1A1208' : '#D4CFC8',
              background: lang === l ? '#1A1208' : 'white',
              color: lang === l ? 'white' : '#666',
              fontWeight: lang === l ? 600 : 400,
            }}>
              {l === 'th' ? 'ไทย' : 'EN'}
            </button>
          ))}
        </div>
      </div>

      {/* Label image */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 16px 24px' }}>
        <img
          src={`/api/label-image/${order.id}?lang=${lang}&k=${token}&t=${order.updated_at ?? order.created_at ?? ''}`}
          alt={`ใบปะหน้า #${orderNo}`}
          style={{ width: '100%', maxWidth: 420, borderRadius: 10, boxShadow: '0 6px 32px rgba(0,0,0,0.14)', display: 'block' }}
        />

        {/* Action buttons */}
        <div style={{ marginTop: 24, width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Share button */}
          <button
            onClick={handleShare}
            style={{
              width: '100%', height: 50, borderRadius: 12, border: 'none', cursor: 'pointer',
              background: shared ? '#2D5A3D' : '#1A1208',
              color: 'white', fontSize: 16, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'background 0.2s',
            }}
          >
            {shared ? '✓ คัดลอกลิงก์แล้ว' : '↑ แชร์ใบปะหน้า'}
          </button>

          {/* PDF button */}
          <a
            href={`/api/label-pdf/${order.id}?lang=${lang}&k=${token}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%', height: 46, borderRadius: 12,
              border: 'none',
              background: '#2D5A3D', color: 'white', fontSize: 14, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              textDecoration: 'none',
            }}
          >
            📄 เปิด PDF (แชร์ / พิมพ์)
          </a>

          {/* Image page */}
          <a
            href={`/api/print/${order.id}?lang=${lang}&k=${token}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%', height: 42, borderRadius: 12,
              border: '1.5px solid #D4CFC8',
              background: 'white', color: '#555', fontSize: 13, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              textDecoration: 'none',
            }}
          >
            🖼 เปิดหน้ารูป (กดค้างส่ง LINE)
          </a>
        </div>

        {/* Tip */}
        <div style={{ marginTop: 16, maxWidth: 420, width: '100%', background: 'white', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#666', lineHeight: 1.7 }}>
          <strong style={{ color: '#1A1208' }}>วิธีส่ง PDF ไป LINE:</strong><br />
          กด <strong>"เปิด PDF"</strong> → กดปุ่มแชร์ (□↑) → เลือก LINE ได้เลย
        </div>
      </div>
    </div>
  );
}
