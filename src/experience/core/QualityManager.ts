// =============================================================================
// Quality Manager — GPU tier detection and auto-degradation
// =============================================================================

import { useQualityStore } from '@/stores/useQualityStore';
import { FPS_DEGRADE_THRESHOLD, FPS_DEGRADE_DURATION_MS, FPS_UPGRADE_THRESHOLD, FPS_UPGRADE_DURATION_MS } from '@/lib/constants';

/**
 * Monitors FPS and auto-degrades/upgrades quality tier.
 * Pure TypeScript — reads/writes Zustand store directly.
 */
class QualityManager {
  private frameTimes: number[] = [];
  private degradeTimer: number = 0;
  private upgradeTimer: number = 0;
  private _monitoring: boolean = false;

  /** Start FPS monitoring */
  start(): void {
    this._monitoring = true;
    this.frameTimes = [];
    this.degradeTimer = 0;
    this.upgradeTimer = 0;
  }

  /** Stop monitoring */
  stop(): void {
    this._monitoring = false;
  }

  /**
   * Call once per frame with delta time (seconds).
   * Handles auto-degrade/upgrade logic.
   */
  update(delta: number): void {
    if (!this._monitoring) return;

    const fps = 1 / Math.max(delta, 0.001);
    this.frameTimes.push(fps);

    // Keep a rolling window of 60 frames
    if (this.frameTimes.length > 60) {
      this.frameTimes.shift();
    }

    const avgFPS = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;

    // Auto-degrade: sustained low FPS
    if (avgFPS < FPS_DEGRADE_THRESHOLD) {
      this.degradeTimer += delta * 1000;
      this.upgradeTimer = 0;
      if (this.degradeTimer >= FPS_DEGRADE_DURATION_MS) {
        useQualityStore.getState().autoDegrade();
        this.degradeTimer = 0;
        this.frameTimes = [];
      }
    }
    // Auto-upgrade: sustained good FPS
    else if (avgFPS >= FPS_UPGRADE_THRESHOLD) {
      this.upgradeTimer += delta * 1000;
      this.degradeTimer = 0;
      if (this.upgradeTimer >= FPS_UPGRADE_DURATION_MS) {
        useQualityStore.getState().autoUpgrade();
        this.upgradeTimer = 0;
        this.frameTimes = [];
      }
    } else {
      this.degradeTimer = 0;
      this.upgradeTimer = 0;
    }
  }

  /** Detect initial GPU tier from WebGL capabilities */
  detectInitialTier(): void {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');

    if (!gl) {
      useQualityStore.getState().setTier('low');
      canvas.remove();
      return;
    }

    const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const renderer = gl.getParameter(gl.RENDERER);
    const isLowEnd = /Mali|Adreno [34]|PowerVR|Apple GPU/i.test(renderer);

    if (isLowEnd || maxTexture < 8192) {
      useQualityStore.getState().setTier('low');
    } else if (maxTexture < 16384) {
      useQualityStore.getState().setTier('medium');
    } else {
      useQualityStore.getState().setTier('high');
    }

    canvas.remove();
  }

  dispose(): void {
    this.stop();
    this.frameTimes = [];
  }
}

export const qualityManager = new QualityManager();
