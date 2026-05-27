'use client';

import { useLang } from '@/components/LangProvider';

interface Props {
  name_th: string;
  name: string;
}

export default function AdminProductName({ name_th, name }: Props) {
  const { lang } = useLang();
  // zh uses English name (romanized), th uses Thai, en uses English
  const display = lang === 'th' ? (name_th || name) : (name || name_th);
  return <span>{display.slice(0, 50)}{display.length > 50 ? '...' : ''}</span>;
}
