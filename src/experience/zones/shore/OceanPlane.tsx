'use client';

// =============================================================================
// Ocean Plane — animated water with shore edge treatment & performance gating
// On low-tier / mobile devices without vertexWaves: skips CPU displacement loop,
// preserving valuable CPU cycles and preventing thermal runaway.
// =============================================================================

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useQualityStore } from '@/stores/useQualityStore';

export function OceanPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.PlaneGeometry>(null);
  const origRef = useRef<Float32Array | null>(null);

  const vertexWaves = useQualityStore((s) => s.vertexWaves);
  const frameCount = useRef(0);

  const geometry = useMemo(() => {
    // 60x30 grid resolution for realistic wave crests
    const geo = new THREE.PlaneGeometry(100, 50, 60, 30);
    geoRef.current = geo;
    origRef.current = Float32Array.from(geo.attributes.position.array);

    // Add vertex colors for depth gradient
    const colors = new Float32Array(geo.attributes.position.count * 3);
    const pos = geo.attributes.position;

    const deepColor = new THREE.Color('#1A5C5A');
    const midColor = new THREE.Color('#2A7A7A');
    const shallowColor = new THREE.Color('#5AADA8');
    const foamColor = new THREE.Color('#D8E8E4');

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);

      let color: THREE.Color;
      if (y < -18) {
        const t = Math.max(0, (y + 25) / 7);
        color = foamColor.clone().lerp(shallowColor, t);
      } else if (y < 0) {
        const t = (y + 18) / 18;
        color = shallowColor.clone().lerp(midColor, t);
      } else {
        const t = Math.min(1, y / 20);
        color = midColor.clone().lerp(deepColor, t);
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  // Performance-gated wave animation loop
  useFrame(({ clock }) => {
    // If quality tier disables vertex waves, do not waste CPU cycles
    if (!vertexWaves) return;

    const geo = geoRef.current;
    const orig = origRef.current;
    if (!geo || !orig) return;

    // Throttle: run every 2nd frame on 60fps (30Hz updates) to cut CPU load by 50%
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    const pos = geo.attributes.position;
    const t = clock.elapsedTime;

    for (let i = 0; i < pos.count; i++) {
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];

      // 4-layer wave composite
      const w1 = Math.sin(ox * 0.06 + t * 0.7) * 1.2;
      const w2 = Math.sin(ox * 0.15 + oy * 0.1 + t * 1.2) * 0.5;
      const w3 = Math.sin(ox * 0.4 + oy * 0.3 + t * 2.2) * 0.2;
      const w4 = Math.sin(ox * 0.8 + oy * 0.6 + t * 3.0) * 0.08;

      const att = oy < -15 ? Math.max(0.08, (oy + 25) / 10) : 1.0;

      pos.setZ(i, (w1 + w2 + w3 + w4) * att);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.1, 25]}
      receiveShadow
    >
      <meshStandardMaterial
        vertexColors
        roughness={0.08}
        metalness={0.25}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
