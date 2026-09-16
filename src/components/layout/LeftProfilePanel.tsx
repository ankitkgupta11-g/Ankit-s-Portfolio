import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, FileText, Sparkles, ArrowUpRight, Search, Clock, Camera, Upload, RotateCcw } from 'lucide-react';
import { NavigationMenu } from '../navigation/NavigationMenu';
import { soundEngine } from '../../utils/audio';
import { getStoredAvatarUrl, setStoredAvatarUrl } from '../../data/config';
import { ToastMessage } from '../ui/Toast';

const LazyNeuralCore3D = lazy(() => import('../3d/NeuralCore3D'));

// Lightweight graceful loading skeleton
const NeuralCoreFallback: React.FC = () => (
  <div
    className="relative w-full h-52 sm:h-56 md:h-64 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-[#11131a]/80 to-[#0c0d14]/90"
    aria-label="Loading Neural Core 3D visualizer"
  >
    <div className="w-16 h-16 rounded-full border border-cyan-500/20 flex items-center justify-center bg-cyan-500/5">
      <div className="w-8 h-8 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-cyan-500/30 border-l-transparent animate-spin" />
    </div>
    <span className="mt-3 text-[11px] font-mono text-zinc-500">INITIALIZING NEURAL CORE...</span>
  </div>
);

interface LeftProfilePanelProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onCopyEmail: () => void;
  onOpenCommandPalette?: () => void;
  onToggleRecruiterMode?: () => void;
  isRecruiterScan?: boolean;
  viewMode?: 'continuous' | 'focused';
  onToggleViewMode?: () => void;
  onToast?: (toast: ToastMessage) => void;
  className?: string;
}

