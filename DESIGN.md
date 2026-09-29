# Island of Memory — Portfolio Design Document

**Project:** port-2026
**Owner:** Han (full-stack developer, AI filmmaker, musician, creative technologist)
**Date:** 2026-09-26
**Revised:** 2026-09-26 — Next.js migration, proxy-first 3D strategy
**Status:** Design phase — no code yet

---

## 1. Project Summary

"Island of Memory" is a production 3D portfolio website for a multidisciplinary creator
spanning software engineering, AI filmmaking, music, performance art, and visual
storytelling. The site is a navigable island divided into symbolic biomes, each
representing a domain of work. On desktop, users explore a semi-open 3D world with a
controlled camera path and optional free exploration. On mobile, the same narrative
unfolds as a story-driven scroll with reduced 3D complexity. Every biome leads to real
work samples and a clear service offering. The site must convert visitors into clients,
not just impress them.

**v1 approach:** No final 3D assets exist yet. The project adopts a proxy-first strategy
— build the full technical pipeline and one benchmark zone with blockout geometry, then
iteratively replace proxies with final assets. This prevents the asset bottleneck from
blocking engineering progress.

---

## 2. Target Audience

| Segment | Who | What they want | How they arrive |
|---------|-----|---------------|----------------|
| Tech clients | CTOs, PMs, founders | Full-stack dev, apps, CRM, systems | LinkedIn, GitHub, direct link |
| Creative clients | Film producers, labels, media | AI 3D films, music, creative direction | Social media, portfolio shares |
| Agency/brand buyers | Marketing directors, brand managers | Premium web, digital experiences | Referral, Behance, Dribbble |
| Hiring/collaborators | Recruiters, co-founders | Skill verification, culture fit | Job boards, LinkedIn |
| Curious peers | Devs, 3D artists, technologists | Inspiration, networking | Twitter/X, dev communities |

**Primary conversion:** Tech clients, creative clients, agency buyers.
**Secondary:** Collaborators, peers (reputation/network).

---

## 3. Business Goals

1. Service clarity in < 30 seconds
2. Lead generation — every path terminates at contact/inquiry
3. Multi-industry credibility — each discipline presented professionally
4. Differentiation — the site itself is a portfolio piece
5. Return visits — content depth (case studies, process breakdowns)
6. SEO-viable — critical content indexable as real HTML

---

## 4. Artistic Direction: "Ancient Future"

Classical Mediterranean/Egyptian aesthetics colliding with digital technology and
tropical Vietnamese warmth.

### Visual Layers

- **Architecture:** Marble, broken pediments, weathered stone — with digital artifacts,
  glitch textures, holographic overlays
- **Color palette:** Warm stone (travertine, sandstone), deep sea teal, oxidized copper
  green, gold leaf accent, Vietnamese sunset coral. Black for UI.
- **Typography:** Serif/transitional for headings (classical), geometric sans for body
  (technical). No script fonts.
- **Materials:** PBR — marble with SSS, aged bronze, volcanic rock, tropical wood, water
  with caustics
- **Lighting:** Golden hour dominant. Volumetric fog (Egyptian biome). Dappled tropical
  light (Vietnamese biome). Cool blue tech light (dev biome).
- **Atmosphere:** Mediterranean warmth + mystery. Not dark/gritty. Not sterile.
- **Animation:** Weighty, deliberate camera. Manga influence = dynamic composition and
  reveals, not anime characters.
- **Sound:** Optional ambient per biome. User-initiated. Subtle.

### What This Is NOT

- Not neon cyberpunk
- Not flat minimalist
- Not "dark mode + particles.js"
- Not a game (no health bars, enemies, scores)
- Not a museum walkthrough (must have narrative pull)

---

## 5. UX Principles

1. **Guided freedom** — suggested path, optional deviation
2. **30-second value** — who, what, one impressive piece immediately
3. **Progressive disclosure** — 3D wrapper, 2D detail overlays
4. **Performance is a feature** — 60fps or degrade gracefully
5. **Content before spectacle** — every 3D element serves the narrative
6. **Accessibility floor** — all content reachable without 3D
7. **Mobile is not an afterthought** — purpose-built scroll experience
8. **Contact is ambient** — always reachable, never intrusive
9. **Loading as experience** — crafted loading state, not a spinner
10. **No mystery meat navigation** — always know where you are

---

## 6. Zone Architecture (v1: 8 zones)

Full zone definitions, symbolic/business meanings, and interaction specs in **WORLD-MAP.md**.

