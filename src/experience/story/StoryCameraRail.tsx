'use client';

// =============================================================================
// StoryCameraRail — multi-keyframe camera driver from scroll
// Mobile-adapted: compensates vertical portrait aspect ratio by widening FOV (+10°)
// and raising camera elevation (+0.6m Y) so landmarks remain in the upper 45% of
// the screen while text cards occupy the bottom half.
// =============================================================================

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useCameraStore } from '@/stores/useCameraStore';
import { useExperienceStore } from '@/stores/useExperienceStore';
import { useQualityStore } from '@/stores/useQualityStore';
import { getChapterAtProgress, interpolateBeats } from '@/experience/story/StoryConfig';

const _pos = new THREE.Vector3();
const _tar = new THREE.Vector3();

export function StoryCameraRail() {
  const mode = useExperienceStore((s) => s.mode);
  const isMobile = useQualityStore((s) => s.isMobileDevice);
  const currentTarget = useRef(new THREE.Vector3(0, 2, 0));
  const currentPos = useRef(new THREE.Vector3(0, 8, 32));
  const initialized = useRef(false);

  useFrame(({ camera, size }) => {
    if (mode !== 'story') return;

    const progress = useCameraStore.getState().scrollProgress;
    const { chapter, localProgress } = getChapterAtProgress(progress);

    if (!chapter) return;

    const { camera: cam } = interpolateBeats(chapter.beats, localProgress);

    // Mobile vertical aspect ratio compensation
    const isPortrait = size.width < size.height;
    const targetFov = isPortrait ? Math.min(cam.fov + 10, 68) : cam.fov;
    const yOffset = isPortrait ? 0.6 : 0.0;

    _pos.set(cam.position[0], cam.position[1] + yOffset, cam.position[2]);
    _tar.set(cam.target[0], cam.target[1] + yOffset * 0.5, cam.target[2]);

    // First frame: snap instantly
    if (!initialized.current) {
      camera.position.copy(_pos);
      currentTarget.current.copy(_tar);
      currentPos.current.copy(_pos);
      camera.lookAt(_tar);
      (camera as THREE.PerspectiveCamera).fov = targetFov;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      initialized.current = true;
      return;
    }

    // Smooth damp
    const damp = isMobile ? 0.16 : 0.12;
    currentPos.current.lerp(_pos, damp);
    currentTarget.current.lerp(_tar, damp);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);

    const pcam = camera as THREE.PerspectiveCamera;
    pcam.fov += (targetFov - pcam.fov) * damp;
    pcam.updateProjectionMatrix();
  });

  return null;
}
