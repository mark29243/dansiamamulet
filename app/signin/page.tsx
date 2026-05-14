'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useLang } from '@/components/LangProvider';
import { useToast } from '@/components/ToastProvider';
import { getDict } from '@/lib/i18n';

export default function SignInPage() {
  const { lang } = useLang();
  const { toast } = useToast();
  const t = getDict(lang);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast(t.common.invalidEmail, 'error');
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `https://dansiamamulet.vercel.app/auth/callback`
 },
    });
    setLoading(false);
    if (error) {
      toast(error.message, 'error');
    } else {
      setSent(true);
    }
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '40px 24px 80px', maxWidth: 440 }}>
      {/* Breadcrumb */}
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
          {sent
            ? lang === 'th' ? 'ตรวจสอบอีเมลของคุณ' : lang === 'zh' ? '请查收邮件' : 'Check your email'
            : t.nav.signin}
        </h1>

        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
          {sent
            ? (lang === 'th' ? `เราส่งลิงก์เข้าสู่ระบบไปที่ ${email} แล้ว` : lang === 'zh' ? `登录链接已发送至 ${email}` : `Magic link sent to ${email}`)
            : (lang === 'th' ? 'ใส่อีเมล เราจะส่งลิงก์เข้าสู่ระบบให้ — ไม่ต้องตั้งรหัสผ่าน' : lang === 'zh' ? '输入邮箱，我们会发送登录链接 — 无需密码' : "Enter your email and we'll send you a sign-in link — no password needed")}
        </p>

        {sent ? (
          <>
            <div style={{ background: 'rgba(45,90,61,0.08)', border: '1px solid rgba(45,90,61,0.2)', padding: 16, borderRadius: 'var(--radius-lg)', marginBottom: 20, textAlign: 'left' }}>
              <div className="serif" style={{ fontSize: 11, color: 'var(--jade)', letterSpacing: 2, marginBottom: 8, fontWeight: 600, textTransform: 'uppercase' }}>
                ✓ {lang === 'th' ? 'ส่งแล้ว' : lang === 'zh' ? '已发送' : 'Sent'}
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {lang === 'th'
                  ? 'คลิกลิงก์ในอีเมลเพื่อเข้าสู่ระบบ ลิงก์มีอายุ 1 ชั่วโมง หากไม่พบในกล่องจดหมาย ลองดูในโฟลเดอร์สแปม'
                  : lang === 'zh'
                  ? '点击邮件中的链接登录。链接有效期1小时。如未收到，请查看垃圾邮件。'
                  : "Click the link in your email to sign in. The link expires in 1 hour. Don't see it? Check your spam folder."}
              </p>
            </div>
            <button onClick={() => { setSent(false); setEmail(''); }} className="btn-text">
              {lang === 'th' ? 'ใช้อีเมลอื่น' : lang === 'zh' ? '使用其他邮箱' : 'Use a different email'}
            </button>
          </>
        ) : (
          <form onSubmit={send} style={{ textAlign: 'left' }}>
            <label className="label">
              {t.checkout.email}<span className="required">*</span>
            </label>
            <input
              className="input"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.checkout.placeholder.email}
              autoComplete="email"
              autoFocus
            />
            <button type="submit" disabled={loading} className="btn-gold" style={{ width: '100%', marginTop: 16 }}>
              {loading ? (
                <><span className="spinner" /> {t.common.loading}</>
              ) : (
                <>✉ {lang === 'th' ? 'ส่งลิงก์เข้าสู่ระบบ' : lang === 'zh' ? '发送登录链接' : 'Send magic link'}</>
              )}
            </button>
          </form>
        )}

        <p style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 24, lineHeight: 1.6 }}>
          {lang === 'th' ? 'ไม่ต้องสมัครก็ซื้อได้' : lang === 'zh' ? '无需注册即可购物' : 'You can also shop without an account'}<br />
          <Link href="/shop" style={{ color: 'var(--gold-dark)' }}>
            → {t.cart.browseShop}
          </Link>
        </p>
      </div>
    </div>
  );
}
