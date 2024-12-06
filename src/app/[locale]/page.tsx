import { useTranslations } from "next-intl";

const HomePage = () => {
    const t = useTranslations('HomePage');

    return <div>{t('title')}</div>;
};

export default HomePage;
