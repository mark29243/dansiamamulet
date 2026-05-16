import type { Metadata } from 'next';
import SearchPageContent from './SearchContent';

export const metadata: Metadata = {
  title: 'Search Amulets · ค้นหาพระเครื่อง · 搜索佛牌',
  description: 'Search our full collection of authentic Thai Buddhist amulets by name, category, or keyword.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  return <SearchPageContent />;
}
