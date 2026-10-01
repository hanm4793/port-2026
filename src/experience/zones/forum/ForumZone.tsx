'use client';

// =============================================================================
// Forum of Systems — main zone component
//
// LAYOUT: A symmetrical stone forum with colonnades on both sides,
// System Table at center, project archive alcoves along back wings,
// and a GRAND OPEN PORTAL with open bronze gates revealing the road ahead!
//
// z = -3.5  Entrance steps (from Shore path)
// z = -9.0  System Table (center)
// z = -14.5 Grand Exit Portal with OPEN BRONZE GATES leading to mountain road
// =============================================================================

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
      {/* Ground Floor */}
      <ForumFloor />

      {/* Colonnades — left and right */}
      <Colonnade side="left" />
      <Colonnade side="right" />

      {/* Entrance arch from Shore */}
      <EntranceArch />

      {/* System Table — hero landmark */}
      <SystemTable />

      {/* Signal nodes — interactive system visualization */}
      <SignalNodes />

      {/* Archive alcoves on left and right wings */}
      <ArchiveAlcoves />

      {/* Grand Open Exit Portal with open bronze doors & connecting road */}
      <ForumExitPortal />

      {/* Data current lines in floor */}
      <FloorCircuits />

      {/* Forum-specific lighting */}
      <ForumLighting />
    </group>
  );
}

// ─── Forum floor ────────────────────────────────────────────────────────

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
          emissiveIntensity={0.5}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

// ─── Grand Exit Portal & Open Bronze Gates ──────────────────────────────────
// Monumental gateway at z = -14.5 with open bronze doors revealing the path ahead!

function ForumExitPortal() {
  return (
    <group position={[0, 0.5, -14.5]}>
      {/* Left Back Wall Wing */}
      <mesh position={[-6.2, 2.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 4.0, 0.4]} />
        <meshStandardMaterial color={FORUM_PALETTE.wallStone} roughness={0.55} />
      </mesh>

      {/* Right Back Wall Wing */}
      <mesh position={[6.2, 2.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.2, 4.0, 0.4]} />
        <meshStandardMaterial color={FORUM_PALETTE.wallStone} roughness={0.55} />
      </mesh>

      {/* ── Monumental Gateway Pillars ──────────────────────────────────── */}
      {/* Left Gatepost */}
      <mesh position={[-3.2, 2.3, 0]} castShadow>
        <boxGeometry args={[0.7, 4.6, 0.7]} />
        <meshStandardMaterial color={FORUM_PALETTE.pillarMarble} roughness={0.32} />
      </mesh>
      {/* Right Gatepost */}
      <mesh position={[3.2, 2.3, 0]} castShadow>
        <boxGeometry args={[0.7, 4.6, 0.7]} />
        <meshStandardMaterial color={FORUM_PALETTE.pillarMarble} roughness={0.32} />
      </mesh>

      {/* Lintel Beam Overhead */}
      <mesh position={[0, 4.6, 0]} castShadow>
        <boxGeometry args={[7.4, 0.5, 0.8]} />
        <meshStandardMaterial color={FORUM_PALETTE.wallStone} roughness={0.4} />
      </mesh>

      {/* Luminous Arch Inscription */}
      <mesh position={[0, 4.6, 0.42]}>
        <planeGeometry args={[4.5, 0.24]} />
        <meshStandardMaterial
          color="#2A2624"
          emissive={FORUM_PALETTE.circuitPrimary}
          emissiveIntensity={0.6}
          roughness={0.1}
        />
      </mesh>

      {/* ── Two Ancient Bronze Gate Doors Swung Wide Open at 60 Degrees ─── */}
      {/* Left Bronze Door (Swung outward toward negative Z) */}
      <group position={[-2.8, 0, 0]} rotation={[0, -Math.PI * 0.35, 0]}>
        <mesh position={[-1.25, 2.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 4.0, 0.1]} />
          <meshStandardMaterial
            color="#6B4E2A"
            roughness={0.35}
            metalness={0.8}
          />
        </mesh>
        {/* Bronze Studs & Relief Band */}
        <mesh position={[-1.25, 2.0, 0.06]}>
          <boxGeometry args={[2.3, 0.25, 0.04]} />
          <meshStandardMaterial color="#8B6D3A" roughness={0.25} metalness={0.85} />
        </mesh>
      </group>

      {/* Right Bronze Door (Swung outward toward negative Z) */}
      <group position={[2.8, 0, 0]} rotation={[0, Math.PI * 0.35, 0]}>
        <mesh position={[1.25, 2.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 4.0, 0.1]} />
          <meshStandardMaterial
            color="#6B4E2A"
            roughness={0.35}
            metalness={0.8}
          />
        </mesh>
        {/* Bronze Studs & Relief Band */}
        <mesh position={[1.25, 2.0, 0.06]}>
          <boxGeometry args={[2.3, 0.25, 0.04]} />
          <meshStandardMaterial color="#8B6D3A" roughness={0.25} metalness={0.85} />
        </mesh>
      </group>

      {/* ── Continuous Paved Road Leading Out Through the Portal ─────────── */}
      {/* Extends cleanly from z = -14.5 through the doors to z = -18 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, -1.8]}
        receiveShadow
      >
        <planeGeometry args={[4.8, 4.2]} />
        <meshStandardMaterial color="#8A7E6E" roughness={0.8} />
      </mesh>

      {/* Lantern Sconces on Pillars */}
      <pointLight position={[-3.2, 2.8, 0.5]} color="#FFD4A0" intensity={0.8} distance={6} />
      <pointLight position={[3.2, 2.8, 0.5]} color="#FFD4A0" intensity={0.8} distance={6} />
    </group>
  );
}

