# Technical Architecture

**Project:** port-2026 / Island of Memory
**Date:** 2026-09-26
**Status:** Architecture specification — no code yet
**Related:** DESIGN.md, WORLD-MAP.md, ART-DIRECTION.md, ASSET-PIPELINE.md, BENCHMARK-ZONE.md

---

## Assumptions

1. Next.js 14+ App Router with TypeScript is the framework (locked in DESIGN.md §7).
2. The 3D experience is a progressive enhancement layer — the site must render meaningful
   content without WebGL.
3. R3F (React Three Fiber) is the Three.js binding, but the experience layer internally
   follows game-engine separation of concerns, not pure React component patterns.
4. Story Mode and Explore Mode share one world state and one scene graph — they differ
   only in camera controller and input handling.
5. Zones are lazy-loaded units. Only the active zone + one adjacent zone are fully loaded
   at any time. Distant zones are represented by LOD shells or silhouettes.
6. Mobile devices (< 1024px) get a scroll-driven 2D experience with optional lightweight
   3D accents — not a degraded desktop experience.
7. The architecture must support proxy assets (primitives) and final assets (.glb files)
   interchangeably via the asset manifest (ASSET-PIPELINE.md §10).
8. No backend database — contact form uses Next.js API route + email service.
9. Audio is optional and user-initiated — never autoplay.
10. Analytics are fire-and-forget events, not blocking — Vercel Analytics or equivalent.
11. `prefers-reduced-motion` must be respected at both the OS and user-preference level.

---

## 1. Folder Structure

