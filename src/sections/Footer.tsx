import { Marquee } from '@/components/Marquee';
import { motion } from 'framer-motion';

const footerNav = [
  { label: 'Products', id: 'work' },
  { label: 'Story', id: 'about' },
  { label: 'Craft', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Pinterest', href: '#' },
];

export function Footer() {
  const handleNav = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-ink-900 overflow-hidden">
      {/* Marquee strip */}
      <div className="py-6 border-y border-ink-700/50">
        <Marquee
          text="PURE COCONUT"
          speed="slow"
          direction="left"
          className="font-display text-4xl md:text-6xl font-bold tracking-ultra-tight text-cream-50/20"
        />
      </div>
      <div className="py-4 border-b border-ink-700/50">
        <Marquee
          text="TROPICAL GOODNESS"
          speed="normal"
          direction="right"
          className="font-serif italic text-3xl md:text-5xl text-palm-400/30"
        />
      </div>

      {/* Main footer content */}
      <div className="px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <button
              onClick={() => handleNav('hero')}
              className="group flex items-center gap-2 mb-6"
              data-cursor="open"
              data-cursor-label="TOP"
            >
              <span className="font-display text-3xl font-bold tracking-ultra-tight text-cream-50">
                CocBliz
              </span>
              <span className="w-2 h-2 rounded-full bg-palm-400 group-hover:scale-150 transition-transform duration-300" />
            </button>
            <p className="text-sm text-cream-200 leading-relaxed max-w-xs">
              Pure coconut products crafted from sun-ripened tropical coconuts.
              Sustainably sourced, small-batch made, and delivered with the story
              of every grove.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {footerNav.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="group relative text-sm text-cream-200 hover:text-cream-50 transition-colors"
                    data-cursor="open"
                    data-cursor-label="GO"
                  >
                    <span className="inline-block transition-transform duration-300 ease-expo group-hover:translate-x-1">
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-4">
              Follow
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group relative text-sm text-cream-200 hover:text-cream-50 transition-colors"
                    data-cursor="open"
                    data-cursor-label="OPEN"
                  >
                    <span className="inline-block transition-transform duration-300 ease-expo group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-ink-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
            © 2026 CocBliz — Pure Coconut. Tropical Goodness.
          </span>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
              Sustainably Crafted
            </span>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-400">
              <span className="w-2 h-2 rounded-full bg-palm-400 animate-pulse" />
              Fresh batch ready
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
