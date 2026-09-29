// =============================================================================
// Experience types — 3D world, zones, camera
// =============================================================================

/** Zone identifiers matching WORLD-MAP.md */
export type ZoneId =
  | 'shore'
  | 'forum'
  | 'agora'
  | 'atelier'
  | 'amphitheatre'
  | 'sanctuary'
  | 'temple'
  | 'beacon';

/** Experience lifecycle */
export type ExperienceStatus = 'idle' | 'loading' | 'ready' | 'error';

/** Navigation modes */
export type ExperienceMode = 'story' | 'explore' | 'detail';

/** Camera controller types */
export type CameraControllerType = 'story' | 'explore' | 'detail';

/** Quality tiers */
export type QualityTier = 'high' | 'medium' | 'low';

/** Zone lifecycle states */
export type ZoneLifecycle = 'unloaded' | 'loading' | 'loaded' | 'active';

/** Zone metadata — static configuration per zone */
export interface ZoneMetadata {
  id: ZoneId;
  name: string;
  scrollStart: number; // Normalized [0,1]
  scrollEnd: number;
  position: [number, number, number]; // World-space center
  radius: number; // Bounding sphere for load decisions
  adjacentZones: ZoneId[];
  mvp: boolean;
}

/** Zone runtime state */
export interface ZoneRuntimeState {
  id: ZoneId;
  lifecycle: ZoneLifecycle;
  loadProgress: number; // 0-1
}

/** Camera keyframe for Story Mode path */
export interface CameraKeyframe {
  scrollProgress: number; // Normalized [0,1]
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  duration?: number; // Seconds for this segment
}

/** Quality feature flags derived from tier */
export interface QualityFeatures {
  shadows: boolean;
  postProcessing: boolean;
  reflections: boolean;
  particleDust: boolean;
  lodBias: number;
  maxTextureSize: 512 | 1024 | 2048;
  targetFPS: 30 | 60;
}
