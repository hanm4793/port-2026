const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve(__dirname, '../docs/screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 6 Story Chapters and their scroll heights in document
// Story chapters: each is 150vh, 6 chapters -> 900vh total height
const CAPTURES = [
  // ── Desktop Story Mode (1920x1080) ──
  { name: 'desktop-story-ch1-beat1-arrival.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.0, mode: 'story', wait: 2500 },
  { name: 'desktop-story-ch1-beat2-descent.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.05, mode: 'story', wait: 2000 },
  { name: 'desktop-story-ch1-beat3-gate.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.10, mode: 'story', wait: 2000 },
  { name: 'desktop-story-ch1-beat4-threshold.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.15, mode: 'story', wait: 2000 },
  { name: 'desktop-story-ch2-beat1-systems-entrance.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.20, mode: 'story', wait: 2000 },
  { name: 'desktop-story-ch2-beat2-table-overview.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.25, mode: 'story', wait: 2000 },
  { name: 'desktop-story-ch2-beat3-colonnade.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.32, mode: 'story', wait: 2000 },
  { name: 'desktop-story-ch3-growth-agora-gap.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.40, mode: 'story', wait: 2000 },
  { name: 'desktop-story-ch4-beat1-fossil-arch.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.52, mode: 'story', wait: 2000 },
  { name: 'desktop-story-ch4-beat2-pipeline-altar.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.58, mode: 'story', wait: 2000 },
  { name: 'desktop-story-ch4-beat3-canyon-gorge.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.64, mode: 'story', wait: 2000 },
  { name: 'desktop-story-ch5-beat1-amphitheatre-ridge.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.70, mode: 'story', wait: 2000 },
  { name: 'desktop-story-ch5-beat2-orchestra-stage.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.76, mode: 'story', wait: 2000 },
  { name: 'desktop-story-ch5-beat3-theatron-sails.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.82, mode: 'story', wait: 2000 },
  { name: 'desktop-story-ch6-invitation-beacon-gap.png', viewport: { width: 1920, height: 1080 }, scrollRatio: 0.95, mode: 'story', wait: 2000 },

  // ── Desktop Explore Mode (1920x1080) ──
  { name: 'desktop-explore-shore.png', viewport: { width: 1920, height: 1080 }, mode: 'explore', waypoint: 'shore', wait: 2500 },
  { name: 'desktop-explore-forum.png', viewport: { width: 1920, height: 1080 }, mode: 'explore', waypoint: 'forum', wait: 2500 },
  { name: 'desktop-explore-sanctuary.png', viewport: { width: 1920, height: 1080 }, mode: 'explore', waypoint: 'sanctuary', wait: 2500 },
  { name: 'desktop-explore-amphitheatre.png', viewport: { width: 1920, height: 1080 }, mode: 'explore', waypoint: 'amphitheatre', wait: 2500 },

  // ── Mobile Story Mode (390x844 - iPhone 14 / modern vertical viewport) ──
  { name: 'mobile-story-ch1-arrival.png', viewport: { width: 390, height: 844 }, scrollRatio: 0.0, mode: 'story', isMobile: true, wait: 2500 },
  { name: 'mobile-story-ch2-systems.png', viewport: { width: 390, height: 844 }, scrollRatio: 0.25, mode: 'story', isMobile: true, wait: 2000 },
  { name: 'mobile-story-ch4-worlds.png', viewport: { width: 390, height: 844 }, scrollRatio: 0.55, mode: 'story', isMobile: true, wait: 2000 },
  { name: 'mobile-story-ch5-music.png', viewport: { width: 390, height: 844 }, scrollRatio: 0.76, mode: 'story', isMobile: true, wait: 2000 },

  // ── Case Study Drawer Docking ──
  { name: 'desktop-drawer-web-analytics.png', viewport: { width: 1920, height: 1080 }, openDrawer: 'enterprise-analytics-platform', wait: 2000 },
  { name: 'mobile-bottom-sheet-crm.png', viewport: { width: 390, height: 844 }, openDrawer: 'enterprise-crm-engine', isMobile: true, wait: 2000 },
];

async function run() {
  console.log(`[Capture] Launching Chrome from: ${CHROME_PATH}`);
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--use-gl=angle', '--use-angle=d3d11', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const url = 'http://localhost:3333';

  for (const item of CAPTURES) {
    console.log(`[Capture] Processing: ${item.name} ...`);
    const context = await browser.newContext({
      viewport: item.viewport,
      isMobile: !!item.isMobile,
      hasTouch: !!item.isMobile,
      deviceScaleFactor: 1,
    });

    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });

    // Handle opt-in modal if open: click "Explore in Silence" to dismiss
    try {
      const dismissBtn = await page.$('button:has-text("Explore in Silence")');
      if (dismissBtn) {
        await dismissBtn.click();
        await page.waitForTimeout(300);
      }
    } catch {}

    if (item.openDrawer) {
      // Evaluate store call directly to open drawer cleanly
      await page.evaluate((slug) => {
        window.useOverlayStore?.getState().openOverlay('project', { slug });
      }, item.openDrawer);
      await page.waitForTimeout(1000);
    } else if (item.mode === 'explore') {
      // Switch mode to explore and teleport to waypoint
      await page.evaluate((wp) => {
        window.useExperienceStore?.getState().setMode('explore');
        window.useExploreStore?.getState().teleportToWaypoint(wp);
      }, item.waypoint || 'shore');
      await page.waitForTimeout(item.wait || 2000);
    } else {
      // Story mode scroll
      if (item.scrollRatio > 0) {
        await page.evaluate((ratio) => {
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo(0, maxScroll * ratio);
        }, item.scrollRatio);
        await page.waitForTimeout(item.wait || 2000);
      } else {
        await page.waitForTimeout(item.wait || 2000);
      }
    }

    const outPath = path.join(OUTPUT_DIR, item.name);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`[Capture] Saved: ${item.name}`);
    await context.close();
  }

  // Also capture WebGL debug diagnostics directly from the renderer
  const diagContext = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const diagPage = await diagContext.newPage();
  await diagPage.goto(url, { waitUntil: 'networkidle' });
  const diagnostics = await diagPage.evaluate(() => {
    // Inspect Three.js canvas WebGL renderer statistics
    const canvas = document.querySelector('canvas');
    if (!canvas) return { error: 'No WebGL canvas found' };
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return { error: 'No WebGL context found' };

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return {
      vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown',
      renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown',
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxCubeMapSize: gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
      maxRenderBufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
      colorBits: [
        gl.getParameter(gl.RED_BITS),
        gl.getParameter(gl.GREEN_BITS),
        gl.getParameter(gl.BLUE_BITS),
        gl.getParameter(gl.ALPHA_BITS),
      ],
      depthBits: gl.getParameter(gl.DEPTH_BITS),
      stencilBits: gl.getParameter(gl.STENCIL_BITS),
    };
  });

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'webgl-diagnostics.json'),
    JSON.stringify(diagnostics, null, 2),
    'utf-8'
  );
  console.log('[Capture] WebGL diagnostics saved to webgl-diagnostics.json');

  await diagContext.close();
  await browser.close();
  console.log('[Capture] Complete! All screenshots captured.');
}

run().catch((err) => {
  console.error('[Capture] Error running capture suite:', err);
  process.exit(1);
});
