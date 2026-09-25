import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setProgress(100);
      setTimeout(() => {
        setIsDone(true);
        onComplete();
      }, 300);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.random() * 12 + 3;
      current = Math.min(current + increment, 100);
      setProgress(Math.floor(current));

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 800);
        }, 400);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete, reduced]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink-950"
          exit={{
            y: '-100%',
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Subtle background gradient movement */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(74,222,128,0.08) 0%, transparent 60%)',
            }}
            animate={
              reduced
                ? {}
                : {
                    scale: [1, 1.1, 1],
                    opacity: [0.15, 0.25, 0.15],
                  }
            }
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Logo / brand mark */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              className="mb-8 overflow-hidden"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-ultra-tight text-cream-50">
                CocBliz
              </h1>
            </motion.div>

            <motion.div
              className="text-xs font-mono uppercase tracking-ultra-wide text-palm-400 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Pure Coconut
            </motion.div>

            {/* Progress number */}
            <div className="relative flex items-baseline gap-2">
              <motion.span
                key={progress}
                className="font-display text-7xl md:text-9xl font-bold tabular-nums text-cream-50 leading-none"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {progress}
              </motion.span>
              <span className="font-display text-3xl md:text-5xl text-palm-400 font-light">
                %
              </span>
            </div>

            {/* Progress bar */}
            <div className="mt-8 w-48 md:w-64 h-px bg-ink-700 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-palm-400"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>

          {/* Bottom label */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex justify-between px-6 md:px-12 text-xs font-mono uppercase tracking-wider text-ink-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>Harvesting Goodness</span>
            <span>Est. 2026</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
