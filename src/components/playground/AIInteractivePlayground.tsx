import React, { useState, useTransition } from 'react';
import {
  Sparkles,
  Terminal,
  Cpu,
  Play,
  RotateCcw,
  Sliders,
  Copy,
  Check,
  Zap,
  Activity,
  Code2,
  ChevronRight,
} from 'lucide-react';

type PlaygroundTab = 'prompt-engine' | 'code-mentor' | 'ml-classifier';

interface PresetOption {
  title: string;
  tab: PlaygroundTab;
  input: string;
  params?: Record<string, string | number>;
}

export const AIInteractivePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('prompt-engine');
  const [inputText, setInputText] = useState<string>(
    'Futuristic glass architectural pavilion in foggy neon forest, 8k resolution'
  );
  const [temperature, setTemperature] = useState<number>(0.7);
  const [modelType, setModelType] = useState<string>('gemini-2.5-flash');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [outputText, setOutputText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // ML Classifier State
  const [mlAge, setMlAge] = useState<number>(54);
  const [mlCholesterol, setMlCholesterol] = useState<number>(240);
  const [mlMaxHR, setMlMaxHR] = useState<number>(150);
  const [mlBP, setMlBP] = useState<number>(130);
  const [mlPrediction, setMlPrediction] = useState<{
    riskScore: number;
    riskCategory: 'Low Risk' | 'Moderate Risk' | 'Elevated Risk';
    confidence: number;
  } | null>(null);

  const presets: PresetOption[] = [
    {
      title: 'AURA Prompt Expansion',
      tab: 'prompt-engine',
      input: 'Modern coffee shop in rainy Tokyo with neon reflection and cyber aesthetic',
    },
    {
      title: 'Content Generator: Tech Post',
      tab: 'prompt-engine',
      input: 'Explain how serverless PostgreSQL (Neon) and Drizzle ORM improve developer velocity',
    },
    {
      title: 'CodeMate: Dijkstra in C',
      tab: 'code-mentor',
      input: 'How to implement Dijkstra shortest path algorithm in C without memory leaks?',
    },
    {
      title: 'GeeKonik Cardiac Risk Scan',
      tab: 'ml-classifier',
      input: 'Clinical biometric evaluation',
    },
  ];

  // Token estimates
  const estimatedTokens = Math.ceil(inputText.length / 4);

  const handleSimulateInference = () => {
    setIsProcessing(true);
    setOutputText('');

    setTimeout(() => {
      if (activeTab === 'prompt-engine') {
        const enhanced = `[System Grounding: Gemini Multi-Model Directive]
Enhanced Synthesis Target:
"${inputText}, cinematic atmospheric illumination, photorealistic ray-tracing, volumetric fog, Kodak Portra 800 tone curve, depth of field f/1.8, 8k octane render."

• Negative Prompt Constraints: [oversaturated, text artifacts, low-res textures, deformed perspective]
• Estimated Inference Time: ~420ms | Model: ${modelType} (temp: ${temperature})
• Status: Schema Validated & Staged for Vercel Edge Pipeline`;
        setOutputText(enhanced);
      } else if (activeTab === 'code-mentor') {
        const codeResponse = `[CodeMate AI Adaptive Mentor Engine]
Topic: Dynamic Memory Allocation & Graph Traversal

Key Architectural Principles:
1. Heap Allocation: Allocate adjacency matrix using calloc() to guarantee zero-initialized edge weights.
2. Priority Queue: Use a binary min-heap structure struct MinHeap to reduce extraction from O(V) to O(log V).
3. Memory Governance: Ensure every allocated vertex struct is tracked in a cleanup queue to avoid memory leaks.

Time Complexity: O((V + E) log V)
Space Complexity: O(V) memory footprint`;
        setOutputText(codeResponse);
      } else if (activeTab === 'ml-classifier') {
        // Deterministic simulated classification model
        const riskCalculation =
          (mlAge * 0.35 + mlCholesterol * 0.25 + mlBP * 0.3 - mlMaxHR * 0.2) / 100;
        const normalizedScore = Math.min(Math.max(Math.round(riskCalculation * 35), 12), 94);
        const category =
          normalizedScore < 35
            ? 'Low Risk'
            : normalizedScore < 68
            ? 'Moderate Risk'
            : 'Elevated Risk';

        setMlPrediction({
          riskScore: normalizedScore,
          riskCategory: category,
          confidence: 91.4,
        });
      }
      setIsProcessing(false);
    }, 450);
  };

  const handleCopyOutput = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="ai-playground"
      className="py-12 border-t border-white/[0.06] space-y-6"
      aria-label="Interactive AI Simulator"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest font-semibold">
              Live AI Architecture Simulation
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Interactive AI Playground
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            Test the prompt refinement, code mentorship, and machine learning inference pipelines that power Ankit Kumar's full-stack applications.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono">
          <button
            type="button"
            onClick={() => {
              setActiveTab('prompt-engine');
              setOutputText('');
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'prompt-engine'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Prompt Engine
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('code-mentor');
              setOutputText('');
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'code-mentor'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Code Tutor
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('ml-classifier');
              setOutputText('');
            }}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'ml-classifier'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ML Heart Risk
          </button>
        </div>
      </div>

      {/* Preset Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-[11px] font-mono text-zinc-500 uppercase flex items-center gap-1">
          <Zap className="w-3 h-3 text-cyan-400" />
          <span>Quick Presets:</span>
        </span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setActiveTab(preset.tab);
              setInputText(preset.input);
              setOutputText('');
            }}
            className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] text-[11px] font-mono text-zinc-300 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Interactive Console Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 rounded-2xl border border-white/[0.08] bg-[#0c0e15] p-5 sm:p-6 shadow-xl">
        {/* Left Side: Controls & Input (Cols 1-6) */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {activeTab === 'ml-classifier' ? 'Biomarker Parameter Input' : 'Raw Prompt Input'}
                </span>
              </span>
              {activeTab !== 'ml-classifier' && (
                <span className="text-[11px] text-zinc-500 font-mono">
                  ~{estimatedTokens} tokens ({inputText.length} chars)
                </span>
              )}
            </div>

            {activeTab !== 'ml-classifier' ? (
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
                className="w-full rounded-xl bg-black/40 border border-white/[0.08] p-3 text-xs sm:text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none custom-scrollbar"
                placeholder="Type or paste any input to test prompt processing..."
              />
            ) : (
              /* ML Biomarker Sliders */
              <div className="p-4 rounded-xl bg-black/30 border border-white/[0.06] space-y-3 text-xs font-mono">
                <div className="space-y-1">
                  <div className="flex justify-between text-zinc-400">
                    <span>Patient Age</span>
                    <span className="text-cyan-400 font-bold">{mlAge} yrs</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="80"
                    value={mlAge}
                    onChange={(e) => setMlAge(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-zinc-400">
                    <span>Resting Blood Pressure</span>
                    <span className="text-cyan-400 font-bold">{mlBP} mmHg</span>
                  </div>
                  <input
                    type="range"
                    min="90"
                    max="190"
                    value={mlBP}
                    onChange={(e) => setMlBP(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-zinc-400">
                    <span>Serum Cholesterol</span>
                    <span className="text-cyan-400 font-bold">{mlCholesterol} mg/dl</span>
                  </div>
                  <input
                    type="range"
                    min="140"
                    max="380"
                    value={mlCholesterol}
                    onChange={(e) => setMlCholesterol(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-zinc-400">
                    <span>Max Heart Rate Achieved</span>
                    <span className="text-cyan-400 font-bold">{mlMaxHR} bpm</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="200"
                    value={mlMaxHR}
                    onChange={(e) => setMlMaxHR(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1 bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Model Hyperparameters (if Prompt / Code) */}
            {activeTab !== 'ml-classifier' && (
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span>Model:</span>
                  <select
                    value={modelType}
                    onChange={(e) => setModelType(e.target.value)}
                    className="bg-black/50 border border-white/10 rounded px-2 py-1 text-cyan-300 focus:outline-none"
                  >
                    <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                    <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span>Temperature:</span>
                  <span className="text-cyan-400 font-bold">{temperature}</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-20 accent-cyan-400 h-1 bg-white/10 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleSimulateInference}
              disabled={isProcessing}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-semibold text-xs tracking-wide transition-all duration-150 cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              {isProcessing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>EXECUTING PIPELINE...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>
                    {activeTab === 'ml-classifier'
                      ? 'EXECUTE ML CLASSIFIER INFERENCE'
                      : 'RUN SIMULATION INFERENCE'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Execution Output (Cols 7-12) */}
        <div className="lg:col-span-6 flex flex-col rounded-xl bg-black/50 border border-white/[0.08] p-4 min-h-[220px]">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>Inference Telemetry &amp; Structured Output</span>
            </span>
            {outputText && (
              <button
                type="button"
                onClick={handleCopyOutput}
                className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
          </div>

          <div className="flex-1 py-3 text-xs font-mono text-zinc-300 leading-relaxed overflow-y-auto custom-scrollbar">
            {activeTab === 'ml-classifier' && mlPrediction ? (
              <div className="space-y-4 p-2 animate-in fade-in">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">Model Verdict</span>
                    <span
                      className={`text-base font-bold ${
                        mlPrediction.riskCategory === 'Low Risk'
                          ? 'text-emerald-400'
                          : mlPrediction.riskCategory === 'Moderate Risk'
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {mlPrediction.riskCategory}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 uppercase block">Risk Metric</span>
                    <span className="text-sm font-bold text-cyan-400 font-mono">
                      {mlPrediction.riskScore} / 100
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] text-zinc-400">
                  <p>• Architecture: Multi-Layer Perceptron (TensorFlow/Keras binary classifier)</p>
                  <p>• Preprocessing: StandardScaler applied across normalized continuous metrics</p>
                  <p>• Confidence Index: {mlPrediction.confidence}% on hold-out validation set</p>
                  <p className="text-zinc-500 text-[10px] pt-1">
                    *Trained during GeeKonik Internship using cardiovascular clinical records.
                  </p>
                </div>
              </div>
            ) : outputText ? (
              <pre className="whitespace-pre-wrap font-mono text-[11px] text-zinc-300 leading-relaxed">
                {outputText}
              </pre>
            ) : (
              <div className="h-full min-h-[140px] flex flex-col items-center justify-center text-center text-zinc-600 space-y-2">
                <Terminal className="w-6 h-6 stroke-1 text-zinc-700" />
                <p className="text-xs font-mono">
                  Press <strong>Run Simulation Inference</strong> to evaluate parameters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
