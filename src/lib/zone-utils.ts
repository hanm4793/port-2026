// =============================================================================
// Zone Navigation & Spatial Boundaries Helper
// Pure utility decoupled from UI components.
// =============================================================================

export type ZoneName =
  | 'Shore of Arrival'
  | 'Forum of Systems'
  | 'Dino Sanctuary'
  | 'Amphitheatre of Sound';

export type ZoneId = 'shore' | 'forum' | 'sanctuary' | 'amphitheatre';

export interface ZoneBoundary {
  id: ZoneId;
  name: ZoneName;
  minZ: number;
  maxZ: number;
  centerZ: number;
  groundElevation: number;
}

export const ZONE_BOUNDARIES: ZoneBoundary[] = [
  {
    id: 'shore',
    name: 'Shore of Arrival',
    minZ: 0.0,
    maxZ: 25.0,
    centerZ: 12.0,
    groundElevation: 0.9,
  },
  {
    id: 'forum',
    name: 'Forum of Systems',
    minZ: -16.0,
    maxZ: 0.0,
    centerZ: -9.0,
    groundElevation: 1.2,
  },
  {
    id: 'sanctuary',
    name: 'Dino Sanctuary',
    minZ: -40.0,
    maxZ: -16.0,
    centerZ: -29.0,
    groundElevation: 0.95,
  },
  {
    id: 'amphitheatre',
    name: 'Amphitheatre of Sound',
    minZ: -68.0,
    maxZ: -40.0,
    centerZ: -52.0,
    groundElevation: 1.35,
  },
];

/** Resolve zone name and ID from world Z coordinate */
export function resolveZoneFromZ(z: number): { id: ZoneId; name: ZoneName; groundElevation: number } {
  for (const b of ZONE_BOUNDARIES) {
    if (z >= b.minZ && z <= b.maxZ) {
      return { id: b.id, name: b.name, groundElevation: b.groundElevation };
    }
  }
  // Boundary fallbacks
  if (z > 25.0) return { id: 'shore', name: 'Shore of Arrival', groundElevation: 0.9 };
  return { id: 'amphitheatre', name: 'Amphitheatre of Sound', groundElevation: 1.35 };
}

/** Compute compass heading relative to forward (-Z) towards Summit Beacon [0, 14, -78] */
export function computeBeaconHeading(x: number, z: number): number {
  const dx = 0 - x;
  const dz = -78 - z;
  return Math.atan2(dx, -dz) * (180 / Math.PI);
}
