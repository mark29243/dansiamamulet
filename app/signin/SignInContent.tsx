'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/components/LangProvider';
import { useToast } from '@/components/ToastProvider';
import { getDict } from '@/lib/i18n';
import { IcoLock, IcoMail, IcoCheck } from '@/components/icons';

export default function SignInContent() {
  const { lang } = useLang();
  const { toast } = useToast();
  const t = getDict(lang);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setLoading(false);
      toast(error.message, 'error');
    }
  }

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) {
      toast(error.message, 'error');
    } else {
      setSent(true);
      toast(lang === 'th' ? 'ส่งรหัสแล้ว เช็ค Gmail ครับ' : 'Code sent! Check your email', 'success');
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!otp || otp.length < 6) return;
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });
    setLoading(false);
    if (error) {
      toast(error.message, 'error');
    } else {
      toast(lang === 'th' ? 'เข้าสู่ระบบสำเร็จ!' : 'Signed in!', 'success');
      const uid = data.user?.id;
      if (uid) {
        const { data: adminRow } = await supabase.from('admins').select('user_id').eq('user_id', uid).maybeSingle();
        window.location.href = adminRow ? '/admin' : '/orders';
      } else {
        window.location.href = '/orders';
      }
    }
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 24px 80px', maxWidth: 440 }}>
      <nav className="breadcrumb" style={{ marginBottom: 20 }}>
        <Link href="/">{t.nav.home}</Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{ color: 'var(--text)' }}>{t.nav.signin}</span>
      </nav>
      <div className="card" style={{ padding: 36, textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--deep)' }}>
          <IcoLock size={24} />
        </div>
        <h1 className="serif" style={{ fontSize: 24, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
          {t.nav.signin}
        </h1>
        {!sent ? (
          <>
            <button
              type="button"
              onClick={signInWithGoogle}
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                padding: '12px 16px',
                background: '#ffffff',
                color: '#3c4043',
                border: '1px solid #dadce0',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                marginTop: 16,
                marginBottom: 20,
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
                e.currentTarget.style.borderColor = '#c6c9cc';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.borderColor = '#dadce0';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              {lang === 'th' ? 'เข้าสู่ระบบด้วย Google' : lang === 'zh' ? '使用 Google 账号登录' : 'Continue with Google'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: 'var(--text-faint)', fontSize: 12 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ padding: '0 12px' }}>
                {lang === 'th' ? 'หรือรับรหัส OTP ทางอีเมล' : lang === 'zh' ? '或接收邮箱验证码' : 'Or with email OTP'}
              </span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>

            <form onSubmit={sendOtp} style={{ textAlign: 'left' }}>
              <label className="label">{t.checkout.email}<span className="required">*</span></label>
              <input
                className="input"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
              <button type="submit" disabled={loading} className="btn-gold" style={{ width: '100%', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                {loading ? <><span className="spinner" /> {lang === 'th' ? 'กำลังส่ง...' : 'Sending...'}</> : (
                  <><IcoMail size={14} /> {lang === 'th' ? 'ส่งรหัส OTP' : lang === 'zh' ? '发送验证码' : 'Send OTP Code'}</>
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.6 }}>
              {lang === 'th' ? `ส่งรหัส 6 หลักไปที่ ${email} แล้วครับ` : `6-digit code sent to ${email}`}
            </p>
            <p style={{ fontSize: 12, color: 'var(--jade)', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <IcoMail size={13} /> {lang === 'th' ? 'เช็ค Gmail แล้วใส่รหัสด้านล่าง' : 'Check your email and enter the code below'}
            </p>
            <form onSubmit={verifyOtp} style={{ textAlign: 'left' }}>
              <label className="label">
                {lang === 'th' ? 'รหัส OTP ยืนยันตัวตน' : lang === 'zh' ? 'OTP 验证码' : 'OTP Code'}<span className="required">*</span>
              </label>
              <input
                className="input"
                type="text"
                inputMode="numeric"
                maxLength={8}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                autoFocus
                style={{ fontSize: 24, letterSpacing: 6, textAlign: 'center' }}
              />
              <button type="submit" disabled={loading || otp.length < 6} className="btn-gold" style={{ width: '100%', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                {loading ? <><span className="spinner" /> {lang === 'th' ? 'กำลังตรวจสอบ...' : 'Verifying...'}</> : (
                  <><IcoCheck size={14} /> {lang === 'th' ? 'เข้าสู่ระบบ' : lang === 'zh' ? '登录' : 'Sign In'}</>
                )}
              </button>
            </form>
            <button onClick={() => { setSent(false); setOtp(''); }} className="btn-text" style={{ marginTop: 12 }}>
              {lang === 'th' ? '← ใช้อีเมลอื่น' : '← Use different email'}
            </button>
          </>
        )}
        <p style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 24, lineHeight: 1.6 }}>
          {lang === 'th' ? 'ไม่ต้องสมัครก็ซื้อได้' : 'You can also shop without an account'}<br />
          <Link href="/shop" style={{ color: 'var(--gold-dark)' }}>→ {t.cart.browseShop}</Link>
        </p>
      </div>
    </div>
  );
}
