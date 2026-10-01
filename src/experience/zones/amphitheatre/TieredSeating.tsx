'use client';

// =============================================================================
// Tiered Seating — classical Greek Theatron
// 5 spacious concentric stone bench tiers embracing the orchestra from behind,
// with generous ambulatory diazoma room (4.0m gap from stage perimeter).
// =============================================================================

import { useMemo } from 'react';
import * as THREE from 'three';
import { AMPHITHEATRE_PALETTE } from './amphitheatreConfig';

export function TieredSeating() {
  // 5 grand curved tiers ascending into the hillside slope
  const tiers = useMemo(() => {
    return [
      { radius: 8.4, y: 0.55, width: 1.2, height: 0.55 },
      { radius: 10.2, y: 1.15, width: 1.2, height: 0.6 },
      { radius: 12.1, y: 1.8, width: 1.25, height: 0.65 },
      { radius: 14.1, y: 2.5, width: 1.3, height: 0.7 },
      { radius: 16.2, y: 3.25, width: 1.35, height: 0.75 },
    ];
  }, []);

  return (
    <group position={[-3, 0, -46]}>
      {/* ── 5 Concentric Semicircular Stone Tiers ──────────────────────── */}
      {tiers.map((tier, idx) => (
        <group key={idx}>
          {/* Curved seating bench arc — curves naturally behind stage in -Z */}
          <mesh
            position={[0, tier.y, 0]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry
              args={[
                tier.radius + tier.width / 2,
                tier.radius - tier.width / 2,
                tier.height,
                48,
                1,
                false,
                Math.PI * 1.06,
                Math.PI * 0.88,
              ]}
            />
            <meshStandardMaterial
              color={idx % 2 === 0 ? AMPHITHEATRE_PALETTE.limestoneTier : AMPHITHEATRE_PALETTE.limestoneShadow}
              roughness={0.65}
              metalness={0.05}
            />
          </mesh>

          {/* Polished stone bench cap */}
          <mesh position={[0, tier.y + tier.height / 2 + 0.02, 0]}>
            <cylinderGeometry
              args={[
                tier.radius + tier.width / 2 + 0.06,
                tier.radius - tier.width / 2 - 0.06,
                0.06,
                48,
                1,
                false,
                Math.PI * 1.05,
                Math.PI * 0.9,
              ]}
            />
            <meshStandardMaterial
              color={AMPHITHEATRE_PALETTE.limestoneTier}
              roughness={0.5}
              metalness={0.05}
            />
          </mesh>
        </group>
      ))}

      {/* ── Radial Stairways (Klimakes) ────────────────────────────────── */}
      {[-0.45, 0.45].map((angle, sIdx) => (
        <RadialStairs key={sIdx} angle={angle} />
      ))}

      {/* ── Top-Tier Resonant Bronze Steles ────────────────────────────── */}
      <TopTierAcousticMonoliths />
    </group>
  );
}

// ─── Radial Stairways ────────────────────────────────────────────────────────

function RadialStairs({ angle }: { angle: number }) {
  const steps = 7;
  return (
    <group rotation={[0, angle, 0]}>
      {Array.from({ length: steps }, (_, i) => {
        const dist = 7.5 + i * 1.4;
        const y = 0.4 + i * 0.48;
        return (
          <mesh key={i} position={[0, y, -dist]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 0.16, 0.55]} />
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
        const radius = 17.6;
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
