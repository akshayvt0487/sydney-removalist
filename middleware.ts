import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Update session for all requests
  const response = await updateSession(request)

  // Protected routes that require authentication
  const protectedRoutes = ['/admin']
  const authRoutes = ['/auth']

  const { pathname } = request.nextUrl

  // Get the supabase session from cookies
  const sessionCookie = request.cookies.get('sb-zbqzjtbjdepgwmnbskbu-auth-token')
  const hasSession = !!sessionCookie

  // Redirect to auth if accessing protected route without session
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !hasSession) {
    const redirectUrl = new URL('/auth', request.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to home if accessing auth route with active session
  if (authRoutes.some(route => pathname.startsWith(route)) && hasSession) {
    return NextResponse.redirect(new URL('/', request.url))
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
     * - public folder
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
