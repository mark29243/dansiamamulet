'use client';

import { useWishlist } from './WishlistProvider';

export default function WishlistButton({
  productId,
  size = 16,
  style,
}: {
  productId: number;
  size?: number;
  style?: React.CSSProperties;
}) {
  const { toggle, isWishlisted } = useWishlist();
  const liked = isWishlisted(productId);

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(productId); }}
      aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
      title={liked ? 'Remove from wishlist' : 'Add to wishlist'}
      style={{
        background: liked ? 'rgba(122,26,26,0.92)' : 'rgba(255,255,255,0.92)',
        border: '1px solid ' + (liked ? 'transparent' : 'var(--cream-dark)'),
        borderRadius: '50%',
        width: size + 14,
        height: size + 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        color: liked ? '#fff' : '#A89868',
        flexShrink: 0,
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={liked ? 0 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
