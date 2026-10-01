'use client';

// =============================================================================
// Echo Wall & Acoustic Reflector Sails — Amphitheatre of Sound
// Grand curved stone Skene back wall with carved wave reliefs and
// 3 monumental suspended architectural linen sails hovering above the top tier.
// =============================================================================

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AMPHITHEATRE_PALETTE } from './amphitheatreConfig';

export function EchoWall() {
  const sailsRef = useRef<THREE.Group>(null);

  // Gentle atmospheric breathing motion on suspended acoustic sails
  useFrame(({ clock }) => {
    if (!sailsRef.current) return;
    const t = clock.elapsedTime;
    sailsRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        child.rotation.x = -0.45 + Math.sin(t * 1.2 + i * 1.0) * 0.035;
        child.rotation.z = Math.cos(t * 0.9 + i * 0.8) * 0.02;
      }
    });
  });

  return (
    <group position={[-3, 0, -64]}>
      {/* ── Monumental Curved Basalt Acoustic Back Wall (Skene) ─────────── */}
      <mesh position={[0, 4.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[26, 8.5, 0.9]} />
        <meshStandardMaterial
          color={AMPHITHEATRE_PALETTE.darkBasalt}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Decorative Waveform Relief Panels on the Wall */}
      <WaveformReliefPanels />

      {/* ── 3 Monumental Suspended Acoustic Reflector Sails ────────────── */}
      <group ref={sailsRef} position={[0, 8.2, 2.5]}>
        <AcousticSail position={[-6.8, 0, 0]} width={5.8} height={3.2} />
        <AcousticSail position={[0, 0.6, 1.2]} width={7.2} height={3.8} />
        <AcousticSail position={[6.8, 0, 0]} width={5.8} height={3.2} />
      </group>

      {/* Structural Bronze Masts */}
      <SailMasts />
    </group>
  );
}

// ─── Waveform Relief Panels ──────────────────────────────────────────────────

function WaveformReliefPanels() {
  const waves = useMemo(() => {
    return [
      { y: 3.5, h: 0.16, w: 22, emissive: '#C9A84C' },
      { y: 4.8, h: 0.22, w: 24, emissive: '#6BA3C7' },
      { y: 6.0, h: 0.16, w: 20, emissive: '#D4725C' },
    ];
  }, []);

  return (
    <group position={[0, 0, 0.48]}>
      {waves.map((w, i) => (
        <mesh key={i} position={[0, w.y, 0]}>
          <boxGeometry args={[w.w, w.h, 0.06]} />
          <meshStandardMaterial
            color={w.emissive}
            emissive={w.emissive}
            emissiveIntensity={0.5}
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
      rotation={[-0.45, 0, 0]}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[width, height, 10, 8]} />
      <meshStandardMaterial
        color={AMPHITHEATRE_PALETTE.sailLinen}
        roughness={0.75}
        metalness={0.0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── Support Masts for Sails ─────────────────────────────────────────────────

function SailMasts() {
  const mastX = [-9.5, -3.2, 3.2, 9.5];
  return (
    <group>
      {mastX.map((x, i) => (
        <mesh key={i} position={[x, 6.5, 1.8]} rotation={[0.2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.14, 9.0, 8]} />
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
