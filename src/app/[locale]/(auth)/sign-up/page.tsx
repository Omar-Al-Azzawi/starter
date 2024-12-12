import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignUpForm } from "@/forms/sign-up/form";
import { ArrowLeftIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale, useTranslations } from "next-intl";

const SignUpPage = () => {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <Button variant="ghost" className="text-muted-foreground" asChild>
                        <Link href="/">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" />
                            {t('Actions.back')}
                        </Link>
                    </Button>
                </div>
                <CardTitle className="text-2xl font-semibold mt-4">
                    {t('Pages.SignUp.title')}
                </CardTitle>
                <CardDescription>
                    {t('Pages.SignUp.welcome')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                    {t('Pages.SignUp.alreadyHaveAccount')}
                    <Link href={`/${locale}/sign-in`} className="text-primary hover:underline">
                        {t('Pages.SignUp.signIn')}
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}

export default SignUpPage;

