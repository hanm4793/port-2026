// =============================================================================
// World Manager — island-level orchestrator
// =============================================================================

import { ticker } from '@/experience/core/Ticker';
import { qualityManager } from '@/experience/core/QualityManager';
import { inputManager } from '@/experience/core/InputManager';
import { audioManager } from '@/experience/core/AudioManager';
import { devTools } from '@/experience/core/DevTools';
import { cameraManager } from '@/experience/camera/CameraManager';
import { zoneManager } from './ZoneManager';
import { assetResolver } from './AssetResolver';
import { useExperienceStore } from '@/stores/useExperienceStore';
import { useCameraStore } from '@/stores/useCameraStore';
import { trackExperienceLoaded } from '@/experience/core/AnalyticsHooks';
import { useQualityStore } from '@/stores/useQualityStore';
import { StoryCameraController } from '@/experience/camera/StoryCameraController';
import { ExploreCameraController } from '@/experience/camera/ExploreCameraController';
import { DetailCameraController } from '@/experience/camera/DetailCameraController';

/**
 * Top-level orchestrator for the 3D experience.
 * Initializes all subsystems and runs the game loop.
 */
class WorldManager {
  private initialized: boolean = false;
  private initStartTime: number = 0;

  /** Initialize all subsystems in order */
  async init(): Promise<void> {
    if (this.initialized) return;
    this.initStartTime = performance.now();

    useExperienceStore.getState().setStatus('loading');

    try {
      // 1. Dev tools
      devTools.init();
      devTools.log('WorldManager', 'Initializing...');

      // 2. Quality detection
      qualityManager.detectInitialTier();
      devTools.log('WorldManager', `Quality tier: ${useQualityStore.getState().tier}`);

      // 3. Input
      inputManager.init();

      // 4. Audio (suspended until user gesture)
      audioManager.init();

      // 5. Camera controllers
      cameraManager.registerController('story', new StoryCameraController());
      cameraManager.registerController('explore', new ExploreCameraController());
      cameraManager.registerController('detail', new DetailCameraController());

      // 6. Asset manifest
      await assetResolver.loadManifest();

      // 7. Start ticker with game loop
      ticker.add('quality', (delta) => qualityManager.update(delta));
      ticker.add('camera', (delta) => cameraManager.update(delta));
      ticker.add('zones', () => {
        const mode = useExperienceStore.getState().mode;
        if (mode === 'story') {
          const progress = useCameraStore.getState().scrollProgress;
          zoneManager.updateFromScroll(progress);
        }
      });

      // 8. Start
      qualityManager.start();
      ticker.start();

      // 9. Load initial zone
      zoneManager.transitionTo('atelier'); // Benchmark zone

      this.initialized = true;
      useExperienceStore.getState().setStatus('ready');

      const loadTime = performance.now() - this.initStartTime;
      trackExperienceLoaded(useQualityStore.getState().tier, Math.round(loadTime));
      devTools.log('WorldManager', `Ready in ${Math.round(loadTime)}ms`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      useExperienceStore.getState().setError(message);
      devTools.log('WorldManager', `Init failed: ${message}`);
    }
  }

  /** Cleanup all subsystems */
  dispose(): void {
    ticker.dispose();
    inputManager.dispose();
    audioManager.dispose();
    cameraManager.dispose();
    qualityManager.dispose();
    devTools.dispose();
    this.initialized = false;
  }
}

export const worldManager = new WorldManager();