```
port-2026/
├── public/
│   ├── assets/                     # 3D assets (see ASSET-PIPELINE.md)
│   │   ├── manifest.json
│   │   ├── terrain/
│   │   ├── env-kit/
│   │   ├── landmarks/
│   │   ├── props/
│   │   ├── interactive/
│   │   ├── textures/
│   │   ├── hdri/
│   │   └── audio/
│   ├── draco/                      # Draco decoder (self-hosted)
│   ├── fonts/
│   ├── images/                     # 2D images for overlays, mobile, OG
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout: fonts, metadata, providers
│   │   ├── page.tsx                # Landing: SSG HTML + 3D experience mount
│   │   ├── (marketing)/            # Route group: SEO-optimized content pages
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx        # Project index
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx    # Individual project (SSG)
│   │   │   ├── services/
│   │   │   │   └── page.tsx        # Service offerings (SSG)
│   │   │   ├── about/
│   │   │   │   └── page.tsx        # About page (SSG)
│   │   │   └── contact/
│   │   │       └── page.tsx        # Contact page (SSG + form)
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts        # Contact form handler
│   │   └── globals.css             # Tailwind base + custom properties
│   │
│   ├── components/                 # React UI components (2D layer)
│   │   ├── ui/                     # Generic UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Overlay.tsx         # Modal overlay container
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── NavigationMenu.tsx  # Fallback nav for all zones
│   │   │   └── ContactForm.tsx
│   │   ├── overlays/               # Content overlays triggered from 3D
│   │   │   ├── ProjectOverlay.tsx
│   │   │   ├── AboutOverlay.tsx
│   │   │   ├── ServiceOverlay.tsx
│   │   │   └── GalleryOverlay.tsx
│   │   ├── hud/                    # Heads-up display elements over 3D
│   │   │   ├── HUD.tsx             # HUD container
│   │   │   ├── ModeToggle.tsx      # Story/Explore mode switch
│   │   │   ├── ZoneIndicator.tsx   # Current zone label
│   │   │   ├── ScrollProgress.tsx  # Story mode progress bar
│   │   │   ├── AudioToggle.tsx
│   │   │   └── ContactButton.tsx   # Persistent CTA
│   │   └── mobile/                 # Mobile-specific scroll experience
│   │       ├── MobileExperience.tsx
│   │       ├── MobileZoneSection.tsx
│   │       └── MobileHero.tsx
│   │
│   ├── experience/                 # 3D experience layer (game-engine style)
│   │   ├── Experience.tsx          # Root R3F <Canvas> + providers
│   │   ├── ExperienceLoader.tsx    # Dynamic import wrapper (ssr: false)
│   │   │
│   │   ├── core/                   # Engine subsystems (non-React)
│   │   │   ├── Ticker.ts           # RAF loop manager
│   │   │   ├── Clock.ts            # Time tracking (delta, elapsed, paused)
│   │   │   ├── QualityManager.ts   # Performance tier detection + auto-degrade
│   │   │   ├── InputManager.ts     # Unified input abstraction (mouse, touch, keyboard, scroll)
│   │   │   ├── AudioManager.ts     # Web Audio API wrapper, per-zone ambient
│   │   │   ├── AnalyticsHooks.ts   # Event tracking (zone enter, interaction, CTA click)
│   │   │   └── DevTools.ts         # Debug overlay, perf stats, zone bounds viz
│   │   │
│   │   ├── camera/                 # Camera subsystem
│   │   │   ├── CameraManager.ts    # Camera orchestrator (delegates to active controller)
│   │   │   ├── StoryCameraController.ts   # Scroll-driven camera path
│   │   │   ├── ExploreCameraController.ts # Free orbit camera
│   │   │   └── DetailCameraController.ts  # Focused camera for overlay-open state
│   │   │
│   │   ├── world/                  # World and zone management
│   │   │   ├── WorldManager.ts     # Island-level orchestrator
│   │   │   ├── ZoneManager.ts      # Zone lifecycle (load, activate, deactivate, unload)
│   │   │   ├── ZoneRegistry.ts     # Zone definitions + metadata
│   │   │   ├── ZoneLoader.ts       # Async zone asset loading
│   │   │   └── AssetResolver.ts    # Manifest-based proxy/file asset resolution
│   │   │
│   │   ├── interaction/            # Interaction system
│   │   │   ├── InteractionManager.ts   # Raycasting, hover, click dispatch
│   │   │   ├── InteractiveObject.tsx   # R3F component wrapping interactive meshes
│   │   │   └── CursorManager.ts       # Cursor state (default, pointer, grab)
│   │   │
│   │   ├── environment/            # Shared environment systems
│   │   │   ├── Sky.tsx             # Sky shader or HDRI
│   │   │   ├── Lighting.tsx        # Zone-aware lighting rig
│   │   │   ├── Water.tsx           # Ocean plane shader
│   │   │   ├── Fog.tsx             # Distance fog + zone-specific fog
│   │   │   └── PostProcessing.tsx  # Bloom, tone mapping (quality-gated)
│   │   │
│   │   ├── zones/                  # Zone scene components
│   │   │   ├── ZoneShell.tsx       # Generic zone wrapper (loading, bounds, LOD)
│   │   │   ├── shore/
│   │   │   │   ├── ShoreZone.tsx
│   │   │   │   ├── GateOfNames.tsx
│   │   │   │   └── shoreConfig.ts
│   │   │   ├── forum/
│   │   │   │   ├── ForumZone.tsx
│   │   │   │   ├── SystemTable.tsx
│   │   │   │   ├── CodexPillars.tsx
│   │   │   │   └── forumConfig.ts
│   │   │   ├── agora/
│   │   │   │   └── ...
│   │   │   ├── atelier/
│   │   │   │   ├── AtelierZone.tsx
│   │   │   │   ├── MasterWorkbench.tsx
│   │   │   │   ├── DisciplineWall.tsx
│   │   │   │   ├── WindowOfLight.tsx
│   │   │   │   └── atelierConfig.ts
│   │   │   ├── amphitheatre/
│   │   │   │   └── ...
│   │   │   ├── sanctuary/
│   │   │   │   └── ...
│   │   │   ├── temple/
│   │   │   │   └── ...
│   │   │   └── beacon/
│   │   │       └── ...
│   │   │
│   │   └── materials/              # Shared material library
│   │       ├── MarbleMaterial.ts
│   │       ├── BronzeMaterial.ts
│   │       ├── SandstoneMaterial.ts
│   │       ├── WoodMaterial.ts
│   │       ├── InteractiveGlow.ts
│   │       └── materialLibrary.ts  # Registry + proxy color fallbacks
│   │
│   ├── stores/                     # Zustand state stores
│   │   ├── useExperienceStore.ts   # Global experience state
│   │   ├── useZoneStore.ts         # Zone lifecycle state
│   │   ├── useCameraStore.ts       # Camera mode + position state
│   │   ├── useOverlayStore.ts      # Active overlay state
│   │   ├── useAudioStore.ts        # Audio enabled, volume, current zone audio
│   │   ├── useQualityStore.ts      # Performance tier, feature flags
│   │   └── useInputStore.ts        # Input state (scroll progress, pointer position)
│   │
│   ├── data/                       # Static content data
│   │   ├── projects.ts             # Project portfolio entries
│   │   ├── services.ts             # Service offerings
│   │   ├── zones.ts                # Zone metadata for SSG pages
│   │   └── seo.ts                  # Shared metadata config
│   │
│   ├── hooks/                      # Shared React hooks
│   │   ├── useMediaQuery.ts        # Responsive breakpoint detection
│   │   ├── useReducedMotion.ts     # prefers-reduced-motion detection
│   │   ├── useDeviceCapability.ts  # WebGL support, GPU tier, memory
│   │   └── useScrollProgress.ts    # Normalized scroll position [0,1]
│   │
│   ├── lib/                        # Utility functions
│   │   ├── math.ts                 # Lerp, clamp, remap, easing functions
│   │   ├── three-utils.ts          # Three.js helper functions
│   │   ├── analytics.ts            # Analytics event helpers
│   │   └── constants.ts            # Global constants, breakpoints, durations
│   │
│   └── types/                      # TypeScript type definitions
│       ├── experience.ts           # Experience, zone, camera types
│       ├── content.ts              # Project, service, overlay types
│       ├── manifest.ts             # Asset manifest types
│       └── events.ts               # Interaction and analytics event types
│
├── scripts/                        # Build and asset tooling
│   ├── optimize-assets.ts          # gltf-transform batch processing
│   ├── validate-manifest.ts        # Manifest integrity checker
│   └── generate-sitemap.ts         # Sitemap generation (if not using next-sitemap)
│
├── tests/                          # Test files
│   ├── unit/
│   │   ├── stores/                 # Zustand store tests
│   │   ├── core/                   # Core subsystem tests
│   │   └── lib/                    # Utility function tests
│   ├── integration/
│   │   └── zones/                  # Zone loading integration tests
│   └── e2e/
│       └── navigation.spec.ts      # Playwright E2E tests
│
├── .env.local                      # Environment variables (email API keys)
├── .env.example                    # Template for env vars
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
├── vitest.config.ts                # Unit/integration test config
├── playwright.config.ts            # E2E test config
└── package.json
```

