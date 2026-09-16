import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import {
  Mail,
  Github,
  Linkedin,
  Send,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Settings,
  RefreshCw,
} from 'lucide-react';
import { ToastMessage } from '../ui/Toast';
import { getStoredFormspreeId, setStoredFormspreeId, DEFAULT_CONTACT_SETTINGS } from '../../data/config';

interface ContactSectionProps {
  onShowToast: (toast: ToastMessage) => void;
}

const QUICK_TOPICS = [
  '💼 Job / Internship Opportunity',
  '🤖 AI & Full-Stack Collaboration',
  '⚡ Freelance / Technical Project',
  '💬 General Tech Discussion',
];

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>({
    name: '',
    email: '',
    subject: QUICK_TOPICS[0],
    message: '',
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [formspreeId, setFormspreeId] = useState<string>(DEFAULT_CONTACT_SETTINGS.formspreeId);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [customEndpointInput, setCustomEndpointInput] = useState<string>('');

  const userEmail = DEFAULT_CONTACT_SETTINGS.recipientEmail;

  useEffect(() => {
    const saved = getStoredFormspreeId();
    setFormspreeId(saved);
    setCustomEndpointInput(saved);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(userEmail);
      setCopied(true);
      onShowToast({
        id: Date.now().toString(),
        type: 'success',
        title: 'Email Copied to Clipboard',
        message: `${userEmail} has been copied.`,
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      onShowToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Failed to Copy',
        message: `Please manually copy: ${userEmail}`,
      });
    }
  };

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 8) {
      errs.message = 'Message should be at least 8 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormspreeSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = customEndpointInput.trim().replace(/^https?:\/\/formspree\.io\/f\//, '');
    if (!cleanId) {
      setStoredFormspreeId(DEFAULT_CONTACT_SETTINGS.formspreeId);
      setFormspreeId(DEFAULT_CONTACT_SETTINGS.formspreeId);
    } else {
      setStoredFormspreeId(cleanId);
      setFormspreeId(cleanId);
    }
    setShowConfig(false);
    onShowToast({
      id: Date.now().toString(),
      type: 'success',
      title: 'Backend Endpoint Updated',
      message: `Formspree ID set to: ${cleanId || DEFAULT_CONTACT_SETTINGS.formspreeId}`,
    });
  };

  const handleDirectEmailFallback = () => {
    const subjectLine = encodeURIComponent(`[${formData.subject}] from ${formData.name.trim() || 'Portfolio Visitor'}`);
    const bodyText = encodeURIComponent(
      `Hi Ankit,\n\n${formData.message.trim()}\n\nBest regards,\n${formData.name.trim()}\nEmail: ${formData.email.trim()}`
    );
    window.location.href = `mailto:${userEmail}?subject=${subjectLine}&body=${bodyText}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // Direct Formspree Backend POST
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject,
          message: formData.message.trim(),
          _replyto: formData.email.trim(),
          submittedAt: new Date().toISOString(),
          recipient: userEmail,
        }),
      });

      if (response.ok) {
        setIsSubmittedSuccessfully(true);
        onShowToast({
          id: Date.now().toString(),
          type: 'success',
          title: 'Message Sent Successfully',
          message: `Your inquiry has been dispatched directly to ${userEmail}.`,
        });
      } else {
        const data = await response.json().catch(() => ({}));
        const errMsg = data?.error || 'Direct transmission encountered a service error.';
        setSubmissionError(errMsg);
        onShowToast({
          id: Date.now().toString(),
          type: 'error',
          title: 'Transmission Failed',
          message: 'Unable to deliver via Formspree. You can send directly via Mail client.',
        });
      }
    } catch {
      setSubmissionError('Network error connecting to backend service.');
      onShowToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Network Error',
        message: 'Network issue. Click below to send via your local email client.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmittedSuccessfully(false);
    setSubmissionError(null);
    setFormData({
      name: '',
      email: '',
      subject: QUICK_TOPICS[0],
      message: '',
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-16 sm:py-20" aria-label="Contact and Inquiries">
      <SectionHeader
        number="11"
        label="Get in Touch"
        title="LET'S BUILD SOMETHING INTELLIGENT."
        description="Have a project, internship opportunity, or idea worth building? Let's connect."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Quick Connect Links & Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#10121a]/80 border border-white/[0.08] space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white tracking-tight">Direct Channels</h3>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                I am actively considering opportunities in AI/ML engineering, generative systems, and full-stack web development.
              </p>
            </div>

            {/* Email Action Card */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>PRIMARY INBOX</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className={copied ? 'text-emerald-400' : ''}>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="font-mono text-xs sm:text-sm text-white font-medium select-all break-all">
                {userEmail}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <a
                href={`mailto:${userEmail}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <Mail className="w-4 h-4" />
                <span>Open Mail Client</span>
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="https://github.com/ankitkgupta11-g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-zinc-200 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-zinc-400" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>

                <a
                  href="https://linkedin.com/in/ankit-kumar-243b6232a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-zinc-200 hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-zinc-400" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.04] space-y-1.5 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Gorakhpur, UP, India (Open to Remote / Relocation)</span>
              </div>
              <div className="flex items-center justify-between text-zinc-500 pt-1">
                <span>Backend: Formspree API</span>
                <button
                  type="button"
                  onClick={() => setShowConfig((prev) => !prev)}
                  className="text-zinc-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Configure Formspree Form ID"
                >
                  <Settings className="w-3 h-3" />
                  <span>{showConfig ? 'Hide Config' : 'Config ID'}</span>
                </button>
              </div>
            </div>

            {/* Config Drawer for Formspree ID */}
            {showConfig && (
              <form onSubmit={handleFormspreeSave} className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-cyan-400 uppercase">Formspree Form ID</span>
                  <span className="text-[10px] text-zinc-500 font-mono">formspree.io/f/&#123;id&#125;</span>
                </div>
                <input
                  type="text"
                  value={customEndpointInput}
                  onChange={(e) => setCustomEndpointInput(e.target.value)}
                  placeholder="e.g. myykpwyw or xvgkzbqe"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.1] text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                />
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setCustomEndpointInput(DEFAULT_CONTACT_SETTINGS.formspreeId);
                      setStoredFormspreeId(DEFAULT_CONTACT_SETTINGS.formspreeId);
                      setFormspreeId(DEFAULT_CONTACT_SETTINGS.formspreeId);
                      setShowConfig(false);
                    }}
                    className="text-[10px] text-zinc-400 hover:text-zinc-200 cursor-pointer"
                  >
                    Reset Default
                  </button>
                  <button
                    type="submit"
                    className="px-2.5 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-[10px] cursor-pointer"
                  >
                    Save ID
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Direct Message Form with Backend Transmission */}
        <div className="lg:col-span-7">
          {isSubmittedSuccessfully ? (
            /* Success State Card */
            <div className="p-8 rounded-2xl bg-[#10121a]/90 border border-emerald-500/30 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-white tracking-tight">Message Transmitted!</h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. Your message has been sent directly to{' '}
                  <span className="text-cyan-400 font-mono font-medium">{userEmail}</span> via the Formspree API.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] max-w-md mx-auto text-left font-mono text-xs space-y-1.5 text-zinc-400">
                <div className="flex justify-between border-b border-white/[0.04] pb-1">
                  <span className="text-zinc-500">Topic:</span>
                  <span className="text-white">{formData.subject}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.04] pb-1">
                  <span className="text-zinc-500">Sender:</span>
                  <span className="text-zinc-200">{formData.email}</span>
                </div>
                <div className="pt-1">
                  <span className="text-zinc-500 block mb-0.5">Message Snippet:</span>
                  <p className="text-zinc-300 font-sans italic text-xs line-clamp-2">
                    "{formData.message}"
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Send Another Message</span>
                </button>
              </div>
            </div>
          ) : (
            /* Live Message Form */
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-7 rounded-2xl bg-[#10121a]/80 border border-white/[0.08] space-y-5"
              noValidate
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Direct Backend Submission</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Messages are delivered straight to my inbox via API.</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                  Live API
                </span>
              </div>

              {/* Quick Topic Chips */}
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                  Select Topic
                </label>
                <div className="flex flex-wrap gap-2">
                  {QUICK_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setFormData({ ...formData, subject: topic })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                        formData.subject === topic
                          ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-200'
                          : 'bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name and Email in 2 columns on tablet+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Input */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma or Tech Recruiter"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-red-500/60 focus:border-red-400'
                        : 'border-white/[0.08] focus:border-cyan-400/60'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1 font-mono">{errors.name}</p>}
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                    Your Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500/60 focus:border-red-400'
                        : 'border-white/[0.08] focus:border-cyan-400/60'
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1 font-mono">{errors.email}</p>}
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                  Message / Proposal Details <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Discussing an opportunity, project collaboration, or technical inquiry..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-colors resize-none ${
                    errors.message
                      ? 'border-red-500/60 focus:border-red-400'
                      : 'border-white/[0.08] focus:border-cyan-400/60'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{errors.message}</p>
                )}
              </div>

              {/* Error fallback alert if API error occurs */}
              {submissionError && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{submissionError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDirectEmailFallback}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs cursor-pointer whitespace-nowrap"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Open in Email Client</span>
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-lg shadow-cyan-500/20 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transmitting via Formspree API...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 font-mono text-center">
                Instant delivery to {userEmail} · Verified anti-spam protection
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
