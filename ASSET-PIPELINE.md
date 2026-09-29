# 3D Asset Pipeline v1 — Production Specification

**Project:** port-2026 / Island of Memory
**Date:** 2026-09-26
**Status:** Specification — no assets produced yet
**Related:** DESIGN.md (main design doc), BENCHMARK-ZONE.md (first build target)

---

## 1. Asset Categories

| Category | Description | Quantity estimate (all zones) | Priority |
|----------|------------|-------------------------------|----------|
| Terrain | Island ground, elevation, zone boundaries | 1 unified mesh or 8 zone tiles | High — needed for spatial layout |
| Environment kit | Modular walls, floors, columns, arches, stairs, platforms | 15-25 unique pieces, instanced | High — defines space |
| Hero landmarks | One signature focal piece per zone | 8 total (1 for benchmark) | High — visual identity |
| Decorative props | Small objects: tools, scrolls, lanterns, books, instruments | 20-40 across all zones | Low — added after kit works |
| Vegetation | Trees, bushes, grass, ground cover | 5-10 unique, heavily instanced | Medium — atmosphere |
| Water | Ocean plane, optional rivers/ponds | 1 shader-driven plane | Medium — atmosphere |
| Sky | Background environment | 1 HDRI or procedural shader | Medium — first impression |
| Interactive objects | Clickable items triggering UI overlays | 2-3 per zone = 16-24 total | High — core mechanic |

---

## 2. Folder Structure

```
public/
  assets/
    manifest.json              # Asset registry (see section 10)
    terrain/
      island-ground.glb
      island-ground-lod1.glb
    env-kit/
      column-doric.glb
      column-doric-lod1.glb
      wall-segment-3m.glb
      arch-roman.glb
      floor-tile-2m.glb
      stairs-4step.glb
      platform-round.glb
    landmarks/
      atelier-workbench.glb
      forum-system-table.glb
      agora-fountain.glb
      amphitheatre-stage.glb
      sanctuary-fossil-arch.glb
      temple-horizon-terrace.glb
      beacon-tower.glb
      shore-gate.glb
    props/
      atelier/
        chisel.glb
        scroll-open.glb
        ink-pot.glb
      forum/
        gear-large.glb
        circuit-board.glb
      ...per zone subdirectory
    vegetation/
      palm-tree.glb
      bush-tropical.glb
      grass-patch.glb
    interactive/
      atelier/
        portfolio-crystal.glb
        about-tablet.glb
      forum/
        project-node-01.glb
      ...per zone subdirectory
    textures/
      shared/
        marble-albedo.webp
        marble-normal.webp
        marble-roughness.webp
        bronze-albedo.webp
        bronze-normal.webp
        stone-albedo.webp
      atelier/
        ...zone-specific textures
      forum/
        ...
    hdri/
      golden-hour.hdr
    audio/
      atelier-ambient.mp3
      coastal-waves.mp3
```

---

## 3. Naming Convention

### Files

```
[category]-[descriptor]-[variant][-lodN].glb
```

| Part | Rule | Example |
|------|------|---------|
| category | Asset category prefix | `column`, `wall`, `prop`, `landmark` |
| descriptor | What it is, kebab-case | `doric`, `segment-3m`, `workbench` |
| variant | Optional style variant | `weathered`, `intact`, `overgrown` |
| lodN | LOD level (omit for LOD0) | `-lod1`, `-lod2` |

Examples:
- `column-doric.glb` (LOD0)
- `column-doric-lod1.glb` (simplified)
- `wall-segment-3m-weathered.glb`
- `landmark-workbench.glb`

### Textures

```
[material]-[map-type].webp
```

Map types: `albedo`, `normal`, `roughness`, `metallic`, `ao`, `emissive`, `height`

Examples:
- `marble-albedo.webp`
- `marble-normal.webp`
- `bronze-roughness.webp`

### Internal naming (Blender)

- Mesh objects: `GEO_[descriptor]` (e.g., `GEO_Column_Doric`)
- Materials: `MAT_[material]` (e.g., `MAT_Marble_White`)
- Armatures: `RIG_[descriptor]` (if animated)
- Empty/locators: `LOC_[purpose]` (e.g., `LOC_Interaction_Point`)
- Collections: `COL_[zone]_[category]` (e.g., `COL_Atelier_EnvKit`)

---

## 4. Blender-to-glTF Workflow

### Step 1: Modeling (Blender 4.x)

1. Model at the target poly budget (see section 7)
2. Use real-world scale: 1 Blender unit = 1 meter
3. Apply all transforms (Ctrl+A → All Transforms)
4. Set origin to geometric center or base-center for kit pieces
5. Clean up: remove doubles, recalculate normals, delete loose geometry
6. Name objects using the internal convention above

### Step 2: UV Unwrap

