// =============================================================================
// Story Mode — chapter + beat configuration
// =============================================================================

import type { ZoneId } from '@/types/experience';

/** Camera state at a point in the story */
export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

/** A beat within a chapter — one camera shot + one DOM content card */
export interface StoryBeat {
  /** Local progress [0,1] within the chapter where this beat starts */
  at: number;
  /** Camera state at this beat */
  camera: CameraState;
  /** DOM content to show during this beat */
  label?: string;
  heading?: string;
  body?: string;
  /** CTA button */
  cta?: { text: string; href: string };
}

/** A story chapter — one narrative section */
export interface StoryChapter {
  id: string;
  title: string;
  zones: ZoneId[];
  theme: 'dark' | 'light' | 'accent';
  /** Ordered camera/content beats within this chapter */
  beats: StoryBeat[];
  /** Zone ID to preload during this chapter */
  preloadZone?: ZoneId;
}

// =============================================================================
// Chapter definitions
// =============================================================================

export const STORY_CHAPTERS: StoryChapter[] = [
  // ─── Chapter 1: Shore of Arrival ──────────────────────────────────────
  {
    id: 'arrival',
    title: 'Arrival',
    zones: ['shore'],
    theme: 'light',
    preloadZone: 'forum',
    beats: [
      {
        // Beat 1: Establishing — from far over ocean, looking toward the island shore
        // Camera is far out at sea, high up, ocean waves visible below
        at: 0.0,
        camera: {
          position: [8, 6, 42],
          target: [0, 1, 5],
          fov: 55,
        },
        label: '01',
        heading: 'Island of Memory',
        body: 'A portfolio built as a world. Scroll to enter.',
      },
      {
        // Beat 2: Descent — camera sweeps lower over the water, approaching the shore
        at: 0.3,
        camera: {
          position: [4, 3, 22],
          target: [0, 1.5, 4],
          fov: 52,
        },
        heading: 'Builder of Worlds',
        body: 'Full-stack developer, AI filmmaker, musician, and creative technologist.',
      },
      {
        // Beat 3: Landmark reveal — gate fills the frame, circuit traces visible
        at: 0.6,
        camera: {
          position: [0, 3, 6],
          target: [0, 3.5, 0],
          fov: 45,
        },
        heading: 'The Gate of Names',
        body: 'Code and art, ancient form and living technology. Every project begins at this threshold.',
      },
      {
        // Beat 4: Through the gate — camera passes threshold, path leads onward
        at: 0.9,
        camera: {
          position: [0, 2.5, -2],
          target: [0, 3, -15],
          fov: 55,
        },
        heading: 'Choose Your Path',
        body: 'Scroll to continue the guided story, or explore freely.',
        cta: { text: 'Continue', href: '#chapter-systems' },
      },
    ],
  },

  // ─── Chapter 2: Systems ───────────────────────────────────────────────
  {
    id: 'systems',
    title: 'Systems',
    zones: ['forum'],
    theme: 'dark',
    preloadZone: 'agora',
    beats: [
      {
        // Entering Forum from Shore path
        at: 0.0,
        camera: {
          position: [0, 3.5, -3],
          target: [0, 2, -9],
          fov: 50,
        },
        label: '02',
        heading: 'I Build Digital Systems',
        body: 'Web applications, mobile apps, CRM platforms, and enterprise systems. TypeScript-first architecture built for performance and scale.',
      },
      {
        // Overhead view of the System Table
        at: 0.35,
        camera: {
          position: [3, 4, -7],
          target: [0, 1.8, -9],
          fov: 48,
        },
        heading: 'Architecture That Scales',
        body: 'Every system starts with clear architecture. Frontend, API, backend — layered for maintainability.',
        cta: { text: 'Explore System Services', href: '/services#build' },
      },
      {
        // Looking along the colonnade toward archive alcoves
        at: 0.7,
        camera: {
          position: [-4, 3, -6],
          target: [2, 2, -12],
          fov: 52,
        },
        heading: 'Verifiable Case Studies',
        body: 'Click any illuminated alcove to review architectural decisions and production metrics.',
        cta: { text: 'View Case Studies', href: '/projects' },
      },
    ],
  },

  // ─── Chapter 3: Growth ────────────────────────────────────────────────
  {
    id: 'growth',
    title: 'Growth',
    zones: ['agora'],
    theme: 'light',
    beats: [
      {
        at: 0.0,
        camera: {
          position: [3, 4, -14],
          target: [-2, 2, -22],
          fov: 52,
        },
        label: '03',
        heading: 'I Grow Digital Presence',
        body: 'Automation, digital campaigns, workflow optimization. Connecting tools, eliminating waste, building growth engines.',
      },
      {
        at: 0.6,
        camera: {
          position: [-3, 5, -20],
          target: [0, 2, -28],
          fov: 55,
        },
      },
    ],
  },

  // ─── Chapter 4: Worlds ────────────────────────────────────────────────
  {
    id: 'worlds',
    title: 'Worlds',
    zones: ['sanctuary'],
    theme: 'dark',
    preloadZone: 'amphitheatre',
    beats: [
      {
        // Beat 1: Approaching the Fossil Arch
        at: 0.0,
        camera: {
          position: [0, 4.5, -18],
          target: [0, 2.5, -28],
          fov: 48,
        },
        label: '04',
        heading: 'Primeval Horizons',
        body: 'Beyond systems lies original world-building. Directing fictional ecosystems with strict cinematographic control.',
      },
      {
        // Beat 2: Focused on the Pipeline Altar
        at: 0.4,
        camera: {
          position: [3.8, 3.0, -27],
          target: [3.5, 2.0, -31],
          fov: 44,
        },
        heading: 'The Generative Pipeline',
        body: 'From lore bible to 3D animatics, steered neural synthesis, and live orchestral score. No generic AI slop.',
        cta: { text: 'View Film Chronicle', href: '/projects/dinosaur-universe-chronicles' },
      },
      {
        // Beat 3: Wide vista across the glowing sanctuary basin
        at: 0.8,
        camera: {
          position: [-3.5, 3.8, -25],
          target: [1.0, 1.8, -31],
          fov: 52,
        },
        heading: 'Crafted Imagination',
        body: 'Every creature silhouette, lighting key, and narrative arc is authored with intent.',
      },
    ],
  },

  // ─── Chapter 5: Art & Music ───────────────────────────────────────────
  {
    id: 'art',
    title: 'Art & Music',
    zones: ['amphitheatre', 'temple'],
    theme: 'light',
    beats: [
      {
        at: 0.0,
        camera: {
          position: [-4, 4, -30],
          target: [0, 3, -38],
          fov: 52,
        },
        label: '05',
        heading: 'I Create',
        body: 'Original music, sonic identity, photography, and creative technology. Technical precision meeting artistic expression.',
      },
      {
        at: 0.6,
        camera: {
          position: [0, 5, -36],
          target: [0, 4, -42],
          fov: 50,
        },
      },
    ],
  },

  // ─── Chapter 6: Invitation ────────────────────────────────────────────
  {
    id: 'invitation',
    title: 'Begin',
    zones: ['beacon'],
    theme: 'accent',
    beats: [
      {
        at: 0.0,
        camera: {
          position: [0, 5, -38],
          target: [0, 10, -45],
          fov: 48,
        },
        label: '06',
        heading: "Let's Build Something",
        body: "Whether you need a digital system, a creative experience, or something without a name yet — the signal is lit.",
      },
      {
        at: 0.5,
        camera: {
          position: [0, 7, -42],
          target: [0, 11, -45],
          fov: 42,
        },
        heading: 'Start a Conversation',
        cta: { text: 'Get in Touch', href: '/contact' },
      },
    ],
  },
];

