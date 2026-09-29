'use client';

import { useState, useEffect } from 'react';

/**
 * React hook for responsive breakpoint detection.
 * Returns true if the viewport matches the media query.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

/** Convenience: true when viewport is below mobile breakpoint */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 1023px)');
}
