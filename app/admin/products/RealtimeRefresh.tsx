'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function Inner({ tables }: { tables: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Refresh on every navigation (path or search params change)
  useEffect(() => {
    router.refresh();
  }, [pathname, searchParams.toString()]);

  useEffect(() => {
    const refresh = () => router.refresh();

    // Realtime WebSocket — may fail on iOS Safari (SecurityError: The operation is insecure)
    // Wrap in try-catch so it degrades gracefully; fallback refreshes still work below
    let cleanupRealtime: (() => void) | null = null;
    try {
      const supabase = createClient();
      const channel = supabase.channel('admin-sync');
      tables.forEach((table) => {
        channel.on('postgres_changes', { event: '*', schema: 'public', table }, refresh);
      });
      channel.subscribe();
      cleanupRealtime = () => supabase.removeChannel(channel);
    } catch {
      // WebSocket unavailable — realtime disabled, interval/visibilitychange still active
    }

    // Fallback: refresh on tab focus + every 30s (works on all browsers)
    const onVisible = () => { if (!document.hidden) refresh(); };
    document.addEventListener('visibilitychange', onVisible);
    const interval = setInterval(refresh, 30_000);

    return () => {
      cleanupRealtime?.();
      document.removeEventListener('visibilitychange', onVisible);
      clearInterval(interval);
    };
  }, []);

  return null;
}

export default function RealtimeRefresh({ tables = ['products'] }: { tables?: string[] }) {
  return (
    <Suspense>
      <Inner tables={tables} />
    </Suspense>
  );
}