---

## 2. Subsystem List

The architecture separates concerns into **three layers** and **fourteen subsystems**.

### Layer 1: App Shell (Next.js / React)

Responsible for routing, SSR/SSG, metadata, semantic HTML, 2D UI, overlays, and mobile experience.

| Subsystem | Responsibility | Runs on server? |
|-----------|---------------|----------------|
| **Router** | Next.js App Router — file-based routes, metadata generation | Yes (SSG/SSR) |
| **UI Components** | 2D React components — overlays, HUD, forms, navigation | Client only |
| **Mobile Experience** | Scroll-driven 2D experience for < 1024px | Client only |
| **API Routes** | Contact form handler | Edge/serverless |

### Layer 2: Experience Engine (Three.js / R3F)

Responsible for 3D rendering, camera, interaction, world management. Loaded dynamically,
never runs on the server. Follows game-engine patterns internally.

| Subsystem | Responsibility | Pure TS or R3F? |
|-----------|---------------|----------------|
| **Ticker** | requestAnimationFrame loop, delta time, pause/resume | Pure TS |
| **Camera Manager** | Camera mode switching, controller delegation | Pure TS + R3F bridge |
| **Input Manager** | Unified pointer, keyboard, scroll, touch abstraction | Pure TS |
| **World Manager** | Island-level scene orchestrator | Pure TS + R3F bridge |
| **Zone Manager** | Zone lifecycle: load, activate, deactivate, unload | Pure TS + R3F bridge |
| **Interaction System** | Raycasting, hover detection, click dispatch | R3F |
| **Quality Manager** | GPU tier detection, auto-degrade, feature flags | Pure TS |
| **Audio Manager** | Web Audio API, per-zone ambient, crossfade | Pure TS |

### Layer 3: State (Zustand)

Shared reactive state accessible by both Layer 1 and Layer 2.

