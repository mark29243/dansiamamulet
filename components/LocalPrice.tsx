'use client';
import { useLocalPrice } from './CurrencyProvider';

export default function LocalPrice({ satang, lang }: { satang: number; lang: string }) {
  const price = useLocalPrice(satang, lang);
  return <span className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--gold-dark)' }}>{price}</span>;
}
