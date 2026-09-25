import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedText } from '@/components/AnimatedText';

interface Craft {
  num: string;
  title: string;
  description: string;
  tools: string[];
}

const crafts: Craft[] = [
  {
    num: '01',
    title: 'Cold-Pressing',
    description:
      'We never use heat to extract oil. Cold-pressing preserves the full nutritional profile, natural aroma, and beneficial fatty acids that make coconut oil so powerful.',
    tools: ['Below 40°C', 'Mechanical Press', 'No Solvents'],
  },
  {
    num: '02',
    title: 'Sustainable Sourcing',
    description:
      'We partner directly with family-run coconut groves, paying above-market rates and ensuring every harvest supports the community that grows it.',
    tools: ['Fair Trade', 'Direct Trade', 'Community First'],
  },
  {
    num: '03',
    title: 'Zero Additives',
    description:
      'No preservatives, no artificial flavors, no bleaching agents. If it didn\'t come from the coconut, it doesn\'t go in the jar — period.',
    tools: ['No Preservatives', 'No Bleaching', 'No Fillers'],
  },
  {
    num: '04',
    title: 'Eco Packaging',
    description:
      'Every bottle, jar, and pack is designed to be recyclable or compostable. We are working toward fully plastic-free packaging across all products by 2027.',
    tools: ['Recyclable', 'Plastic-Free Goal', 'Compostable'],
  },
  {
    num: '05',
    title: 'Lab-Tested Purity',
    description:
      'Every batch is third-party tested for purity, freshness, and nutritional content. We publish the results — because transparency is the only way we know how to work.',
    tools: ['Third-Party Tested', 'Full Transparency', 'Quality Assured'],
  },
];

export function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative bg-ink-900 py-24 md:py-40 px-6 md:px-12 overflow-hidden"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-xs uppercase tracking-ultra-wide text-palm-400">
          [04]
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-cream-200">
          Our Craft
        </span>
      </div>

      {/* Heading */}
      <div className="mb-16 md:mb-24">
        <AnimatedText
          text="THE CRAFT"
          as="h2"
          animation="char"
          className="font-display text-6xl md:text-10xl font-bold tracking-ultra-tight text-cream-50 leading-none"
          stagger={0.03}
        />
      </div>

      {/* Craft list */}
      <div className="border-t border-ink-700">
        {crafts.map((craft, i) => (
          <div
            key={craft.num}
            className="group relative border-b border-ink-700 overflow-hidden"
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            data-cursor="open"
            data-cursor-label="LEARN"
          >
            {/* Hover background */}
            <motion.div
              className="absolute inset-0 bg-ink-800"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: activeIndex === i ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ originY: 1 }}
            />

            <div className="relative flex items-center justify-between py-6 md:py-8 px-2 md:px-4">
              {/* Number */}
              <motion.span
                className="font-mono text-sm text-palm-400 w-12"
                animate={{
                  x: activeIndex === i ? 8 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {craft.num}
              </motion.span>

              {/* Title */}
              <motion.h3
                className="flex-1 font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-cream-50"
                animate={{
                  x: activeIndex === i ? 16 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {craft.title}
              </motion.h3>

              {/* Tools / arrow */}
              <div className="hidden md:flex items-center gap-3">
                <AnimatePresence>
                  {activeIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-2"
                    >
                      {craft.tools.map((tool) => (
                        <span
                          key={tool}
                          className="font-mono text-[10px] uppercase tracking-wider text-cream-200 border border-ink-600 px-2 py-1 rounded-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.span
                  className="text-2xl text-ink-400"
                  animate={{
                    rotate: activeIndex === i ? 45 : 0,
                    color: activeIndex === i ? '#4ade80' : '#807860',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </div>
            </div>

            {/* Description reveal */}
            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden"
                >
                  <p className="pb-6 md:pb-8 pl-14 md:pl-20 pr-4 text-sm md:text-base text-cream-200 leading-relaxed max-w-2xl">
                    {craft.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
