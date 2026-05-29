'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function Inner({ tables }: { tables: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Refresh every time the user navigates (path or search params change)
  useEffect(() => {
    router.refresh();
  }, [pathname, searchParams.toString()]);

  useEffect(() => {
    const refresh = () => router.refresh();

    const supabase = createClient();
    const channel = supabase.channel('admin-sync');
    tables.forEach((table) => {
      channel.on('postgres_changes', { event: '*', schema: 'public', table }, refresh);
    });
    channel.subscribe();

    const onVisible = () => { if (!document.hidden) refresh(); };
    document.addEventListener('visibilitychange', onVisible);
    const interval = setInterval(refresh, 30_000);

    return () => {
      supabase.removeChannel(channel);
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

  useEffect(() => {
    const refresh = () => router.refresh();

    // Realtime: instant update when another admin makes a change
    const supabase = createClient();
    const channel = supabase.channel('admin-sync');
    tables.forEach((table) => {
      channel.on('postgres_changes', { event: '*', schema: 'public', table }, refresh);
    });
    channel.subscribe();

    // Refresh when user comes back to this tab
    const onVisible = () => { if (!document.hidden) refresh(); };
    document.addEventListener('visibilitychange', onVisible);

    // Fallback poll every 30s
    const interval = setInterval(refresh, 30_000);

    return () => {
      supabase.removeChannel(channel);
      document.removeEventListener('visibilitychange', onVisible);
      clearInterval(interval);
    };
  }, []);

  return null;
}
