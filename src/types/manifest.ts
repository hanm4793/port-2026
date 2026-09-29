// =============================================================================
// Asset manifest types — see ASSET-PIPELINE.md §10
// =============================================================================

export type AssetStatus = 'proxy' | 'wip' | 'final';
export type AssetCategory =
  | 'terrain'
  | 'env-kit'
  | 'landmark'
  | 'prop'
  | 'vegetation'
  | 'interactive'
  | 'sky';

export interface AssetEntry {
  id: string;
  category: AssetCategory;
  zone: string; // ZoneId or 'shared'
  status: AssetStatus;
  file: string | null; // Path relative to /assets/, null = use proxy
  polyBudget: number;
  textureBudget: string; // e.g., '1024x1024'
  proxyType?: string; // e.g., 'cylinder-geometry', 'composed-primitives'
  description: string;
}

export interface AssetManifest {
  version: string;
  assets: AssetEntry[];
}
