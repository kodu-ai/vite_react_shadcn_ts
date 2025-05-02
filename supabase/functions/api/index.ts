// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { apiRouter } from './routes/app.ts';

// Create a new Hono app.
const app = new Hono();

// Enable CORS for all routes.  Adjust the origin as needed for your application.
app.use(
  '*',
  cors({
    origin: '*', // Allow all origins (for development).  For production, specify your domain.
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Register the API routes from the apiRouter.
app.route('/', apiRouter);

// Start the Deno server.
Deno.serve(app.fetch);
