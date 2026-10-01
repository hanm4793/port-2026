'use client';

// =============================================================================
// Tiered Seating — semicircular Greek Theatron
// 5 concentric curved stone bench tiers climbing the natural hillside,
// with radial access stairways (klimakes) and diazoma walkway.
// =============================================================================

import { useMemo } from 'react';
import * as THREE from 'three';
import { AMPHITHEATRE_PALETTE } from './amphitheatreConfig';

export function TieredSeating() {
  // 5 curved tiers ascending backwards (negative Z, positive Y)
  const tiers = useMemo(() => {
    return [
      { radius: 5.6, y: 0.45, zOffset: -1.0, width: 0.9, height: 0.45 },
      { radius: 6.8, y: 0.95, zOffset: -2.0, width: 0.9, height: 0.5 },
      { radius: 8.1, y: 1.5, zOffset: -3.2, width: 0.95, height: 0.55 },
      { radius: 9.5, y: 2.1, zOffset: -4.5, width: 1.0, height: 0.6 },
      { radius: 11.0, y: 2.75, zOffset: -6.0, width: 1.1, height: 0.65 },
    ];
  }, []);

  return (
    <group position={[-3, 0, -46]}>
      {/* ── 5 Concentric Semicircular Stone Tiers ──────────────────────── */}
      {tiers.map((tier, idx) => (
        <group key={idx}>
          {/* Curved seating bench arc (sliced cylinder sector) */}
          <mesh
            position={[0, tier.y, tier.zOffset * 0.5]}
            rotation={[0, -Math.PI / 2, 0]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry
              args={[
                tier.radius + tier.width / 2,
                tier.radius - tier.width / 2,
                tier.height,
                32,
                1,
                false,
                -Math.PI * 0.42,
                Math.PI * 0.84,
              ]}
            />
            <meshStandardMaterial
              color={idx % 2 === 0 ? AMPHITHEATRE_PALETTE.limestoneTier : AMPHITHEATRE_PALETTE.limestoneShadow}
              roughness={0.65}
              metalness={0.05}
            />
          </mesh>

          {/* Recessed Tier Lip/Cap */}
          <mesh
            position={[0, tier.y + tier.height / 2 + 0.02, tier.zOffset * 0.5]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            <cylinderGeometry
              args={[
                tier.radius + tier.width / 2 + 0.04,
                tier.radius - tier.width / 2 - 0.04,
                0.05,
                32,
                1,
                false,
                -Math.PI * 0.43,
                Math.PI * 0.86,
              ]}
            />
            <meshStandardMaterial
              color={AMPHITHEATRE_PALETTE.limestoneTier}
              roughness={0.55}
              metalness={0.05}
            />
          </mesh>
        </group>
      ))}

      {/* ── Radial Stairways (Klimakes) Cutting Through the Tiers ──────── */}
      {[-0.6, 0.6].map((angle, sIdx) => (
        <RadialStairs key={sIdx} angle={angle} />
      ))}

      {/* ── Acoustic Stele Monoliths Rimming the Top Tier ─────────────── */}
      <TopTierAcousticMonoliths />
    </group>
  );
}

// ─── Radial Stairways ────────────────────────────────────────────────────────

function RadialStairs({ angle }: { angle: number }) {
  const steps = 6;
  return (
    <group rotation={[0, angle, 0]}>
      {Array.from({ length: steps }, (_, i) => {
        const dist = 5.2 + i * 1.1;
        const y = 0.35 + i * 0.45;
        return (
          <mesh key={i} position={[0, y, -dist]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 0.15, 0.45]} />
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

// ─── Top Tier Monoliths ──────────────────────────────────────────────────────

function TopTierAcousticMonoliths() {
  const monolithCount = 7;
  return (
    <group>
      {Array.from({ length: monolithCount }, (_, i) => {
        const norm = (i / (monolithCount - 1)) - 0.5; // -0.5 to 0.5
        const angle = norm * Math.PI * 0.72;
        const radius = 12.0;
        const x = Math.sin(angle) * radius;
        const z = -Math.cos(angle) * radius * 0.7 - 2.5;

        return (
          <group key={i} position={[x, 3.4, z]} rotation={[0, -angle, 0]}>
            {/* Stone Pillar */}
            <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.45, 2.0, 0.35]} />
              <meshStandardMaterial
                color={AMPHITHEATRE_PALETTE.darkBasalt}
                roughness={0.7}
                metalness={0.1}
              />
            </mesh>

            {/* Inset Resonant Bronze Fin */}
            <mesh position={[0, 1.1, 0.19]} castShadow>
              <boxGeometry args={[0.24, 1.5, 0.04]} />
              <meshStandardMaterial
                color={AMPHITHEATRE_PALETTE.resonantBronze}
                roughness={0.25}
                metalness={0.8}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
