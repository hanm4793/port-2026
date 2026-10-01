# Changelog

All notable progress on port-2026 / Island of Memory.

---

## Steps 1-4 — Design Phase (2026-09-26)

### Step 1: Project Brief
- Created DESIGN.md — project summary, audience, goals, artistic direction, UX principles
- Defined "Ancient Future" visual identity
- Set performance budgets and SEO strategy

### Step 2: World Concept & Zone Map
- Created WORLD-MAP.md — 8 zones with symbolic/business meanings
- Defined Story Mode route and Explore Mode branches
- Set MVP scope: Shore + Forum + Atelier + Beacon

### Step 3: Art Direction Bible
- Created ART-DIRECTION.md — palette, materials, lighting, camera rules
- Defined cultural influence guidelines (football, manga, dinosaurs)
- Locked 10 absolute prohibitions

### Step 4: Technical Architecture
- Created ARCHITECTURE.md — 14 subsystems, 7 stores, 3-mode state machine
- Defined folder structure, init flow, zone lifecycle
- 7 tech decisions with rationale

---

## Step 5 — Codebase Scaffold (2026-09-26)

### Created
- Next.js 16 + TypeScript + Tailwind CSS 4 project
- 53 source files across all architectural layers
- **Types:** experience, content, manifest, events
- **Stores:** experience, zone, camera, overlay, audio, quality, input (Zustand)
- **Hooks:** useMediaQuery, useReducedMotion, useDeviceCapability, useScrollProgress
- **Core engine:** Ticker, QualityManager, InputManager, AudioManager, AnalyticsHooks, DevTools
- **Camera:** CameraManager, StoryCameraController, ExploreCameraController (stub), DetailCameraController
- **World:** WorldManager, ZoneManager, ZoneRegistry (8 zones), AssetResolver
- **Interaction:** InteractionManager, InteractiveObject component
- **Environment:** Sky, Lighting, Fog
- **Materials:** materialLibrary (7 materials)
- **Zones:** AtelierZone (benchmark), ExperienceLoader (SSR-safe dynamic import)
- **Routes:** `/` (landing), `/contact` (form), `/api/contact` (handler)
- **Components:** LoadingScreen, Overlay, HUD, NavigationMenu
- **Data:** 3 placeholder services, 4 placeholder projects
- **Assets:** manifest.json with 5 Atelier proxy entries

### Verified
- TypeScript compiles with 0 errors
- Production build succeeds
- Dev server responds 200 on all routes

---

## Step 6 — Content IA (2026-09-26)

### Created
- CONTENT-IA.md — site IA, route map, service taxonomy, project taxonomy
- 8 services in 3 clusters (Build / Grow / Create)
- Case study structure (Challenge → Approach → Solution → Results)
- Brief-builder contact form spec (3-step progressive disclosure)
- Bilingual-ready content structure (en/vi locale pattern)
- CTA strategy with 4-level hierarchy
- JSON-LD schema map per route

### Updated
- `src/data/services.ts` — expanded from 3 to 8 services

---

## Step 7 — Shore of Arrival Prototype (2026-09-26)

### Created
- `src/experience/zones/shore/shoreConfig.ts` — 6 named cameras, camera path, palette
- `src/experience/zones/shore/ShoreZone.tsx` — main zone: terrain, steps, rocks, path, beacon, lighting
- `src/experience/zones/shore/GateOfNames.tsx` — hero landmark: pillars, lintel, pediment, inscription, circuit traces, mode-choice orbs
- `src/experience/zones/shore/OceanPlane.tsx` — vertex-displaced ocean with 3-layer wave animation
- `src/experience/zones/shore/CoastalGrass.tsx` — 116 grass blades with wind sway, reduced-motion support

### Scene Objects
- Ocean (100×50 plane, 60×30 vertex grid, animated waves)
- Beach terrain (50×80 plane, subtle undulation)
- 7 stone steps (alternating marble/sandstone)
- Gate of Names (2 pillars with bases/capitals/bronze rings, lintel with pediment, inscription panel, 6 circuit traces, 2 mode-choice orbs)
- 4 buried columns (tilted, different heights)
- 4 mooring stones
- 17 scattered rocks (dodecahedrons)
- 12 grass patches (~116 blades)
- Path inland (34m with 20 border stones)
- Beacon silhouette (tower + pulsing light at z=-45)

