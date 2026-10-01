# Audio System Architecture & Sonic Design

**Project:** port-2026 / Island of Memory
**Status:** Approved Specification (Step 20)
**Core Philosophy:** Sound as storytelling support, spatial emotion, and museum atmosphere — never intrusive noise.

---

## 1. System Architecture

The audio pipeline is structured around Web Audio API with a decoupled routing graph:

```
[Procedural Ambient Generators / Buffer Sources]
   │
   ├── Shore Ambience (Ocean surf + coastal breeze) ────────▶ [Zone Gain: Shore] ──┐
   ├── Forum Ambience (Resonant data hum + stone echo) ─────▶ [Zone Gain: Forum] ──┤
   ├── Dino Ambience (Primeval canopy air + mist pulse) ────▶ [Zone Gain: Dino]  ──┼─▶ [Master Ducking Gain]
   ├── Amphitheatre Stems (Rhythm + Harmony + Vocals) ─────▶ [Stem Gains]       ──┤        (Ducks -6dB
   └── UI Feedback (Optical hover ticks + seal chimes) ────▶ [SFX Gain]         ──┘         when reading)
                                                                                            │
                                                                                            ▼
                                                                                   [Master Volume Gain]
                                                                                            │
                                                                                            ▼
                                                                                  [Tab Focus / Dim Gain]
                                                                                      (Ramps to 0
                                                                                       on blur/hidden)
                                                                                            │
                                                                                            ▼
                                                                                  [Destination / Speakers]
```

### Architectural Principles
1. **Zero External File Dependency (Procedural First)**:
   - High-quality Web Audio API synthesis (filtered noise buffers, bandpass oscillators, custom envelope curves) provides rich soundscapes immediately with 0MB download.
   - External audio files (MP3/WAV) can be layered seamlessly as progressive enhancements.
2. **Explicit User Opt-In ("Gate of Sound")**:
   - Modern browsers strictly block autoplay.
   - The landing experience presents a non-intrusive dialog: `[ Enter With Sound ]` or `[ Continue in Silence ]`.
3. **Persistent Audio Memory**:
   - Choice is remembered in `localStorage` under `port-audio-enabled`.
   - Returning visitors who chose sound resume smoothly after any interaction.

---

## 2. Zone-Based Ambience Plan

Each zone has a distinct acoustic identity that reflects its narrative meaning and crossfades over a 3.0-second linear gain curve:

| Zone | Sonic Texture | Synthesis Technique | Frequency Range |
|---|---|---|---|
| **Shore of Arrival** | Coastal ocean swell, gentle rhythmic wave foam, warm sea breeze | Pink noise shaped through resonant low-pass filter modulated by a 0.2Hz LFO | 40Hz — 1,800Hz |
| **Forum of Systems** | Subterranean clean electrical data current, quiet architectural room tone | 60Hz & 120Hz sub-sine tones + filtered bandpass air tone (840Hz) | 50Hz — 1,200Hz |
| **Dino Sanctuary** | Primeval valley breeze, distant mist pulse, biological bioluminescent hum | Multi-oscillator minor triad (F# / C# / G#) through slow chorus filter | 80Hz — 3,200Hz |
| **Amphitheatre of Sound** | Symmetrical 3-stem musical orchestra: Analog kick, Prophet Dm9 pad, Dorian flute | 3 controllable stem channels with live mute/unmute steles & lyre harp | 38Hz — 8,000Hz |

---

## 3. Stereo vs. Positional Audio

Spatial audio can be disorienting or muddy if overused. We follow strict classification rules:

### A. What Remains Stereo (Headphone / Speaker Plane)
- **Zone Environmental Ambience**: Ocean waves, wind, room tone, and background pads remain stereo. This ensures the environment surrounds the listener without sudden panning jumps when turning the camera.
- **Narrative Music Stems**: The rhythm, synth pads, and lead melodies remain balanced stereo mixes for fidelity.
- **UI & Interaction Feedback**: Hover ticks, button clicks, and case-study drawer sounds remain centered.

### B. What Uses Positional (PannerNode / 3D Space)
- **The Central Lyre Monument (`x: -3, z: -46`)**: Placed in 3D coordinate space. When the user orbits or flies closer in Explore Mode, volume naturally scales via inverse distance model (`rolloffFactor: 1.2`, `maxDistance: 25m`).
- **Memory Seals / Relics**: When within 4 meters, the seal's crystalline hum pans slightly left/right based on the camera’s heading.

---

## 4. Focus, Dimming & Ducking Rules

Sound must never become an annoyance when the user is multitasking or reading:

1. **Page Focus Loss (`visibilitychange` & `window.blur`)**:
   - When the user switches tabs or minimizes the window, the audio master gain **smoothly ramps to 0.0 in 150ms**.
   - When the tab regains focus, it **ramps back to normal volume in 250ms**.
   - Prevents the portfolio from blasting background music when the user is working elsewhere.
2. **Contextual Reading Ducking (Active Drawer / Case Study)**:
   - When opening a case study drawer (`CaseStudyPanel`) or reading a Memory Seal, background sound **ducks automatically by 60% (-8dB)**.
   - Full volume restores instantly when the drawer closes.

---

## 5. UI & Interaction Behavior

1. **Persistent Top-Right Equalizer (`NavigationMenu`)**:
   - 3 animated equalizer bars jump dynamically when audio is active.
   - Clicking toggles mute/unmute state with audio feedback.
2. **Entry Welcome Banner (`AudioOptInModal`)**:
   - Appears once on the first session visit.
   - Two clear options:
     - `[ Enter with Sound ]`: Initializes AudioContext, unlocks procedural ambient soundscape, and plays a welcoming soft chord.
     - `[ Continue Muted ]`: Keeps experience completely silent; equalizer displays `Audio: OFF`.
3. **Tactile Optical Ticks (`playHoverTick()`)**:
   - An 880Hz soft acoustic click confirms interaction affordances without gamey cartoon bleeps.

---

## 6. Mobile & Accessibility Awareness

- **`prefers-reduced-motion` Respect**: Reduces dynamic LFO modulation depth so sound feels calmer and static.
- **Mobile Network & Battery**: Procedural synthesis consumes zero mobile data and < 1% CPU on modern mobile WebKit/Blink.
- **Screen Reader Friendly**: Audio toggle has accurate `aria-label` and `aria-pressed` states.
