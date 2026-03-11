import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname, hostname, protocol } = request.nextUrl
  const host = request.headers.get('host') || hostname

  // CANONICAL DOMAIN REDIRECT: Enforce https://www.sydneyremovalist.com.au
  // This MUST be done before any other redirects to avoid redirect chains
  const isProduction = host && !host.includes('localhost') && !host.includes('127.0.0.1')
  
  if (isProduction) {
    const shouldRedirect = 
      protocol !== 'https:' ||  // HTTP → HTTPS
      (!host.startsWith('www.') && host !== 'sydneyremovalist.com.au') || // Non-standard domain
      (host === 'sydneyremovalist.com.au'); // Non-www → www
    
    if (shouldRedirect) {
      const canonicalHost = 'www.sydneyremovalist.com.au';
      const url = new URL(`https://${canonicalHost}${pathname}`);
      
      // Preserve query string and hash
      if (request.nextUrl.search) {
        url.search = request.nextUrl.search;
      }
      
      // Use 301 for permanent redirect (best for SEO)
      return NextResponse.redirect(url, 301);
    }
  }

  // Redirect /locations/[region]/[suburb] to /[region]/[suburb]
  // 301 permanent redirect for SEO
  if (pathname.startsWith('/locations/') && pathname !== '/locations') {
    const newPath = pathname.replace('/locations/', '/');
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    return NextResponse.redirect(url, 301);
  }

  // Protected routes that require authentication
  const protectedRoutes = ['/admin', '/dashboard']
  const authRoutes = ['/auth']
  const publicAuthRoutes = ['/auth/access-denied'] // Auth routes that should be accessible even with a session

  // Get the supabase session from cookies
  const sessionCookie = request.cookies.get('sb-zbqzjtbjdepgwmnbskbu-auth-token')
  const hasSession = !!sessionCookie

  // Redirect to auth if accessing protected route without session
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !hasSession) {
    const redirectUrl = new URL('/auth', request.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Redirect to dashboard if accessing auth route with active session
  // BUT exclude public auth routes like access-denied
  const isPublicAuthRoute = publicAuthRoutes.some(route => pathname.startsWith(route))
  if (authRoutes.some(route => pathname.startsWith(route)) && hasSession && !isPublicAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // ONLY update session for protected routes (not for public content/crawlers)
  // This allows Google bots to crawl public pages at full speed
  if (protectedRoutes.some(route => pathname.startsWith(route)) || 
      authRoutes.some(route => pathname.startsWith(route))) {
    const response = await updateSession(request)
    return response
  }

  // For public routes, return a basic response without Supabase call
  return NextResponse.next({ request })
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
