"use server"

import { getSupabaseAdmin } from '@/lib/supabase/admin'

export async function createAdminRequest(userId: string, reason: string) {
  try {
    const admin = getSupabaseAdmin()
    const { error } = await admin
      .from('admin_requests')
      .insert({
        user_id: userId,
        reason: reason,
        status: 'pending'
      })

    if (error) throw error
    return { success: true }
  } catch (error: any) {
    console.error('Error creating admin request:', error)
    return { success: false, error: error.message }
  }
}
