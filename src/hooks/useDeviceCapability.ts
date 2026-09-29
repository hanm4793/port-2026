'use client';

import { useState, useEffect } from 'react';

interface DeviceCapability {
  webgl: boolean;
  webgl2: boolean;
  gpuTier: 'high' | 'medium' | 'low' | 'unknown';
  maxTextureSize: number;
  mobile: boolean;
}

/**
 * Detect device WebGL capabilities.
 * Used to decide whether to mount the 3D experience or fall back to 2D.
 */
export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>({
    webgl: false,
    webgl2: false,
    gpuTier: 'unknown',
    maxTextureSize: 0,
    mobile: false,
  });

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');
    const gl = gl2 ?? canvas.getContext('webgl');

    const webgl = !!gl;
    const webgl2 = !!gl2;
    const maxTextureSize = gl ? gl.getParameter(gl.MAX_TEXTURE_SIZE) : 0;
    const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // Simple GPU tier heuristic based on max texture size
    let gpuTier: DeviceCapability['gpuTier'] = 'unknown';
    if (maxTextureSize >= 16384) gpuTier = 'high';
    else if (maxTextureSize >= 8192) gpuTier = 'medium';
    else if (maxTextureSize > 0) gpuTier = 'low';

    setCapability({ webgl, webgl2, gpuTier, maxTextureSize, mobile });

    // Clean up test canvas
    canvas.remove();
  }, []);

  return capability;
}
