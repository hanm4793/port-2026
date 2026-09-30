// =============================================================================
// Dino Sanctuary — zone configuration
// =============================================================================
//
// SPATIAL LAYOUT:
//   Follows the Forum of Systems (z = -15).
//   z = -20 .. -24  Fossil Arch entrance gateway
//   z = -25 .. -32  Sanctuary basin, Bioluminescent pool (center x=0)
//   z = -30 .. -33  Pipeline Altar / World-Bible Altar (center x=3.5)
//   z = -34 .. -38  Cliff walls, overgrown stone monoliths
//
// Coordinates match Chapter 4 ("Worlds") in StoryConfig.

export const SANCTUARY_CAMERAS = {
  /** Entering the sanctuary valley through the Fossil Arch */
  entrance: {
    position: [0, 4.5, -18] as [number, number, number],
    target: [0, 2.5, -28] as [number, number, number],
    fov: 50,
  },
  /** Dramatic framing of the Fossil Arch ribcage */
  archApproach: {
    position: [2.5, 3.2, -21] as [number, number, number],
    target: [-1, 3.5, -25] as [number, number, number],
    fov: 46,
  },
  /** Centered on the Pipeline Altar */
  altarFocus: {
    position: [3.8, 3.0, -27] as [number, number, number],
    target: [3.5, 2.0, -31] as [number, number, number],
    fov: 44,
  },
  /** Wide cinematic overview of the glowing pool and basin */
  poolOverview: {
    position: [-4.5, 4.2, -26] as [number, number, number],
    target: [1.5, 1.8, -31] as [number, number, number],
    fov: 52,
  },
  /** Free explore vantage */
  explore: {
    position: [6.0, 7.0, -24] as [number, number, number],
    target: [0, 1.5, -30] as [number, number, number],
    fov: 56,
  },
  /** Mobile optimized portrait frame */
  mobile: {
    position: [0, 5.0, -22] as [number, number, number],
    target: [0, 2.5, -30] as [number, number, number],
    fov: 54,
  },
};

/** Palette adhering to Archaeological Futurism */
export const SANCTUARY_PALETTE = {
  volcanicDark: '#23201E',    // Basalt canyon cliffs
  sacredSandstone: '#BFA276', // Weathered archaeological altars
  fossilBone: '#E3DCce',      // Mineralized ribcage arches
  amberResin: '#E59B3C',      // Glowing amber egg relics
  bioluminescent: '#68C5AC',  // Pool luminescence & spore crystals
  deepCanopy: '#1E3D24',      // Dense primeval foliage
  mistHaze: '#8DA695',        // Damp valley atmospheric haze
} as const;

/** 5-phase production pipeline for the interactive Altar */
export const CINEMATIC_PIPELINE = [
  {
    step: '01',
    name: 'Lore & World Bible',
    tagline: 'Fictional anatomy, behavioral biology & speculative ecology.',
    color: '#E59B3C', // Amber
  },
  {
    step: '02',
    name: '3D Pre-Vis in Blender',
    tagline: 'Cinematography, rigid camera tracks, lighting angles & set blocking.',
    color: '#6BA3C7', // Technical Blue
  },
  {
    step: '03',
    name: 'Steered Neural Diffusion',
    tagline: 'Multi-pass ControlNet depth, temporal coherence & custom LoRAs.',
    color: '#68C5AC', // Bioluminescent Teal
  },
  {
    step: '04',
    name: 'Orchestral Score & Foley',
    tagline: 'Live vocal tracks, analog synthesis, and cinematic sound design.',
    color: '#C9A84C', // Gold Leaf
  },
  {
    step: '05',
    name: 'Mastering & Color Grade',
    tagline: 'Film emulation grain, ACES color pipelines & 4K cinematic export.',
    color: '#D4725C', // Coral Accent
  },
] as const;
