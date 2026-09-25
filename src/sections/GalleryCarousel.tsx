import { motion } from 'framer-motion';
import { Carousel } from '@/components/Carousel';
import { AnimatedText } from '@/components/AnimatedText';
import { ArrowUpRight } from 'lucide-react';

interface GalleryItem {
  image: string;
  title: string;
  location: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    image:
      'https://images.pexels.com/photos/9548239/pexels-photo-9548239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Sunset Harvest',
    location: 'Tropical Coast',
    description: 'Golden hour at the coconut groves — the perfect time to harvest.',
  },
  {
    image:
      'https://images.pexels.com/photos/4839757/pexels-photo-4839757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Pure Refreshment',
    location: 'Beachside',
    description: 'Fresh coconut water, enjoyed where it was grown.',
  },
  {
    image:
      'https://images.pexels.com/photos/9131994/pexels-photo-9131994.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Cold-Pressed Care',
    location: 'Our Facility',
    description: 'Virgin coconut oil, extracted below 40°C to preserve every nutrient.',
  },
  {
    image:
      'https://images.pexels.com/photos/13071432/pexels-photo-13071432.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'The Grove',
    location: 'Plantation',
    description: 'Rows of coconut palms stretching toward the horizon.',
  },
  {
    image:
      'https://images.pexels.com/photos/12580173/pexels-photo-12580173.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Tropical Serving',
    location: 'Local Market',
    description: 'Coconut drink served with orchids — a taste of paradise.',
  },
  {
    image:
      'https://images.pexels.com/photos/5608055/pexels-photo-5608055.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'Harvest Day',
    location: 'Coconut Grove',
    description: 'A morning\'s harvest, ready for the journey from grove to you.',
  },
];

export function GalleryCarousel() {
  return (
    <section id="gallery" className="relative bg-ink-900 py-24 md:py-40 px-6 md:px-12 overflow-hidden">
      {/* Section label */}
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-xs uppercase tracking-ultra-wide text-palm-400">
          [08]
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-cream-200">
          Gallery
        </span>
      </div>

      {/* Heading */}
      <div className="mb-16 md:mb-20 max-w-4xl">
        <AnimatedText
          text="A glimpse into"
          as="h2"
          animation="word"
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-ultra-tight text-cream-50 leading-[1.05]"
          stagger={0.04}
        />
        <AnimatedText
          text="our world."
          as="h2"
          animation="word"
          className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-palm-400 leading-[1.05] mt-2"
          delay={0.2}
          stagger={0.04}
        />
      </div>

      {/* Carousel */}
      <Carousel
        itemsPerView={{ desktop: 3, tablet: 2, mobile: 1 }}
        gap={24}
        autoplay
        autoplayDelay={5000}
        loop
        showDots
        showArrows
        showCounter
      >
        {galleryItems.map((item, i) => (
          <GalleryCard key={i} item={item} index={i} />
        ))}
      </Carousel>
    </section>
  );
}

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  return (
    <motion.article
      className="group relative h-[60vh] overflow-hidden rounded-sm bg-ink-800 cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="view"
      data-cursor-label="VIEW"
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-expo group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />

      {/* Number */}
      <span className="absolute top-4 left-4 font-mono text-xs text-cream-50/60">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Location badge */}
      <span className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-wider text-ink-950 bg-palm-400/90 px-2 py-1 rounded-sm backdrop-blur-sm">
        {item.location}
      </span>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-display text-2xl font-bold tracking-tight text-cream-50 transition-transform duration-300 ease-expo group-hover:translate-x-1">
          {item.title}
        </h3>
        <div className="flex items-start justify-between gap-3 mt-2">
          <p className="text-sm text-cream-200 leading-relaxed max-w-xs">
            {item.description}
          </p>
          <ArrowUpRight
            size={20}
            className="text-palm-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0 mt-1"
          />
        </div>
      </div>
    </motion.article>
  );
}
