# Content Information Architecture

**Project:** port-2026 / Island of Memory
**Date:** 2026-09-26
**Status:** Locked IA — content creation follows this structure
**Related:** DESIGN.md, WORLD-MAP.md, ARCHITECTURE.md

---

## 1. Site-Level Information Architecture

```
Island of Memory (portfolio)
│
├── HOME (/)
│   ├── 3D Experience (Story Mode default)
│   │   └── 8 zones with embedded content triggers
│   ├── Semantic HTML layer (always rendered, indexable)
│   │   ├── Hero: name, tagline, value proposition
│   │   ├── Services overview (compact)
│   │   ├── Featured projects (3-4 cards)
│   │   └── CTA: contact
│   └── Navigation menu (persistent)
│
├── SERVICES (/services)
│   ├── Service index (all 8 services)
│   └── Individual service (/services/[slug])
│       ├── What it is
│       ├── What I deliver
│       ├── How I work
│       ├── Related projects
│       └── CTA: start a project
│
├── PROJECTS (/projects)
│   ├── Project index (filterable by category)
│   └── Individual project (/projects/[slug])
│       ├── Case study (structured)
│       └── CTA: discuss similar project
│
├── ABOUT (/about)
│   ├── Who I am
│   ├── How I work
│   ├── Skills and tools
│   ├── Creative disciplines
│   └── CTA: work together
│
├── CONTACT (/contact)
│   ├── Contact form (brief-builder)
│   ├── Direct channels (email, social)
│   └── Booking link (optional)
│
└── LEGAL (footer links)
    ├── Privacy (/privacy)
    └── Imprint (/imprint)
```

### IA Principles

1. **Flat hierarchy** — max 2 levels deep. No `/services/web-development/projects/project-name`.
2. **Every page is a landing page** — each route has enough context to stand alone (for SEO,
   social shares, direct links). No page assumes the visitor saw the 3D experience.
3. **3D is overlay, not replacement** — all content reachable via traditional navigation.
4. **Conversion proximity** — every page is max 1 click from a CTA.

---

## 2. Route Map

| Route | Type | SEO | Description |
|-------|------|-----|-------------|
| `/` | SSG | Yes | Landing page — semantic HTML + 3D experience |
| `/services` | SSG | Yes | Service index — all 8 services |
| `/services/[slug]` | SSG | Yes | Individual service page |
| `/projects` | SSG | Yes | Project index — filterable gallery |
| `/projects/[slug]` | SSG | Yes | Individual project / case study |
| `/about` | SSG | Yes | Personal introduction + skills |
| `/contact` | SSG | Yes | Brief-builder contact form |
| `/privacy` | SSG | Yes | Privacy policy |
| `/imprint` | SSG | Yes | Legal imprint |
| `/api/contact` | API | No | Contact form submission handler |

### Route Group Structure (Next.js App Router)

```
src/app/
├── layout.tsx                    # Root layout
├── page.tsx                      # Home (/ )
├── (marketing)/                  # Route group: SEO content pages
│   ├── layout.tsx                # Shared marketing layout (nav + footer)
│   ├── services/
│   │   ├── page.tsx              # /services
│   │   └── [slug]/
│   │       └── page.tsx          # /services/web-development
│   ├── projects/
│   │   ├── page.tsx              # /projects
│   │   └── [slug]/
│   │       └── page.tsx          # /projects/enterprise-dashboard
│   ├── about/
│   │   └── page.tsx              # /about
│   ├── contact/
│   │   └── page.tsx              # /contact
│   ├── privacy/
│   │   └── page.tsx              # /privacy
│   └── imprint/
│       └── page.tsx              # /imprint
└── api/
    └── contact/
        └── route.ts              # POST handler
```

---

## 3. Service Taxonomy

### 8 Service Categories

