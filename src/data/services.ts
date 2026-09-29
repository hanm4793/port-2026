// =============================================================================
// Service data — matches CONTENT-IA.md §3 taxonomy
// =============================================================================

import type { Service } from '@/types/content';

export const services: Service[] = [
  // ── BUILD cluster ──────────────────────────────────────────────────────
  {
    slug: 'web-development',
    title: 'Web Development',
    description: 'Full-stack web applications built for performance, scalability, and user experience. From marketing sites to complex SaaS platforms.',
    icon: 'code',
    features: [
      'Next.js / React applications',
      'TypeScript-first architecture',
      'API design and integration',
      'Performance optimization',
      'Responsive and accessible UI',
    ],
  },
  {
    slug: 'app-development',
    title: 'App Development',
    description: 'Cross-platform and native mobile applications. Clean architecture, real-time features, and polished user experience.',
    icon: 'smartphone',
    features: [
      'React Native / cross-platform',
      'Native iOS and Android',
      'Offline-first design',
      'Push notifications and real-time sync',
    ],
  },
  {
    slug: 'crm-systems',
    title: 'CRM & Systems',
    description: 'Custom CRM platforms and enterprise systems designed for your specific workflows. Not another Salesforce config — built from your actual process.',
    icon: 'database',
    features: [
      'Custom CRM development',
      'Database architecture',
      'Role-based access control',
      'Reporting and dashboards',
      'Third-party integrations',
    ],
  },

  // ── GROW cluster ───────────────────────────────────────────────────────
  {
    slug: 'automation',
    title: 'Automation',
    description: 'Workflow automation, system integrations, and operational efficiency. Eliminate repetitive tasks and connect your tools.',
    icon: 'zap',
    features: [
      'Workflow automation',
      'API integrations',
      'Data pipelines',
      'Bot development',
      'Process optimization',
    ],
  },
  {
    slug: 'digital-campaigns',
    title: 'Digital Campaign & Ads',
    description: 'Campaign landing pages, ad creative, and performance-driven digital marketing support. Technical execution backing marketing strategy.',
    icon: 'megaphone',
    features: [
      'Campaign landing pages',
      'A/B testing infrastructure',
      'Analytics and tracking setup',
      'Ad creative production',
      'Conversion optimization',
    ],
  },

  // ── CREATE cluster ─────────────────────────────────────────────────────
  {
    slug: 'ai-content',
    title: 'AI Content Production',
    description: 'AI-assisted 3D films, generated content pipelines, and experimental media production. Original storytelling powered by emerging AI tools.',
    icon: 'sparkles',
    features: [
      'AI 3D animation and film',
      'Generative content pipelines',
      'World-building and narrative design',
      'AI image and video production',
      'Post-production and compositing',
    ],
  },
  {
    slug: 'music-sonic-identity',
    title: 'Music & Sonic Identity',
    description: 'Original music production, brand sonic identity, and audio content. From AI-assisted composition to full production and mastering.',
    icon: 'music',
    features: [
      'Original music composition',
      'Brand sonic identity',
      'AI-assisted music production',
      'Mixing and mastering',
      'Audio branding assets',
    ],
  },
  {
    slug: 'creative-technology',
    title: 'Creative Technology',
    description: 'Interactive 3D experiences, immersive web, and creative technology consulting. Where code meets art — this portfolio is an example.',
    icon: 'palette',
    features: [
      'Interactive 3D web experiences',
      'WebGL / Three.js development',
      'Immersive storytelling',
      'Creative prototyping',
      'Technology art direction',
    ],
  },
];

/** Service groupings for display */
export const SERVICE_GROUPS = [
  {
    label: 'Build',
    description: 'I build digital systems',
    slugs: ['web-development', 'app-development', 'crm-systems'],
  },
  {
    label: 'Grow',
    description: 'I grow digital presence',
    slugs: ['automation', 'digital-campaigns'],
  },
  {
    label: 'Create',
    description: 'I create original content',
    slugs: ['ai-content', 'music-sonic-identity', 'creative-technology'],
  },
] as const;
