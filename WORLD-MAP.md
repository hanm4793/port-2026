# World Map & Zone Architecture

**Project:** port-2026 / Island of Memory
**Date:** 2026-09-26
**Status:** Design — locked world structure
**Related:** DESIGN.md, ART-DIRECTION.md, BENCHMARK-ZONE.md

---

## World Concept

The island is a single coherent landmass rising from a warm sea. It is not a random
fantasy world — it is a spatial autobiography. Every zone exists because it maps to a
real facet of the creator's identity, skill, or service offering. The island reads
from shore to summit: visitors arrive at the coast, move through zones of increasing
depth, and reach the beacon at the highest point.

The island is shaped roughly like a crescent or half-moon, with the open side facing
the viewer/ocean. This creates a natural amphitheatre effect where zones wrap around
a central basin, and the visitor can see hints of other zones from most vantage points.

**Metaphor:** The island is a mind laid out as terrain. The shore is first impression.
The interior is depth. The summit is invitation.

---

## Dual-Mode Navigation

### Story Mode (Default)

A guided linear path through the island. The camera follows a scripted route, synced
to scroll on desktop and vertical scroll on mobile. The visitor sees every zone in
narrative order. They can pause, interact with objects, and read overlays at any point,
but the path moves forward. This is the "portfolio presentation" — it tells a story.

**Route:** Shore → Forum → Agora → Atelier → Amphitheatre → Sanctuary → Temple → Beacon

### Explore Mode (Unlocked after Story Mode, or via toggle)

Free camera movement within the island. The visitor can revisit any zone, discover
hidden details, and explore at their own pace. Zones have optional secondary content
that only appears in Explore Mode (behind-the-scenes, process breakdowns, easter eggs).

**Access:** Toggle button in the UI. On first visit, Story Mode is default. On return
visits, Explore Mode is available immediately (stored in localStorage).

---

## Zone Definitions

---

### 1. Shore of Arrival

**Position on island:** Lowest point, sea level, the open crescent edge facing the ocean.

#### Symbolic Meaning
First contact. The threshold between the outside world and the creator's inner world.
The visitor crosses from anonymity into a curated experience. Like stepping off a boat
onto unfamiliar but welcoming ground.

#### Business Meaning
Landing page. The 30-second value proposition. Name, title, tagline, and one compelling
visual. This is where bounce or engagement is decided.

#### Emotional Tone
Wonder, curiosity, warmth. The feeling of arriving somewhere beautiful and wanting to
explore further. Not intimidating, not casual — inviting with gravitas.

#### Environment Type
Sandy beach transitioning to worn stone steps. Shallow turquoise water with caustics.
A few weathered columns half-buried in sand (hint of the classical world ahead).
Tropical vegetation at the edges — palm silhouettes, frangipani, coastal grass.

#### Landmark Ideas
- **The Gate of Names** — a stone archway at the top of the beach steps, carved with
  the creator's name and a short inscription. Not ornate — dignified, like an ancient
  port city entrance.
- **Mooring stones** — carved stone posts at the water's edge, implying "you've docked
  here." Subtle, environmental storytelling.

#### Interaction Opportunities
- Scroll/click to begin the journey (Story Mode trigger)
- Optional: click the gate inscription to read a personal welcome message
- Language selector (if multilingual)

#### Story Mode Use
Opening sequence. Camera starts over the water, approaches the shore, rises up the
steps, passes through the gate. Name and tagline appear as text overlay. Duration:
~10% of the total scroll.

#### Explore Mode Use
Return point. Contains a "restart Story Mode" trigger. Hidden detail: footprints in
the sand that only appear after completing Story Mode once (your path is now carved).

---

### 2. Forum of Systems

**Position on island:** Just beyond the shore, a flat elevated plaza connected by the stone steps.

#### Symbolic Meaning
The agora of craft — where technical systems are built, discussed, and demonstrated.
A forum is a place of structured exchange, not chaos. This represents the disciplined
engineering side: architecture, systems thinking, structured problem-solving.

