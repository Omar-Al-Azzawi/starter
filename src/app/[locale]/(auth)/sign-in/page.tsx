import Link from 'next/link'
import BackButton from '@/components/buttons/back'
import SignIn from '@/forms/sign-in/form'
import { useLocale, useTranslations } from 'next-intl'

const SignInPage = () => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <div className="space-y-6">
      <div>
        <BackButton />
        <h1 className="text-4xl font-bold tracking-tight">{t('Pages.SignIn.title')}</h1>
        <p className="mt-2 text-sm text-gray-500">{t('Pages.SignIn.welcome')}</p>
      </div>

      <SignIn />

      <div className="text-sm">
        {t('Pages.SignIn.dontHaveAccount')}{' '}
        <Link href={`/${locale}/sign-up`} className="text-purple-500 hover:text-purple-600">
          {t('Pages.SignIn.signUp')}
        </Link>
      </div>
    </div>
  )
}

export default SignInPage
