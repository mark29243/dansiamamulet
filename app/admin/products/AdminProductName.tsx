'use client';

import { useLang } from '@/components/LangProvider';
import { useLocalPrice } from '@/components/CurrencyProvider';
import { getCatName } from '@/lib/i18n';
import type { Lang } from '@/lib/types';

interface NameProps { name_th: string; name: string; }
interface CatProps  { category: string; }
interface PriceProps { satang: number; }

export function AdminProductName({ name_th, name }: NameProps) {
  const { lang } = useLang();
  const display = lang === 'th' ? (name_th || name) : (name || name_th);
  return <span>{display.slice(0, 50)}{display.length > 50 ? '...' : ''}</span>;
}

export function AdminProductCategory({ category }: CatProps) {
  const { lang } = useLang();
  return <span>{getCatName(category, lang as Lang)}</span>;
}

export function AdminProductPrice({ satang }: PriceProps) {
  const { lang } = useLang();
  return <span>{useLocalPrice(satang, lang)}</span>;
}
