import { forwardRef, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const EASE = [0.16, 1, 0.3, 1] as const;

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  delay?: number;
  stagger?: number;
  duration?: number;
  animation?: 'word' | 'char' | 'line';
  once?: boolean;
  y?: number;
}

export const AnimatedText = forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      className = '',
      as: Tag = 'div',
      delay = 0,
      stagger = 0.04,
      duration = 0.8,
      animation = 'word',
      once = true,
      y = 100,
    },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const elementRef = (ref as React.RefObject<HTMLDivElement>) || localRef;
    const isInView = useInView(elementRef, { once, margin: '-10%' });
    const reduced = useReducedMotion();

    const units =
      animation === 'char' ? text.split('') : text.split(' ');

    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduced ? 0 : stagger,
          delayChildren: delay,
        },
      },
    };

    const itemVariants: Variants = {
      hidden: reduced
        ? { opacity: 0 }
        : { y: `${y}%`, opacity: 0, filter: 'blur(8px)' },
      visible: {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration, ease: EASE },
      },
    };

    return (
      <motion.div
        ref={elementRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className={className}
        aria-label={text}
      >
        {animation === 'char' ? (
          units.map((char, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-top"
              aria-hidden="true"
            >
              <motion.span
                className="inline-block"
                variants={itemVariants}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            </span>
          ))
        ) : (
          units.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-top mr-[0.25em]"
              aria-hidden="true"
            >
              <motion.span
                className="inline-block"
                variants={itemVariants}
              >
                {word}
              </motion.span>
            </span>
          ))
        )}
      </motion.div>
    );
  }
);

AnimatedText.displayName = 'AnimatedText';
