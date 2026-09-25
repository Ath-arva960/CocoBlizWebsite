import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const videos = [
  {
    src: 'https://videos.pexels.com/video-files/38473807/16340113_2560_1440_30fps.mp4',
    poster:
      'https://images.pexels.com/photos/9470489/pexels-photo-9470489.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'From the Grove',
    subtitle: 'Aerial view of our coconut palm plantations',
  },
  {
    src: 'https://videos.pexels.com/video-files/6156250/6156250-hd_1080_1920_30fps.mp4',
    poster:
      'https://images.pexels.com/photos/1289698/pexels-photo-1289698.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    title: 'By the Beach',
    subtitle: 'Fresh coconut water, the way nature serves it',
  },
];

export function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const switchVideo = (i: number) => {
    setCurrentVideo(i);
    setIsPlaying(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink-950 py-24 md:py-32 px-6 md:px-12 overflow-hidden"
    >
      {/* Section label */}
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-xs uppercase tracking-ultra-wide text-palm-400">
          [07]
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-cream-200">
          In Motion
        </span>
      </div>

      {/* Video container */}
      <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden rounded-sm group">
        {/* Video */}
        <motion.video
          ref={videoRef}
          src={videos[currentVideo].src}
          poster={videos[currentVideo].poster}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ scale: reduced ? 1 : scale }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-ink-950/40 pointer-events-none" />

        {/* Title overlay */}
        <motion.div
          className="absolute bottom-8 left-6 md:left-12 z-10"
          style={{ opacity }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideo}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-3xl md:text-5xl font-bold tracking-ultra-tight text-cream-50">
                {videos[currentVideo].title}
              </h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-palm-400">
                {videos[currentVideo].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Controls */}
        <div className="absolute bottom-8 right-6 md:right-12 flex items-center gap-3 z-10">
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md bg-ink-950/40 border border-cream-50/20 text-cream-50 hover:bg-palm-400 hover:text-ink-950 hover:border-palm-400 transition-colors duration-300"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            data-cursor="open"
            data-cursor-label={isPlaying ? 'PAUSE' : 'PLAY'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={toggleMute}
            className="flex items-center justify-center w-11 h-11 rounded-full backdrop-blur-md bg-ink-950/40 border border-cream-50/20 text-cream-50 hover:bg-palm-400 hover:text-ink-950 hover:border-palm-400 transition-colors duration-300"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            data-cursor="open"
            data-cursor-label={isMuted ? 'SOUND' : 'MUTE'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* Video switcher dots */}
        <div className="absolute top-6 right-6 md:right-12 flex items-center gap-2 z-10">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => switchVideo(i)}
              className="group relative py-2"
              aria-label={`Switch to video ${i + 1}`}
              data-cursor="open"
              data-cursor-label=""
            >
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentVideo ? 'w-8 bg-palm-400' : 'w-4 bg-cream-50/30'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Caption */}
      <motion.p
        className="mt-6 text-sm text-cream-200 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Every CocBliz product begins in a tropical grove. Watch the journey from
        palm to package — and taste the difference that purity makes.
      </motion.p>
    </section>
  );
}
