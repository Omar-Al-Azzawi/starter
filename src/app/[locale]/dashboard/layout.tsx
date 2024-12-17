import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="m-2">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout;
