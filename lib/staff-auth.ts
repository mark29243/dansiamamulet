import crypto from 'crypto';

const SECRET = process.env.STAFF_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || 'dansiam-staff-session-secret-salt-2026';

export function signStaffSession(): string {
  const timestamp = Date.now().toString();
  const payload = `staff:${timestamp}`;
  const hmac = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return `${payload}.${hmac}`;
}

export function verifyStaffSession(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  
  const [payload, hmac] = parts;
  const [prefix, timestamp] = payload.split(':');
  if (prefix !== 'staff' || !timestamp || !hmac) return false;

  const time = parseInt(timestamp, 10);
  // Valid for 30 days
  if (isNaN(time) || Date.now() - time > 30 * 24 * 60 * 60 * 1000) {
    return false;
  }

  const expectedHmac = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac));
  } catch {
    return false;
  }
}
