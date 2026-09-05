// Optional local QA: NODE_PATH must expose Playwright; not a site dependency.
const { chromium } = require('playwright');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const output = path.join(os.tmpdir(), 'rpe6-refactor-qa');
fs.mkdirSync(output, { recursive: true });
const phase = process.argv[2] || 'after';
const url = process.env.QA_URL || 'http://127.0.0.1:4173/';
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = [];
  for (const width of [360, 430, 760, 804, 950, 1860]) {
    const page = await browser.newPage({ viewport: { width, height: 960 } });
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    for (const section of await page.locator('main > section').all()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
    }
    await page.evaluate(() => scrollTo(0, 0));
    const result = await page.evaluate(() => ({
      width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth,
      sections: [...document.querySelectorAll('main > section')].map(e => {
        const r = e.getBoundingClientRect(); return [r.x, r.y + scrollY, r.width, r.height];
      }),
      images: [...document.images].filter(e => e.hasAttribute('src')).map(e => e.currentSrc),
    }));
    assert.equal(result.overflow, false);
    await page.screenshot({ path: path.join(output, `${phase}-${width}.png`), fullPage: true });
    results.push(result);
    await page.close();
  }
  fs.writeFileSync(path.join(output, `${phase}.json`), JSON.stringify(results, null, 2));
  console.log(JSON.stringify({ phase, output, results }));
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
