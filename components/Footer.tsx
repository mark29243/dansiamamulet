'use client';

import Link from 'next/link';
import { useLang } from './LangProvider';
import { useToast } from './ToastProvider';
import { useState } from 'react';
import { getDict } from '@/lib/i18n';

export default function Footer() {
  const { lang } = useLang();
  const { toast } = useToast();
  const t = getDict(lang);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast(t.common.invalidEmail, 'error');
      return;
    }
    setSubscribed(true);
    toast(lang === 'th' ? 'สมัครรับข่าวสารแล้ว ✓' : lang === 'zh' ? '订阅成功 ✓' : 'Subscribed ✓', 'success');
    setEmail('');
  }

  return (
    <footer style={{ background: 'var(--deep)', color: '#4A3820', paddingTop: 60 }}>
      {/* Newsletter */}
      <div style={{ background: 'var(--deep-light)', padding: '36px 24px', borderBottom: '1px solid #2A1E08' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <h3 className="serif" style={{ fontSize: 20, color: 'var(--gold-light)', marginBottom: 6, fontStyle: 'italic' }}>
              {lang === 'th' ? 'รับข่าวสารพระเครื่องใหม่' : lang === 'zh' ? '订阅最新佛牌资讯' : 'Newsletter — New Arrivals & Offers'}
            </h3>
            <p style={{ fontSize: 12, color: '#6B5730' }}>
              {lang === 'th'
                ? 'เป็นคนแรกที่ได้รับข่าวสารและส่วนลดพิเศษ'
                : lang === 'zh'
                ? '率先获取新品资讯及独家优惠'
                : 'Be first to know about new amulets and special offers'}
            </p>
          </div>
          <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: 8, flex: '1 1 280px', maxWidth: 400 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === 'th' ? 'อีเมลของคุณ' : lang === 'zh' ? '您的邮箱' : 'your@email.com'}
              required
              disabled={subscribed}
              style={{
                flex: 1,
                padding: '11px 14px',
                background: 'rgba(247, 240, 227, 0.05)',
                border: '1px solid #3A2A10',
                color: 'var(--gold-light)',
                fontSize: 13,
                fontFamily: "'Sarabun', sans-serif",
                outline: 'none',
                borderRadius: 'var(--radius)',
              }}
            />
            <button type="submit" disabled={subscribed} className="btn-gold" style={{ padding: '11px 20px', fontSize: 11 }}>
              {subscribed ? '✓' : lang === 'th' ? 'สมัคร' : lang === 'zh' ? '订阅' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 24px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 36 }} className="footer-grid">
          <div>
            <div className={lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif'} style={{ fontSize: 22, color: 'var(--gold)', marginBottom: 10, fontStyle: lang === 'en' ? 'italic' : 'normal', fontWeight: 600 }}>
              {lang === 'th' ? 'พระเครื่อง แดนสยาม' : lang === 'zh' ? '丹暹罗佛牌' : 'Dan Siam Amulets'}
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.8, color: '#3A2A10', marginBottom: 16 }}>
              {lang === 'th'
                ? 'จำหน่ายพระเครื่องแท้คุณภาพสูง คัดสรรจากวัดชั้นนำทั่วประเทศไทย พร้อมใบรับรองความแท้ทุกองค์ บริการ 3 ภาษา'
                : lang === 'zh'
                ? '精选自泰国各大著名寺庙的高品质正品佛牌，每件均附真品证书，提供三语客户服务。'
                : 'Authentic Thai amulets of the finest quality, sourced from leading temples nationwide with a certificate of authenticity. Trilingual customer service.'}
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <SocialIcon label="Facebook" href="#">f</SocialIcon>
              <SocialIcon label="Instagram" href="#">📷</SocialIcon>
              <SocialIcon label="LINE" href="#">L</SocialIcon>
              <SocialIcon label="WeChat" href="#">💬</SocialIcon>
              <SocialIcon label="YouTube" href="#">▶</SocialIcon>
            </div>
          </div>

          <FooterCol title={t.nav.shop}>
            <li><Link href="/shop">{t.shop.all}</Link></li>
            <li><Link href="/shop">{t.shop.instock}</Link></li>
            <li><Link href="/shop">{t.shop.category}</Link></li>
          </FooterCol>

          <FooterCol title={lang === 'th' ? 'บริการ' : lang === 'zh' ? '服务' : 'Service'}>
            <li><Link href="/about">{lang === 'th' ? 'เกี่ยวกับเรา' : lang === 'zh' ? '关于我们' : 'About Us'}</Link></li>
            <li><Link href="/faq">{lang === 'th' ? 'คำถามที่พบบ่อย' : lang === 'zh' ? '常见问题' : 'FAQ'}</Link></li>
            <li><Link href="/shipping">{lang === 'th' ? 'การจัดส่ง' : lang === 'zh' ? '配送信息' : 'Shipping'}</Link></li>
            <li>{lang === 'th' ? 'คืนสินค้า' : lang === 'zh' ? '退货' : 'Returns'}</li>
          </FooterCol>

          <FooterCol title="CONTACT">
            <li>📞 +66 81 234 5678</li>
            <li>✉ info@dansiam.com</li>
            <li>💬 LINE: @dansiam</li>
            <li>💬 WeChat: dansiam</li>
            <li style={{ marginTop: 10, color: '#3A2A10' }}>
              {lang === 'th' ? 'จ-ศ 9:00-18:00' : lang === 'zh' ? '周一至周五 9-18点' : 'Mon-Fri 9AM-6PM ICT'}
            </li>
          </FooterCol>
        </div>

        <div style={{ borderTop: '1px solid #1E1508', paddingTop: 20, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#2A1A08', letterSpacing: 1, flexWrap: 'wrap', gap: 10 }}>
          <span>© 2025 Dan Siam Amulets · All rights reserved</span>
          <span>🇹🇭 Made in Thailand · 🌏 Worldwide Shipping · 🔒 Secure Payments</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="serif" style={{ fontSize: 10, color: 'var(--gold-light)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14, fontWeight: 600 }}>
        {title}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
        {children}
      </ul>
      <style>{`
        ul li { font-size: 12px; cursor: pointer; transition: color 0.2s; color: #3A2A10; }
        ul li:hover, ul li a:hover { color: var(--gold); }
      `}</style>
    </div>
  );
}

function SocialIcon({ children, href, label }: { children: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      style={{
        width: 32,
        height: 32,
        background: 'rgba(201,168,76,0.08)',
        border: '1px solid #3A2A10',
        color: 'var(--gold)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        borderRadius: '50%',
        transition: 'all 0.2s',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--deep)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(201,168,76,0.08)'; e.currentTarget.style.color = 'var(--gold)'; }}
    >
      {children}
    </a>
  );
}
