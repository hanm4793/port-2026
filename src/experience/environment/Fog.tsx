'use client';

// =============================================================================
// Fog — atmospheric depth with warm-cool gradient
// =============================================================================
//
// QA Fix: Fog color should NOT match the background.
// Use a warm atmospheric haze color that creates depth separation.
// Linear fog for more control over near/far than exponential.

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export function Fog() {
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    // Linear fog: starts fading at 40m, fully fogged at 120m
    // Color: warm atmospheric haze, NOT the same as sky or background
    scene.fog = new THREE.Fog('#C8B8A8', 40, 120);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return null;
}
