import BackButton from '@/components/buttons/back'
import ResetPassword from '@/forms/reset-password/form'
import { useTranslations } from 'next-intl'

const ResetPasswordPage = () => {
  const t = useTranslations()
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="space-y-6">
            <div>
              <BackButton />
              <h1 className="text-4xl font-bold tracking-tight text-[#1a1147]">{t('Pages.ResetPassword.title')}</h1>
              <p className="mt-2 text-sm text-gray-500">{t('Pages.ResetPassword.description')}</p>
            </div>
            <ResetPassword />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
