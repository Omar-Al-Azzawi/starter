'use client'

import { authClient } from '@/lib/auth-client'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Suspense } from 'react'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = authClient.useSession()

  return (
    <SidebarProvider>
      <Suspense>
        {session && <AppSidebar session={session} />}
        <main className="m-2 w-full">
          <SidebarTrigger />
          {children}
        </main>
      </Suspense>
    </SidebarProvider>
  )
}

export default ProtectedLayout
