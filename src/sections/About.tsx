import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AnimatedText } from '@/components/AnimatedText';
import { RevealImage } from '@/components/RevealImage';

const values = [
  'Sustainably Sourced',
  'Cold-Pressed',
  'No Preservatives',
  'Fair-Trade Farmers',
  'Recyclable Packaging',
  'Small-Batch Crafted',
  '100% Natural',
  'Vegan & Cruelty-Free',
];

const stats = [
  { value: '15+', label: 'Coconut Groves' },
  { value: '08', label: 'Farmer Partners' },
  { value: '100%', label: 'Natural Origin' },
  { value: '0', label: 'Artificial Additives' },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['10%', '-10%']);

  return (
    <section
      ref={ref}
      id="about"
      className="relative bg-ink-950 py-24 md:py-40 px-6 md:px-12 overflow-hidden"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-xs uppercase tracking-ultra-wide text-palm-400">
          [03]
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-cream-200">
          Our Story
        </span>
      </div>

      {/* Large editorial statement */}
      <div className="max-w-6xl">
        <AnimatedText
          text="Coconuts worth"
          as="h2"
          animation="word"
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-ultra-tight text-cream-50 leading-[1.05]"
          stagger={0.04}
          duration={0.8}
        />
        <AnimatedText
          text="celebrating."
          as="h2"
          animation="word"
          className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-palm-400 leading-[1.05] mt-2"
          delay={0.3}
          stagger={0.04}
          duration={0.8}
        />
      </div>

      {/* Asymmetric content grid */}
      <div className="mt-20 grid md:grid-cols-12 gap-8 md:gap-12">
        {/* Left: image */}
        <motion.div
          className="md:col-span-5 md:col-start-1"
          style={{ y }}
        >
          <RevealImage
            src="https://images.pexels.com/photos/5608055/pexels-photo-5608055.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Coconut grove with harvested coconuts"
            className="aspect-[4/5] w-full"
            parallaxStrength={60}
            delay={0.2}
          />
        </motion.div>

        {/* Right: text + stats */}
        <div className="md:col-span-6 md:col-start-7 flex flex-col gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg md:text-xl text-cream-100 leading-relaxed">
              CocBliz was born from a simple belief: that the humble coconut —
              nature's most versatile gift — deserves to be treated with
              reverence, not shortcuts. We work directly with small-scale coconut
              farmers across tropical groves, paying fair prices and harvesting
              only at peak ripeness.
            </p>
            <p className="mt-6 text-base text-cream-200 leading-relaxed">
              Every bottle of oil, every pack of water, every artisanal treat is
              a small-batch labor of love. No refining, no bleaching, no
              preservatives. Just pure coconut goodness, crafted the way nature
              intended — and delivered with the story of where it came from.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-cream-50 tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-wider text-ink-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Values marquee-style list */}
      <div className="mt-24 md:mt-32">
        <div className="flex items-center gap-4 mb-8">
          <span className="w-8 h-px bg-ink-600" />
          <span className="font-mono text-xs uppercase tracking-wider text-ink-400">
            What We Stand For
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {values.map((value, i) => (
            <motion.span
              key={value}
              className="px-4 py-2 border border-ink-700 rounded-full font-mono text-xs uppercase tracking-wider text-cream-200 hover:border-palm-400 hover:text-palm-400 transition-colors duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              data-cursor="open"
              data-cursor-label=""
            >
              {value}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
