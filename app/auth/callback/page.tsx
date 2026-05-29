'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    async function handleCallback() {
      const supabase = createClient();
      const code = searchParams.get('code');

      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
      }

      // Wait for session to be ready
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: adminRow } = await supabase
          .from('admins')
          .select('user_id')
          .eq('user_id', user.id)
          .maybeSingle();
        window.location.href = adminRow ? '/admin' : '/orders';
      } else {
        window.location.href = '/orders';
      }
    }

    handleCallback();
  }, [searchParams]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: 16 }}>
      <span className="spinner" style={{ width: 32, height: 32 }} />
      <p style={{ color: 'var(--text-muted)', fontFamily: "'Cormorant Garamond', serif" }}>
        กำลังเข้าสู่ระบบ...
      </p>
    </div>
  );
}
