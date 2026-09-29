# Benchmark Zone Production Brief — The Atelier

**Project:** port-2026 / Island of Memory
**Date:** 2026-09-26
**Status:** Production brief — not yet built
**Related:** DESIGN.md (main design doc), ASSET-PIPELINE.md (asset pipeline spec)

---

## 1. Zone Selection: The Atelier

### Why The Atelier First

| Reason | Explanation |
|--------|------------|
| **Spawn point** | Every visitor's first experience. If this zone fails, nothing else matters. |
| **Personal introduction** | Contains "who am I" content — the most universal entry point for all audience segments. |
| **Full system exercise** | Tests every technical system: 3D rendering, camera animation, scroll sync, interactive objects, 2D overlays, lighting, materials, performance monitoring, mobile fallback. |
| **Moderate complexity** | Renaissance workshop is architecturally regular (walls, columns, flat floor) — easier to proxy than organic environments like the Amphitheatre of Sound or Dino Sanctuary. |
| **Material library seed** | Marble and stone materials developed here are reusable across Forum, Agora, Amphitheatre, Sanctuary, Temple, and Beacon. |
| **Contained scope** | One room with clear boundaries. No open-world terrain, no water, no vegetation. |

### Why NOT Other Zones First

| Zone | Why not first |
|------|--------------|
| Forum of Systems | Geometric floor patterns and luminous circuit traces require art-direction lock |
| Agora of Growth | Colonnade + fountain geometry harder to proxy convincingly |
| Amphitheatre of Sound | Hillside carving requires terrain; harder to proxy |
| Dino Sanctuary | Dense vegetation, water, organic terrain — all hard to proxy |
| Temple of Journeys | Requires photography content + open-air ocean view |
| Beacon of Contact | Depends on summit terrain; simpler but less system-testing value |

---

## 2. Minimum Viable Environment Kit

These are the physical pieces that define the space. In v1, all are proxy primitives
(Three.js geometry, no .glb files).

| Piece | Proxy geometry | Dimensions | Count | Purpose |
|-------|---------------|-----------|-------|---------|
| Floor | `PlaneGeometry` | 20m × 16m | 1 | Ground surface |
| Back wall | `BoxGeometry` | 20m × 6m × 0.4m | 1 | Rear boundary |
| Side walls | `BoxGeometry` | 16m × 6m × 0.4m | 2 | Left/right boundaries |
| Front wall (open) | — | — | 0 | Open entrance facing the island |
| Doric column | `CylinderGeometry` | r=0.3m, h=5m | 4-6 | Architectural rhythm, classical feel |
| Column base | `BoxGeometry` | 0.8m × 0.3m × 0.8m | 4-6 | Under each column |
| Column capital | `BoxGeometry` | 0.9m × 0.3m × 0.9m | 4-6 | Top of each column |
| Ceiling beams | `BoxGeometry` | 20m × 0.3m × 0.3m | 3 | Spanning the room overhead |
| Step platform | `BoxGeometry` | 8m × 0.2m × 4m | 1 | Raised area for the workbench |

**Total proxy geometry: ~15 pieces, < 1,000 triangles.**

### Material Assignments (Proxy)

| Material | Color | Roughness | Metallic | Applied to |
|----------|-------|-----------|----------|-----------|
| Marble white | `#E8DFD0` | 0.3 | 0.0 | Floor, walls, columns, capitals, bases |
| Marble dark | `#3A3632` | 0.35 | 0.0 | Step platform, ceiling beams |
| Bronze aged | `#6B4E2A` | 0.5 | 0.8 | Column rings (optional detail) |

---

## 3. Required Hero Landmark: The Workbench

The workbench is the Atelier's identity piece — a Renaissance craftsman's work table
where the owner's creative process is symbolized.

### Proxy State (v1)

| Component | Proxy geometry | Dimensions |
|-----------|---------------|-----------|
| Table top | `BoxGeometry` | 3m × 0.1m × 1.2m |
| Table legs | `BoxGeometry` × 4 | 0.12m × 0.8m × 0.12m |
| Shelf underneath | `BoxGeometry` | 2.5m × 0.05m × 1m |

**Material:** Marble dark (`#3A3632`, roughness 0.4)

### Final State (future)

A detailed crafting table with:
- Carved stone legs with Renaissance scroll motifs
- Marble top with visible tool marks, ink stains
- Scattered objects on surface (modeled as separate props)
- Subtle emissive veins (like the stone is alive with creative energy)

**This is the first asset that should be replaced from proxy to final** — it defines
the quality bar for the entire project.

---

## 4. What Can Remain Primitive/Blockout

| Element | Can stay primitive? | When to upgrade |
|---------|-------------------|----------------|
| Floor | Yes — flat plane with material is fine | Add subtle normal map texture later |
| Walls | Yes — box geometry reads as walls | Add stone block texture, subtle imperfections |
| Columns | Mostly — cylinders read as columns | Add fluting geometry, proper Doric proportions |
| Ceiling beams | Yes — structural reads clearly | Add wood grain texture |
| Step platform | Yes | Add edge molding detail |
| **Workbench** | **No — must be upgraded early** | Phase 2 (pipeline validation) |

