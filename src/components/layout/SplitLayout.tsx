import React, { useRef, useState, useEffect } from 'react';
import { LeftProfilePanel } from './LeftProfilePanel';
import { HeroSection } from '../hero/HeroSection';
import { AboutSection } from '../about/AboutSection';
import { ProjectsSection } from '../projects/ProjectsSection';
import { ArchitectureSection } from '../architecture/ArchitectureSection';
import { AIInteractivePlayground } from '../playground/AIInteractivePlayground';
import { SkillsSection } from '../skills/SkillsSection';
import { ExperienceSection } from '../experience/ExperienceSection';
import { EducationSection } from '../education/EducationSection';
import { CertificationsSection } from '../certifications/CertificationsSection';
import { TimelineSection } from '../timeline/TimelineSection';
import { ContactSection } from '../contact/ContactSection';
import { RecruiterQuickScan } from '../recruiter/RecruiterQuickScan';
import { CommandPalette } from '../terminal/CommandPalette';
import { Toast, ToastMessage } from '../ui/Toast';
import { ResumeModal } from '../ui/ResumeModal';
import { CustomCursor } from './CustomCursor';
import { ArrowUp, Sparkles, Terminal, Search, Clock, Rows3, Layers, ChevronLeft, ChevronRight, Volume2, VolumeX, Palette, Check } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { Project } from '../../types';
import { soundEngine } from '../../utils/audio';
import { AccentTheme, ACCENT_THEMES, getStoredAccentTheme, setStoredAccentTheme } from '../../utils/theme';

export type ViewMode = 'continuous' | 'focused';

export const SECTION_CONFIG = [
  { id: 'hero', label: 'Home', number: '01' },
  { id: 'about', label: 'About', number: '02' },
  { id: 'projects', label: 'Projects', number: '03' },
  { id: 'architecture', label: 'Architecture', number: '04' },
  { id: 'ai-playground', label: 'AI Playground', number: '05' },
  { id: 'skills', label: 'Skills', number: '06' },
  { id: 'experience', label: 'Experience', number: '07' },
  { id: 'education', label: 'Education', number: '08' },
  { id: 'certifications', label: 'Certifications', number: '09' },
  { id: 'timeline', label: 'Timeline', number: '10' },
  { id: 'contact', label: 'Contact', number: '11' },
];

