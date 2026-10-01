'use client';

// =============================================================================
// Acoustic Stage — circular performance orchestra with sound-reactive rings
// Features 3 interactive stem nodes (Percussion, Harmony, Vocals) and
// a central resonant bronze lyre pedestal that docks into the music case study.
// =============================================================================

import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AMPHITHEATRE_PALETTE, AUDIO_STEMS, type AudioStemId } from './amphitheatreConfig';
import { InteractiveObject } from '@/experience/interaction/InteractiveObject';

export function AcousticStage() {
  // Stem active states (default: all 3 stems playing together)
  const [activeStems, setActiveStems] = useState<Record<AudioStemId, boolean>>({
    rhythm: true,
    harmony: true,
    vocals: true,
  });

  const ringsRef = useRef<THREE.Group>(null);
  const lyreRef = useRef<THREE.Group>(null);

  const toggleStem = useCallback((id: AudioStemId) => {
    setActiveStems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      console.log(`[Amphitheatre] Stem ${id} toggled:`, next[id]);
      return next;
    });
  }, []);

  // Sound-reactive animation: concentric rings expand and pulse on the stage
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // Rings pulse according to active stems
    if (ringsRef.current) {
      ringsRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const stemId = AUDIO_STEMS[i]?.id;
          const isActive = stemId ? activeStems[stemId] : true;
          const speed = AUDIO_STEMS[i]?.speed ?? 1.0;

          const mat = child.material as THREE.MeshStandardMaterial;
          if (isActive) {
            const pulse = 0.5 + Math.sin(t * speed * 3.0 + i * 1.5) * 0.45;
            mat.emissiveIntensity = pulse;
            mat.opacity = 0.4 + pulse * 0.45;
          } else {
            mat.emissiveIntensity = 0.08;
            mat.opacity = 0.15;
          }
        }
      });
    }

    // Gentle float on central bronze lyre/relic
    if (lyreRef.current) {
      lyreRef.current.position.y = 1.35 + Math.sin(t * 1.2) * 0.04;
      lyreRef.current.rotation.y = t * 0.25;
    }
  });

  return (
    <group position={[-3, 0.4, -46]}>
      {/* ── Outer Foundation Rim ────────────────────────────────────────── */}
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <cylinderGeometry args={[4.2, 4.4, 0.2, 32]} />
        <meshStandardMaterial
          color={AMPHITHEATRE_PALETTE.darkBasalt}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* ── Polished Marble Orchestra Stage ─────────────────────────────── */}
      <mesh position={[0, 0.18, 0]} receiveShadow>
        <cylinderGeometry args={[3.8, 4.0, 0.12, 32]} />
        <meshStandardMaterial
          color={AMPHITHEATRE_PALETTE.stageMarble}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>

      {/* ── Concentric Sound-Reactive Stage Rings ───────────────────────── */}
      <group ref={ringsRef} position={[0, 0.25, 0]}>
        {/* Outer Ring: Rhythm / Percussion */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.1, 3.25, 48]} />
          <meshStandardMaterial
            color={AUDIO_STEMS[0].color}
            emissive={AUDIO_STEMS[0].color}
            emissiveIntensity={0.6}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Middle Ring: Harmony / Synths */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.0, 2.12, 40]} />
          <meshStandardMaterial
            color={AUDIO_STEMS[1].color}
            emissive={AUDIO_STEMS[1].color}
            emissiveIntensity={0.7}
            transparent
            opacity={0.75}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Ring: Lead Vocals */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.95, 1.05, 32]} />
          <meshStandardMaterial
            color={AUDIO_STEMS[2].color}
            emissive={AUDIO_STEMS[2].color}
            emissiveIntensity={0.9}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* ── Center Thymele (Altar Pedestal) & Resonant Lyre ─────────────── */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.55, 0.8, 12]} />
        <meshStandardMaterial
          color={AMPHITHEATRE_PALETTE.darkBasalt}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Interactive Core: Central Acoustic Relic / Lyre */}
      <InteractiveObject
        config={{
          id: 'amphitheatre-central-lyre',
          zone: 'amphitheatre',
          overlayId: 'service',
          overlayData: { service: 'music-sonic-identity', slug: 'music-sonic-identity' },
        }}
      >
        <group ref={lyreRef} position={[0, 1.35, 0]}>
          {/* Outer Lyre Horns */}
          <mesh position={[-0.22, 0, 0]} rotation={[0, 0, -0.2]} castShadow>
            <cylinderGeometry args={[0.035, 0.05, 0.65, 8]} />
            <meshStandardMaterial
              color={AMPHITHEATRE_PALETTE.resonantBronze}
              roughness={0.2}
              metalness={0.85}
            />
          </mesh>
          <mesh position={[0.22, 0, 0]} rotation={[0, 0, 0.2]} castShadow>
            <cylinderGeometry args={[0.035, 0.05, 0.65, 8]} />
            <meshStandardMaterial
              color={AMPHITHEATRE_PALETTE.resonantBronze}
              roughness={0.2}
              metalness={0.85}
            />
          </mesh>

          {/* Crossbar */}
          <mesh position={[0, 0.26, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.48, 8]} />
            <meshStandardMaterial
              color={AMPHITHEATRE_PALETTE.resonantBronze}
              roughness={0.2}
              metalness={0.85}
            />
          </mesh>

          {/* Floating Sound Core (Octahedron) */}
          <mesh position={[0, 0.05, 0]} castShadow>
            <octahedronGeometry args={[0.18]} />
            <meshStandardMaterial
              color={AUDIO_STEMS[2].color}
              emissive={AUDIO_STEMS[2].color}
              emissiveIntensity={activeStems.vocals ? 1.4 : 0.2}
              roughness={0.15}
              metalness={0.4}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      </InteractiveObject>

      {/* ── 3 Interactive Stem Steles along Stage Arc ────────────────────── */}
      <StemStele
        stem={AUDIO_STEMS[0]}
        position={[-2.6, 0.25, 0.4]}
        rotationY={0.6}
        isActive={activeStems.rhythm}
        onToggle={() => toggleStem('rhythm')}
      />
      <StemStele
        stem={AUDIO_STEMS[1]}
        position={[2.6, 0.25, 0.4]}
        rotationY={-0.6}
        isActive={activeStems.harmony}
        onToggle={() => toggleStem('harmony')}
      />
      <StemStele
        stem={AUDIO_STEMS[2]}
        position={[0, 0.25, -2.8]}
        rotationY={Math.PI}
        isActive={activeStems.vocals}
        onToggle={() => toggleStem('vocals')}
      />
    </group>
  );
}

