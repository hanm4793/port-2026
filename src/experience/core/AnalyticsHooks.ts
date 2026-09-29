// =============================================================================
// Analytics Hooks — event tracking integration point
// =============================================================================

import { trackEvent } from '@/lib/analytics';
import type { ZoneId } from '@/types/experience';

/** Fire when experience finishes loading */
export function trackExperienceLoaded(qualityTier: string, loadTimeMs: number): void {
  trackEvent('experience_loaded', { qualityTier, loadTimeMs });
}

/** Fire when user enters a new zone */
export function trackZoneEnter(zone: ZoneId): void {
  trackEvent('zone_enter', { zone });
}

/** Fire when user clicks an interactive object */
export function trackInteraction(objectId: string, zone: ZoneId): void {
  trackEvent('interaction_click', { objectId, zone });
}

/** Fire when an overlay opens */
export function trackOverlayOpen(overlayId: string): void {
  trackEvent('overlay_open', { overlayId });
}

/** Fire when user clicks a CTA */
export function trackCTAClick(ctaId: string): void {
  trackEvent('cta_click', { ctaId });
}

/** Fire when user switches mode */
export function trackModeSwitch(from: string, to: string): void {
  trackEvent('mode_switch', { from, to });
}
