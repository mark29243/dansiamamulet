'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { getDict } from '@/lib/i18n';
import { IcoMail, IcoChat } from '@/components/icons';

const FAQ = {
  th: [
    { q: 'พระเครื่องของเราแท้จริงหรือไม่?', a: 'ใช่ครับ ทุกองค์เรารับประกันความแท้และผ่านการตรวจสอบจากผู้เชี่ยวชาญที่มีประสบการณ์มากกว่า 20 ปี' },
    { q: 'ใช้เวลาในการจัดส่งนานเท่าไหร่?', a: 'ภายในประเทศไทย 2-3 วัน, เอเชีย 5-7 วัน, ทั่วโลก 7-14 วัน พร้อมระบบติดตามพัสดุ' },
    { q: 'รับชำระเงินผ่านช่องทางใดบ้าง?', a: 'บัตรเครดิต/เดบิต Visa/Mastercard, PromptPay, Alipay, WeChat Pay ผ่านระบบ Stripe ที่ปลอดภัย' },
    { q: 'หากพระเครื่องไม่ถูกใจ สามารถคืนได้ไหม?', a: 'รับคืนภายใน 7 วันหลังรับสินค้า โดยพระเครื่องต้องอยู่ในสภาพเดิม' },
    { q: 'มีการประกันความเสียหายระหว่างการจัดส่งหรือไม่?', a: 'มีครับ ทุกชิ้นมีประกันการจัดส่ง หากเกิดความเสียหายเราจะเปลี่ยนสินค้าให้ทันที' },
    { q: 'ติดต่อสอบถามได้ที่ไหน?', a: ' WeChat: jajackthai, อีเมล: dansiamamulets2@gmail.com หรือโทร +66 89 815 7535' },
  ],
  en: [
    { q: 'Are your amulets authentic?', a: 'Yes — every piece comes with a certificate of authenticity and is verified by experts with over 20 years of experience.' },
    { q: 'How long does shipping take?', a: 'Within Thailand: 2-3 days. Asia: 5-7 days. Worldwide: 7-14 days. Full tracking included.' },
    { q: 'What payment methods do you accept?', a: 'Visa/Mastercard credit & debit cards, PromptPay (Thailand), Alipay & WeChat Pay (China) — all processed securely via Stripe.' },
    { q: "Can I return an amulet I don't like?", a: 'Yes, within 7 days of delivery. The amulet must be in original condition with certificate and packaging intact.' },
    { q: 'Is shipping insured?', a: 'Yes, every shipment is insured. If damage occurs in transit, we will replace your order immediately.' },
    { q: 'Can I send an amulet as a gift?', a: 'Absolutely. Every amulet ships in a beautiful wooden box. Gift wrapping and personalized cards are available on request.' },
    { q: 'How do I venerate this amulet?', a: 'Each amulet ships with a TH/EN/ZH veneration guide including the appropriate mantra and basic ceremony.' },
    { q: 'How can I contact you?', a: 'LINE: jarunpim, WeChat: jajackthai, email: dansiamamulets2@gmail.com, or phone: +66 89 815 7535' },
  ],
  zh: [
    { q: '你们的佛牌是正品吗？', a: '是的——每件均附有真品证书，并由拥有20年以上经验的专家鉴定。' },
    { q: '物流需要多长时间？', a: '泰国境内：2-3天。亚洲：5-7天。全球：7-14天。提供全程物流追踪。' },
    { q: '支持哪些付款方式？', a: 'Visa/Mastercard信用卡及借记卡、PromptPay（泰国）、支付宝及微信支付（中国）—— 全部通过Stripe安全处理。' },
    { q: '如果不喜欢可以退货吗？', a: '可以，收货后7天内。佛牌必须保持原状，证书和包装完整。' },
    { q: '运输有保险吗？', a: '是的，每批货物都有保险。如运输过程中发生损坏，我们将立即更换您的订单。' },
    { q: '可以作为礼物寄送吗？', a: '当然可以。每件佛牌都装在精美的木盒中。可根据要求提供礼品包装和个性化卡片。' },
    { q: '如何供奉此佛牌？', a: '每件佛牌均附泰/英/中三语供奉指南，包括适当的咒语和基本仪式。' },
    { q: '如何联系你们？', a: 'LINE: jarunpim, 微信: dansiam, 邮箱: dansiamamulets2@gmail.com, 或电话: +66 89 815 7535' },
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
                <p style={{ padding: '0 24px 20px', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  {item.a}
                </p>
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
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:dansiamamulets2@gmail.com" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <IcoMail size={14} /> Email Us
          </a>
          <a href="https://line.me/R/ti/p/jarunpim" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <IcoChat size={14} /> LINE
          </a>
        </div>
      </div>
    </div>
  );
}