#### Business Meaning
**Core service showcase: web development, app development, CRM systems, digital
infrastructure.** This is where tech clients and hiring managers find proof of
engineering capability.

#### Emotional Tone
Precision, reliability, intellectual clarity. The feeling of entering a well-organized
workshop where complex things are made with care. Cool confidence, not cold sterility.

#### Environment Type
A paved stone forum with geometric floor patterns (mosaic-style, not ornate). Low
marble walls forming structured sections. Stone tables or pedestals displaying
"system artifacts." Subtle tech influence: thin luminous lines running through the
stone like embedded circuitry. Cool blue-white accent lighting mixed with warm stone.

#### Landmark Ideas
- **The System Table** — a large stone table (like a Roman senate table) with
  holographic/luminous projections above it showing abstract system architecture
  diagrams. Interactive.
- **The Codex Pillars** — short stone pillars, each representing a technology domain
  (frontend, backend, infrastructure, databases). Each glows with a subtle icon.

#### Interaction Opportunities
- Click the System Table to see portfolio projects (web apps, CRM builds, digital systems)
- Click individual Codex Pillars for technology deep-dives
- Hover reveals: brief tech stack labels floating above elements

#### Story Mode Use
Second zone. Camera enters the forum, circles the System Table, pauses for interaction.
Overlay: "I build digital systems" + featured project cards. Duration: ~15% of scroll.

#### Explore Mode Use
Each Codex Pillar opens a detailed case study. Hidden: a "source code fragment" carved
into the underside of the System Table (easter egg for developers who explore carefully).

---

### 3. Agora of Growth

**Position on island:** Adjacent to the Forum, slightly higher, connected by a short colonnade.

#### Symbolic Meaning
The marketplace of ideas and impact — where services are offered, businesses are helped,
and growth is generated. An agora is not just a market; it's where citizens come to
participate in something larger. This represents the business consulting and digital
strategy side.

#### Business Meaning
**Service offering showcase: digital strategy, growth systems, client-facing solutions,
business impact.** This is where agency/brand buyers understand the business value
proposition beyond pure engineering.

#### Emotional Tone
Ambition, partnership, forward momentum. The feeling of a thriving marketplace where
deals are made and value is exchanged. Energetic but structured.

#### Environment Type
An open semi-circular colonnade (like a Greek stoa) with market-like alcoves. Each
alcove represents a service category. Central area has a fountain or water feature
(symbol of flow, growth, continuous movement). Warm lighting, slightly more golden
than the Forum. Vegetation starts creeping in — potted plants, vines on columns.

#### Landmark Ideas
- **The Growth Fountain** — a tiered stone fountain with water flowing upward through
  channels (defying gravity slightly — a subtle magical element). Represents continuous
  growth and upward momentum.
- **Service Alcoves** — three to four arched niches in the colonnade wall, each framing
  a different service offering.

#### Interaction Opportunities
- Click the Growth Fountain for an overview of business philosophy / approach
- Click individual alcoves for service descriptions + case studies
- Testimonial fragments carved into the colonnade walls (hover to read)

#### Story Mode Use
Third zone. Camera sweeps through the colonnade, pauses at the fountain, then moves
past the alcoves. Overlay: service offerings with clear CTAs. Duration: ~12% of scroll.

#### Explore Mode Use
Each alcove opens to a detailed service page. The fountain has a hidden animation
sequence when viewed from directly above. Testimonial stones are scattered and require
exploration to find all of them.

---

### 4. Renaissance Atelier

**Position on island:** Central elevated plateau, the heart of the island. Reached by ascending from the Agora.

#### Symbolic Meaning
The workshop of the polymath. This is the creative core — where all disciplines
converge. The Renaissance ideal: mastery across domains, not specialization in one.
This represents the creator's identity as someone who refuses to be categorized.

