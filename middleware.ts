import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public paths accessible to everyone
const PUBLIC_PATHS = ['/login', '/reset-password'];

// Middleware function to check authentication
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Is the path public?
  const isPublicPath = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  
  // Log all cookies for debugging
  console.log('All cookies:', request.cookies.getAll());
  
  // Get the user from cookies
  const user = request.cookies.get('user')?.value;
  console.log(`Pathname: ${pathname}, User cookie:`, user);
  
  // If the path is not public and the user is not authenticated, redirect to login
  if (!isPublicPath && !user) {
    console.log('User not authenticated, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If the path is login and the user is authenticated, redirect to dashboard
  if (pathname === '/login' && user) {
    console.log('User already authenticated, redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Otherwise, continue with the request
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png).*)',
  ],
};