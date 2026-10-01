'use client';

// =============================================================================
// Tiered Seating — classical Greek Theatron
// 5 spacious concentric stone bench tiers embracing the orchestra from behind.
// Uses true hollow 2D arc shapes (ExtrudeGeometry) so the center stage (r < 8m)
// is 100% EMPTY and never occluded by solid wedges!
// =============================================================================

import { useMemo } from 'react';
import * as THREE from 'three';
import { AMPHITHEATRE_PALETTE } from './amphitheatreConfig';

export function TieredSeating() {
  // 5 grand curved tiers ascending into the hillside slope behind the stage
  const tiers = useMemo(() => {
    return [
      { innerR: 8.2, outerR: 9.6, y: 0.35, height: 0.55 },
      { innerR: 10.0, outerR: 11.5, y: 0.9, height: 0.6 },
      { innerR: 11.9, outerR: 13.5, y: 1.5, height: 0.65 },
      { innerR: 13.9, outerR: 15.6, y: 2.15, height: 0.7 },
      { innerR: 16.0, outerR: 17.8, y: 2.85, height: 0.75 },
    ];
  }, []);

  return (
    <group position={[-3, 0, -46]}>
      {/* ── 5 Concentric Semicircular Hollow Stone Tiers ────────────────── */}
      {tiers.map((tier, idx) => (
        <TierArcMesh
          key={idx}
          tier={tier}
          color={idx % 2 === 0 ? AMPHITHEATRE_PALETTE.limestoneTier : AMPHITHEATRE_PALETTE.limestoneShadow}
        />
      ))}

      {/* ── Radial Stairways (Klimakes) Outside the Stage Perimeter ───── */}
      {[-0.45, 0.45].map((angle, sIdx) => (
        <RadialStairs key={sIdx} angle={angle} />
      ))}

      {/* ── Top-Tier Resonant Bronze Steles ────────────────────────────── */}
      <TopTierAcousticMonoliths />
    </group>
  );
}

// ─── True Hollow Arc Bench Component ─────────────────────────────────────────

function TierArcMesh({
  tier,
  color,
}: {
  tier: { innerR: number; outerR: number; y: number; height: number };
  color: string;
}) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Angles in 2D XY plane: positive Y becomes negative Z in world space
    const startA = Math.PI * 0.08;
    const endA = Math.PI * 0.92;

    // Outer arc
    shape.absarc(0, 0, tier.outerR, startA, endA, false);
    // Line to inner arc
    const endX = Math.cos(endA) * tier.innerR;
    const endY = Math.sin(endA) * tier.innerR;
    shape.lineTo(endX, endY);
    // Inner arc backwards
    shape.absarc(0, 0, tier.innerR, endA, startA, true);
    shape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: tier.height,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
      curveSegments: 36,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [tier]);

  return (
    <mesh
      geometry={geometry}
      position={[0, tier.y, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        roughness={0.65}
        metalness={0.05}
      />
    </mesh>
  );
}

// ─── Radial Stairways (Only from r = 7.8m outwards) ─────────────────────────

function RadialStairs({ angle }: { angle: number }) {
  const steps = 6;
  return (
    <group rotation={[0, angle, 0]}>
      {Array.from({ length: steps }, (_, i) => {
        const dist = 8.0 + i * 1.6;
        const y = 0.35 + i * 0.48;
        return (
          <mesh key={i} position={[0, y, -dist]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 0.16, 0.6]} />
            <meshStandardMaterial
              color={AMPHITHEATRE_PALETTE.darkBasalt}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── Top-Tier Monoliths ──────────────────────────────────────────────────────

function TopTierAcousticMonoliths() {
  const monolithCount = 7;
  return (
    <group>
      {Array.from({ length: monolithCount }, (_, i) => {
        const norm = (i / (monolithCount - 1)) - 0.5; // -0.5 to 0.5
        const angle = Math.PI * 1.5 + norm * Math.PI * 0.8;
        const radius = 18.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={i} position={[x, 3.8, z]} rotation={[0, -angle - Math.PI / 2, 0]}>
            {/* Stone Pillar */}
            <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.55, 2.4, 0.4]} />
              <meshStandardMaterial
                color={AMPHITHEATRE_PALETTE.darkBasalt}
                roughness={0.7}
                metalness={0.1}
              />
            </mesh>

            {/* Bronze Resonator Inset */}
            <mesh position={[0, 1.3, 0.22]} castShadow>
              <boxGeometry args={[0.3, 1.8, 0.04]} />
              <meshStandardMaterial
                color={AMPHITHEATRE_PALETTE.resonantBronze}
                roughness={0.25}
                metalness={0.82}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
