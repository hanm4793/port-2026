// =============================================================================
// Quality Manager — GPU benchmark, device capability detection & FPS policing
// Auto-degrades quality if frame rate drops below threshold for 3.0 seconds
// =============================================================================

import { useQualityStore } from '@/stores/useQualityStore';
import {
  FPS_DEGRADE_THRESHOLD,
  FPS_DEGRADE_DURATION_MS,
  FPS_UPGRADE_THRESHOLD,
  FPS_UPGRADE_DURATION_MS,
} from '@/lib/constants';

class QualityManager {
  private frameTimes: number[] = [];
  private degradeTimer = 0;
  private upgradeTimer = 0;
  private _monitoring = false;

  /** Detect initial GPU tier & mobile characteristics */
  detectInitialTier(): void {
    if (typeof window === 'undefined') return;

    try {
      const isMobile =
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 1024;

      const cores = navigator.hardwareConcurrency || 4;
      useQualityStore.getState().setMobileDevice(isMobile);

      const canvas = document.createElement('canvas');
      const gl = (canvas.getContext('webgl2') || canvas.getContext('webgl')) as WebGLRenderingContext | null;

      if (!gl) {
        useQualityStore.getState().setTier('low');
        canvas.remove();
        return;
      }

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
      const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE);

      // Mobile low-power GPU detection
      const isLowEndGPU =
        /Mali-4|Mali-T|Adreno 3|Adreno 4|PowerVR|Apple A[789]|Intel HD Graphics/i.test(renderer);

      if (isMobile) {
        if (isLowEndGPU || cores <= 4 || maxTexture < 8192) {
          useQualityStore.getState().setTier('low');
        } else {
          useQualityStore.getState().setTier('medium');
        }
      } else {
        if (isLowEndGPU || maxTexture < 8192) {
          useQualityStore.getState().setTier('medium');
        } else {
          useQualityStore.getState().setTier('high');
        }
      }

      canvas.remove();
      console.log(`[QualityManager] Initial GPU Profile: ${renderer || 'Standard'} | Cores: ${cores} | Tier: ${useQualityStore.getState().tier}`);
    } catch {
      useQualityStore.getState().setTier('medium');
    }
  }

  start(): void {
    this._monitoring = true;
    this.frameTimes = [];
    this.degradeTimer = 0;
    this.upgradeTimer = 0;
  }

  stop(): void {
    this._monitoring = false;
  }

  /** Run every frame in the Ticker game loop */
  update(delta: number): void {
    if (!this._monitoring) return;

    // Filter extreme spikes (e.g. tab background switch)
    if (delta > 0.25) return;

    const fps = 1 / Math.max(delta, 0.001);
    this.frameTimes.push(fps);

    // Keep rolling sample window of 60 frames
    if (this.frameTimes.length > 60) {
      this.frameTimes.shift();
    }

    const avgFPS = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;

    // Auto-degrade condition: sustained low FPS
    if (avgFPS < FPS_DEGRADE_THRESHOLD) {
      this.degradeTimer += delta * 1000;
      this.upgradeTimer = 0;

      if (this.degradeTimer >= FPS_DEGRADE_DURATION_MS) {
        const degraded = useQualityStore.getState().autoDegrade();
        this.degradeTimer = 0;
        this.frameTimes = [];
        if (!degraded) {
          // Already at lowest tier, halt further degradation attempts
          this.degradeTimer = -999999;
        }
      }
    }
    // Auto-upgrade condition: sustained high FPS
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

  dispose(): void {
    this.stop();
    this.frameTimes = [];
  }
}

export const qualityManager = new QualityManager();
