'use client';

// =============================================================================
// Gate of Names — Shore zone hero landmark
// =============================================================================
//
// A monumental stone archway at the top of the beach steps.
// Ceremonial threshold: passing through it starts the journey.
// Contains the mode-choice interaction (Story / Explore).
//
// Archaeological futurism: classical arch form with embedded luminous circuitry
// tracing the inscription. Not ornate — dignified, like an ancient port city gate.

import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '@/lib/constants';
import { useExperienceStore } from '@/stores/useExperienceStore';
import type { ExperienceMode } from '@/types/experience';

export function GateOfNames() {
  return (
    <group position={[0, 0.55, 0.5]}>
      {/* ── Left pillar ──────────────────────────────────────── */}
      <GatePillar position={[-2.2, 0, 0]} />

      {/* ── Right pillar ─────────────────────────────────────── */}
      <GatePillar position={[2.2, 0, 0]} />

      {/* ── Arch / lintel ─────────────────────────────────────── */}
      <Lintel />

      {/* ── Inscription panel (emissive) ──────────────────────── */}
      <InscriptionPanel />

      {/* ── Circuit traces (luminous lines in stone) ──────────── */}
      <CircuitTraces />

      {/* ── Mode choice orbs ──────────────────────────────────── */}
      <ModeChoiceOrbs />

      {/* ── Base platform — dark stone grounds the gate ──────── */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[6, 0.1, 2.5]} />
        <meshStandardMaterial
          color="#252220"
          roughness={0.6}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
}

// ─── Gate pillar ────────────────────────────────────────────────────────

function GatePillar({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Pillar base — DARK volcanic stone for contrast */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[1.0, 0.4, 1.0]} />
        <meshStandardMaterial
          color="#2A2624"
          roughness={0.7}
          metalness={0.0}
        />
      </mesh>

      {/* Pillar shaft — warm marble, distinct from sand */}
      <mesh position={[0, 2.7, 0]} castShadow>
        <boxGeometry args={[0.7, 4.6, 0.7]} />
        <meshStandardMaterial
          color="#D8CDB8"
          roughness={0.28}
          metalness={0.02}
        />
      </mesh>

      {/* Pillar capital — slightly lighter than shaft */}
      <mesh position={[0, 5.15, 0]} castShadow>
        <boxGeometry args={[1.0, 0.3, 1.0]} />
        <meshStandardMaterial
          color="#E0D5C0"
          roughness={0.25}
          metalness={0.02}
        />
      </mesh>

      {/* Bronze accent ring */}
      <mesh position={[0, 3.5, 0]}>
        <torusGeometry args={[0.4, 0.03, 8, 20]} />
        <meshStandardMaterial
          color="#6B4E2A"
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

// ─── Lintel (arch top) ──────────────────────────────────────────────────

function Lintel() {
  return (
    <group>
      {/* Main lintel beam */}
      <mesh position={[0, 5.45, 0]} castShadow>
        <boxGeometry args={[5.4, 0.5, 0.8]} />
        <meshStandardMaterial
          color={COLORS.travertine}
          roughness={0.3}
          metalness={0.0}
        />
      </mesh>

      {/* Triangular pediment (simplified) */}
      <mesh position={[0, 6.2, 0]} castShadow>
        <boxGeometry args={[4.5, 0.6, 0.6]} />
        <meshStandardMaterial
          color={COLORS.travertine}
          roughness={0.35}
          metalness={0.0}
        />
      </mesh>

      {/* Pediment cap */}
      <mesh position={[0, 6.7, 0]} castShadow>
        <boxGeometry args={[3, 0.3, 0.5]} />
        <meshStandardMaterial
          color={COLORS.sandstoneGold}
          roughness={0.4}
          metalness={0.0}
        />
      </mesh>
    </group>
  );
}

// ─── Inscription panel ──────────────────────────────────────────────────

function InscriptionPanel() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Subtle emissive pulse
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 5.45, 0.42]}>
      <planeGeometry args={[3.5, 0.35]} />
      <meshStandardMaterial
        color={COLORS.volcanicCharcoal}
        emissive={COLORS.goldLeaf}
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  );
}

