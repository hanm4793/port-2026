// =============================================================================
// Explore Mode State Store — coordinates avatar movement, discovery seals & fast travel
// =============================================================================

import { create } from 'zustand';

export interface MemorySeal {
  id: string;
  zone: string;
  title: string;
  subtitle: string;
  content: string;
  color: string;
  position: [number, number, number];
}

export const MEMORY_SEALS: MemorySeal[] = [
  {
    id: 'shore-seal',
    zone: 'Shore of Arrival',
    title: 'Seal of the First Shore',
    subtitle: 'The Origin of the Island',
    content:
      'The Island of Memory was conceived as a spatial metaphor for the multi-disciplinary creative mind. Rather than dividing code, film, sound, and systems into isolated portfolio pages, they inhabit one continuous geological body. Every stone here represents a milestone of craft.',
    color: '#C9A84C',
    position: [6.5, 0.8, 4.5],
  },
  {
    id: 'forum-seal',
    zone: 'Forum of Systems',
    title: 'Seal of Architecture',
    subtitle: 'Engineering Philosophy',
    content:
      'In building digital systems, simplicity is the highest sophistication. The classical Roman forum represents structure, endurance, and public utility. Software should be engineered so cleanly that its operations feel inevitable, durable, and free of architectural debt.',
    color: '#6BA3C7',
    position: [-7.0, 1.2, -11.5],
  },
  {
    id: 'sanctuary-seal',
    zone: 'Dino Sanctuary',
    title: 'Seal of the Primeval Horizon',
    subtitle: 'Speculative Lore & Direction',
    content:
      'Generative tools without directorial discipline yield algorithm noise. The dinosaur universe was developed with traditional cinematic grammar: strict anatomical scale, rigid camera tracks modeled in Blender, and narrative arcs scored with live orchestration. AI serves the vision, never the reverse.',
    color: '#68C5AC',
    position: [-3.8, 1.0, -32.5],
  },
  {
    id: 'amphitheatre-seal',
    zone: 'Amphitheatre of Sound',
    title: 'Seal of Resonance',
    subtitle: 'Sonic Memory & Acoustic Space',
    content:
      'Ancient Greek amphitheatres carried a human voice from the orchestra stage to 14,000 spectators through mathematical acoustic reflections. Sound is not an afterthought in interactive art; it is the invisible frequency that breathes emotional life into geometry and light.',
    color: '#D4725C',
    position: [0.0, 3.8, -58.5],
  },
];

export interface ExploreZoneWaypoint {
  id: string;
  name: string;
  position: [number, number, number];
  rotationY: number;
}

export const EXPLORE_WAYPOINTS: ExploreZoneWaypoint[] = [
  { id: 'shore', name: 'Shore of Arrival', position: [0, 1.2, 5.0], rotationY: 0 },
  { id: 'forum', name: 'Forum of Systems', position: [0, 1.2, -8.0], rotationY: 0 },
  { id: 'sanctuary', name: 'Dino Sanctuary', position: [0.5, 1.2, -26.0], rotationY: 0 },
  { id: 'amphitheatre', name: 'Amphitheatre', position: [-3.0, 1.2, -43.0], rotationY: 0 },
];

interface ExploreState {
  // Player Avatar Transform
  playerPosition: [number, number, number];
  playerRotationY: number;
  isMoving: boolean;

  // Camera Orbit state (drag to look around in Explore Mode)
  orbitAngleX: number; // yaw
  orbitAngleY: number; // pitch
  cameraDistance: number;

  // Discoveries
  discoveredSeals: string[];
  activeSeal: MemorySeal | null;
  nearSealId: string | null;

  // Keyboard input state
  keys: {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
  };

  // Actions
  setPlayerPosition: (pos: [number, number, number]) => void;
  setPlayerRotationY: (rot: number) => void;
  setIsMoving: (isMoving: boolean) => void;
  setOrbitAngles: (x: number, y: number) => void;
  setCameraDistance: (dist: number) => void;
  setKey: (key: 'forward' | 'backward' | 'left' | 'right', pressed: boolean) => void;
  setNearSealId: (id: string | null) => void;
  discoverSeal: (id: string) => void;
  openSeal: (seal: MemorySeal) => void;
  closeSeal: () => void;
  teleportToWaypoint: (id: string) => void;
}

export const useExploreStore = create<ExploreState>((set, get) => ({
  playerPosition: [0, 1.2, 5.0],
  playerRotationY: 0,
  isMoving: false,

  orbitAngleX: 0,
  orbitAngleY: 0.35, // slightly looking down
  cameraDistance: 6.5,

  discoveredSeals: [],
  activeSeal: null,
  nearSealId: null,

  keys: {
    forward: false,
    backward: false,
    left: false,
    right: false,
  },

  setPlayerPosition: (playerPosition) => set({ playerPosition }),
  setPlayerRotationY: (playerRotationY) => set({ playerRotationY }),
  setIsMoving: (isMoving) => set({ isMoving }),
  setOrbitAngles: (orbitAngleX, orbitAngleY) => set({ orbitAngleX, orbitAngleY }),
  setCameraDistance: (cameraDistance) => set({ cameraDistance }),

  setKey: (key, pressed) =>
    set((state) => ({
      keys: { ...state.keys, [key]: pressed },
    })),

  setNearSealId: (nearSealId) => set({ nearSealId }),

  discoverSeal: (id) =>
    set((state) => {
      if (state.discoveredSeals.includes(id)) return state;
      return { discoveredSeals: [...state.discoveredSeals, id] };
    }),

  openSeal: (seal) => {
    get().discoverSeal(seal.id);
    set({ activeSeal: seal });
  },

  closeSeal: () => set({ activeSeal: null }),

  teleportToWaypoint: (id) => {
    const wp = EXPLORE_WAYPOINTS.find((w) => w.id === id);
    if (wp) {
      set({
        playerPosition: [...wp.position],
        playerRotationY: wp.rotationY,
        orbitAngleX: 0,
        orbitAngleY: 0.35,
      });
    }
  },
}));
