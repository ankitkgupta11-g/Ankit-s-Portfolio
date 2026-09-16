import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { SKILL_CATEGORIES } from '../../data/skills';
import { SkillItem } from '../../types';
import { Sparkles, Terminal, Layers, Database, Wrench, CheckCircle } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILL_CATEGORIES[0].skills[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryIcons: Record<string, React.ElementType> = {
    'AI & Machine Learning': Sparkles,
    'Programming Languages': Terminal,
    'Frontend Engineering': Layers,
    'Backend & Databases': Database,
    'Developer Tools & Workflow': Wrench,
  };

  const allSkills = SKILL_CATEGORIES.flatMap((c) => c.skills);
  const displayedSkills =
    selectedCategory === 'All'
      ? allSkills
      : SKILL_CATEGORIES.find((c) => c.title === selectedCategory)?.skills || allSkills;

  return (
    <section id="skills" className="py-16 sm:py-20 border-b border-white/[0.06]" aria-label="Skills & Ecosystem">
      <SectionHeader
        number="04"
        label="Technical Arsenal"
        title="Interactive Technology Ecosystem"
        description="Core competencies mapped to actual production implementations. Hover or tap any capability node to examine its concrete engineering application."
      />

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => setSelectedCategory('All')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
              : 'bg-white/[0.03] text-zinc-400 hover:text-zinc-200 border border-white/[0.06]'
          }`}
        >
          All Domains ({allSkills.length})
        </button>

        {SKILL_CATEGORIES.map((cat) => {
          const Icon = categoryIcons[cat.title] || Terminal;
          const isSelected = selectedCategory === cat.title;

          return (
            <button
              key={cat.title}
              type="button"
              onClick={() => setSelectedCategory(cat.title)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-zinc-200 border border-white/[0.06] hover:bg-white/[0.06]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-cyan-400" />
              <span>{cat.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Inspector Highlight Card */}
      <div className="mb-8 p-5 rounded-xl bg-gradient-to-r from-cyan-950/30 via-[#10131d] to-[#0c0d14] border border-cyan-500/30 shadow-lg">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-base font-bold text-white">{activeSkill.name}</span>
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
            {activeSkill.category}
          </span>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed font-normal">
          <span className="text-zinc-400 font-mono text-xs uppercase block mb-1">
            Practical Production Application:
          </span>
          {activeSkill.practicalUsage}
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {displayedSkills.map((skill) => {
          const isActive = activeSkill.name === skill.name;

          return (
            <button
              key={skill.name}
              type="button"
              onClick={() => setActiveSkill(skill)}
              onMouseEnter={() => setActiveSkill(skill)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                isActive
                  ? 'bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/10'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              {skill.highlight && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400" />
              )}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                  {skill.category}
                </span>
                <h4 className="text-sm font-semibold text-white group-hover:text-cyan-200 transition-colors">
                  {skill.name}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>INSPECT</span>
                <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