| # | Service | Slug | Zone mapping | Client type |
|---|---------|------|-------------|-------------|
| 1 | Web Development | `web-development` | Forum of Systems | Tech clients, startups |
| 2 | App Development | `app-development` | Forum of Systems | Tech clients, startups |
| 3 | CRM & Systems | `crm-systems` | Forum of Systems | Enterprise, SMB |
| 4 | Automation | `automation` | Agora of Growth | Enterprise, SMB |
| 5 | Digital Campaign & Ads | `digital-campaigns` | Agora of Growth | Brands, agencies |
| 6 | AI Content Production | `ai-content` | Dino Sanctuary | Creative clients, media |
| 7 | Music & Sonic Identity | `music-sonic-identity` | Amphitheatre of Sound | Brands, media, artists |
| 8 | Creative Technology | `creative-technology` | Renaissance Atelier | Agencies, brands, events |

### Service Data Structure

```typescript
interface Service {
  slug: string;
  title: string;
  shortTitle: string;           // For nav, tags (max 20 chars)
  tagline: string;              // One-line pitch (max 80 chars)
  description: string;          // 2-3 paragraph overview
  icon: string;                 // Icon identifier
  zone: ZoneId;                 // Which 3D zone features this service

  // What and how
  deliverables: string[];       // Concrete outputs ("Custom Next.js application")
  process: ProcessStep[];       // How I work (3-5 steps)
  tools: string[];              // Technologies and platforms used

  // Proof
  relatedProjects: string[];    // Project slugs
  testimonialId?: string;       // Optional testimonial reference

  // SEO
  metaTitle: string;
  metaDescription: string;

  // i18n
  locale: 'en' | 'vi';
}

interface ProcessStep {
  title: string;
  description: string;
  duration?: string;            // e.g., "1-2 weeks"
}
```

### Service Groupings (for display)

| Group | Label | Services |
|-------|-------|----------|
| **Build** | "I build digital systems" | Web Dev, App Dev, CRM & Systems |
| **Grow** | "I grow digital presence" | Automation, Digital Campaigns |
| **Create** | "I create original content" | AI Content, Music & Sonic, Creative Tech |

These groupings map to zone clusters:
- **Build** → Forum of Systems
- **Grow** → Agora of Growth
- **Create** → Amphitheatre + Sanctuary + Atelier

---

## 4. Project Taxonomy

### Project Categories

| Category | Slug | Maps to services | Example projects |
|----------|------|-----------------|-----------------|
| Web Application | `web-app` | Web Dev, App Dev | SaaS dashboards, portals |
| Mobile Application | `mobile-app` | App Dev | iOS/Android apps |
| CRM / Enterprise System | `crm-system` | CRM & Systems | Custom CRM, ERP |
| Automation / Integration | `automation` | Automation | Workflow bots, API integrations |
| Digital Campaign | `campaign` | Digital Campaigns | Ad campaigns, landing pages |
| AI Film / Animation | `ai-film` | AI Content | Dinosaur universe episodes |
| Music Production | `music` | Music & Sonic | Albums, brand music |
| Interactive Experience | `interactive` | Creative Tech | 3D web, installations |
| Photography / Travel | `photography` | (personal) | Travel stories, photo series |

### Project Data Structure

```typescript
interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  services: string[];            // Service slugs this project demonstrates
  zone: ZoneId;                  // Primary zone where this appears in 3D

  // Content
  tagline: string;               // One-line (max 80 chars)
  summary: string;               // 2-3 sentences for cards/previews
  caseStudy?: CaseStudy;         // Full case study (section 5)

  // Media
  thumbnail: string;             // Card image (16:9, WebP)
  heroImage?: string;            // Full-width header image
  gallery?: string[];            // Additional images
  videoUrl?: string;             // YouTube/Vimeo embed or hosted video

  // Meta
  client?: string;               // Client name (or "Personal Project")
  year: number;
  duration?: string;             // e.g., "3 months"
  techStack: string[];
  url?: string;                  // Live link
  featured: boolean;
  draft: boolean;                // Hide from production

  // SEO
  metaTitle: string;
  metaDescription: string;

  // i18n
  locale: 'en' | 'vi';
}
```

