'use client';

// =============================================================================
// StoryChapters — semantic HTML sections synced to story beats
// Mobile-adapted with full-width frosted glass bottom docking,
// high-contrast typography, and thumb-friendly touch targets.
// =============================================================================

import { STORY_CHAPTERS, CHAPTER_SCROLL_HEIGHT, interpolateBeats } from '@/experience/story/StoryConfig';
import type { StoryBeat } from '@/experience/story/StoryConfig';
import type { StoryScrollState } from '@/hooks/useStoryScroll';

interface StoryChaptersProps {
  scrollState: StoryScrollState;
}

export function StoryChapters({ scrollState }: StoryChaptersProps) {
  return (
    <div className="content-layer relative z-10">
      {STORY_CHAPTERS.map((chapter, index) => {
        const isActive = scrollState.chapterIndex === index;
        const localProgress = isActive ? scrollState.chapterProgress : 0;

        // Find which beat is active
        const { activeBeatIndex } = isActive
          ? interpolateBeats(chapter.beats, localProgress)
          : { activeBeatIndex: 0 };

        return (
          <section
            key={chapter.id}
            id={`chapter-${chapter.id}`}
            className="relative"
            style={{ height: `${CHAPTER_SCROLL_HEIGHT}vh` }}
            aria-label={chapter.title}
          >
            <div className="sticky top-0 h-screen flex items-end justify-start pb-16 sm:pb-24 px-4 sm:px-8 md:px-16 pointer-events-none">
              {chapter.beats.map((beat, bi) => (
                <BeatCard
                  key={bi}
                  beat={beat}
                  isVisible={isActive && bi === activeBeatIndex}
                  localProgress={localProgress}
                  beatAt={beat.at}
                  nextBeatAt={chapter.beats[bi + 1]?.at ?? 1}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

// ─── Beat card ──────────────────────────────────────────────────────────

interface BeatCardProps {
  beat: StoryBeat;
  isVisible: boolean;
  localProgress: number;
  beatAt: number;
  nextBeatAt: number;
}

function BeatCard({ beat, isVisible, localProgress, beatAt, nextBeatAt }: BeatCardProps) {
  if (!beat.heading && !beat.body) return null;

  // Fade: in at start of beat, out before next beat
  const beatDuration = nextBeatAt - beatAt;
  const beatLocalProgress = beatDuration > 0 ? (localProgress - beatAt) / beatDuration : 0;

  let opacity = 0;
  if (isVisible) {
    if (beatLocalProgress < 0.15) opacity = beatLocalProgress / 0.15;
    else if (beatLocalProgress < 0.75) opacity = 1;
    else opacity = Math.max(0, 1 - (beatLocalProgress - 0.75) / 0.25);
  }

  return (
    <div
      className="absolute bottom-16 sm:bottom-24 left-4 right-4 sm:right-auto sm:left-8 md:left-16 sm:max-w-md transition-all duration-500"
      style={{
        opacity,
        transform: `translateY(${isVisible ? 0 : 16}px)`,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
      }}
    >
      {/* Mobile-optimized frosted card panel */}
      <div className="p-5 sm:p-0 bg-[#161412]/88 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-[#3A3632]/50 sm:border-0 rounded-lg sm:rounded-none shadow-2xl sm:shadow-none">
        {/* Beat label */}
        {beat.label && (
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] mb-1.5 block font-mono">
            {beat.label}
          </span>
        )}

        {/* Heading */}
        {beat.heading && (
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight mb-2 sm:mb-3 text-[#F5F0E6] drop-shadow-lg">
            {beat.heading}
          </h2>
        )}

        {/* Body */}
        {beat.body && (
          <p className="text-xs sm:text-sm md:text-base text-[#C4B9AA] sm:text-[#B8AEA0] leading-relaxed mb-4 drop-shadow-md">
            {beat.body}
          </p>
        )}

        {/* CTA */}
        {beat.cta && (
          <a
            href={beat.cta.href}
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 text-xs tracking-wider uppercase font-medium bg-[#C9A84C] text-[#1A1816] hover:bg-[#C9A84C]/90 active:scale-95 transition-all shadow-lg"
          >
            {beat.cta.text} &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
