'use client';

// =============================================================================
// Experience Loader — dynamic import wrapper (ssr: false)
// =============================================================================

import dynamic from 'next/dynamic';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

/**
 * Dynamically import the Experience component with SSR disabled.
 * Three.js must never run on the server.
 */
const Experience3D = dynamic(
  () => import('./Experience').then((mod) => ({ default: mod.Experience })),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);

export function ExperienceLoader() {
  return <Experience3D />;
}
