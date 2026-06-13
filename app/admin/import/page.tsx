'use client';

import { useState, useRef } from 'react';
import { categoryNames } from '@/lib/i18n';
import { IcoCamera, IcoClock, IcoCheck, IcoWarning } from '@/components/icons';

const CATEGORIES = Object.keys(categoryNames);

type Step = 'idle' | 'uploading' | 'saving' | 'done' | 'error';

export default function ImportPage() {
  const [nameTh, setNameTh] = useState('');
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [step, setStep] = useState<Step>('idle');
  const [error, setError] = useState('');
  const [savedId, setSavedId] = useState<number | null>(null);
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

  function toggleCat(cat: string) {
    setSelectedCats((prev) => {
      if (prev.includes(cat)) return prev.filter((c) => c !== cat);
      if (prev.length >= 3) return prev;
      return [...prev, cat];
    });
  }

  async function handleSave() {
    if (!nameTh || !price) { setError('กรุณากรอกชื่อสินค้าและราคา'); return; }
    if (selectedCats.length === 0) { setError('กรุณาเลือกหมวดหมู่อย่างน้อย 1 อย่าง'); return; }
    setError('');
    setStep('saving');

    const tempSlug = `draft-${Date.now()}`;
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
          category: selectedCats.join(','),
          description: note,
          description_th: note,
          short: '',
          images,
          published: false,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setSavedId(json.id);
      setStep('done');
      setNameTh(''); setPrice(''); setNote(''); setImages([]);
      setSelectedCats([]);
    } catch (e: any) {
      setError(e.message);
      setStep('error');
    }
  }

  function handleAddAnother() {
    setStep('idle');
    setError('');
    setSavedId(null);
  }

  const busy = step === 'uploading' || step === 'saving';

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>เพิ่มสินค้าใหม่</h1>
      <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 28 }}>
        บันทึกเป็น draft — ไปกด Publish ในหน้า Products เพื่อ generate SEO และเผยแพร่
      </p>

      {/* Error */}
      {error && (
        <div style={{ background: '#FFF0F0', border: '1px solid #FCA5A5', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#DC2626', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
          <IcoWarning size={14} /> {error}
        </div>
      )}

      {/* Success */}
      {step === 'done' && savedId && (
        <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 8, padding: '16px 20px', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16A34A', fontWeight: 600, marginBottom: 10 }}>
            <IcoCheck size={16} /> บันทึก draft เรียบร้อย
          </div>
          <p style={{ fontSize: 13, color: '#374151', marginBottom: 12 }}>
            ไปที่หน้า Products → แท็บ Unpublished → กด Publish เพื่อ generate SEO และเผยแพร่
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <a
              href="/admin/products"
              style={{ background: '#16A34A', color: '#fff', padding: '8px 18px', borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
            >
              ไปหน้า Products
            </a>
            <button
              onClick={handleAddAnother}
              style={{ padding: '8px 18px', borderRadius: 6, fontSize: 13, border: '1px solid #86EFAC', color: '#16A34A', background: 'transparent', cursor: 'pointer', fontWeight: 500 }}
            >
              เพิ่มสินค้าอีก
            </button>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      {busy && (
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#92400E' }}>
          <IcoClock size={14} />
          {step === 'uploading' && 'กำลังอัพโหลดรูป...'}
          {step === 'saving' && 'กำลังบันทึกสินค้า...'}
        </div>
      )}

      {step !== 'done' && (
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
            <div style={{ ...labelStyle, marginBottom: 8 }}>
              หมวดหมู่ * <span style={{ fontWeight: 400, color: '#9CA3AF', textTransform: 'none', letterSpacing: 0 }}>(เลือกได้สูงสุด 3 หมวด — เลือกแล้ว {selectedCats.length}/3)</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {CATEGORIES.map((c) => {
                const checked = selectedCats.includes(c);
                const disabled = busy || (!checked && selectedCats.length >= 3);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => !disabled && toggleCat(c)}
                    disabled={disabled}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 20,
                      border: '1px solid ' + (checked ? '#C9A96E' : '#D1D5DB'),
                      background: checked ? '#F4EFE5' : '#F9FAFB',
                      color: checked ? '#1A1208' : disabled ? '#D1D5DB' : '#374151',
                      fontSize: 13,
                      fontWeight: checked ? 600 : 400,
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {checked && '✓ '}{c}
                  </button>
                );
              })}
            </div>
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
            disabled={busy || !nameTh || !price || selectedCats.length === 0}
            style={{ width: '100%', padding: '14px', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {busy ? (
              <><IcoClock size={15} /> {step === 'uploading' ? 'อัพโหลดรูป...' : 'บันทึก...'}</>
            ) : (
              <><IcoCheck size={15} /> บันทึก draft</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 11, color: '#6B7280', marginBottom: 4,
  fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
};
