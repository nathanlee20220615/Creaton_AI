import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

export interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  duration?: string;
  kicker?: string;
  imageSrc?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title,
  duration = '5:00',
  kicker = 'Autonomous Chores',
  imageSrc
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(12);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(12);
      setIsPlaying(true);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.4));
    }, 100);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-[#0f0f10] text-white shadow-2xl border border-white/10 z-10"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-wider uppercase text-neutral-400">
                  {kicker}
                </span>
                <span className="text-xs text-white/30">·</span>
                <span className="text-xs font-medium text-amber-300">
                  {duration}
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player Canvas */}
            <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center group">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-neutral-500">
                  No preview available
                </div>
              )}

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Center Play/Pause Overlay indicator */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transition-transform hover:scale-110 shadow-lg">
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </div>
              </button>

              {/* Title overlay in video */}
              <div className="absolute bottom-16 left-6 right-6 pointer-events-none">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white drop-shadow-md">
                  {title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1">
                  100% Uncut Autonomous Execution · Sunday Neural Skill Model v3
                </p>
              </div>

              {/* Bottom Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-2">
                {/* Progress bar */}
                <div
                  className="relative h-1.5 w-full cursor-pointer rounded-full bg-white/20 overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setProgress((clickX / rect.width) * 100);
                  }}
                >
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-300 pt-1">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-white transition-colors"
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button
                      onClick={() => setProgress(0)}
                      className="hover:text-white transition-colors"
                      title="Restart"
                    >
                      <RotateCcw size={14} />
                    </button>
                    <span className="font-mono text-[11px] text-neutral-400">
                      {Math.floor((progress / 100) * 300)}s / 300s
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-white transition-colors"
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <Maximize2 size={16} className="text-neutral-400 cursor-pointer hover:text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Explanatory footer */}
            <div className="px-6 py-4 bg-[#141416] flex items-center justify-between text-xs text-neutral-400">
              <span>All Memo video footage captured in active partner family homes.</span>
              <button
                onClick={onClose}
                className="text-neutral-300 hover:text-white underline underline-offset-4"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
