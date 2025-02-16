import { getUsersFolders } from "@/actions/Folders";
import { getAllUserNotes } from "@/actions/Notes";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cookies } from "next/headers";

import LogoSVG from "../svgs/logo";
import { AddFolder } from "./folders/add-folder";
import { SidebarAllFoldersCollapsible } from "./folders/siderbar-all-folders-collapsible";
import { SidebarAllNotesCollapsible } from "./notes/sidebar-all-notes-collapsible";
import ProfileModal from "./profile/profile-modal";

export async function AppSidebar() {
  const cookieStore = await cookies();
  const userInfos = JSON.parse(cookieStore.get("user_infos")?.value || "{}");
  const allUserNotes = await getAllUserNotes();

  const allFolders =
    (await getUsersFolders()).body?.filter(item => item.name !== "Todas as Notas") || [];

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
              <AddFolder />
            </span>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarAllFoldersCollapsible allFolders={allFolders} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <ProfileModal userInfos={userInfos} />
      </SidebarFooter>
    </Sidebar>
  );
}
