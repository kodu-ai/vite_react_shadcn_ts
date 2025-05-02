// supabase/functions/api/routes/app.ts

import { Hono } from 'npm:hono';
import { z } from 'npm:zod';
import { zValidator } from 'npm:@hono/zod-validator';

// Create a new Hono router for all API routes.
const apiRouter = new Hono();

// Define the schema for the request query parameters for the /api/hello route (optional).
const helloSchema = z.object({
  name: z.string().optional(),
});

// Define the /api/hello route.
// This route accepts an optional 'name' query parameter.
apiRouter.get('/api/hello', zValidator('query', helloSchema), async (c) => {
  // Extract the name from the query parameters.
  const { name } = c.req.valid('query');
  // Create a personalized message if a name is provided, otherwise use a default message.
  const message = name ? `Hello, ${name}!` : 'Hello from hono-server!';
  // Return the message as a text response.
  return c.text(message);
});

// Define the schema for the request body for the /api/submit route.
const submitSchema = z.object({
  data: z.string(),
});

// Define the /api/submit route.
// This route expects a JSON body with a 'data' field.
apiRouter.post('/api/submit', zValidator('json', submitSchema), async (c) => {
  // Extract the data from the request body.
  const { data } = c.req.valid('json');
  // Log the received data to the console.
  console.log(data);
  // Return a JSON response with a success message.
  return c.json({ message: 'Data received!' });
});

// Export the apiRouter.
export { apiRouter };
