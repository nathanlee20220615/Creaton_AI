import React from 'react';
import { motion } from 'motion/react';

interface TechnologyGloveProps {
  onOpenVideo?: (title: string, duration: string, kicker: string, imageSrc: string) => void;
  onOpenBeta?: () => void;
}

export const TechnologyGlove: React.FC<TechnologyGloveProps> = () => {
  return (
    <section id="features" className="w-full mt-[100px] pb-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20 sm:scroll-mt-24">
      <div id="technology" className="sr-only" />

      {/* Section Title */}
      <div className="w-full max-w-[1200px] mx-auto text-center flex justify-center items-center mb-8 sm:mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="font-display text-[32px] sm:text-[44px] md:text-[58px] font-medium tracking-tight text-neutral-900 leading-[1.15] text-center mx-auto w-full max-w-[1200px]"
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '58px',
            width: '100%',
            maxWidth: '1200px',
            textAlign: 'center',
            paddingLeft: '1px',
          }}
        >
          The full film set experience, inside your studio.
        </motion.h2>
      </div>

      {/* Features Showcase Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="relative w-full overflow-hidden rounded-3xl bg-[#070709] border border-neutral-800 shadow-2xl"
      >
        <img
          src="/assets/aistudio/features_page__01_6c09065f.png"
          alt="CREATON Studio Workspace"
          className="w-full h-auto object-cover rounded-3xl"
        />
      </motion.div>

      {/* Sub-Cards Grid placed above P Component */}
      <div className="mt-8 sm:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1: CREATON Studio Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-200/80 shadow-md hover:shadow-xl transition-all"
          >
            <img
              src="/assets/aistudio/features_page__01_83541eb0.png"
              alt="CREATON Studio Timeline"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </motion.div>

          {/* Card 2: Creative Node Workflow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-200/80 shadow-md hover:shadow-xl transition-all"
          >
            <img
              src="/assets/aistudio/features_page__02_06276b1c.png"
              alt="Creative Node Workflow"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </motion.div>
        </div>
      </div>

      {/* Copy Below */}
      <div className="mt-16 sm:mt-24 w-full max-w-[1200px] mx-auto text-center flex justify-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-xl sm:text-2xl md:text-3xl text-neutral-900 leading-snug text-center mx-auto"
          style={{
            width: '936px',
            maxWidth: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
          }}
        >
          Creaton gives filmmakers control over every essential element of{' '}
          <br className="hidden md:inline" />
          a production from camera work, lighting, and sound to{' '}
          <br className="hidden md:inline" />
          actors’ performances.
        </motion.p>
      </div>
    </section>
  );
};

export default TechnologyGlove;

