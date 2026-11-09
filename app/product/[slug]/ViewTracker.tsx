'use client';

import { useEffect } from 'react';

export default function ViewTracker({ productId }: { productId: number }) {
  useEffect(() => {
    if (!productId || typeof window === 'undefined') return;

    // Filter out bots, automated crawlers, and headless browsers
    if (navigator.webdriver) return;
    const ua = (navigator.userAgent || '').toLowerCase();
    if (/bot|crawl|spider|slurp|facebookexternalhit|bingpreview|headless|chrome-lighthouse|google|baidu|yandex/i.test(ua)) {
      return;
    }

    // Delay slightly to ensure user actually stays on the page (skip bounce bots)
    const timer = setTimeout(() => {
      try {
        const url = `/api/products/${productId}/view`;
        if (navigator.sendBeacon) {
          navigator.sendBeacon(url);
        } else {
          fetch(url, { method: 'POST', keepalive: true }).catch(() => {});
        }
      } catch {
        // Silently catch tracking errors
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [productId]);

  return null;
}
