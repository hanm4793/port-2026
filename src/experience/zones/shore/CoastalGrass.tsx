'use client';

// =============================================================================
// Coastal Grass — High-performance InstancedMesh implementation
// Reduces 106 separate <mesh> draw calls down to 1 SINGLE draw call!
// Preserves exact deterministic blade placement, wind sway, and quality gates.
// =============================================================================

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useQualityStore } from '@/stores/useQualityStore';
import { DETERMINISTIC_GRASS_BLADES } from './coastalGrassData';

const dummy = new THREE.Object3D();

export function CoastalGrass() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const reducedMotion = useReducedMotion();
  const tier = useQualityStore((s) => s.tier);

  // Quality-tier density control:
  // high: 100% (106 blades), medium: 60% (64 blades), low: 0 (disabled)
  const activeBlades = useMemo(() => {
    if (tier === 'low') return [];
    if (tier === 'medium') return DETERMINISTIC_GRASS_BLADES.slice(0, 64);
    return DETERMINISTIC_GRASS_BLADES;
  }, [tier]);

  const count = activeBlades.length;

  // Single shared box geometry for grass blade
  const geometry = useMemo(() => {
    // Base box: 2cm wide, 1m tall (normalized for scaling), 0.5cm thick
    const geo = new THREE.BoxGeometry(0.02, 1.0, 0.005);
    // Shift origin to bottom of blade so rotation pivots from ground
    geo.translate(0, 0.5, 0);
    return geo;
  }, []);

  // Shared PBR grass material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#4A7A3E',
      roughness: 0.7,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
  }, []);

  // Initial matrix placement
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || count === 0) return;

    for (let i = 0; i < count; i++) {
      const b = activeBlades[i];
      dummy.position.set(b.x, b.y, b.z);
      dummy.rotation.set(0, b.rotation, 0);
      dummy.scale.set(1.0, b.height, 1.0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [activeBlades, count]);

  // Wind sway animation in useFrame
  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh || count === 0 || reducedMotion) return;

    const t = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const b = activeBlades[i];
      const sway = Math.sin(t * 1.8 + b.phase) * 0.18;

      dummy.position.set(b.x, b.y, b.z);
      dummy.rotation.set(0, b.rotation, sway);
      dummy.scale.set(1.0, b.height, 1.0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      castShadow={tier === 'high'}
      receiveShadow
    />
  );
}
