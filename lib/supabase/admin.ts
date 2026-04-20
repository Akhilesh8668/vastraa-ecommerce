import { createClient } from '@supabase/supabase-js'

// IMPORTANT: This client uses the SERVICE_ROLE_KEY which bypasses RLS.
// ONLY use this in server-side routes (API routes, Server Actions, or Middlewares).
// NEVER import this in client-side code.

let supabaseAdminClient: any = null

export const getSupabaseAdmin = () => {
  if (!supabaseAdminClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !key) {
      throw new Error('Missing Supabase Admin environment variables')
    }

    supabaseAdminClient = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
  return supabaseAdminClient
}
