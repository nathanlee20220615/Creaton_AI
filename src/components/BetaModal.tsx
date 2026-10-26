import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { CreatonLogo } from './SundayLogo';

interface BetaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'founding' | 'beta';
}

export const BetaModal: React.FC<BetaModalProps> = ({
  isOpen,
  onClose,
  initialType = 'founding'
}) => {
  const [tier, setTier] = useState<'founding' | 'beta'>(initialType);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [household, setHousehold] = useState('2-4 people');
  const [primaryChore, setPrimaryChore] = useState('Directing & Video Creation');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setEmail('');
    setName('');
    setCity('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#FBFBFA] text-[#141414] shadow-2xl border border-neutral-200 z-10 p-6 md:p-8"
          >
            <button
              onClick={resetForm}
              className="absolute top-5 right-5 rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-display font-semibold text-neutral-900">
                  Application Received
                </h3>
                <p className="text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-neutral-900">{name || 'creator'}</span>. We have added <span className="font-semibold text-neutral-900">{email}</span> to our private Creator Beta queue.
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CreatonLogo height={20} />
                </div>

                <h3 className="text-2xl font-display font-bold text-neutral-900">
                  {tier === 'founding' ? 'Join the Founding Creators' : 'Apply for CREATON Beta'}
                </h3>
                <p className="text-xs text-neutral-500 mt-1 mb-6">
                  Early studio access, priority GPU generation quotas, and custom fine-tuning tools.
                </p>

                {/* Tier Selection Tabs */}
                <div className="flex gap-2 p-1 bg-neutral-100 rounded-xl mb-5">
                  <button
                    type="button"
                    onClick={() => setTier('founding')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                      tier === 'founding'
                        ? 'bg-white text-black shadow-sm'
                        : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    Founding Creator
                  </button>
                  <button
                    type="button"
                    onClick={() => setTier('beta')}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                      tier === 'beta'
                        ? 'bg-white text-black shadow-sm'
                        : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    General Beta
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all placeholder:text-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all placeholder:text-neutral-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        City / Region
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mountain View, CA"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all placeholder:text-neutral-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-700 mb-1">
                        Creator Role
                      </label>
                      <select
                        value={household}
                        onChange={(e) => setHousehold(e.target.value)}
                        className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
                      >
                        <option>Director / Filmmaker</option>
                        <option>Content Creator</option>
                        <option>Creative Agency</option>
                        <option>Hobbyist / Enthusiast</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Primary Goal
                    </label>
                    <select
                      value={primaryChore}
                      onChange={(e) => setPrimaryChore(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 transition-all"
                    >
                      <option>AI Video Directing & Storyboarding</option>
                      <option>Commercial Production & Ads</option>
                      <option>Short Film & Animation Creation</option>
                      <option>Social Media Reel Directing</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3 text-xs font-semibold text-white hover:bg-black transition-colors cursor-pointer"
                  >
                    <span>Submit Application</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BetaModal;
