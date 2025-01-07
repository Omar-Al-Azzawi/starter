'use client'

import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { LogOut } from 'lucide-react'

export default function SignOut() {
  const t = useTranslations()
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const handleSignOut = async () => {
    try {
      setPending(true)
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/sign-in')
            router.refresh()
          },
        },
      })
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setPending(false)
    }
  }

  return (
    <button disabled={pending} type="submit" className="flex items-center" onClick={handleSignOut}>
      <LogOut size={16} className="mr-2" />
      {pending ? t('Actions.signingOut') : t('Actions.signOut')}
    </button>
  )
}
