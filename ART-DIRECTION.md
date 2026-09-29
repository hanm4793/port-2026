# Art Direction Bible

**Project:** port-2026 / Island of Memory
**Date:** 2026-09-26
**Status:** Locked visual language — all future prompts must reference this document
**Related:** DESIGN.md, WORLD-MAP.md

---

## 1. Visual Thesis

The Island of Memory is rendered in a style called **Archaeological Futurism**: a world
where ancient Mediterranean, Egyptian, and Vietnamese civilizations never fell but instead
evolved alongside advanced technology. Stone is the primary building material, but it
carries embedded luminous circuitry. Marble is warm, not clinical. Technology is elegant,
not aggressive. Nature is present but composed — tropical vegetation grows deliberately
around architecture, not consuming it. Every surface tells a story of time passing and
knowledge accumulating. The overall impression is of a place that has existed for
centuries and will exist for centuries more — premium, unhurried, deeply crafted.

---

## 2. Palette Families

### Primary Palette (60% of surfaces)

| Name | Hex | Usage |
|------|-----|-------|
| Travertine | `#E8DFD0` | Primary stone, walls, floors, columns |
| Warm Ivory | `#F5F0E6` | Highlights, light-facing surfaces |
| Sandstone Gold | `#C4A777` | Egyptian elements, desert-influenced zones |
| Stone Shadow | `#8A7E6E` | Recesses, shadow-side stone, depth |

### Secondary Palette (25% of surfaces)

| Name | Hex | Usage |
|------|-----|-------|
| Deep Teal | `#1A5C5A` | Water, glass, reflective tech elements |
| Oxidized Copper | `#4A7C6B` | Aged metal accents, patina on bronze |
| Volcanic Charcoal | `#3A3632` | Dark stone, contrast elements, bases |
| Vietnamese Coral | `#D4725C` | Warm accents, lanterns, sunset reflections |

### Accent Palette (10% of surfaces)

| Name | Hex | Usage |
|------|-----|-------|
| Gold Leaf | `#C9A84C` | Interactive highlights, premium accents, beacon light |
| Circuit Blue | `#6BA3C7` | Technology traces, luminous lines, data visualization |
| Bio-Luminescent | `#7ECBB4` | Natural glow in sanctuary, water effects |
| Ember | `#B85C3A` | Warm focal points, forge heat, sunset deepest tone |

### Forbidden Colors

| Color | Why |
|-------|-----|
| Neon pink/magenta | Cyberpunk association |
| Pure black `#000000` | Too harsh — use Volcanic Charcoal instead |
| Pure white `#FFFFFF` | Too clinical — use Warm Ivory instead |
| Saturated purple | Fantasy/gaming association |
| Bright green `#00FF00` | Matrix/hacker association |
| Rainbow gradients | Generic agency aesthetic |

### UI Overlay Palette

| Name | Hex | Usage |
|------|-----|-------|
| UI Background | `#1A1816` (90% opacity) | Overlay panels, modals |
| UI Text Primary | `#F5F0E6` | Headings, primary text |
| UI Text Secondary | `#A89E8E` | Captions, secondary text |
| UI Accent | `#C9A84C` | Links, buttons, interactive elements |
| UI Border | `#3A3632` (40% opacity) | Dividers, card borders |

---

## 3. Material Families

### Stone Family

| Material | Base color | Roughness | Metallic | Notes |
|----------|-----------|-----------|----------|-------|
| Marble (warm white) | Travertine | 0.25-0.35 | 0.0 | Primary architectural material. Subtle vein patterns in normal map. Warm subsurface scattering if budget allows. |
| Marble (dark) | Volcanic Charcoal | 0.30-0.40 | 0.0 | Accent stone. Floor borders, step edges, decorative inlays. |
| Sandstone | Sandstone Gold | 0.60-0.75 | 0.0 | Egyptian/temple zone. Rougher, more porous than marble. Visible grain. |
| Volcanic rock | `#2A2624` | 0.80-0.90 | 0.0 | Ground surfaces, raw terrain. Darkest stone. Very rough. |

