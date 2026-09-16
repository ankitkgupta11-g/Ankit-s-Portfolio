export interface AchievementItem {
  title: string;
  category: 'Competition' | 'Leadership' | 'Athletics';
  detail: string;
  highlight?: boolean;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: '2nd Position — Tech Yuva Project Competition',
    category: 'Competition',
    detail: 'Recognized for innovative software architecture and technical presentation in university-level technology showcase.',
    highlight: true,
  },
  {
    title: '3rd Position — College Coding Competition',
    category: 'Competition',
    detail: 'Demonstrated competitive algorithmic problem solving, time-complexity optimization, and debugging speed.',
    highlight: true,
  },
  {
    title: 'Vice-Captain — College Cricket Team',
    category: 'Leadership',
    detail: 'Coordinated tactical field placements, athlete mentorship, and strategic game management under pressure.',
  },
  {
    title: 'Winner — 2025 College Cricket Competition',
    category: 'Athletics',
    detail: 'Championship-winning team effort representing Buddha Institute of Technology in inter-collegiate competition.',
  },
];
