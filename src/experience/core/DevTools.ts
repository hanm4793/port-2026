// =============================================================================
// Dev Tools — debug overlay, perf stats
// =============================================================================

import type { ZoneId } from '@/types/experience';

/** Debug state (only used in development) */
interface DebugState {
  showStats: boolean;
  showZoneBounds: boolean;
  showCameraPath: boolean;
  logZoneTransitions: boolean;
}

const defaultDebugState: DebugState = {
  showStats: false,
  showZoneBounds: false,
  showCameraPath: false,
  logZoneTransitions: true,
};

class DevTools {
  state: DebugState = { ...defaultDebugState };
  private enabled: boolean = false;

  init(): void {
    if (process.env.NODE_ENV !== 'development') return;
    this.enabled = true;

    // Toggle with ` key
    window.addEventListener('keydown', (e) => {
      if (e.key === '`') {
        this.state.showStats = !this.state.showStats;
      }
    });
  }

  log(tag: string, ...args: unknown[]): void {
    if (!this.enabled) return;
    console.log(`[DevTools:${tag}]`, ...args);
  }

  logZoneTransition(from: ZoneId | null, to: ZoneId): void {
    if (!this.enabled || !this.state.logZoneTransitions) return;
    console.log(`[Zone] ${from ?? 'none'} → ${to}`);
  }

  dispose(): void {
    this.state = { ...defaultDebugState };
    this.enabled = false;
  }
}

export const devTools = new DevTools();
