'use client';

import { Home } from '../src/components/Home';
import { Header } from '../src/components/Header';
import { Footer } from '../src/components/Footer';
import { TopBanner } from '../src/components/TopBanner';
import { ScrollToTop } from '../src/components/ScrollToTop';
import '../src/i18n/config';

export default function HomePage() {
  return (
    <>
      <TopBanner />
      <Header />
      <Home />
      <Footer />
      <ScrollToTop />
    </>
  );
}
