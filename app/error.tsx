'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { IcoWarning } from '@/components/icons';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div style={{ padding: '80px 24px', maxWidth: 540, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24, color: 'var(--burgundy)' }}>
        <IcoWarning size={56} />
      </div>
      <h1 className="serif" style={{ fontSize: 26, fontWeight: 600, marginBottom: 12, color: 'var(--text)' }}>
        Something went wrong
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 24 }}>
        We're sorry — an unexpected error occurred. Please try again.
      </p>
      {error.digest && (
        <p style={{ fontSize: 11, color: 'var(--text-faint)', fontFamily: 'monospace', marginBottom: 20 }}>
          Error ID: {error.digest}
        </p>
      )}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={reset} className="btn-gold">Try again</button>
        <Link href="/" className="btn-outline">Go home</Link>
      </div>
    </div>
  );
}
