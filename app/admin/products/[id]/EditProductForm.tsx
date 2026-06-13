'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';

const CATEGORIES = [
  'พระสมเด็จ', 'พระนางพญา', 'พระปิดตา', 'พระนาคปรก', 'พระกริ่ง',
  'พระผง', 'พระรอด', 'เหรียญ', 'รูปหล่อ', 'เครื่องราง', 'พระพิฆเนศ',
  'หลวงพ่อทวด', 'หลวงปู่โต พรหมรังสี', 'หลวงพ่อคูณ', 'หลวงพ่อเงิน', 'พระเกจิอาจารย์', 'พระสังกัจจายน์',
];

export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter();
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [images, setImages] = useState<string[]>(Array.isArray(product.images) ? product.images : []);
  const [uploading, setUploading] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const [form, setForm] = useState({
    name_th: product.name_th || '',
    description_th: product.description_th || '',
    category: product.category || '',
    price: ((product.price ?? 0) / 100).toFixed(2),
    sale_price: product.sale_price ? (product.sale_price / 100).toFixed(2) : '',
    stock: product.stock ?? 0,
  });

  function set(key: string, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleImageFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append('file', file);
      try {
        const res = await fetch('/api/admin/upload-image', { method: 'POST', body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Upload failed');
        uploaded.push(json.url);
      } catch (e: any) {
        toast(`อัพโหลด ${file.name} ล้มเหลว: ${e.message}`, 'error');
      }
    }
    if (uploaded.length) setImages((prev) => [...prev, ...uploaded]);
    setUploading(false);
  }

  function removeImage(i: number) {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
  }

  function makeMain(i: number) {
    setImages((prev) => (i <= 0 ? prev : [prev[i], ...prev.filter((_, idx) => idx !== i)]));
  }

  function handleDrop(targetIdx: number) {
    if (dragIdx === null || dragIdx === targetIdx) return;
    setImages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(targetIdx, 0, moved);
      return next;
    });
    setDragIdx(null);
  }

  async function handleSave() {
    setBusy(true);
    try {
      // Step 1: save basic fields
      const body: any = {
        name_th: form.name_th,
        description_th: form.description_th,
        category: form.category,
        price: Math.round(Number(form.price) * 100),
        sale_price: form.sale_price === '' ? null : Math.round(Number(form.sale_price) * 100),
        stock: Number(form.stock),
        images,
      };
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      // Step 2: regenerate SEO via Claude
      toast('Claude กำลังอัพเดท SEO...', 'success');
      const seoRes = await fetch('/api/admin/process-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id }),
      });
      const seoData = await seoRes.json();
      if (!seoRes.ok) throw new Error(seoData.error || 'SEO failed');

      toast('บันทึกและอัพเดท SEO เรียบร้อยแล้ว', 'success');
      setTimeout(() => router.push('/admin/products'), 800);
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast('ลบสินค้าแล้ว', 'success');
      setTimeout(() => { window.location.href = '/admin/products'; }, 600);
    } catch (e: any) {
      toast(e.message, 'error');
      setDeleting(false);
    }
  }

  return (
    <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Field label={`รูปภาพ (${images.length} รูป)`}>
        {images.length > 0 && (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
            {images.map((img, i) => (
              <div
                key={img + i}
                draggable
                onDragStart={() => setDragIdx(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(i)}
                onDragEnd={() => setDragIdx(null)}
                style={{
                  position: 'relative', cursor: 'grab',
                  opacity: dragIdx === i ? 0.4 : 1,
                  transform: dragIdx === i ? 'scale(0.95)' : 'none',
                  transition: 'opacity 0.15s, transform 0.15s',
                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{
                    width: 96, height: 96, objectFit: 'cover', borderRadius: 'var(--radius)',
                    border: i === 0 ? '2px solid var(--gold-dark)' : '1px solid var(--cream-dark)',
                    pointerEvents: 'none',
                  }}
                />
                {i === 0 && (
                  <span style={{ position: 'absolute', bottom: 4, left: 4, background: 'var(--gold-dark)', color: '#fff', fontSize: 9, padding: '1px 5px', borderRadius: 3, letterSpacing: 0.5 }}>
                    รูปหลัก
                  </span>
                )}
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => makeMain(i)}
                    title="ตั้งเป็นรูปหลัก"
                    style={{ position: 'absolute', bottom: 4, left: 4, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', fontSize: 9, padding: '2px 5px', borderRadius: 3, cursor: 'pointer' }}
                  >
                    ตั้งหลัก
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  title="ลบรูป"
                  style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', background: 'var(--burgundy)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 12, lineHeight: 1 }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <label
          className="btn-outline"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', cursor: uploading ? 'wait' : 'pointer', fontSize: 13, opacity: uploading ? 0.6 : 1, alignSelf: 'flex-start' }}
        >
          {uploading ? 'กำลังอัพโหลด...' : '+ เพิ่มรูป'}
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            onChange={(e) => { handleImageFiles(e.target.files); e.target.value = ''; }}
            style={{ display: 'none' }}
          />
        </label>
      </Field>

      <Field label="ชื่อภาษาไทย">
        <input className="input" value={form.name_th} onChange={(e) => set('name_th', e.target.value)} />
      </Field>

      <Field label="รายละเอียด (ไทย)">
        <textarea className="input" rows={3} value={form.description_th} onChange={(e) => set('description_th', e.target.value)} style={{ resize: 'vertical' }} />
      </Field>

      <Field label="หมวดหมู่">
        <select className="input" value={form.category} onChange={(e) => set('category', e.target.value)}>
          <option value="">-- เลือก --</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <Field label="ราคา (฿)">
          <input className="input" type="number" min={0} value={form.price} onChange={(e) => set('price', e.target.value)} />
        </Field>
        <Field label="ราคาลด (฿)">
          <input className="input" type="number" min={0} placeholder="ไม่มี" value={form.sale_price} onChange={(e) => set('sale_price', e.target.value)} />
        </Field>
        <Field label="จำนวน">
          <input className="input" type="number" min={0} value={form.stock} onChange={(e) => set('stock', e.target.value)} />
        </Field>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', marginTop: 8 }}>
        <button onClick={() => router.back()} className="btn-outline" style={{ padding: '10px 20px' }}>
          ยกเลิก
        </button>

        <div style={{ display: 'flex', gap: 8 }}>
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              style={{ background: 'var(--burgundy)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 'var(--radius)', cursor: 'pointer', fontSize: 13 }}
            >
              ลบสินค้า
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--burgundy)', fontWeight: 600 }}>ยืนยันลบ?</span>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{ background: 'var(--burgundy)', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 'var(--radius)', cursor: 'pointer', fontSize: 13 }}
              >
                {deleting ? '...' : 'ลบเลย'}
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                style={{ background: 'transparent', border: '1px solid var(--cream-dark)', padding: '10px 16px', borderRadius: 'var(--radius)', cursor: 'pointer', fontSize: 13 }}
              >
                ยกเลิก
              </button>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={busy}
            className="btn-primary"
            style={{ padding: '10px 24px', opacity: busy ? 0.7 : 1 }}
          >
            {busy ? 'กำลังบันทึก + SEO...' : 'บันทึก'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label className="serif" style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        {label}
      </label>
      {children}
    </div>
  );
}
