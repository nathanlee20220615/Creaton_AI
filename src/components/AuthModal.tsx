import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Lock, Mail, User } from 'lucide-react';
import { CreatonLogo } from './SundayLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'join';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'join'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSubmitted(false);
      setEmail('');
      setPassword('');
      setName('');
    }
  }, [isOpen, initialMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail('');
    setPassword('');
    setName('');
    onClose();
  };

  const handleSocialLogin = (provider: 'Apple' | 'Google') => {
    setEmail(`director@${provider.toLowerCase()}.com`);
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ paddingLeft: '50px', paddingRight: '50px', paddingBottom: '80px' }}
            className="relative w-full max-w-md rounded-2xl bg-[#FBFBFA] text-[#141414] shadow-2xl border border-neutral-200 z-10 pt-5 sm:pt-6 overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleReset}
              className="absolute right-4 top-4 p-1.5 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Brand Logo & Header */}
            <div className="mb-4 flex flex-col items-center text-center">
              <CreatonLogo height={18} />
              <h2 className="mt-2.5 text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-display">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-neutral-500">
                {mode === 'login'
                  ? 'Sign in to access your autonomous director studio'
                  : 'Join the next generation of creative filmmaking'}
              </p>
            </div>

            {/* Mode Switch Tabs */}
            <div className="mb-3.5 flex rounded-lg bg-neutral-100 p-0.5 text-xs sm:text-sm font-medium">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setSubmitted(false);
                }}
                className={`flex-1 rounded-md py-1.5 text-center transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('join');
                  setSubmitted(false);
                }}
                className={`flex-1 rounded-md py-1.5 text-center transition-all cursor-pointer ${
                  mode === 'join'
                    ? 'bg-white text-neutral-900 shadow-sm font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Join
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-6 text-center space-y-4"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900">
                  {mode === 'login' ? 'Logged in successfully' : 'Welcome to CREATON'}
                </h3>
                <p className="text-sm text-neutral-600 max-w-xs mx-auto">
                  {mode === 'login'
                    ? `Welcome back, ${email}. Redirecting to your director workspace...`
                    : `Account created for ${email}. We've sent a confirmation link to your inbox.`}
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="w-full rounded-full bg-neutral-900 py-2.5 text-sm font-semibold text-white hover:bg-black transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
                {mode === 'join' && (
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-2.5 text-neutral-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full rounded-xl border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-600 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-2.5 text-neutral-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="director@creaton.ai"
                      className="w-full rounded-xl border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                      Password
                    </label>
                    {mode === 'login' && (
                      <a href="#" className="text-[11px] text-neutral-500 hover:text-black transition-colors">
                        Forgot?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-2.5 text-neutral-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-xl border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>
                </div>

                {/* Actions & Social Logins Group (shifted down per user request) */}
                <div className="pt-4 sm:pt-6 space-y-2.5">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-neutral-900 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-black transition-colors cursor-pointer"
                  >
                    <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight size={14} />
                  </button>

                {/* Divider: or */}
                <div className="relative my-2 sm:my-2.5 flex items-center justify-center">
                  <div className="w-full border-t border-neutral-200" />
                  <span className="absolute bg-[#FBFBFA] px-2.5 text-[11px] text-neutral-400 font-normal">
                    or
                  </span>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-2">
                  {/* Continue with Apple */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Apple')}
                    className="w-full flex items-center justify-center gap-2.5 rounded-full border border-neutral-300/80 bg-white py-2 sm:py-2.5 text-xs sm:text-[13px] font-medium text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    <svg className="w-3.5 h-3.5 fill-current text-black shrink-0" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.99-6.3-9.77-11.23-20.73-14.79-32.88-3.56-12.15-5.34-23.47-5.34-33.97 0-14.36 3.63-26.25 10.89-35.67 7.26-9.42 16.32-14.24 27.18-14.46 4.9 0 10.37 1.34 16.42 4.02 6.05 2.68 9.94 4.08 11.67 4.2 1.95-.24 5.99-1.68 12.13-4.32 6.13-2.65 11.36-3.88 15.68-3.7 11.53.53 20.89 4.6 28.08 12.2-10.23 6.19-15.22 15-14.98 26.43.24 9.04 3.69 16.58 10.35 22.61 6.66 6.03 14.54 9.42 23.63 10.17-2.33 7.03-5.26 14.52-8.79 22.48zM119.22 31.84c0-7.14 2.64-13.88 7.92-20.22 5.28-6.34 11.75-10.33 19.41-11.97.23 1.41.35 2.7.35 3.88 0 7.25-2.8 14.16-8.4 20.72-5.6 6.56-12.27 10.38-20.02 11.47-.35-1.29-.53-2.58-.53-3.88z" />
                    </svg>
                    <span>Continue with Apple</span>
                  </button>

                  {/* Continue with Google */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    className="w-full flex items-center justify-center gap-2.5 rounded-full border border-neutral-300/80 bg-white py-2 sm:py-2.5 text-xs sm:text-[13px] font-medium text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </div>

                <div className="pt-2 text-center text-[11px] text-neutral-400">
                  By continuing, you agree to CREATON's{' '}
                  <a href="#" className="underline hover:text-neutral-700">Terms of Service</a> and{' '}
                  <a href="#" className="underline hover:text-neutral-700">Privacy Policy</a>.
                </div>
              </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
