import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Check } from 'lucide-react';

interface FoundingBannerProps {
  onOpenBeta?: () => void;
}

export const FoundingBanner: React.FC<FoundingBannerProps> = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section id="pricing" className="w-full pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-6 scroll-mt-20">
      {/* Newsletter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full rounded-2xl bg-[#EDEDEA] border border-neutral-300/60 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-neutral-700"
      >
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
          <span className="font-medium text-neutral-900">Get the latest in your inbox</span>
          <span className="hidden sm:inline text-neutral-400">·</span>
          <span className="text-neutral-500">Sign up to our newsletter</span>
        </div>

        {subscribed ? (
          <div className="flex items-center gap-2 text-emerald-700 font-medium text-xs bg-emerald-100/60 px-4 py-2 rounded-full">
            <Check size={14} />
            <span>Thank you for subscribing to Sunday Journal.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-56 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs focus:border-neutral-900 focus:outline-none placeholder:text-neutral-400"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-black transition-colors shrink-0 cursor-pointer"
            >
              <span>Subscribe</span>
              <Plus size={13} />
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default FoundingBanner;
