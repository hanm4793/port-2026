'use client';

// =============================================================================
// ExploreFollowCamera — elevated third-person follow camera for Explore Mode
// Features:
// - Smooth follow behind ExplorePlayer avatar
// - Mouse drag / touch drag orbiting without pointer lock
// - Scroll wheel zoom (3.5m to 14.0m)
// - Gentle damping to prevent camera jitter
// =============================================================================

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useExploreStore } from '@/stores/useExploreStore';
import { useExperienceStore } from '@/stores/useExperienceStore';

const _targetLook = new THREE.Vector3();
const _desiredPos = new THREE.Vector3();

export function ExploreFollowCamera() {
  const { gl } = useThree();
  const mode = useExperienceStore((s) => s.mode);

  const playerPos = useExploreStore((s) => s.playerPosition);
  const orbitAngleX = useExploreStore((s) => s.orbitAngleX);
  const orbitAngleY = useExploreStore((s) => s.orbitAngleY);
  const cameraDistance = useExploreStore((s) => s.cameraDistance);
  const setOrbitAngles = useExploreStore((s) => s.setOrbitAngles);
  const setCameraDistance = useExploreStore((s) => s.setCameraDistance);

  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Pointer drag to orbit camera around avatar
  useEffect(() => {
    if (mode !== 'explore') return;

    const domElement = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      // Only drag if clicking canvas directly
      if (e.target !== domElement) return;
      isDragging.current = true;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      const state = useExploreStore.getState();
      const newAngleX = state.orbitAngleX - dx * 0.006;
      // Clamp pitch so camera stays above ground and doesn't flip
      const newAngleY = THREE.MathUtils.clamp(state.orbitAngleY + dy * 0.005, 0.15, 1.25);
      setOrbitAngles(newAngleX, newAngleY);
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      // Zoom in/out with mouse wheel in explore mode
      e.preventDefault();
      const state = useExploreStore.getState();
      const nextDist = THREE.MathUtils.clamp(state.cameraDistance + e.deltaY * 0.008, 3.5, 14.0);
      setCameraDistance(nextDist);
    };

    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('wheel', onWheel);
    };
  }, [mode, gl, setOrbitAngles, setCameraDistance]);

  // Per-frame Follow Camera Loop
  useFrame(({ camera }) => {
    if (mode !== 'explore') return;

    // Spherical coordinates from player position
    const radius = cameraDistance;
    const phi = Math.PI / 2 - orbitAngleY; // Elevation from equator
    const theta = orbitAngleX; // Azimuth

    _desiredPos.set(
      playerPos[0] + radius * Math.cos(phi) * Math.sin(theta),
      playerPos[1] + radius * Math.sin(phi) + 0.6,
      playerPos[2] + radius * Math.cos(phi) * Math.cos(theta)
    );

    // Target is slightly above the player avatar
    _targetLook.set(playerPos[0], playerPos[1] + 0.6, playerPos[2]);

    // Smooth damp towards desired position and target
    const damp = 0.1;
    camera.position.lerp(_desiredPos, damp);

    // LookAt smoothed
    const currentTarget = new THREE.Vector3();
    camera.getWorldDirection(currentTarget);
    camera.lookAt(_targetLook);
  });

  return null;
}
