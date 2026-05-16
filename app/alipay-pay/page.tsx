'use client';

import { Suspense, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ALIPAY_NAME = process.env.NEXT_PUBLIC_ALIPAY_NAME || 'jacky(* JARUN)';

function AlipayInner() {
  const sp = useSearchParams();
  const orderId = sp.get('order') ?? '';
  const amount = sp.get('amount') ?? '0';
  const shortId = orderId.slice(0, 8).toUpperCase();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError('');
  }

  async function handleUpload() {
    if (!file || !orderId) return;
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('orderId', orderId);
      fd.append('file', file);
      const res = await fetch('/api/upload-slip', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setDone(true);
    } catch (e: any) {
      setError(e.message || 'เกิดข้อผิดพลาด');
    } finally {
      setUploading(false);
    }
  }

  if (done) {
    return (
      <div className="container animate-fade-in" style={{ padding: '80px 24px', maxWidth: 480, textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, background: 'var(--jade)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(45,90,61,0.3)' }}>
          <span style={{ fontSize: 36, color: '#fff' }}>✓</span>
        </div>
        <h1 className="serif" style={{ fontSize: 24, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>
          ส่งสลิปเรียบร้อยแล้ว!
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 32 }}>
          เราจะตรวจสอบและยืนยันคำสั่งซื้อ #{shortId} ภายใน 24 ชั่วโมง
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/orders" className="btn-gold">ดูคำสั่งซื้อ</Link>
          <Link href="/shop" className="btn-outline">ช้อปต่อ</Link>
        </div>
      </div>
    );
  }

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
        <img src="/alipay-qr.jpg" alt="Alipay QR Code" style={{ width: 220, height: 220, objectFit: 'contain', borderRadius: 8 }} />
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
          { th: 'อัพโหลดสลิปด้านล่างนี้', zh: '上传付款截图' },
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

      {/* Upload slip */}
      <div className="card" style={{ padding: 24, marginBottom: 24, textAlign: 'left' }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: 'var(--gold-dark)', textTransform: 'uppercase', marginBottom: 14 }}>
          อัพโหลดสลิป / 上传截图
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />

        {!preview ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            style={{
              width: '100%', padding: '28px 16px', border: '2px dashed var(--cream-dark)',
              borderRadius: 8, background: 'var(--cream)', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}
          >
            <span style={{ fontSize: 32 }}>📎</span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>แตะเพื่อเลือกรูปสลิป / 点击选择截图</span>
            <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>JPG, PNG ขนาดไม่เกิน 10MB</span>
          </button>
        ) : (
          <div>
            <img src={preview} alt="slip preview" style={{ width: '100%', maxHeight: 280, objectFit: 'contain', borderRadius: 8, border: '1px solid var(--cream-dark)', marginBottom: 12 }} />
            <button type="button" onClick={() => inputRef.current?.click()} style={{ fontSize: 12, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', marginBottom: 4, display: 'block' }}>
              เปลี่ยนรูป / 重新选择
            </button>
          </div>
        )}

        {error && (
          <div style={{ marginTop: 10, fontSize: 13, color: '#c0392b', background: 'rgba(192,57,43,0.08)', padding: '8px 12px', borderRadius: 6 }}>
            ⚠ {error}
          </div>
        )}

        <button
          type="button"
          className="btn-gold"
          disabled={!file || uploading}
          onClick={handleUpload}
          style={{ width: '100%', marginTop: 16, opacity: !file ? 0.5 : 1 }}
        >
          {uploading ? <><span className="spinner" /> กำลังส่ง...</> : '📤 ส่งสลิป / 提交截图'}
        </button>
      </div>

      <p className="serif" style={{ fontSize: 11, color: 'var(--text-faint)', fontStyle: 'italic' }}>
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
