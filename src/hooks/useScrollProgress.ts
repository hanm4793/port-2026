'use client';

import { useRef, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import { useInputStore } from '@/stores/useInputStore';
import { useCameraStore } from '@/stores/useCameraStore';

/**
 * Initializes Lenis smooth scroll and syncs scroll progress to stores.
 * Returns the normalized scroll progress [0, 1].
 */
export function useScrollProgress(): number {
  const lenisRef = useRef<Lenis | null>(null);
  const scrollProgress = useInputStore((s) => s.scrollProgress);

  const onScroll = useCallback((e: { progress: number }) => {
    useInputStore.getState().setScrollProgress(e.progress);
    useCameraStore.getState().setScrollProgress(e.progress);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', onScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [onScroll]);

  return scrollProgress;
}
