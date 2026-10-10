'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';
import type { CartItem } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';

type CartCtx = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: number) => void;
  setQty: (productId: number, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  hydrated: boolean;
};

const CartContext = createContext<CartCtx>({
  items: [],
  add: () => {},
  remove: () => {},
  setQty: () => {},
  clear: () => {},
  count: 0,
  subtotal: 0,
  hydrated: false,
});

const KEY = 'dansiam_cart';

// Helper to merge two item lists by product_id
function mergeItems(local: CartItem[], remote: CartItem[]): CartItem[] {
  const map = new Map<number, CartItem>();
  for (const item of remote) {
    map.set(item.product_id, { ...item });
  }
  for (const item of local) {
    if (map.has(item.product_id)) {
      const existing = map.get(item.product_id)!;
      map.set(item.product_id, { ...existing, qty: Math.max(existing.qty, item.qty) });
    } else {
      map.set(item.product_id, { ...item });
    }
  }
  return Array.from(map.values());
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const userIdRef = useRef<string | null>(null);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with remote DB cart
  const syncWithRemote = useCallback(async (uid: string, currentLocal: CartItem[]) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('carts')
        .select('items')
        .eq('user_id', uid)
        .maybeSingle();

      if (!error && data?.items) {
        const remoteItems = (data.items as CartItem[]) || [];
        const merged = mergeItems(currentLocal, remoteItems);
        setItems(merged);
        try {
          localStorage.setItem(KEY, JSON.stringify(merged));
        } catch {}
        if (merged.length > 0 && merged.length !== remoteItems.length) {
          await supabase.from('carts').upsert({
            user_id: uid,
            items: merged,
            updated_at: new Date().toISOString(),
          });
        }
      } else if (currentLocal.length > 0) {
        await supabase.from('carts').upsert({
          user_id: uid,
          items: currentLocal,
          updated_at: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.warn('[Cart] remote sync failed:', e);
    }
  }, []);

  // 1. Initial hydration from localStorage & check auth
  useEffect(() => {
    let localItems: CartItem[] = [];
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) localItems = JSON.parse(saved);
    } catch {}

    setItems(localItems);
    setHydrated(true);

    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.id) {
        userIdRef.current = user.id;
        syncWithRemote(user.id, localItems);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const newUserId = session?.user?.id ?? null;
      userIdRef.current = newUserId;
      if (newUserId && (event === 'SIGNED_IN' || event === 'USER_UPDATED')) {
        syncWithRemote(newUserId, localItems);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [syncWithRemote]);

  // 2. Persist to localStorage and DB whenever items change
  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}

    if (userIdRef.current) {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
      const uid = userIdRef.current;
      syncTimeoutRef.current = setTimeout(() => {
        const supabase = createClient();
        supabase
          .from('carts')
          .upsert({
            user_id: uid,
            items,
            updated_at: new Date().toISOString(),
          })
          .then();
      }, 500);
    }
  }, [items, hydrated]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === item.product_id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === item.product_id ? { ...i, qty: i.qty + item.qty } : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const remove = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.product_id !== productId));
  }, []);

  const setQty = useCallback((productId: number, qty: number) => {
    if (qty < 1) return remove(productId);
    setItems((prev) => prev.map((i) => (i.product_id === productId ? { ...i, qty } : i)));
  }, [remove]);

  const clear = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(KEY);
    } catch {}
    if (userIdRef.current) {
      const supabase = createClient();
      supabase
        .from('carts')
        .upsert({
          user_id: userIdRef.current,
          items: [],
          updated_at: new Date().toISOString(),
        })
        .then();
    }
  }, []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, subtotal, hydrated }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

