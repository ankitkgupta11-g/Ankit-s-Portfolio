import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { ProjectDetailModal } from './ProjectDetailModal';
import { PROJECTS } from '../../data/projects';
import { Project } from '../../types';
import { Github, ExternalLink, ArrowUpRight, Sparkles, Terminal, Cpu, Layers, Filter } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface ProjectsSectionProps {
  externalSelectedProject?: Project | null;
  onClearExternalSelectedProject?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  externalSelectedProject,
  onClearExternalSelectedProject,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const activeModalProject = externalSelectedProject || selectedProject;

  const categories = [
    { id: 'All', label: 'All Systems', count: PROJECTS.length },
    { id: 'AI / Generative AI', label: 'AI & Generative AI', count: PROJECTS.filter((p) => p.category === 'AI / Generative AI').length },
    { id: 'Full Stack', label: 'Full Stack & Web', count: PROJECTS.filter((p) => p.category === 'Full Stack').length },
    { id: 'Systems / C', label: 'C & Core Systems', count: PROJECTS.filter((p) => p.category === 'Systems / C').length },
  ];

  const filteredProjects =
    selectedFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedFilter);

  // Abstract Project Visual Generator
  const renderProjectVisual = (project: Project) => {
    switch (project.id) {
      case 'aura-studio':
        return (
          <div className="relative w-full h-44 sm:h-48 overflow-hidden rounded-t-xl bg-gradient-to-br from-cyan-950/40 via-[#0a121a] to-[#090a0f] p-4 flex flex-col justify-between border-b border-white/[0.06] group-hover:border-cyan-500/20 transition-all duration-300">
            {/* Visual Grid and Nodes */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono text-cyan-400/90 flex items-center gap-1.5 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                <Sparkles className="w-3 h-3" />
                <span>MULTIMODAL SYNTHESIS</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">ASPECT: 16:9 · 1:1</span>
            </div>

            <div className="z-10 flex items-center justify-center my-auto py-2">
              <div className="relative w-36 h-20 rounded-lg border border-cyan-500/30 bg-black/40 backdrop-blur-sm p-2 flex flex-col justify-center space-y-1.5 shadow-inner">
                <div className="w-3/4 h-2 rounded bg-cyan-400/40 animate-pulse" />
                <div className="w-1/2 h-1.5 rounded bg-sky-400/30" />
                <div className="w-5/6 h-1.5 rounded bg-indigo-400/20" />
                <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/40 text-[9px] font-mono text-cyan-300">
                  Drizzle + Neon
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 z-10">
              <span>LATENT DIFFUSION / GEMINI</span>
              <span className="text-cyan-400/80">COMMUNITY GALLERY</span>
            </div>
          </div>
        );

      case 'ai-content-generator':
        return (
          <div className="relative w-full h-44 sm:h-48 overflow-hidden rounded-t-xl bg-gradient-to-br from-sky-950/40 via-[#0b1219] to-[#090a0f] p-4 flex flex-col justify-between border-b border-white/[0.06] group-hover:border-sky-500/20 transition-all duration-300">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono text-sky-400/90 flex items-center gap-1.5 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                <Layers className="w-3 h-3" />
                <span>TEMPLATE PIPELINE</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">CLERK AUTH GATEWAY</span>
            </div>

            <div className="z-10 flex items-center justify-center my-auto py-2">
              <div className="relative w-40 h-20 rounded-lg border border-sky-500/30 bg-black/40 backdrop-blur-sm p-2.5 flex flex-col justify-between shadow-inner">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
                  <span className="text-[9px] font-mono text-zinc-400">Tokens: 1,420</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="space-y-1">
                  <div className="w-full h-1.5 rounded bg-sky-400/30" />
                  <div className="w-4/5 h-1.5 rounded bg-sky-400/20" />
                </div>
                <span className="text-[9px] font-mono text-sky-300 self-end">Copy Markdown →</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 z-10">
              <span>USAGE QUOTA METER</span>
              <span className="text-sky-400/80">STRUCTURED OUTPUT</span>
            </div>
          </div>
        );

      case 'codemate-ai':
        return (
          <div className="relative w-full h-44 sm:h-48 overflow-hidden rounded-t-xl bg-gradient-to-br from-indigo-950/40 via-[#0e0f1d] to-[#090a0f] p-4 flex flex-col justify-between border-b border-white/[0.06] group-hover:border-indigo-500/20 transition-all duration-300">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono text-indigo-400/90 flex items-center gap-1.5 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                <Cpu className="w-3 h-3" />
                <span>CONTEXT TUTOR</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400">● LIVE ON VERCEL</span>
            </div>

            <div className="z-10 flex items-center justify-center my-auto py-2">
              <div className="relative w-44 h-20 rounded-lg border border-indigo-500/30 bg-black/40 backdrop-blur-sm p-2 flex items-center gap-2 shadow-inner">
                <div className="flex-1 space-y-1.5">
                  <div className="text-[9px] font-mono text-indigo-300">Roadmap: Chapter 03</div>
                  <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
                    <div className="w-2/3 h-full bg-indigo-500 rounded-full" />
                  </div>
                  <div className="text-[9px] text-zinc-400 truncate">&gt; Contextual Tutor Active</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 z-10">
              <span>GAMIFIED MILESTONES</span>
              <span className="text-indigo-400/80">INTERACTIVE CODE LAB</span>
            </div>
          </div>
        );

      case 'codepaw-ai':
        return (
          <div className="relative w-full h-44 sm:h-48 overflow-hidden rounded-t-xl bg-gradient-to-br from-pink-950/40 via-[#180a14] to-[#090a0f] p-4 flex flex-col justify-between border-b border-white/[0.06] group-hover:border-pink-500/20 transition-all duration-300">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono text-pink-400/90 flex items-center gap-1.5 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                <Sparkles className="w-3 h-3" />
                <span>AI CODE SANDBOX &amp; XP</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">EXPRESS + VITE</span>
            </div>

            <div className="z-10 flex items-center justify-center my-auto py-2">
              <div className="relative w-48 h-20 rounded-lg border border-pink-500/30 bg-black/40 backdrop-blur-sm p-2 flex items-center gap-2.5 shadow-inner">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex flex-col items-center justify-center border border-pink-400/40 shrink-0">
                  <span className="text-[11px] font-bold text-pink-300 font-mono">XP</span>
                  <span className="text-[9px] text-pink-400 font-mono">+150</span>
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="text-[9px] font-mono text-pink-300">Daily Streak: 14 Days 🔥</div>
                  <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
                    <div className="w-4/5 h-full bg-pink-500 rounded-full" />
                  </div>
                  <div className="text-[9px] text-zinc-400 truncate">&gt; Gemini Code Mentor</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 z-10">
              <span>BADGES &amp; STREAKS</span>
              <span className="text-pink-400/80">INTERACTIVE LESSONS</span>
            </div>
          </div>
        );

      case 'hospital-management':
      default:
        return (
          <div className="relative w-full h-44 sm:h-48 overflow-hidden rounded-t-xl bg-gradient-to-br from-emerald-950/40 via-[#0a1510] to-[#090a0f] p-4 flex flex-col justify-between border-b border-white/[0.06] group-hover:border-emerald-500/20 transition-all duration-300">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-mono text-emerald-400/90 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <Terminal className="w-3 h-3" />
                <span>C STRUCTURES &amp; I/O</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">FILE POINTERS</span>
            </div>

            <div className="z-10 flex items-center justify-center my-auto py-2">
              <div className="relative w-44 h-20 rounded-lg border border-emerald-500/30 bg-black/40 backdrop-blur-sm p-2 flex flex-col justify-center space-y-1 font-mono text-[9px] shadow-inner">
                <div className="text-emerald-400">struct Patient &#123; id, bill &#125;;</div>
                <div className="text-zinc-400">fwrite(&amp;p, sizeof(p), 1, fp);</div>
                <div className="text-emerald-300/80">[OK] Input Sanitized</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 z-10">
              <span>PATIENT / BILLING LOGIC</span>
              <span className="text-emerald-400/80">STRICT VALIDATION</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-20 border-b border-white/[0.06]" aria-label="Featured Projects">
      <SectionHeader
        number="02"
        label="Engineering Portfolio"
        title="Featured Projects & Production Systems"
        description="Exploration of generative AI architectures, context-aware developer tools, and foundational low-level systems."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8" role="tablist" aria-label="Project Categories">
        {categories.map((cat) => {
          const isActive = selectedFilter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                soundEngine.playClick();
                setSelectedFilter(cat.id);
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm shadow-cyan-500/10'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-zinc-200 border border-white/[0.06] hover:bg-white/[0.06]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isActive
                    ? 'bg-cyan-400 text-black font-bold'
                    : 'bg-white/[0.08] text-zinc-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            id={`project-card-${project.id}`}
            onClick={() => {
              soundEngine.playClick();
              setSelectedProject(project);
            }}
            className="group relative flex flex-col rounded-xl border border-white/[0.08] bg-[#10121a]/70 hover:bg-[#131622]/90 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20 cursor-pointer overflow-hidden"
          >
            {/* Visual Header / Abstract UI */}
            {renderProjectVisual(project)}

            {/* Content Body */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-medium">
                    {project.badge}
                  </span>
                  <div className="flex items-center gap-2 text-zinc-400 group-hover:text-cyan-300 transition-colors">
                    <span className="text-xs font-mono">Inspect</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="pt-2 border-t border-white/[0.04]">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-zinc-300 group-hover:border-cyan-500/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-0.5 rounded bg-white/[0.02] text-[10px] font-mono text-zinc-500">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Card Action Strip */}
                <div className="flex items-center justify-between pt-1 text-xs" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-300 hover:text-cyan-200 font-medium transition-colors text-xs"
                      aria-label={`Open live demo of ${project.title}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-500 bg-white/[0.02] px-2 py-0.5 rounded border border-white/[0.04]">
                      <Terminal className="w-3 h-3 text-emerald-400" />
                      <span>CLI C System</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => {
          setSelectedProject(null);
          if (onClearExternalSelectedProject) {
            onClearExternalSelectedProject();
          }
        }}
      />
    </section>
  );
};
