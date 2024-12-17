import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['fi', 'en'],
  defaultLocale: 'en',
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*|favicon.ico|assets|icons).*)', '/(fi|en)/:path*'],
}
