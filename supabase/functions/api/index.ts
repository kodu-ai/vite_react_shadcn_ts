// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { z } from 'npm:zod-openapi';

// pnpm add hono-openapi @hono/zod-validator zod zod-openapi

// change this to your function name
const functionName = 'hello-world';
const app = new Hono().basePath(`/${functionName}`);
app.use('/api/*', cors());
app.use(
  '/api2/*',
  cors({
    origin: 'http://example.com',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
);
app.get('/hello', (c) => c.text('Hello from hono-server!'));

Deno.serve(app.fetch);
