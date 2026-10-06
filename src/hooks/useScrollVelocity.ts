import { useEffect, useRef } from 'react';
import type Lenis from 'lenis';

export function useScrollVelocity() {
  const velocityRef = useRef(0);

  useEffect(() => {
    const checkLenis = () => {
      const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      if (lenis) {
        lenis.on('scroll', (e: { velocity: number }) => {
          velocityRef.current = Math.abs(e.velocity || 0);
        });
      }
    };

    checkLenis();
    const interval = setInterval(checkLenis, 1000);

    return () => clearInterval(interval);
  }, []);

  return velocityRef;
}