### Metal Family

| Material | Base color | Roughness | Metallic | Notes |
|----------|-----------|-----------|----------|-------|
| Bronze (aged) | `#6B4E2A` | 0.45-0.60 | 0.75-0.85 | Primary metal. Warm, oxidized, imperfect. Green patina in crevices (mix with Oxidized Copper in AO cavities). |
| Bronze (polished) | `#8B6D3A` | 0.20-0.30 | 0.85-0.95 | Rare accent. Used only for important interactive elements. Catches light dramatically. |
| Iron (weathered) | `#4A4440` | 0.70-0.85 | 0.50-0.65 | Structural elements. Hinges, brackets, reinforcements. Rust streaks in texture. |

### Organic Family

| Material | Base color | Roughness | Metallic | Notes |
|----------|-----------|-----------|----------|-------|
| Tropical hardwood | `#7A5232` | 0.55-0.70 | 0.0 | Vietnamese-influenced elements. Warm, rich grain. Used for stage, furniture, frames. |
| Bamboo | `#A08B5E` | 0.50-0.65 | 0.0 | Structural accents in Vietnamese zones. Lighter than hardwood. |
| Foliage (dark) | `#2D5A30` | 0.70-0.80 | 0.0 | Dense vegetation. Double-sided. Subsurface scattering green. |
| Foliage (tropical) | `#4A8C3E` | 0.65-0.75 | 0.0 | Lighter canopy, sun-facing leaves. |

### Special Family

| Material | Properties | Notes |
|----------|-----------|-------|
| Water | Transparent, reflective, animated normal map, caustics projection | Not a static material — shader-driven. Teal-tinted. |
| Circuit trace | Emissive (`Circuit Blue`), thin lines embedded in stone | Animated pulse (slow, not frantic). Represents embedded technology. |
| Beacon glow | Emissive (`Gold Leaf`), volumetric if budget allows | The brightest element in the world. Warm, not harsh. |
| Interactive glow | Emissive (pulses between `Gold Leaf` and `Deep Teal`) | Applied to clickable objects. Clear signal: "touch me." |
| Glass/crystal | High transparency, high roughness (frosted), subtle refraction | Used sparingly. Not modern glass — ancient crystal. |

---

## 4. Surface Aging and Wear Language

### Aging Principles

Every surface in the world has experienced time. Nothing is factory-new. But aging is
**dignified, not ruined.** The world is well-maintained by an invisible caretaker — worn
but not abandoned.

| Aging type | Where it appears | How much |
|-----------|-----------------|---------|
| **Edge wear** | Corners of stone blocks, step edges, column bases | Subtle — 2-5% of edge area shows worn/rounded geometry or lighter albedo |
| **Patina** | Bronze surfaces, especially in rain-exposed areas | Green-blue oxidation in crevices and undersides, not on primary surfaces |
| **Moss/lichen** | Joints between stones, north-facing surfaces, near water | Sparse — patches, not coverage. 5-10% of eligible surfaces. |
| **Water staining** | Vertical surfaces below drainage points | Subtle darkening streaks. Not dramatic — just lived-in. |
| **Erosion** | Inscriptions, decorative carvings, exposed rock | Very subtle rounding. Inscriptions are still readable. |
| **Root intrusion** | Base of walls, between floor tiles in outdoor zones | Thin roots visible in cracks. Not destructive — decorative. |

### Aging Amounts by Zone

| Zone | Aging level | Rationale |
|------|------------|-----------|
| Shore of Arrival | Heavy | Exposed to sea and weather. Most aged. |
| Forum of Systems | Light | Well-maintained, technical precision. |
| Agora of Growth | Light-Medium | Active, but outdoors. |
| Renaissance Atelier | Light | Interior, protected, cared for. |
| Amphitheatre of Sound | Medium | Outdoor, hillside, some vegetation encroachment. |
| Dino Sanctuary | Heavy | Ancient, overgrown, deliberately wild. |
| Temple of Journeys | Medium | Outdoor, coastal wind, but maintained. |
| Beacon of Contact | Minimal | The newest, cleanest structure. Almost pristine. |

