// =============================================================================
// Event types — interactions and analytics
// =============================================================================

import type { ZoneId } from './experience';
import type { OverlayId } from './content';

/** Interaction events dispatched by the 3D layer */
export interface InteractionEvent {
  type: 'hover-enter' | 'hover-leave' | 'click';
  objectId: string;
  zone: ZoneId;
  position: [number, number, number];
}

/** Analytics events */
export type AnalyticsEventType =
  | 'experience_loaded'
  | 'zone_enter'
  | 'interaction_click'
  | 'overlay_open'
  | 'overlay_close'
  | 'cta_click'
  | 'mode_switch'
  | 'quality_change';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  properties: Record<string, string | number | boolean>;
  timestamp: number;
}

// Re-export OverlayId for convenience
export type { OverlayId };
