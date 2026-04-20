"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, ShieldCheck, UserPlus, Fingerprint } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createAdminRequest } from '@/app/(auth)/register/actions'

interface AuthFormProps {
  initialMode?: 'login' | 'register'
}

export default function AuthForm({ initialMode = 'login' }: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  
  const [role, setRole] = useState<'user' | 'admin_request'>('user')
  const [adminReason, setAdminReason] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (mode === 'login') {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
        if (loginError) throw loginError
        router.push('/dashboard')
        router.refresh()
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }

        const origin = window.location.origin
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

        if (signUpError) throw signUpError

        if (role === 'admin_request' && data.user) {
          await createAdminRequest(data.user.id, adminReason)
        }
        router.push('/verify-email')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    const origin = window.location.origin
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 selection:bg-primary selection:text-white bg-background overflow-hidden">
      
      {/* Left Column: Form Section */}
      <div className="flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 relative z-10">
        {/* Back Button */}
        <Link 
          href="/" 
          className="absolute top-10 left-10 flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-white/30 hover:text-white transition-colors group"
        >
          <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={14} />
          Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-12"
        >
          {/* Logo & Intro */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-baseline gap-2">
              <span className="text-3xl font-serif font-bold tracking-tighter text-white">VASTRAA</span>
              <span className="text-xs font-hindi text-primary">वस्त्र</span>
            </Link>
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
            <button
              onClick={() => { router.push('/login'); setError(null); }}
              className={cn(
                "px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500",
                mode === 'login' ? "bg-white text-black shadow-xl" : "text-white/30 hover:text-white/60"
              )}
            >
              Sign In
            </button>
            <button
              onClick={() => { router.push('/register'); setError(null); }}
              className={cn(
                "px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500",
                mode === 'register' ? "bg-white text-black shadow-xl" : "text-white/30 hover:text-white/60"
              )}
            >
              Create Account
            </button>
          </div>

          {/* Dynamic Form Area */}
          <form className="space-y-8" onSubmit={handleAuth}>
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {mode === 'register' && (
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                      <input
                        type="text"
                        required
                        className="auth-input pl-14"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                    <input
                      type="email"
                      required
                      className="auth-input pl-14"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      className="auth-input pl-14 pr-14"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                    >
                      <Fingerprint size={16} className={cn("transition-all", showPassword && "text-primary")} />
                    </button>
                  </div>
                </div>

                {mode === 'register' && (
                  <>
                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          className="auth-input pl-14"
                          placeholder="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Artisan Toggle */}
                    <div className="pt-4 space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-2">Choose Path</p>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setRole('user')}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl border transition-all duration-500",
                            role === 'user' ? "bg-white/10 border-white/20 text-white" : "bg-transparent border-white/5 text-white/20"
                          )}
                        >
                          <Fingerprint size={16} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Collector</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setRole('admin_request')}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl border transition-all duration-500",
                            role === 'admin_request' ? "bg-primary/20 border-primary/30 text-primary" : "bg-transparent border-white/5 text-white/20"
                          )}
                        >
                          <ShieldCheck size={16} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Artisan</span>
                        </button>
                      </div>
                      
                      {role === 'admin_request' && (
                        <motion.textarea
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          placeholder="Your Crafting Heritage..."
                          required
                          className="auth-input min-h-[100px] py-4 resize-none"
                          value={adminReason}
                          onChange={(e) => setAdminReason(e.target.value)}
                        />
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {error && (
              <p className="text-primary text-[10px] font-black uppercase tracking-widest text-center animate-pulse">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-primary/20 flex items-center justify-center gap-3"
            >
              {isLoading ? mode === 'login' ? 'Authorizing...' : 'Assembling...' : (
                <> {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'} <ArrowRight size={16} /> </>
              )}
            </button>
          </form>

          {/* Social Auth */}
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[8px] uppercase font-bold tracking-[0.4em]">
                <span className="px-4 bg-background text-white/20">Sign in with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleAuth}
              className="w-full py-4 border border-white/5 rounded-2xl flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/40 hover:bg-white hover:text-black transition-all duration-500"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
            <p className="text-[10px] text-center text-white/20 font-bold uppercase tracking-widest">
              By continuing, you agree to Vastraa's <span className="text-white/40 underline">Terms of Curatorial Service</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Visual Section */}
      <div className="hidden lg:flex relative items-center justify-center bg-background overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-background opacity-90" />
          {/* Large Hindi Text Backdrop */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-10">
            <span className="text-[40rem] font-hindi leading-none scale-150 rotate-12">वस्त्र</span>
          </div>
        </div>

        {/* Content Over Graphic */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center space-y-8 px-12"
        >
          <div className="space-y-4">
             <h2 className="text-6xl font-serif text-white leading-tight italic tracking-tighter">
               Tradition, <br /> Tailored <br /> for Today.
             </h2>
             <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/60">
               Heritage Indian textiles for modern living
             </p>
          </div>
          
          <div className="pt-12 grid grid-cols-3 gap-8">
            {[
              { label: 'Natural', value: '100%', sub: 'Fibers' },
              { label: 'Dispatch', value: '48H', sub: 'Status' },
              { label: 'Happy', value: '12K+', sub: 'Customers' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-[8px] font-black uppercase tracking-widest text-white/40">{stat.label}</p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-[8px] font-medium text-white/30 italic">{stat.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <div className="absolute bottom-10 left-10 text-[10px] font-black uppercase tracking-[0.5em] text-white/10 transform -rotate-90 origin-left">
           Woven in Indore
        </div>
      </div>

    </div>
  )
}
