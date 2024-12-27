import createMiddleware from 'next-intl/middleware';
import type { CustomMiddleware } from './chain';

const localeMiddleware = createMiddleware({
  locales: ['fi', 'en'],
  defaultLocale: 'en',
});

export function withLocaleMiddleware(middleware: CustomMiddleware): CustomMiddleware {
  return async (request, event, response) => {
    const localeResponse = localeMiddleware(request);

    if (localeResponse) {
      return localeResponse;
    }

    return middleware(request, event, response);
  };
}
