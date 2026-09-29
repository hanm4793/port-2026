'use client';

// =============================================================================
// Ocean Plane — animated water with shore edge treatment
// =============================================================================
//
// QA Fix: 
// - Vertex colors for deep→shallow gradient
// - Foam line at shore edge (white strip)
// - Stronger wave amplitude

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function OceanPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.PlaneGeometry>(null);
  const origRef = useRef<Float32Array | null>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(120, 60, 80, 40);
    geoRef.current = geo;
    origRef.current = Float32Array.from(geo.attributes.position.array);

    // Add vertex colors for depth gradient
    const colors = new Float32Array(geo.attributes.position.count * 3);
    const pos = geo.attributes.position;

    const deepColor = new THREE.Color('#1A5C5A');     // deep teal
    const midColor = new THREE.Color('#2A7A7A');      // mid ocean
    const shallowColor = new THREE.Color('#5AADA8');  // shallow turquoise
    const foamColor = new THREE.Color('#D8E8E4');     // near-white foam

    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i); // plane Y → depth from shore

      let color: THREE.Color;
      if (y < -18) {
        // Near shore → foam/shallow
        const t = Math.max(0, (y + 25) / 7);
        color = foamColor.clone().lerp(shallowColor, t);
      } else if (y < 0) {
        // Mid water
        const t = (y + 18) / 18;
        color = shallowColor.clone().lerp(midColor, t);
      } else {
        // Deep water
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

  // Animate waves
  useFrame(({ clock }) => {
    const geo = geoRef.current;
    const orig = origRef.current;
    if (!geo || !orig) return;

    const pos = geo.attributes.position;
    const t = clock.elapsedTime;

    for (let i = 0; i < pos.count; i++) {
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];

      // 4-layer wave — dramatic ocean motion
      const w1 = Math.sin(ox * 0.06 + t * 0.7) * 1.2;          // large slow swell
      const w2 = Math.sin(ox * 0.15 + oy * 0.1 + t * 1.2) * 0.5; // medium rolling wave
      const w3 = Math.sin(ox * 0.4 + oy * 0.3 + t * 2.2) * 0.2;  // small chop
      const w4 = Math.sin(ox * 0.8 + oy * 0.6 + t * 3.0) * 0.08; // fine ripple

      // Shore attenuation — calmer near beach
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