#### Business Meaning
**Personal brand anchor and creative philosophy.** This is the "about me" zone — not
a CV, but a spatial manifesto. It answers "why should I trust this person with my
project?" by showing breadth, depth, and intentionality.

#### Emotional Tone
Intimacy, craft, dedication. The feeling of being invited into someone's private
studio where the real work happens. Warm, golden, unhurried. Reverence for the
creative process.

#### Environment Type
An enclosed workshop with high ceilings and large window openings letting in golden
light. Marble walls with embedded shelving. A large central workbench. Scattered
evidence of multiple disciplines: sketches pinned to walls, small sculptures, a
musical instrument resting against a column, a screen showing code, a camera on a
shelf. Not messy — curated disorder.

#### Landmark Ideas
- **The Master's Workbench** — the hero landmark. A large stone-and-wood table with
  objects representing each discipline. This is the first asset to be fully modeled.
- **The Window of Light** — a large arched window flooding the room with golden hour
  light. Frames the view outward to other zones (connecting the Atelier to the world).
- **The Discipline Wall** — a wall with alcoves/shelves, each holding a symbolic
  object for a skill domain.

#### Interaction Opportunities
- Click the Workbench for the personal introduction / about overlay
- Click objects on the Discipline Wall for skill breakdowns
- The Window of Light serves as a natural "look out" point showing the rest of the island
- Optional: a sketchbook on the table that opens to show process work

#### Story Mode Use
Fourth zone, centerpiece. Camera enters through an archway, circles the room, focuses
on the workbench, then pulls back to the window. This is the emotional peak of the
first half. Duration: ~18% of scroll (longest single zone).

#### Explore Mode Use
Most interactive zone. Every object on the workbench and shelves is clickable. Hidden:
a drawer in the workbench that opens to reveal a personal note / philosophy statement.

---

### 5. Amphitheatre of Sound

**Position on island:** Descending from the Atelier toward the tropical coast side. Carved into a hillside.

#### Symbolic Meaning
The stage of expression. Where the private creative process becomes public performance.
Music, singing, and stage work are acts of vulnerability and connection — this zone
embodies that transformation from maker to performer.

#### Business Meaning
**Creative performance showcase: music production, AI music, singing, stage performance,
audio-visual content.** Demonstrates the creator's artistic range beyond code and design.

#### Emotional Tone
Rhythm, passion, release. The feeling of live music in an intimate outdoor venue.
Not a stadium — a curated acoustic space where sound matters. Warm evening light,
the first stars appearing.

#### Environment Type
A small classical amphitheatre carved into the hillside, facing the ocean. Stone
seating in semicircular tiers. A circular performance stage at the bottom. Acoustic
panels styled as carved stone reliefs. Tropical vegetation growing between the seating
rows — nature reclaiming architecture. Warm dusk lighting with lanterns placed along
the aisles.

#### Landmark Ideas
- **The Stage** — a circular stone platform with subtle luminous rings that pulse like
  a sound visualizer when activated. Not a modern concert stage — an ancient performance
  space with embedded technology.
- **The Echo Wall** — a curved wall behind the stage designed to reflect sound. Carved
  with abstract waveform patterns (not literal sound waves — stylized relief).
- **Instrument Rest** — a stone ledge where a stylized instrument form rests (not a
  specific copyrighted instrument — an abstract lyre/guitar hybrid).

#### Interaction Opportunities
- Click the Stage to play audio samples or see performance portfolio
- The Echo Wall shows a music production process breakdown on click
- Ambient sound: optional subtle music plays in this zone (user-toggled)
- Sound visualizer rings on the stage react to audio if playing

#### Story Mode Use
Fifth zone. Camera descends into the amphitheatre from above, sweeps across the
seating, focuses on the stage. Audio fades in if the user has enabled sound.
Overlay: music/performance portfolio. Duration: ~10% of scroll.

#### Explore Mode Use
Sitting in different seats changes the ambient audio perspective (subtle effect).
The Echo Wall has hidden track previews. A constellation pattern above the amphitheatre
maps to music releases (only visible at night cycle if implemented).

