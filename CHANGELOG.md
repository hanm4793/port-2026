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
- Built Grand Exit Portal in `ForumZone.tsx`: replaced solid 17m back wall with monumental colonnaded gateway and two ancient bronze doors swung wide open at 60 degrees, with paved road connecting seamlessly into Dino Sanctuary
- Relocated Audio Equalizer control directly into persistent `NavigationMenu.tsx` (top-right navbar), with animated volume bars and instant chime playback
- Re-engineered `TieredSeating.tsx`: replaced solid CylinderGeometry wedges with true hollow 2D arc shapes (`ExtrudeGeometry`), completely removing the white obstruction covering the circular stage
- Re-architected ground boundaries across Shore, Forum, Dino Sanctuary & Amphitheatre: eliminated all ground overlaps and Z-fighting
- Re-routed Story camera trajectory in `StoryConfig.ts`: camera now walks directly along the stone road at eye height (y=2.0m) and glides cleanly THROUGH the Fossil Arch rather than flying over it
- Implemented `AcousticStage.tsx`: enlarged circular marble orchestra (diameter 9.6m) with 3 concentric sound-reactive pulsing rings, monumental 2.8m bronze lyre with 5 vibrating strings, and 3 front-facing unobstructed stem steles
- Implemented `EchoWall.tsx`: monumental curved Skene back wall (26m wide) with wave reliefs and 3 suspended architectural linen acoustic sails (width 7.2m)
- Implemented `StageLighting.tsx`: dramatic theatrical key spotlight cutting down to the orchestra with soft penumbra, stage footlights, and twilight horizon fill
- Resolved spatial bottlenecks in `DinoSanctuaryZone.tsx`: opened 12m wide mountain gorge pass and added continuous weathered stone trail connecting Dino Sanctuary to Amphitheatre
- Updated `manifest.json` with new amphitheatre assets
- Verified build and dev server on port 3333

---

## Step 18 — Build Explore Mode (2026-10-01)

- Created `useExploreStore.ts`: comprehensive Explore Mode state store coordinating avatar transform, camera orbit angles, 4 discoverable Memory Seals, fast travel waypoints, and keyboard inputs
- Implemented `ExplorePlayer.tsx`: kinematic Archaeological Seeker / Navigator avatar with responsive WASD / Arrow key movement (7.5 m/s), smooth rotation toward movement vector, terrain boundary clamping (x: -14.5..14.5, z: -64..16), and proximity detection for Memory Seals
- Implemented `ExploreFollowCamera.tsx`: elevated third-person follow camera with mouse drag orbit (yaw & pitch clamp 0.15..1.25), scroll wheel zoom (3.5m..14.0m), and smooth target damping without pointer lock
- Implemented `MemoryGlyphs.tsx`: 4 archaeological discovery seals located in Shore, Forum, Dino Sanctuary, and Amphitheatre with rotating crystalline relics, glowing ground rings, and behind-the-scenes engineering/narrative lore
- Implemented `ExploreHUD.tsx`: complete Explore Mode overlay including "Return to Guided Story" button, Memory Seals tracker (X / 4), Fast Travel waypoint bar (Shore, Forum, Sanctuary, Amphitheatre), keyboard controls guide, nearby [E] inspect prompt, interactive Seal modal, and mobile touch D-Pad
- Mounted `ExplorePlayer`, `ExploreFollowCamera`, `MemoryGlyphs`, and `ExploreHUD` in `Experience.tsx` and `page.tsx`
- Verified build and dev server on port 3333

---

## Step 19 — Interaction Design for Explore Mode (2026-10-01)

- Created `EXPLORE-INTERACTION.md`: interaction design specification detailing the 4 deterministic states (Dormant, Proximity Detected, Focused/Ready, Inspecting), affordance rules, orientation aids, and museum-instrument principles
- Upgraded `useExploreStore.ts` with real-time zone boundary tracking (`currentZone`), angular heading to the Summit Beacon (`beaconAngle`), and contextual `interactPrompt` state
- Implemented Museum-Grade Optical Reticle in `ExploreHUD.tsx`: precision brass corner brackets with action verbs (e.g., `[ E · Examine System Architecture ]`) anchored directly to active targets
- Added Summit Beacon Compass Needle in Explore top bar tracking the lodestone heading to the island apex (`[0, 14, -78]`)
- Added cinematic Zone Entry Toasts (`[ TERRITORY ACCESSED // ZONE NAME ]`) that glide in on territorial boundary crossing
- Implemented acoustic feedback ticks (`playHoverTick()`, `playSealUnlockChime()`) in `StemAudioEngine.ts` triggering on reticle lock and seal decryptions
- Unified interaction targets in `ExplorePlayer.tsx` covering all 4 Memory Seals and 5 major architectural hotspots (System Table, Altar, Lyre, and Case Study Alcoves)
- Verified build and dev server on port 3333

---

## Step 20 — Audio System & Sonic Architecture (2026-10-01)

