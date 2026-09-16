import { SkillCategory } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'AI & Machine Learning',
    description: 'Neural networks, generative models, and intelligent workflows',
    skills: [
      {
        name: 'Machine Learning',
        category: 'AI / ML',
        practicalUsage: 'Supervised & unsupervised model architectures, classification, regression, and cross-validation pipelines.',
        highlight: true,
      },
      {
        name: 'Deep Learning',
        category: 'AI / ML',
        practicalUsage: 'Multi-layer perceptrons, CNNs, model fine-tuning, loss optimization, and feature representation.',
        highlight: true,
      },
      {
        name: 'TensorFlow',
        category: 'AI / ML',
        practicalUsage: 'Building computational graphs, training neural networks, tensor manipulations, and model evaluation.',
        highlight: true,
      },
      {
        name: 'Keras',
        category: 'AI / ML',
        practicalUsage: 'Rapid prototyping of sequential & functional deep learning models with custom layers and callbacks.',
      },
      {
        name: 'Generative AI',
        category: 'AI / ML',
        practicalUsage: 'Prompt orchestration, LLM application architecture, multimodal pipelines, and context augmentation.',
        highlight: true,
      },
      {
        name: 'Prompt Engineering',
        category: 'AI / ML',
        practicalUsage: 'Structured few-shot prompting, JSON output enforcement, guardrails, and role-based instruction sets.',
      },
      {
        name: 'Google Gemini API',
        category: 'AI / ML',
        practicalUsage: 'Integration of Gemini models for multimodal reasoning, text generation, image workflows, and function calling.',
        highlight: true,
      },
    ],
  },
  {
    title: 'Programming Languages',
    description: 'Core languages for system logic, algorithms, and applications',
    skills: [
      {
        name: 'Python',
        category: 'Programming',
        practicalUsage: 'Primary language for ML modeling, data preprocessing, numerical computing, and AI scripting.',
        highlight: true,
      },
      {
        name: 'TypeScript',
        category: 'Programming',
        practicalUsage: 'Type-safe frontend and backend application engineering, interface modeling, and maintainable architectures.',
        highlight: true,
      },
      {
        name: 'JavaScript (ES6+)',
        category: 'Programming',
        practicalUsage: 'Asynchronous event loops, DOM APIs, modern client scripting, and Node.js runtimes.',
      },
      {
        name: 'C',
        category: 'Programming',
        practicalUsage: 'Memory management, pointers, custom data structures, file I/O, and low-level algorithmic problem solving.',
      },
    ],
  },
  {
    title: 'Frontend Engineering',
    description: 'Modern, high-performance web user interfaces & interactions',
    skills: [
      {
        name: 'React',
        category: 'Frontend',
        practicalUsage: 'Component lifecycle, custom hooks, state synchronization, virtual DOM optimization, and interactive UIs.',
        highlight: true,
      },
      {
        name: 'Next.js',
        category: 'Frontend',
        practicalUsage: 'Server-side rendering, App Router architecture, Server Actions, API route handlers, and SEO optimization.',
        highlight: true,
      },
      {
        name: 'Tailwind CSS',
        category: 'Frontend',
        practicalUsage: 'Utility-first modern styling, responsive layouts, dark theme systems, and custom design tokens.',
      },
      {
        name: 'HTML5 & Modern CSS',
        category: 'Frontend',
        practicalUsage: 'Semantic markup, accessibility (a11y), flexbox, grid, fluid typography, and CSS variables.',
      },
    ],
  },
  {
    title: 'Backend & Databases',
    description: 'Scalable server architectures, APIs, and persistent storage',
    skills: [
      {
        name: 'Node.js',
        category: 'Backend',
        practicalUsage: 'RESTful microservices, asynchronous request pipelines, middleware integration, and runtime script execution.',
        highlight: true,
      },
      {
        name: 'REST APIs',
        category: 'Backend',
        practicalUsage: 'Designing clean HTTP contracts, status codes, payload validation, and client-server decoupling.',
      },
      {
        name: 'PostgreSQL',
        category: 'Database',
        practicalUsage: 'Relational data modeling, foreign keys, indexes, ACID compliance, and query performance.',
        highlight: true,
      },
      {
        name: 'Neon',
        category: 'Database',
        practicalUsage: 'Serverless cloud Postgres provisioning, branching, and automated connection pooling.',
      },
      {
        name: 'Drizzle ORM',
        category: 'Database',
        practicalUsage: 'TypeScript-native SQL schema definitions, migrations, relational queries, and zero-overhead performance.',
      },
    ],
  },
  {
    title: 'Developer Tools & Workflow',
    description: 'Version control, deployment pipelines, and developer environments',
    skills: [
      {
        name: 'Git',
        category: 'Tools',
        practicalUsage: 'Branching strategies, commit hygiene, merge resolution, and distributed version control.',
      },
      {
        name: 'GitHub',
        category: 'Tools',
        practicalUsage: 'Open-source collaboration, pull request workflows, repository management, and project tracking.',
      },
      {
        name: 'Vercel',
        category: 'Tools',
        practicalUsage: 'Continuous deployment, preview environments, edge network caching, and production domain routing.',
      },
      {
        name: 'VS Code',
        category: 'Tools',
        practicalUsage: 'Configuring debugging profiles, linting configurations, extensions, and rapid development workflows.',
      },
    ],
  },
];
