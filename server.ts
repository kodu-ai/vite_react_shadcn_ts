import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import honoApp from './src/server/index';

const __dirname = dirname(fileURLToPath(import.meta.url)); // dist directory

// --- Production Server Setup ---
const prodApp = new Hono();

// 1. Mount the Hono API routes under /api
prodApp.route('/api', honoApp);

// 2. Serve specific static files like favicon.ico, robots.txt etc.
//    Assuming serveStatic defaults root to CWD (dist)
prodApp.get('/favicon.ico', serveStatic({ path: './favicon.ico' }));
prodApp.get('/robots.txt', serveStatic({ path: './robots.txt' }));
// Add other specific root files if needed

// 3. Serve static assets from dist/assets
//    Assuming serveStatic defaults root to CWD (dist)
prodApp.use('/assets/*', serveStatic({}));

// 4. Serve the SPA fallback (index.html) for all other GET requests
//    Assuming serveStatic defaults root to CWD (dist)
prodApp.get('*', serveStatic({ path: './index.html' }));

// --- Start Server ---
const port = process.env.PORT || 3000;

// Use __dirname for logging the directory containing server.js
console.log(`Production server starting on port ${port}...`);
console.log(`Serving static files relative to CWD (expected: ${__dirname})`);
console.log(`API routes handled by Hono.`);

serve(
  {
    fetch: prodApp.fetch,
    port: Number(port),
  },
  (info) => {
    console.log(`Server listening on http://localhost:${info.port}`);
  }
);