'use client';

// =============================================================================
// Echo Wall & Acoustic Reflector Sails — Amphitheatre of Sound
// A curved stone Skene wall with carved wave reliefs and suspended
// linen acoustic reflector sails catching theatrical light.
// =============================================================================

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AMPHITHEATRE_PALETTE } from './amphitheatreConfig';

export function EchoWall() {
  const sailsRef = useRef<THREE.Group>(null);

  // Subtle wind flutter on suspended acoustic reflector sails
  useFrame(({ clock }) => {
    if (!sailsRef.current) return;
    const t = clock.elapsedTime;
    sailsRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        child.rotation.x = -0.35 + Math.sin(t * 1.4 + i * 1.1) * 0.03;
        child.rotation.z = Math.cos(t * 1.0 + i * 0.9) * 0.02;
      }
    });
  });

  return (
    <group position={[-3, 0, -54]}>
      {/* ── Curved Basalt Acoustic Back Wall (Skene) ─────────────────────── */}
      <mesh position={[0, 4.2, -3]} castShadow receiveShadow>
        <boxGeometry args={[18, 5.5, 0.6]} />
        <meshStandardMaterial
          color={AMPHITHEATRE_PALETTE.darkBasalt}
          roughness={0.75}
          metalness={0.1}
        />
      </mesh>

      {/* Decorative Waveform Relief Panels on the Wall */}
      <WaveformReliefPanels />

      {/* ── 3 Suspended Architectural Acoustic Sails (Fabric Canopies) ──── */}
      <group ref={sailsRef} position={[0, 6.2, 0]}>
        <AcousticSail position={[-4.5, 0, 0]} width={3.6} height={2.2} />
        <AcousticSail position={[0, 0.4, 0.8]} width={4.2} height={2.5} />
        <AcousticSail position={[4.5, 0, 0]} width={3.6} height={2.2} />
      </group>

      {/* Masts supporting the acoustic sails */}
      <SailMasts />
    </group>
  );
}

// ─── Waveform Relief Panels ──────────────────────────────────────────────────

function WaveformReliefPanels() {
  const waves = useMemo(() => {
    return [
      { y: 3.2, h: 0.12, w: 15, emissive: '#C9A84C' },
      { y: 4.0, h: 0.16, w: 16.5, emissive: '#6BA3C7' },
      { y: 4.8, h: 0.12, w: 14, emissive: '#D4725C' },
    ];
  }, []);

  return (
    <group position={[0, 0, -2.68]}>
      {waves.map((w, i) => (
        <mesh key={i} position={[0, w.y, 0]}>
          <boxGeometry args={[w.w, w.h, 0.04]} />
          <meshStandardMaterial
            color={w.emissive}
            emissive={w.emissive}
            emissiveIntensity={0.35}
            roughness={0.2}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Acoustic Sail Component ─────────────────────────────────────────────────

function AcousticSail({
  position,
  width,
  height,
}: {
  position: [number, number, number];
  width: number;
  height: number;
}) {
  return (
    <mesh
      position={position}
      rotation={[-0.35, 0, 0]}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[width, height, 8, 6]} />
      <meshStandardMaterial
        color={AMPHITHEATRE_PALETTE.sailLinen}
        roughness={0.8}
        metalness={0.0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── Support Masts for Sails ─────────────────────────────────────────────────

function SailMasts() {
  const mastX = [-6.2, -2.2, 2.2, 6.2];
  return (
    <group>
      {mastX.map((x, i) => (
        <mesh key={i} position={[x, 5.0, -0.4]} rotation={[0.15, 0, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.1, 6.5, 8]} />
          <meshStandardMaterial
            color={AMPHITHEATRE_PALETTE.resonantBronze}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
