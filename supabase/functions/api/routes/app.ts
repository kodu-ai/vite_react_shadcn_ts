// supabase/functions/api/routes/app.ts

import { Hono } from 'npm:hono';
import { testRouter } from './test.ts';

// Create a new Hono router for all API routes.
const apiRouter = new Hono();

// register all the routes

// we should always mount the router on '/' and use the basePath on the router itself
apiRouter.route('/', testRouter); // Mount directly under the parent prefix

// export the apiRouter for use in the main function
export { apiRouter };