// ─── Individual Stem Controller Stele ────────────────────────────────────────

interface StemSteleProps {
  stem: (typeof AUDIO_STEMS)[number];
  position: [number, number, number];
  rotationY: number;
  isActive: boolean;
  onToggle: () => void;
}

function StemStele({ stem, position, rotationY, isActive, onToggle }: StemSteleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Stone Pillar Body */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 1.1, 0.2]} />
        <meshStandardMaterial
          color={isActive ? '#36312C' : '#221F1D'}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Bronze Resonance Plate */}
      <mesh position={[0, 0.55, 0.11]} castShadow>
        <boxGeometry args={[0.22, 0.85, 0.02]} />
        <meshStandardMaterial
          color={AMPHITHEATRE_PALETTE.resonantBronze}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Waveform Glyph Indicator */}
      <mesh ref={meshRef} position={[0, 0.95, 0.13]}>
        <boxGeometry args={[0.16, 0.08, 0.02]} />
        <meshStandardMaterial
          color={stem.color}
          emissive={stem.color}
          emissiveIntensity={isActive ? (hovered ? 1.6 : 1.1) : 0.15}
          roughness={0.1}
        />
      </mesh>

      {/* Status Ring at Base */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.28, 0.36, 16]} />
        <meshStandardMaterial
          color={stem.color}
          emissive={stem.color}
          emissiveIntensity={isActive ? 0.6 : 0.05}
          transparent
          opacity={isActive ? 0.8 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
