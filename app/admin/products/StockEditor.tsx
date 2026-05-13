'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';

export default function StockEditor({ productId, stock }: { productId: number; stock: number }) {
  const [value, setValue] = useState(stock);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function save() {
    if (value === stock) { setEditing(false); return; }
    if (value < 0) { toast('Stock cannot be negative', 'error'); return; }
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast('Stock updated', 'success');
      setEditing(false);
      router.refresh();
    } catch (e: any) {
      toast(e.message, 'error');
      setValue(stock);
    } finally {
      setBusy(false);
    }
  }

  if (editing) {
    return (
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value) || 0)}
          min={0}
          autoFocus
          onKeyDown={(e) => { if (e.key === 'Enter') save(); if (e.key === 'Escape') { setValue(stock); setEditing(false); } }}
          style={{ width: 60, padding: '4px 8px', border: '1px solid var(--gold)', borderRadius: 'var(--radius)', fontSize: 13 }}
        />
        <button onClick={save} disabled={busy} style={{ background: 'var(--jade)', color: '#fff', border: 'none', padding: '4px 8px', fontSize: 11, borderRadius: 'var(--radius)', cursor: 'pointer' }}>
          {busy ? '...' : '✓'}
        </button>
        <button onClick={() => { setValue(stock); setEditing(false); }} style={{ background: 'transparent', border: 'none', padding: '4px 8px', fontSize: 14, cursor: 'pointer', color: 'var(--text-muted)' }}>×</button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      style={{
        background: 'transparent',
        border: '1px dashed transparent',
        padding: '4px 10px',
        fontSize: 14,
        fontWeight: 600,
        color: stock === 0 ? 'var(--burgundy)' : stock <= 3 ? '#8B5E0F' : 'var(--text)',
        cursor: 'pointer',
        borderRadius: 'var(--radius)',
        fontFamily: "'Cormorant Garamond', serif",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--cream-dark)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; }}
      title="Click to edit stock"
    >
      {stock}
    </button>
  );
}
