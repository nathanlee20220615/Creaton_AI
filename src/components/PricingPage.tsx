import React, { useState } from 'react';
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  Sparkles,
  Zap,
  Layers,
  Plus
} from 'lucide-react';

interface PricingPageProps {
  onOpenBeta?: () => void;
  onOpenAuth?: (mode: 'login' | 'join') => void;
}

interface TableRowData {
  name: string;
  badge?: string;
  credits: string;
  monthly: [string, string, string];
  yearly: [string, string, string];
}

const comparisonData: {
  video: TableRowData[];
  image: TableRowData[];
  audio: TableRowData[];
} = {
  video: [
    {
      name: 'Gen-4.5',
      credits: '60 credits/5s',
      monthly: ['10 videos', '37 videos', '158 videos'],
      yearly: ['125 videos', '450 videos', '1,900 videos'],
    },
    {
      name: 'Aleph 2.0',
      credits: '140 credits/5s',
      monthly: ['4 videos', '16 videos', '67 videos'],
      yearly: ['53 videos', '192 videos', '814 videos'],
    },
    {
      name: 'Seedance 2.0 Pro',
      badge: '1080p',
      credits: '160 credits/4s',
      monthly: ['3 videos', '14 videos', '59 videos'],
      yearly: ['46 videos', '168 videos', '712 videos'],
    },
    {
      name: 'Seedance 2.0 Fast',
      credits: '116 credits/4s',
      monthly: ['5 videos', '19 videos', '81 videos'],
      yearly: ['64 videos', '232 videos', '982 videos'],
    },
  ],
  image: [
    {
      name: 'Gen-4 Image',
      badge: '1080p',
      credits: '8 credits/image',
      monthly: ['78 images', '281 images', '1,187 images'],
      yearly: ['937 images', '3,375 images', '14,250 images'],
    },
    {
      name: 'Gen-4 Image Turbo',
      credits: '2 credits/image',
      monthly: ['312 images', '1,125 images', '4,750 images'],
      yearly: ['3,750 images', '13,500 images', '57,000 images'],
    },
    {
      name: 'Nano Banana Pro 2',
      badge: '2K',
      credits: '11 credits/image',
      monthly: ['56 images', '204 images', '863 images'],
      yearly: ['681 images', '2,454 images', '10,363 images'],
    },
    {
      name: 'Nano Banana Pro',
      badge: '2K',
      credits: '20 credits/image',
      monthly: ['31 images', '112 images', '475 images'],
      yearly: ['375 images', '1,350 images', '5,700 images'],
    },
  ],
  audio: [
    {
      name: 'Seed Audio 1.0',
      credits: '15 credits/min',
      monthly: ['41 minutes', '150 minutes', '633 minutes'],
      yearly: ['500 minutes', '1,800 minutes', '7,600 minutes'],
    },
    {
      name: 'Lyria 3 Pro',
      credits: '8 credits/song',
      monthly: ['78 songs', '281 songs', '1,187 songs'],
      yearly: ['937 songs', '3,375 songs', '14,250 songs'],
    },
    {
      name: 'Lyria 3 Clip',
      credits: '4 credits/song',
      monthly: ['156 songs', '562 songs', '2,375 songs'],
      yearly: ['1,875 songs', '6,750 songs', '28,500 songs'],
    },
    {
      name: 'Text to Speech',
      credits: '1 credit/50 chars',
      monthly: ['31,250 characters', '112,500 characters', '475,000 characters'],
      yearly: ['375,000 characters', '1,350,000 characters', '5,700,000 characters'],
    },
  ],
};

