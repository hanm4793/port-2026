'use client';

import { useState, useEffect } from 'react';

/**
 * React hook for prefers-reduced-motion detection.
 * Returns true when the user has requested reduced motion.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(media.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return prefersReduced;
}
