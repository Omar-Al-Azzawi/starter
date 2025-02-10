import BackButton from '@/components/buttons/back'
import ResetPassword from '@/forms/reset-password/form'
import { useTranslations } from 'next-intl'

const ResetPasswordPage = () => {
  const t = useTranslations()
  return (
    <div className="space-y-6">
      <div>
        <BackButton />
        <h1 className="text-4xl font-bold tracking-tight">{t('Pages.ResetPassword.title')}</h1>
        <p className="mt-2 text-sm text-gray-500">{t('Pages.ResetPassword.description')}</p>
      </div>
      <ResetPassword />
    </div>
  )
}

export default ResetPasswordPage
