import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Dan Siam Amulets was founded to connect the rich tradition of Thai Buddhist amulets with devotees worldwide. Authentic amulets sourced directly from renowned temples across Thailand.',
  keywords: ['about Dan Siam', 'Thai amulet authenticity', 'Buddhist amulet shop', 'เกี่ยวกับเรา', '关于我们', 'Thai amulet certificate'],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Dan Siam Amulets · Our Story',
    description: 'Founded to connect the rich tradition of Thai Buddhist amulets with devotees worldwide. Every amulet is personally sourced from renowned temples across Thailand.',
    url: '/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
