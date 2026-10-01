import { describe, it, expect } from 'vitest';
import { resolveZoneFromZ, computeBeaconHeading, ZONE_BOUNDARIES } from '@/lib/zone-utils';

describe('Zone Navigation & Spatial Decoupling Utilities', () => {
  it('correctly maps world Z coordinate to distinct territory boundaries across all 6 zones', () => {
    // Shore (z = 10)
    const shore = resolveZoneFromZ(10.0);
    expect(shore.id).toBe('shore');
    expect(shore.name).toBe('Shore of Arrival');
    expect(shore.groundElevation).toBe(0.9);

    // Forum (z = -8)
    const forum = resolveZoneFromZ(-8.0);
    expect(forum.id).toBe('forum');
    expect(forum.name).toBe('Forum of Systems');
    expect(forum.groundElevation).toBe(1.2);

    // Agora (z = -18)
    const agora = resolveZoneFromZ(-18.0);
    expect(agora.id).toBe('agora');
    expect(agora.name).toBe('Agora of Growth');
    expect(agora.groundElevation).toBe(1.05);

    // Dino Sanctuary (z = -28)
    const dino = resolveZoneFromZ(-28.0);
    expect(dino.id).toBe('sanctuary');
    expect(dino.name).toBe('Dino Sanctuary');
    expect(dino.groundElevation).toBe(0.95);

    // Amphitheatre (z = -50)
    const amphi = resolveZoneFromZ(-50.0);
    expect(amphi.id).toBe('amphitheatre');
    expect(amphi.name).toBe('Amphitheatre of Sound');
    expect(amphi.groundElevation).toBe(1.35);

    // Beacon (z = -75)
    const beacon = resolveZoneFromZ(-75.0);
    expect(beacon.id).toBe('beacon');
    expect(beacon.name).toBe('Beacon of Contact');
    expect(beacon.groundElevation).toBe(4.5);
  });

  it('computes accurate lodestone compass heading towards Summit Beacon [0, 14, -78]', () => {
    // Directly south of beacon (x = 0, z = 0) -> heading 0° (due North)
    const northHeading = computeBeaconHeading(0, 0);
    expect(Math.round(northHeading)).toBe(0);

    // East of beacon path (x = 10, z = -78) -> beacon is to the West (-90°)
    const westHeading = computeBeaconHeading(10, -78);
    expect(Math.round(westHeading)).toBe(-90);

    // West of beacon path (x = -10, z = -78) -> beacon is to the East (90°)
    const eastHeading = computeBeaconHeading(-10, -78);
    expect(Math.round(eastHeading)).toBe(90);
  });

  it('validates all 6 active zones have sequential continuous boundaries without gaps', () => {
    expect(ZONE_BOUNDARIES.length).toBe(6);
    for (let i = 0; i < ZONE_BOUNDARIES.length - 1; i++) {
      expect(ZONE_BOUNDARIES[i].minZ).toBe(ZONE_BOUNDARIES[i + 1].maxZ);
    }
  });
});
