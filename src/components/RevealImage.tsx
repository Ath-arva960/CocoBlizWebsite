import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const EASE = [0.16, 1, 0.3, 1] as const;
const FALLBACK_IMAGE = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="780" viewBox="0 0 1200 780">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#1f120d"/>
      <stop offset="60%" stop-color="#4d2f22"/>
      <stop offset="100%" stop-color="#d6b884"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="780" fill="url(#bg)"/>
  <circle cx="880" cy="180" r="120" fill="#f9e8b4" opacity="0.32"/>
  <ellipse cx="600" cy="520" rx="320" ry="175" fill="#8a5d32" opacity="0.3"/>
  <g transform="translate(0,25)">
    <ellipse cx="595" cy="435" rx="230" ry="160" fill="#d4a96a"/>
    <ellipse cx="595" cy="418" rx="190" ry="128" fill="#f6d59f"/>
    <path d="M495 440c35-104 175-120 220-36 13 26 9 45-6 73-18 35-58 74-106 74-64 0-120-46-108-111z" fill="#6a3e22" opacity="0.25"/>
    <path d="M520 260c-42 68-58 142-48 200 10 65 45 118 105 158 45-25 75-62 92-110 16-46 17-87 3-137-34-119-94-150-152-111z" fill="#a26833" opacity="0.35"/>
    <circle cx="530" cy="442" r="28" fill="#f0c97e" opacity="0.75"/>
    <circle cx="630" cy="442" r="28" fill="#f0c97e" opacity="0.75"/>
  </g>
  <text x="600" y="680" text-anchor="middle" fill="#f8f3ea" font-size="64" font-family="Arial, sans-serif" letter-spacing="8">COCOBLIZ</text>
</svg>
`)}`;

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
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
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
  width = 1200,
  height = 780,
  loading = 'lazy',
}: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

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
        src={imageSrc}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        onError={() => {
          if (imageSrc !== FALLBACK_IMAGE) {
            setImageSrc(FALLBACK_IMAGE);
          }
        }}
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
