// =============================================================================
// Three.js helper utilities
// =============================================================================

import * as THREE from 'three';

/** Dispose a Three.js object and its children recursively */
export function disposeObject(obj: THREE.Object3D): void {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry?.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach((mat) => disposeMaterial(mat));
      } else if (child.material) {
        disposeMaterial(child.material);
      }
    }
  });
}

/** Dispose a material and its textures */
function disposeMaterial(material: THREE.Material): void {
  material.dispose();

  // Dispose textures on known material types
  if ('map' in material) {
    const mat = material as THREE.MeshStandardMaterial;
    mat.map?.dispose();
    mat.normalMap?.dispose();
    mat.roughnessMap?.dispose();
    mat.metalnessMap?.dispose();
    mat.aoMap?.dispose();
    mat.emissiveMap?.dispose();
  }
}

/** Create a basic PBR material from color and properties */
export function createProxyMaterial(
  color: string,
  roughness: number = 0.5,
  metalness: number = 0.0,
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness,
    metalness,
  });
}

/** Linear interpolation between two Vector3s */
export function lerpVector3(
  out: THREE.Vector3,
  a: THREE.Vector3,
  b: THREE.Vector3,
  t: number,
): THREE.Vector3 {
  out.x = a.x + (b.x - a.x) * t;
  out.y = a.y + (b.y - a.y) * t;
  out.z = a.z + (b.z - a.z) * t;
  return out;
}