| Zone | Theme | Business content | Visual Signature |
|------|-------|-----------------|-----------------|
| Shore of Arrival | First contact | Landing page, value prop | Sandy beach, stone steps, half-buried columns |
| Forum of Systems | Technical mastery | Web/app/CRM/systems portfolio | Stone forum, circuit-traced mosaic, Codex Pillars |
| Agora of Growth | Business impact | Services, strategy, growth | Colonnade market, Growth Fountain |
| Renaissance Atelier | Creative core | Personal brand, philosophy, about | Marble workshop, golden light, Master's Workbench |
| Amphitheatre of Sound | Performance art | Music, singing, stage, audio | Hillside amphitheatre, luminous stage, Echo Wall |
| Dino Sanctuary | Imagination preserve | AI films, world-building, storytelling | Lush grotto, Fossil Arch, bioluminescent pool |
| Temple of Journeys | Experience archive | Photography, travel, culture | Open-air temple, Horizon Terrace, lantern path |
| Beacon of Contact | Signal and invitation | Contact, inquiry, conversion | Summit tower, luminous beacon, 360° view |

**Story Mode flow:** Shore → Forum → Agora → Atelier → Amphitheatre → Sanctuary → Temple → Beacon

**Build order:** Atelier first (benchmark zone) → MVP: Shore + Forum + Atelier + Beacon → v1.5: Agora + Amphitheatre → v2: Sanctuary + Temple + Explore Mode

**Art direction:** All zones follow the locked visual language in **ART-DIRECTION.md**.

---

## 7. Technology Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js 14+ (App Router) + TypeScript** | SSR/SSG for SEO, file-based routing, API routes for forms, image optimization, Vercel-native deployment |
| 3D Engine | Three.js via React Three Fiber | Production-proven R3F ecosystem, direct React integration |
| 3D Helpers | Drei, three-stdlib | Camera controls, loaders, post-processing abstractions |
| Scroll | GSAP ScrollTrigger + Lenis | Smooth scroll with timeline-driven 3D camera animation |
| Styling | Tailwind CSS 4 | Utility-first, responsive, fast iteration |
| State | Zustand | Lightweight, R3F-native, no boilerplate |
| UI Animation | Framer Motion | Page transitions, overlay animations, 2D polish |
| Deploy | **Vercel** (primary) | Native Next.js support, edge functions, analytics, ISR |
| Assets | glTF/GLB (Draco-compressed), WebP/AVIF textures | Standard web 3D format, maximum compression |
| Package manager | pnpm | Fast, disk-efficient, strict dependency resolution |

### Next.js-Specific Architecture Notes

Full technical architecture, subsystem specs, state model, and initialization flow
in **ARCHITECTURE.md**.

- **App Router** with route groups: `(marketing)` for SEO pages, `(experience)` for 3D shell
- **Dynamic imports** for all R3F components (`next/dynamic` with `ssr: false`) — Three.js must not run server-side
- **Static generation** for project pages, service pages, contact — these are pure HTML+CSS
- **Client boundary** clearly drawn: `<Canvas>` and everything inside it is `'use client'`
- **Image optimization** via `next/image` for all 2D assets (project screenshots, photos)
- **API routes** for contact form submission (no external form service needed)
- **Metadata API** for per-route Open Graph, Twitter Cards, JSON-LD

---

## 8. Mobile Strategy

- No WebGL requirement — scroll-driven story with CSS 3D transforms, lightweight
  canvas, full-bleed imagery
- Same content, different spatial container
- Breakpoint: < 1024px = mobile/tablet, >= 1024px = full 3D

---

## 9. Performance Budget

| Metric | Target |
|--------|--------|
| FCP | < 2s on 4G |
| Total 3D assets (all zones) | < 15MB (streamed, Draco-compressed) |
| Benchmark zone assets (final) | < 3MB |
| Benchmark zone assets (proxy) | < 500KB |
| Critical JS (initial route) | < 200KB gzipped |
| R3F bundle (dynamic import) | < 150KB gzipped |
| Desktop mid-range FPS | 60fps |
| Desktop low-end FPS | 30fps + auto-degrade |
| Lighthouse performance | > 80 (SSG pages), > 60 (3D experience) |

---

## 10. SEO Strategy

- **Next.js SSG/SSR** renders full HTML for every route — no client-only rendering for content pages
- 3D canvas loads as progressive enhancement layer on top of static HTML
- Dedicated URL per project/service via App Router file-based routing
- `generateMetadata()` for per-route Open Graph + Twitter Card meta
- JSON-LD structured data (Person, CreativeWork, Service) via Next.js `<script>` injection
- `next-sitemap` for automatic sitemap generation
- `robots.txt` via Next.js middleware or static file
- Full content IA, route map, service/project taxonomies, and CTA strategy in **CONTENT-IA.md**

