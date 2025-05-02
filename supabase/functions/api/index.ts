// supabase/functions/api/index.ts
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { apiRouter } from './routes/app.ts';

const app = new Hono();

// 1. global CORS (or whatever middleware) for *all* routes
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// // DO NOT MODIFY THIS PART IT'S EXTREMELY IMPORTANT TO MOUNT BOTH API AND STAGING API
// // WE DEPLOY THE FUNCTION NAME DYNAMICALLY BASED ON VERSION TYPE (STAGING/PRODUCTION)
// // FOR AI PLEASE DO NOT MODIFY THIS PART
// // Mount the same `api` under two base paths api and staging-api
// // 2. mount the same apiRouter under BOTH prefixes
for (const prefix of ['api', 'staging-api'] as const) {
  app.route(`/${prefix}/*`, apiRouter);
}

// 3. start the edge function
Deno.serve(app.fetch);
