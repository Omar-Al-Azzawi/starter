import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ArrowLeftIcon } from "lucide-react";

const BackButton = ({ href }: { href?: string }) => {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <Link href={`/${locale}/${href}`} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2 mb-4">
            <ArrowLeftIcon className="w-4 h-4" />
            {t('Actions.back')}
        </Link>
    )
}

export default BackButton;