1. Every mesh must have UVs — no auto-generated UVs at export time
2. Use smart UV project for blockout/proxy; manual unwrap for final
3. Texel density target: 512px per meter for props, 256px per meter for environment kit
4. No overlapping UVs unless using a shared-atlas workflow

### Step 3: Materials in Blender

1. Use Principled BSDF only — it maps directly to glTF PBR
2. Set Base Color, Metallic, Roughness, Normal Map, Emissive as needed
3. Do NOT use Blender-specific nodes that won't export (e.g., procedural noise as final texture — bake it first)
4. Bake procedural textures to image textures before export

### Step 4: Export Settings

```
Format:             glTF Binary (.glb)
Include:            Selected Objects only
Transform:          +Y Up (default)
Geometry:
  Apply Modifiers:  Yes
  UVs:              Yes
  Normals:          Yes
  Vertex Colors:    Yes (if used)
  Materials:        Export
  Images:           None (textures exported separately as WebP)
  Compression:      None (Draco applied post-export)
Animation:
  Include if rigged, otherwise skip
```

**Why separate textures?** Textures are exported as WebP separately and referenced
in the manifest. This allows texture swapping, resolution variants, and shared textures
across multiple meshes without duplicating data inside .glb files.

### Step 5: Automation (optional)

If production volume increases, create a Blender Python export script:
```
scripts/
  blender-export.py    # Batch export selected collections to glb
  validate-scene.py    # Check naming, transforms, poly counts before export
```

---

## 5. Material Rules

| Rule | Specification |
|------|--------------|
| Shader model | PBR metallic-roughness (glTF standard) |
| Material slots | Max 3 materials per mesh (reduces draw calls) |
| Shared materials | Environment kit pieces sharing the same material must reference the same texture files |
| Proxy materials | Flat color (no textures) with correct roughness/metallic values to establish look |
| Final materials | Full texture set: albedo + normal + roughness (minimum), metallic + AO + emissive (optional) |
| Transparency | Avoid where possible; use alpha-test (cutout) over alpha-blend when needed |
| Emissive | Used sparingly for interactive object glow, circuit lines, magic effects |
| Double-sided | Off by default; enable only for foliage/cloth |

### Material Library (shared across biomes)

| Material | Use | Proxy representation |
|----------|-----|---------------------|
| Marble white | Columns, floors, statues | `#E8DFD0` flat, roughness 0.3 |
| Marble dark | Accents, borders | `#3A3632` flat, roughness 0.35 |
| Bronze aged | Machinery, fixtures, accents | `#6B4E2A` flat, metallic 0.8, roughness 0.5 |
| Sandstone | Temple walls, Egyptian elements | `#C4A777` flat, roughness 0.7 |
| Tropical wood | Stage, Vietnamese elements | `#7A5232` flat, roughness 0.6 |
| Stone dark | Arena, volcanic elements | `#4A4A4A` flat, roughness 0.8 |
| Water | Ocean, ponds | Shader-driven, not textured |
| Foliage | Vegetation | `#3D6B3D` flat, double-sided |
| Glow interactive | Clickable objects | Emissive, animated pulse |

---

## 6. Texture Rules

| Rule | Specification |
|------|--------------|
| Format | WebP (lossy, quality 80) for color maps; WebP (lossless) for normal maps |
| Fallback | AVIF where supported, WebP everywhere else; no PNG/JPEG in production |
| Resolution tiers | Props: 512x512; Env kit: 1024x1024; Hero landmarks: 2048x2048; Terrain: 2048x2048 |
| Power of two | All textures must be power-of-two dimensions (256, 512, 1024, 2048) |
| Max resolution | 2048x2048 — no 4K textures for web |
| Channel packing | Pack roughness (R), metallic (G), AO (B) into one RGB texture where applicable |
| Mip maps | Generated at runtime by Three.js (default behavior) |
| Texture atlasing | Consider for env kit pieces sharing materials; not required for v1 |
| Compression | WebP lossy at quality 80 typically achieves 70-85% size reduction vs PNG |

### Texture Budget per Zone

| Zone | Max texture data (compressed) |
|-------|------------------------------|
| Benchmark (Atelier) | < 2MB |
| Each additional zone | < 2MB |
| Shared textures | < 1MB |
| Total all biomes | < 12MB |

---

## 7. Geometry Rules

