import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams, origin } = request.nextUrl

  if (pathname === '/admin') {
    const user = searchParams.get('user')
    if (user === 'miko' || user === 'jeon') {
      const response = NextResponse.redirect(`${origin}/studio`)
      response.cookies.set('authorized', 'true', { path: '/', httpOnly: true })
      return response
    }
    return new NextResponse('Access Denied', { status: 403 })
  }

  if (pathname === '/studio') {
    const authorized = request.cookies.get('authorized')
    if (authorized?.value === 'true') {
      return NextResponse.next()
    }
    return new NextResponse('Access Denied', { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio', '/admin'],
}
