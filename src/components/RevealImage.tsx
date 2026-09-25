import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  scale?: number;
  delay?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  rounded?: boolean;
}

export function RevealImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  scale = 1.15,
  delay = 0,
  parallax = true,
  parallaxStrength = 80,
  rounded = false,
}: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 1],
    reduced
      ? ['0px', '0px']
      : [`-${parallaxStrength}px`, `${parallaxStrength}px`]
  );

  const yImg: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 1],
    reduced
      ? ['0px', '0px']
      : [`${parallaxStrength * 0.5}px`, `-${parallaxStrength * 0.5}px`]
  );

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${rounded ? 'rounded-2xl' : ''} ${className}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 1.2, ease: EASE, delay }}
      style={parallax && !reduced ? { y } : undefined}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover ${imgClassName}`}
        style={{ y: parallax && !reduced ? yImg : undefined }}
        initial={{ scale }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 1.4, ease: EASE, delay }}
      />
    </motion.div>
  );
}