| Store | What it holds |
|-------|-------------|
| **ExperienceStore** | Global mode (story/explore/detail), initialization state, error state |
| **ZoneStore** | Active zone, loaded zones, zone transition state |
| **CameraStore** | Active camera controller, position, target, FOV, story scroll progress |
| **OverlayStore** | Active overlay (null or overlay ID), overlay data payload |
| **AudioStore** | Audio enabled flag, master volume, current zone audio ID |
| **QualityStore** | Performance tier (high/medium/low), feature flags (shadows, postfx, LOD distances) |
| **InputStore** | Normalized scroll progress, pointer screen position, active input device |

### Cross-Cutting Concerns

| Concern | Implementation |
|---------|---------------|
| **Analytics** | Thin wrapper around Vercel Analytics or custom. Fire on: zone enter, interaction click, overlay open, CTA click, mode switch. Non-blocking. |
| **Dev Tools** | Conditional import (`process.env.NODE_ENV === 'development'`). Shows: FPS, draw calls, triangle count, active zone, camera position, store state. Toggled via keyboard shortcut. |
| **Reduced Motion** | `useReducedMotion()` hook reads `prefers-reduced-motion`. When active: disable camera animation (instant cuts), disable parallax, disable particle-like effects, reduce zone transitions to fades. |

---

## 3. State Model

### ExperienceStore

```typescript
interface ExperienceState {
  // Lifecycle
  status: 'idle' | 'loading' | 'ready' | 'error'
  loadProgress: number                    // 0-1, aggregate loading progress
  error: string | null

  // Mode
  mode: 'story' | 'explore' | 'detail'
  previousMode: 'story' | 'explore' | null  // for returning from detail mode
  storyCompleted: boolean                   // persisted to localStorage
  exploreUnlocked: boolean                  // derived from storyCompleted or return visit

  // Actions
  setStatus: (status: ExperienceState['status']) => void
  setMode: (mode: ExperienceState['mode']) => void
  openDetail: () => void                   // transitions to detail mode, stores previous
  closeDetail: () => void                  // returns to previous mode
  completeStory: () => void                // sets storyCompleted, unlocks explore
}
```

### ZoneStore

```typescript
interface ZoneState {
  // Zone lifecycle
  activeZone: ZoneId | null               // currently focused zone
  loadedZones: Set<ZoneId>                // zones with geometry in scene
  transitioning: boolean                  // true during zone-to-zone transition
  transitionProgress: number              // 0-1 during transitions

  // Zone registry (static metadata)
  zones: Record<ZoneId, ZoneMetadata>

  // Actions
  setActiveZone: (id: ZoneId) => void
  addLoadedZone: (id: ZoneId) => void
  removeLoadedZone: (id: ZoneId) => void
  beginTransition: () => void
  endTransition: () => void
}

type ZoneId =
  | 'shore' | 'forum' | 'agora' | 'atelier'
  | 'amphitheatre' | 'sanctuary' | 'temple' | 'beacon'

interface ZoneMetadata {
  id: ZoneId
  name: string                            // Display name
  scrollStart: number                     // Normalized scroll position [0,1] where zone begins
  scrollEnd: number                       // Where zone ends
  position: [number, number, number]      // World-space center position
  radius: number                          // Bounding sphere radius for loading decisions
  adjacentZones: ZoneId[]                 // For preloading
  mvp: boolean                            // True if in MVP build
}
```

### CameraStore

```typescript
interface CameraState {
  // Controller state
  activeController: 'story' | 'explore' | 'detail'
  
  // Story mode
  scrollProgress: number                  // Normalized [0,1] — drives Story camera
  
  // Camera transform (read by debug tools, analytics)
  position: [number, number, number]
  target: [number, number, number]
  fov: number
  
  // Actions
  setActiveController: (c: CameraState['activeController']) => void
  setScrollProgress: (p: number) => void
  updateTransform: (pos: [number, number, number], target: [number, number, number], fov: number) => void
}
```

### OverlayStore

```typescript
interface OverlayState {
  // Active overlay
  activeOverlay: OverlayId | null
  overlayData: Record<string, unknown> | null  // payload for the active overlay

  // Actions
  openOverlay: (id: OverlayId, data?: Record<string, unknown>) => void
  closeOverlay: () => void
}

type OverlayId =
  | 'project' | 'about' | 'service' | 'gallery'
  | 'music' | 'film' | 'contact' | 'welcome'
```

### QualityStore

