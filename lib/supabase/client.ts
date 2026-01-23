import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/integrations/supabase/types'

export function createClient() {
  // Get environment variables with fallbacks for build time
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

  // Log warning in development if using placeholder values
  if (typeof window !== 'undefined' && supabaseUrl === 'https://placeholder.supabase.co') {
    console.error('❌ Supabase environment variables not set!');
    console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.');
    console.error('In Vercel: Settings → Environment Variables');
  }

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  )
}