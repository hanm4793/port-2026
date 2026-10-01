# Comprehensive Visual & Experience QA Audit (Site-Wide)

**Project:** port-2026 / Island of Memory
**Audit Date:** 2026-10-01 (Step 23)
**Scope:** Full-site experiential review across 11 core dimensions. Evaluates built output, spatial coherence, conversion readiness, and mobile resilience.

---

## 1. Strongest Qualities (What Is Verifiably Working Well)

1. **Architectural Coherence & Continuous Geography**:
   - The island feels like a single geological landmass rather than separate disjointed rooms. Moving from Shore of Arrival &rarr; Forum of Systems &rarr; Dino Sanctuary &rarr; Amphitheatre follows a paved royal trail (`Via Sacra`) with no black loading screens or abrupt teleportation.
2. **"Museum-Instrument" Aesthetic Integrity**:
   - Zero generic cyberpunk neon or noisy particle clutter. The combination of warm travertine marble, dark volcanic basalt, oxidized bronze plates, and restrained gold/cyan circuitry adheres strictly to the approved art-direction bible.
3. **Soundscape Fluidity & Zero-Asset Synthesis**:
   - The procedural Web Audio API engine delivers authentic territorial audio (waves &rarr; subterranean data hum &rarr; primeval mist drone &rarr; 3-stem orchestra) with 0MB external download, smooth 2.0s crossfading, automatic tab blur silence, and -10dB reading ducking.
4. **Contextual Drawer Docking (Spatial Preservation)**:
   - Clicking architectural hotspots (System Table, Altar, Lyre, or Alcoves) opens the `CaseStudyPanel` on the right side while preserving the live 3D world on the left, keeping the spatial autobiography alive while presenting rigorous engineering data.
5. **Rock-Solid Production Performance**:
   - The combination of `ZoneCuller` spatial mounting, 30Hz throttled water displacement, and locked mobile DPR boundaries delivers a consistent **60–61 FPS** on desktop mid-range hardware and passes 14/14 automated unit tests.
6. **Dual Mode Complementarity**:
   - Story Mode provides an author-directed cinematic narrative for first-time recruiters/clients; Explore Mode provides an open-world sandbox with third-person avatar navigation and hidden Memory Seals for curious peers.

---

## 2. Top 10 Weaknesses (Concrete Observed Issues)

1. **Proxy Primitive Geometry Looks Boxy Upon Close Inspection**:
   - Up close, the Roman forum columns, steps, and Dino cliff walls clearly reveal their primitive origin (`BoxGeometry`, `CylinderGeometry`, `DodecahedronGeometry`). They lack edge bevel micro-imperfections, carved stone relief textures, and chipped corner weathering.
2. **Missing Normal Maps & PBR Surface Detail (Flat Shading)**:
   - Materials currently rely purely on flat diffuse colors, uniform roughness, and metalness values. Without normal and roughness texture maps, the stone surfaces look clean and synthetic rather than ancient and mineralized.
3. **Chapter 3 (Growth / Agora) & Chapter 6 (Beacon) Spatial Gaps in 3D**:
   - In Story Mode, Chapter 3 ("Growth") still points cameras into the Forum area because the dedicated Agora zone has not been built in 3D. Similarly, Chapter 6 ("Begin") focuses on a distant silhouette rather than a fully climbable Beacon summit.
4. **Ocean Water Shader Lacks Fresnel & Foam Edge Complexity**:
   - While the 4-layer vertex swell and vertex color depth gradient work well, the water plane lacks dynamic edge foam projection against sand shores and specular sun reflection glints (Fresnel reflection curve).
5. **No 2D Project Hero Images in Case Studies (`/images/placeholder.webp`)**:
   - Opening the case study drawer or navigating to `/projects/[slug]` shows grey placeholder cards instead of real production screenshots of the actual enterprise dashboards, mobile screens, or film stills.
6. **Lack of Ambient Particle Dust & Atmospheric Shafts**:
   - The golden hour sun spotlight in the Amphitheatre and the canopy light in the Dino Sanctuary are clean mathematical cones; they lack subtle volumetric dust motes or god-rays that would dramatically elevate the sense of physical atmosphere.
