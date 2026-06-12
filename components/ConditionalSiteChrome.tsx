'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import QuickContact from './QuickContact';

export default function ConditionalSiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') || pathname?.startsWith('/print');

  if (isAdmin) {
    return (
      <main id="main" style={{ minHeight: '100vh' }}>
        {children}
      </main>
    );
  }

  return (
    <>
      <Header />
      <main id="main" style={{ minHeight: 'calc(100vh - 280px)' }}>
        {children}
      </main>
      <Footer />
      <QuickContact />
    </>
  );
}
