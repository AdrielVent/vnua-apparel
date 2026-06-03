import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Check for the security drop token
  const hasAccess = request.cookies.has('DROP_ACCESS_TOKEN');
  
  // Protect the main landing page and shopping routes
  if (request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/shop')) {
    if (!hasAccess) {
      // Redirect to the password drop page
      return NextResponse.redirect(new URL('/drop', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - drop (the password page itself)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|drop).*)',
  ],
};
