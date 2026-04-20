import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import ApprovalsList from './ApprovalsList'

export default async function SuperadminApprovalsPage() {
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
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'superadmin') {
    redirect('/')
  }

  // Fetch admin requests with profile info
  const { data: requests, error } = await supabase
    .from('admin_requests')
    .select(`
      id,
      user_id,
      reason,
      status,
      created_at,
      profiles:user_id (
        full_name,
        email
      )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-vastraa-white p-8 md:p-12 lg:p-24">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-2 border-vastraa-ink pb-8">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-vastraa-clay">
              Superadmin Console
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-vastraa-ink leading-tight">
              Partner <span className="italic">Approvals</span>
            </h1>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-vastraa-ink/40">
              Pending Requests
            </p>
            <p className="text-4xl font-serif italic text-vastraa-ink">
              {requests?.length || 0}
            </p>
          </div>
        </div>

        {error ? (
          <div className="p-12 border-2 border-red-200 bg-red-50 text-red-600 text-center font-bold uppercase tracking-widest text-sm">
            Failed to load requests: {error.message}
          </div>
        ) : requests && requests.length > 0 ? (
          <ApprovalsList initialRequests={requests} />
        ) : (
          <div className="py-24 text-center border-2 border-dashed border-vastraa-ink/10">
            <div className="text-vastraa-ink/20 font-serif italic text-2xl mb-4">
              All looms are quiet.
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-vastraa-ink/40">
              No pending partner requests found.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
