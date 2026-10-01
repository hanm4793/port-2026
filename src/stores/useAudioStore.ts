// =============================================================================
// Audio store — audio opt-in, volume, zone-based soundscapes, and ducking
// Initial state starts with safe deterministic defaults (false) to guarantee
// identical SSR and initial client hydration trees.
// Client localStorage sync occurs after mount.
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
  initClientStorage: () => void;
  optInSound: () => void;
  optOutSound: () => void;
  toggleAudio: () => void;
  setVolume: (volume: number) => void;
  setDucked: (ducked: boolean) => void;
  setZone: (zone: 'shore' | 'forum' | 'sanctuary' | 'amphitheatre') => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  // Safe static defaults for SSR/SSG hydration consistency
  hasUserDecided: false,
  enabled: false,
  isMuted: false,
  masterVolume: AUDIO_DEFAULT_VOLUME,
  isDucked: false,
  currentZone: 'shore',

  initClientStorage: () => {
    if (typeof window === 'undefined') return;
    try {
      const decided = localStorage.getItem('port-audio-decided') === 'true';
      const enabled = localStorage.getItem('port-audio-enabled') === 'true';
      const muted = localStorage.getItem('port-audio-muted') === 'true';
      set({
        hasUserDecided: decided,
        enabled: enabled,
        isMuted: muted,
      });
    } catch {
      // Ignore storage access errors
    }
  },

  optInSound: () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('port-audio-decided', 'true');
        localStorage.setItem('port-audio-enabled', 'true');
        localStorage.setItem('port-audio-muted', 'false');
      } catch {}
    }
    set({ hasUserDecided: true, enabled: true, isMuted: false });
  },

  optOutSound: () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('port-audio-decided', 'true');
        localStorage.setItem('port-audio-enabled', 'false');
        localStorage.setItem('port-audio-muted', 'true');
      } catch {}
    }
    set({ hasUserDecided: true, enabled: false, isMuted: true });
  },

  toggleAudio: () => {
    const nextMuted = !get().isMuted;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('port-audio-decided', 'true');
        localStorage.setItem('port-audio-muted', String(nextMuted));
        if (!nextMuted) localStorage.setItem('port-audio-enabled', 'true');
      } catch {}
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
