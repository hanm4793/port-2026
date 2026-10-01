const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function measureCheckpoints() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--use-gl=angle', '--use-angle=d3d11', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3333', { waitUntil: 'networkidle' });

  // Dismiss audio opt-in modal if open
  try {
    const btn = await page.$('button:has-text("Explore in Silence")');
    if (btn) await btn.click();
    await page.waitForTimeout(300);
  } catch {}

  const checkpoints = [
    { id: 'ch1', name: 'Shore of Arrival (Ch1)', scrollRatio: 0.00 },
    { id: 'ch2', name: 'Forum of Systems (Ch2)', scrollRatio: 0.25 },
    { id: 'ch3', name: 'Growth / Agora Gap (Ch3)', scrollRatio: 0.40 },
    { id: 'ch4', name: 'Dino Sanctuary (Ch4)', scrollRatio: 0.55 },
    { id: 'ch5', name: 'Amphitheatre of Sound (Ch5)', scrollRatio: 0.76 },
    { id: 'ch6', name: 'Invitation / Beacon Gap (Ch6)', scrollRatio: 0.95 },
  ];

  const results = [];

  for (const cp of checkpoints) {
    console.log(`[Measure] Sampling checkpoint: ${cp.name} (scroll: ${cp.scrollRatio})...`);
    // 1. Scroll to checkpoint
    await page.evaluate((ratio) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, maxScroll * ratio);
    }, cp.scrollRatio);

    // 2. Warm-up window: wait 1500ms for camera dampening & culling to settle
    await page.waitForTimeout(1500);

    // 3. Sampling window: measure 120 consecutive RAF frames
    const sample = await page.evaluate(async (info) => {
      const gl = window.__THREE_GL__;
      const qualityState = window.useQualityStore ? window.useQualityStore.getState() : {};
      const experienceState = window.useExperienceStore ? window.useExperienceStore.getState() : {};

      // Sample 120 consecutive animation frames
      const frameDeltas = [];
      let lastTime = performance.now();

      await new Promise((resolve) => {
        let count = 0;
        function onFrame(now) {
          const delta = now - lastTime;
          lastTime = now;
          if (count > 0) { // ignore first delta
            frameDeltas.push(delta);
          }
          count++;
          if (count < 121) {
            requestAnimationFrame(onFrame);
          } else {
            resolve();
          }
        }
        requestAnimationFrame(onFrame);
      });

      // Calculate statistics
      const sum = frameDeltas.reduce((a, b) => a + b, 0);
      const avgFrameTimeMs = sum / frameDeltas.length;
      const avgFPS = 1000 / avgFrameTimeMs;

      // Sort ascending to get 1% low (worst 1% longest frame times)
      const sorted = [...frameDeltas].sort((a, b) => a - b);
      const p99Index = Math.floor(sorted.length * 0.99);
      const p99FrameTimeMs = sorted[Math.min(p99Index, sorted.length - 1)];
      const onePercentLowFPS = 1000 / p99FrameTimeMs;

      const minFrameTimeMs = sorted[0];
      const maxFrameTimeMs = sorted[sorted.length - 1];

      return {
        checkpoint: info.name,
        scrollRatio: info.scrollRatio,
        avgFPS: Number(avgFPS.toFixed(1)),
        avgFrameTimeMs: Number(avgFrameTimeMs.toFixed(2)),
        onePercentLowFPS: Number(onePercentLowFPS.toFixed(1)),
        p99FrameTimeMs: Number(p99FrameTimeMs.toFixed(2)),
        minFrameTimeMs: Number(minFrameTimeMs.toFixed(2)),
        maxFrameTimeMs: Number(maxFrameTimeMs.toFixed(2)),
        calls: gl?.info?.render?.calls ?? 0,
        triangles: gl?.info?.render?.triangles ?? 0,
        geometries: gl?.info?.memory?.geometries ?? 0,
        textures: gl?.info?.memory?.textures ?? 0,
        programs: gl?.info?.programs?.length ?? 0,
        tier: qualityState?.tier ?? 'unknown',
        shadows: qualityState?.shadows ?? false,
        dpr: qualityState?.dpr ?? [1, 1],
        mode: experienceState?.mode ?? 'story',
      };
    }, cp);

    results.push(sample);
  }

  console.log('\n--- MEASUREMENT RESULTS ---');
  console.log(JSON.stringify(results, null, 2));

  fs.writeFileSync(
    path.resolve(__dirname, '../docs/screenshots/runtime-metrics.json'),
    JSON.stringify(results, null, 2),
    'utf-8'
  );

  await browser.close();
}

measureCheckpoints().catch(console.error);
