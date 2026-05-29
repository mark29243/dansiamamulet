'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { useLang } from '@/components/LangProvider';
import { useToast } from '@/components/ToastProvider';
import { getDict } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import type { ShippingOption, CarrierCode } from '@/lib/shipping';
import { isRemotePostal } from '@/lib/shipping';
import { IcoLock, IcoWarning } from '@/components/icons';

const FREE_SHIPPING_THRESHOLD = 70000; // ฿700 domestic only

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const { lang } = useLang();
  const { toast } = useToast();
  const t = getDict(lang);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'alipay'>('card');

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', address2: '', city: '', postal: '', country: 'TH',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Shipping
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [shippingMethod, setShippingMethod] = useState<CarrierCode | null>(null);
  const [fetchingRates, setFetchingRates] = useState(false);

  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  const fetchRates = useCallback(async (country: string, qty: number) => {
    setFetchingRates(true);
    try {
      const res = await fetch(`/api/shipping-rates?country=${country}&qty=${qty}`);
      const data = await res.json();
      const opts: ShippingOption[] = data.options ?? [];
      setShippingOptions(opts);
      if (opts.length === 1) {
        setShippingMethod(opts[0].carrier);
      } else if (opts.length > 1) {
        // Prefer thaipost for domestic, epacket for international
        const preferred =
          opts.find((o) => o.carrier === 'thaipost') ??
          opts.find((o) => o.carrier === 'epacket') ??
          opts[0];
        setShippingMethod(preferred.carrier);
      } else {
        setShippingMethod(null);
      }
    } catch {
      setShippingOptions([]);
      setShippingMethod(null);
    } finally {
      setFetchingRates(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    if (items.length === 0) router.replace('/cart');
  }, [items.length, router]);

  useEffect(() => {
    if (mounted && form.country) {
      fetchRates(form.country, totalQty);
    }
  }, [form.country, totalQty, mounted, fetchRates]);

  if (!mounted || items.length === 0) return null;

  const isTH = form.country === 'TH';
  // Auto-detect remote area from postal code (no manual input needed)
  const isRemote = isTH && isRemotePostal(form.postal);
  const selectedOption = shippingOptions.find((o) => o.carrier === shippingMethod);

  const baseShipping = selectedOption
    ? (isRemote && selectedOption.remoteCost != null
        ? selectedOption.remoteCost
        : selectedOption.cost)
    : 0;
  const shipping = (isTH && subtotal >= FREE_SHIPPING_THRESHOLD) ? 0 : baseShipping;
  const total = subtotal + shipping;

  // The carrier code sent to the API includes the -remote suffix when applicable
  const effectiveCarrier: CarrierCode | null = isRemote && shippingMethod
    ? `${shippingMethod}-remote` as CarrierCode
    : shippingMethod;

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = t.common.required;
    if (!form.email.trim()) e.email = t.common.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.common.invalidEmail;
    if (!form.phone.trim()) e.phone = t.common.required;
    if (!form.address.trim()) e.address = t.common.required;
    if (!form.city.trim()) e.city = t.common.required;
    if (!form.postal.trim()) e.postal = t.common.required;
    if (!shippingMethod) e.shipping = lang === 'th' ? 'กรุณาเลือกวิธีการจัดส่ง' : lang === 'zh' ? '请选择运输方式' : 'Please select a shipping method';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast(lang === 'th' ? 'กรุณากรอกข้อมูลให้ครบ' : lang === 'zh' ? '请填写所有必填项' : 'Please fill in all required fields', 'error');
      const firstErr = document.querySelector('.input.error, .shipping-error');
      firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: form,
          shipping_cost: shipping,
          carrier: effectiveCarrier,
          lang,
          payment_method: paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      if (data.type === 'alipay') {
        router.push(`/alipay-pay?order=${data.orderId}&amount=${data.cnyAmount}&email=${encodeURIComponent(form.email)}`);
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

  const shippingLabel = lang === 'th' ? 'วิธีการจัดส่ง' : lang === 'zh' ? '运输方式' : 'Shipping Method';
  const daysLabel = lang === 'th' ? 'วัน' : lang === 'zh' ? '天' : 'days';

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
              <input className={`input ${errors.name ? 'error' : ''}`} value={form.name} onChange={(e) => update('name', e.target.value)} placeholder={lang === 'th' ? 'ชื่อ-นามสกุล' : lang === 'zh' ? '姓名' : 'Your full name'} autoComplete="name" />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="row-2">
              <Field label={t.checkout.email} required error={errors.email}>
                <input className={`input ${errors.email ? 'error' : ''}`} type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder={t.checkout.placeholder.email} autoComplete="email" />
              </Field>
              <Field label={t.checkout.phone} required error={errors.phone}>
                <input className={`input ${errors.phone ? 'error' : ''}`} type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder={t.checkout.placeholder.phone} autoComplete="tel" />
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
              <select className="input" value={form.country} onChange={(e) => update('country', e.target.value)} autoComplete="country">
                <option value="TH">Thailand</option>
                <option value="SG">Singapore</option>
                <option value="HK">Hong Kong</option>
                <option value="CN">China</option>
                <option value="TW">Taiwan</option>
                <option value="MY">Malaysia</option>
                <option value="JP">Japan</option>
                <option value="KR">South Korea</option>
                <option value="VN">Vietnam</option>
                <option value="ID">Indonesia</option>
                <option value="PH">Philippines</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="IT">Italy</option>
                <option value="ES">Spain</option>
                <option value="NL">Netherlands</option>
                <option value="CA">Canada</option>
              </select>
            </Field>

            {/* Shipping method selector — all countries */}
            <div style={{ marginBottom: 14 }}>
              <label className="label">
                {shippingLabel} <span className="required">*</span>
              </label>
              {fetchingRates ? (
                <div style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 13 }}>
                  <span className="spinner" style={{ width: 16, height: 16 }} />
                  {lang === 'th' ? 'กำลังคำนวณค่าส่ง…' : lang === 'zh' ? '计算运费中…' : 'Calculating shipping…'}
                </div>
              ) : shippingOptions.length === 0 ? (
                <div style={{ fontSize: 13, color: 'var(--text-muted)', padding: '10px 0' }}>
                  {lang === 'th' ? 'ไม่รองรับการจัดส่งไปยังประเทศนี้' : lang === 'zh' ? '暂不支持配送至此国家' : 'Shipping not available for this country'}
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {shippingOptions.map((opt) => {
                      const selected = shippingMethod === opt.carrier;
                      const displayCost = isTH && isRemote && opt.remoteCost != null
                        ? opt.remoteCost
                        : opt.cost;
                      return (
                        <button
                          key={opt.carrier}
                          type="button"
                          onClick={() => {
                            setShippingMethod(opt.carrier);
                            if (errors.shipping) setErrors((p) => { const n = { ...p }; delete n.shipping; return n; });
                          }}
                          style={{
                            padding: '14px 18px',
                            border: `2px solid ${selected ? 'var(--gold)' : errors.shipping ? '#e53935' : 'var(--cream-dark)'}`,
                            background: selected ? 'rgba(201,168,76,0.08)' : '#fff',
                            borderRadius: 10,
                            cursor: 'pointer',
                            textAlign: 'left',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 12,
                            transition: 'all 0.15s',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{
                              width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                              border: `2px solid ${selected ? 'var(--gold)' : 'var(--cream-dark)'}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              {selected && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} />}
                            </span>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 14, color: selected ? 'var(--gold-dark)' : 'var(--text)' }}>
                                {opt.label}
                              </div>
                              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                                {opt.tracked ? '📦 ' : '✉️ '}
                                {opt.sublabel} · {opt.estimatedDays} {daysLabel}
                              </div>
                            </div>
                          </div>
                          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: 'var(--gold-dark)', whiteSpace: 'nowrap' }}>
                            {formatPrice(displayCost, lang)}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Remote area auto-detected from postal code */}
                  {isTH && isRemote && (
                    <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(201,168,76,0.08)', border: '1px solid var(--gold-light)', borderRadius: 8, fontSize: 12, color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <IcoWarning size={13} />
                      {lang === 'th' ? `รหัสไปรษณีย์ ${form.postal} เป็นพื้นที่ห่างไกล — คิดค่าบริการเพิ่มเติม` :
                       lang === 'zh' ? `邮编 ${form.postal} 属于偏远地区，需加收附加费` :
                       `Postal code ${form.postal} is a remote area — surcharge applied`}
                    </div>
                  )}
                </>
              )}
              {errors.shipping && (
                <div className="shipping-error helper error" style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                  <IcoWarning size={12} /> {errors.shipping}
                </div>
              )}
            </div>

            <Field label={t.checkout.address} required error={errors.address}>
              <input className={`input ${errors.address ? 'error' : ''}`} value={form.address} onChange={(e) => update('address', e.target.value)} placeholder={t.checkout.placeholder.address} autoComplete="address-line1" />
            </Field>

            <Field label={t.checkout.address2}>
              <input className="input" value={form.address2} onChange={(e) => update('address2', e.target.value)} placeholder={t.checkout.placeholder.address2} autoComplete="address-line2" />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }} className="row-2">
              <Field label={t.checkout.city} required error={errors.city}>
                <input className={`input ${errors.city ? 'error' : ''}`} value={form.city} onChange={(e) => update('city', e.target.value)} autoComplete="address-level2" />
              </Field>
              <Field label={t.checkout.postal} required error={errors.postal}>
                <input className={`input ${errors.postal ? 'error' : ''}`} value={form.postal} onChange={(e) => update('postal', e.target.value)} autoComplete="postal-code" />
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
              v={
                fetchingRates ? (
                  <span style={{ color: 'var(--text-faint)', fontSize: 12 }}>…</span>
                ) : shipping === 0 && isTH ? (
                  <span style={{ color: 'var(--jade)', fontWeight: 600 }}>{t.cart.shippingFree}</span>
                ) : !selectedOption ? (
                  <span style={{ color: 'var(--text-faint)', fontSize: 12 }}>—</span>
                ) : (
                  formatPrice(shipping, lang)
                )
              }
            />
            {selectedOption && (
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'right', marginTop: -4, marginBottom: 4 }}>
                {selectedOption.label}{isTH && isRemote ? ` · ${lang === 'th' ? 'พื้นที่ห่างไกล' : lang === 'zh' ? '偏远地区' : 'Remote'}` : ''}
              </div>
            )}
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {([
                { id: 'card', label: lang === 'zh' ? '银行卡' : lang === 'th' ? 'บัตร' : 'Card', sub: 'Visa / MC' },
                { id: 'alipay', label: '支付宝', sub: 'Alipay' },
              ] as const).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  style={{
                    padding: '8px 4px',
                    border: `2px solid ${paymentMethod === m.id ? 'var(--gold)' : 'var(--cream-dark)'}`,
                    background: paymentMethod === m.id ? 'rgba(201,168,76,0.08)' : '#fff',
                    borderRadius: 6, cursor: 'pointer', textAlign: 'center',
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
                {lang === 'zh' ? '将以人民币 (CNY) 结算，汇率约 1฿ ≈ 0.20¥' : lang === 'th' ? 'ชำระเป็นหยวน (CNY) อัตราประมาณ 1฿ ≈ 0.20¥' : 'Charged in CNY — rate approx. 1฿ ≈ 0.20¥'}
              </div>
            )}
          </div>

          <button type="submit" className="btn-gold" disabled={loading || !shippingMethod} style={{ width: '100%', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {loading ? (
              <><span className="spinner" /> {t.common.loading}</>
            ) : (
              <><IcoLock size={14} /> {t.checkout.payNow}</>
            )}
          </button>

          <div style={{ marginTop: 14, fontSize: 11, color: 'var(--text-faint)', textAlign: 'center', lineHeight: 1.6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <IcoLock size={11} /> {t.checkout.secureNotice}
          </div>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <a href="/payment" target="_blank" style={{ fontSize: 11, color: 'var(--gold-dark)', textDecoration: 'underline' }}>
              {lang === 'th' ? 'ดูวิธีชำระเงินทั้งหมด' : lang === 'zh' ? '查看所有支付方式' : 'View all payment methods'}
            </a>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <PaymentLogo>Stripe</PaymentLogo>
            <PaymentLogo>Visa</PaymentLogo>
            <PaymentLogo>MC</PaymentLogo>
            <PaymentLogo>Alipay</PaymentLogo>
          </div>
        </aside>
      </form>

      <style>{`
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
          .row-2 { grid-template-columns: 1fr !important; }
        }
        .helper.error { font-size: 12px; color: #e53935; margin-top: 4px; }
      `}</style>
    </div>
  );
}

function Step({ n, label, active }: { n: number; label: string; active?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ background: active ? 'var(--gold)' : 'var(--cream-dark)', color: active ? 'var(--deep)' : 'var(--text-muted)', width: 26, height: 26, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>
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
      {error && <div className="helper error" style={{ display: 'flex', alignItems: 'center', gap: 4 }}><IcoWarning size={12} /> {error}</div>}
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
    <span className="serif" style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', padding: '4px 8px', border: '1px solid var(--cream-dark)', color: 'var(--text-muted)', borderRadius: 3, background: '#fff', fontWeight: 600 }}>
      {children}
    </span>
  );
}
