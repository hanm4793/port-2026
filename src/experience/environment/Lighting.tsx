'use client';

// =============================================================================
// Lighting — dramatic golden hour with clear shadow direction
// =============================================================================
//
// QA Fix: Single dominant key light from the side (not front) to reveal
// gate form through shadow. Fill is cooler and dimmer.
// No redundant same-direction lights.

import { useQualityStore } from '@/stores/useQualityStore';

export function Lighting() {
  const shadows = useQualityStore((s) => s.shadows);

  return (
    <>
      {/* Key light: golden hour sun — from the LEFT side and slightly behind
          This creates dramatic shadows on the gate's right pillar,
          reveals step edges, and lights the ocean surface */}
      <directionalLight
        position={[-25, 15, 20]}
        intensity={1.8}
        color="#FFD0A0"
        castShadow={shadows}
        shadow-mapSize-width={shadows ? 2048 : 0}
        shadow-mapSize-height={shadows ? 2048 : 0}
        shadow-camera-far={80}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-bias={-0.0005}
      />

      {/* Fill light: cool blue from opposite side — much dimmer than key */}
      <directionalLight
        position={[20, 8, -10]}
        intensity={0.25}
        color="#8AB0D0"
      />

      {/* Hemisphere: warm ground bounce, cool sky */}
      <hemisphereLight
        intensity={0.2}
        color="#9AB8D0"
        groundColor="#D4B890"
      />
    </>
  );
}
