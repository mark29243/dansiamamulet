'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { useLang } from '@/components/LangProvider';
import { useToast } from '@/components/ToastProvider';
import { getDict } from '@/lib/i18n';
import { formatPrice, calcShipping } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD = 500000;

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const { lang } = useLang();
  const { toast } = useToast();
  const t = getDict(lang);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'alipay' | 'wechat_pay'>('card');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    postal: '',
    country: 'TH',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
    // Redirect if cart is empty
    if (items.length === 0) router.replace('/cart');
  }, [items.length, router]);

  if (!mounted || items.length === 0) return null;

  const baseShipping = calcShipping(form.country, items.length);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : baseShipping;
  const total = subtotal + shipping;

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t.common.required;
    if (!form.email.trim()) e.email = t.common.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.common.invalidEmail;
    if (!form.phone.trim()) e.phone = t.common.required;
    if (!form.address.trim()) e.address = t.common.required;
    if (!form.city.trim()) e.city = t.common.required;
    if (!form.postal.trim()) e.postal = t.common.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast(lang === 'th' ? 'กรุณากรอกข้อมูลให้ครบ' : lang === 'zh' ? '请填写所有必填项' : 'Please fill in all required fields', 'error');
      // Scroll to first error
      const firstErr = document.querySelector('.input.error');
      firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customer: form, shipping_cost: shipping, lang, payment_method: paymentMethod }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      if (data.type === 'alipay') {
        router.push(`/alipay-pay?order=${data.orderId}&amount=${data.cnyAmount}`);
        return;
      }
      window.location.href = data.url;
    } catch (err: any) {
      toast(err.message || t.common.error, 'error');
      setLoading(false);
    }
  }

  function update(field: keyof typeof form, v: string) {
    setForm({ ...form, [field]: v });
    if (errors[field]) {
      const next = { ...errors };
      delete next[field];
      setErrors(next);
    }
  }

  return (
    <div className="container" style={{ padding: '24px 24px 80px', maxWidth: 1100 }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" style={{ marginBottom: 16 }}>
        <Link href="/">{t.nav.home}</Link>
        <span className="breadcrumb-sep">/</span>
        <Link href="/cart">{t.cart.title}</Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{ color: 'var(--text)' }}>{t.checkout.title}</span>
      </nav>

      <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, marginBottom: 24 }}>{t.checkout.title}</h1>

      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 12, flexWrap: 'wrap' }}>
        <Step n={1} label={t.checkout.step1} active />
        <Step n={2} label={t.checkout.step2} active />
        <Step n={3} label={t.checkout.step3} />
      </div>

      <form onSubmit={handleSubmit} noValidate style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }} className="checkout-grid">
        <div>
          {/* Contact info card */}
          <div className="card" style={{ padding: 24, marginBottom: 16 }}>
            <h2 className="serif" style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ background: 'var(--gold)', color: 'var(--deep)', width: 24, height: 24, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>1</span>
              {t.checkout.contact}
            </h2>

            <Field label={t.checkout.name} required error={errors.name}>
              <input
                className={`input ${errors.name ? 'error' : ''}`}
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder={lang === 'th' ? 'ชื่อ-นามสกุล' : lang === 'zh' ? '姓名' : 'Your full name'}
                autoComplete="name"
              />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="row-2">
              <Field label={t.checkout.email} required error={errors.email}>
                <input
                  className={`input ${errors.email ? 'error' : ''}`}
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder={t.checkout.placeholder.email}
                  autoComplete="email"
                />
              </Field>
              <Field label={t.checkout.phone} required error={errors.phone}>
                <input
                  className={`input ${errors.phone ? 'error' : ''}`}
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder={t.checkout.placeholder.phone}
                  autoComplete="tel"
                />
              </Field>
            </div>
          </div>

          {/* Address card */}
          <div className="card" style={{ padding: 24 }}>
            <h2 className="serif" style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ background: 'var(--gold)', color: 'var(--deep)', width: 24, height: 24, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>2</span>
              {t.checkout.shipping}
            </h2>

            <Field label={t.checkout.country} required>
              <select
                className="input"
                value={form.country}
                onChange={(e) => update('country', e.target.value)}
                autoComplete="country"
              >
                <option value="TH">🇹🇭 Thailand</option>
                <option value="SG">🇸🇬 Singapore</option>
                <option value="HK">🇭🇰 Hong Kong</option>
                <option value="CN">🇨🇳 China</option>
                <option value="TW">🇹🇼 Taiwan</option>
                <option value="MY">🇲🇾 Malaysia</option>
                <option value="JP">🇯🇵 Japan</option>
                <option value="KR">🇰🇷 South Korea</option>
                <option value="VN">🇻🇳 Vietnam</option>
                <option value="ID">🇮🇩 Indonesia</option>
                <option value="PH">🇵🇭 Philippines</option>
                <option value="US">🇺🇸 United States</option>
                <option value="GB">🇬🇧 United Kingdom</option>
                <option value="AU">🇦🇺 Australia</option>
                <option value="DE">🇩🇪 Germany</option>
                <option value="FR">🇫🇷 France</option>
                <option value="IT">🇮🇹 Italy</option>
                <option value="ES">🇪🇸 Spain</option>
                <option value="NL">🇳🇱 Netherlands</option>
                <option value="CA">🇨🇦 Canada</option>
              </select>
            </Field>

            <Field label={t.checkout.address} required error={errors.address}>
              <input
                className={`input ${errors.address ? 'error' : ''}`}
                value={form.address}
                onChange={(e) => update('address', e.target.value)}
                placeholder={t.checkout.placeholder.address}
                autoComplete="address-line1"
              />
            </Field>

            <Field label={t.checkout.address2}>
              <input
                className="input"
                value={form.address2}
                onChange={(e) => update('address2', e.target.value)}
                placeholder={t.checkout.placeholder.address2}
                autoComplete="address-line2"
              />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }} className="row-2">
              <Field label={t.checkout.city} required error={errors.city}>
                <input
                  className={`input ${errors.city ? 'error' : ''}`}
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  autoComplete="address-level2"
                />
              </Field>
              <Field label={t.checkout.postal} required error={errors.postal}>
                <input
                  className={`input ${errors.postal ? 'error' : ''}`}
                  value={form.postal}
                  onChange={(e) => update('postal', e.target.value)}
                  autoComplete="postal-code"
                />
              </Field>
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className="card" style={{ padding: 24, height: 'fit-content', position: 'sticky', top: 140 }}>
          <h2 className="serif" style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--cream-dark)' }}>
            {t.checkout.orderSummary}
          </h2>

          <div style={{ marginBottom: 16, maxHeight: 240, overflowY: 'auto' }}>
            {items.map((i) => (
              <div key={i.product_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '6px 0', fontSize: 12, gap: 12 }}>
                <span style={{ flex: 1, color: 'var(--text)' }}>
                  {i.name.slice(0, 50)}{i.name.length > 50 ? '…' : ''}
                  <span style={{ color: 'var(--text-faint)', display: 'block', fontSize: 11, marginTop: 2 }}>{t.cart.qty}: {i.qty}</span>
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--gold-dark)', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>
                  {formatPrice(i.price * i.qty, lang)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: 12 }}>
            <SumRow l={t.cart.subtotal} v={formatPrice(subtotal, lang)} />
            <SumRow
              l={t.cart.shipping}
              v={shipping === 0 ? <span style={{ color: 'var(--jade)', fontWeight: 600 }}>{t.cart.shippingFree}</span> : formatPrice(shipping, lang)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--cream-dark)', paddingTop: 14, marginTop: 10 }}>
              <span className="serif" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--text)', fontWeight: 600 }}>{t.cart.total}</span>
              <span className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--gold-dark)' }}>{formatPrice(total, lang)}</span>
            </div>
          </div>

          {/* Payment method selector */}
          <div style={{ marginTop: 20, marginBottom: 4 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 10 }}>
              {lang === 'zh' ? '支付方式' : lang === 'th' ? 'วิธีชำระเงิน' : 'Payment Method'}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
              {([
                { id: 'card', label: lang === 'zh' ? '银行卡' : lang === 'th' ? 'บัตร' : 'Card', sub: 'Visa / MC' },
                { id: 'alipay', label: '支付宝', sub: 'Alipay' },
                { id: 'wechat_pay', label: '微信支付', sub: 'WeChat' },
              ] as const).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  style={{
                    padding: '8px 4px',
                    border: `2px solid ${paymentMethod === m.id ? 'var(--gold)' : 'var(--cream-dark)'}`,
                    background: paymentMethod === m.id ? 'rgba(201,168,76,0.08)' : '#fff',
                    borderRadius: 6,
                    cursor: 'pointer',
                    textAlign: 'center',
                    color: paymentMethod === m.id ? 'var(--gold-dark)' : 'var(--text-muted)',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{m.label}</div>
                  <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>{m.sub}</div>
                </button>
              ))}
            </div>
            {paymentMethod !== 'card' && (
              <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-faint)', background: 'var(--cream)', padding: '6px 10px', borderRadius: 4, lineHeight: 1.6 }}>
                {lang === 'zh'
                  ? '将以人民币 (CNY) 结算，汇率约 1฿ ≈ 0.20¥'
                  : lang === 'th'
                  ? 'ชำระเป็นหยวน (CNY) อัตราประมาณ 1฿ ≈ 0.20¥'
                  : 'Charged in CNY — rate approx. 1฿ ≈ 0.20¥'}
              </div>
            )}
          </div>

          <button type="submit" className="btn-gold" disabled={loading} style={{ width: '100%', marginTop: 16 }}>
            {loading ? (
              <>
                <span className="spinner" /> {t.common.loading}
              </>
            ) : (
              <>🔒 {t.checkout.payNow}</>
            )}
          </button>

          <div style={{ marginTop: 14, fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', lineHeight: 1.6 }}>
            🔒 {t.checkout.secureNotice}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <PaymentLogo>Stripe</PaymentLogo>
            <PaymentLogo>Visa</PaymentLogo>
            <PaymentLogo>MC</PaymentLogo>
            <PaymentLogo>Alipay</PaymentLogo>
            <PaymentLogo>WeChat</PaymentLogo>
          </div>
        </aside>
      </form>

      <style>{`
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .row-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function Step({ n, label, active }: { n: number; label: string; active?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          background: active ? 'var(--gold)' : 'var(--cream-dark)',
          color: active ? 'var(--deep)' : 'var(--text-muted)',
          width: 26,
          height: 26,
          borderRadius: '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {n}
      </span>
      <span className="serif" style={{ color: active ? 'var(--text)' : 'var(--text-muted)', letterSpacing: 1.5, textTransform: 'uppercase' }}>{label}</span>
      {n < 3 && <span style={{ color: 'var(--text-faint)', margin: '0 4px' }}>—</span>}
    </div>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label className="label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      {children}
      {error && <div className="helper error">⚠ {error}</div>}
    </div>
  );
}

function SumRow({ l, v }: { l: string; v: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: 13, color: 'var(--text-muted)' }}>
      <span>{l}</span>
      <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>{v}</span>
    </div>
  );
}

function PaymentLogo({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="serif"
      style={{
        fontSize: 10,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        padding: '4px 8px',
        border: '1px solid var(--cream-dark)',
        color: 'var(--text-muted)',
        borderRadius: 3,
        background: '#fff',
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}
