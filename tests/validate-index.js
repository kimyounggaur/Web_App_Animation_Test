const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'index.html');
const pagesWorkflowPath = path.join(root, '.github', 'workflows', 'pages.yml');

if (!fs.existsSync(htmlPath)) {
  throw new Error('index.html must exist at the project root.');
}
if (!fs.existsSync(pagesWorkflowPath)) {
  throw new Error('GitHub Pages workflow must exist at .github/workflows/pages.yml.');
}

const html = fs.readFileSync(htmlPath, 'utf8');
const pagesWorkflow = fs.readFileSync(pagesWorkflowPath, 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const requiredSections = [
  'overview',
  'lab-explorer',
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
  'motion-hub',
  'js-timeline-lab',
  'canvas-particle-lab',
  'web-audio-lab',
  'webgl-physics-lab',
  'scroll-story-lab',
  'page-transition-lab',
  'advanced-micro-lab',
  'recipes',
];

for (const id of requiredSections) {
  assert(html.includes(`id="${id}"`), `Missing section #${id}`);
}

assert((html.match(/class="demo-frame/g) || []).length >= 18, 'Expected at least 18 demo frames.');
assert((html.match(/data-copy-target/g) || []).length >= 15, 'Expected at least 15 copy buttons.');
assert((html.match(/advanced-lab/g) || []).length >= 7, 'Expected advanced lab sections/cards.');
assert(html.includes('id="themeToggle"'), 'Missing theme toggle.');
assert(html.includes('id="pauseToggle"'), 'Missing pause toggle.');
assert(html.includes('id="reduceToggle"'), 'Missing reduced-motion toggle.');
assert(html.includes('id="speedSelect"'), 'Missing speed selector.');
assert(html.includes('id="resetAll"'), 'Missing reset button.');
assert(html.includes('systemPrefersReducedMotion'), 'Missing MotionSettings system reduced-motion state.');
assert(html.includes('reducedMotionOverride'), 'Missing MotionSettings override state.');
assert(html.includes('effectiveReducedMotion'), 'Missing effective reduced-motion state.');
assert(html.includes('animationSpeed'), 'Missing animation speed state.');
assert(html.includes('disableAutoplay'), 'Missing disable autoplay state.');
assert(html.includes('disableParallax'), 'Missing disable parallax state.');
assert(html.includes('disablePageTransitions'), 'Missing disable page transitions state.');
assert(html.includes('flashSafetyMode'), 'Missing flash safety state.');
assert(html.includes('getMotionDuration'), 'Missing shared motion duration helper.');
assert(html.includes('shouldAutoplay'), 'Missing shared autoplay helper.');
assert(html.includes('shouldReduceMotion'), 'Missing shared reduced-motion helper.');
assert(html.includes('getPlaybackRate'), 'Missing shared playback-rate helper.');
assert(html.includes('navigator.clipboard.writeText'), 'Missing Clipboard API copy path.');
assert(html.includes('execCommand'), 'Missing clipboard fallback.');
assert(html.includes('prefers-reduced-motion'), 'Missing reduced motion support.');
assert(html.includes('localStorage'), 'Missing persisted state.');
assert(html.includes('requestAnimationFrame'), 'Missing FPS meter implementation.');
assert(html.includes('document.startViewTransition'), 'Missing View Transition feature detection.');
assert(html.includes('IntersectionObserver'), 'Missing scroll fallback implementation.');
assert(html.includes('getTotalLength'), 'Missing SVG stroke length measurement demo.');
assert(html.includes('element.animate') || html.includes('.animate('), 'Missing WAAPI timeline demo.');
assert(html.includes('ParticleEngine'), 'Missing Canvas particle engine.');
assert(html.includes('AudioContext'), 'Missing Web Audio lab.');
assert(html.includes('three.min.js'), 'Missing async Three.js CDN loader for 3D lab.');
assert(html.includes('DeviceOrientationEvent'), 'Missing device orientation support.');
assert(html.includes('DeviceMotionEvent'), 'Missing device motion support.');
assert(html.includes('runTransition'), 'Missing Page Transition utility.');
assert(html.includes('cleanupAdvancedLabs'), 'Missing advanced lab cleanup hook.');
assert(html.includes('buildVibeCodingPrompt'), 'Missing vibe-coding prompt builder.');
assert(html.includes('installVibeCodingPrompts'), 'Missing vibe-coding prompt installer.');
assert(html.includes('바이브코딩 프롬프트'), 'Missing visible vibe-coding prompt label.');
assert(html.includes('id="globalSearch"'), 'Missing global search input.');
assert(html.includes('id="galleryToggle"'), 'Missing gallery/document view toggle.');
assert(html.includes('id="galleryGrid"'), 'Missing gallery grid.');
assert(html.includes('id="filterChips"'), 'Missing filter chip container.');
assert(html.includes('id="commandOverlay"'), 'Missing command palette dialog.');
assert(html.includes('id="collectionDrawer"'), 'Missing collection drawer.');
assert(html.includes('id="tourOverlay"'), 'Missing onboarding tour.');
assert(html.includes('id="readProgress"'), 'Missing reading progress bar.');
assert(html.includes('data-favorite-demo'), 'Missing favorite controls.');
assert(html.includes('data-card-action="replay"'), 'Missing per-card replay action.');
assert(html.includes('highlightCode'), 'Missing lightweight code highlighting.');
assert(html.includes('uiStorageKey'), 'Missing UI localStorage namespace.');
assert(html.includes('role="img"'), 'Meaningful SVGs need role="img".');
assert(html.includes('<title>'), 'Meaningful SVGs need title text.');
assert(!/<script\s+[^>]*src=/i.test(html), 'External script files are not allowed.');
assert(!/<link\s+[^>]*href=/i.test(html), 'External stylesheets/fonts are not allowed.');
assert(pagesWorkflow.includes('actions/deploy-pages'), 'Pages workflow must deploy with actions/deploy-pages.');
assert(pagesWorkflow.includes('actions/upload-pages-artifact'), 'Pages workflow must upload a Pages artifact.');
assert(pagesWorkflow.includes('branches:') && pagesWorkflow.includes('main'), 'Pages workflow must deploy from main.');

console.log('Static acceptance checks passed.');
