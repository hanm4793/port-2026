const { chromium } = require('playwright-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function queryThreeMetrics() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--use-gl=angle', '--use-angle=d3d11', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3333', { waitUntil: 'networkidle' });

  try {
    const btn = await page.$('button:has-text("Explore in Silence")');
    if (btn) await btn.click();
    await page.waitForTimeout(300);
  } catch {}

  const getGlInfo = async (scrollRatio, label) => {
    if (scrollRatio !== null) {
      await page.evaluate((ratio) => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, maxScroll * ratio);
      }, scrollRatio);
    }
    await page.waitForTimeout(1500);

    return await page.evaluate((name) => {
      const gl = window.__THREE_GL__;
      if (!gl || !gl.info) return { zone: name, error: 'GL info unavailable' };
      return {
        zone: name,
        calls: gl.info.render.calls,
        triangles: gl.info.render.triangles,
        lines: gl.info.render.lines,
        points: gl.info.render.points,
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
        programs: gl.info.programs ? gl.info.programs.length : 'N/A',
      };
    }, label);
  };

  const results = [];
  results.push(await getGlInfo(0.0, 'Shore of Arrival (Ch1)'));
  results.push(await getGlInfo(0.25, 'Forum of Systems (Ch2)'));
  results.push(await getGlInfo(0.40, 'Growth / Agora Gap (Ch3)'));
  results.push(await getGlInfo(0.55, 'Dino Sanctuary (Ch4)'));
  results.push(await getGlInfo(0.76, 'Amphitheatre (Ch5)'));
  results.push(await getGlInfo(0.95, 'Invitation / Beacon Gap (Ch6)'));

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
}

queryThreeMetrics().catch(console.error);
