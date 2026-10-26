import React, { useState, useEffect, useRef } from 'react';
import { CreatonLogo } from './SundayLogo';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthModal } from './AuthModal';

interface NavbarProps {
  onOpenBeta: () => void;
  currentPage?: 'landing' | 'pricing' | 'detail';
  onNavigateHome?: () => void;
  onNavigatePricing?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBeta,
  currentPage = 'landing',
  onNavigateHome,
  onNavigatePricing,
}) => {
  const isDark = currentPage === 'pricing';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'join' }>({
    isOpen: false,
    mode: 'login',
  });
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'en' | 'ko' | 'ja'>(() => {
    try {
      const saved = localStorage.getItem('creaton_lang');
      if (saved === 'en' || saved === 'ko' || saved === 'ja') return saved;
    } catch {
      // ignore
    }
    return 'en';
  });
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Feautures', href: '#features' },
    { label: 'Works', href: '#works' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Pricing', href: '#pricing' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label?: string) => {
    if (label === 'Pricing' || href === '#pricing') {
      e.preventDefault();
      onNavigatePricing?.();
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      return;
    }
    if (currentPage === 'pricing') {
      e.preventDefault();
      onNavigateHome?.();
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      setTimeout(() => {
        if (href.startsWith('#')) {
          const targetId = href.slice(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 60);
      return;
    }
    if (href.startsWith('#')) {
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
  };

  const langCodeLabels: Record<'en' | 'ko' | 'ja', string> = {
    en: 'EN',
    ko: 'KR',
    ja: 'JP',
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 select-none outline-none caret-transparent cursor-default ${
          isDark
            ? 'bg-[#070709]/95 border-b border-neutral-800 backdrop-blur-md text-white'
            : 'glass-nav border-b border-neutral-200/70 text-neutral-800'
        }`}
        style={{ userSelect: 'none', WebkitUserSelect: 'none', caretColor: 'transparent', outline: 'none' }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* CREATON Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome?.();
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }}
            className="flex items-center focus:outline-none cursor-pointer"
            aria-label="CREATON Homepage"
          >
            <CreatonLogo height={19.1875} width="124.469px" invert={isDark} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-11 text-[14px] sm:text-[15px] font-medium tracking-normal">
            {navLinks.map((link) => {
              const isPricingActive = link.label === 'Pricing' && currentPage === 'pricing';
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.label)}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  className={`font-['Outfit'] transition-colors whitespace-nowrap cursor-pointer ${
                    isPricingActive
                      ? isDark
                        ? 'text-white font-semibold underline underline-offset-8 decoration-2 decoration-indigo-500'
                        : 'text-black font-semibold underline underline-offset-8 decoration-2 decoration-black'
                      : isDark
                      ? 'text-neutral-300 hover:text-white'
                      : 'text-neutral-800 hover:text-black'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Login, Join, Divider, and Language Selector */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Login Pill Button */}
            <button
              onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
              className={`rounded-full border px-5 sm:px-6 py-1.5 text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap bg-transparent focus:outline-none ${
                isDark
                  ? 'border-neutral-700 text-neutral-200 hover:text-white hover:border-neutral-500 hover:bg-neutral-800/50'
                  : 'border-neutral-300 text-neutral-800 hover:text-black hover:border-neutral-500 hover:bg-neutral-50/70'
              }`}
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Login
            </button>

            {/* Join Pill Button */}
            <button
              onClick={() => setAuthModal({ isOpen: true, mode: 'join' })}
              className={`rounded-full border px-5 sm:px-6 py-1.5 text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap bg-transparent focus:outline-none ${
                isDark
                  ? 'border-neutral-700 text-neutral-200 hover:text-white hover:border-neutral-500 hover:bg-neutral-800/50'
                  : 'border-neutral-300 text-neutral-800 hover:text-black hover:border-neutral-500 hover:bg-neutral-50/70'
              }`}
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Join
            </button>

            {/* Try Creaton Pill Button */}
            <button
              onClick={onOpenBeta}
              className="rounded-full border border-neutral-300 px-5 sm:px-6 py-1.5 text-[14px] font-medium text-neutral-800 hover:text-black hover:border-neutral-400 hover:brightness-95 transition-all cursor-pointer whitespace-nowrap bg-[#e8dcb8] focus:outline-none"
              style={{ fontFamily: 'Outfit, sans-serif', backgroundColor: '#e8dcb8' }}
            >
              Try Creaton
            </button>

            {/* Vertical Divider */}
            <div
              className={`h-4 w-px mx-1 sm:mx-1.5 shrink-0 ${
                isDark ? 'bg-neutral-700' : 'bg-neutral-300'
              }`}
              aria-hidden="true"
            />

            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1.5 py-1 transition-colors focus:outline-none cursor-pointer select-none ${
                  isDark ? 'text-neutral-200 hover:text-white' : 'text-neutral-800 hover:text-black'
                }`}
                aria-label={`Select language. Current language: ${langCodeLabels[selectedLang]}`}
              >
                {/* Globe Icon */}
                <svg
                  className={`w-[18px] h-[18px] shrink-0 ${
                    isDark ? 'text-neutral-300' : 'text-[#4f2626]'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>

                {/* Displayed Language Code (EN, KR, JP) */}
                <span
                  className="text-[13px] font-medium tracking-wide select-none"
                  style={{ fontFamily: 'Outfit, sans-serif', color: isDark ? '#ffffff' : '#4f2626' }}
                >
                  {langCodeLabels[selectedLang]}
                </span>

                {/* Dropdown Triangle Caret */}
                <svg
                  className={`w-2 h-2 fill-current ml-0.5 transition-transform duration-200 ${
                    isDark ? 'text-white' : 'text-[#4f2626]'
                  } ${
                    langDropdownOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 10 6"
                >
                  <path d="M0 0l5 6 5-6z" fill={isDark ? '#ffffff' : '#4f2626'} />
                </svg>
              </button>

              {/* Language Dropdown Menu */}
              {langDropdownOpen && (
                <div
                  className={`absolute right-0 top-full mt-2 w-36 rounded-xl py-1.5 shadow-xl backdrop-blur-md z-50 text-xs transition-all ${
                    isDark
                      ? 'border border-neutral-800 bg-[#121215]/95 text-neutral-200 shadow-black/40'
                      : 'border border-[#4f2626]/15 bg-[#FBFBFA]/95 text-[#4f2626] shadow-stone-800/10'
                  }`}
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {[
                    { code: 'en' as const, label: 'English', badge: 'EN' },
                    { code: 'ko' as const, label: '한국어', badge: 'KR' },
                    { code: 'ja' as const, label: '日本語', badge: 'JP' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setLangDropdownOpen(false);
                        try {
                          localStorage.setItem('creaton_lang', lang.code);
                        } catch {
                          // ignore
                        }
                      }}
                      className={`w-full px-3 py-2 text-left transition-colors flex items-center justify-between cursor-pointer ${
                        selectedLang === lang.code
                          ? isDark
                            ? 'font-semibold text-white bg-white/10'
                            : 'font-semibold text-[#4f2626] bg-[#4f2626]/10'
                          : isDark
                          ? 'text-neutral-300 hover:bg-white/5 hover:text-white'
                          : 'text-[#4f2626]/80 hover:bg-[#4f2626]/5 hover:text-[#4f2626]'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                            isDark
                              ? 'bg-white/10 text-neutral-300'
                              : 'bg-[#4f2626]/10 text-[#4f2626]'
                          }`}
                        >
                          {lang.badge}
                        </span>
                        <span>{lang.label}</span>
                      </span>
                      {selectedLang === lang.code && (
                        <span
                          className={`text-[10px] font-bold ${
                            isDark ? 'text-white' : 'text-[#4f2626]'
                          }`}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Navigation Drawer Toggle - visible only on small screens (< md) */}
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg text-neutral-800 hover:bg-neutral-100 transition-colors focus:outline-none cursor-pointer ml-1"
              aria-label="Toggle navigation menu"
            >
              <div className="flex flex-col gap-1.5 w-5 items-end">
                <span className={`h-0.5 w-5 bg-neutral-900 transition-transform ${drawerOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-0.5 w-3.5 bg-neutral-900 transition-opacity ${drawerOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-5 bg-neutral-900 transition-transform ${drawerOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#FBFBFA] shadow-2xl border-l border-neutral-200 p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-8 border-b border-neutral-200">
                  <CreatonLogo height={22} />
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="p-1 rounded-full text-neutral-400 hover:text-black transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-8 flex flex-col gap-5 text-lg font-display">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        setDrawerOpen(false);
                        handleNavClick(e, link.href, link.label);
                      }}
                      className="text-neutral-900 hover:text-neutral-500 transition-colors py-1 cursor-pointer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-200 space-y-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      setAuthModal({ isOpen: true, mode: 'login' });
                    }}
                    className="flex-1 rounded-full border border-neutral-300 py-2.5 text-xs font-medium text-neutral-800 hover:text-black hover:border-black transition-colors text-center cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      setAuthModal({ isOpen: true, mode: 'join' });
                    }}
                    className="flex-1 rounded-full border border-neutral-300 py-2.5 text-xs font-medium text-neutral-800 hover:text-black hover:border-black transition-colors text-center cursor-pointer"
                  >
                    Join
                  </button>
                </div>

                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    onOpenBeta();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-neutral-900 py-3 text-xs font-semibold text-white hover:bg-black transition-colors cursor-pointer"
                >
                  <span>Try Creaton</span>
                  <ArrowRight size={14} />
                </button>

                {/* Language switcher in mobile drawer */}
                <div className="flex items-center justify-between py-1 px-1 rounded-xl bg-neutral-100 border border-neutral-200 text-xs">
                  <div className="flex items-center gap-1.5 px-2 text-neutral-500">
                    <svg className="w-4 h-4 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span className="font-medium text-[11px]">Language</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {(['en', 'ko', 'ja'] as const).map((code) => (
                      <button
                        key={code}
                        onClick={() => setSelectedLang(code)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          selectedLang === code
                            ? 'bg-white text-black shadow-sm font-semibold'
                            : 'text-neutral-600 hover:text-black'
                        }`}
                      >
                        {langCodeLabels[code]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-center text-[11px] text-neutral-400">
                  CREATON Inc. · Mountain View, CA · Late 2026 Release
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Login & Join Auth Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal((prev) => ({ ...prev, isOpen: false }))}
        initialMode={authModal.mode}
      />
    </>
  );
};

export default Navbar;
