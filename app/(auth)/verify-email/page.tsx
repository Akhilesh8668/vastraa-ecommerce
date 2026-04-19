import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-vastraa-white px-4">
      <div className="max-w-md w-full space-y-8 border-2 border-vastraa-ink p-8 bg-white text-center">
        <div className="flex justify-center">
          <div className="bg-vastraa-clay/10 p-4 rounded-full">
            <Mail className="h-12 w-12 text-vastraa-clay" />
          </div>
        </div>
        <div>
          <h2 className="mt-6 text-3xl font-serif text-vastraa-ink">
            Check your email
          </h2>
          <p className="mt-4 text-sm text-vastraa-ink/60">
            We&apos;ve sent a verification link to your email address. Please click the link to verify your account and start shopping.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <p className="text-xs text-vastraa-ink/40">
            Didn&apos;t receive the email? Check your spam folder or try signing in to resend.
          </p>
          <div className="flex flex-col space-y-4">
            <Link
              href="/login"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-vastraa-ink hover:bg-vastraa-clay transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="w-full flex justify-center py-3 px-4 border-2 border-vastraa-ink text-sm font-medium text-vastraa-ink bg-white hover:bg-vastraa-white transition-colors duration-200"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
