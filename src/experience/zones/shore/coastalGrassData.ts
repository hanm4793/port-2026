// =============================================================================
// Deterministic Coastal Grass Data & Generation
// Uses a seeded PRNG (LCG) to ensure 100% reproducible blade placement across builds.
// =============================================================================

export interface GrassBladeData {
  x: number;
  y: number;
  z: number;
  rotation: number;
  height: number;
  phase: number;
}

export const GRASS_PATCHES = [
  // Beach edges
  { center: [-8, 0.25, 8] as const, count: 14, spread: 2.0 },
  { center: [9, 0.2, 7] as const, count: 12, spread: 2.0 },
  { center: [-11, 0.2, 5] as const, count: 10, spread: 1.5 },
  { center: [11, 0.22, 6] as const, count: 8, spread: 1.5 },
  // Path borders (inland)
  { center: [-2.5, 0.25, -5] as const, count: 10, spread: 1.2 },
  { center: [2.5, 0.25, -6] as const, count: 10, spread: 1.2 },
  { center: [-3, 0.2, -12] as const, count: 12, spread: 1.5 },
  { center: [3, 0.2, -10] as const, count: 12, spread: 1.5 },
  { center: [-2.5, 0.2, -18] as const, count: 8, spread: 1.0 },
  { center: [2.5, 0.2, -20] as const, count: 8, spread: 1.0 },
  // Near gate
  { center: [-4, 0.3, 2] as const, count: 6, spread: 0.8 },
  { center: [4, 0.3, 2] as const, count: 6, spread: 0.8 },
] as const;

/** Simple seedable Linear Congruential Generator (LCG) */
function createSeededPRNG(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Generate deterministic blade data array.
 * Calling this with the same seed will always produce identical output.
 */
export function generateDeterministicGrassBlades(seed = 1337): GrassBladeData[] {
  const prng = createSeededPRNG(seed);
  const blades: GrassBladeData[] = [];

  for (const patch of GRASS_PATCHES) {
    for (let i = 0; i < patch.count; i++) {
      const angle = prng() * Math.PI * 2;
      const dist = prng() * patch.spread;
      const x = patch.center[0] + Math.cos(angle) * dist;
      const z = patch.center[2] + Math.sin(angle) * dist;
      const y = patch.center[1];
      const rotation = prng() * Math.PI;
      const height = 0.25 + prng() * 0.35;
      const phase = prng() * Math.PI * 2;

      blades.push({ x, y, z, rotation, height, phase });
    }
  }

  return blades;
}

export const DETERMINISTIC_GRASS_BLADES = generateDeterministicGrassBlades();
