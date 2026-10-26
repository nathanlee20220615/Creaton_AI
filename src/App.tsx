/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import TechnologyGlove from './components/TechnologyGlove';
import DesignedForRealUse from './components/DesignedForRealUse';
import FaqSection from './components/FaqSection';
import FoundingBanner from './components/FoundingBanner';
import VideoModal from './components/VideoModal';
import BetaModal from './components/BetaModal';
import Footer from './components/Footer';
import DetailWorkspace from './components/DetailWorkspace';
import PricingPage from './components/PricingPage';

export default function App() {
  // Navigation Page State
  const [currentPage, setCurrentPage] = useState<'landing' | 'pricing' | 'detail'>('landing');

  // Immediately scroll to top with no smooth scrolling animation on page transition
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentPage]);

  // Video Modal State
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    title: string;
    duration: string;
    kicker: string;
    imageSrc: string;
  }>({
    isOpen: false,
    title: '',
    duration: '5:00',
    kicker: 'Autonomous Routine',
    imageSrc: ''
  });

  // Beta / Founding Family Application Modal State
  const [betaModal, setBetaModal] = useState<{
    isOpen: boolean;
    tier: 'founding' | 'beta';
  }>({
    isOpen: false,
    tier: 'founding'
  });

  const handleOpenVideo = (
    title: string,
    duration: string,
    kicker: string,
    imageSrc: string
  ) => {
    setVideoModal({
      isOpen: true,
      title,
      duration,
      kicker,
      imageSrc
    });
  };

  const handleCloseVideo = () => {
    setVideoModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleOpenBeta = (tier: 'founding' | 'beta' = 'beta') => {
    setBetaModal({ isOpen: true, tier });
  };

  const handleCloseBeta = () => {
    setBetaModal((prev) => ({ ...prev, isOpen: false }));
  };

  if (currentPage === 'detail') {
    return (
      <DetailWorkspace
        onBackToHome={() => setCurrentPage('landing')}
        onNavigatePricing={() => setCurrentPage('pricing')}
      />
    );
  }

  const isPricing = currentPage === 'pricing';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isPricing
          ? 'bg-[#070709] text-white selection:bg-neutral-800'
          : 'bg-[#FBFBFA] text-[#141414] selection:bg-neutral-200'
      }`}
    >
      {/* Top Navigation - Persists across pages */}
      <Navbar
        onOpenBeta={() => setCurrentPage('detail')}
        currentPage={currentPage}
        onNavigateHome={() => setCurrentPage('landing')}
        onNavigatePricing={() => setCurrentPage('pricing')}
      />

      {/* Main Page Content */}
      {isPricing ? (
        <PricingPage />
      ) : (
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onJoinFounding={() => setCurrentPage('detail')}
            onApplyBeta={() => setCurrentPage('detail')}
          />

          {/* Capabilities ("Mundane made magic") */}
          <Capabilities onOpenVideo={handleOpenVideo} />

          {/* Skill Capture Glove Technology ("From imitation to intuition") */}
          <TechnologyGlove
            onOpenVideo={handleOpenVideo}
            onOpenBeta={() => handleOpenBeta('beta')}
          />

          {/* Designed for Real Use (Privacy, Safety, Tailored) + 360/Anatomy Tabs */}
          <DesignedForRealUse />

          {/* Frequently Asked Questions */}
          <FaqSection />

          {/* Founding Families Obsidian Callout & Newsletter */}
          <FoundingBanner onOpenBeta={() => handleOpenBeta('founding')} />
        </main>
      )}

      {/* Footer */}
      <Footer onOpenBeta={() => handleOpenBeta('beta')} isDark={isPricing} />

      {/* Interactive Modals */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={handleCloseVideo}
        title={videoModal.title}
        duration={videoModal.duration}
        kicker={videoModal.kicker}
        imageSrc={videoModal.imageSrc}
      />

      <BetaModal
        isOpen={betaModal.isOpen}
        onClose={handleCloseBeta}
        initialType={betaModal.tier}
      />
    </div>
  );
}
