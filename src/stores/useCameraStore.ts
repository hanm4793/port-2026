// =============================================================================
// Camera store — controller state, transform, scroll progress
// =============================================================================

import { create } from 'zustand';
import type { CameraControllerType } from '@/types/experience';
import { CAMERA_FOV, CAMERA_DEFAULT_POSITION, CAMERA_DEFAULT_TARGET } from '@/lib/constants';

interface CameraState {
  activeController: CameraControllerType;
  scrollProgress: number;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;

  // Actions
  setActiveController: (controller: CameraControllerType) => void;
  setScrollProgress: (progress: number) => void;
  updateTransform: (
    position: [number, number, number],
    target: [number, number, number],
    fov: number,
  ) => void;
}

export const useCameraStore = create<CameraState>((set) => ({
  activeController: 'story',
  scrollProgress: 0,
  position: CAMERA_DEFAULT_POSITION,
  target: CAMERA_DEFAULT_TARGET,
  fov: CAMERA_FOV,

  setActiveController: (activeController) => set({ activeController }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  updateTransform: (position, target, fov) => set({ position, target, fov }),
}));
