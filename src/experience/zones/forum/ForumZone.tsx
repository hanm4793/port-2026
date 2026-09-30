'use client';

// =============================================================================
// Forum of Systems — main zone component
// =============================================================================
//
// LAYOUT: A symmetrical stone forum with colonnades on both sides,
// System Table at center, and archive alcoves at the back.
// Cleaner and more geometric than Shore.
//
// z=-4  entrance (from Shore path)
// z=-8  System Table (center)
// z=-12 archive alcoves
// z=-14 back wall / exit

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FORUM_PALETTE } from './forumConfig';
import { COLORS } from '@/lib/constants';
import { SystemTable } from './SystemTable';
import { InteractiveObject } from '@/experience/interaction/InteractiveObject';

export function ForumZone() {
  return (
    <group>
      {/* Ground */}
      <ForumFloor />

      {/* Colonnades — left and right */}
      <Colonnade side="left" />
      <Colonnade side="right" />

      {/* Entrance arch */}
      <EntranceArch />

      {/* System Table — hero landmark */}
      <SystemTable />

      {/* Signal nodes — interactive system visualization */}
      <SignalNodes />

      {/* Archive alcoves at back */}
      <ArchiveAlcoves />

      {/* Back wall */}
      <mesh position={[0, 2, -14.5]} castShadow receiveShadow>
        <boxGeometry args={[17, 4, 0.4]} />
        <meshStandardMaterial color={FORUM_PALETTE.wallStone} roughness={0.55} />
      </mesh>

      {/* Data current lines in floor */}
      <FloorCircuits />

      {/* Forum-specific lighting */}
      <ForumLighting />
    </group>
  );
}

// ─── Forum floor ────────────────────────────────────────────────────────
// Raised stone floor with grid pattern

function ForumFloor() {
  return (
    <group>
      {/* Main floor platform */}
      <mesh position={[0, 0.45, -9]} receiveShadow>
        <boxGeometry args={[17, 0.1, 12]} />
        <meshStandardMaterial color={FORUM_PALETTE.floorLight} roughness={0.6} />
      </mesh>

      {/* Grid lines — subtle darker stone inlays */}
      {Array.from({ length: 9 }, (_, i) => {
        const x = -8 + i * 2;
        return (
          <mesh key={`gx-${i}`} position={[x, 0.505, -9]}>
            <boxGeometry args={[0.03, 0.005, 12]} />
            <meshStandardMaterial color={FORUM_PALETTE.floorDark} roughness={0.7} />
          </mesh>
        );
      })}
      {Array.from({ length: 7 }, (_, i) => {
        const z = -3.5 - i * 1.7;
        return (
          <mesh key={`gz-${i}`} position={[0, 0.505, z]}>
            <boxGeometry args={[17, 0.005, 0.03]} />
            <meshStandardMaterial color={FORUM_PALETTE.floorDark} roughness={0.7} />
          </mesh>
        );
      })}

      {/* Step up from Shore path */}
      <mesh position={[0, 0.25, -3.5]} castShadow>
        <boxGeometry args={[4, 0.5, 1]} />
        <meshStandardMaterial color={COLORS.travertine} roughness={0.5} />
      </mesh>
    </group>
  );
}

// ─── Colonnade ──────────────────────────────────────────────────────────
// Row of columns on each side forming a covered walkway

function Colonnade({ side }: { side: 'left' | 'right' }) {
  const x = side === 'left' ? -7 : 7;
  const columns = 5;

  return (
    <group>
      {Array.from({ length: columns }, (_, i) => {
        const z = -4.5 - i * 2.2;
        return (
          <group key={i} position={[x, 0.5, z]}>
            {/* Column base */}
            <mesh position={[0, 0.15, 0]} castShadow>
              <boxGeometry args={[0.7, 0.3, 0.7]} />
              <meshStandardMaterial color="#2A2624" roughness={0.6} />
            </mesh>
            {/* Column shaft */}
            <mesh position={[0, 2.2, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.25, 3.5, 12]} />
              <meshStandardMaterial color={FORUM_PALETTE.pillarMarble} roughness={0.3} />
            </mesh>
            {/* Column capital */}
            <mesh position={[0, 4.1, 0]} castShadow>
              <boxGeometry args={[0.75, 0.25, 0.75]} />
              <meshStandardMaterial color={FORUM_PALETTE.pillarMarble} roughness={0.28} />
            </mesh>
          </group>
        );
      })}

      {/* Architrave beam connecting columns */}
      <mesh position={[x, 4.35, -9]} castShadow>
        <boxGeometry args={[0.5, 0.2, 11.5]} />
        <meshStandardMaterial color={FORUM_PALETTE.wallStone} roughness={0.45} />
      </mesh>
    </group>
  );
}

