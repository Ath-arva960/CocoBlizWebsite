import { useState, useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Loader } from '@/components/Loader';
import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar';
import { Seo } from '@/components/Seo';
import { Hero } from '@/sections/Hero';
import { MarqueeStrip } from '@/sections/MarqueeStrip';
import { HorizontalScroll } from '@/sections/HorizontalScroll';
import { StickySection } from '@/sections/StickySection';
import { VideoShowcase } from '@/sections/VideoShowcase';
import { About } from '@/sections/About';
import { Services } from '@/sections/Services';
import { ProjectShowcase } from '@/sections/ProjectShowcase';
import { GalleryCarousel } from '@/sections/GalleryCarousel';
import { Testimonials } from '@/sections/Testimonials';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://cocoblitz.com').replace(/\/$/, '');

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cocoblitz',
  url: siteUrl,
  logo: `${siteUrl}/featured-virgin-oil.svg`,
  description:
    'Cocoblitz crafts premium coconut products including virgin coconut oil, fresh coconut water, and small-batch tropical treats.',
  email: 'hello@cocoblitz.com',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'hello@cocoblitz.com',
  },
  sameAs: [
    'https://www.instagram.com/',
    'https://www.facebook.com/',
    'https://x.com/',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Cocoblitz',
  url: siteUrl,
  description:
    'Premium coconut oil, coconut water, and artisanal coconut products sourced from tropical groves.',
  publisher: {
    '@type': 'Organization',
    name: 'Cocoblitz',
  },
};

function App() {
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  useSmoothScroll();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setStarted(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      <Seo
        title="Cocoblitz | Premium Coconut Oil, Water & Natural Treats"
        description="Discover premium coconut oil, cold-pressed virgin oil, fresh coconut water, and small-batch tropical treats from Cocoblitz."
        canonical={`${siteUrl}/`}
        image={`${siteUrl}/featured-virgin-oil.svg`}
        type="website"
        structuredData={[organizationSchema, websiteSchema]}
      />
      <Loader onComplete={() => setLoading(false)} />
      <CustomCursor />
      <Navbar />

      <main className="relative">
        <Hero started={started} />
        <MarqueeStrip />
        <HorizontalScroll />
        <StickySection />
        <VideoShowcase />
        <About />
        <Services />
        <ProjectShowcase />
        <GalleryCarousel />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
