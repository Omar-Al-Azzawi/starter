export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="w-full max-w-lg">
                {children}
            </div>
        </main>
    );
}

