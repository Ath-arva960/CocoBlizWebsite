interface MarqueeProps {
  text: string;
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  className?: string;
  separator?: string;
  repeat?: number;
}

const speedMap = {
  slow: '40s',
  normal: '25s',
  fast: '15s',
};

export function Marquee({
  text,
  speed = 'normal',
  direction = 'left',
  className = '',
  separator = '•',
  repeat = 6,
}: MarqueeProps) {
  const items = Array.from({ length: repeat }, (_, i) => i);
  const animationName =
    direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div
      className={`flex overflow-hidden whitespace-nowrap ${className}`}
      aria-hidden="true"
    >
      <div
        className="flex shrink-0"
        style={{
          animation: `${animationName} ${speedMap[speed]} linear infinite`,
        }}
      >
        {items.map((i) => (
          <span key={i} className="flex items-center">
            <span className="mx-8">{text}</span>
            <span className="text-accent-400 text-[0.6em]">{separator}</span>
          </span>
        ))}
      </div>
      <div
        className="flex shrink-0"
        style={{
          animation: `${animationName} ${speedMap[speed]} linear infinite`,
        }}
        aria-hidden="true"
      >
        {items.map((i) => (
          <span key={i} className="flex items-center">
            <span className="mx-8">{text}</span>
            <span className="text-accent-400 text-[0.6em]">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
