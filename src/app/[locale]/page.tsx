import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mountain } from 'lucide-react'
import { useLocale } from "next-intl";

export default function WelcomePage() {
    const locale = useLocale();

    return (
        <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link className="flex items-center justify-center" href="#">
            <Mountain className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
            </Link>
        </header>
        <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Welcome to the Starter kit
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    This is a starter kit for your next project. It includes a fully functional authentication system, a dashboard with a sidebar, and a home page.
                    </p>
                </div>
                <div className="space-x-4">
                    <Button asChild variant="primary">
                        <Link href={`/${locale}/sign-in`}>Sign In</Link>
                    </Button>
                    <Button asChild variant="outline">
                     <Link href={`/${locale}/sign-up`}>Sign Up</Link>
                    </Button>
                </div>
                </div>
            </div>
            </section>
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
        </div>
    )
}
