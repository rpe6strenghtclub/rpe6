// Optional browser regression checks; requires local Playwright and Edge.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const url = process.env.QA_URL || 'http://127.0.0.1:4173/';
const selectors = ['.academy-carousel', '.method-carousel', '.final-community-carousel'];
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const run = async mode => {
      const context = await browser.newContext({ viewport: { width: 950, height: 960 },
        javaScriptEnabled: mode !== 'no-js', reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference' });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      if (mode === 'no-observer') await page.addInitScript(() => { delete window.IntersectionObserver; });
      if (mode === 'observer-error') await page.addInitScript(() => { window.IntersectionObserver = class { constructor() { throw Error('Simulated observer failure'); } }; });
      if (mode === 'slow' || mode === 'failed') await page.route(/(platform-overview|competition-squat-01|team-01)-/, async route => {
        if (mode === 'failed') return route.abort();
        await new Promise(resolve => setTimeout(resolve, 7000));
        await route.continue();
      });
      await page.goto(url);
      if (['reduced', 'no-observer', 'observer-error'].includes(mode)) {
        assert.equal(await page.locator('.final-community-carousel img[data-src]').count(), 3, 'Distant slides remain deferred');
      }
      for (const selector of selectors) await page.locator(selector).scrollIntoViewIfNeeded();
      if (mode === 'no-js') {
        for (const selector of selectors) {
          assert.ok(await page.locator(selector + ' noscript img').count());
          assert.notEqual(await page.locator(selector + ' > div > div').first().evaluate(e => getComputedStyle(e).animationName), 'none');
        }
      } else {
        await page.waitForFunction(() => document.querySelectorAll('.carousel-managed').length === 3);
        const seen = selectors.map(() => new Set());
        for (let second = 0; second < 34; second++) {
          const state = await page.evaluate(selectors => selectors.map(selector => {
            const frames = [...document.querySelector(selector).firstElementChild.children];
            return { current: frames.findIndex(e => e.classList.contains('is-current')),
              valid: frames.some(e => e.classList.contains('is-current') && e.querySelector('img').naturalWidth > 0) };
          }), selectors);
          state.forEach((value, i) => { assert.ok(value.valid, mode + ' keeps a valid frame'); seen[i].add(value.current); });
          await page.waitForTimeout(1000);
        }
        if (mode === 'normal') assert.deepEqual(seen.map(x => x.size), [2, 5, 4]);
        if (mode === 'failed') seen.forEach(x => assert.ok(!x.has(1), 'Failed second frame skipped'));
      }
      await page.locator('details summary').nth(3).click();
      assert.equal(await page.locator('details[open]').count(), 1);
      assert.equal(await page.locator('.whatsapp-button').getAttribute('href'), 'https://wa.me/message/DQ3XQCHDIIOME1');
      assert.equal(await page.locator('.cta-button').first().getAttribute('href'), 'https://pay.kiwify.com.br/Lxz6VDm');
      if (mode === 'reduced') assert.equal(await page.locator('.parallax-background').evaluate(e => e.style.transform), '');
      assert.deepEqual(errors, []);
      const result = { mode, passed: true };
      await context.close();
      return result;
    };
    const result = await Promise.all(['normal', 'slow', 'failed', 'no-js', 'no-observer', 'observer-error', 'reduced'].map(run));
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(2000);
    const metrics = await page.evaluate(() => ({ dom: document.querySelectorAll('*').length,
      resources: performance.getEntriesByType('resource').map(e => ({ name: e.name, bytes: e.transferSize })),
      cls: 0 }));
    delete metrics.cls;
    const localBytes = metrics.resources.filter(e => e.name.startsWith(url)).reduce((sum, e) => sum + e.bytes, 0);
    fs.writeFileSync(path.join(os.tmpdir(), 'rpe6-refactor-qa', 'behavior.json'), JSON.stringify({ result, metrics, localBytes }, null, 2));
    console.log(JSON.stringify({ result, dom: metrics.dom, localBytes }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
