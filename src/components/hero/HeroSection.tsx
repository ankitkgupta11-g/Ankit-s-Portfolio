import React from 'react';
import { ArrowRight, Download, Terminal, Cpu, Database, Code } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface HeroSectionProps {
  onViewProjects: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewProjects, onOpenResume }) => {
  return (
    <section
      id="hero"
      className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 border-b border-white/[0.06] overflow-hidden"
      aria-label="Hero Introduction"
    >
      {/* Background Matrix/Grid Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Subtle Glow Burst */}
      <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="relative space-y-6">
        {/* Small Eyebrow / Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[11px] tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>AI / FULL STACK / GENERATIVE AI</span>
        </div>

        {/* Large Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white tracking-tight leading-[1.1]">
          I BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">AI-POWERED</span> DIGITAL EXPERIENCES.
        </h2>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl font-normal">
          I develop intelligent applications and modern full-stack products by combining AI,
          machine learning, frontend engineering, backend systems, and thoughtful user experiences.
        </p>

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onViewProjects();
            }}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm tracking-tight transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 active:scale-[0.98] cursor-pointer"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onOpenResume();
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] text-zinc-200 hover:text-white font-medium text-sm tracking-tight transition-all duration-200 cursor-pointer"
          >
            <Download className="w-4 h-4 text-zinc-400" />
            <span>Download Resume</span>
          </button>
        </div>

        {/* Quick Engineering Stack Highlights */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-xs font-semibold text-white block">LLM / Gemini</span>
              <span className="text-[10px] text-zinc-500 font-mono">Generative AI</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
            <Code className="w-4 h-4 text-sky-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-xs font-semibold text-white block">React & TS</span>
              <span className="text-[10px] text-zinc-500 font-mono">Frontend Systems</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
            <Database className="w-4 h-4 text-indigo-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-xs font-semibold text-white block">PostgreSQL</span>
              <span className="text-[10px] text-zinc-500 font-mono">Neon & Drizzle</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <span className="text-xs font-semibold text-white block">TensorFlow</span>
              <span className="text-[10px] text-zinc-500 font-mono">ML & Deep Learning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
