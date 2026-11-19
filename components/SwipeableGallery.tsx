'use client';

import { useEffect, useRef, useState } from 'react';
import SafeImage from './SafeImage';
import { IcoAmulet } from './icons';

interface SwipeableGalleryProps {
  images: string[];
  alt: string;
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  onImageClick?: () => void;
  sizes?: string;
  aspectRatio?: string;
  minHeight?: number;
  background?: string;
  borderRadius?: string;
  cursor?: string;
  overlay?: React.ReactNode;
}

/**
 * Horizontal swipe/drag image gallery with CSS scroll-snap and no overlay navigation arrows.
 * Supports touch swipe on mobile, horizontal scroll on trackpads, and mouse drag on desktop.
 */
export default function SwipeableGallery({
  images,
  alt,
  activeIndex,
  onChangeIndex,
  onImageClick,
  sizes = '(max-width: 768px) 100vw, 500px',
  aspectRatio,
  minHeight,
  background = 'linear-gradient(135deg, var(--cream-dark), var(--cream-darker))',
  borderRadius,
  cursor = 'grab',
  overlay,
}: SwipeableGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const scrollingFromProp = useRef(false);

  // Sync scroll position when activeIndex changes externally (e.g., thumbnail click)
  useEffect(() => {
    const el = trackRef.current;
    if (!el || images.length <= 1) return;
    const width = el.clientWidth;
    if (!width) return;
    const currentIdx = Math.round(el.scrollLeft / width);
    if (currentIdx !== activeIndex) {
      scrollingFromProp.current = true;
      el.scrollTo({ left: activeIndex * width, behavior: 'smooth' });
      const timer = setTimeout(() => { scrollingFromProp.current = false; }, 400);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, images.length]);

  function handleScroll() {
    if (scrollingFromProp.current) return;
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    const clamped = Math.max(0, Math.min(images.length - 1, idx));
    if (clamped !== activeIndex) {
      onChangeIndex(clamped);
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    if (e.button !== 0 || images.length <= 1) return;
    const el = trackRef.current;
    if (!el) return;
    dragState.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    setIsDragging(true);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragState.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 5) dragState.current.moved = true;
    el.scrollLeft = dragState.current.startScroll - dx;
  }

  function endMouseDrag() {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    setIsDragging(false);
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    const idx = Math.max(0, Math.min(images.length - 1, Math.round(el.scrollLeft / el.clientWidth)));
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
    if (idx !== activeIndex) onChangeIndex(idx);
  }

  function handleClick() {
    if (dragState.current.moved) {
      dragState.current.moved = false;
      return;
    }
    onImageClick?.();
  }

  return (
    <div
      style={{
        width: '100%',
        height: aspectRatio ? undefined : '100%',
        aspectRatio,
        minHeight,
        background,
        borderRadius,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {images.length > 0 ? (
        <div
          ref={trackRef}
          className="no-scrollbar"
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={endMouseDrag}
          onMouseLeave={endMouseDrag}
          onClick={handleClick}
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            overflowX: images.length > 1 ? 'auto' : 'hidden',
            overflowY: 'hidden',
            scrollSnapType: isDragging ? 'none' : 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            userSelect: 'none',
            cursor: isDragging ? 'grabbing' : cursor,
          }}
        >
          {images.map((url, i) => (
            <div
              key={`${url}-${i}`}
              style={{
                flex: '0 0 100%',
                width: '100%',
                height: '100%',
                position: 'relative',
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always',
              }}
            >
              <SafeImage
                src={url}
                alt={i === 0 ? alt : `${alt} — ${i + 1}`}
                fill
                sizes={sizes}
                style={{ objectFit: 'contain', pointerEvents: 'none' }}
                draggable={false}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--gold-dark)', opacity: 0.4 }}>
          <IcoAmulet size={80} />
        </div>
      )}
      {overlay}
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
