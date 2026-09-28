import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { RevealImage } from '@/components/RevealImage';
import { MagneticButton } from '@/components/MagneticButton';
import { ArrowUpRight } from 'lucide-react';

interface Highlight {
  title: string;
  category: string;
  badge: string;
  story: string;
  results: string;
  image: string;
  detail: string;
}

const highlights: Highlight[] = [
  {
    title: 'Virgin Oil',
    category: 'Cold-Pressed · 500ml',
    badge: 'Signature',
    story:
      'Our flagship product. Hand-picked mature coconuts, cold-pressed within six hours of harvest. The result: a silky, aromatic oil that works as beautifully in your kitchen as it does on your skin.',
    results: '12,000+ jars sold',
    image:
      'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80',
    detail: 'Single-Origin · Cold-Pressed',
  },
  {
    title: 'Young Water',
    category: 'Fresh Coconut Water · 330ml',
    badge: 'Bestseller',
    story:
      'Drunk from young green coconuts within 24 hours of harvest. Naturally sweet, electrolyte-rich, and refreshingly light — the closest thing to drinking straight from the coconut.',
    results: '#1 in category',
    image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80',
    detail: '24hr Fresh · No Sugar',
  },
  {
    title: 'Coco Treats',
    category: 'Artisanal Snacks · Box of 12',
    badge: 'New Release',
    story:
      'A curated box of small-batch coconut treats — toasted flakes, energy bites, and creamy yogurt-filled coconuts. The perfect guilt-free taste of the tropics, any time of day.',
    results: 'Launching now',
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    detail: 'Small-Batch · No Additives',
  },
];

export function ProjectShowcase() {
  return (
    <section className="relative bg-ink-950 py-24 md:py-40 px-6 md:px-12">
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-xs uppercase tracking-ultra-wide text-palm-400">
          [05]
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-cream-200">
          Featured Highlights
        </span>
      </div>

      <div className="space-y-24 md:space-y-40">
        {highlights.map((highlight, i) => (
          <HighlightItem
            key={highlight.title}
            highlight={highlight}
            index={i}
            reversed={false}
          />
        ))}
      </div>
    </section>
  );
}

function HighlightItem({
  highlight,
  index,
  reversed,
}: {
  highlight: Highlight;
  index: number;
  reversed: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ['0%', '0%'] : ['8%', '-8%']
  );

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-[1.15fr_1fr] gap-8 md:gap-16 items-center"
    >
      <div className="flex flex-col gap-5 order-1">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-mono text-xs text-palm-400">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-ink-400">
            {highlight.badge}
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-ink-400">
            {highlight.detail}
          </span>
        </div>

        <motion.h3
          className="font-display text-5xl md:text-[5.2rem] leading-[0.9] font-bold tracking-[-0.06em] text-cream-50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {highlight.title}
        </motion.h3>

        <p className="font-mono text-sm uppercase tracking-wider text-palm-400">
          {highlight.category}
        </p>

        <p className="text-base md:text-lg text-cream-200 leading-relaxed max-w-xl">
          {highlight.story}
        </p>

        <div className="flex items-center gap-6 mt-2 flex-wrap">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
              Popularity
            </span>
            <span className="font-display text-2xl font-bold text-cream-50">
              {highlight.results}
            </span>
          </div>
          <MagneticButton
            href="#contact"
            className="gap-2 text-sm font-mono uppercase tracking-wider text-cream-50 border-b border-ink-600 hover:border-palm-400 pb-1 transition-colors"
            strength={0.2}
          >
            <span>Shop Now</span>
            <ArrowUpRight size={16} className="text-palm-400" />
          </MagneticButton>
        </div>
      </div>

      <motion.div className="order-2" style={{ y }}>
        <RevealImage
          src={highlight.image}
          alt={highlight.title}
          className="aspect-[16/10] w-full rounded-[1.25rem] border border-white/10 bg-ink-900"
          imgClassName="rounded-[1.25rem]"
          parallaxStrength={50}
          delay={index * 0.1}
        />
      </motion.div>
    </div>
  );
}
