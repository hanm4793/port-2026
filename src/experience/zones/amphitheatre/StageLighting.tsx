'use client';

// =============================================================================
// Stage Lighting — theatrical spotlight rig & footlights
// Creates dramatic performance atmosphere with high-contrast stage key light
// and warm acoustic footlights illuminating the orchestra rim.
// =============================================================================

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { AMPHITHEATRE_PALETTE } from './amphitheatreConfig';

export function StageLighting() {
  const spotRef = useRef<THREE.SpotLight>(null);
  const targetObj = useRef<THREE.Object3D>(new THREE.Object3D());

  useEffect(() => {
    targetObj.current.position.set(-3, 0.6, -46);
    if (spotRef.current) {
      spotRef.current.target = targetObj.current;
    }
  }, []);

  return (
    <group>
      {/* Target object for the spotlight */}
      <primitive object={targetObj.current} />

      {/* Main Theatrical Overhead Key Spotlight */}
      <spotLight
        ref={spotRef}
        position={[-1.5, 12, -38]}
        intensity={2.8}
        color={AMPHITHEATRE_PALETTE.theatreSpot}
        angle={0.52}
        penumbra={0.75}
        distance={28}
        decay={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Stage Footlights — warm glowing uplights along the perimeter */}
      <pointLight
        position={[-6, 1.0, -45]}
        color={AMPHITHEATRE_PALETTE.theatreSpot}
        intensity={0.6}
        distance={6}
        decay={2}
      />
      <pointLight
        position={[0, 1.0, -45]}
        color={AMPHITHEATRE_PALETTE.theatreSpot}
        intensity={0.6}
        distance={6}
        decay={2}
      />

      {/* Twilight Horizon Rim Fill */}
      <directionalLight
        position={[-18, 8, -50]}
        intensity={0.4}
        color={AMPHITHEATRE_PALETTE.oceanDusk}
      />
    </group>
  );
}
