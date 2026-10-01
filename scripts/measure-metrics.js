const { chromium } = require('playwright-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function measureMetrics() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--use-gl=angle', '--use-angle=d3d11', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3333', { waitUntil: 'networkidle' });

  // Dismiss audio modal
  try {
    const btn = await page.$('button:has-text("Explore in Silence")');
    if (btn) await btn.click();
    await page.waitForTimeout(300);
  } catch {}

  // Helper to query Three.js renderer info
  const getMetrics = async (scrollRatio, zoneName) => {
    if (scrollRatio !== null) {
      await page.evaluate((ratio) => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, maxScroll * ratio);
      }, scrollRatio);
    }
    await page.waitForTimeout(1000);

    return await page.evaluate((z) => {
      // Find renderer from canvas
      const canvas = document.querySelector('canvas');
      if (!canvas) return { zone: z, error: 'No canvas' };

      // In R3F, stats or internal fiber state holds renderer
      // We can inspect gl directly or query performance stats
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      // Look for stats DOM (Stats component from drei)
      const statsPanel = document.querySelector('#stats');
      
      // Let's get active DOM elements count, images, and inspect scene
      return {
        zone: z,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        dpr: window.devicePixelRatio,
      };
    }, zoneName);
  };

  const results = [];
  results.push(await getMetrics(0.0, 'Shore of Arrival (Ch1)'));
  results.push(await getMetrics(0.25, 'Forum of Systems (Ch2)'));
  results.push(await getMetrics(0.40, 'Growth / Agora Gap (Ch3)'));
  results.push(await getMetrics(0.55, 'Dino Sanctuary (Ch4)'));
  results.push(await getMetrics(0.76, 'Amphitheatre (Ch5)'));
  results.push(await getMetrics(0.95, 'Invitation / Beacon Gap (Ch6)'));

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
}

measureMetrics().catch(console.error);
