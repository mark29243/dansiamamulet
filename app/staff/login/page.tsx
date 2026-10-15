'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function StaffLoginPage() {
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [targetDestination, setTargetDestination] = useState('/staff/stock');
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextParam = params.get('next');
    if (nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//')) {
      setTargetDestination(nextParam);
    }
    const err = params.get('error');
    if (err) {
      setError(decodeURIComponent(err));
    }

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email && !err) {
        const dest = nextParam && nextParam.startsWith('/') ? nextParam : '/staff/stock';
        router.push(dest);
      }
    });
  }, [router]);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    const dest = targetDestination || '/staff/stock';
    const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(dest)}`;

    try {
      const supabase = createClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl
        }
      });
      if (oauthError) throw oauthError;
    } catch (err: any) {
      // Fallback direct URL redirect in case client SDK is slow or fails
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vipqvizivfzkjdqeuyhu.supabase.co';
      window.location.href = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(callbackUrl)}`;
    }
  };

  const isJuneTarget = targetDestination.includes('june');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F7F4', padding: '16px' }}>
      <div style={{ background: 'white', padding: '40px 32px', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', maxWidth: 420, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 14 }}>🔒</div>
          <h1 style={{ fontSize: 22, fontWeight: 'bold', color: '#111', margin: 0 }}>
            {isJuneTarget ? '📦 ระบบสต็อก June' : '📦 ระบบสต็อก DanSiam'}
          </h1>
          <p style={{ color: '#666', marginTop: 8, fontSize: 13, lineHeight: 1.5 }}>
            เฉพาะทีมงาน DanSiam Amulets<br />
            (ยืนยันตัวตนด้วยบัญชี Google ที่ได้รับสิทธิ์)
          </p>
        </div>

        {/* Tab switcher: Mark vs June */}
        <div style={{ display: 'flex', gap: 6, background: '#F5F5F4', padding: 4, borderRadius: 10, marginBottom: 24 }}>
          <button
            type="button"
            onClick={() => setTargetDestination('/staff/stock')}
            style={{
              flex: 1,
              padding: '8px 10px',
              fontSize: 13,
              fontWeight: 600,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              background: !isJuneTarget ? '#FFFFFF' : 'transparent',
              color: !isJuneTarget ? '#92400E' : '#78716C',
              boxShadow: !isJuneTarget ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s'
            }}
          >
            📦 สต็อก Mark
          </button>
          <button
            type="button"
            onClick={() => setTargetDestination('/staff/june-stock')}
            style={{
              flex: 1,
              padding: '8px 10px',
              fontSize: 13,
              fontWeight: 600,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              background: isJuneTarget ? '#FFFFFF' : 'transparent',
              color: isJuneTarget ? '#92400E' : '#78716C',
              boxShadow: isJuneTarget ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s'
            }}
          >
            🏷️ สต็อก June
          </button>
        </div>

        {/* Google 1-Click Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: '14px 16px',
            border: '1px solid #D5D1C8',
            borderRadius: 10,
            background: '#ffffff',
            color: '#1A1208',
            fontSize: 15,
            fontWeight: 600,
            cursor: googleLoading ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s, border-color 0.15s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          {googleLoading ? 'กำลังเปิดหน้าล็อกอิน Google...' : 'เข้าสู่ระบบด้วย Google'}
        </button>

        {error && (
          <div style={{ marginTop: 16, color: '#dc2626', fontSize: 13, textAlign: 'center', background: '#fef2f2', padding: '10px 12px', borderRadius: 8, border: '1px solid #fecaca' }}>
            {error}
          </div>
        )}

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 12, color: '#9CA3AF' }}>
          DanSiam Amulets Team Portal
        </div>
      </div>
    </div>
  );
}