// ─── Entrance arch ──────────────────────────────────────────────────────

function EntranceArch() {
  return (
    <group position={[0, 0.5, -3.8]}>
      {/* Left pillar */}
      <mesh position={[-2, 1.5, 0]} castShadow>
        <boxGeometry args={[0.5, 3, 0.5]} />
        <meshStandardMaterial color={FORUM_PALETTE.pillarMarble} roughness={0.35} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[2, 1.5, 0]} castShadow>
        <boxGeometry args={[0.5, 3, 0.5]} />
        <meshStandardMaterial color={FORUM_PALETTE.pillarMarble} roughness={0.35} />
      </mesh>
      {/* Lintel */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <boxGeometry args={[4.8, 0.35, 0.55]} />
        <meshStandardMaterial color={FORUM_PALETTE.wallStone} roughness={0.4} />
      </mesh>
      {/* Inscription glow */}
      <mesh position={[0, 3.2, 0.29]}>
        <planeGeometry args={[3, 0.2]} />
        <meshStandardMaterial
          color="#2A2624"
          emissive={FORUM_PALETTE.circuitPrimary}
          emissiveIntensity={0.4}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

// ─── Signal nodes ───────────────────────────────────────────────────────
// Interactive: 5 nodes connected by circuit lines forming a system diagram

function SignalNodes() {
  const nodes = [
    { pos: [-3, 1.8, -7] as const, label: 'Frontend', color: FORUM_PALETTE.nodeActive },
    { pos: [-1.5, 1.5, -10] as const, label: 'API', color: FORUM_PALETTE.circuitPrimary },
    { pos: [0, 1.8, -8] as const, label: 'Backend', color: FORUM_PALETTE.nodeGlow },
    { pos: [1.5, 1.5, -10.5] as const, label: 'Database', color: FORUM_PALETTE.circuitSecondary },
    { pos: [3, 1.8, -7.5] as const, label: 'Deploy', color: FORUM_PALETTE.nodeActive },
  ];

  return (
    <group>
      {/* Connection lines between nodes */}
      <NodeConnections nodes={nodes.map(n => n.pos)} />

      {/* Interactive signal router */}
      <InteractiveObject
        config={{
          id: 'forum-signal-router',
          zone: 'forum',
          overlayId: 'service',
          overlayData: { service: 'crm-systems' },
        }}
      >
        <group>
          {nodes.map((node, i) => (
            <SystemNode key={i} position={[node.pos[0], node.pos[1], node.pos[2]]} color={node.color} index={i} />
          ))}
        </group>
      </InteractiveObject>
    </group>
  );
}

function SystemNode({ position, color, index }: {
  position: [number, number, number];
  color: string;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    // Gentle float + rotation
    meshRef.current.position.y = position[1] + Math.sin(t * 1.0 + index * 1.3) * 0.06;
    meshRef.current.rotation.y = t * 0.3 + index;
    meshRef.current.rotation.x = Math.sin(t * 0.5 + index) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={[0.25, 0.25, 0.25]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.7}
        roughness={0.1}
        metalness={0.4}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// ─── Node connections (circuit lines between nodes) ─────────────────────

function NodeConnections({ nodes }: { nodes: readonly (readonly [number, number, number])[] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.4 + Math.sin(t * 0.8 + i * 0.5) * 0.3;
      }
    });
  });

  // Connect sequential nodes
  const connections: Array<{ from: readonly [number, number, number]; to: readonly [number, number, number] }> = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    connections.push({ from: nodes[i], to: nodes[i + 1] });
  }

  return (
    <group ref={groupRef}>
      {connections.map((conn, i) => {
        const mx = (conn.from[0] + conn.to[0]) / 2;
        const my = (conn.from[1] + conn.to[1]) / 2;
        const mz = (conn.from[2] + conn.to[2]) / 2;
        const dx = conn.to[0] - conn.from[0];
        const dz = conn.to[2] - conn.from[2];
        const length = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dx, dz);

        return (
          <mesh key={i} position={[mx, my, mz]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[0.02, 0.015, length]} />
            <meshStandardMaterial
              color={FORUM_PALETTE.circuitPrimary}
              emissive={FORUM_PALETTE.circuitPrimary}
              emissiveIntensity={0.4}
              roughness={0.05}
              metalness={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── Archive alcoves ────────────────────────────────────────────────────
// Recessed niches in the back wall — one per service category

function ArchiveAlcoves() {
  const alcoves = [
    { x: -5, label: 'Web' },
    { x: -2.5, label: 'Apps' },
    { x: 0, label: 'CRM' },
    { x: 2.5, label: 'Auto' },
    { x: 5, label: 'API' },
  ];

  return (
    <group>
      {alcoves.map((alcove, i) => (
        <group key={i} position={[alcove.x, 0.5, -13.5]}>
          {/* Alcove recess */}
          <mesh position={[0, 1.5, 0]} receiveShadow>
            <boxGeometry args={[1.8, 2.5, 0.6]} />
            <meshStandardMaterial color={FORUM_PALETTE.archiveDark} roughness={0.8} />
          </mesh>
          {/* Alcove frame */}
          <mesh position={[0, 1.5, 0.32]} castShadow>
            <boxGeometry args={[2, 2.8, 0.05]} />
            <meshStandardMaterial color={FORUM_PALETTE.wallStone} roughness={0.5} />
          </mesh>
          {/* Inner opening */}
          <mesh position={[0, 1.5, 0.35]}>
            <boxGeometry args={[1.5, 2.2, 0.02]} />
            <meshStandardMaterial color={FORUM_PALETTE.archiveDark} roughness={0.9} />
          </mesh>
          {/* Glow accent at top of alcove */}
          <mesh position={[0, 2.85, 0.33]}>
            <boxGeometry args={[1.6, 0.04, 0.04]} />
            <meshStandardMaterial
              color={FORUM_PALETTE.circuitPrimary}
              emissive={FORUM_PALETTE.circuitPrimary}
              emissiveIntensity={0.5}
              roughness={0.05}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Floor circuits ─────────────────────────────────────────────────────

function FloorCircuits() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.3 + Math.sin(t * 0.4 + i * 0.7) * 0.2;
      }
    });
  });

  const lines = [
    // Main data highway — center line from entrance to table
    { pos: [0, 0.51, -6.5] as const, size: [0.04, 0.005, 6] as const },
    // Branch lines to signal nodes
    { pos: [-1.5, 0.51, -8] as const, size: [3, 0.005, 0.03] as const },
    { pos: [1.5, 0.51, -9] as const, size: [3, 0.005, 0.03] as const },
    // Lines to alcoves
    { pos: [0, 0.51, -12] as const, size: [0.03, 0.005, 3] as const },
    { pos: [-3, 0.51, -12.5] as const, size: [6, 0.005, 0.03] as const },
    { pos: [3, 0.51, -12.5] as const, size: [6, 0.005, 0.03] as const },
  ];

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <mesh key={i} position={[line.pos[0], line.pos[1], line.pos[2]]}>
          <boxGeometry args={[line.size[0], line.size[1], line.size[2]]} />
          <meshStandardMaterial
            color={FORUM_PALETTE.circuitPrimary}
            emissive={FORUM_PALETTE.circuitPrimary}
            emissiveIntensity={0.3}
            roughness={0.05}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Forum lighting ─────────────────────────────────────────────────────

function ForumLighting() {
  return (
    <>
      {/* Cool overhead light for the forum — technical feel */}
      <pointLight
        position={[0, 5, -9]}
        intensity={1.5}
        color="#B0C8E0"
        distance={20}
        decay={2}
      />
      {/* Warm accent on the System Table */}
      <pointLight
        position={[0, 3, -9]}
        intensity={0.8}
        color="#FFD4A0"
        distance={8}
        decay={2}
      />
    </>
  );
}
