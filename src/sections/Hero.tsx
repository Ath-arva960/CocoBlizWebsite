import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AnimatedText } from '@/components/AnimatedText';

interface HeroProps {
  started: boolean;
}

export function Hero({ started }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative h-[110vh] w-full overflow-hidden bg-ink-950"
    >
      {/* Background gradient layers — tropical green glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74,222,128,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(184,138,79,0.06) 0%, transparent 50%)',
        }}
        animate={
          reduced
            ? {}
            : { opacity: [0.6, 1, 0.6] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-bg opacity-[0.03] pointer-events-none" />

      {/* Floating accent shapes */}
      <motion.div
        className="absolute top-[20%] left-[8%] w-32 h-32 rounded-full border border-palm-800/40"
        animate={reduced ? {} : { y: [0, -30, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ opacity }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[12%] w-20 h-20 rounded-full bg-palm-500/10 blur-2xl"
        animate={reduced ? {} : { scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ opacity }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 h-screen flex flex-col justify-center px-6 md:px-12"
        style={{ opacity, scale }}
      >
        {/* Top label */}
        <motion.div
          className="absolute top-32 left-6 md:left-12 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={started ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="w-8 h-px bg-palm-400" />
          <span className="font-mono text-xs uppercase tracking-ultra-wide text-cream-200">
            Pure Coconut · Tropical Goodness
          </span>
        </motion.div>

        {/* Oversized typography */}
        <motion.div style={{ y: reduced ? 0 : yText }} className="flex flex-col">
          <div className="flex items-baseline gap-4 md:gap-8">
            <AnimatedText
              text="PURE"
              as="h1"
              animation="char"
              className="font-display font-bold text-[18vw] md:text-[14vw] leading-[0.85] tracking-ultra-tight text-cream-50"
              delay={0.2}
              stagger={0.03}
              duration={1}
            />
            <motion.span
              className="font-serif italic text-[8vw] md:text-[5vw] text-palm-400"
              initial={{ opacity: 0, y: 50 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              from
            </motion.span>
          </div>
          <AnimatedText
            text="NATURE"
            as="h1"
            animation="char"
            className="font-display font-bold text-[18vw] md:text-[14vw] leading-[0.85] tracking-ultra-tight text-cream-50"
            delay={0.5}
            stagger={0.03}
            duration={1}
          />
          <div className="flex items-baseline gap-4 md:gap-8">
            <AnimatedText
              text="TO YOU."
              as="h1"
              animation="char"
              className="font-display font-bold text-[18vw] md:text-[14vw] leading-[0.85] tracking-ultra-tight text-stroke"
              delay={0.8}
              stagger={0.03}
              duration={1}
            />
          </div>
        </motion.div>

        {/* Floating image */}
        <motion.div
          className="absolute right-6 md:right-12 top-[22%] w-[30vw] h-[40vh] md:w-[22vw] md:h-[45vh] overflow-hidden rounded-sm"
          style={{ y: reduced ? 0 : yImage, opacity }}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.3 }}
          animate={
            started
              ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }
              : {}
          }
          transition={{ delay: 1.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          data-cursor="view"
          data-cursor-label="VIEW"
        >
          <img
            src="https://images.pexels.com/photos/5008822/pexels-photo-5008822.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="Coconut palm tree with ripe fruits against blue sky"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
        </motion.div>

        {/* Bottom info bar */}
        <motion.div
          className="absolute bottom-10 left-6 md:left-12 right-6 md:right-12 flex items-end justify-between"
          initial={{ opacity: 0, y: 30 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="max-w-xs">
            <p className="font-sans text-sm md:text-base text-cream-200 leading-relaxed">
              Cold-pressed oils, refreshing coconut water, and artisanal treats —
              crafted from sun-ripened coconuts grown in tropical groves.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-ink-400">
              Scroll to explore
            </span>
            <motion.div
              className="w-px h-12 bg-gradient-to-b from-palm-400 to-transparent"
              animate={
                reduced
                  ? {}
                  : { scaleY: [0.3, 1, 0.3], originY: 0 }
              }
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
