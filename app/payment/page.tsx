import type { Metadata } from 'next';
import Link from 'next/link';
import { IcoLock, IcoLightning, IcoGlobe, IcoMobile } from '@/components/icons';

export const metadata: Metadata = {
  title: 'วิธีการชำระเงิน',
  description: 'ช่องทางการชำระเงินที่รองรับ — บัตรเครดิต PromptPay Alipay และอื่นๆ',
};

const methods = [
  {
    id: 'promptpay',
    iconText: 'QR',
    name: 'PromptPay',
    nameTh: 'พร้อมเพย์',
    nameZh: '泰国扫码付',
    desc: 'สแกน QR จ่ายด้วยแอปธนาคารทุกเจ้า ทันใจ ไม่มีค่าธรรมเนียม',
    descZh: '通过泰国银行APP扫码支付，即时到账',
    descEn: 'Scan QR via any Thai banking app. Instant, no fee.',
    color: '#6B21A8',
    bg: 'rgba(107,33,168,0.06)',
    border: 'rgba(107,33,168,0.2)',
    badge: 'แนะนำสำหรับลูกค้าไทย',
    badgeColor: '#6B21A8',
    logos: ['กสิกร', 'SCB', 'กรุงเทพ', 'กรุงไทย', 'ทหารไทย', 'ทุกธนาคาร'],
  },
  {
    id: 'card',
    iconText: '▪▪▪',
    name: 'Credit / Debit Card',
    nameTh: 'บัตรเครดิต / เดบิต',
    nameZh: '信用卡 / 借记卡',
    desc: 'รองรับ Visa, Mastercard และ American Express ทุกธนาคารทั่วโลก',
    descZh: '支持 Visa、Mastercard、American Express',
    descEn: 'Visa, Mastercard and Amex accepted worldwide.',
    color: '#1A56DB',
    bg: 'rgba(26,86,219,0.05)',
    border: 'rgba(26,86,219,0.2)',
    logos: ['VISA', 'Mastercard', 'Amex'],
  },
  {
    id: 'applepay',
    iconText: '',
    name: 'Apple Pay',
    nameTh: 'Apple Pay',
    nameZh: 'Apple Pay',
    desc: 'จ่ายด้วย Face ID หรือ Touch ID บน iPhone / Mac ได้เลย',
    descZh: '在iPhone/Mac上用Face ID或Touch ID支付',
    descEn: 'Pay with Face ID or Touch ID on iPhone or Mac.',
    color: '#1D1D1F',
    bg: 'rgba(29,29,31,0.04)',
    border: 'rgba(29,29,31,0.12)',
    logos: ['iPhone', 'iPad', 'Mac'],
  },
  {
    id: 'googlepay',
    iconText: 'G',
    name: 'Google Pay',
    nameTh: 'Google Pay',
    nameZh: 'Google Pay',
    desc: 'จ่ายได้เลยบนอุปกรณ์ Android หรือ Chrome ไม่ต้องกรอกเลขบัตร',
    descZh: '在Android或Chrome上快速支付',
    descEn: 'Pay on Android or Chrome — no card number needed.',
    color: '#1A73E8',
    bg: 'rgba(26,115,232,0.05)',
    border: 'rgba(26,115,232,0.15)',
    logos: ['Android', 'Chrome'],
  },
  {
    id: 'alipay',
    iconText: '支',
    name: 'Alipay 支付宝',
    nameTh: 'Alipay จ่ายเป็นหยวน (CNY)',
    nameZh: '支付宝付款',
    desc: 'สแกน QR โอนเงินหยวนตรงเข้าบัญชีของร้าน แล้วส่งสลิปในเว็บ',
    descZh: '扫描二维码直接转账，上传截图即可确认订单',
    descEn: 'Scan our Alipay QR, transfer CNY, then upload your slip.',
    color: '#1677FF',
    bg: 'rgba(22,119,255,0.06)',
    border: 'rgba(22,119,255,0.2)',
    badge: 'สำหรับลูกค้าจีน',
    badgeColor: '#1677FF',
    logos: ['CNY', '人民币'],
  },
];