```typescript
interface QualityState {
  tier: 'high' | 'medium' | 'low'
  
  // Feature flags derived from tier
  shadows: boolean
  postProcessing: boolean
  reflections: boolean
  particleDust: boolean
  lodBias: number                         // multiplier on LOD distances
  maxTextureSize: 512 | 1024 | 2048
  targetFPS: 30 | 60

  // Actions
  setTier: (tier: QualityState['tier']) => void
  autoDegrade: () => void                 // drops one tier
  autoUpgrade: () => void                 // raises one tier (if sustained good perf)
}
```

---

## 4. Mode Model: Story / Explore / Detail

### Mode Transition Diagram

```
                    ┌──────────────────┐
                    │                  │
       ┌───────────▶   STORY MODE     ◀───────────┐
       │            │  (default)       │            │
       │            └────────┬─────────┘            │
       │                     │                      │
       │         toggle      │    click              │ close
       │         button      │  interactive          │ overlay
       │                     │    object              │
       │            ┌────────▼─────────┐            │
       │            │                  │            │
       └────────────   EXPLORE MODE    ├────────────┘
                    │                  │            │
                    └────────┬─────────┘            │
                             │                      │
                  click      │                      │
               interactive   │                      │
                  object     │                      │
                             │                      │
                    ┌────────▼─────────┐            │
                    │                  │            │
                    │   DETAIL MODE    ├────────────┘
                    │                  │
                    └──────────────────┘
```

### Mode Behaviors

| Behavior | Story Mode | Explore Mode | Detail Mode |
|----------|-----------|-------------|-------------|
| Camera control | Scroll-driven path (GSAP) | Free orbit (constrained) | Focused on object, pull-back |
| Scroll input | Drives camera forward/backward along path | Disabled (free movement) | Disabled |
| WASD/arrow keys | Disabled | Moves orbit center | Disabled |
| Mouse drag | Disabled | Orbits camera | Disabled |
| Click on interactive | Opens overlay → Detail Mode | Opens overlay → Detail Mode | N/A (overlay already open) |
| Hover on interactive | Visual feedback (glow, scale) | Visual feedback | Disabled |
| Raycasting | Active | Active | Disabled |
| Zone transitions | Automatic via scroll | Manual via movement | Frozen |
| HUD visible | Yes (progress bar, zone label) | Yes (zone label, mini-map) | Dimmed |
| Overlay visible | No (until interaction) | No (until interaction) | Yes |
| Audio | Zone ambient plays | Zone ambient plays | Zone ambient quiets |

### Mode Entry Conditions

| Transition | Condition |
|-----------|-----------|
| → Story | Default on first visit; toggle from Explore |
| → Explore | Toggle button (if unlocked); auto-unlock after story completion or return visit |
| → Detail | Click an interactive object in Story or Explore mode |
| Story → Detail | `previousMode = 'story'`, camera transitions to detail position |
| Explore → Detail | `previousMode = 'explore'`, camera transitions to detail position |
| Detail → previous | Close overlay (ESC, click outside, close button), camera returns |

---

## 5. App Initialization Flow

```
Browser loads page
  │
  ▼
Next.js SSR/SSG renders HTML
  │  • Semantic content: name, tagline, services, projects (visible, indexable)
  │  • Loading screen component (visible until 3D ready)
  │  • <div id="experience-root"> placeholder
  │
  ▼
React hydration
  │  • Zustand stores initialize with defaults
  │  • useMediaQuery determines mobile/desktop
  │  • useReducedMotion reads OS preference
  │  • useDeviceCapability detects WebGL support, GPU tier
  │
  ├── Mobile (< 1024px) OR no WebGL OR reduced-motion: force ──────┐
  │                                                                 │
  │                                                            ┌────▼─────────┐
  │                                                            │   Mobile     │
  │                                                            │  Experience  │
  │                                                            │  (scroll 2D) │
  │                                                            └──────────────┘
  │
  ▼ Desktop with WebGL
Dynamic import: ExperienceLoader
  │  • next/dynamic(() => import('./Experience'), { ssr: false })
  │  • Shows loading screen during chunk download
  │
  ▼
Experience.tsx mounts
  │  • <Canvas> creates WebGL context
  │  • QualityManager runs GPU benchmark (1-2 frames)
  │  • Sets initial quality tier in QualityStore
  │
  ▼
Core subsystems initialize (order matters)
  │  1. Clock.init()
  │  2. Ticker.init() — starts RAF loop
  │  3. InputManager.init() — binds event listeners
  │  4. AudioManager.init() — creates AudioContext (suspended until user gesture)
  │  5. CameraManager.init() — creates camera, sets initial controller (Story)
  │  6. WorldManager.init() — loads zone registry
  │  7. QualityManager.start() — begins FPS monitoring
  │
  ▼
Zone loading begins
  │  • ZoneManager.loadZone('shore') — first zone (landing)
  │  • ZoneManager.preloadZone('forum') — next in story path
  │  • If benchmark zone: ZoneManager.loadZone('atelier') instead
  │
  ▼
First zone ready
  │  • ExperienceStore.setStatus('ready')
  │  • Loading screen fades out
  │  • Story Mode begins — scroll is active
  │  • Analytics: fire 'experience_loaded' event with quality tier + load time
  │
  ▼
Experience running
  │  • Ticker calls update() every frame
  │  • Camera, zones, interactions update each tick
  │  • FPS monitored — auto-degrade if sustained < 30fps for 3s
```

