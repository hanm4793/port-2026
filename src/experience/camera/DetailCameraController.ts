// =============================================================================
// Detail Camera Controller — focused view when overlay is open
// =============================================================================

import * as THREE from 'three';
import type { CameraController } from './CameraManager';

/**
 * Camera pulls back slightly and locks when an overlay is open.
 * Provides subtle depth-of-field effect via FOV adjustment.
 */
export class DetailCameraController implements CameraController {
  private savedPosition = new THREE.Vector3();
  private savedFov: number = 55;

  activate(camera: THREE.PerspectiveCamera): void {
    // Save current position for return
    this.savedPosition.copy(camera.position);
    this.savedFov = camera.fov;

    // Pull back slightly
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    camera.position.sub(direction.multiplyScalar(2)); // Pull back 2 meters
    camera.updateProjectionMatrix();
  }

  deactivate(): void {
    // Position will be restored by the next active controller
  }

  update(_delta: number, _camera: THREE.PerspectiveCamera): void {
    // Camera is locked in detail mode — no updates
  }
}
