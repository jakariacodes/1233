import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use environment variables for the Supabase client
// When Lovable Cloud is enabled, these are automatically provided.
// We use a fallback empty string to avoid crashes during build/prerender if they aren't set yet.
const supabaseUrl = import.meta.env['VITE_SUPABASE_URL'] || 'https://stcctelyxnyvoksnucrq.supabase.co';
const supabaseAnonKey = import.meta.env['VITE_SUPABASE_ANON_KEY'] || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Y2N0ZWx5eG55dm9rc25uY3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4NjQxNTAsImV4cCI6MjEwMjQ0MDE1MH0.L4IjvfW5flJF6NgGHHw4oLoknmk7SxWxHMnXjqQV_as';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});