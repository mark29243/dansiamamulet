'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';
import { IcoPackage } from '@/components/icons';
import type { Order } from '@/lib/types';

type Status = Order['status'];
const STATUSES: Status[] = ['pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded'];

export default function OrderActions({ order }: { order: Order }) {
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState<Status>(order.status);
  const [tracking, setTracking] = useState(order.tracking_number || '');
  const [trackingUrl, setTrackingUrl] = useState(order.tracking_url || '');
  const [carrier, setCarrier] = useState(order.carrier || '');
  const [busy, setBusy] = useState(false);
  const [showShip, setShowShip] = useState(false);

  async function updateStatus(newStatus: Status, sendEmail = false) {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, sendEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setStatus(newStatus);
      toast(`Status updated to ${newStatus}`, 'success');
      router.refresh();
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setBusy(false);
    }
  }

  async function markShipped(e: React.FormEvent) {
    e.preventDefault();
    if (!tracking || !carrier || !trackingUrl) {
      toast('Tracking number, link, and carrier are required', 'error');
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'shipped', tracking_number: tracking, tracking_url: trackingUrl, carrier, sendEmail: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setStatus('shipped');
      setShowShip(false);
      toast('Marked as shipped + email sent', 'success');
      router.refresh();
    } catch (e: any) {
      toast(e.message, 'error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8, flexDirection: 'column', alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="serif" style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status:</span>
        <select
          value={status}
          onChange={(e) => updateStatus(e.target.value as Status, false)}
          disabled={busy}
          className="input"
          style={{ width: 'auto', padding: '6px 10px', fontSize: 12, textTransform: 'capitalize' }}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {status === 'paid' && !showShip && (
        <button onClick={() => setShowShip(true)} className="btn-outline" style={{ padding: '8px 16px', fontSize: 11 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><IcoPackage size={13} /> Mark Shipped + Email Customer</span>
        </button>
      )}

      {showShip && (
        <form onSubmit={markShipped} className="card" style={{ padding: 16, marginTop: 8, minWidth: 280 }}>
          <div className="serif" style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 12 }}>
            Shipping Info
          </div>
          <label className="label">Carrier (Courier) *</label>
          <input className="input" value={carrier} onChange={(e) => setCarrier(e.target.value)} placeholder="Thailand Post, FedEx..." style={{ marginBottom: 10 }} />
          <label className="label">Tracking Number *</label>
          <input className="input" value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="LP1201..." style={{ marginBottom: 10 }} />
          <label className="label">Tracking Link *</label>
          <input className="input" value={trackingUrl} onChange={(e) => setTrackingUrl(e.target.value)} placeholder="https://track..." style={{ marginBottom: 12 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit" className="btn-gold" disabled={busy} style={{ flex: 1, padding: '10px 14px', fontSize: 11 }}>
              {busy ? '...' : 'Ship + Email'}
            </button>
            <button type="button" onClick={() => setShowShip(false)} className="btn-outline" style={{ padding: '10px 14px', fontSize: 11 }}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
