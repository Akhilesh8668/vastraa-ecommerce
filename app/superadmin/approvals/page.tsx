import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ApprovalsList from './ApprovalsList'
import { ShieldCheck } from 'lucide-react'

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
    <div className="min-h-screen bg-background pt-32 p-8 md:p-12 lg:p-24 selection:bg-primary selection:text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/5 pb-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <ShieldCheck size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em]">
                Registry Permissions
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif text-white leading-tight tracking-tighter">
              Artisan <span className="italic text-gradient">Approvals</span>
            </h1>
          </div>
          <div className="text-right space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
              Pending Applications
            </p>
            <p className="text-6xl font-serif italic text-white/80">
              {requests?.length || 0}
            </p>
          </div>
        </div>

        {/* Content Section */}
        {error ? (
          <div className="p-16 border border-primary/20 bg-primary/5 text-primary text-center font-black uppercase tracking-widest text-[10px] rounded-[2rem]">
            Failed to Synchronize Registry: {error.message}
          </div>
        ) : requests && requests.length > 0 ? (
          <ApprovalsList initialRequests={requests} />
        ) : (
          <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[3rem] group hover:border-white/10 transition-colors">
            <div className="text-white/10 font-serif italic text-3xl mb-4 group-hover:text-white/20 transition-colors">
              The Looms are Quiet
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/10 group-hover:text-white/30 transition-colors">
              No artisanal sell requests currently in the queue.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
