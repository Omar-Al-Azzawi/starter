import { useTranslations } from "next-intl";

const HomePage = () => {
    const t = useTranslations();

    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">{t('Pages.HomePage.title')}</h1>
        </main>
    );
};

export default HomePage;