### Shutdown / Cleanup

When the user navigates away (Next.js route change) or the component unmounts:

1. Ticker.stop()
2. AudioManager.dispose()
3. InputManager.dispose()
4. All zone geometries, textures, materials disposed via Three.js
5. WebGL context released
6. Zustand stores reset to defaults

---

## 6. Zone Loading / Unloading Flow

### Zone Lifecycle States

```
UNLOADED ──load()──▶ LOADING ──ready──▶ LOADED ──activate()──▶ ACTIVE
    ▲                                      │                      │
    │                                      │         deactivate() │
    └────────unload()──────────────────────┘◀──────────────────────┘
```

### Loading Strategy

| Zone state | What's in memory | What's rendered |
|-----------|-----------------|----------------|
| UNLOADED | Nothing | Nothing (or distant LOD shell) |
| LOADING | Assets downloading, geometry building | Loading placeholder or nothing |
| LOADED | Full geometry + materials in memory | Rendered but camera not focused |
| ACTIVE | Full geometry + materials + interactions enabled | Rendered + interactive + audio playing |

### Zone Loading Rules

1. **Active zone** — always ACTIVE. Full geometry, interactions enabled, zone audio playing.
2. **Adjacent zones** (1 hop in story path) — always LOADED. Visible in the distance, preloaded for smooth transitions.
3. **Non-adjacent zones** — UNLOADED. Freed from memory. Optionally represented by a low-poly silhouette or bounding box.
4. **Exception: Beacon** — the Beacon's light emissive is always rendered regardless of zone state (wayfinding element visible from everywhere).

### Zone Transition Sequence (Story Mode)

```
User scrolls past zone boundary (scrollProgress crosses zone.scrollEnd)
  │
  ▼
ZoneManager detects transition
  │  • ZoneStore.beginTransition()
  │  • ZoneStore.setActiveZone(nextZone)
  │
  ▼
Camera transitions
  │  • CameraManager blends to next zone's camera path segment
  │  • Duration: 1-2 seconds (ease-in-out)
  │
  ▼
Audio crossfade
  │  • AudioManager.crossfade(currentZoneAudio, nextZoneAudio, 3000ms)
  │
  ▼
Zone geometry swap
  │  • Activate next zone (enable interactions)
  │  • Start preloading the zone after next
  │  • Deactivate previous-previous zone (disable interactions)
  │  • Unload zones 2+ hops behind (free memory)
  │
  ▼
Transition complete
  │  • ZoneStore.endTransition()
  │  • Analytics: fire 'zone_enter' event
```

### Zone Transition Sequence (Explore Mode)

```
User moves camera/avatar near zone boundary
  │
  ▼
WorldManager detects proximity
  │  • Calculate distance from camera to each zone center
  │  • If camera within zone.radius: activate that zone
  │
  ▼
Same swap logic as Story Mode (audio crossfade, preload adjacent, unload distant)
```

### Memory Management

| Budget | Value |
|--------|-------|
| Max zones loaded simultaneously | 3 (active + 2 adjacent) |
| Max geometry in memory | ~100K triangles (3 zones × ~33K average) |
| Max textures in memory | ~8MB (3 zones × ~2.5MB average) |
| Disposal method | Three.js `geometry.dispose()`, `material.dispose()`, `texture.dispose()` |
| Disposal trigger | Zone moves to UNLOADED state |

---

