import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';

const repoRoot = path.resolve(process.cwd(), '..', '..');
const publicRoot = path.join(process.cwd(), 'public', 'storybook');

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', cwd: repoRoot });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(' ')} failed with code ${code}`));
    });
  });

const copyDir = async (from, to) => {
  await fs.rm(to, { recursive: true, force: true });
  await fs.mkdir(to, { recursive: true });
  const entries = await fs.readdir(from, { withFileTypes: true });
  for (const entry of entries) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) {
      await copyDir(src, dest);
    } else {
      await fs.copyFile(src, dest);
    }
  }
};

const build = async () => {
  await run('npm', ['run', 'build-storybook', '-w', '@layerone-theme/storybook-angular']);
  await run('npm', ['run', 'build-storybook', '-w', '@layerone-theme/storybook-react']);

  const angularOut = path.join(repoRoot, 'apps', 'storybook-angular', 'storybook-static');
  const reactOut = path.join(repoRoot, 'apps', 'storybook-react', 'storybook-static');

  await copyDir(angularOut, path.join(publicRoot, 'angular'));
  await copyDir(reactOut, path.join(publicRoot, 'react'));
};

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
