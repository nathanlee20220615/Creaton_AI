import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Heart, Palette, Cpu, Layers, CheckCircle2 } from 'lucide-react';

export const DesignedForRealUse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'anatomy' | null>('anatomy');

  const handleTabClick = (tab: 'features' | 'anatomy') => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  const cards = [
    {
      title: 'Real-time 3D space',
      text: 'Memo is an autonomous robot that does not need to learn through human tele-operation. Instead, we obtain training data from our Memory Developers wearing our Skill Capture Glove™.',
      image: '/assets/aistudio/image_a5972d26.png',
      icon: Shield
    },
    {
      title: 'Intuitive Selection',
      text: 'With a low center of gravity, stable wheelbase, and a lightweight body, Memo is safe for small members of the home.',
      image: '/assets/aistudio/image_532249a2.png',
      icon: Heart
    },
    {
      title: 'Accurate reflection of intent',
      text: 'Customize Memo to fit your aesthetic. Choose from a selection of colorways and materials that blend with your interior.',
      image: '/assets/aistudio/image_47c6e0b7.png',
      icon: Palette
    }
  ];

  return (
    <section id="works" className="w-full pb-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20 sm:scroll-mt-24">
      <div id="design" className="sr-only" />
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-900"
        >
          Designed for real use
        </motion.h2>
      </div>

      {/* 3 Horizontal Cards Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col justify-between overflow-hidden rounded-3xl bg-[#F4F4F0] border border-neutral-200/80 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              {/* Text Top */}
              <div className="p-7 sm:p-8">
                <div className="flex items-center gap-2 mb-3 text-neutral-500">
                  <Icon size={16} />
                  <span className="text-[11px] font-mono uppercase tracking-wider">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-neutral-900 leading-snug">
                  {card.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {card.text}
                </p>
              </div>

              {/* Photo Bottom */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200 mt-2">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Segmented Selector Buttons: Features | 360° | Anatomy */}
      <div className="mt-14 flex justify-center">
        <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 shadow-inner">
          <button
            onClick={() => handleTabClick('features')}
            className={`px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'features'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => handleTabClick('anatomy')}
            className={`px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'anatomy'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Tab Content Display */}
      <AnimatePresence mode="wait">
        {activeTab === 'features' && (
          <motion.div
            key="features"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="mt-8 max-w-3xl mx-auto rounded-3xl bg-[#F4F4F0] p-8 border border-neutral-200/80 shadow-sm"
          >
            <div className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-2 text-center">
              System Capabilities
            </div>
            <h4 className="text-xl font-display font-medium text-center text-neutral-900 mb-6">
              Amazing Features & Active Intelligence
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1">
                <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Shield size={14} className="text-neutral-500" />
                  Scene JSON Standardization
                </div>
                <div className="text-neutral-500">
                  Manage scene information such as space, camera, lighting, and actors using standardized data to ensure consistency in settings and ease of editing.
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1">
                <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Cpu size={14} className="text-neutral-500" />
                  AI API Integration and Automation
                </div>
                <div className="text-neutral-500">
                  Increase system scalability and efficiency by automatically distributing tasks among AI models and managing execution through an orchestrator.
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1">
                <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Layers size={14} className="text-neutral-500" />
                  Ensure scene consistency
                </div>
                <div className="text-neutral-500">
                  Maintain settings such as cameras, actors, and lighting based on spatial coordinates and timelines to ensure visual and temporal continuity between scenes.
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1">
                <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-neutral-500" />
                  Automatic Quality Verification and Reproduction
                </div>
                <div className="text-neutral-500">
                  Automatically validate the generated results and selectively regenerate only the problematic elements to reduce production costs and time.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'anatomy' && (
          <motion.div
            key="anatomy"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="mt-8 max-w-4xl mx-auto rounded-3xl bg-[#F4F4F0] p-4 sm:p-6 lg:p-8 border border-neutral-200/80 shadow-sm overflow-hidden flex items-center justify-center"
          >
            <img
              src="/assets/aistudio/features_page__06_4c7fe018.png"
              alt="Convenient modular UI structure"
              className="w-full h-auto rounded-2xl object-contain shadow-xs"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DesignedForRealUse;
