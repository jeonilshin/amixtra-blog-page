import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams, origin } = request.nextUrl
  if (pathname === '/studio') {
    return new NextResponse('Access Denied', { status: 403 })
  }

  if (pathname === '/admin') {
    const user = searchParams.get('user')
    if (user === 'miko' || user === 'jeon') {
      return NextResponse.redirect(`${origin}/studio`)
    }
    return new NextResponse('Access Denied', { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio', '/admin'],
}