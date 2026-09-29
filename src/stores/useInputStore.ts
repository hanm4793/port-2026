// =============================================================================
// Input store — scroll progress, pointer position, input device
// =============================================================================

import { create } from 'zustand';

type InputDevice = 'mouse' | 'touch' | 'keyboard' | 'none';

interface InputState {
  scrollProgress: number;
  pointerX: number;
  pointerY: number;
  activeDevice: InputDevice;

  // Actions
  setScrollProgress: (progress: number) => void;
  setPointer: (x: number, y: number) => void;
  setActiveDevice: (device: InputDevice) => void;
}

export const useInputStore = create<InputState>((set) => ({
  scrollProgress: 0,
  pointerX: 0,
  pointerY: 0,
  activeDevice: 'none',

  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setPointer: (pointerX, pointerY) => set({ pointerX, pointerY }),
  setActiveDevice: (activeDevice) => set({ activeDevice }),
}));
