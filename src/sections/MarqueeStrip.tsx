import { Marquee } from '@/components/Marquee';

export function MarqueeStrip() {
  return (
    <div className="relative bg-palm-400 py-4 md:py-6 overflow-hidden">
      <Marquee
        text="100% NATURAL"
        speed="fast"
        direction="left"
        className="font-display text-3xl md:text-5xl font-bold tracking-ultra-tight text-ink-950"
      />
    </div>
  );
}
