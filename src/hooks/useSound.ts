import { useCallback, useRef, useState } from 'react';

type SoundType = 'click' | 'hover' | 'open' | 'swipe';

export function useSound() {
  const [enabled, setEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (Ctx) audioCtxRef.current = new Ctx();
    }
    return audioCtxRef.current;
  }, []);

  const play = useCallback(
    (type: SoundType) => {
      if (!enabled) return;
      const ctx = getCtx();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const freqMap: Record<SoundType, number> = {
        click: 600,
        hover: 800,
        open: 400,
        swipe: 500,
      };
      osc.frequency.value = freqMap[type] || 600;
      osc.type = 'sine';

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.start(now);
      osc.stop(now + 0.15);
    },
    [enabled, getCtx]
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      if (!prev) {
        const ctx = getCtx();
        if (ctx && ctx.state === 'suspended') ctx.resume();
      }
      return !prev;
    });
  }, [getCtx]);

  return { enabled, toggle, play };
}
