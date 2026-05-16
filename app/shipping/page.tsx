import { Metadata } from 'next';
import ShippingContent from './ShippingContent';

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'Shipping information for Dan Siam Amulets. Domestic Thailand 2-3 days, Asia 5-7 days, worldwide 7-14 days. Full tracking and shipping insurance included.',
  keywords: ['Thai amulet shipping', 'amulet delivery', 'international shipping Thailand', 'ค่าจัดส่ง', '运费'],
  alternates: { canonical: '/shipping' },
  openGraph: {
    title: 'Shipping Policy · Dan Siam Amulets',
    description: 'Worldwide shipping for authentic Thai amulets. Thailand 2-3 days, Asia 5-7 days, worldwide 7-14 days.',
    url: '/shipping',
    type: 'website',
  },
};

export default function ShippingPage() {
  return <ShippingContent />;
}