| Rule | Specification |
|------|--------------|
| Coordinate system | Y-up, 1 unit = 1 meter |
| Grid snapping | Kit pieces snap to 2m grid; props are free-placed |
| Poly budget: prop | < 500 triangles |
| Poly budget: env kit piece | < 2,000 triangles |
| Poly budget: hero landmark | < 10,000 triangles |
| Poly budget: terrain tile | < 20,000 triangles |
| Poly budget: full zone (all instances) | < 50,000 triangles |
| Poly budget: full scene (all loaded biomes) | < 200,000 triangles |
| LOD strategy | LOD0: full detail; LOD1: 50% reduction; LOD2: billboard or hidden |
| LOD distances | LOD0: 0-20m; LOD1: 20-50m; LOD2: 50m+ (or hidden) |
| Instancing | Repeated geometry (columns, tiles, vegetation) must use R3F `<Instances>` |
| Merge rule | Static geometry within a zone that shares materials can be merged to reduce draw calls |
| Origin | Kit pieces: bottom-center; Props: bottom-center; Landmarks: bottom-center |
| Proxy geometry | Use Three.js primitives (BoxGeometry, CylinderGeometry, SphereGeometry) — no .glb files needed |

---

## 8. Optimization and Compression Steps

### Pipeline: Blender → Optimize → Compress → Deploy

```
[Blender .blend]
    ↓ Export (glTF Binary, no textures embedded)
[Raw .glb]
    ↓ gltf-transform optimize (merge, dedup, flatten)
[Optimized .glb]
    ↓ gltf-transform draco (geometry compression)
[Compressed .glb]
    ↓ Copy to public/assets/
[Production asset]
```

### Tool: gltf-transform

Install: `pnpm add -D @gltf-transform/cli`

Optimization pass:
```bash
npx gltf-transform optimize input.glb optimized.glb \
  --compress draco \
  --texture-compress webp
```

Or step by step:
```bash
# Step 1: Deduplicate accessors, merge meshes
npx gltf-transform dedup input.glb deduped.glb

# Step 2: Flatten node hierarchy (if no animation)
npx gltf-transform flatten deduped.glb flat.glb

# Step 3: Draco compress geometry
npx gltf-transform draco flat.glb compressed.glb

# Step 4: Resize/compress textures (if embedded)
npx gltf-transform resize compressed.glb final.glb --width 1024 --height 1024
```

### Automation Script (future)

```
scripts/
  optimize-assets.sh    # Batch process all .glb files in a source directory
  validate-budgets.sh   # Check poly counts, texture sizes against budget
```

### Size Targets After Compression

| Asset type | Raw .glb | After Draco | Target |
|-----------|---------|-------------|--------|
| Prop | ~50KB | ~15KB | < 20KB |
| Env kit piece | ~200KB | ~60KB | < 80KB |
| Hero landmark | ~1MB | ~300KB | < 400KB |
| Terrain tile | ~2MB | ~600KB | < 800KB |

---

## 9. Loading Rules in Next.js

### Dynamic Import Pattern

All 3D components must be dynamically imported to prevent SSR failures:

```typescript
// app/(experience)/layout.tsx or wherever the 3D shell lives
import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('@/components/3d/Scene3D'), {
  ssr: false,
  loading: () => <LoadingScreen />
})
```

### Asset Loading Pattern (R3F + Drei)

```typescript
// Inside a client component within <Canvas>
import { useGLTF } from '@react-three/drei'

// Preload critical assets
useGLTF.preload('/assets/landmarks/atelier-workbench.glb')

function AtelierWorkbench() {
  const { scene } = useGLTF('/assets/landmarks/atelier-workbench.glb')
  return <primitive object={scene} />
}
```

### Draco Decoder

R3F/Drei's `useGLTF` supports Draco automatically. The decoder files should be
served from `/draco/` or use the CDN default:

```typescript
useGLTF('/assets/landmarks/atelier-workbench.glb')
// Drei auto-detects Draco and loads decoder from CDN
```

For self-hosting the decoder:
```
public/
  draco/
    draco_decoder.wasm
    draco_wasm_wrapper.js
```

### Loading Strategy

| Phase | What loads | When |
|-------|-----------|------|
| Initial | HTML shell, critical CSS, JS bundle | Page request |
| Hydration | React hydrates, Zustand initializes | After JS parse |
| 3D bootstrap | R3F canvas mounts, environment (sky/HDRI) loads | After hydration |
| Current zone | Terrain + env kit + landmark for visible zone | Immediately after canvas |
| Interactive objects | Clickable items in current zone | After zone geometry |
| Adjacent zones | Next zone in path (1 ahead) | Idle time / scroll proximity |
| Distant biomes | Remaining biomes | On-demand or background |

### Suspense Boundaries

```typescript
<Canvas>
  <Suspense fallback={<LoadingIndicator3D />}>
    <Terrain />
    <Suspense fallback={null}>
      <CurrentBiome />
    </Suspense>
    <Suspense fallback={null}>
      <AdjacentBiome />
    </Suspense>
  </Suspense>
</Canvas>
```

### Performance Monitoring

- Use `@react-three/drei`'s `usePerf()` in development to track draw calls, triangles, FPS
- Auto-degrade: if FPS drops below 30 for 3+ seconds, reduce quality tier (disable shadows, lower LOD distances, reduce post-processing)

