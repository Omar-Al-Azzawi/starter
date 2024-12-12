import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useLocale } from 'next-intl';

export function useHandleFormState(
    state: { success: boolean; message: string },
    path: string
) {
    const locale = useLocale();
    const router = useRouter();

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
                router.push(`/${locale}/${path}`);
            } else {
                toast.error(state.message);
            }
        }
    }, [state, locale, router, path]);
}
