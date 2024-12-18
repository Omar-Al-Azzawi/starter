import Image from 'next/image'
import illustration from '@/assets/pixeltrue-space-discovery-1.png'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div>
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">{children}</div>
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
    </main>
  )
}
