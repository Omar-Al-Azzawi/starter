import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ChangePassword from '@/forms/change-passwrd/form'
import { useTranslations } from 'next-intl'

const SettingPage = () => {
  const t = useTranslations()

  return (
    <main>
      <h1 className="text-2xl font-bold">{t('Pages.Settings.title')}</h1>
      <div className="flex flex-col gap-4 my-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('Pages.Settings.changePassword')}</CardTitle>
          </CardHeader>
          <CardContent className="w-full lg:w-1/2">
            <ChangePassword />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default SettingPage
