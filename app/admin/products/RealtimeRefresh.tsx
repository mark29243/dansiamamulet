'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function RealtimeRefresh({ tables = ['products'] }: { tables?: string[] }) {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel('admin-sync');

    tables.forEach((table) => {
      channel.on('postgres_changes', { event: '*', schema: 'public', table }, () => {
        router.refresh();
      });
    });

    channel.subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return null;
}
