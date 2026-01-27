import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Update session for all requests
  const response = await updateSession(request)

  // Protected routes that require authentication
  const protectedRoutes = ['/admin', '/dashboard']
  const authRoutes = ['/auth']
  const publicAuthRoutes = ['/auth/access-denied'] // Auth routes that should be accessible even with a session

  const { pathname } = request.nextUrl

  // Get the supabase session from cookies
  const sessionCookie = request.cookies.get('sb-zbqzjtbjdepgwmnbskbu-auth-token')
  const hasSession = !!sessionCookie

  // Debug logging
  const isPublicAuthRoute = publicAuthRoutes.some(route => pathname.startsWith(route))
  console.log('=== MIDDLEWARE ===', pathname, 'Session:', hasSession, 'PublicAuth:', isPublicAuthRoute);

  // Redirect to auth if accessing protected route without session
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !hasSession) {
    const redirectUrl = new URL('/auth', request.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to dashboard if accessing auth route with active session
  // BUT exclude public auth routes like access-denied
  if (authRoutes.some(route => pathname.startsWith(route)) && hasSession && !isPublicAuthRoute) {
    console.log('REDIRECTING TO DASHBOARD FROM:', pathname);
    return NextResponse.redirect(new URL('/dashboard', request.url))
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