---

### 6. Dino Sanctuary

**Position on island:** A secluded valley/grotto behind the Atelier, reached by a side path. Partially hidden.

#### Symbolic Meaning
The imagination preserve. A space where the creator's most ambitious and personal
creative vision lives — the original dinosaur universe and AI-generated world-building.
A sanctuary is a protected place: this represents creative projects that are deeply
personal, not client work.

#### Business Meaning
**AI filmmaking and creative world-building showcase.** Demonstrates capability in
AI-assisted 3D production, storytelling, narrative design, and experimental media.
Signals to creative clients that this person can build entire worlds, not just websites.

#### Emotional Tone
Awe, mystery, primal wonder. The feeling of discovering something ancient and alive
in a hidden place. Not scary — reverent. Like finding dinosaur bones that still hum
with energy. The mood of a natural history museum crossed with a sacred grove.

#### Environment Type
A lush enclosed valley with high rock walls. Tropical vegetation is dense here —
ferns, moss, hanging vines. Stone ruins partially overgrown, suggesting an ancient
civilization that studied these creatures. A natural pool with bioluminescent water.
Fossil fragments embedded in rock faces. The air feels thick and warm.

#### Landmark Ideas
- **The Fossil Arch** — a natural stone arch formed by two curved fossil ribcages
  meeting overhead. The entrance to the sanctuary. Original design, not any
  copyrighted dinosaur.
- **The Hatchery** — a nest-like stone formation with glowing egg-shaped objects,
  each representing a different creative project or film in the dinosaur universe.
- **The Chronicle Wall** — a cliff face with carved/projected storyboard sequences
  showing the narrative of the dinosaur universe. Not film screenshots — stylized
  relief carvings that tell the story.

#### Interaction Opportunities
- Click the Hatchery eggs to see individual film/project details
- The Chronicle Wall scrolls through story synopsis on interaction
- The bioluminescent pool reflects scenes from the dinosaur universe
- Ambient: distant creature calls (original sound design, not Jurassic Park)

#### Story Mode Use
Sixth zone (narrative detour). Camera follows the side path, enters through the
Fossil Arch, reveals the sanctuary. This is the "surprise" moment — unexpected
depth. Overlay: AI filmmaking portfolio. Duration: ~12% of scroll.

#### Explore Mode Use
Most discovery-oriented zone. Hidden nesting sites in the vegetation. The pool
surface shows different reflections depending on viewing angle. A "field journal"
prop opens to concept art and world-building notes.

---

### 7. Temple of Journeys

**Position on island:** On the seaward slope, between the Amphitheatre and the Beacon. Overlooking the ocean.

#### Symbolic Meaning
The archive of experience. Travel, photography, and cultural immersion as sources of
creative fuel. A temple is a place of reflection — this zone represents the accumulated
wisdom from seeing the world, not just building things in a studio.

#### Business Meaning
**Photography, travel content, and cultural storytelling showcase.** Demonstrates
visual eye, cultural sensitivity, and the breadth of real-world experience that
informs creative decisions. Also signals lifestyle/travel content capability.

#### Emotional Tone
Nostalgia, wanderlust, peaceful reflection. The feeling of sitting in a beautiful
place and looking through photographs of other beautiful places. Contemplative, not
restless. Sunset light.

#### Environment Type
An open-air temple with slender columns and no walls — maximum sky and ocean visibility.
Vietnamese architectural influence: curved rooflines, lantern strings, warm wood
elements mixed with stone. A viewing terrace overlooking the sea. Photo frames or
stone tablets arranged like a gallery. Tropical flowers — lotus, frangipani. Evening
light with warm lantern glow.

#### Landmark Ideas
- **The Horizon Terrace** — a cantilevered stone platform extending over the cliff
  edge, framing the ocean sunset. The ultimate "viewpoint."
- **The Memory Gallery** — stone tablets or floating frames arranged along the colonnade,
  each holding a photograph or travel story.
