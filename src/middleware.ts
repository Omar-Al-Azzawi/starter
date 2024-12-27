import { chain } from '@/middlewares/chain'
import { withAuthMiddleware } from '@/middlewares/auth-middleware'
import { withLocaleMiddleware } from '@/middlewares/locale-middleware'

export default chain([withAuthMiddleware, withLocaleMiddleware])

export const config = {
  matcher: ['/((?!api|_next|.*\\..*|favicon.ico|assets|icons).*)', '/(fi|en)/:path*'],
}
