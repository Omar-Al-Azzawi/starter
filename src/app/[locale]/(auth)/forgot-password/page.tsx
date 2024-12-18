import Link from 'next/link'
import Image from 'next/image'
import BackButton from '@/components/buttons/back'
import ForgotPassword from '@/forms/forgot-password/form'
import { useTranslations } from 'next-intl'
import illustration from '@/assets/pixeltrue-space-discovery-1.png'

const ForgotPasswordPage = () => {
  const t = useTranslations()

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="space-y-6">
            <div>
              <BackButton />
              <h1 className="text-4xl font-bold tracking-tight text-[#1a1147]">{t('Pages.ForgotPassword.title')}</h1>
              <p className="mt-2 text-sm text-gray-500">{t('Pages.ForgotPassword.description')}</p>
            </div>

            <ForgotPassword />

            <div className="text-sm">
              {t('Pages.ForgotPassword.backToSignIn')}{' '}
              <Link href="/sign-in" className="text-[#e86b67] hover:text-[#e55853]">
                {t('Pages.ForgotPassword.signIn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={illustration}
          alt="Rocket illustration"
          width={400}
          height={400}
          priority
        />
      </div>
    </div>
  )
}

export default ForgotPasswordPage
