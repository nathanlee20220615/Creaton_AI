import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface TipSlide {
  id: string;
  title: string;
  description: string;
  tag: string;
  imageSrc: string;
  actionText: string;
}

// Exactly 5 showcase slides with images applied
const slides: TipSlide[] = [
  {
    id: 'streets-showcase',
    title: 'The Streets',
    description: 'Pixar Animation Studio presents The Streets.',
    tag: 'Animation',
    imageSrc: '/assets/aistudio/show_case_01_5b88f342.jpg',
    actionText: 'Visit'
  },
  {
    id: 'ihuman-showcase',
    title: 'iHUMAN',
    description: 'En film av Tonje Hessen Schei.',
    tag: 'Documentary',
    imageSrc: '/assets/aistudio/show_case_02_cd9c7b5c.jpg',
    actionText: 'Visit'
  },
  {
    id: 'silent-tycoon-showcase',
    title: 'The Silent Tycoon',
    description: 'She built his empire. Tonight, she tears it down.',
    tag: 'Drama',
    imageSrc: '/assets/aistudio/show_case_03_919ae4a6.jpg',
    actionText: 'Visit'
  },
  {
    id: 'endfield-showcase',
    title: 'Arknights Endfield',
    description: 'Worldwide release 2026.1.22. Faction: Endfield Industries.',
    tag: 'Game',
    imageSrc: '/assets/aistudio/show_case_04_304b93b4.jpg',
    actionText: 'Visit'
  },
  {
    id: 'charlotte-showcase',
    title: 'Charlotte William',
    description: 'The Last Mission - Marvel Studios. Ella escapó de su pasado.',
    tag: 'Marvel Studios',
    imageSrc: '/assets/aistudio/show_case_05_3d22d40a.jpg',
    actionText: 'Visit'
  }
];

export const FaqSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCopyPrompt = (slide: TipSlide) => {
    setCopiedId(slide.id);
    setTimeout(() => {
      setCopiedId((curr) => (curr === slide.id ? null : curr));
    }, 2000);
  };

  const currentSlide = slides[currentIndex];
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;
  const prevSlide = slides[prevIndex];
  const nextSlide = slides[nextIndex];

  // Motion animation variants for smooth sliding
  const cardVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.94
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 30 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.94,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <section id="showcase" className="w-full pb-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20 sm:scroll-mt-24">
      <div id="faq" className="sr-only scroll-mt-20 sm:scroll-mt-24" />

      {/* Main Container */}
      <div className="w-full flex flex-col items-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-[32px] font-bold text-neutral-900 tracking-tight text-center mb-10 sm:mb-12 font-sans"
        >
          Where Your Ideas Become Masterpieces.
        </motion.h2>

        {/* Carousel Viewport with 3 Cards & Floating Arrows */}
        <div className="relative w-full max-w-5xl flex items-center justify-center overflow-visible py-4">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous tip"
            className="absolute left-2 sm:left-6 md:left-[calc(50%-235px)] z-30 w-11 h-11 rounded-full bg-white shadow-lg shadow-neutral-900/10 border border-neutral-200/80 flex items-center justify-center text-neutral-700 hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft size={19} strokeWidth={2.2} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next tip"
            className="absolute right-2 sm:right-6 md:right-[calc(50%-235px)] z-30 w-11 h-11 rounded-full bg-white shadow-lg shadow-neutral-900/10 border border-neutral-200/80 flex items-center justify-center text-neutral-700 hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight size={19} strokeWidth={2.2} />
          </button>

          {/* Cards Display Grid / Flex - Limited strictly to 5 image slides */}
          <div className="flex items-center justify-center w-full gap-4 sm:gap-6 md:gap-8 select-none">
            {/* Left Preview Card (Faded peek) */}
            <div
              onClick={handlePrev}
              className="hidden md:flex flex-col items-center justify-between w-[280px] lg:w-[320px] h-[400px] rounded-3xl bg-white/70 border border-neutral-200/60 opacity-35 hover:opacity-50 blur-[0.6px] transition-all duration-300 cursor-pointer shrink-0 scale-95 overflow-hidden relative"
            >
              <div className="relative w-full h-full flex flex-col justify-end p-6">
                <img
                  src={prevSlide.imageSrc}
                  alt={prevSlide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
                <span className="relative z-10 text-xs font-medium text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full self-center">
                  {prevSlide.actionText}
                </span>
              </div>
            </div>

            {/* Center Active Card with Framer Motion Animation */}
            <div className="relative w-full max-w-[360px] sm:max-w-[380px] h-[440px] flex items-center justify-center z-10">
              <AnimatePresence custom={direction} mode="popLayout" initial={false}>
                <motion.div
                  key={currentSlide.id}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full bg-white rounded-3xl border border-neutral-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col items-center justify-between overflow-hidden relative"
                >
                  <div className="relative w-full h-full overflow-hidden flex flex-col justify-end">
                    <img
                      src={currentSlide.imageSrc}
                      alt={currentSlide.title}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                    {/* Bottom Action Pill Button */}
                    <div className="relative z-10 pb-6 flex justify-center">
                      <button
                        onClick={() => handleCopyPrompt(currentSlide)}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-900 bg-white/95 backdrop-blur-md hover:bg-white hover:scale-105 transition-all cursor-pointer shadow-lg active:scale-95"
                      >
                        {copiedId === currentSlide.id ? (
                          <>
                            <Check size={14} className="text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Visited!</span>
                          </>
                        ) : (
                          <span>{currentSlide.actionText}</span>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Preview Card (Faded peek) */}
            <div
              onClick={handleNext}
              className="hidden md:flex flex-col items-center justify-between w-[280px] lg:w-[320px] h-[400px] rounded-3xl bg-white/70 border border-neutral-200/60 opacity-35 hover:opacity-50 blur-[0.6px] transition-all duration-300 cursor-pointer shrink-0 scale-95 overflow-hidden relative"
            >
              <div className="relative w-full h-full flex flex-col justify-end p-6">
                <img
                  src={nextSlide.imageSrc}
                  alt={nextSlide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
                <span className="relative z-10 text-xs font-medium text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full self-center">
                  {nextSlide.actionText}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators - Exactly 5 dots matching the 5 image slides */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 bg-neutral-800'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
