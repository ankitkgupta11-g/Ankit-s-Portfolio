import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Command,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Download,
  Mail,
  Phone,
  FolderGit2,
  Cpu,
  GraduationCap,
  Briefcase,
  Layers,
  Terminal,
  X,
  Volume2,
  Palette,
} from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { soundEngine } from '../../utils/audio';
import { AccentTheme, ACCENT_THEMES, setStoredAccentTheme } from '../../utils/theme';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onSelectProject: (projectId: string) => void;
  onOpenResume: () => void;
  onToggleRecruiterMode: () => void;
  onCopyEmail: () => void;
  viewMode?: 'continuous' | 'focused';
  onSetViewMode?: (mode: 'continuous' | 'focused') => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Projects' | 'Live Demos' | 'Actions' | 'Contact';
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectProject,
  onOpenResume,
  onToggleRecruiterMode,
  onCopyEmail,
  viewMode = 'continuous',
  onSetViewMode,
}) => {
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input and lock body scroll when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const items: CommandItem[] = [
    // Recruiter Action
    {
      id: 'action-recruiter',
      title: 'Toggle 30-Second Recruiter Quick Scan',
      category: 'Actions',
      shortcut: 'R',
      icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onToggleRecruiterMode();
        onClose();
      },
    },
    {
      id: 'action-resume',
      title: 'View & Download Verified Resume / CV',
      category: 'Actions',
      shortcut: 'CV',
      icon: <Download className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onOpenResume();
        onClose();
      },
    },
    {
      id: 'action-email',
      title: 'Copy Email Address (ankitkgupta1123@gmail.com)',
      category: 'Contact',
      shortcut: 'E',
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onCopyEmail();
        onClose();
      },
    },
    // View Mode Toggles
    {
      id: 'action-view-continuous',
      title: `Switch View: Continuous Scroll Flow ${viewMode === 'continuous' ? '(Active)' : ''}`,
      category: 'Actions',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onSetViewMode?.('continuous');
        onClose();
      },
    },
    {
      id: 'action-view-focused',
      title: `Switch View: Focused Tab Mode ${viewMode === 'focused' ? '(Active)' : ''}`,
      category: 'Actions',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onSetViewMode?.('focused');
        onClose();
      },
    },
    {
      id: 'action-toggle-sound',
      title: 'Toggle Tactile Sound Feedback (Sci-Fi Audio)',
      category: 'Actions',
      shortcut: 'S',
      icon: <Volume2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        const next = !soundEngine.getSoundEnabled();
        soundEngine.setSoundEnabled(next);
        onClose();
      },
    },
    {
      id: 'action-theme-cyan',
      title: 'Cyber Accent: Electric Cyan (Default)',
      category: 'Actions',
      icon: <Palette className="w-4 h-4 text-cyan-400" />,
      action: () => {
        setStoredAccentTheme('cyan');
        soundEngine.playSwitch();
        onClose();
      },
    },
    {
      id: 'action-theme-emerald',
      title: 'Cyber Accent: Matrix Emerald',
      category: 'Actions',
      icon: <Palette className="w-4 h-4 text-emerald-400" />,
      action: () => {
        setStoredAccentTheme('emerald');
        soundEngine.playSwitch();
        onClose();
      },
    },
    {
      id: 'action-theme-violet',
      title: 'Cyber Accent: Cyber Violet',
      category: 'Actions',
      icon: <Palette className="w-4 h-4 text-violet-400" />,
      action: () => {
        setStoredAccentTheme('violet');
        soundEngine.playSwitch();
        onClose();
      },
    },
    {
      id: 'action-theme-amber',
      title: 'Cyber Accent: Solar Amber',
      category: 'Actions',
      icon: <Palette className="w-4 h-4 text-amber-400" />,
      action: () => {
        setStoredAccentTheme('amber');
        soundEngine.playSwitch();
        onClose();
      },
    },
    // Navigation
    {
      id: 'nav-playground',
      title: 'Jump to AI Interactive Playground & Simulator',
      category: 'Navigation',
      icon: <Terminal className="w-4 h-4 text-zinc-400" />,
      action: () => {
        onNavigate('ai-playground');
        onClose();
      },
    },
    {
      id: 'nav-projects',
      title: 'Jump to Featured Projects Showcase',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4 text-zinc-400" />,
      action: () => {
        onNavigate('projects');
        onClose();
      },
    },
    {
      id: 'nav-arch',
      title: 'Jump to Technical Architecture Pipeline',
      category: 'Navigation',
      icon: <Cpu className="w-4 h-4 text-zinc-400" />,
      action: () => {
        onNavigate('architecture');
        onClose();
      },
    },
    {
      id: 'nav-skills',
      title: 'Jump to Skills & Technology Ecosystem',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-zinc-400" />,
      action: () => {
        onNavigate('skills');
        onClose();
      },
    },
    {
      id: 'nav-exp',
      title: 'Jump to Experience & Training (GeeKonik ML Intern)',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-zinc-400" />,
      action: () => {
        onNavigate('experience');
        onClose();
      },
    },
    {
      id: 'nav-edu',
      title: 'Jump to Education & Academic Foundation',
      category: 'Navigation',
      icon: <GraduationCap className="w-4 h-4 text-zinc-400" />,
      action: () => {
        onNavigate('education');
        onClose();
      },
    },
    {
      id: 'nav-contact',
      title: 'Jump to Direct Contact & Inquiries',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-zinc-400" />,
      action: () => {
        onNavigate('contact');
        onClose();
      },
    },
    // Projects
    ...PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      title: `Inspect Architecture: ${proj.title} (${proj.category})`,
      category: 'Projects' as const,
      icon: <FolderGit2 className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onSelectProject(proj.id);
        onClose();
      },
    })),
    // Live Project Deployments (Excluded C system)
    ...PROJECTS.filter((p) => p.liveUrl).map((proj) => ({
      id: `live-${proj.id}`,
      title: `Launch Live App: ${proj.title} (Production Demo)`,
      category: 'Live Demos' as const,
      icon: <ExternalLink className="w-4 h-4 text-emerald-400" />,
      action: () => {
        if (proj.liveUrl) {
          window.open(proj.liveUrl, '_blank', 'noopener,noreferrer');
        }
        onClose();
      },
    })),
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl flex flex-col rounded-2xl border border-white/10 bg-[#0e1017] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] bg-[#12141f]">
          <Search className="w-4 h-4 text-cyan-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, search project, or jump to section..."
            className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
            aria-label="Search portfolio"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.1] text-[10px] font-mono text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30'
                      : 'text-zinc-300 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span className="font-medium text-white">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-500">
                      {item.category}
                    </span>
                    {item.shortcut && (
                      <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400 border border-white/[0.08]">
                        {item.shortcut}
                      </kbd>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-zinc-500 text-xs font-mono">
              No matching commands or projects found.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.06] bg-[#090a0f] text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to dismiss</span>
          </div>
          <span className="text-cyan-400">Ankit Kumar Developer Console</span>
        </div>
      </div>
    </div>
  );
};
