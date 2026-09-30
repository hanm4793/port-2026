'use client';

// =============================================================================
// Fossil Arch — Dino Sanctuary entrance landmark
// A monumental archway formed by fossilized primeval ribcages meeting overhead.
// Features mineralized bone textures and subtle embedded bioluminescent circuitry.
// =============================================================================

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SANCTUARY_PALETTE } from './sanctuaryConfig';

export function FossilArch() {
  const glowRef = useRef<THREE.Group>(null);

  // Subtle breathing pulse on the fossil energy traces
  useFrame(({ clock }) => {
    if (!glowRef.current) return;
    const t = clock.elapsedTime;
    glowRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.5 + Math.sin(t * 1.2 + i * 0.8) * 0.3;
      }
    });
  });

  // Rib pairs forming the arch
  const ribPairs = useMemo(() => {
    return [
      { yOffset: 0.0, zOffset: 0.0, scale: 1.0, curveAngle: 0.45 },
      { yOffset: 0.3, zOffset: -0.6, scale: 1.15, curveAngle: 0.52 },
      { yOffset: 0.5, zOffset: -1.2, scale: 1.25, curveAngle: 0.58 },
      { yOffset: 0.3, zOffset: -1.8, scale: 1.1, curveAngle: 0.5 },
      { yOffset: 0.0, zOffset: -2.4, scale: 0.95, curveAngle: 0.42 },
    ];
  }, []);

  return (
    <group position={[0, 0, -22]}>
      {/* Stone Pedestals anchoring the fossils into the volcanic earth */}
      <mesh position={[-3.2, 0.4, -1.2]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.8, 3.2]} />
        <meshStandardMaterial
          color={SANCTUARY_PALETTE.volcanicDark}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[3.2, 0.4, -1.2]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.8, 3.2]} />
        <meshStandardMaterial
          color={SANCTUARY_PALETTE.volcanicDark}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Ribcage Structure */}
      {ribPairs.map((pair, idx) => (
        <group key={idx} position={[0, pair.yOffset, pair.zOffset]}>
          {/* Left Rib Member */}
          <group position={[-2.4 * pair.scale, 1.8, 0]} rotation={[0, 0, -pair.curveAngle]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.22 * pair.scale, 0.32 * pair.scale, 4.2 * pair.scale, 10]} />
              <meshStandardMaterial
                color={SANCTUARY_PALETTE.fossilBone}
                roughness={0.65}
                metalness={0.05}
              />
            </mesh>
            {/* Top Curving Segment */}
            <mesh
              position={[0.8 * pair.scale, 2.2 * pair.scale, 0]}
              rotation={[0, 0, -0.65]}
              castShadow
            >
              <cylinderGeometry args={[0.14 * pair.scale, 0.22 * pair.scale, 2.6 * pair.scale, 8]} />
              <meshStandardMaterial
                color={SANCTUARY_PALETTE.fossilBone}
                roughness={0.65}
                metalness={0.05}
              />
            </mesh>
          </group>

          {/* Right Rib Member */}
          <group position={[2.4 * pair.scale, 1.8, 0]} rotation={[0, 0, pair.curveAngle]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.22 * pair.scale, 0.32 * pair.scale, 4.2 * pair.scale, 10]} />
              <meshStandardMaterial
                color={SANCTUARY_PALETTE.fossilBone}
                roughness={0.65}
                metalness={0.05}
              />
            </mesh>
            {/* Top Curving Segment */}
            <mesh
              position={[-0.8 * pair.scale, 2.2 * pair.scale, 0]}
              rotation={[0, 0, 0.65]}
              castShadow
            >
              <cylinderGeometry args={[0.14 * pair.scale, 0.22 * pair.scale, 2.6 * pair.scale, 8]} />
              <meshStandardMaterial
                color={SANCTUARY_PALETTE.fossilBone}
                roughness={0.65}
                metalness={0.05}
              />
            </mesh>
          </group>
        </group>
      ))}

      {/* Keystone Vertebra at Apex */}
      <mesh position={[0, 5.2, -1.2]} castShadow>
        <dodecahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color={SANCTUARY_PALETTE.fossilBone}
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* Embedded Bioluminescent Energy Inlays */}
      <group ref={glowRef}>
        <mesh position={[0, 5.2, -1.18]}>
          <octahedronGeometry args={[0.28]} />
          <meshStandardMaterial
            color={SANCTUARY_PALETTE.amberResin}
            emissive={SANCTUARY_PALETTE.amberResin}
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[-2.8, 1.6, -1.0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.8, 6]} />
          <meshStandardMaterial
            color={SANCTUARY_PALETTE.bioluminescent}
            emissive={SANCTUARY_PALETTE.bioluminescent}
            emissiveIntensity={0.6}
          />
        </mesh>
        <mesh position={[2.8, 1.6, -1.0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.8, 6]} />
          <meshStandardMaterial
            color={SANCTUARY_PALETTE.bioluminescent}
            emissive={SANCTUARY_PALETTE.bioluminescent}
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
    </group>
  );
}
