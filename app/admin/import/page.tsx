'use client';

import { useState, useRef } from 'react';
import { categoryNames } from '@/lib/i18n';
import { IcoCamera, IcoClock, IcoCheck, IcoWarning } from '@/components/icons';

const CATEGORIES = Object.keys(categoryNames);

type Step = 'idle' | 'uploading' | 'saving' | 'seo' | 'done' | 'error';

export default function ImportPage() {
  const [nameTh, setNameTh] = useState('');
  const [category, setCategory] = useState('เครื่องราง');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [step, setStep] = useState<Step>('idle');
  const [error, setError] = useState('');
  const [resultSlug, setResultSlug] = useState('');
  const [savedProductId, setSavedProductId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImageFiles(files: FileList) {
    setStep('uploading');
    setError('');
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append('file', file);
      try {
        const res = await fetch('/api/admin/upload-image', { method: 'POST', body: fd });
        let json: any;
        try { json = await res.json(); } catch { json = { error: `Server error (${res.status})` }; }
        if (!res.ok) throw new Error(json.error || `Upload failed (${res.status})`);
        uploaded.push(json.url);
      } catch (e: any) {
        setError(`อัพโหลด ${file.name} ล้มเหลว: ${e.message}`);
        setStep('error');
        return;
      }
    }
    setImages((prev) => [...prev, ...uploaded]);
    setStep('idle');
  }

  async function handleSave() {
    if (!nameTh || !price) { setError('กรุณากรอกชื่อสินค้าและราคา'); return; }
    setError('');

    // Step 1: save draft
    setStep('saving');
    const tempSlug = `draft-${Date.now()}`;
    let productId: number;
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
          category,
          description: note,
          description_th: note,
          short: '',
          images,
          published: false,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      productId = json.id;
      setSavedProductId(productId);
    } catch (e: any) {
      setError(e.message);
      setStep('error');
      return;
    }

    await runSeo(productId);
  }

  async function runSeo(id: number) {
    setStep('seo');
    setError('');
    try {
      const res = await fetch('/api/admin/process-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      let json: any;
      try { json = await res.json(); } catch { json = {}; }
      if (!res.ok) throw new Error(json.error || `Server error (${res.status})`);
      setResultSlug(json.slug);
      setStep('done');
      setNameTh(''); setPrice(''); setNote(''); setImages([]);
      setCategory('เครื่องราง');
      setSavedProductId(null);
    } catch (e: any) {
      setError(`สินค้าบันทึกแล้ว (ID #${id}) แต่ SEO ล้มเหลว: ${e.message}`);
      setStep('error');
    }
  }

  const busy = step === 'uploading' || step === 'saving' || step === 'seo';

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>เพิ่มสินค้าใหม่</h1>
      <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 28 }}>
        กรอกข้อมูลภาษาไทย — ระบบจะ generate ชื่ออังกฤษ, จีน, slug และ SEO ให้อัตโนมัติ
      </p>

      {/* Error */}
      {error && (
        <div style={{ background: '#FFF0F0', border: '1px solid #FCA5A5', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#DC2626', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: savedProductId ? 10 : 0 }}>
            <IcoWarning size={14} /> {error}
          </div>
          {savedProductId && step === 'error' && (
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button
                onClick={() => runSeo(savedProductId)}
                style={{ background: '#DC2626', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
              >
                ลอง SEO อีกครั้ง
              </button>
              <a
                href={`/admin/products/${savedProductId}`}
                style={{ padding: '6px 14px', borderRadius: 6, fontSize: 12, border: '1px solid #FCA5A5', color: '#DC2626', textDecoration: 'none', fontWeight: 500 }}
              >
                ไปแก้ไขสินค้า #{savedProductId}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Success */}
      {step === 'done' && (
        <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 8, padding: '16px 20px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16A34A', fontWeight: 600, marginBottom: 6 }}>
            <IcoCheck size={16} /> ลงสินค้าเสร็จแล้ว พร้อม SEO ครบ
          </div>
          <a
            href={`/product/${resultSlug}`}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 13, color: '#16A34A', textDecoration: 'underline' }}
          >
            /product/{resultSlug}
          </a>
        </div>
      )}

      {/* Progress indicator */}
      {busy && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#92400E' }}>
          <IcoClock size={14} />
          {step === 'uploading' && 'กำลังอัพโหลดรูป...'}
          {step === 'saving' && 'กำลังบันทึกสินค้า...'}
          {step === 'seo' && 'กำลัง generate SEO (อังกฤษ + จีน)... รอสักครู่'}
        </div>
      )}

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
          {images.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              {images.map((img, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <img src={img} alt="" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8, border: '1px solid #E5E7EB' }} />
                  <button
                    onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                    style={{ position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: '50%', background: '#EF4444', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12 }}
                  >×</button>
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={busy}
            style={{
              width: '100%', padding: '24px 16px', border: '2px dashed #D1D5DB',
              borderRadius: 10, background: '#F9FAFB', cursor: busy ? 'not-allowed' : 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}
          >
            <span style={{ color: '#6B7280', display: 'flex' }}>
              {step === 'uploading' ? <IcoClock size={36} /> : <IcoCamera size={36} />}
            </span>
            <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>
              {step === 'uploading' ? 'กำลังอัพโหลด...' : 'เลือกรูปจากโทรศัพท์'}
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
            placeholder="เช่น เหรียญหลวงปู่ทวด วัดช้างให้ ปี 2511 เนื้อทองแดง"
            value={nameTh}
            onChange={(e) => setNameTh(e.target.value)}
            disabled={busy}
          />
        </div>

        {/* Category */}
        <div>
          <div style={labelStyle}>หมวดหมู่ *</div>
          <select
            className="input"
            style={{ fontSize: 15 }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={busy}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c} — {categoryNames[c].en}</option>
            ))}
          </select>
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
            disabled={busy}
          />
        </div>

        {/* Note */}
        <div>
          <div style={labelStyle}>รายละเอียด / หมายเหตุ (ภาษาไทย)</div>
          <textarea
            className="input"
            rows={4}
            style={{ resize: 'vertical', fontSize: 13 }}
            placeholder="เช่น สร้างปี พ.ศ. 2511 เนื้อทองแดง พิมพ์ใหญ่ วัดช้างให้ จ.ปัตตานี หายากมาก มีตำหนิตามรูป..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={busy}
          />
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
            ยิ่งละเอียดมาก SEO ยิ่งดี — ใส่ปีสร้าง เนื้อหา วัด พุทธคุณ
          </div>
        </div>

        <button
          className="btn-gold"
          onClick={handleSave}
          disabled={busy || !nameTh || !price}
          style={{ width: '100%', padding: '14px', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          {busy ? (
            <><IcoClock size={15} /> {step === 'uploading' ? 'อัพโหลดรูป...' : step === 'saving' ? 'บันทึก...' : 'Generate SEO...'}</>
          ) : (
            <><IcoCheck size={15} /> ลงสินค้าพร้อม SEO อัตโนมัติ</>
          )}
        </button>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 11, color: '#6B7280', marginBottom: 4,
  fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
};
