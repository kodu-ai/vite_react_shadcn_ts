import { createClient } from 'jsr:@supabase/supabase-js@2';
import { Database } from './types.ts';

export const supabase = createClient<Database>(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);
