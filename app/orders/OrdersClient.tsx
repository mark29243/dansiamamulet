'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useLang } from '@/components/LangProvider';
import { getDict } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { IcoLock, IcoUser, IcoMapPin, IcoPhone, IcoEdit, IcoTrash, IcoPackage, IcoShop, IcoCalendar, IcoTruck, IcoCelebrate } from '@/components/icons';
import type { Order, Address } from '@/lib/types';

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  paid:           { bg: 'rgba(45,90,61,0.12)',    color: '#2D5A3D' },
  pending:        { bg: 'rgba(186,117,23,0.12)',  color: '#8B5E0F' },
  pending_alipay: { bg: 'rgba(186,117,23,0.12)',  color: '#8B5E0F' },
  pending_review: { bg: 'rgba(186,117,23,0.12)',  color: '#8B5E0F' },
  shipped:        { bg: 'rgba(74,128,96,0.15)',   color: '#2D5A3D' },
  delivered:      { bg: 'rgba(45,90,61,0.18)',    color: '#2D5A3D' },
  cancelled:      { bg: 'rgba(92,26,26,0.1)',     color: '#5C1A1A' },
  refunded:       { bg: 'rgba(168,152,104,0.15)', color: '#6B5730' },
};

const STATUS_LABELS: Record<string, Record<string, string>> = {
  pending:        { th: 'รอชำระเงิน', en: 'Awaiting payment', zh: '待付款' },
  pending_alipay: { th: 'รอชำระเงิน (Alipay)', en: 'Awaiting payment', zh: '待付款' },
  pending_review: { th: 'รอตรวจสอบสลิป', en: 'Pending review', zh: '待审核' },
  paid:           { th: 'ชำระแล้ว / กำลังเตรียม', en: 'Paid · Preparing', zh: '已付款 · 备货中' },
  shipped:        { th: 'จัดส่งแล้ว', en: 'Shipped', zh: '已发货' },
  delivered:      { th: 'จัดส่งสำเร็จ', en: 'Delivered', zh: '已送达' },
  cancelled:      { th: 'ยกเลิก', en: 'Cancelled', zh: '已取消' },
  refunded:       { th: 'คืนเงินแล้ว', en: 'Refunded', zh: '已退款' },
};

const CARRIER_LINKS: Record<string, string> = {
  'thaipost':      'https://track.thailandpost.co.th/?trackNumber=',
  'thailand post': 'https://track.thailandpost.co.th/?trackNumber=',
  'ems':           'https://track.thailandpost.co.th/?trackNumber=',
  'kerry':         'https://th.kerryexpress.com/en/track/?track=',
  'flash':         'https://www.flashexpress.co.th/tracking/?se=',
  'dhl':           'https://www.dhl.com/th-en/home/tracking.html?tracking-id=',
  'fedex':         'https://www.fedex.com/fedextrack/?trknbr=',
};

function getTrackingUrl(carrier: string, trackingNo: string): string | null {
  const key = carrier.toLowerCase();
  for (const [k, url] of Object.entries(CARRIER_LINKS)) {
    if (key.includes(k)) return url + encodeURIComponent(trackingNo);
  }
  return null;
}

const PROGRESS_STEPS = ['paid', 'shipped', 'delivered'] as const;

const LABELS = ['Home', 'Work', 'Other', 'Holiday'];

const emptyForm = { label: 'Home', name: '', phone: '', address: '', city: '', province: '', postal_code: '', country: 'Thailand', is_default: false };

