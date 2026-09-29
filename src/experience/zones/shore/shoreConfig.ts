// =============================================================================
// Shore of Arrival — zone configuration (revised layout)
// =============================================================================
//
// COMPACT LAYOUT — all visible from hero camera:
//
//   Camera at [0, 6, 28] looking at [0, 1, -5]
//
//   z=25..60  ocean (behind and around camera, also in front view at edges)
//   z=10..18  waterline, wet sand
//   z=5..10   dry beach, mooring stones, buried columns
//   z=2..5    stone steps rising
//   z=0       GATE OF NAMES (hero landmark)
//   z=-2..-12 path inland, bordered by grass
//   z=-60     distant beacon
//
//   Ground terrain covers z=-12 to z=18, x=-20 to x=20
//   Everything visible within a 40m radius from camera

import type { CameraKeyframe } from '@/types/experience';

export const SHORE_CAMERAS = {
  hero: {
    position: [8, 6, 42] as [number, number, number],
    target: [0, 1, 5] as [number, number, number],
    fov: 55,
  },
  storyApproach: {
    position: [0, 3.5, 16] as [number, number, number],
    target: [0, 2.5, 0] as [number, number, number],
    fov: 52,
  },
  storyGate: {
    position: [0, 2.5, 6] as [number, number, number],
    target: [0, 3.5, -1] as [number, number, number],
    fov: 48,
  },
  storyThrough: {
    position: [0, 2.5, -3] as [number, number, number],
    target: [0, 2, -20] as [number, number, number],
    fov: 55,
  },
  explore: {
    position: [12, 8, 15] as [number, number, number],
    target: [0, 1, 2] as [number, number, number],
    fov: 60,
  },
  mobile: {
    position: [0, 4, 20] as [number, number, number],
    target: [0, 2, 0] as [number, number, number],
    fov: 55,
  },
};

export const SHORE_CAMERA_PATH: CameraKeyframe[] = [
  { scrollProgress: 0.0, ...SHORE_CAMERAS.hero },
  { scrollProgress: 0.03, ...SHORE_CAMERAS.storyApproach },
  { scrollProgress: 0.07, ...SHORE_CAMERAS.storyGate },
  { scrollProgress: 0.1, ...SHORE_CAMERAS.storyThrough },
];

export const SHORE_CAMERA_REDUCED: CameraKeyframe[] = [
  { scrollProgress: 0.0, ...SHORE_CAMERAS.storyGate },
  { scrollProgress: 0.1, ...SHORE_CAMERAS.storyThrough },
];

export const SHORE_PALETTE = {
  sand: '#D4C4A0',
  sandDark: '#A89878',
  wetSand: '#8A7E6E',
  oceanDeep: '#1A5C5A',
  oceanMid: '#2A7A7A',
  oceanShallow: '#5AADA8',
  seafoam: '#B8DDD8',
  coral: '#D4725C',
  driftwood: '#7A6B52',
} as const;
