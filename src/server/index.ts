import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

// Define routes with the /api prefix
app.get('/hello', (c) => {
  return c.json({ message: 'Hello from Hono API!' });
});

// The server is started by `tsx` in development (via dev:api script)
// or by `server.js` in production.
// This file should only define and export the Hono app instance.

export default app; // Export the app instance
