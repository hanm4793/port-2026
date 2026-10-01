import { describe, it, expect } from 'vitest';
import {
  generateDeterministicGrassBlades,
  GRASS_PATCHES,
  DETERMINISTIC_GRASS_BLADES,
} from '@/experience/zones/shore/coastalGrassData';

describe('Deterministic Coastal Grass Generator', () => {
  it('generates the exact expected blade count across all patches', () => {
    const totalExpected = GRASS_PATCHES.reduce((sum, p) => sum + p.count, 0);
    expect(DETERMINISTIC_GRASS_BLADES.length).toBe(totalExpected);
    expect(DETERMINISTIC_GRASS_BLADES.length).toBe(116);
  });

  it('produces 100% reproducible results for identical seeds', () => {
    const runA = generateDeterministicGrassBlades(42);
    const runB = generateDeterministicGrassBlades(42);

    expect(runA).toEqual(runB);
  });

  it('keeps all grass blade coordinates within valid island beach bounds', () => {
    DETERMINISTIC_GRASS_BLADES.forEach((b) => {
      expect(b.x).toBeGreaterThanOrEqual(-15);
      expect(b.x).toBeLessThanOrEqual(15);
      expect(b.z).toBeGreaterThanOrEqual(-25);
      expect(b.z).toBeLessThanOrEqual(15);
      expect(b.height).toBeGreaterThanOrEqual(0.25);
      expect(b.height).toBeLessThanOrEqual(0.65);
    });
  });
});
