import Link from 'next/link'
import { Github, Star } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { FeaturesSectionWithHoverEffects } from '@/components/blocks/feature-section-with-hover-effects'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import LocalSwitcher from '@/components/local-switcher'

export default function WelcomePage() {
  const locale = useLocale()
  const t = useTranslations()

  return (
    <>
      <main className="flex-1">
        <header className="my-4 mx-4 lg:mx-28 flex justify-between items-center">
          <Link className="flex items-center justify-center" href="#">
            <Star className="h-6 w-6" />
            <span className="text-xl font-bold">ter</span>
            <span className="sr-only">starter</span>
          </Link>
          <div className="flex items-center gap-4">
            <LocalSwitcher lang={locale} />
            <ThemeToggle />
            <Button asChild variant="gradient">
              <Link href={`/${locale}/sign-in`}>{t('Pages.Home.signIn')}</Link>
            </Button>
          </div>
        </header>
        <section className="flex flex-col items-center justify-center text-center px-4 py-20">
          <h1 className="max-w-4xl text-4xl md:text-6xl lg:text-8xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text">
            {t('Pages.Home.title')}
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-gray-500 mb-12 ">
            {t('Pages.Home.description')}
          </p>

          <Button variant="gradient" className="px-8 py-4 font-medium flex items-center gap-2" asChild>
            <Link href="https://github.com/Omar-Al-Azzawi/starter" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
              {t('Pages.Home.starOnGitHub')}
            </Link>
          </Button>
        </section>
        <FeaturesSectionWithHoverEffects />
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 starter</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </>
  )
}
