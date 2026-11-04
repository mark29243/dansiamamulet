const fs = require('fs');
const path = require('path');
const vm = require('vm');

const fbPath = path.join(__dirname, '../public/fb.html');
const html = fs.readFileSync(fbPath, 'utf8');

// 1. Check total cards
const cards = (html.match(/<div class="card"/g) || []).length;
console.log('Cards count:', cards);
if (cards !== 18) throw new Error(`Expected 18 cards, got ${cards}`);

// 2. Check dual-status tags count
const tagZhMatches = (html.match(/id="tag-zh-[a-z0-9_]+"/g) || []).length;
const tagEnMatches = (html.match(/id="tag-en-[a-z0-9_]+"/g) || []).length;
console.log('tagZh matches:', tagZhMatches);
console.log('tagEn matches:', tagEnMatches);
if (tagZhMatches !== 18 || tagEnMatches !== 18) {
  throw new Error(`Expected 18 tag-zh and 18 tag-en, got ${tagZhMatches} and ${tagEnMatches}`);
}

// 3. Check JS Syntax and mock DOM
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) throw new Error('Script tag not found');

function createMockEl() {
  return {
    innerText: '',
    innerHTML: '',
    className: '',
    classList: {
      classes: new Set(),
      toggle(c, force) {
        if (force === undefined) {
          if (this.classes.has(c)) this.classes.delete(c);
          else this.classes.add(c);
        } else if (force) {
          this.classes.add(c);
        } else {
          this.classes.delete(c);
        }
      },
      add(c) { this.classes.add(c); },
      remove(c) { this.classes.delete(c); }
    },
    style: {},
    getAttribute(attr) { return this[attr] || ''; }
  };
}

const mockElements = {};
function getEl(id) {
  if (!mockElements[id]) mockElements[id] = createMockEl();
  return mockElements[id];
}

const mockCards = [
  'sarika', 'namtao', 'khunphaen', 'takrut', 'lpthuat', 'tiger',
  'paladkhik', 'wuathanu', 'guman', 'somdej_nak', 'somdej_pae', 'pidta',
  'koon', 'turtle', 'rahu', 'tigertakrut', 'garuda', 'biagae'
].map(id => {
  const el = createMockEl();
  el['data-id'] = id;
  return el;
});

const fakeDom = {
  setTimeout: (fn) => fn(),
  clearTimeout: () => {},
  localStorage: {
    store: {},
    getItem(k) { return this.store[k] !== undefined ? this.store[k] : null; },
    setItem(k, v) { this.store[k] = String(v); },
    removeItem(k) { delete this.store[k]; }
  },
  document: {
    querySelectorAll(selector) {
      if (selector === '.card') return mockCards;
      if (selector === '.tab-btn') return [getEl('tab-unposted'), getEl('tab-posted'), getEl('tab-all')];
      return [];
    },
    querySelector(selector) {
      const match = selector.match(/data-id="([^"]+)"/);
      if (match) return mockCards.find(c => c['data-id'] === match[1]);
      return createMockEl();
    },
    getElementById(id) { return getEl(id); },
    createElement() { return createMockEl(); },
    body: { appendChild() {}, removeChild() {} }
  },
  window: {},
  confirm: () => true
};

try {
  vm.runInNewContext(scriptMatch[1], fakeDom);
  console.log('✅ JS Script initialized with zero errors!');

  // Test posting Chinese for sarika
  fakeDom.togglePostedLang('sarika', 'zh');
  let postedZh = fakeDom.getPostedIds('zh');
  let postedEn = fakeDom.getPostedIds('en');
  console.log('After posting sarika in Chinese:');
  console.log('- postedZh:', postedZh);
  console.log('- postedEn:', postedEn);
  if (!postedZh.includes('sarika')) throw new Error('sarika should be in postedZh');
  if (postedEn.includes('sarika')) throw new Error('sarika should NOT be in postedEn');

  // Test posting English for namtao
  fakeDom.togglePostedLang('namtao', 'en');
  postedZh = fakeDom.getPostedIds('zh');
  postedEn = fakeDom.getPostedIds('en');
  console.log('After posting namtao in English:');
  console.log('- postedZh:', postedZh);
  console.log('- postedEn:', postedEn);
  if (postedZh.includes('namtao')) throw new Error('namtao should NOT be in postedZh');
  if (!postedEn.includes('namtao')) throw new Error('namtao should be in postedEn');

  // Test stats values
  console.log('Stat ZH: unposted =', getEl('stat-zh-unposted').innerText, ', posted =', getEl('stat-zh-posted').innerText);
  console.log('Stat EN: unposted =', getEl('stat-en-unposted').innerText, ', posted =', getEl('stat-en-posted').innerText);
  if (getEl('stat-zh-posted').innerText != 1) throw new Error('stat-zh-posted should be 1');
  if (getEl('stat-en-posted').innerText != 1) throw new Error('stat-en-posted should be 1');

  // Test switching global lang
  fakeDom.setGlobalLang('en');
  console.log('Active tab unposted count for English:', getEl('tab-count-unposted').innerText);
  if (getEl('tab-count-unposted').innerText != 17) throw new Error('tab-count-unposted should be 17 for English');

  fakeDom.setGlobalLang('zh');
  console.log('Active tab unposted count for Chinese:', getEl('tab-count-unposted').innerText);
  if (getEl('tab-count-unposted').innerText != 17) throw new Error('tab-count-unposted should be 17 for Chinese');

  console.log('🎉 ALL INTEGRATION TESTS PASSED 100%!');
} catch (e) {
  console.error('❌ Verification Error:', e);
  process.exit(1);
}
