// =============================================================================
// Audio store — audio enabled, volume, current zone audio
// =============================================================================

import { create } from 'zustand';
import { AUDIO_DEFAULT_VOLUME } from '@/lib/constants';

interface AudioState {
  enabled: boolean;
  masterVolume: number;
  currentZoneAudioId: string | null;

  // Actions
  toggleAudio: () => void;
  setVolume: (volume: number) => void;
  setCurrentZoneAudio: (audioId: string | null) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  enabled: false,
  masterVolume: AUDIO_DEFAULT_VOLUME,
  currentZoneAudioId: null,

  toggleAudio: () => set((state) => ({ enabled: !state.enabled })),
  setVolume: (masterVolume) => set({ masterVolume }),
  setCurrentZoneAudio: (currentZoneAudioId) => set({ currentZoneAudioId }),
}));