### Verified
- 61 FPS on desktop
- Orbit controls working
- Orb hover + click + feedback working

---

## Steps 8-9 — QA & Refinement (2026-09-27)

### QA Findings (Step 8)
1. Flat background killed atmosphere
2. Fog same color as background — no depth
3. Materials all same warm-beige family — no contrast
4. Ocean hard-cut at shore — no depth gradient
5. Lighting flat and redundant — no shadow drama

### Fixes Applied (Step 9)
1. **Sky gradient sphere** — golden horizon → blue-grey zenith (6-stop gradient)
2. **Linear fog** — warm haze (#C8B8A8), 40m→120m, distinct from sky
3. **Gate material contrast** — dark volcanic bases (#2A2624), warmer marble shafts (#D8CDB8), lighter capitals (#E0D5C0), dark platform (#252220). Thicker circuit traces (0.035), boosted emissive (0.8 base)
4. **Ocean vertex colors** — deep teal → mid turquoise → shallow light → shore foam white
5. **Directional key light** from left-behind ([-25,15,20]) at 1.8 intensity, cool fill from right, warm ground bounce point light under gate

### Updated Environment Files
- `Sky.tsx` — gradient sphere instead of flat color
- `Fog.tsx` — linear fog with warm haze color
- `Lighting.tsx` — single dominant key light with cool fill

---

## Step 10 — Story Mode System (2026-09-28)

- Created `StoryConfig.ts` with 6 core narrative chapters
- Integrated Lenis smooth scroll with GSAP ScrollTrigger in `useStoryScroll.ts`
- Implemented `StoryCameraRail.tsx` in R3F with smooth damping
- Created `StoryChapters.tsx` for semantic DOM scroll sections (150vh each)
- Added `ChapterProgress.tsx` vertical dot indicator
- Wrapped landing page with `StoryPageWrapper.tsx` and updated `Experience.tsx`

---

## Step 11 — Shore in Story Mode (2026-09-29)

- Upgraded `StoryConfig.ts` to support multi-beat chapters (`beats[]` array)
- Configured 4 cinematic camera beats for Chapter 1 (Shore of Arrival): Establishing, Descent, Reveal, Threshold
- Upgraded `StoryCameraRail.tsx` to interpolate smoothly across multi-beat keyframes with smoothstep
- Synchronized DOM beat cards in `StoryChapters.tsx`
- Commit & push `10bd252`

---

## Step 12 — Forum of Systems Prototype (2026-09-29)

- Created `forumConfig.ts` with 5 named cameras and cool technical palette
- Created `ForumZone.tsx` featuring raised stone platform with inlays, colonnades, entrance arch, 5 archive alcoves, floor data current circuits, and technical lighting
- Implemented `SystemTable.tsx` landmark with floating layered architecture (Frontend, API, Backend) and circuit inlays
- Added 5 floating system nodes with dynamic circuit connections
- Updated Story Chapter 2 camera path to navigate through Forum
- Commit & push `50671b6`

---

## Step 13 — Case-Study Docking for Forum (2026-09-30)

- Built `CaseStudyPanel.tsx` right-side drawer using Framer Motion spring physics
- Replaced generic modal with contextual drawer preserving 3D view on left
- Transformed Forum archive alcoves into interactive project hotspots with gold glow status
- Created `CaseStudyPanelWrapper.tsx` client boundary for server component
- Wired direct trigger from Forum 3D objects to project details
- Commit & push `e9fd154`

---

## Steps 14 & 15 — Content & Conversion Layer + Foundation Copy (2026-09-30)

- Created `SITE_COPY` foundation copywriting in `src/data/copy.ts` covering identity, services, systems, AI world-building, music, travel, and brief-builder
- Expanded `src/types/content.ts` with comprehensive `CaseStudy`, `Decision`, `Result`, `Testimonial`, and `ContactBrief` types
- Enriched `src/data/services.ts` with all 8 services mapped to deliverables, 4-phase processes, tools, and proof projects
- Enriched `src/data/projects.ts` with in-depth case studies (Challenge, Approach, Technical Decisions, Delivered Solution, Metrics, and Testimonials)
- Built reusable components: `ServiceCard.tsx`, `ProjectCard.tsx`, and interactive 3-step `BriefBuilder.tsx` with honeypot spam protection
- Created marketing layout (`src/app/(marketing)/layout.tsx`) and semantic SSG pages:
  - `/services` (grouped by Build / Grow / Create clusters)
  - `/services/[slug]` (all 8 services with static params)
  - `/projects` (portfolio archive with proof metrics)
  - `/projects/[slug]` (structured case-study templates with static params)
  - `/about` (philosophy, 4 pillars, and background narrative)
  - `/contact` (interactive BriefBuilder form)
- Updated `/api/contact` API route to validate `ContactBrief` payloads and enforce honeypot filtering
- Integrated accessible navigation bar in landing page and linked contextual CTAs in Story Mode chapters
- Generated 25 static pages with zero TypeScript errors

---

## Step 16 — Prototype Dino Sanctuary Zone (2026-09-30)

- Created `sanctuaryConfig.ts` with 6 named cameras, sanctuary palette, and 5-phase generative filmmaking pipeline
- Implemented `FossilArch.tsx` landmark: monumental ribcage archway with mineralized bone PBR and pulsing amber/teal marrow inlays
- Implemented `PipelineAltar.tsx`: tiered sandstone altar with 5 surrounding stele pillars representing the 5 pipeline phases (Lore, 3D Pre-Vis, Neural Diffusion, Scoring, 4K Master) with interactive state rotation and docking to `dinosaur-universe-chronicles`
- Implemented `BioluminescentPool.tsx`: mineral basin with vertex-animated ripple shaders and glowing amber spore clusters
- Assembled `DinoSanctuaryZone.tsx` featuring valley floor depression, basalt canyon cliffs, primeval canopy monoliths, and misty atmospheric lighting
- Mounted `DinoSanctuaryZone` into `Experience.tsx` and synchronized Chapter 4 ("Worlds") in `StoryConfig.ts` with 3 cinematic beats
- Updated `manifest.json` with 3 new sanctuary assets
- Verified build and dev server on port 3333

---

## Step 17 — Prototype Amphitheatre of Sound Zone (2026-10-01)

- Created `amphitheatreConfig.ts` with 6 named cameras, palette (limestone, resonant bronze, theatre spot), and 3-stem audio model (Percussion, Harmony, Vocals)
- Implemented `AcousticStage.tsx`: circular marble orchestra with 3 concentric sound-reactive pulsing rings, central bronze lyre/relic, and 3 interactive stem steles (Percussion, Harmony, Lead Vocals)
- Implemented `TieredSeating.tsx`: 5 semicircular Greek limestone tiers climbing the natural slope, with radial access stairways (klimakes) and top-tier acoustic steles
- Implemented `EchoWall.tsx`: curved Skene wall with sound wave relief carvings and 3 suspended architectural linen acoustic reflector sails
- Implemented `StageLighting.tsx`: dramatic theatrical key spotlight cutting down to the orchestra with soft penumbra, stage footlights, and twilight horizon fill
- Assembled `AmphitheatreZone.tsx` with hillside base terrain and flanking coastal ridge rocks
- Mounted `AmphitheatreZone` in `Experience.tsx` and moved `BeaconSilhouette` in `ShoreZone` further back to `z = -78` for authentic spatial depth
- Synchronized Chapter 5 ("Art & Music") in `StoryConfig.ts` with 3 cinematic beats (Ridge Entrance, Stage Close-Up, Theatron Overview)
- Updated `manifest.json` with 3 new amphitheatre assets
- Verified build and dev server on port 3333

---

## Current State Summary

| Layer | Status |
|-------|--------|
| Design docs | 7 documents, all cross-referenced |
| Codebase | 70+ source files, builds clean, 0 type errors |
| Zones live | Shore of Arrival + Forum of Systems + Dino Sanctuary + Amphitheatre of Sound rendered in scene |
| Story Mode | Active with GSAP + Lenis, 6 chapters, beat-driven camera rail |
| Explore Mode | Toggleable via Shore orb or UI, activates OrbitControls |
| Overlays & Panels | Contextual right-side drawer (`CaseStudyPanel`) docked to 3D |
| Routes | `/`, `/services`, `/services/[slug]`, `/projects`, `/projects/[slug]`, `/about`, `/contact`, `/api/contact` |
| Remaining zones | Agora, Atelier (proxy exists), Temple, Beacon |
| Mobile experience | Responsive DOM shell ready, dedicated mobile 2D scroll layout pending |
