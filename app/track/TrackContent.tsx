'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLang } from '@/components/LangProvider';
import { formatPrice } from '@/lib/utils';
import { IcoPackage, IcoTruck, IcoCheck, IcoCelebrate } from '@/components/icons';

type OrderStatus = 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' | 'pending_review';

type TrackOrder = {
  id: string;
  customer_name: string | null;
  status: OrderStatus;
  items: { product_id: number; name: string; price: number; image: string; qty: number }[];
  subtotal: number;
  shipping_cost: number;
  discount_amount: number | null;
  total: number;
  currency: string;
  tracking_number: string | null;
  carrier: string | null;
  shipping_address: { line1: string; line2?: string; city: string; postal_code: string; country: string };
  created_at: string;
  updated_at: string;
};

const CARRIER_LINKS: Record<string, string> = {
  'thaipost':  'https://track.thailandpost.co.th/?trackNumber=',
  'thailand post': 'https://track.thailandpost.co.th/?trackNumber=',
  'ems':       'https://track.thailandpost.co.th/?trackNumber=',
  'kerry':     'https://th.kerryexpress.com/en/track/?track=',
  'flash':     'https://www.flashexpress.co.th/tracking/?se=',
  'dhl':       'https://www.dhl.com/th-en/home/tracking.html?tracking-id=',
  'fedex':     'https://www.fedex.com/fedextrack/?trknbr=',
  'j&t':       'https://www.jtexpressth.com/track?',
};

function getTrackingUrl(carrier: string, trackingNo: string): string | null {
  const key = carrier.toLowerCase();
  for (const [k, url] of Object.entries(CARRIER_LINKS)) {
    if (key.includes(k)) return url + encodeURIComponent(trackingNo);
  }
  return null;
}

const STATUS_STEPS: OrderStatus[] = ['paid', 'shipped', 'delivered'];

function statusLabel(status: OrderStatus, lang: string): string {
  const map: Record<OrderStatus, Record<string, string>> = {
    paid:           { th: 'ชำระเงินแล้ว / กำลังเตรียม', en: 'Paid · Preparing', zh: '已付款 · 备货中' },
    shipped:        { th: 'จัดส่งแล้ว', en: 'Shipped', zh: '已发货' },
    delivered:      { th: 'จัดส่งสำเร็จ', en: 'Delivered', zh: '已送达' },
    cancelled:      { th: 'ยกเลิกแล้ว', en: 'Cancelled', zh: '已取消' },
    refunded:       { th: 'คืนเงินแล้ว', en: 'Refunded', zh: '已退款' },
    pending_review: { th: 'รอตรวจสอบ', en: 'Pending review', zh: '待审核' },
  };
  return map[status]?.[lang] ?? status;
}

function statusColor(status: OrderStatus): string {
  if (status === 'delivered') return 'var(--jade)';
  if (status === 'shipped') return 'var(--gold-dark)';
  if (status === 'paid') return 'var(--text-muted)';
  if (status === 'cancelled' || status === 'refunded') return 'var(--burgundy)';
  return 'var(--text-muted)';
}

