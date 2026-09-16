// Cyber Accent Color Theme Management

export type AccentTheme = 'cyan' | 'emerald' | 'violet' | 'amber';

export interface ThemeConfig {
  id: AccentTheme;
  name: string;
  hex: string;
  badgeClass: string;
  textClass: string;
  borderClass: string;
  bgClass: string;
  activeButtonClass: string;
  glowClass: string;
}

export const ACCENT_THEMES: Record<AccentTheme, ThemeConfig> = {
  cyan: {
    id: 'cyan',
    name: 'Electric Cyan',
    hex: '#06b6d4',
    badgeClass: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
    textClass: 'text-cyan-400',
    borderClass: 'border-cyan-500/30',
    bgClass: 'bg-cyan-500',
    activeButtonClass: 'bg-cyan-500 text-black font-semibold',
    glowClass: 'shadow-cyan-500/20',
  },
  emerald: {
    id: 'emerald',
    name: 'Matrix Emerald',
    hex: '#10b981',
    badgeClass: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/30',
    bgClass: 'bg-emerald-500',
    activeButtonClass: 'bg-emerald-500 text-black font-semibold',
    glowClass: 'shadow-emerald-500/20',
  },
  violet: {
    id: 'violet',
    name: 'Cyber Violet',
    hex: '#8b5cf6',
    badgeClass: 'bg-violet-500/10 border-violet-500/20 text-violet-300',
    textClass: 'text-violet-400',
    borderClass: 'border-violet-500/30',
    bgClass: 'bg-violet-500',
    activeButtonClass: 'bg-violet-500 text-white font-semibold',
    glowClass: 'shadow-violet-500/20',
  },
  amber: {
    id: 'amber',
    name: 'Solar Amber',
    hex: '#f59e0b',
    badgeClass: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
    textClass: 'text-amber-400',
    borderClass: 'border-amber-500/30',
    bgClass: 'bg-amber-500',
    activeButtonClass: 'bg-amber-500 text-black font-semibold',
    glowClass: 'shadow-amber-500/20',
  },
};

const STORAGE_KEY = 'ankit_portfolio_accent_theme';

export function getStoredAccentTheme(): AccentTheme {
  if (typeof window === 'undefined') return 'cyan';
  const stored = localStorage.getItem(STORAGE_KEY) as AccentTheme;
  if (stored && ACCENT_THEMES[stored]) {
    return stored;
  }
  return 'cyan';
}

export function setStoredAccentTheme(theme: AccentTheme): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, theme);
  document.documentElement.setAttribute('data-accent', theme);
}
