const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve(__dirname, '../docs/screenshots');

const REMAINING_CAPTURES = [
  { name: 'desktop-explore-amphitheatre.png', viewport: { width: 1920, height: 1080 }, mode: 'explore', waypoint: 'amphitheatre', wait: 2000 },
  { name: 'mobile-story-ch1-arrival.png', viewport: { width: 390, height: 844 }, scrollRatio: 0.0, mode: 'story', isMobile: true, wait: 2000 },
  { name: 'mobile-story-ch2-systems.png', viewport: { width: 390, height: 844 }, scrollRatio: 0.25, mode: 'story', isMobile: true, wait: 2000 },
  { name: 'mobile-story-ch4-worlds.png', viewport: { width: 390, height: 844 }, scrollRatio: 0.55, mode: 'story', isMobile: true, wait: 2000 },
  { name: 'mobile-story-ch5-music.png', viewport: { width: 390, height: 844 }, scrollRatio: 0.76, mode: 'story', isMobile: true, wait: 2000 },
  { name: 'desktop-drawer-web-analytics.png', viewport: { width: 1920, height: 1080 }, openDrawer: 'enterprise-analytics-platform', wait: 1500 },
  { name: 'mobile-bottom-sheet-crm.png', viewport: { width: 390, height: 844 }, openDrawer: 'enterprise-crm-engine', isMobile: true, wait: 1500 },
];

async function runRemaining() {
  console.log('[Capture Part 2] Launching Chrome...');
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--use-gl=angle', '--use-angle=d3d11', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const url = 'http://localhost:3333';

  for (const item of REMAINING_CAPTURES) {
    console.log(`[Capture Part 2] Processing: ${item.name} ...`);
    const context = await browser.newContext({
      viewport: item.viewport,
      isMobile: !!item.isMobile,
      hasTouch: !!item.isMobile,
      deviceScaleFactor: 1,
    });

    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });

    try {
      const dismissBtn = await page.$('button:has-text("Explore in Silence")');
      if (dismissBtn) {
        await dismissBtn.click();
        await page.waitForTimeout(200);
      }
    } catch {}

    if (item.openDrawer) {
      await page.evaluate((slug) => {
        window.useOverlayStore?.getState().openOverlay('project', { slug });
      }, item.openDrawer);
      await page.waitForTimeout(1000);
    } else if (item.mode === 'explore') {
      await page.evaluate((wp) => {
        window.useExperienceStore?.getState().setMode('explore');
        window.useExploreStore?.getState().teleportToWaypoint(wp);
      }, item.waypoint || 'shore');
      await page.waitForTimeout(item.wait || 2000);
    } else {
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
    console.log(`[Capture Part 2] Saved: ${item.name}`);
    await context.close();
  }

  // Diagnostic capture
  const diagContext = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const diagPage = await diagContext.newPage();
  await diagPage.goto(url, { waitUntil: 'networkidle' });
  const diagnostics = await diagPage.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return { error: 'No WebGL canvas' };
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return { error: 'No WebGL context' };
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return {
      vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown',
      renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown',
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxCubeMapSize: gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
      depthBits: gl.getParameter(gl.DEPTH_BITS),
      stencilBits: gl.getParameter(gl.STENCIL_BITS),
    };
  });

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'webgl-diagnostics.json'),
    JSON.stringify(diagnostics, null, 2),
    'utf-8'
  );
  console.log('[Capture Part 2] Diagnostics written to webgl-diagnostics.json');

  await diagContext.close();
  await browser.close();
}

runRemaining().catch(console.error);