export default function TrackContent() {
  const { lang } = useLang();
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<TrackOrder | null>(null);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setOrder(null);
    setLoading(true);
    try {
      const res = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          lang === 'th' ? 'ไม่พบคำสั่งซื้อ กรุณาตรวจสอบหมายเลขออเดอร์และอีเมล'
          : lang === 'zh' ? '未找到订单，请检查订单号和邮箱'
          : 'Order not found. Please check your order number and email.'
        );
      } else {
        setOrder(data.order);
      }
    } catch {
      setError(lang === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่' : lang === 'zh' ? '发生错误，请重试' : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const orderNo = order ? order.id.slice(0, 8).toUpperCase() : '';
  const activeStep = order ? STATUS_STEPS.indexOf(order.status as any) : -1;
  const isCancelled = order?.status === 'cancelled' || order?.status === 'refunded';
  const trackingUrl = order?.tracking_number && order?.carrier
    ? getTrackingUrl(order.carrier, order.tracking_number) : null;

  return (
    <div className="container" style={{ padding: '40px 24px 80px', maxWidth: 680 }}>
      {/* Breadcrumb */}
      <nav className="breadcrumb" style={{ marginBottom: 28 }}>
        <Link href="/">{lang === 'th' ? 'หน้าแรก' : lang === 'zh' ? '首页' : 'Home'}</Link>
        <span className="breadcrumb-sep">/</span>
        <span style={{ color: 'var(--text)' }}>
          {lang === 'th' ? 'ติดตามพัสดุ' : lang === 'zh' ? '追踪订单' : 'Track Order'}
        </span>
      </nav>

      <h1 className="serif" style={{ fontSize: 28, fontWeight: 500, marginBottom: 8, color: 'var(--text)' }}>
        {lang === 'th' ? 'ติดตามพัสดุ' : lang === 'zh' ? '追踪订单' : 'Track Your Order'}
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.7 }}>
        {lang === 'th'
          ? 'กรอกหมายเลขออเดอร์ (8 ตัวอักษรจากอีเมลยืนยัน) และอีเมลที่ใช้สั่งซื้อ'
          : lang === 'zh'
          ? '输入订单号（确认邮件中的8位字符）和您的邮箱'
          : 'Enter your order number (8-char code from your confirmation email) and the email you ordered with.'}
      </p>

      {/* Lookup form */}
      <form onSubmit={handleSubmit} className="card" style={{ padding: 24, marginBottom: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label className="serif" style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
              {lang === 'th' ? 'หมายเลขออเดอร์' : lang === 'zh' ? '订单号' : 'Order Number'}
            </label>
            <input
              className="input"
              placeholder={lang === 'th' ? 'เช่น A1B2C3D4' : lang === 'zh' ? '例如 A1B2C3D4' : 'e.g. A1B2C3D4'}
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              style={{ fontFamily: 'monospace', letterSpacing: 1, textTransform: 'uppercase' }}
            />
          </div>
          <div>
            <label className="serif" style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
              {lang === 'th' ? 'อีเมล' : lang === 'zh' ? '邮箱' : 'Email'}
            </label>
            <input
              className="input"
              type="email"
              placeholder={lang === 'th' ? 'อีเมลที่ใช้สั่งซื้อ' : lang === 'zh' ? '下单邮箱' : 'Email used at checkout'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && (
            <div style={{ background: 'rgba(139,0,0,0.06)', border: '1px solid rgba(139,0,0,0.2)', borderRadius: 'var(--radius)', padding: '10px 14px', fontSize: 13, color: 'var(--burgundy)' }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            className="btn-gold"
            disabled={loading}
            style={{ padding: '12px 24px', opacity: loading ? 0.7 : 1 }}
          >
            {loading
              ? (lang === 'th' ? 'กำลังค้นหา...' : lang === 'zh' ? '查询中...' : 'Looking up...')
              : (lang === 'th' ? 'ติดตามออเดอร์' : lang === 'zh' ? '追踪订单' : 'Track Order')}
          </button>
        </div>
      </form>

      {/* Order result */}
      {order && (
        <div className="animate-fade-in">
          {/* Order header */}
          <div className="card" style={{ padding: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
              <div>
                <div className="serif" style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>
                  {lang === 'th' ? 'ออเดอร์' : lang === 'zh' ? '订单' : 'Order'} #{orderNo}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {new Date(order.created_at).toLocaleDateString(
                    lang === 'th' ? 'th-TH' : lang === 'zh' ? 'zh-CN' : 'en-GB',
                    { day: 'numeric', month: 'long', year: 'numeric' }
                  )}
                </div>
              </div>
              <span style={{
                background: `${statusColor(order.status)}20`,
                color: statusColor(order.status),
                border: `1px solid ${statusColor(order.status)}40`,
                borderRadius: 100,
                padding: '5px 14px',
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}>
                {statusLabel(order.status, lang)}
              </span>
            </div>

            {/* Progress bar — only for active statuses */}
            {!isCancelled && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  {STATUS_STEPS.map((step, i) => {
                    const done = activeStep >= i;
                    const active = activeStep === i;
                    const labels: Record<string, Record<string, string>> = {
                      paid:      { th: 'ชำระเงินแล้ว', en: 'Paid', zh: '已付款' },
                      shipped:   { th: 'จัดส่งแล้ว', en: 'Shipped', zh: '已发货' },
                      delivered: { th: 'ถึงแล้ว', en: 'Delivered', zh: '已送达' },
                    };
                    return (
                      <div key={step} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: done ? (step === 'delivered' ? 'var(--jade)' : 'var(--gold-dark)') : 'var(--cream-dark)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: done ? '#fff' : 'var(--text-faint)',
                            transition: 'all 0.3s',
                            boxShadow: active ? '0 0 0 3px rgba(201,168,76,0.25)' : 'none',
                          }}>
                            {step === 'paid' && <IcoPackage size={16} />}
                            {step === 'shipped' && <IcoTruck size={16} />}
                            {step === 'delivered' && <IcoCelebrate size={16} />}
                          </div>
                          <span style={{ fontSize: 11, color: done ? 'var(--text)' : 'var(--text-faint)', whiteSpace: 'nowrap' }}>
                            {labels[step][lang] ?? labels[step].en}
                          </span>
                        </div>
                        {i < STATUS_STEPS.length - 1 && (
                          <div style={{ flex: 1, height: 2, background: activeStep > i ? 'var(--gold-dark)' : 'var(--cream-dark)', margin: '0 4px', marginBottom: 22 }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tracking info */}
            {order.tracking_number && (
              <div style={{ background: 'rgba(45,90,61,0.06)', border: '1px solid rgba(45,90,61,0.2)', borderRadius: 'var(--radius)', padding: '14px 18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: 'var(--jade)', display: 'flex' }}><IcoTruck size={18} /></span>
                  <span className="serif" style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--jade)', fontWeight: 600 }}>
                    {lang === 'th' ? 'ข้อมูลการจัดส่ง' : lang === 'zh' ? '快递信息' : 'Shipping Info'}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>
                  {lang === 'th' ? 'ขนส่ง' : lang === 'zh' ? '承运商' : 'Carrier'}: <strong style={{ color: 'var(--text)' }}>{order.carrier}</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 600, color: 'var(--text)', letterSpacing: 1 }}>
                    {order.tracking_number}
                  </span>
                  {trackingUrl && (
                    <a
                      href={trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{ padding: '5px 14px', fontSize: 12 }}
                    >
                      {lang === 'th' ? '→ ติดตามพัสดุ' : lang === 'zh' ? '→ 追踪包裹' : '→ Track Package'}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="card" style={{ padding: '4px 20px', marginBottom: 16 }}>
            {order.items.map((item, idx) => (
              <div key={idx} style={{
                display: 'grid', gridTemplateColumns: '56px 1fr auto', gap: 12,
                padding: '16px 0',
                borderBottom: idx < order.items.length - 1 ? '1px solid var(--cream-dark)' : 'none',
                alignItems: 'center',
              }}>
                <div style={{ width: 56, height: 56, background: 'var(--cream-dark)', borderRadius: 'var(--radius)', overflow: 'hidden', flexShrink: 0 }}>
                  {item.image && (
                    <Image src={item.image} alt={item.name} width={56} height={56} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2, lineHeight: 1.4 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>×{item.qty}</div>
                </div>
                <div className="serif" style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold-dark)', whiteSpace: 'nowrap' }}>
                  {formatPrice(item.price * item.qty, lang as any)}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="card" style={{ padding: 20, marginBottom: 24 }}>
            <Row label={lang === 'th' ? 'ราคาสินค้า' : lang === 'zh' ? '商品小计' : 'Subtotal'} value={formatPrice(order.subtotal, lang as any)} />
            {(order.discount_amount ?? 0) > 0 && (
              <Row label={lang === 'th' ? 'ส่วนลด' : lang === 'zh' ? '折扣' : 'Discount'} value={`-${formatPrice(order.discount_amount!, lang as any)}`} accent />
            )}
            <Row
              label={lang === 'th' ? 'ค่าจัดส่ง' : lang === 'zh' ? '运费' : 'Shipping'}
              value={order.shipping_cost === 0
                ? (lang === 'th' ? 'ฟรี' : lang === 'zh' ? '免运费' : 'FREE')
                : formatPrice(order.shipping_cost, lang as any)}
            />
            <div style={{ borderTop: '1px solid var(--cream-dark)', paddingTop: 12, marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="serif" style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text)', fontWeight: 600 }}>
                {lang === 'th' ? 'รวมทั้งสิ้น' : lang === 'zh' ? '总计' : 'Total'}
              </span>
              <span className="serif" style={{ fontSize: 20, fontWeight: 600, color: 'var(--gold-dark)' }}>
                {formatPrice(order.total, lang as any)}
              </span>
            </div>
          </div>

          {/* Shipping address */}
          <div className="card" style={{ padding: 20, marginBottom: 32 }}>
            <div className="serif" style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>
              {lang === 'th' ? 'ที่อยู่จัดส่ง' : lang === 'zh' ? '收货地址' : 'Shipping Address'}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.7 }}>
              {order.customer_name && <div style={{ fontWeight: 600 }}>{order.customer_name}</div>}
              <div>{order.shipping_address.line1}</div>
              {order.shipping_address.line2 && <div>{order.shipping_address.line2}</div>}
              <div>{order.shipping_address.city} {order.shipping_address.postal_code}</div>
              <div>{order.shipping_address.country}</div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/shop" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {lang === 'th' ? '← กลับไปช้อปปิ้ง' : lang === 'zh' ? '← 继续购物' : '← Continue Shopping'}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, color: accent ? 'var(--jade)' : 'var(--text-muted)' }}>
      <span>{label}</span>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: accent ? 600 : 400 }}>{value}</span>
    </div>
  );
}
