// =============================================================================
// Material Library — shared PBR materials (proxy colors from ART-DIRECTION.md)
// =============================================================================

import * as THREE from 'three';
import { COLORS } from '@/lib/constants';

export interface MaterialDefinition {
  name: string;
  color: string;
  roughness: number;
  metalness: number;
  emissive?: string;
  emissiveIntensity?: number;
  side?: THREE.Side;
}

/** Material definitions from ART-DIRECTION.md §3 + ASSET-PIPELINE.md §5 */
const MATERIAL_DEFINITIONS: Record<string, MaterialDefinition> = {
  marbleWhite: {
    name: 'Marble White',
    color: COLORS.travertine,
    roughness: 0.3,
    metalness: 0.0,
  },
  marbleDark: {
    name: 'Marble Dark',
    color: COLORS.volcanicCharcoal,
    roughness: 0.35,
    metalness: 0.0,
  },
  bronzeAged: {
    name: 'Bronze Aged',
    color: '#6B4E2A',
    roughness: 0.5,
    metalness: 0.8,
  },
  sandstone: {
    name: 'Sandstone',
    color: COLORS.sandstoneGold,
    roughness: 0.7,
    metalness: 0.0,
  },
  tropicalWood: {
    name: 'Tropical Hardwood',
    color: '#7A5232',
    roughness: 0.6,
    metalness: 0.0,
  },
  foliage: {
    name: 'Foliage',
    color: '#2D5A30',
    roughness: 0.75,
    metalness: 0.0,
    side: THREE.DoubleSide,
  },
  interactiveGlow: {
    name: 'Interactive Glow',
    color: COLORS.goldLeaf,
    roughness: 0.3,
    metalness: 0.2,
    emissive: COLORS.goldLeaf,
    emissiveIntensity: 0.5,
  },
};

/** Cache created materials to avoid duplicates */
const materialCache: Map<string, THREE.MeshStandardMaterial> = new Map();

/** Get or create a material by key */
export function getMaterial(key: string): THREE.MeshStandardMaterial {
  if (materialCache.has(key)) {
    return materialCache.get(key)!;
  }

  const def = MATERIAL_DEFINITIONS[key];
  if (!def) {
    console.warn(`[MaterialLibrary] Unknown material: ${key}`);
    return new THREE.MeshStandardMaterial({ color: 0xff00ff }); // Hot pink = missing
  }

  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(def.color),
    roughness: def.roughness,
    metalness: def.metalness,
    side: def.side ?? THREE.FrontSide,
  });

  if (def.emissive) {
    material.emissive = new THREE.Color(def.emissive);
    material.emissiveIntensity = def.emissiveIntensity ?? 0;
  }

  materialCache.set(key, material);
  return material;
}

/** Dispose all cached materials */
export function disposeMaterialLibrary(): void {
  for (const material of materialCache.values()) {
    material.dispose();
  }
  materialCache.clear();
}

export { MATERIAL_DEFINITIONS };
