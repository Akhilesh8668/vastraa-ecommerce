"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    } else {
      router.push('/account')
      router.refresh()
    }
  }

  const handleGoogleLogin = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-vastraa-white px-4">
      <div className="max-w-md w-full space-y-8 border-2 border-vastraa-ink p-8 bg-white">
        <div>
          <h2 className="mt-6 text-center text-3xl font-serif text-vastraa-ink">
            Sign In to Vastraa
          </h2>
          <p className="mt-2 text-center text-sm text-vastraa-ink/60">
            Welcome back to contemporary tradition.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" id="password_label" className="block text-sm font-medium text-vastraa-ink">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-vastraa-ink focus:outline-none focus:ring-1 focus:ring-vastraa-clay"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-vastraa-ink/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-vastraa-ink/60">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center py-3 px-4 border-2 border-vastraa-ink text-sm font-medium text-vastraa-ink bg-white hover:bg-vastraa-white transition-colors duration-200"
            >
              Continue with Google
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-vastraa-ink">
          New to Vastraa?{' '}
          <Link href="/register" className="font-medium text-vastraa-clay hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
