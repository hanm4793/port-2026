// =============================================================================
// Experience store — global mode, lifecycle, initialization
// =============================================================================

import { create } from 'zustand';
import type { ExperienceStatus, ExperienceMode } from '@/types/experience';

interface ExperienceState {
  // Lifecycle
  status: ExperienceStatus;
  loadProgress: number;
  error: string | null;

  // Mode
  mode: ExperienceMode;
  previousMode: ExperienceMode | null;
  storyCompleted: boolean;
  exploreUnlocked: boolean;

  // Actions
  setStatus: (status: ExperienceStatus) => void;
  setLoadProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  setMode: (mode: ExperienceMode) => void;
  openDetail: () => void;
  closeDetail: () => void;
  completeStory: () => void;
}

export const useExperienceStore = create<ExperienceState>((set, get) => ({
  status: 'idle',
  loadProgress: 0,
  error: null,
  mode: 'story',
  previousMode: null,
  storyCompleted: false,
  exploreUnlocked: false,

  setStatus: (status) => set({ status }),
  setLoadProgress: (loadProgress) => set({ loadProgress }),
  setError: (error) => set({ error, status: error ? 'error' : get().status }),

  setMode: (mode) => set({ mode }),

  openDetail: () => {
    const current = get().mode;
    if (current !== 'detail') {
      set({ previousMode: current, mode: 'detail' });
    }
  },

  closeDetail: () => {
    const prev = get().previousMode;
    set({ mode: prev ?? 'story', previousMode: null });
  },

  completeStory: () => {
    set({ storyCompleted: true, exploreUnlocked: true });
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('story-completed', 'true');
    }
  },
}));