## 7. Tech Decisions and Rationale

### Decision 1: Game-Engine Core in Pure TypeScript, Not Pure R3F

**Choice:** Core subsystems (Ticker, CameraManager, InputManager, etc.) are plain
TypeScript classes, not React components. R3F components act as thin bridges.

**Why:**
- Game-loop systems need per-frame updates at 60fps. React's render cycle is too slow
  and unpredictable for this.
- Zustand bridges the gap: core TS writes to Zustand stores, R3F reads from them reactively.
- This makes the core testable without React/Three.js — pure unit tests.
- If R3F is ever replaced (unlikely but possible), the core logic survives.

**Trade-off:** More boilerplate to bridge TS classes ↔ R3F components. Worth it for
testability and performance.

### Decision 2: Zustand Over R3F `useFrame` State

**Choice:** All shared state lives in Zustand stores, not in `useRef` or `useFrame`
closures.

**Why:**
- Both the 2D UI layer (overlays, HUD) and the 3D layer need to read the same state.
- Zustand subscriptions are more predictable than React context for high-frequency updates.
- Zustand's `subscribe` with `selector` avoids re-renders when unrelated state changes.
- DevTools can inspect all stores in one place.

**Trade-off:** Per-frame camera position updates written to Zustand could cause
unnecessary re-renders. Mitigated by using `transient updates` (Zustand's
`subscribe` without `set`, or `useStore.getState()` in the render loop).

### Decision 3: GSAP + Lenis for Scroll, Not Native ScrollTrigger Alone

**Choice:** Lenis provides smooth scroll normalization; GSAP ScrollTrigger drives
3D camera animation.

**Why:**
- Native scroll is jittery on many browsers, especially with heavy 3D rendering.
- Lenis normalizes scroll across devices and provides a smooth, predictable scroll
  position that GSAP can drive from.
- GSAP ScrollTrigger is the industry standard for scroll-driven animation. Its timeline
  API maps directly to camera keyframes.

**Trade-off:** Additional dependency weight (~30KB gzipped for GSAP+ScrollTrigger,
~5KB for Lenis). Worth it for the quality of scroll-to-camera sync.

### Decision 4: Zone-Based Code Splitting via Dynamic Imports

**Choice:** Each zone is a separate dynamic import chunk.

**Why:**
- The initial bundle only includes the shell + first zone. Subsequent zones load on
  demand.
