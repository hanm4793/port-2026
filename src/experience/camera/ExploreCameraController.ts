// =============================================================================
// Explore Camera Controller — free orbit (stub for v2)
// =============================================================================

import * as THREE from 'three';
import type { CameraController } from './CameraManager';

/**
 * Free orbit camera for Explore Mode.
 * Stub — full implementation in v2 when Explore Mode is built.
 */
export class ExploreCameraController implements CameraController {
  activate(_camera: THREE.PerspectiveCamera): void {
    // TODO: Enable orbit controls, set constraints
  }

  deactivate(): void {
    // TODO: Disable orbit controls
  }

  update(_delta: number, _camera: THREE.PerspectiveCamera): void {
    // TODO: Update orbit controls per frame
  }
}
