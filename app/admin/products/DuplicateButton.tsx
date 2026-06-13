'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DuplicateButton({ productId }: { productId: number }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function handleDuplicate() {
    if (!confirm('คัดลอกสินค้านี้?')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}/duplicate`, { method: 'POST' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      router.push(`/admin/products/${json.id}`);
    } catch (e: any) {
      alert(e.message);
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleDuplicate}
      disabled={busy}
      className="btn-text"
      title="คัดลอกสินค้า"
      style={{ padding: 0, fontSize: 11, opacity: busy ? 0.5 : 1, whiteSpace: 'nowrap' }}
    >
      {busy ? '...' : 'คัดลอก'}
    </button>
  );
}
