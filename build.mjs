import { cp, mkdir, readdir, rm } from 'node:fs/promises';

const output = new URL('./dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const files = (await readdir(new URL('.', import.meta.url))).filter((name) =>
  name.endsWith('.html') || name.endsWith('.css') || name.endsWith('.js')
);

await Promise.all(files.map((name) => cp(new URL(name, import.meta.url), new URL(name, output))));
console.log(`Built ${files.length} production files in dist/`);
