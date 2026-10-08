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
    let lastRefresh = Date.now();
    const refresh = () => {
      // Never refresh if the tab is hidden or minimized
      if (typeof document !== 'undefined' && document.hidden) return;
      // Throttle: don't refresh if called within last 15 seconds
      if (Date.now() - lastRefresh < 15_000) return;
      lastRefresh = Date.now();
      router.refresh();
    };

    // Realtime WebSocket — only notifies when an actual change happens
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
      // WebSocket unavailable
    }

    // Refresh ONLY when user switches back to this tab
    const onVisible = () => { 
      if (typeof document !== 'undefined' && !document.hidden) {
        refresh();
      }
    };
    document.addEventListener('visibilitychange', onVisible);

    // Fallback: poll every 3 minutes (180s) ONLY when tab is actively visible
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && !document.hidden) {
        refresh();
      }
    }, 180_000);

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
