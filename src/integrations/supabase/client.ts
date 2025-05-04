import { createClient } from '@supabase/supabase-js'
// Import the generated types if available, otherwise use a generic type
import type { Database } from './types' // Assuming types.ts will be generated or created

// These variables should be automatically available in the Kodu environment
// when Supabase is connected via the .env file.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase URL or Anon Key is missing.",
    "Make sure Supabase is connected and environment variables",
    "(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are set, often in a .env file."
  );
  // You might want to throw an error or handle this case more gracefully
  // depending on your application's needs.
}

// Create and export the Supabase client instance
// Use the Database type generic if types are available for better type safety
export const supabase = createClient<Database>(supabaseUrl!, supabaseAnonKey!);

// Example usage:
// const { data, error } = await supabase.from('bookings').select('*')
