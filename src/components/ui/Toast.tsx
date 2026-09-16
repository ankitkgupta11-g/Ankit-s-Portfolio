import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-[#12141e]/95 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      {toast.type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      )}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white tracking-tight">{toast.title}</h4>
        {toast.message && <p className="text-xs text-zinc-400 mt-0.5">{toast.message}</p>}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-zinc-500 hover:text-white transition-colors p-1"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
