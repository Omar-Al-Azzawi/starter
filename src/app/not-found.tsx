import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Ghost } from 'lucide-react'
import '../app/[locale]/globals.css'

export default function NotFound() {
  const t = useTranslations('Pages.NotFound')

  return (
    <html>
      <body className="text-center">
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
          <Ghost className="w-24 h-24 mb-8 text-muted-foreground" />
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <h2 className="text-2xl font-semibold mb-4">{t('title')}</h2>
          <Link href="/">
            <Button variant="outline">{t('returnToHome')}</Button>
          </Link>
        </div>
      </body>
    </html>
  )
}
