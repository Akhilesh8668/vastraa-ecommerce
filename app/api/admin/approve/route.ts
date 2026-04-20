import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const { userId, requestId } = await request.json()

    // 1. Verify caller is superadmin
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return new NextResponse('Unauthorized', { status: 401 })

    const { data: callerProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (callerProfile?.role !== 'superadmin') {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const admin = getSupabaseAdmin()
    // Update profile
    const { error: profileError } = await admin
      .from('profiles')
      .update({ 
        role: 'admin', 
        admin_approved: true,
        email_verified: true // Auto-verify if superadmin approved
      })
      .eq('id', userId)

    if (profileError) throw profileError

    // Update request status
    const { error: requestError } = await admin
      .from('admin_requests')
      .update({ 
        status: 'approved',
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', requestId)

    if (requestError) throw requestError

    // 3. Get user email for notification
    const { data: targetProfile } = await admin
      .from('profiles')
      .select('email, full_name')
      .eq('id', userId)
      .single()

    // 4. Send notification via Resend
    if (resend && targetProfile?.email) {
      await resend.emails.send({
        from: 'Vastraa <notifications@vastraa.com>',
        to: targetProfile.email,
        subject: 'Welcome to the Loom - Admin Account Approved',
        html: `
          <h1>Congratulations, ${targetProfile.full_name}!</h1>
          <p>Your application to sell on Vastraa has been approved.</p>
          <p>You can now access the admin dashboard to manage your products and orders.</p>
          <a href="${new URL('/admin', request.url).origin}/admin">Go to Dashboard</a>
        `
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Approval Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