export default function OrdersClient({ orders, userEmail }: { orders: Order[] | null; userEmail: string | null }) {
  const { lang } = useLang();
  const t = getDict(lang);
  const [signingOut, setSigningOut] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addrLoading, setAddrLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | 'new' | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [addrError, setAddrError] = useState('');
  const [reviewOrderId, setReviewOrderId] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewBody, setReviewBody] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewedOrders, setReviewedOrders] = useState<Set<string>>(new Set());
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [myCodes, setMyCodes] = useState<{ code: string; percent: number; free_shipping: boolean; expires_at: string }[]>([]);

  const fetchAddresses = useCallback(async () => {
    setAddrLoading(true);
    const res = await fetch('/api/addresses');
    if (res.ok) setAddresses(await res.json());
    setAddrLoading(false);
  }, []);

  useEffect(() => {
    if (orders !== null) {
      fetchAddresses();
      fetch('/api/discount/my-codes').then((r) => r.json()).then((d) => { if (Array.isArray(d)) setMyCodes(d); }).catch(() => {});
    }
  }, [orders, fetchAddresses]);

  async function signOut() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  function startEdit(addr: Address) {
    setEditingId(addr.id);
    setForm({ label: addr.label, name: addr.name, phone: addr.phone ?? '', address: addr.address, city: addr.city ?? '', province: addr.province ?? '', postal_code: addr.postal_code ?? '', country: addr.country, is_default: addr.is_default });
    setAddrError('');
  }

  function startNew() {
    setEditingId('new');
    setForm(emptyForm);
    setAddrError('');
  }

  function cancelEdit() {
    setEditingId(null);
    setAddrError('');
  }

  async function saveAddress() {
    setSaving(true);
    setAddrError('');
    const isNew = editingId === 'new';
    const url = isNew ? '/api/addresses' : `/api/addresses/${editingId}`;
    const method = isNew ? 'POST' : 'PUT';
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) {
        await fetchAddresses();
        setEditingId(null);
      } else {
        const d = await res.json().catch(() => ({}));
        setAddrError((d as any).error || 'Error saving');
      }
    } catch {
      setAddrError('Network error — please try again');
    } finally {
      setSaving(false);
    }
  }

  async function submitReview() {
    if (!reviewOrderId || reviewBody.trim().length < 10) return;
    setReviewSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: reviewOrderId, rating: reviewRating, body: reviewBody, lang }),
      });
      const data = await res.json();
      if (res.ok) {
        setReviewedOrders((prev) => new Set([...prev, reviewOrderId]));
        setDiscountCode(data.code ?? null);
        setReviewOrderId(null);
        setReviewBody('');
        setReviewRating(5);
        fetch('/api/discount/my-codes').then((r) => r.json()).then((d) => { if (Array.isArray(d)) setMyCodes(d); }).catch(() => {});
      }
    } catch {
      // network error — button re-enables so user can retry
    } finally {
      setReviewSubmitting(false);
    }
  }

  async function deleteAddress(id: number) {
    if (!confirm(lang === 'th' ? 'ลบที่อยู่นี้?' : 'Delete this address?')) return;
    const res = await fetch(`/api/addresses/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      if (editingId === id) setEditingId(null);
    }
  }

  // Not logged in
  if (!orders) {
    return (
      <div className="container animate-fade-in" style={{ padding: '60px 24px', maxWidth: 480, textAlign: 'center' }}>
        <div className="empty-state">
          <div className="icon" style={{ display: 'flex', justifyContent: 'center', color: 'var(--gold)' }}><IcoLock size={56} /></div>
          <h1 className="serif" style={{ fontSize: 26, fontWeight: 500, marginBottom: 12, color: 'var(--text)' }}>
            {lang === 'th' ? 'เข้าสู่ระบบเพื่อดูคำสั่งซื้อ' : lang === 'zh' ? '登录查看订单' : 'Sign in to view orders'}
          </h1>
          <p style={{ fontSize: 13, marginBottom: 24 }}>
            {lang === 'th' ? 'เราจะส่งลิงก์เข้าสู่ระบบไปที่อีเมลของคุณ' : lang === 'zh' ? '我们将通过邮箱发送登录链接' : "We'll email you a magic link"}
          </p>
          <Link href="/signin" className="btn-gold">{t.nav.signin}</Link>
        </div>
      </div>
    );
  }

  const labelTh: Record<string, string> = { Home: 'บ้าน', Work: 'ที่ทำงาน', Other: 'อื่นๆ', Holiday: 'บ้านพัก' };

  return (
    <div className="container" style={{ padding: '24px 24px 80px', maxWidth: 900 }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" style={{ marginBottom: 16 }}>
        <Link href="/">{t.nav.home}</Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{ color: 'var(--text)' }}>{t.nav.orders}</span>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--text)' }}>
            {t.nav.orders}
          </h1>
          {userEmail && (
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
              <IcoUser size={13} /> {userEmail}
            </p>
          )}
        </div>
        <button onClick={signOut} disabled={signingOut} className="btn-text">
          {signingOut ? <span className="spinner" /> : (lang === 'th' ? 'ออกจากระบบ' : lang === 'zh' ? '登出' : 'Sign out')}
        </button>
      </div>

      {/* ─── Saved Addresses ─── */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <h2 className="serif" style={{ fontSize: 20, fontWeight: 500, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <IcoMapPin size={18} style={{ color: 'var(--gold-dark)' }} />
            {lang === 'th' ? 'ที่อยู่ของฉัน' : lang === 'zh' ? '我的地址' : 'Saved Addresses'}
          </h2>
          {addresses.length < 4 && editingId === null && (
            <button onClick={startNew} className="btn-outline" style={{ fontSize: 12, padding: '6px 14px' }}>
              + {lang === 'th' ? 'เพิ่มที่อยู่' : lang === 'zh' ? '添加地址' : 'Add Address'}
            </button>
          )}
        </div>

        {addrLoading ? (
          <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Loading…</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {addresses.map((addr) => (
              <div key={addr.id} className="card" style={{ padding: 18, position: 'relative', borderLeft: addr.is_default ? '3px solid var(--gold)' : undefined }}>
                {addr.is_default && (
                  <span className="serif" style={{ fontSize: 9, letterSpacing: 2, color: 'var(--gold-dark)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                    ★ {lang === 'th' ? 'ที่อยู่หลัก' : 'Default'}
                  </span>
                )}
                <div className="serif" style={{ fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>
                  {lang === 'th' ? (labelTh[addr.label] ?? addr.label) : addr.label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{addr.name}</div>
                {addr.phone && (
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <IcoPhone size={11} /> {addr.phone}
                  </div>
                )}
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>
                  {addr.address}
                  {addr.city && <>, {addr.city}</>}
                  {addr.province && <>, {addr.province}</>}
                  {addr.postal_code && <> {addr.postal_code}</>}
                  <br />{addr.country}
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <button onClick={() => startEdit(addr)} className="btn-text" style={{ fontSize: 12, padding: '4px 0', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <IcoEdit size={12} /> {lang === 'th' ? 'แก้ไข' : 'Edit'}
                  </button>
                  <button onClick={() => deleteAddress(addr.id)} className="btn-text" style={{ fontSize: 12, padding: '4px 0', color: 'var(--burgundy)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <IcoTrash size={12} /> {lang === 'th' ? 'ลบ' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}

            {addresses.length === 0 && editingId === null && (
              <div style={{ color: 'var(--text-muted)', fontSize: 13, gridColumn: '1/-1' }}>
                {lang === 'th' ? 'ยังไม่มีที่อยู่ที่บันทึกไว้' : lang === 'zh' ? '暂无保存的地址' : 'No saved addresses yet'}
              </div>
            )}
          </div>
        )}

        {/* Add / Edit form */}
        {editingId !== null && (
          <div className="card" style={{ marginTop: 16, padding: 24 }}>
            <h3 className="serif" style={{ fontSize: 15, fontWeight: 600, marginBottom: 18, color: 'var(--text)' }}>
              {editingId === 'new'
                ? (lang === 'th' ? 'เพิ่มที่อยู่ใหม่' : 'New Address')
                : (lang === 'th' ? 'แก้ไขที่อยู่' : 'Edit Address')}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {/* Label */}
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>{lang === 'th' ? 'ประเภท' : 'Label'}</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {LABELS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, label: l }))}
                      style={{
                        padding: '5px 14px', fontSize: 12, borderRadius: 4, cursor: 'pointer',
                        border: '1px solid ' + (form.label === l ? 'var(--gold)' : 'var(--cream-dark)'),
                        background: form.label === l ? 'var(--gold)' : 'transparent',
                        color: form.label === l ? 'var(--deep)' : 'var(--text)',
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      {lang === 'th' ? (labelTh[l] ?? l) : l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label style={labelStyle}>{lang === 'th' ? 'ชื่อ-นามสกุล *' : 'Full Name *'}</label>
                <input style={inputStyle} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder={lang === 'th' ? 'ชื่อผู้รับ' : 'Recipient name'} />
              </div>

              {/* Phone */}
              <div>
                <label style={labelStyle}>{lang === 'th' ? 'เบอร์โทร' : 'Phone'}</label>
                <input style={inputStyle} value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="08x-xxx-xxxx" />
              </div>

              {/* Address */}
              <div style={{ gridColumn: '1/-1' }}>
                <label style={labelStyle}>{lang === 'th' ? 'ที่อยู่ *' : 'Address *'}</label>
                <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 64 }} value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} placeholder={lang === 'th' ? 'บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ' : 'Street, district, sub-district'} />
              </div>

              {/* City */}
              <div>
                <label style={labelStyle}>{lang === 'th' ? 'เมือง/จังหวัด' : 'City'}</label>
                <input style={inputStyle} value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} placeholder={lang === 'th' ? 'กรุงเทพฯ' : 'Bangkok'} />
              </div>

              {/* Postal */}
              <div>
                <label style={labelStyle}>{lang === 'th' ? 'รหัสไปรษณีย์' : 'Postal Code'}</label>
                <input style={inputStyle} value={form.postal_code} onChange={(e) => setForm((f) => ({ ...f, postal_code: e.target.value }))} placeholder="10100" />
              </div>

              {/* Country */}
              <div>
                <label style={labelStyle}>{lang === 'th' ? 'ประเทศ' : 'Country'}</label>
                <input style={inputStyle} value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))} placeholder="Thailand" />
              </div>

              {/* Default */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" id="is_default" checked={form.is_default} onChange={(e) => setForm((f) => ({ ...f, is_default: e.target.checked }))} />
                <label htmlFor="is_default" style={{ fontSize: 13, color: 'var(--text)', cursor: 'pointer' }}>
                  {lang === 'th' ? 'ตั้งเป็นที่อยู่หลัก' : 'Set as default'}
                </label>
              </div>
            </div>

            {addrError && <div style={{ color: '#C0392B', fontSize: 12, marginTop: 10 }}>{addrError}</div>}

            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <button onClick={saveAddress} disabled={saving} className="btn-gold" style={{ fontSize: 13 }}>
                {saving ? '…' : (lang === 'th' ? 'บันทึก' : 'Save')}
              </button>
              <button onClick={cancelEdit} className="btn-outline" style={{ fontSize: 13 }}>
                {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ─── Orders ─── */}
      <section>
        <h2 className="serif" style={{ fontSize: 20, fontWeight: 500, color: 'var(--text)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <IcoPackage size={18} style={{ color: 'var(--gold-dark)' }} />
          {lang === 'th' ? 'คำสั่งซื้อ' : lang === 'zh' ? '订单' : 'Orders'}
        </h2>

        {/* Persistent review discount codes */}
        {myCodes.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div className="serif" style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>
              {lang === 'th' ? '✦ โค้ดส่วนลดของคุณ' : lang === 'zh' ? '✦ 您的折扣码' : '✦ Your Discount Codes'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {myCodes.map((c) => (
                <div key={c.code} style={{ background: 'rgba(201,168,76,0.08)', border: '1px dashed var(--gold)', borderRadius: 'var(--radius)', padding: '12px 18px', minWidth: 200 }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 18, fontWeight: 700, letterSpacing: 4, color: 'var(--gold-dark)', marginBottom: 4 }}>{c.code}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {c.free_shipping
                      ? (lang === 'th' ? 'ส่งฟรี' : lang === 'zh' ? '免运费' : 'Free shipping')
                      : `${c.percent}% off`}
                    {' · '}
                    {lang === 'th' ? 'หมดอายุ ' : lang === 'zh' ? '有效至 ' : 'Expires '}
                    {new Date(c.expires_at).toLocaleDateString(lang === 'th' ? 'th-TH' : lang === 'zh' ? 'zh-CN' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discount code success banner (just-submitted) */}
        {discountCode && (
          <div style={{ background: 'rgba(45,90,61,0.08)', border: '1px solid var(--gold)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div className="serif" style={{ fontSize: 13, fontWeight: 600, color: 'var(--gold-dark)', marginBottom: 4 }}>
                {lang === 'th' ? '🎉 ขอบคุณสำหรับรีวิว! โค้ดส่วนลด 5% ของคุณ:' : lang === 'zh' ? '🎉 感谢评价！您的5%折扣码：' : '🎉 Thanks for your review! Your 5% discount code:'}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 700, letterSpacing: 4, color: 'var(--gold)' }}>{discountCode}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                {lang === 'th' ? 'โค้ดจะส่งไปที่อีเมลของคุณด้วย · ใช้ได้ภายใน 14 วัน' : lang === 'zh' ? '折扣码已发送至您的邮箱 · 14天内有效' : 'Code also sent to your email · Valid for 14 days'}
              </div>
            </div>
            <button onClick={() => setDiscountCode(null)} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: 'var(--text-muted)' }}>✕</button>
          </div>
        )}

        {/* Review modal */}
        {reviewOrderId && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div className="card" style={{ width: '100%', maxWidth: 480, padding: 28 }}>
              <h3 className="serif" style={{ fontSize: 20, fontWeight: 500, marginBottom: 20, color: 'var(--text)' }}>
                {lang === 'th' ? 'เขียนรีวิว' : lang === 'zh' ? '写评价' : 'Write a Review'}
              </h3>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'Cormorant Garamond', serif" }}>
                  {lang === 'th' ? 'คะแนน' : lang === 'zh' ? '评分' : 'Rating'}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1,2,3,4,5].map((n) => (
                    <button key={n} onClick={() => setReviewRating(n)} style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer', color: n <= reviewRating ? 'var(--gold)' : 'var(--cream-dark)', padding: 0 }}>★</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'Cormorant Garamond', serif" }}>
                  {lang === 'th' ? 'รีวิว (10-1000 ตัวอักษร)' : lang === 'zh' ? '评价内容（10-1000字）' : 'Review (10–1000 characters)'}
                </div>
                <textarea
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                  rows={5}
                  style={{ width: '100%', padding: '10px 12px', fontSize: 13, border: '1px solid var(--cream-dark)', borderRadius: 4, resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  placeholder={lang === 'th' ? 'แชร์ประสบการณ์ของคุณ...' : lang === 'zh' ? '分享您的体验...' : 'Share your experience...'}
                />
                <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 4 }}>{reviewBody.length}/1000</div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={submitReview} disabled={reviewSubmitting || reviewBody.trim().length < 10} className="btn-gold" style={{ fontSize: 13 }}>
                  {reviewSubmitting ? '…' : (lang === 'th' ? 'ส่งรีวิว' : lang === 'zh' ? '提交评价' : 'Submit Review')}
                </button>
                <button onClick={() => { setReviewOrderId(null); setReviewBody(''); setReviewRating(5); }} className="btn-outline" style={{ fontSize: 13 }}>
                  {lang === 'th' ? 'ยกเลิก' : lang === 'zh' ? '取消' : 'Cancel'}
                </button>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 12 }}>
                {lang === 'th' ? '✦ รีวิวจะแสดงหลังผ่านการอนุมัติ · คุณจะได้รับโค้ดส่วนลด 5% ทางอีเมล'
                  : lang === 'zh' ? '✦ 评价经审核后显示 · 您将收到5%折扣码邮件'
                  : '✦ Reviews are shown after approval · You\'ll receive a 5% discount code by email'}
              </p>
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="icon" style={{ display: 'flex', justifyContent: 'center', color: 'var(--gold)' }}><IcoPackage size={56} /></div>
            <h2 className="serif" style={{ fontSize: 20, fontWeight: 500, color: 'var(--text)', marginBottom: 8 }}>
              {lang === 'th' ? 'ยังไม่มีคำสั่งซื้อ' : lang === 'zh' ? '暂无订单' : 'No orders yet'}
            </h2>
            <p style={{ fontSize: 13, marginBottom: 20 }}>
              {lang === 'th' ? 'เริ่มเลือกซื้อพระเครื่องของเรา' : lang === 'zh' ? '开始浏览我们的佛牌' : 'Start browsing our collection'}
            </p>
            <Link href="/shop" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <IcoShop size={14} /> {t.cart.browseShop}
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {orders.map((o) => {
              const statusColor = STATUS_COLORS[o.status] || STATUS_COLORS.pending;
              return (
                <article key={o.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ background: 'var(--cream-dark)', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                    <div>
                      <div className="serif" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2, marginBottom: 2 }}>
                        {t.success.orderNo}
                      </div>
                      <div className="serif" style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold-dark)', letterSpacing: 1 }}>
                        #{o.id.slice(0, 8).toUpperCase()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <IcoCalendar size={11} /> {new Date(o.created_at).toLocaleDateString(lang === 'th' ? 'th-TH' : lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span style={{
                        fontSize: 10, letterSpacing: 1, textTransform: 'uppercase',
                        padding: '4px 10px', background: statusColor.bg, color: statusColor.color,
                        borderRadius: 999, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
                      }}>
                        {STATUS_LABELS[o.status]?.[lang] ?? o.status}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: 20 }}>
                    {/* Shipping progress bar */}
                    {PROGRESS_STEPS.includes(o.status as any) && (
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                        {PROGRESS_STEPS.map((step, i) => {
                          const activeStep = PROGRESS_STEPS.indexOf(o.status as any);
                          const done = activeStep >= i;
                          const stepLabels: Record<string, Record<string, string>> = {
                            paid:      { th: 'ชำระแล้ว', en: 'Paid', zh: '已付款' },
                            shipped:   { th: 'จัดส่งแล้ว', en: 'Shipped', zh: '已发货' },
                            delivered: { th: 'ถึงแล้ว', en: 'Delivered', zh: '已送达' },
                          };
                          return (
                            <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < PROGRESS_STEPS.length - 1 ? 1 : 'none' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                <div style={{
                                  width: 28, height: 28, borderRadius: '50%',
                                  background: done ? (step === 'delivered' ? 'var(--jade)' : 'var(--gold-dark)') : 'var(--cream-dark)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  color: done ? '#fff' : 'var(--text-faint)',
                                  boxShadow: activeStep === i ? '0 0 0 3px rgba(201,168,76,0.25)' : 'none',
                                }}>
                                  {step === 'paid' && <IcoPackage size={13} />}
                                  {step === 'shipped' && <IcoTruck size={13} />}
                                  {step === 'delivered' && <IcoCelebrate size={13} />}
                                </div>
                                <span style={{ fontSize: 10, color: done ? 'var(--text)' : 'var(--text-faint)', whiteSpace: 'nowrap' }}>
                                  {stepLabels[step][lang] ?? stepLabels[step].en}
                                </span>
                              </div>
                              {i < PROGRESS_STEPS.length - 1 && (
                                <div style={{ flex: 1, height: 2, background: activeStep > i ? 'var(--gold-dark)' : 'var(--cream-dark)', margin: '0 6px', marginBottom: 16 }} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Tracking number */}
                    {o.tracking_number && (
                      <div style={{ background: 'rgba(45,90,61,0.06)', border: '1px solid rgba(45,90,61,0.2)', borderRadius: 'var(--radius)', padding: '10px 14px', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <span style={{ color: 'var(--jade)', display: 'flex' }}><IcoTruck size={15} /></span>
                        {o.carrier && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{o.carrier}</span>}
                        <span style={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, color: 'var(--text)', letterSpacing: 1 }}>{o.tracking_number}</span>
                        {o.carrier && getTrackingUrl(o.carrier, o.tracking_number) && (
                          <a href={getTrackingUrl(o.carrier, o.tracking_number)!} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '3px 12px', fontSize: 11, marginLeft: 'auto' }}>
                            {lang === 'th' ? '→ ติดตามพัสดุ' : lang === 'zh' ? '→ 追踪包裹' : '→ Track'}
                          </a>
                        )}
                      </div>
                    )}
                    <ul style={{ listStyle: 'none', marginBottom: 14 }}>
                      {o.items.map((i, k) => (
                        <li key={k} style={{ display: 'flex', gap: 12, padding: '8px 0', alignItems: 'center' }}>
                          {i.image && (
                            <div style={{ width: 48, height: 48, background: 'var(--cream-dark)', overflow: 'hidden', borderRadius: 'var(--radius)', flexShrink: 0 }}>
                              <Image src={i.image} alt="" width={48} height={48} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          )}
                          <div style={{ flex: 1, fontSize: 13 }}>
                            <div style={{ color: 'var(--text)' }}>{i.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>{t.cart.qty}: {i.qty}</div>
                          </div>
                          <div className="serif" style={{ color: 'var(--gold-dark)', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap' }}>
                            {formatPrice(i.price * i.qty, lang)}
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <span className="serif" style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t.cart.total}</span>
                        <span className="serif" style={{ fontSize: 20, fontWeight: 600, color: 'var(--gold-dark)' }}>{formatPrice(o.total, lang)}</span>
                      </div>
                      {['paid', 'shipped', 'delivered'].includes(o.status) && !reviewedOrders.has(o.id) && (
                        <button onClick={() => setReviewOrderId(o.id)} className="btn-outline" style={{ fontSize: 12, padding: '7px 16px', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          ★ {lang === 'th' ? 'เขียนรีวิว' : lang === 'zh' ? '写评价' : 'Write Review'}
                        </button>
                      )}
                      {reviewedOrders.has(o.id) && (
                        <span style={{ fontSize: 12, color: '#2D5A3D' }}>✓ {lang === 'th' ? 'ส่งรีวิวแล้ว' : lang === 'zh' ? '已评价' : 'Reviewed'}</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
  color: 'var(--text-muted)', marginBottom: 6, fontFamily: "'Cormorant Garamond', serif",
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', fontSize: 13, border: '1px solid var(--cream-dark)',
  borderRadius: 4, background: '#fff', color: 'var(--text)', outline: 'none',
  fontFamily: 'inherit', boxSizing: 'border-box',
};