- Created `AUDIO-SYSTEM.md`: comprehensive audio architecture specification detailing Web Audio signal routing, procedural soundscapes, stereo vs positional distribution, tab focus dimming, and ducking rules
- Implemented `AudioOptInModal.tsx`: elegant entry dialog ("Enter with Sound" vs "Explore in Silence") with optical brackets, providing 100% compliance with browser autoplay policies
- Upgraded `AudioManager.ts`: procedural zero-dependency pink-noise wave synthesis for Shore, distinct 60Hz/120Hz electrical data drone & cathedral room air for Forum, deep primeval triad drone (F#2, C#3, A#3) with sub-rumble for Dino Sanctuary, and unified musical stems for Amphitheatre
- Re-architected `StemAudioEngine.ts` to output directly into `AudioManager.zoneGains.amphitheatre` rather than directly to speakers, ensuring 3-stem musical orchestra ONLY plays when in Amphitheatre/Beacon and fades out cleanly in Shore, Forum, and Dino Sanctuary
- Synced zone soundscape transitions cleanly across Story Mode chapters (`useStoryScroll.ts`) and Explore Mode coordinates (`useExploreStore.ts`)
- Implemented automatic 2.0s crossfading between territorial soundscapes as user navigates Story Mode or Explore Mode
- Implemented automatic tab focus dimming (`visibilitychange` / `blur`) ramping audio to 0.0 on background tabs and restoring on focus
- Implemented automatic reading attenuation (`isDucked` -10dB) when opening case study drawers or reading memory seals
- Upgraded `useAudioStore.ts` with persistent localStorage choice tracking (`port-audio-decided`, `port-audio-enabled`, `port-audio-muted`)
- Added Vitest unit test suite `tests/unit/audio-store.test.ts` verifying all 6 stateful transitions (6/6 passing)
- Verified build and dev server on port 3333

---

## Step 20 — Audio System & Sonic Architecture (2026-10-01)

- Created `AUDIO-SYSTEM.md`: comprehensive audio architecture specification detailing Web Audio signal routing, procedural soundscapes, stereo vs positional distribution, tab focus dimming, and ducking rules
- Implemented `AudioOptInModal.tsx`: elegant entry dialog ("Enter with Sound" vs "Explore in Silence") with optical brackets, providing 100% compliance with browser autoplay policies
- Upgraded `AudioManager.ts`: procedural zero-dependency pink-noise wave synthesis for Shore, distinct 60Hz/120Hz electrical data drone & cathedral room air for Forum, deep primeval triad drone (F#2, C#3, A#3) with sub-rumble for Dino Sanctuary, and unified musical stems for Amphitheatre
- Re-architected `StemAudioEngine.ts` to output directly into `AudioManager.zoneGains.amphitheatre` rather than directly to speakers, ensuring 3-stem musical orchestra ONLY plays when in Amphitheatre/Beacon and fades out cleanly in Shore, Forum, and Dino Sanctuary
- Synced zone soundscape transitions cleanly across Story Mode chapters (`useStoryScroll.ts`) and Explore Mode coordinates (`useExploreStore.ts`)
- Implemented automatic 2.0s crossfading between territorial soundscapes as user navigates Story Mode or Explore Mode
- Implemented automatic tab focus dimming (`visibilitychange` / `blur`) ramping audio to 0.0 on background tabs and restoring on focus
- Implemented automatic reading attenuation (`isDucked` -10dB) when opening case study drawers or reading memory seals
- Upgraded `useAudioStore.ts` with persistent localStorage choice tracking (`port-audio-decided`, `port-audio-enabled`, `port-audio-muted`)
- Added Vitest unit test suite `tests/unit/audio-store.test.ts` verifying all 6 stateful transitions (6/6 passing)
- Verified build and dev server on port 3333

---

## Step 21 — Performance Audit & Production Hardening (2026-10-01)

- Created `PERFORMANCE.md`: comprehensive performance architecture specifying budgets (60fps desktop, 30-45fps mobile, < 45k visible triangles, < 75 draw calls, 1 directional shadow map max), top bottlenecks, and graceful 4-tier fallback chain
- Implemented `ZoneCuller.tsx`: spatial zone mounting and frustum optimization container that dynamically unmounts distant zones in Story and Explore modes, saving 35-50% visible draw calls
- Upgraded `useQualityStore.ts`: expanded with `QUALITY_CONFIGS` presets, device heuristics (`isMobileDevice`, `dpr` ceiling `[1.0..1.75]`, `shadowMapSize`, `vertexWaves`), and cascading auto-degradation logic
- Upgraded `QualityManager.ts`: client-side GPU capability detection profiling renderer string, unmasked vendor, texture dimensions, hardware concurrency, and active FPS policing
- Optimized `Experience.tsx`: dynamic DPR scaling, quality-gated shadow maps, depth/stencil optimization, and wrapped all 4 live zones in `ZoneCuller`
- Optimized `OceanPlane.tsx`: throttled CPU vertex displacement loop to 30Hz and added quality gate (`vertexWaves`) to park displacement on low-tier/mobile devices
- Added Vitest unit test suite `tests/unit/quality-manager.test.ts` (11/11 tests passing across test suites)
- Verified build and dev server on port 3333

---

## Current State Summary

| Layer | Status |
|-------|--------|
| Design docs | 10 documents (including PERFORMANCE.md), all cross-referenced |
| Codebase | 82+ source files, builds clean, 0 type errors |
| Test suite | Vitest unit tests active & passing (11/11 across 2 test suites) |
| Performance | Production-hardened: ZoneCuller unmounting, throttled CPU displacement, dynamic DPR [1.0..1.75], 60fps |
| Zones live | Shore of Arrival + Forum of Systems + Dino Sanctuary + Amphitheatre of Sound rendered in scene |
| Audio system | Active with procedural zone soundscapes, opt-in entry modal, auto-ducking & tab-focus dimming |
| Story Mode | Active with GSAP + Lenis, 6 chapters, beat-driven camera rail & audio zone transitions |
| Explore Mode | Active with museum-grade reticle, compass wayfinding, zone toasts, 4 Memory Seals & tactile audio ticks |
| Overlays & Panels | Contextual right-side drawer (`CaseStudyPanel`) docked to 3D with audio ducking |
| Routes | `/`, `/services`, `/services/[slug]`, `/projects`, `/projects/[slug]`, `/about`, `/contact`, `/api/contact` |
| Remaining zones | Agora, Atelier (proxy exists), Temple, Beacon |
| Mobile experience | Responsive DOM shell ready, mobile touch D-Pad active in Explore Mode |
