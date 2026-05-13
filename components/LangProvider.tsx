'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Lang } from '@/lib/types';

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LangContext = createContext<LangCtx>({ lang: 'en', setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('lang')) as Lang | null;
    if (saved && ['th', 'en', 'zh'].includes(saved)) setLangState(saved);
    else {
      // auto-detect from browser
      const bl = navigator.language.toLowerCase();
      if (bl.startsWith('th')) setLangState('th');
      else if (bl.startsWith('zh')) setLangState('zh');
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem('lang', l);
    document.documentElement.lang = l;
  };

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
