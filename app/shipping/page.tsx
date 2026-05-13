'use client';

import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { getDict } from '@/lib/i18n';

const ZONES = [
  { flag: '🇹🇭', label: { th: 'ภายในประเทศไทย', en: 'Within Thailand', zh: '泰国境内' }, time: { th: '2–3 วันทำการ', en: '2–3 business days', zh: '2–3个工作日' }, cost: '฿50' },
  { flag: '🌏', label: { th: 'เอเชีย', en: 'Asia', zh: '亚洲' }, time: { th: '5–7 วันทำการ', en: '5–7 business days', zh: '5–7个工作日' }, cost: '฿250' },
  { flag: '🌍', label: { th: 'ทั่วโลก', en: 'Rest of World', zh: '世界其他地区' }, time: { th: '7–14 วันทำการ', en: '7–14 business days', zh: '7–14个工作日' }, cost: '฿500' },
];

export default function ShippingPage() {
  const { lang } = useLang();
  const t = getDict(lang);

  return (
    <div className="container" style={{ padding: '32px 24px 80px', maxWidth: 720 }}>
      <nav className="breadcrumb" style={{ marginBottom: 20 }}>
        <Link href="/">{t.nav.home}</Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{ color: 'var(--text)' }}>
          {lang === 'th' ? 'การจัดส่ง' : lang === 'zh' ? '配送信息' : 'Shipping'}
        </span>
      </nav>

      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div className="serif" style={{ fontSize: 11, letterSpacing: 5, color: 'var(--gold-dark)', marginBottom: 10 }}>
          ✦ {lang === 'th' ? 'การจัดส่ง' : lang === 'zh' ? '配送' : 'SHIPPING'} ✦
        </div>
        <h1 className={lang === 'th' ? 'thai' : lang === 'zh' ? 'zh' : 'serif'} style={{ fontSize: 28, fontWeight: lang === 'en' ? 300 : 600, color: 'var(--text)', fontStyle: lang === 'en' ? 'italic' : 'normal' }}>
          {lang === 'th' ? 'ข้อมูลการจัดส่ง' : lang === 'zh' ? '配送信息' : 'Shipping Information'}
        </h1>
      </div>

      {/* Free shipping callout */}
      <div style={{ background: 'rgba(45,90,61,0.08)', border: '1px solid rgba(45,90,61,0.2)', borderLeft: '3px solid var(--jade)', borderRadius: 'var(--radius-lg)', padding: '16px 20px', marginBottom: 32, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 24 }}>🚚</span>
        <div>
          <div className="serif" style={{ fontWeight: 600, color: 'var(--jade)', fontSize: 15, marginBottom: 4 }}>
            {lang === 'th' ? 'ส่งฟรีเมื่อซื้อครบ ฿5,000' : lang === 'zh' ? '满฿5,000免运费' : 'FREE shipping on orders over ฿5,000'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {lang === 'th' ? 'สำหรับทุกประเทศทั่วโลก' : lang === 'zh' ? '适用于全球所有国家' : 'Applies to all countries worldwide'}
          </div>
        </div>
      </div>

      {/* Zones table */}
      <section style={{ marginBottom: 36 }}>
        <h2 className="serif" style={{ fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 16 }}>
          {lang === 'th' ? 'ค่าจัดส่งและระยะเวลา' : lang === 'zh' ? '运费与时效' : 'Rates & Delivery Times'}
        </h2>
        <div className="card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--cream-dark)' }}>
                {[
                  lang === 'th' ? 'ปลายทาง' : lang === 'zh' ? '目的地' : 'Destination',
                  lang === 'th' ? 'ระยะเวลา' : lang === 'zh' ? '时效' : 'Delivery Time',
                  lang === 'th' ? 'ค่าจัดส่ง' : lang === 'zh' ? '运费' : 'Cost',
                ].map((h) => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: "'Cormorant Garamond',serif", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ZONES.map((z, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--cream-dark)' }}>
                  <td style={{ padding: '14px 20px', fontSize: 14 }}>
                    <span style={{ marginRight: 8 }}>{z.flag}</span>
                    {z.label[lang]}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: 'var(--text-muted)' }}>{z.time[lang]}</td>
                  <td style={{ padding: '14px 20px' }} className="serif">
                    <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--gold-dark)' }}>{z.cost}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 8, padding: '0 4px' }}>
          {lang === 'th'
            ? '* เวลาจัดส่งนับจากวันที่ชำระเงิน ไม่รวมวันหยุด'
            : lang === 'zh'
            ? '* 配送时间从付款之日起计算，不含节假日'
            : '* Delivery times start from payment date and exclude public holidays'}
        </p>
      </section>

      {/* What to expect */}
      <section style={{ marginBottom: 36 }}>
        <h2 className="serif" style={{ fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 16 }}>
          {lang === 'th' ? 'กระบวนการจัดส่ง' : lang === 'zh' ? '配送流程' : 'Shipping Process'}
        </h2>
        <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: '💳', th: 'ชำระเงินผ่าน Stripe (บัตรเครดิต / PromptPay / Alipay)', en: 'Pay via Stripe (card / PromptPay / Alipay)', zh: '通过Stripe付款（信用卡/PromptPay/支付宝）' },
            { icon: '📧', th: 'รับอีเมลยืนยันคำสั่งซื้อทันที', en: 'Order confirmation email sent immediately', zh: '立即收到订单确认邮件' },
            { icon: '📦', th: 'พระเครื่องบรรจุในกล่องพิเศษพร้อมใบรับรองภายใน 1–2 วัน', en: 'Amulet packed in premium box with certificate within 1–2 days', zh: '佛牌在1–2天内装入精装盒并附证书' },
            { icon: '🚚', th: 'จัดส่งพร้อมเลขพัสดุสำหรับติดตาม', en: 'Shipped with tracking number', zh: '发货并提供快递追踪号' },
            { icon: '✅', th: 'ได้รับสินค้า — ขออนุโมทนาบุญ', en: 'Delivered — may merit follow you', zh: '收到货物 — 愿功德随行' },
          ].map((step, i) => (
            <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, background: 'var(--gold)', color: 'var(--deep)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                {step.icon}
              </div>
              <div style={{ paddingTop: 4, fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}>{(step as any)[lang]}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Returns */}
      <section className="card" style={{ padding: 20, marginBottom: 32 }}>
        <h2 className="serif" style={{ fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 12 }}>
          {lang === 'th' ? 'นโยบายคืนสินค้า' : lang === 'zh' ? '退货政策' : 'Returns Policy'}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>
          {lang === 'th'
            ? 'รับคืนสินค้าภายใน 7 วันหลังจากได้รับ โดยพระเครื่องต้องอยู่ในสภาพเดิม ไม่ได้ใช้งาน พร้อมบรรจุภัณฑ์และใบรับรองครบถ้วน ค่าจัดส่งคืนเป็นความรับผิดชอบของผู้ซื้อ'
            : lang === 'zh'
            ? '收货后7天内可退货。佛牌必须保持原状，未使用，包装和证书完整。回寄费用由买家承担。'
            : 'Returns are accepted within 7 days of delivery. The amulet must be in its original, unworn condition with all packaging and the certificate of authenticity. Return shipping costs are the buyer\'s responsibility.'}
        </p>
      </section>

      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
          {lang === 'th' ? 'มีคำถามเรื่องการจัดส่ง?' : lang === 'zh' ? '关于配送有疑问？' : 'Questions about shipping?'}
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/faq" className="btn-outline">FAQ</Link>
          <a href="mailto:info@dansiam.com" className="btn-gold">✉ {lang === 'th' ? 'ติดต่อเรา' : lang === 'zh' ? '联系我们' : 'Contact Us'}</a>
        </div>
      </div>
    </div>
  );
}
