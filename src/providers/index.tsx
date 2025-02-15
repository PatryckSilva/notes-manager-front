import { AppSidebar } from "@/components/Sidebar/app-siderbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </TooltipProvider>
    </SidebarProvider>
  );
};
