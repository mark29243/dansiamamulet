'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ENV_CNY = parseFloat(process.env.NEXT_PUBLIC_CNY_RATE || '0');
const FALLBACK: Record<string, number> = { USD: 0.028, CNY: ENV_CNY > 0 ? ENV_CNY : 0.20 };

type CurrencyCtx = { rates: Record<string, number> };
const Ctx = createContext<CurrencyCtx>({ rates: FALLBACK });

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [rates, setRates] = useState(FALLBACK);

  useEffect(() => {
    if (ENV_CNY > 0) return; // use fixed rate from env var — same as checkout
    fetch('https://open.er-api.com/v6/latest/THB')
      .then((r) => r.json())
      .then((d) => { if (d?.rates) setRates(d.rates); })
      .catch(() => {});
  }, []);

  return <Ctx.Provider value={{ rates }}>{children}</Ctx.Provider>;
}

export function useCurrency() { return useContext(Ctx); }

export function useLocalPrice(satang: number, lang: string): string {
  const { rates } = useCurrency();
  const baht = satang / 100;
  if (lang === 'th') return `฿${new Intl.NumberFormat('th-TH').format(baht)}`;
  if (lang === 'zh') {
    const cny = baht * (rates['CNY'] ?? 0.20);
    return `¥${new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 }).format(cny)}`;
  }
  const usd = baht * (rates['USD'] ?? 0.028);
  return `$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(usd)}`;
}