- **The Lantern Path** — a string of Vietnamese-style lanterns marking the path through
  the temple. Each lantern represents a destination visited.

#### Interaction Opportunities
- Click Memory Gallery frames for full-resolution photographs with location/story
- The Horizon Terrace triggers a panoramic overlay showing a travel montage
- Lanterns glow brighter on hover, showing destination names
- Optional: a "postcard" interaction where clicking a landmark generates a shareable image

#### Story Mode Use
Seventh zone. Camera moves along the cliff path, enters the temple, sweeps through
the gallery, ends at the Horizon Terrace facing the sunset. Contemplative pace.
Overlay: photography portfolio + travel stories. Duration: ~10% of scroll.

#### Explore Mode Use
Each gallery frame opens a full photo story. The Horizon Terrace has a time-of-day
cycle if explored long enough. Hidden: a guest book stone where previous visitors'
cities are logged (requires backend — post-MVP).

---

### 8. Beacon of Contact

**Position on island:** The highest point of the island. A tower or elevated platform above all other zones.

#### Symbolic Meaning
The signal fire. The culmination of the journey. After seeing the work, understanding
the person, and feeling the vision — this is the call to action. A beacon is a guide
and an invitation: "now that you know me, let's talk."

#### Business Meaning
**Contact and inquiry hub.** This is conversion. Contact form, email, social links,
booking link. Every user flow terminates here. The entire island was designed to make
this moment feel earned, not transactional.

#### Emotional Tone
Clarity, confidence, openness. The feeling of standing at a summit with a clear view
in all directions. Not desperate ("please hire me") — assured ("here's how to reach me").
Bright, clean, elevated.

#### Environment Type
A stone tower or elevated platform at the island's peak. Clean geometry — minimal
decoration. The beacon itself: a luminous structure (not a literal fire — an abstract
light form) that is visible from every other zone. 360-degree view of the entire island
below. Wind, open sky, clear horizon. The most "designed" and least "natural" zone —
intentionally architectural.

#### Landmark Ideas
- **The Beacon** — an abstract luminous sculpture at the center. Not a lighthouse —
  something more original. A vertical light column, or a floating geometric form that
  emits warm light. Represents the creator's signal to the world.
- **The Contact Plinth** — a stone platform with carved contact channels (email, social,
  calendar). In 3D, these glow when hovered. In overlay, they're functional links.
- **The View Ring** — a circular railing/wall around the platform with directional
  markers pointing to each zone below, labeled.

#### Interaction Opportunities
- Click the Beacon to open the contact form overlay
- Click individual Contact Plinth entries for direct channel links
- The View Ring labels are clickable — they navigate back to specific zones
- Optional: a "send a signal" animation when the contact form is submitted

#### Story Mode Use
Final zone. Camera rises to the summit, the beacon comes into full view, the island
spreads below. This is the climax. Contact overlay appears with clear CTA. Duration:
~13% of scroll.

#### Explore Mode Use
Always accessible as a floating nav element ("go to Beacon" button). The View Ring
serves as a world map. After submitting a contact form, the beacon's light changes
color briefly (confirmation).

---

## World Route Map

### Story Mode Route (Linear)

```
                                    ┌─────────────┐
                                    │   BEACON    │ 8. Summit
                                    │  of Contact │
                                    └──────┬──────┘
                                           │
                              ┌────────────┼────────────┐
                              │            │            │
                     ┌────────┴───┐  ┌─────┴─────┐  ┌──┴──────────┐
                     │ TEMPLE of  │  │   DINO    │  │             │
                     │ Journeys   │  │ SANCTUARY │  │             │
                     └────────┬───┘  └─────┬─────┘  │             │
                              │            │        │             │
                     ┌────────┴───┐  ┌─────┴─────┐  │             │
                     │AMPHITHEATRE│  │            │  │             │
                     │ of Sound   │──┤  ATELIER   ├──┘             │
                     └────────┬───┘  │Renaissance │               │
                              │      └─────┬─────┘               │
                              │            │                      │
                     ┌────────┴───────┐    │                      │
                     │  AGORA of      │────┘                      │
                     │  Growth        │                           │
                     └────────┬───────┘                           │
                              │                                   │
                     ┌────────┴───────┐                           │
                     │  FORUM of      │                           │
                     │  Systems       │                           │
                     └────────┬───────┘                           │
                              │                                   │
                     ┌────────┴───────┐                           │
                     │   SHORE of     │───────────────────────────┘
                     │   Arrival      │   (ocean wraps around)
                     └────────────────┘
```

