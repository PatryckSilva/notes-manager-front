import { getAllUserNotes } from "@/actions/Notes";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { InboxIcon } from "lucide-react";

import LogoSVG from "../svgs/logo";
import { SidebarAllNotesCollapsible } from "./sidebar-all-notes-collapsible";

export async function AppSidebar() {
  const allUserNotes = await getAllUserNotes();

  const items = [
    {
      title: "Inbox",
      url: "#",
      icon: InboxIcon,
    },
  ];

  console.log("AppSidebar");

  return (
    <Sidebar>
      <SidebarHeader className={`flex-row items-center gap-2.5 p-5`}>
        <LogoSVG className={`size-14`} />
        <span className={`flex flex-col text-2xl font-bold text-primary `}>
          Notes <span className={`-mt-1.5`}>Manager</span>
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarAllNotesCollapsible />

        <SidebarGroup>
          <SidebarGroupLabel>Pastas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`cursor-pointer hover:bg-muted`}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
