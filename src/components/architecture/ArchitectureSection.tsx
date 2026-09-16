import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { ARCHITECTURE_NODES } from '../../data/architecture';
import { ArchitectureNode } from '../../types';
import {
  Cpu,
  Database,
  Globe,
  Key,
  Layers,
  Server,
  Cloud,
  ArrowDown,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Workflow,
  Info,
} from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('node-ai');

  const selectedNode =
    ARCHITECTURE_NODES.find((n) => n.id === activeNodeId) || ARCHITECTURE_NODES[0];

  const getNodeIcon = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'client':
        return Globe;
      case 'gateway':
        return Server;
      case 'auth':
        return Key;
      case 'ai':
        return Cpu;
      case 'worker':
        return Layers;
      case 'db':
        return Database;
      case 'deploy':
        return Cloud;
    }
  };

  return (
    <section id="architecture" className="py-16 sm:py-20 border-b border-white/[0.06]" aria-label="Technical Architecture">
      <SectionHeader
        number="03"
        label="System Design & Data Flow"
        title="Deep Technical Architecture"
        description="End-to-end data pipeline powering production AI integrations, from client-side state management through model orchestration down to serverless relational storage."
      />

      {/* System Flow Diagram Container */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e15] p-6 sm:p-8 space-y-8">
        {/* Diagram Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Workflow className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">
              PIPELINE TOPOLOGY: GENERATIVE AI &amp; POSTGRESQL
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Node Inspector</span>
          </div>
        </div>

        {/* Visual Graph Layout */}
        <div className="space-y-6">
          {/* Layer 1: Client Entry */}
          <div className="flex flex-col items-center">
            <div className="text-[11px] font-mono text-zinc-500 mb-2 flex items-center gap-1.5">
              <span>01. ENTRYPOINT</span>
            </div>
            {/* User Node */}
            <div className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-zinc-300 flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>User / Client Webhook</span>
            </div>
            <ArrowDown className="w-4 h-4 text-cyan-400/60 my-1 animate-bounce" />

            {/* Client App Node */}
            <button
              type="button"
              onClick={() => setActiveNodeId('node-client')}
              onMouseEnter={() => setActiveNodeId('node-client')}
              className={`w-full max-w-md p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer flex items-center justify-between ${
                activeNodeId === 'node-client'
                  ? 'bg-cyan-500/10 border-cyan-400 shadow-lg shadow-cyan-500/10'
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Client Interface (SPA)</h4>
                  <p className="text-xs text-zinc-400 font-mono">React 19 + TypeScript + Tailwind</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-cyan-300">
                CLIENT
              </span>
            </button>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-cyan-400/60" />
          </div>

          {/* Layer 2: Parallel Gateways (API Layer + Authentication) */}
          <div>
            <div className="text-center text-[11px] font-mono text-zinc-500 mb-2">
              02. ROUTING &amp; IDENTITY ENFORCEMENT
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* API Layer */}
              <button
                type="button"
                onClick={() => setActiveNodeId('node-gateway')}
                onMouseEnter={() => setActiveNodeId('node-gateway')}
                className={`p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer flex items-center justify-between ${
                  activeNodeId === 'node-gateway'
                    ? 'bg-sky-500/10 border-sky-400 shadow-lg shadow-sky-500/10'
                    : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">API &amp; Routing Layer</h4>
                    <p className="text-xs text-zinc-400 font-mono">Next.js / Node Routes</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-sky-300">
                  GATEWAY
                </span>
              </button>

              {/* Auth Layer */}
              <button
                type="button"
                onClick={() => setActiveNodeId('node-auth')}
                onMouseEnter={() => setActiveNodeId('node-auth')}
                className={`p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer flex items-center justify-between ${
                  activeNodeId === 'node-auth'
                    ? 'bg-amber-500/10 border-amber-400 shadow-lg shadow-amber-500/10'
                    : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Authentication Gateway</h4>
                    <p className="text-xs text-zinc-400 font-mono">Clerk / JWT Verification</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-amber-300">
                  SECURITY
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-cyan-400/60" />
          </div>

          {/* Layer 3: AI Inference Engine */}
          <div className="flex flex-col items-center">
            <div className="text-[11px] font-mono text-zinc-500 mb-2">
              03. MACHINE INTELLIGENCE ENGINE
            </div>
            <button
              type="button"
              onClick={() => setActiveNodeId('node-ai')}
              onMouseEnter={() => setActiveNodeId('node-ai')}
              className={`w-full max-w-md p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer flex items-center justify-between ${
                activeNodeId === 'node-ai'
                  ? 'bg-purple-500/10 border-purple-400 shadow-lg shadow-purple-500/10'
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">AI Inference &amp; Synthesis</h4>
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">Google Gemini API Multimodal</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                CORE AI
              </span>
            </button>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-cyan-400/60" />
          </div>

          {/* Layer 4: Processing Layer */}
          <div className="flex flex-col items-center">
            <div className="text-[11px] font-mono text-zinc-500 mb-2">
              04. ASYNC VALIDATION &amp; FORMATTING
            </div>
            <button
              type="button"
              onClick={() => setActiveNodeId('node-worker')}
              onMouseEnter={() => setActiveNodeId('node-worker')}
              className={`w-full max-w-md p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer flex items-center justify-between ${
                activeNodeId === 'node-worker'
                  ? 'bg-indigo-500/10 border-indigo-400 shadow-lg shadow-indigo-500/10'
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Processing &amp; Normalization</h4>
                  <p className="text-xs text-zinc-400 font-mono">Payload Sanitization &amp; Token Math</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-indigo-300">
                TRANSFORM
              </span>
            </button>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-cyan-400/60" />
          </div>

          {/* Layer 5: Relational Persistence */}
          <div className="flex flex-col items-center">
            <div className="text-[11px] font-mono text-zinc-500 mb-2">
              05. PERSISTENT STORAGE
            </div>
            <button
              type="button"
              onClick={() => setActiveNodeId('node-db')}
              onMouseEnter={() => setActiveNodeId('node-db')}
              className={`w-full max-w-md p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer flex items-center justify-between ${
                activeNodeId === 'node-db'
                  ? 'bg-emerald-500/10 border-emerald-400 shadow-lg shadow-emerald-500/10'
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Relational Persistence</h4>
                  <p className="text-xs text-zinc-400 font-mono">Neon PostgreSQL + Drizzle ORM</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                DATABASE
              </span>
            </button>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-4 h-4 text-cyan-400/60" />
          </div>

          {/* Layer 6: Edge & Cloud Deployment */}
          <div className="flex flex-col items-center">
            <div className="text-[11px] font-mono text-zinc-500 mb-2">
              06. GLOBAL EDGE DEPLOYMENT &amp; CDN
            </div>
            <button
              type="button"
              onClick={() => setActiveNodeId('node-deploy')}
              onMouseEnter={() => setActiveNodeId('node-deploy')}
              className={`w-full max-w-md p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer flex items-center justify-between ${
                activeNodeId === 'node-deploy'
                  ? 'bg-sky-500/10 border-sky-400 shadow-lg shadow-sky-500/10'
                  : 'bg-white/[0.03] border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Edge &amp; Cloud Deployment</h4>
                  <p className="text-xs text-zinc-400 font-mono">Vercel Edge Network / Serverless Runtime</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                DEPLOYMENT
              </span>
            </button>
          </div>
        </div>

        {/* Node Detail Inspector Panel */}
        <div className="mt-8 p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-cyan-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              {React.createElement(getNodeIcon(selectedNode.type), {
                className: 'w-5 h-5 text-cyan-400',
              })}
              <div>
                <h4 className="text-base font-bold text-white">{selectedNode.label}</h4>
                <p className="text-xs font-mono text-cyan-400">{selectedNode.tech}</p>
              </div>
            </div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.06]">
              {selectedNode.role}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
            {selectedNode.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-3 border-t border-white/[0.04] text-xs font-mono">
            {selectedNode.inputs && (
              <div>
                <span className="text-zinc-500 block mb-1">INCOMING PAYLOAD:</span>
                <div className="space-y-1">
                  {selectedNode.inputs.map((inp, idx) => (
                    <div key={idx} className="text-zinc-300 flex items-center gap-1.5">
                      <span className="text-cyan-400">→</span>
                      <span>{inp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedNode.outputs && (
              <div>
                <span className="text-zinc-500 block mb-1">DOWNSTREAM DISPATCH:</span>
                <div className="space-y-1">
                  {selectedNode.outputs.map((out, idx) => (
                    <div key={idx} className="text-zinc-300 flex items-center gap-1.5">
                      <span className="text-emerald-400">←</span>
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
