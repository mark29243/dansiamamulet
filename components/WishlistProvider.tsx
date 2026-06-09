'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

type WishlistCtx = {
  items: number[];
  toggle: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  count: number;
};

const Ctx = createContext<WishlistCtx>({
  items: [],
  toggle: () => {},
  isWishlisted: () => false,
  count: 0,
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    try {
      const s = localStorage.getItem('dsa_wishlist');
      if (s) setItems(JSON.parse(s));
    } catch {}
  }, []);

  const toggle = useCallback((id: number) => {
    setItems(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try { localStorage.setItem('dsa_wishlist', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const isWishlisted = useCallback((id: number) => items.includes(id), [items]);

  return (
    <Ctx.Provider value={{ items, toggle, isWishlisted, count: items.length }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWishlist() { return useContext(Ctx); }
