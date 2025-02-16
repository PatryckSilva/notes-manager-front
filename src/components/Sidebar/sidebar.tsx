import { getUsersFolders } from "@/actions/Folders";
import { getAllUserNotes } from "@/actions/Notes";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronDown, Folder, FolderPlus } from "lucide-react";
import { cookies } from "next/headers";

import LogoSVG from "../svgs/logo";
import ProfileModal from "./profile/profile-modal";
import { SidebarAllNotesCollapsible } from "./sidebar-all-notes-collapsible";

export async function AppSidebar() {
  const cookieStore = await cookies();
  const userInfos = JSON.parse(cookieStore.get("user_infos")?.value || "{}");
  const allUserNotes = await getAllUserNotes();

  const allFolders = (await getUsersFolders()).body?.filter(item => item.name !== "Todas as Notas");

  const allNotes = Array.isArray(allUserNotes.body) ? allUserNotes.body : [];

  return (
    <Sidebar className={`bg-background`}>
      <SidebarHeader className={`flex-row items-center gap-2.5 p-5`}>
        <LogoSVG className={`size-14`} />
        <span className={`flex flex-col text-2xl font-bold text-primary `}>
          Notes <span className={`-mt-1.5`}>Manager</span>
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarAllNotesCollapsible allNotes={allNotes} />
        </SidebarGroup>

        <SidebarGroup className="border-t border-border">
          <SidebarGroupLabel>
            <span className={`flex w-full items-center justify-between gap-1.5  `}>
              <span className="flex items-center gap-1.5">
                <span className="text-xs font-medium">Pastas</span>
              </span>
              <span className="flex items-center gap-1">
                <FolderPlus className={`size-4 `} />
              </span>
            </span>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {allFolders?.map(item => (
                <SidebarMenuItem
                  className={`flex cursor-pointer items-center border-y border-border hover:bg-muted `}
                  key={item.id}
                >
                  <SidebarMenuButton asChild>
                    <span>
                      <Folder />
                      <span className={`font-medium`}>{item.name}</span>
                    </span>
                  </SidebarMenuButton>
                  <ChevronDown className={`ml-auto transition-transform `} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <ProfileModal userInfos={userInfos} />
    </Sidebar>
  );
}
