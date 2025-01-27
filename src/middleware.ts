import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasToken = request.cookies.has('__Secure-next-auth.session-token'); 

  const protectedPaths = [
    '/dashboard',
    '/form'
  ]

  if (hasToken && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!hasToken && (protectedPaths.some(p => pathname.startsWith(p)))) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/dashboard',
    '/form/:path*',
    '/submit/:path*'
  ]
}