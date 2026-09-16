import { ArchitectureNode } from '../types';

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'node-client',
    label: 'Client Interface',
    type: 'client',
    tech: 'React 19 + TypeScript + Tailwind',
    role: 'Presentation & Interaction Layer',
    description:
      'Responsive user interface managing client state, optimistic UI updates, streaming response renders, and interactive visual feedback with zero layout shift.',
    inputs: ['User Interaction', 'Touch / Mouse Events'],
    outputs: ['Signed API Requests', 'Session Tokens'],
  },
  {
    id: 'node-gateway',
    label: 'API & Routing Layer',
    type: 'gateway',
    tech: 'Next.js / Express Middleware',
    role: 'Traffic Orchestration & Validation',
    description:
      'Handles rate limiting, request validation, CORS security, token verification, and routing requests to internal workers or external AI endpoints.',
    inputs: ['Client HTTP / Fetch Requests'],
    outputs: ['Sanitized Payloads', 'Auth Verification Queries'],
  },
  {
    id: 'node-auth',
    label: 'Authentication Gateway',
    type: 'auth',
    tech: 'Clerk / JWT / Session Store',
    role: 'Identity Verification & Quotas',
    description:
      'Manages secure OAuth sessions, user identity credentials, role-based access tokens, and real-time generation quota entitlements.',
    inputs: ['Session Tokens', 'Login Credentials'],
    outputs: ['Verified User ID', 'Tier Permissions'],
  },
  {
    id: 'node-ai',
    label: 'AI & Generative Engine',
    type: 'ai',
    tech: 'Google Gemini API / Multi-modal Models',
    role: 'Inference & Synthesis Pipeline',
    description:
      'Processes natural language prompts, applies domain-specific few-shot context, executes prompt enhancement algorithms, and streams structured outputs.',
    inputs: ['Enhanced Prompts', 'Context Encodings'],
    outputs: ['Generated Content', 'Synthesized Media Meta'],
  },
  {
    id: 'node-worker',
    label: 'Processing & Formatting',
    type: 'worker',
    tech: 'Node.js Async Pipeline',
    role: 'Data Sanitization & Transformation',
    description:
      'Validates AI inference responses against TypeScript/Zod schemas, structures markdown payloads, handles image transformations, and calculates token counts.',
    inputs: ['Raw AI Model Streams'],
    outputs: ['Clean Structured DTOs', 'Usage Metrics'],
  },
  {
    id: 'node-db',
    label: 'Serverless Relational DB',
    type: 'db',
    tech: 'Neon PostgreSQL + Drizzle ORM',
    role: 'Persistent Storage & Relational Index',
    description:
      'Stores user profiles, generated history, prompt templates, analytics, and social interaction states with type-safe schema integrity and connection pooling.',
    inputs: ['Structured Record Payloads'],
    outputs: ['Query Results', 'Saved User Collections'],
  },
  {
    id: 'node-deploy',
    label: 'Edge & Cloud Deployment',
    type: 'deploy',
    tech: 'Vercel Edge Network / Serverless Runtime',
    role: 'Global CDN, Edge Caching & SSL',
    description:
      'Distributes client assets across global edge nodes with automatic SSL, instant cache invalidation, serverless function cold-start mitigation, and real-time observability.',
    inputs: ['Git Push Trigger', 'Client Network Requests'],
    outputs: ['Low-Latency Edge Delivery', 'Live Telemetry & Logs'],
  },
];
