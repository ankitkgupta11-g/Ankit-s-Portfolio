export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  features: string[];
  problem: string;
  solution: string;
  architecture: string;
  challenges: string;
  githubUrl: string;
  liveUrl?: string;
  category: 'AI / Generative AI' | 'Full Stack' | 'Systems / C';
  badge: string;
  accentColor: string;
}

export interface SkillItem {
  name: string;
  category: string;
  practicalUsage: string;
  iconName?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'client' | 'gateway' | 'auth' | 'ai' | 'worker' | 'db' | 'deploy';
  tech: string;
  role: string;
  description: string;
  inputs?: string[];
  outputs?: string[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  duration: string;
  type: string;
  period: string;
  focusAreas: string[];
  summary: string;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  score: string;
  status: string;
  highlights: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

export interface CertificationItem {
  title: string;
  organization: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  focus: string;
  credentialUrl?: string;
  date?: string;
}
