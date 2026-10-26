import React from 'react';

interface FooterProps {
  onOpenBeta: () => void;
  isDark?: boolean;
}
export const Footer: React.FC<FooterProps> = ({ isDark = false }) => {
  return (
    <footer className={`w-full transition-colors ${isDark ? 'bg-[#070709] border-t border-neutral-800' : 'bg-[#FBFBFA] border-t border-neutral-200'}`}>
      {/* Legal & Copyright */}
      <div className={`max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
        <div>© 2026 CREATON Inc. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a href="#" className={`transition-colors ${isDark ? 'hover:text-neutral-300' : 'hover:text-neutral-700'}`}>Terms of Service</a>
        </div>
      </div>

      {/* Bottom Black Attribution Bar with Light CREATON Logo */}
      <div className="w-full bg-[#111111] text-white py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12">
          <div className="inline-flex items-center select-none">
            <img
              src="/assets/aistudio/creaton_bi_bright_9c9b30bb.png"
              alt="CREATON"
              style={{ width: '124.469px', height: '19.1875px' }}
              className="object-contain transition-opacity duration-200 hover:opacity-85"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
