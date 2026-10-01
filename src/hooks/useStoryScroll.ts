'use client';

// =============================================================================
// useStoryScroll — Lenis smooth scroll + GSAP ScrollTrigger progress
// =============================================================================

import { useRef, useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInputStore } from '@/stores/useInputStore';
import { useCameraStore } from '@/stores/useCameraStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { getChapterAtProgress, STORY_CHAPTERS } from '@/experience/story/StoryConfig';

// Register plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface StoryScrollState {
  progress: number;
  chapterIndex: number;
  chapterId: string;
  chapterProgress: number;
  completed: boolean;
}

export function useStoryScroll(): StoryScrollState {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);
  const [state, setState] = useState<StoryScrollState>({
    progress: 0,
    chapterIndex: 0,
    chapterId: STORY_CHAPTERS[0].id,
    chapterProgress: 0,
    completed: false,
  });

  const updateProgress = useCallback((progress: number) => {
    useInputStore.getState().setScrollProgress(progress);
    useCameraStore.getState().setScrollProgress(progress);

    const { index, chapter, localProgress } = getChapterAtProgress(progress);

    // Sync ambient soundscape to story chapter zone
    if (chapter.zones.includes('shore')) {
      useAudioStore.getState().setZone('shore');
    } else if (chapter.zones.includes('forum') || chapter.zones.includes('agora')) {
      useAudioStore.getState().setZone('forum');
    } else if (chapter.zones.includes('sanctuary')) {
      useAudioStore.getState().setZone('sanctuary');
    } else if (chapter.zones.includes('amphitheatre') || chapter.zones.includes('beacon')) {
      useAudioStore.getState().setZone('amphitheatre');
    }

    setState({
      progress,
      chapterIndex: index,
      chapterId: chapter.id,
      chapterProgress: localProgress,
      completed: progress > 0.98,
    });
  }, []);

  useEffect(() => {
    // 1. Lenis for smooth scroll feel
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // 2. Lenis RAF loop — own loop, not piped through GSAP ticker
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    // 3. When Lenis scrolls, tell ScrollTrigger to recalculate
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // 4. Master progress tracker — no scrub, just onUpdate
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        updateProgress(self.progress);
      },
    });

    // 5. Refresh after layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimer);
      cancelAnimationFrame(rafRef.current);
      trigger.kill();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [updateProgress]);

  return state;
}