// ─── Circuit traces ─────────────────────────────────────────────────────
// Thin luminous lines embedded in the stone — archaeological futurism

function CircuitTraces() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshStandardMaterial;
          const phase = clock.elapsedTime * 0.5 + i * 0.8;
          mat.emissiveIntensity = 0.8 + Math.sin(phase) * 0.5;
        }
      });
    }
  });

  // Vertical traces on pillars, horizontal on lintel
  const traces = [
    // Left pillar traces
    { pos: [-2.2, 2.5, 0.36] as const, size: [0.035, 3.5, 0.015] as const },
    { pos: [-2.4, 2.5, 0.36] as const, size: [0.025, 2.8, 0.015] as const },
    // Right pillar traces
    { pos: [2.2, 2.5, 0.36] as const, size: [0.035, 3.5, 0.015] as const },
    { pos: [2.0, 2.5, 0.36] as const, size: [0.025, 2.8, 0.015] as const },
    // Lintel horizontal traces
    { pos: [0, 5.6, 0.41] as const, size: [4.2, 0.025, 0.015] as const },
    { pos: [0, 5.32, 0.41] as const, size: [3.8, 0.02, 0.015] as const },
  ];

  return (
    <group ref={groupRef}>
      {traces.map((trace, i) => (
        <mesh key={i} position={[trace.pos[0], trace.pos[1], trace.pos[2]]}>
          <boxGeometry args={[trace.size[0], trace.size[1], trace.size[2]]} />
          <meshStandardMaterial
            color={COLORS.circuitBlue}
            emissive={COLORS.circuitBlue}
            emissiveIntensity={0.8}
            roughness={0.05}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Mode choice orbs ───────────────────────────────────────────────────
// Two floating orbs in the gate threshold — left = Story, right = Explore

function ModeChoiceOrbs() {
  return (
    <group position={[0, 3.5, 0]}>
      <ModeOrb
        position={[-0.8, 0, 0]}
        mode="story"
        color={COLORS.goldLeaf}
        label="Story"
      />
      <ModeOrb
        position={[0.8, 0, 0]}
        mode="explore"
        color={COLORS.circuitBlue}
        label="Explore"
      />
    </group>
  );
}

function ModeOrb({
  position,
  mode,
  color,
  label,
}: {
  position: [number, number, number];
  mode: ExperienceMode;
  color: string;
  label: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const setMode = useExperienceStore((s) => s.setMode);
  const currentMode = useExperienceStore((s) => s.mode);
  const isActive = currentMode === mode;

  // Float + hover + click-burst animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const floatY = Math.sin(clock.elapsedTime * 1.2 + (mode === 'explore' ? Math.PI : 0)) * 0.1;
      meshRef.current.position.y = position[1] + floatY;
      meshRef.current.rotation.y += 0.008;

      // Scale: hover → 1.4, clicked burst → 1.8 then back, active → 1.2, default → 1.0
      let targetScale = 1.0;
      if (clicked) targetScale = 1.8;
      else if (isActive) targetScale = 1.2;
      else if (hovered) targetScale = 1.4;

      const current = meshRef.current.scale.x;
      meshRef.current.scale.setScalar(current + (targetScale - current) * 0.12);

      // Reset click burst after scale reaches peak
      if (clicked && current > 1.7) {
        setClicked(false);
      }
    }
  });

  const handleClick = useCallback(() => {
    setClicked(true);
    setMode(mode);
    console.log(`[Shore] Mode selected: ${mode}`);
  }, [mode, setMode]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      castShadow
    >
      <octahedronGeometry args={[0.28]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isActive ? 1.5 : hovered ? 1.0 : 0.5}
        roughness={0.15}
        metalness={0.3}
        transparent
        opacity={isActive ? 1.0 : 0.85}
      />
    </mesh>
  );
}