---

## 5. Materials to Develop Early

These materials are needed for the benchmark AND reusable across multiple zones:

| Material | Priority | Reuse across zones | Development notes |
|----------|---------|-------------------|-------------------|
| **Marble (white/warm)** | Highest | Atelier, Forum, Agora, Arena-like elements in Beacon | Start with flat color; add albedo + normal + roughness textures in Phase 2. Consider SSS shader for premium look. |
| **Marble (dark/accent)** | High | Atelier, Forum, Beacon | Dark variant of the same marble base |
| **Bronze (aged)** | Medium | Atelier (accents), Forum (circuit traces), Amphitheatre | Metallic PBR; interesting because it requires metallic+roughness variation |
| **Emissive glow** | High | All zones (interactive objects) | Shader-based, not texture-based. Animated pulse. |
| **Ground shader** | Medium | Base for all zones | Displacement/normal noise for terrain feel; zone-specific color variants |

### Material Development Order

1. Marble white (flat color proxy) → marble white (textured) → marble white (SSS shader)
2. Emissive glow (solid color) → emissive glow (animated pulse) → emissive glow (particle trail)
3. Bronze aged (flat color) → bronze aged (textured PBR)
4. Ground (flat plane) → ground (noise displacement shader)

---

## 6. Interactions Required in v1

### Interaction 1: Portfolio Crystal (primary)

| Property | Specification |
|----------|--------------|
| Object | Floating geometric crystal near the workbench |
| Proxy geometry | `OctahedronGeometry` (r=0.3m), slowly rotating |
| Material | Emissive glow, animated color pulse (warm gold → teal) |
| Hover state | Scale up 1.2×, glow intensifies, cursor changes |
| Click action | Opens a 2D overlay panel with project showcase content |
| Overlay content | Project title, description, tech stack, screenshot/video, link |
| Close behavior | Overlay fades out, camera returns to scroll position |

### Interaction 2: About Tablet (secondary)

| Property | Specification |
|----------|--------------|
| Object | Stone tablet mounted on or near a wall |
| Proxy geometry | `BoxGeometry` (1m × 1.5m × 0.1m), tilted slightly |
| Material | Marble dark with subtle emissive text lines |
| Hover state | Text lines glow brighter |
| Click action | Opens "About Me" overlay with personal introduction |
| Overlay content | Photo, bio, skills summary, philosophy statement |

### Interaction System Requirements

- Raycasting for hover/click detection (`@react-three/drei` `useInteraction` or custom)
- Visual feedback on hover (scale, glow, cursor)
- Overlay rendered as HTML/React outside `<Canvas>` (not as 3D UI)
- Overlay blocks scroll and 3D interaction while open
- ESC key and click-outside close the overlay
- State managed in Zustand (which overlay is open, which object was clicked)

---

## 7. Camera Requirements

### Camera Path (Desktop — Scroll-Driven)

| Scroll % | Camera position | Camera target | Notes |
|----------|----------------|--------------|-------|
| 0% | Outside the Atelier, facing entrance | Center of room | "Arrival" — user sees the workshop from outside |
| 0-20% | Dolly forward through entrance | Workbench | Entering the space, golden light reveals |
| 20-40% | Arc left, showing columns and left wall | Left wall details | "The classical foundation" |
| 40-60% | Center, facing workbench directly | Workbench close-up | "The creative core" — interactive objects visible |
| 60-80% | Arc right, showing right wall | Right wall details | "The skills" |
| 80-100% | Pull back to overview, slight upward tilt | Full room | "The invitation" — contact CTA appears |

### Camera Implementation

- GSAP timeline keyframes synced to Lenis scroll progress
- `CameraControls` from Drei for smooth interpolation between keyframes
- Optional: allow user to temporarily break from path (orbit around current position), return to path on scroll
- Camera transitions must be smooth (ease-in-out), never instant cuts
- Camera speed must feel deliberate, not rushed — minimum 2 seconds per segment

### Camera (Mobile)

- No 3D camera path on mobile
- Scroll drives CSS parallax layers and section reveals
- Each section corresponds to a camera "stop" from the desktop path
- Background images or lightweight canvas renders for visual continuity

---

## 8. Mobile Simplification

### What Mobile Gets

| Feature | Desktop (3D) | Mobile (scroll) |
|---------|-------------|-----------------|
| Environment | Full 3D geometry | Hero image or lightweight canvas illustration per section |
| Camera path | Scroll-driven 3D camera | CSS parallax scroll |
| Interactive objects | 3D objects with hover/click | Styled cards/buttons in HTML |
| Overlays | HTML panels triggered from 3D | Same HTML panels triggered from scroll sections |
| Workbench | 3D proxy/final model | Static image or simple CSS 3D transform |
| Columns | 3D cylinders | Not shown (or decorative border elements) |
| Lighting | Real-time PBR + shadows | CSS gradients, image-based lighting illusion |
| Performance | 60fps 3D rendering | Native scroll performance |

### Mobile Layout (The Atelier)

