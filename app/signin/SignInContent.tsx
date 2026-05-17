'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/components/LangProvider';
import { useToast } from '@/components/ToastProvider';
import { getDict } from '@/lib/i18n';

export default function SignInContent() {
  const { lang } = useLang();
  const { toast } = useToast();
  const t = getDict(lang);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });
    setLoading(false);
    if (error) {
      toast(error.message, 'error');
    } else {
      toast(lang === 'th' ? 'เข้าสู่ระบบสำเร็จ!' : 'Signed in!', 'success');
      router.push('/admin');
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
        <div style={{ width: 56, height: 56, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 26 }}>
          🔐
        </div>
        <h1 className="serif" style={{ fontSize: 24, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
          {t.nav.signin}
        </h1>
        {!sent ? (
          <>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
              {lang === 'th' ? 'ใส่อีเมล เราจะส่งรหัส 6 หลักให้' : lang === 'zh' ? '输入邮箱，我们将发送6位验证码' : "Enter your email — we'll send a 6-digit code"}
            </p>
            <form onSubmit={sendOtp} style={{ textAlign: 'left' }}>
              <label className="label">{t.checkout.email}<span className="required">*</span></label>
              <input
                className="input"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoFocus
              />
              <button type="submit" disabled={loading} className="btn-gold" style={{ width: '100%', marginTop: 16 }}>
                {loading ? <><span className="spinner" /> {lang === 'th' ? 'กำลังส่ง...' : 'Sending...'}</> : (lang === 'th' ? '✉ ส่งรหัส OTP' : lang === 'zh' ? '✉ 发送验证码' : '✉ Send OTP Code')}
              </button>
            </form>
          </>
        ) : (
          <>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.6 }}>
              {lang === 'th' ? `ส่งรหัส 6 หลักไปที่ ${email} แล้วครับ` : `6-digit code sent to ${email}`}
            </p>
            <p style={{ fontSize: 12, color: 'var(--jade)', marginBottom: 24 }}>
              {lang === 'th' ? '📧 เช็ค Gmail แล้วใส่รหัสด้านล่าง' : '📧 Check your email and enter the code below'}
            </p>
            <form onSubmit={verifyOtp} style={{ textAlign: 'left' }}>
              <label className="label">
                {lang === 'th' ? 'รหัส OTP 6 หลัก' : lang === 'zh' ? '6位验证码' : '6-digit OTP Code'}<span className="required">*</span>
              </label>
              <input
                className="input"
                type="text"
                inputMode="numeric"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                autoFocus
                style={{ fontSize: 24, letterSpacing: 8, textAlign: 'center' }}
              />
              <button type="submit" disabled={loading || otp.length < 6} className="btn-gold" style={{ width: '100%', marginTop: 16 }}>
                {loading ? <><span className="spinner" /> {lang === 'th' ? 'กำลังตรวจสอบ...' : 'Verifying...'}</> : (lang === 'th' ? '✓ เข้าสู่ระบบ' : lang === 'zh' ? '✓ 登录' : '✓ Sign In')}
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
