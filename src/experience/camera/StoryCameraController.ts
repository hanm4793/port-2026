// =============================================================================
// Story Camera Controller — scroll-driven camera path
// =============================================================================

import * as THREE from 'three';
import type { CameraController } from './CameraManager';
import { useCameraStore } from '@/stores/useCameraStore';
import type { CameraKeyframe } from '@/types/experience';
import { lerp } from '@/lib/math';
import { lerpVector3 } from '@/lib/three-utils';

/** Default camera path — will be replaced with zone-specific paths */
const DEFAULT_KEYFRAMES: CameraKeyframe[] = [
  { scrollProgress: 0.0, position: [0, 5, 20], target: [0, 1, 0], fov: 55 },
  { scrollProgress: 0.25, position: [5, 3, 10], target: [0, 1, 0], fov: 55 },
  { scrollProgress: 0.5, position: [0, 2, 5], target: [0, 1, 0], fov: 50 },
  { scrollProgress: 0.75, position: [-5, 3, 10], target: [0, 1.5, 0], fov: 55 },
  { scrollProgress: 1.0, position: [0, 8, 15], target: [0, 2, 0], fov: 60 },
];

export class StoryCameraController implements CameraController {
  private keyframes: CameraKeyframe[] = DEFAULT_KEYFRAMES;
  private posA = new THREE.Vector3();
  private posB = new THREE.Vector3();
  private targetA = new THREE.Vector3();
  private targetB = new THREE.Vector3();
  private tempPos = new THREE.Vector3();
  private tempTarget = new THREE.Vector3();

  setKeyframes(keyframes: CameraKeyframe[]): void {
    this.keyframes = keyframes;
  }

  activate(_camera: THREE.PerspectiveCamera): void {
    // Camera will be positioned on next update
  }

  deactivate(): void {
    // Nothing to clean up
  }

  update(_delta: number, camera: THREE.PerspectiveCamera): void {
    const progress = useCameraStore.getState().scrollProgress;
    this.applyCameraAtProgress(progress, camera);
  }

  private applyCameraAtProgress(progress: number, camera: THREE.PerspectiveCamera): void {
    if (this.keyframes.length < 2) return;

    // Find the two surrounding keyframes
    let startIdx = 0;
    for (let i = 0; i < this.keyframes.length - 1; i++) {
      if (progress >= this.keyframes[i].scrollProgress) {
        startIdx = i;
      }
    }
    const endIdx = Math.min(startIdx + 1, this.keyframes.length - 1);

    const startKf = this.keyframes[startIdx];
    const endKf = this.keyframes[endIdx];

    // Calculate local t between the two keyframes
    const range = endKf.scrollProgress - startKf.scrollProgress;
    const localT = range > 0 ? (progress - startKf.scrollProgress) / range : 0;
    const easedT = localT * localT * (3 - 2 * localT); // smoothstep

    // Interpolate position
    this.posA.set(...startKf.position);
    this.posB.set(...endKf.position);
    lerpVector3(this.tempPos, this.posA, this.posB, easedT);
    camera.position.copy(this.tempPos);

    // Interpolate target
    this.targetA.set(...startKf.target);
    this.targetB.set(...endKf.target);
    lerpVector3(this.tempTarget, this.targetA, this.targetB, easedT);
    camera.lookAt(this.tempTarget);

    // Interpolate FOV
    camera.fov = lerp(startKf.fov, endKf.fov, easedT);
    camera.updateProjectionMatrix();
  }
}
