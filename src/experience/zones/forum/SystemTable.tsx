'use client';

// =============================================================================
// System Table — Forum hero landmark
// =============================================================================
//
// A large stone table at the forum center with floating holographic
// architecture layers above it. The layers represent:
//   - Frontend (top, gold)
//   - API (middle, blue)
//   - Backend (bottom, teal)
//
// Interaction: clicking reveals the layers separating and pulsing.
// This is the "I build systems" proof piece.

import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FORUM_PALETTE } from './forumConfig';
import { InteractiveObject } from '@/experience/interaction/InteractiveObject';

export function SystemTable() {
  return (
    <group position={[0, 0.5, -9]}>
      {/* Stone table base */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.15, 2.5]} />
        <meshStandardMaterial color="#2A2624" roughness={0.5} />
      </mesh>

      {/* Table legs — 4 sturdy stone pillars */}
      {[[-1.7, 0, -1], [1.7, 0, -1], [-1.7, 0, 1], [1.7, 0, 1]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.25, 0.6, 0.25]} />
          <meshStandardMaterial color="#3A3430" roughness={0.6} />
        </mesh>
      ))}

      {/* Architecture layers floating above the table */}
      <InteractiveObject
        config={{
          id: 'forum-system-table',
          zone: 'forum',
          overlayId: 'service',
          overlayData: { service: 'web-development' },
        }}
      >
        <ArchitectureLayers />
      </InteractiveObject>

      {/* Table-top circuit inlays */}
      <CircuitInlays />
    </group>
  );
}

// ─── Floating architecture layers ───────────────────────────────────────

function ArchitectureLayers() {
  const groupRef = useRef<THREE.Group>(null);
  const [expanded, setExpanded] = useState(false);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;

    // Gentle float
    groupRef.current.position.y = 1.2 + Math.sin(t * 0.8) * 0.05;

    // Layers expand when clicked (via overlay)
    const targetSpacing = expanded ? 0.6 : 0.2;
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const targetY = (i - 1) * targetSpacing;
        child.position.y += (targetY - child.position.y) * 0.05;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 1.2, 0]}>
      {/* Frontend layer — gold, top */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.5, 0.06, 1.5]} />
        <meshStandardMaterial
          color={FORUM_PALETTE.nodeActive}
          emissive={FORUM_PALETTE.nodeActive}
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* API layer — blue, middle */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.06, 1.2]} />
        <meshStandardMaterial
          color={FORUM_PALETTE.circuitPrimary}
          emissive={FORUM_PALETTE.circuitPrimary}
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Backend layer — teal, bottom */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[2.8, 0.06, 1.8]} />
        <meshStandardMaterial
          color={FORUM_PALETTE.nodeGlow}
          emissive={FORUM_PALETTE.nodeGlow}
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// ─── Circuit inlays on table surface ────────────────────────────────────

function CircuitInlays() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.5 + Math.sin(t * 0.6 + i * 1.2) * 0.3;
      }
    });
  });

  const lines = [
    // Horizontal lines across table
    { pos: [0, 0.385, -0.5] as const, size: [3.2, 0.008, 0.02] as const },
    { pos: [0, 0.385, 0] as const, size: [3.5, 0.008, 0.02] as const },
    { pos: [0, 0.385, 0.5] as const, size: [3.0, 0.008, 0.02] as const },
    // Vertical lines
    { pos: [-1, 0.385, 0] as const, size: [0.02, 0.008, 1.8] as const },
    { pos: [1, 0.385, 0] as const, size: [0.02, 0.008, 1.8] as const },
  ];

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <mesh key={i} position={[line.pos[0], line.pos[1], line.pos[2]]}>
          <boxGeometry args={[line.size[0], line.size[1], line.size[2]]} />
          <meshStandardMaterial
            color={FORUM_PALETTE.circuitPrimary}
            emissive={FORUM_PALETTE.circuitPrimary}
            emissiveIntensity={0.5}
            roughness={0.05}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}