// ─── Signal nodes ───────────────────────────────────────────────────────

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
      <NodeConnections nodes={nodes.map((n) => n.pos)} />
      <InteractiveObject
        config={{
          id: 'forum-signal-router',
          zone: 'forum',
          overlayId: 'service',
          overlayData: { service: 'crm-systems', slug: 'crm-systems' },
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

function SystemNode({
  position,
  color,
  index,
}: {
  position: [number, number, number];
  color: string;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
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
// Situated on the left and right wings so the central corridor is completely clear!

function ArchiveAlcoves() {
  const alcoves = [
    // Left Wing (Web & CRM case studies)
    { x: -6.4, z: -14.0, label: 'Web', projectSlug: 'enterprise-analytics-platform' },
    { x: -4.4, z: -14.0, label: 'CRM', projectSlug: 'enterprise-crm-engine' },
    // Right Wing (Apps & Automation)
    { x: 4.4, z: -14.0, label: 'Apps', projectSlug: 'field-operations-mobile-suite' },
    { x: 6.4, z: -14.0, label: 'Auto', projectSlug: null },
  ];

  return (
    <group>
      {alcoves.map((alcove, i) => {
        const alcoveGroup = (
          <group key={i} position={[alcove.x, 0.5, alcove.z]}>
            {/* Alcove recess */}
            <mesh position={[0, 1.5, 0]} receiveShadow>
              <boxGeometry args={[1.6, 2.5, 0.5]} />
              <meshStandardMaterial color={FORUM_PALETTE.archiveDark} roughness={0.8} />
            </mesh>
            {/* Alcove frame */}
            <mesh position={[0, 1.5, 0.26]} castShadow>
              <boxGeometry args={[1.8, 2.7, 0.05]} />
              <meshStandardMaterial color={FORUM_PALETTE.wallStone} roughness={0.5} />
            </mesh>
            {/* Glow accent */}
            <mesh position={[0, 2.8, 0.28]}>
              <boxGeometry args={[1.4, 0.05, 0.04]} />
              <meshStandardMaterial
                color={alcove.projectSlug ? FORUM_PALETTE.nodeActive : FORUM_PALETTE.circuitPrimary}
                emissive={alcove.projectSlug ? FORUM_PALETTE.nodeActive : FORUM_PALETTE.circuitPrimary}
                emissiveIntensity={alcove.projectSlug ? 0.9 : 0.3}
                roughness={0.05}
              />
            </mesh>
          </group>
        );

        if (alcove.projectSlug) {
          return (
            <InteractiveObject
              key={i}
              config={{
                id: `forum-alcove-${alcove.label.toLowerCase()}`,
                zone: 'forum',
                overlayId: 'project',
                overlayData: { slug: alcove.projectSlug },
              }}
            >
              {alcoveGroup}
            </InteractiveObject>
          );
        }

        return alcoveGroup;
      })}
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
    // Main data highway leading straight from entrance through table to open portal
    { pos: [0, 0.51, -6.5] as const, size: [0.04, 0.005, 6] as const },
    { pos: [0, 0.51, -12.0] as const, size: [0.04, 0.005, 5] as const },
    // Branch lines to signal nodes
    { pos: [-1.5, 0.51, -8] as const, size: [3, 0.005, 0.03] as const },
    { pos: [1.5, 0.51, -9] as const, size: [3, 0.005, 0.03] as const },
    // Lateral lines to wings
    { pos: [-5.0, 0.51, -13.5] as const, size: [4, 0.005, 0.03] as const },
    { pos: [5.0, 0.51, -13.5] as const, size: [4, 0.005, 0.03] as const },
  ];

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <mesh key={i} position={[line.pos[0], line.pos[1], line.pos[2]]}>
          <boxGeometry args={[line.size[0], line.size[1], line.size[2]]} />
          <meshStandardMaterial
            color={FORUM_PALETTE.circuitPrimary}
            emissive={FORUM_PALETTE.circuitPrimary}
            emissiveIntensity={0.4}
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
      <pointLight position={[0, 5, -9]} intensity={1.5} color="#B0C8E0" distance={20} decay={2} />
      <pointLight position={[0, 3, -9]} intensity={0.8} color="#FFD4A0" distance={8} decay={2} />
    </>
  );
}