---

## 11. Risks

| ID | Risk | Likelihood | Impact | Status |
|----|------|-----------|--------|--------|
| R1 | 3D asset creation bottleneck | High | High | **Mitigated** — proxy-first strategy adopted; engineering proceeds with blockout geometry; final assets replace proxies without code changes |
| R2 | Scroll-to-camera sync jank | Medium | High | Mitigated (GSAP+Lenis) |
| R3 | Mobile feels lesser | Medium | High | Mitigated (independent design) |
| R4 | Scope creep into game | Medium | Medium | Mitigated (strict v1 scope) |
| R5 | Weak copy/narrative | High | High | Open |
| R6 | Browser compat (WebGL2) | Low | Medium | R3F handles; need Safari QA |
| R7 | A11y complaints | Low | Medium | Mitigated (fallback nav) |
| R8 | Proxy assets shipped as final | Medium | High | Mitigated — benchmark zone defines quality bar; proxy→final replacement tracked per-asset in manifest |
| R9 | Next.js + R3F hydration issues | Medium | Medium | Mitigated — all R3F behind `dynamic(() => ..., { ssr: false })`; strict client boundary |
| R10 | Asset pipeline undefined, ad-hoc assets break perf budget | High | High | **Mitigated** — see ASSET-PIPELINE.md for full pipeline spec |

---

## 12. Assumptions

1. **No final 3D assets exist yet** — all v1 development uses proxy geometry (primitives, blockouts, procedural shapes)
2. 3D assets will be created iteratively by the owner using Blender, AI-assisted tools, or a combination — timeline unknown
3. No backend for v1 — contact form uses Next.js API route + email service (Resend, SendGrid, or similar)
4. Content/copy provided by owner — system scaffolds placeholders
5. Domain/hosting handled separately; Vercel is the deployment target
6. No CMS for v1 — content in code (TypeScript data files or MDX)
7. Audio is optional polish, not launch-blocking
8. Five biomes is v1 scope, but only one (The Atelier) is built to completion first
9. Analytics: Vercel Analytics (zero-config with Next.js)
10. R3F performance sufficient for this scope
11. Owner has access to Blender for eventual asset creation
12. AI-assisted 3D generation (Meshy, Tripo, Rodin, etc.) may supplement hand-modeled assets but requires manual cleanup

---

## 13. Remaining Debt (Pre-Code)

1. Copy/narrative script — not written
2. Brand identity — logo, favicon, color tokens, typography selections not finalized
3. Analytics/conversion plan — events, funnels not specified
4. Content inventory — project-to-biome mapping, formats not catalogued
5. ~~Asset pipeline — undefined~~ → resolved, see ASSET-PIPELINE.md
6. ~~3D asset strategy — undefined~~ → resolved, see sections 15-17 below

---

## 14. 3D Asset Strategy

### Approach: Proxy-First World Building

No final 3D assets exist. Rather than blocking on asset creation, the project builds the
complete technical pipeline (loading, rendering, interaction, camera, scroll, overlays)
using proxy assets, then replaces them incrementally.

### Asset Categories

| Category | Definition | Proxy state (v1) | Final state |
|----------|-----------|-----------------|-------------|
| **Terrain** | Ground plane, island shape, elevation | Flat plane with subdivisions + noise displacement shader | Sculpted heightmap mesh or terrain geometry |
| **Environment kit** | Modular pieces: walls, floors, columns, arches, stairs, platforms | Primitive boxes, cylinders, extruded shapes with placeholder materials | Modeled architectural elements with baked detail |
| **Hero landmarks** | One signature piece per biome (e.g., marble workbench in Atelier) | Composed primitives with basic PBR material | Custom-modeled focal piece with high-detail materials |
| **Decorative props** | Small items that add life: tools, scrolls, lanterns, plants | Omitted in proxy phase, or represented by simple icons/sprites | Modeled props, instanced where repeated |
| **Vegetation** | Trees, bushes, grass, flowers | Billboard sprites or flat planes with alpha textures | Instanced low-poly models or billboards with custom shaders |
| **Water** | Ocean, rivers, ponds | Flat plane with animated shader (reflection, distortion) | Custom water shader with caustics, foam, depth fog |
| **Sky** | Background environment | Gradient shader or HDRI environment map | Custom sky shader or painted skybox |
| **Interactive objects** | Clickable items that open project detail overlays | Glowing primitive with label | Themed object matching biome aesthetic |