### Project Display Rules

1. **Featured projects** (max 4) appear on the home page semantic HTML and in Story Mode
2. **All projects** appear on `/projects` index, filterable by category
3. **Zone-mapped projects** appear in their respective 3D zones as interactive objects
4. **Draft projects** are hidden in production but visible in development
5. **Projects without case studies** show the summary view, not a stub page

---

## 5. Case Study Structure

Every project that wants to convert clients needs a case study. Not all projects
require one — photography and personal music don't need the same structure.

### Case Study Data Structure

```typescript
interface CaseStudy {
  // The hook — why should I read this?
  challenge: string;             // What problem was solved (2-3 sentences)

  // The approach
  approach: string;              // How was the problem analyzed (2-3 sentences)
  decisions: Decision[];         // Key decisions made (2-4 items)

  // The build
  solution: string;              // What was built (2-3 sentences)
  architecture?: string;         // Technical architecture overview (optional)
  techDetails?: TechDetail[];    // Notable technical implementations (optional)

  // The result
  results: Result[];             // Measurable outcomes (2-4 items)
  testimonial?: Testimonial;     // Client quote (optional)

  // The lesson
  reflection?: string;           // What was learned (1-2 sentences, optional)
}

interface Decision {
  title: string;                 // "Chose Next.js over SPA"
  reasoning: string;             // "Because SEO was critical for..."
}

interface TechDetail {
  title: string;                 // "Real-time sync engine"
  description: string;           // "Built a WebSocket layer that..."
}

interface Result {
  metric: string;                // "Page load time"
  value: string;                 // "1.2s (from 4.8s)"
  context?: string;              // "70% improvement"
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}
```

### Case Study Page Layout

```
┌─────────────────────────────────────────┐
│ Hero image (full width)                 │
│ Title                                   │
│ Category tag | Year | Client            │
├─────────────────────────────────────────┤
│ THE CHALLENGE                           │
│ Problem statement in client's context   │
├─────────────────────────────────────────┤
│ THE APPROACH                            │
│ Analysis + key decisions                │
├─────────────────────────────────────────┤
│ THE SOLUTION                            │
│ What was built + architecture diagram   │
│ Tech stack badges                       │
│ [Gallery / screenshots]                 │
├─────────────────────────────────────────┤
│ THE RESULTS                             │
│ Metrics cards (before → after)          │
│ Testimonial quote (if available)        │
├─────────────────────────────────────────┤
│ CTA: "Have a similar challenge?"        │
│ [Start a Conversation →]               │
└─────────────────────────────────────────┘
```

### What Does NOT Get a Case Study

| Content type | Treatment |
|-------------|-----------|
| Personal photography | Gallery page with location/story text, no metrics |
| Music releases | Player embed + tracklist + credits, no challenge/solution |
| AI film episodes | Synopsis + behind-the-scenes, no client metrics |
| Travel stories | Photo essay format, no case study structure |

---

## 6. Semantic HTML Requirements

### Content That MUST Exist as HTML (Not 3D-Only)

Every piece of content below must be rendered as semantic HTML in the DOM,
indexable by search engines, and accessible without JavaScript or WebGL.

| Content | Where | Why |
|---------|-------|-----|
| **Name + tagline** | `/` (home) | Identity — Google Knowledge Panel, social shares |
| **Services list with descriptions** | `/services`, `/` | Core business info — must rank for "web developer [city]" etc. |
| **Each service page** | `/services/[slug]` | Individual service pages rank for long-tail queries |
| **Project cards (title, summary, thumbnail)** | `/projects`, `/` | Portfolio proof — clients scan before deciding to read more |
| **Full case studies** | `/projects/[slug]` | Conversion content — the detailed proof that closes deals |
| **About/bio** | `/about` | Trust building — people hire people |
| **Contact form** | `/contact` | Must work without 3D for mobile, accessibility, bots |
| **Tech stack / skills list** | `/about` | Recruiter/technical screening queries |
| **Testimonials** | `/services/[slug]`, case studies | Social proof — plain text, not hidden in 3D |
| **Open Graph meta + JSON-LD** | All routes | Social sharing + rich snippets |

