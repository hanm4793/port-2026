'use client';

// =============================================================================
// Amphitheatre of Sound Zone — assembly component
// Open-air Greek-inspired coastal amphitheatre featuring circular acoustic orchestra,
// tiered semicircular theatron, sound-reactive concentric rings, 3 stem controllers,
// curved Echo Wall with sails, and theatrical key lighting.
// =============================================================================

import { useMemo } from 'react';
import * as THREE from 'three';
import { AMPHITHEATRE_PALETTE } from './amphitheatreConfig';
import { AcousticStage } from './AcousticStage';
import { TieredSeating } from './TieredSeating';
import { EchoWall } from './EchoWall';
import { StageLighting } from './StageLighting';

export function AmphitheatreZone() {
  return (
    <group>
      {/* Hillside Base Ground Terrain */}
      <AmphitheatreTerrain />

      {/* Circular Performance Stage (Orchestra) */}
      <AcousticStage />

      {/* Semicircular Greek Tiered Seating (Theatron) */}
      <TieredSeating />

      {/* Back Wall with Wave Reliefs and Suspended Acoustic Sails */}
      <EchoWall />

      {/* Coastal Ridge Flanking Rocks */}
      <FlankingRidgeRocks />

      {/* Theatrical Stage Lighting Rig */}
      <StageLighting />
    </group>
  );
}

// ─── Hillside Foundation Terrain ─────────────────────────────────────────────

function AmphitheatreTerrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(32, 28, 24, 20);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i); // plane Y -> world Z

      // Hillside slope: rises towards negative Z (inland ridge)
      const hillSlope = Math.max(0, -y * 0.12);

      // Coastal falloff to the left
      const coastalDrop = x < -6 ? Math.pow((-x - 6) / 8.0, 2) * -0.6 : 0;

      // Natural stone terrace undulation
      const noise = Math.sin(x * 0.3) * Math.cos(y * 0.35) * 0.08;

      pos.setZ(i, hillSlope + coastalDrop + noise);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[-3, 0.15, -48]}
      receiveShadow
    >
      <meshStandardMaterial
        color={AMPHITHEATRE_PALETTE.darkBasalt}
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  );
}

// ─── Flanking Ridge Rocks ────────────────────────────────────────────────────

function FlankingRidgeRocks() {
  const rocks = useMemo(() => {
    return [
      { x: -14, z: -43, s: 1.8, ry: 0.4 },
      { x: -15, z: -51, s: 2.2, ry: 1.1 },
      { x: -12, z: -57, s: 1.6, ry: -0.6 },
      { x: 8, z: -44, s: 1.5, ry: 0.8 },
      { x: 9, z: -52, s: 1.9, ry: -0.3 },
      { x: 7, z: -58, s: 1.7, ry: 1.4 },
    ];
  }, []);

  return (
    <group>
      {rocks.map((r, i) => (
        <mesh
          key={i}
          position={[r.x, r.s * 0.5, r.z]}
          rotation={[0.1, r.ry, 0.08]}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[r.s, 0]} />
          <meshStandardMaterial
            color="#2E2A26"
            roughness={0.88}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}
