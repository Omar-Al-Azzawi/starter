import Link from "next/link";
import Image from "next/image";
import BackButton from "@/components/buttons/back";
import SignIn from "@/forms/sign-in/form";
import { useTranslations } from "next-intl";
import illustration from "@/assets/pixeltrue-space-discovery-1.png";

const SignInPage = () => {
    const t = useTranslations();

    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <BackButton />
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-[#1a1147]">{t('Pages.SignIn.title')}</h1>
                            <p className="mt-2 text-sm text-gray-500">{t('Pages.SignIn.welcome')}</p>
                        </div>

                        <SignIn />

                        <div className="text-sm">
                            {t('Pages.SignIn.dontHaveAccount')} {' '}
                            <Link href="/sign-up" className="text-[#e86b67] hover:text-[#e55853]">
                                {t('Pages.SignIn.signUp')}
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

export default SignInPage;
