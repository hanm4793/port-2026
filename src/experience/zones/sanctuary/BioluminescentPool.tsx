'use client';

// =============================================================================
// Bioluminescent Pool & Primeval Spores — Dino Sanctuary
// A sacred mineral basin filled with glowing teal water and primeval spore clusters.
// =============================================================================

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SANCTUARY_PALETTE } from './sanctuaryConfig';

export function BioluminescentPool() {
  const waterRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.PlaneGeometry>(null);
  const origRef = useRef<Float32Array | null>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8, 8, 24, 24);
    geoRef.current = geo;
    origRef.current = Float32Array.from(geo.attributes.position.array);
    return geo;
  }, []);

  // Ripple pulsation on pool water
  useFrame(({ clock }) => {
    const geo = geoRef.current;
    const orig = origRef.current;
    if (!geo || !orig) return;

    const pos = geo.attributes.position;
    const t = clock.elapsedTime;

    for (let i = 0; i < pos.count; i++) {
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];
      const dist = Math.sqrt(ox * ox + oy * oy);

      // Radial ripples from center
      const ripple = Math.sin(dist * 2.2 - t * 2.0) * 0.08 * Math.max(0, 1 - dist / 4.0);
      pos.setZ(i, ripple);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <group position={[-2.5, 0.08, -29]}>
      {/* Stone Basin Rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[3.8, 5.2, 16]} />
        <meshStandardMaterial
          color={SANCTUARY_PALETTE.volcanicDark}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Water Surface with Bioluminescent Glow */}
      <mesh
        ref={waterRef}
        geometry={geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.05, 0]}
      >
        <meshStandardMaterial
          color={SANCTUARY_PALETTE.bioluminescent}
          emissive={SANCTUARY_PALETTE.bioluminescent}
          emissiveIntensity={0.65}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Submerged Core Light */}
      <pointLight
        position={[0, 0.3, 0]}
        color={SANCTUARY_PALETTE.bioluminescent}
        intensity={2.8}
        distance={14}
        decay={2}
      />

      {/* Glowing Spore Crystals rimming the pool */}
      <SporeClusters />
    </group>
  );
}

function SporeClusters() {
  const sporePositions = useMemo(() => {
    return [
      { x: -3.2, z: -1.2, scale: 0.28 },
      { x: 3.4, z: 1.0, scale: 0.32 },
      { x: -2.1, z: 2.8, scale: 0.22 },
      { x: 2.2, z: -2.6, scale: 0.35 },
      { x: -0.8, z: -3.5, scale: 0.2 },
    ];
  }, []);

  return (
    <group>
      {sporePositions.map((spore, idx) => (
        <group key={idx} position={[spore.x, 0.2, spore.z]}>
          <mesh castShadow>
            <octahedronGeometry args={[spore.scale]} />
            <meshStandardMaterial
              color={SANCTUARY_PALETTE.amberResin}
              emissive={SANCTUARY_PALETTE.amberResin}
              emissiveIntensity={0.9}
              roughness={0.2}
            />
          </mesh>
          <pointLight
            color={SANCTUARY_PALETTE.amberResin}
            intensity={0.5}
            distance={4}
            decay={2}
          />
        </group>
      ))}
    </group>
  );
}