const trustItems = [
  { icon: <IcoLock size={13} />, label: 'ปลอดภัย 100%' },
  { icon: <IcoLightning size={13} />, label: 'ทันที' },
  { icon: <IcoGlobe size={13} />, label: 'ทุกสกุลเงิน' },
  { icon: <IcoMobile size={13} />, label: 'ทุกอุปกรณ์' },
];

export default function PaymentPage() {
  return (
    <div className="container" style={{ padding: '48px 24px 80px', maxWidth: 800 }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" style={{ marginBottom: 24 }}>
        <Link href="/">หน้าแรก</Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{ color: 'var(--text)' }}>วิธีการชำระเงิน</span>
      </nav>

      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 className="serif" style={{ fontSize: 32, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>
          วิธีการชำระเงิน
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 4 }}>Payment Methods · 支付方式</p>
        <p style={{ fontSize: 13, color: 'var(--text-faint)' }}>
          ชำระเงินได้หลายช่องทาง ปลอดภัย 100% ทุกคำสั่งซื้อ
        </p>
      </div>

      {/* Trust bar */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
        {trustItems.map((item) => (
          <span key={item.label} style={{ fontSize: 12, padding: '6px 14px', background: 'var(--cream)', border: '1px solid var(--cream-dark)', borderRadius: 20, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {item.icon} {item.label}
          </span>
        ))}
      </div>

      {/* Payment method cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {methods.map((m) => (
          <div
            key={m.id}
            className="card"
            style={{ padding: '24px 28px', background: m.bg, border: `1px solid ${m.border}`, position: 'relative' }}
          >
            {m.badge && (
              <span style={{
                position: 'absolute', top: 16, right: 16,
                fontSize: 10, padding: '3px 10px', borderRadius: 20,
                background: m.badgeColor, color: '#fff', letterSpacing: 0.5,
              }}>
                {m.badge}
              </span>
            )}

            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: m.color, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 700,
                flexShrink: 0, fontFamily: m.id === 'alipay' ? 'sans-serif' : 'inherit',
              }}>
                {m.iconText || (m.id === 'applepay' ? '' : 'G')}
              </div>

              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                  <h2 className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: 0 }}>
                    {m.nameTh}
                  </h2>
                  <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>{m.nameZh}</span>
                </div>

                <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6, marginBottom: 8 }}>{m.desc}</p>
                <p style={{ fontSize: 12, color: 'var(--text-faint)', marginBottom: 12 }}>{m.descZh}</p>

                {/* Logo chips */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {m.logos.map((l) => (
                    <span key={l} style={{
                      fontSize: 10, padding: '3px 10px',
                      border: `1px solid ${m.border}`, borderRadius: 4,
                      color: m.color, fontWeight: 600, background: '#fff',
                      letterSpacing: 0.5,
                    }}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stripe security note */}
      <div className="card" style={{ marginTop: 28, padding: 20, textAlign: 'center', background: 'rgba(45,90,61,0.04)', border: '1px solid rgba(45,90,61,0.12)' }}>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
          <IcoLock size={13} style={{ flexShrink: 0 }} />
          การชำระเงินด้วยบัตร PromptPay Apple Pay และ Google Pay ดำเนินการผ่าน{' '}
          <strong style={{ color: 'var(--text)' }}>Stripe</strong>{' '}
          — ระบบชำระเงินมาตรฐานระดับโลก ข้อมูลบัตรของคุณถูกเข้ารหัสและปลอดภัย 100%
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 6 }}>
          Payment data is encrypted by Stripe · PCI DSS Level 1 certified · 卡号经Stripe加密保护
        </p>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 36 }}>
        <Link href="/shop" className="btn-gold" style={{ marginRight: 12 }}>
          เลือกซื้อสินค้า
        </Link>
        <Link href="/faq" className="btn-outline">
          คำถามที่พบบ่อย
        </Link>
      </div>
    </div>
  );
}
