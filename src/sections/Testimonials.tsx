import { motion } from 'framer-motion';
import { Carousel } from '@/components/Carousel';
import { AnimatedText } from '@/components/AnimatedText';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Wellness Blogger',
    rating: 5,
    text: "CocBliz oil is the only one I use now. The aroma is incredible — you can tell it's truly cold-pressed. My skin has never looked better.",
    avatar:
      'https://images.pexels.com/photos/4839757/pexels-photo-4839757.jpeg?auto=compress&cs=tinysrgb&h=200&w=200&fit=crop',
  },
  {
    name: 'Marcus Reid',
    role: 'Chef & Restaurant Owner',
    rating: 5,
    text: "I cook with CocBliz every day. The flavor is clean and pure — it elevates every dish. My customers can taste the difference.",
    avatar:
      'https://images.pexels.com/photos/7676720/pexels-photo-7676720.jpeg?auto=compress&cs=tinysrgb&h=200&w=200&fit=crop',
  },
  {
    name: 'Amara Okafor',
    role: 'Fitness Coach',
    rating: 5,
    text: "The coconut water is next level. It's the only thing I drink after training — natural electrolytes, no sugar, just pure hydration.",
    avatar:
      'https://images.pexels.com/photos/5601365/pexels-photo-5601365.jpeg?auto=compress&cs=tinysrgb&h=200&w=200&fit=crop',
  },
  {
    name: 'David Park',
    role: 'Sustainable Retailer',
    rating: 5,
    text: "We stock CocBliz in all three of our stores. The packaging is eco-friendly, the story is authentic, and customers keep coming back for more.",
    avatar:
      'https://images.pexels.com/photos/14924909/pexels-photo-14924909.jpeg?auto=compress&cs=tinysrgb&h=200&w=200&fit=crop',
  },
  {
    name: 'Luna Martinez',
    role: 'Beauty Influencer',
    rating: 5,
    text: "I've tried every coconut oil on the market. CocBliz is in a league of its own — silky, fragrant, and genuinely effective for hair and skin.",
    avatar:
      'https://images.pexels.com/photos/2205647/pexels-photo-2205647.jpeg?auto=compress&cs=tinysrgb&h=200&w=200&fit=crop',
  },
];

export function Testimonials() {
  return (
    <section className="relative bg-ink-950 py-24 md:py-40 px-6 md:px-12 overflow-hidden">
      {/* Section label */}
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-xs uppercase tracking-ultra-wide text-palm-400">
          [09]
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-cream-200">
          Loved by Many
        </span>
      </div>

      {/* Heading */}
      <div className="mb-16 md:mb-20 max-w-4xl">
        <AnimatedText
          text="What people"
          as="h2"
          animation="word"
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-ultra-tight text-cream-50 leading-[1.05]"
          stagger={0.04}
        />
        <AnimatedText
          text="are saying."
          as="h2"
          animation="word"
          className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-palm-400 leading-[1.05] mt-2"
          delay={0.2}
          stagger={0.04}
        />
      </div>

      {/* Testimonials carousel */}
      <Carousel
        itemsPerView={{ desktop: 3, tablet: 2, mobile: 1 }}
        gap={24}
        autoplay
        autoplayDelay={6000}
        loop
        showDots
        showArrows
      >
        {testimonials.map((testimonial, i) => (
          <TestimonialCard key={i} testimonial={testimonial} index={i} />
        ))}
      </Carousel>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.article
      className="group relative h-full p-6 md:p-8 rounded-sm border border-ink-700 bg-ink-900 hover:border-palm-400/40 transition-colors duration-500 flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="open"
      data-cursor-label=""
    >
      {/* Quote icon */}
      <Quote
        size={32}
        className="text-palm-400/30 mb-4"
        fill="currentColor"
      />

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className="text-palm-400"
            fill="currentColor"
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-sm md:text-base text-cream-100 leading-relaxed flex-1">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-ink-700">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border border-ink-600 shrink-0">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-display text-sm font-bold text-cream-50">
            {testimonial.name}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
            {testimonial.role}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
