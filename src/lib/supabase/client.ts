import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_PUBLISHABLE_KEY = import.meta.env
  .VITE_SUPABASE_PUBLISHABLE_KEY as string

let supabaseInstance: SupabaseClient<Database> | null = null

const initializeSupabase = () => {
  if (!SUPABASE_URL) {
    console.error(
      'Supabase URL is missing. Please add VITE_SUPABASE_URL to your .env file.',
    )
    throw new Error(
      'VITE_SUPABASE_URL is not defined. Please check your .env file.',
    )
  }

  if (!SUPABASE_URL.startsWith('http')) {
    console.error(
      `Invalid Supabase URL: Must be a valid HTTP or HTTPS URL. Received: ${SUPABASE_URL}`,
    )
    throw new Error(
      `Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL. Received: ${SUPABASE_URL}`,
    )
  }

  if (!SUPABASE_PUBLISHABLE_KEY) {
    console.error(
      'Supabase Anon Key is missing. Please add VITE_SUPABASE_PUBLISHABLE_KEY to your .env file.',
    )
    throw new Error(
      'VITE_SUPABASE_PUBLISHABLE_KEY is not defined. Please check your .env file.',
    )
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}

try {
  supabaseInstance = initializeSupabase()
} catch (error) {
  console.error(
    'Failed to initialize Supabase client:',
    (error as Error).message,
  )
  // In a real app, you might want to show a user-friendly error message
  // or disable features that depend on Supabase.
}

// Export a potentially null client and let the consuming code handle it,
// or export a function that returns the client. Here we export the instance.
export const supabase = supabaseInstance as SupabaseClient<Database>
