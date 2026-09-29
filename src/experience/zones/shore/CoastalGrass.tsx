'use client';

// =============================================================================
// Coastal Grass — wind-animated grass blades
// =============================================================================

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Patches along beach edges and path borders — Y raised to sit ON ground
const GRASS_PATCHES: Array<{ center: [number, number, number]; count: number; spread: number }> = [
  // Beach edges
  { center: [-8, 0.25, 8], count: 14, spread: 2 },
  { center: [9, 0.2, 7], count: 12, spread: 2 },
  { center: [-11, 0.2, 5], count: 10, spread: 1.5 },
  { center: [11, 0.22, 6], count: 8, spread: 1.5 },
  // Path borders (inland)
  { center: [-2.5, 0.25, -5], count: 10, spread: 1.2 },
  { center: [2.5, 0.25, -6], count: 10, spread: 1.2 },
  { center: [-3, 0.2, -12], count: 12, spread: 1.5 },
  { center: [3, 0.2, -10], count: 12, spread: 1.5 },
  { center: [-2.5, 0.2, -18], count: 8, spread: 1 },
  { center: [2.5, 0.2, -20], count: 8, spread: 1 },
  // Near gate
  { center: [-4, 0.3, 2], count: 6, spread: 0.8 },
  { center: [4, 0.3, 2], count: 6, spread: 0.8 },
];

export function CoastalGrass() {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();

  const blades = useMemo(() => {
    const result: Array<{ pos: THREE.Vector3; rot: number; h: number; phase: number }> = [];
    for (const patch of GRASS_PATCHES) {
      for (let i = 0; i < patch.count; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = Math.random() * patch.spread;
        result.push({
          pos: new THREE.Vector3(
            patch.center[0] + Math.cos(a) * d,
            patch.center[1],
            patch.center[2] + Math.sin(a) * d,
          ),
          rot: Math.random() * Math.PI,
          h: 0.25 + Math.random() * 0.35,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }
    return result;
  }, []);

  useFrame(({ clock }) => {
    if (reducedMotion || !groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      if (i < blades.length) {
        child.rotation.z = Math.sin(t * 1.8 + blades[i].phase) * 0.18;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {blades.map((b, i) => (
        <mesh key={i} position={b.pos} rotation={[0, b.rot, 0]}>
          <boxGeometry args={[0.02, b.h, 0.005]} />
          <meshStandardMaterial
            color="#4A7A3E"
            roughness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
