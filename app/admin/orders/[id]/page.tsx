import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { createAdminClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';
import type { Order } from '@/lib/types';
import OrderActions from './OrderActions';
import { IcoCalendar } from '@/components/icons';

export const dynamic = 'force-dynamic';

export default async function AdminOrderPage({ params }: { params: { id: string } }) {
  const admin = createAdminClient();
  const { data: order, error } = await admin
    .from('orders')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !order) notFound();
  const o = order as Order;
  const orderNo = o.id.slice(0, 8).toUpperCase();

  return (
    <div className="container" style={{ padding: '32px 24px 60px', maxWidth: 1000 }}>
      <Link href="/admin/orders" className="btn-text" style={{ padding: 0, marginBottom: 16, display: 'inline-block' }}>← Back to orders</Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="serif" style={{ fontSize: 10, color: 'var(--text-faint)', letterSpacing: 2 }}>ORDER</div>
          <h1 className="serif" style={{ fontSize: 28, fontWeight: 600, color: 'var(--gold-dark)' }}>
            #{orderNo}
          </h1>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><IcoCalendar size={11} /> {new Date(o.created_at).toLocaleString()}</span>
          </div>
        </div>
        <OrderActions order={o} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }} data-grid="order">
        <div>
          {/* Items */}
          <section className="card" style={{ padding: 20, marginBottom: 16 }}>
            <h2 className="serif" style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 16 }}>
              Items ({o.items.length})
            </h2>
            <ul style={{ listStyle: 'none' }}>
              {o.items.map((i, k) => (
                <li key={k} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: k === o.items.length - 1 ? 'none' : '1px solid var(--cream-dark)', alignItems: 'center' }}>
                  {i.image && (
                    <div style={{ width: 60, height: 60, background: 'var(--cream-dark)', overflow: 'hidden', borderRadius: 'var(--radius)', flexShrink: 0 }}>
                      <Image src={i.image} alt="" width={60} height={60} style={{ width: '100%', height: '100%', objectFit: 'cover' }} unoptimized />
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div className="serif" style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{i.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      Qty: {i.qty} × {formatPrice(i.price)} each
                    </div>
                  </div>
                  <div className="serif" style={{ fontSize: 16, fontWeight: 600, color: 'var(--gold-dark)' }}>
                    {formatPrice(i.price * i.qty)}
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ borderTop: '2px solid var(--cream-dark)', paddingTop: 14, marginTop: 8 }}>
              <SumRow l="Subtotal" v={formatPrice(o.subtotal)} />
              <SumRow l="Shipping" v={o.shipping_cost === 0 ? 'FREE' : formatPrice(o.shipping_cost)} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--cream-dark)' }}>
                <span className="serif" style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>Total</span>
                <span className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--gold-dark)' }}>{formatPrice(o.total)}</span>
              </div>
            </div>
          </section>

          {/* Shipping */}
          <section className="card" style={{ padding: 20 }}>
            <h2 className="serif" style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 12 }}>
              Shipping address
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>
              {o.customer_name}<br />
              {o.shipping_address.line1}<br />
              {o.shipping_address.line2 && <>{o.shipping_address.line2}<br /></>}
              {o.shipping_address.city}, {o.shipping_address.postal_code}<br />
              <strong>{o.shipping_address.country}</strong>
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <aside>
          <div className="card" style={{ padding: 18, marginBottom: 16 }}>
            <h3 className="serif" style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 10 }}>
              Customer
            </h3>
            <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 4 }}>{o.customer_name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>
              <a href={`mailto:${o.customer_email}`} style={{ color: 'var(--gold-dark)' }}>{o.customer_email}</a>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{o.customer_phone}</div>
          </div>

          {/* Alipay slip */}
          {o.payment_slip_url && (
            <div className="card" style={{ padding: 18, marginBottom: 16, border: '1px solid rgba(0,164,233,0.3)', background: 'rgba(0,164,233,0.04)' }}>
              <h3 className="serif" style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#0070ba', marginBottom: 10 }}>
                Alipay Slip
              </h3>
              <a href={o.payment_slip_url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={o.payment_slip_url}
                  alt="Payment slip"
                  width={280}
                  height={200}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: 6, border: '1px solid var(--cream-dark)' }}
                  unoptimized
                />
              </a>
              {o.payment_slip_uploaded_at && (
                <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 8 }}>
                  ส่งเมื่อ {new Date(o.payment_slip_uploaded_at).toLocaleString('th-TH')}
                </div>
              )}
            </div>
          )}

          <div className="card" style={{ padding: 18 }}>
            <h3 className="serif" style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 10 }}>
              Stripe
            </h3>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', wordBreak: 'break-all', marginBottom: 6 }}>
              <strong>Session:</strong><br />
              {o.stripe_session_id || '—'}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', wordBreak: 'break-all' }}>
              <strong>Payment:</strong><br />
              {o.stripe_payment_id || '—'}
            </div>
            {o.stripe_payment_id && (
              <a
                href={`https://dashboard.stripe.com/payments/${o.stripe_payment_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text"
                style={{ padding: 0, fontSize: 11, marginTop: 8, display: 'inline-block' }}
              >
                View in Stripe →
              </a>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [data-grid="order"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function SumRow({ l, v }: { l: string; v: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13, color: 'var(--text-muted)' }}>
      <span>{l}</span>
      <span className="serif">{v}</span>
    </div>
  );
}
