import { describe, it, expect } from 'vitest';
import {
  ZONE_VISIBILITY_DESCRIPTORS,
  getZoneTier,
  type MasterZoneId,
} from '@/experience/world/ZoneVisibilityDescriptors';

describe('Zone Visibility Descriptors & 3-Tier Layering System', () => {
  const allZones: MasterZoneId[] = ['shore', 'forum', 'agora', 'sanctuary', 'amphitheatre', 'beacon'];

  it('has comprehensive, non-null descriptors for all 6 zones', () => {
    allZones.forEach((id) => {
      const desc = ZONE_VISIBILITY_DESCRIPTORS[id];
      expect(desc).toBeDefined();
      expect(desc.zoneId).toBe(id);
      expect(desc.displayName.length).toBeGreaterThan(0);
      expect(desc.bounds.radius).toBeGreaterThan(0);
      expect(desc.farSilhouette.landmarkName.length).toBeGreaterThan(0);
    });
  });

  it('correctly maps active Story chapter to near tier', () => {
    // Arrival chapter -> Shore is near
    expect(getZoneTier('shore', 50.0, 'high', 'story', 'arrival')).toBe('near');
    // Systems chapter -> Forum is near
    expect(getZoneTier('forum', 50.0, 'high', 'story', 'systems')).toBe('near');
    // Growth chapter -> Agora is near
    expect(getZoneTier('agora', 50.0, 'high', 'story', 'growth')).toBe('near');
    // Worlds chapter -> Sanctuary is near
    expect(getZoneTier('sanctuary', 50.0, 'high', 'story', 'worlds')).toBe('near');
    // Art chapter -> Amphitheatre is near
    expect(getZoneTier('amphitheatre', 50.0, 'high', 'story', 'art')).toBe('near');
    // Invitation chapter -> Beacon is near
    expect(getZoneTier('beacon', 50.0, 'high', 'story', 'invitation')).toBe('near');
  });

  it('scales distance thresholds based on quality tier in Explore mode', () => {
    // At 24m distance on high tier (near threshold is 22m * 1.15 = 25.3m) -> near
    const highTier = getZoneTier('forum', 24.0, 'high', 'explore');
    expect(highTier).toBe('near');

    // At 24m distance on low tier (near threshold is 22m * 0.75 = 16.5m) -> mid
    const lowTier = getZoneTier('forum', 24.0, 'low', 'explore');
    expect(lowTier).toBe('mid');
  });

  it('ensures Summit Beacon remains visible up to 200m in far layer', () => {
    const beaconFar = getZoneTier('beacon', 160.0, 'high', 'explore');
    expect(beaconFar).toBe('far');

    // Beyond 240m (200m * 1.15 = 230m) -> none
    const beaconNone = getZoneTier('beacon', 250.0, 'high', 'explore');
    expect(beaconNone).toBe('none');
  });
});
