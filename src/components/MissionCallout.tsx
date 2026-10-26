import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface MissionCalloutProps {
  onOpenVideo: (title: string, duration: string, kicker: string, imageSrc: string) => void;
}

export const MissionCallout: React.FC<MissionCalloutProps> = ({ onOpenVideo }) => {
  const handleOpenStory = () => {
    onOpenVideo(
      'Our story — Why we built Memo',
      '3:45',
      'Sunday Documentary',
      '/assets/memo/our_story_thumb.jpg'
    );
  };

  return (
    <section className="w-full pb-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full overflow-hidden rounded-3xl bg-[#F4F4F0] border border-neutral-200/80 p-6 sm:p-8 md:p-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center pr-0 lg:pr-6">
            <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-neutral-900 leading-snug tracking-tight">
              Robots should give you back what matters most — time. Watch how our team came together to work on this mission.
            </p>
          </div>

          {/* Right Video Thumbnail Column */}
          <div className="lg:col-span-6">
            <div
              onClick={handleOpenStory}
              className="group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src="/assets/memo/our_story_thumb.jpg"
                alt="Sunday team building Memo"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />

              {/* Pill Button Overlay: "Our story" with play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-semibold text-neutral-900 shadow-lg group-hover:scale-105 group-hover:bg-white transition-all">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-white">
                    <Play size={9} className="ml-0.5 fill-current" />
                  </div>
                  <span>Our story</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MissionCallout;
