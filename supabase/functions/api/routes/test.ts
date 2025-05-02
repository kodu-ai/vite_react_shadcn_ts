// supabase/functions/api/routes/test.ts

import { Hono } from 'npm:hono';
import { z } from 'npm:zod';
import { zValidator } from 'npm:@hono/zod-validator';

// Create a new Hono router for all API routes.
// IMPORTANT YOU SHOULD SET A BASE PATH FOR YOUR ROUTER HERE
// This is the base path for all routes defined in this router.
const testRouter = new Hono().basePath('/test');

// Define the schema for the request query parameters for the /hello route (optional).
const testSchema = z.object({
  name: z.string().optional(),
});

// Define the /hello route.
// This route accepts an optional 'name' query parameter.
testRouter.get('/hello', zValidator('query', testSchema), async (c) => {
  console.log('test route called');
  // Extract the name from the query parameters.
  const { name } = c.req.valid('query');
  // Create a personalized message if a name is provided, otherwise use a default message.
  const message = name ? `test, ${name}!` : 'test from hono-server!';
  // Return the message as a text response.
  return c.text(message);
});

// Define the schema for the request body for the /submit route.
const submitSchema = z.object({
  data: z.string(),
});

// Define the /submit route.
// This route expects a JSON body with a 'data' field.
testRouter.post('/submit', zValidator('json', submitSchema), async (c) => {
  // Extract the data from the request body.
  const { data } = c.req.valid('json');
  // Log the received data to the console.
  console.log(data);
  // Return a JSON response with a success message.
  return c.json({ message: 'Data received!' });
});

// Export the testRouter.
export { testRouter };
