'use client';

// =============================================================================
// Atelier Zone — benchmark zone proxy geometry (BENCHMARK-ZONE.md)
// =============================================================================

import { useRef } from 'react';
import * as THREE from 'three';
import { getMaterial } from '@/experience/materials/materialLibrary';
import { InteractiveObject } from '@/experience/interaction/InteractiveObject';
import { useFrame } from '@react-three/fiber';

/**
 * The Renaissance Atelier — benchmark zone.
 * All geometry is proxy primitives. See BENCHMARK-ZONE.md §2.
 */
export function AtelierZone() {
  return (
    <group position={[0, 0, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 16]} />
        <meshStandardMaterial {...getMaterialProps('marbleWhite')} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 3, -8]} castShadow receiveShadow>
        <boxGeometry args={[20, 6, 0.4]} />
        <meshStandardMaterial {...getMaterialProps('marbleWhite')} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-10, 3, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[16, 6, 0.4]} />
        <meshStandardMaterial {...getMaterialProps('marbleWhite')} />
      </mesh>

      {/* Right wall */}
      <mesh position={[10, 3, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[16, 6, 0.4]} />
        <meshStandardMaterial {...getMaterialProps('marbleWhite')} />
      </mesh>

      {/* Step platform */}
      <mesh position={[0, 0.1, -4]} receiveShadow>
        <boxGeometry args={[8, 0.2, 4]} />
        <meshStandardMaterial {...getMaterialProps('marbleDark')} />
      </mesh>

      {/* Columns */}
      {[[-7, 0, -2], [-3, 0, -2], [3, 0, -2], [7, 0, -2]].map((pos, i) => (
        <Column key={i} position={pos as [number, number, number]} />
      ))}

      {/* Ceiling beams */}
      {[-4, 0, 4].map((z, i) => (
        <mesh key={`beam-${i}`} position={[0, 5.85, z]}>
          <boxGeometry args={[20, 0.3, 0.3]} />
          <meshStandardMaterial {...getMaterialProps('marbleDark')} />
        </mesh>
      ))}

      {/* Hero landmark: Workbench */}
      <Workbench position={[0, 0.2, -5]} />

      {/* Interactive: Portfolio Crystal */}
      <InteractiveObject
        config={{
          id: 'atelier-portfolio-crystal',
          zone: 'atelier',
          overlayId: 'project',
          overlayData: { source: 'atelier' },
        }}
      >
        <PortfolioCrystal position={[2, 1.5, -4.5]} />
      </InteractiveObject>

      {/* Interactive: About Tablet */}
      <InteractiveObject
        config={{
          id: 'atelier-about-tablet',
          zone: 'atelier',
          overlayId: 'about',
        }}
      >
        <AboutTablet position={[-3, 1.5, -7.5]} />
      </InteractiveObject>
    </group>
  );
}

/** Doric column proxy (cylinder + base + capital) */
function Column({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.8, 0.3, 0.8]} />
        <meshStandardMaterial {...getMaterialProps('marbleWhite')} />
      </mesh>
      {/* Shaft */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 5, 16]} />
        <meshStandardMaterial {...getMaterialProps('marbleWhite')} />
      </mesh>
      {/* Capital */}
      <mesh position={[0, 5.45, 0]}>
        <boxGeometry args={[0.9, 0.3, 0.9]} />
        <meshStandardMaterial {...getMaterialProps('marbleWhite')} />
      </mesh>
    </group>
  );
}

/** Workbench proxy (table top + legs + shelf) */
function Workbench({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Table top */}
      <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.1, 1.2]} />
        <meshStandardMaterial {...getMaterialProps('marbleDark')} />
      </mesh>
      {/* Legs */}
      {[[-1.3, 0, -0.5], [1.3, 0, -0.5], [-1.3, 0, 0.5], [1.3, 0, 0.5]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <boxGeometry args={[0.12, 0.8, 0.12]} />
          <meshStandardMaterial {...getMaterialProps('marbleDark')} />
        </mesh>
      ))}
      {/* Shelf */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[2.5, 0.05, 1]} />
        <meshStandardMaterial {...getMaterialProps('marbleDark')} />
      </mesh>
    </group>
  );
}

/** Portfolio Crystal — floating octahedron with glow */
function PortfolioCrystal({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <octahedronGeometry args={[0.3]} />
      <meshStandardMaterial
        color="#C9A84C"
        emissive="#C9A84C"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.3}
      />
    </mesh>
  );
}

/** About Tablet — stone slab on wall */
function AboutTablet({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI * 0.02]}>
      <boxGeometry args={[1, 1.5, 0.1]} />
      <meshStandardMaterial
        color="#3A3632"
        emissive="#6BA3C7"
        emissiveIntensity={0.15}
        roughness={0.4}
        metalness={0.0}
      />
    </mesh>
  );
}

/** Helper: extract material props for JSX spread */
function getMaterialProps(key: string) {
  const mat = getMaterial(key);
  return {
    color: mat.color,
    roughness: mat.roughness,
    metalness: mat.metalness,
  };
}
