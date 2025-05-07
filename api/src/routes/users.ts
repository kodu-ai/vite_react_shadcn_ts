import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { db } from '@/db/index';
import { users } from '@/db/schema';

const app = new Hono();

// Get all users
app.get('/', async (c) => {
  try {
    const allUsers = await db.select().from(users);
    return c.json({ users: allUsers });
  } catch (error) {
    return c.json({ error: 'Failed to fetch users' }, 500);
  }
});

// Get user by ID
app.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));

  try {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

    if (user.length === 0) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({ user: user[0] });
  } catch (error) {
    return c.json({ error: 'Failed to fetch user' }, 500);
  }
});

// Create new user
app.post('/', async (c) => {
  try {
    const body = await c.req.json();

    if (!body.name || !body.email) {
      return c.json({ error: 'Name and email are required' }, 400);
    }

    const newUser = await db
      .insert(users)
      .values({
        name: body.name,
        email: body.email,
      })
      .returning();

    return c.json({ user: newUser[0] }, 201);
  } catch (error) {
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

export default app;
