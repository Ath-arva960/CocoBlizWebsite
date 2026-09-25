import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigate?: (section: string) => void;
}

const navItems = [
  { label: 'Products', id: 'work' },
  { label: 'Story', id: 'about' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Craft', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

export function Navbar({ onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-5 transition-all duration-500 ease-expo ${
          scrolled
            ? 'backdrop-blur-md bg-ink-950/70 border-b border-ink-700/50'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav('hero')}
            className="group flex items-center gap-2"
            data-cursor="open"
            data-cursor-label="TOP"
          >
            <span className="font-display text-xl font-bold tracking-ultra-tight text-cream-50">
              CocBliz
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-palm-400 group-hover:scale-150 transition-transform duration-300" />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="group relative font-mono text-xs uppercase tracking-wider text-cream-200 hover:text-cream-50 transition-colors duration-300"
                data-cursor="open"
                data-cursor-label="GO"
              >
                <span className="inline-block transition-transform duration-300 ease-expo group-hover:-translate-y-1">
                  {item.label}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-palm-400 transition-all duration-300 ease-expo group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 z-[101]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-px bg-cream-50"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
            />
            <motion.span
              className="block w-6 h-px bg-cream-50"
              animate={{ opacity: menuOpen ? 0 : 1 }}
            />
            <motion.span
              className="block w-6 h-px bg-cream-50"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-ink-950 flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="font-display text-4xl font-bold text-cream-50"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
