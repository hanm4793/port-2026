// =============================================================================
// Project & Proof Catalog — matches CONTENT-IA.md
// Rich case study structures covering technical decisions, solutions, and measurable outcomes.
// =============================================================================

import type { Project } from '@/types/content';

export const projects: Project[] = [
  // ── 1. Enterprise Analytics Platform (Web Dev) ───────────────────────────
  {
    slug: 'enterprise-analytics-platform',
    title: 'Enterprise Real-Time Analytics Platform',
    tagline: 'Sub-second telemetry processing and interactive data visualization.',
    summary:
      'A multi-tenant analytics console handling millions of daily event streams with live WebSocket feeds, complex filtering, and granular role permissions.',
    category: 'web',
    services: ['web-development'],
    zone: 'forum',
    techStack: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Redis', 'Apache ECharts', 'Tailwind CSS'],
    thumbnail: '/images/placeholder.webp',
    year: 2025,
    duration: '4 months',
    client: 'FinTech Logistics Corp',
    featured: true,
    caseStudy: {
      challenge:
        'The client’s legacy dashboard took 6+ seconds to load queries across 5M+ audit records, frequently locking UI threads on mobile browsers and generating thousands of support tickets during financial market opens.',
      approach:
        'Rather than merely styling the existing slow endpoints, I re-architected the consumption model from the ground up: introducing a Redis caching layer for warmed aggregates, server-sent streaming for live tick updates, and virtualized canvas tables on the frontend.',
      decisions: [
        {
          title: 'Server-Driven Pagination & Partitioning',
          reasoning:
            'Moved all aggregation compute to partitioned PostgreSQL tables, reducing frontend memory footprints by 82%.',
        },
        {
          title: 'Hybrid SSR + Client Data Hydration',
          reasoning:
            'Pre-rendered the dashboard shell statically to achieve immediate visual response, hydrating telemetry streams asynchronously.',
        },
      ],
      solution:
        'Engineered an enterprise console with sub-800ms initial load, keyboard-navigable time windows, dynamic CSV/PDF report generators, and zero-downtime blue/green deployments.',
      results: [
        { metric: 'Initial Page Load', value: '780ms', context: 'Down from 6.4s (88% reduction)' },
        { metric: 'Query Response', value: '45ms', context: 'Average Redis-backed response' },
        { metric: 'Client Support Tickets', value: '-74%', context: 'Within first 60 days of launch' },
      ],
      testimonial: {
        quote:
          'Han transformed our most fragile software asset into our core commercial differentiator. The speed and stability are night and day.',
        author: 'Marcus Vance',
        role: 'VP of Technology',
        company: 'FinTech Logistics Corp',
      },
      reflection:
        'Performance is not a cosmetic feature; it directly impacts user trust and operational throughput.',
    },
  },

  // ── 2. Enterprise CRM Engine (CRM & Systems) ─────────────────────────────
  {
    slug: 'enterprise-crm-engine',
    title: 'Bespoke Deal & Operations CRM',
    tagline: 'Custom workflow automation and pipeline intelligence for 60+ operators.',
    summary:
      'Replacing an uncooperative Salesforce deployment with a fast, bespoke operational hub tailored specifically to commercial lease contracts and commission trees.',
    category: 'crm',
    services: ['crm-systems', 'automation'],
    zone: 'forum',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'BullMQ Queue'],
    thumbnail: '/images/placeholder.webp',
    year: 2024,
    duration: '3 months',
    client: 'Aegis Real Estate Partners',
    featured: true,
    caseStudy: {
      challenge:
        'The brokerage was spending $4,500/month on generic CRM seats while brokers maintained shadow spreadsheets because the off-the-shelf software took 8 clicks to log a single client inspection.',
      approach:
        'I shadowed 5 brokers for 3 full days to map their actual cognitive journey. The interface was then modeled around a single-keystroke action pallet and automated deal pipeline transitions.',
      decisions: [
        {
          title: 'Custom Relational Schema over Generic EAV',
          reasoning:
            'Modeled exact commercial lease terms directly in PostgreSQL, eliminating the slow custom-field query overhead of generic CRMs.',
        },
        {
          title: 'Optimistic UI Updates with Offline Queueing',
          reasoning:
            'Allowed field agents to update deals in elevator basements without losing contract changes.',
        },
      ],
      solution:
        'A streamlined CRM delivering instantaneous fuzzy search, automated docu-sign packet compilation, multi-tier commission splits, and automated WhatsApp/Email reminders.',
      results: [
        { metric: 'Weekly Hours Saved', value: '28+ hrs', context: 'Per brokerage pod of 10 brokers' },
        { metric: 'Licensing Savings', value: '$38,000/yr', context: 'Replaced unused third-party seats' },
        { metric: 'Deal Velocity', value: '+19%', context: 'Faster contract execution cycle' },
      ],
      testimonial: {
        quote:
          'Our agents actually want to use this system. It feels as responsive as a desktop application and cut our contract turnaround in half.',
        author: 'Elena Rossi',
        role: 'Managing Partner',
        company: 'Aegis Partners',
      },
    },
  },

  // ── 3. Field Operations Mobile Suite (App Dev) ────────────────────────────
  {
    slug: 'field-operations-mobile-suite',
    title: 'Offline-First Field Inspection Suite',
    tagline: 'Reliable mobile auditing in low-connectivity remote environments.',
    summary:
      'A cross-platform React Native client for industrial safety inspectors, featuring offline document capture, automated photo geotagging, and conflict-free cloud sync.',
    category: 'app',
    services: ['app-development'],
    zone: 'forum',
    techStack: ['React Native', 'Expo', 'TypeScript', 'WatermelonDB', 'SQLite', 'AWS S3'],
    thumbnail: '/images/placeholder.webp',
    year: 2025,
    duration: '10 weeks',
    client: 'Apex Industrial Services',
    featured: false,
    caseStudy: {
      challenge:
        'Inspectors working inside subterranean concrete facilities frequently lost multi-page inspection audits when connectivity dropped midway through submission.',
      approach:
        'Engineered an offline-first mobile architecture utilizing local SQLite databases and an atomic sync ledger that queues operations locally and commits them with idempotent server transactions.',
      decisions: [
        {
          title: 'WatermelonDB Local Engine',
          reasoning:
            'Ensures lazy-loading of 10,000+ equipment asset records without bloating device RAM.',
        },
        {
          title: 'Client-Side Media Compression',
          reasoning:
            'Images compressed to WebP locally before upload, reducing upload payload sizes by 85%.',
        },
      ],
      solution:
        'A field app supporting biometric unlock, voice-to-text inspection notes, automated camera watermark stamping, and background delta synchronization.',
      results: [
        { metric: 'Data Loss Incidents', value: '0', context: 'Over 14,000 filed field audits' },
        { metric: 'Sync Time', value: '< 2.4s', context: 'When re-entering 4G connectivity zones' },
      ],
    },
  },

  // ── 4. Dinosaur Universe Chronicles (AI Filmmaking / Content) ────────────
  {
    slug: 'dinosaur-universe-chronicles',
    title: 'Chronicles of the Primeval Horizon',
    tagline: 'Original cinematic world-building via steered neural synthesis.',
    summary:
      'An ongoing speculative narrative series set in an alternate prehistoric Earth. Crafted using custom Blender 3D animatics, custom LoRA diffusion models, and cinematic audio mastering.',
    category: 'film',
    services: ['ai-content', 'music-sonic-identity'],
    zone: 'sanctuary',
    techStack: ['Blender 4', 'ComfyUI', 'Custom LoRAs', 'DaVinci Resolve', 'Logic Pro X'],
    thumbnail: '/images/placeholder.webp',
    year: 2024,
    duration: 'Ongoing Series',
    client: 'Original Intellectual Property',
    featured: true,
    caseStudy: {
      challenge:
        'Most AI-generated video projects suffer from jitter, morphing character features, chaotic lighting changes, and lack of intentional cinematic framing.',
      approach:
        'Established a disciplined hybrid production pipeline: 100% of camera motion, lighting angles, and actor silhouette blocking are modeled in Blender first. Generative diffusion is applied as a controlled texturing and atmospheric pass over rigid 3D geometries.',
      decisions: [
        {
          title: 'ControlNet Depth & OpenPose Strict Constraints',
          reasoning:
            'Locked anatomical scale across cuts, completely eliminating creature warping between reverse angles.',
        },
        {
          title: 'Original Orchestral Score & Foley',
          reasoning:
            'Composed bespoke musical themes to drive emotional gravitas rather than relying on generic stock music.',
        },
      ],
      solution:
        'A 4-episode pilot narrative series featuring distinct prehistoric creature families, environmental world-building, and consistent lighting continuity.',
      results: [
        { metric: 'Organic Viewership', value: '450K+', context: 'Across technical and creative communities' },
        { metric: 'Viewer Retention', value: '78%', context: 'Through full 3-minute episode duration' },
      ],
    },
  },

  // ── 5. Speculative Soundtracks Vol. 1 (Music & Sound) ────────────────────
  {
    slug: 'speculative-soundtracks-vol1',
    title: 'Architectures of Resonance (EP)',
    tagline: 'Hybrid orchestral and analog synthesizer musical scoring.',
    summary:
      'A 6-track conceptual album exploring the acoustics of ancient stone ruins colliding with futuristic electronic soundscapes. Featured in indie game demos and creative trailers.',
    category: 'music',
    services: ['music-sonic-identity'],
    zone: 'amphitheatre',
    techStack: ['Logic Pro X', 'Sequential Prophet-6', 'Moog Sub 37', 'Spitfire Symphonic Strings'],
    thumbnail: '/images/placeholder.webp',
    year: 2024,
    duration: '2 months',
    client: 'Independent Release',
    featured: false,
    caseStudy: {
      challenge:
        'Creating an acoustic signature that feels ancient and weathered yet technologically sophisticated without falling into clichéd sci-fi synth tropes.',
      approach:
        'Combined acoustic cellos and traditional Vietnamese bamboo flutes with heavy analog subtractive synthesis and convolution reverbs recorded inside subterranean water reservoirs.',
      decisions: [
        {
          title: 'Analog Signal Path Tracking',
          reasoning: 'Tracked live hardware synthesizers through tube preamps to introduce natural warmth.',
        },
      ],
      solution: 'A cohesive 24-minute sonic journey distributed across Spotify, Apple Music, and vinyl.',
      results: [
        { metric: 'Streams', value: '180K+', context: 'First 90 days across streaming platforms' },
        { metric: 'Media Placements', value: '4', context: 'Licensed for independent films and games' },
      ],
    },
  },

  // ── 6. Island of Memory Portfolio (Creative Technology) ───────────────────
  {
    slug: 'island-of-memory-portfolio',
    title: 'Island of Memory — Interactive 3D Portfolio',
    tagline: 'Production 3D web experience merging storytelling with systems engineering.',
    summary:
      'The website you are experiencing now: an archaeological-futurist spatial autobiography built with Next.js 16, React Three Fiber, GSAP, and Tailwind CSS.',
    category: 'creative',
    services: ['creative-technology', 'web-development'],
    zone: 'atelier',
    techStack: ['Next.js 16', 'React Three Fiber', 'Three.js', 'GSAP ScrollTrigger', 'Tailwind CSS 4'],
    thumbnail: '/images/placeholder.webp',
    year: 2026,
    duration: 'Ongoing',
    client: 'Self-Initiated',
    featured: true,
    caseStudy: {
      challenge:
        '3D portfolio sites are notorious for being unusable tech demos: heavy 50MB downloads, unreadable text, zero SEO indexing, and broken mobile layouts.',
      approach:
        'Architected a strict dual-layer model: 100% of semantic content, headings, and case-studies exist as crawlable, accessible HTML. The 3D canvas is an ambient GPU enhancement layer synchronized via GSAP scroll progress.',
      decisions: [
        {
          title: 'Proxy-First Asset Pipeline',
          reasoning: 'Engineered full system choreography and lighting before loading heavy 3D mesh assets.',
        },
        {
          title: 'Custom Beat-Driven Camera System',
          reasoning: 'Ensures DOM narrative text and camera framing match with frame-perfect precision.',
        },
      ],
      solution:
        'A 60fps navigable island world with 8 symbolic zones, complete SSG page coverage, and sub-2s initial load.',
      results: [
        { metric: 'Rendering Speed', value: '60fps', context: 'Consistent performance on mid-tier hardware' },
        { metric: 'SEO Indexing', value: '100%', context: 'All routes and case studies pre-rendered as HTML' },
      ],
    },
  },

  // ── Aliases for legacy hotspot links ─────────────────────────────────────
  {
    slug: 'placeholder-web-app',
    title: 'Enterprise Real-Time Analytics Platform',
    tagline: 'Sub-second telemetry processing and interactive data visualization.',
    summary:
      'A multi-tenant analytics console handling millions of daily event streams with live WebSocket feeds, complex filtering, and granular role permissions.',
    category: 'web',
    services: ['web-development'],
    zone: 'forum',
    techStack: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
    thumbnail: '/images/placeholder.webp',
    year: 2025,
    featured: false,
    caseStudy: {
      challenge:
        'The client’s legacy dashboard took 6+ seconds to load queries across 5M+ audit records, frequently locking UI threads on mobile browsers.',
      approach:
        'Re-architected the consumption model from the ground up: introducing a Redis caching layer for warmed aggregates and server-sent streaming for live tick updates.',
      decisions: [
        {
          title: 'Server-Driven Partitioning',
          reasoning: 'Moved computation to partitioned database tables, reducing frontend memory footprint by 82%.',
        },
      ],
      solution:
        'Delivered an enterprise console with sub-800ms initial load, keyboard-navigable time windows, and zero-downtime deployment.',
      results: [
        { metric: 'Initial Page Load', value: '780ms', context: 'Down from 6.4s (88% reduction)' },
        { metric: 'Query Latency', value: '45ms', context: 'Redis-backed aggregate queries' },
      ],
      testimonial: {
        quote: 'Han transformed our most fragile software asset into our core commercial differentiator.',
        author: 'Marcus Vance',
        role: 'VP of Technology',
        company: 'FinTech Logistics Corp',
      },
    },
  },
  {
    slug: 'placeholder-crm',
    title: 'Bespoke Deal & Operations CRM',
    tagline: 'Custom workflow automation and pipeline intelligence for 60+ operators.',
    summary:
      'Replacing an uncooperative Salesforce deployment with a fast, bespoke operational hub tailored specifically to commercial lease contracts.',
    category: 'crm',
    services: ['crm-systems', 'automation'],
    zone: 'forum',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma'],
    thumbnail: '/images/placeholder.webp',
    year: 2024,
    featured: false,
    caseStudy: {
      challenge:
        'The brokerage was spending thousands on generic CRM seats while brokers maintained shadow spreadsheets because software required 8 clicks to log a single client inspection.',
      approach:
        'Modeled the interface around single-keystroke action pallets, automated pipeline triggers, and instant relational search.',
      decisions: [
        {
          title: 'Custom Relational Schema',
          reasoning: 'Modeled exact commercial lease terms directly in PostgreSQL, eliminating custom-field query overhead.',
        },
      ],
      solution:
        'A streamlined CRM delivering instantaneous fuzzy search, automated docu-sign packet compilation, and multi-tier commission splits.',
      results: [
        { metric: 'Weekly Hours Saved', value: '28+ hrs', context: 'Per brokerage pod of 10 brokers' },
        { metric: 'Annual Savings', value: '$38,000/yr', context: 'Replaced unused third-party licenses' },
      ],
    },
  },
];
