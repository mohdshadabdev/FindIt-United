
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fowfuktcnjjcvmxfwtys.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvd2Z1a3RjbmpqY3ZteGZ3dHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNTY3MDQsImV4cCI6MjA2MTkzMjcwNH0.TzYUP8nNHXhbinKsp2QO7Oz-1A1FWZLGlzo2H5qvnEE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});
