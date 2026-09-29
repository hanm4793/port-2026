// =============================================================================
// Zone Manager — zone lifecycle (load, activate, deactivate, unload)
// =============================================================================

import { useZoneStore } from '@/stores/useZoneStore';
import { devTools } from '@/experience/core/DevTools';
import { trackZoneEnter } from '@/experience/core/AnalyticsHooks';
import { ZONE_REGISTRY, STORY_MODE_ORDER } from './ZoneRegistry';
import { MAX_LOADED_ZONES } from '@/lib/constants';
import type { ZoneId } from '@/types/experience';

/**
 * Manages zone lifecycle: loading, activation, deactivation, unloading.
 * Works with both Story Mode (scroll-driven) and Explore Mode (proximity).
 */
class ZoneManager {
  /**
   * Determine which zone should be active based on scroll progress.
   * Called from the ticker or scroll handler.
   */
  getZoneForProgress(progress: number): ZoneId {
    for (const id of STORY_MODE_ORDER) {
      const zone = ZONE_REGISTRY[id];
      if (progress >= zone.scrollStart && progress < zone.scrollEnd) {
        return id;
      }
    }
    // Default to last zone if at end
    return 'beacon';
  }

  /**
   * Transition to a new active zone.
   * Handles preloading adjacent zones and unloading distant ones.
   */
  transitionTo(nextZone: ZoneId): void {
    const store = useZoneStore.getState();
    const currentZone = store.activeZone;

    if (currentZone === nextZone) return;

    devTools.logZoneTransition(currentZone, nextZone);
    store.beginTransition();

    // Activate the new zone
    store.setActiveZone(nextZone);
    store.addLoadedZone(nextZone);

    // Preload adjacent zones
    const adjacent = ZONE_REGISTRY[nextZone].adjacentZones;
    for (const adj of adjacent) {
      store.addLoadedZone(adj);
    }

    // Unload distant zones (keep only MAX_LOADED_ZONES)
    const keepZones = new Set<ZoneId>([nextZone, ...adjacent]);
    const loaded = Array.from(store.loadedZones);
    for (const id of loaded) {
      if (!keepZones.has(id) && store.loadedZones.size > MAX_LOADED_ZONES) {
        store.removeLoadedZone(id);
      }
    }

    store.endTransition();
    trackZoneEnter(nextZone);
  }

  /**
   * Update based on scroll progress (Story Mode).
   * Called every frame from the ticker.
   */
  updateFromScroll(scrollProgress: number): void {
    const targetZone = this.getZoneForProgress(scrollProgress);
    this.transitionTo(targetZone);
  }
}

export const zoneManager = new ZoneManager();
