import { useEffect, useRef, useCallback } from 'react';

export interface CursorState {
  variant: 'default' | 'view' | 'explore' | 'open' | 'drag';
  label: string;
}

export function useCustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<CursorState>({
    variant: 'default',
    label: '',
  });

  const setCursor = useCallback((state: Partial<CursorState>) => {
    stateRef.current = { ...stateRef.current, ...state };
    if (ringRef.current) {
      ringRef.current.dataset.variant = stateRef.current.variant;
      const labelEl = ringRef.current.querySelector('[data-cursor-label]');
      if (labelEl) {
        labelEl.textContent = stateRef.current.label;
      }
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.5;
      dotY += (mouseY - dotY) * 0.5;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animate);

    const interactiveSelectors = [
      'a',
      'button',
      '[data-cursor]',
      '[role="button"]',
    ];

    const onEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const cursorAttr = target.getAttribute('data-cursor');
      const labelAttr = target.getAttribute('data-cursor-label') || '';

      if (cursorAttr && cursorAttr !== 'default') {
        setCursor({ variant: cursorAttr as CursorState['variant'], label: labelAttr });
      } else {
        setCursor({ variant: 'open', label: labelAttr || 'OPEN' });
      }
    };

    const onLeave = () => {
      setCursor({ variant: 'default', label: '' });
    };

    const interactiveEls = document.querySelectorAll(
      interactiveSelectors.join(', ')
    );
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // Re-scan periodically to catch dynamically added elements
    const rescanInterval = setInterval(() => {
      const els = document.querySelectorAll(interactiveSelectors.join(', '));
      els.forEach((el) => {
        if (!(el as unknown as Record<string, unknown>).__cursorBound) {
          (el as unknown as Record<string, unknown>).__cursorBound = true;
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
        }
      });
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      clearInterval(rescanInterval);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [setCursor]);

  return { dotRef, ringRef, setCursor };
}
