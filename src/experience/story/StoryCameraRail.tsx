'use client';

// =============================================================================
// StoryCameraRail — multi-keyframe camera driver from scroll
// =============================================================================

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useCameraStore } from '@/stores/useCameraStore';
import { useExperienceStore } from '@/stores/useExperienceStore';
import { getChapterAtProgress, interpolateBeats } from '@/experience/story/StoryConfig';

const _pos = new THREE.Vector3();
const _tar = new THREE.Vector3();

export function StoryCameraRail() {
  const mode = useExperienceStore((s) => s.mode);
  const currentTarget = useRef(new THREE.Vector3(0, 2, 0));
  const currentPos = useRef(new THREE.Vector3(0, 8, 32));
  const initialized = useRef(false);

  useFrame(({ camera }) => {
    if (mode !== 'story') return;

    const progress = useCameraStore.getState().scrollProgress;
    const { chapter, localProgress } = getChapterAtProgress(progress);

    if (!chapter) return;

    const { camera: cam } = interpolateBeats(chapter.beats, localProgress);

    _pos.set(...cam.position);
    _tar.set(...cam.target);

    // First frame: snap instantly. After that: smooth damp.
    if (!initialized.current) {
      camera.position.copy(_pos);
      currentTarget.current.copy(_tar);
      currentPos.current.copy(_pos);
      camera.lookAt(_tar);
      (camera as THREE.PerspectiveCamera).fov = cam.fov;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      initialized.current = true;
      return;
    }

    // Smooth damp — responsive enough to feel connected to scroll
    const damp = 0.12;
    currentPos.current.lerp(_pos, damp);
    currentTarget.current.lerp(_tar, damp);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);

    const pcam = camera as THREE.PerspectiveCamera;
    pcam.fov += (cam.fov - pcam.fov) * damp;
    pcam.updateProjectionMatrix();
  });

  return null;
}
