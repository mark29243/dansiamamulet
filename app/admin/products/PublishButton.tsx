'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';

export default function PublishButton({ productId }: { productId: number }) {
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function handlePublish() {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast('Published!', 'success');
      setTimeout(() => window.location.reload(), 800);
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handlePublish}
      disabled={busy}
      style={{
        background: 'var(--jade)',
        color: '#fff',
        border: 'none',
        padding: '4px 10px',
        fontSize: 11,
        borderRadius: 'var(--radius)',
        cursor: busy ? 'not-allowed' : 'pointer',
        opacity: busy ? 0.7 : 1,
        letterSpacing: 1,
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 600,
        textTransform: 'uppercase',
      }}
    >
      {busy ? '...' : 'Publish'}
    </button>
  );
}
