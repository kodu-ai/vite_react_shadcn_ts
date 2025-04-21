import { serve } from '@hono/node-server';
import app from './index'; // Import the app definition

const port = 6363;

console.log(`Hono development server running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port: port,
});