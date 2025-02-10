import Link from 'next/link'
import { SignUp } from '@/forms/sign-up/form'
import { useLocale, useTranslations } from 'next-intl'
import BackButton from '@/components/buttons/back'

const SignUpPage = () => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <div className="space-y-6">
      <div>
        <BackButton />
        <h1 className="text-4xl font-bold tracking-tight">{t('Pages.SignUp.title')}</h1>
        <p className="mt-2 text-sm text-gray-500">{t('Pages.SignUp.welcome')}</p>
      </div>

      <SignUp />

      <div className="text-sm">
        {t('Pages.SignUp.alreadyHaveAccount')}{' '}
        <Link href={`/${locale}/sign-in`} className="text-purple-500 hover:text-purple-600">
          {t('Pages.SignUp.signIn')}
        </Link>
      </div>
    </div>
  )
}

export default SignUpPage
