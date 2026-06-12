/**
 * Email service using Resend (https://resend.com)
 * Free tier: 3,000 emails/month
 * Setup: Sign up → API Keys → add RESEND_API_KEY to env
 *
 * Falls back silently if not configured — orders still work.
 */

import type { Order } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

const FROM = process.env.RESEND_FROM || 'Dan Siam Amulets <orders@dansiam.com>';
const RESEND_API = 'https://api.resend.com/emails';

export type EmailResult = { ok: true; id: string } | { ok: false; error: string };

/** Direct tracking link — pre-fills order number + email and auto-looks up */
function trackUrl(order: Order): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dansiamamulets.com';
  const orderNo = order.id.slice(0, 8).toUpperCase();
  return `${siteUrl}/track?order=${orderNo}&email=${encodeURIComponent(order.customer_email)}`;
}

async function send(to: string, subject: string, html: string): Promise<EmailResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('[email] RESEND_API_KEY not set — skipping email');
    return { ok: false, error: 'Email not configured' };
  }

  try {
    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM, to, subject, html }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error('[email] Resend error:', res.status, text);
      return { ok: false, error: `${res.status}: ${text}` };
    }
    const data = await res.json();
    return { ok: true, id: data.id };
  } catch (e: any) {
    console.error('[email] Send failed:', e);
    return { ok: false, error: e.message };
  }
}

