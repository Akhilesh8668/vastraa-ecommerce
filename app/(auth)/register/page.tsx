"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  })
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
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          role: formData.role
        },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      router.push('/verify-email')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-vastraa-white px-4">
      <div className="max-w-md w-full space-y-8 border-2 border-vastraa-ink p-8 bg-white">
        <div>
          <h2 className="mt-6 text-center text-3xl font-serif text-vastraa-ink">
            Join Vastraa
          </h2>
          <p className="mt-2 text-center text-sm text-vastraa-ink/60">
            Start your journey with contemporary tradition.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-vastraa-ink">
                Full Name
              </label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-vastraa-ink focus:outline-none focus:ring-1 focus:ring-vastraa-clay"
                placeholder="Janmejay Singh"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-vastraa-ink">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-vastraa-ink focus:outline-none focus:ring-1 focus:ring-vastraa-clay"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" id="password_id" className="block text-sm font-medium text-vastraa-ink">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-vastraa-ink focus:outline-none focus:ring-1 focus:ring-vastraa-clay"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" id="confirm_password_id" className="block text-sm font-medium text-vastraa-ink">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-vastraa-ink focus:outline-none focus:ring-1 focus:ring-vastraa-clay"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-vastraa-ink">Account Type</label>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'user' })}
                  className={`py-2 px-4 border ${formData.role === 'user' ? 'bg-vastraa-ink text-white border-vastraa-ink' : 'bg-white text-vastraa-ink border-vastraa-ink/20'} text-sm font-medium transition-colors duration-200`}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'admin' })}
                  className={`py-2 px-4 border ${formData.role === 'admin' ? 'bg-vastraa-ink text-white border-vastraa-ink' : 'bg-white text-vastraa-ink border-vastraa-ink/20'} text-sm font-medium transition-colors duration-200`}
                >
                  Admin/Seller
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm border border-red-200 bg-red-50 p-2">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-vastraa-ink hover:bg-vastraa-clay focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vastraa-ink transition-colors duration-200"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-vastraa-ink">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-vastraa-clay hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