export const PricingPage: React.FC<PricingPageProps> = ({
  onOpenBeta,
  onOpenAuth
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [targetAudience, setTargetAudience] = useState<'individual' | 'team'>('individual');
  const [teamUsers, setTeamUsers] = useState<number>(2);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    video: true,
    image: true,
    audio: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isYearly = billingCycle === 'yearly';

  return (
    <div
      className="min-h-screen bg-[#070709] text-white font-outfit pb-32 select-none outline-none caret-transparent cursor-default"
      style={{
        fontFamily: "'Outfit', sans-serif",
        userSelect: 'none',
        WebkitUserSelect: 'none',
        caretColor: 'transparent',
        outline: 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        
        {/* ================= Header Title ================= */}
        <div className="text-center space-y-4 mb-10">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white font-['Outfit']"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Choose the Right Plan for You
          </h1>
        </div>

        {/* ================= Top Controls: Audience Tabs & Billing Switch ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 max-w-5xl mx-auto">
          {/* Left Spacer for symmetry */}
          <div className="hidden sm:block w-48" />

          {/* Center: Individual vs Team & Enterprise */}
          <div className="inline-flex items-center rounded-full bg-[#141418] p-1 border border-neutral-800 shadow-inner">
            <button
              onClick={() => setTargetAudience('individual')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                targetAudience === 'individual'
                  ? 'bg-[#22222a] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setTargetAudience('team')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                targetAudience === 'team'
                  ? 'bg-[#22222a] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Team &amp; Enterprise
            </button>
          </div>

          {/* Right: Monthly / Yearly toggle with -20% off badge */}
          <div className="flex items-center gap-2.5 sm:w-48 justify-end text-xs sm:text-sm">
            <span
              className={`cursor-pointer transition-colors ${
                !isYearly ? 'text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </span>

            {/* Custom Toggle Switch */}
            <button
              type="button"
              onClick={() => setBillingCycle(isYearly ? 'monthly' : 'yearly')}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-[#24242e]"
              role="switch"
              aria-checked={isYearly}
              aria-label="Toggle billing cycle between monthly and yearly"
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#121212] shadow-lg ring-0 transition duration-200 ease-in-out ${
                  isYearly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>

            <span
              className={`cursor-pointer flex items-center gap-1.5 transition-colors ${
                isYearly ? 'text-white font-semibold' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              onClick={() => setBillingCycle('yearly')}
            >
              <span>Yearly</span>
              <span className="inline-block w-[60px] text-[14px] font-bold -mr-[12px] pl-[1px] tracking-wide text-[#b895ff]">
                -20% off
              </span>
            </span>
          </div>
        </div>

        {/* ================= TARGET AUDIENCE: INDIVIDUAL ================= */}
        {targetAudience === 'individual' ? (
          <>
            {/* ================= 4 Pricing Cards Grid ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto mb-24 items-stretch">
              
              {/* CARD 1: Free */}
              <div className="rounded-2xl bg-[#0d0d12] border border-[#1e1e26] p-6 flex flex-col justify-between hover:border-neutral-700 transition-all">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Free</h3>
                  <p className="text-xs text-neutral-500 mb-6 mt-0.5">
                    For people looking to explore Creaton&apos;s AI Tools
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-4xl font-normal text-white">$0</span>
                    <span className="text-xs text-neutral-500">/month</span>
                  </div>

                  {/* Credits */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200 mb-6">
                    <span>125 credits</span>
                    <Info size={13} className="text-neutral-500 cursor-pointer" />
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    className="w-full py-2.5 rounded-xl border border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 text-white text-xs font-semibold transition-all cursor-pointer mb-8"
                  >
                    Start Free
                  </button>

                  {/* Features List */}
                  <div className="space-y-3 text-xs text-neutral-300">
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Includes 125 credits <span className="text-neutral-500">(one time)</span></span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>A selection of generative creative models to test concepts</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>5GB asset storage</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: Standard */}
              <div className="rounded-2xl bg-[#0d0d12] border border-[#1e1e26] p-6 flex flex-col justify-between hover:border-neutral-700 transition-all">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Standard</h3>
                  <p className="text-xs text-neutral-500 mb-6 mt-0.5">
                    For curious creators trying AI video
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    {isYearly && (
                      <span className="text-sm line-through text-neutral-500">$15</span>
                    )}
                    <span className="text-4xl font-normal text-white">
                      ${isYearly ? '12' : '15'}
                    </span>
                    <span className="text-xs text-neutral-500">/month</span>
                  </div>

                  {/* Credits */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200 mb-6">
                    <span>625 credits /mo</span>
                    <Info size={13} className="text-neutral-500 cursor-pointer" />
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    className="w-full py-2.5 rounded-xl border border-neutral-700 bg-[#16161d] hover:bg-[#20202a] text-white text-xs font-semibold transition-all cursor-pointer mb-8"
                  >
                    Get Standard
                  </button>

                  {/* Features List */}
                  <div className="space-y-3 text-xs text-neutral-300">
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Access to all AI video &amp; image models</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Agentic creative collaborator</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span className="flex items-center flex-wrap gap-1">
                        <span>Generate, test and publish ads with Runway Ads</span>
                        <span className="text-[9px] bg-[#5329e7] text-white px-1.5 py-0.5 rounded-full font-semibold leading-none">
                          New
                        </span>
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Parallel generations: 5 videos &amp; images</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Music, voice &amp; sound effects generation</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Up to 3 projects</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>No watermarks</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>4K upscaling</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>20GB storage</span>
                    </div>

                    <div className="pt-2 flex items-center gap-2 text-neutral-400 text-[11px]">
                      <Layers size={13} />
                      <span>Gen-4.5</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                      <Sparkles size={13} />
                      <span>Kling 3.0</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                      <Plus size={13} />
                      <span>Nano Banana Pro</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 pt-1">and more</p>
                  </div>
                </div>
              </div>

              {/* CARD 3: Pro */}
              <div className="rounded-2xl bg-[#0d0d12] border border-[#1e1e26] p-6 flex flex-col justify-between hover:border-neutral-600 transition-all relative">
                {/* Popular Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-0.5 rounded-full bg-[#20202a] border border-neutral-700 text-[10px] font-semibold uppercase tracking-wider text-neutral-200">
                    Popular
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Pro</h3>
                  <p className="text-xs text-neutral-500 mb-6 mt-0.5">
                    For creators leveling up their craft
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    {isYearly && (
                      <span className="text-sm line-through text-neutral-500">$35</span>
                    )}
                    <span className="text-4xl font-normal text-white">
                      ${isYearly ? '28' : '35'}
                    </span>
                    <span className="text-xs text-neutral-500">/month</span>
                  </div>

                  {/* Credits */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200 mb-6">
                    <span>2250 credits /mo</span>
                    <Info size={13} className="text-neutral-500 cursor-pointer" />
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    className="w-full py-2.5 rounded-xl border border-neutral-600 bg-[#1e1e28] hover:bg-[#282836] text-white text-xs font-semibold transition-all cursor-pointer mb-8"
                  >
                    Get Pro
                  </button>

                  {/* Features List */}
                  <div className="space-y-3 text-xs text-neutral-300">
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Access to all AI video &amp; image models</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Agentic creative collaborator</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span className="flex items-center flex-wrap gap-1">
                        <span>Generate, test and publish ads with Runway Ads</span>
                        <span className="text-[9px] bg-[#5329e7] text-white px-1.5 py-0.5 rounded-full font-semibold leading-none">
                          New
                        </span>
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Parallel generations: 15 videos &amp; images</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Up to 5 projects</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>1 Brand Kit</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>1 custom voice clone</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Top-up credits anytime</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Runway MCP</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                        <span>Unlimited 4K video upscaling</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>100GB storage</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                        <span>Topaz AI Upscale</span>
                      </div>
                      <span className="text-[10px] text-[#b894ff] font-medium">Unlimited</span>
                    </div>

                    <div className="pt-2 flex items-center gap-2 text-neutral-400 text-[11px]">
                      <Sparkles size={13} />
                      <span>Seedance 2.5</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                      <Layers size={13} />
                      <span>Gen-4.5</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                      <Sparkles size={13} />
                      <span>Kling 3.0</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                      <Plus size={13} />
                      <span>Nano Banana Pro</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 pt-1">and more</p>
                  </div>
                </div>
              </div>

              {/* CARD 4: Max */}
              <div className="rounded-2xl bg-[#0d0d12] border-2 border-[#3b2de0] flex flex-col justify-between shadow-2xl shadow-indigo-950/40 relative overflow-hidden">
                {/* Top Blue Header Banner */}
                <div className="bg-[#3122ea] px-6 py-2 text-xs font-semibold text-white tracking-wide flex items-center justify-between">
                  <span>Best value</span>
                  <div className="flex items-center gap-1 text-[11px] font-normal text-white/90">
                    <span>Credits roll over 1 mo.</span>
                    <Info size={11} className="cursor-pointer" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-semibold text-white">Max</h3>
                  </div>
                  <p className="text-xs text-neutral-500 mb-6 mt-0.5">
                    Best value for heavy solo usage
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    {isYearly && (
                      <span className="text-sm line-through text-neutral-500">$95</span>
                    )}
                    <span className="text-4xl font-normal text-white">
                      ${isYearly ? '76' : '95'}
                    </span>
                    <span className="text-xs text-neutral-500">/month</span>
                  </div>

                  {/* Credits */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200 mb-6">
                    <span>9500 credits /mo</span>
                    <Info size={13} className="text-neutral-500 cursor-pointer" />
                  </div>

                  {/* CTA Button: Solid Royal Blue */}
                  <button
                    type="button"
                    className="w-full py-2.5 rounded-xl bg-[#3122ea] hover:bg-[#4335f5] active:scale-[0.98] text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-indigo-600/30 mb-8"
                  >
                    Get Max
                  </button>

                  {/* Features List */}
                  <div className="space-y-3 text-xs text-neutral-300">
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Early access to new models</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Agentic creative collaborator</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span className="flex items-center flex-wrap gap-1">
                        <span>Generate, test and publish ads with Runway Ads</span>
                        <span className="text-[9px] bg-[#5329e7] text-white px-1.5 py-0.5 rounded-full font-semibold leading-none">
                          New
                        </span>
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Parallel generations: 20 videos &amp; images</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Roll over unused credits for 1 month</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Up to 10 projects</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Up to 3 Brand Kits</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Up to 3 custom voice clones</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Runway MCP</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Studio-grade quality generations: HDR, ProRes, image sequences</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Unlimited 4K video upscaling</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>500GB storage</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                        <span>Topaz AI Upscale</span>
                      </div>
                      <span className="text-[10px] text-[#b894ff] font-medium">Unlimited</span>
                    </div>

                    <div className="pt-2 flex items-center gap-2 text-neutral-400 text-[11px]">
                      <Sparkles size={13} />
                      <span>Seedance 2.5</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                      <Layers size={13} />
                      <span>Gen-4.5</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                      <Sparkles size={13} />
                      <span>Kling 3.0</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
                      <Plus size={13} />
                      <span>Nano Banana Pro</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 pt-1">and more</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= Model Comparison Table Section ================= */}
            <div className="max-w-6xl mx-auto pt-10">
              <div className="text-center mb-12">
                <h2
                  className="text-2xl sm:text-3xl font-medium tracking-tight text-white font-['Outfit']"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  Compare models across plans
                </h2>
              </div>

              {/* Comparison Header Row */}
              <div className="grid grid-cols-12 gap-4 pb-6 border-b border-neutral-800 items-end">
                <div className="col-span-5 text-xs text-neutral-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      onClick={() => setBillingCycle('monthly')}
                      className={`cursor-pointer transition-colors ${!isYearly ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Monthly
                    </span>
                    <button
                      type="button"
                      onClick={() => setBillingCycle(isYearly ? 'monthly' : 'yearly')}
                      className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 bg-[#24242e] focus:outline-none"
                      role="switch"
                      aria-checked={isYearly}
                      aria-label="Toggle comparison billing cycle"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-[#121212] transition duration-200 ${
                          isYearly ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span
                      onClick={() => setBillingCycle('yearly')}
                      className={`cursor-pointer flex items-center gap-1 transition-colors ${isYearly ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'}`}
                    >
                      <span>Yearly</span>
                      <span className="text-[9px] text-[#b895ff] bg-[#3a2066]/70 px-1 py-0.2 rounded font-semibold">
                        -20% off
                      </span>
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 pt-1">
                    Generations per {isYearly ? 'year' : 'month'}
                  </p>
                </div>

                {/* Standard Col */}
                <div className="col-span-2 text-center space-y-1">
                  <h4 className="text-sm font-semibold text-white">Standard</h4>
                  <p className="text-xs text-neutral-300">
                    <span className="font-semibold text-white">${isYearly ? '12' : '15'}</span> /month
                  </p>
                  <p className="text-[10px] text-neutral-500">
                    {isYearly ? '7,500 credits/year' : '625 credits/mo'}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      className="px-3.5 py-1 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-200 hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      Get Standard
                    </button>
                  </div>
                </div>

                {/* Pro Col */}
                <div className="col-span-2 text-center space-y-1">
                  <h4 className="text-sm font-semibold text-white">Pro</h4>
                  <p className="text-xs text-neutral-300">
                    <span className="font-semibold text-white">${isYearly ? '28' : '35'}</span> /month
                  </p>
                  <p className="text-[10px] text-neutral-500">
                    {isYearly ? '27,000 credits/year' : '2,250 credits/mo'}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      className="px-3.5 py-1 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-200 hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      Get Pro
                    </button>
                  </div>
                </div>

                {/* Max Col */}
                <div className="col-span-3 text-center space-y-1">
                  <h4 className="text-sm font-semibold text-white">Max</h4>
                  <p className="text-xs text-neutral-300">
                    <span className="font-semibold text-white">${isYearly ? '76' : '95'}</span> /month
                  </p>
                  <p className="text-[10px] text-neutral-500">
                    {isYearly ? '114,000 credits/year' : '9,500 credits/mo'}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      className="px-4 py-1 rounded-lg bg-[#3122ea] hover:bg-[#4335f5] text-white text-[11px] font-medium transition-colors cursor-pointer shadow-md"
                    >
                      Get Max
                    </button>
                  </div>
                </div>
              </div>

              {/* Table Category 1: AI Video */}
              <div className="border-b border-neutral-800/80">
                <button
                  onClick={() => toggleSection('video')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs font-semibold text-neutral-200 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>AI video</span>
                    {expandedSections.video ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                </button>

                {expandedSections.video && (
                  <div className="divide-y divide-neutral-900/60 pb-4 text-xs">
                    {comparisonData.video.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-4 py-3 text-neutral-400">
                        <div className="col-span-5">
                          <p className="text-white font-medium">
                            {row.name}
                            {row.badge && (
                              <span className="text-[10px] text-neutral-500 ml-1.5">{row.badge}</span>
                            )}
                          </p>
                          <p className="text-[11px] text-neutral-500">{row.credits}</p>
                        </div>
                        <div className="col-span-2 text-center text-neutral-300">
                          {isYearly ? row.yearly[0] : row.monthly[0]}
                        </div>
                        <div className="col-span-2 text-center text-neutral-300">
                          {isYearly ? row.yearly[1] : row.monthly[1]}
                        </div>
                        <div className="col-span-3 text-center text-neutral-300">
                          {isYearly ? row.yearly[2] : row.monthly[2]}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Table Category 2: AI Image */}
              <div className="border-b border-neutral-800/80">
                <button
                  onClick={() => toggleSection('image')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs font-semibold text-neutral-200 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>AI image</span>
                    {expandedSections.image ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                </button>

                {expandedSections.image && (
                  <div className="divide-y divide-neutral-900/60 pb-4 text-xs">
                    {comparisonData.image.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-4 py-3 text-neutral-400">
                        <div className="col-span-5">
                          <p className="text-white font-medium">
                            {row.name}
                            {row.badge && (
                              <span className="text-[10px] text-neutral-500 ml-1.5">{row.badge}</span>
                            )}
                          </p>
                          <p className="text-[11px] text-neutral-500">{row.credits}</p>
                        </div>
                        <div className="col-span-2 text-center text-neutral-300">
                          {isYearly ? row.yearly[0] : row.monthly[0]}
                        </div>
                        <div className="col-span-2 text-center text-neutral-300">
                          {isYearly ? row.yearly[1] : row.monthly[1]}
                        </div>
                        <div className="col-span-3 text-center text-neutral-300">
                          {isYearly ? row.yearly[2] : row.monthly[2]}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Table Category 3: AI Audio */}
              <div className="border-b border-neutral-800/80">
                <button
                  onClick={() => toggleSection('audio')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs font-semibold text-neutral-200 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>AI audio</span>
                    {expandedSections.audio ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                </button>

                {expandedSections.audio && (
                  <div className="divide-y divide-neutral-900/60 pb-4 text-xs">
                    {comparisonData.audio.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-4 py-3 text-neutral-400">
                        <div className="col-span-5">
                          <p className="text-white font-medium">
                            {row.name}
                            {row.badge && (
                              <span className="text-[10px] text-neutral-500 ml-1.5">{row.badge}</span>
                            )}
                          </p>
                          <p className="text-[11px] text-neutral-500">{row.credits}</p>
                        </div>
                        <div className="col-span-2 text-center text-neutral-300">
                          {isYearly ? row.yearly[0] : row.monthly[0]}
                        </div>
                        <div className="col-span-2 text-center text-neutral-300">
                          {isYearly ? row.yearly[1] : row.monthly[1]}
                        </div>
                        <div className="col-span-3 text-center text-neutral-300">
                          {isYearly ? row.yearly[2] : row.monthly[2]}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* ================= TARGET AUDIENCE: TEAM & ENTERPRISE ================= */
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 items-stretch">
            
            {/* CARD 1: Team */}
            <div className="rounded-2xl bg-[#0c0c10] border border-[#1d1d24] p-7 flex flex-col justify-between hover:border-neutral-700 transition-all text-neutral-300">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-semibold text-white">Team</h3>
                  <span className="text-[10px] text-[#bda0ff] bg-[#351f61]/80 border border-[#5d3ba6]/60 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                    <span>Credits roll over 1 mo.</span>
                    <Info size={11} className="text-neutral-400" />
                  </span>
                </div>

                <p className="text-xs text-neutral-200 font-medium">
                  {isYearly ? 'Billed annually. Save $336/year.' : 'Billed monthly.'}
                </p>
                <p className="text-xs text-neutral-500 mb-6 mt-0.5">
                  Best for fast-moving teams with high production needs
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-2">
                  {isYearly && (
                    <span className="text-base line-through text-neutral-500">$69</span>
                  )}
                  <span className="text-4xl font-normal text-white">
                    ${isYearly ? '55' : '69'}
                  </span>
                  <span className="text-xs text-neutral-500">
                    /seat/month {isYearly ? 'billed annually' : 'billed monthly'}
                  </span>
                </div>

                {/* Credits total */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200 mb-6">
                  <span>
                    {(teamUsers * (isYearly ? 82800 : 6900)).toLocaleString()} credits/{isYearly ? 'year' : 'month'} total for the team
                  </span>
                  <Info size={13} className="text-neutral-500 cursor-pointer" />
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  className="w-full py-2.5 rounded-xl border border-neutral-700 bg-[#16161c] hover:bg-[#202028] text-white text-xs font-semibold transition-all cursor-pointer mb-3"
                >
                  Get Team
                </button>

                {/* Seat Stepper Widget */}
                <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-[#101015] px-4 py-2 mb-8">
                  <button
                    type="button"
                    onClick={() => setTeamUsers((prev) => Math.max(2, prev - 1))}
                    disabled={teamUsers <= 2}
                    className="text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-base px-2 leading-none"
                    aria-label="Decrease seat count"
                  >
                    −
                  </button>
                  <span className="text-xs font-semibold text-white">
                    {teamUsers} users
                  </span>
                  <button
                    type="button"
                    onClick={() => setTeamUsers((prev) => Math.min(9, prev + 1))}
                    disabled={teamUsers >= 9}
                    className="text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-base px-2 leading-none"
                    aria-label="Increase seat count"
                  >
                    +
                  </button>
                </div>

                {/* Features Categories */}
                <div className="space-y-6 text-xs">
                  {/* Category: TEAM & COLLABORATION */}
                  <div>
                    <h5 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase mb-3">
                      Team &amp; Collaboration
                    </h5>
                    <div className="space-y-2.5 text-neutral-300">
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>2 to 9 members in one workspace</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Up to 100 shared projects</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Frame-accurate commenting, including @mentioning your teammates</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-neutral-500">
                        <X size={14} className="text-neutral-600 shrink-0 mt-0.5" />
                        <span>Asset lineage</span>
                      </div>
                    </div>
                  </div>

                  {/* Category: CREATIVE CAPABILITIES */}
                  <div>
                    <h5 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase mb-3">
                      Creative Capabilities
                    </h5>
                    <div className="space-y-2.5 text-neutral-300">
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Access to all models &amp; apps</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span className="flex items-center flex-wrap gap-1">
                          <span>Generate, test and publish ads with Runway Ads</span>
                          <span className="text-[9px] bg-[#5329e7] text-white px-1.5 py-0.5 rounded-full font-semibold leading-none">
                            New
                          </span>
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Parallel generations: 24 video &amp; images</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Studio-grade formats (ProRes, image sequences)</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>HDR generations (Up to 16-bit)</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Up to 100 Brand Kits to keep your team&apos;s output consistent</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Create and share custom agent skills</span>
                      </div>
                    </div>
                  </div>

                  {/* Category: SCALE & USAGE */}
                  <div>
                    <h5 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase mb-3">
                      Scale &amp; Usage
                    </h5>
                    <div className="space-y-2.5 text-neutral-300">
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Shared credit pool</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Top up credits anytime</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>API access with credit-based usage</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Usage reporting</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>1TB storage</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-neutral-500">
                        <X size={14} className="text-neutral-600 shrink-0 mt-0.5" />
                        <span>Workspace tags for cost centers</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-neutral-500">
                        <X size={14} className="text-neutral-600 shrink-0 mt-0.5" />
                        <span>Advanced usage reporting</span>
                      </div>
                    </div>
                  </div>

                  {/* Category: ADMIN, SECURITY & COMPLIANCE */}
                  <div>
                    <h5 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase mb-3">
                      Admin, Security &amp; Compliance
                    </h5>
                    <div className="space-y-2.5 text-neutral-500">
                      <div className="flex items-start gap-2.5">
                        <X size={14} className="text-neutral-600 shrink-0 mt-0.5" />
                        <span>User roles &amp; permissions</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <X size={14} className="text-neutral-600 shrink-0 mt-0.5" />
                        <span>Sharing policies</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <X size={14} className="text-neutral-600 shrink-0 mt-0.5" />
                        <span>Custom SSO</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <X size={14} className="text-neutral-600 shrink-0 mt-0.5" />
                        <span>3P model configuration</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <X size={14} className="text-neutral-600 shrink-0 mt-0.5" />
                        <span>Tiered-admin management</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <X size={14} className="text-neutral-600 shrink-0 mt-0.5" />
                        <span>Enterprise-grade security</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <X size={14} className="text-neutral-600 shrink-0 mt-0.5" />
                        <span>Legal indemnification</span>
                      </div>
                    </div>
                  </div>

                  {/* Category: SUPPORT & SERVICES */}
                  <div>
                    <h5 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase mb-3">
                      Support &amp; Services
                    </h5>
                    <div className="space-y-2.5 text-neutral-300">
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Priority support</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-neutral-500">
                        <X size={14} className="text-neutral-600 shrink-0 mt-0.5" />
                        <span>Dedicated support including training and live Q&amp;A</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-neutral-500">
                        <X size={14} className="text-neutral-600 shrink-0 mt-0.5" />
                        <span>Onboarding services with forward deployed creatives</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: Enterprise */}
            <div className="rounded-2xl bg-[#0c0c10] border border-[#1d1d24] p-7 flex flex-col justify-between hover:border-neutral-700 transition-all text-neutral-300">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">Enterprise</h3>
                <p className="text-xs text-neutral-500 mb-6">
                  Built for organizations: security, privacy, admin controls and dedicated support
                </p>

                {/* Price Header */}
                <div className="mb-2">
                  <span className="text-4xl font-normal text-white">Let&apos;s talk</span>
                </div>

                {/* Credits / Pricing note */}
                <div className="text-xs text-neutral-400 mb-6">
                  <span className="font-semibold text-white">
                    Custom credits/{isYearly ? 'year' : 'month'}
                  </span>{' '}
                  <span className="text-neutral-400">Pay as you scale your usage</span>
                </div>

                {/* CTAs */}
                <div className="space-y-2.5 mb-8">
                  <button
                    type="button"
                    className="w-full py-2.5 rounded-xl border border-neutral-700 bg-[#16161c] hover:bg-[#202028] text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Contact sales
                  </button>
                  <button
                    type="button"
                    className="w-full py-2.5 rounded-xl border border-neutral-800 bg-[#101015] hover:bg-[#181820] text-neutral-200 text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Learn more</span>
                    <span>↗</span>
                  </button>
                </div>

                {/* Features Categories */}
                <div className="space-y-6 text-xs">
                  {/* Category: TEAM & COLLABORATION */}
                  <div>
                    <h5 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase mb-3">
                      Team &amp; Collaboration
                    </h5>
                    <div className="space-y-2.5 text-neutral-300">
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Unlimited members &amp; workspaces</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Unlimited shared projects</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Frame-accurate commenting, including @mentioning your teammates</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Asset lineage</span>
                      </div>
                    </div>
                  </div>

                  {/* Category: CREATIVE CAPABILITIES */}
                  <div>
                    <h5 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase mb-3">
                      Creative Capabilities
                    </h5>
                    <div className="space-y-2.5 text-neutral-300">
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Access to all models &amp; apps</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span className="flex items-center flex-wrap gap-1">
                          <span>Generate, test and publish ads with Runway Ads</span>
                          <span className="text-[9px] bg-[#5329e7] text-white px-1.5 py-0.5 rounded-full font-semibold leading-none">
                            New
                          </span>
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Parallel generations: 30 video &amp; images</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Studio-grade formats (ProRes, image sequences)</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>HDR generations (Up to 16-bit)</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Unlimited Brand Kits</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Unlimited custom agent skills</span>
                      </div>
                    </div>
                  </div>

                  {/* Category: SCALE & USAGE */}
                  <div>
                    <h5 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase mb-3">
                      Scale &amp; Usage
                    </h5>
                    <div className="space-y-2.5 text-neutral-300">
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Shared credit pool</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Top up credits anytime</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>API access with credit-based usage</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Usage reporting</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Custom storage</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Workspace tags for cost centers</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Advanced usage reporting</span>
                      </div>
                    </div>
                  </div>

                  {/* Category: ADMIN, SECURITY & COMPLIANCE */}
                  <div>
                    <h5 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase mb-3">
                      Admin, Security &amp; Compliance
                    </h5>
                    <div className="space-y-2.5 text-neutral-300">
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>User roles &amp; permissions</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Sharing policies</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Custom SSO</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>3P model configuration</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Tiered-admin management</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Enterprise-grade security: SOC 2 &amp; ISO/IEC 27001 compliant</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Enterprise legal indemnification</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>No training on your data</span>
                      </div>
                    </div>
                  </div>

                  {/* Category: SUPPORT & SERVICES */}
                  <div>
                    <h5 className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase mb-3">
                      Support &amp; Services
                    </h5>
                    <div className="space-y-2.5 text-neutral-300">
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Priority support</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Dedicated support including training and live Q&amp;A</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Check size={14} className="text-neutral-300 shrink-0 mt-0.5" />
                        <span>Onboarding services with forward deployed creatives</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default PricingPage;
