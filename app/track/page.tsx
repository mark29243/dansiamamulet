import type { Metadata } from 'next';
import TrackContent from './TrackContent';

export const metadata: Metadata = {
  title: 'Track Your Order · ติดตามพัสดุ · 追踪订单',
  robots: { index: false, follow: false },
};

export default function TrackPage() {
  return <TrackContent />;
}
