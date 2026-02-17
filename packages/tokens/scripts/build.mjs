import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const srcPath = path.join(packageRoot, 'src', 'tokens.json');
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

const build = async () => {
  const raw = JSON.parse(await fs.readFile(srcPath, 'utf8'));
  const flat = flattenTokens(raw);

  await fs.mkdir(distDir, { recursive: true });

  const css = [':root {', ...flat.map((token) => `  ${token.name}: ${token.value};`), '}', ''].join('\n');
  await fs.writeFile(path.join(distDir, 'tokens.css'), css, 'utf8');

  const js = `export const tokens = ${JSON.stringify(raw, null, 2)};\n`;
  await fs.writeFile(path.join(distDir, 'index.js'), js, 'utf8');

  const dts = `export const tokens: Record<string, any>;\nexport type Tokens = typeof tokens;\n`;
  await fs.writeFile(path.join(distDir, 'index.d.ts'), dts, 'utf8');
};

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
