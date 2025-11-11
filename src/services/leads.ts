import { supabase } from '@/lib/supabase/client'

export const captureLead = async (email: string) => {
  const { data, error } = await supabase.functions.invoke('lead-capture', {
    body: { email },
  })

  if (error) {
    console.error('Error capturing lead:', error)
    // Attempt to parse a more specific error message from the function's response data
    if (data && data.error) {
      throw new Error(data.error)
    }
    throw new Error(error.message || 'An unknown error occurred.')
  }

  // The function might return a specific message, e.g., for duplicates.
  if (data && data.message) {
    return { message: data.message }
  }

  return { data }
}
