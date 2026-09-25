import { useState, useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Loader } from '@/components/Loader';
import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar';
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
