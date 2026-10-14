'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function StaffLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  // If already logged in as admin/staff, auto redirect
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        router.push('/staff/stock');
      }
    });
  }, [router]);

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      const supabase = createClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/staff/stock`
        }
      });
      if (oauthError) throw oauthError;
    } catch (err: any) {
      setError(err.message || 'ไม่สามารถเข้าสู่ระบบด้วย Google ได้');
      setGoogleLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/staff/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        router.push('/staff/stock');
      } else {
        setError(data.error || 'รหัสผ่านไม่ถูกต้อง');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F9F7F4' }}>
      <div style={{ background: 'white', padding: 40, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', maxWidth: 400, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h1 style={{ fontSize: 24, fontWeight: 'bold', color: '#111', margin: 0 }}>ระบบจัดการสต็อก</h1>
          <p style={{ color: '#666', marginTop: 8, fontSize: 14 }}>เข้าสู่ระบบสำหรับทีมงาน DanSiam</p>
        </div>

        {/* Google 1-Click Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: '14px 16px',
            border: '1px solid #D5D1C8',
            borderRadius: 8,
            background: '#ffffff',
            color: '#1A1208',
            fontSize: 15,
            fontWeight: 600,
            cursor: (googleLoading || loading) ? 'not-allowed' : 'pointer',
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
          {googleLoading ? 'กำลังเชื่อมต่อ Google...' : 'เข้าสู่ระบบด้วย Google'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: '#999', fontSize: 13 }}>
          <div style={{ flex: 1, height: '1px', background: '#EDEBE8' }} />
          <span style={{ padding: '0 12px' }}>หรือใส่รหัสผ่าน</span>
          <div style={{ flex: 1, height: '1px', background: '#EDEBE8' }} />
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="password"
            placeholder="รหัสผ่าน 6 หลัก"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px 16px', fontSize: 24, letterSpacing: '0.2em', textAlign: 'center', borderRadius: 8, border: '1px solid #ddd', outline: 'none' }}
            autoFocus
          />
          
          {error && (
            <div style={{ color: '#dc2626', fontSize: 14, textAlign: 'center', background: '#fef2f2', padding: 8, borderRadius: 6 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              padding: 16,
              background: loading ? '#ccc' : '#1a1a1a',
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              border: 'none',
              borderRadius: 8,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบด้วยรหัสผ่าน'}
          </button>
        </form>
      </div>
    </div>
  );
}
