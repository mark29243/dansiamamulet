import { createHmac, timingSafeEqual } from 'crypto';

// HMAC-signed token gating shipping-label URLs. Anyone with the link can view
// the label (LINE-share workflow), but the link is now unforgeable without the
// server secret instead of relying on the order UUID alone.
function secret(): string {
  const s = process.env.LABEL_LINK_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!s) throw new Error('No secret available for label tokens');
  return s;
}

export function labelToken(orderId: string): string {
  return createHmac('sha256', secret()).update(`label:${orderId}`).digest('hex').slice(0, 32);
}

export function verifyLabelToken(orderId: string, token: string | null | undefined): boolean {
  if (!token) return false;
  const expected = labelToken(orderId);
  if (token.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}
