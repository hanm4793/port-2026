'use client';

// =============================================================================
// ChapterProgress — minimal progress indicator
// =============================================================================
//
// Vertical dots on the right side of the viewport.
// Active chapter dot is highlighted. Shows chapter title on hover.

import { STORY_CHAPTERS } from '@/experience/story/StoryConfig';
import type { StoryScrollState } from '@/hooks/useStoryScroll';
import { useExperienceStore } from '@/stores/useExperienceStore';

interface ChapterProgressProps {
  scrollState: StoryScrollState;
}

export function ChapterProgress({ scrollState }: ChapterProgressProps) {
  const mode = useExperienceStore((s) => s.mode);

  if (mode !== 'story') return null;

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3"
      aria-label="Story chapters"
    >
      {STORY_CHAPTERS.map((chapter, index) => {
        const isActive = scrollState.chapterIndex === index;
        const isPast = scrollState.chapterIndex > index;

        return (
          <a
            key={chapter.id}
            href={`#chapter-${chapter.id}`}
            className="group flex items-center gap-2"
            aria-label={chapter.title}
            aria-current={isActive ? 'step' : undefined}
          >
            {/* Label — shows on hover */}
            <span
              className="text-[10px] tracking-wider uppercase text-[#A89E8E]
                         opacity-0 group-hover:opacity-100 transition-opacity
                         translate-x-1 group-hover:translate-x-0 transition-transform"
            >
              {chapter.title}
            </span>

            {/* Dot */}
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                backgroundColor: isActive
                  ? '#C9A84C'
                  : isPast
                    ? '#A89E8E'
                    : '#3A3632',
              }}
            />
          </a>
        );
      })}
    </nav>
  );
}
