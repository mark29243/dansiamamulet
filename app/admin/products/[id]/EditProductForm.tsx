'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';

const CATEGORIES = ['พระสมเด็จ', 'พระกริ่ง', 'พระปิดตา', 'เหรียญ', 'รูปหล่อ', 'พระงิ้ว', 'เครื่องราง', 'พระผง'];

export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter();
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

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
      };
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      // Step 2: regenerate SEO via Claude
      toast('🤖 Claude กำลังอัพเดท SEO...', 'success');
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
      setTimeout(() => router.push('/admin/products'), 600);
    } catch (e: any) {
      toast(e.message, 'error');
      setDeleting(false);
    }
  }

  return (
    <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {product.images?.[0] && (
        <img src={product.images[0]} alt="" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 'var(--radius)' }} />
      )}

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
            {busy ? '🤖 กำลังบันทึก + SEO...' : 'บันทึก'}
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
