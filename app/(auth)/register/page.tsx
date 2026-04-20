"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createAdminRequest } from './actions'
import { cn } from '@/lib/utils'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [role, setRole] = useState<'user' | 'admin_request'>('user')
  const [adminReason, setAdminReason] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    
    // 1. Sign up with metadata
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          requested_role: role,
          admin_reason: role === 'admin_request' ? adminReason : null
        },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setIsLoading(false)
      return
    }

    // 2. If admin requested, create record in admin_requests table
    if (role === 'admin_request' && data.user) {
      const { success, error: actionError } = await createAdminRequest(data.user.id, adminReason)
      if (!success) {
        console.error('Failed to create admin request record:', actionError)
        // We don't block the whole registration, but log it
      }
    }

    router.push('/verify-email')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-vastraa-white px-4 py-12">
      <div className="max-w-md w-full space-y-8 border-2 border-vastraa-ink p-8 bg-white shadow-[8px_8px_0px_0px_rgba(28,28,28,1)]">
        <div>
          <h2 className="text-center text-4xl font-serif text-vastraa-ink tracking-tight">
            Join Vastraa
          </h2>
          <p className="mt-4 text-center text-sm text-vastraa-ink/60 font-medium uppercase tracking-[0.2em]">
            Tradition, Tailored for Today.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div>
              <label htmlFor="full-name" className="block text-[10px] font-bold uppercase tracking-widest text-vastraa-ink/40 mb-1">
                Full Name
              </label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                required
                className="block w-full px-4 py-3 border-2 border-vastraa-ink focus:outline-none focus:ring-0 focus:border-vastraa-clay transition-colors"
                placeholder="Janmejay Singh"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-[10px] font-bold uppercase tracking-widest text-vastraa-ink/40 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="block w-full px-4 py-3 border-2 border-vastraa-ink focus:outline-none focus:ring-0 focus:border-vastraa-clay transition-colors"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" id="password_label" className="block text-[10px] font-bold uppercase tracking-widest text-vastraa-ink/40 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full px-4 py-3 border-2 border-vastraa-ink focus:outline-none focus:ring-0 focus:border-vastraa-clay transition-colors"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" id="confirm_password_label" className="block text-[10px] font-bold uppercase tracking-widest text-vastraa-ink/40 mb-1">
                  Confirm
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full px-4 py-3 border-2 border-vastraa-ink focus:outline-none focus:ring-0 focus:border-vastraa-clay transition-colors"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            {/* Role selection Cards */}
            <div className="space-y-3">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-vastraa-ink/40">
                Choose your path
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={cn(
                    "p-4 border-2 text-left transition-all duration-200",
                    role === 'user' 
                      ? "border-vastraa-ink bg-vastraa-ink text-white shadow-[4px_4px_0px_0px_rgba(198,93,59,1)]" 
                      : "border-vastraa-ink/10 bg-white text-vastraa-ink hover:border-vastraa-ink/30"
                  )}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-tighter mb-1 opacity-60">Customer</span>
                  <span className="block text-sm font-serif italic">Shop the Loom</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin_request')}
                  className={cn(
                    "p-4 border-2 text-left transition-all duration-200",
                    role === 'admin_request' 
                      ? "border-vastraa-ink bg-vastraa-ink text-white shadow-[4px_4px_0px_0px_rgba(198,93,59,1)]" 
                      : "border-vastraa-ink/10 bg-white text-vastraa-ink hover:border-vastraa-ink/30"
                  )}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-tighter mb-1 opacity-60">Partner</span>
                  <span className="block text-sm font-serif italic">Apply to Sell</span>
                </button>
              </div>
            </div>

            {/* Admin Reason Textarea */}
            {role === 'admin_request' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-vastraa-ink/40 mb-1">
                  Why do you want to sell on Vastraa?
                </label>
                <textarea
                  required
                  rows={3}
                  className="block w-full px-4 py-3 border-2 border-vastraa-ink focus:outline-none focus:ring-0 focus:border-vastraa-clay transition-colors"
                  placeholder="Tell us about your craft and products..."
                  value={adminReason}
                  onChange={(e) => setAdminReason(e.target.value)}
                />
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-[10px] font-bold uppercase tracking-widest border-2 border-red-500/20 bg-red-50 p-3 italic">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 border-2 border-vastraa-ink bg-vastraa-ink text-white font-bold uppercase tracking-[0.3em] text-xs hover:bg-vastraa-clay hover:border-vastraa-clay transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Create Account'}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-xs font-medium text-vastraa-ink/60 uppercase tracking-widest">
          Already woven in?{' '}
          <Link href="/login" className="text-vastraa-clay hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
