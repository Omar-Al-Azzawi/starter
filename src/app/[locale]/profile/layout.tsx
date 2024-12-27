import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Suspense } from 'react'

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="m-2">
        <SidebarTrigger />
        <Suspense>{children}</Suspense>
      </main>
    </SidebarProvider>
  )
}

export default ProfileLayout