### Content That CAN Be 3D-Only

| Content | Where | Why it's OK |
|---------|-------|-------------|
| Interactive object animations | 3D zones | Decorative, not informational |
| Camera transitions | Story Mode | Navigation experience, not content |
| Ambient audio | 3D zones | Enhancement, not information |
| Easter eggs / hidden details | Explore Mode | Reward for exploration, not business-critical |
| Environmental storytelling | Zone decorations | Atmosphere, not indexable content |

---

## 7. CTA Strategy

### CTA Hierarchy

| Level | CTA | Where | Style |
|-------|-----|-------|-------|
| **Primary** | "Start a Project" / "Let's Build" | Every page, 3D Beacon zone | Filled button, accent color (#C9A84C) |
| **Secondary** | "View Work" / "See Projects" | Home, service pages | Outline button |
| **Tertiary** | "Learn More" / "Read Case Study" | Project cards, service teasers | Text link with arrow |
| **Persistent** | Contact icon/button | Fixed position (bottom-right on desktop, nav bar on mobile) | Small, non-intrusive, always visible |

### CTA Placement Rules

1. **Every page ends with a CTA** — no dead-end pages
2. **Case study CTAs are contextual** — "Have a similar challenge? Let's talk." (not generic "Contact us")
3. **Service page CTAs link to contact with pre-filled service** — `/contact?service=web-development`
4. **3D zone CTAs** — the Beacon zone IS the CTA. Interactive objects in other zones lead to overlays that contain CTAs.
5. **No pop-ups, no interstitials** — premium sites don't beg. The CTA is ambient and confident.
6. **Mobile CTA** — persistent "Get in Touch" button in the mobile nav bar

### CTA Copy Variants by Context

| Context | CTA copy | Why |
|---------|---------|-----|
| Home page | "Start a Project" | Action-oriented, assumes intent |
| Service page | "Discuss [Service Name]" | Specific to what they're reading |
| Case study | "Have a similar challenge?" | Empathy-driven, relates to the problem shown |
| About page | "Work With Me" | Personal invitation |
| 3D Beacon zone | "Send a Signal" | In-world metaphor, memorable |
| After scrolling 80%+ | "Ready to begin?" | Earned CTA after they've seen the work |

---

## 8. Brief-Builder Contact Form

The contact form is not just name/email/message. It's a lightweight brief-builder
that qualifies the inquiry and gives the creator context before the first conversation.

### Form Structure

```
STEP 1: BASICS
├── Name *
├── Email *
├── Company (optional)
└── How did you find me? (optional dropdown)
    ├── Search engine
    ├── Social media
    ├── Referral
    ├── Portfolio link
    └── Other

STEP 2: PROJECT TYPE
├── What do you need? (multi-select, from service taxonomy)
│   ├── Web Development
│   ├── App Development
│   ├── CRM & Systems
│   ├── Automation
│   ├── Digital Campaign
│   ├── AI Content Production
│   ├── Music & Sonic Identity
│   ├── Creative Technology
│   └── Something else
└── Brief description of your project *
    (textarea, min 20 chars, max 1000 chars)

STEP 3: CONTEXT (all optional)
├── Timeline
│   ├── ASAP
│   ├── 1-3 months
│   ├── 3-6 months
│   ├── Flexible
│   └── Just exploring
├── Budget range
│   ├── Under $5K
│   ├── $5K - $15K
│   ├── $15K - $50K
│   ├── $50K+
│   └── Prefer not to say
└── Preferred language
    ├── English
    └── Vietnamese

[SEND BRIEF →]
```

### Form Behavior

- **Progressive disclosure** — Step 1 visible first, Steps 2-3 expand on completion
- **Pre-fill from URL params** — `/contact?service=web-development` pre-selects the service
- **Validation** — inline, real-time, no full-page error states
- **Submission** — POST to `/api/contact`, show success message inline
- **Fallback** — direct email link visible below the form ("Prefer email? han@...")
- **Anti-spam** — honeypot field + rate limiting on API route, no CAPTCHA (bad UX)
- **Analytics** — track form start, step completion, submission, abandonment

### Form Data Structure

```typescript
interface ContactBrief {
  // Step 1
  name: string;
  email: string;
  company?: string;
  referralSource?: ReferralSource;

  // Step 2
  services: string[];            // Service slugs
  description: string;

  // Step 3
  timeline?: Timeline;
  budget?: BudgetRange;
  preferredLanguage?: 'en' | 'vi';

  // Meta (auto-filled)
  submittedAt: string;           // ISO timestamp
  pageSource: string;            // Which page the form was on
  preFilledService?: string;     // URL param
}

type ReferralSource = 'search' | 'social' | 'referral' | 'portfolio' | 'other';
type Timeline = 'asap' | '1-3months' | '3-6months' | 'flexible' | 'exploring';
type BudgetRange = 'under5k' | '5k-15k' | '15k-50k' | '50k+' | 'undisclosed';
```

---

## 9. Bilingual-Ready Content Structure

### Strategy: Locale-Prefixed Data, Not Route Duplication

- Content files contain both `en` and `vi` versions
- The URL structure does NOT change — no `/en/services` vs `/vi/services`
- Language is selected by user preference (stored in localStorage + cookie)
- Default: English
- The 3D experience text (zone labels, HUD) also switches

### Content Data Pattern

```typescript
interface LocalizedContent<T> {
  en: T;
  vi: T;
}

// Example: localized service
const webDev: LocalizedContent<Service> = {
  en: {
    slug: 'web-development',
    title: 'Web Development',
    tagline: 'Full-stack web applications built for scale.',
    description: '...',
    // ...
  },
  vi: {
    slug: 'web-development',
    title: 'Phát triển Web',
    tagline: 'Ứng dụng web full-stack, xây dựng để mở rộng.',
    description: '...',
    // ...
  },
};
```

### What Gets Translated

| Content | Translated? | Notes |
|---------|------------|-------|
| Service titles + descriptions | Yes | Business-critical for Vietnamese clients |
| Project titles + summaries | Yes | Case studies may be English-only initially |
| About bio | Yes | Personal — both languages matter |
| Contact form labels | Yes | UX critical |
| Navigation labels | Yes | |
| HUD / zone labels | Yes | Minimal text, easy to translate |
| CTA copy | Yes | |
| Legal pages | Yes (eventually) | Can launch English-only |
| Case study full text | Partial | English first, translate top projects |
| Code snippets in case studies | No | Code is code |
| Alt text for images | Yes | Accessibility |

### Implementation (v1)

- `src/data/locales/en/` and `src/data/locales/vi/` directories
- Shared component reads current locale from store/cookie
- `useLocale()` hook returns current locale
- `t()` function resolves content by locale key
- Metadata (OG tags) rendered in the user's selected language
- `<html lang="...">` tag updates dynamically

---

## 10. Content Distribution Across Modes

### Story Mode Content (3D scroll experience)

Curated highlight reel. Max 60 seconds of reading content across the full scroll.
The goal is impression + navigation, not information density.

| Zone | Story Mode content | Interaction |
|------|-------------------|-------------|
| Shore | Name, tagline (text overlay) | Scroll to enter |
| Forum | "I build digital systems" headline + 3 service icons | Click System Table → service overlay |
| Agora | "I grow digital presence" headline + growth metric | Click Fountain → services overlay |
| Atelier | "Who I am" short bio (3 sentences) | Click Workbench → about overlay |
| Amphitheatre | "I create music" + audio sample hint | Click Stage → music player overlay |
| Sanctuary | "I build worlds" + film title | Click Hatchery → film detail overlay |
| Temple | Photography highlight (1 image) | Click Gallery → photo gallery overlay |
| Beacon | "Let's build something" CTA | Click Beacon → contact form overlay |

### Explore Mode Content (free navigation)

Full depth. All interactive objects available, plus hidden discoveries.

| Zone | Explore-only content |
|------|---------------------|
| Shore | Visitor footprint log (if backend exists) |
| Forum | Individual Codex Pillars → tech deep-dives |
| Agora | Testimonial stones (hover to read) |
| Atelier | Workbench drawer → philosophy statement |
| Amphitheatre | Different seats → different audio perspectives |
| Sanctuary | Field journal → concept art |
| Temple | Full photo gallery, location stories |
| Beacon | World map view ring → zone navigation |

### Project Detail Routes (/projects/[slug])

Full case study or project showcase. Richest content. These are the conversion pages.

| Section | Content |
|---------|---------|
| Hero | Project image, title, category, year |
| Challenge | Problem description |
| Approach | Analysis + decisions |
| Solution | What was built + tech stack |
| Gallery | Screenshots, demos |
| Results | Metrics + testimonial |
| CTA | Contextual next step |

### Contact Flow

| Entry point | Pre-context |
|------------|-------------|
| From service page | Service pre-selected |
| From case study | "Discuss a similar project" |
| From 3D Beacon zone | Clean form, no pre-fill |
| From nav button | Clean form |
| From about page | Personal tone CTA |

---

## 11. JSON-LD Structured Data

### Per-Route Schema

| Route | Schema type | Key fields |
|-------|------------|-----------|
| `/` | `Person` + `WebSite` | name, jobTitle, url, sameAs (social links) |
| `/services` | `Service` (array) | name, description, provider |
| `/services/[slug]` | `Service` | name, description, provider, areaServed |
| `/projects` | `CollectionPage` | name, description |
| `/projects/[slug]` | `CreativeWork` | name, description, author, dateCreated |
| `/about` | `Person` | name, jobTitle, knowsAbout, alumniOf |
| `/contact` | `ContactPage` | url, contactType |

---

## Assumptions

1. Vietnamese translation is the owner's responsibility — the system provides the structure
2. Budget ranges in the brief-builder are illustrative — adjust to real pricing
3. No CMS means content changes require a code deployment (acceptable for v1)
4. Case studies are the highest-effort content — expect 4-6 at launch, more added over time
5. Service taxonomy is final — 8 services cover the full offering
6. Photography and travel content are secondary to technical/creative services for conversion

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Content not written | High — empty portfolio doesn't convert | Start writing case studies now, in parallel with code |
| Too many services dilute credibility | Medium — "jack of all trades" perception | Group into 3 clusters (Build/Grow/Create) on the index page |
| Brief-builder too long | Medium — form abandonment | Progressive disclosure, all Step 3 fields optional |
| Bilingual content doubles maintenance | Medium — stale translations | Launch English-only, add Vietnamese post-launch for top pages |
| Case studies without metrics | Low — weaker than with numbers | Use qualitative results when quantitative aren't available |

---

## Status

| Category | Details |
|----------|---------|
| Fully implemented | Site IA, route map, service taxonomy (8 services), project taxonomy (9 categories), case study structure, semantic HTML requirements, CTA strategy, brief-builder spec, bilingual structure, content-to-mode mapping, JSON-LD schema map |
| Placeholder | None — design document |
| Not implemented | All content writing, all translations, all case studies, route implementation, brief-builder component, JSON-LD injection, locale system |
| Verify manually | (1) Owner confirms service taxonomy covers full offering; (2) Budget ranges are realistic; (3) Vietnamese is the second language (not French, Japanese, etc.); (4) Case study structure fits the owner's actual project history |
