import { useEffect, useRef } from 'react';

export function useMousePosition() {
  const posRef = useRef({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      posRef.current.nx = (e.clientX / window.innerWidth) * 2 - 1;
      posRef.current.ny = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return posRef;
}
