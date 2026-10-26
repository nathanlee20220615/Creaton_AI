import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, ArrowRight } from 'lucide-react';

interface HeroProps {
  onJoinFounding: () => void;
  onApplyBeta: () => void;
}

const TITLE_TEXT = "Anyone can be a director.";
const SUBTITLE_TEXT = "Creaton, powered by innovation, is here with you.";

export const Hero: React.FC<HeroProps> = ({
  onJoinFounding,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextPage = () => {
    onJoinFounding();
  };

  return (
    <section id="hero" className="relative w-full pb-20">
      {/*
        Full-bleed Hero Video Banner:
        4K Video with Creaton Brand Copy & Single "Try Creaton for free" Button
      */}
      <div className="relative w-full overflow-hidden bg-black aspect-[16/9] min-h-[520px] sm:min-h-[640px] md:min-h-[720px]">
        {/* HTML5 4K Video Player */}
        <video
          ref={videoRef}
          src="/assets/aistudio/landing_page_movie_bcf863db.mp4"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
          onContextMenu={(e) => e.preventDefault()}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Subtle cinematic gradient scrim for high contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80 pointer-events-none" />

        {/* Absolute pinned overlay container ensuring accurate positioning on all viewports */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between py-8 sm:py-12 md:py-14 px-4 sm:px-8 pointer-events-none overflow-y-auto">
          {/* Main Title & Subtitle Area */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-6xl mx-auto text-center pt-2 sm:pt-6 md:pt-8 pointer-events-auto"
          >
            <div className="relative p-3 sm:p-5">
              <h1
                style={{
                  fontSize: '90px',
                  fontWeight: 'normal',
                }}
                className="font-display text-white font-normal leading-[1.08] tracking-tight drop-shadow-[0_3px_20px_rgba(0,0,0,0.8)] transition-all max-sm:!text-5xl max-md:!text-7xl"
              >
                {TITLE_TEXT}
              </h1>
              <p
                style={{
                  fontSize: '25px',
                  fontFamily: 'Outfit, sans-serif',
                }}
                className="mt-4 sm:mt-6 text-white/95 font-light tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] max-w-4xl mx-auto transition-all max-sm:!text-lg"
              >
                {SUBTITLE_TEXT}
              </p>

              {/* Single CTA: Try Creaton for free directly beneath subtitle */}
              <div className="mt-8 sm:mt-10 flex items-center justify-center">
                <button
                  onClick={handleNextPage}
                  className="group flex items-center gap-2.5 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#E8DCB8] text-neutral-950 text-sm sm:text-base font-semibold hover:bg-[#F2E7C4] hover:shadow-2xl transition-all duration-200 shadow-xl active:scale-95 cursor-pointer"
                >
                  <span>Try Creaton for free</span>
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Bottom Actions Row: Play/Pause Control Button */}
          <div className="w-full flex items-center justify-start pb-2 sm:pb-4 max-w-7xl mx-auto pointer-events-auto">
            {/* Play/Pause Control Button */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full p-1 sm:p-1.5">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
                <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Value Statement Prose below Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="mt-16 sm:mt-24 max-w-4xl mx-auto text-center px-6"
      >
        <p className="font-display text-[40px] text-neutral-900 font-normal leading-snug sm:leading-relaxed tracking-tight" style={{ fontSize: '40px' }}>
          Creaton supports you in creating<br />
          whatever you can imagine, freely.
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
