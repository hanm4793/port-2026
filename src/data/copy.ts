// =============================================================================
// Foundation Copywriting — Island of Memory
// Tone: Premium, artistic, technical, direct.
// One unified creator spanning systems, story, and sound.
// =============================================================================

export const SITE_COPY = {
  // ── 1. Hero Identity ──────────────────────────────────────────────────────
  hero: {
    name: 'Han',
    role: 'Creative Technologist & Systems Architect',
    tagline: 'Bridging engineering rigor with cinematic world-building.',
    subhead:
      'I engineer production-grade digital systems and direct original AI-driven media. From enterprise CRM pipelines to dinosaur universe films and musical scoring, every work is built with craft, precision, and narrative weight.',
    primaryCta: 'Start a Project',
    secondaryCta: 'Explore Work',
  },

  // ── 2. Systems / Engineering Section ─────────────────────────────────────
  systems: {
    eyebrow: '01 / Engineering Foundation',
    title: 'Digital Systems That Endure',
    statement:
      'A great digital product is an engine before it is an interface. I architect full-stack applications, custom CRMs, and resilient automation pipelines that solve operational friction without technical debt.',
    principles: [
      {
        title: 'Architectural Coherence',
        desc: 'Clear boundaries between domain logic, persistence, and presentation. Built to scale without rewrites.',
      },
      {
        title: 'Obsessive Performance',
        desc: 'Sub-second initial loads, zero wasted re-renders, and lean data transfers across all target networks.',
      },
      {
        title: 'Operational Impact',
        desc: 'Software measured by client revenue, workflow hours saved, and uptime reliability—not lines of code.',
      },
    ],
  },

  // ── 3. AI World-Building & Film Section ──────────────────────────────────
  aiWorld: {
    eyebrow: '02 / Generative Filmmaking',
    title: 'Original Worlds, Not Algorithmic Slop',
    statement:
      'AI is a lens, not a creator. In my original dinosaur universe and speculative film projects, neural generation is steered through traditional cinematography, lighting theory, and narrative cadence.',
    highlight:
      'Directed multi-scene short cinematic episodes blending Blender 3D blockouts, custom latent diffusion models, and frame-by-frame compositing.',
  },

  // ── 4. Music & Performance Section ───────────────────────────────────────
  music: {
    eyebrow: '03 / Sonic Identity',
    title: 'Sound as Spatial Emotion',
    statement:
      'Music is the invisible architecture of memory. As a composer, vocalist, and stage performer, I craft sonic identities that anchor experiences in feeling—combining orchestral motifs, modern synth design, and acoustic warmth.',
    capabilities: [
      'Original cinematic scoring',
      'Brand sonic identity & audio logos',
      'AI-assisted musical composition & arrangement',
      'Studio vocal recording & audio mastering',
    ],
  },

  // ── 5. Travel & Photography Section ──────────────────────────────────────
  travel: {
    eyebrow: '04 / Cultural Archive',
    title: 'Perspective Shaped by the World',
    statement:
      'True creative range comes from living outside the screen. Over years of solitary travel, coastal exploration, and documentary photography, I collect light, architectural patterns, and human stories that directly inform my design language.',
  },

  // ── 6. Service Summaries ─────────────────────────────────────────────────
  servicesOverview: {
    eyebrow: 'Core Offerings',
    title: 'How We Can Work Together',
    subtitle:
      'Direct collaboration with no agency bloat. Three structured delivery clusters designed to build, scale, and express.',
    clusters: {
      build: {
        title: 'Build',
        subtitle: 'I engineer robust digital foundations',
        description: 'Web applications, native mobile apps, and custom operational platforms.',
      },
      grow: {
        title: 'Grow',
        subtitle: 'I scale operations & reach',
        description: 'Automated data pipelines, conversion infrastructure, and technical marketing systems.',
      },
      create: {
        title: 'Create',
        subtitle: 'I craft immersive creative assets',
        description: 'AI 3D animated films, original music scoring, and interactive 3D web spaces.',
      },
    },
  },

  // ── 7. Contact Invitation ────────────────────────────────────────────────
  contact: {
    eyebrow: 'The Beacon',
    title: 'Ready to build something meaningful?',
    subhead:
      'Whether you are launching a complex software product, commissioning an interactive experience, or seeking original creative direction, I take on a limited number of high-impact engagements each quarter.',
    directEmailLabel: 'Prefer direct communication?',
    email: 'contact@hanm.dev',
    responseTime: 'Responses within 24 business hours.',
    location: 'Available globally for remote engagements & technical advisory.',
  },

  // ── 8. CTA Microcopy ─────────────────────────────────────────────────────
  cta: {
    startProject: 'Start a Project',
    viewCaseStudy: 'Read Case Study',
    discussProject: 'Discuss Similar Challenge',
    sendBrief: 'Transmit Brief',
    backToOverview: 'Return to Overview',
    viewLive: 'Launch Live System',
    exploreWorld: 'Explore Free Mode',
    nextChapter: 'Continue Journey',
  },

  // ── 9. Brief-Builder Microcopy ───────────────────────────────────────────
  briefBuilder: {
    step1: {
      stepLabel: '01 / Identify',
      title: 'About You & Your Organization',
      description: 'Who will I be collaborating with?',
      nameLabel: 'Your Full Name *',
      namePlaceholder: 'e.g. Alex Vance',
      emailLabel: 'Direct Email Address *',
      emailPlaceholder: 'alex@company.com',
      companyLabel: 'Company or Organization (Optional)',
      companyPlaceholder: 'e.g. Studio Vertex',
      sourceLabel: 'How did you discover this portfolio?',
      sourceOptions: [
        { value: 'referral', label: 'Colleague / Professional Referral' },
        { value: 'linkedin', label: 'LinkedIn or Professional Network' },
        { value: 'x_twitter', label: 'X / Twitter / Technical Community' },
        { value: 'search', label: 'Organic Search / Technical Article' },
        { value: 'other', label: 'Other Avenue' },
      ],
    },
    step2: {
      stepLabel: '02 / Scope',
      title: 'Project Requirements & Ambition',
      description: 'Select all service domains that touch this engagement.',
      servicesLabel: 'Required Disciplines (Select all that apply)',
      detailsLabel: 'Project Overview & Critical Deliverables *',
      detailsPlaceholder:
        'Tell me about the problem, current state, key milestones, and what success looks like...',
      detailsHelper: 'Minimum 20 characters. Be as specific as you can.',
    },
    step3: {
      stepLabel: '03 / Parameters',
      title: 'Timeline & Resource Scope',
      description: 'Helps ensure alignment on velocity and commitment.',
      timelineLabel: 'Desired Delivery Timeline',
      timelineOptions: [
        { value: 'urgent', label: 'Immediate / Next 2-4 Weeks' },
        { value: '1-3months', label: '1 to 3 Months (Standard)' },
        { value: 'quarterly', label: '3 to 6 Months (Multi-phase)' },
        { value: 'exploring', label: 'Discovery / Flexible Scope' },
      ],
      budgetLabel: 'Estimated Budget Scope (USD)',
      budgetOptions: [
        { value: 'under5k', label: 'Sub $5,000 (Targeted sprint or prototype)' },
        { value: '5k-15k', label: '$5,000 — $15,000 (Full standalone project)' },
        { value: '15k-40k', label: '$15,000 — $40,000 (Multi-discipline system)' },
        { value: '40k_plus', label: '$40,000+ (Enterprise platform or series)' },
        { value: 'undisclosed', label: 'Prefer to discuss after discovery' },
      ],
      languageLabel: 'Working Language Preference',
      languageOptions: [
        { value: 'en', label: 'English (Default)' },
        { value: 'vi', label: 'Tiếng Việt' },
      ],
    },
    actions: {
      next: 'Continue',
      back: 'Previous',
      submit: 'Send Project Brief',
      submitting: 'Transmitting Brief...',
      successTitle: 'Project Brief Transmitted',
      successMessage:
        'Thank you. Your parameters have been received. I review every submission personally and will reply with initial scoping within 24 hours.',
      errorMessage: 'Transmission encountered an error. Please verify your details or email directly.',
    },
  },
} as const;
