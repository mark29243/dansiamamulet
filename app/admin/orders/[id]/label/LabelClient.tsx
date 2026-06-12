'use client';

import { useState } from 'react';
import type { Order } from '@/lib/types';

const SENDER = {
  th: {
    name: 'พระเครื่องแดนสยาม',
    address: '105/1 ม.2 ต.หนองโพ',
    city: 'อ.โพธาราม จ.ราชบุรี 70120',
    phone: '063-240-5335',
  },
  en: {
    name: 'Dan Siam Amulets',
    address: '105/1 M.2, Nongpho',
    city: 'Photharam, Ratchaburi 70120',
    phone: '+66 63 240 5335',
  },
};

type Lang = 'th' | 'en';

export default function LabelClient({ order }: { order: Order }) {
  const [lang, setLang] = useState<Lang>('th');
  const orderNo = order.id.slice(0, 8).toUpperCase();

  function handlePrint() {
    const src = document.getElementById('label-root');
    if (!src) { window.print(); return; }

    const clone = src.cloneNode(true) as HTMLElement;
    clone.id = '__print_label__';
    clone.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:2147483647',
      'background:white', 'display:flex', 'flex-direction:column',
      'width:100%', 'height:100%', 'border:none', 'border-radius:0', 'box-shadow:none',
    ].join(';');
    document.body.appendChild(clone);

    const style = document.createElement('style');
    style.id = '__print_style__';
    style.textContent = `
      @media print {
        body > *:not(#__print_label__) { display: none !important; }
        #__print_label__ {
          display: flex !important;
          flex-direction: column !important;
          position: fixed !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          background: white !important;
        }
        @page { size: 130mm 76mm; margin: 0; }
      }
    `;
    document.head.appendChild(style);

    // delay so iOS Safari renders the clone before capturing print layout
    setTimeout(() => {
      const cleanup = () => {
        document.getElementById('__print_label__')?.remove();
        document.getElementById('__print_style__')?.remove();
        window.removeEventListener('afterprint', cleanup);
      };
      window.addEventListener('afterprint', cleanup);
      setTimeout(cleanup, 5000); // fallback — iOS doesn't always fire afterprint

      window.print();
    }, 400);
  }
  const addr = order.shipping_address;
  const sender = SENDER[lang];
  const addrCity = [addr.city, (addr as any).state, addr.postal_code].filter(Boolean).join(', ');

  return (
    <>
      {/* Controls — hidden on print */}
      <div className="no-print" style={{ padding: '12px 20px', background: '#1A1208', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <a href={`/admin/orders/${order.id}`} style={{ color: '#8B6914', fontSize: 12, textDecoration: 'none' }}>← กลับ</a>
        <span style={{ color: '#C9A84C', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 14, marginLeft: 8 }}>
          ใบปะหน้า #{orderNo}
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {(['th', 'en'] as Lang[]).map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding: '4px 12px', fontSize: 12, borderRadius: 4, cursor: 'pointer', border: '1px solid',
              borderColor: lang === l ? '#C9A84C' : '#3A2A10',
              background: lang === l ? '#C9A84C' : 'transparent',
              color: lang === l ? '#1A1208' : '#8B6914',
              fontWeight: lang === l ? 700 : 400,
            }}>
              {l === 'th' ? '🇹🇭 ไทย' : '🌐 ENG'}
            </button>
          ))}
          <button onClick={handlePrint} style={{ padding: '5px 16px', fontSize: 12, borderRadius: 4, cursor: 'pointer', background: '#2D5A3D', color: '#fff', border: 'none', fontWeight: 600, marginLeft: 6 }}>
            🖨️ พิมพ์ / PDF
          </button>
        </div>
      </div>

      {/* Label — shown on screen and fills page on print */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 16px', background: '#f0ece4', minHeight: 'calc(100vh - 52px)' }}>
        <div id="label-root" style={{ width: '100%', maxWidth: 520, background: '#fff', border: '1.5px solid #ccc', borderRadius: 6, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column' }}>

          {/* Header */}
          <div style={{ background: '#1A1208', padding: '10px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: '#C9A84C', fontSize: 13, letterSpacing: 2 }}>
              {lang === 'th' ? 'พระเครื่อง · แดนสยาม' : 'DAN SIAM AMULETS'}
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: 2 }}>#{orderNo}</span>
          </div>

          {/* Body */}
          <div style={{ flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* FROM */}
            <div>
              <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: '#8B6914', fontFamily: 'Georgia, serif', marginBottom: 5 }}>
                {lang === 'th' ? 'ผู้ส่ง / FROM' : 'FROM'}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1208', marginBottom: 2 }}>{sender.name}</div>
              <div style={{ fontSize: 12, color: '#444', lineHeight: 1.6 }}>{sender.address}<br />{sender.city}</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 3 }}>☎ {sender.phone}</div>
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 1, background: '#EDE0C4' }} />
              <span style={{ fontSize: 10, color: '#C9A84C' }}>✦</span>
              <div style={{ flex: 1, height: 1, background: '#EDE0C4' }} />
            </div>

            {/* TO */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: '#2D5A3D', fontFamily: 'Georgia, serif', marginBottom: 5 }}>
                {lang === 'th' ? 'ผู้รับ / TO' : 'TO'}
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#1A1208', marginBottom: 2 }}>{order.customer_name}</div>
              <div style={{ fontSize: 13, color: '#333', lineHeight: 1.6 }}>
                {addr.line1}<br />
                {addr.line2 && <>{addr.line2}<br /></>}
                {addrCity}<br />
                {addr.country}
              </div>
              {order.customer_phone && (
                <div style={{ fontSize: 13, fontWeight: 600, color: '#222', marginTop: 4 }}>☎ {order.customer_phone}</div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ background: '#F7F0E3', borderTop: '1px solid #EDE0C4', padding: '7px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', color: '#8B6914' }}>
              {lang === 'th' ? '⚠ กรุณาระวังแตก · สิ่งของมีค่า' : '⚠ FRAGILE · HANDLE WITH CARE'}
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#333' }}>▌▌▌ {orderNo} ▌▌▌</span>
          </div>

        </div>
      </div>

      <style>{`
        .no-print { display: flex; }

        @media print {
          .no-print { display: none !important; }
          /* JS clone (#__print_label__) handles the print layout */
          /* Hide everything except the clone when JS approach is active */
          body > *:not(#__print_label__) { display: none !important; }
          #__print_label__ {
            display: flex !important;
            flex-direction: column !important;
            position: fixed !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: white !important;
          }
          @page { size: 130mm 76mm; margin: 0; }
        }
      `}</style>
    </>
  );
}