### What Aging Is NOT

- Not post-apocalyptic ruin
- Not horror-game decay
- Not uniform dirt filter
- Not random grunge overlay
- Every aging detail must have a plausible environmental cause

---

## 5. Lighting Moods

### Golden Hour (Primary — 70% of the world)

| Property | Value |
|----------|-------|
| Sun color | `#FFD4A0` (warm amber) |
| Sun angle | 15-25° above horizon |
| Sun direction | From the ocean side, casting long shadows into the island |
| Ambient color | `#8FAEC4` (cool blue-grey sky fill) |
| Ambient intensity | 0.3-0.4 (enough to read shadow areas, not flat) |
| Shadow softness | Soft — PCF or VSM shadows, not hard edges |
| Key mood | Warm, inviting, "the world at its most beautiful moment" |

### Dusk (Secondary — Amphitheatre, Temple)

| Property | Value |
|----------|-------|
| Sun color | `#E88A5C` (deep orange, almost setting) |
| Sun angle | 3-8° above horizon |
| Sky gradient | Orange horizon → deep blue → dark blue zenith |
| Ambient color | `#4A5C8A` (twilight blue) |
| Ambient intensity | 0.2-0.3 (darker, more atmospheric) |
| Artificial lights | Lanterns (`#FFB868`), torches (`#E8A040`), subtle and warm |
| Key mood | Intimate, contemplative, nostalgic |

### Interior (Atelier)

| Property | Value |
|----------|-------|
| Primary light | Window light — directional, golden, casting defined shafts |
| Fill light | Warm bounce (`#D4C4A0`), very soft, from opposite wall |
| Accent lights | Subtle point lights on key objects (workbench, shelves) |
| Shadow density | More pronounced than exterior — creates drama |
| Key mood | Studio warmth, focused, intimate |

### Underground/Grotto (Dino Sanctuary)

| Property | Value |
|----------|-------|
| Primary light | Filtered canopy light from above (dappled, moving slowly) |
| Accent light | Bioluminescent glow from water and certain surfaces (`Bio-Luminescent` color) |
| Ambient color | `#2A4A3A` (deep green-teal) |
| Ambient intensity | 0.15-0.25 (darkest zone, but never pitch black) |
| Key mood | Mysterious, primal, wondrous |

### Summit (Beacon)

| Property | Value |
|----------|-------|
| Primary light | Open sky — brightest ambient of all zones |
| Beacon light | Strong emissive point, `Gold Leaf` color, visible volume |
| Ambient color | `#B0C4D8` (clear sky blue) |
| Ambient intensity | 0.5-0.6 (bright, open, optimistic) |
| Key mood | Clarity, elevation, achievement |

### Lighting Rules

1. **No flat lighting** — every zone must have a defined key light direction creating
   readable shadows.
2. **No pure black shadows** — ambient fill prevents any surface from going to zero.
   Darkest shadow reads as 10-15% brightness.
3. **Light tells navigation** — brighter areas pull attention forward along the Story
   Mode path. The next zone entrance is always slightly brighter than its surroundings.
4. **Color temperature shifts between zones** — warm (Atelier) → cool (Forum) → warm
   (Amphitheatre) → mysterious (Sanctuary) → warm (Temple) → bright (Beacon). This
   creates emotional rhythm.
5. **No colored lighting for "cool" effect** — every light color must have an in-world
   justification (sunset, lantern, bioluminescence, embedded circuit).

---

## 6. Silhouette Principles

The world must read clearly even when viewed as a pure silhouette (black shapes on
white background). This is the test for good 3D design.

### Rules

1. **Every zone has one dominant vertical element** — a landmark that breaks the
   horizontal skyline. The Beacon is tallest, the Atelier's window arch is next,
   columns and the amphitheatre walls follow.
