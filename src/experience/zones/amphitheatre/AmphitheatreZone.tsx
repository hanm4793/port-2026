'use client';

// =============================================================================
// Amphitheatre of Sound Zone — assembly component
// Open-air Greek-inspired coastal amphitheatre featuring circular acoustic orchestra,
// spacious tiered theatron, monumental bronze lyre, sound-reactive concentric rings,
// 3 stem controllers, curved Echo Wall with sails, and theatrical key lighting.
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
// Sits cleanly from z = -40 to z = -68, meeting Dino Sanctuary trail seamlessly

function AmphitheatreTerrain() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(38, 28, 24, 20);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i); // plane Y -> world Z

      // Gentle terrace rise towards the back wall (negative Z)
      const terraceRise = y < 0 ? Math.abs(y) * 0.04 : 0;

      // Coastal falloff to the left
      const coastalDrop = x < -10 ? Math.pow((-x - 10) / 8.0, 2) * -0.5 : 0;

      // Very subtle stone terrace texture
      const noise = Math.sin(x * 0.3) * Math.cos(y * 0.3) * 0.04;

      pos.setZ(i, terraceRise + coastalDrop + noise);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[-3, 0.1, -54]}
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
      { x: -16, z: -43, s: 2.2, ry: 0.4 },
      { x: -18, z: -53, s: 2.8, ry: 1.1 },
      { x: -15, z: -63, s: 2.4, ry: -0.6 },
      { x: 11, z: -44, s: 2.0, ry: 0.8 },
      { x: 13, z: -54, s: 2.6, ry: -0.3 },
      { x: 10, z: -64, s: 2.2, ry: 1.4 },
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
            color="#282420"
            roughness={0.9}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}
