import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
  itemsPerView?: { desktop: number; tablet: number; mobile: number };
  loop?: boolean;
  gap?: number;
  label?: string;
}

export function Carousel({
  children,
  className = '',
  itemClassName = '',
  autoplay = false,
  autoplayDelay = 4000,
  showArrows = true,
  showDots = true,
  showCounter = false,
  itemsPerView = { desktop: 3, tablet: 2, mobile: 1 },
  loop = true,
  gap = 24,
  label,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsView, setItemsView] = useState(itemsPerView.desktop);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSlides = children.length;
  const maxIndex = Math.max(0, totalSlides - itemsView);

  useEffect(() => {
    const updateView = () => {
      const w = window.innerWidth;
      if (w < 768) setItemsView(itemsPerView.mobile);
      else if (w < 1024) setItemsView(itemsPerView.tablet);
      else setItemsView(itemsPerView.desktop);
    };
    updateView();
    window.addEventListener('resize', updateView);
    return () => window.removeEventListener('resize', updateView);
  }, [itemsPerView]);

  useEffect(() => {
    if (currentIndex > maxIndex) setCurrentIndex(maxIndex);
  }, [maxIndex, currentIndex]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return loop ? 0 : prev;
      return prev + 1;
    });
  }, [maxIndex, loop]);

  const prev = useCallback(() => {
    setCurrentIndex((p) => {
      if (p <= 0) return loop ? maxIndex : p;
      return p - 1;
    });
  }, [maxIndex, loop]);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(next, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, next]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const delta = clientX - dragStartX.current;
    if (delta < -50) next();
    else if (delta > 50) prev();
    setIsDragging(false);
  };

  const itemWidth = `calc((100% - ${gap * (itemsView - 1)}px) / ${itemsView})`;
  const translateX = `calc(-${currentIndex} * (${itemWidth} + ${gap}px))`;

  return (
    <div className={`relative ${className}`}>
      {/* Header row */}
      {(label || showCounter) && (
        <div className="flex items-center justify-between mb-6 md:mb-8">
          {label && (
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-ultra-wide text-palm-400">
                {label}
              </span>
            </div>
          )}
          {showCounter && (
            <span className="font-mono text-xs text-ink-400">
              {String(currentIndex + 1).padStart(2, '0')} /{' '}
              {String(maxIndex + 1).padStart(2, '0')}
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        ref={containerRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={(e) => isDragging && handleDragEnd(e)}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <motion.div
          className="flex"
          style={{ gap: `${gap}px` }}
          animate={{ x: translateX }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {children.map((child, i) => (
            <div
              key={i}
              className={`shrink-0 ${itemClassName}`}
              style={{ width: itemWidth }}
            >
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 md:mt-8">
        {/* Dots */}
        {showDots && (
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className="group relative py-2"
                aria-label={`Go to slide ${i + 1}`}
                data-cursor="open"
                data-cursor-label=""
              >
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-8 bg-palm-400'
                      : 'w-2 bg-ink-600 group-hover:bg-ink-500'
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Arrows */}
        {showArrows && (
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={prev}
              disabled={!loop && currentIndex === 0}
              className="group flex items-center justify-center w-11 h-11 rounded-full border border-ink-600 text-cream-200 hover:border-palm-400 hover:text-palm-400 transition-colors duration-300 disabled:opacity-30 disabled:hover:border-ink-600 disabled:hover:text-cream-200"
              aria-label="Previous slide"
              data-cursor="open"
              data-cursor-label="PREV"
            >
              <ChevronLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={next}
              disabled={!loop && currentIndex >= maxIndex}
              className="group flex items-center justify-center w-11 h-11 rounded-full border border-ink-600 text-cream-200 hover:border-palm-400 hover:text-palm-400 transition-colors duration-300 disabled:opacity-30 disabled:hover:border-ink-600 disabled:hover:text-cream-200"
              aria-label="Next slide"
              data-cursor="open"
              data-cursor-label="NEXT"
            >
              <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
