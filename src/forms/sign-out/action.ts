'use server'

import { authClient } from '@/lib/auth-client'
import { getLocale } from 'next-intl/server'
import { redirect } from 'next/navigation'

export async function signOutAction() {
  const locale = await getLocale()
  await authClient.signOut()
  redirect(`/${locale}/sign-in`)
}
