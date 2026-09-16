import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { Brain, Layers, Cpu, Terminal, Compass, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 border-b border-white/[0.06]" aria-label="About Ankit Kumar">
      <SectionHeader
        number="01"
        label="Background & Engineering Focus"
        title="Synthesizing Machine Intelligence & Modern Web Architecture"
        description="A look into my engineering philosophy, technical journey, and commitment to building functional software with real utility."
      />

      <div className="space-y-8">
        {/* Core Narrative */}
        <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
          <p>
            I am a software engineer focused on the intersection of <strong className="text-white font-semibold">Artificial Intelligence</strong> and <strong className="text-white font-semibold">Full Stack Product Engineering</strong>. My work centers on taking machine learning capabilities out of isolated notebooks and deploying them into responsive, reliable, and accessible user interfaces.
          </p>
          <p>
            With a solid foundation in low-level systems programming in C and data modeling with Python and TypeScript, I take pride in understanding full software pipelines—from data ingestion, model orchestration, and prompt engineering down to serverless databases, caching layers, and component rendering.
          </p>
          <p>
            Whether implementing generative workflows with the <strong className="text-cyan-300 font-semibold">Google Gemini API</strong>, training supervised neural models with <strong className="text-cyan-300 font-semibold">TensorFlow & Keras</strong>, or architecting type-safe applications with <strong className="text-cyan-300 font-semibold">React, Next.js, and PostgreSQL</strong>, I prioritize clean code architecture, pragmatic engineering, and honest execution.
          </p>
        </div>

        {/* Pillars / Competency Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all duration-200">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">AI & Generative Systems</h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Designing context-aware LLM agents, prompt pipelines, multimodal image generators, and schema-constrained AI completions.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-sky-500/30 transition-all duration-200">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Full-Stack Application Design</h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Building modular, scalable web apps with React, Next.js, Node.js, and PostgreSQL with robust auth and state management.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-all duration-200">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Analytical Problem Solving</h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Grounded in rigorous algorithmic thinking, data structures, and foundational low-level memory and file operations in C.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-all duration-200">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white text-base">Rapid Continuous Learning</h3>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Actively mastering emerging AI models, edge computing, modern database tooling (Drizzle, Neon), and cloud developer ecosystems.
            </p>
          </div>
        </div>

        {/* Quick Facts Strip */}
        <div className="p-4 rounded-xl bg-white/[0.015] border border-white/[0.05] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Primary Focus: AI/ML Engineering</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Undergrad: B.Tech CSE (AI/ML)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Open to: Internships & Full-Time Roles</span>
          </div>
        </div>
      </div>
    </section>
  );
};
