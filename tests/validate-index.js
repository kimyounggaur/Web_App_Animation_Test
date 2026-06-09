const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'index.html');

if (!fs.existsSync(htmlPath)) {
  throw new Error('index.html must exist at the project root.');
}

const html = fs.readFileSync(htmlPath, 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const requiredSections = [
  'overview',
  'css-core',
  'micro-interactions',
  'ui-components',
  'scroll-view',
  'media-ui',
  'svg-engines',
  'svg-techniques',
  'scenarios',
  'usecase-guide',
  'perf-a11y',
  'recipes',
];

for (const id of requiredSections) {
  assert(html.includes(`id="${id}"`), `Missing section #${id}`);
}

assert((html.match(/class="demo-frame/g) || []).length >= 18, 'Expected at least 18 demo frames.');
assert((html.match(/data-copy-target/g) || []).length >= 15, 'Expected at least 15 copy buttons.');
assert(html.includes('id="themeToggle"'), 'Missing theme toggle.');
assert(html.includes('id="pauseToggle"'), 'Missing pause toggle.');
assert(html.includes('id="reduceToggle"'), 'Missing reduced-motion toggle.');
assert(html.includes('id="speedSelect"'), 'Missing speed selector.');
assert(html.includes('id="resetAll"'), 'Missing reset button.');
assert(html.includes('navigator.clipboard.writeText'), 'Missing Clipboard API copy path.');
assert(html.includes('execCommand'), 'Missing clipboard fallback.');
assert(html.includes('prefers-reduced-motion'), 'Missing reduced motion support.');
assert(html.includes('localStorage'), 'Missing persisted state.');
assert(html.includes('requestAnimationFrame'), 'Missing FPS meter implementation.');
assert(html.includes('document.startViewTransition'), 'Missing View Transition feature detection.');
assert(html.includes('IntersectionObserver'), 'Missing scroll fallback implementation.');
assert(html.includes('getTotalLength'), 'Missing SVG stroke length measurement demo.');
assert(html.includes('role="img"'), 'Meaningful SVGs need role="img".');
assert(html.includes('<title>'), 'Meaningful SVGs need title text.');
assert(!/<script\s+[^>]*src=/i.test(html), 'External script files are not allowed.');
assert(!/<link\s+[^>]*href=/i.test(html), 'External stylesheets/fonts are not allowed.');

console.log('Static acceptance checks passed.');
