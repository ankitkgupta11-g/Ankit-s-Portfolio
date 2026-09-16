import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  ExternalLink,
  Printer,
  Mail,
  Github,
  Linkedin,
  Check,
  Link as LinkIcon,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { SKILL_CATEGORIES } from '../../data/skills';
import { EXPERIENCE_LIST } from '../../data/experience';
import { EDUCATION_LIST } from '../../data/education';
import {
  getStoredResumeUrl,
  setStoredResumeUrl,
  DEFAULT_RESUME_SETTINGS,
} from '../../data/config';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [directUrl, setDirectUrl] = useState<string>('');
  const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    const current = getStoredResumeUrl();
    setDirectUrl(current);
    setInputUrl(current);

    // Lock body scrolling while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputUrl.trim();
    // Validate protocol to prevent unsafe javascript: URIs
    if (clean && !/^https?:\/\//i.test(clean) && !clean.startsWith('/')) {
      return;
    }
    setStoredResumeUrl(clean);
    setDirectUrl(clean);
    setIsEditingUrl(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDownload = () => {
    if (directUrl && (/^https?:\/\//i.test(directUrl) || directUrl.startsWith('/'))) {
      window.open(directUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback to browser print to PDF
      window.print();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-white/10 bg-[#0e1017] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/[0.08] bg-[#12141f]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <div>
              <h3 id="resume-modal-title" className="text-sm font-semibold text-white tracking-tight">
                Ankit Kumar — Verified Resume
              </h3>
              <p className="text-[11px] font-mono text-zinc-400 hidden sm:block">
                ATS-Optimized · Machine Learning &amp; Full Stack
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Configure Direct Link Toggle */}
            <button
              type="button"
              onClick={() => setIsEditingUrl((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title="Configure Google Drive or Hosted PDF Link"
            >
              <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{directUrl ? 'Drive Link Set' : 'Attach Drive Link'}</span>
            </button>

            {/* Print / Save as PDF */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-zinc-300 transition-colors cursor-pointer"
              title="Print or Save as Clean PDF"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-400" />
              <span>Print / PDF</span>
            </button>

            {/* Direct Download Button */}
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-colors cursor-pointer shadow-sm shadow-cyan-500/20"
              title={directUrl ? 'Download from Google Drive / Hosted URL' : 'Save as PDF'}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{directUrl ? 'Download PDF' : 'Download File'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors ml-1 cursor-pointer"
              aria-label="Close resume view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional: Drive URL Config Drawer */}
        {isEditingUrl && (
          <form
            onSubmit={handleSaveUrl}
            className="px-6 py-3 bg-cyan-950/40 border-b border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="flex-1">
              <label htmlFor="resume-drive-input" className="block text-[11px] font-mono text-cyan-300 mb-1">
                Google Drive or Hosted PDF Direct URL
              </label>
              <input
                id="resume-drive-input"
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-cyan-500/30 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="flex items-center gap-2 pt-2 sm:pt-4">
              <button
                type="button"
                onClick={() => {
                  setInputUrl('');
                  setStoredResumeUrl('');
                  setDirectUrl('');
                  setIsEditingUrl(false);
                }}
                className="px-2.5 py-1.5 text-[11px] text-zinc-400 hover:text-white cursor-pointer"
              >
                Clear
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs cursor-pointer whitespace-nowrap"
              >
                Save Link
              </button>
            </div>
          </form>
        )}

        {savedSuccess && (
          <div className="px-6 py-2 bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Direct Resume Download Link saved successfully!</span>
          </div>
        )}

        {/* Document Body (Target for printing and display) */}
        <div
          id="resume-printable-content"
          className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-zinc-300 font-sans leading-relaxed custom-scrollbar bg-[#0e1017] print:bg-white print:text-black print:p-0 print:m-0"
        >
          {/* Resume Header */}
          <div className="border-b border-white/[0.08] print:border-black/20 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white print:text-black tracking-tight">
                  ANKIT KUMAR
                </h1>
                <p className="text-sm sm:text-base text-cyan-400 print:text-cyan-800 font-medium mt-1">
                  B.Tech in Artificial Intelligence &amp; Machine Learning · Full Stack Developer
                </p>
              </div>
              <div className="text-xs font-mono text-zinc-400 print:text-zinc-700 space-y-1 sm:text-right">
                <p>ankitkgupta1123@gmail.com</p>
                <p>+91 7887006021 · Gorakhpur, UP, India</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-white/[0.04] print:border-black/10 text-xs text-zinc-400 print:text-zinc-700">
              <a
                href="https://github.com/ankitkgupta11-g"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-300 flex items-center gap-1 print:text-black"
              >
                <Github className="w-3.5 h-3.5" /> github.com/ankitkgupta11-g
              </a>
              <a
                href="https://linkedin.com/in/ankit-kumar-243b6232a"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-300 flex items-center gap-1 print:text-black"
              >
                <Linkedin className="w-3.5 h-3.5" /> linkedin.com/in/ankit-kumar-243b6232a
              </a>
            </div>
          </div>

          {/* Profile Statement */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400/90 print:text-black font-bold mb-2">
              Professional Summary
            </h4>
            <p className="text-sm text-zinc-300 print:text-zinc-800 leading-relaxed">
              B.Tech student in Artificial Intelligence &amp; Machine Learning with hands-on experience building machine learning and deep learning models, including a Heart Disease Prediction System developed during a Machine Learning &amp; Deep Learning internship at GeeKonik. Skilled in Python, TensorFlow, and Keras, with practical experience in data preprocessing, feature engineering, and model development. Experienced in building AI-powered applications using generative AI APIs (Google Gemini) and prompt engineering to deliver functional, user-facing AI features.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400/90 print:text-black font-bold mb-3">
              Technical Competencies
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white/[0.02] print:bg-zinc-50 border border-white/[0.06] print:border-zinc-300">
                <span className="font-semibold text-white print:text-black block mb-1">AI &amp; Machine Learning</span>
                <p className="text-zinc-400 print:text-zinc-700">
                  TensorFlow, Keras, Deep Learning, Generative AI, Prompt Engineering, Google Gemini API, Model Optimization
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] print:bg-zinc-50 border border-white/[0.06] print:border-zinc-300">
                <span className="font-semibold text-white print:text-black block mb-1">Languages</span>
                <p className="text-zinc-400 print:text-zinc-700">Python, TypeScript, JavaScript (ES6+), C (Data Structures)</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] print:bg-zinc-50 border border-white/[0.06] print:border-zinc-300">
                <span className="font-semibold text-white print:text-black block mb-1">Frontend Development</span>
                <p className="text-zinc-400 print:text-zinc-700">React, Next.js, Tailwind CSS, HTML5, CSS3, Responsive Design</p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] print:bg-zinc-50 border border-white/[0.06] print:border-zinc-300">
                <span className="font-semibold text-white print:text-black block mb-1">Backend &amp; Databases</span>
                <p className="text-zinc-400 print:text-zinc-700">Node.js, REST APIs, PostgreSQL, Neon, Drizzle ORM, Clerk Auth</p>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400/90 print:text-black font-bold mb-3">
              Featured Projects
            </h4>
            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3 rounded-lg bg-white/[0.02] print:bg-zinc-50 border border-white/[0.06] print:border-zinc-300 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white print:text-black text-sm">{proj.title}</span>
                    <span className="text-[11px] font-mono text-cyan-400 print:text-cyan-800">
                      {proj.technologies.slice(0, 3).join(', ')}
                    </span>
                  </div>
                  <p className="text-zinc-300 print:text-zinc-800 mt-1 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400/90 print:text-black font-bold mb-3">
              Internship &amp; Technical Experience
            </h4>
            {EXPERIENCE_LIST.map((exp, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-white/[0.02] print:bg-zinc-50 border border-white/[0.06] print:border-zinc-300 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-white print:text-black text-sm">{exp.role}</span>
                  <span className="font-mono text-zinc-400 print:text-zinc-600 text-[11px]">
                    {exp.organization} · {exp.duration} ({exp.period})
                  </span>
                </div>
                <p className="text-zinc-300 print:text-zinc-800 mt-1 leading-relaxed">{exp.summary}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400/90 print:text-black font-bold mb-3">
              Education
            </h4>
            {EDUCATION_LIST.map((edu, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-white/[0.02] print:bg-zinc-50 border border-white/[0.06] print:border-zinc-300 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-bold text-white print:text-black text-sm">{edu.degree} — {edu.field}</span>
                  <span className="font-mono text-cyan-400 print:text-cyan-800 text-[11px]">{edu.score}</span>
                </div>
                <p className="text-zinc-400 print:text-zinc-700 mt-1">{edu.institution}, {edu.location}</p>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400/90 print:text-black font-bold mb-3">
              Achievements &amp; Honors
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white/[0.02] print:bg-zinc-50 border border-white/[0.06] print:border-zinc-300 text-zinc-300 print:text-zinc-800">
                • 2nd Position — Tech Yuva Project Competition
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] print:bg-zinc-50 border border-white/[0.06] print:border-zinc-300 text-zinc-300 print:text-zinc-800">
                • 3rd Position — College Coding Competition
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] print:bg-zinc-50 border border-white/[0.06] print:border-zinc-300 text-zinc-300 print:text-zinc-800">
                • Vice-Captain — College Cricket Team
              </div>
              <div className="p-2.5 rounded-lg bg-white/[0.02] print:bg-zinc-50 border border-white/[0.06] print:border-zinc-300 text-zinc-300 print:text-zinc-800">
                • Winner — 2025 College Cricket Competition
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
