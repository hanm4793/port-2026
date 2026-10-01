// =============================================================================
// Zone Visibility Descriptors — Task C
// Formal decoupling of rendering visibility, collision activation, and interaction activation.
// Defines Far (WorldShell), Mid (Architecture), and Near (Interactive / Detail) layers.
// =============================================================================

import type { QualityTier } from '@/types/experience';

export type MasterZoneId =
  | 'shore'
  | 'forum'
  | 'agora'
  | 'sanctuary'
  | 'amphitheatre'
  | 'beacon';

export interface ZoneVisibilityDescriptor {
  zoneId: MasterZoneId;
  displayName: string;
  center: [number, number, number];
  bounds: {
    minX: number;
    maxX: number;
    minZ: number;
    maxZ: number;
    radius: number;
  };
  groundElevation: number;
  storyChapters: string[]; // Story chapter IDs relevant to this zone
  exploreDistances: {
    near: number; // Max distance for high-frequency details (grass, decal, circuit pulse)
    mid: number;  // Max distance for mid-tier architecture (columns, walls, steps)
    far: number;  // Max distance for far silhouette (in WorldShell: always or up to 140m)
  };
  interactionDistance: number; // Distance for raycasting & [E] interaction prompts
  collisionDistance: number;   // Distance for kinematic bounds & avatar collision checks
  minNearTier: QualityTier;    // Lowest tier allowed to render near details
  farSilhouette: {
    landmarkName: string;
    silhouetteGeometry: string;
  };
}

export const ZONE_VISIBILITY_DESCRIPTORS: Record<MasterZoneId, ZoneVisibilityDescriptor> = {
  shore: {
    zoneId: 'shore',
    displayName: 'Shore of Arrival',
    center: [0, 0.9, 12.0],
    bounds: { minX: -20, maxX: 20, minZ: 0.0, maxZ: 32.0, radius: 25.0 },
    groundElevation: 0.9,
    storyChapters: ['arrival'],
    exploreDistances: { near: 24.0, mid: 60.0, far: 140.0 },
    interactionDistance: 4.5,
    collisionDistance: 25.0,
    minNearTier: 'medium',
    farSilhouette: {
      landmarkName: 'Gate of Names Silhouette',
      silhouetteGeometry: 'monumental-arch-silhouette',
    },
  },

  forum: {
    zoneId: 'forum',
    displayName: 'Forum of Systems',
    center: [0, 1.2, -9.0],
    bounds: { minX: -12, maxX: 12, minZ: -15.0, maxZ: 0.0, radius: 18.0 },
    groundElevation: 1.2,
    storyChapters: ['systems'],
    exploreDistances: { near: 22.0, mid: 55.0, far: 140.0 },
    interactionDistance: 4.2,
    collisionDistance: 20.0,
    minNearTier: 'medium',
    farSilhouette: {
      landmarkName: 'Forum Colonnade Pediment',
      silhouetteGeometry: 'colonnade-pediment-silhouette',
    },
  },

  agora: {
    zoneId: 'agora',
    displayName: 'Agora of Growth',
    center: [3.5, 1.0, -18.0],
    bounds: { minX: -8, maxX: 12, minZ: -21.0, maxZ: -14.5, radius: 14.0 },
    groundElevation: 1.0,
    storyChapters: ['growth'],
    exploreDistances: { near: 20.0, mid: 50.0, far: 140.0 },
    interactionDistance: 4.0,
    collisionDistance: 16.0,
    minNearTier: 'medium',
    farSilhouette: {
      landmarkName: 'Agora Stoa & Terrace Silhouette',
      silhouetteGeometry: 'terrace-stoa-silhouette',
    },
  },

  sanctuary: {
    zoneId: 'sanctuary',
    displayName: 'Dino Sanctuary',
    center: [0, 0.95, -29.0],
    bounds: { minX: -15, maxX: 15, minZ: -40.0, maxZ: -21.0, radius: 22.0 },
    groundElevation: 0.95,
    storyChapters: ['worlds'],
    exploreDistances: { near: 24.0, mid: 58.0, far: 140.0 },
    interactionDistance: 4.5,
    collisionDistance: 24.0,
    minNearTier: 'medium',
    farSilhouette: {
      landmarkName: 'Fossil Arch & Basalt Ridge',
      silhouetteGeometry: 'fossil-arch-ridge-silhouette',
    },
  },

  amphitheatre: {
    zoneId: 'amphitheatre',
    displayName: 'Amphitheatre of Sound',
    center: [-3.0, 1.35, -52.0],
    bounds: { minX: -18, maxX: 14, minZ: -66.0, maxZ: -40.0, radius: 26.0 },
    groundElevation: 1.35,
    storyChapters: ['art'],
    exploreDistances: { near: 25.0, mid: 60.0, far: 140.0 },
    interactionDistance: 5.0,
    collisionDistance: 28.0,
    minNearTier: 'medium',
    farSilhouette: {
      landmarkName: 'Curved Theatron & Acoustic Sails',
      silhouetteGeometry: 'theatron-sails-silhouette',
    },
  },

  beacon: {
    zoneId: 'beacon',
    displayName: 'Beacon of Contact',
    center: [0, 12.0, -78.0],
    bounds: { minX: -12, maxX: 12, minZ: -88.0, maxZ: -66.0, radius: 20.0 },
    groundElevation: 12.0,
    storyChapters: ['invitation'],
    exploreDistances: { near: 22.0, mid: 65.0, far: 200.0 },
    interactionDistance: 4.5,
    collisionDistance: 20.0,
    minNearTier: 'medium',
    farSilhouette: {
      landmarkName: 'Summit Beacon Tower & Light Sculpture',
      silhouetteGeometry: 'summit-beacon-sculpture',
    },
  },
};

/**
 * Determine active visibility tier for a zone given camera/player distance and mode.
 * Returns:
 * - 'none': fully culled (beyond far distance)
 * - 'far': rendered in WorldShell only
 * - 'mid': rendered with mid-tier architecture + far
 * - 'near': full fidelity + interactive raycasting + near details
 */
export function getZoneTier(
  zoneId: MasterZoneId,
  distToCenter: number,
  tier: QualityTier,
  mode: 'story' | 'explore' | 'detail',
  storyChapterId?: string,
): 'none' | 'far' | 'mid' | 'near' {
  const desc = ZONE_VISIBILITY_DESCRIPTORS[zoneId];
  if (!desc) return 'none';

  // In Story Mode: check chapter relevance first
  if (mode === 'story' && storyChapterId) {
    if (desc.storyChapters.includes(storyChapterId)) {
      return 'near';
    }
  }

  // Distance thresholds with tier-based scaling
  const multiplier = tier === 'high' ? 1.15 : tier === 'medium' ? 1.0 : 0.75;
  const nearDist = desc.exploreDistances.near * multiplier;
  const midDist = desc.exploreDistances.mid * multiplier;
  const farDist = desc.exploreDistances.far * multiplier;

  if (distToCenter <= nearDist) return 'near';
  if (distToCenter <= midDist) return 'mid';
  if (distToCenter <= farDist) return 'far';
  return 'none';
}
