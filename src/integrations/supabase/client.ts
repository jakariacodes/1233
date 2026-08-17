import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use environment variables for the Supabase client
// When Lovable Cloud is enabled, these are automatically provided.
// We use a fallback empty string to avoid crashes during build/prerender if they aren't set yet.
const supabaseUrl = import.meta.env['VITE_SUPABASE_URL'] || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env['VITE_SUPABASE_ANON_KEY'] || 'placeholder-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});