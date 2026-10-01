// =============================================================================
// Audio store — audio opt-in, volume, zone-based soundscapes, and ducking
// =============================================================================

import { create } from 'zustand';
import { AUDIO_DEFAULT_VOLUME } from '@/lib/constants';

interface AudioState {
  // Opt-in gate
  hasUserDecided: boolean;
  enabled: boolean;
  isMuted: boolean;
  masterVolume: number;
  isDucked: boolean; // Auto-ducking when reading case-study or modal (-8dB)

  // Current active soundscape zone
  currentZone: 'shore' | 'forum' | 'sanctuary' | 'amphitheatre';

  // Actions
  optInSound: () => void;
  optOutSound: () => void;
  toggleAudio: () => void;
  setVolume: (volume: number) => void;
  setDucked: (ducked: boolean) => void;
  setZone: (zone: 'shore' | 'forum' | 'sanctuary' | 'amphitheatre') => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  hasUserDecided: typeof window !== 'undefined' ? localStorage.getItem('port-audio-decided') === 'true' : false,
  enabled: typeof window !== 'undefined' ? localStorage.getItem('port-audio-enabled') === 'true' : false,
  isMuted: typeof window !== 'undefined' ? localStorage.getItem('port-audio-muted') === 'true' : false,
  masterVolume: AUDIO_DEFAULT_VOLUME,
  isDucked: false,
  currentZone: 'shore',

  optInSound: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('port-audio-decided', 'true');
      localStorage.setItem('port-audio-enabled', 'true');
      localStorage.setItem('port-audio-muted', 'false');
    }
    set({ hasUserDecided: true, enabled: true, isMuted: false });
  },

  optOutSound: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('port-audio-decided', 'true');
      localStorage.setItem('port-audio-enabled', 'false');
      localStorage.setItem('port-audio-muted', 'true');
    }
    set({ hasUserDecided: true, enabled: false, isMuted: true });
  },

  toggleAudio: () => {
    const nextMuted = !get().isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('port-audio-decided', 'true');
      localStorage.setItem('port-audio-muted', String(nextMuted));
      if (!nextMuted) localStorage.setItem('port-audio-enabled', 'true');
    }
    set({ isMuted: nextMuted, enabled: !nextMuted, hasUserDecided: true });
  },

  setVolume: (masterVolume) => set({ masterVolume }),
  setDucked: (isDucked) => set({ isDucked }),

  setZone: (currentZone) => {
    if (get().currentZone !== currentZone) {
      set({ currentZone });
    }
  },
}));
