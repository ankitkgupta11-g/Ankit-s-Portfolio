// Application Configuration: Resume Link and Contact Form Backend Settings

export interface ContactSettings {
  formspreeId: string;
  recipientEmail: string;
}

export interface ProfileSettings {
  // Official avatar loaded directly from GitHub or user's custom photo URL
  avatarUrl: string;
  githubUsername: string;
  availability: string;
}

export interface ResumeSettings {
  directDownloadUrl: string;
  googleDriveUrl: string;
  fileName: string;
}

const STORAGE_KEYS = {
  FORMSPREE_ID: 'ankit_portfolio_formspree_id',
  RESUME_URL: 'ankit_portfolio_resume_url',
  AVATAR_URL: 'ankit_portfolio_avatar_url',
};

export const DEFAULT_PROFILE_SETTINGS: ProfileSettings = {
  // Points to local avatar if uploaded, or /profile.jpg in public folder
  avatarUrl: '/profile.jpg',
  githubUsername: 'ankitkgupta11-g',
  availability: 'Available for Opportunities',
};

export function getStoredAvatarUrl(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.AVATAR_URL) || null;
}

export function setStoredAvatarUrl(url: string | null): void {
  if (typeof window === 'undefined') return;
  if (!url) {
    localStorage.removeItem(STORAGE_KEYS.AVATAR_URL);
  } else {
    try {
      localStorage.setItem(STORAGE_KEYS.AVATAR_URL, url);
    } catch (e) {
      console.warn('Could not save avatar to localStorage:', e);
    }
  }
}

// Default settings
export const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  // Free Formspree form ID for portfolio contact. Users can replace this or configure via UI.
  formspreeId: 'myykpwyw',
  recipientEmail: 'ankitkgupta1123@gmail.com',
};

export const DEFAULT_RESUME_SETTINGS: ResumeSettings = {
  // If user sets a Google Drive or hosted direct link, it takes precedence.
  // By default, points to standard downloadable filename with interactive print-to-PDF generator fallback.
  directDownloadUrl: '',
  googleDriveUrl: 'https://drive.google.com/file/d/view?usp=sharing',
  fileName: 'Ankit_Kumar_AI_FullStack_Resume.pdf',
};

// Helpers to get and set config with localStorage persistence
export function getStoredResumeUrl(): string {
  if (typeof window === 'undefined') return DEFAULT_RESUME_SETTINGS.directDownloadUrl;
  return localStorage.getItem(STORAGE_KEYS.RESUME_URL) || DEFAULT_RESUME_SETTINGS.directDownloadUrl;
}

export function setStoredResumeUrl(url: string): void {
  if (typeof window === 'undefined') return;
  if (!url) {
    localStorage.removeItem(STORAGE_KEYS.RESUME_URL);
  } else {
    localStorage.setItem(STORAGE_KEYS.RESUME_URL, url.trim());
  }
}

export function getStoredFormspreeId(): string {
  if (typeof window === 'undefined') return DEFAULT_CONTACT_SETTINGS.formspreeId;
  return localStorage.getItem(STORAGE_KEYS.FORMSPREE_ID) || DEFAULT_CONTACT_SETTINGS.formspreeId;
}

export function setStoredFormspreeId(id: string): void {
  if (typeof window === 'undefined') return;
  if (!id) {
    localStorage.removeItem(STORAGE_KEYS.FORMSPREE_ID);
  } else {
    localStorage.setItem(STORAGE_KEYS.FORMSPREE_ID, id.trim());
  }
}
