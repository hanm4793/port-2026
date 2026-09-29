// =============================================================================
// Quality store — performance tier, feature flags
// =============================================================================

import { create } from 'zustand';
import type { QualityTier, QualityFeatures } from '@/types/experience';

const QUALITY_PRESETS: Record<QualityTier, QualityFeatures> = {
  high: {
    shadows: true,
    postProcessing: true,
    reflections: true,
    particleDust: true,
    lodBias: 1.0,
    maxTextureSize: 2048,
    targetFPS: 60,
  },
  medium: {
    shadows: true,
    postProcessing: false,
    reflections: false,
    particleDust: false,
    lodBias: 1.5,
    maxTextureSize: 1024,
    targetFPS: 60,
  },
  low: {
    shadows: false,
    postProcessing: false,
    reflections: false,
    particleDust: false,
    lodBias: 2.0,
    maxTextureSize: 512,
    targetFPS: 30,
  },
};

interface QualityState extends QualityFeatures {
  tier: QualityTier;
  setTier: (tier: QualityTier) => void;
  autoDegrade: () => void;
  autoUpgrade: () => void;
}

export const useQualityStore = create<QualityState>((set, get) => ({
  tier: 'high',
  ...QUALITY_PRESETS.high,

  setTier: (tier) => set({ tier, ...QUALITY_PRESETS[tier] }),

  autoDegrade: () => {
    const current = get().tier;
    const next: QualityTier = current === 'high' ? 'medium' : 'low';
    if (current !== 'low') {
      set({ tier: next, ...QUALITY_PRESETS[next] });
    }
  },

  autoUpgrade: () => {
    const current = get().tier;
    const next: QualityTier = current === 'low' ? 'medium' : 'high';
    if (current !== 'high') {
      set({ tier: next, ...QUALITY_PRESETS[next] });
    }
  },
}));

export { QUALITY_PRESETS };
