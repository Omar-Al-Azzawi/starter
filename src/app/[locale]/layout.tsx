import { Suspense } from 'react';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

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
            <body className="flex min-h-screen w-full flex-col">
                <NextIntlClientProvider messages={messages}>
                    <Suspense>{children}</Suspense>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
