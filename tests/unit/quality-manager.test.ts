import { describe, it, expect, beforeEach } from 'vitest';
import { useQualityStore, QUALITY_CONFIGS } from '@/stores/useQualityStore';

describe('QualityStore & Performance Hardening Machine', () => {
  beforeEach(() => {
    useQualityStore.setState({
      tier: 'high',
      ...QUALITY_CONFIGS.high,
      isMobileDevice: false,
      hardwareCores: 8,
      autoDegradeCount: 0,
    });
  });

  it('initial high tier activates shadows, full DPR, and vertex waves', () => {
    const s = useQualityStore.getState();
    expect(s.tier).toBe('high');
    expect(s.shadows).toBe(true);
    expect(s.shadowMapSize).toBe(2048);
    expect(s.vertexWaves).toBe(true);
    expect(s.maxActiveZones).toBe(3);
    expect(s.dpr).toEqual([1, 1.75]);
  });

  it('setMobileDevice() caps initial tier and locks mobile DPR boundaries', () => {
    useQualityStore.getState().setMobileDevice(true);
    const s = useQualityStore.getState();
    expect(s.isMobileDevice).toBe(true);
    expect(s.tier).toBe('medium');
    expect(s.dpr).toEqual([1, 1.35]);
  });

  it('autoDegrade() cascades gracefully from high -> medium -> low', () => {
    // 1st degrade: high -> medium
    const firstDegrade = useQualityStore.getState().autoDegrade();
    expect(firstDegrade).toBe(true);
    let s = useQualityStore.getState();
    expect(s.tier).toBe('medium');
    expect(s.shadowMapSize).toBe(1024);
    expect(s.autoDegradeCount).toBe(1);

    // 2nd degrade: medium -> low
    const secondDegrade = useQualityStore.getState().autoDegrade();
    expect(secondDegrade).toBe(true);
    s = useQualityStore.getState();
    expect(s.tier).toBe('low');
    expect(s.shadows).toBe(false);
    expect(s.shadowMapSize).toBe(0);
    expect(s.dpr).toEqual([1, 1.0]); // DPR locked to 1.0 on low tier
    expect(s.vertexWaves).toBe(false); // Disables CPU displacement
    expect(s.autoDegradeCount).toBe(2);

    // 3rd degrade: cannot degrade past low
    const thirdDegrade = useQualityStore.getState().autoDegrade();
    expect(thirdDegrade).toBe(false);
    expect(useQualityStore.getState().tier).toBe('low');
  });

  it('autoUpgrade() restores fidelity on sustained high FPS on non-mobile devices', () => {
    useQualityStore.getState().setTier('low');
    expect(useQualityStore.getState().tier).toBe('low');

    const upgraded1 = useQualityStore.getState().autoUpgrade();
    expect(upgraded1).toBe(true);
    expect(useQualityStore.getState().tier).toBe('medium');

    const upgraded2 = useQualityStore.getState().autoUpgrade();
    expect(upgraded2).toBe(true);
    expect(useQualityStore.getState().tier).toBe('high');
  });

  it('autoUpgrade() does not upgrade mobile devices to prevent thermal runaway', () => {
    useQualityStore.getState().setMobileDevice(true);
    useQualityStore.getState().setTier('low');

    const upgraded = useQualityStore.getState().autoUpgrade();
    expect(upgraded).toBe(false);
    expect(useQualityStore.getState().tier).toBe('low');
  });
});
