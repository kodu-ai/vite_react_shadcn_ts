import { serve } from '@hono/node-server';
import app from './index'; // Import the app definition

const port = 6363;

serve({
  fetch: app.fetch,
  port: port,
});
