'use client';

// =============================================================================
// Sky — gradient background with horizon for coastal atmosphere
// =============================================================================
//
// QA Fix: Replace flat solid color with a vertical gradient sky.
// Creates: warm horizon (golden) → cool zenith (blue-grey)
// Also provides the Environment for PBR reflections.

import { useMemo } from 'react';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Sky with vertical gradient — golden hour coastal atmosphere.
 * Uses a large sphere with a shader material for the gradient.
 */
export function Sky() {
  const gradientMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Vertical gradient: bottom (horizon) to top (zenith)
    const gradient = ctx.createLinearGradient(0, 256, 0, 0);
    gradient.addColorStop(0.0, '#E8A060');   // warm horizon glow
    gradient.addColorStop(0.15, '#D4A878');  // golden hour band
    gradient.addColorStop(0.3, '#B8C0C8');   // transition
    gradient.addColorStop(0.5, '#8AAEC8');   // mid sky
    gradient.addColorStop(0.8, '#5A8AB0');   // upper sky
    gradient.addColorStop(1.0, '#3A6A90');   // zenith

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2, 256);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <>
      {/* Ambient fill — slightly warm */}
      <ambientLight intensity={0.35} color="#C8B8A0" />

      {/* Environment for PBR reflections */}
      <Environment preset="sunset" background={false} />

      {/* Sky sphere with gradient */}
      <mesh scale={[-200, 200, 200]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial map={gradientMap} side={THREE.BackSide} depthWrite={false} />
      </mesh>
    </>
  );
}
