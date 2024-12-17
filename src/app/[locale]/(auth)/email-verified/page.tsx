import { CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useTranslations } from 'next-intl';

export default function VerifiedEmailPage() {
    const t = useTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 shadow-lg rounded-lg">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold">{t('Pages.SignUp.emailVerified')}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('Pages.SignUp.emailVerified')}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <p className="text-sm text-gray-500 mb-4">
              {t('Pages.SignUp.emailVerified')}
            </p>
          </div>
          <div>
            <Link href="/dashboard" passHref>
              <Button variant="primary" className="w-full">
                {t('Pages.SignUp.goToDashboard')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
