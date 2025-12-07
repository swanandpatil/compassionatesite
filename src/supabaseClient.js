import { createClient } from '@supabase/supabase-js'

// Load values from .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create and export the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
