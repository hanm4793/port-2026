// =============================================================================
// Zone Registry — static metadata for all zones (from WORLD-MAP.md)
// =============================================================================

import type { ZoneId, ZoneMetadata } from '@/types/experience';

/**
 * Zone definitions with scroll ranges, positions, and MVP flags.
 * Positions are world-space coordinates on the island.
 */
export const ZONE_REGISTRY: Record<ZoneId, ZoneMetadata> = {
  shore: {
    id: 'shore',
    name: 'Shore of Arrival',
    scrollStart: 0.0,
    scrollEnd: 0.1,
    position: [0, 0, 0],
    radius: 30,
    adjacentZones: ['forum'],
    mvp: true,
  },
  forum: {
    id: 'forum',
    name: 'Forum of Systems',
    scrollStart: 0.1,
    scrollEnd: 0.25,
    position: [0, 5, -30],
    radius: 25,
    adjacentZones: ['shore', 'agora'],
    mvp: true,
  },
  agora: {
    id: 'agora',
    name: 'Agora of Growth',
    scrollStart: 0.25,
    scrollEnd: 0.37,
    position: [15, 8, -50],
    radius: 20,
    adjacentZones: ['forum', 'atelier'],
    mvp: false,
  },
  atelier: {
    id: 'atelier',
    name: 'Renaissance Atelier',
    scrollStart: 0.37,
    scrollEnd: 0.55,
    position: [0, 15, -70],
    radius: 20,
    adjacentZones: ['agora', 'amphitheatre', 'sanctuary'],
    mvp: true,
  },
  amphitheatre: {
    id: 'amphitheatre',
    name: 'Amphitheatre of Sound',
    scrollStart: 0.55,
    scrollEnd: 0.65,
    position: [-20, 12, -85],
    radius: 25,
    adjacentZones: ['atelier', 'temple'],
    mvp: false,
  },
  sanctuary: {
    id: 'sanctuary',
    name: 'Dino Sanctuary',
    scrollStart: 0.65,
    scrollEnd: 0.77,
    position: [10, 10, -90],
    radius: 20,
    adjacentZones: ['atelier', 'temple'],
    mvp: false,
  },
  temple: {
    id: 'temple',
    name: 'Temple of Journeys',
    scrollStart: 0.77,
    scrollEnd: 0.87,
    position: [-15, 18, -100],
    radius: 20,
    adjacentZones: ['amphitheatre', 'sanctuary', 'beacon'],
    mvp: false,
  },
  beacon: {
    id: 'beacon',
    name: 'Beacon of Contact',
    scrollStart: 0.87,
    scrollEnd: 1.0,
    position: [0, 30, -110],
    radius: 15,
    adjacentZones: ['temple'],
    mvp: true,
  },
};

/** Ordered zone IDs for Story Mode path */
export const STORY_MODE_ORDER: ZoneId[] = [
  'shore', 'forum', 'agora', 'atelier',
  'amphitheatre', 'sanctuary', 'temple', 'beacon',
];

/** MVP zone IDs */
export const MVP_ZONES: ZoneId[] = STORY_MODE_ORDER.filter(
  (id) => ZONE_REGISTRY[id].mvp,
);
