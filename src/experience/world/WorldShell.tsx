'use client';

// =============================================================================
// WorldShell — Layer 1: Always-visible continuous world backbone
// Guarantees:
// 1. Continuous terrain spine from Shore (z = 32) to Summit Mountain (z = -92)
// 2. Continuous Sacred Way (Via Sacra) road silhouette connecting all zones
// 3. Summit Beacon mountain rock mass & radiant lighthouse (never culled!)
// 4. Honest Agora of Growth continuity proxy (terraced marketplace + fountain)
// =============================================================================

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function WorldShell() {
  return (
    <group name="WorldShell">
      {/* ── Continuous Island Geological Spine ─────────────────────────── */}
      <IslandTerrainSpine />

      {/* ── Continuous Sacred Way Road Spine ───────────────────────────── */}
      <SacredWayRoadSpine />

      {/* ── Agora of Growth Continuity Proxy (Marketplace Terrace) ─────── */}
      <AgoraContinuityProxy />

      {/* ── Summit Mountain Rock Mass & Radiant Beacon Landmark ─────────── */}
      <SummitBeaconLandmark />
    </group>
  );
}

// ─── 1. Island Terrain Spine (Continuous ground z = 32 to -92) ───────────────

function IslandTerrainSpine() {
  const geometry = useMemo(() => {
    // 40m wide, 126m long covering the full island extent
    const geo = new THREE.PlaneGeometry(42, 126, 32, 48);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i); // plane Y -> world Z (centered at z = -30)
      const worldZ = -30 - y;

      let elevation = 0;

      // Shore zone (z = 32 .. 0)
      if (worldZ > 0) {
        elevation = 0.05 + Math.sin(x * 0.3) * 0.04;
      }
      // Forum zone (z = 0 .. -15)
      else if (worldZ > -15) {
        elevation = 0.4 + Math.sin(x * 0.2) * 0.03;
      }
      // Agora & transition (z = -15 .. -21)
      else if (worldZ > -21) {
        elevation = 0.2 + ((-worldZ - 15) / 6.0) * 0.1;
      }
      // Dino Sanctuary basin (z = -21 .. -40)
      else if (worldZ > -40) {
        const distFromCenter = Math.abs(x) / 16.0;
        elevation = 0.1 + Math.pow(distFromCenter, 2) * 1.2;
      }
      // Amphitheatre terrace (z = -40 .. -66)
      else if (worldZ > -66) {
        elevation = 0.15 + ((-worldZ - 40) / 26.0) * 0.8;
      }
      // Summit Mountain Slope (z = -66 .. -92)
      else {
        const mountainT = (-worldZ - 66) / 26.0;
        const mountainCup = Math.max(0, 1 - Math.abs(x) / 18.0);
        elevation = 0.95 + mountainT * 9.5 * mountainCup;
      }

      pos.setZ(i, elevation);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.05, -30]}
      receiveShadow
    >
      <meshStandardMaterial
        color="#231F1C"
        roughness={0.92}
        metalness={0.05}
      />
    </mesh>
  );
}

// ─── 2. Continuous Sacred Way (Via Sacra) Road Spine ─────────────────────────

function SacredWayRoadSpine() {
  return (
    <group position={[0, 0.02, 0]}>
      {/* Segment: Forum Exit (z = -14.5) through Agora (z = -18) to Dino (z = -22) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -18.2]} receiveShadow>
        <planeGeometry args={[3.2, 7.5]} />
        <meshStandardMaterial color="#6B6258" roughness={0.82} />
      </mesh>

      {/* Segment: Amphitheatre (z = -64) climbing mountain up to Beacon (z = -78) */}
      <mesh
        rotation={[-Math.PI * 0.38, 0, 0]}
        position={[0, 3.8, -71.5]}
        receiveShadow
      >
        <planeGeometry args={[3.0, 15.0]} />
        <meshStandardMaterial color="#6B6258" roughness={0.82} />
      </mesh>
    </group>
  );
}

// ─── 3. Agora of Growth Continuity Proxy (Terraced Marketplace) ──────────────