### Story Mode Scroll Distribution

| Zone | Scroll % | Duration feel |
|------|---------|--------------|
| Shore of Arrival | 0-10% | Quick — arrival, not lingering |
| Forum of Systems | 10-25% | Substantial — core service showcase |
| Agora of Growth | 25-37% | Medium — business value |
| Renaissance Atelier | 37-55% | Longest — emotional center |
| Amphitheatre of Sound | 55-65% | Medium — artistic range |
| Dino Sanctuary | 65-77% | Medium — surprise depth |
| Temple of Journeys | 77-87% | Medium — contemplative wind-down |
| Beacon of Contact | 87-100% | Climax — call to action |

### Explore Mode Branches

In Explore Mode, the linear route dissolves. Any zone is reachable from any other
via the island terrain. However, some paths exist as curated optional routes:

| Branch | From → To | What it reveals |
|--------|----------|----------------|
| The Hidden Path | Atelier → Dino Sanctuary | A narrow overgrown trail behind the Atelier. Rewards exploration. |
| The Cliff Walk | Amphitheatre → Temple | A scenic coastal path with photography viewpoints along the way. |
| The Arcade | Forum → Agora | A covered colonnade connecting the two zones, with testimonials carved into columns. |
| The Summit Trail | Any zone → Beacon | A visible trail upward. The Beacon's light is always visible as a wayfinding element. |
| The Shore Return | Beacon → Shore | A fast descent path, closing the loop. |

---

## MVP vs. Expansion

### MVP (v1) — Must ship

| Zone | Scope |
|------|-------|
| Shore of Arrival | Full — it's the landing page |
| Forum of Systems | Full — primary service showcase |
| Renaissance Atelier | Full — personal brand anchor (benchmark zone) |
| Beacon of Contact | Full — conversion point |

### v1.5 — Ship soon after MVP

| Zone | Scope |
|------|-------|
| Agora of Growth | Full — completes the business offering |
| Amphitheatre of Sound | Basic — stage + 2-3 interactive objects |

### v2 — Expansion

| Zone | Scope |
|------|-------|
| Dino Sanctuary | Full — complex environment, needs final assets |
| Temple of Journeys | Full — needs photography content ready |
| Explore Mode toggle | Full free-camera navigation |
| Hidden paths/branches | All optional routes |

### Rationale

MVP focuses on: arrive → see technical capability → understand the person → contact.
That's the minimum viable conversion funnel. Creative showcases (music, film, travel)
add depth but aren't required for the first client-ready deployment.

---

## Zone Connectivity Rules

1. **Every zone must be visually hinted from at least one adjacent zone** — visitors
   should see the next zone's silhouette before arriving. No teleportation.
2. **The Beacon is visible from every zone** — its light serves as a persistent
   wayfinding element and a subtle CTA reminder.
3. **Zones share no overlapping geometry** — clear boundaries defined by terrain
   changes, vegetation, or architectural elements.
4. **Transitions between zones use terrain features** — steps, paths, archways,
   bridges. Not loading screens, not fade-to-black.
5. **Each zone has one primary entrance and one primary exit** — for Story Mode
   camera pathing. Explore Mode ignores this constraint.
6. **Sound transitions are crossfaded** — ambient audio blends between zones over
   a 3-second window, never cuts abruptly.
