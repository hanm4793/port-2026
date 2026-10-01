'use client';

// =============================================================================
// ZoneCuller — 3-Tier Spatial Visibility & Hysteresis Container
// Task E: Eliminates hard visual popping and prevents premature unmounting.
// Uses overlapping transition ranges and generous distance buffers.
// =============================================================================

import { useMemo } from 'react';
import { useCameraStore } from '@/stores/useCameraStore';
import { useExperienceStore } from '@/stores/useExperienceStore';
import { useExploreStore } from '@/stores/useExploreStore';
import { useQualityStore } from '@/stores/useQualityStore';
import { getChapterAtProgress } from '@/experience/story/StoryConfig';
import {
  ZONE_VISIBILITY_DESCRIPTORS,
  type MasterZoneId,
} from '@/experience/world/ZoneVisibilityDescriptors';

interface ZoneCullerProps {
  zoneKey: MasterZoneId;
  children: React.ReactNode;
}

export function ZoneCuller({ zoneKey, children }: ZoneCullerProps) {
  const mode = useExperienceStore((s) => s.mode);
  const scrollProgress = useCameraStore((s) => s.scrollProgress);
  const playerPos = useExploreStore((s) => s.playerPosition);
  const tier = useQualityStore((s) => s.tier);

  const descriptor = ZONE_VISIBILITY_DESCRIPTORS[zoneKey];
  const zoneZCenter = descriptor?.center[2] ?? 0;

  // Story Mode: Overlapping chapter ranges (never hard unmount immediate neighbors)
  const isVisibleInStory = useMemo(() => {
    if (!descriptor) return true;
    const { chapter } = getChapterAtProgress(scrollProgress);

    // Active in this chapter?
    if (descriptor.storyChapters.includes(chapter.id)) return true;

    // Overlapping lookahead buffer (+-0.22 scroll ratio = ~1.3 chapters ahead/behind)
    const forwardChapter = getChapterAtProgress(Math.min(scrollProgress + 0.22, 1.0)).chapter;
    if (descriptor.storyChapters.includes(forwardChapter.id)) return true;

    const backwardChapter = getChapterAtProgress(Math.max(scrollProgress - 0.22, 0.0)).chapter;
    if (descriptor.storyChapters.includes(backwardChapter.id)) return true;

    // Keep active if on High/Medium tier for broad panoramic sightlines
    if (tier === 'high' || tier === 'medium') {
      const farForward = getChapterAtProgress(Math.min(scrollProgress + 0.38, 1.0)).chapter;
      if (descriptor.storyChapters.includes(farForward.id)) return true;
    }

    return false;
  }, [scrollProgress, descriptor, tier]);

  // Explore Mode: Euclidean distance with generous buffer to prevent popping
  const isVisibleInExplore = useMemo(() => {
    if (!descriptor) return true;
    const dz = Math.abs(playerPos[2] - zoneZCenter);

    // Base threshold from descriptor + 8m hysteresis buffer
    const baseThreshold = tier === 'low' ? descriptor.exploreDistances.mid : descriptor.exploreDistances.far;
    const maxThreshold = baseThreshold + 8.0;

    return dz <= maxThreshold;
  }, [playerPos, zoneZCenter, descriptor, tier]);

  const shouldRender = mode === 'story' ? isVisibleInStory : isVisibleInExplore;

  if (!shouldRender) return null;

  return <>{children}</>;
}
