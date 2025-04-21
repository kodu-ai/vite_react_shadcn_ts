// esbuild.mjs
import * as esbuild from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const entryPoint = resolve(__dirname, 'server.ts');
const outfile = resolve(__dirname, 'dist/server.js');

console.log(`Building ${entryPoint} to ${outfile}...`);

try {
  await esbuild.build({
    entryPoints: [entryPoint],
    outfile: outfile,
    bundle: true,
    platform: 'node',
    format: 'esm',
    // packages: 'external', // Keep node_modules external
    sourcemap: true, // Added sourcemaps
    minify: true, // Keeping it unminified for now
    logLevel: 'info',
  });
  // console.log('Server build successful!');
  process.exit(0);
} catch (error) {
  console.error('Server build failed:', error);
  process.exit(1);
}