export const LeftProfilePanel: React.FC<LeftProfilePanelProps> = ({
  activeSection,
  onNavigate,
  onOpenResume,
  onCopyEmail,
  onOpenCommandPalette,
  onToggleRecruiterMode,
  isRecruiterScan,
  viewMode = 'continuous',
  onToggleViewMode,
  onToast,
  className = '',
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(getStoredAvatarUrl());
  const [imgError, setImgError] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = getStoredAvatarUrl();
    if (stored) {
      setAvatarUrl(stored);
      setImgError(false);
    } else {
      setAvatarUrl('/profile.jpg');
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onToast?.({
        id: Date.now().toString(),
        type: 'error',
        title: 'Invalid File',
        message: 'Please choose an image file (JPG, PNG, or WEBP).',
      });
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        setIsUploading(false);
        return;
      }

      // Optimize image dimensions for crisp avatar display and safe storage
      const img = new Image();
      img.onload = () => {
        const maxDim = 400; // Perfect for 80px-120px retina avatars while keeping storage under 50KB
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimized = canvas.toDataURL('image/jpeg', 0.85);
          setAvatarUrl(optimized);
          setStoredAvatarUrl(optimized);
        } else {
          setAvatarUrl(dataUrl);
          setStoredAvatarUrl(dataUrl);
        }

        setImgError(false);
        setIsUploading(false);
        soundEngine.playSuccess();
        onToast?.({
          id: Date.now().toString(),
          type: 'success',
          title: 'Original Photo Active!',
          message: 'Your authentic uploaded photo is now live on your portfolio.',
        });
      };
      img.onerror = () => {
        setIsUploading(false);
        setAvatarUrl(dataUrl);
        setStoredAvatarUrl(dataUrl);
        setImgError(false);
      };
      img.src = dataUrl;
    };
    reader.onerror = () => {
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playClick();
    setStoredAvatarUrl(null);
    setAvatarUrl(null);
    setImgError(true);
    onToast?.({
      id: Date.now().toString(),
      type: 'info',
      title: 'Photo Reset',
      message: 'Profile photo cleared. Click to upload anytime.',
    });
  };

  return (
    <aside
      id="fixed-identity-panel"
      className={`h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-[#090a0f] border-b lg:border-b-0 lg:border-r border-white/[0.07] overflow-y-auto custom-scrollbar select-none ${className}`}
      aria-label="Developer Identity and Navigation"
    >
      {/* Top Header & Identity Block */}
      <div className="space-y-6">
        {/* Availability Badge */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for Opportunities</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400/80" />
            <span>AI / ML &amp; FULL STACK</span>
          </div>
        </div>

        {/* Hidden File Input for Original Photo Upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
          aria-label="Upload profile photo"
        />

        {/* Real Profile Avatar & Identity */}
        <div className="flex items-start gap-4">
          <div className="relative group shrink-0">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                fileInputRef.current?.click();
              }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-cyan-500/40 hover:border-cyan-400 bg-zinc-900/90 shadow-lg shadow-cyan-950/30 p-0.5 transition-all duration-200 cursor-pointer text-left block focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              title="Click to select your original photo from device"
            >
              {avatarUrl && !imgError ? (
                <img
                  src={avatarUrl}
                  alt="Ankit Kumar profile"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top rounded-xl transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-cyan-950 via-zinc-900 to-black flex flex-col items-center justify-center text-cyan-300 font-bold font-mono">
                  <span className="text-lg sm:text-xl">AK</span>
                  <span className="text-[9px] text-zinc-400 font-normal">Upload</span>
                </div>
              )}

              {/* Hover / Active Camera Overlay */}
              <div className="absolute inset-0 bg-black/70 rounded-xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-cyan-300 transition-opacity">
                <Camera className="w-5 h-5 mb-0.5 text-cyan-400" />
                <span className="text-[9px] font-mono text-white font-medium">
                  {avatarUrl && !imgError ? 'Change' : 'Upload'}
                </span>
              </div>
            </button>

            {/* Live Online Pulse */}
            <span
              className="absolute -bottom-1 -right-1 flex h-4 w-4 pointer-events-none"
              title="Active & Available"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#090a0f]" />
            </span>
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase leading-none">
              ANKIT KUMAR
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 tracking-tight">
              AI/ML Engineer · Full Stack Developer
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                Gorakhpur, UP
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                B.Tech AIML
              </span>

              {/* Direct Photo Upload / Change Button */}
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer"
                title="Select your original WhatsApp/camera photo from your device"
              >
                <Upload className="w-2.5 h-2.5" />
                <span>{avatarUrl && !imgError ? 'Change Photo' : 'Upload Photo'}</span>
              </button>

              {/* Reset Option if Custom Uploaded */}
              {avatarUrl && getStoredAvatarUrl() && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="text-[10px] font-mono text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer px-1"
                  title="Remove custom photo"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal pt-0 max-w-sm">
          Building intelligent systems, AI-powered applications, and scalable digital experiences.
        </p>

        {/* Interactive 3D Neural Core Visual with Lazy Loading */}
        <div className="pt-1">
          <Suspense fallback={<NeuralCoreFallback />}>
            <LazyNeuralCore3D />
          </Suspense>
        </div>

        {/* Quick Navigation Menu (Active on desktop, compact on tablet) */}
        <div className="hidden lg:block pt-2 space-y-2">
          {/* Quick Action Triggers */}
          <div className="grid grid-cols-2 gap-1.5 px-1 pb-1">
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                onOpenCommandPalette?.();
              }}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-[11px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Open Command Palette (Cmd + K)"
            >
              <Search className="w-3 h-3 text-cyan-400" />
              <span>⌘K Console</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playSwitch();
                onToggleRecruiterMode?.();
              }}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                isRecruiterScan
                  ? 'bg-cyan-500 text-black font-semibold shadow-sm'
                  : 'bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-400 hover:text-white'
              }`}
              title="Toggle 30-Second Recruiter Fast-Scan Mode"
            >
              <Clock className="w-3 h-3" />
              <span>{isRecruiterScan ? 'Scanning' : '30s Scan'}</span>
            </button>
          </div>

          <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 px-3 pb-1 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span>Index</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono tracking-normal normal-case">
                {viewMode === 'focused' ? 'Focused Tab' : 'Continuous Flow'}
              </span>
            </div>
            {onToggleViewMode && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playSwitch();
                  onToggleViewMode();
                }}
                className="text-[10px] text-zinc-400 hover:text-cyan-300 transition-colors cursor-pointer normal-case tracking-normal hover:underline underline-offset-2"
                title="Toggle between Continuous Scroll Flow and Focused Tab View"
              >
                {viewMode === 'focused' ? 'Switch to Flow' : 'Switch to Tabs'}
              </button>
            )}
          </div>
          <NavigationMenu activeSection={activeSection} onNavigate={onNavigate} />
        </div>
      </div>

      {/* Bottom Footer: Social Links & Quick Resume */}
      <div className="pt-8 lg:pt-6 space-y-4 border-t border-white/[0.06] mt-6">
        {/* Social Links Grid */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/ankitkgupta11-g"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playClick()}
            className="flex-1 min-h-[44px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white transition-colors group focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="Ankit Kumar GitHub profile (opens in new tab)"
          >
            <Github className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
          </a>

          <a
            href="https://linkedin.com/in/ankit-kumar-243b6232a"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playClick()}
            className="flex-1 min-h-[44px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white transition-colors group focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="Ankit Kumar LinkedIn profile (opens in new tab)"
          >
            <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-sky-400 transition-colors" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-sky-400 transition-colors" />
          </a>

          <button
            type="button"
            onClick={() => {
              soundEngine.playSuccess();
              onCopyEmail();
            }}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors group cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="Copy Email address: ankitkgupta1123@gmail.com"
            title="Copy ankitkgupta1123@gmail.com"
          >
            <Mail className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onOpenResume();
            }}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors group cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
            aria-label="View verified resume"
            title="View Resume"
          >
            <FileText className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
          </button>
        </div>

        {/* Quick Email Display */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-1">
          <span className="truncate">ankitkgupta1123@gmail.com</span>
          <span className="text-zinc-600">IN / UTC+5:30</span>
        </div>
      </div>
    </aside>
  );
};
