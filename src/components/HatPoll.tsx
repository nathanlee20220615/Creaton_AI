import React from 'react';
import { motion } from 'motion/react';
import { SundayClover } from './SundayLogo';

interface HatPollProps {
  onOpenVote: () => void;
}

export const HatPoll: React.FC<HatPollProps> = ({ onOpenVote }) => {
  return (
    <section id="hats" className="w-full pb-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="w-full rounded-3xl bg-[#F4F4F0] border border-neutral-200/80 py-16 sm:py-24 px-6 sm:px-12 text-center flex flex-col items-center justify-center"
      >
        {/* Horizontal lockup: Left text - Logo - Right text */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-16 max-w-4xl">
          <div className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-neutral-900 tracking-tight text-center md:text-right">
            Memo wears many hats.
          </div>

          {/* Center Emblem with smooth rotation on hover */}
          <div className="group relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center cursor-pointer">
            <div className="absolute inset-0 rounded-full bg-neutral-200/50 scale-75 group-hover:scale-100 transition-transform duration-500" />
            <div className="relative z-10 transition-transform duration-700 group-hover:rotate-90">
              <SundayClover size={64} color="#141414" />
            </div>
          </div>

          <div className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-neutral-900 tracking-tight text-center md:text-left">
            Which should it wear next?
          </div>
        </div>

        {/* Button below: Cast your vote now */}
        <div className="mt-10">
          <button
            onClick={onOpenVote}
            className="px-7 py-3 rounded-full bg-neutral-950 text-white text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
          >
            Cast your vote now
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default HatPoll;
