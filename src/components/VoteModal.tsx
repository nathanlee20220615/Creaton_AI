import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { CreatonLogo } from './SundayLogo';

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HatOption {
  id: string;
  name: string;
  tagline: string;
  votes: number;
  icon: string;
}

export const VoteModal: React.FC<VoteModalProps> = ({ isOpen, onClose }) => {
  const [options, setOptions] = useState<HatOption[]>([
    { id: 'chef', name: "The Director's Beret", tagline: 'For auteur cinematography & story pacing', votes: 1820, icon: '🎬' },
    { id: 'beanie', name: 'The Studio Headset', tagline: 'For sound mixing and audio orchestration', votes: 1540, icon: '🎧' },
    { id: 'beret', name: 'Vintage Viewfinder', tagline: 'For framing golden-hour anamorphic lenses', votes: 1290, icon: '🎥' },
    { id: 'cap', name: 'Classic Director Cap', tagline: 'On-set production leadership & command', votes: 1960, icon: '🧢' }
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0) + (hasVoted ? 1 : 0);

  const handleVote = (id: string) => {
    if (hasVoted) return;
    setSelectedId(id);
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt))
    );
    setHasVoted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#FBFBFA] text-[#141414] shadow-2xl border border-neutral-200 z-10 p-6 md:p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <CreatonLogo height={18} />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                · Community Poll
              </span>
            </div>

            <h3 className="text-2xl font-display font-bold text-neutral-900">
              Which tool should Creaton unlock next?
            </h3>
            <p className="text-xs text-neutral-500 mt-1 mb-6">
              Vote on the next specialized AI directorial workflow to enter our early beta.
            </p>

            <div className="space-y-3">
              {options.map((option) => {
                const percent = Math.round((option.votes / totalVotes) * 100);
                const isSelected = selectedId === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleVote(option.id)}
                    disabled={hasVoted}
                    className={`relative w-full overflow-hidden text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                        : 'border-neutral-200 bg-white hover:border-neutral-400'
                    }`}
                  >
                    {/* Percentage Fill Bar */}
                    {hasVoted && (
                      <div
                        className={`absolute left-0 top-0 bottom-0 transition-all duration-700 ${
                          isSelected ? 'bg-amber-100/60' : 'bg-neutral-100'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{option.icon}</span>
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 flex items-center gap-1.5">
                            {option.name}
                            {isSelected && (
                              <span className="text-xs font-normal text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                                Your Vote
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-neutral-500">{option.tagline}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        {hasVoted ? (
                          <span className="font-mono text-sm font-semibold text-neutral-800">
                            {percent}%
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-neutral-400 group-hover:text-black">
                            Vote
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {hasVoted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-200 text-xs text-neutral-500"
              >
                <div className="flex items-center gap-1.5 text-neutral-800 font-medium">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Vote counted ({totalVotes.toLocaleString()} total votes)</span>
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-full bg-neutral-900 text-white font-medium hover:bg-black transition-colors cursor-pointer"
                >
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VoteModal;
