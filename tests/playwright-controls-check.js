const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright-core');

const root = path.resolve(__dirname, '..');
const chromePath = 'C:\\Users\\user\\AppData\\Local\\ms-playwright\\chromium-1223\\chrome-win64\\chrome.exe';
const fallbackChromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetUrl = pathToFileURL(path.join(root, 'index.html')).href;

const results = {
  url: targetUrl,
  counts: {},
  buttons: [],
  ranges: [],
  selects: [],
  checkboxes: [],
  consoleErrors: [],
  pageErrors: [],
};

function compactText(text) {
  return String(text || '').replace(/\s+/g, ' ').trim().slice(0, 80);
}

async function getMeta(locator, index) {
  return locator.evaluate((node, idx) => ({
    index: idx,
    id: node.id || '',
    type: node.getAttribute('type') || node.tagName.toLowerCase(),
    marker: node.getAttribute('data-vt-card') || '',
    text: (node.innerText || node.getAttribute('aria-label') || node.title || node.value || '').replace(/\s+/g, ' ').trim(),
    disabled: Boolean(node.disabled),
    hidden: node.hidden || node.getClientRects().length === 0 || getComputedStyle(node).display === 'none' || getComputedStyle(node).visibility === 'hidden',
  }), index);
}

async function main() {
  const executablePath = require('node:fs').existsSync(chromePath) ? chromePath : fallbackChromePath;
  const browser = await chromium.launch({ executablePath, headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1200 },
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  await page.addInitScript(() => {
    localStorage.setItem('motionlab-uiux', JSON.stringify({
      favorites: [],
      recent: [],
      collections: [],
      visited: [],
      tourSeen: true,
    }));
  });

  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      results.consoleErrors.push({ type: message.type(), text: message.text() });
    }
  });
  page.on('pageerror', (error) => {
    results.pageErrors.push(error.message);
  });

  await page.goto(targetUrl, { waitUntil: 'load' });
  await page.waitForTimeout(800);

  async function closeTransientUi() {
    await page.keyboard.press('Escape').catch(() => {});
    await page.evaluate(() => {
      document.getElementById('commandOverlay')?.classList.remove('is-open');
      document.getElementById('collectionDrawer')?.classList.remove('is-open');
      document.getElementById('tourOverlay')?.classList.remove('is-open');
    }).catch(() => {});
  }

  results.counts = await page.evaluate(() => ({
    sections: document.querySelectorAll('main section').length,
    buttons: document.querySelectorAll('button').length,
    ranges: document.querySelectorAll('input[type="range"]').length,
    selects: document.querySelectorAll('select').length,
    checkboxes: document.querySelectorAll('input[type="checkbox"]').length,
    copyButtons: document.querySelectorAll('[data-copy-target]').length,
    vibePrompts: document.querySelectorAll('.vibe-prompt').length,
    demoFrames: document.querySelectorAll('.demo-frame').length,
    recipeCards: document.querySelectorAll('.recipe-card').length,
    galleryCards: document.querySelectorAll('.gallery-card').length,
    filterChips: document.querySelectorAll('[data-filter-tag]').length,
    favoriteButtons: document.querySelectorAll('[data-favorite-demo]').length,
    cardToolbars: document.querySelectorAll('.card-tools').length,
    codePanels: document.querySelectorAll('.code-panel').length,
    codeWhyPanels: document.querySelectorAll('.code-why').length,
    commandPalette: document.querySelectorAll('#commandOverlay').length,
    collectionDrawer: document.querySelectorAll('#collectionDrawer').length,
    globalSearch: document.querySelectorAll('#globalSearch').length,
  }));

  await page.locator('#globalSearch').fill('toast');
  await page.waitForTimeout(200);
  results.counts.galleryCardsAfterSearch = await page.locator('.gallery-card').count();
  await page.locator('#globalSearch').fill('');
  await page.locator('[data-filter-tag="CSS"]').first().click({ timeout: 5000 });
  await page.waitForTimeout(120);
  results.counts.galleryCardsAfterCssFilter = await page.locator('.gallery-card').count();
  await page.locator('[data-filter-tag="CSS"]').first().click({ timeout: 5000 });
  await page.locator('#commandOpen').click({ timeout: 5000 });
  await page.locator('#commandInput').fill('toast');
  await page.waitForTimeout(120);
  results.counts.commandRowsAfterSearch = await page.locator('.command-row').count();
  await closeTransientUi();

  const vtCardCount = await page.locator('[data-vt-card]').count();
  for (let i = 0; i < vtCardCount; i += 1) {
    const locator = page.locator('[data-vt-card]').nth(i);
    const meta = await getMeta(locator, i);
    try {
      await page.locator('#vtList').evaluate((node) => node.classList.remove('hidden'));
      await page.locator('#vtDetail').evaluate((node) => node.classList.add('hidden'));
      await locator.scrollIntoViewIfNeeded({ timeout: 3000 });
      await locator.click({ timeout: 5000, force: true });
      await page.waitForFunction(() => !document.getElementById('vtDetail').classList.contains('hidden'), null, { timeout: 2000 });
      await page.waitForTimeout(500);
      await page.locator('#vtBack').click({ timeout: 5000, force: true });
      await page.waitForFunction(() => document.getElementById('vtDetail').classList.contains('hidden'), null, { timeout: 2000 });
      await closeTransientUi();
      results.buttons.push({ ...meta, status: 'clicked', special: 'view-transition-card' });
    } catch (error) {
      results.buttons.push({ ...meta, status: 'failed', special: 'view-transition-card', error: error.message });
    }
  }

  const buttonCount = await page.locator('button').count();
  for (let i = 0; i < buttonCount; i += 1) {
    const locator = page.locator('button').nth(i);
    const meta = await getMeta(locator, i);
    try {
      if (meta.marker) {
        continue;
      }
      if (meta.hidden || meta.disabled) {
        results.buttons.push({ ...meta, status: 'skipped' });
        continue;
      }
      await locator.scrollIntoViewIfNeeded({ timeout: 3000 });
      await locator.click({ timeout: 5000, force: true });
      await page.waitForTimeout(45);
      await closeTransientUi();
      results.buttons.push({ ...meta, status: 'clicked' });
    } catch (error) {
      results.buttons.push({ ...meta, status: 'failed', error: error.message });
    }
  }

  const rangeCount = await page.locator('input[type="range"]').count();
  for (let i = 0; i < rangeCount; i += 1) {
    const locator = page.locator('input[type="range"]').nth(i);
    const meta = await getMeta(locator, i);
    try {
      const values = await locator.evaluate((node) => {
        const min = Number(node.min || 0);
        const max = Number(node.max || 100);
        const mid = Math.round((min + max) / 2);
        return [min, mid, max].map(String);
      });
      await locator.scrollIntoViewIfNeeded({ timeout: 3000 });
      for (const value of values) {
        await locator.evaluate((node, nextValue) => {
          node.value = nextValue;
          node.dispatchEvent(new Event('input', { bubbles: true }));
          node.dispatchEvent(new Event('change', { bubbles: true }));
        }, value);
        await page.waitForTimeout(25);
      }
      const finalValue = await locator.inputValue();
      results.ranges.push({ ...meta, status: 'changed', values, finalValue });
    } catch (error) {
      results.ranges.push({ ...meta, status: 'failed', error: error.message });
    }
  }

  const selectCount = await page.locator('select').count();
  for (let i = 0; i < selectCount; i += 1) {
    const locator = page.locator('select').nth(i);
    const meta = await getMeta(locator, i);
    try {
      const options = await locator.evaluate((node) => Array.from(node.options).map((option) => option.value));
      await locator.scrollIntoViewIfNeeded({ timeout: 3000 });
      for (const value of options.slice(0, 8)) {
        await locator.selectOption(value);
        await page.waitForTimeout(35);
      }
      const finalValue = await locator.inputValue();
      results.selects.push({ ...meta, status: 'selected', options: options.length, finalValue });
    } catch (error) {
      results.selects.push({ ...meta, status: 'failed', error: error.message });
    }
  }

  const checkboxCount = await page.locator('input[type="checkbox"]').count();
  for (let i = 0; i < checkboxCount; i += 1) {
    const locator = page.locator('input[type="checkbox"]').nth(i);
    const meta = await getMeta(locator, i);
    try {
      await locator.scrollIntoViewIfNeeded({ timeout: 3000 });
      await locator.setChecked(true, { timeout: 3000 });
      await page.waitForTimeout(20);
      await locator.setChecked(false, { timeout: 3000 });
      await page.waitForTimeout(20);
      const checked = await locator.isChecked();
      results.checkboxes.push({ ...meta, status: 'toggled', checked });
    } catch (error) {
      results.checkboxes.push({ ...meta, status: 'failed', error: error.message });
    }
  }

  await page.waitForTimeout(1000);
  results.consoleErrors = results.consoleErrors
    .map((entry) => ({ ...entry, text: compactText(entry.text) }))
    .filter((entry, index, array) => array.findIndex((item) => item.text === entry.text) === index);

  await browser.close();

  const failures = [
    ...(results.counts.vibePrompts < results.counts.demoFrames + results.counts.recipeCards
      ? [`vibe prompts missing: expected at least ${results.counts.demoFrames + results.counts.recipeCards}, got ${results.counts.vibePrompts}`]
      : []),
    ...(results.counts.galleryCards < results.counts.demoFrames
      ? [`gallery cards missing: expected at least ${results.counts.demoFrames}, got ${results.counts.galleryCards}`]
      : []),
    ...(results.counts.favoriteButtons < results.counts.demoFrames
      ? [`favorite buttons missing: expected at least ${results.counts.demoFrames}, got ${results.counts.favoriteButtons}`]
      : []),
    ...(results.counts.cardToolbars < results.counts.demoFrames
      ? [`card toolbars missing: expected at least ${results.counts.demoFrames}, got ${results.counts.cardToolbars}`]
      : []),
    ...(results.counts.codeWhyPanels < results.counts.codePanels
      ? [`code explanation panels missing: expected at least ${results.counts.codePanels}, got ${results.counts.codeWhyPanels}`]
      : []),
    ...(results.counts.filterChips < 8 ? [`filter chips missing: got ${results.counts.filterChips}`] : []),
    ...(results.counts.commandPalette !== 1 ? ['command palette missing'] : []),
    ...(results.counts.collectionDrawer !== 1 ? ['collection drawer missing'] : []),
    ...(results.counts.globalSearch !== 1 ? ['global search missing'] : []),
    ...(results.counts.galleryCardsAfterSearch < 1 ? ['search returned no gallery cards for "toast"'] : []),
    ...(results.counts.galleryCardsAfterCssFilter < 1 ? ['CSS filter returned no gallery cards'] : []),
    ...(results.counts.commandRowsAfterSearch < 1 ? ['command palette returned no rows for "toast"'] : []),
    ...results.buttons.filter((item) => item.status === 'failed').map((item) => `button#${item.index} ${item.text || item.id}: ${item.error}`),
    ...results.ranges.filter((item) => item.status === 'failed').map((item) => `range#${item.index} ${item.id}: ${item.error}`),
    ...results.selects.filter((item) => item.status === 'failed').map((item) => `select#${item.index} ${item.id}: ${item.error}`),
    ...results.checkboxes.filter((item) => item.status === 'failed').map((item) => `checkbox#${item.index} ${item.id}: ${item.error}`),
    ...results.pageErrors.map((error) => `pageerror: ${error}`),
  ];

  console.log(JSON.stringify({
    counts: results.counts,
    clickedButtons: results.buttons.filter((item) => item.status === 'clicked').length,
    changedRanges: results.ranges.filter((item) => item.status === 'changed').length,
    selectedSelects: results.selects.filter((item) => item.status === 'selected').length,
    toggledCheckboxes: results.checkboxes.filter((item) => item.status === 'toggled').length,
    skippedButtons: results.buttons.filter((item) => item.status === 'skipped').length,
    skippedButtonDetails: results.buttons.filter((item) => item.status === 'skipped').map((item) => ({
      index: item.index,
      id: item.id,
      text: item.text,
      disabled: item.disabled,
      hidden: item.hidden,
    })),
    consoleErrors: results.consoleErrors,
    pageErrors: results.pageErrors,
    failures,
  }, null, 2));

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
