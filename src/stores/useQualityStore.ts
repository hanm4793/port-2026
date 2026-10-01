// =============================================================================
// Quality store — performance tier, device heuristics, and feature gates
// =============================================================================

import { create } from 'zustand';
import type { QualityTier } from '@/types/experience';

export interface QualityConfig {
  shadows: boolean;
  shadowMapSize: 0 | 1024 | 2048;
  dpr: [number, number];
  vertexWaves: boolean;
  maxActiveZones: number;
  postProcessing: boolean;
  targetFPS: 30 | 60;
}

export const QUALITY_CONFIGS: Record<QualityTier, QualityConfig> = {
  high: {
    shadows: true,
    shadowMapSize: 2048,
    dpr: [1, 1.75],
    vertexWaves: true,
    maxActiveZones: 3,
    postProcessing: true,
    targetFPS: 60,
  },
  medium: {
    shadows: true,
    shadowMapSize: 1024,
    dpr: [1, 1.35],
    vertexWaves: true,
    maxActiveZones: 2,
    postProcessing: false,
    targetFPS: 60,
  },
  low: {
    shadows: false,
    shadowMapSize: 0,
    dpr: [1, 1.0],
    vertexWaves: false,
    maxActiveZones: 1,
    postProcessing: false,
    targetFPS: 30,
  },
};

interface QualityState extends QualityConfig {
  tier: QualityTier;
  isMobileDevice: boolean;
  hardwareCores: number;
  autoDegradeCount: number;

  // Actions
  setTier: (tier: QualityTier) => void;
  setMobileDevice: (isMobile: boolean) => void;
  autoDegrade: () => boolean; // returns true if degraded, false if already at lowest
  autoUpgrade: () => boolean;
}

export const useQualityStore = create<QualityState>((set, get) => ({
  tier: 'high',
  ...QUALITY_CONFIGS.high,
  isMobileDevice: false,
  hardwareCores: 4,
  autoDegradeCount: 0,

  setTier: (tier) => {
    set({
      tier,
      ...QUALITY_CONFIGS[tier],
    });
  },

  setMobileDevice: (isMobileDevice) => {
    // If mobile, cap initial tier to medium or low to prevent thermal throttle
    const initialMobileTier = isMobileDevice ? 'medium' : get().tier;
    set({
      isMobileDevice,
      tier: initialMobileTier,
      ...QUALITY_CONFIGS[initialMobileTier],
    });
  },

  autoDegrade: () => {
    const current = get().tier;
    if (current === 'high') {
      set((s) => ({
        tier: 'medium',
        ...QUALITY_CONFIGS.medium,
        autoDegradeCount: s.autoDegradeCount + 1,
      }));
      console.warn('[QualityManager] Auto-degraded tier: high -> medium (target 60fps)');
      return true;
    }
    if (current === 'medium') {
      set((s) => ({
        tier: 'low',
        ...QUALITY_CONFIGS.low,
        autoDegradeCount: s.autoDegradeCount + 1,
      }));
      console.warn('[QualityManager] Auto-degraded tier: medium -> low (shadows off, 1.0 DPR, target 30fps)');
      return true;
    }
    return false;
  },

  autoUpgrade: () => {
    const current = get().tier;
    // Do not auto-upgrade mobile devices to high to avoid thermal throttling
    if (get().isMobileDevice) return false;

    if (current === 'low') {
      set({
        tier: 'medium',
        ...QUALITY_CONFIGS.medium,
      });
      return true;
    }
    if (current === 'medium') {
      set({
        tier: 'high',
        ...QUALITY_CONFIGS.high,
      });
      return true;
    }
    return false;
  },
}));
