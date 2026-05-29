'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { getDict } from '@/lib/i18n';

function LineLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#06C755"/>
      <path d="M39.5 22.3C39.5 15.1 32.5 9.3 24 9.3C15.5 9.3 8.5 15.1 8.5 22.3C8.5 28.7 14 34.1 21.5 35.1C22 35.2 22.7 35.5 22.9 35.9C23.1 36.3 23 36.9 22.9 37.3L22.6 38.9C22.5 39.3 22.2 40.4 24 39.6C25.8 38.8 33.6 33.9 37.1 29.9C39.5 27.4 39.5 25 39.5 22.3Z" fill="white"/>
      <path d="M20.5 19.5H19.2V25H20.5V19.5Z" fill="#06C755"/>
      <path d="M28.8 19.5H27.5V22.8L25 19.5H23.7V25H25V21.6L27.6 25H28.8V19.5Z" fill="#06C755"/>
      <path d="M18.2 23.7H15.5V19.5H14.2V25H18.2V23.7Z" fill="#06C755"/>
      <path d="M33.8 20.8V19.5H29.8V25H33.8V23.7H31.1V22.9H33.8V21.6H31.1V20.8H33.8Z" fill="#06C755"/>
    </svg>
  );
}

function FacebookLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#1877F2"/>
      <path d="M33 24H27.5V38H21.5V24H17V18.5H21.5V15C21.5 11.1 23.9 9 27.4 9C29.1 9 30.9 9.3 30.9 9.3V13.5H28.9C26.9 13.5 26.5 14.6 26.5 15.9V18.5H30.7L30 24H26.5V38H27.5V24H33Z" fill="white"/>
    </svg>
  );
}

function WeChatLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#2DC100"/>
      <ellipse cx="17.5" cy="21" rx="9.5" ry="8" fill="white"/>
      <ellipse cx="30.5" cy="24" rx="9.5" ry="8" fill="white" fillOpacity="0.85"/>
      <circle cx="14" cy="21" r="1.5" fill="#2DC100"/>
      <circle cx="21" cy="21" r="1.5" fill="#2DC100"/>
      <circle cx="27" cy="24" r="1.5" fill="#2DC100"/>
      <circle cx="34" cy="24" r="1.5" fill="#2DC100"/>
    </svg>
  );
}

function EmailLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#c0392b"/>
      <rect x="8" y="14" width="32" height="22" rx="3" fill="white"/>
      <path d="M8 17L24 27L40 17" stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

function PhoneLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="10" fill="#555"/>
      <path d="M16 10h16a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z" fill="white"/>
      <circle cx="24" cy="34" r="2" fill="#555"/>
      <rect x="19" y="11" width="10" height="2" rx="1" fill="#aaa"/>
    </svg>
  );
}

const contactLinks = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    <a href="https://lin.ee/reGR6nC" target="_blank" rel="noopener noreferrer"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>
      <LineLogo /> LINE: jarunpim
    </a>
    <a href="https://www.facebook.com/Jackyamulet999" target="_blank" rel="noopener noreferrer"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>
      <FacebookLogo /> Facebook: Jackyamulet999
    </a>
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text)', fontWeight: 500 }}>
      <WeChatLogo /> WeChat: jajackythai
    </span>
    <a href="mailto:dansiamamulets2@gmail.com"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>
      <EmailLogo /> dansiamamulets2@gmail.com
    </a>
    <a href="tel:+66898157535"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>
      <PhoneLogo /> +66 89 815 7535
    </a>
  </div>
);

type FAQItem = { q: string; a: string | React.ReactNode };

