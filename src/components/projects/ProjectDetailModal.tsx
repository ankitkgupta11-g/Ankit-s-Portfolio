import React from 'react';
import { X, Github, ExternalLink, ArrowRight, CheckCircle, AlertTriangle, Cpu, Layers } from 'lucide-react';
import { Project } from '../../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  React.useEffect(() => {
    if (!project) return;

    // Prevent background scrolling while project modal is active
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
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-white/10 bg-[#0e1017] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#12141f]">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: project.accentColor }}
            />
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 text-xs font-medium transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.1] text-zinc-200 hover:text-white hover:bg-white/[0.1] text-xs font-medium transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-7 custom-scrollbar">
          {/* Title & Subtitle */}
          <div>
            <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-cyan-400 mt-1">{project.subtitle}</p>
            <p className="text-sm sm:text-base text-zinc-300 mt-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2.5">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>The Problem</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{project.problem}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>Engineering Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3">
              Key Features & Capabilities
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.015] border border-white/[0.04] text-xs sm:text-sm text-zinc-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Architecture */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.07]">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              <Cpu className="w-4 h-4" />
              <span>Data Flow & System Architecture</span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed bg-black/40 p-3 rounded-lg border border-white/[0.04]">
              {project.architecture}
            </p>
          </div>

          {/* Technical Challenges & Optimization */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
              Engineering Challenges & Trade-offs
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.challenges}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-[#12141f] flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-500">Repository Verified</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-zinc-300 font-medium transition-colors"
            >
              Close
            </button>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-semibold transition-colors"
            >
              <span>Explore Code</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
