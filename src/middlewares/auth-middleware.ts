import { betterFetch } from '@better-fetch/fetch'
import { CustomMiddleware } from './chain'
import { Session } from 'better-auth'
import { NextResponse } from "next/server";
import { getLocale } from 'next-intl/server';
import { AUTH_URL, PROTECTED_URL } from '@/constants'

export function withAuthMiddleware(middleware: CustomMiddleware): CustomMiddleware {
  return async (request, event, response) => {
    const { nextUrl } = request;
    const locale = await getLocale()
    const pathName = nextUrl.pathname;
    
    const normalizedPath = pathName.startsWith(`/${locale}`)
    ? pathName.replace(`/${locale}`, '')
    : pathName;

    const isAuthRoute = AUTH_URL.includes(normalizedPath);
    const isProtectedRoute = PROTECTED_URL.includes(normalizedPath);

    const cookies = request.headers.get("cookie");

    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: process.env.BETTER_AUTH_URL,
        headers: {
          cookie: cookies || "",
        },
      }
    );

    if (isAuthRoute) {
      if (session) {
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
      }
      return NextResponse.next();
    }
    
    if (!session && isProtectedRoute) {
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return Response.redirect(
        new URL(`/${locale}/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl),
      );
    }

    return middleware(request, event, response)
  }
}