7. **Abrupt Camera Snapping During High-Velocity Story Wheel Flicking**:
   - While smooth damping (`damp: 0.12 - 0.16`) works during normal continuous scrolling, aggressive mouse-wheel flicking can cause the camera rail to rapidly interpolate across 2 chapter boundaries in under 300ms, momentarily disorienting the viewer.
8. **Explore Mode Avatar Lacks Walking/Hovering Animation Loop**:
   - The crystalline Navigator avatar smoothly glides across the terrain, but lacks directional tilting during sharp turns and has no footstep dust or energy ripple beneath its shadow disk.
9. **No Inline Video Embeds in the AI Film Case Study**:
   - The case study for *"Chronicles of the Primeval Horizon"* describes a 4-episode speculative series with 450K+ views, but currently only provides text paragraphs without an embedded playable video preview.
10. **Mobile Touch Control Discovery in Explore Mode**:
    - The on-screen D-Pad for mobile is located at the bottom-left, but first-time mobile visitors might not realize they can also touch-drag on the upper half of the screen to rotate their view.

---

## 3. Priority-Ranked Fix Plan

### Tier 1: High Consequence (Immediate Impact on Conversion & Immersion)
1. **P1 — Embed Real Visual Assets & Video Trailers into Case Studies**:
   - Replace `/images/placeholder.webp` across the 6 major case studies with genuine project screenshots, system architecture diagrams, and a playable video trailer for the AI dinosaur universe.
2. **P2 — Build the Missing Physical Agora of Growth & Summit Beacon**:
   - Prototype the physical Agora colonnade (`z = -16 .. -20`) and the climbable Beacon Summit (`z = -75 .. -85`) so Chapters 3 and 6 have dedicated physical architecture rather than recycled viewpoints.
3. **P3 — Smooth Camera Speed Clamping in `StoryCameraRail`**:
   - Add velocity damping to scroll progress deltas so that even frantic mouse-wheel flicking smoothly glides between chapters at a cinematic maximum speed (< 2.5m/s).

### Tier 2: Medium Consequence (Aesthetic Polish & Depth)
4. **P4 — Upgrade PBR Materials with Procedural Normal Noise**:
   - Inject subtle procedural micro-bump maps into marble, volcanic basalt, and sandstone materials to break up mathematical flatness before final glTF models arrive.
5. **P5 — Refine Water Shader Edge Foam & Specular Glint**:
   - Enhance the ocean material with high specular shininess and an animated noise foam line along the beach boundary (`z = 12 .. 15`).
6. **P6 — Avatar Hover Dynamics in Explore Mode**:
   - Add banking/tilt rotation (roll axis) when the avatar turns left/right and an expanding ground energy ripple when moving.

### Tier 3: Nice-to-Have (Atmospheric Enhancements)
7. **P7 — Subtle Sunbeam Dust Motes in Interior & Amphitheatre**:
   - Implement an ultra-lightweight instanced dust particle group (max 40 motes) floating gently within the Amphitheatre theatrical spotlight beam.
8. **P8 — Mobile Gesture Tutorial Pill**:
   - Display a quick 2-second animated gesture icon (`Drag to look around`) on mobile upon entering Explore Mode.

---

## 4. What Is NOT Worth Polishing Yet (Root Foundations First)

1. **Do NOT spend hours hand-tweaking individual rock vertices**:
   - The current dodecahedron rocks and box steps are **temporary proxy primitives**. According to `ASSET-PIPELINE.md`, they will ultimately be replaced by optimized, Draco-compressed Blender `.glb` assets with baked normal maps. Polishing primitive vertices now is wasted effort.
2. **Do NOT over-engineer a full physics engine (Cannon / Rapier)**:
   - The portfolio’s kinematic clamping and raycast collision are lightweight (< 0.2ms/frame). Adding full rigid-body physics would inflate JS bundle sizes by 150KB+ and introduce collision jitter for zero business benefit.
3. **Do NOT create an endless open-world terrain**:
   - The island’s power lies in its **tight, curated spatial autobiography**. Expanding the terrain beyond the 8 defined zones will dilute the story and increase memory overhead.
