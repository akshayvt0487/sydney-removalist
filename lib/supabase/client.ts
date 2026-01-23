import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/integrations/supabase/types'

export function createClient() {
  // Get environment variables with fallbacks for build time
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  )
}