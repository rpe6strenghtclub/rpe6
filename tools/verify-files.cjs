// Optional local integrity check. Run from any directory with Node.js.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const sources = ['index.html', 'styles.css', 'script.js'];
const text = sources.map(file => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
const references = new Set([...text.matchAll(/assets\/[\w./-]+\.(?:png|jpg)/g)].map(match => match[0]));
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
  const file = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(file) : [file];
});
for (const reference of references) assert.ok(fs.existsSync(path.join(root, reference)), 'Missing: ' + reference);
const assets = walk(path.join(root, 'assets'));
for (const file of assets) assert.ok(references.has(path.relative(root, file).split(path.sep).join('/')), 'Unused: ' + file);
for (const file of ['styles.css', 'script.js', 'favicon.ico']) assert.ok(fs.existsSync(path.join(root, file)));
console.log(JSON.stringify({ references: references.size, assets: assets.length,
  assetBytes: assets.reduce((sum, file) => sum + fs.statSync(file).size, 0),
  code: Object.fromEntries(sources.map(file => [file, fs.statSync(path.join(root, file)).size])) }));
