'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const KEY = 'dsa_recently_viewed';
const MAX = 12;

type Ctx = {
  ids: number[];
  add: (id: number) => void;
  clear: () => void;
};

const RecentlyViewedCtx = createContext<Ctx>({ ids: [], add: () => {}, clear: () => {} });

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) setIds(JSON.parse(s));
    } catch {}
  }, []);

  const add = useCallback((id: number) => {
    setIds(prev => {
      // Move to front, deduplicate, cap at MAX
      const next = [id, ...prev.filter(x => x !== id)].slice(0, MAX);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setIds([]);
    try { localStorage.removeItem(KEY); } catch {}
  }, []);

  return (
    <RecentlyViewedCtx.Provider value={{ ids, add, clear }}>
      {children}
    </RecentlyViewedCtx.Provider>
  );
}

export function useRecentlyViewed() { return useContext(RecentlyViewedCtx); }
