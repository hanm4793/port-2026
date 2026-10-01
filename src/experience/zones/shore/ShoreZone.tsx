'use client';

// =============================================================================
// Shore of Arrival — compact, coherent layout (v3)
// =============================================================================
//
// FIX LOG:
// - Ground terrain is FLAT (y=0) — no height function that hides objects
// - Steps are raised clearly above ground
// - Path extends from gate all the way toward beacon
// - Rocks raised to sit ON TOP of ground
// - Grass raised to sit ON TOP of ground

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '@/lib/constants';
import { SHORE_PALETTE } from './shoreConfig';
import { GateOfNames } from './GateOfNames';
import { OceanPlane } from './OceanPlane';
import { CoastalGrass } from './CoastalGrass';

export function ShoreZone() {
  return (
    <group>
      <OceanPlane />
      <GroundTerrain />
      <MooringStones />
      <BuriedColumns />
      <StoneSteps />
      <GateOfNames />
      <PathInland />
      <ScatteredRocks />
      <CoastalGrass />
      <BeaconSilhouette />
      <ShoreLighting />
    </group>
  );
}

// ─── Ground terrain ─────────────────────────────────────────────────────
// Covers Shore area cleanly from waterline (z = 32) to Forum steps (z = -3.5)

function GroundTerrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(50, 36, 20, 20);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i); // plane Y → world Z

      // Subtle sand undulation
      const noise = Math.sin(x * 0.4 + y * 0.3) * 0.05
                  + Math.sin(x * 0.9) * Math.cos(y * 0.5) * 0.025;

      // Water edge drop (y > 10 → z > 24)
      const drop = y > 10 ? -(y - 10) * 0.05 : 0;

      pos.setZ(i, noise + drop);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 14]}
      receiveShadow
    >
      <meshStandardMaterial color={SHORE_PALETTE.sand} roughness={0.85} />
    </mesh>
  );
}

// ─── Mooring stones ─────────────────────────────────────────────────────

function MooringStones() {
  const stones = [
    { x: -4, z: 11, rot: 0.3, s: 1.0 },
    { x: 3, z: 12, rot: -0.5, s: 0.8 },
    { x: -1.5, z: 10, rot: 0.7, s: 0.65 },
    { x: 5.5, z: 11.5, rot: -0.2, s: 0.9 },
  ];

  return (
    <group>
      {stones.map(({ x, z, rot, s }, i) => (
        <mesh key={i} position={[x, s * 0.25, z]} rotation={[0, rot, 0.05]} castShadow>
          <boxGeometry args={[0.35 * s, 0.5 * s, 0.35 * s]} />
          <meshStandardMaterial color={COLORS.stoneShadow} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Buried columns ─────────────────────────────────────────────────────

function BuriedColumns() {
  const columns = [
    { x: -7, z: 8, tilt: 0.2, rotY: 0.4, h: 2.2 },
    { x: 6, z: 9, tilt: -0.25, rotY: -0.8, h: 1.6 },
    { x: -4, z: 10, tilt: 0.3, rotY: 1.2, h: 1.1 },
    { x: 9, z: 7, tilt: -0.15, rotY: 1.8, h: 1.9 },
  ];

  return (
    <group>
      {columns.map(({ x, z, tilt, rotY, h }, i) => (
        <mesh key={i} position={[x, h * 0.45, z]} rotation={[0, rotY, tilt]} castShadow>
          <cylinderGeometry args={[0.18, 0.22, h, 12]} />
          <meshStandardMaterial color={COLORS.travertine} roughness={0.45} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Stone steps ────────────────────────────────────────────────────────
// 7 steps rising clearly from beach (z=7) up to gate (z=1)

function StoneSteps() {
  return (
    <group>
      {Array.from({ length: 7 }, (_, i) => (
        <mesh
          key={i}
          position={[0, i * 0.15 + 0.08, 7 - i * 0.85]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[3.5 - i * 0.05, 0.15, 0.65]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? COLORS.travertine : SHORE_PALETTE.sandDark}
            roughness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Scattered rocks ────────────────────────────────────────────────────
// Raised Y so they sit on top of the flat ground

function ScatteredRocks() {
  const rocks = useMemo(() => [
    // Beach area rocks only (z > 0)
    { x: -9, z: 6, s: 0.7 }, { x: 10, z: 8, s: 0.55 }, { x: -11, z: 4, s: 0.9 },
    { x: 8, z: 5, s: 0.45 }, { x: -6, z: 12, s: 0.4 }, { x: 12, z: 10, s: 0.6 },
    { x: -13, z: 9, s: 0.8 }, { x: -7, z: 2, s: 0.55 }, { x: 7, z: 2, s: 0.5 },
    { x: -5, z: 14, s: 0.6 }, { x: 6, z: 13, s: 0.45 },
  ], []);

  return (
    <group>
      {rocks.map(({ x, z, s }, i) => (
        <mesh
          key={i}
          position={[x, s * 0.35, z]}
          rotation={[0.15, x * 0.3 + z * 0.2, 0.08]}
          castShadow
        >
          <dodecahedronGeometry args={[s * 0.45, 0]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? COLORS.stoneShadow : SHORE_PALETTE.sandDark}
            roughness={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Path inland ────────────────────────────────────────────────────────
// Connects Shore Gate (z = 0.5) cleanly to Forum entrance steps (z = -3.5)

function PathInland() {
  return (
    <group>
      {/* Path surface — from gate to forum entrance */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -1.5]} receiveShadow>
        <planeGeometry args={[2.8, 4.0]} />
        <meshStandardMaterial color={SHORE_PALETTE.sandDark} roughness={0.75} />
      </mesh>

      {/* Border stones along connection */}
      {[-1.5, 1.5].map((x) =>
        Array.from({ length: 3 }, (_, j) => (
          <mesh key={`b-${x}-${j}`} position={[x, 0.08, -0.2 - j * 1.4]} castShadow>
            <boxGeometry args={[0.2, 0.12, 0.6]} />
            <meshStandardMaterial color={COLORS.stoneShadow} roughness={0.85} />
          </mesh>
        )),
      )}
    </group>
  );
}

// ─── Beacon ─────────────────────────────────────────────────────────────

function BeaconSilhouette() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.intensity = 6 + Math.sin(clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <group position={[0, 14, -78]}>
      <mesh>
        <boxGeometry args={[1.0, 16, 1.0]} />
        <meshStandardMaterial color={COLORS.volcanicCharcoal} roughness={0.6} />
      </mesh>
      <pointLight
        ref={lightRef}
        position={[0, 9, 0]}
        color={COLORS.goldLeaf}
        intensity={6}
        distance={150}
        decay={2}
      />
      <mesh position={[0, 9, 0]}>
        <sphereGeometry args={[0.6, 8, 8]} />
        <meshStandardMaterial
          color={COLORS.goldLeaf}
          emissive={COLORS.goldLeaf}
          emissiveIntensity={3.2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

// ─── Lighting ───────────────────────────────────────────────────────────
// Shore-specific accent light only — main lighting handled by Lighting.tsx

function ShoreLighting() {
  return (
    <>
      {/* Warm bounce from the sand — subtle uplight on gate underside */}
      <pointLight
        position={[0, 0.3, 2]}
        intensity={0.4}
        color="#D4B890"
        distance={10}
        decay={2}
      />
    </>
  );
}
