'use client';

// =============================================================================
// Pipeline Altar — interactive world-building and filmmaking showcase
// Demonstrates the 5-phase production pipeline:
// Lore -> 3D Pre-Vis -> Neural Diffusion -> Scoring -> 4K Master
// =============================================================================

import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SANCTUARY_PALETTE, CINEMATIC_PIPELINE } from './sanctuaryConfig';
import { InteractiveObject } from '@/experience/interaction/InteractiveObject';

export function PipelineAltar() {
  const [activeStep, setActiveStep] = useState(0);
  const orbRef = useRef<THREE.Mesh>(null);

  // Floating heartbeat rotation on central amber relic
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (orbRef.current) {
      orbRef.current.position.y = 2.4 + Math.sin(t * 1.5) * 0.08;
      orbRef.current.rotation.y = t * 0.4;
      orbRef.current.rotation.x = Math.sin(t * 0.6) * 0.15;
    }
  });

  const handleNextStep = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % CINEMATIC_PIPELINE.length);
  }, []);

  return (
    <group position={[3.5, 0, -30]}>
      {/* Tiered Sandstone Altar Dais */}
      <mesh position={[0, 0.25, 0]} receiveShadow onClick={handleNextStep}>
        <cylinderGeometry args={[2.8, 3.2, 0.5, 8]} />
        <meshStandardMaterial
          color={SANCTUARY_PALETTE.sacredSandstone}
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, 0.65, 0]} receiveShadow onClick={handleNextStep}>
        <cylinderGeometry args={[2.0, 2.4, 0.4, 8]} />
        <meshStandardMaterial
          color={SANCTUARY_PALETTE.sacredSandstone}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* Central Relic Pillar */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.6, 1.2, 8]} />
        <meshStandardMaterial
          color={SANCTUARY_PALETTE.volcanicDark}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Interactive Core: Central Amber Embryo / World Relic */}
      <InteractiveObject
        config={{
          id: 'dino-pipeline-altar',
          zone: 'sanctuary',
          overlayId: 'project',
          overlayData: { slug: 'dinosaur-universe-chronicles' },
        }}
      >
        <mesh
          ref={orbRef}
          position={[0, 2.4, 0]}
          castShadow
          onClick={(e) => {
            e.stopPropagation();
            handleNextStep();
          }}
        >
          <icosahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color={CINEMATIC_PIPELINE[activeStep].color}
            emissive={CINEMATIC_PIPELINE[activeStep].color}
            emissiveIntensity={1.3}
            roughness={0.15}
            metalness={0.4}
            transparent
            opacity={0.92}
          />
        </mesh>
      </InteractiveObject>

      {/* 5 Surrounding Stele Pillars — representing the 5 Pipeline Phases */}
      {CINEMATIC_PIPELINE.map((phase, idx) => {
        const angle = (idx / CINEMATIC_PIPELINE.length) * Math.PI * 2;
        const radius = 1.6;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isCurrent = idx === activeStep;

        return (
          <group
            key={phase.step}
            position={[x, 0.8, z]}
            rotation={[0, -angle + Math.PI / 2, 0]}
            onClick={(e) => {
              e.stopPropagation();
              setActiveStep(idx);
            }}
          >
            {/* Stele Body */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.3, isCurrent ? 1.5 : 1.1, 0.15]} />
              <meshStandardMaterial
                color={isCurrent ? '#403A34' : SANCTUARY_PALETTE.sacredSandstone}
                roughness={0.6}
                metalness={0.1}
              />
            </mesh>

            {/* Glyph Inlay */}
            <mesh position={[0, isCurrent ? 1.1 : 0.8, 0.08]}>
              <boxGeometry args={[0.16, 0.16, 0.02]} />
              <meshStandardMaterial
                color={phase.color}
                emissive={phase.color}
                emissiveIntensity={isCurrent ? 1.4 : 0.25}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}

      {/* Ambient Altar Point Light */}
      <pointLight
        position={[0, 2.4, 0]}
        color={CINEMATIC_PIPELINE[activeStep].color}
        intensity={2.2}
        distance={12}
        decay={2}
      />
    </group>
  );
}
