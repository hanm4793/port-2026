// =============================================================================
// Analytics event helpers
// =============================================================================

import type { AnalyticsEventType } from '@/types/events';

/**
 * Fire an analytics event. Non-blocking, fire-and-forget.
 * Currently logs to console in development.
 * Replace with Vercel Analytics or custom backend in production.
 */
export function trackEvent(
  type: AnalyticsEventType,
  properties: Record<string, string | number | boolean> = {},
): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${type}`, properties);
  }

  // TODO: Integrate with Vercel Analytics or custom endpoint
  // try {
  //   track(type, properties);
  // } catch {
  //   // Analytics should never break the app
  // }
}
