'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const FALLBACK: Record<string, number> = { USD: 0.028, CNY: 0.20 };

type CurrencyCtx = { rates: Record<string, number>; ready: boolean };
const Ctx = createContext<CurrencyCtx>({ rates: FALLBACK, ready: false });

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [rates, setRates] = useState(FALLBACK);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/THB')
      .then((r) => r.json())
      .then((d) => { if (d.rates) { setRates(d.rates); setReady(true); } })
      .catch(() => setReady(true));
  }, []);

  return <Ctx.Provider value={{ rates, ready }}>{children}</Ctx.Provider>;
}

export function useCurrency() { return useContext(Ctx); }

export function useLocalPrice(satang: number, lang: 'th' | 'en' | 'zh'): string {
  const { rates } = useCurrency();
  const baht = satang / 100;
  if (lang === 'th') return `฿${new Intl.NumberFormat('th-TH').format(baht)}`;
  if (lang === 'zh') {
    const cny = baht * (rates['CNY'] || 0.20);
    return `¥${new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 }).format(cny)}`;
  }
  const usd = baht * (rates['USD'] || 0.028);
  return `$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(usd)}`;
}
