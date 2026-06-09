# CSS SVG Motion Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a no-install, double-clickable `index.html` app for experimenting with CSS and SVG animation techniques.

**Architecture:** One self-contained HTML file with inline CSS tokens, layout styles, demo motion styles, and a vanilla module script. The app uses data-driven demo definitions rendered through shared DemoFrame, ControlPanel, CodePanel, and CopyButton factories.

**Tech Stack:** HTML5, pure CSS, inline SVG, vanilla JavaScript ES module, Node built-ins for static acceptance tests.

---

## File Structure

- Create: `tests/validate-index.js`
  - Static acceptance test for the single-file app and required feature markers.
- Create: `index.html`
  - All UI, CSS, JS, demo data, controls, code copy, route/scroll behavior, accessibility and performance tools.
- Create: `docs/superpowers/plans/2026-06-09-css-svg-motion-lab.md`
  - This implementation plan.

### Task 1: Acceptance Test

**Files:**
- Create: `tests/validate-index.js`

- [ ] **Step 1: Write the failing test**

```js
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
  'overview', 'css-core', 'micro-interactions', 'ui-components',
  'scroll-view', 'media-ui', 'svg-engines', 'svg-techniques',
  'scenarios', 'usecase-guide', 'perf-a11y', 'recipes'
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/validate-index.js`

Expected: FAIL with `index.html must exist at the project root.`

### Task 2: Single-File App

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write minimal implementation**

Create a semantic HTML document with:
- Sticky header with `themeToggle`, `pauseToggle`, `speedSelect`, `reduceToggle`, and `resetAll`.
- Sidebar hash navigation for Overview, CSS modules A-E, SVG modules F-H, Guide modules I-J, and Recipe Library.
- Shared demo frames with stage, controls, use case, notes, code tabs, and copy buttons.
- At least 18 live demos, including at least 5 CSS demos and at least 8 SVG demos.
- Inline CSS for light/dark themes, reduced motion, motion pause, responsive layout, demo motion, code panels, and FPS tools.
- Inline module script for state persistence, code regeneration, copy fallback, reset events, scroll spy, view transition detection, IntersectionObserver fallback, and SVG stroke measurement.

- [ ] **Step 2: Run static acceptance**

Run: `node tests/validate-index.js`

Expected: PASS with `Static acceptance checks passed.`

### Task 3: Manual Browser Verification

**Files:**
- Verify: `index.html`

- [ ] **Step 1: Open the local file or serve it**

Run one of:

```powershell
Start-Process -FilePath (Resolve-Path .\index.html)
```

or use a local static server.

- [ ] **Step 2: Check behavior**

Confirm:
- Theme, pause, speed, reduced-motion simulation, reset controls update the page.
- Copy buttons copy visible code.
- Hash navigation scrolls to sections.
- View Transition and scroll fallback panels render.
- FPS meter updates.

