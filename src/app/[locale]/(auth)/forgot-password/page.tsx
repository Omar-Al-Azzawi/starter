import Link from 'next/link'
import BackButton from '@/components/buttons/back'
import ForgotPassword from '@/forms/forgot-password/form'
import { useTranslations } from 'next-intl'

const ForgotPasswordPage = () => {
  const t = useTranslations()

  return (
    <div className="space-y-6">
      <div>
        <BackButton />
        <h1 className="text-4xl font-bold tracking-tight">{t('Pages.ForgotPassword.title')}</h1>
        <p className="mt-2 text-sm text-gray-500">{t('Pages.ForgotPassword.description')}</p>
      </div>

      <ForgotPassword />

      <div className="text-sm">
        {t('Pages.ForgotPassword.backToSignIn')}{' '}
        <Link href="/sign-in" className="text-purple-500 hover:text-purple-600">
          {t('Pages.ForgotPassword.signIn')}
        </Link>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
