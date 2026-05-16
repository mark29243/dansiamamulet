import { Metadata } from 'next';
import ReturnsContent from './ReturnsContent';

export const metadata: Metadata = {
  title: 'Returns & Authenticity Guarantee',
  description: '100% authenticity guarantee on all Thai amulets. Returns accepted within 7 days of delivery. Every amulet verified by experts with 20+ years of experience.',
  keywords: ['amulet return policy', 'Thai amulet guarantee', 'authenticity certificate', 'นโยบายคืนสินค้า', '退货政策'],
  alternates: { canonical: '/returns' },
  openGraph: {
    title: 'Returns & Authenticity Guarantee · Dan Siam Amulets',
    description: '100% authenticity guarantee. Returns accepted within 7 days of delivery.',
    url: '/returns',
    type: 'website',
  },
};

export default function ReturnsPage() {
  return <ReturnsContent />;
}
