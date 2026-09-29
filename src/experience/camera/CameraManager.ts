// =============================================================================
// Camera Manager — orchestrates camera controllers
// =============================================================================

import * as THREE from 'three';
import { useCameraStore } from '@/stores/useCameraStore';
import { useExperienceStore } from '@/stores/useExperienceStore';
import type { CameraControllerType } from '@/types/experience';
import { CAMERA_FOV, CAMERA_NEAR, CAMERA_FAR, CAMERA_DEFAULT_POSITION, CAMERA_DEFAULT_TARGET } from '@/lib/constants';

export interface CameraController {
  update(delta: number, camera: THREE.PerspectiveCamera): void;
  activate(camera: THREE.PerspectiveCamera): void;
  deactivate(): void;
}

/**
 * Manages camera mode switching and delegates to the active controller.
 * Pure TypeScript. R3F bridge sets the actual Three.js camera reference.
 */
class CameraManager {
  private controllers: Map<CameraControllerType, CameraController> = new Map();
  private activeType: CameraControllerType = 'story';
  private camera: THREE.PerspectiveCamera | null = null;

  /** Register a camera controller */
  registerController(type: CameraControllerType, controller: CameraController): void {
    this.controllers.set(type, controller);
  }

  /** Set the Three.js camera reference (called from R3F bridge) */
  setCamera(camera: THREE.PerspectiveCamera): void {
    this.camera = camera;
    camera.fov = CAMERA_FOV;
    camera.near = CAMERA_NEAR;
    camera.far = CAMERA_FAR;
    camera.position.set(...CAMERA_DEFAULT_POSITION);
    camera.lookAt(...CAMERA_DEFAULT_TARGET);
    camera.updateProjectionMatrix();
  }

  /** Switch to a different controller */
  switchTo(type: CameraControllerType): void {
    if (!this.camera) return;

    const current = this.controllers.get(this.activeType);
    current?.deactivate();

    this.activeType = type;
    const next = this.controllers.get(type);
    next?.activate(this.camera);

    useCameraStore.getState().setActiveController(type);
  }

  /** Per-frame update — called from ticker */
  update(delta: number): void {
    if (!this.camera) return;

    const controller = this.controllers.get(this.activeType);
    controller?.update(delta, this.camera);

    // Sync camera transform to store (for debug/analytics, not for rendering)
    const pos = this.camera.position;
    const target = CAMERA_DEFAULT_TARGET; // TODO: read from active controller
    useCameraStore.getState().updateTransform(
      [pos.x, pos.y, pos.z],
      target,
      this.camera.fov,
    );
  }

  /** React to mode changes */
  syncWithMode(): void {
    const mode = useExperienceStore.getState().mode;
    if (mode === 'detail') {
      this.switchTo('detail');
    } else if (mode === 'explore') {
      this.switchTo('explore');
    } else {
      this.switchTo('story');
    }
  }

  dispose(): void {
    for (const controller of this.controllers.values()) {
      controller.deactivate();
    }
    this.controllers.clear();
    this.camera = null;
  }
}

export const cameraManager = new CameraManager();
