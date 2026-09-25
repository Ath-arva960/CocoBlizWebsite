import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AnimatedText } from '@/components/AnimatedText';

const phases = [
  {
    num: '01',
    title: 'Harvest',
    body: 'Our coconuts are hand-picked from sun-drenched tropical groves by farmers we know by name — only at peak ripeness, never before.',
  },
  {
    num: '02',
    title: 'Extract',
    body: 'Within hours of harvest, we cold-press the fresh coconut meat and drain the water — locking in nutrients, aroma, and natural goodness.',
  },
  {
    num: '03',
    title: 'Craft',
    body: 'Each product is small-batch crafted in our facility — no heat refining, no bleaching, no shortcuts. Just pure coconut, done right.',
  },
  {
    num: '04',
    title: 'Deliver',
    body: 'From our grove to your door in recyclable packaging. Every jar, bottle, and pack carries the full story of where it came from.',
  },
];

export function StickySection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.5]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section
      ref={ref}
      className="relative bg-ink-900"
      style={{ height: reduced ? 'auto' : '300vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Background image that scales */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: imageOpacity, scale: reduced ? 1 : imageScale }}
        >
          <img
            src="https://images.pexels.com/photos/13071432/pexels-photo-13071432.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Lush coconut palm plantation"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink-950/70" />
        </motion.div>

        {/* Floating gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 70% 50%, rgba(74,222,128,0.08) 0%, transparent 50%)',
            y: reduced ? 0 : bgY,
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs uppercase tracking-ultra-wide text-palm-400">
              [02]
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-cream-200">
              From Grove to You
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left: large statement */}
            <div>
              <AnimatedText
                text="THE"
                as="h2"
                animation="word"
                className="font-display text-7xl md:text-9xl font-bold tracking-ultra-tight text-cream-50"
                stagger={0.08}
              />
              <AnimatedText
                text="JOURNEY"
                as="h2"
                animation="word"
                className="font-display text-7xl md:text-9xl font-bold tracking-ultra-tight text-cream-50"
                delay={0.1}
                stagger={0.08}
              />
              <AnimatedText
                text="OF EVERY"
                as="h2"
                animation="word"
                className="font-display text-7xl md:text-9xl font-bold tracking-ultra-tight text-stroke"
                delay={0.2}
                stagger={0.08}
              />
              <AnimatedText
                text="COCONUT"
                as="h2"
                animation="word"
                className="font-serif italic text-7xl md:text-9xl text-palm-400"
                delay={0.3}
                stagger={0.08}
              />
            </div>

            {/* Right: phases list */}
            <div className="space-y-8 md:space-y-10">
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.num}
                  className="group border-t border-ink-700 pt-6"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-15%' }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm text-palm-400">
                      {phase.num}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-cream-50 tracking-tight">
                      {phase.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm md:text-base text-cream-200 leading-relaxed max-w-md ml-8">
                    {phase.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