---

## 10. Versioning and Replacement Rules

### Asset Manifest

`public/assets/manifest.json`:
```json
{
  "version": "1.0.0",
  "assets": [
    {
      "id": "atelier-workbench",
      "category": "landmark",
      "zone": "atelier",
      "status": "proxy",
      "file": null,
      "polyBudget": 10000,
      "textureBudget": "2048x2048",
      "proxyType": "composed-primitives",
      "description": "Central workbench with tools — Renaissance crafting table"
    },
    {
      "id": "column-doric",
      "category": "env-kit",
      "zone": "shared",
      "status": "proxy",
      "file": null,
      "polyBudget": 2000,
      "textureBudget": "1024x1024",
      "proxyType": "cylinder-geometry",
      "description": "Classical Doric column, reusable across biomes"
    }
  ]
}
```

### Status Lifecycle

```
proxy → wip → final
```

| Status | Meaning | Asset file |
|--------|---------|-----------|
| `proxy` | Using Three.js primitives in code, no .glb file | `file: null` |
| `wip` | .glb exists but not final quality | `file: "env-kit/column-doric.glb"` |
| `final` | Production quality, approved | `file: "env-kit/column-doric.glb"` |

### Replacement Process

1. Create final .glb in Blender following pipeline (sections 4-8)
2. Run optimization/compression
3. Place file in correct `public/assets/` subdirectory
4. Update manifest: set `status` to `final`, set `file` to path
5. The scene loader reads manifest, sees `file` exists, loads .glb instead of rendering proxy primitive
6. No code changes required — the asset loader handles the switch

### Scene Loader Logic (pseudocode)

```typescript
function useAsset(id: string) {
  const manifest = useManifest()
  const asset = manifest.find(a => a.id === id)

  if (asset.file) {
    // Load the .glb file
    return useGLTF(`/assets/${asset.file}`)
  } else {
    // Return null — component renders proxy primitive
    return null
  }
}
```

---

## 11. Benchmark Budgets for v1

### The Atelier (Benchmark Zone)

| Asset | Count | Poly budget | Texture budget | Status |
|-------|-------|------------|---------------|--------|
| Ground plane | 1 | 200 tris (subdivided plane) | None (shader) | Proxy |
| Walls (box segments) | 4 | 4 × 12 = 48 tris | None (flat color) | Proxy |
| Columns (cylinders) | 4-6 | 6 × 64 = 384 tris | None (flat color) | Proxy |
| Workbench (landmark) | 1 | ~200 tris (composed boxes) | None (flat color) | Proxy |
| Interactive object | 1 | ~100 tris (sphere + glow) | None (emissive shader) | Proxy |
| Sky | 1 | 0 (shader) | 1 HDRI ~500KB | Proxy (gradient shader) |
| **Total benchmark** | — | **< 1,000 tris** | **< 500KB** | All proxy |

### Full Scene Budget (all 8 zones, final)

| Category | Budget |
|----------|--------|
| Total triangles (all instances, all LODs visible) | < 200,000 |
| Total .glb data (Draco compressed) | < 8MB |
| Total texture data (WebP compressed) | < 6MB |
| Total 3D asset payload | < 15MB |
| Draw calls (target) | < 100 |

---

## 12. Build Priority

### Phase 1: Benchmark Zone (The Atelier)

Build first, prove the pipeline:
- [x] Define asset manifest schema
- [ ] Create proxy primitives in R3F code (no .glb files needed)
- [ ] Build asset loader with manifest-based proxy/file switching
- [ ] Implement one complete camera path through the zone
- [ ] Add one interactive object → overlay flow
- [ ] Validate FPS, load time, mobile fallback
- [ ] Establish material library (flat-color proxy versions)

### Phase 2: Pipeline Validation

Before creating any real assets, validate:
- [ ] Blender export → gltf-transform → public/assets/ flow works end-to-end
- [ ] One test asset replaces a proxy without code changes
- [ ] LOD switching works at expected distances
- [ ] Draco loading works across Chrome, Firefox, Safari
- [ ] Texture loading (separate WebP) works correctly

### Phase 3: Iterative Asset Creation

After pipeline is proven:
- [ ] Create env kit pieces (columns, walls, floors) — shared across biomes
- [ ] Create hero landmark for Atelier
- [ ] Add decorative props to Atelier
- [ ] Expand to MVP zones (Shore, Forum, Beacon — share many env kit pieces)
- [ ] Continue zone-by-zone

### Phase 4: Polish and Vegetation

Last priority:
- [ ] Vegetation instancing
- [ ] Water shader refinement
- [ ] Audio integration
- [ ] Post-processing effects (bloom, SSAO, color grading)
