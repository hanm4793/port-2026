// =============================================================================
// Service Catalog — matches CONTENT-IA.md and SITE_COPY
// Every service maps to concrete deliverables, process steps, tools, and proof projects.
// =============================================================================

import type { Service, ServiceGroupKey } from '@/types/content';

export const services: Service[] = [
  // ── BUILD CLUSTER ────────────────────────────────────────────────────────
  {
    slug: 'web-development',
    title: 'Full-Stack Web Development',
    shortTitle: 'Web Dev',
    tagline: 'High-performance web applications built with architectural discipline.',
    description:
      'I build bespoke web applications where performance, accessibility, and clean architecture are non-negotiable. From complex multi-tenant dashboards to content-rich storytelling sites, every codebase is typed, modular, and maintainable.',
    icon: 'code',
    zone: 'forum',
    group: 'build',
    deliverables: [
      'Production Next.js / React application with App Router',
      'Full TypeScript type safety across client and server boundaries',
      'High-performance database modeling (PostgreSQL / Redis / Prisma)',
      'Sub-second Lighthouse scores and SEO optimization',
      'Continuous deployment pipeline with automated testing',
    ],
    process: [
      {
        title: 'System Blueprint',
        description: 'Modeling data flow, API contracts, and domain entities before coding.',
        duration: '1 week',
      },
      {
        title: 'Core Engine Build',
        description: 'Iterative implementation of critical paths, authentication, and database schemas.',
        duration: '2-4 weeks',
      },
      {
        title: 'UI Polish & Performance',
        description: 'Tailwind styling, micro-interactions, responsive testing, and asset compression.',
        duration: '1-2 weeks',
      },
      {
        title: 'Production Hardening',
        description: 'Observability, error tracking, edge caching, and security audits.',
        duration: '1 week',
      },
    ],
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'Vercel', 'Docker'],
    relatedProjects: ['enterprise-analytics-platform', 'interactive-story-portal'],
    metricHighlight: 'Sub-800ms Time-to-Interactive on complex dashboards',
  },
  {
    slug: 'app-development',
    title: 'Native & Cross-Platform Mobile Apps',
    shortTitle: 'App Dev',
    tagline: 'Smooth, resilient mobile clients with offline-first reliability.',
    description:
      'Designing and developing mobile applications that feel native on iOS and Android. Focused on tactile feedback, instant touch response, and predictable offline data synchronization.',
    icon: 'smartphone',
    zone: 'forum',
    group: 'build',
    deliverables: [
      'React Native / Expo cross-platform codebase or Native iOS app',
      'Offline-first SQLite / WatermelonDB local data synchronization',
      'Secure biometrics, native push notifications, and background tasks',
      'End-to-end App Store & Google Play submission and signing setup',
    ],
    process: [
      {
        title: 'UX Mapping',
        description: 'Gesture flow, touch targets, and mobile state machines.',
        duration: '1-2 weeks',
      },
      {
        title: 'Client Architecture',
        description: 'State stores, local caching engines, and native bridge setup.',
        duration: '3-5 weeks',
      },
      {
        title: 'Device QA & Release',
        description: 'Testing across real screen aspect ratios, OS versions, and network constraints.',
        duration: '1-2 weeks',
      },
    ],
    tools: ['React Native', 'Expo', 'Swift', 'Kotlin', 'TypeScript', 'Zustand', 'SQLite'],
    relatedProjects: ['field-operations-mobile-suite'],
    metricHighlight: '60fps consistent UI rendering with zero frame drop during sync',
  },
  {
    slug: 'crm-systems',
    title: 'Custom CRM & Operations Systems',
    shortTitle: 'CRM & Systems',
    tagline: 'Operational backbones tailored to your exact business logic.',
    description:
      'Off-the-shelf software forces businesses to change their workflows. I build custom management systems, ERP modules, and CRM platforms that mirror your actual organizational processes with zero friction.',
    icon: 'database',
    zone: 'forum',
    group: 'build',
    deliverables: [
      'Tailored role-based access control (RBAC) and team hierarchy logic',
      'Custom customer pipeline, deals, and inventory management schemas',
      'Automated PDF invoice generation, audit logs, and export pipelines',
      'Real-time team collaboration via WebSocket subscriptions',
    ],
    process: [
      {
        title: 'Workflow Discovery',
        description: 'Deconstructing real operational spreadsheets and team bottlenecks.',
        duration: '1 week',
      },
      {
        title: 'Domain Modeling',
        description: 'Building relational schemas that reflect business transactions.',
        duration: '2-3 weeks',
      },
      {
        title: 'Portal Construction',
        description: 'Dense, keyboard-navigable management dashboards and reports.',
        duration: '3-4 weeks',
      },
    ],
    tools: ['Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'TypeScript', 'REST / tRPC'],
    relatedProjects: ['enterprise-crm-engine'],
    metricHighlight: 'Saved 28+ operational hours per week for 45-person client team',
  },

  // ── GROW CLUSTER ─────────────────────────────────────────────────────────
  {
    slug: 'automation',
    title: 'Workflow & Data Automation',
    shortTitle: 'Automation',
    tagline: 'Eliminating repetitive human tasks through intelligent software bridges.',
    description:
      'Connecting isolated software tools into autonomous workflows. I design resilient data pipelines, scheduled synchronizations, and event-driven automations that prevent errors and eliminate hours of manual entry.',
    icon: 'zap',
    zone: 'agora',
    group: 'grow',
    deliverables: [
      'Custom event-driven webhook relays and queue architectures',
      'Third-party API connectors (HubSpot, Stripe, Slack, Notion, Airtable)',
      'Fault-tolerant retry mechanisms and dead-letter queue monitoring',
      'Automated reporting bots sending weekly executive digests',
    ],
    process: [
      {
        title: 'Friction Audit',
        description: 'Identifying high-volume repetitive tasks and data handoffs.',
        duration: '1 week',
      },
      {
        title: 'Integration Engine',
        description: 'Developing serverless micro-services and webhook consumers.',
        duration: '2 weeks',
      },
      {
        title: 'Stress Test & Observability',
        description: 'Simulating payload spikes and edge-case payload validation.',
        duration: '1 week',
      },
    ],
    tools: ['Node.js', 'Python', 'Redis BullMQ', 'AWS Lambda', 'Webhooks', 'REST APIs'],
    relatedProjects: ['omnichannel-sync-pipeline'],
    metricHighlight: 'Over 120,000 automated monthly transactions with 99.98% reliability',
  },
  {
    slug: 'digital-campaigns',
    title: 'Digital Campaign & Ads Infrastructure',
    shortTitle: 'Campaigns & Ads',
    tagline: 'Technical marketing engines that turn paid traffic into verifiable pipeline.',
    description:
      'Marketing strategy is only as good as the underlying conversion plumbing. I build high-velocity landing page ecosystems, tracking attribution servers, and dynamic content personalisation systems.',
    icon: 'megaphone',
    zone: 'agora',
    group: 'grow',
    deliverables: [
      'Ultra-fast landing pages with dynamic query-parameter personalisation',
      'Server-Side Conversion API tracking (Meta CAPI, Google Ads, GA4)',
      'Statistically rigorous A/B variant testing harness',
      'Automated lead qualification and CRM ingestion in real time',
    ],
    process: [
      {
        title: 'Attribution Blueprint',
        description: 'Fixing tracking gaps and mapping user conversion journeys.',
        duration: '1 week',
      },
      {
        title: 'Conversion Surface Build',
        description: 'Developing landing experiences optimized for mobile dwell and intent.',
        duration: '1-2 weeks',
      },
    ],
    tools: ['Next.js', 'Server-Side GTM', 'Meta CAPI', 'Tailwind CSS', 'Vercel Edge Middleware'],
    relatedProjects: ['growth-campaign-infrastructure'],
    metricHighlight: '+34% verified conversion rate improvement over standard agency landers',
  },

  // ── CREATE CLUSTER ───────────────────────────────────────────────────────
  {
    slug: 'ai-content',
    title: 'AI 3D Animation & Cinematic Filmmaking',
    shortTitle: 'AI Filmmaking',
    tagline: 'Directing original animated worlds through steered generative AI.',
    description:
      'Moving past low-effort AI slop. I direct original fictional universes—most notably an ongoing dinosaur cinematic world—using a hybrid pipeline of 3D Blender camera blocking, custom-tuned diffusion models, and cinematic compositing.',
    icon: 'film',
    zone: 'sanctuary',
    group: 'create',
    deliverables: [
      'Full narrative cinematic shorts with consistent character/creature identity',
      'Original 3D pre-visualization and camera choreography in Blender',
      'Multi-pass AI neural generation with depth, normal, and motion guidance',
      'Professional color grading and sound design mixing in DaVinci Resolve',
    ],
    process: [
      {
        title: 'Script & World Bible',
        description: 'Writing lore, creature designs, and emotional pacing curves.',
        duration: '1-2 weeks',
      },
      {
        title: '3D Pre-Vis & Blocking',
        description: 'Building low-poly sets, camera tracks, and lighting in Blender.',
        duration: '2-3 weeks',
      },
      {
        title: 'Diffusion Synthesis',
        description: 'Steered latent rendering with ControlNet and temporal consistency.',
        duration: '2-3 weeks',
      },
      {
        title: 'Finishing & Audio Master',
        description: 'Sound foley, music score synchronization, and 4K mastering.',
        duration: '1-2 weeks',
      },
    ],
    tools: ['Blender 4', 'ComfyUI', 'DaVinci Resolve', 'Custom LoRAs', 'ControlNet', 'After Effects'],
    relatedProjects: ['dinosaur-universe-chronicles'],
    metricHighlight: 'Over 450,000 views across speculative media releases with 94% positive reception',
  },
  {
    slug: 'music-sonic-identity',
    title: 'Music Scoring & Sonic Branding',
    shortTitle: 'Music & Sound',
    tagline: 'Original musical compositions that anchor visual products in deep emotion.',
    description:
      'Sonic identity gives visual design its emotional weight. As an active vocalist, producer, and multi-instrumentalist, I compose tailored soundscapes, title themes, and acoustic assets for brands, films, and digital installations.',
    icon: 'music',
    zone: 'amphitheatre',
    group: 'create',
    deliverables: [
      'Original full-length musical compositions and commercial scores',
      'Bespoke brand sonic logos, UI feedback sounds, and audio identifiers',
      'Full orchestral and electronic hybrid arrangements with live vocal tracks',
      'Broadcast-ready master files in lossless multi-stem formats',
    ],
    process: [
      {
        title: 'Emotional Palette',
        description: 'Harmonic discovery, tempo anchoring, and instrumentation mapping.',
        duration: '1 week',
      },
      {
        title: 'Thematic Scoring',
        description: 'Composing core motifs, melodic hooks, and dynamic variations.',
        duration: '2-3 weeks',
      },
      {
        title: 'Production & Master',
        description: 'Vocal tracking, audio synthesis, analog modeling, and final mastering.',
        duration: '1-2 weeks',
      },
    ],
    tools: ['Logic Pro X', 'Ableton Live', 'FabFilter', 'Kontakt', 'Spitfire Audio', 'Neural DSP'],
    relatedProjects: ['speculative-soundtracks-vol1'],
    metricHighlight: '3 original EP releases with international streaming distribution',
  },
  {
    slug: 'creative-technology',
    title: 'Interactive 3D Web & Spatial Experiences',
    shortTitle: 'Creative Tech',
    tagline: 'Bridging GPU rendering with storytelling for memorable digital encounters.',
    description:
      'The web does not have to be a flat document. I craft realtime 3D portfolios, digital pavilions, and interactive storytelling engines powered by WebGL, Three.js, and GLSL shaders—without sacrificing web performance.',
    icon: 'sparkles',
    zone: 'atelier',
    group: 'create',
    deliverables: [
      'Custom React Three Fiber (R3F) interactive web architecture',
      'Custom vertex and fragment GLSL shaders for bespoke lighting & water',
      'Draco-compressed asset loading pipelines targeting 60fps on mobile',
      'Scroll-choreographed narrative cameras with fallback modes',
    ],
    process: [
      {
        title: 'Spatial Concept',
        description: 'Moodboards, architectural silhouettes, and interaction loops.',
        duration: '1-2 weeks',
      },
      {
        title: 'Shader & Mesh Engine',
        description: 'Procedural geometry, material tuning, and camera rail math.',
        duration: '3-4 weeks',
      },
      {
        title: 'Cross-Device Optimization',
        description: 'Draw call reduction, GPU profiling, and accessible DOM mirroring.',
        duration: '1-2 weeks',
      },
    ],
    tools: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'GSAP ScrollTrigger', 'Blender', 'TypeScript'],
    relatedProjects: ['island-of-memory-portfolio'],
    metricHighlight: 'Sustained 60fps WebGL rendering alongside complete SEO-indexed HTML',
  },
];

export const SERVICE_GROUPS: Record<
  ServiceGroupKey,
  { label: string; headline: string; description: string; slugs: string[] }
> = {
  build: {
    label: 'Build',
    headline: 'Engineering & Systems',
    description: 'Resilient web apps, native mobile software, and custom CRM platforms.',
    slugs: ['web-development', 'app-development', 'crm-systems'],
  },
  grow: {
    label: 'Grow',
    headline: 'Operations & Reach',
    description: 'Automated workflow pipelines and high-attribution marketing infrastructure.',
    slugs: ['automation', 'digital-campaigns'],
  },
  create: {
    label: 'Create',
    headline: 'Narrative & Media',
    description: 'Steered AI filmmaking, original music scores, and interactive 3D web spaces.',
    slugs: ['ai-content', 'music-sonic-identity', 'creative-technology'],
  },
};
