import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/AnimatedText';
import { MagneticButton } from '@/components/MagneticButton';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const contactLinks = [
  { label: 'Email', value: 'hello@cocbliz.com', href: 'mailto:hello@cocbliz.com' },
  { label: 'Instagram', value: '@cocbliz', href: '#' },
  { label: 'Facebook', value: '/cocbliz', href: '#' },
  { label: 'Wholesale', value: 'partners@cocbliz.com', href: 'mailto:partners@cocbliz.com' },
];

export function Contact() {
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative bg-ink-950 py-24 md:py-40 px-6 md:px-12 overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(74,222,128,0.08) 0%, transparent 60%)',
        }}
        animate={
          reduced
            ? {}
            : { opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating decorative circle */}
      <motion.div
        className="absolute top-[15%] right-[10%] w-64 h-64 rounded-full border border-palm-800/30"
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs uppercase tracking-ultra-wide text-palm-400">
            [06]
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-cream-200">
            Get in Touch
          </span>
        </div>

        {/* Massive typography */}
        <div className="mb-16 md:mb-24">
          <AnimatedText
            text="LET'S"
            as="h2"
            animation="word"
            className="font-display text-7xl md:text-11xl font-bold tracking-ultra-tight text-cream-50 leading-[0.85]"
            stagger={0.06}
          />
          <AnimatedText
            text="BRING"
            as="h2"
            animation="word"
            className="font-display text-7xl md:text-11xl font-bold tracking-ultra-tight text-cream-50 leading-[0.85]"
            delay={0.1}
            stagger={0.06}
          />
          <div className="flex items-baseline gap-4 md:gap-8">
            <AnimatedText
              text="THE TROPICS"
              as="h2"
              animation="word"
              className="font-display text-7xl md:text-11xl font-bold tracking-ultra-tight text-stroke leading-[0.85]"
              delay={0.2}
              stagger={0.06}
            />
          </div>
          <AnimatedText
            text="TO YOU."
            as="h2"
            animation="word"
            className="font-serif italic text-7xl md:text-11xl text-palm-400 leading-[0.85]"
            delay={0.3}
            stagger={0.06}
          />
        </div>

        {/* Contact info grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-end">
          {/* Left: links */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-cream-200">
              <MapPin size={16} className="text-palm-400" />
              <span className="font-mono text-xs uppercase tracking-wider">
                Sourced from Tropical Groves · Shipped Worldwide
              </span>
            </div>
            <div className="flex items-center gap-3 text-cream-200">
              <Mail size={16} className="text-palm-400" />
              <a
                href="mailto:hello@cocbliz.com"
                className="font-mono text-xs uppercase tracking-wider hover:text-cream-50 transition-colors"
                data-cursor="open"
                data-cursor-label="EMAIL"
              >
                hello@cocbliz.com
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-ink-700">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="group flex flex-col gap-1 py-3"
                  data-cursor="open"
                  data-cursor-label="OPEN"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                    {link.label}
                  </span>
                  <span className="text-sm text-cream-100 group-hover:text-palm-400 transition-colors duration-300 flex items-center gap-1">
                    {link.value}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <p className="text-base text-cream-200 max-w-sm md:text-right">
              Want to stock CocBliz in your store, or just say hello? We partner
              with select retailers and love hearing from coconut enthusiasts.
            </p>
            <MagneticButton
              href="mailto:hello@cocbliz.com"
              className="group relative px-10 py-6 bg-palm-400 text-ink-950 font-display text-lg font-bold tracking-tight rounded-sm overflow-hidden"
              strength={0.25}
            >
              <span className="relative z-10 flex items-center gap-3">
                GET IN TOUCH
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>
              <motion.div
                className="absolute inset-0 bg-cream-50"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originY: 1 }}
              />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
