import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!SUPABASE_URL) {
  console.error(
    'Supabase client initialization error: VITE_SUPABASE_URL is not configured in the environment variables.',
  )
  throw new Error('VITE_SUPABASE_URL is missing. Please check your .env file.')
}

if (!SUPABASE_PUBLISHABLE_KEY) {
  console.error(
    'Supabase client initialization error: VITE_SUPABASE_PUBLISHABLE_KEY is not configured in the environment variables.',
  )
  throw new Error(
    'VITE_SUPABASE_PUBLISHABLE_KEY is missing. Please check your .env file.',
  )
}

// The createClient function will throw an error if the URL is invalid (e.g., not a valid HTTP or HTTPS URL),
// which fulfills the acceptance criteria.
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  },
)
