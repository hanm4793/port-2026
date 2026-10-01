'use client';

// =============================================================================
// Dino Sanctuary Zone — assembly component
// Valley environment featuring Fossil Arch, Pipeline Altar, Bioluminescent Pool,
// canyon cliff monoliths, and primeval flora.
// =============================================================================

import { useMemo } from 'react';
import * as THREE from 'three';
import { SANCTUARY_PALETTE } from './sanctuaryConfig';
import { FossilArch } from './FossilArch';
import { PipelineAltar } from './PipelineAltar';
import { BioluminescentPool } from './BioluminescentPool';

export function DinoSanctuaryZone() {
  return (
    <group>
      {/* Valley Basin Floor */}
      <SanctuaryFloor />

      {/* Flanking Canyon Cliffs */}
      <CanyonCliffs />

      {/* Fossil Arch Gateway */}
      <FossilArch />

      {/* Bioluminescent Mineral Pool */}
      <BioluminescentPool />

      {/* Interactive Filmmaking Pipeline Altar */}
      <PipelineAltar />

      {/* Primeval Flora & Monoliths */}
      <SanctuaryMonoliths />

      {/* Atmospheric Lighting */}
      <SanctuaryLighting />
    </group>
  );
}

// ─── Valley Floor ───────────────────────────────────────────────────────────

function SanctuaryFloor() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(36, 24, 24, 20);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Valley depression: center is lower, edges slope upward into cliffs
      const distFromCenter = Math.abs(x) / 16.0;
      const valleyCup = Math.pow(distFromCenter, 2) * 1.5;

      // Natural undulation
      const noise = Math.sin(x * 0.4) * Math.cos(y * 0.3) * 0.08;

      pos.setZ(i, valleyCup + noise);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.1, -28]}
      receiveShadow
    >
      <meshStandardMaterial
        color={SANCTUARY_PALETTE.volcanicDark}
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  );
}

// ─── Canyon Cliffs & Open Mountain Gorge ────────────────────────────────────

function CanyonCliffs() {
  const cliffSegments = useMemo(() => {
    return [
      // Left canyon wall
      { x: -12.5, z: -22, h: 7, rx: 0.1, rz: 0.1 },
      { x: -14.0, z: -28, h: 9, rx: -0.1, rz: 0.15 },
      { x: -13.0, z: -34, h: 8, rx: 0.05, rz: 0.12 },
      // Right canyon wall
      { x: 12.5, z: -22, h: 7.5, rx: -0.1, rz: -0.1 },
      { x: 13.8, z: -28, h: 9.5, rx: 0.1, rz: -0.14 },
      { x: 13.0, z: -35, h: 8, rx: -0.05, rz: -0.12 },
      // Natural Mountain Gorge Pillars (opening an unobstructed 12m wide portal towards Amphitheatre)
      { x: -9.5, z: -38, h: 9.0, rx: 0.15, rz: 0.08 },
      { x: 8.5, z: -38, h: 9.0, rx: 0.12, rz: -0.08 },
      { x: -11.0, z: -43, h: 8.0, rx: 0.05, rz: 0.1 },
      { x: 10.0, z: -43, h: 8.0, rx: 0.05, rz: -0.1 },
    ];
  }, []);

  return (
    <group>
      {cliffSegments.map((cliff, idx) => (
        <mesh
          key={idx}
          position={[cliff.x, cliff.h / 2, cliff.z]}
          rotation={[cliff.rx, (idx * 0.7) % Math.PI, cliff.rz]}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[cliff.h * 0.45, 0]} />
          <meshStandardMaterial
            color={SANCTUARY_PALETTE.volcanicDark}
            roughness={0.92}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* Weathered Stone Trail leading through the gorge into Amphitheatre */}
      <ConnectingTrail />
    </group>
  );
}

// ─── Weathered Stone Trail into Amphitheatre ─────────────────────────────────

function ConnectingTrail() {
  const trailSegments = useMemo(() => {
    return [
      { x: 0.0, z: -33, w: 3.2, len: 4.0 },
      { x: -1.2, z: -37, w: 3.0, len: 4.5 },
      { x: -2.4, z: -41.5, w: 3.4, len: 5.0 },
    ];
  }, []);

  return (
    <group>
      {trailSegments.map((seg, i) => (
        <mesh
          key={i}
          position={[seg.x, 0.18, seg.z]}
          rotation={[-Math.PI / 2, 0, -0.12]}
          receiveShadow
        >
          <planeGeometry args={[seg.w, seg.len]} />
          <meshStandardMaterial
            color="#8A7E6E"
            roughness={0.85}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* Trail Marker Cairn Stones */}
      {[-3.2, 0.8].map((x, idx) => (
        <group key={idx} position={[x, 0.3, -37.5]}>
          <mesh position={[0, 0.2, 0]} castShadow>
            <dodecahedronGeometry args={[0.35, 0]} />
            <meshStandardMaterial color="#3A3430" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.55, 0]} castShadow>
            <dodecahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial color="#BFA276" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Primeval Monoliths & Stylized Flora ────────────────────────────────────

function SanctuaryMonoliths() {
  const formations = [
    { x: -6.5, z: -24, scale: 1.2 },
    { x: -7.2, z: -32, scale: 1.5 },
    { x: 8.0, z: -26, scale: 1.1 },
    { x: 7.4, z: -34, scale: 1.4 },
    { x: -1.0, z: -36, scale: 1.0 },
  ];

  return (
    <group>
      {formations.map((f, i) => (
        <group key={i} position={[f.x, 0, f.z]}>
          {/* Vertical basalt pillar */}
          <mesh position={[0, f.scale * 1.2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.3 * f.scale, 0.45 * f.scale, f.scale * 2.4, 6]} />
            <meshStandardMaterial
              color="#2F2A26"
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>

          {/* Primeval canopy leaf silhouette */}
          <mesh
            position={[0, f.scale * 2.4, 0]}
            rotation={[0.3, i * 1.1, 0.4]}
            castShadow
          >
            <coneGeometry args={[f.scale * 0.8, f.scale * 1.2, 5]} />
            <meshStandardMaterial
              color={SANCTUARY_PALETTE.deepCanopy}
              roughness={0.7}
              metalness={0.0}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Atmospheric Lighting ──────────────────────────────────────────────────

function SanctuaryLighting() {
  return (
    <>
      {/* Filtered emerald-teal canopy ambient */}
      <hemisphereLight
        intensity={0.35}
        color={SANCTUARY_PALETTE.mistHaze}
        groundColor={SANCTUARY_PALETTE.deepCanopy}
      />

      {/* Downward shaft through canopy */}
      <spotLight
        position={[2, 14, -28]}
        target-position={[1, 0, -29]}
        intensity={1.8}
        color="#F8E2B2"
        angle={0.65}
        penumbra={0.7}
        castShadow
      />
    </>
  );
}