export async function sendOrderConfirmation(order: Order): Promise<EmailResult> {
  const orderNo = order.id.slice(0, 8).toUpperCase();
  const itemsHtml = order.items
    .map(
      (i) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #EDE0C4;">
          <strong style="color:#2A1E06;">${escapeHtml(i.name)}</strong><br>
          <span style="color:#6B5730;font-size:13px;">Qty: ${i.qty}</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #EDE0C4;text-align:right;color:#8B6914;font-weight:600;">
          ${formatPrice(i.price * i.qty)}
        </td>
      </tr>`
    )
    .join('');

  const html = baseEmail(
    'Order Confirmation',
    `
    <p style="color:#2A1E06;font-size:16px;line-height:1.6;">
      Hi ${escapeHtml(order.customer_name || 'there')},
    </p>
    <p style="color:#6B5730;font-size:14px;line-height:1.7;">
      Thank you for your order — we've received your payment and are preparing your amulet${order.items.length > 1 ? 's' : ''} for shipment.
    </p>

    <div style="background:#F7F0E3;padding:20px;margin:24px 0;border-left:3px solid #C9A84C;">
      <div style="font-size:11px;color:#8B6914;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">Order Number</div>
      <div style="font-size:18px;font-weight:600;color:#8B6914;font-family:Georgia,serif;">#${orderNo}</div>
    </div>

    <table style="width:100%;border-collapse:collapse;margin:20px 0;">
      ${itemsHtml}
      <tr>
        <td style="padding:10px 0;color:#6B5730;font-size:13px;">Subtotal</td>
        <td style="padding:10px 0;text-align:right;color:#6B5730;">${formatPrice(order.subtotal)}</td>
      </tr>
      <tr>
        <td style="padding:6px 0;color:#6B5730;font-size:13px;">Shipping</td>
        <td style="padding:6px 0;text-align:right;color:#6B5730;">${order.shipping_cost === 0 ? 'FREE' : formatPrice(order.shipping_cost)}</td>
      </tr>
      <tr>
        <td style="padding:14px 0 6px;border-top:2px solid #C9A84C;color:#2A1E06;font-weight:600;text-transform:uppercase;letter-spacing:2px;font-size:12px;">Total</td>
        <td style="padding:14px 0 6px;border-top:2px solid #C9A84C;text-align:right;color:#8B6914;font-weight:600;font-size:20px;font-family:Georgia,serif;">${formatPrice(order.total)}</td>
      </tr>
    </table>

    <h3 style="color:#8B6914;font-family:Georgia,serif;font-size:14px;letter-spacing:3px;text-transform:uppercase;margin-top:28px;">Shipping To</h3>
    <p style="color:#6B5730;line-height:1.7;font-size:14px;">
      ${escapeHtml(order.customer_name || '')}<br>
      ${escapeHtml(order.shipping_address.line1)}<br>
      ${order.shipping_address.line2 ? escapeHtml(order.shipping_address.line2) + '<br>' : ''}
      ${escapeHtml(order.shipping_address.city)}, ${escapeHtml(order.shipping_address.postal_code)}<br>
      ${escapeHtml(order.shipping_address.country)}
    </p>

    <div style="text-align:center;margin:28px 0;">
      <a href="${trackUrl(order)}" style="display:inline-block;background:#C9A84C;color:#2A1E06;text-decoration:none;padding:12px 32px;font-size:14px;font-weight:600;border-radius:4px;">
        ติดตามสถานะออเดอร์ · Track Your Order
      </a>
    </div>

    <p style="color:#6B5730;font-size:13px;line-height:1.7;margin-top:32px;">
      We'll send you another email with tracking info once your order ships.
      Questions? Reply to this email or contact us at <a href="mailto:info@dansiam.com" style="color:#8B6914;">info@dansiam.com</a>.
    </p>
    `
  );

  return send(order.customer_email, `Order #${orderNo} confirmed — Dan Siam Amulets`, html);
}

export async function sendAdminOrderNotification(order: Order): Promise<EmailResult> {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return { ok: false, error: 'ADMIN_EMAIL not set' };

  const orderNo = order.id.slice(0, 8).toUpperCase();
  const itemsHtml = order.items
    .map((i) => `<tr><td style="padding:8px 0;border-bottom:1px solid #EDE0C4;color:#2A1E06;">${escapeHtml(i.name)} ×${i.qty}</td><td style="padding:8px 0;border-bottom:1px solid #EDE0C4;text-align:right;color:#8B6914;font-weight:600;">${formatPrice(i.price * i.qty)}</td></tr>`)
    .join('');

  const addr = order.shipping_address;
  const html = baseEmail(
    'New Order!',
    `
    <p style="color:#2A1E06;font-size:18px;font-weight:600;">🛒 New Order #${orderNo}</p>
    <p style="color:#6B5730;font-size:14px;">
      <strong>${escapeHtml(order.customer_name || '')}</strong><br>
      ${escapeHtml(order.customer_email)}<br>
      ${order.customer_phone ? escapeHtml(order.customer_phone) : ''}
    </p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      ${itemsHtml}
      <tr><td style="padding:10px 0;border-top:2px solid #C9A84C;font-weight:600;color:#2A1E06;">Total</td><td style="padding:10px 0;border-top:2px solid #C9A84C;text-align:right;color:#8B6914;font-weight:600;font-size:18px;">${formatPrice(order.total)}</td></tr>
    </table>
    <p style="color:#6B5730;font-size:14px;line-height:1.7;">
      <strong>Ship to:</strong><br>
      ${escapeHtml(addr.line1)}${addr.line2 ? ', ' + escapeHtml(addr.line2) : ''}<br>
      ${escapeHtml(addr.city)} ${escapeHtml(addr.postal_code)}, ${escapeHtml(addr.country)}
    </p>
    `
  );

  return send(adminEmail, `🛒 New Order #${orderNo} — ฿${(order.total / 100).toLocaleString()}`, html);
}

export async function sendOrderShipped(order: Order, tracking: string, carrier: string): Promise<EmailResult> {
  const orderNo = order.id.slice(0, 8).toUpperCase();
  const html = baseEmail(
    'Your order has shipped',
    `
    <p style="color:#2A1E06;font-size:16px;">
      Hi ${escapeHtml(order.customer_name || 'there')},
    </p>
    <p style="color:#6B5730;font-size:14px;line-height:1.7;">
      Good news! Your order <strong>#${orderNo}</strong> is on its way.
    </p>
    <div style="background:#F7F0E3;padding:20px;margin:24px 0;border-left:3px solid #2D5A3D;">
      <div style="font-size:11px;color:#2D5A3D;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Tracking</div>
      <div style="font-size:13px;color:#6B5730;margin-bottom:6px;">Carrier: <strong>${escapeHtml(carrier)}</strong></div>
      <div style="font-size:16px;font-weight:600;color:#8B6914;font-family:monospace;">${escapeHtml(tracking)}</div>
    </div>
    <div style="text-align:center;margin:28px 0;">
      <a href="${trackUrl(order)}" style="display:inline-block;background:#C9A84C;color:#2A1E06;text-decoration:none;padding:12px 32px;font-size:14px;font-weight:600;border-radius:4px;">
        ติดตามสถานะออเดอร์ · Track Your Order
      </a>
    </div>
    <p style="color:#6B5730;font-size:13px;">
      Thank you for shopping with us 🙏
    </p>
    `
  );
  return send(order.customer_email, `Your order #${orderNo} has shipped`, html);
}

function baseEmail(title: string, body: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#F7F0E3;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F0E3;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border:1px solid #EDE0C4;">
        <tr>
          <td style="background:#1A1208;padding:24px;text-align:center;">
            <h1 style="color:#C9A84C;margin:0;font-family:Georgia,serif;font-style:italic;font-size:24px;letter-spacing:2px;">Dan Siam Amulets</h1>
            <div style="color:#6B5730;font-size:10px;letter-spacing:3px;margin-top:6px;">AUTHENTIC SACRED THAI AMULETS</div>
          </td>
        </tr>
        <tr><td style="padding:32px;">
          ${body}
        </td></tr>
        <tr>
          <td style="background:#1A1208;padding:18px;text-align:center;color:#3A2A10;font-size:11px;">
            © 2025 Dan Siam Amulets · 🇹🇭 Made in Thailand<br>
            <a href="mailto:info@dansiam.com" style="color:#6B5730;text-decoration:none;">info@dansiam.com</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
