// Optional final browser checks; requires Playwright and Edge.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 950, height: 960 } });
    await page.addInitScript(() => {
      window.qaCls = 0;
      new PerformanceObserver(list => list.getEntries().forEach(e => {
        if (!e.hadRecentInput) window.qaCls += e.value;
      })).observe({ type: 'layout-shift', buffered: true });
    });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.QA_URL || 'http://127.0.0.1:4173/');
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2000);
    assert.equal(await page.locator('link[rel="icon"]').getAttribute('href'), 'favicon.ico');
    for (const link of await page.locator('a[target="_blank"]').all()) {
      assert.match(await link.getAttribute('rel'), /noopener/);
      assert.match(await link.getAttribute('rel'), /noreferrer/);
    }
    assert.equal(await page.locator('a[href="tel:+5512981521537"]').count(), 1);
    assert.equal(await page.locator('a[href="https://linktr.ee/gabduques"]').count(), 1);
    const contact = page.locator('.whatsapp-button');
    assert.ok(await contact.getAttribute('aria-label'));
    await contact.focus();
    assert.equal(await contact.evaluate(e => e === document.activeElement), true);
    assert.notEqual(await contact.evaluate(e => getComputedStyle(e).outlineStyle), 'none');
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(100);
    const start = await page.locator('.parallax-background').evaluate(e => e.style.transform);
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(1000);
    const end = await page.locator('.parallax-background').evaluate(e => e.style.transform);
    assert.notEqual(start, end);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ passed: true, cls: await page.evaluate(() => window.qaCls), start, end }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
