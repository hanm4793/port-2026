# Performance Architecture & Production Hardening Specification

**Project:** port-2026 / Island of Memory
**Target:** 60fps Desktop Full 3D · Adaptive Quality Fallback · Mobile Story-First
**Status:** Approved Hardening Plan

---

## 1. Production Budgets & Recommended Thresholds

| Metric | Target (Desktop High) | Budget (Mobile / Low Tier) | Hard Ceiling |
|---|---|---|---|
| **Frame Rate** | 60 fps (rock-solid) | 30 — 45 fps | < 30 fps triggers auto-degrade |
| **Visible Triangles** | < 45,000 tris | < 15,000 tris | 80,000 tris total across scene |
| **Draw Calls** | < 75 calls | < 35 calls | 120 calls max |
| **Texture Memory** | < 25 MB | < 8 MB | 50 MB max |
| **Dynamic Shadow Lights** | 1 Key Light (Cascaded) | 0 (Directional no-shadow) | 1 Shadow map max |
| **Device Pixel Ratio (DPR)** | `[1, 1.75]` | `[1, 1.2]` | Never force 3x on mobile OLED |
| **Initial JS Payload** | < 180 KB gzipped | < 180 KB gzipped | 350 KB |
| **Time-to-Interactive (TTI)** | < 1.8s on 4G | < 1.4s on 4G | 2.5s |

---

## 2. Top Bottlenecks Identified & Optimization Actions

### Bottleneck A: All 4 Zones Mounted Concurrently (Zone Frustum / Distance Waste)
- **Problem**: In `Experience.tsx`, `<ShoreZone />`, `<ForumZone />`, `<DinoSanctuaryZone />`, and `<AmphitheatreZone />` were all mounted at once. When the camera is at Shore (`z = 28`), Amphitheatre objects (`z = -54`) were still updating animations and participating in shadow passes.
- **Optimization (Zone Culling & Lazy Mounting)**:
  - Implement active zone proximity gating.
  - In Story Mode: Only render `activeZone` and its immediate adjacent neighbor (`nextZone`). Distant zones are cleanly unmounted from the scene graph.
  - In Explore Mode: Compute Euclidean distance from the avatar; unmount zones further than 45 meters.

### Bottleneck B: High-Frequency CPU Vertex Displacement Loops
- **Problem**: `OceanPlane.tsx` and `BioluminescentPool.tsx` ran CPU vertex displacement loops on 1,800 - 3,200 vertices on every single frame (`needsUpdate = true`).
- **Optimization**:
  - Throttle vertex recalculations to 30Hz or skip when the camera is not facing the water plane.
  - On low tier / mobile: Disable CPU vertex distortion; use texture coordinate offsetting or static PBR normals with zero CPU overhead.

### Bottleneck C: Redundant Point Lights & Shadow Map Passes
- **Problem**: Multiple small point lights were adding unnecessary shader evaluation overhead across materials.
- **Optimization**:
  - Consolidate dynamic lights into 1 single Directional Key Light with a tightly bounded orthographic shadow frustum.
  - Static accent lights (lanterns, alcoves) use simple emissive materials or are culled on low-end hardware.

### Bottleneck D: Mobile Thermal Runaway & Battery Drain
- **Problem**: Continuous WebGL rendering on mobile displays causes high thermal throttling and battery consumption within 60 seconds.
- **Optimization (Mobile Adaptive Fallback)**:
  - On mobile (< 1024px) or low-tier devices: Canvas runs at DPR 1.0, shadow maps are disabled, and heavy vertex animations are parked.
  - Semantic HTML story cards remain 100% interactive, fast, and smooth.

---

## 3. Graceful Fallback Chain (What to Disable First Under Pressure)

```
[Tier 1: Desktop High - 60fps]
   │
   ▼ FPS drops < 30 for 3 seconds
[Tier 2: Desktop Medium - 60fps]
   │ • Disable secondary spot shadows (Keep Key Directional shadow)
   │ • Reduce DPR ceiling from 2.0 to 1.5
   │ • Halve CPU wave vertex resolution (30Hz throttle)
   │
   ▼ FPS remains < 30 for another 3 seconds
[Tier 3: Low Tier / Mobile 3D - 30fps]
   │ • Turn OFF all dynamic shadows completely (`castShadow = false`)
   │ • Freeze CPU vertex animations; use static materials
   │ • Lock DPR to 1.0 (eliminates mobile GPU fill-rate choke)
   │ • Unmount all zones except current active zone
   │
   ▼ WebGL Context Lost / Very Low Memory Device
[Tier 4: Pure Semantic HTML Story-First]
   │ • Unmount WebGL Canvas completely
   │ • Render full rich CSS/DOM storytelling layout with complete case-study accessibility
```

---

## 4. Code-Level Implementation Plan

1. **`useQualityStore.ts`**: Expand with device heuristics (`isMobile`, `dprCap`, `maxActiveZones`), auto-degradation timers, and manual tier selection.
2. **`QualityManager.ts`**: Benchmark device GPU capability on mount (WebGL renderer string, max texture size, hardware concurrency) and drive auto-degrade.
3. **`ZoneContainer.tsx`**: Spatial zone mount/cull wrapper that unmounts zones when out of range.
4. **`Experience.tsx`**: Wrap all 4 zones in `ZoneContainer`, set dynamic DPR, and optimize shadow passes.
5. **`OceanPlane.tsx`**: Frame-skip vertex updates on medium/low tiers.
6. **Unit Tests (`tests/unit/quality-manager.test.ts`)**: Verify auto-degradation logic, feature flag resolution, and zone culling distance math.
