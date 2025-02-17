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
import Link from "next/link";
import { Fragment } from "react";

import LogoSVG from "../svgs/logo";
import { CollapsibleContent } from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { AddFolder } from "./folders/add-folder";
import { SidebarAllFoldersCollapsible } from "./folders/siderbar-all-folders-collapsible";
import { SidebarAllNotesCollapsible } from "./notes/sidebar-all-notes-collapsible";
import ProfileModal from "./profile/profile-modal";

export async function AppSidebar() {
  const cookieStore = await cookies();
  const userInfos = JSON.parse(cookieStore.get("user_infos")?.value || "{}");
  const allUserNotes = await getAllUserNotes();
  const userHasNotes = Array.isArray(allUserNotes.body) && allUserNotes.body.length > 0;
  const allFolders =
    (await getUsersFolders()).body?.filter(item => item.name !== "Todas as Notas") || [];
  const allNotes = Array.isArray(allUserNotes.body) ? allUserNotes.body : [];

  return (
    <Sidebar className={`!bg-white`}>
      <Link href={`/`} passHref>
        <SidebarHeader className={`flex-row items-center gap-2.5 p-5`}>
          <LogoSVG className={`size-14`} />
          <span className={`flex flex-col text-2xl font-bold text-primary `}>
            Notes <span className={`-mt-1.5`}>Manager</span>
          </span>
        </SidebarHeader>
      </Link>
      <SidebarContent>
        <SidebarGroup>
          <SidebarAllNotesCollapsible allFolders={allFolders}>
            <CollapsibleContent
              className={`text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`}
            >
              <ScrollArea className="h-fit max-h-80 w-full overflow-auto">
                <>
                  {userHasNotes &&
                    allNotes.map(note => (
                      <Fragment key={note.id}>
                        <Link
                          className={`flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-muted`}
                          href={`/note/${note.id}`}
                        >
                          <span className="w-[200px] truncate text-sm">{note.title}</span>
                        </Link>
                        {allNotes.indexOf(note) !== allNotes.length - 1 && <Separator />}
                      </Fragment>
                    ))}

                  {!userHasNotes && (
                    <div className={`p-2`}>
                      <span className={`text-xs font-medium text-muted-foreground `}>
                        Você ainda não tem nenhuma nota.
                      </span>
                    </div>
                  )}
                </>
              </ScrollArea>
            </CollapsibleContent>
          </SidebarAllNotesCollapsible>
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
