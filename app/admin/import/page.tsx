'use client';

import { useState, useRef } from 'react';
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

const BLANK: ProductData = {
  name: '', name_th: '', slug: '', price: 0, stock: 1,
  description: '', description_th: '', short: '', images: [],
};

export default function ImportPage() {
  const [url, setUrl] = useState('');
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [data, setData] = useState<ProductData | null>(null);
  const [category, setCategory] = useState('เครื่องราง');
  const [salePrice, setSalePrice] = useState('');
  const [tab, setTab] = useState<'shopee' | 'manual'>('manual');
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Manual tab state
  const [nameTh, setNameTh] = useState('');
  const [price, setPrice] = useState('');
  const [manualImages, setManualImages] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [note, setNote] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  function autoCategory(nameLower: string) {
    if (nameLower.includes('เหรียญ')) return 'เหรียญ';
    if (nameLower.includes('สมเด็จ')) return 'พระสมเด็จ';
    if (nameLower.includes('ปิดตา')) return 'พระปิดตา';
    if (nameLower.includes('กริ่ง')) return 'พระกริ่ง';
    if (nameLower.includes('นางพญา')) return 'พระนางพญา';
    if (nameLower.includes('ผง')) return 'พระผง';
    if (nameLower.includes('รูปหล่อ') || nameLower.includes('พระพุทธ') || nameLower.includes('นาคปรก')) return 'รูปหล่อ';
    return 'เครื่องราง';
  }

  async function handleFetch() {
    setError(''); setSuccess(''); setData(null);
    if (!url.includes('shopee')) { setError('กรุณาใส่ URL จาก shopee.co.th'); return; }
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
      setCategory(autoCategory(json.name_th.toLowerCase()));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setFetching(false);
    }
  }

  async function handleSave() {
    if (!data) return;
    setSaving(true); setError('');
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data, category,
          sale_price: salePrice ? parseInt(salePrice) * 100 : null,
          published: true,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setSuccess(`✓ ลงสินค้าสำเร็จ! — /product/${data.slug}`);
      setData(null); setUrl(''); setSalePrice('');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleImageFiles(files: FileList) {
    if (!files.length) return;
    setUploadingImages(true);
    setError('');
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append('file', file);
      try {
        const res = await fetch('/api/admin/upload-image', { method: 'POST', body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        uploaded.push(json.url);
      } catch (e: any) {
        setError(`อัพโหลด ${file.name} ล้มเหลว: ${e.message}`);
      }
    }
    setManualImages((prev) => [...prev, ...uploaded]);
    setUploadingImages(false);
  }

  async function handleManualSave() {
    if (!nameTh || !price) { setError('กรุณากรอกชื่อสินค้าและราคา'); return; }
    setSaving(true); setError('');
    // Generate temp slug from timestamp — Claude will update later
    const tempSlug = `draft-${Date.now()}`;
    const cat = autoCategory(nameTh.toLowerCase());
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameTh,
          name_th: nameTh,
          slug: tempSlug,
          price: parseFloat(price) * 100,
          sale_price: null,
          stock: 1,
          category: cat,
          description: note,
          description_th: note,
          short: '',
          images: manualImages,
          published: false,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setSuccess(`✓ บันทึก draft สำเร็จ (ID: ${json.id}) — แจ้ง Claude ให้เติม SEO ได้เลยครับ`);
      setNameTh(''); setPrice(''); setManualImages([]); setNote('');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  function addImageUrl() {
    const trimmed = imageUrlInput.trim();
    if (!trimmed || !data) return;
    setData({ ...data, images: [...data.images, trimmed] });
    setImageUrlInput('');
  }
  function removeImage(i: number) {
    if (!data) return;
    setData({ ...data, images: data.images.filter((_, idx) => idx !== i) });
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>นำเข้าสินค้า</h1>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid #E5E7EB' }}>
        {(['manual', 'shopee'] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setData(t === 'shopee' ? null : null); setError(''); setSuccess(''); }}
            style={{
              padding: '10px 20px', fontSize: 13, border: 'none', cursor: 'pointer',
              background: 'transparent', fontWeight: tab === t ? 600 : 400,
              color: tab === t ? 'var(--gold-dark)' : '#6B7280',
              borderBottom: tab === t ? '2px solid var(--gold-dark)' : '2px solid transparent',
              marginBottom: -1,
            }}
          >
            {t === 'manual' ? '📸 เพิ่มสินค้าใหม่' : '🔍 นำเข้าจาก Shopee'}
          </button>
        ))}
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

      {/* ─── MANUAL TAB ─── */}
      {tab === 'manual' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Image upload */}
          <div>
            <div style={labelStyle}>รูปภาพ</div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => e.target.files && handleImageFiles(e.target.files)}
            />

            {/* Previews */}
            {manualImages.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                {manualImages.map((img, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <img src={img} alt="" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, border: '1px solid #E5E7EB' }} />
                    <button
                      onClick={() => setManualImages((prev) => prev.filter((_, idx) => idx !== i))}
                      style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', background: '#EF4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, lineHeight: 1 }}
                    >×</button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImages}
              style={{
                width: '100%', padding: '24px 16px', border: '2px dashed #D1D5DB',
                borderRadius: 10, background: '#F9FAFB', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{ fontSize: 36 }}>{uploadingImages ? '⏳' : '📷'}</span>
              <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>
                {uploadingImages ? 'กำลังอัพโหลด...' : 'เลือกรูปจากโทรศัพท์'}
              </span>
              <span style={{ fontSize: 12, color: '#9CA3AF' }}>เลือกได้หลายรูปพร้อมกัน</span>
            </button>
          </div>

          {/* Thai name */}
          <div>
            <div style={labelStyle}>ชื่อสินค้า (ภาษาไทย) *</div>
            <input
              className="input"
              style={{ fontSize: 15 }}
              placeholder="เช่น เหรียญหลวงปู่ทวด วัดช้างให้ ปี 2511"
              value={nameTh}
              onChange={(e) => setNameTh(e.target.value)}
            />
          </div>

          {/* Price */}
          <div>
            <div style={labelStyle}>ราคา (บาท) *</div>
            <input
              className="input"
              type="number"
              style={{ fontSize: 15 }}
              placeholder="เช่น 1500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Note for Claude */}
          <div>
            <div style={labelStyle}>หมายเหตุเพิ่มเติม (ไม่บังคับ)</div>
            <textarea
              className="input"
              rows={3}
              style={{ resize: 'vertical', fontSize: 13 }}
              placeholder="เช่น สร้างปี 2511 เนื้อทองแดง มีตำหนิ หายาก..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <button
            className="btn-gold"
            onClick={handleManualSave}
            disabled={saving || uploadingImages || !nameTh || !price}
            style={{ width: '100%', padding: '14px', fontSize: 15 }}
          >
            {saving ? '⏳ กำลังบันทึก...' : '📤 อัพโหลดและแจ้ง Claude'}
          </button>

          <p style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center' }}>
            หลังกด Claude จะเติม SEO, ชื่ออังกฤษ, slug และ publish ให้อัตโนมัติ
          </p>
        </div>
      )}

      {/* ─── SHOPEE TAB ─── */}
      {tab === 'shopee' && (
        <>
          <p style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>วาง URL สินค้าจาก shopee.co.th แล้วกด ดึงข้อมูล</p>
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

          {data && (
            <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ background: '#F9FAFB', padding: '12px 16px', borderBottom: '1px solid #E5E7EB', fontSize: 12, color: '#6B7280', letterSpacing: 1, textTransform: 'uppercase' }}>
                ตรวจสอบข้อมูลก่อนบันทึก
              </div>
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <div style={labelStyle}>รูปภาพ ({data.images.length} รูป)</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                    {data.images.map((img, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        <img src={img} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4, border: '1px solid #E5E7EB' }} />
                        <button onClick={() => removeImage(i)} style={{ position: 'absolute', top: -6, right: -6, width: 18, height: 18, borderRadius: '50%', background: '#EF4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 10 }}>×</button>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input className="input" style={{ flex: 1, fontSize: 12 }} placeholder="วาง URL รูปภาพ" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addImageUrl()} />
                    <button className="btn-gold" onClick={addImageUrl} style={{ padding: '0 14px' }}>+</button>
                  </div>
                </div>
                <Field label="ชื่อสินค้า (EN)"><input className="input" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} /></Field>
                <Field label="ชื่อสินค้า (TH)"><input className="input" value={data.name_th} onChange={(e) => setData({ ...data, name_th: e.target.value })} /></Field>
                <Field label="Slug (URL)"><input className="input" value={data.slug} onChange={(e) => setData({ ...data, slug: e.target.value })} style={{ fontFamily: 'monospace', fontSize: 12 }} /></Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  <Field label="ราคาปกติ (บาท)"><input className="input" type="number" value={data.price / 100} onChange={(e) => setData({ ...data, price: parseInt(e.target.value) * 100 || 0 })} /></Field>
                  <Field label="ราคาลด (บาท)"><input className="input" type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="ไม่มี" /></Field>
                  <Field label="สต็อก"><input className="input" type="number" value={data.stock} onChange={(e) => setData({ ...data, stock: parseInt(e.target.value) || 0 })} /></Field>
                </div>
                <Field label="หมวดหมู่">
                  <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c} — {categoryNames[c].en}</option>)}
                  </select>
                </Field>
                <Field label="คำอธิบายสั้น"><textarea className="input" rows={2} value={data.short} onChange={(e) => setData({ ...data, short: e.target.value })} style={{ resize: 'vertical' }} /></Field>
                <Field label="รายละเอียด (TH)"><textarea className="input" rows={4} value={data.description_th} onChange={(e) => setData({ ...data, description_th: e.target.value })} style={{ resize: 'vertical' }} /></Field>
                <button className="btn-gold" onClick={handleSave} disabled={saving || !data.name || !data.slug} style={{ width: '100%', padding: '13px' }}>
                  {saving ? '⏳ กำลังบันทึก...' : '✓ บันทึกสินค้าลงเว็บ'}
                </button>
              </div>
            </div>
          )}
        </>
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
  fontSize: 11, color: '#6B7280', marginBottom: 4,
  fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
};
