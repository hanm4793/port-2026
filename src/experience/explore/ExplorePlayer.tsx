'use client';

// =============================================================================
// ExplorePlayer — Kinematic Navigator avatar for Explore Mode
// Features:
// - Luminous crystalline probe with responsive WASD / Arrow key movement
// - Smooth rotation towards movement direction & gentle hover physics
// - Island realm boundary clamping (x: -15..15, z: -66..18)
// - Proximity detection to Memory Seals (triggers [E] prompt)
// =============================================================================

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useExploreStore, MEMORY_SEALS } from '@/stores/useExploreStore';
import { useExperienceStore } from '@/stores/useExperienceStore';

const _moveDir = new THREE.Vector3();
const _camForward = new THREE.Vector3();
const _camRight = new THREE.Vector3();

export function ExplorePlayer() {
  const meshRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const mode = useExperienceStore((s) => s.mode);
  const keys = useExploreStore((s) => s.keys);
  const setKey = useExploreStore((s) => s.setKey);
  const playerPos = useExploreStore((s) => s.playerPosition);
  const setPlayerPos = useExploreStore((s) => s.setPlayerPosition);
  const setPlayerRotY = useExploreStore((s) => s.setPlayerRotationY);
  const setIsMoving = useExploreStore((s) => s.setIsMoving);
  const orbitAngleX = useExploreStore((s) => s.orbitAngleX);
  const setNearSealId = useExploreStore((s) => s.setNearSealId);
  const openSeal = useExploreStore((s) => s.openSeal);

  // Keyboard Event Listeners
  useEffect(() => {
    if (mode !== 'explore') return;

    const onKeyDown = (e: KeyboardEvent) => {
      // Prevent scrolling page when moving in explore mode
      if (['KeyW', 'KeyS', 'KeyA', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === 'KeyW' || e.code === 'ArrowUp') setKey('forward', true);
      if (e.code === 'KeyS' || e.code === 'ArrowDown') setKey('backward', true);
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') setKey('left', true);
      if (e.code === 'KeyD' || e.code === 'ArrowRight') setKey('right', true);

      // 'E' to interact with nearby seal
      if (e.code === 'KeyE') {
        const state = useExploreStore.getState();
        if (state.nearSealId) {
          const target = MEMORY_SEALS.find((s) => s.id === state.nearSealId);
          if (target) openSeal(target);
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') setKey('forward', false);
      if (e.code === 'KeyS' || e.code === 'ArrowDown') setKey('backward', false);
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') setKey('left', false);
      if (e.code === 'KeyD' || e.code === 'ArrowRight') setKey('right', false);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [mode, setKey, openSeal]);

  // Per-frame Kinematic Movement Loop
  useFrame((_, delta) => {
    if (mode !== 'explore' || !meshRef.current) return;

    const speed = 7.5; // m/s
    _moveDir.set(0, 0, 0);

    // Compute camera relative directions based on orbitAngleX
    _camForward.set(Math.sin(orbitAngleX), 0, Math.cos(orbitAngleX)).normalize().negate();
    _camRight.set(-Math.cos(orbitAngleX), 0, Math.sin(orbitAngleX)).normalize().negate();

    if (keys.forward) _moveDir.add(_camForward);
    if (keys.backward) _moveDir.sub(_camForward);
    if (keys.left) _moveDir.sub(_camRight);
    if (keys.right) _moveDir.add(_camRight);

    const isMoving = _moveDir.lengthSq() > 0.001;
    setIsMoving(isMoving);

    if (isMoving) {
      _moveDir.normalize();

      // Update position
      const nextX = THREE.MathUtils.clamp(playerPos[0] + _moveDir.x * speed * delta, -14.5, 14.5);
      const nextZ = THREE.MathUtils.clamp(playerPos[2] + _moveDir.z * speed * delta, -64.0, 16.0);

      // Compute natural terrain elevation
      let groundY = 1.0;
      if (nextZ > 2.0) groundY = 0.9; // Shore
      else if (nextZ > -15.0) groundY = 1.2; // Forum
      else if (nextZ > -38.0) groundY = 0.95; // Dino Sanctuary
      else groundY = 1.35; // Amphitheatre

      setPlayerPos([nextX, groundY, nextZ]);

      // Rotate avatar towards movement direction
      const targetRotation = Math.atan2(_moveDir.x, _moveDir.z);
      const currentRot = meshRef.current.rotation.y;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(currentRot, targetRotation, 0.15);
      setPlayerRotY(meshRef.current.rotation.y);
    }

    // Sync mesh position
    meshRef.current.position.set(playerPos[0], playerPos[1], playerPos[2]);

    // Idle hover animation on probe core & ring
    const t = performance.now() * 0.001;
    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(t * 2.5) * 0.06;
      coreRef.current.rotation.y = t * 0.8;
      coreRef.current.rotation.x = Math.sin(t * 1.2) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 1.2;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 1.5) * 0.15;
    }

    // Check proximity to Memory Seals
    let foundNearby: string | null = null;
    for (const seal of MEMORY_SEALS) {
      const dx = playerPos[0] - seal.position[0];
      const dz = playerPos[2] - seal.position[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < 3.2) {
        foundNearby = seal.id;
        break;
      }
    }
    setNearSealId(foundNearby);
  });

  if (mode !== 'explore') return null;

  return (
    <group ref={meshRef} position={playerPos}>
      {/* Outer Protective Crystalline Shell */}
      <mesh castShadow>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Inner Glowing Seeker Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color="#6BA3C7"
          emissive="#6BA3C7"
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Orbiting Resonant Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.48, 0.015, 8, 24]} />
        <meshStandardMaterial
          color="#F5F0E6"
          emissive="#C9A84C"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* Soft Ground Illumination */}
      <pointLight color="#FFE2A8" intensity={1.4} distance={6} decay={2} position={[0, 0.2, 0]} />

      {/* Shadow Projection Disk */}
      <mesh position={[0, -0.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