2. **Avoid symmetrical silhouettes** — natural asymmetry creates interest. Even the
   Amphitheatre, which is geometrically symmetrical, should have vegetation or terrain
   breaking the symmetry.
3. **Columns and verticals at irregular intervals** — no colonnade should have
   perfectly even spacing when viewed from the player's typical camera angle. Slight
   variation in height, spacing, or condition.
4. **Skyline rhythm: tall-short-tall-short** — alternate vertical elements to create
   visual rhythm across the island.
5. **Negative space matters** — archways, windows, and gaps between elements are as
   important as solid forms. The Window of Light in the Atelier is defined by its
   negative space.
6. **Human scale reference** — at least one element per zone should suggest human scale
   (a door, a chair, a step). This grounds the environment.

---

## 7. Environment Density Rules

### Density Spectrum

```
Sparse ──────────────────────────────── Dense
Shore    Forum    Beacon    Agora    Atelier    Amphitheatre    Temple    Sanctuary
```

### Rules

1. **No zone is empty** — even the sparsest zone (Shore) has columns, vegetation, and
   environmental detail. Empty 3D space reads as "unfinished," not "minimal."
2. **No zone is cluttered** — even the densest zone (Sanctuary) must have clear
   sightlines to its landmark and clear paths to interactive objects.
3. **Density increases toward the interior of the island** — shore zones are open and
   airy, interior zones are enclosed and detailed.
4. **Vegetation density follows a gradient:**
   - Shore: coastal grass, occasional palm → 10% ground coverage
   - Forum/Agora: potted plants, vine accents → 5% coverage
   - Atelier: zero (interior)
   - Amphitheatre: vegetation between seats → 15% coverage
   - Sanctuary: dense tropical growth → 40-50% coverage
   - Temple: curated garden plants → 20% coverage
   - Beacon: minimal → 5% coverage
5. **Props per zone: minimum 3, maximum 12** — each must justify its existence with
   symbolic meaning or interaction potential. No random clutter.
6. **Performance rule: density must respect triangle budget** — dense zones use more
   instancing and LOD, not more unique geometry.

---

## 8. Landmark Design Rules

Every zone has exactly one primary landmark. Landmarks are the visual and narrative
anchors of each zone.

### Rules

1. **A landmark must be identifiable from one zone away** — its silhouette is unique
   enough to serve as a wayfinding element.
2. **A landmark must be interactable** — clicking it opens the zone's primary content
   overlay.
3. **Scale: 1.5-3× human height** — large enough to dominate the zone, small enough
   to feel intimate, not monumental (except the Beacon).
4. **Material: at least two material families** — landmarks combine stone + metal,
   stone + wood, or stone + emissive. Single-material landmarks look like
   unfinished proxies.
5. **One dominant axis** — landmarks are either primarily vertical (columns, towers,
   obelisks) or primarily horizontal (tables, stages, terraces). Not both.
6. **Detail gradient** — highest detail at eye level and on the primary facing side.
   Back and top can be simpler (the camera rarely sees them in Story Mode).
7. **Emissive accent** — every landmark has a subtle emissive element that signals
   "this is important." Not full glow — a seam, a line, a small inset.

### Landmark Inventory

| Zone | Landmark | Axis | Materials | Emissive element |
|------|---------|------|----------|-----------------|
| Shore | Gate of Names | Vertical | Marble + sandstone | Inscription glow |
| Forum | System Table | Horizontal | Marble + circuit traces | Holographic projections |
| Agora | Growth Fountain | Vertical | Marble + bronze + water | Water luminescence |
| Atelier | Master's Workbench | Horizontal | Marble dark + tropical wood | Object glow on surface |
| Amphitheatre | The Stage | Horizontal | Stone + luminous rings | Sound visualizer rings |
| Sanctuary | Fossil Arch | Vertical (arch) | Volcanic rock + bio-luminescent | Bone-embedded glow |
| Temple | Horizon Terrace | Horizontal | Stone + tropical wood | Lantern light |
| Beacon | The Beacon | Vertical | Stone + pure emissive | Full beacon glow |

