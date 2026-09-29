// =============================================================================
// Overlay store — active overlay, data payload
// =============================================================================

import { create } from 'zustand';
import type { OverlayId } from '@/types/content';

interface OverlayState {
  activeOverlay: OverlayId | null;
  overlayData: Record<string, unknown> | null;

  // Actions
  openOverlay: (id: OverlayId, data?: Record<string, unknown>) => void;
  closeOverlay: () => void;
}

export const useOverlayStore = create<OverlayState>((set) => ({
  activeOverlay: null,
  overlayData: null,

  openOverlay: (id, data = {}) => set({ activeOverlay: id, overlayData: data }),
  closeOverlay: () => set({ activeOverlay: null, overlayData: null }),
}));
