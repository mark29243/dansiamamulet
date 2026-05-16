'use client';

import { useState } from 'react';
import { categoryNames } from '@/lib/i18n';

const CATEGORIES = Object.keys(categoryNames);

type ProductData = {
  name: string;
  name_th: string;
  slug: string;
  price: number;
  stock: number;
  description: string;
  description_th: string;
  short: string;
  images: string[];
};

export default function ImportPage() {
  const [url, setUrl] = useState('');
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [data, setData] = useState<ProductData | null>(null);
  const [category, setCategory] = useState('เหรียญ');
  const [salePrice, setSalePrice] = useState('');

  async function handleFetch() {
    setError('');
    setSuccess('');
    setData(null);
    if (!url.includes('shopee.co.th')) {
      setError('กรุณาใส่ URL จาก shopee.co.th');
      return;
    }
    setFetching(true);
    try {
      const res = await fetch('/api/import-shopee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setData(json);
      // Auto-detect category from name
      const nameLower = json.name_th.toLowerCase();
      if (nameLower.includes('เหรียญ')) setCategory('เหรียญ');
      else if (nameLower.includes('สมเด็จ')) setCategory('พระสมเด็จ');
      else if (nameLower.includes('ปิดตา')) setCategory('พระปิดตา');
      else if (nameLower.includes('กริ่ง')) setCategory('พระกริ่ง');
      else if (nameLower.includes('นางพญา')) setCategory('พระนางพญา');
      else if (nameLower.includes('ผง')) setCategory('พระผง');
      else if (nameLower.includes('รูปหล่อ') || nameLower.includes('พระพุทธ') || nameLower.includes('นาคปรก')) setCategory('รูปหล่อ');
      else setCategory('เครื่องราง');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setFetching(false);
    }
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          category,
          sale_price: salePrice ? parseInt(salePrice) * 100 : null,
          published: true,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setSuccess(`✓ ลงสินค้าสำเร็จ! ID: ${json.id} — /product/${data.slug}`);
      setData(null);
      setUrl('');
      setSalePrice('');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>นำเข้าสินค้าจาก Shopee</h1>
      <p style={{ fontSize: 13, color: '#666', marginBottom: 24 }}>วาง URL สินค้าจาก shopee.co.th แล้วกด ดึงข้อมูล</p>

      {/* URL input */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <input
          className="input"
          style={{ flex: 1, fontSize: 13 }}
          placeholder="https://shopee.co.th/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
        />
        <button
          className="btn-gold"
          onClick={handleFetch}
          disabled={fetching || !url}
          style={{ whiteSpace: 'nowrap', padding: '0 20px' }}
        >
          {fetching ? '⏳ กำลังดึง...' : '🔍 ดึงข้อมูล'}
        </button>
      </div>

      {error && (
        <div style={{ background: '#FFF0F0', border: '1px solid #FCA5A5', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#DC2626', marginBottom: 16 }}>
          ⚠ {error}
        </div>
      )}
      {success && (
        <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#16A34A', marginBottom: 16 }}>
          {success}
        </div>
      )}

      {data && (
        <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ background: '#F9FAFB', padding: '12px 16px', borderBottom: '1px solid #E5E7EB', fontSize: 12, color: '#6B7280', letterSpacing: 1, textTransform: 'uppercase' }}>
            ตรวจสอบข้อมูลก่อนบันทึก
          </div>

          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Images preview */}
            {data.images.length > 0 && (
              <div>
                <div style={labelStyle}>รูปภาพ ({data.images.length} รูป)</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {data.images.map((img, i) => (
                    <img key={i} src={img} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4, border: '1px solid #E5E7EB' }} />
                  ))}
                </div>
              </div>
            )}

            <Field label="ชื่อสินค้า (EN)">
              <input className="input" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            </Field>

            <Field label="ชื่อสินค้า (TH)">
              <input className="input" value={data.name_th} onChange={(e) => setData({ ...data, name_th: e.target.value })} />
            </Field>

            <Field label="Slug (URL)">
              <input className="input" value={data.slug} onChange={(e) => setData({ ...data, slug: e.target.value })} style={{ fontFamily: 'monospace', fontSize: 12 }} />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <Field label="ราคาปกติ (บาท)">
                <input className="input" type="number" value={data.price / 100} onChange={(e) => setData({ ...data, price: parseInt(e.target.value) * 100 || 0 })} />
              </Field>
              <Field label="ราคาลด (บาท) — เว้นว่างถ้าไม่มี">
                <input className="input" type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="ไม่มี" />
              </Field>
              <Field label="สต็อก (องค์)">
                <input className="input" type="number" value={data.stock} onChange={(e) => setData({ ...data, stock: parseInt(e.target.value) || 0 })} />
              </Field>
            </div>

            <Field label="หมวดหมู่">
              <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c} — {categoryNames[c].en}</option>
                ))}
              </select>
            </Field>

            <Field label="คำอธิบายสั้น (short)">
              <textarea className="input" rows={2} value={data.short} onChange={(e) => setData({ ...data, short: e.target.value })} style={{ resize: 'vertical' }} />
            </Field>

            <Field label="รายละเอียดเต็ม (TH)">
              <textarea className="input" rows={4} value={data.description_th} onChange={(e) => setData({ ...data, description_th: e.target.value })} style={{ resize: 'vertical' }} />
            </Field>

            <button
              className="btn-gold"
              onClick={handleSave}
              disabled={saving}
              style={{ width: '100%', padding: '13px' }}
            >
              {saving ? '⏳ กำลังบันทึก...' : '✓ บันทึกสินค้าลงเว็บ'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={labelStyle}>{label}</div>
      {children}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  color: '#6B7280',
  marginBottom: 4,
  fontWeight: 600,
  letterSpacing: 0.5,
  textTransform: 'uppercase',
};