- Reduces initial JS payload significantly (8 zones × ~20KB each = ~160KB saved).
- Aligns with the zone lifecycle (UNLOADED zones don't need their JS in memory).

**Implementation:**
```typescript
// ZoneLoader.ts
const zoneImports: Record<ZoneId, () => Promise<ZoneModule>> = {
  shore: () => import('../zones/shore/ShoreZone'),
  forum: () => import('../zones/forum/ForumZone'),
  atelier: () => import('../zones/atelier/AtelierZone'),
  // ...
}
```

**Trade-off:** Small delay on first zone load during transitions. Mitigated by preloading
adjacent zones during idle time.

### Decision 5: Manifest-Driven Asset Loading (Not Hardcoded Paths)

**Choice:** All 3D assets are referenced by ID, resolved through `manifest.json`.
See ASSET-PIPELINE.md §10.

**Why:**
- Proxy assets (primitives) and final assets (.glb files) are swappable without code changes.
- Budget validation can run against the manifest at build time.
- Asset status tracking (proxy/wip/final) is visible in one file.

**Trade-off:** Extra indirection layer. One more file to maintain. Worth it for the
proxy-first workflow.

### Decision 6: Separate Quality Tiers, Not Continuous Scaling

**Choice:** Three discrete quality tiers (high/medium/low) with defined feature sets,
not a continuous slider.

**Why:**
- Continuous scaling is harder to test — infinite configurations.
- Three tiers mean three testable states.
- Auto-degrade drops one tier at a time, which is predictable.
- Users can also manually select a tier in settings.

| Feature | High | Medium | Low |
|---------|------|--------|-----|
| Shadows | PCF soft | Basic shadow map | Off |
| Post-processing | Bloom + tone mapping | Tone mapping only | Off |
| LOD bias | 1.0× | 1.5× (switch to simpler LOD sooner) | 2.0× |
| Max texture size | 2048 | 1024 | 512 |
| Reflections | SSR or cube map | Cube map | Off |
| Target FPS | 60 | 60 | 30 |
| Particle dust | On (if ever added) | Off | Off |

### Decision 7: Audio as Opt-In, Web Audio API, Not `<audio>` Elements

**Choice:** Web Audio API for spatial/ambient audio, user must opt in.

**Why:**
- Browser autoplay policies block `<audio>` autoplay. Web Audio API with user gesture
  is the reliable path.
- Web Audio API supports crossfading, spatial positioning, and volume control natively.
- Opt-in avoids annoying users and respects accessibility preferences.

**Implementation:**
- AudioContext created but suspended on page load.
- First user interaction (click/scroll) resumes the AudioContext.
- Audio toggle in HUD controls master volume (including mute).
- Each zone has an ambient audio source that crossfades on zone transitions.

---

## 8. Risks and Trade-offs

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| A1 | R3F + Next.js App Router hydration conflict | Medium | High | All R3F behind `dynamic(import, { ssr: false })`. Test SSR build in CI early. Hydration mismatch should be impossible if the Canvas never renders server-side. |
| A2 | Zustand transient updates cause re-render storms | Medium | Medium | Use `useStore.getState()` for per-frame reads in the game loop. Only `set()` for state changes that need to trigger React re-renders (mode changes, overlay open/close). |
| A3 | Zone loading stalls during transitions (janky pause) | Medium | High | Preload adjacent zones during idle time. Show a subtle transition indicator if loading takes > 500ms. Never block the render loop. |
| A4 | GSAP bundle size bloats initial load | Low | Medium | Tree-shake: import only `gsap`, `ScrollTrigger`, `ScrollSmoother` — not the full GSAP suite. Lazy-load via dynamic import if needed. |
| A5 | InputManager conflicts with native browser scroll | Medium | Medium | Lenis owns scroll. InputManager reads from Lenis's scroll position, never from `window.scrollY` directly. Prevent double-handling. |
| A6 | WebGL context lost on mobile/low-memory devices | Low | High | Listen for `webglcontextlost` event. Show fallback message. Do not attempt to recreate context automatically (causes crashes on some devices). |
| A7 | Audio crossfade creates audible pops/glitches | Medium | Low | Use gain node ramp (`linearRampToValueAtTime`) for crossfades, not abrupt volume changes. Test across browsers. |
| A8 | Zone code splitting creates too many chunks | Low | Low | Webpack/Turbopack chunk analysis in CI. If total chunk count > 50, investigate shared chunk extraction. |
| A9 | DevTools bundle included in production | Low | Medium | Gate all dev tool imports behind `process.env.NODE_ENV === 'development'`. Verify via bundle analysis. |
| A10 | Reduced-motion users get a broken experience | Medium | High | Reduced-motion mode is a first-class path: instant camera cuts, no parallax, no animated transitions, full content still accessible via overlays and navigation menu. Test as a distinct user journey. |

---

## 9. What This Architecture Does NOT Cover

These are explicitly deferred and will be addressed in later steps:

1. **Specific GSAP timeline keyframes** — defined per-zone in zone config files, not in this architecture doc.
2. **Specific Three.js shader code** — material implementations are in the materials/ directory, detailed in ART-DIRECTION.md.
3. **Content data schemas** — project entries, service descriptions, etc. are in data/ files, designed when content is ready.
4. **CI/CD pipeline** — Vercel deployment config, GitHub Actions, testing pipelines.
5. **Internationalization** — not in v1 scope.
6. **CMS integration** — not in v1 scope.
7. **Explore Mode free-camera constraints** — detailed when Explore Mode is built (v2).

---

## Status Report

| Category | Details |
|----------|---------|
| **Fully implemented** | Folder structure, 14-subsystem architecture, 7 Zustand store schemas, 3-mode state machine, initialization flow, zone lifecycle with loading/unloading, 7 tech decisions with rationale, 10 identified risks |
| **Placeholder** | None — this is a design document |
| **Not implemented** | All code, all subsystem implementations, all tests, CI/CD, deployment config |
| **Must verify manually** | (1) R3F + Next.js 14 App Router hydration works with `dynamic` imports; (2) GSAP + Lenis scroll sync is smooth in practice; (3) Zustand transient updates don't cause re-render storms in R3F; (4) Zone code splitting produces reasonable chunk sizes; (5) WebGL context stability on target mobile devices |
