'use client';

// =============================================================================
// MemoryGlyphs — 4 Archaeological Discovery Seals across the Island
// Only visible / active in Explore Mode.
// Unlocks behind-the-scenes engineering philosophy, world lore, and acoustic history.
// =============================================================================

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MEMORY_SEALS, type MemorySeal, useExploreStore } from '@/stores/useExploreStore';
import { useExperienceStore } from '@/stores/useExperienceStore';

export function MemoryGlyphs() {
  const mode = useExperienceStore((s) => s.mode);

  if (mode !== 'explore') return null;

  return (
    <group>
      {MEMORY_SEALS.map((seal) => (
        <SingleGlyph key={seal.id} seal={seal} />
      ))}
    </group>
  );
}

function SingleGlyph({ seal }: { seal: MemorySeal }) {
  const relicRef = useRef<THREE.Mesh>(null);
  const openSeal = useExploreStore((s) => s.openSeal);
  const discoveredSeals = useExploreStore((s) => s.discoveredSeals);
  const nearSealId = useExploreStore((s) => s.nearSealId);

  const isDiscovered = discoveredSeals.includes(seal.id);
  const isNear = nearSealId === seal.id;

  useFrame(({ clock }) => {
    if (!relicRef.current) return;
    const t = clock.elapsedTime;
    relicRef.current.position.y = 1.35 + Math.sin(t * 2.0 + seal.position[0]) * 0.08;
    relicRef.current.rotation.y = t * 0.6;
    relicRef.current.rotation.z = Math.sin(t * 1.2) * 0.15;
  });

  return (
    <group
      position={seal.position}
      onClick={(e) => {
        e.stopPropagation();
        openSeal(seal);
      }}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      {/* Stone Pedestal Base */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.45, 0.8, 8]} />
        <meshStandardMaterial color="#2B2724" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Floating Sacred Relic Seal */}
      <mesh ref={relicRef} position={[0, 1.35, 0]} castShadow>
        <octahedronGeometry args={[0.26]} />
        <meshStandardMaterial
          color={seal.color}
          emissive={seal.color}
          emissiveIntensity={isNear ? 2.2 : isDiscovered ? 1.4 : 0.8}
          roughness={0.15}
          metalness={0.4}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Ground Glyph Ring */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.75, 24]} />
        <meshStandardMaterial
          color={seal.color}
          emissive={seal.color}
          emissiveIntensity={isNear ? 1.2 : 0.4}
          transparent
          opacity={isNear ? 0.9 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ambient Discovery Glow */}
      <pointLight
        position={[0, 1.35, 0]}
        color={seal.color}
        intensity={isNear ? 2.4 : 1.0}
        distance={6}
        decay={2}
      />
    </group>
  );
}
