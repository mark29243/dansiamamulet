'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLang } from './LangProvider';
import { useToast } from './ToastProvider';
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
    <footer style={{ background: 'var(--deep)', color: '#4A3820', paddingTop: 48 }}>
      {/* Newsletter */}
      <div style={{ background: 'var(--deep-light)', padding: '28px 24px', borderBottom: '1px solid #2A1E08' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontSize: 16, fontFamily: "'Sarabun', sans-serif", fontWeight: 600, color: 'var(--gold-light)', marginBottom: 4 }}>
              {lang === 'th' ? 'รับข่าวสารพระเครื่องใหม่' : lang === 'zh' ? '订阅最新佛牌资讯' : 'Newsletter — New Arrivals & Offers'}
            </h3>
            <p style={{ fontSize: 12, color: '#6B5730' }}>
              {lang === 'th' ? 'เป็นคนแรกที่ได้รับข่าวสารและส่วนลดพิเศษ' : lang === 'zh' ? '率先获取新品资讯及独家优惠' : 'Be first to know about new amulets and special offers'}
            </p>
          </div>
          <form onSubmit={handleNewsletter} style={{ display: 'flex', gap: 8, flex: '1 1 260px', maxWidth: 380 }}>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === 'th' ? 'อีเมลของคุณ' : lang === 'zh' ? '您的邮箱' : 'your@email.com'}
              required disabled={subscribed}
              style={{
                flex: 1, padding: '10px 12px',
                background: 'rgba(247,240,227,0.05)', border: '1px solid #3A2A10',
                color: 'var(--gold-light)', fontSize: 13,
                fontFamily: "'Sarabun', sans-serif", outline: 'none',
                borderRadius: 'var(--radius)',
              }}
            />
            <button type="submit" disabled={subscribed} className="btn-gold" style={{ padding: '10px 18px', fontSize: 12, whiteSpace: 'nowrap' }}>
              {subscribed ? '✓' : lang === 'th' ? 'สมัคร' : lang === 'zh' ? '订阅' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 36, marginBottom: 28 }} className="footer-grid">

          {/* Brand */}
          <div>
            <div className={lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif'} style={{ fontSize: 20, color: 'var(--gold)', marginBottom: 10, fontStyle: lang === 'en' ? 'italic' : 'normal', fontWeight: 600 }}>
              {lang === 'th' ? 'พระเครื่อง แดนสยาม' : lang === 'zh' ? '丹暹罗佛牌' : 'Dan Siam Amulets'}
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.8, color: '#A08868', marginBottom: 16 }}>
              {lang === 'th'
                ? 'จำหน่ายพระเครื่องแท้ คัดสรรจากเกจิชั้นนำทั่วประเทศไทย พร้อมรับรองความแท้ทุกองค์ บริการ 3 ภาษา'
                : lang === 'zh'
                ? '精选自泰国各大著名寺庙的高品质正品佛牌，每件均附真品证书，提供三语客户服务。'
                : 'Authentic Thai amulets of the finest quality, sourced from leading temples nationwide with a certificate of authenticity. Trilingual customer service.'}
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <SocialIcon label="Facebook" href="https://www.facebook.com/Jackyamulet999" bg="#1877F2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
              </SocialIcon>
              <SocialIcon label="LINE" href="https://lin.ee/reGR6nC" bg="#06C755">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
              </SocialIcon>
              <SocialIcon label="WeChat" href="weixin://dl/chat?jajackythai" bg="#7BB32E">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c-.2-.542-.308-1.12-.308-1.72 0-3.619 3.425-6.55 7.65-6.55.306 0 .605.017.9.05C15.913 4.388 12.608 2.188 8.69 2.188zm-2.041 3.26c.55 0 .998.45.998 1.003a1 1 0 0 1-.998 1.003A1 1 0 0 1 5.652 6.45c0-.553.447-1.002.998-1.002zm4.082 0c.55 0 .998.45.998 1.003a1 1 0 0 1-.998 1.003 1 1 0 0 1-.997-1.003c0-.553.446-1.002.997-1.002zm4.988 3.67c-3.554 0-6.435 2.528-6.435 5.647 0 3.12 2.881 5.648 6.435 5.648a7.84 7.84 0 0 0 2.397-.373.707.707 0 0 1 .6.082l1.603.937a.271.271 0 0 0 .14.046c.135 0 .244-.11.244-.248 0-.06-.024-.12-.04-.18l-.328-1.248a.498.498 0 0 1 .179-.559C21.76 17.985 24 16.27 24 14.765c0-3.119-2.881-5.647-6.28-5.647zm-2.834 2.69a.84.84 0 0 1 .84.843.84.84 0 0 1-.84.842.84.84 0 0 1-.841-.842.84.84 0 0 1 .84-.843zm4.064 0a.84.84 0 0 1 .84.843.84.84 0 0 1-.84.842.84.84 0 0 1-.841-.842.84.84 0 0 1 .84-.843z"/></svg>
              </SocialIcon>
            </div>
          </div>

          <FooterCol title={lang === 'th' ? 'สินค้า' : lang === 'zh' ? '商品' : 'Shop'}>
            <li><Link href="/shop">{t.shop.all}</Link></li>
            <li><Link href="/shop">{t.shop.instock}</Link></li>
            <li><Link href="/shop">{t.shop.category}</Link></li>
            <li><Link href="/blog">{lang === 'th' ? 'ความรู้พระเครื่อง' : lang === 'zh' ? '佛牌知识' : 'Blog'}</Link></li>
          </FooterCol>

          <FooterCol title={lang === 'th' ? 'บริการ' : lang === 'zh' ? '服务' : 'Service'}>
            <li><Link href="/about">{lang === 'th' ? 'เกี่ยวกับเรา' : lang === 'zh' ? '关于我们' : 'About Us'}</Link></li>
            <li><Link href="/faq">{lang === 'th' ? 'คำถามที่พบบ่อย' : lang === 'zh' ? '常见问题' : 'FAQ'}</Link></li>
            <li><Link href="/shipping">{lang === 'th' ? 'การจัดส่ง' : lang === 'zh' ? '配送信息' : 'Shipping'}</Link></li>
            <li><Link href="/payment">{lang === 'th' ? 'วิธีชำระเงิน' : lang === 'zh' ? '支付方式' : 'Payment'}</Link></li>
            <li><Link href="/returns">{lang === 'th' ? 'คืนสินค้า' : lang === 'zh' ? '退货' : 'Returns'}</Link></li>
            <li><Link href="/track">{lang === 'th' ? 'ติดตามพัสดุ' : lang === 'zh' ? '追踪订单' : 'Track Order'}</Link></li>
          </FooterCol>

          <FooterCol title="Contact">
            <li>
              <ContactItem icon={<IcoPhone />} text="+66 89 815 7535" href="tel:+66898157535" />
            </li>
            <li>
              <ContactItem icon={<IcoMail />} text="dansiamamulets2@gmail.com" href="mailto:dansiamamulets2@gmail.com" />
            </li>
            <li>
              <ContactItem icon={<IcoChat />} text="LINE: lin.ee/reGR6nC" href="https://lin.ee/reGR6nC" />
            </li>
            <li>
              <ContactItem icon={<IcoChat />} text="WeChat: jajackythai" href="weixin://dl/chat?jajackythai" />
            </li>
            <li style={{ marginTop: 8, color: '#6B5730', fontSize: 11, paddingLeft: 24 }}>
              {lang === 'th' ? 'จ-ศ 9:00–18:00' : lang === 'zh' ? '周一至周五 9–18点' : 'Mon–Fri 9AM–6PM ICT'}
            </li>
          </FooterCol>
        </div>

        <div style={{ borderTop: '1px solid #1E1508', paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6A5535', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <span>© 2026 Dan Siam Amulets · All rights reserved</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6A5535' }}>
              <IcoGlobe /> Made in Thailand
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6A5535' }}>
              <IcoShipping /> Worldwide Shipping
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6A5535' }}>
              <IcoLock /> Secure Payments
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 20px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-copy-right { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: "'Sarabun', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--gold-light)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>
        {title}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </ul>
      <style>{`
        ul li, ul li a { font-size: 12px; font-family: Sarabun, sans-serif; color: #8A7050; transition: color 0.2s; }
        ul li:hover, ul li a:hover { color: var(--gold); }
      `}</style>
    </div>
  );
}

function ContactItem({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const content = (
    <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8A7050', fontSize: 12, fontFamily: "'Sarabun', sans-serif" }}>
      <span style={{ color: 'var(--gold)', flexShrink: 0 }}>{icon}</span>
      {text}
    </span>
  );
  if (href) return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{content}</a>;
  return content;
}

function SocialIcon({ children, href, label, bg }: { children: React.ReactNode; href: string; label: string; bg: string }) {
  return (
    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
      style={{ width: 34, height: 34, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'transform 0.2s, opacity 0.2s', textDecoration: 'none', opacity: 0.9 }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.opacity = '1'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '0.9'; }}
    >
      {children}
    </a>
  );
}

const CI = { width: 14, height: 14, fill: 'none' as const, stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
function IcoPhone() { return <svg {...CI} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>; }
function IcoMail() { return <svg {...CI} viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>; }
function IcoChat() { return <svg {...CI} viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>; }
function IcoGlobe() { return <svg {...CI} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>; }
function IcoShipping() { return <svg {...CI} viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>; }
function IcoLock() { return <svg {...CI} viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>; }
