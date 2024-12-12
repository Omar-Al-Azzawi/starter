import { Button } from "@/components/ui/button";
import SignIn from "@/forms/sign-in/form";
import { ArrowLeftIcon } from 'lucide-react';
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const SignInPage = () => {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <div className="w-full space-y-6">
            <Button variant="ghost" className="text-muted-foreground" asChild>
                <Link href="/">
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    {t('Actions.back')}
                </Link>
            </Button>
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold">
                    {t('Pages.SignIn.title')}
                </h1>
                <p className="text-muted-foreground">
                    {t('Pages.SignIn.welcome')}
                </p>
            </div>
            <SignIn />
            <p className="text-sm text-muted-foreground text-center">
                {t('Pages.SignIn.dontHaveAccount')}
                <Link href={`/${locale}/sign-up`} className="text-primary hover:underline">
                    {t('Pages.SignIn.signUp')}
                </Link>
            </p>
        </div>
    )
}

export default SignInPage;
