import React from 'react';
import {
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  Award,
  ArrowRight,
  FileText,
  Clock,
  X,
} from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { EXPERIENCE_LIST } from '../../data/experience';
import { EDUCATION_LIST } from '../../data/education';
import { ACHIEVEMENTS } from '../../data/achievements';

interface RecruiterQuickScanProps {
  onExit: () => void;
  onOpenResume: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const RecruiterQuickScan: React.FC<RecruiterQuickScanProps> = ({
  onExit,
  onOpenResume,
  onNavigateToSection,
}) => {
  const userPhone = '+91 7887006021';
  const userEmail = 'ankitkgupta1123@gmail.com';
  const userLocation = 'Gorakhpur, India';

  return (
    <div
      className="rounded-2xl border border-cyan-500/30 bg-[#0c0e15] p-6 sm:p-8 space-y-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      role="region"
      aria-label="Recruiter 30-Second Executive Scan"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                EXECUTIVE SUMMARY
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-mono border border-cyan-500/20">
                30-SEC SCAN
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Recruiter &amp; Hiring Manager Briefing
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-semibold transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
          </button>
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Return to Full Portfolio"
          >
            <X className="w-4 h-4" />
            <span>Close Scan</span>
          </button>
        </div>
      </div>

      {/* Candidate Profile Meta */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
        <div>
          <span className="text-[11px] font-mono text-zinc-500 uppercase block">Candidate Name</span>
          <p className="text-base font-bold text-white mt-0.5">Ankit Kumar</p>
          <p className="text-xs text-cyan-400 font-mono">AI/ML Engineer · Full Stack Developer</p>
        </div>
        <div>
          <span className="text-[11px] font-mono text-zinc-500 uppercase block">Contact &amp; Location</span>
          <div className="mt-0.5 space-y-0.5 text-xs text-zinc-300">
            <p className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <a href={`mailto:${userEmail}`} className="hover:text-cyan-300 underline">
                {userEmail}
              </a>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{userPhone}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{userLocation} (Open to Relocation / Remote)</span>
            </p>
          </div>
        </div>
        <div>
          <span className="text-[11px] font-mono text-zinc-500 uppercase block">Profiles</span>
          <div className="mt-1 flex items-center gap-2">
            <a
              href="https://github.com/ankitkgupta11-g"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white"
            >
              <Github className="w-3.5 h-3.5 text-zinc-400" />
              <span>GitHub</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a
              href="https://linkedin.com/in/ankit-kumar-243b6232a"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white"
            >
              <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
              <span>LinkedIn</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 4 Core Value Propositions */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
          Why Hire Ankit Kumar? (Key Engineering Differentiators)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Full-Stack AI Integration</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Proven ability to bridge generative AI models (Google Gemini API, multi-model prompt engineering) into full-stack web architectures with authentication and persistence.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Modern Typescript &amp; Serverless ORM</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Production familiarity with React 19, Next.js, Node.js, Express, Tailwind CSS, Clerk auth, and serverless Neon PostgreSQL with type-safe Drizzle ORM.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Applied Machine Learning Experience</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Real-world model development during GeeKonik internship: data preprocessing, feature engineering, and neural classification pipelines in TensorFlow and Keras.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Low-Level Systems Grounding</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Solid grasp of memory layout, pointers, binary file I/O, and data structures built through rigorous C systems implementations without third-party bloat.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Projects Fast Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
            Featured Projects &amp; Deliverables
          </h3>
          <button
            type="button"
            onClick={() => {
              onExit();
              onNavigateToSection('projects');
            }}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Showcase</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-cyan-300">
                    {proj.category}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-1">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.technologies.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs font-medium transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience, Education & Achievements Fast Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Experience */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
            PRACTICAL INTERNSHIP
          </span>
          <h4 className="text-sm font-bold text-white">GeeKonik</h4>
          <p className="text-xs text-zinc-300 font-mono">Jul 2025 – Aug 2025</p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Machine Learning &amp; Deep Learning Intern. Developed Heart Disease Prediction System with TensorFlow, Keras &amp; feature engineering.
          </p>
        </div>

        {/* Education */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
            ACADEMIC DEGREE
          </span>
          <h4 className="text-sm font-bold text-white">Buddha Institute of Technology</h4>
          <p className="text-xs text-zinc-300 font-mono">B.Tech in AI &amp; ML (2022 – 2027)</p>
          <p className="text-xs text-zinc-400 leading-relaxed">
            CGPA: <strong>6.75 / 10</strong>. Specialization in machine learning algorithms, deep neural nets, and systems architecture.
          </p>
        </div>

        {/* Honors */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
            HONORS &amp; COMPETITIONS
          </span>
          <div className="space-y-1.5 text-xs text-zinc-300">
            <div className="flex items-start gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>2nd Position — Tech Yuva Project Competition</span>
            </div>
            <div className="flex items-start gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>3rd Position — College Coding Competition</span>
            </div>
            <div className="flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>Winner, 2025 College Cricket Competition</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
