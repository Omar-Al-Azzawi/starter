'use client'

import { authClient } from '@/lib/auth-client'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = authClient.useSession()

  return (
    <SidebarProvider>
      {session && <AppSidebar session={session} />}
      <main className="m-2 w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default ProtectedLayout
