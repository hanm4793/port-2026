'use client';

// =============================================================================
// Experience — root R3F Canvas + subsystem initialization
// =============================================================================

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, Stats, OrbitControls } from '@react-three/drei';
import { worldManager } from '@/experience/world/WorldManager';
import { useQualityStore } from '@/stores/useQualityStore';
import { useExperienceStore } from '@/stores/useExperienceStore';
import { Sky } from './environment/Sky';
import { Lighting } from './environment/Lighting';
import { Fog } from './environment/Fog';
import { ShoreZone } from './zones/shore/ShoreZone';
import { ForumZone } from './zones/forum/ForumZone';
import { DinoSanctuaryZone } from './zones/sanctuary/DinoSanctuaryZone';
import { AmphitheatreZone } from './zones/amphitheatre/AmphitheatreZone';
import { StoryCameraRail } from './story/StoryCameraRail';
import { ExplorePlayer } from './explore/ExplorePlayer';
import { ExploreFollowCamera } from './explore/ExploreFollowCamera';
import { MemoryGlyphs } from './explore/MemoryGlyphs';
import { CAMERA_NEAR, CAMERA_FAR } from '@/lib/constants';
import { SHORE_CAMERAS } from './zones/shore/shoreConfig';

export function Experience() {
  const shadows = useQualityStore((s) => s.shadows);
  const mode = useExperienceStore((s) => s.mode);

  useEffect(() => {
    worldManager.init();
    return () => {
      worldManager.dispose();
    };
  }, []);

  return (
    <Canvas
      camera={{
        fov: SHORE_CAMERAS.hero.fov,
        near: CAMERA_NEAR,
        far: CAMERA_FAR,
        position: SHORE_CAMERAS.hero.position,
      }}
      shadows={shadows}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
      onCreated={({ gl, camera }) => {
        gl.toneMapping = 2;
        gl.toneMappingExposure = 1.0;
        camera.lookAt(
          SHORE_CAMERAS.hero.target[0],
          SHORE_CAMERAS.hero.target[1],
          SHORE_CAMERAS.hero.target[2],
        );
      }}
    >
      <Suspense fallback={null}>
        <Sky />
        <Lighting />
        <Fog />

        <ShoreZone />
        <ForumZone />
        <DinoSanctuaryZone />
        <AmphitheatreZone />

        {/* Story Mode: scroll-driven camera rail */}
        {mode === 'story' && <StoryCameraRail />}

        {/* Explore Mode: Kinematic Navigator avatar + third-person follow camera + discovery seals */}
        {mode === 'explore' && (
          <>
            <ExplorePlayer />
            <ExploreFollowCamera />
            <MemoryGlyphs />
          </>
        )}

        {process.env.NODE_ENV === 'development' && <Stats />}

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
