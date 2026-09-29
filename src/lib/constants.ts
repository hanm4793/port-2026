// =============================================================================
// Global constants
// =============================================================================

/** Responsive breakpoint: below this = mobile experience */
export const MOBILE_BREAKPOINT = 1024;

/** Camera defaults */
export const CAMERA_FOV = 55;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 500;
export const CAMERA_DEFAULT_POSITION: [number, number, number] = [0, 1.6, 10];
export const CAMERA_DEFAULT_TARGET: [number, number, number] = [0, 1, 0];

/** Performance thresholds */
export const FPS_DEGRADE_THRESHOLD = 30;
export const FPS_DEGRADE_DURATION_MS = 3000;
export const FPS_UPGRADE_THRESHOLD = 55;
export const FPS_UPGRADE_DURATION_MS = 5000;

/** Zone loading */
export const MAX_LOADED_ZONES = 3;
export const ZONE_PRELOAD_DISTANCE = 50; // meters

/** Audio */
export const AUDIO_CROSSFADE_MS = 3000;
export const AUDIO_DEFAULT_VOLUME = 0.3;

/** Animation */
export const CAMERA_TRANSITION_DURATION = 2; // seconds
export const OVERLAY_FADE_DURATION = 0.3; // seconds

/** Art direction colors — from ART-DIRECTION.md */
export const COLORS = {
  // Primary palette
  travertine: '#E8DFD0',
  warmIvory: '#F5F0E6',
  sandstoneGold: '#C4A777',
  stoneShadow: '#8A7E6E',
  // Secondary palette
  deepTeal: '#1A5C5A',
  oxidizedCopper: '#4A7C6B',
  volcanicCharcoal: '#3A3632',
  vietnameseCoral: '#D4725C',
  // Accent palette
  goldLeaf: '#C9A84C',
  circuitBlue: '#6BA3C7',
  bioLuminescent: '#7ECBB4',
  ember: '#B85C3A',
  // UI palette
  uiBackground: '#1A1816',
  uiTextPrimary: '#F5F0E6',
  uiTextSecondary: '#A89E8E',
  uiAccent: '#C9A84C',
} as const;
