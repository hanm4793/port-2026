'use client';

// =============================================================================
// Interactive Object — R3F component wrapping interactive meshes
// =============================================================================

import { useRef, useState, useCallback, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { interactionManager, type InteractiveObjectConfig } from './InteractionManager';

interface InteractiveObjectProps {
  config: InteractiveObjectConfig;
  children: React.ReactNode;
}

/**
 * Wrapper component that makes a 3D object interactive.
 * Handles hover/click effects and dispatches to InteractionManager.
 */
export function InteractiveObject({ config, children }: InteractiveObjectProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Register with InteractionManager
  useEffect(() => {
    if (groupRef.current) {
      interactionManager.register(groupRef.current, config);
    }
    return () => {
      interactionManager.unregister(config.id);
    };
  }, [config]);

  // Hover effect: scale up
  useFrame(() => {
    if (!groupRef.current) return;
    const targetScale = hovered ? 1.15 : 1.0;
    const current = groupRef.current.scale.x;
    const next = current + (targetScale - current) * 0.1;
    groupRef.current.scale.setScalar(next);
  });

  const handlePointerOver = useCallback(() => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  }, []);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = 'default';
  }, []);

  const handleClick = useCallback(() => {
    interactionManager.handleClick(config);
  }, [config]);

  return (
    <group
      ref={groupRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {children}
    </group>
  );
}
