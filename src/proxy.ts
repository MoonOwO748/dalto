import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const foreignLocales = ['en', 'zh', 'ja']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Permanent redirect for explicit '/ko' paths to root / non-prefixed paths (for SEO rank transfer)
  if (pathname === '/ko') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url, 308)
  }

  if (pathname.startsWith('/ko/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/ko/, '') || '/'
    return NextResponse.redirect(url, 308)
  }

  // 2. Pass foreign locale routes through directly (/en, /zh, /ja)
  const isForeignLocale = foreignLocales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (isForeignLocale) {
    return NextResponse.next()
  }

  // 3. Exclude static files, metadata files, and api routes from rewrite
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/favicon.ico' ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 4. Rewrite default root and non-prefixed paths to the underlying Korean route segment (/ko/...)
  const rewriteUrl = request.nextUrl.clone()
  rewriteUrl.pathname = `/ko${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(rewriteUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon.svg|apple-icon.png|og|images|fonts|.*\\..*).*)',
  ],
}