### Modular Environment Kit Rules

- Every environment piece is a **separate glTF file**, not baked into one scene
- Pieces snap to a **2m grid** for consistent placement
- Each piece has **3 LOD levels**: full, simplified, billboard/invisible
- Pieces are **instanced** when repeated (R3F `<Instances>`)
- Kit pieces are **biome-agnostic where possible** — a column is a column; material/texture swaps create biome identity

### Replacement Strategy

1. Each asset has an entry in `public/assets/manifest.json` with fields: `id`, `category`, `biome`, `status` (proxy|wip|final), `file`, `polyBudget`, `textureBudget`
2. Replacing a proxy = drop new `.glb` file + update manifest status to `final`
3. Scene code references assets by `id`, not by filename — the loader resolves via manifest
4. Proxy→final replacement must not require code changes, only asset file + manifest update
5. CI/build step validates manifest integrity: no missing files, no budget overruns

---

## 15. Asset Pipeline v1

Full pipeline specification in **ASSET-PIPELINE.md** (separate document).

Summary:

- **DCC source:** Blender 4.x
- **Export:** glTF 2.0 binary (.glb) via Blender glTF exporter
- **Optimization:** Blender decimate modifier → gltf-transform optimize → Draco compression
- **Textures:** WebP, max 1024x1024 for props, 2048x2048 for hero landmarks, power-of-two
- **Loading:** `@react-three/drei` `useGLTF` with Draco decoder, wrapped in `Suspense` with loading UI
- **Next.js specifics:** all assets in `public/assets/`, loaded via absolute paths, no Webpack processing of .glb files

---

## 16. Benchmark Zone Strategy

Full benchmark zone brief in **BENCHMARK-ZONE.md** (separate document).

**Update (Step 7-9):** Shore of Arrival was built as the first prototype zone instead of
the Atelier. The Shore zone exercises: terrain, ocean shader, landmark (Gate of Names),
interactive objects (mode-choice orbs), ambient animation (waves, grass), lighting rig,
sky gradient, fog system, and camera definitions. Atelier zone also exists as a secondary
reference.

- **First zone built:** Shore of Arrival
- **Why changed:** Shore is the landing page — first impression matters most for conversion
- **Status:** Proxy geometry at 61fps. QA completed (Step 8). Refined (Step 9): sky gradient,
  fog depth, material contrast, ocean depth gradient, directional lighting.

---

## 17. Document Index

| Document | Purpose |
|----------|---------|
| DESIGN.md | Master design document (this file) |
| WORLD-MAP.md | World concept, 8 zone definitions, Story/Explore modes |
| ART-DIRECTION.md | Visual bible — palette, materials, lighting, camera, prohibitions |
| ARCHITECTURE.md | Technical architecture — subsystems, stores, init flow, zone lifecycle |
| ASSET-PIPELINE.md | 3D asset pipeline — Blender workflow, budgets, manifest system |
| BENCHMARK-ZONE.md | Benchmark zone production brief (originally Atelier) |
| CONTENT-IA.md | Information architecture — routes, services, projects, CTA, brief-builder |

---

## 18. Status

| Category | Details |
|----------|---------|
| **Design docs** | All 7 documents complete and cross-referenced |
| **Codebase** | Next.js 16 + TypeScript + R3F scaffold: 53 source files, 14 subsystems, 7 stores, 4 hooks |
| **Shore zone** | Proxy geometry prototype: ocean (vertex waves + depth gradient), beach terrain, 7 steps, Gate of Names (pillars, lintel, circuit traces, inscription), mode-choice orbs, buried columns, mooring stones, scattered rocks, coastal grass (wind animation), path inland (34m), beacon silhouette |
| **Atelier zone** | Proxy geometry: walls, columns, workbench, 2 interactive objects |
| **Environment** | Sky gradient sphere, linear fog, golden-hour directional lighting, sunset HDRI for reflections |
| **Routes** | `/` (landing + 3D), `/contact` (form), `/api/contact` (handler) |
| **Content data** | 8 services (Build/Grow/Create clusters), 4 placeholder projects |
| **Not implemented** | 6 remaining zones, scroll-driven camera, GSAP integration, mobile experience, real content/copy, tests, CI/CD, CMS, analytics, audio |
| **Verify manually** | Shore visual quality in browser, orb interaction, FPS, wave animation |