function AgoraContinuityProxy() {
  return (
    <group position={[3.5, 0, -18.0]} name="AgoraContinuityProxy">
      {/* Raised Classical Marketplace Terrace */}
      <mesh position={[0, 0.45, 0]} receiveShadow>
        <boxGeometry args={[14.0, 0.35, 6.5]} />
        <meshStandardMaterial color="#BFA276" roughness={0.65} metalness={0.05} />
      </mesh>

      {/* Stoa Colonnade: 6 Doric Pillars along back of marketplace */}
      {[-5.0, -3.0, -1.0, 1.0, 3.0, 5.0].map((x, i) => (
        <group key={i} position={[x, 0.65, -2.4]}>
          <mesh position={[0, 1.4, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.25, 2.6, 8]} />
            <meshStandardMaterial color="#D8CDB8" roughness={0.35} />
          </mesh>
          <mesh position={[0, 2.8, 0]} castShadow>
            <boxGeometry args={[0.65, 0.2, 0.65]} />
            <meshStandardMaterial color="#D8CDB8" roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Stoa Architrave Roof Beam */}
      <mesh position={[0, 3.65, -2.4]} castShadow>
        <boxGeometry args={[12.5, 0.35, 0.9]} />
        <meshStandardMaterial color="#C8BCA8" roughness={0.4} />
      </mesh>

      {/* Central Growth Fountain Basin (Continuity Proxy) */}
      <group position={[0, 0.65, 0.6]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[1.5, 1.7, 0.4, 8]} />
          <meshStandardMaterial color="#3A3430" roughness={0.7} />
        </mesh>
        {/* Luminous Fountain Water Surface */}
        <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.35, 8]} />
          <meshStandardMaterial
            color="#5AADA8"
            emissive="#5AADA8"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>
        {/* Central Bronze Spout */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.15, 0.8, 6]} />
          <meshStandardMaterial color="#8B6D3A" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// ─── 4. Summit Mountain Rock Mass & Radiant Beacon Landmark ───────────────────

function SummitBeaconLandmark() {
  const lightRef = useRef<THREE.PointLight>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Atmospheric beacon pulse
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (lightRef.current) {
      lightRef.current.intensity = 5.5 + Math.sin(t * 0.8) * 2.0;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.4;
      coreRef.current.rotation.z = Math.sin(t * 0.6) * 0.2;
    }
  });

  return (
    <group position={[0, 0, -78.0]} name="SummitBeacon">
      {/* ── Massive Sculpted Mountain Rock Base ──────────────────────────── */}
      <mesh position={[0, 4.0, 0]} castShadow receiveShadow>
        <dodecahedronGeometry args={[11.0, 1]} />
        <meshStandardMaterial color="#1C1A18" roughness={0.94} metalness={0.05} />
      </mesh>
      <mesh position={[-5, 7.5, -2]} castShadow receiveShadow>
        <dodecahedronGeometry args={[6.5, 0]} />
        <meshStandardMaterial color="#24201D" roughness={0.92} metalness={0.05} />
      </mesh>
      <mesh position={[5, 7.5, -2]} castShadow receiveShadow>
        <dodecahedronGeometry args={[6.5, 0]} />
        <meshStandardMaterial color="#24201D" roughness={0.92} metalness={0.05} />
      </mesh>

      {/* ── Summit Stone Platform & Circular Belvedere Observation Ring ──── */}
      <mesh position={[0, 11.2, 0]} receiveShadow>
        <cylinderGeometry args={[4.5, 5.2, 0.8, 16]} />
        <meshStandardMaterial color="#DDD4C6" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* Belvedere Perimeter Columns */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x = Math.cos(a) * 3.8;
        const z = Math.sin(a) * 3.8;
        return (
          <mesh key={i} position={[x, 12.6, z]} castShadow>
            <cylinderGeometry args={[0.16, 0.2, 2.0, 8]} />
            <meshStandardMaterial color="#D8CDB8" roughness={0.3} />
          </mesh>
        );
      })}

      {/* Belvedere Circular Entablature */}
      <mesh position={[0, 13.8, 0]}>
        <cylinderGeometry args={[4.2, 4.4, 0.4, 16]} />
        <meshStandardMaterial color="#C8BCA8" roughness={0.4} />
      </mesh>

      {/* ── Central Monumental Beacon Tower (Height ~20m) ─────────────────── */}
      <mesh position={[0, 15.5, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1.2, 3.5, 8]} />
        <meshStandardMaterial color="#2A2624" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Radiant Floating Beacon Relic / Signal Lens Core */}
      <mesh ref={coreRef} position={[0, 18.2, 0]}>
        <octahedronGeometry args={[0.85]} />
        <meshStandardMaterial
          color="#C9A84C"
          emissive="#C9A84C"
          emissiveIntensity={3.5}
          roughness={0.1}
          metalness={0.4}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Radiant Point Light (Illuminates summit & mountain rocks) */}
      <pointLight
        ref={lightRef}
        position={[0, 18.2, 0]}
        color="#FFE29E"
        intensity={6.0}
        distance={180}
        decay={2}
      />
    </group>
  );
}
