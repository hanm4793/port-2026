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

## Current State Summary

| Layer | Status |
|-------|--------|
| Design docs | 7 documents, all cross-referenced |
| Codebase | 58 source files, builds clean |
| Shore zone | Proxy prototype, QA'd and refined |
| Atelier zone | Proxy prototype (not primary view) |
| Routes | `/`, `/contact`, `/api/contact` |
| 6 remaining zones | Not started |
| Scroll camera | Data defined, not wired |
| Mobile | Not started |
| Content | Placeholder |
| Tests | Not started |
| CI/CD | Not started |
