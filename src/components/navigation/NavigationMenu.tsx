import React from 'react';
import {
  Home,
  User,
  FolderGit2,
  Cpu,
  Layers,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Sparkles,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'architecture', label: 'Architecture', icon: Cpu },
  { id: 'ai-playground', label: 'AI Playground', icon: Sparkles },
  { id: 'skills', label: 'Skills', icon: Layers },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail },
];

interface NavigationMenuProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  activeSection,
  onNavigate,
  className = '',
}) => {
  return (
    <nav className={`w-full py-1 ${className}`} aria-label="Portfolio Sections Navigation">
      <ul className="space-y-1">
        {NAV_ITEMS.map((item, index) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          const itemIndex = String(index + 1).padStart(2, '0');

          return (
            <li key={item.id}>
              <button
                type="button"
                id={`nav-item-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`group w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white/[0.08] text-white border-l-2 border-cyan-400 font-medium pl-3.5 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] border-l-2 border-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isActive ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}
                  />
                  <span className="text-xs sm:text-sm tracking-tight">{item.label}</span>
                </div>
                <span
                  className={`font-mono text-[10px] transition-colors duration-200 ${
                    isActive ? 'text-cyan-400/90 font-medium' : 'text-zinc-600 group-hover:text-zinc-400'
                  }`}
                >
                  {itemIndex}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
