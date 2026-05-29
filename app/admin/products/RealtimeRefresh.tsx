'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function RealtimeRefresh({ tables = ['products'] }: { tables?: string[] }) {
  const router = useRouter();

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
