const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

async function inspectCh6() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  const filePath = 'file:///' + path.resolve(__dirname, '../docs/screenshots/desktop-story-ch6-invitation-beacon-gap.png').replace(/\\/g, '/');
  await page.goto(filePath);
  
  const sample = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    // Sample pixels across image
    const p1 = ctx.getImageData(960, 540, 1, 1).data;
    const p2 = ctx.getImageData(960, 200, 1, 1).data;
    const p3 = ctx.getImageData(960, 800, 1, 1).data;
    
    return {
      center: Array.from(p1),
      top: Array.from(p2),
      bottom: Array.from(p3),
      width: img.naturalWidth,
      height: img.naturalHeight
    };
  });
  
  console.log('Ch6 Screenshot Pixel Sample:', sample);
  await browser.close();
}

inspectCh6().catch(console.error);
