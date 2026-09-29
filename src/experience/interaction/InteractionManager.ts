// =============================================================================
// Interaction Manager — raycasting, hover, click dispatch
// =============================================================================

import * as THREE from 'three';
import { useOverlayStore } from '@/stores/useOverlayStore';
import { useExperienceStore } from '@/stores/useExperienceStore';
import { trackInteraction } from '@/experience/core/AnalyticsHooks';
import type { ZoneId } from '@/types/experience';
import type { OverlayId } from '@/types/content';

export interface InteractiveObjectConfig {
  id: string;
  zone: ZoneId;
  overlayId: OverlayId;
  overlayData?: Record<string, unknown>;
}

/**
 * Manages 3D object interaction via raycasting.
 * Dispatches hover/click events and opens overlays.
 */
class InteractionManager {
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private interactiveObjects: Map<string, { mesh: THREE.Object3D; config: InteractiveObjectConfig }> =
    new Map();

  /** Register an interactive 3D object */
  register(mesh: THREE.Object3D, config: InteractiveObjectConfig): void {
    this.interactiveObjects.set(config.id, { mesh, config });
  }

  /** Unregister an interactive object */
  unregister(id: string): void {
    this.interactiveObjects.delete(id);
  }

  /** Update pointer position (normalized device coordinates) */
  setPointer(x: number, y: number): void {
    this.pointer.set(x, y);
  }

  /** Perform raycast and return the hit interactive object, if any */
  raycast(camera: THREE.Camera): InteractiveObjectConfig | null {
    if (useExperienceStore.getState().mode === 'detail') return null;

    this.raycaster.setFromCamera(this.pointer, camera);

    const meshes = Array.from(this.interactiveObjects.values()).map((entry) => entry.mesh);
    const intersects = this.raycaster.intersectObjects(meshes, true);

    if (intersects.length > 0) {
      // Find the first intersected registered object
      for (const intersect of intersects) {
        let obj: THREE.Object3D | null = intersect.object;
        while (obj) {
          for (const entry of this.interactiveObjects.values()) {
            if (entry.mesh === obj) {
              return entry.config;
            }
          }
          obj = obj.parent;
        }
      }
    }

    return null;
  }

  /** Handle click on an interactive object */
  handleClick(config: InteractiveObjectConfig): void {
    useExperienceStore.getState().openDetail();
    useOverlayStore.getState().openOverlay(config.overlayId, config.overlayData);
    trackInteraction(config.id, config.zone);
  }

  /** Clear all registered objects */
  dispose(): void {
    this.interactiveObjects.clear();
  }
}

export const interactionManager = new InteractionManager();
