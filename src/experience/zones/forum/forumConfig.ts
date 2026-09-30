// =============================================================================
// Forum of Systems — zone configuration
// =============================================================================
//
// SPATIAL LAYOUT (continuous from Shore):
//   Shore gate at z=0. Path leads to z=-4 where Forum begins.
//
//   z=-4    Forum entrance colonnade
//   z=-6    Left colonnade arm starts
//   z=-8    CENTER: System Table (hero landmark)
//   z=-10   Right colonnade arm
//   z=-12   Archive alcoves (workflow nodes)
//   z=-14   Forum back wall / exit toward Agora
//
//   Width: x=-8 to x=8 (16m wide, symmetrical)
//   Ground: stone floor with grid pattern at y=0.5 (raised from Shore sand)

import type { CameraKeyframe } from '@/types/experience';

export const FORUM_CAMERAS = {
  /** Entering the forum from Shore path */
  entrance: {
    position: [0, 3.5, -3] as [number, number, number],
    target: [0, 2, -9] as [number, number, number],
    fov: 50,
  },
  /** Overhead looking down at the System Table */
  tableOverview: {
    position: [0, 6, -8] as [number, number, number],
    target: [0, 1.5, -9] as [number, number, number],
    fov: 45,
  },
  /** Close on System Table — detail view */
  tableClose: {
    position: [2, 2.5, -7] as [number, number, number],
    target: [0, 2, -9] as [number, number, number],
    fov: 48,
  },
  /** Looking along the colonnade */
  colonnade: {
    position: [-5, 2.5, -6] as [number, number, number],
    target: [5, 2, -10] as [number, number, number],
    fov: 55,
  },
  /** Explore mode overview */
  explore: {
    position: [8, 6, -6] as [number, number, number],
    target: [0, 1, -9] as [number, number, number],
    fov: 58,
  },
};

/** Forum-specific palette — cooler, more technical than Shore */
export const FORUM_PALETTE = {
  floorLight: '#D0C8B8',    // warm stone floor
  floorDark: '#9A9080',     // floor grid lines
  wallStone: '#C8BCA8',     // colonnade stone
  pillarMarble: '#D8D0C0',  // column marble
  archiveDark: '#3A3430',   // dark alcove recesses
  circuitPrimary: '#6BA3C7', // blue data current
  circuitSecondary: '#4A8AB0', // deeper blue
  nodeGlow: '#7ECBB4',      // green-teal node glow
  nodeActive: '#C9A84C',    // gold when activated
} as const;
