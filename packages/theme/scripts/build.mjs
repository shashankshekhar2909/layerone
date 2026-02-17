import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const tokensPath = path.resolve(packageRoot, '..', 'tokens', 'src', 'tokens.json');
const overridesPath = path.join(packageRoot, 'src', 'overrides.json');
const distDir = path.join(packageRoot, 'dist');

const kebab = (value) => value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const isTokenLeaf = (node) => typeof node === 'object' && node && 'value' in node;

const flattenTokens = (node, prefix = []) => {
  const entries = [];
  for (const [key, value] of Object.entries(node)) {
    const next = [...prefix, kebab(key)];
    if (isTokenLeaf(value)) {
      entries.push({
        name: `--${next.join('-')}`,
        value: value.value
      });
    } else if (typeof value === 'object' && value) {
      entries.push(...flattenTokens(value, next));
    }
  }
  return entries;
};

const buildUtilities = (tokens) => {
  const lines = [];

  const spacing = Object.keys(tokens.spacing || {});
  for (const key of spacing) {
    lines.push(`.u-p-${key} { padding: var(--spacing-${key}); }`);
    lines.push(`.u-pt-${key} { padding-top: var(--spacing-${key}); }`);
    lines.push(`.u-pr-${key} { padding-right: var(--spacing-${key}); }`);
    lines.push(`.u-pb-${key} { padding-bottom: var(--spacing-${key}); }`);
    lines.push(`.u-pl-${key} { padding-left: var(--spacing-${key}); }`);
    lines.push(`.u-m-${key} { margin: var(--spacing-${key}); }`);
    lines.push(`.u-mt-${key} { margin-top: var(--spacing-${key}); }`);
    lines.push(`.u-mr-${key} { margin-right: var(--spacing-${key}); }`);
    lines.push(`.u-mb-${key} { margin-bottom: var(--spacing-${key}); }`);
    lines.push(`.u-ml-${key} { margin-left: var(--spacing-${key}); }`);
    lines.push(`.u-gap-${key} { gap: var(--spacing-${key}); }`);
  }

  const fontSizes = Object.keys(tokens.typography?.fontSize || {});
  for (const key of fontSizes) {
    lines.push(`.u-text-${kebab(key)} { font-size: var(--typography-font-size-${kebab(key)}); }`);
  }

  const fontWeights = Object.keys(tokens.typography?.fontWeight || {});
  for (const key of fontWeights) {
    lines.push(`.u-font-${kebab(key)} { font-weight: var(--typography-font-weight-${kebab(key)}); }`);
  }

  const radii = Object.keys(tokens.radius || {});
  for (const key of radii) {
    lines.push(`.u-radius-${kebab(key)} { border-radius: var(--radius-${kebab(key)}); }`);
  }

  const shadows = Object.keys(tokens.shadow || {});
  for (const key of shadows) {
    lines.push(`.u-shadow-${kebab(key)} { box-shadow: var(--shadow-${kebab(key)}); }`);
  }

  lines.push('.u-flex { display: flex; }');
  lines.push('.u-grid { display: grid; }');
  lines.push('.u-items-center { align-items: center; }');
  lines.push('.u-justify-between { justify-content: space-between; }');

  lines.push('.u-transition-base { transition: all var(--motion-duration-base) var(--motion-easing-standard); }');
  lines.push('.u-transition-fast { transition: all var(--motion-duration-fast) var(--motion-easing-standard); }');
  lines.push('.u-transition-slow { transition: all var(--motion-duration-slow) var(--motion-easing-emphasized); }');

  return lines.join('\n');
};

const build = async () => {
  const tokens = JSON.parse(await fs.readFile(tokensPath, 'utf8'));
  const overrides = JSON.parse(await fs.readFile(overridesPath, 'utf8'));

  const lightTokens = flattenTokens(tokens);
  const darkTokens = flattenTokens(overrides.dark || {});

  await fs.mkdir(distDir, { recursive: true });

  const base = [
    ':root {',
    '  color-scheme: light;',
    '  --density-scale: 1;',
    '  --touch-target-min: 44px;',
    '}',
    '',
    ':root, [data-theme="light"] {',
    ...lightTokens.map((token) => `  ${token.name}: ${token.value};`),
    '}',
    '',
    '[data-theme="dark"] {',
    '  color-scheme: dark;',
    ...darkTokens.map((token) => `  ${token.name}: ${token.value};`),
    '}',
    '',
    '[data-density="compact"] {',
    '  --density-scale: 0.85;',
    '}',
    ''
  ].join('\n');

  const utilities = buildUtilities(tokens);

  const css = `${base}\n/* Utilities */\n${utilities}\n`;
  await fs.writeFile(path.join(distDir, 'index.css'), css, 'utf8');
};

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
