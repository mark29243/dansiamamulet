'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ALIPAY_NAME = process.env.NEXT_PUBLIC_ALIPAY_NAME || 'Dan Siam Amulets';
const CONTACT_LINE = process.env.NEXT_PUBLIC_LINE_ID || '@dansiam';
const CONTACT_EMAIL = 'dansiamamulets2@gmail.com';

function AlipayInner() {
  const sp = useSearchParams();
  const orderId = sp.get('order') ?? '';
  const amount = sp.get('amount') ?? '0';
  const shortId = orderId.slice(0, 8).toUpperCase();

  return (
    <div className="container animate-fade-in" style={{ padding: '48px 24px 80px', maxWidth: 520, textAlign: 'center' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>支付宝</div>
        <h1 className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>
          ชำระเงินผ่าน Alipay
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>สแกน QR Code แล้วโอนยอดด้านล่าง</p>
      </div>

      {/* Amount */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: 20, background: 'rgba(0,164,233,0.06)', border: '1px solid rgba(0,164,233,0.2)' }}>
        <div style={{ fontSize: 12, letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>ยอดชำระ / 付款金额</div>
        <div className="serif" style={{ fontSize: 40, fontWeight: 700, color: '#0070ba' }}>¥{amount}</div>
        <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 4 }}>หมายเลขคำสั่งซื้อ: #{shortId}</div>
      </div>

      {/* QR Code */}
      <div className="card" style={{ padding: 24, marginBottom: 20, display: 'inline-block' }}>
        <div style={{ width: 200, height: 200, margin: '0 auto', border: '2px dashed var(--cream-dark)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
          {/* Replace with: <img src="/alipay-qr.png" alt="Alipay QR" style={{ width: 200, height: 200, objectFit: 'contain' }} /> */}
          <span style={{ fontSize: 32 }}>📱</span>
          <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>อัพโหลด alipay-qr.png</span>
          <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>ใน /public</span>
        </div>
        <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text-muted)' }}>
          收款方 / บัญชีผู้รับ: <strong style={{ color: 'var(--text)' }}>{ALIPAY_NAME}</strong>
        </div>
      </div>

      {/* Steps */}
      <div className="card" style={{ padding: 20, marginBottom: 20, textAlign: 'left' }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: 14 }}>ขั้นตอน / 操作步骤</div>
        {[
          { th: 'สแกน QR Code ด้านบน', zh: '扫描上方二维码' },
          { th: `โอนยอด ¥${amount} พอดี`, zh: `转账 ¥${amount}` },
          { th: `ใส่หมายเลขคำสั่งซื้อ #${shortId} ในช่องหมายเหตุ`, zh: `备注订单号 #${shortId}` },
          { th: 'ส่งสลิปมาให้ร้านทาง LINE หรืออีเมล', zh: '截图发给我们确认' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
            <span style={{ background: '#0070ba', color: '#fff', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
            <div>
              <div style={{ fontSize: 13, color: 'var(--text)' }}>{s.th}</div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>{s.zh}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="card" style={{ padding: 16, background: 'rgba(45,90,61,0.06)', border: '1px solid rgba(45,90,61,0.15)', marginBottom: 28 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>ส่งสลิปมาที่ / 发送截图至</div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`https://line.me/R/ti/p/${CONTACT_LINE}`} style={{ fontSize: 13, color: 'var(--jade)', fontWeight: 600 }}>
            LINE: {CONTACT_LINE}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontSize: 13, color: 'var(--gold-dark)' }}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/orders" className="btn-gold">ดูคำสั่งซื้อ</Link>
        <Link href="/shop" className="btn-outline">ช้อปต่อ</Link>
      </div>

      <p className="serif" style={{ marginTop: 32, fontSize: 11, color: 'var(--text-faint)', fontStyle: 'italic' }}>
        คำสั่งซื้อจะได้รับการยืนยันหลังตรวจสอบการโอนเงินแล้ว
      </p>
    </div>
  );
}

export default function AlipayPayPage() {
  return (
    <Suspense fallback={<div style={{ padding: 80, textAlign: 'center' }}><div className="spinner" /></div>}>
      <AlipayInner />
    </Suspense>
  );
}
