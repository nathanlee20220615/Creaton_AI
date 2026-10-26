import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  Image as ImageIcon,
  Video,
  Music,
  Grid,
  Folder,
  Plus,
  X,
  Trash2
} from 'lucide-react';
import { AuthModal } from './AuthModal';

interface DetailWorkspaceProps {
  onBackToHome: () => void;
  onNavigatePricing?: () => void;
}

export const DetailWorkspace: React.FC<DetailWorkspaceProps> = ({ onBackToHome, onNavigatePricing }) => {
  const [activeNav, setActiveNav] = useState('Home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
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

  const langCodeLabels: Record<'en' | 'ko' | 'ja', string> = {
    en: 'EN',
    ko: 'KR',
    ja: 'JP',
  };
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('creaton_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('creaton_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };
  const [projects, setProjects] = useState<Array<{ id: string; title: string; createdAt: string }>>(() => {
    try {
      const saved = localStorage.getItem('creaton_projects');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    const initialProjects = [
      { id: '1', title: 'Untitled Project #1', createdAt: 'Today' }
    ];
    try {
      localStorage.setItem('creaton_projects', JSON.stringify(initialProjects));
    } catch {
      // ignore
    }
    return initialProjects;
  });

  useEffect(() => {
    try {
      localStorage.setItem('creaton_projects', JSON.stringify(projects));
    } catch {
      // ignore
    }
  }, [projects]);

  const handleResetToDefault = () => {
    setActiveNav('Home');
  };

  const handleCreateNewProject = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const name = projectName.trim() || `New Project #${projects.length + 1}`;
    setProjects((prev) => {
      const next = [
        ...prev,
        { id: Date.now().toString(), title: name, createdAt: 'Just now' }
      ];
      try {
        localStorage.setItem('creaton_projects', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    setProjectName('');
    setIsCreateModalOpen(false);
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== projectId);
      try {
        localStorage.setItem('creaton_projects', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <div
      className="min-h-screen bg-[#070709] text-white flex flex-col font-outfit selection:bg-neutral-800"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="flex flex-1 overflow-hidden font-outfit" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {/* ================= LEFT SIDEBAR ================= */}
        <aside
          className={`${
            isCollapsed ? 'w-[68px]' : 'w-60'
          } shrink-0 border-r border-[#1a1a1f] bg-[#070709] flex flex-col justify-between select-none overflow-x-hidden overflow-y-auto px-3 py-3.5 transition-[width] duration-300 ease-in-out will-change-[width]`}
        >
          {/* Top Brand & Main Nav */}
          <div>
            {/* Brand Logo & Collapse Toggle */}
            <div className="flex items-center justify-between h-9 mb-4 overflow-hidden px-1.5 pt-0.5">
              <button
                type="button"
                onClick={onBackToHome}
                className={`flex items-center hover:opacity-85 transition-all duration-300 ease-in-out cursor-pointer text-left whitespace-nowrap overflow-hidden py-1 ${
                  isCollapsed ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-[130px] opacity-100'
                }`}
                title="CREATON Home / Landing"
                tabIndex={isCollapsed ? -1 : 0}
              >
                <img
                  src="/assets/aistudio/creaton_bi_bright_9c9b30bb.png"
                  alt="CREATON"
                  className="shrink-0 object-contain"
                  style={{ width: '124.469px', height: '19.1875px' }}
                />
              </button>
              <button
                type="button"
                onClick={toggleSidebar}
                className="w-8 h-8 rounded-lg text-neutral-400 hover:text-white hover:bg-[#141418] transition-colors cursor-pointer flex items-center justify-center shrink-0"
                title={isCollapsed ? "사이드 메뉴 펼치기" : "사이드 메뉴 접기"}
                aria-label={isCollapsed ? "사이드 메뉴 펼치기" : "사이드 메뉴 접기"}
              >
                <img
                  src="/assets/aistudio/sidebar_68c1124f.svg"
                  alt={isCollapsed ? "사이드 메뉴 펼치기" : "사이드 메뉴 접기"}
                  className="w-[19px] h-[19px] object-contain opacity-85 hover:opacity-100 transition-opacity"
                  style={{ width: '19px', height: '19px' }}
                />
              </button>
            </div>

            {/* Home Item */}
            <div className="space-y-1 mb-4">
              <button
                type="button"
                onClick={handleResetToDefault}
                className={`w-full h-10 flex items-center px-3 rounded-xl text-xs font-medium transition-colors cursor-pointer group ${
                  activeNav === 'Home'
                    ? 'bg-[#141418] text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-[#0f0f13]'
                }`}
                title="Home"
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <Home size={16} className={activeNav === 'Home' ? 'text-white' : 'text-neutral-300 group-hover:text-white transition-colors'} />
                </div>
                <span
                  className={`font-['Outfit'] text-[14px] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                    isCollapsed
                      ? 'max-w-0 opacity-0 ml-0 -translate-x-2 pointer-events-none'
                      : 'max-w-[150px] opacity-100 ml-3 translate-x-0'
                  }`}
                  style={{ fontSize: '14px', fontFamily: 'Outfit' }}
                >
                  Home
                </span>
              </button>
            </div>

            {/* Section: CREATION */}
            <div className="mb-1">
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveNav('Image')}
                  className={`w-full h-10 flex items-center px-3 rounded-xl text-xs font-medium transition-colors cursor-pointer group ${
                    activeNav === 'Image' ? 'bg-[#141418] text-white' : 'text-neutral-400 hover:text-white hover:bg-[#0f0f13]'
                  }`}
                  title="Image"
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <ImageIcon size={16} className={activeNav === 'Image' ? 'text-white' : 'text-neutral-400 group-hover:text-white transition-colors'} />
                  </div>
                  <span
                    className={`font-['Outfit'] text-[14px] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                      isCollapsed
                        ? 'max-w-0 opacity-0 ml-0 -translate-x-2 pointer-events-none'
                        : 'max-w-[150px] opacity-100 ml-3 translate-x-0'
                    }`}
                    style={{ fontSize: '14px', fontFamily: 'Outfit' }}
                  >
                    Image
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNav('Video')}
                  className={`w-full h-10 flex items-center px-3 rounded-xl text-xs font-medium transition-colors cursor-pointer group ${
                    activeNav === 'Video' ? 'bg-[#141418] text-white' : 'text-neutral-400 hover:text-white hover:bg-[#0f0f13]'
                  }`}
                  title="Video"
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <Video size={16} className={activeNav === 'Video' ? 'text-white' : 'text-neutral-400 group-hover:text-white transition-colors'} />
                  </div>
                  <span
                    className={`font-['Outfit'] text-[14px] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                      isCollapsed
                        ? 'max-w-0 opacity-0 ml-0 -translate-x-2 pointer-events-none'
                        : 'max-w-[150px] opacity-100 ml-3 translate-x-0'
                    }`}
                    style={{ fontSize: '14px', fontFamily: 'Outfit' }}
                  >
                    Video
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveNav('Audio')}
                  className={`w-full h-10 flex items-center px-3 rounded-xl text-xs font-medium transition-colors cursor-pointer group ${
                    activeNav === 'Audio' ? 'bg-[#141418] text-white' : 'text-neutral-400 hover:text-white hover:bg-[#0f0f13]'
                  }`}
                  title="Audio"
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <Music size={16} className={activeNav === 'Audio' ? 'text-white' : 'text-neutral-400 group-hover:text-white transition-colors'} />
                  </div>
                  <span
                    className={`font-['Outfit'] text-[14px] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                      isCollapsed
                        ? 'max-w-0 opacity-0 ml-0 -translate-x-2 pointer-events-none'
                        : 'max-w-[150px] opacity-100 ml-3 translate-x-0'
                    }`}
                    style={{ fontSize: '14px', fontFamily: 'Outfit' }}
                  >
                    Audio
                  </span>
                </button>
              </nav>
            </div>

            {/* Section: TOOLS */}
            <div>
              <nav className="space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveNav('Studio')}
                  className={`w-full h-10 flex items-center px-3 rounded-xl text-xs font-medium transition-colors cursor-pointer group ${
                    activeNav === 'Studio' ? 'bg-[#141418] text-white' : 'text-neutral-400 hover:text-white hover:bg-[#0f0f13]'
                  }`}
                  title="Studio"
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <Grid size={16} className={activeNav === 'Studio' ? 'text-white' : 'text-neutral-400 group-hover:text-white transition-colors'} />
                  </div>
                  <span
                    className={`font-['Outfit'] text-[14px] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                      isCollapsed
                        ? 'max-w-0 opacity-0 ml-0 -translate-x-2 pointer-events-none'
                        : 'max-w-[150px] opacity-100 ml-3 translate-x-0'
                    }`}
                    style={{ fontSize: '14px', fontFamily: 'Outfit' }}
                  >
                    Studio
                  </span>
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Sidebar: Assets */}
          <div className="pt-4 border-t border-[#1a1a1f] space-y-1">
            <button
              type="button"
              onClick={() => setActiveNav('Assets')}
              className={`w-full h-10 flex items-center px-3 rounded-xl text-xs font-medium transition-colors cursor-pointer group ${
                activeNav === 'Assets' ? 'bg-[#141418] text-white' : 'text-neutral-400 hover:text-white hover:bg-[#0f0f13]'
              }`}
              title="Assets"
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <Folder size={16} className={activeNav === 'Assets' ? 'text-white' : 'text-neutral-400 group-hover:text-white transition-colors'} />
              </div>
              <span
                className={`font-['Outfit'] text-[14px] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                  isCollapsed
                    ? 'max-w-0 opacity-0 ml-0 -translate-x-2 pointer-events-none'
                    : 'max-w-[150px] opacity-100 ml-3 translate-x-0'
                }`}
                style={{ fontSize: '14px', fontFamily: 'Outfit' }}
              >
                Assets
              </span>
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <main
          className="flex-1 flex flex-col min-w-0 bg-[#070709] overflow-y-auto select-none outline-none caret-transparent cursor-default"
          style={{ userSelect: 'none', WebkitUserSelect: 'none', caretColor: 'transparent', outline: 'none' }}
        >
          {/* Top Bar matching screenshot */}
          <header
            className="h-[60px] pt-0 pb-[8px] pl-[2px] pr-6 mt-[5px] mb-0 border-b border-[#1a1a1f] flex items-center justify-between shrink-0"
            style={{ height: '60px', paddingBottom: '8px', marginTop: '5px', marginBottom: '0px', paddingLeft: '2px', paddingTop: '0px' }}
          >
            {/* Left Header Spacer */}
            <div className="flex items-center gap-3" />

            {/* Right Header Navigation matching screenshot */}
            <div className="flex items-center gap-4 text-xs font-medium text-neutral-300">
              {/* Language Selector (identical to Pricing page navbar) */}
              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 py-1 transition-colors focus:outline-none cursor-pointer select-none text-neutral-200 hover:text-white"
                  aria-label={`Select language. Current language: ${langCodeLabels[selectedLang]}`}
                >
                  {/* Globe Icon */}
                  <svg
                    className="w-[18px] h-[18px] shrink-0 text-neutral-300"
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
                    style={{ fontFamily: 'Outfit, sans-serif', color: '#ffffff' }}
                  >
                    {langCodeLabels[selectedLang]}
                  </span>

                  {/* Dropdown Triangle Caret */}
                  <svg
                    className={`w-2 h-2 fill-current ml-0.5 transition-transform duration-200 text-white ${
                      langDropdownOpen ? 'rotate-180' : ''
                    }`}
                    viewBox="0 0 10 6"
                  >
                    <path d="M0 0l5 6 5-6z" fill="#ffffff" />
                  </svg>
                </button>

                {/* Language Dropdown Menu */}
                {langDropdownOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-36 rounded-xl py-1.5 shadow-xl backdrop-blur-md z-50 text-xs transition-all border border-neutral-800 bg-[#121215]/95 text-neutral-200 shadow-black/40"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {[
                      { code: 'en' as const, label: 'English', badge: 'EN' },
                      { code: 'ko' as const, label: '한국어', badge: 'KR' },
                      { code: 'ja' as const, label: '日本語', badge: 'JP' },
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
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
                            ? 'font-semibold text-white bg-white/10'
                            : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">
                            {lang.badge}
                          </span>
                          <span>{lang.label}</span>
                        </span>
                        {selectedLang === lang.code && (
                          <span className="text-[10px] font-bold text-white">
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Pricing */}
              <button
                type="button"
                onClick={onNavigatePricing}
                className="text-[16px] text-neutral-300 hover:text-white transition-colors cursor-pointer"
                style={{ fontSize: '16px' }}
              >
                Pricing
              </button>

              {/* Login Button (Pill Design matching /assets/aistudio/image_e97235d9.png) */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="rounded-full bg-[#00dfef] hover:bg-[#34e5f2] active:scale-95 text-[16px] font-semibold text-black transition-all cursor-pointer shadow-sm select-none flex items-center justify-center shrink-0 font-['Outfit']"
                style={{ fontFamily: 'Outfit', fontSize: '16px', width: '74px', height: '32px' }}
                title="Login"
              >
                <img
                  src="/assets/aistudio/image_e97235d9.png"
                  alt="Login"
                  className="h-4 w-auto object-contain hidden"
                  aria-hidden="true"
                />
                <span>Login</span>
              </button>

              {/* + Create Project Button */}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center justify-center gap-1.5 rounded-full border border-white/40 hover:border-white/75 bg-white/[0.03] hover:bg-white/[0.08] px-3.5 py-1 font-semibold text-white transition-all duration-200 cursor-pointer h-[32px] w-[157px] backdrop-blur-[2px] shadow-[0_0_12px_rgba(255,255,255,0.04)]"
                style={{ height: '32px', width: '157px', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.4)' }}
              >
                <Plus size={14} strokeWidth={1.8} className="opacity-95" />
                <span
                  className="text-[16px] font-['Outfit'] antialiased"
                  style={{ fontSize: '16px', fontFamily: 'Outfit' }}
                >
                  Create Project
                </span>
              </button>
            </div>
          </header>

          {/* Main Body */}
          <div className="p-8 lg:p-10 max-w-7xl w-full">
            {/* Canvas Project Cards Grid (renders user projects if any) */}
            {projects.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="group">
                    <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#191920] to-[#111116] border border-neutral-800 p-4 flex flex-col justify-between shadow-lg hover:border-neutral-600 transition-all relative">
                      <div className="flex items-center justify-between text-neutral-500 text-[10px]">
                        <span>PROJECT</span>
                        <div className="flex items-center gap-1.5">
                          <span>{proj.createdAt}</span>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteProject(proj.id, e)}
                            className="p-1 -mr-1 rounded text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                            title="프로젝트 삭제"
                            aria-label="프로젝트 삭제"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2.5 text-xs sm:text-sm font-medium text-neutral-200 truncate">
                      {proj.title}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* New Project Creator Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-[#121216] border border-neutral-800 p-6 text-white shadow-2xl">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold mb-1">Create New Project</h3>
            <p className="text-xs text-neutral-400 mb-4">
              Enter a name for your autonomous director project workspace.
            </p>
            <form onSubmit={handleCreateNewProject} className="space-y-4">
              <input
                type="text"
                autoFocus
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Sci-Fi Film Project #1"
                className="w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-400"
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-cyan-400 text-black font-semibold text-xs hover:bg-cyan-300 transition-colors cursor-pointer"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Auth Modal for Login */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </div>
  );
};

export default DetailWorkspace;
