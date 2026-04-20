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

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // Protected routes checklist
  const isAuthRoute = path.startsWith('/login') || path.startsWith('/register')
  const isAccountRoute = path.startsWith('/account') || path === '/checkout'
  const isAdminRoute = path.startsWith('/admin') || path.startsWith('/superadmin')

  // 1. If trying to access /admin or /superadmin routes
  if (isAdminRoute) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, email_verified')
      .eq('id', user.id)
      .single()

    // Must have verified email for admin access
    if (!profile?.email_verified) {
      return NextResponse.redirect(new URL('/verify-email', request.url))
    }

    // superadmin only check
    if (path.startsWith('/superadmin') && profile.role !== 'superadmin') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // admin check (superadmins also allowed)
    if (path.startsWith('/admin') && !['admin', 'superadmin'].includes(profile.role)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // 2. Account protected routes
  if (isAccountRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 3. Prevent logged-in users from hitting /login or /register
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/account', request.url))
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
