'use client';

// =============================================================================
// Acoustic Stage — circular performance orchestra with sound-reactive rings
// Features:
// 1. Monumental 2.8m Resonant Bronze Lyre with vibrating acoustic strings
// 2. 3 prominent, unobstructed Stem Steles positioned along the front arc
// 3. Real procedural Web Audio API sound engine (Rhythm, Harmony, Vocals)
// =============================================================================

import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AMPHITHEATRE_PALETTE, AUDIO_STEMS, type AudioStemId } from './amphitheatreConfig';
import { stemAudioEngine } from './StemAudioEngine';
import { InteractiveObject } from '@/experience/interaction/InteractiveObject';

export function AcousticStage() {
  const [activeStems, setActiveStems] = useState<Record<AudioStemId, boolean>>({
    rhythm: true,
    harmony: true,
    vocals: true,
  });

  const ringsRef = useRef<THREE.Group>(null);
  const lyreRef = useRef<THREE.Group>(null);
  const stringsRef = useRef<THREE.Group>(null);

  const toggleStem = useCallback((id: AudioStemId) => {
    const isNowActive = stemAudioEngine.toggleStem(id);
    setActiveStems((prev) => ({ ...prev, [id]: isNowActive }));
  }, []);

  const handleLyreClick = useCallback(() => {
    stemAudioEngine.playLyreChime();
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
            const pulse = 0.5 + Math.sin(t * speed * 3.2 + i * 1.6) * 0.45;
            mat.emissiveIntensity = pulse * 1.2;
            mat.opacity = 0.45 + pulse * 0.45;
          } else {
            mat.emissiveIntensity = 0.05;
            mat.opacity = 0.12;
          }
        }
      });
    }

    // Gentle float & string vibration on the central lyre monument
    if (lyreRef.current) {
      lyreRef.current.position.y = 1.9 + Math.sin(t * 1.4) * 0.05;
    }

    if (stringsRef.current && activeStems.vocals) {
      stringsRef.current.children.forEach((str, idx) => {
        if (str instanceof THREE.Mesh) {
          str.scale.x = 1.0 + Math.sin(t * 14.0 + idx * 2.0) * 0.25;
        }
      });
    }
  });

  return (
    <group position={[-3, 0.4, -46]}>
      {/* ── Foundation Basalt Rim ────────────────────────────────────────── */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <cylinderGeometry args={[5.2, 5.5, 0.25, 36]} />
        <meshStandardMaterial
          color={AMPHITHEATRE_PALETTE.darkBasalt}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* ── Polished Marble Orchestra Stage (Radius 4.8m) ───────────────── */}
      <mesh position={[0, 0.24, 0]} receiveShadow>
        <cylinderGeometry args={[4.8, 5.0, 0.18, 36]} />
        <meshStandardMaterial
          color={AMPHITHEATRE_PALETTE.stageMarble}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>

      {/* ── Concentric Sound-Reactive Stage Rings ───────────────────────── */}
      <group ref={ringsRef} position={[0, 0.34, 0]}>
        {/* Outer Ring: Rhythm / Percussion */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.8, 4.05, 48]} />
          <meshStandardMaterial
            color={AUDIO_STEMS[0].color}
            emissive={AUDIO_STEMS[0].color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Middle Ring: Harmony / Synths */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.5, 2.7, 40]} />
          <meshStandardMaterial
            color={AUDIO_STEMS[1].color}
            emissive={AUDIO_STEMS[1].color}
            emissiveIntensity={0.9}
            transparent
            opacity={0.75}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Ring: Lead Vocals */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.35, 32]} />
          <meshStandardMaterial
            color={AUDIO_STEMS[2].color}
            emissive={AUDIO_STEMS[2].color}
            emissiveIntensity={1.1}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* ── Central Resonant Bronze Lyre Monument (Height ~2.8m) ─────────── */}
      <group position={[0, 0, 0]}>
        {/* Hexagonal Stone Pedestal */}
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.85, 0.9, 6]} />
          <meshStandardMaterial
            color={AMPHITHEATRE_PALETTE.darkBasalt}
            roughness={0.65}
            metalness={0.2}
          />
        </mesh>

        {/* Interactive Lyre Core */}
        <InteractiveObject
          config={{
            id: 'amphitheatre-central-lyre',
            zone: 'amphitheatre',
            overlayId: 'service',
            overlayData: { service: 'music-sonic-identity', slug: 'music-sonic-identity' },
          }}
        >
          <group ref={lyreRef} position={[0, 1.9, 0]} onClick={handleLyreClick}>
            {/* Monumental Curved Bronze Horns */}
            <mesh position={[-0.45, 0.25, 0]} rotation={[0, 0, -0.22]} castShadow>
              <cylinderGeometry args={[0.07, 0.11, 1.6, 10]} />
              <meshStandardMaterial
                color={AMPHITHEATRE_PALETTE.resonantBronze}
                roughness={0.22}
                metalness={0.85}
              />
            </mesh>
            <mesh position={[0.45, 0.25, 0]} rotation={[0, 0, 0.22]} castShadow>
              <cylinderGeometry args={[0.07, 0.11, 1.6, 10]} />
              <meshStandardMaterial
                color={AMPHITHEATRE_PALETTE.resonantBronze}
                roughness={0.22}
                metalness={0.85}
              />
            </mesh>

            {/* Bronze Top Crossbar */}
            <mesh position={[0, 0.95, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.055, 0.055, 1.1, 10]} />
              <meshStandardMaterial
                color={AMPHITHEATRE_PALETTE.resonantBronze}
                roughness={0.22}
                metalness={0.85}
              />
            </mesh>

            {/* Lower Soundboard Arch */}
            <mesh position={[0, -0.4, 0]} castShadow>
              <boxGeometry args={[0.75, 0.25, 0.28]} />
              <meshStandardMaterial
                color={AMPHITHEATRE_PALETTE.resonantBronze}
                roughness={0.28}
                metalness={0.8}
              />
            </mesh>

            {/* 5 Vibrating Luminous Acoustic Strings */}
            <group ref={stringsRef}>
              {[-0.28, -0.14, 0, 0.14, 0.28].map((sx, idx) => (
                <mesh key={idx} position={[sx, 0.28, 0]}>
                  <cylinderGeometry args={[0.012, 0.012, 1.35, 6]} />
                  <meshStandardMaterial
                    color="#F5F0E6"
                    emissive={AUDIO_STEMS[2].color}
                    emissiveIntensity={activeStems.vocals ? 1.5 : 0.2}
                    roughness={0.1}
                  />
                </mesh>
              ))}
            </group>

            {/* Central Amber Resonator Core */}
            <mesh position={[0, 0.28, 0]} castShadow>
              <octahedronGeometry args={[0.3]} />
              <meshStandardMaterial
                color={AUDIO_STEMS[2].color}
                emissive={AUDIO_STEMS[2].color}
                emissiveIntensity={activeStems.vocals ? 1.8 : 0.3}
                roughness={0.15}
                metalness={0.4}
                transparent
                opacity={0.92}
              />
            </mesh>
          </group>
        </InteractiveObject>
      </group>

      {/* ── 3 Front-Facing Unobstructed Stem Steles ──────────────────────── */}
      {/* 1. Left Stele: Rhythm & Percussion (Terracotta) */}
      <StemStele
        stem={AUDIO_STEMS[0]}
        position={[-3.8, 0.3, 1.2]}
        rotationY={0.45}
        isActive={activeStems.rhythm}
        onToggle={() => toggleStem('rhythm')}
      />

      {/* 2. Center-Front Stele: Vocals & Acoustic (Gold) */}
      <StemStele
        stem={AUDIO_STEMS[2]}
        position={[0.0, 0.3, 4.0]}
        rotationY={0.0}
        isActive={activeStems.vocals}
        onToggle={() => toggleStem('vocals')}
      />

      {/* 3. Right Stele: Harmony & Strings (Cyan Blue) */}
      <StemStele
        stem={AUDIO_STEMS[1]}
        position={[3.8, 0.3, 1.2]}
        rotationY={-0.45}
        isActive={activeStems.harmony}
        onToggle={() => toggleStem('harmony')}
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
      {/* Stone Pillar Body (Height 1.4m) */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.42, 1.4, 0.28]} />
        <meshStandardMaterial
          color={isActive ? '#38322D' : '#1E1B19'}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Front Resonant Bronze Plate */}
      <mesh position={[0, 0.7, 0.15]} castShadow>
        <boxGeometry args={[0.32, 1.15, 0.03]} />
        <meshStandardMaterial
          color={AMPHITHEATRE_PALETTE.resonantBronze}
          roughness={0.28}
          metalness={0.8}
        />
      </mesh>

      {/* Soundwave Glyph Indicator */}
      <mesh position={[0, 1.15, 0.18]}>
        <boxGeometry args={[0.22, 0.12, 0.03]} />
        <meshStandardMaterial
          color={stem.color}
          emissive={stem.color}
          emissiveIntensity={isActive ? (hovered ? 2.0 : 1.4) : 0.15}
          roughness={0.1}
        />
      </mesh>

      {/* Luminous Base Status Ring */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.46, 20]} />
        <meshStandardMaterial
          color={stem.color}
          emissive={stem.color}
          emissiveIntensity={isActive ? 0.9 : 0.05}
          transparent
          opacity={isActive ? 0.9 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
