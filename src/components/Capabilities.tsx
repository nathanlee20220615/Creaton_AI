import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface CapabilitiesProps {
  onOpenVideo: (title: string, duration: string, kicker: string, imageSrc: string) => void;
}

export const Capabilities: React.FC<CapabilitiesProps> = ({ onOpenVideo }) => {
  return (
    <section id="capabilities" className="w-full pb-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20 sm:scroll-mt-24">
      {/* Showcase 1: Studio */}
      <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
        {/* Big Hero Image with Text Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-neutral-900 shadow-xl group"
        >
          <img
            src="/assets/aistudio/05_d5f6c0f8.png"
            alt="Virtual production studio showcase"
            className="h-full w-full object-cover"
          />

          {/* Cinematic gradient scrim for high contrast and legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />

          {/* Text positioned directly on top of the image */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 z-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-3xl pointer-events-auto"
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white tracking-tight mb-2 sm:mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Open Your Own Studio. Debut as a Film Director
              </h3>
              <p
                style={{ fontFamily: 'Outfit, sans-serif' }}
                className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              >
                Set up your cameras, cast your actors, design the lighting, and choose the time of day and weather. Direct every shot like you’re on a real film set, powered by AI.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Showcase 2: Homes it's never seen */}
      <div>
        {/* Sub-Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: Picking up toys */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() =>
              onOpenVideo(
                'Picking up toys in modern living room',
                '3:40',
                'Autonomous Sort',
                '/assets/memo/living_toys_card.jpg'
              )
            }
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img
              src="/assets/memo/living_toys_card.jpg"
              alt="Picking up toys"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">
                Autonomous · 4m
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-black shrink-0">
                <Play size={8} className="ml-0.5 fill-current" />
              </div>
              <span className="text-xs font-medium truncate">Picking up toys</span>
            </div>
          </motion.div>

          {/* Card 2: Loading a plate in the dishwasher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onClick={() =>
              onOpenVideo(
                'Loading a plate in the dishwasher',
                '2:15',
                'Autonomous Dishwasher Routine',
                '/assets/memo/living_dishwasher_card.jpg'
              )
            }
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img
              src="/assets/memo/living_dishwasher_card.jpg"
              alt="Loading a plate in the dishwasher"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">
                Autonomous · 4x
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-black shrink-0">
                <Play size={8} className="ml-0.5 fill-current" />
              </div>
              <span className="text-xs font-medium truncate">Loading a plate in the dishwasher</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
