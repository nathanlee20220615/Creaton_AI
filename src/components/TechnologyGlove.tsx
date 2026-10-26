import React from 'react';
import { motion } from 'motion/react';

interface TechnologyGloveProps {
  onOpenVideo?: (title: string, duration: string, kicker: string, imageSrc: string) => void;
  onOpenBeta?: () => void;
}

export const TechnologyGlove: React.FC<TechnologyGloveProps> = () => {
  return (
    <section id="features" className="w-full pb-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20 sm:scroll-mt-24">
      <div id="technology" className="sr-only" />
      {/* Top Banner Card with Memo Torso Graphic */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#D4D9D7] via-[#DFE2E0] to-[#E9ECEB] shadow-xl p-8 sm:p-12 md:p-16 flex flex-col items-center justify-between min-h-[500px] sm:min-h-[580px]"
      >
        {/* Right Vertical Pill Step Indicator */}
        <div className="absolute top-8 right-8 hidden sm:flex flex-col gap-2 items-center bg-white/40 backdrop-blur-md px-2 py-3 rounded-full border border-white/50">
          <div className="h-4 w-1 rounded-full bg-neutral-900" />
          <div className="h-1.5 w-1 rounded-full bg-neutral-400" />
          <div className="h-1.5 w-1 rounded-full bg-neutral-400" />
          <div className="h-1.5 w-1 rounded-full bg-neutral-400" />
        </div>

        {/* Section Headline */}
        <div className="text-center z-10 pt-4">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white drop-shadow-sm">
            From imitation to intuition
          </h2>
        </div>

        {/* Robot Torso Asset centered at bottom of container */}
        <div className="relative mt-8 sm:mt-12 w-full max-w-2xl flex justify-center z-10">
          <img
            src="/assets/memo/imitation_robot.jpg"
            alt="Memo sleek robot head and torso"
            className="w-full max-w-lg object-contain mix-blend-multiply drop-shadow-2xl"
          />
        </div>
      </motion.div>

      {/* Copy Below */}
      <div className="mt-16 sm:mt-24 max-w-3xl mx-auto text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-xl sm:text-2xl md:text-3xl text-neutral-900 leading-snug"
        >
          Our Skill Capture Glove™ enables Memo to distill millions of human movements into its onboard AI, unlocking helpful home skills. What the glove does, Memo learns.
        </motion.p>
      </div>
    </section>
  );
};

export default TechnologyGlove;

