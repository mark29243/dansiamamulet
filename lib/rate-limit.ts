import { createAdminClient } from '@/lib/supabase/server';

/**
 * Durable rate limiter backed by Supabase (rate_limit_hit RPC), shared across
 * all serverless instances. Falls back to per-instance in-memory counting if
 * the database call fails, so an outage never blocks legitimate traffic.
 */

type Entry = { count: number; resetAt: number };
const memStore = new Map<string, Entry>();

function memoryLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = memStore.get(key);
  if (!entry || now >= entry.resetAt) {
    memStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

/**
 * @param key      e.g. `checkout:1.2.3.4`
 * @param limit    max calls per window
 * @param windowMs window size in ms (default 1 hour)
 * @returns true if allowed, false if rate limited
 */
export async function rateLimit(key: string, limit: number, windowMs = 60 * 60 * 1000): Promise<boolean> {
  // Fast local rejection: if this instance alone has exceeded the limit,
  // no need to ask the database.
  if (!memoryLimit(key, limit, windowMs)) return false;

  try {
    const admin = createAdminClient();
    const { data, error } = await admin.rpc('rate_limit_hit', {
      p_key: key,
      p_limit: limit,
      p_window_ms: windowMs,
    });
    if (error) {
      console.error('[rate-limit] RPC error, falling back to memory:', error.message);
      return true; // memoryLimit already passed above
    }
    return data === true;
  } catch (e: any) {
    console.error('[rate-limit] failed, falling back to memory:', e?.message);
    return true;
  }
}

/** Extract client IP from request headers (Vercel / standard proxies) */
export function getIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}
