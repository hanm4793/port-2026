import { describe, it, expect } from 'vitest';
import { useQualityStore } from '@/stores/useQualityStore';
import { getChapterAtProgress, interpolateBeats, STORY_CHAPTERS } from '@/experience/story/StoryConfig';

describe('Mobile Story Adaptation & Layout Mechanics', () => {
  it('caps DPR to 1.0 on mobile devices to prevent fill-rate choke', () => {
    useQualityStore.getState().setMobileDevice(true);
    useQualityStore.getState().setTier('low');

    const s = useQualityStore.getState();
    expect(s.isMobileDevice).toBe(true);
    expect(s.dpr).toEqual([1, 1.0]);
    expect(s.shadows).toBe(false);
    expect(s.vertexWaves).toBe(false);
  });

  it('story chapter beats maintain clean progression across all 6 narrative phases', () => {
    // 0% -> Shore
    const start = getChapterAtProgress(0.0);
    expect(start.chapter.id).toBe('arrival');

    // 25% -> Systems (Forum)
    const ch2 = getChapterAtProgress(0.25);
    expect(ch2.chapter.id).toBe('systems');

    // 55% -> Worlds (Dino Sanctuary)
    const ch4 = getChapterAtProgress(0.55);
    expect(ch4.chapter.id).toBe('worlds');

    // 75% -> Art & Music (Amphitheatre)
    const ch5 = getChapterAtProgress(0.75);
    expect(ch5.chapter.id).toBe('art');

    // 95% -> Invitation (Beacon)
    const ch6 = getChapterAtProgress(0.95);
    expect(ch6.chapter.id).toBe('invitation');
  });

  it('interpolates beat camera state within safe FOV boundaries', () => {
    const arrivalChapter = STORY_CHAPTERS[0];
    const { camera } = interpolateBeats(arrivalChapter.beats, 0.45);

    expect(camera.fov).toBeGreaterThanOrEqual(45);
    expect(camera.fov).toBeLessThanOrEqual(55);
    expect(camera.position[2]).toBeGreaterThan(0); // In front of gate
  });
});
