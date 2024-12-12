import { Suspense } from 'react';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from "@/components/ui/sonner"

import './globals.css';

export const metadata = {
    title: 'Starter',
    description: 'Starter',
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = await params;

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <Suspense>{children}</Suspense>
                    <Toaster />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
