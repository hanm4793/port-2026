'use client';

// =============================================================================
// StoryPage — client wrapper that initializes scroll and coordinates DOM + 3D
// =============================================================================

import { useStoryScroll } from '@/hooks/useStoryScroll';
import { StoryChapters } from '@/components/story/StoryChapters';
import { ChapterProgress } from '@/components/story/ChapterProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useExperienceStore } from '@/stores/useExperienceStore';

export function StoryPage() {
  const scrollState = useStoryScroll();
  const reducedMotion = useReducedMotion();
  const mode = useExperienceStore((s) => s.mode);

  // Complete story when scrolled to end
  if (scrollState.completed && !useExperienceStore.getState().storyCompleted) {
    useExperienceStore.getState().completeStory();
  }

  return (
    <>
      {/* Semantic HTML chapters — scrollable content */}
      <StoryChapters scrollState={scrollState} />

      {/* Chapter progress dots — right side */}
      {mode === 'story' && <ChapterProgress scrollState={scrollState} />}

      {/* Reduced-motion notice */}
      {reducedMotion && (
        <div className="fixed bottom-4 left-4 z-30 text-[10px] text-[#A89E8E] opacity-50">
          Reduced motion active
        </div>
      )}
    </>
  );
}
