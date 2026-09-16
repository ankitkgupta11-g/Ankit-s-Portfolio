import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'aura-studio',
    title: 'AURA Creative Studio',
    subtitle: 'AI-Powered Image Synthesis & Creative Asset Platform',
    description:
      'AI-powered image generation platform that transforms text prompts into visual artwork with prompt enhancement, creative styles, personalized galleries, and social features.',
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Gemini API',
      'PostgreSQL',
      'Neon',
      'Drizzle ORM',
      'Tailwind CSS',
    ],
    features: [
      'AI image generation engine with multi-model prompt refinement',
      'Context-aware prompt enhancement using LLM embeddings',
      'Curated artistic style filters (Cinematic, Cyberpunk, Minimalist, 3D Render)',
      'Custom aspect ratio adaptations (1:1, 16:9, 9:16, 4:3)',
      'Personal creative studio gallery with image management',
      'Public community showcase with likes, views, and favorites metrics',
      'High-performance asset caching and fast query pipelines with Drizzle ORM',
    ],
    problem:
      'Standard image generation interfaces are often intimidating for non-technical creators, with unpredictable prompt interpretations, lack of structured style controls, and disjointed asset management.',
    solution:
      'Built a streamlined full-stack studio combining prompt intelligence via Gemini API with persistent serverless PostgreSQL storage, allowing creators to effortlessly explore styles, refine prompts, and manage personal collections.',
    architecture:
      'Client (React + TypeScript) → Node.js API Middleware → Gemini API (Prompt Enhancement & Synthesis) → Processing Layer → Neon PostgreSQL via Drizzle ORM for metadata, user tags, and social interactions.',
    challenges:
      'Optimizing prompt expansion latency without delaying user feedback; implemented asynchronous generation status queues with optimistic UI updates in React.',
    githubUrl: 'https://github.com/ankitkgupta11-g/AURA-IMAGE-GENERATOR',
    liveUrl: 'https://aura-image-generator-three.vercel.app',
    category: 'AI / Generative AI',
    badge: 'Flagship AI Project',
    accentColor: '#06b6d4',
  },
  {
    id: 'ai-content-generator',
    title: 'Creator AI – Content Generator',
    subtitle: 'Production-Grade Generative Copywriting & Template Engine',
    description:
      'AI-powered content generation platform that creates structured content using generative AI with authentication, templates, history, usage tracking, and subscription-oriented features.',
    technologies: [
      'React',
      'Next.js',
      'Node.js',
      'Google Gemini AI',
      'Clerk',
      'Neon PostgreSQL',
      'Drizzle ORM',
      'Tailwind CSS',
    ],
    features: [
      'Multi-template generation suite (Blog posts, SEO meta, Social copy, Code explanations)',
      'Secure user authentication and session management via Clerk',
      'Granular word and token usage tracking with quota limits',
      'Persistent content history archive with search and instant 1-click clipboard copy',
      'Structured markdown preview and export formatting',
      'Subscription-ready architecture with token counter models and tiered quotas',
    ],
    problem:
      'Writers and developers often juggle disparate prompt windows without session continuity, version histories, structured template constraints, or predictable usage boundaries.',
    solution:
      'Developed an end-to-end platform featuring modular prompt templates, automated formatting, strict schema persistence, and user session governance with real-time usage meters.',
    architecture:
      'Next.js & React Frontend → Clerk Identity Gateway → Server Action / API Routes → Google Gemini API → Neon Serverless Database via Drizzle ORM schema validation.',
    challenges:
      'Ensuring consistent output structure from generative prompts across different templates; solved with rigorous system prompting, schema constraints, and fallback parsing.',
    githubUrl: 'https://github.com/ankitkgupta11-g/AI-Powered-Content-Generator-',
    liveUrl: 'https://content-generator-liard.vercel.app/',
    category: 'AI / Generative AI',
    badge: 'Full Stack SaaS',
    accentColor: '#38bdf8',
  },
  {
    id: 'codemate-ai',
    title: 'CodeMate AI',
    subtitle: 'Context-Aware Interactive AI Programming Companion',
    description:
      'Gamified, context-aware AI coding and technology learning companion designed to provide guided learning roadmaps, bite-sized chapters, and AI-assisted learning experiences.',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Google Gemini API',
      'Vercel',
    ],
    features: [
      'Curated step-by-step developer learning roadmaps across programming languages',
      'Bite-sized modular chapters with interactive concepts and code breakdowns',
      'Context-aware AI tutor answering queries specific to the current chapter',
      'Gamified progress tracking with milestone completions and visual badges',
      'Interactive code snippet sandbox with syntax highlighting and instant review',
      'Deployed on high-speed Vercel edge infrastructure for low-latency responses',
    ],
    problem:
      'Learning complex programming topics from lengthy documentation or passive video courses leads to quick drop-off and lack of immediate hands-on feedback.',
    solution:
      'Created an engaging companion that breaks technical curricula into interactive bite-sized chapters while providing an AI mentor grounded specifically in the active lesson context.',
    architecture:
      'React SPA on Vercel Edge → Client-Side Context Engine → Gemini API with lesson context injection → Real-time response streaming and local progress store.',
    challenges:
      'Preventing the AI tutor from hallucinating answers outside the active lesson scope; implemented strict prompt grounding with chapter objectives and constraint bounds.',
    githubUrl: 'https://github.com/ankitkgupta11-g/CodeMate-AI',
    liveUrl: 'https://code-mate-ai-two.vercel.app',
    category: 'Full Stack',
    badge: 'Live Production App',
    accentColor: '#818cf8',
  },
  {
    id: 'codepaw-ai',
    title: 'CodePaw AI',
    subtitle: 'Interactive AI Coding Companion & Gamified Learning Sandbox',
    description:
      'AI coding companion featuring an interactive code sandbox, AI mentorship powered by Google Gemini, and gamification mechanisms including XP, levels, streaks, and achievement badges.',
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Express',
      'Google Gemini API',
    ],
    features: [
      'Interactive browser-based code sandbox with instant evaluation',
      'Google Gemini API integration delivering contextual AI mentorship and error diagnosis',
      'Gamification engine tracking user XP, level progression, daily coding streaks, and badges',
      'Structured bite-sized coding lessons with automated unit test assertions',
      'Express.js backend proxying AI queries and managing state persistence',
      'Clean, developer-centric user interface with dark mode and responsive layout',
    ],
    problem:
      'Beginner coders often face steep learning curves without personalized, immediate feedback when debugging code or staying motivated across practice sessions.',
    solution:
      'Architected a full-stack learning companion uniting an interactive browser sandbox with adaptive AI hints and habit-forming gamification mechanics.',
    architecture:
      'React + Vite Frontend → Express.js API Gateway → Google Gemini API Context Grounding → Real-time Mentor Feedback & Sandbox Execution.',
    challenges:
      'Balancing open-ended AI code explanations with strict step-by-step curriculum constraints; resolved by crafting specialized system prompts and response validators.',
    githubUrl: 'https://github.com/ankitkgupta11-g/CodePaw-AI',
    liveUrl: 'https://code-paw-ai.vercel.app',
    category: 'AI / Generative AI',
    badge: 'Interactive AI Companion',
    accentColor: '#ec4899',
  },
  {
    id: 'hospital-management',
    title: 'Hospital Management System',
    subtitle: 'Structured Low-Level Healthcare Administration System in C',
    description:
      'A C-based hospital management system designed to manage patients, doctors, appointments, and billing using structured data and file handling.',
    technologies: [
      'C',
      'Structures',
      'File Handling',
      'Input Validation',
      'Algorithms',
    ],
    features: [
      'Structured patient records database with unique medical identifier indexing',
      'Doctor roster and department scheduling allocation',
      'Appointment booking and conflict-checking mechanisms',
      'Automated medical billing calculation with itemized charge sheets',
      'Strict input validation preventing buffer overflows and corrupted file writes',
      'Persistent flat-file binary serialization for record storage across system restarts',
    ],
    problem:
      'Understanding memory layout, data persistence, and error-handling without high-level runtime abstractions is fundamental to building reliable engineering systems.',
    solution:
      'Constructed a robust C application utilizing memory-efficient structs, file pointers, and modular procedural architecture to simulate enterprise hospital operations.',
    architecture:
      'Terminal CLI Interface → Input Sanitization Layer → In-Memory Struct Cache → File I/O Serialization Subsystem (Data Persistence).',
    challenges:
      'Managing dynamic record edits without data corruption in sequential files; implemented temporary staging buffers and atomic file replacement routines.',
    githubUrl: 'https://github.com/ankitkgupta11-g/Hospital-Management-System-C',
    category: 'Systems / C',
    badge: 'Core Systems',
    accentColor: '#34d399',
  },
];
