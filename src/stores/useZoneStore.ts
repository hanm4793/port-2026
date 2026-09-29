// =============================================================================
// Zone store — zone lifecycle, active zone, transitions
// =============================================================================

import { create } from 'zustand';
import type { ZoneId, ZoneMetadata } from '@/types/experience';
import { ZONE_REGISTRY } from '@/experience/world/ZoneRegistry';

interface ZoneState {
  activeZone: ZoneId | null;
  loadedZones: Set<ZoneId>;
  transitioning: boolean;
  transitionProgress: number;
  zones: Record<ZoneId, ZoneMetadata>;

  // Actions
  setActiveZone: (id: ZoneId) => void;
  addLoadedZone: (id: ZoneId) => void;
  removeLoadedZone: (id: ZoneId) => void;
  beginTransition: () => void;
  endTransition: () => void;
}

export const useZoneStore = create<ZoneState>((set) => ({
  activeZone: null,
  loadedZones: new Set<ZoneId>(),
  transitioning: false,
  transitionProgress: 0,
  zones: ZONE_REGISTRY,

  setActiveZone: (id) => set({ activeZone: id }),

  addLoadedZone: (id) =>
    set((state) => ({
      loadedZones: new Set([...state.loadedZones, id]),
    })),

  removeLoadedZone: (id) =>
    set((state) => {
      const next = new Set(state.loadedZones);
      next.delete(id);
      return { loadedZones: next };
    }),

  beginTransition: () => set({ transitioning: true, transitionProgress: 0 }),
  endTransition: () => set({ transitioning: false, transitionProgress: 1 }),
}));