export const CHAPTER_SCROLL_HEIGHT = 150;
export const TOTAL_SCROLL_HEIGHT = STORY_CHAPTERS.length * CHAPTER_SCROLL_HEIGHT;

/** Get chapter + local progress for a global scroll progress [0,1] */
export function getChapterAtProgress(globalProgress: number): {
  index: number;
  chapter: StoryChapter;
  localProgress: number;
} {
  const n = STORY_CHAPTERS.length;
  const raw = globalProgress * n;
  const index = Math.min(Math.floor(raw), n - 1);
  return {
    index,
    chapter: STORY_CHAPTERS[index],
    localProgress: Math.min(raw - index, 1),
  };
}

/** Interpolate camera between two beats based on local progress */
export function interpolateBeats(
  beats: StoryBeat[],
  localProgress: number,
): { camera: CameraState; activeBeatIndex: number } {
  if (beats.length === 1) {
    return { camera: beats[0].camera, activeBeatIndex: 0 };
  }

  // Find surrounding beats
  let startIdx = 0;
  for (let i = 0; i < beats.length - 1; i++) {
    if (localProgress >= beats[i].at) startIdx = i;
  }
  const endIdx = Math.min(startIdx + 1, beats.length - 1);

  const a = beats[startIdx];
  const b = beats[endIdx];

  const range = b.at - a.at;
  const t = range > 0 ? Math.min((localProgress - a.at) / range, 1) : 0;
  // Smoothstep
  const st = t * t * (3 - 2 * t);

  const camera: CameraState = {
    position: [
      a.camera.position[0] + (b.camera.position[0] - a.camera.position[0]) * st,
      a.camera.position[1] + (b.camera.position[1] - a.camera.position[1]) * st,
      a.camera.position[2] + (b.camera.position[2] - a.camera.position[2]) * st,
    ],
    target: [
      a.camera.target[0] + (b.camera.target[0] - a.camera.target[0]) * st,
      a.camera.target[1] + (b.camera.target[1] - a.camera.target[1]) * st,
      a.camera.target[2] + (b.camera.target[2] - a.camera.target[2]) * st,
    ],
    fov: a.camera.fov + (b.camera.fov - a.camera.fov) * st,
  };

  return { camera, activeBeatIndex: startIdx };
}