---

## 9. Camera Mood Rules

### General Camera Principles

1. **Camera height: 1.6m (human eye level) as default** — grounding the viewer as a
   person in the space, not a drone.
2. **Camera movement: slow and deliberate** — minimum 2 seconds for any transition.
   Maximum camera velocity: 3m/s. No rapid snaps or cuts.
3. **Camera easing: ease-in-out on all movements** — never linear interpolation. The
   camera accelerates gently and decelerates gently.
4. **Field of view: 50-65°** — narrower than typical games (which use 75-90°). This
   creates a more cinematic, less "gamey" feel. Slightly telephoto compression makes
   architecture feel weighty.
5. **No Dutch angles** — the camera never tilts on the roll axis. Horizon is always
   level.
6. **Depth of field: subtle** — far background softens slightly. Never aggressive
   bokeh. The world should always feel navigable, not "photographed."

### Camera Modes by Context

| Context | Camera behavior |
|---------|----------------|
| Story Mode scroll | Follows GSAP-driven path. User controls speed via scroll, not direction. |
| Approaching a landmark | Camera slows, FOV narrows slightly (zoom-in feel), orbit tightens |
| Overlay open | Camera pulls back 10%, DOF increases (background blurs subtly), 3D interaction pauses |
| Zone transition | Camera follows terrain path, never teleports, slight elevation change matches terrain |
| Explore Mode | Orbit camera centered on player position. Constrained to zone bounds. |
| First load | Camera starts high and distant (bird's-eye of the island), then swoops down to Shore |

### Camera Movements That Must Not Happen

- No spinning/rotating without user input
- No camera shake
- No rapid zoom
- No first-person head bob
- No security-camera-style fixed angles
- No vertical look-straight-up or look-straight-down
- No camera positions below ground level
- No camera positions inside geometry

---

## 10. Absolute Prohibitions

These must never appear in the world, regardless of zone or context:

| Category | Prohibited | Why |
|----------|-----------|-----|
| **Characters** | Human figures, NPC models, character portraits | The world is inhabited by the visitor only. The creator is present through their work, not an avatar. |
| **Text in 3D** | Floating 3D text, Comic Sans, text particles | All text is rendered as HTML overlay or carved stone (texture). Never as 3D geometry floating in space. |
| **Particles** | Particle rain, snow, fireflies, magical sparkles | Particles are the hallmark of empty tech demos. Atmosphere comes from lighting and materials. Exception: subtle dust motes in interior light shafts if performance allows. |
| **Lens effects** | Lens flare, chromatic aberration, film grain | These are camera artifacts. The world is experienced directly, not through a camera. Exception: subtle bloom on emissive elements. |
| **Modern objects** | Laptops, phones, monitors, office furniture | The world is timeless. Technology is embedded in stone, not sitting on IKEA desks. |
| **Cartoon elements** | Emoji, cartoon faces, comic speech bubbles | The tone is premium and serious. Humor comes from discovery, not decoration. |
| **Blood/violence** | Weapons, damage, combat elements | Not a game. Even the Arena zone represents competitive spirit, not violence. |
| **Religious symbols** | Crosses, crescents, specific deity statues | Classical architecture is cultural, not religious. Avoid any specific religious iconography. |
| **Copyrighted IP** | Brand logos, specific product designs | No Apple/Samsung/Nike/etc. references, even stylized. |

---

## 11. Cultural Influence Guidelines

### Football Influence: Symbolic Only

Football represents competitive spirit, teamwork, strategic thinking, and passion. It
does NOT appear as literal football in the world.

**Allowed:**
- Arena zone geometry inspired by colosseum/amphitheatre architecture (not a stadium)
- Geometric patterns on the arena floor that suggest a playing field (abstract, not a pitch)
- Competitive tension expressed through dynamic lighting, strong angular geometry
- Strategic diagrams as abstract floor mosaics (like Roman military formations, not
  football tactics boards)
- The concept of "teamwork" expressed through multiple interactive objects that form
  a collective narrative

**Prohibited:**
- Football/soccer balls
- Goal posts
- Club logos, crests, or colors
- Player likenesses or jerseys
- Specific stadium architecture (Camp Nou, Wembley, etc.)
- FIFA/UEFA/league branding
- Scoreboards

### Manga Influence: Abstract Emotional Language

Manga influences the composition and emotional staging of the world, not its visual
content. No manga characters, no anime aesthetics, no Japanese text.

**Allowed:**
- Dynamic camera angles inspired by manga panel composition (dramatic low angles,
  extreme perspective for landmark reveals)
- Emotional pacing: quiet contemplative moments followed by dramatic reveals
  (the "page turn" effect)
- Speed lines as abstract stone carvings or light trails (never literal speed lines
  in 3D space)
- Contrast between intimate close-up details and grand wide shots
- The concept of "transformation" — zones reveal their true nature as you get closer
- Strong silhouette-first design (manga characters are designed silhouette-first)

**Prohibited:**
- Anime/manga character designs
- Japanese text or calligraphy (unless the creator has genuine Japanese cultural connection)
- Chibi or super-deformed proportions
- Sweat drops, anger veins, or other manga visual shorthand
- Panel borders or comic-style frames in the 3D world
- Specific manga/anime IP references (Dragon Ball, One Piece, Naruto, etc.)

### Dinosaur Creative Universe: Original and Premium

The dinosaur world is the creator's original IP. It must feel like a discovered
civilization, not a theme park attraction.

**Allowed:**
- Original dinosaur species designs (not T-Rex, Velociraptor, etc. copied from
  Jurassic Park — create original creatures)
- Fossils and skeletal elements as architectural features
- Ancient civilization that studied/coexisted with these creatures
- Storyboard-style relief carvings showing narrative scenes
- Egg/nest imagery as symbols of creation and potential
- Bioluminescent elements suggesting these creatures had otherworldly qualities
- "Field journal" aesthetics — sketches, notes, diagrams as discoverable content

**Prohibited:**
- Jurassic Park/World visual language (electric fences, jeeps, "Ingen" labs)
- Cartoon dinosaurs
- "Caveman and dinosaur" clichés
- Museum diorama presentation (glass cases, plaques, roped-off areas)
- Photorealistic AI-generated dinosaur images used as textures (must be stylized
  to match the world's art direction)
- Dinosaur roars or sound effects from existing films

---

## 12. Reference Sheet — Quick Lookup

### "Does this belong in the world?" Checklist

Before adding any element, it must pass all five:

1. ☐ Does it serve the narrative or portfolio purpose of its zone?
2. ☐ Does it use only materials from the defined material families?
3. ☐ Does it use only colors from the defined palette families?
4. ☐ Does it have a plausible in-world reason to exist?
5. ☐ Would it still look good as a silhouette?

If any answer is no, the element does not belong.

### Material Quick Reference

```
Stone:   Travertine #E8DFD0  |  Sandstone #C4A777  |  Volcanic #3A3632
Metal:   Bronze #6B4E2A      |  Polished #8B6D3A   |  Iron #4A4440
Wood:    Hardwood #7A5232    |  Bamboo #A08B5E
Foliage: Dark #2D5A30       |  Tropical #4A8C3E
Water:   Teal shader          |  Bio-luminescent #7ECBB4
Glow:    Gold #C9A84C        |  Circuit #6BA3C7     |  Interactive pulse
```

### Lighting Quick Reference

```
Golden Hour: Sun #FFD4A0, Ambient #8FAEC4, Intensity 0.3-0.4
Dusk:        Sun #E88A5C, Ambient #4A5C8A, Intensity 0.2-0.3
Interior:    Window #FFD4A0, Fill #D4C4A0, Dramatic shadows
Grotto:      Canopy filter, Bio-glow, Ambient #2A4A3A, Intensity 0.15-0.25
Summit:      Open sky, Beacon #C9A84C, Ambient #B0C4D8, Intensity 0.5-0.6
```
