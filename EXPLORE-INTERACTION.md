# Explore Mode — Interaction Design Specification

**Project:** port-2026 / Island of Memory
**Status:** Approved Specification (Step 19)
**Aesthetic Core:** Archaeological Futurism & Museum-Instrument Precision

---

## 1. Design Thesis & Emotional Tone

Explore Mode transforms the portfolio from a linear reading experience into a **scholarly spatial expedition**. The user operates as an archaeologist-engineer examining a living archipelago of digital artifacts.

### The "Museum Instrument" Principle
- **No Cartoon Game UI**: No floating green question marks, spinning arcade coins, or bouncing arrows.
- **Precision Optical Instruments**: UI elements mimic brass telescopes, navigational astrolabes, and astronomical drafting tools. Fine hairline borders (`0.5px - 1px`), gold leaf accents (`#C9A84C`), cyan data reticles (`#6BA3C7`), and monospace coordinates.
- **Restrained Spatial Presence**: Hotspots and prompts do not shout across the map; they emerge with distance attenuation as the player approaches, rewarding deliberate curiosity.

---

## 2. Interaction State Machine

Every interactable artifact in Explore Mode (Landmarks, Memory Seals, Stem Steles, Archive Alcoves) exists in one of four deterministic states:

```
┌──────────────┐     Distance < 8.0m      ┌─────────────────────────┐
│   DORMANT    │ ───────────────────────▶ │   PROXIMITY DETECTED    │
│  (Ambient)   │ ◀─────────────────────── │  (Subtle Halation Pulse)│
└──────────────┘     Distance > 8.0m      └────────────┬────────────┘
                                                       │
                                  Distance < 3.2m      │ Focus Ray
                                  or Mouse Hover       ▼
┌──────────────┐                          ┌─────────────────────────┐
│  INSPECTING  │ ◀─────────────────────── │     FOCUSED / READY     │
│   (Active    │       Press [E]          │  (Museum Reticle + Tag) │
│    Drawer)   │     or Direct Click      └─────────────────────────┘
└──────┬───────┘
       │ Close (ESC / Click Backdrop)
       ▼
[Return to Previous State]
```

### State Definitions
1. **Dormant (Distance > 8.0m)**:
   - Geometry displays its natural PBR material and slow ambient breathing pulse (0.3 - 0.5 intensity).
   - No floating 2D text, zero screen clutter.
2. **Proximity Detected (3.2m < Distance ≤ 8.0m)**:
   - Ground projection ring beneath the object brightens.
   - Core emissive intensity gently lifts to 0.8.
   - An optical indicator (small hollow diamond) registers on the screen.
3. **Focused / Ready (Distance ≤ 3.2m or Raycast Hover)**:
   - Fine brass bracket reticle locks onto the artifact: `[ E · Examine Artifact ]`.
   - Subtle acoustic tick (880Hz soft ping) plays via Web Audio API.
   - Screen cursor changes to precision crosshair pointer.
4. **Inspecting (Active State)**:
   - Contextual drawer (`CaseStudyPanel`) slides in smoothly from the right, or the `MemorySeal` modal unfolds.
   - Camera smoothly pulls back 1.2m and dampens orbit movement to maintain spatial context.
   - Audio volume of ambient world ducks by 30% to prioritize focus on reading.

---

## 3. Hotspot Categories & Affordance Rules

| Hotspot Type | 3D Marker Representation | Action Verb | Dispatched Action |
|---|---|---|---|
| **Primary Landmark** | Monumental rotating relic (Workbench, System Table, Altar, Lyre) | `[ E · Inspect Architecture ]` | Opens technical scope or system drawer |
| **Case Study Alcove** | Recessed stone niche with gold-lit architraves | `[ E · Read Case Study ]` | Opens project case study drawer with metrics |
| **Audio Stem Stele** | Bronze resonant monolith with soundwave glyph | `[ E · Toggle Audio Stem ]` | Mutes/unmutes audio channel + visual ring wave |
| **Memory Seal** | Octahedral celestial crystal hovering over etched ground ring | `[ E · Decrypt Memory Seal ]` | Opens archaeological lore / philosophy modal |

---

## 4. Spatial Orientation & Wayfinding (Preventing Getting Lost)

Because Explore Mode allows free roaming across 4 large zones (Shore, Forum, Dino Sanctuary, Amphitheatre), users must maintain orientation without relying on an intrusive mini-map:

1. **The Summit Beacon Needle**:
   - The distant gold Beacon at the island summit (`z = -78`) is always visible on the horizon.
   - In the top HUD, a celestial compass needle continuously tracks the angular heading to the Beacon, functioning like an ancient mariner’s lodestone.
2. **Zone Transition Toasts**:
   - As the player avatar crosses the territorial boundary into a new zone (e.g. crossing the open bronze gates into Dino Sanctuary), a refined cinematic toast gracefully glides in:
     `[ ZONE ACCESSED // FORUM OF SYSTEMS · 14.5° N ]`
   - Disappears automatically after 3.2 seconds.
3. **Paved Royal Trail (Via Sacra)**:
   - The continuous stone road connects Shore &rarr; Forum &rarr; Dino Sanctuary &rarr; Amphitheatre. Users can simply follow the paved stone stones if they wish to retrace the narrative route.
4. **Waypoint Fast Travel**:
   - The bottom bar provides instantaneous teleportation to any named landmark with smooth fade-to-black transition.

---

## 5. Returning to Story Mode

The user must never feel trapped in Explore Mode:
- **Persistent Return Pill**: Always anchored at top-left (`[ ← Return to Guided Story ]`).
- **Shore Portal Orbs**: Clicking the gold Story Orb at the Gate of Names returns to Story Mode at Chapter 1.
- **Context Retention**: Returning to Story Mode places the user at the story chapter closest to their current exploration position, rather than resetting to 0% progress.

---

## 6. Accessibility & Mobile Adaptation

- **Keyboard First**: All interactions operable via `E`, `Space`, or `Enter`. Movement via `WASD` or `Arrow Keys`.
- **High-Contrast Readability**: All UI text is pure cream `#F5F0E6` or gold `#C9A84C` on dark basalt `#1A1816` (contrast ratio > 12:1).
- **Mobile Touch**:
  - Virtual 4-way D-Pad appears on touch devices.
  - Floating action button `[ Tap to Inspect ]` replaces keyboard `[E]`.
  - Touch-drag anywhere on the canvas rotates the camera without needing dual-stick controllers.
