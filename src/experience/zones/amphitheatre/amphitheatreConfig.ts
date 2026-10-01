// =============================================================================
// Amphitheatre of Sound — zone configuration
// =============================================================================
//
// SPATIAL LAYOUT:
//   Located on the coastal hillside ridge following the Dino Sanctuary.
//   z = -42 .. -58, centered around x = -3
//   - Circular Performance Stage (Orchestra): [x: -3, y: 0.6, z: -46]
//   - Tiered Semicircular Theatron: ascends from z = -48 to z = -56, y = 0.8 to 4.2
//   - Echo Wall (Skene) & Acoustic Sails: backdrop at z = -57
//   - Overlooks coastal sea to the left (x < -15)

export const AMPHITHEATRE_CAMERAS = {
  /** Ridge entrance: cresting the hill, gazing down into the amphitheatre */
  ridgeEntrance: {
    position: [-3, 6.5, -38] as [number, number, number],
    target: [-3, 1.2, -48] as [number, number, number],
    fov: 52,
  },
  /** Theatron overview: sweeping perspective of tiered stone seats */
  theatronOverview: {
    position: [5.5, 4.8, -42] as [number, number, number],
    target: [-3, 1.4, -48] as [number, number, number],
    fov: 48,
  },
  /** Stage close-up: framed in front of the performance stage and resonant stems */
  stageCloseUp: {
    position: [-3, 2.2, -42.5] as [number, number, number],
    target: [-3, 1.6, -47] as [number, number, number],
    fov: 46,
  },
  /** Looking up from the stage towards the curved Echo Wall */
  echoWallPerspective: {
    position: [-3, 1.4, -45] as [number, number, number],
    target: [-3, 3.8, -54] as [number, number, number],
    fov: 54,
  },
  /** Free explore vantage */
  explore: {
    position: [7, 8, -40] as [number, number, number],
    target: [-3, 1.5, -48] as [number, number, number],
    fov: 56,
  },
  /** Mobile framing: vertical focus on the circular stage and spotlight beam */
  mobile: {
    position: [-3, 4.2, -40] as [number, number, number],
    target: [-3, 1.5, -47] as [number, number, number],
    fov: 54,
  },
};

/** Palette adhering to Greek archaeological refinement + theatrical warmth */
export const AMPHITHEATRE_PALETTE = {
  limestoneTier: '#DDD4C6',   // Sun-bleached Greek limestone seating
  limestoneShadow: '#9A9184', // Recessed tier risers
  stageMarble: '#ECE6DC',     // Circular polished stage floor
  darkBasalt: '#262320',      // Foundation rim & stage perimeter
  resonantBronze: '#8B6D3A',  // Acoustic vibration plates
  sailLinen: '#F5F0E8',       // Suspended acoustic reflector sails
  theatreSpot: '#FFE6B8',     // Warm dramatic theatrical beam
  oceanDusk: '#2B4A55',       // Coastal twilight horizon backdrop
} as const;

/** 3-layer audio stem configuration for the interactive performance stage */
export const AUDIO_STEMS = [
  {
    id: 'rhythm',
    name: 'Percussion & Sub-Bass',
    tagline: 'Analog kick, earthen percussion, and deep sub-frequency pulse.',
    color: '#D4725C', // Terracotta / Coral
    defaultGain: 1.0,
    speed: 1.8,
  },
  {
    id: 'harmony',
    name: 'Harmonic Synths & Strings',
    tagline: 'Sequential Prophet analog pads and orchestral cello arrangements.',
    color: '#6BA3C7', // Resonant Sky Blue
    defaultGain: 1.0,
    speed: 1.1,
  },
  {
    id: 'vocals',
    name: 'Lead Vocal & Acoustic Lyre',
    tagline: 'Solo studio vocal tracks and authentic bamboo woodwind melodies.',
    color: '#C9A84C', // Gold Leaf
    defaultGain: 1.0,
    speed: 0.8,
  },
] as const;

export type AudioStemId = (typeof AUDIO_STEMS)[number]['id'];
