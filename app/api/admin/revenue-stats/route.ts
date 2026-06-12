import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

async function requireAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const admin = createAdminClient();
  const { data } = await admin.from('admins').select('role').eq('user_id', user.id).single();
  return data ? admin : null;
}

type Row = { created_at: string; total: number };
type Bucket = { label: string; count: number; revenue: number; from: string; to: string };

function toLocal(date: Date) {
  return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
}

function localMidnightToUTC(y: number, m: number, d: number): string {
  return new Date(Date.UTC(y, m - 1, d, -7, 0, 0)).toISOString();
}

function byDay(rows: Row[], days: number): Bucket[] {
  const counts: Record<string, number> = {};
  const revenues: Record<string, number> = {};
  rows.forEach(r => {
    const d = toLocal(new Date(r.created_at));
    const k = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    counts[k] = (counts[k] ?? 0) + 1;
    revenues[k] = (revenues[k] ?? 0) + r.total;
  });
  return Array.from({ length: days }, (_, i) => {
    const d = toLocal(new Date(Date.now() - (days - 1 - i) * 86400000));
    const y = d.getFullYear(), m = d.getMonth() + 1, day = d.getDate();
    const k = `${y}-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return { label: `${day}/${m}`, count: counts[k] ?? 0, revenue: revenues[k] ?? 0, from: localMidnightToUTC(y, m, day), to: localMidnightToUTC(y, m, day + 1) };
  });
}

function byWeek(rows: Row[], weeks: number): Bucket[] {
  const counts: Record<string, number> = {};
  const revenues: Record<string, number> = {};
  rows.forEach(r => {
    const d = toLocal(new Date(r.created_at));
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    const k = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    counts[k] = (counts[k] ?? 0) + 1;
    revenues[k] = (revenues[k] ?? 0) + r.total;
  });
  return Array.from({ length: weeks }, (_, i) => {
    const d = toLocal(new Date(Date.now() - (weeks - 1 - i) * 7 * 86400000));
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    const y = d.getFullYear(), m = d.getMonth() + 1, day = d.getDate();
    const k = `${y}-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return { label: `${day}/${m}`, count: counts[k] ?? 0, revenue: revenues[k] ?? 0, from: localMidnightToUTC(y, m, day), to: localMidnightToUTC(y, m, day + 7) };
  });
}

function byMonth(rows: Row[], months: number): Bucket[] {
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const counts: Record<string, number> = {};
  const revenues: Record<string, number> = {};
  rows.forEach(r => {
    const d = toLocal(new Date(r.created_at));
    const k = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    counts[k] = (counts[k] ?? 0) + 1;
    revenues[k] = (revenues[k] ?? 0) + r.total;
  });
  return Array.from({ length: months }, (_, i) => {
    const d = toLocal(new Date());
    d.setDate(1);
    d.setMonth(d.getMonth() - (months - 1 - i));
    const y = d.getFullYear(), m = d.getMonth() + 1;
    const k = `${y}-${String(m).padStart(2,'0')}`;
    const nd = new Date(d); nd.setMonth(nd.getMonth() + 1);
    return { label: MONTHS[m - 1], count: counts[k] ?? 0, revenue: revenues[k] ?? 0, from: localMidnightToUTC(y, m, 1), to: localMidnightToUTC(nd.getFullYear(), nd.getMonth() + 1, 1) };
  });
}

export async function GET(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const period = (new URL(req.url).searchParams.get('period') ?? 'day') as 'day' | 'week' | 'month';

  const since = period === 'day'
    ? new Date(Date.now() - 14 * 86400000)
    : period === 'week'
      ? new Date(Date.now() - 84 * 86400000)
      : new Date(Date.now() - 366 * 86400000);

  const { data: rows } = await admin
    .from('orders')
    .select('created_at, total')
    .eq('status', 'paid')
    .gte('created_at', since.toISOString());

  const buckets = period === 'day' ? byDay(rows ?? [], 14)
    : period === 'week' ? byWeek(rows ?? [], 12)
    : byMonth(rows ?? [], 12);

  const total_revenue = buckets.reduce((s, b) => s + b.revenue, 0);
  const total_orders  = buckets.reduce((s, b) => s + b.count, 0);
  return NextResponse.json({ period, buckets, total_revenue, total_orders });
}
