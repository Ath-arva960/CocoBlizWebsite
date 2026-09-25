import { useCustomCursor } from '@/hooks/useCustomCursor';

export function CustomCursor() {
  const { dotRef, ringRef } = useCustomCursor();

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9998]">
      {/* Small central dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 bg-cream-50 rounded-full"
        style={{ willChange: 'transform' }}
      />

      {/* Larger follower ring */}
      <div
        ref={ringRef}
        data-variant="default"
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-cream-200 transition-all duration-300 ease-expo"
        style={{
          willChange: 'transform',
          width: '40px',
          height: '40px',
        }}
      >
        <span
          data-cursor-label
          className="text-[9px] font-mono uppercase tracking-wider text-cream-50 opacity-0 transition-opacity duration-200"
        />
      </div>

      {/* Variant styles via CSS */}
      <style>{`
        [data-variant="default"] {
          width: 40px;
          height: 40px;
          background: transparent;
        }
        [data-variant="default"] [data-cursor-label] {
          opacity: 0;
        }
        [data-variant="view"],
        [data-variant="explore"],
        [data-variant="open"],
        [data-variant="drag"] {
          width: 80px;
          height: 80px;
          background: rgba(74, 222, 128, 0.92);
          border-color: rgba(74, 222, 128, 0.92);
          mix-blend-mode: normal;
        }
        [data-variant="view"] [data-cursor-label],
        [data-variant="explore"] [data-cursor-label],
        [data-variant="open"] [data-cursor-label],
        [data-variant="drag"] [data-cursor-label] {
          opacity: 1;
          color: #0f0e0b;
          font-size: 10px;
        }
        [data-variant="view"],
        [data-variant="explore"],
        [data-variant="open"],
        [data-variant="drag"] {
          mix-blend-mode: normal;
        }
      `}</style>
    </div>
  );
}
