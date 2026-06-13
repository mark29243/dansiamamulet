'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

function playNotificationSound() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = 'sine';
    gain.gain.value = 0.15;
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.stop(ctx.currentTime + 0.5);
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.frequency.value = 1175;
      osc2.type = 'sine';
      gain2.gain.value = 0.15;
      osc2.start();
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
      osc2.stop(ctx.currentTime + 1);
    }, 200);
  } catch {}
}

export default function OrderNotifier({ onNewOrders }: { onNewOrders: (count: number) => void }) {
  const countRef = useRef(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    async function init() {
      try {
        const supabase = createClient();

        const { count } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .in('status', ['pending', 'paid']);

        countRef.current = count ?? 0;
        onNewOrders(countRef.current);
        initializedRef.current = true;

        const channel = supabase
          .channel('order-notify')
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, () => {
            countRef.current += 1;
            onNewOrders(countRef.current);
            playNotificationSound();
          })
          .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, async () => {
            const { count: newCount } = await supabase
              .from('orders')
              .select('*', { count: 'exact', head: true })
              .in('status', ['pending', 'paid']);
            countRef.current = newCount ?? 0;
            onNewOrders(countRef.current);
          })
          .subscribe();

        cleanup = () => supabase.removeChannel(channel);
      } catch {}
    }

    init();
    return () => { cleanup?.(); };
  }, []);

  return null;
}
