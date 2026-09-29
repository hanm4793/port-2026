'use client';

// =============================================================================
// StoryChapters — semantic HTML sections synced to story beats
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
            <div className="sticky top-0 h-screen flex items-end justify-start pb-24 px-8 md:px-16">
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
    // Fade in first 20%, full middle, fade out last 15%
    if (beatLocalProgress < 0.15) opacity = beatLocalProgress / 0.15;
    else if (beatLocalProgress < 0.75) opacity = 1;
    else opacity = Math.max(0, 1 - (beatLocalProgress - 0.75) / 0.25);
  }

  return (
    <div
      className="absolute bottom-24 left-8 md:left-16 max-w-md transition-transform duration-500"
      style={{
        opacity,
        transform: `translateY(${isVisible ? 0 : 15}px)`,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
      }}
    >
      {/* Beat label */}
      {beat.label && (
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2 block">
          {beat.label}
        </span>
      )}

      {/* Heading */}
      {beat.heading && (
        <h2 className="text-xl md:text-3xl font-light tracking-tight mb-3 text-[#F5F0E6] drop-shadow-lg">
          {beat.heading}
        </h2>
      )}

      {/* Body */}
      {beat.body && (
        <p className="text-sm md:text-base text-[#B8AEA0] leading-relaxed mb-4 drop-shadow-md max-w-sm">
          {beat.body}
        </p>
      )}

      {/* CTA */}
      {beat.cta && (
        <a
          href={beat.cta.href}
          className="inline-block px-5 py-2 text-xs tracking-wider uppercase
                     bg-[#C9A84C] text-[#1A1816] hover:bg-[#C9A84C]/80
                     transition-colors"
        >
          {beat.cta.text}
        </a>
      )}
    </div>
  );
}
