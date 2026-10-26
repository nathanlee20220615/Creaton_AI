import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Heart, Palette, RotateCw, Cpu, Layers } from 'lucide-react';

export const DesignedForRealUse: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'features' | '360' | 'anatomy'>('features');
  const [rotationAngle, setRotationAngle] = useState(0);

  const cards = [
    {
      title: 'Your privacy is protected',
      text: 'Memo is an autonomous robot that does not need to learn through human tele-operation. Instead, we obtain training data from our Memory Developers wearing our Skill Capture Glove™.',
      image: '/assets/memo/card_privacy.jpg',
      icon: Shield
    },
    {
      title: 'Safety for the whole family',
      text: 'With a low center of gravity, stable wheelbase, and a lightweight body, Memo is safe for small members of the home.',
      image: '/assets/memo/card_safety.jpg',
      icon: Heart
    },
    {
      title: 'Tailored to your home',
      text: 'Customize Memo to fit your aesthetic. Choose from a selection of colorways and materials that blend with your interior.',
      image: '/assets/memo/card_tailored.jpg',
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
            onClick={() => setActiveTab('features')}
            className={`px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'features'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab('360')}
            className={`flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === '360'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span>360°</span>
            <RotateCw size={12} className={activeTab === '360' ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => setActiveTab('anatomy')}
            className={`px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === 'anatomy'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Anatomy
          </button>
        </div>
      </div>

      {/* Tab Content Display */}
      <AnimatePresence mode="wait">
        {activeTab === '360' && (
          <motion.div
            key="360"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-8 max-w-2xl mx-auto rounded-3xl bg-neutral-900 text-white p-8 text-center shadow-xl border border-white/10"
          >
            <div className="text-xs uppercase font-mono tracking-widest text-amber-400 mb-2">
              Interactive 360° Perspective
            </div>
            <h4 className="text-xl font-display font-medium">Turntable Examination</h4>
            <div className="relative my-6 aspect-video rounded-2xl bg-black/60 overflow-hidden flex items-center justify-center border border-white/5">
              <img
                src="/assets/memo/card_safety.jpg"
                alt="Memo 360 View"
                className="h-full w-full object-cover transition-transform duration-300"
                style={{ transform: `rotate(${rotationAngle}deg) scale(1.1)` }}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                <span className="text-xs font-mono bg-black/70 px-3 py-1 rounded-full text-white/90">
                  Angle: {rotationAngle}°
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setRotationAngle((a) => (a - 45 + 360) % 360)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"
              >
                ⟲ Rotate Left
              </button>
              <button
                onClick={() => setRotationAngle((a) => (a + 45) % 360)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium transition-colors"
              >
                ⟳ Rotate Right
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'anatomy' && (
          <motion.div
            key="anatomy"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-8 max-w-3xl mx-auto rounded-3xl bg-[#F4F4F0] p-8 border border-neutral-200/80 shadow-sm"
          >
            <div className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-2 text-center">
              Hardware Architecture
            </div>
            <h4 className="text-xl font-display font-medium text-center text-neutral-900 mb-6">
              Memo Anatomy & Spec Sheet
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1">
                <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Cpu size={14} className="text-neutral-500" />
                  Dual 7-DoF Compliant Arms
                </div>
                <div className="text-neutral-500">
                  Carbon fiber composite with back-drivable planetary gears for zero pinch hazards.
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1">
                <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Shield size={14} className="text-neutral-500" />
                  On-Device Privacy Engine
                </div>
                <div className="text-neutral-500">
                  Custom neural inference unit running real-time vision without cloud transmission.
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1">
                <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Layers size={14} className="text-neutral-500" />
                  Low-Center Gyro Wheelbase
                </div>
                <div className="text-neutral-500">
                  Ultra-stable omnidirectional wheels that glide over thresholds and dense carpets.
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1">
                <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <Palette size={14} className="text-neutral-500" />
                  Textile & Ceramic Swatches
                </div>
                <div className="text-neutral-500">
                  Removable outer magnetic panels in Warm Travertine, Slate Wool, and Terracotta.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DesignedForRealUse;
