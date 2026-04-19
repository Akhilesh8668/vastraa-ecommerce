import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  const path = request.nextUrl.pathname

  // Protected routes:
  // /account/* → must be logged in
  // /checkout → must be logged in
  if (!session && (path.startsWith('/account') || path === '/checkout')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Admin routes:
  // /admin/* → must be admin or superadmin
  // /superadmin/* → must be superadmin
  if (path.startsWith('/admin') || path.startsWith('/superadmin')) {
    if (!session) return NextResponse.redirect(new URL('/login', request.url))

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, email_verified')
      .eq('id', session.user.id)
      .single()

    if (!profile?.email_verified) {
      return NextResponse.redirect(new URL('/verify-email', request.url))
    }

    if (path.startsWith('/superadmin') && profile.role !== 'superadmin') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (path.startsWith('/admin') && !['admin', 'superadmin'].includes(profile.role)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