```
┌─────────────────────────────┐
│ Hero: Full-bleed image/     │ ← Golden light atmosphere
│ illustration of the Atelier │
│                             │
│ "Han — Builder of Worlds"   │ ← Name + tagline overlay
├─────────────────────────────┤
│ Section: Philosophy         │ ← Scroll reveal
│ Short text about approach   │
├─────────────────────────────┤
│ Section: Featured Project   │ ← Card with image, title, CTA
│ [View Project →]            │
├─────────────────────────────┤
│ Section: About              │ ← Photo + bio
│ Skills / What I do          │
├─────────────────────────────┤
│ Section: Contact CTA        │ ← Persistent footer or section
│ [Let's Work Together →]     │
└─────────────────────────────┘
```

---

## 9. Success Criteria Before Moving to a Second Zone

The benchmark zone is complete when ALL of the following are true:

### Technical Criteria

| # | Criterion | Measurement |
|---|----------|------------|
| T1 | Page loads and shows 3D environment | FCP < 2s, 3D visible < 4s on mid-range desktop |
| T2 | Scroll-driven camera path works smoothly | No jank, no jumps, consistent ease curves |
| T3 | Interactive objects respond to hover and click | Raycast hit detection, visual feedback, overlay opens |
| T4 | 2D overlay renders correctly over 3D | Overlay blocks interaction, closes cleanly, state resets |
| T5 | Mobile scroll experience works | All content accessible, no WebGL errors, no blank screen |
| T6 | FPS stays above 55fps on desktop mid-range | Measured via Stats.js or Drei performance monitor |
| T7 | No console errors in Chrome, Firefox, Safari | Clean runtime on latest stable of each |
| T8 | Proxy-to-final asset swap works | Place a test .glb, update manifest, verify it loads without code change |

### Quality Criteria

| # | Criterion | Evaluation |
|---|----------|-----------|
| Q1 | The space "reads" as a workshop/atelier despite proxy geometry | Proportions, materials, lighting create the right mood |
| Q2 | Golden hour lighting creates warmth | Not flat, not over-saturated, not dark |
| Q3 | Camera path tells a spatial story | Entering → exploring → focusing → inviting |
| Q4 | The experience does not feel like a tech demo | There is content, narrative, and a reason to be here |
| Q5 | Contact CTA is reachable and visible | User can find how to get in touch within the benchmark flow |

### Pipeline Criteria

| # | Criterion | Verification |
|---|----------|-------------|
| P1 | Blender → export → optimize → deploy pipeline documented and tested | At least one asset goes through the full pipeline |
| P2 | Asset manifest is populated and accurate | All benchmark assets listed, statuses correct |
| P3 | LOD system is functional | At least one asset has LOD0 + LOD1, switching works |
| P4 | gltf-transform optimization runs without errors | Draco compression verified on one asset |

### All criteria met → approve expansion to Shore of Arrival + Forum of Systems (MVP zones)

---

## 10. Estimated Build Sequence

| Step | Description | Dependencies | Estimated effort |
|------|-----------|-------------|-----------------|
| 1 | Next.js + R3F project scaffold | None | 1 day |
| 2 | Basic Canvas + environment (sky, ground, lighting) | Step 1 | 1 day |
| 3 | Atelier proxy geometry (walls, columns, floor) | Step 2 | 1 day |
| 4 | Camera path + scroll sync (GSAP + Lenis) | Step 3 | 2-3 days |
| 5 | Interactive objects + raycasting | Step 3 | 1-2 days |
| 6 | 2D overlay system (HTML over Canvas) | Step 5 | 1-2 days |
| 7 | Mobile scroll experience | Step 6 | 2-3 days |
| 8 | Asset manifest + loader with proxy/file switching | Step 3 | 1 day |
| 9 | Pipeline validation (one test asset through Blender → deploy) | Step 8 | 1 day |
| 10 | Performance tuning + cross-browser QA | Step 7 | 1-2 days |
| **Total** | | | **11-17 days** |

### What Is NOT in the Benchmark Build

- No decorative props (scrolls, tools, ink pots)
- No vegetation
- No audio
- No post-processing effects (bloom, SSAO)
- No second biome
- No CMS integration
- No analytics setup
- No final 3D assets (proxy only)
- No page transitions between zones

---

## 11. Risk Mitigation Specific to Benchmark

| Risk | Mitigation |
|------|-----------|
| Proxy geometry looks too primitive, kills first impression | Focus on lighting and materials — warm golden light + correct roughness values make even boxes feel intentional. Add subtle fog/atmosphere. |
| Scroll camera feels nauseating | Keep camera movement slow, avoid roll/pitch, use ease-in-out curves, test with motion-sensitive users |
| R3F + Next.js hydration breaks | All 3D behind `dynamic(import, { ssr: false })`. Test SSR/SSG build early. |
| Performance on low-end devices | Benchmark has < 1,000 tris — if this doesn't run at 60fps, the issue is in the rendering pipeline (shadows, post-processing), not geometry |
| Overlay system feels disconnected from 3D | Overlay entrance/exit should animate in sync with 3D camera movement (camera slightly pulls back when overlay opens) |