export const SplitLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [viewMode, setViewMode] = useState<ViewMode>('continuous');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isRecruiterScan, setIsRecruiterScan] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [accentTheme, setAccentTheme] = useState<AccentTheme>('cyan');
  const [isThemePickerOpen, setIsThemePickerOpen] = useState<boolean>(false);

  const rightContainerRef = useRef<HTMLDivElement>(null);

  const sectionIds = SECTION_CONFIG.map((s) => s.id);

  // Initialize theme & sound from persistent storage
  useEffect(() => {
    setSoundEnabled(soundEngine.getSoundEnabled());
    const savedTheme = getStoredAccentTheme();
    setAccentTheme(savedTheme);
    document.documentElement.setAttribute('data-accent', savedTheme);
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.setSoundEnabled(next);
    setToast({
      id: Date.now().toString(),
      type: 'info',
      title: next ? 'Tactile Audio Feedback ON' : 'Audio Feedback Muted',
      message: next ? 'Synthesizer micro-sounds are active on interactions.' : 'Audio effects silenced.',
    });
  };

  const handleSelectAccentTheme = (theme: AccentTheme) => {
    setAccentTheme(theme);
    setStoredAccentTheme(theme);
    soundEngine.playSwitch();
    setIsThemePickerOpen(false);
    setToast({
      id: Date.now().toString(),
      type: 'info',
      title: `Accent Theme: ${ACCENT_THEMES[theme].name}`,
      message: 'Active accent color updated across portfolio.',
    });
  };

  // Global shortcut for Command Palette (Cmd + K / Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll listener for desktop right container with requestAnimationFrame throttle
  useEffect(() => {
    const container = rightContainerRef.current;
    if (!container) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const { scrollTop, scrollHeight, clientHeight } = container;
        const maxScroll = scrollHeight - clientHeight;
        const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
        setScrollProgress(progress);
        setShowBackToTop(scrollTop > 400);

        if (viewMode === 'focused') return;

        const containerTop = container.getBoundingClientRect().top;
        let currentSection = sectionIds[0];
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            const relativeTop = rect.top - containerTop;
            if (relativeTop <= clientHeight * 0.35) {
              currentSection = id;
            }
          }
        }
        setActiveSection(currentSection);
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [viewMode, sectionIds]);

  // Window scroll listener for mobile single-column layout with requestAnimationFrame throttle
  useEffect(() => {
    let rafId: number | null = null;

    const handleWindowScroll = () => {
      if (window.innerWidth >= 1024) return;
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const maxScroll = scrollHeight - clientHeight;
        const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
        setScrollProgress(progress);
        setShowBackToTop(scrollTop > 400);

        if (viewMode === 'focused') return;

        let currentSection = sectionIds[0];
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= clientHeight * 0.4) {
              currentSection = id;
            }
          }
        }
        setActiveSection(currentSection);
      });
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [viewMode, sectionIds]);

  // Navigation handler (Supports both Continuous Scroll and Focused Tab View)
  const handleNavigate = (sectionId: string) => {
    soundEngine.playClick();
    setActiveSection(sectionId);

    if (viewMode === 'focused') {
      if (window.innerWidth >= 1024 && rightContainerRef.current) {
        rightContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    if (window.innerWidth >= 1024 && rightContainerRef.current) {
      // Desktop: Scroll inside right container
      const container = rightContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const scrollOffset = targetRect.top - containerRect.top + container.scrollTop - 20;

      container.scrollTo({
        top: scrollOffset,
        behavior: 'smooth',
      });
    } else {
      // Mobile / Tablet: Smooth window scroll
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleViewMode = (mode: ViewMode) => {
    soundEngine.playSwitch();
    setViewMode(mode);
    if (window.innerWidth >= 1024 && rightContainerRef.current) {
      rightContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const currentLabel = SECTION_CONFIG.find((s) => s.id === activeSection)?.label || activeSection;
    setToast({
      id: Date.now().toString(),
      type: 'info',
      title: mode === 'focused' ? 'Focused Tab Mode Activated' : 'Continuous Flow Mode Activated',
      message:
        mode === 'focused'
          ? `Now viewing "${currentLabel}". Click any section in the index to display it.`
          : 'All sections are now seamlessly viewable in a continuous scroll.',
    });
  };

  const handleBackToTop = () => {
    soundEngine.playClick();
    if (window.innerWidth >= 1024 && rightContainerRef.current) {
      rightContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyEmail = async () => {
    soundEngine.playSuccess();
    const email = 'ankitkgupta1123@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setToast({
        id: Date.now().toString(),
        type: 'success',
        title: 'Email Copied',
        message: `${email} is now on your clipboard.`,
      });
    } catch {
      setToast({
        id: Date.now().toString(),
        type: 'info',
        title: 'Direct Email',
        message: email,
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#090a0f] text-[#f1f5f9] flex flex-col lg:flex-row overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Top Global Scroll Progress Bar */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none"
      >
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 transition-all duration-150 ease-out shadow-sm shadow-cyan-400/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* LEFT PANEL: Fixed 50% Desktop, 38% Tablet, Top Stack on Mobile */}
      <div className="w-full lg:w-1/2 xl:w-[48%] lg:fixed lg:top-0 lg:left-0 lg:bottom-0 lg:h-screen z-20">
        <LeftProfilePanel
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenResume={() => setIsResumeOpen(true)}
          onCopyEmail={handleCopyEmail}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onToggleRecruiterMode={() => setIsRecruiterScan((prev) => !prev)}
          isRecruiterScan={isRecruiterScan}
          viewMode={viewMode}
          onToggleViewMode={() => handleToggleViewMode(viewMode === 'continuous' ? 'focused' : 'continuous')}
          onToast={setToast}
        />
      </div>

      {/* RIGHT PANEL: Scrollable Showcase (Offset by 50% on Desktop) */}
      <div className="w-full lg:w-1/2 xl:w-[52%] lg:ml-auto min-h-screen flex flex-col">
        <main
          ref={rightContainerRef}
          id="main-content-scroll-area"
          className="flex-1 lg:h-screen lg:overflow-y-auto custom-scrollbar px-6 sm:px-10 lg:px-12 xl:px-16 pt-6 pb-24"
        >
          {/* Subtle Mobile Brand Header (Visible only on mobile before scroll) */}
          <div className="lg:hidden flex items-center justify-between py-2 mb-4 border-b border-white/[0.06] text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ANKIT KUMAR PORTFOLIO</span>
            </span>
            <span>AI / FULL STACK</span>
          </div>

          {/* Top Quick Utility Toolbar: Recruiter Scan, Dual View Mode Switcher & Command Palette */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRecruiterScan((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isRecruiterScan
                    ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/[0.08]'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isRecruiterScan ? 'Close 30s Scan' : '30-Sec Recruiter Scan'}</span>
              </button>

              {/* Dual Mode Switcher: Continuous Flow vs Focused Tab View */}
              <div
                className="flex items-center p-0.5 rounded-xl bg-white/[0.03] border border-white/[0.08]"
                role="group"
                aria-label="View Mode Switcher"
              >
                <button
                  type="button"
                  onClick={() => handleToggleViewMode('continuous')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    viewMode === 'continuous'
                      ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title="Continuous Flow: View all sections in a seamless vertical scroll"
                >
                  <Rows3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Continuous</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleViewMode('focused')}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    viewMode === 'focused'
                      ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  title="Focused Tab View: Display one section at a time as you click tabs"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Focused Tab</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsCommandPaletteOpen(true)}
                className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                title="Open Command Palette (Cmd + K)"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] border border-white/[0.1] text-[10px]">
                  ⌘K
                </kbd>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Sound Effects Toggle Button */}
              <button
                type="button"
                onClick={handleToggleSound}
                className="p-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title={soundEnabled ? 'Tactile Sound FX: ON (Click to Mute)' : 'Tactile Sound FX: Muted (Click to Enable)'}
                aria-label="Toggle Sound Effects"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-zinc-500" />
                )}
              </button>

              {/* Cyber Accent Palette Picker */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setIsThemePickerOpen(!isThemePickerOpen);
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Switch Cyber Theme Accent Color"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full ring-1 ring-white/20"
                    style={{ backgroundColor: ACCENT_THEMES[accentTheme].hex }}
                  />
                  <span className="hidden sm:inline text-[11px]">{ACCENT_THEMES[accentTheme].name.split(' ')[1]}</span>
                </button>

                {isThemePickerOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-white/10 bg-[#0e1017] shadow-xl p-1.5 z-40 space-y-1 animate-in fade-in zoom-in-95">
                    <div className="px-2 py-1 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      Cyber Accents
                    </div>
                    {(['cyan', 'emerald', 'violet', 'amber'] as AccentTheme[]).map((theme) => (
                      <button
                        key={theme}
                        type="button"
                        onClick={() => handleSelectAccentTheme(theme)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          accentTheme === theme
                            ? 'bg-white/[0.08] text-white font-semibold'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: ACCENT_THEMES[theme].hex }}
                          />
                          <span>{ACCENT_THEMES[theme].name}</span>
                        </div>
                        {accentTheme === theme && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setIsResumeOpen(true);
                }}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer px-2 py-1"
              >
                View CV →
              </button>
            </div>
          </div>

          {/* Recruiter Quick Scan Mode Overlay (If toggled) */}
          {isRecruiterScan && (
            <div className="mb-10">
              <RecruiterQuickScan
                onExit={() => setIsRecruiterScan(false)}
                onOpenResume={() => setIsResumeOpen(true)}
                onNavigateToSection={handleNavigate}
              />
            </div>
          )}

          {/* Content Rendering: Focused Tab Mode OR Continuous Scroll Mode */}
          {viewMode === 'focused' ? (
            (() => {
              const currentSectionIndex = SECTION_CONFIG.findIndex((s) => s.id === activeSection);
              const safeIndex = currentSectionIndex >= 0 ? currentSectionIndex : 0;
              const currentConfig = SECTION_CONFIG[safeIndex];
              const prevSection = safeIndex > 0 ? SECTION_CONFIG[safeIndex - 1] : null;
              const nextSection = safeIndex < SECTION_CONFIG.length - 1 ? SECTION_CONFIG[safeIndex + 1] : null;

              const renderSection = (id: string) => {
                switch (id) {
                  case 'hero':
                    return (
                      <HeroSection
                        onViewProjects={() => handleNavigate('projects')}
                        onOpenResume={() => setIsResumeOpen(true)}
                      />
                    );
                  case 'about':
                    return <AboutSection />;
                  case 'projects':
                    return (
                      <ProjectsSection
                        externalSelectedProject={selectedProjectForModal}
                        onClearExternalSelectedProject={() => setSelectedProjectForModal(null)}
                      />
                    );
                  case 'architecture':
                    return <ArchitectureSection />;
                  case 'ai-playground':
                    return <AIInteractivePlayground />;
                  case 'skills':
                    return <SkillsSection />;
                  case 'experience':
                    return <ExperienceSection />;
                  case 'education':
                    return <EducationSection />;
                  case 'certifications':
                    return <CertificationsSection />;
                  case 'timeline':
                    return <TimelineSection />;
                  case 'contact':
                    return <ContactSection onShowToast={setToast} />;
                  default:
                    return (
                      <HeroSection
                        onViewProjects={() => handleNavigate('projects')}
                        onOpenResume={() => setIsResumeOpen(true)}
                      />
                    );
                }
              };

              return (
                <div className="min-h-[70vh] flex flex-col justify-between">
                  <div>
                    {/* Active Focused Tab Bar */}
                    <div className="flex items-center justify-between py-2 px-3.5 mb-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-200 font-bold">
                          {currentConfig.number}
                        </span>
                        <span className="font-semibold uppercase tracking-wider text-white">
                          {currentConfig.label} Section
                        </span>
                        <span className="text-zinc-500 text-[11px] hidden sm:inline">
                          · Focused View Mode
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleViewMode('continuous')}
                        className="text-[11px] text-zinc-400 hover:text-cyan-200 underline underline-offset-2 transition-colors cursor-pointer"
                      >
                        Switch to Continuous Flow
                      </button>
                    </div>

                    {/* Animated Tab Content */}
                    <div key={activeSection} className="animate-in fade-in zoom-in-95 duration-200">
                      {renderSection(activeSection)}
                    </div>
                  </div>

                  {/* Bottom Tab Navigation Controls */}
                  <div className="mt-14 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                    {prevSection ? (
                      <button
                        type="button"
                        onClick={() => handleNavigate(prevSection.id)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer group"
                      >
                        <ChevronLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Previous: {prevSection.label}</span>
                      </button>
                    ) : (
                      <div className="hidden sm:block" />
                    )}

                    <div className="text-zinc-500 text-[11px] text-center">
                      Section {safeIndex + 1} of {SECTION_CONFIG.length} · Click any tab in left menu
                    </div>

                    {nextSection ? (
                      <button
                        type="button"
                        onClick={() => handleNavigate(nextSection.id)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 transition-all cursor-pointer group"
                      >
                        <span>Next: {nextSection.label}</span>
                        <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleNavigate('hero')}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-all cursor-pointer"
                      >
                        <span>Back to Start ↑</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })()
          ) : (
            <>
              {/* Continuous Scroll Mode: All Sections rendered sequentially */}
              <HeroSection
                onViewProjects={() => handleNavigate('projects')}
                onOpenResume={() => setIsResumeOpen(true)}
              />

              <AboutSection />

              <ProjectsSection
                externalSelectedProject={selectedProjectForModal}
                onClearExternalSelectedProject={() => setSelectedProjectForModal(null)}
              />

              <ArchitectureSection />

              <AIInteractivePlayground />

              <SkillsSection />

              <ExperienceSection />

              <EducationSection />

              <CertificationsSection />

              <TimelineSection />

              <ContactSection onShowToast={setToast} />
            </>
          )}

          {/* Footer Note */}
          <footer className="pt-12 pb-6 border-t border-white/[0.06] text-xs font-mono text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Ankit Kumar © 2026 · Built with React &amp; Three.js</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-400">
              <a
                href="https://github.com/ankitkgupta11-g"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/ankit-kumar-243b6232a"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-300 transition-colors"
              >
                LinkedIn
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Email
              </button>
            </div>
          </footer>
        </main>
      </div>

      {/* Floating Back to Top Action */}
      {showBackToTop && (
        <button
          type="button"
          onClick={handleBackToTop}
          className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-40 p-3 rounded-full bg-[#161822]/90 hover:bg-cyan-500 hover:text-black border border-white/10 text-white shadow-xl transition-all duration-200 cursor-pointer animate-in fade-in focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Mobile/Tablet Quick Sticky Navigation Bar */}
      <nav
        aria-label="Mobile quick section navigation"
        className="lg:hidden fixed bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-1 max-w-md mx-auto p-1.5 rounded-full bg-[#0c0e15]/90 backdrop-blur-lg border border-white/10 shadow-2xl overflow-x-auto"
      >
        {[
          { id: 'hero', label: 'Top' },
          { id: 'about', label: 'About' },
          { id: 'projects', label: 'Projects' },
          { id: 'ai-playground', label: 'AI Lab' },
          { id: 'architecture', label: 'Arch' },
          { id: 'skills', label: 'Skills' },
          { id: 'experience', label: 'Exp' },
          { id: 'contact', label: 'Contact' },
        ].map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={`px-2.5 py-1.5 rounded-full text-[11px] font-mono whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-black font-bold shadow-sm shadow-cyan-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Developer Terminal Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onSelectProject={(projId) => {
          const target = PROJECTS.find((p) => p.id === projId);
          if (target) {
            handleNavigate('projects');
            setSelectedProjectForModal(target);
          }
        }}
        onOpenResume={() => setIsResumeOpen(true)}
        onToggleRecruiterMode={() => setIsRecruiterScan((prev) => !prev)}
        onCopyEmail={handleCopyEmail}
        viewMode={viewMode}
        onSetViewMode={handleToggleViewMode}
      />

      {/* Verified Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};
