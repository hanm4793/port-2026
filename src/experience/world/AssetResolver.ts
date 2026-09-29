// =============================================================================
// Asset Resolver — manifest-based proxy/file asset resolution
// =============================================================================

import type { AssetManifest, AssetEntry } from '@/types/manifest';

/**
 * Resolves asset IDs to file paths or null (proxy).
 * Reads from the manifest loaded at runtime.
 */
class AssetResolver {
  private manifest: AssetManifest | null = null;
  private assetMap: Map<string, AssetEntry> = new Map();

  /** Load manifest from public/assets/manifest.json */
  async loadManifest(): Promise<void> {
    try {
      const response = await fetch('/assets/manifest.json');
      if (!response.ok) {
        console.warn('[AssetResolver] No manifest found, using all proxies');
        this.manifest = { version: '0.0.0', assets: [] };
        return;
      }
      this.manifest = await response.json();
      this.assetMap.clear();
      for (const asset of this.manifest!.assets) {
        this.assetMap.set(asset.id, asset);
      }
    } catch {
      console.warn('[AssetResolver] Failed to load manifest, using all proxies');
      this.manifest = { version: '0.0.0', assets: [] };
    }
  }

  /** Get an asset entry by ID */
  getAsset(id: string): AssetEntry | null {
    return this.assetMap.get(id) ?? null;
  }

  /**
   * Resolve an asset ID to a file path.
   * Returns null if the asset is in proxy state (no .glb file).
   */
  resolveFile(id: string): string | null {
    const asset = this.assetMap.get(id);
    if (!asset || !asset.file) return null;
    return `/assets/${asset.file}`;
  }

  /** Check if an asset has a real file (not proxy) */
  isProxy(id: string): boolean {
    const asset = this.assetMap.get(id);
    return !asset || !asset.file;
  }

  /** Get all assets for a specific zone */
  getZoneAssets(zone: string): AssetEntry[] {
    return Array.from(this.assetMap.values()).filter(
      (a) => a.zone === zone || a.zone === 'shared',
    );
  }
}

export const assetResolver = new AssetResolver();
