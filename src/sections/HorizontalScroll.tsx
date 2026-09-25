import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Product {
  id: number;
  title: string;
  category: string;
  tag: string;
  description: string;
  image: string;
  benefits: string[];
}

const products: Product[] = [
  {
    id: 1,
    title: 'CocBliz Oil',
    category: 'Cold-Pressed Coconut Oil',
    tag: 'Bestseller',
    description:
      'Virgin cold-pressed oil from hand-picked mature coconuts. Unrefined, unbleached, and bursting with natural aroma — perfect for cooking, skin, and hair.',
    image:
      'https://images.pexels.com/photos/9131994/pexels-photo-9131994.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    benefits: ['Cold-Pressed', 'Unrefined', 'Multi-Use'],
  },
  {
    id: 2,
    title: 'CocBliz Water',
    category: 'Fresh Coconut Water',
    tag: 'Hydration',
    description:
      'Harvested from young green coconuts within 24 hours. Naturally rich in electrolytes, potassium, and minerals — no added sugar, no preservatives.',
    image:
      'https://images.pexels.com/photos/11398730/pexels-photo-11398730.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    benefits: ['Electrolyte-Rich', 'No Sugar Added', '24hr Fresh'],
  },
  {
    id: 3,
    title: 'CocBliz Milk',
    category: 'Creamy Coconut Milk',
    tag: 'Kitchen',
    description:
      'Silky, full-fat coconut milk pressed from freshly grated coconut meat. A versatile dairy alternative for curries, smoothies, and desserts.',
    image:
      'https://images.pexels.com/photos/13821842/pexels-photo-13821842.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    benefits: ['Dairy-Free', 'Full-Fat', 'Versatile'],
  },
  {
    id: 4,
    title: 'CocBliz Treats',
    category: 'Artisanal Coconut Snacks',
    tag: 'New',
    description:
      'Small-batch coconut treats — energy bites, toasted flakes, and creamy yogurt-filled coconuts. A guilt-free taste of the tropics, anytime.',
    image:
      'https://images.pexels.com/photos/23428033/pexels-photo-23428033.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    benefits: ['Small-Batch', 'No Additives', 'Energy-Boosting'],
  },
];

export function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', reduced ? '0%' : '-75%']
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-ink-950"
      style={{ height: reduced ? 'auto' : '400vh' }}
    >
      {/* Sticky horizontal track */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Section header */}
        <div className="flex items-end justify-between px-6 md:px-12 pt-24 pb-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-ultra-wide text-palm-400">
              [01]
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-cream-200">
              Our Products
            </span>
          </div>
          <span className="hidden md:block font-mono text-xs uppercase tracking-wider text-ink-400">
            Scroll to explore →
          </span>
        </div>

        {/* Horizontal track */}
        <motion.div
          style={{ x: reduced ? 0 : x }}
          className="flex gap-6 md:gap-10 px-6 md:px-12 flex-1 items-center"
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        {/* Progress indicator */}
        <div className="px-6 md:px-12 pb-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-ink-400">01</span>
            <div className="flex-1 h-px bg-ink-700 relative overflow-hidden max-w-md">
              <motion.div
                className="absolute left-0 top-0 h-full bg-palm-400"
                style={{ scaleX: scrollYProgress, originX: 0 }}
              />
            </div>
            <span className="font-mono text-xs text-ink-400">
              {String(products.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <article
      className="relative shrink-0 w-[85vw] md:w-[42vw] h-[65vh] md:h-[68vh] group cursor-pointer"
      data-cursor="explore"
      data-cursor-label="EXPLORE"
    >
      {/* Image */}
      <div className="relative w-full h-[75%] overflow-hidden rounded-sm bg-ink-800">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Index number */}
        <span className="absolute top-4 left-4 font-mono text-xs text-cream-50/80">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Tag badge */}
        <span className="absolute top-4 right-4 font-mono text-xs text-ink-950 bg-palm-400 px-2 py-1 rounded-sm">
          {product.tag}
        </span>
      </div>

      {/* Info */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-ultra-tight text-cream-50 transition-transform duration-300 ease-expo group-hover:translate-x-2">
            {product.title}
          </h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-palm-400">
            {product.category}
          </p>
          <p className="mt-3 text-sm text-cream-200 max-w-md leading-relaxed">
            {product.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-end max-w-[120px]">
          {product.benefits.map((b) => (
            <span
              key={b}
              className="font-mono text-[10px] uppercase tracking-wider text-cream-200 border border-ink-600 px-2 py-1 rounded-sm"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