const FAQ: Record<'th' | 'en' | 'zh', FAQItem[]> = {
  th: [
    { q: 'พระเครื่องของเราแท้จริงหรือไม่?', a: 'ใช่ครับ ทุกองค์เรารับประกันความแท้และผ่านการตรวจสอบจากผู้เชี่ยวชาญที่มีประสบการณ์มากกว่า 20 ปี' },
    { q: 'ใช้เวลาในการจัดส่งนานเท่าไหร่?', a: 'ภายในประเทศไทย 2-3 วัน, เอเชีย 5-7 วัน, ทั่วโลก 7-14 วัน พร้อมระบบติดตามพัสดุ' },
    { q: 'รับชำระเงินผ่านช่องทางใดบ้าง?', a: 'บัตรเครดิต/เดบิต Visa/Mastercard, PromptPay, Alipay, WeChat Pay ผ่านระบบ Stripe ที่ปลอดภัย' },
    { q: 'มีการประกันความเสียหายระหว่างการจัดส่งหรือไม่?', a: 'มีครับ ทุกชิ้นมีประกันการจัดส่ง หากเกิดความเสียหายเราจะเปลี่ยนสินค้าให้ทันที' },
    { q: 'ติดต่อสอบถามได้ที่ไหน?', a: contactLinks },
  ],
  en: [
    { q: 'Are your amulets authentic?', a: 'Yes — every piece comes with a certificate of authenticity and is verified by experts with over 20 years of experience.' },
    { q: 'How long does shipping take?', a: 'Within Thailand: 2-3 days. Asia: 5-7 days. Worldwide: 7-14 days. Full tracking included.' },
    { q: 'What payment methods do you accept?', a: 'Visa/Mastercard credit & debit cards, PromptPay (Thailand), Alipay & WeChat Pay (China) — all processed securely via Stripe.' },
    { q: 'Is shipping insured?', a: 'Yes, every shipment is insured. If damage occurs in transit, we will replace your order immediately.' },
    { q: 'Can I send an amulet as a gift?', a: 'Absolutely. Every amulet ships in a beautiful wooden box. Gift wrapping and personalized cards are available on request.' },
    { q: 'How do I venerate this amulet?', a: 'Each amulet ships with a TH/EN/ZH veneration guide including the appropriate mantra and basic ceremony.' },
    { q: 'How can I contact you?', a: contactLinks },
  ],
  zh: [
    { q: '你们的佛牌是正品吗？', a: '是的——每件均附有真品证书，并由拥有20年以上经验的专家鉴定。' },
    { q: '物流需要多长时间？', a: '泰国境内：2-3天。亚洲：5-7天。全球：7-14天。提供全程物流追踪。' },
    { q: '支持哪些付款方式？', a: 'Visa/Mastercard信用卡及借记卡、PromptPay（泰国）、支付宝及微信支付（中国）—— 全部通过Stripe安全处理。' },
    { q: '运输有保险吗？', a: '是的，每批货物都有保险。如运输过程中发生损坏，我们将立即更换您的订单。' },
    { q: '可以作为礼物寄送吗？', a: '当然可以。每件佛牌都装在精美的木盒中。可根据要求提供礼品包装和个性化卡片。' },
    { q: '如何供奉此佛牌？', a: '每件佛牌均附泰/英/中三语供奉指南，包括适当的咒语和基本仪式。' },
    { q: '如何联系我们？', a: contactLinks },
  ],
};

export default function FAQContent() {
  const { lang } = useLang();
  const t = getDict(lang);
  const [open, setOpen] = useState<number | null>(0);
  const list = FAQ[lang];

  return (
    <div className="container" style={{ padding: '32px 24px 80px', maxWidth: 760 }}>
      <nav className="breadcrumb" style={{ marginBottom: 20 }}>
        <Link href="/">{t.nav.home}</Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{ color: 'var(--text)' }}>FAQ</span>
      </nav>

      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div className="serif" style={{ fontSize: 11, letterSpacing: 5, color: 'var(--gold-dark)', marginBottom: 10 }}>
          ✦ FAQ ✦
        </div>
        <h1 className={lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif'} style={{ fontSize: 28, fontWeight: lang === 'en' ? 300 : 600, color: 'var(--text)', fontStyle: lang === 'en' ? 'italic' : 'normal' }}>
          {lang === 'th' ? 'คำถามที่พบบ่อย' : lang === 'zh' ? '常见问题' : 'Frequently Asked Questions'}
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.map((item, i) => {
          const isOpen = open === i;
          return (
            <article key={i} className="card" style={{ overflow: 'hidden' }}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--text)',
                  gap: 16,
                }}
              >
                <span>{item.q}</span>
                <span style={{
                  fontSize: 22,
                  color: 'var(--gold-dark)',
                  transition: 'transform 0.2s',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                  flexShrink: 0,
                }}>＋</span>
              </button>
              <div style={{
                maxHeight: isOpen ? 500 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}>
                <div style={{ padding: '0 24px 20px', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  {item.a}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--cream-dark)' }}>
        <h3 className="serif" style={{ fontSize: 18, color: 'var(--text)', marginBottom: 12 }}>
          {lang === 'th' ? 'มีคำถามอื่นๆ?' : lang === 'zh' ? '还有其他问题？' : 'Have more questions?'}
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
          {lang === 'th' ? 'ติดต่อทีมงานของเรา ตอบทุกข้อสงสัยในภาษาของคุณ' : lang === 'zh' ? '联系我们的团队，用您的语言回答所有问题' : 'Our team is happy to answer in your language'}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:dansiamamulets2@gmail.com" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <EmailLogo /> Email
          </a>
          <a href="https://lin.ee/reGR6nC" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <LineLogo /> LINE
          </a>
          <a href="https://www.facebook.com/Jackyamulet999" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <FacebookLogo /> Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
